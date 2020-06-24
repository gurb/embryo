/// <reference lib="dom" />

import {WebGL} from "../webgl.ts";

function main(){
    var btn = document.createElement("BUTTON");   // Create a <button> element
    btn.innerHTML = "CLICK ME";                   // Insert text
    document.body.appendChild(btn);
}

main();