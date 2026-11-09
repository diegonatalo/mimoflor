import {
  FLOWERS,
  defaultSelection,
  type FlowerType,
  type Selection,
} from "../components/flowers/registry";

const FLOWER_PARAM = "flor";

const types = Object.keys(FLOWERS) as FlowerType[];

export type FlowerUrl =
  /** sem `flor` na URL: abre a flor padrão */
  | { status: "default" }
  /** `flor`, `tipo` ou `cor` com um valor que não existe */
  | { status: "invalid" }
  | { status: "flower"; flower: FlowerType; selection: Selection };

/** Lê a flor e as opções da URL (ex.: `?flor=rosa&tipo=colombiana&cor=azul`).
    Só os parâmetros do site são validados: os demais (como `utm_source` ou
    `fbclid`, que as redes sociais acrescentam) são ignorados. */
export const readFlowerUrl = (search: string): FlowerUrl => {
  const params = new URLSearchParams(search);
  if (!params.has(FLOWER_PARAM)) return { status: "default" };

  const slug = params.get(FLOWER_PARAM)?.toLowerCase();
  const flower = types.find((type) => FLOWERS[type].slug === slug);
  if (!flower) return { status: "invalid" };

  const selection = defaultSelection(flower);
  for (const group of FLOWERS[flower].options ?? []) {
    if (!params.has(group.param)) continue;

    const wanted = params.get(group.param)?.toLowerCase();
    const choice = group.choices.find((c) => c.slug === wanted);
    if (!choice) return { status: "invalid" };
    selection[group.id] = choice.value;
  }

  return { status: "flower", flower, selection };
};

/** Escreve a flor e as opções escolhidas na URL, sem criar entrada no histórico. */
export const writeFlowerUrl = (flower: FlowerType, selection: Selection) => {
  const params = new URLSearchParams({ [FLOWER_PARAM]: FLOWERS[flower].slug });

  for (const group of FLOWERS[flower].options ?? []) {
    const choice = group.choices.find((c) => c.value === selection[group.id]);
    if (choice) params.set(group.param, choice.slug);
  }

  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}?${params.toString()}`,
  );
};
