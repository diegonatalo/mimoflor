import type { CSSProperties } from "react";

/** Pseudo-aleatório determinístico: mesma flor toda vez, sem Math.random. */
export const rnd = (n: number) => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const vars = (o: Record<string, string | number>) => o as CSSProperties;
