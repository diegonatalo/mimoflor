import { describe, expect, it } from "vitest";
import { markSvg } from "@/lib/og";

describe("markSvg", () => {
  it("gera um SVG com as cinco pétalas nas cores pedidas", () => {
    const url = markSvg("#111111", "#222222", "#333333");
    expect(url.startsWith("data:image/svg+xml;base64,")).toBe(true);
    const svg = atob(url.split(",")[1]);
    expect(svg.match(/fill="#111111"/g)).toHaveLength(5);
    expect(svg).toContain('fill="#222222"');
    expect(svg).toContain('stroke="#333333"');
  });
});
