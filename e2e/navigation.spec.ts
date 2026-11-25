import { expect, test, type Page } from "@playwright/test";
import { title } from "./fixtures";

const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
};

const PAGES = [
  { path: "/", heading: /Mande uma flor que/ },
  { path: "/app", heading: "Escolha uma flor para alguém" },
  { path: "/privacidade", heading: "Privacidade" },
  { path: "/termos", heading: "Termos de uso" },
];

for (const { path, heading } of PAGES) {
  test(`abre ${path} sem erros no console`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(path);
    await expect(title(page, heading)).toBeAttached();
    expect(errors).toEqual([]);
  });
}

test("o rodapé da landing leva às páginas legais", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("navigation", { name: "Rodapé" });
  await footer.getByRole("link", { name: "Privacidade" }).click();
  await expect(title(page, "Privacidade")).toBeVisible();
  await page.getByRole("navigation", { name: "Rodapé" }).getByRole("link", { name: "Termos de uso" }).click();
  await expect(title(page, "Termos de uso")).toBeVisible();
});

test("o botão da landing abre o app", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("main").getByRole("link", { name: "Abrir o app" }).first().click();
  await expect(page).toHaveURL(/\/app$/);
});

// sem conferir o console: o Chromium registra a própria resposta 404 como erro
test("a 404 avisa e leva de volta ao app", async ({ page }) => {
  await page.goto("/nao-existe");
  await expect(title(page, "Esta flor ainda não brotou")).toBeVisible();
  await page.getByRole("link", { name: "Voltar para o app" }).click();
  await expect(page).toHaveURL(/\/app$/);
});
