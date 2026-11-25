/** A marca como imagem (data URL de SVG), para as imagens geradas pelo `next/og`. */

export const LIGHT_ACCENT = "#C22F62";

const PETALS = Array.from({ length: 5 }, (_, k) => {
  const angle = ((k * 72 - 90) * Math.PI) / 180;
  return [(16 + 6.2 * Math.cos(angle)).toFixed(2), (12 + 6.2 * Math.sin(angle)).toFixed(2)];
});

export const markSvg = (petal: string, center: string, stem: string): string => {
  const circles = PETALS.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="5.3" fill="${petal}"/>`).join("");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${circles}` +
    `<circle cx="16" cy="12" r="2.7" fill="${center}"/>` +
    `<path d="M16,18.5 C16.6,23 15,27 10.5,29" stroke="${stem}" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<path d="M16.2,23.2 C19,21.2 22,21 24.4,22.6 C22.2,24.6 19.2,24.8 16.2,23.2Z" fill="${stem}"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
