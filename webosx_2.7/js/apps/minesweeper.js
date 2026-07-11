        // ==================================================================
        // Démineur — jeu classique, autonome (aucune dépendance externe)
        // ------------------------------------------------------------------
        // Suit les mêmes conventions que les autres apps WebOSx :
        //   - traductions auto-suffisantes via I18N.registerLang
        //   - style injecté une seule fois dans <head> (scoping par préfixe .ms-)
        //   - état entièrement recréé à chaque init() → pas de fuite entre fenêtres
        //   - meilleurs temps persistés dans localStorage (comme SettingsManager)
        // ==================================================================

        const MINESWEEPER_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="7.5"/><line x1="12" y1="3.2" x2="12" y2="5.2"/><line x1="12" y1="2" x2="12" y2="2.01"/><line x1="17.5" y1="5" x2="16.2" y2="6.3"/><path d="M9.5 10.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5"/></svg>`;

        I18N.registerLang('fr', {
            'app.minesweeper': 'Démineur',
            'mine.difficulty.beginner': 'Débutant',
            'mine.difficulty.intermediate': 'Intermédiaire',
            'mine.difficulty.expert': 'Expert',
            'mine.newGame': 'Nouvelle partie',
            'mine.mines': 'Mines',
            'mine.time': 'Temps',
            'mine.win': 'Gagné ! 🎉',
            'mine.lose': 'Boum ! 💥',
            'mine.bestTime': 'Meilleur temps',
            'mine.none': '—',
            'mine.flagHint': 'Clic droit : drapeau · Double-clic sur un chiffre : révéler les voisins'
        });
        I18N.registerLang('en', {
            'app.minesweeper': 'Minesweeper',
            'mine.difficulty.beginner': 'Beginner',
            'mine.difficulty.intermediate': 'Intermediate',
            'mine.difficulty.expert': 'Expert',
            'mine.newGame': 'New game',
            'mine.mines': 'Mines',
            'mine.time': 'Time',
            'mine.win': 'You win! 🎉',
            'mine.lose': 'Boom! 💥',
            'mine.bestTime': 'Best time',
            'mine.none': '—',
            'mine.flagHint': 'Right-click: flag · Double-click a number: reveal neighbors'
        });
        I18N.registerLang('es', {
            'app.minesweeper': 'Buscaminas',
            'mine.difficulty.beginner': 'Principiante',
            'mine.difficulty.intermediate': 'Intermedio',
            'mine.difficulty.expert': 'Experto',
            'mine.newGame': 'Nueva partida',
            'mine.mines': 'Minas',
            'mine.time': 'Tiempo',
            'mine.win': '¡Ganaste! 🎉',
            'mine.lose': '¡Boom! 💥',
            'mine.bestTime': 'Mejor tiempo',
            'mine.none': '—',
            'mine.flagHint': 'Clic derecho: bandera · Doble clic en un número: revelar vecinos'
        });
        I18N.registerLang('de', {
            'app.minesweeper': 'Minesweeper',
            'mine.difficulty.beginner': 'Anfänger',
            'mine.difficulty.intermediate': 'Fortgeschritten',
            'mine.difficulty.expert': 'Experte',
            'mine.newGame': 'Neues Spiel',
            'mine.mines': 'Minen',
            'mine.time': 'Zeit',
            'mine.win': 'Gewonnen! 🎉',
            'mine.lose': 'Boom! 💥',
            'mine.bestTime': 'Bestzeit',
            'mine.none': '—',
            'mine.flagHint': 'Rechtsklick: Fahne · Doppelklick auf Zahl: Nachbarn aufdecken'
        });

        // --- Style injecté une seule fois, scoping par préfixe .ms- (n'entre pas en conflit avec core.css) ---
        (function injectMinesweeperStyle() {
            if (document.getElementById('minesweeper-style')) return;
            const style = document.createElement('style');
            style.id = 'minesweeper-style';
            style.textContent = `
                .ms-container { display:flex; flex-direction:column; height:100%; background:var(--bg-window, #1c1c22); color:var(--text-primary, #eee); user-select:none; }
                .ms-toolbar { display:flex; align-items:center; gap:10px; padding:10px 12px; border-bottom:1px solid var(--border-color, #333); flex-wrap:wrap; }
                .ms-select { background:var(--bg-window, #1c1c22); color:var(--text-primary, #eee); border:1px solid var(--border-color, #333); border-radius:6px; padding:5px 8px; font-family:inherit; font-size:12.5px; cursor:pointer; }
                .ms-counter { font-variant-numeric:tabular-nums; font-weight:700; font-size:14px; background:#111; color:#ff5050; border-radius:5px; padding:4px 9px; letter-spacing:1px; min-width:52px; text-align:center; }
                .ms-face { width:34px; height:34px; border-radius:8px; border:1px solid var(--border-color, #333); background:hsl(var(--hue,210), 20%, 22%); font-size:18px; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:transform .1s; }
                .ms-face:active { transform:scale(0.9); }
                .ms-face:hover { background:hsl(var(--hue,210), 30%, 28%); }
                .ms-spacer { flex:1; }
                .ms-best { font-size:11px; color:var(--text-secondary, #999); white-space:nowrap; }
                .ms-boardwrap { flex:1; min-height:0; overflow:auto; display:flex; align-items:center; justify-content:center; padding:14px; }
                .ms-board { display:grid; gap:2px; background:var(--border-color, #333); border:2px solid var(--border-color, #333); border-radius:4px; padding:2px; flex-shrink:0; }
                .ms-cell { width:var(--ms-cell-size, 26px); height:var(--ms-cell-size, 26px); display:flex; align-items:center; justify-content:center; font-size:calc(var(--ms-cell-size, 26px) * 0.5); font-weight:800; border-radius:2px; cursor:pointer; background:hsl(var(--hue,210), 12%, 30%); transition:background .06s; }
                .ms-cell.hidden:hover { background:hsl(var(--hue,210), 16%, 36%); }
                .ms-cell.revealed { background:hsl(var(--hue,210), 8%, 16%); cursor:default; }
                .ms-cell.mine-hit { background:#c0392b; }
                .ms-cell.mine-shown { background:hsl(var(--hue,210), 8%, 16%); }
                .ms-cell.flagged { background:hsl(var(--hue,210), 12%, 30%); }
                .ms-n1 { color:#4d9fff; } .ms-n2 { color:#4ecb71; } .ms-n3 { color:#ff5b5b; }
                .ms-n4 { color:#9b6bff; } .ms-n5 { color:#c97a3d; } .ms-n6 { color:#3ddede; }
                .ms-n7 { color:#eee; } .ms-n8 { color:#aaa; }
                .ms-statusbar { padding:6px 12px; font-size:11px; color:var(--text-secondary, #999); border-top:1px solid var(--border-color, #333); text-align:center; }
                .ms-statusbar.win { color:#4ecb71; font-weight:700; }
                .ms-statusbar.lose { color:#ff5b5b; font-weight:700; }
                @keyframes ms-shake { 0%,100% { transform:translateX(0); } 20% { transform:translateX(-3px); } 40% { transform:translateX(3px); } 60% { transform:translateX(-2px); } 80% { transform:translateX(2px); } }
                .ms-cell.ms-shake { animation: ms-shake 0.3s ease-in-out; }
            `;
            document.head.appendChild(style);
        })();

        const MINE_DIFFICULTIES = {
            beginner:     { rows: 9,  cols: 9,  mines: 10, key: 'mine.difficulty.beginner' },
            intermediate: { rows: 16, cols: 16, mines: 40, key: 'mine.difficulty.intermediate' },
            expert:       { rows: 16, cols: 30, mines: 99, key: 'mine.difficulty.expert' }
        };

        function msLoadBest() {
            try { return JSON.parse(localStorage.getItem('webosx_minesweeper_best')) || {}; }
            catch (e) { return {}; }
        }
        function msSaveBest(best) {
            try { localStorage.setItem('webosx_minesweeper_best', JSON.stringify(best)); } catch (e) {}
        }

        OS.registry.register({
            id: 'sys-minesweeper', name: I18N.t('app.minesweeper'), nameKey: 'app.minesweeper',
            icon: MINESWEEPER_ICON, defaultWidth: 560, defaultHeight: 640,
            init: (c, api) => {
                c.innerHTML = `
                <div class="ms-container">
                    <div class="ms-toolbar">
                        <select class="ms-select" id="ms-difficulty">
                            <option value="beginner">${I18N.t('mine.difficulty.beginner')} 9×9</option>
                            <option value="intermediate" selected>${I18N.t('mine.difficulty.intermediate')} 16×16</option>
                            <option value="expert">${I18N.t('mine.difficulty.expert')} 30×16</option>
                        </select>
                        <span class="ms-counter" id="ms-mines-left">010</span>
                        <button class="ms-face" id="ms-face" title="${I18N.t('mine.newGame')}">🙂</button>
                        <span class="ms-counter" id="ms-timer">000</span>
                        <div class="ms-spacer"></div>
                        <span class="ms-best" id="ms-best-label"></span>
                    </div>
                    <div class="ms-boardwrap"><div class="ms-board" id="ms-board"></div></div>
                    <div class="ms-statusbar" id="ms-status">${I18N.t('mine.flagHint')}</div>
                </div>`;

                const diffSelect = c.querySelector('#ms-difficulty');
                const minesLeftEl = c.querySelector('#ms-mines-left');
                const timerEl = c.querySelector('#ms-timer');
                const faceEl = c.querySelector('#ms-face');
                const boardEl = c.querySelector('#ms-board');
                const boardWrapEl = c.querySelector('.ms-boardwrap');
                const statusEl = c.querySelector('#ms-status');
                const bestLabelEl = c.querySelector('#ms-best-label');

                let difficulty = 'intermediate';
                let rows, cols, mineCount;
                let cells = [];           // tableau plat de { el, mine, revealed, flagged, adjacent }
                let firstClickDone = false;
                let gameOver = false;
                let flagsPlaced = 0;
                let revealedCount = 0;
                let elapsed = 0;
                let timerInterval = null;
                let bestTimes = msLoadBest();

                function idx(r, cl) { return r * cols + cl; }

                function pad3(n) { return String(Math.max(0, Math.min(999, n))).padStart(3, '0'); }

                function updateMinesLeft() {
                    minesLeftEl.textContent = pad3(mineCount - flagsPlaced);
                }
                function updateTimer() {
                    timerEl.textContent = pad3(elapsed);
                }
                function updateBestLabel() {
                    const best = bestTimes[difficulty];
                    bestLabelEl.textContent = I18N.t('mine.bestTime') + ' : ' + (best ? best + 's' : I18N.t('mine.none'));
                }

                function stopTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } }
                function startTimer() {
                    stopTimer();
                    timerInterval = setInterval(() => { elapsed++; updateTimer(); }, 1000);
                }

                function neighbors(r, cl) {
                    const list = [];
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            if (dr === 0 && dc === 0) continue;
                            const nr = r + dr, nc = cl + dc;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) list.push(idx(nr, nc));
                        }
                    }
                    return list;
                }

                function buildBoard() {
                    const cfg = MINE_DIFFICULTIES[difficulty];
                    rows = cfg.rows; cols = cfg.cols; mineCount = cfg.mines;
                    boardEl.innerHTML = '';
                    cells = new Array(rows * cols);
                    firstClickDone = false; gameOver = false; flagsPlaced = 0; revealedCount = 0; elapsed = 0;
                    stopTimer(); updateTimer(); updateMinesLeft(); updateBestLabel();
                    faceEl.textContent = '🙂';
                    statusEl.textContent = I18N.t('mine.flagHint');
                    statusEl.className = 'ms-statusbar';

                    for (let r = 0; r < rows; r++) {
                        for (let cl = 0; cl < cols; cl++) {
                            const el = document.createElement('div');
                            el.className = 'ms-cell hidden';
                            const cellIdx = idx(r, cl);
                            const cell = { el, mine: false, revealed: false, flagged: false, adjacent: 0, r, c: cl };
                            cells[cellIdx] = cell;

                            el.addEventListener('mousedown', (e) => { if (e.button === 0 && !gameOver && !cell.flagged) faceEl.textContent = '😮'; });
                            el.addEventListener('mouseup', () => { if (!gameOver) faceEl.textContent = '🙂'; });
                            el.addEventListener('mouseleave', () => { if (!gameOver) faceEl.textContent = '🙂'; });
                            el.addEventListener('click', () => handleReveal(cellIdx));
                            el.addEventListener('dblclick', () => handleChord(cellIdx));
                            el.addEventListener('contextmenu', (e) => { e.preventDefault(); handleFlag(cellIdx); });

                            boardEl.appendChild(el);
                        }
                    }
                    fitBoardToWrap();
                }

                // --- Adapte la taille des cases à l'espace disponible dans la fenêtre ---
                const MS_MIN_CELL = 14, MS_MAX_CELL = 60, MS_WRAP_PADDING = 28, MS_BOARD_CHROME = 8;
                function fitBoardToWrap() {
                    if (!cols || !rows) return;
                    const availW = boardWrapEl.clientWidth - MS_WRAP_PADDING;
                    const availH = boardWrapEl.clientHeight - MS_WRAP_PADDING;
                    if (availW <= 0 || availH <= 0) return;
                    const gapTotalW = (cols - 1) * 2, gapTotalH = (rows - 1) * 2;
                    const sizeW = (availW - MS_BOARD_CHROME - gapTotalW) / cols;
                    const sizeH = (availH - MS_BOARD_CHROME - gapTotalH) / rows;
                    const size = Math.max(MS_MIN_CELL, Math.min(MS_MAX_CELL, Math.floor(Math.min(sizeW, sizeH))));
                    boardEl.style.setProperty('--ms-cell-size', size + 'px');
                    boardEl.style.gridTemplateColumns = `repeat(${cols}, var(--ms-cell-size))`;
                }

                let fitPending = false;
                function scheduleFit() {
                    if (fitPending) return;
                    fitPending = true;
                    requestAnimationFrame(() => { fitPending = false; fitBoardToWrap(); });
                }
                const resizeObserver = new ResizeObserver(scheduleFit);
                resizeObserver.observe(boardWrapEl);
                // Filet de sécurité : observe aussi la fenêtre WebOSx elle-même (là où
                // WindowManager écrit directement width/height pendant le glisser-redimensionner),
                // au cas où le conteneur interne tarderait à répercuter le changement.
                const windowEl = c.closest('.window');
                if (windowEl) resizeObserver.observe(windowEl);

                function placeMines(excludeIdx) {
                    const excluded = new Set([excludeIdx, ...neighbors(cells[excludeIdx].r, cells[excludeIdx].c)]);
                    const pool = [];
                    for (let i = 0; i < cells.length; i++) if (!excluded.has(i)) pool.push(i);
                    // Mélange puis prend les N premiers — simple et suffisant pour un plateau de jeu
                    for (let i = pool.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [pool[i], pool[j]] = [pool[j], pool[i]];
                    }
                    const mineSet = new Set(pool.slice(0, mineCount));
                    mineSet.forEach(i => { cells[i].mine = true; });
                    cells.forEach(cell => {
                        if (cell.mine) return;
                        cell.adjacent = neighbors(cell.r, cell.c).filter(i => cells[i].mine).length;
                    });
                }

                function renderCell(cell) {
                    const el = cell.el;
                    el.className = 'ms-cell';
                    if (cell.flagged && !cell.revealed) {
                        el.classList.add('flagged', 'hidden');
                        el.textContent = '🚩';
                        return;
                    }
                    if (!cell.revealed) {
                        el.classList.add('hidden');
                        el.textContent = '';
                        return;
                    }
                    el.classList.add('revealed');
                    if (cell.mine) {
                        el.classList.add(cell._hit ? 'mine-hit' : 'mine-shown');
                        el.textContent = '💣';
                    } else if (cell.adjacent > 0) {
                        el.textContent = cell.adjacent;
                        el.classList.add('ms-n' + cell.adjacent);
                    } else {
                        el.textContent = '';
                    }
                }

                function revealCell(cellIdx) {
                    const cell = cells[cellIdx];
                    if (cell.revealed || cell.flagged) return;
                    cell.revealed = true;
                    revealedCount++;
                    renderCell(cell);
                    if (!cell.mine && cell.adjacent === 0) {
                        neighbors(cell.r, cell.c).forEach(n => { if (!cells[n].revealed && !cells[n].flagged) revealCell(n); });
                    }
                }

                function handleReveal(cellIdx) {
                    if (gameOver) return;
                    const cell = cells[cellIdx];
                    if (cell.flagged || cell.revealed) return;

                    if (!firstClickDone) {
                        placeMines(cellIdx);
                        firstClickDone = true;
                        startTimer();
                    }

                    if (cell.mine) {
                        cell._hit = true;
                        endGame(false);
                        return;
                    }

                    revealCell(cellIdx);
                    checkWin();
                }

                function handleFlag(cellIdx) {
                    if (gameOver) return;
                    const cell = cells[cellIdx];
                    if (cell.revealed) return;
                    if (!firstClickDone) return; // pas de drapeau avant le premier clic (comme les implémentations classiques)
                    cell.flagged = !cell.flagged;
                    flagsPlaced += cell.flagged ? 1 : -1;
                    renderCell(cell);
                    updateMinesLeft();
                }

                function handleChord(cellIdx) {
                    if (gameOver) return;
                    const cell = cells[cellIdx];
                    if (!cell.revealed || cell.adjacent === 0) return;
                    const nb = neighbors(cell.r, cell.c);
                    const flaggedCount = nb.filter(i => cells[i].flagged).length;
                    if (flaggedCount !== cell.adjacent) {
                        // Retour visuel : le double-clic est bien détecté, mais le nombre
                        // de drapeaux voisins ne correspond pas encore au chiffre affiché.
                        cell.el.classList.remove('ms-shake');
                        void cell.el.offsetWidth; // force le reflow pour pouvoir rejouer l'animation
                        cell.el.classList.add('ms-shake');
                        return;
                    }
                    let hitMine = false;
                    nb.forEach(i => {
                        const n = cells[i];
                        if (n.flagged || n.revealed) return;
                        if (n.mine) { n._hit = true; hitMine = true; }
                        else revealCell(i);
                    });
                    if (hitMine) endGame(false);
                    else checkWin();
                }

                function checkWin() {
                    if (revealedCount === rows * cols - mineCount) endGame(true);
                }

                function endGame(win) {
                    gameOver = true;
                    stopTimer();
                    faceEl.textContent = win ? '😎' : '😵';
                    cells.forEach(cell => {
                        if (cell.mine && !cell.flagged) { cell.revealed = true; renderCell(cell); }
                        if (!cell.mine && cell.flagged) { cell.el.textContent = '❌'; } // drapeau mal placé
                    });
                    if (win) {
                        statusEl.textContent = I18N.t('mine.win');
                        statusEl.className = 'ms-statusbar win';
                        const best = bestTimes[difficulty];
                        if (!best || elapsed < best) { bestTimes[difficulty] = elapsed; msSaveBest(bestTimes); }
                        updateBestLabel();
                    } else {
                        statusEl.textContent = I18N.t('mine.lose');
                        statusEl.className = 'ms-statusbar lose';
                    }
                }

                // --- Contrôles ---
                diffSelect.onchange = () => { difficulty = diffSelect.value; buildBoard(); };
                faceEl.onclick = () => buildBoard();

                // --- Localisation dynamique ---
                function applyLocale() {
                    diffSelect.querySelectorAll('option')[0].textContent = I18N.t('mine.difficulty.beginner') + ' 9×9';
                    diffSelect.querySelectorAll('option')[1].textContent = I18N.t('mine.difficulty.intermediate') + ' 16×16';
                    diffSelect.querySelectorAll('option')[2].textContent = I18N.t('mine.difficulty.expert') + ' 30×16';
                    faceEl.title = I18N.t('mine.newGame');
                    updateBestLabel();
                    if (!gameOver) statusEl.textContent = I18N.t('mine.flagHint');
                    else statusEl.textContent = statusEl.classList.contains('win') ? I18N.t('mine.win') : I18N.t('mine.lose');
                }
                window.addEventListener('webosx:langchange', applyLocale);

                // --- Init ---
                buildBoard();

                // --- Nettoyage ---
                const origClose = api.close;
                api.close = () => {
                    stopTimer();
                    resizeObserver.disconnect();
                    window.removeEventListener('webosx:langchange', applyLocale);
                    origClose();
                };
            }
        });
