import { Leaf, Petal, Stem } from "./shared";
import { rnd, vars } from "./utils";

const HX = 160;
const HY = 118;

const tepal = (len: number, w: number, skew: number) =>
  `M0 0 C${-w * 0.55} ${-len * 0.12} ${-w} ${-len * 0.4} ${-w * 0.8 + skew * 0.3} ${-len * 0.62} C${-w * 0.55} ${-len * 0.82} ${skew * 0.5} ${-len * 0.92} ${skew} ${-len} C${skew * 0.5 + w * 0.2} ${-len * 0.9} ${w * 0.55} ${-len * 0.82} ${w * 0.8 + skew * 0.3} ${-len * 0.62} C${w} ${-len * 0.4} ${w * 0.55} ${-len * 0.12} 0 0Z`;

const tepalShade = (len: number, w: number, skew: number) =>
  `M0 0 C${-w * 0.55} ${-len * 0.12} ${-w} ${-len * 0.4} ${-w * 0.8 + skew * 0.3} ${-len * 0.62} C${-w * 0.55} ${-len * 0.82} ${skew * 0.5} ${-len * 0.92} ${skew} ${-len} L0 0Z`;

const Tepal = ({
  angle,
  len,
  w,
  delay,
  fill,
  seed,
}: {
  angle: number;
  len: number;
  w: number;
  delay: number;
  fill: string;
  seed: number;
}) => {
  const skew = (rnd(seed) - 0.5) * 14;
  return (
    <Petal angle={angle} delay={delay} s0={0.15} twist={-angle * 0.2 - 28} duration={1.6}>
      <path
        d={tepal(len, w, skew)}
        fill={fill}
        stroke="#94a3b8"
        strokeOpacity={0.4}
        strokeWidth={0.8}
      />
      <path d={tepalShade(len, w, skew)} fill="#64748b" fillOpacity={0.14} />
      <path
        d={`M0 -8 L${skew * 0.8} ${-len * 0.86}`}
        stroke="#a3b87a"
        strokeOpacity={0.6}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d={`M${w * 0.3} ${-len * 0.3} L${skew * 0.7 + w * 0.12} ${-len * 0.78}`}
        stroke="#fff"
        strokeOpacity={0.5}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </Petal>
  );
};

const STAMENS = [0, 1, 2, 3, 4, 5].map((i) => ({
  angle: i * 60 + 28 + (rnd(i + 3) - 0.5) * 14,
  len: 40 + rnd(i + 8) * 8,
  bend: 6 + rnd(i + 2) * 6,
}));

export const LilyDefs = () => (
  <>
    <linearGradient id="lilyT" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#bddd7e" />
      <stop offset="0.22" stopColor="#f3f8e4" />
      <stop offset="0.55" stopColor="#ffffff" />
      <stop offset="1" stopColor="#eef2f7" />
    </linearGradient>
    <linearGradient id="lilyT2" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#a9cf6a" />
      <stop offset="0.25" stopColor="#e9f1d6" />
      <stop offset="0.6" stopColor="#f6f8fb" />
      <stop offset="1" stopColor="#e2e8f0" />
    </linearGradient>
    <linearGradient id="lilyBud" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#6b8f3a" />
      <stop offset="0.4" stopColor="#d6e6b0" />
      <stop offset="1" stopColor="#ffffff" />
    </linearGradient>
    <linearGradient id="lilyAnther" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#92400e" />
      <stop offset="0.5" stopColor="#f59e0b" />
      <stop offset="1" stopColor="#92400e" />
    </linearGradient>
    <radialGradient id="lilyThroat">
      <stop offset="0" stopColor="#a3e635" stopOpacity="0.9" />
      <stop offset="1" stopColor="#a3e635" stopOpacity="0" />
    </radialGradient>
  </>
);

const BUD_BODY =
  "M0 0 C-14 -10 -17 -44 0 -80 C17 -44 14 -10 0 0Z";

export const LilyPlant = () => (
  <>
    <Stem d="M160 358 C170 300 150 220 160 148" width={7} />

    <Leaf x={163} y={328} angle={36} scale={0.95} delay={0.9} kind="lance" />
    <Leaf x={157} y={304} angle={-36} scale={0.95} flip delay={1.0} kind="lance" />
    <Leaf x={166} y={266} angle={42} scale={0.78} delay={1.15} kind="lance" />
    <Leaf x={155} y={240} angle={-42} scale={0.72} flip delay={1.25} kind="lance" />
    <Leaf x={161} y={206} angle={34} scale={0.55} delay={1.4} kind="lance" />

    {/* botão lateral */}
    <path
      className="stem-main"
      d="M161 236 C176 228 188 214 192 198"
      pathLength={1}
      fill="none"
      stroke="url(#stemGrad)"
      strokeWidth={3.5}
      strokeLinecap="round"
      style={vars({ "--d": 1.3 })}
    />
    <g transform="translate(192 198) rotate(18) scale(0.5)">
      <g className="bud-stay" style={vars({ "--d": 1.8 })}>
        <path d={BUD_BODY} fill="url(#lilyBud)" stroke="#94a3b8" strokeOpacity={0.4} />
        <path d="M0 -2 L0 -74" stroke="#a3b87a" strokeOpacity={0.6} />
      </g>
    </g>

    {/* botão principal */}
    <g transform="translate(160 150)">
      <g className="bud" style={vars({ "--d": 1.4, "--dur": "1.9s" })}>
        <path d={BUD_BODY} fill="url(#lilyBud)" stroke="#94a3b8" strokeOpacity={0.4} />
        <path d="M0 -2 L0 -74" stroke="#a3b87a" strokeOpacity={0.6} />
        <path d="M-6 -6 C-12 -30 -8 -56 0 -74" stroke="#94a3b8" strokeOpacity={0.3} fill="none" />
      </g>
    </g>

    <g
      className="head-sway"
      style={vars({ "--ox": "160px", "--oy": "150px" })}
    >
      <g transform={`translate(${HX} ${HY}) scale(1 0.86)`} filter="url(#headShadow)">
        {/* tépalas externas */}
        {[0, 120, 240].map((a, i) => (
          <Tepal key={a} angle={a - 4} len={96} w={23} delay={0.1 + i * 0.12} fill="url(#lilyT2)" seed={i + 1} />
        ))}
        {/* tépalas internas */}
        {[60, 180, 300].map((a, i) => (
          <Tepal key={a} angle={a - 4} len={90} w={33} delay={0.5 + i * 0.12} fill="url(#lilyT)" seed={i + 10} />
        ))}

        <Petal angle={0} delay={0.8} s0={0} duration={1}>
          <circle r={13} fill="url(#lilyThroat)" />
        </Petal>

        {/* estames */}
        {STAMENS.map((s, i) => (
          <Petal key={i} angle={s.angle} delay={1.2 + i * 0.08} s0={0} duration={1.1}>
            <path
              d={`M0 0 Q${s.bend * 0.4} ${-s.len * 0.5} ${s.bend} ${-s.len}`}
              fill="none"
              stroke="#e7e5e4"
              strokeWidth={1.7}
              strokeLinecap="round"
            />
            <ellipse
              cx={s.bend}
              cy={-s.len - 1}
              rx={2.9}
              ry={7.5}
              fill="url(#lilyAnther)"
              transform={`rotate(${s.bend * 1.2} ${s.bend} ${-s.len - 1})`}
            />
          </Petal>
        ))}

        {/* pistilo */}
        <Petal angle={-8} delay={1.1} s0={0} duration={1.2}>
          <path
            d="M0 0 Q-6 -28 -10 -56"
            fill="none"
            stroke="#d9f99d"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <circle cx={-10} cy={-58} r={3.6} fill="#a3e635" />
          <circle cx={-13} cy={-60} r={1.8} fill="#bef264" />
          <circle cx={-7} cy={-60} r={1.8} fill="#bef264" />
        </Petal>
      </g>
    </g>
  </>
);
