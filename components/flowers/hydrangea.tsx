import { hydrangeaFlorets } from "@/lib/flower-geometry";
import { Grow, Leaf, LeafGradient, Stem, type DrawingProps } from "./shared";

const CX = 160;
const CY = 138;
const PETAL = "M0,-1 C-6,-4 -10,-11 -5,-15.5 C-2.5,-17.5 2.5,-17.5 5,-15.5 C10,-11 6,-4 0,-1Z";
const FLORETS = hydrangeaFlorets(CX, CY, 90);
// as do centro nascem primeiro e a cúpula vai se abrindo para fora
const ORDER = new Map([...FLORETS].sort((a, b) => a.depth - b.depth).map((floret, i) => [floret, i]));

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
    <Grow at={0.9} origin="50% 50%">
      <ellipse cx={CX} cy={CY + 2} rx={94} ry={80} fill="#3B4CA8" />
    </Grow>
    {FLORETS.map((floret) => (
      <g key={`${floret.x}-${floret.y}`} transform={`translate(${floret.x} ${floret.y}) rotate(${floret.rotate}) scale(${floret.scale})`}>
        <Grow at={1 + (ORDER.get(floret) ?? 0) * 0.032} origin="50% 50%">
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
