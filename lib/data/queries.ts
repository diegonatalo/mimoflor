import "server-only";
import { and, eq, gt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { gifts } from "@/lib/db/schema";
import type { Sealed } from "@/lib/gift-crypto";
import { isGiftId } from "@/lib/gift-id";

/** O presente cifrado de um link. `null` quando o código não existe ou o link venceu. */
export const getSealedGift = async (id: string): Promise<Sealed | null> => {
  if (!isGiftId(id)) return null;
  const [row] = await db
    .select({ ciphertext: gifts.ciphertext, iv: gifts.iv })
    .from(gifts)
    .where(and(eq(gifts.id, id), gt(gifts.expiresAt, sql`now()`)))
    .limit(1);
  return row ?? null;
};
