```text
├── app/
│   ├── page.tsx                 "/" a landing
│   ├── app/page.tsx             "/app" criar a flor
│   ├── app/f/[id]/page.tsx      "/app/f/<código>#<chave>" quem recebe
│   ├── privacidade/, termos/    páginas legais
│   ├── not-found.tsx, error.tsx 404 e erro no visual do app
│   └── opengraph-image.tsx      prévia do link
├── components/
│   ├── flower.tsx, flower.css   monta a flor e a animação de nascer
│   ├── flowers/                 rosa, rosa colombiana, girassol, hortênsia e lírio
│   ├── creator/                 formulário, bilhete surpresa e tela de compartilhar
│   ├── received/                convite, flor e bilhete de quem recebe
│   └── landing/                 seções da landing
├── lib/
│   ├── gift.ts                  o presente e a validação dele
│   ├── gift-crypto.ts           cifra e decifra no navegador (AES-GCM)
│   ├── sealed.ts                o que o servidor aceita guardar e por quanto tempo
│   ├── flowers.ts               catálogo das flores e tempo de abrir
│   ├── flower-geometry.ts       contas dos desenhos (sementes, florzinhas, estames)
│   ├── data/actions.ts          guarda a flor cifrada e limita por hora
│   ├── data/queries.ts          lê a flor cifrada de um código
│   └── db/                      schema e conexão (Drizzle + pg)
├── drizzle/                     migrações
└── e2e/                         Playwright: fluxo completo, navegação e prints
```
