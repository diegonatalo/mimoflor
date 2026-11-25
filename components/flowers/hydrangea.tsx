import { hydrangeaFlorets, type Floret } from "@/lib/flower-geometry";
import { Grow, Leaf, LeafGradient, Stem, type DrawingProps } from "./shared";

const CX = 160;
const CY = 138;
const PETAL = "M0,-1 C-6,-4 -10,-11 -5,-15.5 C-2.5,-17.5 2.5,-17.5 5,-15.5 C10,-11 6,-4 0,-1Z";

/** A cúpula da hortênsia sozinha e a menor, do buquê. */
export const HYDRANGEA_FULL = { radius: 90, florets: hydrangeaFlorets(0, 0, 90) };
export const HYDRANGEA_SMALL = { radius: 46, florets: hydrangeaFlorets(0, 0, 46, 24) };

/** Em que ordem cada florzinha nasce: as do centro primeiro, a cúpula se abrindo para fora. */
const bloomOrder = (florets: Floret[]) => new Map([...florets].sort((a, b) => a.depth - b.depth).map((floret, i) => [floret, i]));
const ORDER = new Map([HYDRANGEA_FULL, HYDRANGEA_SMALL].map((dome) => [dome, bloomOrder(dome.florets)]));

type HydrangeaHeadProps = {
  dome: typeof HYDRANGEA_FULL;
  at: number;
  step?: number;
};

/** Cúpula de florzinhas de quatro pétalas, centrada em (0, 0). */
export const HydrangeaHead = ({ dome, at, step = 0.032 }: HydrangeaHeadProps) => {
  const order = ORDER.get(dome);
  return (
    <>
      <Grow at={at - 0.1} origin="50% 50%">
        <ellipse cy={2} rx={dome.radius + 4} ry={dome.radius * 0.89} fill="#3B4CA8" />
      </Grow>
      {dome.florets.map((floret) => (
        <g key={`${floret.x}-${floret.y}`} transform={`translate(${floret.x} ${floret.y}) rotate(${floret.rotate}) scale(${floret.scale})`}>
          <Grow at={at + (order?.get(floret) ?? 0) * step} origin="50% 50%">
            {[0, 90, 180, 270].map((r) => (
              <path
                key={r}
                transform={`rotate(${r})`}
                d={PETAL}
                fill={floret.color}
                stroke="#2F3C8C"
                strokeOpacity={0.35}
                strokeWidth={0.8}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <circle r={1.9} fill="#EEF3FF" />
          </Grow>
        </g>
      ))}
    </>
  );
};

/** Hortênsia azul: 54 florzinhas de quatro pétalas numa cúpula. */
export const Hydrangea = ({ uid }: DrawingProps) => (
  <>
    <defs>
      <LeafGradient id={`${uid}-leaf`} />
    </defs>
    <Stem d="M160,222 C156,290 166,340 160,400" width={8} />
    <Leaf x={152} y={236} rotate={164} scale={1.55} scaleY={1.35} fill={`url(#${uid}-leaf)`} at={0.5} />
    <Leaf x={168} y={246} rotate={18} scale={1.5} scaleY={1.3} fill={`url(#${uid}-leaf)`} at={0.6} />
    <Leaf x={161} y={322} rotate={-30} scale={1.05} fill={`url(#${uid}-leaf)`} at={0.75} />
    <g transform={`translate(${CX} ${CY})`}>
      <HydrangeaHead dome={HYDRANGEA_FULL} at={1} />
    </g>
  </>
);
