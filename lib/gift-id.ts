/** Código curto e aleatório do link (`/app/f/<id>`): 10 caracteres, cerca de 59 bits. */

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const GIFT_ID_LENGTH = 10;

export const newGiftId = (): string => {
  let id = "";
  while (id.length < GIFT_ID_LENGTH) {
    for (const byte of crypto.getRandomValues(new Uint8Array(16))) {
      // 248 = 62 × 4: descarta o resto para nenhuma letra sair mais que as outras
      if (byte < 248 && id.length < GIFT_ID_LENGTH) id += ALPHABET[byte % 62];
    }
  }
  return id;
};

export const isGiftId = (value: unknown): value is string =>
  typeof value === "string" && value.length === GIFT_ID_LENGTH && /^[0-9A-Za-z]+$/.test(value);
