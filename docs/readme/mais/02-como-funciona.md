### 🧠 Como funciona

| Conceito | Regra |
|---|---|
| **Flor padrão** | Sem `flor` na URL, abre a hortênsia. |
| **Parâmetros** | `flor` (`rosa`, `girassol`, `hortensia`, `lirio`), e só para a rosa: `tipo` (`nacional`, `colombiana`) e `cor` (`vermelha`, `azul`). |
| **Valor inválido** | Um valor que não existe em `flor`, `tipo` ou `cor` leva à página 404. |
| **Parâmetros de fora** | `utm_source`, `fbclid` e similares são ignorados. `tipo` e `cor` em flor que não os tem também. |
| **Opções da rosa** | Na abertura da página, entram só depois do seletor de flores. Em trocas seguintes, aparecem na hora. |
| **Animação** | Só CSS, sem biblioteca. As flores são SVG desenhado em código. |

A lógica da URL fica em `lib/flower-url.ts`, e cada flor declara o próprio texto de URL (`slug`) no registro.
