import Link from "next/link";
import { BrandLink } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { PRIMARY_BUTTON } from "@/components/ui";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/#por-que", label: "Por que existe" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#perguntas", label: "Perguntas" },
];

/** Topo das páginas do site (landing e páginas legais). */
export const SiteHeader = () => (
  <header className="border-b border-line">
    <div className="mx-auto flex min-h-[76px] max-w-[1200px] items-center justify-between gap-4 px-5 py-2.5 sm:px-8">
      <BrandLink size={26} />
      <nav aria-label="Principal" className="flex items-center gap-x-7">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="hidden text-[15px] font-medium text-muted hover:text-ink md:block">
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
        <Link href="/app" className={cn(PRIMARY_BUTTON, "hidden min-h-11 px-5 text-[15px] sm:inline-flex")}>
          Abrir o app
        </Link>
      </nav>
    </div>
  </header>
);
