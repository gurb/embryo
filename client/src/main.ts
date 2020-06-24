/// <reference lib="dom" />

import {WebGL} from "../webgl.ts";

var vertexShader = `#version 300 es
        
in vec3 aVertexPosition;
uniform float uMoveX;
void main(){
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = vec4(aVertexPosition + vec3(uMoveX, 0.0f, 0.0f), 1.0);
}`;

var fragmentShader = `#version 300 es
        
precision mediump float;
out vec4 outColor;
void main(){
    outColor = vec4(0.0, 0.0, 0.0, 1.0);
}`;
var positions = [
    -0.6, -0.6, 0.0,
    0.5, -0.5, 0.0,
    0.0, 0.5, 0.0
];

var deger = 0;

function main(){
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    document.body.appendChild(canvas);
    var gl:any = canvas.getContext('webgl2')
    var GL = new WebGL(gl, vertexShader, fragmentShader);
    GL.use();
    gl = GL.getGL();
    let program = GL.programID();

    GL.uniform("uMoveX");


    let vertexPositionAttributeLocation = gl.getAttribLocation(program, "aVertexPosition");


    //gl.uniform1f(location, v0)

    //gl.uniformMatrix4fv(modelViewMatrixUniformLocation, false, data)
    //gl.uniformMatrix4fv(projectionMatrixUniformLocation, false, data)


    var positionBuffer = gl.createBuffer(); // vbo
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    var vao = gl.createVertexArray(); // vao
    gl.bindVertexArray(vao); // activate VAO which we use

    // so far vao and vbo each other connected automatically

    gl.enableVertexAttribArray(vertexPositionAttributeLocation);
    gl.vertexAttribPointer(vertexPositionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    GL.uniform_value_1f("uMoveX", deger);
    deger+=0.1;
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    //renderGL();
    let startTime:any;
    function animate (time:any) {
        //Draw loop
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        deger += 0.005;
        GL.uniform_value_1f("uMoveX", deger);
        
        GL.use();
        //var shaderTranlsationMatrix = gl.getUniformLocation(program, "u_translation");
        //gl.uniformMatrix4fv(shaderTranlsationMatrix,false,new Float32Array(translation_prototype));
        //gl.vertexAttribPointer(positionLocation, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        startTime = time;
    
        window.requestAnimationFrame(animate);
    }
    animate(0);
}

main();