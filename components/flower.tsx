import { FLOWERS, type FlowerType, type Selection } from "./flowers/registry";
import { CommonDefs, Ground, Sparkles } from "./flowers/shared";
import { vars } from "./flowers/utils";
import "./flower.css";

type FlowerProps = {
  type?: FlowerType;
  /** opções escolhidas para a flor (tipo, cor...) */
  selection?: Selection;
  size?: number;
};

const VIEW_BOX = "0 0 320 380";

export function Flower({ type = "rose", selection = {}, size = 380 }: FlowerProps) {
  const flower = FLOWERS[type].view(selection);
  const height = (size * 380) / 320;

  return (
    <div
      className="flower-wrap"
      style={vars({
        "--bloom": `${flower.bloom}s`,
        width: size,
        height,
        color: flower.sparkle,
      })}
    >
      {/* O balanço é aplicado ao <svg> inteiro (camada própria na GPU), em vez
          de animar elementos dentro dele: dentro do SVG cada frame obrigaria o
          navegador a redesenhar todas as pétalas. */}
      <svg
        className="flower"
        viewBox={VIEW_BOX}
        width={size}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={flower.label}
      >
        <defs>
          <CommonDefs />
          {flower.defs}
        </defs>

        <Ground />

        <g className="plant">{flower.plant}</g>
      </svg>

      {/* Brilhos em camada separada, para piscarem sem repintar a flor */}
      <svg
        className="flower-sparkles"
        viewBox={VIEW_BOX}
        width={size}
        height={height}
        aria-hidden="true"
      >
        <Sparkles
          x={flower.head.x}
          y={flower.head.y}
          r={flower.head.r}
          start={flower.bloom + 2.4}
        />
      </svg>
    </div>
  );
}
