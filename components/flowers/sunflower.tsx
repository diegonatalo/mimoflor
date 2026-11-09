import { Leaf, Petal, Stem } from "./shared";
import { rnd, vars } from "./utils";

const HX = 160;
const HY = 120;

const petalPath = (len: number, w: number, skew: number) =>
  `M0 0 C${-w} ${-len * 0.28} ${-w * 1.05 + skew * 0.4} ${-len * 0.72} ${skew} ${-len} C${w * 1.05 + skew * 0.4} ${-len * 0.72} ${w} ${-len * 0.28} 0 0Z`;

type RingOptions = {
  count: number;
  offsetAngle: number;
  length: number;
  width: number;
  radius: number;
  fill: string;
  delay: number;
  step: number;
  seed: number;
};

const ring = ({
  count,
  offsetAngle,
  length,
  width,
  radius,
  fill,
  delay,
  step,
  seed,
}: RingOptions) =>
  Array.from({ length: count }, (_, i) => {
    const angle = offsetAngle + (360 / count) * i + (rnd(seed + i) - 0.5) * 6;
    const len = length * (0.92 + rnd(seed + i + 50) * 0.16);
    const skew = (rnd(seed + i + 100) - 0.5) * 9;
    return (
      <Petal
        key={`${seed}-${i}`}
        angle={angle}
        offset={radius}
        delay={delay + i * step}
        twist={-14}
      >
        <path d={petalPath(len, width, skew)} fill={fill} />
        <path
          d={`M0 -6 Q${skew * 0.5} ${-len * 0.5} ${skew} ${-len * 0.88}`}
          fill="none"
          stroke="#92400e"
          strokeOpacity={0.3}
          strokeWidth={1.1}
          strokeLinecap="round"
        />
      </Petal>
    );
  });

const SEEDS = Array.from({ length: 260 }, (_, i) => {
  const t = (i + 0.5) / 260;
  const a = i * 137.508 * (Math.PI / 180);
  const r = Math.sqrt(t) * 28.5;
  return {
    x: Math.cos(a) * r,
    y: Math.sin(a) * r,
    r: 1.1 + t * 1.7,
    c: `hsl(${24 + t * 12} ${55 + t * 25}% ${13 + t * 26}%)`,
  };
});

export const SunflowerDefs = () => (
  <>
    <linearGradient id="sunBack" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#b45309" />
      <stop offset="0.55" stopColor="#f59e0b" />
      <stop offset="1" stopColor="#fbbf24" />
    </linearGradient>
    <linearGradient id="sunFront" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#e8890a" />
      <stop offset="0.45" stopColor="#fbbf24" />
      <stop offset="1" stopColor="#ffe873" />
    </linearGradient>
    <linearGradient id="sunSepal" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#14532d" />
      <stop offset="1" stopColor="#65a30d" />
    </linearGradient>
    <radialGradient id="sunDisc" cx="0.45" cy="0.4" r="0.7">
      <stop offset="0" stopColor="#5a2c0c" />
      <stop offset="0.75" stopColor="#33170a" />
      <stop offset="1" stopColor="#1f0f07" />
    </radialGradient>
    <linearGradient id="sunBud" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#14532d" />
      <stop offset="1" stopColor="#84cc16" />
    </linearGradient>
  </>
);

export const SunflowerPlant = () => (
  <>
    <Stem d="M160 358 C154 300 166 230 160 140" width={13} />

    <Leaf x={158} y={306} angle={-72} scale={1} delay={0.9} kind="heart" />
    <Leaf x={164} y={262} angle={70} scale={0.9} delay={1.1} kind="heart" />
    <Leaf x={160} y={214} angle={-58} scale={0.62} delay={1.3} kind="heart" />

    {/* botão */}
    <g transform="translate(160 150)">
      <g className="bud" style={vars({ "--d": 1.35, "--dur": "1.9s" })}>
        <path
          d="M0 0 C-28 -6 -32 -42 0 -62 C32 -42 28 -6 0 0Z"
          fill="url(#sunBud)"
        />
        <path d="M-9 -50 L0 -70 L9 -50 Q0 -46 -9 -50Z" fill="#fbbf24" />
        <path
          d="M0 -4 L0 -56"
          stroke="#bef264"
          strokeOpacity={0.4}
          strokeWidth={1.2}
        />
      </g>
    </g>

    <g
      className="head-sway"
      style={vars({ "--ox": "160px", "--oy": "150px" })}
    >
      <g
        transform={`translate(${HX} ${HY}) rotate(-5)`}
        filter="url(#headShadow)"
      >
        {ring({
          count: 18,
          offsetAngle: 3,
          length: 44,
          width: 10,
          radius: 16,
          fill: "url(#sunSepal)",
          delay: 0,
          step: 0.03,
          seed: 1,
        })}
        {ring({
          count: 24,
          offsetAngle: 0,
          length: 64,
          width: 12.5,
          radius: 22,
          fill: "url(#sunBack)",
          delay: 0.15,
          step: 0.045,
          seed: 40,
        })}
        {ring({
          count: 24,
          offsetAngle: 7.5,
          length: 58,
          width: 12,
          radius: 24,
          fill: "url(#sunFront)",
          delay: 0.4,
          step: 0.045,
          seed: 90,
        })}

        <Petal angle={0} delay={1.3} s0={0.2} duration={1.4}>
          <circle r={31} fill="url(#sunDisc)" />
          <circle
            r={30}
            fill="none"
            stroke="#a16207"
            strokeOpacity={0.55}
            strokeWidth={2.2}
          />
          {SEEDS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.c} />
          ))}
          <ellipse
            cx={-9}
            cy={-12}
            rx={15}
            ry={9}
            fill="url(#softLight)"
            opacity={0.35}
            transform="rotate(-30 -9 -12)"
          />
        </Petal>
      </g>
    </g>
  </>
);
