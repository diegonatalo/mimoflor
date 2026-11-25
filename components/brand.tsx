import Link from "next/link";
import { cn } from "@/lib/cn";

const PETALS = Array.from({ length: 5 }, (_, k) => {
  const angle = ((k * 72 - 90) * Math.PI) / 180;
  return { cx: +(16 + 6.2 * Math.cos(angle)).toFixed(2), cy: +(12 + 6.2 * Math.sin(angle)).toFixed(2) };
});

type MarkProps = {
  size?: number;
  className?: string;
  /** cores; por padrão, pétala, fundo e folha do tema */
  petal?: string;
  center?: string;
  stem?: string;
};

/** A marca: cinco pétalas e um cabinho que vira laço, uma flor que também é presente. */
export const Mark = ({
  size = 32,
  className,
  petal = "var(--accent)",
  center = "var(--bg)",
  stem = "var(--leaf)",
}: MarkProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={cn("shrink-0", className)}>
    {PETALS.map((p) => (
      <circle key={`${p.cx}-${p.cy}`} cx={p.cx} cy={p.cy} r={5.3} fill={petal} />
    ))}
    <circle cx={16} cy={12} r={2.7} fill={center} />
    <path d="M16,18.5 C16.6,23 15,27 10.5,29" stroke={stem} strokeWidth={2} strokeLinecap="round" fill="none" />
    <path d="M16.2,23.2 C19,21.2 22,21 24.4,22.6 C22.2,24.6 19.2,24.8 16.2,23.2Z" fill={stem} />
  </svg>
);

/** "mimo" em itálico, como dito baixinho; "flor" de pé. */
export const Wordmark = ({ className }: { className?: string }) => (
  <span className={cn("font-serif font-semibold tracking-[-0.02em] leading-none", className)}>
    <span className="font-[450] italic">mimo</span>flor
  </span>
);

/** Marca e nome, com link. `size` é o tamanho do nome em px. */
export const BrandLink = ({ href = "/", size = 22 }: { href?: string; size?: number }) => (
  <Link href={href} aria-label="Mimoflor, página inicial" className="flex items-center gap-2 rounded-full text-ink" style={{ fontSize: size }}>
    <Mark size={size + 8} />
    <Wordmark />
  </Link>
);
