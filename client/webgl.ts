import { map_ } from "./types.ts";

export class WebGL {
    private gl: any;
    private program: any;
    private uniforms: map_ | any;

    constructor(gl:any, vertexShader:string, fragmentShader:string){
        this.gl = gl;
        this.program = this.gl.createProgram();
        this.createAndAttachShader(vertexShader, "vertex");
        this.createAndAttachShader(fragmentShader, "fragment");
        this.link();
        this.uniforms = {};
    }

    private createAndAttachShader(shaderCode:string, shaderType:string){
        let shader: any;
        if(shaderType=="vertex"){ shader = this.gl.createShader(this.gl.VERTEX_SHADER); }
        else if(shaderType=="fragment") { shader = this.gl.createShader(this.gl.FRAGMENT_SHADER); }
        else return null;

        this.gl.shaderSource(shader, shaderCode);
        this.gl.compileShader(shader);

        let control = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if(!control){
            console.error(`Error compiling ${shaderType} shader`);
            console.log(this.gl.getShaderInfoLog(shader));
        }
        this.gl.attachShader(this.program, shader);
    }

    private link(){
        this.gl.linkProgram(this.program);
        let control = this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS);
        if(!control) console.error("Shaders have problem");
    }

    use(){
        this.gl.useProgram(this.program);
    }

    getGL(){
        return this.gl
    }
    
    programID(){
        return this.program;
    }

    uniform(uniform_name: string){
        this.uniforms[uniform_name] = this.gl.getUniformLocation(this.program, uniform_name);
    }

    uniform_value_1f(uniform_name: string, value:number){
        this.gl.uniform1f(this.uniforms[uniform_name], value);
    }
}