### 🔐 Como o link fica curto e sem spoiler

1. O navegador de quem envia monta o presente (flor, nome e bilhete) e cifra com uma chave AES-GCM nova, gerada ali mesmo.
2. Só o texto cifrado e o IV vão para o servidor, que guarda os dois no Postgres com um código aleatório de 10 letras, válido por 90 dias.
3. O link é `/app/f/<código>#<chave>`. O que vem depois do `#` nunca sai do navegador: não chega ao servidor, ao banco nem aos logs.
4. Quem recebe abre o link, o navegador busca o texto cifrado pelo código e decifra com a chave do `#`.

| Peça | Onde fica |
|---|---|
| Nome e bilhete | Só dentro do texto cifrado |
| Texto cifrado e IV | Banco (Neon, São Paulo), por 90 dias |
| Chave | Só no link, depois do `#` |
| IP de quem cria | Nunca: só um HMAC, para limitar 30 flores por hora |
