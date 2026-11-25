// @vitest-environment node
import { describe, expect, it } from "vitest";
import { sealGift } from "@/lib/gift-crypto";
import { STORE_LIMITS, parseSealed } from "@/lib/sealed";

const gift = { flower: { kind: "lily", color: "red" }, to: "Ana", note: "Oi" } as const;

describe("parseSealed", () => {
  it("aceita um presente cifrado de verdade", async () => {
    const { iv, ciphertext } = await sealGift(gift);
    expect(parseSealed({ iv, ciphertext, extra: "ignorado" })).toEqual({ iv, ciphertext });
  });

  it("o maior presente possível cabe no limite", async () => {
    const big = { ...gift, to: "😀".repeat(40), note: "😀".repeat(280) };
    const { ciphertext } = await sealGift(big);
    expect(ciphertext.length).toBeLessThanOrEqual(STORE_LIMITS.ciphertext);
  });

  it.each([
    ["nada", null],
    ["texto", "flor"],
    ["sem IV", { ciphertext: "abcdefghijklmnopqrstuvwxyz" }],
    ["IV curto", { iv: "abc", ciphertext: "abcdefghijklmnopqrstuvwxyz" }],
    ["IV com caractere inválido", { iv: "abcdefghijklmno+", ciphertext: "abcdefghijklmnopqrstuvwxyz" }],
    ["texto cifrado curto demais", { iv: "abcdefghijklmnop", ciphertext: "abc" }],
    ["texto cifrado grande demais", { iv: "abcdefghijklmnop", ciphertext: "a".repeat(STORE_LIMITS.ciphertext + 4) }],
    ["texto cifrado que não é Base64URL", { iv: "abcdefghijklmnop", ciphertext: "não é base64 de jeito nenhum" }],
  ])("recusa %s", (_, value) => {
    expect(parseSealed(value)).toBeNull();
  });
});
