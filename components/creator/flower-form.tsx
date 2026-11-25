"use client";

import type { FormEvent } from "react";
import { Flower } from "@/components/flower";
import { ArrowIcon } from "@/components/icons";
import { INPUT, PRIMARY_BUTTON } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Draft } from "@/lib/creator";
import { PICKER, ROSE_COLORS, ROSE_KINDS, type FlowerKind } from "@/lib/flowers";
import { GIFT_LIMITS } from "@/lib/gift";

const SWATCH: Record<Draft["color"], string> = {
  red: "radial-gradient(circle at 35% 30%, #FF9DB0, #B3123A 72%)",
  blue: "radial-gradient(circle at 35% 30%, #BCD6FF, #2350C8 72%)",
};

type FlowerFormProps = {
  draft: Draft;
  onChange: (patch: Partial<Draft>) => void;
  onSubmit: () => void;
  sending: boolean;
  error: string | null;
};

/** Escolha da flor, para quem é e o bilhete surpresa. */
export const FlowerForm = ({ draft, onChange, onSubmit, sending, error }: FlowerFormProps) => {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };
  const thumb = (id: (typeof PICKER)[number]["id"]): FlowerKind => (id === "rose" ? draft.roseKind : id);

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-md flex-col gap-3 rounded-[28px] border border-line bg-surface p-4 shadow-soft lg:gap-4 lg:p-6"
    >
      <h1 className="sr-only font-serif text-[32px] font-medium leading-tight tracking-[-0.015em] lg:not-sr-only">
        Escolha uma flor para alguém
      </h1>
      <p className="hidden text-[15px] leading-relaxed text-muted lg:block">Ela vai nascer na tela de quem receber o link.</p>

      <fieldset>
        <legend className="sr-only">Escolha uma flor</legend>
        <div className="grid grid-cols-4 gap-2">
          {PICKER.map((item) => (
            <label
              key={item.id}
              className={cn(
                "relative flex min-h-[76px] cursor-pointer flex-col items-center gap-1 rounded-[18px] border-[1.5px] px-1 py-2 text-[13px] font-semibold text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                draft.picker === item.id ? "border-accent bg-accent-soft" : "border-line bg-surface hover:bg-surface-2",
              )}
            >
              <input
                type="radio"
                name="flor"
                value={item.id}
                checked={draft.picker === item.id}
                onChange={() => onChange({ picker: item.id })}
                className="absolute inset-0 m-0 cursor-pointer appearance-none opacity-0"
              />
              <Flower flower={{ kind: thumb(item.id), color: item.id === "rose" ? draft.color : "red" }} size={36} still decorative className="pointer-events-none" />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      {draft.picker === "rose" && (
        <div className="flex items-center justify-between gap-2">
          <fieldset className="flex rounded-full bg-surface-2 p-1">
            <legend className="sr-only">Tipo de rosa</legend>
            {ROSE_KINDS.map((kind) => (
              <label
                key={kind.id}
                className={cn(
                  "relative flex min-h-10 cursor-pointer items-center rounded-full px-3 text-sm font-semibold sm:px-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent",
                  draft.roseKind === kind.id ? "bg-ink text-bg" : "text-ink",
                )}
              >
                <input
                  type="radio"
                  name="tipo"
                  value={kind.id}
                  checked={draft.roseKind === kind.id}
                  onChange={() => onChange({ roseKind: kind.id })}
                  className="absolute inset-0 m-0 cursor-pointer appearance-none opacity-0"
                />
                {kind.label}
              </label>
            ))}
          </fieldset>
          <fieldset className="flex gap-1.5">
            <legend className="sr-only">Cor da rosa</legend>
            {ROSE_COLORS.map((color) => (
              <label
                key={color.id}
                title={color.label}
                className={cn(
                  "relative grid size-11 cursor-pointer place-items-center rounded-full border-2 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                  draft.color === color.id ? "border-ink" : "border-transparent",
                )}
              >
                <input
                  type="radio"
                  name="cor"
                  value={color.id}
                  checked={draft.color === color.id}
                  onChange={() => onChange({ color: color.id })}
                  className="absolute inset-0 m-0 cursor-pointer appearance-none opacity-0"
                />
                <span className="sr-only">{color.label}</span>
                <span aria-hidden="true" className="size-[30px] rounded-full" style={{ background: SWATCH[color.id] }} />
              </label>
            ))}
          </fieldset>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="para" className="text-[13px] font-semibold tracking-[0.02em] text-muted">
          Para
        </label>
        <input
          id="para"
          type="text"
          value={draft.to}
          onChange={(event) => onChange({ to: event.target.value })}
          maxLength={GIFT_LIMITS.to}
          placeholder="Nome de quem vai receber"
          autoComplete="off"
          className={INPUT}
        />
      </div>

      <div className="flex flex-col gap-2 rounded-[18px] bg-surface-2 p-3 pl-3.5">
        <div>
          <label htmlFor="bilhete" className="text-[15px] font-semibold">
            Bilhete surpresa
          </label>
          <p id="bilhete-dica" className="mt-0.5 text-[13px] leading-snug text-muted">
            Aparece depois que a flor abrir · {draft.note.length}/{GIFT_LIMITS.note}
          </p>
        </div>
        <textarea
          id="bilhete"
          aria-describedby="bilhete-dica"
          rows={3}
          value={draft.note}
          onChange={(event) => onChange({ note: event.target.value })}
          maxLength={GIFT_LIMITS.note}
          placeholder="Escreva o que você quer que a pessoa leia depois da flor (opcional)"
          className={cn(INPUT, "resize-none bg-surface font-serif leading-normal")}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-[14px] bg-accent-soft px-3.5 py-2.5 text-sm font-medium text-ink">
          {error}
        </p>
      )}

      <button type="submit" disabled={sending} className={cn(PRIMARY_BUTTON, "w-full")}>
        {sending ? "Guardando a flor…" : "Enviar flor"}
        {!sending && <ArrowIcon />}
      </button>
    </form>
  );
};
