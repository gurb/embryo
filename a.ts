import { task, sh, run, desc } from "https://deno.land/x/drake@v1.2.3/mod.ts";

desc("compile");
task("compile", [], async function(){
    await sh("deno bundle client/src/main.ts public/client/main.js --config client/src/tsconfig.json");
});

desc("Run");
task("start", [], async function(){
    await sh("deno run --unstable --allow-env --allow-net --allow-read src/server.tsx",);
});

desc("Cached");
task("cache", [], async function(){
    await sh("deno cache --lock=lock.json --lock-write src/server.ts");
});

run();