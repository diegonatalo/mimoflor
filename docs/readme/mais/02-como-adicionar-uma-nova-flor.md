### 🧩 Como adicionar uma nova flor

1. Desenhe a flor em `components/flowers/minha-flor.tsx` num quadro de 320 × 400, com o caule saindo do pé e a cabeça no terço de cima. Use `Stem`, `Leaf`, `Grow` e `Fade` de `shared.tsx`: cada peça recebe o segundo em que nasce.
2. Inclua o tipo em `FlowerKind`, o nome em `flowerName` e o tempo de abrir em `BLOOM_SECONDS` (`lib/flowers.ts`). O bilhete surpresa espera esse tempo.
3. Registre o desenho em `DRAWINGS` (`components/flower.tsx`) e, se for aparecer no seletor, em `PICKER`.
