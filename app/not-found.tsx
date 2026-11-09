import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { CommonDefs, Ground, Leaf, Stem } from "@/components/flowers/shared";
import { vars } from "@/components/flowers/utils";
import { Stage } from "@/components/stage";
import "@/components/flower.css";

export const metadata: Metadata = {
  title: "Página não encontrada · Mimoflor",
};

/** Um broto que ainda não floresceu, com o botão pendendo para o lado. */
const Sprout = () => (
  <svg
    className="flower w-[min(300px,60vw)] max-h-[38dvh]"
    viewBox="0 0 320 380"
    role="img"
    aria-label="Um broto de flor ainda fechado"
    style={vars({ "--bloom": "2.6s", color: "#ddd6fe" })}
  >
    <defs>
      <CommonDefs />
      <linearGradient id="nfBud" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#6d5bd0" />
        <stop offset="0.5" stopColor="#c4b5fd" />
        <stop offset="1" stopColor="#f5f3ff" />
      </linearGradient>
    </defs>

    <Ground />

    <g className="plant">
      <Stem
        d="M160 358 C160 310 158 262 160 232 C163 196 194 184 200 214"
        width={8}
      />

      <Leaf x={159} y={318} angle={-74} scale={0.9} delay={0.9} kind="ovate" />
      <Leaf x={161} y={282} angle={70} scale={0.8} delay={1.1} kind="ovate" />

      <g transform="translate(200 212) rotate(172)">
        <g className="bud-stay" style={vars({ "--d": 1.6 })}>
          <path
            d="M0 0 C-14 -10 -17 -44 0 -76 C17 -44 14 -10 0 0Z"
            fill="url(#nfBud)"
            stroke="#a78bfa"
            strokeOpacity={0.5}
          />
          <path
            d="M-6 -6 C-12 -30 -8 -52 0 -70"
            fill="none"
            stroke="#fff"
            strokeOpacity={0.35}
          />
          <path d="M-9 -4 L0 6 L9 -4Z" fill="#15803d" />
        </g>
      </g>
    </g>
  </svg>
);

export default function NotFound() {
  return (
    <Stage theme="lost">
      <Sprout />

      <div className="flex flex-col items-center gap-2">
        <p
          className="fade-up message font-allura text-7xl sm:text-9xl leading-none px-2"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="fade-up message font-allura text-2xl sm:text-5xl leading-tight px-2 pb-1">
          Essa flor ainda não nasceu por aqui
        </h1>
        <p className="fade-in text-base sm:text-lg italic text-white/55">
          O endereço que você procurou não existe no jardim.
        </p>
      </div>

      <Link href="/" className="fade-in pill-link">
        Voltar ao jardim
      </Link>

      <Footer />
    </Stage>
  );
}
