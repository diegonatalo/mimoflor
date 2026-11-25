import { ImageResponse } from "next/og";
import { LIGHT_ACCENT, markSvg } from "@/lib/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME}: mande uma flor que floresce na tela de alguém`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          gap: 36,
          background: "radial-gradient(circle at 78% 46%, #F9E1EA 0%, #F6F3F9 46%)",
          color: "#221A30",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSvg(LIGHT_ACCENT, "#F6F3F9", "#2F6B4F")} width={96} height={96} alt="" />
          <span style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2 }}>mimoflor</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 900 }}>
          Mande uma flor que&nbsp;<span style={{ color: LIGHT_ACCENT }}>floresce</span>&nbsp;na tela de alguém.
        </div>
      </div>
    ),
    size,
  );
}
