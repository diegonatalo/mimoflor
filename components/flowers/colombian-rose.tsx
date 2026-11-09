import { COLOMBIAN_PALETTES, type RoseColor } from "./palettes";
import { Leaf, Petal, Stem } from "./shared";
import { rnd } from "./utils";

const HX = 160;
const HY = 172;

/** Pétala alta e levemente pontuda, base em (0,0), apontando para cima. */
const tall = (w: number, h: number) =>
  `M0 0 C${-0.6 * w} ${-0.05 * h} ${-0.64 * w} ${-0.62 * h} ${-0.3 * w} ${-0.9 * h} C${-0.18 * w} ${-0.99 * h} ${-0.06 * w} ${-1.04 * h} 0 ${-1.05 * h} C${0.06 * w} ${-1.04 * h} ${0.18 * w} ${-0.99 * h} ${0.3 * w} ${-0.9 * h} C${0.64 * w} ${-0.62 * h} ${0.6 * w} ${-0.05 * h} 0 0Z`;

const rim = (w: number, h: number) =>
  `M${-0.3 * w} ${-0.9 * h} C${-0.18 * w} ${-0.99 * h} ${-0.06 * w} ${-1.04 * h} 0 ${-1.05 * h} C${0.06 * w} ${-1.04 * h} ${0.18 * w} ${-0.99 * h} ${0.3 * w} ${-0.9 * h}`;

type Layer = {
  fill: string;
  w: number;
  h: number;
  delay: number;
  /** [ângulo, deslocamento horizontal da base] de cada pétala */
  petals: [number, number][];
};

/* de trás para a frente: a taça se fecha em camadas de vermelho cada vez mais vivo */
const LAYERS: Layer[] = [
  {
    fill: "colP0",
    w: 42,
    h: 104,
    delay: 0.55,
    petals: [
      [-13, -5],
      [0, 0],
      [13, 5],
    ],
  },
  {
    fill: "colP1",
    w: 42,
    h: 98,
    delay: 0.4,
    petals: [
      [-19, -9],
      [-6, -3],
      [6, 3],
      [19, 9],
    ],
  },
  {
    fill: "colP2",
    w: 36,
    h: 92,
    delay: 0.22,
    petals: [
      [-8, -3],
      [0, 0],
      [8, 3],
    ],
  },
  {
    fill: "colP3",
    w: 48,
    h: 76,
    delay: 0.1,
    petals: [
      [-20, -12],
      [20, 12],
    ],
  },
  {
    fill: "colP3",
    w: 44,
    h: 64,
    delay: 0,
    petals: [[0, 0]],
  },
];

export const ColombianRoseDefs = ({ color }: { color: RoseColor }) => (
  <>
    {COLOMBIAN_PALETTES[color].layers.map(([a, b, c], i) => (
      <linearGradient key={i} id={`colP${i}`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={a} />
        <stop offset="0.5" stopColor={b} />
        <stop offset="1" stopColor={c} />
      </linearGradient>
    ))}
    <linearGradient id="colSepal" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#14532d" />
      <stop offset="1" stopColor="#3f6212" />
    </linearGradient>
  </>
);

export const ColombianRosePlant = ({ color }: { color: RoseColor }) => {
  const palette = COLOMBIAN_PALETTES[color];
  return (
  <>
    <Stem d="M160 358 C157 300 164 236 160 176" width={8} />

    {/* poucas folhas, pequenas: é uma rosa de corte */}
    <Leaf x={159} y={300} angle={-78} scale={0.5} delay={0.95} kind="ovate" />
    <Leaf x={159} y={300} angle={-48} scale={0.46} delay={1.05} kind="ovate" />
    <Leaf x={161} y={256} angle={78} scale={0.5} delay={1.2} kind="ovate" />
    <Leaf x={161} y={256} angle={48} scale={0.46} delay={1.3} kind="ovate" />

    <g>
      <g transform={`translate(${HX} ${HY}) scale(1.1)`}>
        {/* base da taça e sépalas */}
        <Petal angle={0} delay={0} s0={0.3}>
          <ellipse cx={0} cy={-2} rx={17} ry={11} fill="#14532d" />
        </Petal>
        {[-1, 1].map((s) => (
          <Petal key={s} angle={0} delay={0.08} s0={0.2}>
            <path
              transform={`scale(${s} 1)`}
              d="M-2 -6 C8 2 20 8 34 8 C22 16 8 14 -2 4Z"
              fill="url(#colSepal)"
            />
          </Petal>
        ))}

        {LAYERS.map((layer, li) =>
          layer.petals.map(([angle, bx], i) => (
            <g key={`${li}-${i}`} transform={`translate(${bx} 0)`}>
              <Petal
                angle={angle}
                delay={layer.delay + i * 0.06}
                s0={0.35}
                twist={-angle * 1.1}
                duration={2.4}
              >
                <path
                  d={tall(layer.w, layer.h)}
                  fill={`url(#${layer.fill})`}
                  stroke={palette.outline}
                  strokeOpacity={0.55}
                  strokeWidth={1.1}
                />
                <path
                  d={rim(layer.w, layer.h)}
                  fill="none"
                  stroke={palette.rim}
                  strokeOpacity={0.5}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                />
                <path
                  d={`M${-0.42 * layer.w} ${-0.15 * layer.h} C${-0.5 * layer.w} ${-0.45 * layer.h} ${-0.38 * layer.w} ${-0.75 * layer.h} ${-0.24 * layer.w} ${-0.88 * layer.h}`}
                  fill="none"
                  stroke="#fff"
                  strokeOpacity={0.12 + rnd(li * 7 + i) * 0.06}
                  strokeWidth={3.2}
                  strokeLinecap="round"
                />
              </Petal>
            </g>
          )),
        )}

        {/* espiral enrolada no topo da taça */}
        <Petal angle={0} delay={0.7} s0={0.4} duration={2}>
          <path
            d="M-9 -88 C-6 -100 6 -102 10 -92 C12 -84 4 -80 -2 -84 C-6 -87 -3 -93 2 -93"
            fill="none"
            stroke={palette.spiral}
            strokeOpacity={0.55}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </Petal>
      </g>
    </g>
  </>
  );
};
