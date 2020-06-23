import { task, sh, run, desc } from "https://deno.land/x/drake@v1.2.3/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";

export async function tsTojs(file_path: string, destination_path: string){
    await sh(`tsc -p ${file_path}`)
    .then(async ()=>{
        await Deno.copyFile("from.txt", "to.txt");
    });
}