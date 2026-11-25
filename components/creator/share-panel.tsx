"use client";

import { useEffect, useRef, useState } from "react";
import { Flower } from "@/components/flower";
import { BackIcon, ChatIcon, CheckIcon, CopyIcon, ShareIcon } from "@/components/icons";
import { GHOST_BUTTON, PRIMARY_BUTTON } from "@/components/ui";
import { useCanShare } from "@/hooks/use-browser";
import { cn } from "@/lib/cn";
import type { Gift } from "@/lib/gift";
import { SHARE_TEXT, whatsappUrl } from "@/lib/share";
import { STORE_LIMITS } from "@/lib/sealed";

type SharePanelProps = {
  gift: Gift;
  link: string;
  /** volta para a criação, com tudo como estava */
  onBack: () => void;
  /** começa uma flor nova, do zero */
  onRestart: () => void;
};

/** A flor pronta: prévia, o link e os jeitos de enviar. */
export const SharePanel = ({ gift, link, onBack, onRestart }: SharePanelProps) => {
  const [copied, setCopied] = useState(false);
  const canShare = useCanShare();
  const heading = useRef<HTMLHeadingElement>(null);

  // quem usa teclado ou leitor de tela chega direto no próximo passo
  useEffect(() => heading.current?.focus(), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      // sem permissão para a área de transferência: o campo do link continua selecionável
    }
  };

  const share = () => navigator.share({ title: "Uma flor pra você", text: SHARE_TEXT, url: link }).catch(() => {});

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-5 pb-10 lg:max-w-4xl lg:flex-row lg:items-center lg:gap-12">
      <div className="relative flex flex-col items-center gap-1 overflow-hidden rounded-[32px] border border-line bg-surface px-5 pb-5 pt-[18px] shadow-soft lg:flex-1 lg:py-10">
        <div className="halo w-[320px] lg:w-[520px]" aria-hidden="true" />
        <Flower flower={gift.flower} className="relative w-[156px] lg:w-[260px]" />
        <p className="relative mt-1 font-serif text-2xl italic leading-tight lg:text-3xl">{gift.to ? `Para ${gift.to}` : "Pra você"}</p>
        {gift.note && (
          <span className="relative mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent">
            <span aria-hidden="true">✦</span> Com bilhete surpresa
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-1">
        <button type="button" onClick={onBack} className="mb-2 inline-flex min-h-11 w-fit cursor-pointer items-center gap-1.5 rounded-full pr-3 text-[15px] text-muted hover:text-ink">
          <BackIcon /> Mudar a flor
        </button>
        <h1 ref={heading} tabIndex={-1} className="font-serif text-[28px] font-medium tracking-[-0.01em] focus:outline-none lg:text-4xl">
          Agora, a melhor parte.
        </h1>
        <p className="mb-[18px] mt-1.5 text-[15px] leading-normal text-muted">
          Envie o link e espere a reação. Quem abrir vai ver a flor nascer pétala por pétala.
        </p>

        <div className="flex items-center gap-2 rounded-2xl bg-surface-2 py-1.5 pl-3.5 pr-1.5">
          <label htmlFor="link" className="sr-only">
            Link da flor
          </label>
          <input
            id="link"
            readOnly
            value={link}
            onFocus={(event) => event.target.select()}
            className="min-w-0 flex-1 bg-transparent text-sm text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-ink px-3.5 text-sm font-semibold text-bg"
          >
            {copied ? <CheckIcon /> : <CopyIcon />} {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied ? "Link copiado" : ""}
        </p>

        <div className={cn("mt-3 grid gap-2.5", canShare && "grid-cols-2")}>
          <a href={whatsappUrl(link)} target="_blank" rel="noopener noreferrer" className={PRIMARY_BUTTON}>
            <ChatIcon /> WhatsApp
          </a>
          {canShare && (
            <button type="button" onClick={share} className={GHOST_BUTTON}>
              <ShareIcon /> Mais opções
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-[13px] leading-snug text-muted lg:text-left">
          O link funciona por {STORE_LIMITS.days} dias. A flor e as mensagens foram cifradas no seu aparelho: só quem tiver o link
          consegue ler.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm lg:justify-start">
          <a href={link} target="_blank" rel="noopener" className="min-h-11 content-center text-muted underline underline-offset-4 hover:text-ink">
            Ver como {gift.to || "a pessoa"} vai receber
          </a>
          <button type="button" onClick={onRestart} className="min-h-11 cursor-pointer text-muted underline underline-offset-4 hover:text-ink">
            Criar outra flor
          </button>
        </div>
      </div>
    </div>
  );
};
