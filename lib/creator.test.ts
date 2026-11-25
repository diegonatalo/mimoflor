import { describe, expect, it } from "vitest";
import { INITIAL_DRAFT, choiceOf, giftFromDraft } from "@/lib/creator";

describe("choiceOf", () => {
  it("a rosa usa o tipo e a cor escolhidos", () => {
    expect(choiceOf({ picker: "rose", roseKind: "rose", color: "blue" })).toEqual({ kind: "rose", color: "blue" });
  });

  it("as outras flores ignoram a cor da rosa", () => {
    expect(choiceOf({ picker: "lily", roseKind: "colombian", color: "blue" })).toEqual({ kind: "lily", color: "red" });
  });
});

describe("giftFromDraft", () => {
  it("leva a flor da tela e limpa os espaços do nome e do bilhete", () => {
    const gift = giftFromDraft({ ...INITIAL_DRAFT, to: "  Ana ", note: "  Lembrei de você. " });
    expect(gift).toEqual({ flower: { kind: "colombian", color: "red" }, to: "Ana", note: "Lembrei de você." });
  });

  it("sem bilhete, vai só a flor", () => {
    expect(giftFromDraft(INITIAL_DRAFT)).toEqual({ flower: { kind: "colombian", color: "red" }, to: "", note: "" });
  });
});
