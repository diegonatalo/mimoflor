import { describe, expect, it } from "vitest";
import { GIFT_LIMITS, parseGift, serializeGift, type Gift } from "@/lib/gift";

const GIFT: Gift = {
  flower: { kind: "colombian", color: "blue" },
  to: "Ana",
  note: "Lembrei de você hoje.",
};

describe("parseGift", () => {
  it("lê de volta o que foi serializado", () => {
    expect(parseGift(JSON.parse(serializeGift(GIFT)))).toEqual(GIFT);
  });

  it("tira os espaços das pontas", () => {
    const gift = parseGift({ v: 1, flower: { kind: "lily", color: "red" }, to: "  Bia ", note: " Oi " });
    expect(gift).toEqual({ flower: { kind: "lily", color: "red" }, to: "Bia", note: "Oi" });
  });

  it("os primeiros links, que ainda levam uma frase, continuam abrindo", () => {
    const gift = parseGift({ ...GIFT, v: 1, message: "Uma flor para alegrar o seu dia" });
    expect(gift).toEqual(GIFT);
  });

  it("o buquê guarda a cor das rosas", () => {
    const gift = parseGift({ v: 1, flower: { kind: "bouquet", color: "blue" }, to: "", note: "" });
    expect(gift?.flower).toEqual({ kind: "bouquet", color: "blue" });
  });

  it("só as rosas guardam a cor", () => {
    const gift = parseGift({ v: 1, flower: { kind: "sunflower", color: "blue" }, to: "", note: "" });
    expect(gift?.flower).toEqual({ kind: "sunflower", color: "red" });
  });

  it.each([
    ["sem versão", { ...GIFT }],
    ["versão desconhecida", { ...GIFT, v: 2 }],
    ["flor que não existe", { ...GIFT, v: 1, flower: { kind: "tulipa", color: "red" } }],
    ["cor que não existe", { ...GIFT, v: 1, flower: { kind: "rose", color: "verde" } }],
    ["nome grande demais", { ...GIFT, v: 1, to: "a".repeat(GIFT_LIMITS.to + 1) }],
    ["bilhete grande demais", { ...GIFT, v: 1, note: "a".repeat(GIFT_LIMITS.note + 1) }],
    ["campo que não é texto", { ...GIFT, v: 1, note: 42 }],
  ])("recusa %s", (_, value) => {
    expect(parseGift(value)).toBeNull();
  });

  it("recusa o que nem é objeto", () => {
    expect(parseGift(null)).toBeNull();
    expect(parseGift("flor")).toBeNull();
  });
});
