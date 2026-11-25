import { describe, expect, it } from "vitest";
import { SHARE_TEXT, giftUrl, whatsappUrl } from "@/lib/share";

describe("giftUrl", () => {
  it("põe o código no caminho e a chave depois do #", () => {
    expect(giftUrl("https://mimoflor.vercel.app/", "k3T9xQa2bC", "chave")).toBe(
      "https://mimoflor.vercel.app/app/f/k3T9xQa2bC#chave",
    );
  });
});

describe("whatsappUrl", () => {
  it("leva o texto e o link inteiros, chave incluída", () => {
    const url = new URL(whatsappUrl("https://mimoflor.vercel.app/app/f/abc#k-_"));
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toBe(`${SHARE_TEXT} https://mimoflor.vercel.app/app/f/abc#k-_`);
  });
});
