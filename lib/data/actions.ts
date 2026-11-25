"use server";

import { createHmac, randomBytes } from "node:crypto";
import { lt, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { clientIp } from "@/lib/client-ip";
import { db } from "@/lib/db";
import { gifts, rateLimits } from "@/lib/db/schema";
import { newGiftId } from "@/lib/gift-id";
import { STORE_LIMITS, parseSealed } from "@/lib/sealed";

export type CreateGiftResult = { ok: true; id: string } | { ok: false; error: string };

/*
 * Ação pública (não há contas): qualquer um pode chamar, com qualquer coisa.
 * Ela só aceita um presente cifrado dentro dos limites e conta quantos cada IP
 * cria por hora. O IP vira um HMAC antes de chegar ao banco.
 */

// Sem RATE_LIMIT_SECRET (no computador, no CI), cada servidor sorteia o seu.
const secret = process.env.RATE_LIMIT_SECRET || randomBytes(32).toString("hex");

const underLimit = async (): Promise<boolean> => {
  if (process.env.GIFT_RATE_LIMIT === "off") return true;
  const ip = clientIp(await headers()) ?? "sem-ip";
  const key = createHmac("sha256", secret).update(ip).digest("base64url");

  const expired = sql`${rateLimits.resetAt} < now()`;
  const [row] = await db
    .insert(rateLimits)
    .values({ key, hits: 1, resetAt: sql`now() + interval '1 hour'` })
    .onConflictDoUpdate({
      target: rateLimits.key,
      set: {
        hits: sql`case when ${expired} then 1 else ${rateLimits.hits} + 1 end`,
        resetAt: sql`case when ${expired} then now() + interval '1 hour' else ${rateLimits.resetAt} end`,
      },
    })
    .returning({ hits: rateLimits.hits });

  return row.hits <= STORE_LIMITS.perHour;
};

export async function createGift(input: unknown): Promise<CreateGiftResult> {
  const sealed = parseSealed(input);
  if (!sealed) return { ok: false, error: "A flor não chegou inteira. Tente de novo." };

  try {
    if (!(await underLimit())) {
      return { ok: false, error: "Muitas flores em pouco tempo. Espere um pouco e tente de novo." };
    }

    const id = newGiftId();
    await db.insert(gifts).values({
      id,
      ...sealed,
      expiresAt: sql`now() + make_interval(days => ${STORE_LIMITS.days})`,
    });

    // faxina: links vencidos e contagens antigas saem do banco
    await db.delete(gifts).where(lt(gifts.expiresAt, sql`now()`));
    await db.delete(rateLimits).where(lt(rateLimits.resetAt, sql`now() - interval '1 day'`));

    return { ok: true, id };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Não deu para guardar a flor agora. Tente de novo em instantes." };
  }
}
