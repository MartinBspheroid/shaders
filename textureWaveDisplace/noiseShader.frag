#version 150

uniform int debug;
uniform sampler2DRect tex;
uniform float time;
uniform float mag;
uniform float scale;
in vec2 uv;
out vec4 outputColor;



vec2 hash( vec2 p )
{
	p = vec2( dot(p,vec2(127.1,311.7)),
			  dot(p,vec2(269.5,183.3)) );

	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise2( vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );
	
	vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                     dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                     dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}




// vec4 noise(vec2 p){

// 	return texture(sNoiseTexture, p)*0.5 +
// 	texture(sNoiseTexture, p*vec2(2.0))*0.25 +
// 	texture(sNoiseTexture, p*vec2(4.0))*0.125 +
// 	texture(sNoiseTexture, p*vec2(8.0))*0.0.625;
// }



float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
	float c = rand(vec2(uv.x, uv.y));

vec2 resolution = vec2(640.0, 480.0);

	vec2 p = gl_FragCoord.xy / resolution.xy;
	vec2 _uv = p*vec2(resolution.x/resolution.y, 1.0);
	float d = 0.0;
	float e = 0.0;


	///outputColor = vec4(c, c, c, 1.0);
	d = noise2(vec2(scale*_uv.x, (scale*_uv.y)+time));
	e = noise2(vec2((scale-3.0)*_uv.y, ((scale-3.0)*_uv.x)+time+100.0));

	e = 0.5 + 0.5*e;

	d = 0.5 + 0.5*d;

if(debug == 0){
	
	outputColor = texture(tex, vec2(uv.x+(e*mag)-0.5, uv.y-(d*mag)+0.5));
}


if(debug == 1){
	outputColor = vec4(1.0, 0.0, 0.0, 1.0);
}

if(debug == 2){

	
	outputColor = vec4(d, e, 1.0, 1.0);
}

}