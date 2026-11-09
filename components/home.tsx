"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Flower } from "./flower";
import { FlowerOptions } from "./flower-options";
import { FlowerPicker } from "./flower-picker";
import {
  FLOWERS,
  defaultSelection,
  type FlowerType,
  type Selection,
} from "./flowers/registry";
import { Footer } from "./footer";
import { writeFlowerUrl, type FlowerUrl } from "../lib/flower-url";
import { RomanticMessage } from "./message";
import { Stage } from "./stage";

/* a flor ocupa o que sobra depois da frase, do seletor, das opções e do rodapé */
const getSize = () => {
  const heightBudget = Math.max(270, window.innerHeight - 350);
  return Math.min(380, window.innerWidth - 32, (heightBudget * 320) / 380);
};

const subscribeToResize = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
};

/* no servidor não há janela: usa o tamanho máximo e o navegador ajusta ao hidratar */
const SERVER_SIZE = 380;

const useFlowerSize = () =>
  useSyncExternalStore(subscribeToResize, getSize, () => SERVER_SIZE);

const DEFAULT_FLOWER: FlowerType = "hydrangea";

/** Estado inicial: a flor da URL (se houver) por cima dos padrões. */
const initialState = (fromUrl: FlowerUrl) => {
  const selections = Object.fromEntries(
    (Object.keys(FLOWERS) as FlowerType[]).map((type) => [
      type,
      defaultSelection(type),
    ]),
  ) as Record<FlowerType, Selection>;

  if (fromUrl.status !== "flower") return { flower: DEFAULT_FLOWER, selections };

  selections[fromUrl.flower] = fromUrl.selection;
  return { flower: fromUrl.flower, selections };
};

export default function Home({ url }: { url: FlowerUrl }) {
  const [initial] = useState(() => initialState(url));
  const [flower, setFlower] = useState<FlowerType>(initial.flower);
  const [selections, setSelections] = useState(initial.selections);
  /* sempre a última escolha, mesmo entre dois toques antes de redesenhar */
  const latest = useRef(initial.selections);
  const size = useFlowerSize();

  const selection = selections[flower];
  const groups = FLOWERS[flower].options;
  const { theme } = FLOWERS[flower].view(selection);

  const changeFlower = (type: FlowerType) => {
    setFlower(type);
    writeFlowerUrl(type, latest.current[type]);
  };

  const changeOption = (groupId: string, value: string) => {
    const next = {
      ...latest.current,
      [flower]: { ...latest.current[flower], [groupId]: value },
    };
    latest.current = next;
    setSelections(next);
    writeFlowerUrl(flower, next[flower]);
  };

  return (
    <Stage theme={theme}>
      {/* a chave faz a flor nascer de novo ao trocar de flor ou de opção */}
      <Flower
        key={`${flower}-${Object.values(selection).join("-")}`}
        type={flower}
        selection={selection}
        size={size}
      />
      <RomanticMessage />
      <FlowerPicker value={flower} onChange={changeFlower} />

      {/* espaço reservado, para o layout não pular ao trocar de flor */}
      <div className="options-slot">
        {groups && (
          <FlowerOptions
            groups={groups}
            selection={selection}
            onChange={changeOption}
          />
        )}
      </div>

      <Footer />
    </Stage>
  );
}
