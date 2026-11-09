export type RoseColor = "red" | "blue";

/** [base, meio, ponta] de um gradiente vertical de pétala */
type Stops = readonly [string, string, string];

type RosePalette = {
  /** gradientes das camadas, de fora para dentro */
  layers: readonly Stops[];
  /** contorno escuro de cada pétala */
  outline: string;
  /** brilho na borda da pétala */
  rim: string;
  /** espiral do miolo */
  spiral: string;
};

/** Rosa nacional (vista de cima) */
export const ROSE_PALETTES: Record<RoseColor, RosePalette> = {
  red: {
    layers: [
      ["#5a0820", "#be123c", "#ff8fa3"],
      ["#4c0519", "#b0113a", "#fb6f8a"],
      ["#450a1a", "#9f1239", "#f0516f"],
      ["#3b0614", "#8a0f33", "#d93a5c"],
      ["#2d040f", "#6f0f2e", "#b12449"],
    ],
    outline: "#2d040f",
    rim: "#ffe4e6",
    spiral: "#1f0309",
  },
  blue: {
    layers: [
      ["#0b1d5e", "#2457d6", "#8fc0ff"],
      ["#0a1950", "#1f4fc4", "#74abff"],
      ["#081644", "#1b45ad", "#5f98f3"],
      ["#06113a", "#163a94", "#4a82e0"],
      ["#040c2a", "#102c76", "#356bc4"],
    ],
    outline: "#030b2b",
    rim: "#e0eeff",
    spiral: "#020822",
  },
};

/** Rosa colombiana (taça alta, vista de lado) */
export const COLOMBIAN_PALETTES: Record<RoseColor, RosePalette> = {
  red: {
    layers: [
      ["#1e0006", "#62000e", "#9d001a"],
      ["#2a0008", "#85001a", "#c40f2e"],
      ["#190005", "#6b0010", "#a8081f"],
      ["#2f0009", "#98001a", "#dc2039"],
    ],
    outline: "#1a0004",
    rim: "#ff8a98",
    spiral: "#12000a",
  },
  blue: {
    layers: [
      ["#020a2a", "#0a2a80", "#1747c2"],
      ["#030e38", "#0f3aa6", "#2a6af0"],
      ["#020822", "#0a2575", "#1c52cf"],
      ["#04123f", "#1244b4", "#4a8cff"],
    ],
    outline: "#010518",
    rim: "#9ec5ff",
    spiral: "#010414",
  },
};
