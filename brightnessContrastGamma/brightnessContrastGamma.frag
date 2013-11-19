
#version 150
    //precision highp float;
    #extension GL_ARB_texture_rectangle: enable    
    

    uniform sampler2DRect tex;
    uniform float brightness;   // range -1.0 to  1.0;
    uniform float contrast;    // range -1.0 to  1.0;
    uniform float gamma;       // range 0.0 to  10.0;
    

    in vec2 texC;
    out vec4 output;

    void main(){
        vec3 color = texture2DRect(tex, texC).rgb;
        color.rgb += brightness;
        if(contrast > 0.0){
            color.rgb = (color.rgb - 0.5) / (1.0 - contrast) + 0.5;
            }else{
                color.rgb = (color.rgb - 0.5) * (1.0 + contrast) + 0.5;
            }
            color.rgb =  pow(color.rgb, vec3(1.0 / gamma));
        output = vec4(color, 1.0);
        }

