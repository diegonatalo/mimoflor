import { FLOWER_COLORS, FLOWER_KINDS, isRose, type FlowerChoice } from "@/lib/flowers";

/** O presente: a flor, para quem é e o bilhete surpresa. Viaja cifrado. */
export type Gift = {
  flower: FlowerChoice;
  /** nome de quem recebe; vazio quando não foi preenchido */
  to: string;
  /** bilhete que aparece depois que a flor abre; vazio quando não há */
  note: string;
};

export const GIFT_VERSION = 1;

/** Tamanhos máximos, em caracteres. */
export const GIFT_LIMITS = { to: 40, note: 280 } as const;

const text = (value: unknown, max: number): string | null =>
  typeof value === "string" && value.trim().length <= max ? value.trim() : null;

/**
 * Confere um presente vindo de fora (o JSON decifrado). `null` quando algo não bate.
 * Campos a mais são ignorados: os primeiros links ainda levam a frase que existia antes.
 */
export const parseGift = (value: unknown): Gift | null => {
  if (typeof value !== "object" || value === null) return null;
  const raw = value as Record<string, unknown>;
  if (raw.v !== GIFT_VERSION) return null;

  const flower = raw.flower;
  if (typeof flower !== "object" || flower === null) return null;
  const { kind: rawKind, color: rawColor } = flower as Record<string, unknown>;
  const kind = FLOWER_KINDS.find((k) => k === rawKind);
  const color = FLOWER_COLORS.find((c) => c === rawColor);
  if (!kind || !color) return null;

  const to = text(raw.to, GIFT_LIMITS.to);
  const note = text(raw.note, GIFT_LIMITS.note);
  if (to === null || note === null) return null;

  return { flower: { kind, color: isRose(kind) ? color : "red" }, to, note };
};

/** O JSON que é cifrado. */
export const serializeGift = (gift: Gift): string => JSON.stringify({ v: GIFT_VERSION, ...gift });
