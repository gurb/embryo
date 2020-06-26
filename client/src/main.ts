// import { read_file } from "../lib/utils.ts"; 
//import { a_foo } from "../lib/utils.ts"; 
import { WebGL } from "../webgl.ts";


// async function read_file(path: string){
//     const decoder = new TextDecoder('utf-8');
//     const data = Deno.readFileSync(path);
//     return decoder.decode(data);
// }

// var vertexShader = await read_file("../shaders/triangle/vertexShader.glsl");
// var fragmentShader = await read_file("../shaders/triangle/fragmentShader.glsl");

//a_foo();

var positions = [
    -0.6, -0.6, 0.0,
    0.5, -0.5, 0.0,
    0.0, 0.5, 0.0
];

var deger = 0;


export function main_f(){
    console.log(Deno.cwd());
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    document.body.appendChild(canvas);
    var gl:any = canvas.getContext('webgl2')
    var GL = new WebGL(gl, "vertexShader", "fragmentShader");
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
