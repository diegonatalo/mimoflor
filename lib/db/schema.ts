import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Cada flor enviada. Só o texto cifrado e o IV: a chave fica no link de quem
 * recebe (depois do `#`) e nunca chega aqui, então o banco não consegue ler nada.
 */
export const gifts = pgTable(
  "gifts",
  {
    id: text("id").primaryKey(),
    ciphertext: text("ciphertext").notNull(),
    iv: text("iv").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (table) => [index("gifts_expires_at_idx").on(table.expiresAt)],
);

/** Quantas flores cada IP criou na janela atual. O IP é guardado só como HMAC. */
export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(),
  hits: integer("hits").notNull(),
  resetAt: timestamp("reset_at", { withTimezone: true }).notNull(),
});
