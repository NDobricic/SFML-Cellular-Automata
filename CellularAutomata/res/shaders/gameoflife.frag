uniform sampler2D tex0_in;
uniform vec2 tex_size;

int getR(float x, float y)
{
    return int(texture2D(tex0_in, (gl_FragCoord.xy + vec2(x, y)) / tex_size).r);
}

void main()
{
    int sum = getR(-1, 1) +
              getR( 0, 1) +
              getR( 1, 1) +
              getR( 1, 0) +
              getR( 1,-1) +
              getR( 0,-1) +
              getR(-1,-1) +
              getR(-1, 0);

    if (sum==3)
    {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
    else if (sum== 2)
    {
        float current = float(getR(0, 0));
        gl_FragColor = vec4(current, current, current, 1.0);
    }
    else
    {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}
