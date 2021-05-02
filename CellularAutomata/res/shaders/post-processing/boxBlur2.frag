uniform sampler2D tex0_in;
uniform vec2 tex_size;

vec4 value(float x, float y)
{
    return texture2D(tex0_in, (gl_FragCoord.xy + vec2(x, y)) / tex_size);
}

void main()
{
	vec4 pixel = texture2D(tex0_in, gl_FragCoord.xy / tex_size);
	vec4 sum = value(-2, -2) + value(-1, -2) + value( 0, -2) + value( 1, -2) + value( 2, -2)
					+ value(-2, -1) + value(-1, -1) + value( 0, -1) + value( 1, -1) + value( 2, -1)
					+ value(-2,  0) + value(-1,  0) + value( 0,  0)	+ value( 1,  0) + value( 2,  0)
					+ value(-2,  1) + value(-1,  1) + value( 0,  1) + value( 1,  1) + value( 2,  1)
					+ value(-2,  2) + value(-1,  2) + value( 0,  2) + value( 1,  2) + value( 2,  2);
    sum /= 25;

	gl_FragColor = sum;
}