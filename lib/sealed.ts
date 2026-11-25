import { isBase64Url } from "@/lib/base64url";
import { IV_LENGTH, type Sealed } from "@/lib/gift-crypto";

/** Limites do que o servidor aceita guardar. */
export const STORE_LIMITS = {
  /** O maior presente (nome, frase e bilhete cheios, até com emoji) cifrado cabe com folga. */
  ciphertext: 4096,
  /** Por quantos dias o link funciona. */
  days: 90,
  /** Quantas flores um mesmo IP cria por hora. */
  perHour: 30,
} as const;

/** Confere o que o navegador mandou para guardar. `null` quando não é um presente cifrado. */
export const parseSealed = (value: unknown): Sealed | null => {
  if (typeof value !== "object" || value === null) return null;
  const { ciphertext, iv } = value as Record<string, unknown>;
  if (typeof ciphertext !== "string" || typeof iv !== "string") return null;
  if (iv.length !== IV_LENGTH || !isBase64Url(iv)) return null;
  // o GCM soma 16 bytes de etiqueta ao texto: abaixo disso não há presente nenhum
  if (ciphertext.length < 23 || ciphertext.length > STORE_LIMITS.ciphertext || !isBase64Url(ciphertext)) return null;
  return { ciphertext, iv };
};
