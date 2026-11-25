import type { ReactNode } from "react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SOURCE_URL } from "@/lib/site";

/** Topo e rodapé do site em volta de uma página legal. */
export const LegalLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-dvh flex-col">
    <SiteHeader />
    {children}
    <SiteFooter privacy terms sourceUrl={SOURCE_URL} />
  </div>
);

