import Link from "next/link";
import { BrandLink } from "@/components/brand";
import { footerLinks, type FooterOptions } from "@/lib/legal";

const linkClass = "font-medium text-ink underline-offset-4 hover:underline";

/** Rodapé do site: a marca, a frase de sempre e os links (app, Privacidade, Termos, Código). */
export const SiteFooter = (props: FooterOptions) => (
  <footer className="border-t border-line px-5 pb-12 pt-10 sm:px-8">
    <div className="mx-auto flex max-w-[1200px] flex-wrap items-start justify-between gap-7">
      <div className="flex flex-col gap-2.5">
        <BrandLink size={24} />
        <p className="font-serif text-[17px] italic text-muted">feito com carinho para alguém especial</p>
      </div>
      <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
        <Link href="/app" className={linkClass}>
          Abrir o app
        </Link>
        {footerLinks(props).map((link) =>
          link.external ? (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {link.label}
            </a>
          ) : (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ),
        )}
      </nav>
    </div>
  </footer>
);
