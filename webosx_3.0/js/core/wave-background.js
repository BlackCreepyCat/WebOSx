        // ---- Fond animé "vagues" façon PS3 — rendu WebGL ----
        // Shader repris de Creepy Player (Creepy Cat) : vagues sinusoïdales lumineuses,
        // halos radiaux et deux champs de particules (orbes lents + étincelles rapides).
        // Adaptation WebOSx : au lieu des 5 thèmes de couleur fixes de l'outil d'origine
        // (bleu/rouge/vert/violet/or, sélectionnés par boutons), la palette est dérivée
        // en continu de --hue (0-360°) et --sat (saturation, 0-100), pour rester raccordée
        // au sélecteur de couleur de l'OS — y compris une couleur personnalisée peu
        // saturée (blanc, gris), qui donne des vagues pâles/neutres plutôt qu'une teinte
        // arbitraire. Les sliders "Vitesse" et "Largeur des rubans" des Réglages restent
        // aussi fonctionnels : vitesse pilote l'écoulement du temps du shader, largeur
        // pilote l'amplitude et l'épaisseur des vagues via l'uniform uWidthScale.
        (function() {
            const canvas = document.getElementById('ps3-waves-canvas');

            // Détection mobile grossière (UA + pointeur tactile) : sert à réduire le
            // coût du fragment shader, qui est le poste de dépense principal sur ce
            // rendu (boucles de particules exécutées par pixel).
            const isMobile = /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent)
                || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

            const gl = canvas.getContext('webgl', {
                antialias: !isMobile,
                alpha: false
            });
            if (!gl) return; // WebGL indisponible : pas de fond animé (dégradation silencieuse)

            // Résolution interne : le plus gros levier de performance pour un shader aussi
            // coûteux par pixel. Sur mobile on ne dépasse pas 1x de DPR (écrans déjà
            // denses, et le rendu est de toute façon flouté/lumineux, la finesse ne se
            // voit pas), et on rend en plus à une fraction de la taille CSS réelle : le
            // navigateur agrandit ensuite l'image tout seul (upscale), quasi gratuit pour
            // le GPU, alors que chaque pixel calculé en moins par le shader compte.
            // 0.3 ici = plus de 10x moins de pixels à calculer qu'à pleine résolution
            // mobile. À ajuster si besoin (encore plus bas si ça rame toujours, plus
            // haut si le flou devient trop visible).
            const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
            const mobileResScale = 0.7;
            const renderScale = isMobile ? mobileResScale : 1;

            function resize() {
                const W = canvas.clientWidth, H = canvas.clientHeight;
                canvas.width = Math.max(1, Math.round(W * dpr * renderScale));
                canvas.height = Math.max(1, Math.round(H * dpr * renderScale));
                gl.viewport(0, 0, canvas.width, canvas.height);
            }
            window.addEventListener('resize', resize);
            resize();

            // Le seul écouteur 'resize' de la fenêtre ne suffit pas : si un resize
            // survient pendant que #ps3-waves est en display:none (réglage désactivé,
            // devtools, rotation...), clientWidth/Height valent 0 et le canvas interne
            // reste figé à 0x0 même après réactivation. Le ResizeObserver, lui, se
            // déclenche aussi quand l'élément repasse de 0 à sa taille réelle
            // (display:none -> visible), donc la reprise des vagues se recalcule
            // automatiquement sans F5.
            const ro = new ResizeObserver(() => resize());
            ro.observe(document.getElementById('ps3-waves'));

            function getHue() {
                const v = getComputedStyle(document.documentElement).getPropertyValue('--hue').trim();
                const parsed = parseFloat(v);
                return Number.isNaN(parsed) ? 210 : parsed;
            }

            function getSat() {
                const v = getComputedStyle(document.documentElement).getPropertyValue('--sat').trim();
                const parsed = parseFloat(v);
                return Number.isNaN(parsed) ? 80 : parsed;
            }

            function getWaveConfig() {
                return window.__waveConfig || { speed: 1, width: 1, enabled: true };
            }

            // --- Shaders ---
            const vsSource = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

            const fsSource = `
precision highp float;
uniform float uTime;
uniform vec2  uResolution;
uniform vec3  uBgColor;
uniform vec3  uWaveColor;
uniform vec3  uHighlight;
uniform vec3  uGlowColor;
uniform vec3  uParticleColor;
uniform float uWidthScale;
const float WAVE_WIDTH_FACTOR = 1.5;

vec3 calcSine(vec2 uv, float speed, float frequency, float amplitude, float phaseShift, float verticalOffset, vec3 baseColor, float lineWidth, float sharpness, bool invertFalloff) {
  amplitude *= uWidthScale;
  lineWidth *= uWidthScale;
  float angle = uTime * speed * frequency * -1.0 + (phaseShift + uv.x) * 2.0;
  float waveY = sin(angle) * amplitude + verticalOffset;
  float deltaY = waveY - uv.y;
  float distVal = distance(waveY, uv.y);
  if (invertFalloff) { if (deltaY > 0.0) distVal *= 4.0; } else { if (deltaY < 0.0) distVal *= 4.0; }
  float smoothVal = smoothstep(lineWidth * WAVE_WIDTH_FACTOR, 0.0, distVal);
  float scaleVal = pow(smoothVal, sharpness);
  return min(baseColor * scaleVal, baseColor);
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float bgGrad = length((uv - vec2(0.5, 0.55)) * vec2(1.0, 0.8));
  vec3 color = uBgColor * (1.0 - bgGrad * 0.3);
  float pulse = 0.85 + 0.15 * sin(uTime * 0.2);
  float gd = length((uv - vec2(0.5, 0.48)) * vec2(1.3, 1.0));
  color += uGlowColor * exp(-gd * gd * 3.5) * 0.10 * pulse;
  vec2 go = vec2(sin(uTime * 0.1) * 0.05, cos(uTime * 0.08) * 0.04);
  float gd2 = length((uv - vec2(0.5, 0.45) + go) * vec2(1.5, 1.2));
  color += uGlowColor * exp(-gd2 * gd2 * 5.0) * 0.06 * pulse;
  vec3 waves = vec3(0.0);
  waves += calcSine(uv, 0.20, 0.20, 0.20, 0.0, 0.50, uWaveColor, 0.10, 15.0, false);
  waves += calcSine(uv, 0.40, 0.40, 0.15, 0.0, 0.50, uWaveColor, 0.10, 17.0, false);
  waves += calcSine(uv, 0.30, 0.60, 0.15, 0.0, 0.50, uWaveColor * 0.8, 0.05, 23.0, false);
  waves += calcSine(uv, 0.10, 0.26, 0.07, 0.0, 0.30, uWaveColor, 0.10, 17.0, true);
  waves += calcSine(uv, 0.30, 0.36, 0.07, 0.0, 0.30, uWaveColor, 0.10, 17.0, true);
  waves += calcSine(uv, 0.50, 0.46, 0.07, 0.0, 0.30, uWaveColor * 0.8, 0.05, 23.0, true);
  waves += calcSine(uv, 0.20, 0.58, 0.05, 0.0, 0.30, uWaveColor * 0.6, 0.20, 15.0, true);
  vec3 crests = vec3(0.0);
  crests += calcSine(uv, 0.20, 0.20, 0.20, 0.0, 0.50, uHighlight, 0.015, 30.0, false);
  crests += calcSine(uv, 0.40, 0.40, 0.15, 0.0, 0.50, uHighlight, 0.012, 35.0, false);
  crests += calcSine(uv, 0.30, 0.60, 0.15, 0.0, 0.50, uHighlight, 0.008, 40.0, false);
  crests += calcSine(uv, 0.10, 0.26, 0.07, 0.0, 0.30, uHighlight, 0.015, 30.0, true);
  crests += calcSine(uv, 0.30, 0.36, 0.07, 0.0, 0.30, uHighlight, 0.012, 35.0, true);
  color += waves + crests * 0.4;
  float waveMask = max(max(waves.r, waves.g), waves.b);
  float aspect = uResolution.x / uResolution.y;
  vec3 sparkles = vec3(0.0);

  // ── Orbes lents en arrière-plan ──
  for (float i = 0.0; i < 20.0; i++) {
    vec2 op = vec2(hash(vec2(i * 13.7, i * 3.1)), hash(vec2(i * 5.9, i * 17.3)));
    float ospd = 0.003 + hash(vec2(i * 4.1, 1.0)) * 0.006;
    op.x = fract(op.x + sin(uTime * 0.05 + i * 0.8) * 0.04 + uTime * ospd * 0.15);
    op.y = fract(op.y + cos(uTime * 0.04 + i * 1.1) * 0.03 - uTime * ospd * 0.08);
    float oblink = 0.45 + 0.55 * sin(uTime * (0.3 + hash(vec2(i * 2.2, 7.0)) * 0.5) + i * 2.5);
    oblink = pow(max(oblink, 0.0), 1.5);
    float d = length((uv - op) * vec2(aspect, 1.0));
    float osz = (0.018 + hash(vec2(i * 6.3, 11.0)) * 0.028) * 0.25;
    float oglow = exp(-d * d / (osz * osz)) * oblink;
    sparkles += uParticleColor * oglow * 0.55;
  }

  // ── Étincelles rapides ──
  for (float i = 0.0; i < 120.0; i++) {
    vec2 pp = vec2(hash(vec2(i, i * 7.3)), hash(vec2(i * 3.7, i * 11.1)));
    float spd = 0.008 + hash(vec2(i * 2.3, 0.0)) * 0.015;
    pp.x = fract(pp.x + sin(uTime * 0.12 + i) * 0.015 + uTime * spd * 0.2);
    pp.y = fract(pp.y + cos(uTime * 0.09 + i * 1.3) * 0.012 - uTime * spd * 0.1);
    float blink = 0.5 + 0.5 * sin(uTime * (1.2 + hash(vec2(i * 5.5, 3.0)) * 2.0) + i * 4.0);
    blink = pow(blink, 2.0);
    float d = length((uv - pp) * vec2(aspect, 1.0));
    float sz = (0.0025 + hash(vec2(i * 9.0, 5.0)) * 0.005) * 0.25;
    float glow = exp(-d * d / (sz * sz)) * blink;
    glow *= (0.4 + smoothstep(0.0, 0.15, waveMask) * 0.6);
    sparkles += uParticleColor * glow * 1.1;
  }

  color += sparkles;
  float vig = 1.0 - smoothstep(0.3, 0.95, length((uv - 0.5) * vec2(1.1, 0.9)));
  color *= mix(0.55, 1.0, vig);
  color = color / (1.0 + color * 0.12);
  gl_FragColor = vec4(color, 1.0);
}`;

            function compileShader(type, src) {
                const s = gl.createShader(type);
                gl.shaderSource(s, src);
                gl.compileShader(s);
                return s;
            }

            const prog = gl.createProgram();
            gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vsSource));
            gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fsSource));
            gl.linkProgram(prog);
            gl.useProgram(prog);

            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
            const posLoc = gl.getAttribLocation(prog, 'aPosition');
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

            const u = {};
            ['uTime', 'uResolution', 'uBgColor', 'uWaveColor', 'uHighlight', 'uGlowColor', 'uParticleColor', 'uWidthScale'].forEach(n => {
                u[n] = gl.getUniformLocation(prog, n);
            });

            // --- Palette dérivée de la teinte de l'OS (remplace les 5 thèmes fixes de
            // l'outil d'origine) : mêmes proportions saturation/luminosité par rôle,
            // retrouvées en analysant les 5 palettes d'origine, appliquées à --hue. ---
            function hslToRgb(h, s, l) {
                h = ((h % 360) + 360) % 360 / 360; s /= 100; l /= 100;
                if (s === 0) return [l, l, l];
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                const hue2rgb = (t) => {
                    if (t < 0) t += 1; if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                return [hue2rgb(h + 1 / 3), hue2rgb(h), hue2rgb(h - 1 / 3)];
            }

            function paletteForHue(h, satPct) {
                // 80 = vivacité de référence des pastilles "teintes rapides" (hsl(h, 80%, 55%)) ;
                // une couleur personnalisée moins saturée (ex : blanc, gris) réduit
                // proportionnellement la saturation de chaque rôle, jusqu'à un fond
                // entièrement neutre pour un blanc/gris pur (satPct = 0).
                const k = Math.max(0, satPct ?? 80) / 80;
                const S = (base) => Math.min(100, Math.max(0, base * k));
                return {
                    bg: hslToRgb(h, S(65), 9),
                    wave: hslToRgb(h + 3, S(72), 40),
                    highlight: hslToRgb(h + 8, S(95), 72),
                    glow: hslToRgb(h + 2, S(75), 42),
                    particle: hslToRgb(h + 5, S(95), 77)
                };
            }

            let target = paletteForHue(getHue(), getSat());
            let lastHue = getHue(), lastSat = getSat();
            const cur = {
                bg: [...target.bg], wave: [...target.wave],
                highlight: [...target.highlight], glow: [...target.glow], particle: [...target.particle]
            };
            function lerpArr(a, b, t) { for (let i = 0; i < a.length; i++) a[i] += (b[i] - a[i]) * t; }

            let simTime = 0, lastTs = 0;

            function frame(ts) {
                const dt = lastTs ? (ts - lastTs) / 1000 : 0;
                lastTs = ts;
                const cfg = getWaveConfig();

                if (cfg.enabled !== false) {
                    simTime += dt * (cfg.speed ?? 1);

                    const hue = getHue(), sat = getSat();
                    if (hue !== lastHue || sat !== lastSat) { lastHue = hue; lastSat = sat; target = paletteForHue(hue, sat); }
                    lerpArr(cur.bg, target.bg, 0.02);
                    lerpArr(cur.wave, target.wave, 0.02);
                    lerpArr(cur.highlight, target.highlight, 0.02);
                    lerpArr(cur.glow, target.glow, 0.02);
                    lerpArr(cur.particle, target.particle, 0.02);

                    gl.uniform1f(u.uTime, simTime);
                    gl.uniform2f(u.uResolution, canvas.width, canvas.height);
                    gl.uniform3fv(u.uBgColor, cur.bg);
                    gl.uniform3fv(u.uWaveColor, cur.wave);
                    gl.uniform3fv(u.uHighlight, cur.highlight);
                    gl.uniform3fv(u.uGlowColor, cur.glow);
                    gl.uniform3fv(u.uParticleColor, cur.particle);
                    gl.uniform1f(u.uWidthScale, cfg.width ?? 1);
                    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                }
                requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        })();

        function hexToHSL(H) {
            let r = 0, g = 0, b = 0;
            if (H.length === 4) { r = parseInt(H[1]+H[1], 16); g = parseInt(H[2]+H[2], 16); b = parseInt(H[3]+H[3], 16); }
            if (H.length === 7) { r = parseInt(H.substring(1,3), 16); g = parseInt(H.substring(3,5), 16); b = parseInt(H.substring(5,7), 16); }
            r /= 255; g /= 255; b /= 255;
            let max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if(max === min){ h = s = 0; } else {
                let d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){ 
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break; 
                    case g: h = (b - r) / d + 2; break; 
                    case b: h = (r - g) / d + 4; break; 
                }
                h /= 6;
            }
            return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
        }
