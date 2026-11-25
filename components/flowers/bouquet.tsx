import { HYDRANGEA_SMALL, HydrangeaHead } from "./hydrangea";
import { LilyGradient, LilyHead } from "./lily";
import { RoseGradients, RoseHead } from "./rose";
import { Fade, Grow, Leaf, LeafGradient, type DrawingProps } from "./shared";
import { SunflowerGradients, SunflowerHead } from "./sunflower";

/** Folhas que abrem em leque atrás das flores. */
const LEAVES = [
  { x: 160, y: 210, rotate: -150, scale: 1.25 },
  { x: 160, y: 210, rotate: -118, scale: 1.15 },
  { x: 160, y: 210, rotate: -62, scale: 1.15 },
  { x: 160, y: 210, rotate: -30, scale: 1.25 },
  { x: 150, y: 215, rotate: 200, scale: 1.05 },
  { x: 170, y: 215, rotate: -20, scale: 1.05 },
];

const BABYS_BREATH_DOTS = [
  [0, -44],
  [16, -40],
  [-14, -48],
  [6, -50],
  [-6, -38],
  [12, -30],
  [-10, -30],
  [3, -34],
];

/** Raminho de mosquitinho, com pontinhos brancos. */
const BabysBreath = ({ x, y, rotate, at }: { x: number; y: number; rotate: number; at: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    <Grow at={at}>
      <path
        d="M0,0 C2,-14 -2,-28 0,-42 M0,-18 C8,-24 12,-30 16,-38 M0,-26 C-8,-32 -12,-38 -14,-46"
        stroke="#6E9C78"
        strokeWidth={1.2}
        fill="none"
        strokeLinecap="round"
      />
      {BABYS_BREATH_DOTS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.6} fill="#FFFFFF" stroke="#D9D2E3" strokeWidth={0.6} />
      ))}
    </Grow>
  </g>
);

/**
 * Buquê: lírio, duas rosas (na cor escolhida), girassol e hortênsia, com
 * mosquitinho, folhas, papel de presente e laço. Primeiro aparece o papel,
 * depois as folhas e, uma a uma, as flores.
 */
export const Bouquet = ({ uid, color }: DrawingProps) => (
  <>
    <defs>
      <LeafGradient id={`${uid}-leaf`} />
      <RoseGradients id={`${uid}-r`} color={color} />
      <SunflowerGradients id={`${uid}-s`} />
      <LilyGradient id={`${uid}-lw`} />
      <linearGradient id={`${uid}-paper`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FBEAF0" />
        <stop offset="0.6" stopColor="#F2D3DE" />
        <stop offset="1" stopColor="#E4B9C9" />
      </linearGradient>
      <linearGradient id={`${uid}-paperBack`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E7C1CF" />
        <stop offset="1" stopColor="#C995AA" />
      </linearGradient>
    </defs>

    <Fade at={0}>
      <path d="M150,388 L146,400 M160,388 L160,400 M170,388 L174,400" stroke="#3B7350" strokeWidth={5} strokeLinecap="round" />
      <path d="M62,150 C104,124 216,124 258,150 L198,390 L122,390Z" fill={`url(#${uid}-paperBack)`} />
    </Fade>
    {LEAVES.map((leaf, i) => (
      <Leaf key={leaf.rotate} {...leaf} fill={`url(#${uid}-leaf)`} at={0.4 + i * 0.08} />
    ))}
    <BabysBreath x={70} y={150} rotate={-30} at={0.8} />
    <BabysBreath x={252} y={148} rotate={28} at={0.85} />
    <BabysBreath x={160} y={86} rotate={4} at={0.9} />

    <g transform="translate(96 116) rotate(-18) scale(0.5)">
      <LilyHead id={`${uid}-lw`} at={1} step={0.1} />
    </g>
    <g transform="translate(208 100) rotate(10) scale(0.52)">
      <RoseHead id={`${uid}-r`} color={color} at={1.15} step={0.025} />
    </g>
    <g transform="translate(100 184)">
      <HydrangeaHead dome={HYDRANGEA_SMALL} at={1.35} step={0.025} />
    </g>
    <g transform="translate(166 168) scale(0.5)">
      <SunflowerHead id={`${uid}-s`} at={1.5} pace={0.5} />
    </g>
    <g transform="translate(238 182) rotate(24) scale(0.44)">
      <RoseHead id={`${uid}-r`} color={color} at={1.7} step={0.025} />
    </g>
    <BabysBreath x={132} y={210} rotate={-12} at={1.9} />
    <BabysBreath x={200} y={214} rotate={16} at={1.95} />

    <Fade at={0}>
      <path d="M30,204 C78,226 120,212 160,234 C200,212 242,226 290,204 L192,392 L128,392Z" fill={`url(#${uid}-paper)`} />
      <path d="M160,234 L160,392" stroke="#D9A8BA" strokeWidth={1.2} strokeOpacity={0.8} />
      <path
        d="M30,204 C78,226 120,212 160,234 C200,212 242,226 290,204"
        stroke="#FFFFFF"
        strokeOpacity={0.7}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    </Fade>
    <Grow at={0.3} origin="50% 50%">
      <path d="M158,322 C150,344 142,360 132,374" stroke="#C22F62" strokeWidth={6} strokeLinecap="round" fill="none" />
      <path d="M162,322 C170,344 180,358 192,370" stroke="#C22F62" strokeWidth={6} strokeLinecap="round" fill="none" />
      <path d="M160,320 C136,296 108,300 112,320 C115,338 140,334 160,320Z" fill="#C22F62" />
      <path d="M160,320 C184,296 212,300 208,320 C205,338 180,334 160,320Z" fill="#C22F62" />
      <path d="M160,320 C140,306 122,308 122,318" stroke="#E86A92" strokeWidth={2} fill="none" strokeLinecap="round" />
      <circle cx={160} cy={320} r={7} fill="#A3204F" />
    </Grow>
  </>
);
