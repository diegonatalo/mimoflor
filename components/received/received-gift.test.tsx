import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReceivedGift } from "@/components/received/received-gift";
import type { Gift } from "@/lib/gift";
import { sealGift } from "@/lib/gift-crypto";

const GIFT: Gift = {
  flower: { kind: "lily", color: "red" },
  to: "Ana",
  message: "Uma flor para alegrar o seu dia",
  note: "Lembrei de você hoje cedo.",
};

const openWith = async (gift: Gift, hash?: (key: string) => string) => {
  const { key, ...sealed } = await sealGift(gift);
  window.location.hash = hash ? hash(key) : key;
  render(<ReceivedGift sealed={sealed} />);
};

const reduceMotion = (reduce: boolean) =>
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({ matches: reduce, media: query, addEventListener: () => {}, removeEventListener: () => {} }) as unknown as MediaQueryList,
  );

describe("ReceivedGift", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.location.hash = "";
  });

  it("mostra o convite e, ao tocar, a flor e a mensagem", async () => {
    reduceMotion(false);
    const user = userEvent.setup();
    await openWith(GIFT);

    expect(await screen.findByRole("heading", { name: "chegou uma flor pra você" })).toBeInTheDocument();
    expect(screen.getByText("Ana,")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Abrir a flor" }));

    expect(screen.getByRole("heading", { name: GIFT.message })).toHaveFocus();
    expect(screen.getByRole("img", { name: "Lírio branco" })).toBeInTheDocument();
    // o bilhete espera a flor terminar de abrir
    expect(screen.queryByText(GIFT.note)).not.toBeInTheDocument();
  });

  it("com menos movimento, o bilhete aparece logo", async () => {
    reduceMotion(true);
    const user = userEvent.setup();
    await openWith(GIFT);
    await user.click(await screen.findByRole("button", { name: "Abrir a flor" }));
    expect(await screen.findByText(GIFT.note)).toBeInTheDocument();
  });

  it("sem nome, o convite começa com maiúscula", async () => {
    await openWith({ ...GIFT, to: "" });
    expect(await screen.findByRole("heading", { name: "Chegou uma flor pra você" })).toBeInTheDocument();
  });

  it("avisa quando falta a chave no link", async () => {
    await openWith(GIFT, () => "");
    expect(screen.getByRole("heading", { name: "Este link está incompleto" })).toBeInTheDocument();
  });

  it("avisa quando a chave não abre a flor", async () => {
    await openWith(GIFT, (key) => `${key[0] === "A" ? "B" : "A"}${key.slice(1)}`);
    expect(await screen.findByRole("heading", { name: "Não deu para abrir esta flor" })).toBeInTheDocument();
  });
});
