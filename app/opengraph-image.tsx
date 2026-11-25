import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LIGHT_ACCENT, markSvg } from "@/lib/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME}: mande uma flor que floresce na tela de alguém`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A Fraunces da identidade (a mesma do site), em arquivos estáticos: o gerador de
// imagens não lê fontes variáveis nem woff2. Lidas uma vez, quando o módulo carrega.
const font = (file: string) => readFile(join(process.cwd(), "node_modules/@fontsource/fraunces/files", file));
const [regularItalic, medium, semibold] = await Promise.all([
  font("fraunces-latin-400-italic.woff"),
  font("fraunces-latin-500-normal.woff"),
  font("fraunces-latin-600-normal.woff"),
]);

const INK = "#221A30";
// palavra por palavra, para o título quebrar como texto corrido
const TITLE = "Mande uma flor que floresce na tela de alguém.".split(" ");
const ACCENT = "floresce";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          gap: 40,
          background: "radial-gradient(circle at 78% 46%, #F9E1EA 0%, #F6F3F9 46%)",
          color: INK,
          fontFamily: "Fraunces",
        }}
      >
        {/* "mimo" em itálico, como no site; "flor" de pé */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSvg(LIGHT_ACCENT, "#F6F3F9", "#2F6B4F")} width={92} height={92} alt="" />
          <div style={{ display: "flex", fontSize: 66, letterSpacing: -1.5 }}>
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>mimo</span>
            <span style={{ fontWeight: 600 }}>flor</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 920,
            fontSize: 84,
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          {TITLE.map((word) => (
            <span key={word} style={word === ACCENT ? { fontStyle: "italic", fontWeight: 400, color: LIGHT_ACCENT, marginRight: 20 } : { marginRight: 20 }}>
              {word}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: regularItalic, style: "italic", weight: 400 },
        { name: "Fraunces", data: medium, style: "normal", weight: 500 },
        { name: "Fraunces", data: semibold, style: "normal", weight: 600 },
      ],
    },
  );
}
