
#version 150
//precision highp float;
#extension GL_ARB_texture_rectangle: enable    
#define PI 3.1416

uniform sampler2DRect tex;
uniform float timeE;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float intensity;
uniform float gamma;
in vec2 texC;
out vec4 output;



float rand(vec2 co){
return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}


float overlay(float base, float blend){

    return (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)));
}

vec3 overlaymix(vec3 base, float noise){

float rBlend = overlay(base.r, noise*1.1);
float gBlend = overlay(base.g, noise*1.1);
float bBlend = overlay(base.b, noise*1.1);

// float rBlend = overlay(base.r, noise*0.299);
// float gBlend = overlay(base.b, noise*0.587);
// float bBlend = overlay(base.g, noise*0.114);


return vec3(rBlend, gBlend, bBlend);
}


void main(){

vec3 screen = texture2DRect(tex, texC).rgb;
float noiseMul =  (rand(texC/resolution*vec2(timeE)) * vec3(0.5))*intensity;

vec3 blend = overlaymix(screen, noiseMul);
vec3 color = mix(screen, blend, intensity);
float gammaControl = mix(1.0, 1.0/(intensity+0.5), intensity);
color = pow(color, vec3(gammaControl));
output = vec4(color, 1.0);
// output = vec4(overlaymix(screen, noiseMul), 1.0);
}



/*



LUMA

vec3(0.299, 0.587, 0.114)

*/

