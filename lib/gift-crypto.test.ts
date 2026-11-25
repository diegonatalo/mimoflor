// @vitest-environment node
import { describe, expect, it } from "vitest";
import { fromBase64Url, toBase64Url } from "@/lib/base64url";
import type { Gift } from "@/lib/gift";
import { IV_LENGTH, KEY_LENGTH, openGift, sealGift } from "@/lib/gift-crypto";

const GIFT: Gift = {
  flower: { kind: "rose", color: "red" },
  to: "Ana",
  message: "Uma flor para alegrar o seu dia",
  note: "Lembrei de você hoje cedo. ✿ Com carinho.",
};

describe("sealGift e openGift", () => {
  it("abre com a chave do link", async () => {
    const { key, ...sealed } = await sealGift(GIFT);
    expect(key).toHaveLength(KEY_LENGTH);
    expect(sealed.iv).toHaveLength(IV_LENGTH);
    expect(await openGift(sealed, key)).toEqual(GIFT);
  });

  it("o texto cifrado não revela a mensagem", async () => {
    const { ciphertext } = await sealGift(GIFT);
    const text = new TextDecoder().decode(fromBase64Url(ciphertext)!);
    expect(text).not.toContain("Ana");
    expect(text).not.toContain("Lembrei");
  });

  it("cada presente tem chave e IV próprios", async () => {
    const a = await sealGift(GIFT);
    const b = await sealGift(GIFT);
    expect(a.key).not.toBe(b.key);
    expect(a.iv).not.toBe(b.iv);
  });

  it("não abre com a chave de outro presente", async () => {
    const { iv, ciphertext } = await sealGift(GIFT);
    const other = await sealGift(GIFT);
    expect(await openGift({ iv, ciphertext }, other.key)).toBeNull();
  });

  it("não abre se o texto cifrado foi mexido", async () => {
    const { key, iv, ciphertext } = await sealGift(GIFT);
    const bytes = fromBase64Url(ciphertext)!;
    bytes[0] ^= 1;
    expect(await openGift({ iv, ciphertext: toBase64Url(bytes) }, key)).toBeNull();
  });

  it("não abre com chave ou IV malformados", async () => {
    const { key, iv, ciphertext } = await sealGift(GIFT);
    expect(await openGift({ iv, ciphertext }, "")).toBeNull();
    expect(await openGift({ iv, ciphertext }, key.slice(0, 10))).toBeNull();
    expect(await openGift({ iv: "!!", ciphertext }, key)).toBeNull();
  });
});
