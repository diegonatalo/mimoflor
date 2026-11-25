import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { GHOST_BUTTON, PRIMARY_BUTTON } from "@/components/ui";
import { cn } from "@/lib/cn";

/** Uma pétala caída ao lado de um broto: algo ainda não floresceu aqui. */
const FallenPetal = () => (
  <svg width="160" height="150" viewBox="0 0 160 150" aria-hidden="true">
    <path d="M80,140 C78,110 84,80 80,56" stroke="var(--leaf)" strokeWidth={4} strokeLinecap="round" fill="none" />
    <path d="M80,96 C96,84 116,84 128,92 C116,102 96,104 80,96Z" fill="var(--leaf)" fillOpacity={0.8} />
    <path d="M80,56 C70,44 70,28 80,18 C90,28 90,44 80,56Z" fill="var(--accent)" fillOpacity={0.85} />
    <path d="M80,56 C66,52 60,40 64,30 C74,34 80,44 80,56Z" fill="var(--accent)" fillOpacity={0.55} />
    <path d="M28,134 C34,122 48,120 56,128 C48,138 36,140 28,134Z" fill="var(--accent)" fillOpacity={0.7} />
    <path d="M20,142 H140" stroke="var(--line)" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

type NotFoundScreenProps = { eyebrow?: string; title: string; text: string };

/** 404 no visual do app, com caminho de volta para o app e para o início. */
export const NotFoundScreen = ({ eyebrow = "ERRO 404", title, text }: NotFoundScreenProps) => (
  <div className="flex min-h-dvh flex-col">
    <AppHeader brandHref="/app" />
    <main id="conteudo" className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-3 px-5 pb-10 text-center">
      <FallenPetal />
      <p className="mt-2.5 text-[13px] font-bold tracking-[0.14em] text-accent">{eyebrow}</p>
      <h1 className="font-serif text-[34px] font-medium leading-tight tracking-[-0.01em]">{title}</h1>
      <p className="max-w-[300px] text-base leading-normal text-muted">{text}</p>
      <div className="mt-[18px] flex w-full flex-col gap-2.5">
        <Link href="/app" className={cn(PRIMARY_BUTTON, "w-full")}>
          Voltar para o app
        </Link>
        <Link href="/" className={cn(GHOST_BUTTON, "w-full")}>
          Ir para o início
        </Link>
      </div>
    </main>
  </div>
);
