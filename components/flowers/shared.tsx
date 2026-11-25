import type { CSSProperties, ReactNode } from "react";

/** Variáveis CSS num `style` (o React não tipa `--nome`). */
export const vars = (values: Record<string, string | number>) => values as CSSProperties;

type GrowProps = {
  /** segundo em que a peça começa a crescer */
  at: number;
  /** ponto de onde ela cresce, em % da própria caixa (padrão: a base) */
  origin?: string;
  children: ReactNode;
};

/** Uma peça que nasce (pétala, folha, florzinha): cresce a partir da base no segundo `at`. */
export const Grow = ({ at, origin = "50% 100%", children }: GrowProps) => (
  <g className="fl-grow" style={vars({ "--t": at, "--o": origin })}>
    {children}
  </g>
);

/** Aparece aos poucos no segundo `at` (sementes, estames). */
export const Fade = ({ at, children }: { at: number; children: ReactNode }) => (
  <g className="fl-fade" style={vars({ "--t": at })}>
    {children}
  </g>
);

export const LeafGradient = ({ id }: { id: string }) => (
  <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stopColor="#2A5A3B" />
    <stop offset="1" stopColor="#6FB27D" />
  </linearGradient>
);

/** Caule desenhado de baixo para cima, com um filete de luz. */
export const Stem = ({ d, width = 7 }: { d: string; width?: number }) => (
  <g>
    <path className="fl-stem" pathLength={1} d={d} stroke="#3B7350" strokeWidth={width} strokeLinecap="round" fill="none" />
    <path
      className="fl-stem"
      pathLength={1}
      d={d}
      stroke="#7DB98A"
      strokeOpacity={0.45}
      strokeWidth={width / 3}
      strokeLinecap="round"
      fill="none"
      transform="translate(-1.5 0)"
    />
  </g>
);

type LeafProps = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  /** achatamento vertical (folhas longas, como as do lírio) */
  scaleY?: number;
  fill: string;
  at: number;
};

/** Folha apontando para `rotate` graus, presa ao caule em (x, y). */
export const Leaf = ({ x, y, rotate, scale, scaleY = scale, fill, at }: LeafProps) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale} ${scaleY})`}>
    <Grow at={at} origin="0% 50%">
      <path d="M0,0 C20,-20 56,-22 80,-4 C56,12 22,14 0,0Z" fill={fill} />
      <path
        d="M3,0 C26,-6 52,-7 77,-4"
        stroke="#1E4A2E"
        strokeOpacity={0.4}
        strokeWidth={1.3}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </Grow>
  </g>
);

/** Props de todo desenho de flor: `uid` separa os degradês de duas flores na mesma página. */
export type DrawingProps = { uid: string; color: "red" | "blue" };
