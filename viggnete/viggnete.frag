
#version 150
    //precision highp float;
    #extension GL_ARB_texture_rectangle: enable    
    #define PI 3.1416

    uniform sampler2DRect tex;
    uniform float timeE;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform float offset;
    uniform float darkness;
    in vec2 texC;
    out vec4 output;

    void main(){
    vec2 position = texC / resolution;
    vec4 texel = texture2DRect(tex, texC);

    vec2 uv =(position - vec2(0.5) ) * vec2( offset);
    output = vec4(mix(texel.rgb, vec3(1.0 - darkness), dot(uv, uv)), texel.a);   
}


/*

............. ALMOST WORKING...............


 

.................................













float t = mouse.x * 100;
float d = mouse.y * 110;
vec2 resolution = vec2(128, 128);
vec2 p = -1 + 2 * texC.xy / resolution.xy;
vec2 g = (((2*texC.xy) / resolution.xy) - 1) * vec2(resolution.x / resolution.y, 1.0);
float a = t*atan(g.x, g.y);
// float c = a/(3.1416);
 float r = 0.01 * sqrt(dot(g, g));
//float r = length(g);
vec2 uv;
// uv.x = (6.28/ r) +timeE ;
uv.y = (.1/r) + timeE;
uv.x = a / (3.1416/2.5);
vec3 col = texture(tex, uv).xyz;

 output = vec4(col, 1);
//output = vec4(gl_FragCoord.x/resolution.x, gl_FragCoord.y/resolution.y, 1.0, 1.0);



*/


