/*
 * Contas dos desenhos das flores, num quadro de 320 × 400 com a cabeça no
 * terço de cima. Ficam aqui (e não nos componentes) para serem testadas e
 * calculadas uma vez só.
 */

const round = (n: number) => Math.round(n * 100) / 100;

/** Gerador pseudoaleatório com semente: o mesmo desenho no servidor e no navegador. */
const seeded = (seed: number) => {
  let state = seed;
  return () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646;
};

export type Seed = { x: number; y: number; r: number; light: boolean };

/** Sementes do girassol na espiral áurea (137,5°), dentro do miolo. */
export const sunflowerSeeds = (cx: number, cy: number, radius: number, total = 150): Seed[] => {
  const seeds: Seed[] = [];
  for (let i = 1; i <= total; i++) {
    const r = 3.3 * Math.sqrt(i);
    if (r > radius) break;
    const angle = (i * 137.508 * Math.PI) / 180;
    seeds.push({
      x: round(cx + r * Math.cos(angle)),
      y: round(cy + r * Math.sin(angle)),
      r: round(1.1 + (i / total) * 1.1),
      light: i % 3 === 0,
    });
  }
  return seeds;
};

export type Floret = {
  x: number;
  y: number;
  /** escala da florzinha (1 = 16 px de pétala) */
  scale: number;
  rotate: number;
  color: string;
  /** 0 no centro da cúpula, 1 na borda */
  depth: number;
};

const INNER = ["#BCD3FF", "#A7C1FD", "#A3B4F7", "#B8ADF3"];
const MID = ["#88A5F2", "#7F96EC", "#9389E6", "#8FB0F6"];
const OUTER = ["#5F79D6", "#5367C4", "#6C63C9", "#4E6FCC"];

/**
 * Florzinhas da hortênsia numa cúpula achatada. Vêm da borda para o centro,
 * a ordem de pintura: as do meio ficam na frente. As da borda são mais escuras.
 */
export const hydrangeaFlorets = (cx: number, cy: number, radius: number, total = 54): Floret[] => {
  const random = seeded(7);
  const florets: Floret[] = [];
  for (let i = 0; i < total; i++) {
    const r = radius * 0.9 * Math.sqrt((i + 0.5) / total) + (random() - 0.5) * 6;
    const angle = i * 2.39996 + random() * 0.3;
    const depth = Math.min(1, Math.abs(r) / radius);
    const palette = depth > 0.7 ? OUTER : depth > 0.4 ? MID : INNER;
    florets.push({
      x: round(cx + r * Math.cos(angle)),
      y: round(cy + r * Math.sin(angle) * 0.86),
      scale: round((15 + random() * 4) / 16),
      rotate: round(random() * 90),
      color: palette[Math.floor(random() * palette.length)],
      depth: round(depth),
    });
  }
  return florets.sort((a, b) => b.depth - a.depth);
};

export type Stamen = { path: string; x: number; y: number; angle: number };

/** Estames do lírio: seis filetes curvos saindo do centro, com a antera na ponta. */
export const lilyStamens = (cx: number, cy: number, length = 58): Stamen[] =>
  Array.from({ length: 6 }, (_, k) => {
    const degrees = k * 60 - 60;
    const a = (degrees * Math.PI) / 180;
    const x = round(cx + length * Math.cos(a));
    const y = round(cy + length * Math.sin(a));
    const mx = round(cx + length * 0.55 * Math.cos(a + 0.18));
    const my = round(cy + length * 0.55 * Math.sin(a + 0.18));
    return { path: `M${cx},${cy} Q${mx},${my} ${x},${y}`, x, y, angle: degrees + 90 };
  });

/** Ângulos de `count` peças em volta de um centro, a partir de `offset` graus. */
export const ring = (count: number, offset = 0) =>
  Array.from({ length: count }, (_, k) => round(offset + (k * 360) / count));
