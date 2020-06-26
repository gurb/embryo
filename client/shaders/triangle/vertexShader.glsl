#version 300 es
        
in vec3 aVertexPosition;

uniform float uMoveX;

void main(){
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = vec4(aVertexPosition + vec3(uMoveX, 0.0f, 0.0f), 1.0);
}