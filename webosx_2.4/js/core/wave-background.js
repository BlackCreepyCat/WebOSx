        // ---- Fond animé "vagues" façon PS3/PSP ----
        (function() {
            const canvas = document.getElementById('ps3-waves-canvas');
            const ctx = canvas.getContext('2d');
            let W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);

            function resize() {
                W = canvas.clientWidth; H = canvas.clientHeight;
                canvas.width = W * dpr; canvas.height = H * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

            function getWaveConfig() {
                return window.__waveConfig || { speed: 1, width: 1, enabled: true };
            }

            const ribbons = [
                { yFactor: 0.42, amp: 110, thick: 190, freq: 0.9, speed: 0.045, phase: 0.0, hueShift: -8, alpha: 0.28 },
                { yFactor: 0.50, amp: 130, thick: 220, freq: 0.7, speed: 0.032, phase: 1.6, hueShift: 0,  alpha: 0.30 },
                { yFactor: 0.58, amp: 100, thick: 170, freq: 1.0, speed: -0.038,phase: 3.1, hueShift: 8,  alpha: 0.28 },
            ];

            function waveY(x, r, t, offset, cfg) {
                const spd = r.speed * cfg.speed;
                return r.amp * cfg.width * Math.sin(x * 0.0016 * r.freq + t * spd + r.phase)
                     + r.amp * cfg.width * 0.35 * Math.sin(x * 0.0006 * r.freq - t * spd * 0.6 + r.phase * 1.4)
                     + offset;
            }

            function drawRibbon(r, t) {
                const cfg = getWaveConfig();
                const hue = getHue() + r.hueShift;
                const baseY = H * r.yFactor;
                const step = Math.max(8, W / 90);
                const thick = r.thick * cfg.width;

                const thickness = (x) => thick * (0.75 + 0.25 * Math.sin(x * 0.002 + t * r.speed * cfg.speed * 1.3 + r.phase));

                ctx.save();
                ctx.filter = 'blur(18px)';
                ctx.beginPath();
                for (let x = -step; x <= W + step; x += step) {
                    const y = baseY + waveY(x, r, t, -thickness(x) / 2, cfg);
                    if (x === -step) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                for (let x = W + step; x >= -step; x -= step) {
                    const y = baseY + waveY(x, r, t, thickness(x) / 2, cfg);
                    ctx.lineTo(x, y);
                }
                ctx.closePath();
                const grad = ctx.createLinearGradient(0, baseY - thick, 0, baseY + thick);
                grad.addColorStop(0,   `hsla(${hue}, 85%, 60%, 0)`);
                grad.addColorStop(0.5, `hsla(${hue}, 85%, 65%, ${r.alpha})`);
                grad.addColorStop(1,   `hsla(${hue}, 85%, 60%, 0)`);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.filter = 'blur(4px)';
                ctx.beginPath();
                for (let x = -step; x <= W + step; x += step) {
                    const y = baseY + waveY(x, r, t, 0, cfg);
                    if (x === -step) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.strokeStyle = `hsla(${hue}, 90%, 80%, ${r.alpha * 0.6})`;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }

            function frame(ts) {
                const t = ts * 0.001;
                ctx.clearRect(0, 0, W, H);
                if (getWaveConfig().enabled !== false) {
                    ctx.globalCompositeOperation = 'lighter';
                    ribbons.forEach(r => drawRibbon(r, t));
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
