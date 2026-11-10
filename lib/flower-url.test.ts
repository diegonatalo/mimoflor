import { afterEach, describe, expect, it } from "vitest";
import { readFlowerUrl, writeFlowerUrl } from "@/lib/flower-url";

describe("readFlowerUrl", () => {
  it("abre a flor padrão quando não há `flor` na URL", () => {
    expect(readFlowerUrl("")).toEqual({ status: "default" });
    expect(readFlowerUrl("?utm_source=x")).toEqual({ status: "default" });
  });

  it("lê a flor pelo slug, sem diferenciar maiúsculas", () => {
    expect(readFlowerUrl("?flor=Girassol")).toEqual({
      status: "flower",
      flower: "sunflower",
      selection: {},
    });
  });

  it("marca como inválida uma flor que não existe", () => {
    expect(readFlowerUrl("?flor=tulipa")).toEqual({ status: "invalid" });
  });

  it("usa a primeira opção de cada grupo quando elas não vêm na URL", () => {
    expect(readFlowerUrl("?flor=rosa")).toEqual({
      status: "flower",
      flower: "rose",
      selection: { kind: "national", color: "red" },
    });
  });

  it("lê tipo e cor da rosa", () => {
    expect(readFlowerUrl("?flor=rosa&tipo=colombiana&cor=azul")).toEqual({
      status: "flower",
      flower: "rose",
      selection: { kind: "colombian", color: "blue" },
    });
  });

  it("marca como inválida uma opção que não existe", () => {
    expect(readFlowerUrl("?flor=rosa&cor=verde")).toEqual({ status: "invalid" });
  });

  it("ignora parâmetros que não são do site", () => {
    expect(readFlowerUrl("?flor=rosa&fbclid=abc&utm_source=x")).toMatchObject({
      status: "flower",
      flower: "rose",
    });
  });
});

describe("writeFlowerUrl", () => {
  afterEach(() => window.history.replaceState(null, "", "/"));

  it("escreve flor e opções na URL sem criar entrada no histórico", () => {
    const before = window.history.length;
    writeFlowerUrl("rose", { kind: "colombian", color: "blue" });
    expect(window.location.search).toBe("?flor=rosa&tipo=colombiana&cor=azul");
    expect(window.history.length).toBe(before);
  });

  it("escreve só a flor quando ela não tem opções", () => {
    writeFlowerUrl("sunflower", {});
    expect(window.location.search).toBe("?flor=girassol");
  });

  it("gera uma URL que readFlowerUrl lê de volta", () => {
    writeFlowerUrl("rose", { kind: "national", color: "blue" });
    expect(readFlowerUrl(window.location.search)).toMatchObject({
      flower: "rose",
      selection: { kind: "national", color: "blue" },
    });
  });
});
