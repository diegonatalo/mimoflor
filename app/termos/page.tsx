import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal-layout";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { STORE_LIMITS } from "@/lib/sealed";
import { PRIVACY_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: `As regras para usar o ${SITE_NAME}.`,
  alternates: { canonical: "/termos" },
};

const sections: LegalSection[] = [
  {
    id: "o-que-e",
    title: `O que é o ${SITE_NAME}`,
    content: (
      <p>
        Um jeito de mandar uma flor animada, com um bilhete surpresa, por um link. É um projeto pessoal e gratuito,
        mantido por Diego Natalo.
      </p>
    ),
  },
  {
    id: "suas-mensagens",
    title: "Suas mensagens",
    content: (
      <>
        <p>
          Você é responsável pelo que escreve e por quem recebe o link. Quem tiver o link inteiro consegue ler a flor e as
          mensagens, então envie só para quem você quer.
        </p>
        <p>
          Cada link funciona por {STORE_LIMITS.days} dias. Depois disso, a flor é apagada e não dá para recuperar. Detalhes
          em{" "}
          <Link href="/privacidade" className="font-semibold text-accent underline underline-offset-4">
            Privacidade
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "uso-aceitavel",
    title: "Uso aceitável",
    content: (
      <p>
        Não use o {SITE_NAME} para assediar, ameaçar ou enganar ninguém, para mandar spam, nem para nada ilegal. Para
        proteger o serviço, há um limite de flores por hora para cada conexão.
      </p>
    ),
  },
  {
    id: "disponibilidade",
    title: "Disponibilidade",
    content: (
      <p>
        O {SITE_NAME} é oferecido &ldquo;como está&rdquo;, sem garantia de que vai funcionar sempre ou sem erros. Ele pode
        mudar ou sair do ar.
      </p>
    ),
  },
  {
    id: "mudancas",
    title: "Mudanças nestes termos",
    content: <p>Quando estes termos mudarem, a data no topo muda junto.</p>,
  },
  {
    id: "contato",
    title: "Contato",
    content: (
      <p>
        <a href={`mailto:${PRIVACY_EMAIL}`} className="font-semibold text-accent underline underline-offset-4">
          {PRIVACY_EMAIL}
        </a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout>
      <LegalPage
        title="Termos de uso"
        summary={`Resumo: as regras para usar o ${SITE_NAME}. Ao usar o app, você concorda com elas.`}
        updatedAt="2026-11-25"
        sections={sections}
      />
    </LegalLayout>
  );
}
