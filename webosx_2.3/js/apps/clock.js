        OS.registry.register({
            id: 'sys-clock', name: I18N.t('app.clock'), nameKey: 'app.clock', icon: ICONS.clock, defaultWidth: 340, defaultHeight: 420, resizable: false, maximizable: false,
            init: (c, api) => {
                c.innerHTML = `
                <div class="clock-container">
                    <div class="clock-face-wrap">
                        <canvas id="analog-clock-canvas" width="560" height="560"></canvas>
                    </div>
                    <div class="clock-digital-row">
                        <span class="clock-digital-time" id="analog-dig-time">00:00:00</span>
                        <span class="clock-digital-date" id="analog-dig-date">--</span>
                    </div>
                </div>`;

                const canvas = c.querySelector('#analog-clock-canvas');
                const ctx = canvas.getContext('2d');
                const digTime = c.querySelector('#analog-dig-time');
                const digDate = c.querySelector('#analog-dig-date');

                const S = 560;
                const CX = S / 2, CY = S / 2, R = S / 2 - 30;
                let animId = null;

                function getHue() {
                    const v = getComputedStyle(document.documentElement).getPropertyValue('--hue').trim();
                    const parsed = parseFloat(v);
                    return Number.isNaN(parsed) ? 210 : parsed;
                }

                function drawHand(angle, length, width, color, shadow) {
                    const len = Math.max(1, length);
                    const tipX = CX + Math.cos(angle) * len;
                    const tipY = CY + Math.sin(angle) * len;
                    const tailLen = len * 0.18;
                    const tailX = CX - Math.cos(angle) * tailLen;
                    const tailY = CY - Math.sin(angle) * tailLen;

                    if (shadow) {
                        ctx.save();
                        ctx.shadowColor = 'rgba(0,0,0,0.45)';
                        ctx.shadowBlur = 10;
                        ctx.shadowOffsetX = 3; ctx.shadowOffsetY = 3;
                    }
                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY); ctx.lineTo(tipX, tipY);
                    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round';
                    ctx.stroke();
                    if (shadow) ctx.restore();
                }

                function drawSecondHand(angle, length, hue) {
                    const len = Math.max(1, length);
                    const tipX = CX + Math.cos(angle) * len;
                    const tipY = CY + Math.sin(angle) * len;
                    const tailLen = len * 0.22;
                    const tailX = CX - Math.cos(angle) * tailLen;
                    const tailY = CY - Math.sin(angle) * tailLen;

                    ctx.save();
                    ctx.shadowColor = `hsla(${hue}, 90%, 60%, 0.6)`;
                    ctx.shadowBlur = 14;
                    ctx.beginPath();
                    ctx.moveTo(tailX, tailY); ctx.lineTo(tipX, tipY);
                    ctx.strokeStyle = `hsl(${hue}, 85%, 58%)`;
                    ctx.lineWidth = 2.2; ctx.lineCap = 'round';
                    ctx.stroke();
                    ctx.restore();

                    ctx.beginPath(); ctx.arc(tipX, tipY, 4, 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${hue}, 85%, 58%)`; ctx.fill();
                }

                function draw() {
                    const hue = getHue();
                    const now = new Date();
                    const h = now.getHours() % 12, m = now.getMinutes(), s = now.getSeconds(), ms = now.getMilliseconds();
                    const sSmooth = s + ms / 1000;
                    const mSmooth = m + sSmooth / 60;
                    const hSmooth = h + mSmooth / 60;

                    ctx.clearRect(0, 0, S, S);

                    // Fond du cadran
                    const bgGrad = ctx.createRadialGradient(CX, CY, R * 0.1, CX, CY, R * 1.15);
                    bgGrad.addColorStop(0, `hsl(${hue}, 12%, 14%)`);
                    bgGrad.addColorStop(0.85, `hsl(${hue}, 10%, 10%)`);
                    bgGrad.addColorStop(1, `hsl(${hue}, 8%, 6%)`);
                    ctx.beginPath(); ctx.arc(CX, CY, R + 20, 0, Math.PI * 2);
                    ctx.fillStyle = bgGrad; ctx.fill();

                    // Bordure extérieure
                    ctx.beginPath(); ctx.arc(CX, CY, R + 20, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(${hue}, 30%, 30%, 0.5)`;
                    ctx.lineWidth = 2; ctx.stroke();

                    ctx.beginPath(); ctx.arc(CX, CY, R + 8, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(${hue}, 20%, 22%, 0.6)`;
                    ctx.lineWidth = 1; ctx.stroke();

                    // Cercle intérieur subtil
                    ctx.beginPath(); ctx.arc(CX, CY, R - 8, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(${hue}, 15%, 25%, 0.25)`;
                    ctx.lineWidth = 1; ctx.stroke();

                    // Marques et chiffres
                    for (let i = 0; i < 60; i++) {
                        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
                        const isHour = i % 5 === 0;
                        const outerR = R - 12;
                        const innerR = isHour ? R - 42 : R - 24;
                        const x1 = CX + Math.cos(angle) * outerR;
                        const y1 = CY + Math.sin(angle) * outerR;
                        const x2 = CX + Math.cos(angle) * innerR;
                        const y2 = CY + Math.sin(angle) * innerR;

                        ctx.beginPath();
                        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
                        if (isHour) {
                            ctx.strokeStyle = `hsla(${hue}, 20%, 65%, 0.9)`;
                            ctx.lineWidth = 3.5;
                            ctx.lineCap = 'round';
                        } else {
                            ctx.strokeStyle = `hsla(${hue}, 10%, 40%, 0.5)`;
                            ctx.lineWidth = 1.2;
                            ctx.lineCap = 'round';
                        }
                        ctx.stroke();
                    }

                    // Chiffres
                    ctx.font = '600 30px "Segoe UI", Tahoma, sans-serif';
                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    for (let i = 1; i <= 12; i++) {
                        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
                        const numR = R - 62;
                        const x = CX + Math.cos(angle) * numR;
                        const y = CY + Math.sin(angle) * numR;
                        ctx.fillStyle = `hsla(${hue}, 15%, 75%, 0.85)`;
                        ctx.fillText(i.toString(), x, y);
                    }

                    // Aiguille des heures
                    drawHand((hSmooth / 12) * Math.PI * 2 - Math.PI / 2, R * 0.48, 8, `hsl(${hue}, 15%, 72%)`, true);

                    // Aiguille des minutes
                    drawHand((mSmooth / 60) * Math.PI * 2 - Math.PI / 2, R * 0.7, 5, `hsl(${hue}, 12%, 82%)`, true);

                    // Aiguille des secondes
                    drawSecondHand((sSmooth / 60) * Math.PI * 2 - Math.PI / 2, R * 0.78, hue);

                    // Centre
                    ctx.beginPath(); ctx.arc(CX, CY, 10, 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${hue}, 80%, 55%)`; ctx.fill();
                    ctx.beginPath(); ctx.arc(CX, CY, 4, 0, Math.PI * 2);
                    ctx.fillStyle = '#fff'; ctx.fill();

                    // Digitale
                    digTime.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
                    digDate.textContent = now.toLocaleDateString(I18N.locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

                    animId = requestAnimationFrame(draw);
                }

                draw();

                // Nettoyage quand la fenêtre ferme
                const origClose = api.close;
                api.close = () => { if (animId) cancelAnimationFrame(animId); origClose(); };
            }
        });
