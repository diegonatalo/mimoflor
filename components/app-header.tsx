import type { ReactNode } from "react";
import { BrandLink } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

/** Topo das telas do app: a marca à esquerda e, à direita, o que a tela pedir mais o tema. */
export const AppHeader = ({ children, brandHref = "/" }: { children?: ReactNode; brandHref?: string }) => (
  <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
    <BrandLink href={brandHref} size={22} />
    <div className="flex items-center gap-4">
      {children}
      <ThemeToggle />
    </div>
  </header>
);
