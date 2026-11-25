Requer [Node.js](https://nodejs.org), [pnpm](https://pnpm.io) e um Postgres (no computador, uma branch `dev` do Neon com um banco terminado em `_dev`).

```bash
git clone https://github.com/diegonatalo/mimoflor.git
cd mimoflor
pnpm install
cp .env.example .env.local   # preencha DATABASE_URL e DATABASE_URL_UNPOOLED
pnpm db:migrate              # cria as tabelas no banco do .env.local
pnpm dev                     # http://localhost:3000
```

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Gera o build de produção (checa os tipos) |
| `pnpm start` | Serve o build de produção |
| `pnpm lint` | Roda o ESLint |
| `pnpm test` | Roda os testes (Vitest) |
| `pnpm test:e2e` | Roda os testes de ponta a ponta (Playwright) contra o build |
| `pnpm db:generate` | Gera uma migração em `drizzle/` depois de mudar `lib/db/schema.ts` |
| `pnpm db:migrate` | Aplica as migrações no banco do `.env.local` |

### 🔑 Variáveis de ambiente

Veja [`.env.example`](.env.example).

| Variável | Descrição | Se não definir |
|---|---|---|
| `DATABASE_URL` | Postgres (Neon) com pooling, usado pelo app. No computador, o nome do banco precisa terminar em `_dev`. | O app não guarda flores |
| `DATABASE_URL_UNPOOLED` | Conexão direta, usada pelas migrações. | Usa a `DATABASE_URL` |
| `RATE_LIMIT_SECRET` | Chave do HMAC que embaralha o IP na contagem de flores por hora. Uma diferente por ambiente. | Cada servidor sorteia a sua |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site, para Open Graph, robots e sitemap. Sem barra no final. | Usa `https://mimoflor.vercel.app` |
