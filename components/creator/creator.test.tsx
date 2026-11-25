import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Creator } from "@/components/creator/creator";
import { createGift } from "@/lib/data/actions";
import { openGift } from "@/lib/gift-crypto";

vi.mock("@/lib/data/actions", () => ({ createGift: vi.fn() }));

const send = vi.mocked(createGift);

describe("Creator", () => {
  beforeEach(() => {
    send.mockReset();
  });

  it("o bilhete surpresa conta os caracteres", async () => {
    const user = userEvent.setup();
    render(<Creator />);
    await user.type(screen.getByRole("textbox", { name: "Bilhete surpresa" }), "Oi");
    expect(screen.getByText(/2\/280/)).toBeInTheDocument();
  });

  it("tipo e cor só aparecem para a rosa", async () => {
    const user = userEvent.setup();
    render(<Creator />);
    expect(screen.getByRole("group", { name: "Tipo de rosa" })).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "Girassol" }));
    expect(screen.queryByRole("group", { name: "Tipo de rosa" })).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Girassol" })).toBeInTheDocument();
  });

  it("o buquê pede só a cor das rosas", async () => {
    const user = userEvent.setup();
    render(<Creator />);
    await user.click(screen.getByRole("radio", { name: "Buquê" }));
    expect(screen.queryByRole("group", { name: "Tipo de rosa" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("radio", { name: "Azul" }));
    expect(screen.getByRole("group", { name: "Cor das rosas do buquê" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Buquê com rosas azuis" })).toBeInTheDocument();
  });

  it("envia só o presente cifrado e mostra o link com a chave", async () => {
    send.mockResolvedValue({ ok: true, id: "abcDEF1234" });
    const user = userEvent.setup();
    render(<Creator />);

    await user.type(screen.getByRole("textbox", { name: "Para" }), "Ana");
    await user.type(screen.getByRole("textbox", { name: "Bilhete surpresa" }), "Lembrei de você.");
    await user.click(screen.getByRole("button", { name: "Enviar flor" }));

    expect(await screen.findByRole("heading", { name: "Agora, a melhor parte." })).toBeInTheDocument();
    const sealed = send.mock.calls[0][0] as { ciphertext: string; iv: string };
    expect(Object.keys(sealed).sort()).toEqual(["ciphertext", "iv"]);
    expect(JSON.stringify(sealed)).not.toContain("Ana");

    const link = (screen.getByRole("textbox", { name: "Link da flor" }) as HTMLInputElement).value;
    expect(link).toMatch(/\/app\/f\/abcDEF1234#[A-Za-z0-9_-]{22}$/);
    const gift = await openGift(sealed, link.split("#")[1]);
    expect(gift).toMatchObject({ to: "Ana", note: "Lembrei de você.", flower: { kind: "colombian", color: "red" } });
    expect(screen.getByText("Com bilhete surpresa")).toBeInTheDocument();
  });

  it("mostra o erro do servidor e deixa tentar de novo", async () => {
    send.mockResolvedValue({ ok: false, error: "Muitas flores em pouco tempo. Espere um pouco e tente de novo." });
    const user = userEvent.setup();
    render(<Creator />);
    await user.click(screen.getByRole("button", { name: "Enviar flor" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Muitas flores em pouco tempo");
    expect(screen.getByRole("button", { name: "Enviar flor" })).toBeEnabled();
  });
});
