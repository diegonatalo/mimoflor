"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ReplayIcon } from "@/components/icons";
import { GHOST_BUTTON, PRIMARY_BUTTON } from "@/components/ui";
import { cn } from "@/lib/cn";

type ErrorScreenProps = {
  error: unknown;
  retry: () => void;
};

/** Um caule que tombou. Desenho leve e fixo: a tela de erro não depende de mais nada. */
const Drooping = () => (
  <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">
    <path d="M70,130 C70,100 72,70 86,52 C96,40 104,46 100,58" stroke="var(--leaf)" strokeWidth={4} strokeLinecap="round" fill="none" />
    <path d="M100,58 C92,62 88,74 94,84 C104,80 108,68 100,58Z" fill="var(--accent)" fillOpacity={0.8} />
    <path d="M100,58 C110,64 112,76 106,84 C100,78 98,68 100,58Z" fill="var(--accent)" fillOpacity={0.5} />
    <path d="M71,104 C56,96 40,98 32,106 C44,114 60,112 71,104Z" fill="var(--leaf)" fillOpacity={0.75} />
    <path d="M30,132 H110" stroke="var(--line)" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

export const ErrorScreen = ({ error, retry }: ErrorScreenProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="conteudo" className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-3 px-5 py-10 text-center">
      <Drooping />
      <h1 className="mt-2.5 font-serif text-[34px] font-medium leading-tight tracking-[-0.01em]">Algo murchou por aqui</h1>
      <p className="max-w-[300px] text-base leading-normal text-muted">
        Não foi culpa sua. Às vezes a flor só precisa de mais um segundo.
      </p>
      <div className="mt-[18px] flex w-full flex-col gap-2.5">
        <button type="button" onClick={() => retry()} className={cn(PRIMARY_BUTTON, "w-full")}>
          <ReplayIcon /> Tentar de novo
        </button>
        <Link href="/app" className={cn(GHOST_BUTTON, "w-full")}>
          Voltar para o app
        </Link>
      </div>
    </main>
  );
};
