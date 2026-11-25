import { isRose, type FlowerChoice, type FlowerColor, type PickerFlower } from "@/lib/flowers";
import { DEFAULT_MESSAGE, type Gift } from "@/lib/gift";

/** O que está na tela de criação, antes de virar presente. */
export type Draft = {
  picker: PickerFlower;
  roseKind: "rose" | "colombian";
  color: FlowerColor;
  to: string;
  message: string;
  noteOn: boolean;
  note: string;
};

export const INITIAL_DRAFT: Draft = {
  picker: "rose",
  roseKind: "colombian",
  color: "red",
  to: "",
  message: DEFAULT_MESSAGE,
  noteOn: false,
  note: "",
};

/** A flor que a tela está mostrando. */
export const choiceOf = (draft: Pick<Draft, "picker" | "roseKind" | "color">): FlowerChoice =>
  draft.picker === "rose" ? { kind: draft.roseKind, color: draft.color } : { kind: draft.picker, color: "red" };

/** O presente que vai ser cifrado. Com o bilhete desligado, o texto dele não vai junto. */
export const giftFromDraft = (draft: Draft): Gift => {
  const flower = choiceOf(draft);
  return {
    flower: { kind: flower.kind, color: isRose(flower.kind) ? flower.color : "red" },
    to: draft.to.trim(),
    message: draft.message.trim() || DEFAULT_MESSAGE,
    note: draft.noteOn ? draft.note.trim() : "",
  };
};
