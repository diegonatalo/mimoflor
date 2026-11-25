import { lilyStamens } from "@/lib/flower-geometry";
import { Fade, Grow, Leaf, LeafGradient, Stem, type DrawingProps } from "./shared";

const CX = 160;
const CY = 146;
const BACK = "M0,0 C-30,-26 -34,-76 -9,-106 C-4,-112 4,-112 9,-106 C34,-76 30,-26 0,0Z";
const FRONT = "M0,0 C-24,-28 -27,-76 -6,-108 C-3,-112 3,-112 6,-108 C27,-76 24,-28 0,0Z";
const STAMENS = lilyStamens(CX, CY);

/** As três de trás abrem primeiro, intercaladas com as três da frente. */
const TEPALS = [
  { rotate: 0, d: BACK },
  { rotate: 120, d: BACK },
  { rotate: 240, d: BACK },
  { rotate: 60, d: FRONT },
  { rotate: 180, d: FRONT },
  { rotate: 300, d: FRONT },
];

/** Lírio branco: seis pétalas com sardas leves e estames cor de ferrugem. */
export const Lily = ({ uid }: DrawingProps) => (
  <>
    <defs>
      <LeafGradient id={`${uid}-leaf`} />
      <linearGradient id={`${uid}-lw`} x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0" stopColor="#CFE3B0" />
        <stop offset="0.32" stopColor="#EFF5E7" />
        <stop offset="1" stopColor="#FFFFFF" />
      </linearGradient>
    </defs>
    <Stem d="M160,190 C155,262 167,330 160,400" />
    <Leaf x={158} y={268} rotate={200} scale={1.5} scaleY={0.6} fill={`url(#${uid}-leaf)`} at={0.5} />
    <Leaf x={162} y={312} rotate={-28} scale={1.45} scaleY={0.58} fill={`url(#${uid}-leaf)`} at={0.65} />
    <Leaf x={158} y={352} rotate={196} scale={1.2} scaleY={0.55} fill={`url(#${uid}-leaf)`} at={0.8} />
    <g transform={`rotate(-8 ${CX} ${CY})`}>
      {TEPALS.map((tepal, i) => (
        <g key={tepal.rotate} transform={`translate(${CX} ${CY}) rotate(${tepal.rotate})`}>
          <Grow at={1 + i * 0.18}>
            <path d={tepal.d} fill={`url(#${uid}-lw)`} stroke="#C9C1D8" strokeWidth={1.2} />
            <path d="M0,-8 C-2,-40 -2,-72 0,-100" stroke="#CFE0BC" strokeWidth={1.6} fill="none" strokeLinecap="round" />
            <circle cx={-6} cy={-24} r={1.3} fill="#E3A1B5" fillOpacity={0.8} />
            <circle cx={5} cy={-31} r={1.2} fill="#E3A1B5" fillOpacity={0.7} />
            <circle cx={-3} cy={-39} r={1} fill="#E3A1B5" fillOpacity={0.6} />
          </Grow>
        </g>
      ))}
      <Fade at={2.1}>
        <circle cx={CX} cy={CY} r={13} fill="#DCEAB8" fillOpacity={0.85} />
        {STAMENS.map((stamen) => (
          <g key={stamen.path}>
            <path d={stamen.path} stroke="#D9E6C8" strokeWidth={1.6} fill="none" />
            <ellipse cx={stamen.x} cy={stamen.y} rx={7} ry={2.6} transform={`rotate(${stamen.angle} ${stamen.x} ${stamen.y})`} fill="#B8561F" />
          </g>
        ))}
        <path d={`M${CX},${CY} Q${CX + 10},${CY - 34} ${CX + 22},${CY - 64}`} stroke="#C6D9A6" strokeWidth={2.2} fill="none" strokeLinecap="round" />
        <circle cx={CX + 22} cy={CY - 65} r={3.6} fill="#9DB46A" />
      </Fade>
    </g>
  </>
);
