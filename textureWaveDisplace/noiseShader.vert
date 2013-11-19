#version 150

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 textureMatrix;
uniform mat4 modelViewProjectionMatrix;
uniform float mag;
in vec4 position;
in vec4 color;
in vec4 normal;
in vec2 texcoord;


out vec2 uv;


void main()
	{	
		
		uv = vec2(texcoord.x, texcoord.y);
		gl_Position  = modelViewProjectionMatrix * position;
	}