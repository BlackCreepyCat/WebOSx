        // ==================================================================
        // App "Minuteur & Chrono" — reprend fidèlement le langage visuel de
        // l'Horloge (clock.js) : même cadran (dégradé radial teinté par
        // --hue, graduations, halo lumineux) mais avec deux modes :
        //   - Minuteur : un arc de progression qui se réduit à mesure que le
        //     temps s'écoule, façon minuteur de cuisine.
        //   - Chronomètre : de vraies aiguilles balayantes (minutes/secondes)
        //     pilotées par le temps écoulé plutôt que l'heure du jour, avec
        //     tours (laps).
        // ==================================================================

        const TIMER_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8.5"/><path d="M12 13V9"/><path d="M9.5 2h5"/><path d="M18.5 5.5 20 4"/></svg>`;

        I18N.registerLang('fr', {
            'app.timer': 'Minuteur & Chrono',
            'tsw.mode.timer': 'Minuteur', 'tsw.mode.stopwatch': 'Chronomètre',
            'tsw.start': 'Démarrer', 'tsw.pause': 'Pause', 'tsw.reset': 'Réinitialiser', 'tsw.lap': 'Tour',
            'tsw.running': 'En cours', 'tsw.paused': 'En pause', 'tsw.ready': 'Prêt', 'tsw.done': 'Terminé !',
            'tsw.notifyDone': 'Le minuteur est terminé.', 'tsw.customPlaceholderMin': 'min', 'tsw.customPlaceholderSec': 'sec', 'tsw.set': 'Définir'
        });
        I18N.registerLang('en', {
            'app.timer': 'Timer & Stopwatch',
            'tsw.mode.timer': 'Timer', 'tsw.mode.stopwatch': 'Stopwatch',
            'tsw.start': 'Start', 'tsw.pause': 'Pause', 'tsw.reset': 'Reset', 'tsw.lap': 'Lap',
            'tsw.running': 'Running', 'tsw.paused': 'Paused', 'tsw.ready': 'Ready', 'tsw.done': 'Done!',
            'tsw.notifyDone': 'Timer finished.', 'tsw.customPlaceholderMin': 'min', 'tsw.customPlaceholderSec': 'sec', 'tsw.set': 'Set'
        });
        I18N.registerLang('es', {
            'app.timer': 'Temporizador y Cronómetro',
            'tsw.mode.timer': 'Temporizador', 'tsw.mode.stopwatch': 'Cronómetro',
            'tsw.start': 'Iniciar', 'tsw.pause': 'Pausar', 'tsw.reset': 'Reiniciar', 'tsw.lap': 'Vuelta',
            'tsw.running': 'En curso', 'tsw.paused': 'Pausado', 'tsw.ready': 'Listo', 'tsw.done': '¡Completado!',
            'tsw.notifyDone': 'El temporizador ha terminado.', 'tsw.customPlaceholderMin': 'min', 'tsw.customPlaceholderSec': 'seg', 'tsw.set': 'Definir'
        });
        I18N.registerLang('de', {
            'app.timer': 'Timer & Stoppuhr',
            'tsw.mode.timer': 'Timer', 'tsw.mode.stopwatch': 'Stoppuhr',
            'tsw.start': 'Start', 'tsw.pause': 'Pause', 'tsw.reset': 'Zurücksetzen', 'tsw.lap': 'Runde',
            'tsw.running': 'Läuft', 'tsw.paused': 'Pausiert', 'tsw.ready': 'Bereit', 'tsw.done': 'Fertig!',
            'tsw.notifyDone': 'Der Timer ist abgelaufen.', 'tsw.customPlaceholderMin': 'Min', 'tsw.customPlaceholderSec': 'Sek', 'tsw.set': 'Setzen'
        });

        OS.registry.register({
            id: 'sys-timer', name: I18N.t('app.timer'), nameKey: 'app.timer', icon: TIMER_ICON,
            defaultWidth: 340, defaultHeight: 620, resizable: false, maximizable: false,
            init: (c, api) => {
                const S = 560, CX = S / 2, CY = S / 2, R = S / 2 - 30;

                let mode = 'timer';
                let running = false, accumulatedMs = 0, startTs = 0, completed = false;
                let totalMs = 5 * 60 * 1000;
                let laps = [];
                let animId = null;

                let canvas, ctx, digitalEl, subEl, modeBtns, startPauseBtn, resetBtn, lapBtn,
                    timerControlsEl, lapsWrapEl, lapsEl, presetBtns, customMinInput, customSecInput;

                function getHue() {
                    const v = getComputedStyle(document.documentElement).getPropertyValue('--hue').trim();
                    const p = parseFloat(v);
                    return Number.isNaN(p) ? 210 : p;
                }
                function elapsedNow() { return accumulatedMs + (running ? performance.now() - startTs : 0); }
                function fmt(ms, withCenti) {
                    const totalSec = Math.max(0, ms) / 1000;
                    const h = Math.floor(totalSec / 3600), m = Math.floor((totalSec % 3600) / 60), s = Math.floor(totalSec % 60);
                    const cs = Math.floor((Math.max(0, ms) % 1000) / 10);
                    const pad = (n) => String(n).padStart(2, '0');
                    let out = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
                    if (withCenti) out += `.${pad(cs)}`;
                    return out;
                }

                // Trois bips brefs façon minuterie de cuisine, générés en Web Audio —
                // aucune dépendance, aucun fichier son à charger.
                function beep() {
                    try {
                        const Ctx = window.AudioContext || window.webkitAudioContext;
                        const actx = new Ctx();
                        [0, 0.25, 0.5].forEach(delay => {
                            const o = actx.createOscillator(), g = actx.createGain();
                            o.connect(g); g.connect(actx.destination);
                            o.frequency.value = 880;
                            g.gain.setValueAtTime(0.0001, actx.currentTime + delay);
                            g.gain.exponentialRampToValueAtTime(0.25, actx.currentTime + delay + 0.02);
                            g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + delay + 0.22);
                            o.start(actx.currentTime + delay);
                            o.stop(actx.currentTime + delay + 0.25);
                        });
                    } catch (e) {}
                }

                function start() {
                    if (running) return;
                    if (mode === 'timer' && completed) doReset();
                    running = true; startTs = performance.now();
                    startPauseBtn.textContent = I18N.t('tsw.pause');
                }
                function pause() {
                    if (!running) return;
                    accumulatedMs += performance.now() - startTs;
                    running = false;
                    startPauseBtn.textContent = I18N.t('tsw.start');
                }
                function doReset() {
                    running = false; accumulatedMs = 0; completed = false; laps = [];
                    startPauseBtn.textContent = I18N.t('tsw.start');
                    renderLaps();
                }

                function onTimerComplete() {
                    UI.notify({ title: I18N.t('app.timer'), message: I18N.t('tsw.notifyDone'), type: 'success', duration: 8000, icon: TIMER_ICON });
                    beep();
                }

                function renderLaps() {
                    if (!lapsEl) return;
                    lapsEl.innerHTML = laps.slice().reverse().map(l =>
                        `<div class="tsw-lap-row"><span class="t-dim">#${l.n}</span><span>${fmt(l.split, true)}</span><span class="t-dim">${fmt(l.total, true)}</span></div>`
                    ).join('');
                }

                // ---- Dessin du cadran : même recette que clock.js (fond dégradé
                // radial teinté par --hue, bordures, 60 graduations) ----
                function drawFace(hue) {
                    const bgGrad = ctx.createRadialGradient(CX, CY, R * 0.1, CX, CY, R * 1.15);
                    bgGrad.addColorStop(0, `hsl(${hue}, 12%, 14%)`);
                    bgGrad.addColorStop(0.85, `hsl(${hue}, 10%, 10%)`);
                    bgGrad.addColorStop(1, `hsl(${hue}, 8%, 6%)`);
                    ctx.beginPath(); ctx.arc(CX, CY, R + 20, 0, Math.PI * 2); ctx.fillStyle = bgGrad; ctx.fill();

                    ctx.beginPath(); ctx.arc(CX, CY, R + 20, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(${hue}, 30%, 30%, 0.5)`; ctx.lineWidth = 2; ctx.stroke();
                    ctx.beginPath(); ctx.arc(CX, CY, R + 8, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(${hue}, 20%, 22%, 0.6)`; ctx.lineWidth = 1; ctx.stroke();
                    ctx.beginPath(); ctx.arc(CX, CY, R - 8, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(${hue}, 15%, 25%, 0.25)`; ctx.lineWidth = 1; ctx.stroke();

                    for (let i = 0; i < 60; i++) {
                        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
                        const isMajor = i % 5 === 0;
                        const outerR = R - 12, innerR = isMajor ? R - 42 : R - 24;
                        const x1 = CX + Math.cos(angle) * outerR, y1 = CY + Math.sin(angle) * outerR;
                        const x2 = CX + Math.cos(angle) * innerR, y2 = CY + Math.sin(angle) * innerR;
                        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
                        if (isMajor) { ctx.strokeStyle = `hsla(${hue}, 20%, 65%, 0.9)`; ctx.lineWidth = 3.5; }
                        else { ctx.strokeStyle = `hsla(${hue}, 10%, 40%, 0.5)`; ctx.lineWidth = 1.2; }
                        ctx.lineCap = 'round'; ctx.stroke();
                    }
                }

                function drawHand(angle, length, width, color, shadow) {
                    const len = Math.max(1, length);
                    const tipX = CX + Math.cos(angle) * len, tipY = CY + Math.sin(angle) * len;
                    const tailLen = len * 0.18;
                    const tailX = CX - Math.cos(angle) * tailLen, tailY = CY - Math.sin(angle) * tailLen;
                    if (shadow) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 10; ctx.shadowOffsetX = 3; ctx.shadowOffsetY = 3; }
                    ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(tipX, tipY);
                    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.stroke();
                    if (shadow) ctx.restore();
                }

                function drawSweepHand(angle, length, hue) {
                    const len = Math.max(1, length);
                    const tipX = CX + Math.cos(angle) * len, tipY = CY + Math.sin(angle) * len;
                    const tailLen = len * 0.22;
                    const tailX = CX - Math.cos(angle) * tailLen, tailY = CY - Math.sin(angle) * tailLen;
                    ctx.save();
                    ctx.shadowColor = `hsla(${hue}, 90%, 60%, 0.6)`; ctx.shadowBlur = 14;
                    ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(tipX, tipY);
                    ctx.strokeStyle = `hsl(${hue}, 85%, 58%)`; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.stroke();
                    ctx.restore();
                    ctx.beginPath(); ctx.arc(tipX, tipY, 4, 0, Math.PI * 2); ctx.fillStyle = `hsl(${hue}, 85%, 58%)`; ctx.fill();
                }

                // Arc de progression du minuteur : piste atténuée + arc lumineux qui se
                // réduit à mesure que le temps restant diminue, façon minuteur de cuisine.
                function drawTimerArc(hue, endAngle) {
                    ctx.beginPath(); ctx.arc(CX, CY, R - 8, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(${hue}, 15%, 30%, 0.3)`; ctx.lineWidth = 10; ctx.stroke();
                    ctx.save();
                    ctx.shadowColor = `hsla(${hue}, 90%, 60%, 0.6)`; ctx.shadowBlur = 14;
                    ctx.beginPath(); ctx.arc(CX, CY, R - 8, -Math.PI / 2, endAngle);
                    ctx.strokeStyle = `hsl(${hue}, 85%, 58%)`; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.stroke();
                    ctx.restore();
                }

                function draw() {
                    const hue = getHue();
                    ctx.clearRect(0, 0, S, S);
                    drawFace(hue);

                    if (mode === 'timer') {
                        const remaining = Math.max(0, totalMs - elapsedNow());
                        const progress = totalMs > 0 ? remaining / totalMs : 0;
                        const angle = -Math.PI / 2 + Math.max(0, Math.min(1, progress)) * Math.PI * 2;
                        drawTimerArc(hue, angle);
                        // Aiguille claire (façon aiguille heure/minute de l'Horloge, pas la
                        // couleur de l'arc) allant jusqu'au bord de l'arc, pour bien
                        // marquer la position courante plutôt que de se fondre dans le
                        // dégradé coloré.
                        drawHand(angle, R - 8, 4, '#ffffff', true);
                        digitalEl.textContent = fmt(remaining, false);
                        subEl.textContent = completed ? I18N.t('tsw.done') : (running ? I18N.t('tsw.running') : (accumulatedMs > 0 ? I18N.t('tsw.paused') : I18N.t('tsw.ready')));
                        if (remaining <= 0 && running && !completed) {
                            completed = true; running = false;
                            startPauseBtn.textContent = I18N.t('tsw.start');
                            onTimerComplete();
                        }
                    } else {
                        const elapsed = elapsedNow();
                        const sSmooth = (elapsed / 1000) % 60;
                        const mSmooth = (elapsed / 60000) % 60;
                        drawHand((mSmooth / 60) * Math.PI * 2 - Math.PI / 2, R * 0.7, 5, `hsl(${hue}, 12%, 82%)`, true);
                        drawSweepHand((sSmooth / 60) * Math.PI * 2 - Math.PI / 2, R * 0.78, hue);
                        digitalEl.textContent = fmt(elapsed, true);
                        subEl.textContent = running ? I18N.t('tsw.running') : (elapsed > 0 ? I18N.t('tsw.paused') : I18N.t('tsw.ready'));
                    }

                    ctx.beginPath(); ctx.arc(CX, CY, 10, 0, Math.PI * 2); ctx.fillStyle = `hsl(${hue}, 80%, 55%)`; ctx.fill();
                    ctx.beginPath(); ctx.arc(CX, CY, 4, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();

                    animId = requestAnimationFrame(draw);
                }

                function applyModeVisibility() {
                    modeBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
                    timerControlsEl.style.display = mode === 'timer' ? 'flex' : 'none';
                    lapBtn.style.display = mode === 'stopwatch' ? 'inline-flex' : 'none';
                    lapsWrapEl.style.display = mode === 'stopwatch' ? 'block' : 'none';
                }

                function render() {
                    c.innerHTML = `
                    <div class="clock-container">
                        <div class="tsw-modes">
                            <button class="tsw-mode-btn" data-mode="timer">${I18N.t('tsw.mode.timer')}</button>
                            <button class="tsw-mode-btn" data-mode="stopwatch">${I18N.t('tsw.mode.stopwatch')}</button>
                        </div>
                        <div class="clock-face-wrap">
                            <canvas id="tsw-canvas" width="560" height="560"></canvas>
                        </div>
                        <div class="clock-digital-row">
                            <span class="clock-digital-time" id="tsw-digital">00:00</span>
                            <span class="clock-digital-date" id="tsw-sub">—</span>
                        </div>
                        <div class="tsw-timer-controls" id="tsw-timer-controls">
                            <div class="tsw-presets">
                                <button data-sec="60">1 min</button>
                                <button data-sec="300">5 min</button>
                                <button data-sec="600">10 min</button>
                                <button data-sec="900">15 min</button>
                                <button data-sec="1500">25 min</button>
                            </div>
                            <div class="tsw-custom">
                                <input type="number" id="tsw-custom-min" min="0" placeholder="${I18N.t('tsw.customPlaceholderMin')}">
                                <span>:</span>
                                <input type="number" id="tsw-custom-sec" min="0" max="59" placeholder="${I18N.t('tsw.customPlaceholderSec')}">
                                <button id="tsw-custom-set">${I18N.t('tsw.set')}</button>
                            </div>
                        </div>
                        <div class="tsw-buttons">
                            <button class="files-tool-btn" id="tsw-btn-reset">${I18N.t('tsw.reset')}</button>
                            <button class="files-tool-btn" id="tsw-btn-startpause" style="min-width:110px;justify-content:center;">${I18N.t('tsw.start')}</button>
                            <button class="files-tool-btn" id="tsw-btn-lap">${I18N.t('tsw.lap')}</button>
                        </div>
                        <div class="tsw-laps-wrap" id="tsw-laps-wrap">
                            <div class="tsw-laps" id="tsw-laps"></div>
                        </div>
                    </div>`;

                    canvas = c.querySelector('#tsw-canvas'); ctx = canvas.getContext('2d');
                    digitalEl = c.querySelector('#tsw-digital'); subEl = c.querySelector('#tsw-sub');
                    modeBtns = [...c.querySelectorAll('.tsw-mode-btn')];
                    startPauseBtn = c.querySelector('#tsw-btn-startpause');
                    resetBtn = c.querySelector('#tsw-btn-reset');
                    lapBtn = c.querySelector('#tsw-btn-lap');
                    timerControlsEl = c.querySelector('#tsw-timer-controls');
                    lapsWrapEl = c.querySelector('#tsw-laps-wrap');
                    lapsEl = c.querySelector('#tsw-laps');
                    presetBtns = [...c.querySelectorAll('.tsw-presets button')];
                    customMinInput = c.querySelector('#tsw-custom-min');
                    customSecInput = c.querySelector('#tsw-custom-sec');

                    startPauseBtn.textContent = running ? I18N.t('tsw.pause') : I18N.t('tsw.start');

                    modeBtns.forEach(btn => {
                        btn.onclick = () => {
                            if (mode === btn.dataset.mode) return;
                            pause(); doReset();
                            mode = btn.dataset.mode;
                            applyModeVisibility();
                        };
                    });

                    presetBtns.forEach(btn => {
                        btn.onclick = () => {
                            if (running) return;
                            totalMs = parseInt(btn.dataset.sec, 10) * 1000;
                            doReset();
                            presetBtns.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                        };
                    });
                    c.querySelector('#tsw-custom-set').onclick = () => {
                        if (running) return;
                        const min = Math.max(0, parseInt(customMinInput.value, 10) || 0);
                        const sec = Math.max(0, Math.min(59, parseInt(customSecInput.value, 10) || 0));
                        if (min === 0 && sec === 0) return;
                        totalMs = (min * 60 + sec) * 1000;
                        doReset();
                        presetBtns.forEach(b => b.classList.remove('active'));
                    };

                    startPauseBtn.onclick = () => { running ? pause() : start(); };
                    resetBtn.onclick = () => { pause(); doReset(); };
                    lapBtn.onclick = () => {
                        if (!running) return;
                        const elapsed = elapsedNow();
                        const prevTotal = laps.length ? laps[laps.length - 1].total : 0;
                        laps.push({ n: laps.length + 1, total: elapsed, split: elapsed - prevTotal });
                        renderLaps();
                    };

                    applyModeVisibility();
                    renderLaps();
                }

                render();
                animId = requestAnimationFrame(draw);

                window.addEventListener('webosx:langchange', render);
                const origClose = api.close;
                api.close = () => {
                    if (animId) cancelAnimationFrame(animId);
                    window.removeEventListener('webosx:langchange', render);
                    origClose();
                };
            }
        });
