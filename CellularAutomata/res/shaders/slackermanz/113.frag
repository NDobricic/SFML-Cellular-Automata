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
    float nhd0=cv(-14.0,-1.0)+cv(-14.0,0.0)+cv(-14.0,1.0)+cv(-13.0,-4.0)+cv(-13.0,-3.0)+cv(-13.0,-2.0)+cv(-13.0,2.0)+cv(-13.0,3.0)+cv(-13.0,4.0)+cv(-12.0,-6.0)+cv(-12.0,-5.0)+cv(-12.0,5.0)+cv(-12.0,6.0)+cv(-11.0,-8.0)+cv(-11.0,-7.0)+cv(-11.0,7.0)+cv(-11.0,8.0)+cv(-10.0,-9.0)+cv(-10.0,-1.0)+cv(-10.0,0.0)+cv(-10.0,1.0)+cv(-10.0,9.0)+cv(-9.0,-10.0)+cv(-9.0,-4.0)+cv(-9.0,-3.0)+cv(-9.0,-2.0)+cv(-9.0,2.0)+cv(-9.0,3.0)+cv(-9.0,4.0)+cv(-9.0,10.0)+cv(-8.0,-11.0)+cv(-8.0,-6.0)+cv(-8.0,-5.0)+cv(-8.0,5.0)+cv(-8.0,6.0)+cv(-8.0,11.0)+cv(-7.0,-11.0)+cv(-7.0,-7.0)+cv(-7.0,-2.0)+cv(-7.0,-1.0)+cv(-7.0,0.0)+cv(-7.0,1.0)+cv(-7.0,2.0)+cv(-7.0,7.0)+cv(-7.0,11.0)+cv(-6.0,-12.0)+cv(-6.0,-8.0)+cv(-6.0,-4.0)+cv(-6.0,-3.0)+cv(-6.0,3.0)+cv(-6.0,4.0)+cv(-6.0,8.0)+cv(-6.0,12.0)+cv(-5.0,-12.0)+cv(-5.0,-8.0)+cv(-5.0,-5.0)+cv(-5.0,-1.0)+cv(-5.0,0.0)+cv(-5.0,1.0)+cv(-5.0,5.0);
    float nhd1=cv(-5.0,8.0)+cv(-5.0,12.0)+cv(-4.0,-13.0)+cv(-4.0,-9.0)+cv(-4.0,-6.0)+cv(-4.0,-3.0)+cv(-4.0,-2.0)+cv(-4.0,2.0)+cv(-4.0,3.0)+cv(-4.0,6.0)+cv(-4.0,9.0)+cv(-4.0,13.0)+cv(-3.0,-13.0)+cv(-3.0,-9.0)+cv(-3.0,-6.0)+cv(-3.0,-4.0)+cv(-3.0,-1.0)+cv(-3.0,0.0)+cv(-3.0,1.0)+cv(-3.0,4.0)+cv(-3.0,6.0)+cv(-3.0,9.0)+cv(-3.0,13.0)+cv(-2.0,-13.0)+cv(-2.0,-9.0)+cv(-2.0,-7.0)+cv(-2.0,-4.0)+cv(-2.0,-2.0)+cv(-2.0,2.0)+cv(-2.0,4.0)+cv(-2.0,7.0)+cv(-2.0,9.0)+cv(-2.0,13.0)+cv(-1.0,-14.0)+cv(-1.0,-10.0)+cv(-1.0,-7.0)+cv(-1.0,-5.0)+cv(-1.0,-3.0)+cv(-1.0,-1.0)+cv(-1.0,0.0)+cv(-1.0,1.0)+cv(-1.0,3.0)+cv(-1.0,5.0)+cv(-1.0,7.0)+cv(-1.0,10.0)+cv(-1.0,14.0)+cv(0.0,-14.0)+cv(0.0,-10.0)+cv(0.0,-7.0)+cv(0.0,-5.0)+cv(0.0,-3.0)+cv(0.0,-1.0)+cv(0.0,1.0)+cv(0.0,3.0)+cv(0.0,5.0)+cv(0.0,7.0)+cv(0.0,10.0)+cv(0.0,14.0)+cv(1.0,-14.0)+cv(1.0,-10.0)+cv(1.0,-7.0);
    float nhd2=cv(1.0,-5.0)+cv(1.0,-3.0)+cv(1.0,-1.0)+cv(1.0,0.0)+cv(1.0,1.0)+cv(1.0,3.0)+cv(1.0,5.0)+cv(1.0,7.0)+cv(1.0,10.0)+cv(1.0,14.0)+cv(2.0,-13.0)+cv(2.0,-9.0)+cv(2.0,-7.0)+cv(2.0,-4.0)+cv(2.0,-2.0)+cv(2.0,2.0)+cv(2.0,4.0)+cv(2.0,7.0)+cv(2.0,9.0)+cv(2.0,13.0)+cv(3.0,-13.0)+cv(3.0,-9.0)+cv(3.0,-6.0)+cv(3.0,-4.0)+cv(3.0,-1.0)+cv(3.0,0.0)+cv(3.0,1.0)+cv(3.0,4.0)+cv(3.0,6.0)+cv(3.0,9.0)+cv(3.0,13.0)+cv(4.0,-13.0)+cv(4.0,-9.0)+cv(4.0,-6.0)+cv(4.0,-3.0)+cv(4.0,-2.0)+cv(4.0,2.0)+cv(4.0,3.0)+cv(4.0,6.0)+cv(4.0,9.0)+cv(4.0,13.0)+cv(5.0,-12.0)+cv(5.0,-8.0)+cv(5.0,-5.0)+cv(5.0,-1.0)+cv(5.0,0.0)+cv(5.0,1.0)+cv(5.0,5.0)+cv(5.0,8.0)+cv(5.0,12.0)+cv(6.0,-12.0)+cv(6.0,-8.0)+cv(6.0,-4.0)+cv(6.0,-3.0)+cv(6.0,3.0)+cv(6.0,4.0)+cv(6.0,8.0)+cv(6.0,12.0)+cv(7.0,-11.0)+cv(7.0,-7.0)+cv(7.0,-2.0);
    float nhd3=cv(7.0,-1.0)+cv(7.0,0.0)+cv(7.0,1.0)+cv(7.0,2.0)+cv(7.0,7.0)+cv(7.0,11.0)+cv(8.0,-11.0)+cv(8.0,-6.0)+cv(8.0,-5.0)+cv(8.0,5.0)+cv(8.0,6.0)+cv(8.0,11.0)+cv(9.0,-10.0)+cv(9.0,-4.0)+cv(9.0,-3.0)+cv(9.0,-2.0)+cv(9.0,2.0)+cv(9.0,3.0)+cv(9.0,4.0)+cv(9.0,10.0)+cv(10.0,-9.0)+cv(10.0,-1.0)+cv(10.0,0.0)+cv(10.0,1.0)+cv(10.0,9.0)+cv(11.0,-8.0)+cv(11.0,-7.0)+cv(11.0,7.0)+cv(11.0,8.0)+cv(12.0,-6.0)+cv(12.0,-5.0)+cv(12.0,5.0)+cv(12.0,6.0)+cv(13.0,-4.0)+cv(13.0,-3.0)+cv(13.0,-2.0)+cv(13.0,2.0)+cv(13.0,3.0)+cv(13.0,4.0)+cv(14.0,-1.0)+cv(14.0,0.0)+cv(14.0,1.0);
    float fin_0=nhd0+nhd1+nhd2+nhd3;
    float nhd4=cv(-3.0,-1.0)+cv(-3.0,0.0)+cv(-3.0,1.0)+cv(-2.0,-2.0)+cv(-2.0,2.0)+cv(-1.0,-3.0)+cv(-1.0,-1.0)+cv(-1.0,0.0)+cv(-1.0,1.0)+cv(-1.0,3.0)+cv(0.0,-3.0)+cv(0.0,-1.0)+cv(0.0,1.0)+cv(0.0,3.0)+cv(1.0,-3.0)+cv(1.0,-1.0)+cv(1.0,0.0)+cv(1.0,1.0)+cv(1.0,3.0)+cv(2.0,-2.0)+cv(2.0,2.0)+cv(3.0,-1.0)+cv(3.0,0.0)+cv(3.0,1.0);
    float fin_1=nhd4;
    float nhd5=cv(-6.0,-1.0)+cv(-6.0,0.0)+cv(-6.0,1.0)+cv(-5.0,-3.0)+cv(-5.0,-2.0)+cv(-5.0,-1.0)+cv(-5.0,0.0)+cv(-5.0,1.0)+cv(-5.0,2.0)+cv(-5.0,3.0)+cv(-4.0,-4.0)+cv(-4.0,-3.0)+cv(-4.0,-2.0)+cv(-4.0,-1.0)+cv(-4.0,0.0)+cv(-4.0,1.0)+cv(-4.0,2.0)+cv(-4.0,3.0)+cv(-4.0,4.0)+cv(-3.0,-5.0)+cv(-3.0,-4.0)+cv(-3.0,-3.0)+cv(-3.0,-2.0)+cv(-3.0,2.0)+cv(-3.0,3.0)+cv(-3.0,4.0)+cv(-3.0,5.0)+cv(-2.0,-5.0)+cv(-2.0,-4.0)+cv(-2.0,-3.0)+cv(-2.0,3.0)+cv(-2.0,4.0)+cv(-2.0,5.0)+cv(-1.0,-6.0)+cv(-1.0,-5.0)+cv(-1.0,-4.0)+cv(-1.0,4.0)+cv(-1.0,5.0)+cv(-1.0,6.0)+cv(0.0,-6.0)+cv(0.0,-5.0)+cv(0.0,-4.0)+cv(0.0,4.0)+cv(0.0,5.0)+cv(0.0,6.0)+cv(1.0,-6.0)+cv(1.0,-5.0)+cv(1.0,-4.0)+cv(1.0,4.0)+cv(1.0,5.0)+cv(1.0,6.0)+cv(2.0,-5.0)+cv(2.0,-4.0)+cv(2.0,-3.0)+cv(2.0,3.0)+cv(2.0,4.0)+cv(2.0,5.0)+cv(3.0,-5.0)+cv(3.0,-4.0)+cv(3.0,-3.0);
    float nhd6=cv(3.0,-2.0)+cv(3.0,2.0)+cv(3.0,3.0)+cv(3.0,4.0)+cv(3.0,5.0)+cv(4.0,-4.0)+cv(4.0,-3.0)+cv(4.0,-2.0)+cv(4.0,-1.0)+cv(4.0,0.0)+cv(4.0,1.0)+cv(4.0,2.0)+cv(4.0,3.0)+cv(4.0,4.0)+cv(5.0,-3.0)+cv(5.0,-2.0)+cv(5.0,-1.0)+cv(5.0,0.0)+cv(5.0,1.0)+cv(5.0,2.0)+cv(5.0,3.0)+cv(6.0,-1.0)+cv(6.0,0.0)+cv(6.0,1.0);
    float fin_2=nhd5+nhd6;
    float nhd7=cv(-14.0,-3.0)+cv(-14.0,-2.0)+cv(-14.0,-1.0)+cv(-14.0,0.0)+cv(-14.0,1.0)+cv(-14.0,2.0)+cv(-14.0,3.0)+cv(-13.0,-6.0)+cv(-13.0,-5.0)+cv(-13.0,-4.0)+cv(-13.0,-3.0)+cv(-13.0,-2.0)+cv(-13.0,-1.0)+cv(-13.0,0.0)+cv(-13.0,1.0)+cv(-13.0,2.0)+cv(-13.0,3.0)+cv(-13.0,4.0)+cv(-13.0,5.0)+cv(-13.0,6.0)+cv(-12.0,-8.0)+cv(-12.0,-7.0)+cv(-12.0,-6.0)+cv(-12.0,-5.0)+cv(-12.0,-4.0)+cv(-12.0,-3.0)+cv(-12.0,-2.0)+cv(-12.0,-1.0)+cv(-12.0,0.0)+cv(-12.0,1.0)+cv(-12.0,2.0)+cv(-12.0,3.0)+cv(-12.0,4.0)+cv(-12.0,5.0)+cv(-12.0,6.0)+cv(-12.0,7.0)+cv(-12.0,8.0)+cv(-11.0,-9.0)+cv(-11.0,-8.0)+cv(-11.0,-7.0)+cv(-11.0,-6.0)+cv(-11.0,-5.0)+cv(-11.0,-4.0)+cv(-11.0,-3.0)+cv(-11.0,-2.0)+cv(-11.0,-1.0)+cv(-11.0,0.0)+cv(-11.0,1.0)+cv(-11.0,2.0)+cv(-11.0,3.0)+cv(-11.0,4.0)+cv(-11.0,5.0)+cv(-11.0,6.0)+cv(-11.0,7.0)+cv(-11.0,8.0)+cv(-11.0,9.0)+cv(-10.0,-10.0)+cv(-10.0,-9.0)+cv(-10.0,-8.0)+cv(-10.0,-7.0);
    float nhd8=cv(-10.0,-6.0)+cv(-10.0,-5.0)+cv(-10.0,5.0)+cv(-10.0,6.0)+cv(-10.0,7.0)+cv(-10.0,8.0)+cv(-10.0,9.0)+cv(-10.0,10.0)+cv(-9.0,-11.0)+cv(-9.0,-10.0)+cv(-9.0,-9.0)+cv(-9.0,-8.0)+cv(-9.0,-7.0)+cv(-9.0,7.0)+cv(-9.0,8.0)+cv(-9.0,9.0)+cv(-9.0,10.0)+cv(-9.0,11.0)+cv(-8.0,-12.0)+cv(-8.0,-11.0)+cv(-8.0,-10.0)+cv(-8.0,-9.0)+cv(-8.0,-8.0)+cv(-8.0,8.0)+cv(-8.0,9.0)+cv(-8.0,10.0)+cv(-8.0,11.0)+cv(-8.0,12.0)+cv(-7.0,-12.0)+cv(-7.0,-11.0)+cv(-7.0,-10.0)+cv(-7.0,-9.0)+cv(-7.0,-2.0)+cv(-7.0,-1.0)+cv(-7.0,0.0)+cv(-7.0,1.0)+cv(-7.0,2.0)+cv(-7.0,9.0)+cv(-7.0,10.0)+cv(-7.0,11.0)+cv(-7.0,12.0)+cv(-6.0,-13.0)+cv(-6.0,-12.0)+cv(-6.0,-11.0)+cv(-6.0,-10.0)+cv(-6.0,-4.0)+cv(-6.0,-3.0)+cv(-6.0,3.0)+cv(-6.0,4.0)+cv(-6.0,10.0)+cv(-6.0,11.0)+cv(-6.0,12.0)+cv(-6.0,13.0)+cv(-5.0,-13.0)+cv(-5.0,-12.0)+cv(-5.0,-11.0)+cv(-5.0,-10.0)+cv(-5.0,-5.0)+cv(-5.0,5.0)+cv(-5.0,10.0)+cv(-5.0,11.0);
    float nhd9=cv(-5.0,12.0)+cv(-5.0,13.0)+cv(-4.0,-13.0)+cv(-4.0,-12.0)+cv(-4.0,-11.0)+cv(-4.0,-6.0)+cv(-4.0,-1.0)+cv(-4.0,0.0)+cv(-4.0,1.0)+cv(-4.0,6.0)+cv(-4.0,11.0)+cv(-4.0,12.0)+cv(-4.0,13.0)+cv(-3.0,-14.0)+cv(-3.0,-13.0)+cv(-3.0,-12.0)+cv(-3.0,-11.0)+cv(-3.0,-6.0)+cv(-3.0,-2.0)+cv(-3.0,2.0)+cv(-3.0,6.0)+cv(-3.0,11.0)+cv(-3.0,12.0)+cv(-3.0,13.0)+cv(-3.0,14.0)+cv(-2.0,-14.0)+cv(-2.0,-13.0)+cv(-2.0,-12.0)+cv(-2.0,-11.0)+cv(-2.0,-7.0)+cv(-2.0,-3.0)+cv(-2.0,3.0)+cv(-2.0,7.0)+cv(-2.0,11.0)+cv(-2.0,12.0)+cv(-2.0,13.0)+cv(-2.0,14.0)+cv(-1.0,-14.0)+cv(-1.0,-13.0)+cv(-1.0,-12.0)+cv(-1.0,-11.0)+cv(-1.0,-7.0)+cv(-1.0,-4.0)+cv(-1.0,-1.0)+cv(-1.0,0.0)+cv(-1.0,1.0)+cv(-1.0,4.0)+cv(-1.0,7.0)+cv(-1.0,11.0)+cv(-1.0,12.0)+cv(-1.0,13.0)+cv(-1.0,14.0)+cv(0.0,-14.0)+cv(0.0,-13.0)+cv(0.0,-12.0)+cv(0.0,-11.0)+cv(0.0,-7.0)+cv(0.0,-4.0)+cv(0.0,-1.0)+cv(0.0,1.0)+cv(0.0,4.0);
    float nhd10=cv(0.0,7.0)+cv(0.0,11.0)+cv(0.0,12.0)+cv(0.0,13.0)+cv(0.0,14.0)+cv(1.0,-14.0)+cv(1.0,-13.0)+cv(1.0,-12.0)+cv(1.0,-11.0)+cv(1.0,-7.0)+cv(1.0,-4.0)+cv(1.0,-1.0)+cv(1.0,0.0)+cv(1.0,1.0)+cv(1.0,4.0)+cv(1.0,7.0)+cv(1.0,11.0)+cv(1.0,12.0)+cv(1.0,13.0)+cv(1.0,14.0)+cv(2.0,-14.0)+cv(2.0,-13.0)+cv(2.0,-12.0)+cv(2.0,-11.0)+cv(2.0,-7.0)+cv(2.0,-3.0)+cv(2.0,3.0)+cv(2.0,7.0)+cv(2.0,11.0)+cv(2.0,12.0)+cv(2.0,13.0)+cv(2.0,14.0)+cv(3.0,-14.0)+cv(3.0,-13.0)+cv(3.0,-12.0)+cv(3.0,-11.0)+cv(3.0,-6.0)+cv(3.0,-2.0)+cv(3.0,2.0)+cv(3.0,6.0)+cv(3.0,11.0)+cv(3.0,12.0)+cv(3.0,13.0)+cv(3.0,14.0)+cv(4.0,-13.0)+cv(4.0,-12.0)+cv(4.0,-11.0)+cv(4.0,-6.0)+cv(4.0,-1.0)+cv(4.0,0.0)+cv(4.0,1.0)+cv(4.0,6.0)+cv(4.0,11.0)+cv(4.0,12.0)+cv(4.0,13.0)+cv(5.0,-13.0)+cv(5.0,-12.0)+cv(5.0,-11.0)+cv(5.0,-10.0)+cv(5.0,-5.0)+cv(5.0,5.0);
    float nhd11=cv(5.0,10.0)+cv(5.0,11.0)+cv(5.0,12.0)+cv(5.0,13.0)+cv(6.0,-13.0)+cv(6.0,-12.0)+cv(6.0,-11.0)+cv(6.0,-10.0)+cv(6.0,-4.0)+cv(6.0,-3.0)+cv(6.0,3.0)+cv(6.0,4.0)+cv(6.0,10.0)+cv(6.0,11.0)+cv(6.0,12.0)+cv(6.0,13.0)+cv(7.0,-12.0)+cv(7.0,-11.0)+cv(7.0,-10.0)+cv(7.0,-9.0)+cv(7.0,-2.0)+cv(7.0,-1.0)+cv(7.0,0.0)+cv(7.0,1.0)+cv(7.0,2.0)+cv(7.0,9.0)+cv(7.0,10.0)+cv(7.0,11.0)+cv(7.0,12.0)+cv(8.0,-12.0)+cv(8.0,-11.0)+cv(8.0,-10.0)+cv(8.0,-9.0)+cv(8.0,-8.0)+cv(8.0,8.0)+cv(8.0,9.0)+cv(8.0,10.0)+cv(8.0,11.0)+cv(8.0,12.0)+cv(9.0,-11.0)+cv(9.0,-10.0)+cv(9.0,-9.0)+cv(9.0,-8.0)+cv(9.0,-7.0)+cv(9.0,7.0)+cv(9.0,8.0)+cv(9.0,9.0)+cv(9.0,10.0)+cv(9.0,11.0)+cv(10.0,-10.0)+cv(10.0,-9.0)+cv(10.0,-8.0)+cv(10.0,-7.0)+cv(10.0,-6.0)+cv(10.0,-5.0)+cv(10.0,5.0)+cv(10.0,6.0)+cv(10.0,7.0)+cv(10.0,8.0)+cv(10.0,9.0)+cv(10.0,10.0);
    float nhd12=cv(11.0,-9.0)+cv(11.0,-8.0)+cv(11.0,-7.0)+cv(11.0,-6.0)+cv(11.0,-5.0)+cv(11.0,-4.0)+cv(11.0,-3.0)+cv(11.0,-2.0)+cv(11.0,-1.0)+cv(11.0,0.0)+cv(11.0,1.0)+cv(11.0,2.0)+cv(11.0,3.0)+cv(11.0,4.0)+cv(11.0,5.0)+cv(11.0,6.0)+cv(11.0,7.0)+cv(11.0,8.0)+cv(11.0,9.0)+cv(12.0,-8.0)+cv(12.0,-7.0)+cv(12.0,-6.0)+cv(12.0,-5.0)+cv(12.0,-4.0)+cv(12.0,-3.0)+cv(12.0,-2.0)+cv(12.0,-1.0)+cv(12.0,0.0)+cv(12.0,1.0)+cv(12.0,2.0)+cv(12.0,3.0)+cv(12.0,4.0)+cv(12.0,5.0)+cv(12.0,6.0)+cv(12.0,7.0)+cv(12.0,8.0)+cv(13.0,-6.0)+cv(13.0,-5.0)+cv(13.0,-4.0)+cv(13.0,-3.0)+cv(13.0,-2.0)+cv(13.0,-1.0)+cv(13.0,0.0)+cv(13.0,1.0)+cv(13.0,2.0)+cv(13.0,3.0)+cv(13.0,4.0)+cv(13.0,5.0)+cv(13.0,6.0)+cv(14.0,-3.0)+cv(14.0,-2.0)+cv(14.0,-1.0)+cv(14.0,0.0)+cv(14.0,1.0)+cv(14.0,2.0)+cv(14.0,3.0);
    float fin_3=nhd7+nhd8+nhd9+nhd10+nhd11+nhd12;
    if(fin_0>=5.0&&fin_0<=7.0){
        outval=1.0;
    }
    if(fin_0>=0.0&&fin_0<=2.0){
        outval=0.0;
    }
    if(fin_1>=12.0&&fin_1<=20.0){
        outval=0.0;
    }
    if(fin_2>=60.0&&fin_2<=120.0){
        outval=0.0;
    }
    if(fin_0>=18.0&&fin_0<=999.0){
        outval=0.0;
    }
    if(fin_2>=75.0&&fin_2<=78.0){
        outval=1.0;
    }
    if(fin_2>=95.0&&fin_2<=107.0){
        outval=1.0;
    }
    if(fin_2>=150.0){
        outval=0.0;
    }
    gl_FragColor=vec4(outval,outval,outval,1.0);
}
