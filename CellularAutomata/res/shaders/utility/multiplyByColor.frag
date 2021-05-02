uniform sampler2D tex0_in;
uniform vec4 color;
uniform vec2 tex_size;

void main()
{
	vec4 pixel = texture2D(tex0_in, gl_FragCoord.xy / tex_size);

	vec4 result = pixel * color;

	gl_FragColor = result;
}