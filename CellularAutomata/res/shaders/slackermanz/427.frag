precision mediump float;
uniform sampler2D tex0_in;
uniform vec2 tex_size;
float cv(float fx,float fy){
    vec2 v=vec2(fx,fy);
    float o=texture2D(tex0_in,(gl_FragCoord.xy+v)/tex_size).r;
    if(o>0.0){
        return 1.0;
    }else{
        return 0.0;
    }
}
void main(){
    float outval=cv(0.0,0.0);
    float nhd0=cv(-3.0,-3.0)+cv(-3.0,-2.0)+cv(-3.0,-1.0)+cv(-3.0,0.0)+cv(-3.0,1.0)+cv(-3.0,2.0)+cv(-3.0,3.0)+cv(-2.0,-3.0)+cv(-2.0,-2.0)+cv(-2.0,-1.0)+cv(-2.0,0.0)+cv(-2.0,1.0)+cv(-2.0,2.0)+cv(-2.0,3.0)+cv(-1.0,-3.0)+cv(-1.0,-2.0)+cv(-1.0,-1.0)+cv(-1.0,0.0)+cv(-1.0,1.0)+cv(-1.0,2.0)+cv(-1.0,3.0)+cv(0.0,-3.0)+cv(0.0,-2.0)+cv(0.0,-1.0)+cv(0.0,1.0)+cv(0.0,2.0)+cv(0.0,3.0)+cv(1.0,-3.0)+cv(1.0,-2.0)+cv(1.0,-1.0)+cv(1.0,0.0)+cv(1.0,1.0)+cv(1.0,2.0)+cv(1.0,3.0)+cv(2.0,-3.0)+cv(2.0,-2.0)+cv(2.0,-1.0)+cv(2.0,0.0)+cv(2.0,1.0)+cv(2.0,2.0)+cv(2.0,3.0)+cv(3.0,-3.0)+cv(3.0,-2.0)+cv(3.0,-1.0)+cv(3.0,0.0)+cv(3.0,1.0)+cv(3.0,2.0)+cv(3.0,3.0);
    float fin_0=nhd0;
    if(fin_0>=25.0){
        outval=0.0;
    }
    if(fin_0>=18.0&&fin_0<=24.0){
        outval=1.0;
    }
    if(fin_0>=21.0&&fin_0<=24.0){
        outval=1.0;
    }
    if(fin_0>=8.0&&fin_0<=8.0){
        outval=1.0;
    }
    if(fin_0>=0.0&&fin_0<=7.0){
        outval=0.0;
    }
    if(fin_0>=5.0&&fin_0<=7.0){
        outval=0.0;
    }
    if(fin_0>=10.0&&fin_0<=13.0){
        outval=0.0;
    }
    gl_FragColor=vec4(outval,outval,outval,1.0);
}