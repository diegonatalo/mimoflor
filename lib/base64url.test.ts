import { describe, expect, it } from "vitest";
import { fromBase64Url, isBase64Url, toBase64Url } from "@/lib/base64url";

describe("base64url", () => {
  it("vai e volta sem perder bytes", () => {
    const bytes = new Uint8Array([0, 1, 250, 251, 252, 253, 254, 255, 62, 63]);
    const text = toBase64Url(bytes);
    expect(text).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(Array.from(fromBase64Url(text)!)).toEqual(Array.from(bytes));
  });

  it("não usa os caracteres que quebram um link", () => {
    expect(toBase64Url(new Uint8Array([251, 255, 191]))).toBe("-_-_");
  });

  it("recusa o que não é Base64URL", () => {
    expect(fromBase64Url("abc+")).toBeNull();
    expect(fromBase64Url("a")).toBeNull();
    expect(isBase64Url("ok_-")).toBe(true);
    expect(isBase64Url("não")).toBe(false);
  });
});
