/**
 * Endereço público do site, sem barra final. Usado em metadados, robots e sitemap.
 * Para publicar em outro domínio, defina NEXT_PUBLIC_SITE_URL no build.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mimoflor.vercel.app").replace(/\/+$/, "");

export const SITE_NAME = "Mimoflor";
export const SITE_DESCRIPTION =
  "Mande uma flor que floresce na tela de alguém: escolha a flor, escreva para quem é e envie um link curto, cifrado e sem spoiler.";

/** Repositório público do projeto. */
export const SOURCE_URL = "https://github.com/diegonatalo/mimoflor";

/**
 * Contato para pedidos sobre dados pessoais (LGPD, art. 18), mostrado em `/privacidade`.
 * TODO: trocar pelo e-mail definitivo; o standard-kit avisa enquanto este for o provisório.
 */
export const PRIVACY_EMAIL = "contato@exemplo.com.br";

/** Rotas públicas, usadas pelo sitemap. */
export const ROUTES = ["/", "/app", "/privacidade", "/termos"];
