/** Classes dos botões e campos, iguais em todas as telas. */

const BUTTON =
  "inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 text-base font-semibold transition disabled:cursor-wait disabled:opacity-70";

export const PRIMARY_BUTTON = `${BUTTON} bg-accent text-accent-ink hover:brightness-110`;

export const GHOST_BUTTON = `${BUTTON} border-[1.5px] border-line text-ink hover:bg-surface-2`;

export const QUIET_BUTTON =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-[15px] font-semibold text-ink hover:bg-surface-2";

export const INPUT =
  "w-full rounded-[14px] border-[1.5px] border-line bg-bg px-3.5 py-[11px] text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none";

export const EYEBROW = "text-[13px] font-bold uppercase tracking-[0.14em] text-accent";
