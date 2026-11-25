import { ring, sunflowerSeeds } from "@/lib/flower-geometry";
import { Fade, Grow, Leaf, LeafGradient, Stem, type DrawingProps } from "./shared";

const CX = 160;
const CY = 140;
const PETAL = "M0,-34 C-16,-56 -14,-90 0,-104 C14,-90 16,-56 0,-34Z";
const BACK = ring(22, 360 / 44);
const FRONT = ring(22);
const SEEDS = sunflowerSeeds(CX, CY, 41);

/** Girassol: duas voltas de pétalas e o miolo com as sementes em espiral áurea. */
export const Sunflower = ({ uid }: DrawingProps) => (
  <>
    <defs>
      <LeafGradient id={`${uid}-leaf`} />
      <linearGradient id={`${uid}-sf`} x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0" stopColor="#E3930A" />
        <stop offset="1" stopColor="#FFD65C" />
      </linearGradient>
      <linearGradient id={`${uid}-sb`} x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0" stopColor="#B86A08" />
        <stop offset="1" stopColor="#EFA923" />
      </linearGradient>
      <radialGradient id={`${uid}-sc`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#2E1708" />
        <stop offset="0.7" stopColor="#4E2C0F" />
        <stop offset="1" stopColor="#6E4214" />
      </radialGradient>
    </defs>
    <Stem d="M160,186 C155,262 167,330 160,400" width={9} />
    <Leaf x={158} y={282} rotate={196} scale={1.2} fill={`url(#${uid}-leaf)`} at={0.5} />
    <Leaf x={162} y={322} rotate={-20} scale={1.12} fill={`url(#${uid}-leaf)`} at={0.7} />
    {BACK.map((rotate, i) => (
      <g key={`b${rotate}`} transform={`translate(${CX} ${CY}) rotate(${rotate}) scale(0.93)`}>
        <Grow at={1.2 + i * 0.03}>
          <path d={PETAL} fill={`url(#${uid}-sb)`} />
        </Grow>
      </g>
    ))}
    {FRONT.map((rotate, i) => (
      <g key={`f${rotate}`} transform={`translate(${CX} ${CY}) rotate(${rotate})`}>
        <Grow at={1.5 + i * 0.04}>
          <path d={PETAL} fill={`url(#${uid}-sf)`} stroke="#B9740A" strokeOpacity={0.35} strokeWidth={1} />
          <path d="M0,-40 C-1,-60 -1,-82 0,-98" stroke="#C98410" strokeOpacity={0.35} strokeWidth={1.2} fill="none" />
        </Grow>
      </g>
    ))}
    <Grow at={1} origin="50% 50%">
      <circle cx={CX} cy={CY} r={44} fill={`url(#${uid}-sc)`} />
    </Grow>
    <Fade at={1.4}>
      {SEEDS.map((seed) => (
        <circle key={`${seed.x}-${seed.y}`} cx={seed.x} cy={seed.y} r={seed.r} fill={seed.light ? "#A06A26" : "#7A4A16"} fillOpacity={0.85} />
      ))}
      <circle cx={CX} cy={CY} r={44} fill="none" stroke="#3A1F08" strokeWidth={2} />
    </Fade>
  </>
);
