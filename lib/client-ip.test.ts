import { describe, expect, it } from "vitest";
import { clientIp } from "@/lib/client-ip";

describe("clientIp", () => {
  it("usa o primeiro IP do x-forwarded-for", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }))).toBe("203.0.113.7");
  });

  it("cai no x-real-ip", () => {
    expect(clientIp(new Headers({ "x-real-ip": "198.51.100.2" }))).toBe("198.51.100.2");
  });

  it("sem cabeçalho, null", () => {
    expect(clientIp(new Headers())).toBeNull();
  });
});
