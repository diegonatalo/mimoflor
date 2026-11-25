"use client";

import { useTheme } from "@/hooks/use-theme";
import { THEME_COLORS, THEME_KEY } from "@/lib/storage-keys";

/** Alterna entre o Orvalho (claro) e o Jardim à noite (escuro). */
export const ThemeToggle = () => {
  const { toggle } = useTheme(THEME_KEY, THEME_COLORS);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Alternar entre tema claro e escuro"
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2"
    >
      {/* O ícone troca só por CSS, sem depender do estado no cliente. */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden size-5 dark:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
    </button>
  );
};
