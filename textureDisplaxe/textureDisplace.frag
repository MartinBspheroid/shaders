#version 150

uniform sampler2DRect distortMap;
uniform sampler2DRect videoMap;
uniform vec2 mouse;
in vec2 texCoords;
out vec4 output;


void main(){
	vec4 offset = texture(distortMap,texCoords);
	//offset /= 240.0;
	float off = (-0.25 + offset.x) * mouse.x;
	// if(off > 480.0){

	// 	off -= 240.0;
	// }
	vec2 c = vec2(texCoords.x, texCoords.y+off);
	vec4 color = texture(videoMap, c);

	output = color;

}