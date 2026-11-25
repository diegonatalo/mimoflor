import { describe, expect, it } from "vitest";
import { BLOOM_SECONDS, FLOWER_KINDS, flowerName, isRose, pickerOf } from "@/lib/flowers";

describe("flowers", () => {
  it("dá nome a cada flor, com a cor só nas rosas", () => {
    expect(flowerName({ kind: "colombian", color: "blue" })).toBe("Rosa colombiana azul");
    expect(flowerName({ kind: "rose", color: "red" })).toBe("Rosa vermelha");
    expect(flowerName({ kind: "lily", color: "blue" })).toBe("Lírio branco");
  });

  it("as duas rosas marcam o mesmo item do seletor", () => {
    expect(pickerOf("rose")).toBe("rose");
    expect(pickerOf("colombian")).toBe("rose");
    expect(pickerOf("sunflower")).toBe("sunflower");
    expect(isRose("hydrangea")).toBe(false);
  });

  it("toda flor tem um tempo para abrir", () => {
    for (const kind of FLOWER_KINDS) expect(BLOOM_SECONDS[kind]).toBeGreaterThan(1);
  });
});
