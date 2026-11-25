import { describe, expect, it } from "vitest";
import { hydrangeaFlorets, lilyStamens, ring, sunflowerSeeds } from "@/lib/flower-geometry";

const distance = (x: number, y: number, cx: number, cy: number) => Math.hypot(x - cx, y - cy);

describe("sunflowerSeeds", () => {
  it("todas as sementes ficam dentro do miolo", () => {
    const seeds = sunflowerSeeds(160, 140, 41);
    expect(seeds.length).toBeGreaterThan(100);
    for (const seed of seeds) expect(distance(seed.x, seed.y, 160, 140)).toBeLessThanOrEqual(41.01);
  });
});

describe("hydrangeaFlorets", () => {
  it("é sempre o mesmo desenho (servidor e navegador iguais)", () => {
    expect(hydrangeaFlorets(160, 138, 90)).toEqual(hydrangeaFlorets(160, 138, 90));
  });

  it("pinta da borda para o centro", () => {
    const depths = hydrangeaFlorets(160, 138, 90).map((f) => f.depth);
    expect(depths).toEqual([...depths].sort((a, b) => b - a));
    expect(depths).toHaveLength(54);
  });

  it("as florzinhas ficam na cúpula", () => {
    for (const f of hydrangeaFlorets(160, 138, 90)) expect(distance(f.x, f.y, 160, 138)).toBeLessThan(90);
  });
});

describe("lilyStamens", () => {
  it("seis estames, todos saindo do centro", () => {
    const stamens = lilyStamens(160, 146);
    expect(stamens).toHaveLength(6);
    for (const s of stamens) {
      expect(s.path.startsWith("M160,146")).toBe(true);
      expect(distance(s.x, s.y, 160, 146)).toBeCloseTo(58, 0);
    }
  });
});

describe("ring", () => {
  it("divide a volta por igual", () => {
    expect(ring(4)).toEqual([0, 90, 180, 270]);
    expect(ring(2, 30)).toEqual([30, 210]);
  });
});
