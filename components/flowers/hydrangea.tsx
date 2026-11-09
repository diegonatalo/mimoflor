import { Leaf, Stem } from "./shared";
import { rnd, vars } from "./utils";

const CX = 160;
const CY = 116;
const RX = 76;
const RY = 66;
const COUNT = 100;

const florets = Array.from({ length: COUNT }, (_, i) => {
  const t = (i + 0.5) / COUNT;
  const angle = i * 137.508 * (Math.PI / 180);
  const dist = Math.sqrt(t);
  const x = CX + Math.cos(angle) * dist * RX;
  const y = CY + Math.sin(angle) * dist * RY;
  const z = Math.sqrt(1 - t * 0.85);
  const size = 12 + z * 8.5 + rnd(i) * 3;
  const hue = rnd(i + 7) < 0.88 ? 208 + rnd(i + 3) * 18 : 245 + rnd(i + 5) * 22;
  const light = 48 + z * 17 + rnd(i + 9) * 8;
  return {
    t,
    x,
    y,
    size,
    rotation: rnd(i + 11) * 90,
    fill: `hsl(${hue} ${70 + rnd(i + 2) * 16}% ${light}%)`,
    delay: ((CY + RY - y) / (2 * RY)) * 1.6 + rnd(i + 13) * 0.25,
  };
}).sort((a, b) => b.t - a.t);

/* Uma florzinha de quatro pétalas num único <path>: menos nós no SVG,
   o que importa bastante para a animação em celulares. */
const PETAL: [number, number][] = [
  [0, 0],
  [-0.62, -0.12],
  [-0.7, -0.78],
  [-0.28, -0.98],
  [-0.12, -1.04],
  [0.12, -1.04],
  [0.28, -0.98],
  [0.7, -0.78],
  [0.62, -0.12],
  [0, 0],
];

const quarterTurn = ([x, y]: [number, number], turns: number) => {
  let [px, py] = [x, y];
  for (let i = 0; i < turns; i++) [px, py] = [-py, px];
  return `${px} ${py}`;
};

const FLORET = [0, 1, 2, 3]
  .map((k) => {
    const [p0, c1, c2, p1, c3, c4, p2, c5, c6, p3] = PETAL.map((pt) =>
      quarterTurn(pt, k),
    );
    return `M${p0} C${c1} ${c2} ${p1} C${c3} ${c4} ${p2} C${c5} ${c6} ${p3}Z`;
  })
  .join("");

export const HydrangeaDefs = () => (
  <>
    <radialGradient id="hydBack" cx="0.5" cy="0.45" r="0.55">
      <stop offset="0" stopColor="#1d3fae" />
      <stop offset="1" stopColor="#1e1b6b" />
    </radialGradient>
  </>
);

export const HydrangeaPlant = () => (
  <>
    <Stem d="M160 358 C166 310 154 240 160 170" width={10} />

    <Leaf x={159} y={316} angle={-78} scale={1.2} delay={0.9} kind="ovate" />
    <Leaf x={161} y={304} angle={78} scale={1.2} delay={1.0} kind="ovate" />
    <Leaf x={157} y={252} angle={-60} scale={0.92} delay={1.2} kind="ovate" />
    <Leaf x={160} y={242} angle={60} scale={0.92} delay={1.3} kind="ovate" />

    <g>
      <g>
        <ellipse
          className="petal"
          cx={CX}
          cy={CY + 4}
          rx={RX - 16}
          ry={RY - 14}
          fill="url(#hydBack)"
          style={vars({ "--d": 0, "--s0": 0.3, "--dur": "1.6s" })}
        />
        {florets.map((f, i) => (
          <g
            key={i}
            transform={`translate(${f.x} ${f.y}) rotate(${f.rotation}) scale(${f.size})`}
          >
            <g
              className="petal"
              style={vars({ "--d": f.delay, "--s0": 0, "--dur": "0.8s" })}
            >
              <path d={FLORET} fill={f.fill} />
              <circle r={0.14} fill="#dbeafe" />
            </g>
          </g>
        ))}
      </g>
    </g>
  </>
);
