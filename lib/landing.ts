/** Textos da landing (`/`). As seções ficam em `components/landing/`. */
import type { FlowerChoice } from "@/lib/flowers";
import { GIFT_LIMITS } from "@/lib/gift";
import { STORE_LIMITS } from "@/lib/sealed";

export const HERO = {
  kicker: "Um mimo em forma de flor",
  titleStart: "Mande uma flor que",
  titleAccent: "floresce",
  titleEnd: "na tela de alguém.",
  subtitle:
    "Escolha a flor, escreva para quem é e envie um link. Quem abre vê a flor nascer pétala por pétala. E você ganha o melhor presente de todos: a reação.",
  note: "Grátis, sem cadastro, abre em qualquer celular.",
};

export const MANIFESTO = {
  kicker: "Por que existe",
  title: "Tecnologia também serve para deixar o dia de alguém mais bonito.",
  paragraphs: [
    "A gente passa o dia usando tecnologia para resolver coisas: pagar, responder, entregar, otimizar. O Mimoflor nasceu de uma vontade diferente. Usar código para uma coisa pequena, sem utilidade nenhuma além de fazer alguém sorrir.",
    "Cada flor foi desenhada à mão, em código, curva por curva. Não porque alguém fosse notar a diferença, mas porque quem recebe merece algo feito com cuidado.",
    "E existe um momento que nenhuma métrica mede. A pessoa abre o link, a flor começa a se abrir e chega a resposta: um “que lindo”, um áudio rindo, um print com coração. É ali que todo o trabalho faz sentido.",
  ],
  quote: "O melhor retorno de um projeto não é um número. É alguém sorrindo do outro lado da tela.",
  values: [
    { title: "Pequeno de propósito", text: "Uma tela, uma flor, um bilhete. Nada para configurar, nada para aprender." },
    { title: "Feito para ser enviado", text: "Não fica parado num app. Ele vive na conversa, entre você e quem você gosta." },
    {
      title: "A recompensa é a reação",
      text: "Aquela sensação boa de ter acertado em cheio, de ver que um gesto pequeno chegou longe.",
    },
  ],
};

export type Step = { title: string; text: string; flower: FlowerChoice };

export const STEPS: Step[] = [
  {
    title: "Escolha a flor",
    text: "Rosa nacional ou colombiana, vermelha ou azul. Girassol, hortênsia, lírio ou um buquê com todas elas. Cada uma com seu jeito de nascer.",
    flower: { kind: "rose", color: "red" },
  },
  {
    title: "Escreva para quem é",
    text: "Um nome e, se quiser, um bilhete surpresa, que só aparece depois que a flor termina de abrir.",
    flower: { kind: "sunflower", color: "red" },
  },
  {
    title: "Envie o link",
    text: "Pelo WhatsApp ou por onde você conversa. Um link curto, que não entrega a surpresa antes da hora.",
    flower: { kind: "colombian", color: "blue" },
  },
];

export const FEATURES = [
  { title: "Desenhadas em código", text: "Cada flor é um desenho vetorial feito do zero. Fica nítida em qualquer tela e carrega num instante." },
  { title: "Sem cadastro", text: "Não pede conta, e-mail nem telefone. Você abre, escolhe e envia." },
  { title: "Link curto, sem spoiler", text: "O link não mostra o nome nem o bilhete. Quem recebe só descobre ao abrir." },
  { title: "Cifrado no seu aparelho", text: "A flor sai do seu celular já cifrada. A chave fica no link: nem nós conseguimos ler." },
  { title: "Claro e escuro", text: "Segue o tema do seu aparelho, ou o que você preferir." },
  { title: "Para todo mundo", text: "Funciona só com o teclado, conversa com leitores de tela e respeita quem prefere menos movimento." },
];

export const SCREENSHOTS = [
  { src: "/landing/criar.webp", caption: "Você escolhe a flor", alt: "Tela de criação com uma rosa colombiana vermelha e o bilhete surpresa ligado" },
  { src: "/landing/recebido.webp", caption: "A pessoa recebe o convite", alt: "Convite com o texto “Ana, chegou uma flor pra você” e o botão para abrir" },
  { src: "/landing/aberto.webp", caption: "E a flor nasce para ela", alt: "A flor aberta para Ana, com o bilhete surpresa logo abaixo" },
];

export const PRIVACY_LINE =
  "Sem conta e sem rastreamento: a flor e as mensagens são cifradas no seu aparelho, e a chave para abrir viaja só no link.";

export const FAQ = [
  { q: "Precisa criar conta?", a: "Não. O Mimoflor não tem cadastro: você abre, escolhe a flor e envia o link." },
  { q: "Quanto custa?", a: "Nada. É um projeto pessoal, feito por gosto, e vai continuar grátis." },
  { q: "A pessoa precisa instalar alguma coisa?", a: "Não. O link abre direto no navegador, em qualquer celular ou computador." },
  {
    q: "Posso escrever uma mensagem?",
    a: `Pode. O bilhete surpresa, de até ${GIFT_LIMITS.note} caracteres, só aparece depois que a flor termina de abrir.`,
  },
  {
    q: "Quem consegue ler a mensagem?",
    a: "Só quem tiver o link inteiro. Guardamos a flor cifrada, e a chave para abrir fica no fim do link, depois do #, uma parte que o navegador nunca envia ao servidor.",
  },
  {
    q: "O link vale para sempre?",
    a: `Ele funciona por ${STORE_LIMITS.days} dias. Depois disso, a flor cifrada é apagada do banco.`,
  },
];

export const FINAL_CTA = {
  titleStart: "Tem alguém que merece uma flor",
  titleAccent: "hoje",
  text: "Leva menos de um minuto. A reação dura bem mais.",
};
