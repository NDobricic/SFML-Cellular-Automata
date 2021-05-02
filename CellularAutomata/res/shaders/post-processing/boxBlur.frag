uniform sampler2D tex0_in;
uniform vec2 tex_size;

vec4 value(float x, float y)
{
    return texture2D(tex0_in, (gl_FragCoord.xy + vec2(x, y)) / tex_size);
}

void main()
{
	vec4 sum = value(-1, 1) +
               value( 0, 1) +
               value( 1, 1) +
               value( 1, 0) +
               value( 1,-1) +
               value( 0,-1) +
               value(-1,-1) +
               value(-1, 0) +
               value( 0, 0);
    sum /= 9;

	gl_FragColor = sum;
}