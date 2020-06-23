import { Router } from "./deps.ts"

import { WebGL } from "../client/webgl.ts"; 

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = `hello`;
});

router.get("/main", (ctx) => {
    // ctx.type = "text/typescript";
    ctx.response.body = WebGL;
})

export default router;
