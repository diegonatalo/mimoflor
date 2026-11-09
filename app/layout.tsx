import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const allura = Allura({ subsets: ["latin"], weight: "400", variable: "--nf-allura", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--nf-cormorant",
  display: "swap",
});

const TITLE = "Mimoflor · Uma flor para você";
const IMAGE = "/og-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "pt_BR",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: IMAGE,
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "Uma hortênsia azul desabrochando sobre a frase “Uma flor para alegrar o seu dia”",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#07070d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${allura.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
