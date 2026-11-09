import type { Metadata, Viewport } from "next";
import "./globals.css";

const TITULO = "Mimoflor · Uma flor para você";
const DESCRICAO =
  "Escolha uma flor — rosa (nacional ou colombiana, vermelha ou azul), girassol, hortênsia ou lírio — e veja ela nascer.";
const IMAGEM = "/og-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://mimoflor.vercel.app"),
  title: TITULO,
  description: DESCRICAO,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Mimoflor",
    locale: "pt_BR",
    url: "/",
    title: TITULO,
    description: DESCRICAO,
    images: [
      {
        url: IMAGEM,
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "Uma hortênsia azul desabrochando sobre a frase “Uma flor para alegrar o seu dia”",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
    images: [IMAGEM],
  },
};

export const viewport: Viewport = {
  themeColor: "#07070d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
