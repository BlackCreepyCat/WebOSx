        // Traductions propres à l'app Calculatrice (auto-suffisantes, n'impactent pas js/core/lang/*.js)
        I18N.registerLang('fr', {
            'calc.history': 'Historique',
            'calc.hideHistory': 'Masquer',
            'calc.noHistory': 'Aucun historique'
        });
        I18N.registerLang('en', {
            'calc.history': 'History',
            'calc.hideHistory': 'Hide',
            'calc.noHistory': 'No history'
        });
        I18N.registerLang('es', {
            'calc.history': 'Historial',
            'calc.hideHistory': 'Ocultar',
            'calc.noHistory': 'Sin historial'
        });
        I18N.registerLang('de', {
            'calc.history': 'Verlauf',
            'calc.hideHistory': 'Ausblenden',
            'calc.noHistory': 'Kein Verlauf'
        });
        I18N.registerLang('it', {
            'calc.history': 'Cronologia',
            'calc.hideHistory': 'Nascondi',
            'calc.noHistory': 'Nessuna cronologia'
        });
        I18N.registerLang('pt', {
            'calc.history': 'Histórico',
            'calc.hideHistory': 'Ocultar',
            'calc.noHistory': 'Sem histórico'
        });

        OS.registry.register({
            id: 'sys-calc', name: I18N.t('app.calc'), nameKey: 'app.calc', icon: ICONS.calc, defaultWidth: 340, defaultHeight: 500,
            init: (c, api) => {
                c.innerHTML = `
                <div class="calc-container">
                    <div class="calc-display">
                        <div class="calc-expression" id="calc-expr"></div>
                        <div class="calc-result" id="calc-result">0</div>
                    </div>
                    <div class="calc-memory-bar">
                        <span class="mem-indicator" id="calc-mem-ind">M</span>
                        <button class="calc-memory-btn" data-mem="mc">MC</button>
                        <button class="calc-memory-btn" data-mem="mr">MR</button>
                        <button class="calc-memory-btn" data-mem="m+">M+</button>
                        <button class="calc-memory-btn" data-mem="m-">M-</button>
                        <button class="calc-history-toggle" id="calc-hist-toggle">${I18N.t('calc.history')}</button>
                    </div>
                    <div class="calc-body">
                        <div class="calc-buttons">
                            <button class="calc-btn fn" data-action="percent">%</button>
                            <button class="calc-btn fn" data-action="ce">CE</button>
                            <button class="calc-btn fn" data-action="clear">C</button>
                            <button class="calc-btn fn" data-action="backspace">⌫</button>

                            <button class="calc-btn fn" data-action="inverse">1/x</button>
                            <button class="calc-btn fn" data-action="square">x²</button>
                            <button class="calc-btn fn" data-action="sqrt">√x</button>
                            <button class="calc-btn op" data-action="op" data-op="/">÷</button>

                            <button class="calc-btn" data-action="digit" data-val="7">7</button>
                            <button class="calc-btn" data-action="digit" data-val="8">8</button>
                            <button class="calc-btn" data-action="digit" data-val="9">9</button>
                            <button class="calc-btn op" data-action="op" data-op="*">×</button>

                            <button class="calc-btn" data-action="digit" data-val="4">4</button>
                            <button class="calc-btn" data-action="digit" data-val="5">5</button>
                            <button class="calc-btn" data-action="digit" data-val="6">6</button>
                            <button class="calc-btn op" data-action="op" data-op="-">−</button>

                            <button class="calc-btn" data-action="digit" data-val="1">1</button>
                            <button class="calc-btn" data-action="digit" data-val="2">2</button>
                            <button class="calc-btn" data-action="digit" data-val="3">3</button>
                            <button class="calc-btn op" data-action="op" data-op="+">+</button>

                            <button class="calc-btn fn" data-action="negate">±</button>
                            <button class="calc-btn zero" data-action="digit" data-val="0">0</button>
                            <button class="calc-btn" data-action="decimal">.</button>
                            <button class="calc-btn eq" data-action="equals">=</button>
                        </div>
                        <div class="calc-history-panel" id="calc-hist-panel">
                            <div class="calc-history-inner" id="calc-hist-inner">
                                <div class="calc-history-empty">${I18N.t('calc.noHistory')}</div>
                            </div>
                        </div>
                    </div>
                </div>`;

                const exprEl = c.querySelector('#calc-expr');
                const resultEl = c.querySelector('#calc-result');
                const memInd = c.querySelector('#calc-mem-ind');
                const histPanel = c.querySelector('#calc-hist-panel');
                const histInner = c.querySelector('#calc-hist-inner');
                const histToggle = c.querySelector('#calc-hist-toggle');

                let current = '0', previous = '', operator = '', resetNext = false, memory = 0, history = [];

                function formatNumber(n) {
                    if (n === 'Error') return 'Error';
                    const num = parseFloat(n);
                    if (isNaN(num)) return '0';
                    if (!isFinite(num)) return '∞';
                    const str = num.toPrecision(12);
                    return parseFloat(str).toString();
                }

                function updateDisplay() {
                    let display = formatNumber(current);
                    resultEl.textContent = display;
                    resultEl.className = 'calc-result';
                    if (display.length > 12) resultEl.classList.add('small');
                    if (display.length > 18) resultEl.classList.add('xsmall');
                    if (current === 'Error') resultEl.classList.add('error');
                    const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
                    if (operator && previous !== '') {
                        exprEl.textContent = `${formatNumber(previous)} ${opSymbols[operator] || operator}`;
                    } else {
                        exprEl.textContent = '';
                    }
                    memInd.classList.toggle('visible', memory !== 0);
                }

                function calculate(a, b, op) {
                    const na = parseFloat(a), nb = parseFloat(b);
                    if (isNaN(na) || isNaN(nb)) return 'Error';
                    switch(op) {
                        case '+': return na + nb;
                        case '-': return na - nb;
                        case '*': return na * nb;
                        case '/': return nb === 0 ? 'Error' : na / nb;
                    }
                    return 'Error';
                }

                function addHistory(expr, result) {
                    history.unshift({ expr, result });
                    if (history.length > 50) history.pop();
                    renderHistory();
                }

                function renderHistory() {
                    if (history.length === 0) {
                        histInner.innerHTML = `<div class="calc-history-empty">${I18N.t('calc.noHistory')}</div>`;
                        return;
                    }
                    histInner.innerHTML = history.map((h, i) => `<div class="calc-history-item" data-idx="${i}"><div class="hist-expr">${h.expr}</div><div class="hist-result">${h.result}</div></div>`).join('');
                    histInner.querySelectorAll('.calc-history-item').forEach(item => {
                        item.onclick = () => {
                            const h = history[parseInt(item.dataset.idx)];
                            current = h.result; resetNext = true; updateDisplay();
                        };
                    });
                }

                c.querySelectorAll('.calc-btn').forEach(btn => {
                    btn.onclick = () => {
                        const action = btn.dataset.action;
                        // Enlever le highlight de l'opérateur actif
                        c.querySelectorAll('.calc-btn.op.active-op').forEach(b => b.classList.remove('active-op'));

                        if (action === 'digit') {
                            if (resetNext || current === '0' || current === 'Error') { current = btn.dataset.val; resetNext = false; }
                            else { if (current.replace(/[^0-9]/g, '').length >= 16) return; current += btn.dataset.val; }
                        } else if (action === 'decimal') {
                            if (resetNext || current === 'Error') { current = '0.'; resetNext = false; }
                            else if (!current.includes('.')) current += '.';
                        } else if (action === 'op') {
                            if (operator && !resetNext) {
                                const result = calculate(previous, current, operator);
                                const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
                                addHistory(`${formatNumber(previous)} ${opSymbols[operator]} ${formatNumber(current)}`, formatNumber(result));
                                previous = result.toString(); current = previous;
                            } else {
                                previous = current;
                            }
                            operator = btn.dataset.op; resetNext = true;
                            btn.classList.add('active-op');
                        } else if (action === 'equals') {
                            if (operator && previous !== '') {
                                const result = calculate(previous, current, operator);
                                const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
                                addHistory(`${formatNumber(previous)} ${opSymbols[operator]} ${formatNumber(current)}`, formatNumber(result));
                                current = result.toString(); previous = ''; operator = ''; resetNext = true;
                            }
                        } else if (action === 'clear') { current = '0'; previous = ''; operator = ''; resetNext = false; }
                        else if (action === 'ce') { current = '0'; }
                        else if (action === 'backspace') { if (current.length > 1 && current !== 'Error') current = current.slice(0, -1); else current = '0'; }
                        else if (action === 'negate') { if (current !== '0' && current !== 'Error') current = current.startsWith('-') ? current.slice(1) : '-' + current; }
                        else if (action === 'percent') { current = (parseFloat(current) / 100).toString(); }
                        else if (action === 'inverse') { const n = parseFloat(current); current = n === 0 ? 'Error' : (1 / n).toString(); resetNext = true; }
                        else if (action === 'square') { const n = parseFloat(current); current = (n * n).toString(); resetNext = true; }
                        else if (action === 'sqrt') { const n = parseFloat(current); current = n < 0 ? 'Error' : Math.sqrt(n).toString(); resetNext = true; }
                        updateDisplay();
                    };
                });

                c.querySelectorAll('.calc-memory-btn').forEach(btn => {
                    btn.onclick = () => {
                        const action = btn.dataset.mem;
                        const val = parseFloat(current) || 0;
                        if (action === 'mc') memory = 0;
                        else if (action === 'mr') { current = memory.toString(); resetNext = true; }
                        else if (action === 'm+') memory += val;
                        else if (action === 'm-') memory -= val;
                        updateDisplay();
                    };
                });

                let histOpen = false;
                histToggle.onclick = () => { histOpen = !histOpen; histPanel.classList.toggle('open', histOpen); histToggle.textContent = histOpen ? I18N.t('calc.hideHistory') : I18N.t('calc.history'); };

                // --- Localisation dynamique (sans re-rendu complet pour ne pas casser l'état du calcul) ---
                function applyLocale() {
                    histToggle.textContent = histOpen ? I18N.t('calc.hideHistory') : I18N.t('calc.history');
                    if (history.length === 0) renderHistory();
                }
                window.addEventListener('webosx:langchange', applyLocale);
                const origClose = api.close;
                api.close = () => { window.removeEventListener('webosx:langchange', applyLocale); origClose(); };

                updateDisplay();
            }
        });
