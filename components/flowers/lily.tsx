import { lilyStamens } from "@/lib/flower-geometry";
import { Fade, Grow, Leaf, LeafGradient, Stem, type DrawingProps } from "./shared";

const CX = 160;
const CY = 146;
const BACK = "M0,0 C-30,-26 -34,-76 -9,-106 C-4,-112 4,-112 9,-106 C34,-76 30,-26 0,0Z";
const FRONT = "M0,0 C-24,-28 -27,-76 -6,-108 C-3,-112 3,-112 6,-108 C27,-76 24,-28 0,0Z";
const STAMENS = lilyStamens(0, 0);

/** As três de trás abrem primeiro, intercaladas com as três da frente. */
const TEPALS = [
  { rotate: 0, d: BACK },
  { rotate: 120, d: BACK },
  { rotate: 240, d: BACK },
  { rotate: 60, d: FRONT },
  { rotate: 180, d: FRONT },
  { rotate: 300, d: FRONT },
];

/** Degradê das pétalas do lírio, com id `id`. */
export const LilyGradient = ({ id }: { id: string }) => (
  <linearGradient id={id} x1="0.5" y1="1" x2="0.5" y2="0">
    <stop offset="0" stopColor="#CFE3B0" />
    <stop offset="0.32" stopColor="#EFF5E7" />
    <stop offset="1" stopColor="#FFFFFF" />
  </linearGradient>
);

/** Cabeça do lírio, centrada em (0, 0): seis pétalas e, por último, os estames. */
export const LilyHead = ({ id, at, step = 0.18 }: { id: string; at: number; step?: number }) => (
  <>
    {TEPALS.map((tepal, i) => (
      <g key={tepal.rotate} transform={`rotate(${tepal.rotate})`}>
        <Grow at={at + i * step}>
          <path d={tepal.d} fill={`url(#${id})`} stroke="#C9C1D8" strokeWidth={1.2} />
          <path d="M0,-8 C-2,-40 -2,-72 0,-100" stroke="#CFE0BC" strokeWidth={1.6} fill="none" strokeLinecap="round" />
          <circle cx={-6} cy={-24} r={1.3} fill="#E3A1B5" fillOpacity={0.8} />
          <circle cx={5} cy={-31} r={1.2} fill="#E3A1B5" fillOpacity={0.7} />
          <circle cx={-3} cy={-39} r={1} fill="#E3A1B5" fillOpacity={0.6} />
        </Grow>
      </g>
    ))}
    <Fade at={at + 6 * step}>
      <circle r={13} fill="#DCEAB8" fillOpacity={0.85} />
      {STAMENS.map((stamen) => (
        <g key={stamen.path}>
          <path d={stamen.path} stroke="#D9E6C8" strokeWidth={1.6} fill="none" />
          <ellipse cx={stamen.x} cy={stamen.y} rx={7} ry={2.6} transform={`rotate(${stamen.angle} ${stamen.x} ${stamen.y})`} fill="#B8561F" />
        </g>
      ))}
      <path d="M0,0 Q10,-34 22,-64" stroke="#C6D9A6" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <circle cx={22} cy={-65} r={3.6} fill="#9DB46A" />
    </Fade>
  </>
);

/** Lírio branco: seis pétalas com sardas leves e estames cor de ferrugem. */
export const Lily = ({ uid }: DrawingProps) => (
  <>
    <defs>
      <LeafGradient id={`${uid}-leaf`} />
      <LilyGradient id={`${uid}-lw`} />
    </defs>
    <Stem d="M160,190 C155,262 167,330 160,400" />
    <Leaf x={158} y={268} rotate={200} scale={1.5} scaleY={0.6} fill={`url(#${uid}-leaf)`} at={0.5} />
    <Leaf x={162} y={312} rotate={-28} scale={1.45} scaleY={0.58} fill={`url(#${uid}-leaf)`} at={0.65} />
    <Leaf x={158} y={352} rotate={196} scale={1.2} scaleY={0.55} fill={`url(#${uid}-leaf)`} at={0.8} />
    <g transform={`translate(${CX} ${CY}) rotate(-8)`}>
      <LilyHead id={`${uid}-lw`} at={1} />
    </g>
  </>
);
