import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useFlowerUrl } from "@/hooks/use-flower-url";

afterEach(() => window.history.replaceState(null, "", "/"));

describe("useFlowerUrl", () => {
  it("escreve flor e opções na URL sem criar entrada no histórico", () => {
    const write = renderHook(() => useFlowerUrl()).result.current;
    const before = window.history.length;
    write("rose", { kind: "colombian", color: "blue" });
    expect(window.location.search).toBe("?flor=rosa&tipo=colombiana&cor=azul");
    expect(window.history.length).toBe(before);
  });
});
