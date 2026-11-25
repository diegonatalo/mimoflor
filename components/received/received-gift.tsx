"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { Mark } from "@/components/brand";
import { Flower } from "@/components/flower";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReplayIcon } from "@/components/icons";
import { EYEBROW, PRIMARY_BUTTON, QUIET_BUTTON } from "@/components/ui";
import { useLocationHash, useReducedMotion } from "@/hooks/use-browser";
import { cn } from "@/lib/cn";
import { BLOOM_SECONDS } from "@/lib/flowers";
import type { Gift } from "@/lib/gift";
import { openGift, type Sealed } from "@/lib/gift-crypto";

type Opened = { key: string; gift: Gift | null };

/** Quem recebe: decifra com a chave do `#`, mostra o convite e, ao tocar, a flor nasce. */
export const ReceivedGift = ({ sealed }: { sealed: Sealed }) => {
  const key = useLocationHash();
  const [opened, setOpened] = useState<Opened | null>(null);

  useEffect(() => {
    if (!key) return;
    let current = true;
    openGift(sealed, key).then((gift) => {
      if (current) setOpened({ key, gift });
    });
    return () => {
      current = false;
    };
  }, [sealed, key]);

  if (!key) {
    return <Problem title="Este link está incompleto" text="Falta o final do endereço, onde fica a chave da flor. Peça para enviarem o link inteiro de novo." />;
  }
  if (!opened || opened.key !== key) return <Opening />;
  if (!opened.gift) {
    return <Problem title="Não deu para abrir esta flor" text="O link pode ter sido cortado no caminho. Peça para enviarem de novo, inteiro." />;
  }
  return <GiftReveal gift={opened.gift} />;
};

/** No convite, o topo não mostra a marca: a surpresa é a flor. */
const Shell = ({ children, brand = false }: { children: ReactNode; brand?: boolean }) => (
  <div className="flex min-h-dvh flex-col">
    {brand ? (
      <AppHeader brandHref="/app" />
    ) : (
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-end px-5 sm:px-8">
        <ThemeToggle />
      </header>
    )}
    <main id="conteudo" className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-6 text-center">
      {children}
    </main>
  </div>
);

const Opening = () => (
  <Shell>
    <p className="m-auto text-muted" role="status">
      Abrindo a flor…
    </p>
  </Shell>
);

const Problem = ({ title, text }: { title: string; text: string }) => (
  <Shell brand>
    <div className="flex flex-1 flex-col items-center justify-center gap-3">
      <h1 className="font-serif text-[34px] font-medium leading-tight tracking-[-0.01em]">{title}</h1>
      <p className="max-w-[300px] text-base leading-normal text-muted">{text}</p>
      <Link href="/app" className={cn(PRIMARY_BUTTON, "mt-5 w-full")}>
        Criar uma flor
      </Link>
    </div>
  </Shell>
);

const GiftReveal = ({ gift }: { gift: Gift }) => {
  const [open, setOpen] = useState(false);
  const [bloom, setBloom] = useState(0);
  const [noteShown, setNoteShown] = useState(false);
  const reducedMotion = useReducedMotion();
  const message = useRef<HTMLHeadingElement>(null);

  // o bilhete espera a flor terminar de abrir (na hora, para quem pediu menos movimento)
  useEffect(() => {
    if (!open || !gift.note) return;
    const timer = setTimeout(() => setNoteShown(true), reducedMotion ? 0 : BLOOM_SECONDS[gift.flower.kind] * 1000);
    return () => clearTimeout(timer);
  }, [open, bloom, gift, reducedMotion]);

  useEffect(() => {
    if (open) message.current?.focus();
  }, [open]);

  const replay = () => {
    setNoteShown(false);
    setBloom((n) => n + 1);
  };

  if (!open) {
    return (
      <Shell>
        <div className="flex flex-1 flex-col items-center justify-center gap-2.5">
          {gift.to && <p className={EYEBROW}>{gift.to},</p>}
          <h1 className="max-w-[300px] font-serif text-[40px] font-medium leading-[1.08] tracking-[-0.02em]">
            {gift.to ? "chegou uma flor pra você" : "Chegou uma flor pra você"}
          </h1>
          <p className="mt-1.5 text-[15px] text-muted">De alguém que pensou em você hoje.</p>
          <div className="relative mt-6 grid size-[280px] place-items-center">
            <div className="halo w-[320px]" aria-hidden="true" />
            {[260, 212, 168].map((size, i) => (
              <span
                key={size}
                aria-hidden="true"
                className="seal-ring absolute rounded-full border border-accent"
                style={{ width: size, height: size, opacity: [0.15, 0.28, 0.45][i], animationDelay: `${i * 0.4}s` }}
              />
            ))}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir a flor"
              className="relative grid size-[132px] cursor-pointer place-items-center rounded-full bg-accent shadow-[0_18px_40px_rgb(194_47_98/0.35)] transition hover:scale-105"
            >
              <Mark size={64} petal="var(--accent-ink)" center="var(--accent)" stem="var(--accent-ink)" />
            </button>
          </div>
          <p className="mt-2.5 text-base font-semibold" aria-hidden="true">
            Toque para abrir
          </p>
        </div>
        <p className="text-[13px] text-muted">Enviado com o Mimoflor</p>
      </Shell>
    );
  }

  return (
    <Shell brand>
      <div className="flex flex-1 flex-col items-center">
        <div className="relative grid place-items-center">
          <div className="halo w-[340px] lg:w-[460px]" aria-hidden="true" />
          <Flower key={bloom} flower={gift.flower} className={cn("relative", gift.note ? "w-[208px]" : "w-[272px] lg:w-[300px]")} />
        </div>
        {gift.to && <p className={cn(EYEBROW, "mt-0.5")}>Para {gift.to}</p>}
        <h1
          ref={message}
          tabIndex={-1}
          className="mt-1.5 max-w-[330px] font-serif text-[30px] font-normal italic leading-tight tracking-[-0.01em] focus:outline-none"
        >
          {gift.message}
        </h1>
        <section aria-live="polite" aria-label="Bilhete surpresa" className="mt-4 w-full">
          {noteShown && (
            <div className="note-in rounded-[22px] border border-line bg-surface px-5 pb-4 pt-[18px] text-left shadow-soft">
              <p className={cn(EYEBROW, "mb-2 flex items-center gap-2 text-xs")}>
                <span aria-hidden="true">✦</span> Um bilhete pra você
              </p>
              <p className="whitespace-pre-line font-serif text-[17px] leading-normal">{gift.note}</p>
            </div>
          )}
        </section>
        {!gift.note && (
          <span aria-hidden="true" className="mt-3 text-sm text-accent">
            ✦
          </span>
        )}
      </div>
      <div className="mt-3.5 flex flex-col gap-1.5">
        <Link href="/app" className={cn(PRIMARY_BUTTON, "w-full")}>
          Responder com uma flor
        </Link>
        <button type="button" onClick={replay} className={QUIET_BUTTON}>
          <ReplayIcon /> Ver nascer de novo
        </button>
      </div>
    </Shell>
  );
};
