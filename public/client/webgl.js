// @ts-nocheck

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("types", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("webgl", [], function (exports_2, context_2) {
    "use strict";
    var WebGL;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            WebGL = class WebGL {
                constructor(gl, vertexShader, fragmentShader) {
                    this.gl = gl;
                    this.program = this.gl.createProgram();
                    this.createAndAttachShader(vertexShader, "vertex");
                    this.createAndAttachShader(fragmentShader, "fragment");
                    this.link();
                    this.uniforms = {};
                }
                createAndAttachShader(shaderCode, shaderType) {
                    let shader;
                    if (shaderType == "vertex") {
                        shader = this.gl.createShader(this.gl.VERTEX_SHADER);
                    }
                    else if (shaderType == "fragment") {
                        shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
                    }
                    else
                        return null;
                    this.gl.shaderSource(shader, shaderCode);
                    this.gl.compileShader(shader);
                    let control = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
                    if (!control) {
                        console.error(`Error compiling ${shaderType} shader`);
                        console.log(this.gl.getShaderInfoLog(shader));
                    }
                    this.gl.attachShader(this.program, shader);
                }
                link() {
                    this.gl.linkProgram(this.program);
                    let control = this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS);
                    if (!control)
                        console.error("Shaders have problem");
                }
                use() {
                    this.gl.useProgram(this.program);
                }
                get getGL() {
                    return this.gl;
                }
                get programID() {
                    return this.program;
                }
                set uniform(uniform_name) {
                    this.uniforms[uniform_name] = this.gl.getUniformLocation(this.program, uniform_name);
                }
                uniform_value_1f(uniform_name, value) {
                    this.gl.uniform1f(this.uniforms[uniform_name], value);
                }
            };
            exports_2("WebGL", WebGL);
        }
    };
});

const __exp = __instantiate("webgl", false);
export const WebGL = __exp["WebGL"];
