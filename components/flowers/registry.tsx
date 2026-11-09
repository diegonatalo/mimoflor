import type { ReactNode } from "react";
import { ColombianRoseDefs, ColombianRosePlant } from "./colombian-rose";
import { HydrangeaDefs, HydrangeaPlant } from "./hydrangea";
import { LilyDefs, LilyPlant } from "./lily";
import type { RoseColor } from "./palettes";
import { RoseDefs, RosePlant } from "./rose";
import { SunflowerDefs, SunflowerPlant } from "./sunflower";

export type FlowerType = "rose" | "sunflower" | "hydrangea" | "lily";

/** Escolhas feitas nas opções de uma flor: id do grupo -> valor escolhido. */
export type Selection = Record<string, string>;

export type OptionChoice = {
  value: string;
  /** texto usado na URL (ex.: "colombiana") */
  slug: string;
  label: string;
  /** se houver, a escolha aparece como uma bolinha com este fundo, em vez de texto */
  swatch?: string;
};

export type OptionGroup = {
  id: string;
  /** nome do parâmetro na URL (ex.: "tipo") */
  param: string;
  label: string;
  choices: OptionChoice[];
};

/** Tudo o que é preciso para desenhar uma flor com uma dada seleção. */
export type FlowerView = {
  label: string;
  /** nome do tema de cores (ver `.stage[data-flower]` em index.css) */
  theme: string;
  /** cor dos brilhos */
  sparkle: string;
  /** centro e raio da cabeça, para posicionar os brilhos */
  head: { x: number; y: number; r: number };
  /** segundo em que a flor começa a se abrir */
  bloom: number;
  defs: ReactNode;
  plant: ReactNode;
};

type FlowerConfig = {
  /** texto usado na URL (ex.: "hortensia") */
  slug: string;
  /** nome curto, para o seletor */
  name: string;
  /** fundo da bolinha no seletor */
  dot: string;
  options?: OptionGroup[];
  view: (selection: Selection) => FlowerView;
};

const SWATCH_RED = "radial-gradient(circle at 35% 30%, #fda4af, #e11d48 70%)";
const SWATCH_BLUE = "radial-gradient(circle at 35% 30%, #bfdbfe, #2457d6 70%)";

export const FLOWERS: Record<FlowerType, FlowerConfig> = {
  rose: {
    slug: "rosa",
    name: "Rosa",
    dot: SWATCH_RED,
    options: [
      {
        id: "kind",
        param: "tipo",
        label: "Tipo de rosa",
        choices: [
          { value: "national", slug: "nacional", label: "Nacional" },
          { value: "colombian", slug: "colombiana", label: "Colombiana" },
        ],
      },
      {
        id: "color",
        param: "cor",
        label: "Cor da rosa",
        choices: [
          { value: "red", slug: "vermelha", label: "Vermelha", swatch: SWATCH_RED },
          { value: "blue", slug: "azul", label: "Azul", swatch: SWATCH_BLUE },
        ],
      },
    ],
    view: (selection) => {
      const color: RoseColor = selection.color === "blue" ? "blue" : "red";
      const blue = color === "blue";

      if (selection.kind === "colombian") {
        return {
          label: blue ? "Rosa colombiana azul" : "Rosa colombiana vermelha",
          theme: blue ? "colombian-blue" : "colombian",
          sparkle: blue ? "#bfdbfe" : "#ffb3bd",
          head: { x: 160, y: 110, r: 96 },
          bloom: 1.9,
          defs: <ColombianRoseDefs color={color} />,
          plant: <ColombianRosePlant color={color} />,
        };
      }

      return {
        label: blue ? "Rosa azul" : "Rosa vermelha",
        theme: blue ? "rose-blue" : "rose",
        sparkle: blue ? "#bfdbfe" : "#fda4af",
        head: { x: 160, y: 120, r: 92 },
        bloom: 1.7,
        defs: <RoseDefs color={color} />,
        plant: <RosePlant color={color} />,
      };
    },
  },
  sunflower: {
    slug: "girassol",
    name: "Girassol",
    dot: "radial-gradient(circle at 35% 30%, #fde68a, #f59e0b 70%)",
    view: () => ({
      label: "Girassol",
      theme: "sunflower",
      sparkle: "#fde68a",
      head: { x: 160, y: 120, r: 100 },
      bloom: 2.6,
      defs: <SunflowerDefs />,
      plant: <SunflowerPlant />,
    }),
  },
  hydrangea: {
    slug: "hortensia",
    name: "Hortênsia",
    dot: "radial-gradient(circle at 35% 30%, #bfdbfe, #2563eb 70%)",
    view: () => ({
      label: "Hortênsia azul",
      theme: "hydrangea",
      sparkle: "#bfdbfe",
      head: { x: 160, y: 116, r: 92 },
      bloom: 1.9,
      defs: <HydrangeaDefs />,
      plant: <HydrangeaPlant />,
    }),
  },
  lily: {
    slug: "lirio",
    name: "Lírio",
    dot: "radial-gradient(circle at 35% 30%, #ffffff, #cbd5e1 75%)",
    view: () => ({
      label: "Lírio branco",
      theme: "lily",
      sparkle: "#f8fafc",
      head: { x: 160, y: 112, r: 100 },
      bloom: 2.8,
      defs: <LilyDefs />,
      plant: <LilyPlant />,
    }),
  },
};

/** Primeira escolha de cada grupo de opções de uma flor. */
export const defaultSelection = (type: FlowerType): Selection =>
  Object.fromEntries(
    (FLOWERS[type].options ?? []).map((group) => [
      group.id,
      group.choices[0].value,
    ]),
  );
