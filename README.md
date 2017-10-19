# dbwebb-stream gitter

En server som lyssnar på alla publika gitter-rum hos den användare som anges via gitter-token i `gitter-token.js`. Nya meddelanden i gitter-rummen skickas vidare via websocket.

Websocketservern lyssnar på port som anges med miljövariabeln `PORT` eller port 1338 som standard.

## Installation
1. Klona repot.
2. `cd` in och kör `$ npm install`
3. Kopiera `edit-me-gitter-token.js` till `gitter-token.js`
4. Ange ett giltigt gitter-token i `gitter-token.js`

## Starta
`$ npm start`

## Stoppa
`$ npm stop`

 .
..:  @ 2017 Anders Nygren (litemerafrukt@gmail.com)
```
