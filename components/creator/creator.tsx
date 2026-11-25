"use client";

import Link from "next/link";
import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Flower } from "@/components/flower";
import { cn } from "@/lib/cn";
import { INITIAL_DRAFT, choiceOf, giftFromDraft, type Draft } from "@/lib/creator";
import { createGift } from "@/lib/data/actions";
import { flowerName } from "@/lib/flowers";
import type { Gift } from "@/lib/gift";
import { sealGift } from "@/lib/gift-crypto";
import { giftUrl } from "@/lib/share";
import { FlowerForm } from "./flower-form";
import { SharePanel } from "./share-panel";

type Sent = { gift: Gift; link: string };

/** Tela do app: monta a flor, cifra no aparelho, guarda e mostra o link. */
export const Creator = () => {
  const [draft, setDraft] = useState<Draft>(INITIAL_DRAFT);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<Sent | null>(null);

  const flower = choiceOf(draft);
  const change = (patch: Partial<Draft>) => setDraft((current) => ({ ...current, ...patch }));

  const send = async () => {
    setSending(true);
    setError(null);
    try {
      const gift = giftFromDraft(draft);
      const { key, ...sealed } = await sealGift(gift);
      const result = await createGift(sealed);
      if (result.ok) setSent({ gift, link: giftUrl(window.location.origin, result.id, key) });
      else setError(result.error);
    } catch {
      setError("Não deu para enviar agora. Confira a internet e tente de novo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader>
        <Link href="/" className="hidden text-[15px] font-medium text-muted hover:text-ink sm:block">
          Sobre o projeto
        </Link>
      </AppHeader>
      <main id="conteudo" className="flex flex-1 flex-col lg:justify-center">
        {sent ? (
          <SharePanel gift={sent.gift} link={sent.link} onBack={() => setSent(null)} onRestart={() => {
              setSent(null);
              setDraft(INITIAL_DRAFT);
            }} />
        ) : (
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-5 pb-8 lg:flex-row lg:justify-center lg:gap-12 lg:pb-12">
            <section aria-label="Prévia da flor" className="relative flex flex-col items-center gap-2.5 lg:flex-1">
              <div className="halo w-[300px] lg:w-[620px]" aria-hidden="true" />
              <Flower
                key={`${flower.kind}-${flower.color}`}
                flower={flower}
                className={cn("relative", draft.noteOn ? "w-24 lg:w-[360px]" : "w-[180px] lg:w-[420px]")}
              />
              <p className={cn("relative font-serif text-[17px] italic text-muted lg:text-xl", draft.noteOn && "max-lg:hidden")}>
                {flowerName(flower)}
              </p>
            </section>
            <FlowerForm draft={draft} onChange={change} onSubmit={send} sending={sending} error={error} />
          </div>
        )}
      </main>
    </div>
  );
};
