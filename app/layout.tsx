import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { THEME_COLORS, THEME_KEY } from "@/lib/storage-keys";
import { themeScript } from "@/lib/theme";

// Fraunces: títulos e mensagens, a voz da flor. Figtree: botões, campos e apoio.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

const TITLE = "Mimoflor · Mande uma flor que floresce na tela de alguém";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Mimoflor" },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "pt_BR",
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLORS.light,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript(THEME_KEY, THEME_COLORS) }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only rounded-full bg-accent px-5 py-3 font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
