import { fromBase64Url, toBase64Url } from "@/lib/base64url";
import { parseGift, serializeGift, type Gift } from "@/lib/gift";

/*
 * O presente é cifrado no navegador de quem envia (AES-GCM, chave de 128 bits).
 * O servidor guarda só o texto cifrado e o IV; a chave vai depois do `#` do link,
 * que o navegador nunca manda para o servidor. Sem o link inteiro, ninguém lê.
 */

export type Sealed = {
  /** texto cifrado (com a etiqueta do GCM), em Base64URL */
  ciphertext: string;
  /** vetor de inicialização de 12 bytes, em Base64URL (16 caracteres) */
  iv: string;
};

const ALGORITHM = "AES-GCM";
/** Tamanho da chave no link (16 bytes em Base64URL). */
export const KEY_LENGTH = 22;
/** Tamanho do IV guardado no banco (12 bytes em Base64URL). */
export const IV_LENGTH = 16;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/** Cifra o presente com uma chave nova e devolve a chave, que vai no link. */
export const sealGift = async (gift: Gift): Promise<Sealed & { key: string }> => {
  const key = await crypto.subtle.generateKey({ name: ALGORITHM, length: 128 }, true, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = await crypto.subtle.encrypt({ name: ALGORITHM, iv }, key, encoder.encode(serializeGift(gift)));
  const raw = new Uint8Array(await crypto.subtle.exportKey("raw", key));
  return { key: toBase64Url(raw), iv: toBase64Url(iv), ciphertext: toBase64Url(new Uint8Array(data)) };
};

/** Decifra e confere o presente. `null` com chave errada, dado adulterado ou formato estranho. */
export const openGift = async (sealed: Sealed, key: string): Promise<Gift | null> => {
  const rawKey = fromBase64Url(key);
  const iv = fromBase64Url(sealed.iv);
  const data = fromBase64Url(sealed.ciphertext);
  if (!rawKey || rawKey.length !== 16 || !iv || iv.length !== 12 || !data) return null;
  try {
    const cryptoKey = await crypto.subtle.importKey("raw", rawKey, ALGORITHM, false, ["decrypt"]);
    const plain = await crypto.subtle.decrypt({ name: ALGORITHM, iv }, cryptoKey, data);
    return parseGift(JSON.parse(decoder.decode(plain)));
  } catch {
    return null;
  }
};
