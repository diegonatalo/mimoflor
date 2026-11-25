import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Flower } from "@/components/flower";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { EYEBROW, GHOST_BUTTON, PRIMARY_BUTTON } from "@/components/ui";
import { cn } from "@/lib/cn";
import { FAQ, FEATURES, FINAL_CTA, HERO, MANIFESTO, PRIVACY_LINE, SCREENSHOTS, STEPS } from "@/lib/landing";
import { SOURCE_URL } from "@/lib/site";
import { SiteHeader } from "./site-header";

const Wrap = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-14", className)}>{children}</div>
);

const Kicker = ({ children }: { children: ReactNode }) => <p className={cn(EYEBROW, "mb-3.5 tracking-[0.16em]")}>{children}</p>;

const H2 = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h2 className={cn("font-serif text-[clamp(32px,4.2vw,52px)] font-medium leading-[1.06] tracking-[-0.02em]", className)}>{children}</h2>
);

const Hero = () => (
  <section className="overflow-hidden py-[clamp(40px,7vw,88px)]">
    <Wrap className="flex flex-wrap items-center gap-10">
      <div className="min-w-0 flex-[1_1_460px]">
        <Kicker>{HERO.kicker}</Kicker>
        <h1 className="font-serif text-[clamp(44px,6.4vw,84px)] font-medium leading-none tracking-[-0.03em]">
          {HERO.titleStart} <span className="font-normal italic text-accent">{HERO.titleAccent}</span> {HERO.titleEnd}
        </h1>
        <p className="mt-6 max-w-[520px] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-muted">{HERO.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/app" className={PRIMARY_BUTTON}>
            Abrir o app <ArrowIcon />
          </Link>
          <a href="#por-que" className={GHOST_BUTTON}>
            Por que isso existe
          </a>
        </div>
        <p className="mt-5 text-sm text-muted">{HERO.note}</p>
      </div>
      <div className="relative flex min-h-[420px] min-w-0 flex-[1_1_380px] items-end justify-center sm:min-h-[520px]">
        <div className="halo w-[620px] max-w-[120vw]" aria-hidden="true" />
        <div className="relative flex items-end">
          <Flower flower={{ kind: "hydrangea", color: "red" }} decorative className="-mr-16 mb-2.5 w-[150px] sm:w-[220px]" />
          <Flower flower={{ kind: "colombian", color: "red" }} className="relative w-[230px] sm:w-[340px]" />
          <Flower flower={{ kind: "lily", color: "red" }} decorative className="-ml-20 mb-1 w-[160px] sm:w-[230px]" />
        </div>
      </div>
    </Wrap>
  </section>
);

const Manifesto = () => (
  <section id="por-que" className="scroll-mt-4 border-y border-line bg-surface py-[clamp(64px,9vw,120px)]">
    <Wrap>
      <div className="flex flex-wrap gap-[clamp(32px,6vw,96px)]">
        <div className="min-w-0 flex-[1_1_360px]">
          <Kicker>{MANIFESTO.kicker}</Kicker>
          <H2>{MANIFESTO.title}</H2>
        </div>
        <div className="flex min-w-0 flex-[1.3_1_440px] flex-col gap-5 text-[19px] leading-[1.65]">
          {MANIFESTO.paragraphs.map((text, i) => (
            <p key={text} className={cn(i > 0 && "text-muted")}>
              {text}
            </p>
          ))}
        </div>
      </div>
      <figure className="mt-[clamp(48px,7vw,88px)] border-t border-line pt-[clamp(28px,4vw,48px)]">
        <blockquote className="max-w-[920px] font-serif text-[clamp(28px,3.6vw,46px)] font-normal italic leading-tight tracking-[-0.015em]">
          “{MANIFESTO.quote}”
        </blockquote>
      </figure>
      <div className="mt-[clamp(40px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
        {MANIFESTO.values.map((value) => (
          <div key={value.title} className="rounded-3xl bg-bg p-6">
            <h3 className="mb-2 font-serif text-[22px] font-medium">{value.title}</h3>
            <p className="text-base leading-normal text-muted">{value.text}</p>
          </div>
        ))}
      </div>
    </Wrap>
  </section>
);

const HowItWorks = () => (
  <section id="como-funciona" className="scroll-mt-4 py-[clamp(64px,9vw,120px)]">
    <Wrap>
      <Kicker>Como funciona</Kicker>
      <H2 className="max-w-[640px]">Três passos, menos de um minuto.</H2>
      <ol className="mt-[clamp(36px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3.5 rounded-[28px] border border-line bg-surface p-7">
            <div className="flex items-start justify-between">
              <span className="font-serif text-[56px] font-normal italic leading-[0.9] text-accent" aria-hidden="true">
                {i + 1}
              </span>
              <Flower flower={step.flower} size={72} still decorative />
            </div>
            <h3 className="font-serif text-[26px] font-medium tracking-[-0.01em]">{step.title}</h3>
            <p className="text-base leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Wrap>
  </section>
);

const Features = () => (
  <section className="pb-[clamp(64px,9vw,120px)]">
    <Wrap className="flex flex-wrap gap-[clamp(32px,6vw,80px)]">
      <div className="min-w-0 flex-[1_1_320px]">
        <Kicker>Recursos</Kicker>
        <H2>Leve como deve ser um presente.</H2>
      </div>
      <div className="grid min-w-0 flex-[1.6_1_480px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="border-t border-line py-6">
            <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
            <p className="text-base leading-relaxed text-muted">{feature.text}</p>
          </div>
        ))}
      </div>
    </Wrap>
  </section>
);

const Screenshots = () => (
  <section className="bg-surface-2 py-[clamp(64px,9vw,112px)]">
    <Wrap>
      <div className="flex flex-col items-center text-center">
        <Kicker>Por dentro</Kicker>
        <H2 className="max-w-[720px]">Do seu celular para o de quem você gosta.</H2>
      </div>
      <div className="mt-[clamp(40px,5vw,64px)] flex flex-wrap justify-center gap-8">
        {SCREENSHOTS.map((shot) => (
          <figure key={shot.src} className="flex flex-col items-center gap-4">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={273}
              height={591}
              className="h-auto w-[273px] max-w-full rounded-[40px] border border-line shadow-soft"
            />
            <figcaption className="text-[15px] text-muted">{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </Wrap>
  </section>
);

const Privacy = () => (
  <section className="py-[clamp(48px,6vw,72px)]">
    <Wrap>
      <div className="flex flex-wrap items-center gap-[18px] rounded-3xl border border-line px-7 py-6">
        <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
          <CheckIcon />
        </span>
        <p className="min-w-0 flex-[1_1_320px] text-[17px] leading-normal">
          {PRIVACY_LINE}{" "}
          <Link href="/privacidade" className="font-semibold text-accent underline underline-offset-4">
            Ler a política de privacidade
          </Link>
        </p>
      </div>
    </Wrap>
  </section>
);

const Questions = () => (
  <section id="perguntas" className="scroll-mt-4 pb-[clamp(64px,9vw,112px)] pt-[clamp(40px,6vw,80px)]">
    <Wrap className="flex flex-wrap gap-[clamp(32px,6vw,80px)]">
      <div className="min-w-0 flex-[1_1_300px]">
        <Kicker>Perguntas</Kicker>
        <H2>O que costumam perguntar.</H2>
      </div>
      <div className="min-w-0 flex-[1.6_1_480px] border-t border-line">
        {FAQ.map((item) => (
          <details key={item.q} className="group border-b border-line py-1">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[19px] font-semibold">
              {item.q}
              <span aria-hidden="true" className="text-2xl font-normal text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mb-5 max-w-[720px] text-base leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Wrap>
  </section>
);

const FinalCta = () => (
  <section className="relative overflow-hidden border-t border-line bg-surface py-[clamp(72px,10vw,128px)]">
    <div className="halo w-[720px] max-w-[140vw]" aria-hidden="true" />
    <Wrap className="relative flex flex-col items-center gap-5 text-center">
      <Flower flower={{ kind: "sunflower", color: "red" }} size={150} decorative />
      <h2 className="max-w-[760px] font-serif text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.02em]">
        {FINAL_CTA.titleStart} <span className="font-normal italic text-accent">{FINAL_CTA.titleAccent}</span>?
      </h2>
      <p className="text-lg text-muted">{FINAL_CTA.text}</p>
      <Link href="/app" className={PRIMARY_BUTTON}>
        Abrir o app <ArrowIcon />
      </Link>
    </Wrap>
  </section>
);

/** A landing inteira: o projeto, o porquê e o caminho para o app. */
export const LandingPage = () => (
  <>
    <SiteHeader />
    <main id="conteudo">
      <Hero />
      <Manifesto />
      <HowItWorks />
      <Features />
      <Screenshots />
      <Privacy />
      <Questions />
      <FinalCta />
    </main>
    <SiteFooter privacy terms sourceUrl={SOURCE_URL} />
  </>
);
