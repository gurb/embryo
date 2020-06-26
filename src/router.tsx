import { Router, React, ReactDOMServer, Context } from "./deps.ts"

import { WebGL } from "../client/webgl.ts"; 

import App from "../client/src/app.tsx";

const router = new Router();

const jsBundle = "/main.js";
  
const js =
`import React from "https://jspm.dev/react@16.13.1";
 import ReactDOM from "https://jspm.dev/react-dom@16.13.1";
 import App from './../client/src/app';
  import { main } from './../client/src/main';
  main();
  const App = ${App};
 ReactDOM.hydrate(React.createElement(App), document.getElementById('app'));`;  


const html =
  `<html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css">
      <script type="module" src="${jsBundle}"></script>
    </head>
    <body>
      <main id="app">${ReactDOMServer.renderToString(<App />)}</main>  
    </body>
  </html>`;

router.get('/', (ctx) => {
    ctx.response.type = 'text/html';
    ctx.response.body = html;
  })
  .get(jsBundle, (ctx) => {
    ctx.response.type = 'application/javascript';
    ctx.response.body = js;
});

router.get("/main", (ctx) => {
    // ctx.type = "text/typescript";
    ctx.response.body = WebGL;
})

export default router;
