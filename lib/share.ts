/** O link da flor: o código vai no caminho e a chave depois do `#`, que não sai do navegador. */
export const giftUrl = (origin: string, id: string, key: string) => `${origin.replace(/\/+$/, "")}/app/f/${id}#${key}`;

/** Texto que acompanha o link quando ele é enviado. Sem nome nem mensagem, para não estragar a surpresa. */
export const SHARE_TEXT = "Fiz uma flor pra você 🌸";

/** Abre o WhatsApp com o texto e o link prontos para enviar. */
export const whatsappUrl = (link: string) => `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${link}`)}`;
