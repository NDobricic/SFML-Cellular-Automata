uniform sampler2D tex0_in;
uniform sampler2D tex1_in;
uniform vec2 tex_size;

void main()
{
	vec4 pixel0 = texture2D(tex0_in, gl_FragCoord.xy / tex_size);
	vec4 pixel1 = texture2D(tex1_in, gl_FragCoord.xy / tex_size);

	vec4 result = pixel0 + pixel1;

	gl_FragColor = vec4(clamp(result.r, 0, 1), clamp(result.g, 0, 1), clamp(result.b, 0, 1), clamp(result.a, 0, 1));
}