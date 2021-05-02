#version 460

// original shader by https://www.reddit.com/user/slackermanz/

// uniform values passed in by Visions of Chaos each frame
uniform vec2 tex_size; //image tex_size in x and y pixels
uniform int frames; //which frame is this being rendered
uniform sampler2D tex0_in; //previous frame buffer texture
uniform float random1; //different random float value each frame

float seed = 0.0;
// Shader developed by Slackermanz:
// https://www.reddit.com/user/slackermanz/
// https://github.com/Slackermanz/VulkanAutomata
float gdv(float x, float y, int v, float div) {
// Get Div Value: Return the value of a specified pixel
// x, y : Relative integer-spaced coordinates to origin [ 0.0, 0.0 ]
// v : Colour channel [ 0, 1, 2 ]
// div : Integer-spaced number of toroidal divisions of the surface/medium
    float divx = tex_size.x / div;
    float divy = tex_size.y / div;
    float pxo = 1.0 / tex_size.x;
    float pyo = 1.0 / tex_size.y;
    float fcxo = gl_FragCoord.x + x;
    float fcyo = gl_FragCoord.y + y;
    float fcx = (mod(fcxo,divx) + floor(gl_FragCoord.x/divx)*divx ) * pxo;
    float fcy = (mod(fcyo,divy) + floor(gl_FragCoord.y/divy)*divy ) * pyo;
    vec4 pxdata = texture2D( tex0_in, vec2(fcx, fcy) );
    return pxdata[v];
}
vec3 nhd( vec2 nbhd, vec2 ofst, float psn, float thr, int col, float div ) {
// Neighbourhood: Return information about the specified group of pixels
    float dist = 0.0;
    float cval = 0.0;
    float c_total = 0.0;
    float c_valid = 0.0;
    float c_value = 0.0;
    for(float i = -nbhd[0]; i <= nbhd[0]; i += 1.0) {
        for(float j = -nbhd[0]; j <= nbhd[0]; j += 1.0) {
            dist = floor(sqrt(i*i+j*j)+0.5);
            if( dist <= nbhd[0] && dist > nbhd[1] && dist != 0.0 ) {
                cval = gdv(i+ofst[0],j+ofst[1],col,div);
                c_total += psn;
                if( cval > thr ) {
                    c_valid += psn;
                    cval = psn * cval;
                    c_value += cval-fract(cval); } } } } 
    return vec3( c_value, c_valid, c_total );
}
float get_xc(float x, float y, float xmod) {
// Used to reseed the surface with noise
    float sq = sqrt(mod(x*y+y, xmod)) / sqrt(xmod);
    float xc = mod((x*x)+(y*y), xmod) / xmod;
    return clamp((sq+xc)*0.5, 0.0, 1.0);
}
float shuffle(float x, float y, float xmod, float val) {
// Used to reseed the surface with noise
    val = val * mod( x*y + x, xmod );
    return (val-floor(val));
}
float get_xcn(float x, float y, float xm0, float xm1, float ox, float oy) {
// Used to reseed the surface with noise
    float xc = get_xc(x+ox, y+oy, xm0);
    return shuffle(x+ox, y+oy, xm1, xc);
}
float get_lump(float x, float y, float nhsz, float xm0, float xm1) {
// Used to reseed the surface with noise
    float nhsz_c = 0.0;
    float xcn = 0.0;
    float nh_val = 0.0;
    for(float i = -nhsz; i <= nhsz; i += 1.0) {
        for(float j = -nhsz; j <= nhsz; j += 1.0) {
            nh_val = floor(sqrt(i*i+j*j)+0.5);
            if(nh_val <= nhsz) {
                xcn = xcn + get_xcn(x, y, xm0, xm1, i, j);
                nhsz_c = nhsz_c + 1.0; } } }
    float xcnf = ( xcn / nhsz_c );
    float xcaf = xcnf;
    for(float i = 0.0; i <= nhsz; i += 1.0) {
            xcaf = clamp((xcnf*xcaf + xcnf*xcaf) * (xcnf+xcnf), 0.0, 1.0); }
    return xcaf;
}
float reseed2(float seed) {
// Used to reseed the surface with noise
    float r0 = get_lump(gl_FragCoord.x, gl_FragCoord.y, 2.0, 19.0 + mod(float(frames+random1)+seed,17.0), 23.0 + mod(float(frames+random1)+seed,43.0));
    float r1 = get_lump(gl_FragCoord.x, gl_FragCoord.y, 12.0, 13.0 + mod(float(frames+random1)+seed,29.0), 17.0 + mod(float(frames+random1)+seed,31.0));
    float r2 = get_lump(gl_FragCoord.x, gl_FragCoord.y, 4.0, 13.0 + mod(float(frames+random1)+seed,11.0), 51.0 + mod(float(frames+random1)+seed,37.0));
    return clamp((r0+r1)-r2,0.0,1.0);
}
float split_ring_nh(vec2 nh, float[12] e0, float[12] e1){
    float e0_sum = 0.0;
    float e1_sum = 0.0;
    for(int i = int(nh[1]); i < int(nh[0]); i++) {
        e0_sum = e0_sum + e0[i];
        e1_sum = e1_sum + e1[i];
    }
    return e0_sum / e1_sum;
}
void main() {
// ---- ---- ---- ---- ---- ---- ---- ----
// Shader Initilisation
// ---- ---- ---- ---- ---- ---- ---- ----
    const int VMX = 52; // Evolution Variables
    const int SMX = 12; // Maximum NH Size
    float psn = 250.0; // Precision
    float mnp = 0.004; // Minimum Precision Value : (1.0 / psn);
    float div = 1.0; // Toroidal Surface Divisions
    float divi = floor((gl_FragCoord.x*div)/(tex_size.x)) 
                        + floor((gl_FragCoord.y*div)/(tex_size.y))*div; // Division Index
    float dspace = (divi+1.0)/(div*div);
                dspace = (div == 1.0) ? 0.5 : dspace; // Division Weight
    vec3 col = vec3( 0.0, 0.0, 0.0 ); // Final colour value output container

// Uniform Buffer V number
    float[VMX] ubvn = float[VMX]
    (0.318000, 0.390000, 0.465000, 0.194000, 0.189000, 0.163000, 0.143000, 0.440000, 0.298000, 0.071000, 0.243000, 0.071000, 0.486000, 0.062000, -0.063000, -0.039000, 0.243000, 0.264000, -0.117000, 0.374000, 0.405000, 0.238000, 0.186000, -0.008000, 0.298000, 0.062000, -0.097000, 0.026000, 0.305000, -0.110000, 0.093000, -0.072000, 0.467000, -0.138000, 0.309000, -0.039000, 0.213000, 0.432000, -0.087000, -0.185000, 0.014000, 0.134000, -0.135000, 0.013000, 0.384000, -0.010000, -0.047000, 0.140000, 0.441000, -0.186000, 0.027000, 0.150000 );

// Division Weighted V number
    float[VMX] dvmd; 
    for(int i = 0; i < VMX; i++) { dvmd[i] = ubvn[i] * 1.0; }

// ---- ---- ---- ---- ---- ---- ---- ----
// Rule Initilisation
// ---- ---- ---- ---- ---- ---- ---- ----

// Get the reference frame's origin pixel values
    float res_r = gdv( 0.0, 0.0, 0, div );
    float res_g = gdv( 0.0, 0.0, 1, div );
    float res_b = gdv( 0.0, 0.0, 2, div );

// Transition speed
    float s = mnp * 24.0;

// Layer interpolation rates
    float li = mnp * 1.0;
    float lc = mnp * 32.0;

// NHs
    float[SMX] ring_e0_r;
    float[SMX] ring_e1_r;
    float[SMX] ring_e0_g;
    float[SMX] ring_e1_g;
    float[SMX] ring_e0_b;
    float[SMX] ring_e1_b;

    vec3 ring_r;
    vec3 ring_g;
    vec3 ring_b;

    for(int i = 0; i < SMX; i++) {
        ring_r = nhd( vec2( float(i+1), float(i) ), vec2( 0.0, 0.0 ), psn, 0.0, 0, div );
        ring_e0_r[i] = ring_r[0];
        ring_e1_r[i] = ring_r[2];
        ring_g = nhd( vec2( float(i+1), float(i) ), vec2( 0.0, 0.0 ), psn, 0.0, 1, div );
        ring_e0_g[i] = ring_g[0];
        ring_e1_g[i] = ring_g[2];
        ring_b = nhd( vec2( float(i+1), float(i) ), vec2( 0.0, 0.0 ), psn, 0.0, 2, div );
        ring_e0_b[i] = ring_b[0];
        ring_e1_b[i] = ring_b[2]; }

// ---- ---- ---- ---- ---- ---- ---- ----
// Transition Functions
// ---- ---- ---- ---- ---- ---- ---- ----

    vec2[4] nhds = vec2[4] (
        vec2( 1.0, 0.0 ),
        vec2( 3.0, 1.0 ),
        vec2( 8.0, 2.0 ),
        vec2( 12.0, 4.0 )
    );

    float[12] nhdt;
        nhdt[0] = split_ring_nh( nhds[0], ring_e0_r, ring_e1_r );
        nhdt[1] = split_ring_nh( nhds[0], ring_e0_g, ring_e1_g );
        nhdt[2] = split_ring_nh( nhds[0], ring_e0_b, ring_e1_b );

        nhdt[3] = split_ring_nh( nhds[1], ring_e0_r, ring_e1_r );
        nhdt[4] = split_ring_nh( nhds[1], ring_e0_g, ring_e1_g );
        nhdt[5] = split_ring_nh( nhds[1], ring_e0_b, ring_e1_b );

        nhdt[6] = split_ring_nh( nhds[2], ring_e0_r, ring_e1_r );
        nhdt[7] = split_ring_nh( nhds[2], ring_e0_g, ring_e1_g );
        nhdt[8] = split_ring_nh( nhds[2], ring_e0_b, ring_e1_b );

        nhdt[9] = split_ring_nh( nhds[3], ring_e0_r, ring_e1_r );
        nhdt[10] = split_ring_nh( nhds[3], ring_e0_g, ring_e1_g );
        nhdt[11] = split_ring_nh( nhds[3], ring_e0_b, ring_e1_b );

    if( nhdt[0] >= dvmd[0] && nhdt[0] <= dvmd[1] ) { res_r += s; }
    if( nhdt[0] >= dvmd[2] && nhdt[0] <= dvmd[3] ) { res_r -= s; }
    if( nhdt[1] >= dvmd[4] && nhdt[1] <= dvmd[5] ) { res_g += s; }
    if( nhdt[1] >= dvmd[6] && nhdt[1] <= dvmd[7] ) { res_g -= s; }
    if( nhdt[2] >= dvmd[8] && nhdt[2] <= dvmd[9] ) { res_b += s; }
    if( nhdt[2] >= dvmd[10] && nhdt[2] <= dvmd[11] ) { res_b -= s; }

    if( nhdt[3] >= dvmd[12] && nhdt[3] <= dvmd[13] ) { res_r += s; }
    if( nhdt[3] >= dvmd[14] && nhdt[3] <= dvmd[15] ) { res_r -= s; }
    if( nhdt[4] >= dvmd[16] && nhdt[4] <= dvmd[17] ) { res_g += s; }
    if( nhdt[4] >= dvmd[18] && nhdt[4] <= dvmd[19] ) { res_g -= s; }
    if( nhdt[5] >= dvmd[20] && nhdt[5] <= dvmd[21] ) { res_b += s; }
    if( nhdt[5] >= dvmd[22] && nhdt[5] <= dvmd[23] ) { res_b -= s; }

    if( nhdt[6] >= dvmd[24] && nhdt[6] <= dvmd[25] ) { res_r += s; }
    if( nhdt[6] >= dvmd[26] && nhdt[6] <= dvmd[27] ) { res_r -= s; }
    if( nhdt[7] >= dvmd[28] && nhdt[7] <= dvmd[29] ) { res_g += s; }
    if( nhdt[7] >= dvmd[30] && nhdt[7] <= dvmd[31] ) { res_g -= s; }
    if( nhdt[8] >= dvmd[32] && nhdt[8] <= dvmd[33] ) { res_b += s; }
    if( nhdt[8] >= dvmd[34] && nhdt[8] <= dvmd[35] ) { res_b -= s; }

    if( nhdt[9] >= dvmd[36] && nhdt[9] <= dvmd[37] ) { res_r += s; }
    if( nhdt[9] >= dvmd[38] && nhdt[9] <= dvmd[39] ) { res_r -= s; }
    if( nhdt[10] >= dvmd[40] && nhdt[10] <= dvmd[41] ) { res_g += s; }
    if( nhdt[10] >= dvmd[42] && nhdt[10] <= dvmd[43] ) { res_g -= s; }
    if( nhdt[11] >= dvmd[44] && nhdt[11] <= dvmd[45] ) { res_b += s; }
    if( nhdt[11] >= dvmd[46] && nhdt[11] <= dvmd[47] ) { res_b -= s; }

// ---- ---- ---- ---- ---- ---- ---- ----
// Blur Application
// ---- ---- ---- ---- ---- ---- ---- ----

    float nhr_blur = ( split_ring_nh( vec2(1.0, 0.0), ring_e0_r, ring_e1_r ) 
                        + split_ring_nh( vec2(3.0, 2.0), ring_e0_r, ring_e1_r )
                        + split_ring_nh( vec2(6.0, 5.0), ring_e0_r, ring_e1_r ) ) / ( 3.0 );
    float nhg_blur = ( split_ring_nh( vec2(1.0, 0.0), ring_e0_g, ring_e1_g ) 
                        + split_ring_nh( vec2(3.0, 2.0), ring_e0_g, ring_e1_g )
                        + split_ring_nh( vec2(6.0, 5.0), ring_e0_g, ring_e1_g ) ) / ( 3.0 );
    float nhb_blur = ( split_ring_nh( vec2(1.0, 0.0), ring_e0_b, ring_e1_b ) 
                        + split_ring_nh( vec2(3.0, 2.0), ring_e0_b, ring_e1_b )
                        + split_ring_nh( vec2(6.0, 5.0), ring_e0_b, ring_e1_b ) ) / ( 3.0 );

    res_r = (res_r + nhr_blur * s) / (1.0 + s);
    res_g = (res_g + nhg_blur * s) / (1.0 + s);
    res_b = (res_b + nhb_blur * s) / (1.0 + s);

// ---- ---- ---- ---- ---- ---- ---- ----
// Layer Communication
// ---- ---- ---- ---- ---- ---- ---- ----

// Interpolate
    float inp_r = (res_r * 1.0 + res_g * li + res_b * li ) / ( 1.0 + li * 2.0 );
    float inp_g = (res_r * li + res_g * 1.0 + res_b * li ) / ( 1.0 + li * 2.0 );
    float inp_b = (res_r * li + res_g * li + res_b * 1.0 ) / ( 1.0 + li * 2.0 );
    res_r = inp_r;
    res_g = inp_g;
    res_b = inp_b;
/**/
// Cycle
    float cyc_r = (res_r * 1.0 + res_g * lc + res_b * -lc );
    float cyc_g = (res_r * -lc + res_g * 1.0 + res_b * lc );
    float cyc_b = (res_r * lc + res_g * -lc + res_b * 1.0 );
    res_r = cyc_r;
    res_g = cyc_g;
    res_b = cyc_b;
/**/
// Random Weights
    float mpw0 = dvmd[48] * s * sign(dvmd[51]);
    float mpw1 = dvmd[49] * s * sign(dvmd[51]);
    float mpw2 = dvmd[50] * s * sign(dvmd[51]);

    float map_r = (res_r + res_g * mpw1 + res_b * mpw2 ) / (1.0 + mpw1 + mpw2 );
    float map_g = (res_r * mpw0 + res_g + res_b * mpw2 ) / (1.0 + mpw0 + mpw2 );
    float map_b = (res_r * mpw0 + res_g * mpw1 + res_b ) / (1.0 + mpw0 + mpw1 );
    res_r = map_r;
    res_g = map_g;
    res_b = map_b;
// ---- ---- ---- ---- ---- ---- ---- ----
// Presentation Filtering
// ---- ---- ---- ---- ---- ---- ---- ----

// ---- ---- ---- ---- ---- ---- ---- ----
// Shader Output
// ---- ---- ---- ---- ---- ---- ---- ----

// Reseed (expensive?)

// Clear

// Channel Map
    col[0] = res_r;
    col[1] = res_g;
    col[2] = res_b;

// Mouse Interaction
// Final output
    //seed the first few frames
    if(frames<1) col = vec3(reseed2(random1),reseed2(random1),reseed2(random1));
    gl_FragColor = vec4(col, 1.0);
}