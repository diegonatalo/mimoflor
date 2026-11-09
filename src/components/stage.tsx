import type { CSSProperties, ReactNode } from "react";

const DUST = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  size: 2 + ((i * 5) % 4),
  duration: 14 + ((i * 7) % 12),
  delay: -((i * 3.3) % 20),
  drift: (i % 2 ? 1 : -1) * (20 + ((i * 13) % 60)),
}));

type StageProps = {
  /** nome do tema de cores (ver `.stage[data-flower]` em globals.css) */
  theme: string;
  children: ReactNode;
};

/** Fundo atmosférico (brilho, halo e poeira de luz) compartilhado pelas páginas. */
export const Stage = ({ theme, children }: StageProps) => (
  <div
    data-flower={theme}
    className="stage min-h-dvh flex items-center flex-col gap-4 px-6 pt-6 sm:pt-10 text-center pb-6"
  >
    <div className="halo" aria-hidden="true" />
    <div className="dust" aria-hidden="true">
      {DUST.map((d, i) => (
        <i
          key={i}
          style={
            {
              left: d.left,
              "--s": `${d.size}px`,
              "--d": `${d.duration}s`,
              "--delay": `${d.delay}s`,
              "--x": `${d.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
    {children}
  </div>
);
