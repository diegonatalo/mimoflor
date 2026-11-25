import { describe, expect, it } from "vitest";
import { INITIAL_DRAFT, choiceOf, giftFromDraft } from "@/lib/creator";
import { DEFAULT_MESSAGE } from "@/lib/gift";

describe("choiceOf", () => {
  it("a rosa usa o tipo e a cor escolhidos", () => {
    expect(choiceOf({ picker: "rose", roseKind: "rose", color: "blue" })).toEqual({ kind: "rose", color: "blue" });
  });

  it("as outras flores ignoram a cor da rosa", () => {
    expect(choiceOf({ picker: "lily", roseKind: "colombian", color: "blue" })).toEqual({ kind: "lily", color: "red" });
  });
});

describe("giftFromDraft", () => {
  it("limpa os espaços e usa a frase padrão quando ela fica vazia", () => {
    const gift = giftFromDraft({ ...INITIAL_DRAFT, to: "  Ana ", message: "   " });
    expect(gift).toEqual({ flower: { kind: "colombian", color: "red" }, to: "Ana", message: DEFAULT_MESSAGE, note: "" });
  });

  it("o bilhete só vai quando está ligado", () => {
    const draft = { ...INITIAL_DRAFT, note: "Lembrei de você." };
    expect(giftFromDraft(draft).note).toBe("");
    expect(giftFromDraft({ ...draft, noteOn: true }).note).toBe("Lembrei de você.");
  });
});
