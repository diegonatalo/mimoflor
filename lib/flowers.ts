/** As flores do Mimoflor (e o buquê): o que existe, como se chamam e quanto tempo levam para abrir. */

export type FlowerKind = "rose" | "colombian" | "sunflower" | "hydrangea" | "lily" | "bouquet";
export type FlowerColor = "red" | "blue";

/** A flor escolhida. A cor só vale para as rosas e o buquê; as outras ficam com `red`, a cor padrão. */
export type FlowerChoice = { kind: FlowerKind; color: FlowerColor };

export const FLOWER_KINDS: FlowerKind[] = ["rose", "colombian", "sunflower", "hydrangea", "lily", "bouquet"];
export const FLOWER_COLORS: FlowerColor[] = ["red", "blue"];

/** As escolhas do seletor; a rosa abre as opções de tipo e cor, e o buquê, a cor das rosas. */
export type PickerFlower = "rose" | "sunflower" | "hydrangea" | "lily" | "bouquet";

export const PICKER: { id: PickerFlower; label: string }[] = [
  { id: "rose", label: "Rosa" },
  { id: "sunflower", label: "Girassol" },
  { id: "hydrangea", label: "Hortênsia" },
  { id: "lily", label: "Lírio" },
  { id: "bouquet", label: "Buquê" },
];

export const ROSE_KINDS: { id: "rose" | "colombian"; label: string }[] = [
  { id: "rose", label: "Nacional" },
  { id: "colombian", label: "Colombiana" },
];

export const ROSE_COLORS: { id: FlowerColor; label: string }[] = [
  { id: "red", label: "Vermelha" },
  { id: "blue", label: "Azul" },
];

export const isRose = (kind: FlowerKind) => kind === "rose" || kind === "colombian";

/** Flores em que a pessoa escolhe a cor: as rosas e o buquê (a cor das rosas dele). */
export const hasColor = (kind: FlowerKind) => isRose(kind) || kind === "bouquet";

/** Qual item do seletor fica marcado para uma flor. */
export const pickerOf = (kind: FlowerKind): PickerFlower => (isRose(kind) ? "rose" : kind);

/** Nome da flor por extenso, como aparece na tela e no leitor de tela. */
export const flowerName = ({ kind, color }: FlowerChoice): string => {
  const tint = color === "blue" ? "azul" : "vermelha";
  switch (kind) {
    case "rose":
      return `Rosa ${tint}`;
    case "colombian":
      return `Rosa colombiana ${tint}`;
    case "sunflower":
      return "Girassol";
    case "hydrangea":
      return "Hortênsia azul";
    case "lily":
      return "Lírio branco";
    case "bouquet":
      return `Buquê com rosas ${color === "blue" ? "azuis" : "vermelhas"}`;
  }
};

/** Segundos até a flor terminar de abrir. O bilhete surpresa aparece depois disso. */
export const BLOOM_SECONDS: Record<FlowerKind, number> = {
  rose: 3.2,
  colombian: 2.8,
  sunflower: 3.2,
  hydrangea: 3.4,
  lily: 2.8,
  bouquet: 3,
};
