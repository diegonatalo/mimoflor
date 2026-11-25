import { expect, test } from "@playwright/test";
import { createFlower, title } from "./fixtures";

const NOTE = "Lembrei de você hoje cedo e quis te mandar alguma coisa bonita.";

test("a flor chega inteira em outro navegador e o bilhete aparece depois que ela abre", async ({ page, browser }) => {
  const link = await createFlower(page, { flower: "Lírio", to: "Ana", message: "Para alegrar a sua terça", note: NOTE });

  // curto e sem spoiler: só o código e a chave
  const url = new URL(link);
  expect(url.pathname).toMatch(/^\/app\/f\/[0-9A-Za-z]{10}$/);
  expect(url.hash).toMatch(/^#[A-Za-z0-9_-]{22}$/);
  expect(link).not.toContain("Ana");
  expect(link.length).toBeLessThan(80);

  // quem recebe abre num navegador limpo, sem nada de quem enviou
  const context = await browser.newContext();
  const other = await context.newPage();
  await other.goto(link);
  await expect(title(other, "chegou uma flor pra você")).toBeVisible();
  await expect(other.getByText("Ana,")).toBeVisible();

  // o convite continua lá depois de recarregar: a flor está no banco
  await other.reload();
  await other.getByRole("button", { name: "Abrir a flor" }).click();
  await expect(title(other, "Para alegrar a sua terça")).toBeVisible();
  await expect(other.getByRole("img", { name: "Lírio branco" })).toBeVisible();
  await expect(other.getByText(NOTE)).toBeHidden();
  await expect(other.getByText(NOTE)).toBeVisible({ timeout: 8_000 });

  await other.getByRole("link", { name: "Responder com uma flor" }).click();
  await expect(other).toHaveURL(/\/app$/);
  await context.close();
});

test("a chave nunca sai do navegador de quem recebe", async ({ page }) => {
  const link = await createFlower(page, { to: "Bia" });
  const key = new URL(link).hash.slice(1);

  const sent: string[] = [];
  page.on("request", (request) => sent.push(request.url(), request.postData() ?? ""));
  await page.goto(link);
  await expect(title(page, "chegou uma flor pra você")).toBeVisible();

  expect(sent.some((entry) => entry.includes(key))).toBe(false);
});

test("sem a chave, o link avisa que está incompleto", async ({ page }) => {
  const link = await createFlower(page);
  await page.goto(link.split("#")[0]);
  await expect(title(page, "Este link está incompleto")).toBeVisible();
});

test("com a chave errada, a flor não abre", async ({ page }) => {
  const link = await createFlower(page);
  const [base, key] = link.split("#");
  await page.goto(`${base}#${key[0] === "A" ? "B" : "A"}${key.slice(1)}`);
  await expect(title(page, "Não deu para abrir esta flor")).toBeVisible();
});

test("um código que não existe leva à página da flor perdida", async ({ page }) => {
  await page.goto("/app/f/AAAAAAAAAA#chave");
  await expect(title(page, "Esta flor não está mais aqui")).toBeVisible();
  await page.getByRole("link", { name: "Voltar para o app" }).click();
  await expect(page).toHaveURL(/\/app$/);
});

test("dá para voltar e mudar a flor sem perder o que foi escrito", async ({ page }) => {
  await createFlower(page, { to: "Caio", flower: "Girassol" });
  await page.getByRole("button", { name: "Mudar a flor" }).click();
  await expect(page.getByRole("textbox", { name: "Para" })).toHaveValue("Caio");
  await expect(page.getByRole("radio", { name: "Girassol" })).toBeChecked();
});
