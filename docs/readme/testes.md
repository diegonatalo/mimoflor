### 🧪 Testes

```bash
pnpm test        # Vitest
pnpm test:e2e    # Playwright, contra o build de produção e o Postgres
```

O Vitest cobre a cifragem (abre com a chave certa, recusa chave errada e texto adulterado), a validação do presente e do que o servidor guarda, o código curto, a geometria das flores, a tela de criação (bilhete surpresa, envio só do texto cifrado) e a de quem recebe (convite, bilhete depois da flor, link sem chave).

O Playwright cria uma flor pela interface, abre o link num navegador limpo, confere que a chave nunca vai ao servidor e que o bilhete aparece depois da flor. No CI, roda contra um Postgres descartável.

Os prints da landing e deste README saem de `SCREENSHOTS=1 pnpm test:e2e e2e/screenshots.spec.ts`.
