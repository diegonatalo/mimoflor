import { ROSE } from "./palettes";
import { Grow, Leaf, LeafGradient, Stem, type DrawingProps } from "./shared";

const CX = 160;
const CY = 148;
const PETAL = "M0,0 C-58,-6 -66,-74 -30,-92 C-12,-101 12,-101 30,-92 C66,-74 58,-6 0,0Z";
const RIM = "M-30,-92 C-12,-101 12,-101 30,-92";

/** Camadas de fora para dentro: tamanho, giro e degradê. */
const LAYERS = [
  { scale: 1, rotate: 0, gradient: 0 },
  { scale: 0.8, rotate: 36, gradient: 1 },
  { scale: 0.62, rotate: 14, gradient: 2 },
  { scale: 0.46, rotate: 50, gradient: 3 },
  { scale: 0.31, rotate: 26, gradient: 3 },
] as const;

/** Rosa nacional, vista de cima: cinco camadas de pétalas em espiral. */
export const Rose = ({ uid, color }: DrawingProps) => {
  const palette = ROSE[color];
  return (
    <>
      <defs>
        <LeafGradient id={`${uid}-leaf`} />
        {palette.layers.map(([base, mid, tip], i) => (
          <linearGradient key={i} id={`${uid}-r${i}`} x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0" stopColor={base} />
            <stop offset="0.55" stopColor={mid} />
            <stop offset="1" stopColor={tip} />
          </linearGradient>
        ))}
      </defs>
      <Stem d="M160,236 C155,290 167,340 160,400" />
      <Leaf x={158} y={298} rotate={200} scale={0.95} fill={`url(#${uid}-leaf)`} at={0.5} />
      <Leaf x={162} y={338} rotate={-24} scale={0.85} fill={`url(#${uid}-leaf)`} at={0.7} />
      {[36, 108, 180, 252, 324].map((rotate) => (
        <g key={rotate} transform={`translate(${CX} ${CY}) rotate(${rotate})`}>
          <Grow at={0.8}>
            <path d="M0,0 C-8,-30 -6,-80 0,-110 C6,-80 8,-30 0,0Z" fill="#3D7A4E" />
          </Grow>
        </g>
      ))}
      {LAYERS.map((layer, l) =>
        [0, 72, 144, 216, 288].map((step, k) => (
          <g key={`${l}-${k}`} transform={`translate(${CX} ${CY}) rotate(${layer.rotate + step}) scale(${layer.scale})`}>
            <Grow at={1 + (l * 5 + k) * 0.06}>
              <path
                d={PETAL}
                fill={`url(#${uid}-r${layer.gradient})`}
                stroke={palette.outline}
                strokeOpacity={0.55}
                strokeWidth={1.2}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={RIM}
                stroke={palette.rim}
                strokeOpacity={0.55}
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </Grow>
          </g>
        )),
      )}
      <Grow at={2.4} origin="50% 50%">
        <circle cx={CX} cy={CY} r={11} fill={palette.center} />
        <path
          d="M160,148 m-3,0 a3,3 0 1,1 6,0 a6,6 0 1,1 -12,0 a9,9 0 1,1 18,0 a12.5,12.5 0 1,1 -25,0"
          stroke={palette.layers[3][2]}
          strokeOpacity={0.7}
          strokeWidth={1.6}
          fill="none"
          strokeLinecap="round"
        />
      </Grow>
    </>
  );
};
