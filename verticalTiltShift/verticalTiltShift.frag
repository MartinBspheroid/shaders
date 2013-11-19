
#version 150
    //precision highp float;
    #extension GL_ARB_texture_rectangle: enable    
    #define PI 3.1416

    uniform sampler2DRect tex;
    uniform float timeE;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform float v;
    uniform float r;
    in vec2 texC;
    out vec4 output;

    void main(){
        float vertical = v / (resolution.x/10.0);
        vec2 position = texC;
        // position *= 10.5;
        vec4 sum = vec4(0.0);
        float vv = vertical * abs( (r * resolution.y) - position.y);

        sum += texture2DRect(tex, vec2(position.x, position.y - 4.0 *vv)) * 0.051;
        sum += texture2DRect( tex, vec2( position.x, position.y - 3.0 * vv ) ) * 0.0918;
        sum += texture2DRect( tex, vec2( position.x, position.y - 2.0 * vv ) ) * 0.12245;
        sum += texture2DRect( tex, vec2( position.x, position.y - 1.0 * vv ) ) * 0.1531;
        sum += texture2DRect( tex, vec2( position.x, position.y ) ) * 0.1633;
        sum += texture2DRect( tex, vec2( position.x, position.y + 1.0 * vv ) ) * 0.1531;
        sum += texture2DRect( tex, vec2( position.x, position.y + 2.0 * vv ) ) * 0.12245;
        sum += texture2DRect( tex, vec2( position.x, position.y + 3.0 * vv ) ) * 0.0918;
        sum += texture2DRect( tex, vec2( position.x, position.y + 4.0 * vv ) ) * 0.051;

        output = sum;
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


