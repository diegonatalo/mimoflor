import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFlowerUrl } from "@/lib/flower-url";

// A flor é um desenho animado em SVG: aqui basta saber qual flor e quais opções foram pedidas.
vi.mock("./flower", () => ({
  Flower: ({ type, selection }: { type: string; selection: Record<string, string> }) => (
    <div data-testid="flower">{`${type} ${JSON.stringify(selection)}`}</div>
  ),
}));

import { Home } from "./home";

const picker = () => screen.getByRole("radiogroup", { name: "Escolha uma flor" });
const flower = () => screen.getByTestId("flower").textContent;

beforeEach(() => window.history.replaceState(null, "", "/"));

describe("Home", () => {
  it("sem flor na URL, abre a hortênsia sem opções", () => {
    render(<Home url={{ status: "default" }} />);
    expect(within(picker()).getByRole("radio", { name: "Hortênsia" })).toHaveAttribute("aria-checked", "true");
    expect(flower()).toBe("hydrangea {}");
    expect(screen.queryByRole("radiogroup", { name: "Tipo de rosa" })).toBeNull();
  });

  it("trocar de flor mostra as opções dela e grava na URL", async () => {
    render(<Home url={{ status: "default" }} />);
    await userEvent.click(within(picker()).getByRole("radio", { name: "Rosa" }));
    expect(within(picker()).getByRole("radio", { name: "Rosa" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radiogroup", { name: "Tipo de rosa" })).toBeInTheDocument();
    expect(window.location.search).toBe("?flor=rosa&tipo=nacional&cor=vermelha");
  });

  it("escolher uma opção redesenha a flor e atualiza a URL", async () => {
    render(<Home url={{ status: "default" }} />);
    await userEvent.click(within(picker()).getByRole("radio", { name: "Rosa" }));
    await userEvent.click(screen.getByRole("radio", { name: "Azul" }));
    expect(screen.getByRole("radio", { name: "Azul" })).toHaveAttribute("aria-checked", "true");
    expect(flower()).toBe('rose {"kind":"national","color":"blue"}');
    expect(window.location.search).toBe("?flor=rosa&tipo=nacional&cor=azul");
  });

  it("lembra as opções de cada flor ao ir e voltar", async () => {
    render(<Home url={{ status: "default" }} />);
    await userEvent.click(within(picker()).getByRole("radio", { name: "Rosa" }));
    await userEvent.click(screen.getByRole("radio", { name: "Colombiana" }));
    await userEvent.click(within(picker()).getByRole("radio", { name: "Hortênsia" }));
    await userEvent.click(within(picker()).getByRole("radio", { name: "Rosa" }));
    expect(screen.getByRole("radio", { name: "Colombiana" })).toHaveAttribute("aria-checked", "true");
    expect(window.location.search).toContain("tipo=colombiana");
  });

  it("abre a flor e as opções que vieram no link compartilhado", () => {
    render(<Home url={readFlowerUrl("?flor=rosa&tipo=colombiana&cor=azul")} />);
    expect(flower()).toBe('rose {"kind":"colombian","color":"blue"}');
    expect(screen.getByRole("radio", { name: "Colombiana" })).toHaveAttribute("aria-checked", "true");
  });
});
