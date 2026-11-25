import { hasColor, type FlowerChoice, type FlowerColor, type PickerFlower } from "@/lib/flowers";
import type { Gift } from "@/lib/gift";

/** O que está na tela de criação, antes de virar presente. */
export type Draft = {
  picker: PickerFlower;
  roseKind: "rose" | "colombian";
  color: FlowerColor;
  to: string;
  note: string;
};

export const INITIAL_DRAFT: Draft = {
  picker: "rose",
  roseKind: "colombian",
  color: "red",
  to: "",
  note: "",
};

/** A flor que a tela está mostrando. */
export const choiceOf = (draft: Pick<Draft, "picker" | "roseKind" | "color">): FlowerChoice =>
  draft.picker === "rose"
    ? { kind: draft.roseKind, color: draft.color }
    : { kind: draft.picker, color: hasColor(draft.picker) ? draft.color : "red" };

/** O presente que vai ser cifrado. */
export const giftFromDraft = (draft: Draft): Gift => {
  const flower = choiceOf(draft);
  return {
    flower: { kind: flower.kind, color: hasColor(flower.kind) ? flower.color : "red" },
    to: draft.to.trim(),
    note: draft.note.trim(),
  };
};
