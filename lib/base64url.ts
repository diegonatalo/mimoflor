/** Bytes ↔ Base64URL (sem `=`), o formato que vai no link e no banco. */

const BASE64URL = /^[A-Za-z0-9_-]*$/;

export const isBase64Url = (text: string) => BASE64URL.test(text) && text.length % 4 !== 1;

export const toBase64Url = (bytes: Uint8Array): string => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

/** `null` quando o texto não é Base64URL válido. */
export const fromBase64Url = (text: string): Uint8Array<ArrayBuffer> | null => {
  if (!isBase64Url(text)) return null;
  const padded = text.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (text.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};
