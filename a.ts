import { task, sh, run, desc } from "https://deno.land/x/drake@v1.2.3/mod.ts";

desc("compile");
task("compile", [], async function(){
    // const [errors, emitted] = await Deno.compile(
    //     "client/main.ts",
    //     undefined,
    //     {
    //         lib: ["dom"],
    //     }
    // );
    // const encoder = new TextEncoder();
    // const data = encoder.encode(emitted[1]);
    // await Deno.writeFile("public/client/main.js", data);
    // console.log(emitted);
    await sh("deno bundle client/src/main.ts public/client/main.js --config client/src/tsconfig.json");
});

desc("Run");
task("start", [], async function(){
    await sh("deno run --allow-env --allow-net --allow-read src/server.ts",);
});

desc("Cached");
task("cache", [], async function(){
    await sh("deno cache --lock=lock.json --lock-write src/server.ts");
});

run();