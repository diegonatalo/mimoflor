### 🌐 Deploy

Publicado na [Vercel](https://vercel.com). O `vercel.json` manda todos os caminhos para o `index.html` (SPA fallback), e assim a 404 do site aparece no lugar da padrão da Vercel.

> [!NOTE]
> As URLs das meta tags Open Graph, em `index.html`, são absolutas. Se o domínio mudar, atualize-as.

Ícones e imagens ficam em `public/`:

| Arquivo | Para que serve |
|---|---|
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Ícone do site |
| `og-image.jpg` | Prévia do link compartilhado (1200×630), hoje a da hortênsia |
| `og/*.jpg` | Uma prévia pronta para cada flor, ainda sem uso nas meta tags |
