### 🧩 Como adicionar uma nova flor

1. Crie `src/components/flowers/minha-flor.tsx` exportando um componente de gradientes (`MinhaFlorDefs`) e um da planta (`MinhaFlorPlant`). Use `Stem`, `Leaf` e `Petal` de `shared.tsx`.
2. Registre a flor em `flowers/registry.tsx`: nome, `slug` da URL, cor da bolinha no seletor e uma função `view` que devolve o desenho, o tema, a cor dos brilhos, a posição da cabeça e o segundo em que ela começa a abrir.
3. Crie o tema de cores em `index.css`, no bloco `.stage[data-flower="..."]`.
4. Para dar variações (como tipo e cor da rosa), declare `options` no registro. O seletor desenha a fileira de opções sozinho, e `view` recebe a escolha feita.
