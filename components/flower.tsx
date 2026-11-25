import { useId, type ComponentType } from "react";
import { BLOOM_SECONDS, flowerName, type FlowerChoice, type FlowerKind } from "@/lib/flowers";
import { cn } from "@/lib/cn";
import { Bouquet } from "./flowers/bouquet";
import { ColombianRose } from "./flowers/colombian-rose";
import { Hydrangea } from "./flowers/hydrangea";
import { Lily } from "./flowers/lily";
import { Rose } from "./flowers/rose";
import { vars, type DrawingProps } from "./flowers/shared";
import { Sunflower } from "./flowers/sunflower";
import "./flower.css";

const DRAWINGS: Record<FlowerKind, ComponentType<DrawingProps>> = {
  rose: Rose,
  colombian: ColombianRose,
  sunflower: Sunflower,
  hydrangea: Hydrangea,
  lily: Lily,
  bouquet: Bouquet,
};

type FlowerProps = {
  flower: FlowerChoice;
  /** largura em px; sem ela, a largura vem da `className` (a altura é sempre 1,25 × a largura) */
  size?: number;
  /** sem animação (miniaturas do seletor, ícones) */
  still?: boolean;
  /** só enfeite: o leitor de tela não anuncia */
  decorative?: boolean;
  className?: string;
};

/**
 * Uma flor desenhada em SVG. Por padrão ela nasce: o caule sobe, as folhas abrem
 * e as pétalas se abrem uma a uma; depois balança devagar. Para nascer de novo,
 * troque a `key`. Quem prefere menos movimento vê a flor já aberta.
 */
export const Flower = ({ flower, size, still = false, decorative = false, className }: FlowerProps) => {
  // useId traz caracteres que não valem dentro de url(#...)
  const uid = `f${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const Drawing = DRAWINGS[flower.kind];
  return (
    <div
      className={cn("flower", still ? "flower-still" : "flower-bloom", className)}
      style={vars({
        ...(size ? { width: `${size}px` } : {}),
        aspectRatio: "4 / 5",
        "--sway-delay": `${BLOOM_SECONDS[flower.kind]}s`,
      })}
    >
      <svg
        viewBox="0 0 320 400"
        width="100%"
        height="100%"
        className="block overflow-visible"
        {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": flowerName(flower) })}
      >
        <Drawing uid={uid} color={flower.color} />
      </svg>
    </div>
  );
};
