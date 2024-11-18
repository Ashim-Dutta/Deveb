varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 c1 = vec4(0.9608, 0.6824, 0.7765, 1.0);
    vec4 c2 = vec4(0.9608, 0.8039, 0.8039, 1.0);

    float v=smoothstep(-0.14,0.14,vElevation);
    vec4 color=mix(c1,c2,v);
    gl_FragColor= color;
}
