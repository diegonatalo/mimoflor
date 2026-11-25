import { expect, type Page } from "@playwright/test";

export type FlowerOptions = {
  /** nome do item no seletor (Rosa, Girassol, Hortênsia, Lírio) */
  flower?: string;
  to?: string;
  message?: string;
  note?: string;
};

/** Preenche a tela de criação, sem enviar. */
export const fillFlower = async (page: Page, { flower, to, message, note }: FlowerOptions = {}) => {
  await page.goto("/app");
  if (flower) await page.getByRole("radio", { name: flower }).check();
  if (to) await page.getByRole("textbox", { name: "Para" }).fill(to);
  if (message) await page.getByRole("textbox", { name: "Mensagem" }).fill(message);
  if (note) {
    await page.getByRole("switch", { name: "Bilhete surpresa" }).click();
    await page.getByRole("textbox", { name: "Texto do bilhete surpresa" }).fill(note);
  }
};

/** Cria uma flor pela interface e devolve o link para enviar. */
export const createFlower = async (page: Page, options: FlowerOptions = {}) => {
  await fillFlower(page, options);
  await page.getByRole("button", { name: "Enviar flor" }).click();
  await expect(page.getByRole("heading", { name: "Agora, a melhor parte." })).toBeVisible();
  return page.getByRole("textbox", { name: "Link da flor" }).inputValue();
};

/** Título da página (o `<h1>`), como a pessoa vê. */
export const title = (page: Page, name: string | RegExp) => page.getByRole("heading", { level: 1, name });
