import { ring, sunflowerSeeds } from "@/lib/flower-geometry";
import { Fade, Grow, Leaf, LeafGradient, Stem, type DrawingProps } from "./shared";

const CX = 160;
const CY = 140;
const PETAL = "M0,-34 C-16,-56 -14,-90 0,-104 C14,-90 16,-56 0,-34Z";
const BACK = ring(22, 360 / 44);
const FRONT = ring(22);
const SEEDS = sunflowerSeeds(0, 0, 41);

/** Degradês do girassol: `${id}f` (pétalas da frente), `${id}b` (de trás) e `${id}c` (miolo). */
export const SunflowerGradients = ({ id }: { id: string }) => (
  <>
    <linearGradient id={`${id}f`} x1="0.5" y1="1" x2="0.5" y2="0">
      <stop offset="0" stopColor="#E3930A" />
      <stop offset="1" stopColor="#FFD65C" />
    </linearGradient>
    <linearGradient id={`${id}b`} x1="0.5" y1="1" x2="0.5" y2="0">
      <stop offset="0" stopColor="#B86A08" />
      <stop offset="1" stopColor="#EFA923" />
    </linearGradient>
    <radialGradient id={`${id}c`} cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#2E1708" />
      <stop offset="0.7" stopColor="#4E2C0F" />
      <stop offset="1" stopColor="#6E4214" />
    </radialGradient>
  </>
);

/**
 * Cabeça do girassol, centrada em (0, 0): o miolo surge em `at` e as pétalas
 * abrem logo depois, as de trás primeiro. `pace` encurta o tempo entre elas.
 */
export const SunflowerHead = ({ id, at, pace = 1 }: { id: string; at: number; pace?: number }) => (
  <>
    {BACK.map((rotate, i) => (
      <g key={`b${rotate}`} transform={`rotate(${rotate}) scale(0.93)`}>
        <Grow at={at + 0.2 + i * 0.03 * pace}>
          <path d={PETAL} fill={`url(#${id}b)`} />
        </Grow>
      </g>
    ))}
    {FRONT.map((rotate, i) => (
      <g key={`f${rotate}`} transform={`rotate(${rotate})`}>
        <Grow at={at + 0.5 * pace + i * 0.04 * pace}>
          <path d={PETAL} fill={`url(#${id}f)`} stroke="#B9740A" strokeOpacity={0.35} strokeWidth={1} />
          <path d="M0,-40 C-1,-60 -1,-82 0,-98" stroke="#C98410" strokeOpacity={0.35} strokeWidth={1.2} fill="none" />
        </Grow>
      </g>
    ))}
    <Grow at={at} origin="50% 50%">
      <circle r={44} fill={`url(#${id}c)`} />
    </Grow>
    <Fade at={at + 0.4}>
      {SEEDS.map((seed) => (
        <circle key={`${seed.x}-${seed.y}`} cx={seed.x} cy={seed.y} r={seed.r} fill={seed.light ? "#A06A26" : "#7A4A16"} fillOpacity={0.85} />
      ))}
      <circle r={44} fill="none" stroke="#3A1F08" strokeWidth={2} />
    </Fade>
  </>
);

/** Girassol: duas voltas de pétalas e o miolo com as sementes em espiral áurea. */
export const Sunflower = ({ uid }: DrawingProps) => (
  <>
    <defs>
      <LeafGradient id={`${uid}-leaf`} />
      <SunflowerGradients id={`${uid}-s`} />
    </defs>
    <Stem d="M160,186 C155,262 167,330 160,400" width={9} />
    <Leaf x={158} y={282} rotate={196} scale={1.2} fill={`url(#${uid}-leaf)`} at={0.5} />
    <Leaf x={162} y={322} rotate={-20} scale={1.12} fill={`url(#${uid}-leaf)`} at={0.7} />
    <g transform={`translate(${CX} ${CY})`}>
      <SunflowerHead id={`${uid}-s`} at={1} />
    </g>
  </>
);
