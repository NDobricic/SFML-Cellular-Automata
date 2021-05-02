uniform sampler2D currentGen;
uniform sampler2D trailTex;
uniform vec2 tex_size;
uniform float trailPersistance;

void main()
{
	vec4 currentPixel = texture2D(currentGen, gl_FragCoord.xy / tex_size);
	vec4 trail = texture2D(trailTex, gl_FragCoord.xy / tex_size) * trailPersistance;

	if(trail.r < 0.1)
		trail = vec4(0, 0, 0, 1);

	vec4 result = currentPixel + trail;
	gl_FragColor = vec4(clamp(result.r, 0, 1), clamp(result.g, 0, 1), clamp(result.b, 0, 1), 1);
}