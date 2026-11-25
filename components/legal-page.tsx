import type { ReactNode } from "react";
import { formatLegalDate } from "@/lib/legal";

export type LegalSection = {
  /** Âncora da seção, em português e kebab-case (vira `#id` no sumário). */
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  /** Uma frase sobre o que a página cobre. */
  summary: string;
  /** Data da última mudança no texto, no formato `AAAA-MM-DD`. */
  updatedAt: string;
  sections: LegalSection[];
  /** Algo antes do título, como a marca do projeto com link para o início. */
  header?: ReactNode;
};

/**
 * Layout de `/privacidade` e `/termos`: título, data, sumário com âncoras e seções.
 * Nas cores e fontes do Mimoflor.
 */
export const LegalPage = ({ title, summary, updatedAt, sections, header }: LegalPageProps) => (
  <main id="conteudo" className="mx-auto w-full max-w-3xl flex-1 px-5 py-[clamp(40px,6vw,80px)] sm:px-8">
    {header}
    <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-medium leading-[1.05] tracking-[-0.025em]">{title}</h1>
    <p className="mt-5 font-serif text-[22px] italic leading-normal">{summary}</p>
    <p className="mt-3 text-[15px] text-muted">Atualizada em {formatLegalDate(updatedAt)}.</p>

    {sections.length > 1 && (
      <nav aria-label="Nesta página" className="mt-8">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="underline-offset-4 hover:underline">
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    )}

    <div className="mt-10 space-y-10">
      {sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-titulo`} className="scroll-mt-20">
          <h2 id={`${section.id}-titulo`} className="font-serif text-[26px] font-medium tracking-[-0.01em]">
            {section.title}
          </h2>
          <div className="mt-3 space-y-3 text-[17px] leading-[1.7] text-muted [&_strong]:text-ink">{section.content}</div>
        </section>
      ))}
    </div>
  </main>
);
