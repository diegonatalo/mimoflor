import { COLOMBIAN } from "./palettes";
import { Grow, Leaf, LeafGradient, Stem, type DrawingProps } from "./shared";

/** Rosa colombiana, vista de lado: a taça alta de pétalas aveludadas. */
export const ColombianRose = ({ uid, color }: DrawingProps) => {
  const c = COLOMBIAN[color];
  const front = `url(#${uid}-cA)`;
  const back = `url(#${uid}-cB)`;
  const rim = { stroke: c.rim, fill: "none", strokeLinecap: "round" } as const;
  return (
    <>
      <defs>
        <LeafGradient id={`${uid}-leaf`} />
        <linearGradient id={`${uid}-cA`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.tip} />
          <stop offset="0.55" stopColor={c.mid} />
          <stop offset="1" stopColor={c.base} />
        </linearGradient>
        <linearGradient id={`${uid}-cB`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.mid} />
          <stop offset="1" stopColor={c.deep} />
        </linearGradient>
        <linearGradient id={`${uid}-cC`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.tip} />
          <stop offset="1" stopColor={c.mid} />
        </linearGradient>
      </defs>
      <Stem d="M160,232 C156,290 166,340 160,400" />
      <Leaf x={158} y={300} rotate={198} scale={0.95} fill={`url(#${uid}-leaf)`} at={0.5} />
      <Leaf x={162} y={336} rotate={-26} scale={0.88} fill={`url(#${uid}-leaf)`} at={0.7} />
      <Grow at={0.8}>
        <path d="M160,208 C150,222 136,228 122,226 C134,218 148,211 160,206Z" fill="#3D7A4E" />
        <path d="M160,208 C170,222 184,228 198,226 C186,218 172,211 160,206Z" fill="#3D7A4E" />
        <path d="M160,206 C155,218 157,230 160,236 C163,230 165,218 160,206Z" fill="#336B44" />
      </Grow>
      <Grow at={0.9}>
        <path d="M112,172 C98,118 116,66 160,58 C204,66 222,118 208,172 C190,184 130,184 112,172Z" fill={back} />
      </Grow>
      <Grow at={1.05}>
        <path d="M128,104 C132,74 188,74 192,104 C184,95 172,91 160,93 C148,91 136,95 128,104Z" fill={`url(#${uid}-cC)`} />
        <path d="M144,98 C148,84 172,84 176,98" {...rim} strokeOpacity={0.7} strokeWidth={2} />
        <path d="M150,95 C154,89 166,89 170,95" stroke={c.deep} strokeOpacity={0.8} strokeWidth={1.6} fill="none" strokeLinecap="round" />
      </Grow>
      <Grow at={1.2}>
        <path d="M100,150 C94,108 118,84 152,90 C140,122 140,162 160,206 C124,202 104,182 100,150Z" fill={front} />
        <path d="M100,150 C94,108 118,84 152,90" {...rim} strokeOpacity={0.75} strokeWidth={2.4} />
      </Grow>
      <Grow at={1.35}>
        <path d="M220,150 C226,108 202,84 168,90 C180,122 180,162 160,206 C196,202 216,182 220,150Z" fill={front} />
        <path d="M220,150 C226,108 202,84 168,90" {...rim} strokeOpacity={0.75} strokeWidth={2.4} />
      </Grow>
      <Grow at={1.6}>
        <path
          d="M126,128 C138,108 182,108 194,128 C198,166 182,198 160,210 C138,198 122,166 126,128Z"
          fill={front}
          stroke={c.deep}
          strokeOpacity={0.5}
          strokeWidth={1}
        />
        <path d="M126,128 C138,108 182,108 194,128" {...rim} strokeWidth={2.6} />
      </Grow>
      <Grow at={1.85}>
        <path d="M98,156 C80,172 86,204 118,214 C138,220 152,214 160,210 C130,204 106,186 98,156Z" fill={back} />
      </Grow>
      <Grow at={2.05}>
        <path d="M222,156 C240,172 234,204 202,214 C182,220 168,214 160,210 C190,204 214,186 222,156Z" fill={back} />
      </Grow>
    </>
  );
};
