import type { ReactNode } from "react";
import { rnd, vars } from "./utils";

/* ---------------------------------------------------------
   DEFS COMPARTILHADOS
--------------------------------------------------------- */

export const CommonDefs = () => (
  <>
    <linearGradient
      id="stemGrad"
      gradientUnits="userSpaceOnUse"
      x1="120"
      y1="0"
      x2="200"
      y2="0"
    >
      <stop offset="0" stopColor="#14532d" />
      <stop offset="0.38" stopColor="#15803d" />
      <stop offset="0.55" stopColor="#4ade80" />
      <stop offset="1" stopColor="#14532d" />
    </linearGradient>

    <linearGradient id="leafGrad" x1="0" y1="1" x2="0.2" y2="0">
      <stop offset="0" stopColor="#14532d" />
      <stop offset="0.5" stopColor="#16a34a" />
      <stop offset="1" stopColor="#4ade80" />
    </linearGradient>

    <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#54392a" />
      <stop offset="1" stopColor="#1c130e" />
    </linearGradient>

    <radialGradient id="groundShadow">
      <stop offset="0" stopColor="#000" stopOpacity="0.6" />
      <stop offset="1" stopColor="#000" stopOpacity="0" />
    </radialGradient>

    <radialGradient id="softLight">
      <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
      <stop offset="1" stopColor="#fff" stopOpacity="0" />
    </radialGradient>

    <filter id="headShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow
        dx="0"
        dy="5"
        stdDeviation="5"
        floodColor="#000"
        floodOpacity="0.4"
      />
    </filter>
  </>
);

/* ---------------------------------------------------------
   CHÃO
--------------------------------------------------------- */

const BLADES = [
  { d: "M104 362 C100 346 104 334 112 322 C112 336 114 350 118 362Z", t: 0.5 },
  { d: "M126 362 C126 350 130 342 136 334 C134 345 136 354 138 362Z", t: 0.65 },
  { d: "M198 362 C202 350 208 342 216 336 C212 346 210 354 210 362Z", t: 0.6 },
  { d: "M216 362 C222 348 230 338 240 330 C234 342 232 352 230 362Z", t: 0.75 },
];

export const Ground = () => (
  <g aria-hidden="true">
    <ellipse
      cx="160"
      cy="362"
      rx="112"
      ry="14"
      fill="url(#groundShadow)"
      className="ground-shadow"
    />
    <path
      className="mound"
      d="M78 366 C96 350 128 344 160 344 C192 344 224 350 242 366 Z"
      fill="url(#soilGrad)"
    />
    {BLADES.map((b, i) => (
      <path
        key={i}
        className="blade"
        d={b.d}
        fill="url(#leafGrad)"
        style={vars({ "--d": b.t })}
      />
    ))}
  </g>
);

/* ---------------------------------------------------------
   CAULE
--------------------------------------------------------- */

type StemProps = { d: string; width: number; delay?: number };

export const Stem = ({ d, width, delay = 0.2 }: StemProps) => (
  <g style={vars({ "--d": delay })}>
    <path
      className="stem-main"
      d={d}
      pathLength={1}
      fill="none"
      stroke="url(#stemGrad)"
      strokeWidth={width}
      strokeLinecap="round"
    />
    <path
      className="stem-main"
      d={d}
      pathLength={1}
      fill="none"
      stroke="#bbf7d0"
      strokeOpacity={0.28}
      strokeWidth={width * 0.16}
      strokeLinecap="round"
      transform={`translate(${-width * 0.18} 0)`}
    />
  </g>
);

/* ---------------------------------------------------------
   FOLHAS
--------------------------------------------------------- */

type LeafKind = "heart" | "ovate" | "lance";

const LEAF_BODY: Record<LeafKind, string> = {
  heart:
    "M0 0 C-30 -10 -52 -50 -32 -86 C-22 -104 -6 -108 0 -120 C6 -108 22 -104 32 -86 C52 -50 30 -10 0 0Z",
  ovate:
    "M0 0 C-34 -8 -46 -52 -22 -82 C-14 -92 -6 -98 0 -108 C6 -98 14 -92 22 -82 C46 -52 34 -8 0 0Z",
  lance:
    "M0 0 C-11 -30 4 -84 34 -122 C16 -84 18 -38 8 -2Z",
};

const LEAF_VEINS: Record<LeafKind, string> = {
  heart:
    "M0 0 L0 -112 M0 -30 L-26 -50 M0 -30 L26 -50 M0 -56 L-30 -78 M0 -56 L30 -78 M0 -82 L-18 -98 M0 -82 L18 -98",
  ovate:
    "M0 0 L0 -100 M0 -28 L-22 -46 M0 -28 L22 -46 M0 -52 L-24 -70 M0 -52 L24 -70 M0 -76 L-13 -88 M0 -76 L13 -88",
  lance: "M3 -2 C6 -40 18 -86 32 -118",
};

type LeafProps = {
  x: number;
  y: number;
  angle: number;
  scale?: number;
  flip?: boolean;
  delay: number;
  kind: LeafKind;
};

export const Leaf = ({
  x,
  y,
  angle,
  scale = 1,
  flip = false,
  delay,
  kind,
}: LeafProps) => (
  <g
    transform={`translate(${x} ${y}) rotate(${angle}) scale(${flip ? -scale : scale} ${scale})`}
  >
    <g className="leaf" style={vars({ "--d": delay })}>
      {kind !== "lance" && (
        <path
          d="M0 2 L0 -14"
          stroke="#15803d"
          strokeWidth={3.4}
          strokeLinecap="round"
        />
      )}
      <g transform={kind === "lance" ? undefined : "translate(0 -12)"}>
        <path d={LEAF_BODY[kind]} fill="url(#leafGrad)" />
        <path
          d={LEAF_VEINS[kind]}
          fill="none"
          stroke="#dcfce7"
          strokeOpacity={0.32}
          strokeWidth={1.3}
          strokeLinecap="round"
        />
      </g>
    </g>
  </g>
);

/* ---------------------------------------------------------
   BRILHOS
--------------------------------------------------------- */

const SPARKLE =
  "M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8Z";

type SparklesProps = { x: number; y: number; r: number; start: number };

export const Sparkles = ({ x, y, r, start }: SparklesProps) => (
  <g aria-hidden="true" fill="currentColor">
    {Array.from({ length: 7 }, (_, i) => {
      const a = (-90 + (i - 3) * 38 + (rnd(i) - 0.5) * 20) * (Math.PI / 180);
      const dist = r * (0.95 + rnd(i + 20) * 0.35);
      return (
        <g
          key={i}
          transform={`translate(${x + Math.cos(a) * dist} ${y + Math.sin(a) * dist * 0.95}) scale(${0.7 + rnd(i + 5) * 0.7})`}
        >
          <path
            className="sparkle"
            d={SPARKLE}
            style={vars({ "--d": start + i * 0.55 + rnd(i + 9) })}
          />
        </g>
      );
    })}
  </g>
);

/* ---------------------------------------------------------
   PÉTALA GENÉRICA
--------------------------------------------------------- */

type PetalProps = {
  angle: number;
  /** distância da base ao centro da flor */
  offset?: number;
  delay: number;
  /** escala inicial (flor "fechada") */
  s0?: number;
  /** rotação inicial, em graus */
  twist?: number;
  duration?: number;
  children: ReactNode;
};

export const Petal = ({
  angle,
  offset = 0,
  delay,
  s0 = 0,
  twist = 0,
  duration,
  children,
}: PetalProps) => (
  <g transform={`rotate(${angle}) translate(0 ${-offset})`}>
    <g
      className="petal"
      style={vars({
        "--d": delay,
        "--s0": s0,
        "--twist": `${twist}deg`,
        ...(duration ? { "--dur": `${duration}s` } : {}),
      })}
    >
      {children}
    </g>
  </g>
);
