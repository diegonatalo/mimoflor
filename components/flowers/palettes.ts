import type { FlowerColor } from "@/lib/flowers";

/** [base, meio, ponta] de cada camada da rosa nacional, de fora para dentro. */
type Stops = readonly [string, string, string];

export type RosePalette = {
  layers: readonly [Stops, Stops, Stops, Stops];
  outline: string;
  rim: string;
  center: string;
};

export const ROSE: Record<FlowerColor, RosePalette> = {
  red: {
    layers: [
      ["#6E0A26", "#C8173F", "#FF8DA3"],
      ["#5C0820", "#B8143A", "#FA6F8B"],
      ["#4C061B", "#A11236", "#EE5274"],
      ["#3B0414", "#861030", "#D9395D"],
    ],
    outline: "#3A0512",
    rim: "#FFD6DD",
    center: "#2A030E",
  },
  blue: {
    layers: [
      ["#0D2366", "#2C5FD9", "#9CC6FF"],
      ["#0B1E58", "#2553C6", "#7DB1FF"],
      ["#09184A", "#1E46AE", "#6299F0"],
      ["#071238", "#183A90", "#4A80DE"],
    ],
    outline: "#06123A",
    rim: "#DCEBFF",
    center: "#050C2A",
  },
};

/** Rosa colombiana: ponta, meio, base e sombra da taça, mais o brilho da borda. */
export type ColombianPalette = { tip: string; mid: string; base: string; deep: string; rim: string };

export const COLOMBIAN: Record<FlowerColor, ColombianPalette> = {
  red: { tip: "#E3304B", mid: "#9E0620", base: "#4A000C", deep: "#2C0007", rim: "#FF97A4" },
  blue: { tip: "#4D8BFF", mid: "#1A47B8", base: "#071A55", deep: "#030C33", rim: "#A9CBFF" },
};
