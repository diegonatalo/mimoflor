### 🌐 Deploy

Publicado na [Vercel](https://vercel.com), só a partir da `main`. O banco vem da integração Neon da Vercel. O script `vercel-build` roda `drizzle-kit migrate` antes do `next build`, então as migrações sobem junto com o deploy.

> [!IMPORTANT]
> Defina `RATE_LIMIT_SECRET` na Vercel (um valor diferente por ambiente). Sem ele, cada instância sorteia a sua chave e o limite de flores por hora passa a contar separado.
