```text
src/
├── app/
│   ├── layout.tsx           metadados, Open Graph, ícones e fontes
│   ├── page.tsx             "/" lê a flor da URL e abre a home (flor inexistente cai na 404)
│   ├── not-found.tsx        página 404
│   └── globals.css          temas por flor, fundo, tipografia e seletor
├── lib/
│   └── flower-url.ts        lê e escreve a flor escolhida na URL
└── components/
    ├── home.tsx             flor, frase e seletor
    ├── flower.tsx           monta o SVG da flor escolhida
    ├── flower.css           linha do tempo e keyframes da animação
    ├── flower-picker.tsx    seletor de flores
    ├── flower-options.tsx   opções da flor escolhida (tipo, cor)
    ├── message.tsx          frase abaixo da flor
    ├── stage.tsx            fundo com halo e poeira de luz
    └── flowers/
        ├── registry.tsx     flores disponíveis, slugs e opções
        ├── shared.tsx       caule, folhas, chão, brilhos e pétala genérica
        ├── palettes.ts      cores (vermelha e azul) das rosas
        ├── utils.ts         aleatório determinístico e helper de variáveis CSS
        └── rose, colombian-rose, sunflower, hydrangea, lily
```
