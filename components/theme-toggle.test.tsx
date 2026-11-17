import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";
import { THEME_KEY } from "@/lib/storage-keys";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "dark";
  });

  it("troca a noite pelo dia e guarda a escolha", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole("button", { name: /Alternar entre tema/ }));

    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
  });
});
