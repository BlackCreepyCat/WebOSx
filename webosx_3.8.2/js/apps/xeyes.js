        // ==================================================================
        // Yeux — hommage au vénérable xeyes de X11. Deux yeux qui suivent le
        // pointeur partout sur l'écran (pas seulement dans la fenêtre), avec
        // clignement aléatoire pour un peu de vie. Non-singleton : comme
        // l'original, rien n'empêche d'en ouvrir plusieurs à la fois.
        // ==================================================================

        const XEYES_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="7" cy="12" rx="4.3" ry="3.3"/><circle cx="7" cy="12" r="1.4" fill="currentColor" stroke="none"/><ellipse cx="17" cy="12" rx="4.3" ry="3.3"/><circle cx="17" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`;

        I18N.registerLang('fr', { 'app.xeyes': 'Yeux' });
        I18N.registerLang('en', { 'app.xeyes': 'Eyes' });
        I18N.registerLang('es', { 'app.xeyes': 'Ojos' });
        I18N.registerLang('de', { 'app.xeyes': 'Augen' });
        I18N.registerLang('it', { 'app.xeyes': 'Occhi' });
        I18N.registerLang('pt', { 'app.xeyes': 'Olhos' });

        OS.registry.register({
            id: 'sys-xeyes', name: I18N.t('app.xeyes'), nameKey: 'app.xeyes', icon: XEYES_ICON,
            defaultWidth: 340, defaultHeight: 230, resizable: true, maximizable: true,
            init: (c, api) => {
                c.style.background = 'var(--bg-desktop)';
                c.innerHTML = `<canvas id="xeyes-canvas" style="width:100%; height:100%; display:block;"></canvas>`;
                const canvas = c.querySelector('#xeyes-canvas');
                const ctx = canvas.getContext('2d');

                let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
                let blink = 0;          // 0 = ouvert, 1 = fermé
                let nextBlinkAt = performance.now() + 2000 + Math.random() * 4000;
                let blinkStart = 0, blinking = false;
                let animId = null;

                function getHue() {
                    const v = getComputedStyle(document.documentElement).getPropertyValue('--hue').trim();
                    const p = parseFloat(v);
                    return Number.isNaN(p) ? 210 : p;
                }

                function onPointerMove(e) { mouseX = e.clientX; mouseY = e.clientY; }
                window.addEventListener('pointermove', onPointerMove);

                function resize() {
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    const w = canvas.clientWidth, h = canvas.clientHeight;
                    canvas.width = Math.max(1, Math.round(w * dpr));
                    canvas.height = Math.max(1, Math.round(h * dpr));
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                }
                const ro = new ResizeObserver(resize);
                ro.observe(canvas);
                resize();

                function drawEye(cx, cy, R, pupilAngle, pupilDist, closeAmt, hue) {
                    // Globe de l'œil
                    ctx.save();
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, R, R * 0.78, 0, 0, Math.PI * 2);
                    const grad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R * 1.1);
                    grad.addColorStop(0, `hsl(${hue}, 15%, 96%)`);
                    grad.addColorStop(1, `hsl(${hue}, 10%, 85%)`);
                    ctx.fillStyle = grad;
                    ctx.fill();
                    ctx.lineWidth = Math.max(1.5, R * 0.045);
                    ctx.strokeStyle = `hsl(${hue}, 12%, 22%)`;
                    ctx.stroke();

                    // Pupille (clamp dans l'ellipse du globe)
                    const maxDx = R * 0.56, maxDy = R * 0.78 * 0.56;
                    const dist = Math.min(pupilDist, 1);
                    const px = cx + Math.cos(pupilAngle) * maxDx * dist;
                    const py = cy + Math.sin(pupilAngle) * maxDy * dist;
                    const pr = R * 0.34;

                    ctx.beginPath();
                    ctx.arc(px, py, pr, 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${hue + 6}, 70%, 38%)`;
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(px, py, pr * 0.46, 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${hue}, 20%, 8%)`;
                    ctx.fill();
                    // Reflet
                    ctx.beginPath();
                    ctx.arc(px - pr * 0.32, py - pr * 0.32, pr * 0.22, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255,255,255,0.85)';
                    ctx.fill();
                    ctx.restore();

                    // Paupière (clignement) : rectangle qui descend depuis le haut du globe
                    if (closeAmt > 0.001) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.ellipse(cx, cy, R, R * 0.78, 0, 0, Math.PI * 2);
                        ctx.clip();
                        const lidH = R * 0.78 * 2 * closeAmt;
                        ctx.fillStyle = `hsl(${hue}, 12%, 14%)`;
                        ctx.fillRect(cx - R, cy - R * 0.78, R * 2, lidH);
                        ctx.restore();
                    }
                }

                function frame(ts) {
                    const w = canvas.clientWidth, h = canvas.clientHeight;
                    ctx.clearRect(0, 0, w, h);

                    // Gestion du clignement (rapide fermeture/ouverture, aléatoire)
                    if (!blinking && ts >= nextBlinkAt) { blinking = true; blinkStart = ts; }
                    if (blinking) {
                        const t = (ts - blinkStart) / 140; // ~140ms par phase
                        blink = t < 1 ? t : (t < 2 ? 2 - t : 0);
                        if (t >= 2) { blinking = false; blink = 0; nextBlinkAt = ts + 2500 + Math.random() * 5000; }
                    }

                    const hue = getHue();
                    const margin = Math.min(w, h) * 0.08;
                    const R = Math.min((w - margin * 3) / 4, (h - margin * 2) / 2);
                    const cy = h / 2;
                    const cx1 = w / 2 - R * 1.15;
                    const cx2 = w / 2 + R * 1.15;

                    [[cx1, cy], [cx2, cy]].forEach(([ex, ey]) => {
                        const rect = canvas.getBoundingClientRect();
                        const eyeViewportX = rect.left + ex, eyeViewportY = rect.top + ey;
                        const angle = Math.atan2(mouseY - eyeViewportY, mouseX - eyeViewportX);
                        const dist = Math.hypot(mouseX - eyeViewportX, mouseY - eyeViewportY) / (R * 3);
                        drawEye(ex, ey, R, angle, dist, blink, hue);
                    });

                    animId = requestAnimationFrame(frame);
                }
                animId = requestAnimationFrame(frame);

                const origClose = api.close;
                api.close = () => {
                    if (animId) cancelAnimationFrame(animId);
                    ro.disconnect();
                    window.removeEventListener('pointermove', onPointerMove);
                    origClose();
                };
            }
        });
