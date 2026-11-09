import { ROSE_PALETTES, type RoseColor } from "./palettes";
import { Leaf, Petal, Stem } from "./shared";
import { rnd, vars } from "./utils";

const HX = 160;
const HY = 122;

/** Pétala larga e arredondada, base em (0,0), apontando para cima. */
const cup = (w: number, h: number) =>
  `M0 0 C${-0.5 * w} ${-0.05 * h} ${-0.62 * w} ${-0.6 * h} ${-0.36 * w} ${-0.88 * h} C${-0.2 * w} ${-1.02 * h} ${0.2 * w} ${-1.02 * h} ${0.36 * w} ${-0.88 * h} C${0.62 * w} ${-0.6 * h} ${0.5 * w} ${-0.05 * h} 0 0Z`;

const rim = (w: number, h: number) =>
  `M${-0.38 * w} ${-0.87 * h} C${-0.2 * w} ${-1.04 * h} ${0.2 * w} ${-1.04 * h} ${0.38 * w} ${-0.87 * h}`;

type RingSpec = {
  count: number;
  start: number;
  offset: number;
  w: number;
  h: number;
  fill: string;
  delay: number;
};

/* de fora para dentro: a espiral se fecha em direção ao miolo */
const RINGS: RingSpec[] = [
  { count: 7, start: 0, offset: 20, w: 58, h: 48, fill: "roseP1", delay: 0.75 },
  { count: 6, start: 24, offset: 14, w: 50, h: 40, fill: "roseP2", delay: 0.5 },
  { count: 5, start: 50, offset: 9, w: 42, h: 33, fill: "roseP3", delay: 0.3 },
  { count: 4, start: 14, offset: 5, w: 33, h: 26, fill: "roseP4", delay: 0.14 },
  { count: 3, start: 40, offset: 2, w: 24, h: 19, fill: "roseP5", delay: 0 },
];

export const RoseDefs = ({ color }: { color: RoseColor }) => (
  <>
    {ROSE_PALETTES[color].layers.map(([a, b, c], i) => (
      <linearGradient key={i} id={`roseP${i + 1}`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={a} />
        <stop offset="0.55" stopColor={b} />
        <stop offset="1" stopColor={c} />
      </linearGradient>
    ))}
    <linearGradient id="roseSepal" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#14532d" />
      <stop offset="1" stopColor="#4d7c0f" />
    </linearGradient>
  </>
);

const SEPALS = [128, 152, 180, 208, 232];

export const RosePlant = ({ color }: { color: RoseColor }) => {
  const palette = ROSE_PALETTES[color];
  return (
  <>
    <Stem d="M158 358 C150 310 172 250 160 168" width={9} />

    {/* espinhos */}
    <path d="M156 296 L142 288 L157 286Z" fill="#166534" className="thorn" />
    <path d="M166 232 L180 224 L165 223Z" fill="#166534" className="thorn" />

    {/* folhas */}
    <Leaf x={154} y={304} angle={-86} scale={0.55} delay={0.95} kind="ovate" />
    <Leaf x={154} y={304} angle={-58} scale={0.62} delay={1.05} kind="ovate" />
    <Leaf x={154} y={304} angle={-114} scale={0.46} delay={1.15} kind="ovate" />
    <Leaf x={168} y={248} angle={86} scale={0.55} delay={1.2} kind="ovate" />
    <Leaf x={168} y={248} angle={58} scale={0.62} delay={1.3} kind="ovate" />
    <Leaf x={168} y={248} angle={114} scale={0.46} delay={1.4} kind="ovate" />

    <g
      className="head-sway"
      style={vars({ "--ox": "160px", "--oy": "175px" })}
    >
      <g
        transform={`translate(${HX} ${HY}) scale(1 0.9)`}
        filter="url(#headShadow)"
      >
        {/* sépalas por baixo */}
        {SEPALS.map((a, i) => (
          <Petal key={a} angle={a} offset={20} delay={0.1 * i} s0={0.2}>
            <path
              d="M0 0 C-7 -14 -7 -40 0 -76 C7 -40 7 -14 0 0Z"
              fill="url(#roseSepal)"
            />
          </Petal>
        ))}

        {RINGS.map((ring, ri) =>
          Array.from({ length: ring.count }, (_, i) => {
            const angle =
              ring.start + (360 / ring.count) * i + (rnd(ri * 10 + i) - 0.5) * 8;
            const k = 1 + (rnd(ri * 10 + i + 40) - 0.5) * 0.12;
            return (
              <Petal
                key={`${ri}-${i}`}
                angle={angle}
                offset={ring.offset}
                delay={ring.delay + i * 0.07}
                s0={0.25}
                twist={-40}
                duration={2.2}
              >
                <path
                  d={cup(ring.w * k, ring.h * k)}
                  fill={`url(#${ring.fill})`}
                  stroke={palette.outline}
                  strokeOpacity={0.45}
                  strokeWidth={1.1}
                />
                <path
                  d={rim(ring.w * k, ring.h * k)}
                  fill="none"
                  stroke={palette.rim}
                  strokeOpacity={0.6}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                />
              </Petal>
            );
          }),
        )}

        {/* espiral do miolo */}
        <Petal angle={0} delay={0.25} s0={0.3} duration={2}>
          <path
            d="M-2 -3 C5 -9 11 -3 7 3 C3 8 -6 5 -6 -2 C-6 -9 2 -14 10 -12"
            fill="none"
            stroke={palette.spiral}
            strokeOpacity={0.6}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </Petal>
      </g>
    </g>
  </>
  );
};
