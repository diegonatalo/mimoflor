import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { STORE_LIMITS } from "@/lib/sealed";
import { PRIVACY_EMAIL, SITE_NAME } from "@/lib/site";
import { THEME_KEY } from "@/lib/storage-keys";

export const metadata: Metadata = {
  title: "Privacidade",
  description: `O que o ${SITE_NAME} guarda, por quanto tempo e por que nem nós conseguimos ler as suas mensagens.`,
  alternates: { canonical: "/privacidade" },
};

const email = (
  <a href={`mailto:${PRIVACY_EMAIL}`} className="font-semibold text-accent underline underline-offset-4">
    {PRIVACY_EMAIL}
  </a>
);

const sections: LegalSection[] = [
  {
    id: "responsavel",
    title: "Quem é o responsável",
    content: <p>O {SITE_NAME} é um projeto pessoal e gratuito, mantido por Diego Natalo.</p>,
  },
  {
    id: "o-que-guardamos",
    title: "O que guardamos e para quê",
    content: (
      <ul className="list-disc space-y-3 pl-5">
        <li>
          <strong>A flor cifrada.</strong> Quando você envia uma flor, o seu aparelho cifra a flor, o nome e o
          bilhete antes de mandar qualquer coisa. Guardamos só esse texto cifrado, que não conseguimos ler, para entregá-lo
          a quem abrir o link (execução do serviço que você pediu). Ele é apagado depois de {STORE_LIMITS.days} dias.
        </li>
        <li>
          <strong>Uma contagem por IP.</strong> Para evitar abuso, contamos quantas flores saem de cada endereço IP por
          hora. O IP não é guardado: vira um código embaralhado (HMAC) que não dá para desfazer. A contagem some um dia
          depois (legítimo interesse: segurança do serviço).
        </li>
        <li>
          <strong>O tema que você escolheu</strong>, claro ou escuro, fica só no seu navegador (com o nome{" "}
          <code>{THEME_KEY}</code>) e nunca sai do seu aparelho.
        </li>
      </ul>
    ),
  },
  {
    id: "cifragem",
    title: "Por que nem nós conseguimos ler",
    content: (
      <>
        <p>
          A flor é cifrada no seu aparelho com uma chave nova a cada envio (AES-GCM). A chave vai no fim do link, depois do
          sinal <code>#</code>. Essa parte do endereço fica no navegador e nunca é enviada ao servidor, então ela não chega
          ao banco nem aos registros de acesso.
        </p>
        <p>
          Por isso, quem tiver o link inteiro consegue ler a flor e as mensagens. Envie só para quem você quer, e evite
          escrever dados pessoais sensíveis.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: <p>O {SITE_NAME} não usa cookies: nem de propaganda, nem de rastreamento, nem de estatística de visitas.</p>,
  },
  {
    id: "compartilhamento",
    title: "Com quem compartilhamos",
    content: (
      <ul className="list-disc space-y-3 pl-5">
        <li>
          <strong>Vercel</strong>: hospedagem do site. Registra dados técnicos de acesso, como IP, navegador e o endereço da
          página (sem a chave, que fica depois do <code>#</code>).
        </li>
        <li>
          <strong>Neon</strong>: banco de dados Postgres, em São Paulo, onde ficam a flor cifrada e a contagem por IP.
        </li>
      </ul>
    ),
  },
  {
    id: "direitos",
    title: "Seus direitos",
    content: (
      <>
        <p>
          Pela LGPD (art. 18), você pode pedir para confirmar, ver, corrigir ou apagar seus dados. Como o {SITE_NAME} não
          tem contas, não sabemos quem enviou cada flor: para apagar uma antes dos {STORE_LIMITS.days} dias, mande o código
          do link (as letras depois de <code>/f/</code>, sem a parte depois do <code>#</code>) para {email}.
        </p>
      </>
    ),
  },
  {
    id: "mudancas",
    title: "Mudanças",
    content: <p>Quando esta página mudar, a data no topo muda junto.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout>
      <LegalPage
        title="Privacidade"
        summary={`Resumo: o ${SITE_NAME} não tem conta nem cookies. A flor é cifrada no seu aparelho, guardada por ${STORE_LIMITS.days} dias, e só quem tem o link consegue ler.`}
        updatedAt="2026-11-25"
        sections={sections}
      />
    </LegalLayout>
  );
}
