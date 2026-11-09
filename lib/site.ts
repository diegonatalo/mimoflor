/**
 * Endereço público do site, sem barra final. Usado em metadados, robots e sitemap.
 * Para publicar em outro domínio, defina NEXT_PUBLIC_SITE_URL no build.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mimoflor.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Mimoflor";
export const SITE_DESCRIPTION =
  "Escolha uma flor — rosa (nacional ou colombiana, vermelha ou azul), girassol, hortênsia ou lírio — e veja ela nascer.";
