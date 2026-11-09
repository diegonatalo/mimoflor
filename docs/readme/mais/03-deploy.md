### 🌐 Deploy

Publicado na [Vercel](https://vercel.com). Não há configuração extra: a Vercel detecta o Next.js. Uma flor inexistente na URL (ou qualquer outro caminho) devolve a 404 do próprio site, com status 404 de verdade.

> [!NOTE]
> As URLs das meta tags Open Graph (`metadataBase` em `src/app/layout.tsx`) são absolutas. Se o domínio mudar, atualize-as.

Ícones e imagens ficam em `public/`:

| Arquivo | Para que serve |
|---|---|
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Ícone do site |
| `og-image.jpg` | Prévia do link compartilhado (1200×630), hoje a da hortênsia |
| `og/*.jpg` | Uma prévia pronta para cada flor, ainda sem uso nas meta tags |
