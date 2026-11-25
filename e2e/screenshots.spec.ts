import { mkdirSync, writeFileSync } from "node:fs";
import { test, type Page } from "@playwright/test";
import { createFlower, fillFlower } from "./fixtures";

// Gera os prints da landing em public/landing/ (WebP) e os do README em docs/screenshots/ (PNG). Fica fora da suíte normal:
// rode com `SCREENSHOTS=1 pnpm test:e2e e2e/screenshots.spec.ts`.
test.skip(!process.env.SCREENSHOTS, "só com SCREENSHOTS=1");
// em ordem: o print da landing usa os prints do app
test.describe.configure({ mode: "serial" });
test.use({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light" });

const NOTE = "Lembrei de você hoje cedo e quis te mandar alguma coisa bonita. Que o seu dia seja leve como essa flor.";
const EXAMPLE = { to: "Ana", note: NOTE };

/** Tira o print da tela e grava como WebP, convertendo no próprio navegador. */
const shoot = async (page: Page, name: string) => {
  // sem campo focado no print
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.evaluate(() => window.scrollTo(0, 0));
  const buffer = await page.screenshot();
  mkdirSync("docs/screenshots", { recursive: true });
  writeFileSync(`docs/screenshots/${name}.png`, buffer);
  const png = buffer.toString("base64");
  const webp = await page.evaluate(async (src) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
    return canvas.toDataURL("image/webp", 0.85);
  }, `data:image/png;base64,${png}`);
  mkdirSync("public/landing", { recursive: true });
  writeFileSync(`public/landing/${name}.webp`, Buffer.from(webp.split(",")[1], "base64"));
};

test("prints da landing", async ({ page }) => {
  await fillFlower(page, EXAMPLE);
  await page.waitForTimeout(3_500);
  await shoot(page, "criar");

  const link = await createFlower(page, EXAMPLE);
  await page.goto(link);
  await page.getByRole("button", { name: "Abrir a flor" }).waitFor();
  await shoot(page, "recebido");

  await page.getByRole("button", { name: "Abrir a flor" }).click();
  await page.getByText(NOTE).waitFor({ timeout: 8_000 });
  // o bilhete entra com um fade de 0,9 s
  await page.waitForTimeout(2_500);
  await shoot(page, "aberto");
});

test.describe("README", () => {
  test.use({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

  test("print da landing", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(4_000);
    await page.evaluate(() => window.scrollTo(0, 0));
    mkdirSync("docs/screenshots", { recursive: true });
    writeFileSync("docs/screenshots/landing.png", await page.screenshot());
  });
});
