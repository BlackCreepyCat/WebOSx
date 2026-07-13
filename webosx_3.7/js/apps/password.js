// ==================================================================
        // Générateur de mots de passe — génération cryptographiquement sûre
        // (crypto.getRandomValues, tirage par rejet pour une distribution
        // uniforme), calcul d'entropie réel, aucune donnée envoyée sur le
        // réseau. Historique gardé en mémoire uniquement (jamais persisté :
        // on n'écrit pas des mots de passe générés dans le localStorage).
        // ==================================================================

        const PWD_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4.2"/><path d="M11 12.2 19.5 3.7"/><path d="M16.2 8.5 19 5.7"/><path d="M18.3 10.6 21 7.9"/></svg>`;

        I18N.registerLang('fr', {
            'app.pwgen': 'Mots de passe',
            'pwd.length': 'Longueur',
            'pwd.uppercase': 'Majuscules (A-Z)',
            'pwd.lowercase': 'Minuscules (a-z)',
            'pwd.numbers': 'Chiffres (0-9)',
            'pwd.symbols': 'Symboles (!@#$...)',
            'pwd.excludeAmbiguous': 'Exclure les caractères ambigus (0, O, 1, l, I)',
            'pwd.copy': 'Copier',
            'pwd.copied': 'Copié !',
            'pwd.regenerate': 'Régénérer',
            'pwd.selectAtLeastOne': 'Sélectionnez au moins un type de caractère',
            'pwd.entropyBits': '{bits} bits d’entropie',
            'pwd.strength.veryWeak': 'Très faible',
            'pwd.strength.weak': 'Faible',
            'pwd.strength.fair': 'Correct',
            'pwd.strength.strong': 'Fort',
            'pwd.strength.veryStrong': 'Très fort'
        });
        I18N.registerLang('en', {
            'app.pwgen': 'Password Generator',
            'pwd.length': 'Length',
            'pwd.uppercase': 'Uppercase (A-Z)',
            'pwd.lowercase': 'Lowercase (a-z)',
            'pwd.numbers': 'Numbers (0-9)',
            'pwd.symbols': 'Symbols (!@#$...)',
            'pwd.excludeAmbiguous': 'Exclude ambiguous characters (0, O, 1, l, I)',
            'pwd.copy': 'Copy',
            'pwd.copied': 'Copied!',
            'pwd.regenerate': 'Regenerate',
            'pwd.selectAtLeastOne': 'Select at least one character type',
            'pwd.entropyBits': '{bits} bits of entropy',
            'pwd.strength.veryWeak': 'Very weak',
            'pwd.strength.weak': 'Weak',
            'pwd.strength.fair': 'Fair',
            'pwd.strength.strong': 'Strong',
            'pwd.strength.veryStrong': 'Very strong'
        });
        I18N.registerLang('es', {
            'app.pwgen': 'Generador de contraseñas',
            'pwd.length': 'Longitud',
            'pwd.uppercase': 'Mayúsculas (A-Z)',
            'pwd.lowercase': 'Minúsculas (a-z)',
            'pwd.numbers': 'Números (0-9)',
            'pwd.symbols': 'Símbolos (!@#$...)',
            'pwd.excludeAmbiguous': 'Excluir caracteres ambiguos (0, O, 1, l, I)',
            'pwd.copy': 'Copiar',
            'pwd.copied': '¡Copiado!',
            'pwd.regenerate': 'Regenerar',
            'pwd.selectAtLeastOne': 'Selecciona al menos un tipo de carácter',
            'pwd.entropyBits': '{bits} bits de entropía',
            'pwd.strength.veryWeak': 'Muy débil',
            'pwd.strength.weak': 'Débil',
            'pwd.strength.fair': 'Aceptable',
            'pwd.strength.strong': 'Fuerte',
            'pwd.strength.veryStrong': 'Muy fuerte'
        });
        I18N.registerLang('de', {
            'app.pwgen': 'Passwort-Generator',
            'pwd.length': 'Länge',
            'pwd.uppercase': 'Großbuchstaben (A-Z)',
            'pwd.lowercase': 'Kleinbuchstaben (a-z)',
            'pwd.numbers': 'Zahlen (0-9)',
            'pwd.symbols': 'Sonderzeichen (!@#$...)',
            'pwd.excludeAmbiguous': 'Mehrdeutige Zeichen ausschließen (0, O, 1, l, I)',
            'pwd.copy': 'Kopieren',
            'pwd.copied': 'Kopiert!',
            'pwd.regenerate': 'Neu generieren',
            'pwd.selectAtLeastOne': 'Mindestens einen Zeichentyp auswählen',
            'pwd.entropyBits': '{bits} Bit Entropie',
            'pwd.strength.veryWeak': 'Sehr schwach',
            'pwd.strength.weak': 'Schwach',
            'pwd.strength.fair': 'Ausreichend',
            'pwd.strength.strong': 'Stark',
            'pwd.strength.veryStrong': 'Sehr stark'
        });

        const PWD_AMBIGUOUS = '0O1lI|';
        const PWD_SET_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const PWD_SET_LOWER = 'abcdefghijklmnopqrstuvwxyz';
        const PWD_SET_NUMBERS = '0123456789';
        const PWD_SET_SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

        // Entier aléatoire uniforme dans [0, maxExclusive) via crypto.getRandomValues,
        // avec tirage par rejet pour éliminer le biais modulo (important pour la
        // qualité cryptographique réelle du mot de passe généré).
        function pwdSecureRandomInt(maxExclusive) {
            const buf = new Uint32Array(1);
            const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
            let x;
            do { crypto.getRandomValues(buf); x = buf[0]; } while (x >= limit);
            return x % maxExclusive;
        }
        function pwdSecureShuffle(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = pwdSecureRandomInt(i + 1);
                const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
            }
            return arr;
        }

        function pwdBuildSets(opts) {
            let sets = [];
            if (opts.upper) sets.push(PWD_SET_UPPER);
            if (opts.lower) sets.push(PWD_SET_LOWER);
            if (opts.numbers) sets.push(PWD_SET_NUMBERS);
            if (opts.symbols) sets.push(PWD_SET_SYMBOLS);
            if (opts.excludeAmbiguous) {
                sets = sets.map(s => [...s].filter(ch => !PWD_AMBIGUOUS.includes(ch)).join(''));
            }
            return sets.filter(s => s.length > 0);
        }

        function pwdGenerate(length, opts) {
            const sets = pwdBuildSets(opts);
            if (!sets.length) return null;
            const pool = sets.join('');
            const chars = [];
            // Garantit au moins un caractère de chaque catégorie sélectionnée,
            // pour éviter par exemple un mot de passe "chiffres activés" qui
            // n'en tire finalement aucun par hasard.
            sets.forEach(s => { if (chars.length < length) chars.push(s[pwdSecureRandomInt(s.length)]); });
            while (chars.length < length) chars.push(pool[pwdSecureRandomInt(pool.length)]);
            return pwdSecureShuffle(chars).slice(0, length).join('');
        }

        // Analyse le mot de passe réellement affiché (généré OU tapé/édité à la main)
        // pour en déduire une estimation d'entropie : on regarde quelles catégories
        // de caractères sont effectivement présentes, plutôt que de se fier aux
        // cases cochées — utile puisque l'utilisateur peut éditer librement le champ.
        function pwdAnalyzeBits(str) {
            if (!str) return 0;
            let poolSize = 0;
            if (/[A-Z]/.test(str)) poolSize += 26;
            if (/[a-z]/.test(str)) poolSize += 26;
            if (/[0-9]/.test(str)) poolSize += 10;
            if (/[^A-Za-z0-9]/.test(str)) poolSize += PWD_SET_SYMBOLS.length;
            if (!poolSize) return 0;
            return Math.round(str.length * Math.log2(poolSize));
        }

        function pwdStrengthInfo(bits) {
            if (bits < 28)  return { key: 'pwd.strength.veryWeak', ratio: 0.14, color: 'var(--danger)' };
            if (bits < 36)  return { key: 'pwd.strength.weak',     ratio: 0.34, color: 'var(--danger)' };
            if (bits < 60)  return { key: 'pwd.strength.fair',     ratio: 0.55, color: 'var(--amber)' };
            if (bits < 100) return { key: 'pwd.strength.strong',   ratio: 0.8,  color: 'var(--green)' };
            return              { key: 'pwd.strength.veryStrong', ratio: 1,    color: 'var(--green)' };
        }

        const PWD_STYLE = `
            .pwd-wrap { display:flex; flex-direction:column; height:100%; color:var(--text-primary); }
            .pwd-scroll { flex:1; overflow-y:auto; padding:18px 18px 16px; display:flex; flex-direction:column; gap:16px; }
            .pwd-display-box { display:flex; align-items:center; gap:8px; background:var(--surface,var(--bg-window)); border:1px solid var(--border-color); border-radius:10px; padding:14px 10px 14px 16px; }
            .pwd-display { flex:1; font-family:var(--mono, monospace); font-size:19px; letter-spacing:0.5px; word-break:break-all; line-height:1.35; user-select:all; }
            .pwd-display-input { background:transparent; border:1px solid transparent; border-radius:6px; padding:2px 6px; outline:none; color:var(--text-primary); min-width:0; transition:border-color .15s, background .15s; }
            .pwd-display-input:focus { border-color:var(--accent); background:hsla(var(--hue), 30%, 50%, 0.08); }
            .pwd-icon-btn { flex:0 0 38px; width:38px; height:38px; border-radius:8px; border:1px solid var(--border-color); background:transparent; color:var(--text-primary); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .15s, color .15s, border-color .15s; }
            .pwd-icon-btn:hover { background:var(--accent); color:#fff; border-color:var(--accent); }
            .pwd-icon-btn svg { width:17px; height:17px; }
            .pwd-icon-btn.pwd-copied { background:var(--green); border-color:var(--green); color:#fff; }
            .pwd-strength-row { display:flex; align-items:center; gap:10px; }
            .pwd-strength-track { flex:1; height:7px; border-radius:999px; background:hsla(var(--hue), 15%, 50%, 0.2); overflow:hidden; }
            .pwd-strength-fill { height:100%; border-radius:999px; transition:width .25s ease, background-color .25s ease; }
            .pwd-strength-label { font-size:11.5px; font-weight:600; white-space:nowrap; min-width:66px; text-align:right; }
            .pwd-bits { font-size:10.5px; color:var(--text-secondary); text-align:right; margin-top:6px; }
            .pwd-generate-btn { background:var(--accent); color:#fff; border:none; border-radius:8px; padding:10px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px; }
            .pwd-generate-btn:active { transform:scale(0.98); }
            .pwd-generate-btn svg { width:15px; height:15px; }
            .pwd-error-msg { font-size:11.5px; color:var(--danger); text-align:center; }
        `;

        OS.registry.register({
            id: 'sys-pwgen', name: I18N.t('app.pwgen'), nameKey: 'app.pwgen', icon: PWD_ICON,
            defaultWidth: 420, defaultHeight: 620, resizable: false, maximizable: false, singleton: true,
            init: (c, api) => {
                if (!document.getElementById('pwd-inline-style')) {
                    const styleEl = document.createElement('style');
                    styleEl.id = 'pwd-inline-style';
                    styleEl.textContent = PWD_STYLE;
                    document.head.appendChild(styleEl);
                }

                const COPY_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M5 15.5A2 2 0 0 1 4 13.5v-8A2 2 0 0 1 6 3.5h8a2 2 0 0 1 2 2"/></svg>`;
                const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
                const REFRESH_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><polyline points="21 3 21 9 15 9"/></svg>`;

                c.innerHTML = `
                <div class="pwd-wrap">
                    <div class="pwd-scroll">
                        <div>
                            <div class="pwd-display-box">
                                <input type="text" class="pwd-display pwd-display-input" id="pwd-output" autocomplete="off" autocapitalize="off" spellcheck="false">
                                <button class="pwd-icon-btn" id="pwd-copy-btn" type="button">${COPY_ICON}</button>
                            </div>
                            <div class="pwd-bits" id="pwd-bits"></div>
                            <div class="pwd-error-msg" id="pwd-error-msg" style="display:none;"></div>
                        </div>
                        <div class="pwd-strength-row">
                            <div class="pwd-strength-track"><div class="pwd-strength-fill" id="pwd-strength-fill"></div></div>
                            <div class="pwd-strength-label" id="pwd-strength-label"></div>
                        </div>
                        <button class="pwd-generate-btn" id="pwd-regen-btn" type="button">${REFRESH_ICON}<span id="pwd-regen-label"></span></button>

                        <div class="settings-container" style="gap:16px;">
                            <div class="setting-group">
                                <div class="wave-slider-row">
                                    <div class="wave-slider-head">
                                        <span class="setting-label" id="pwd-length-label"></span>
                                        <span class="wave-slider-value" id="pwd-length-value">16</span>
                                    </div>
                                    <input type="range" class="wave-slider" id="pwd-length" min="4" max="64" step="1" value="16">
                                </div>
                            </div>
                            <div class="setting-group">
                                <div class="setting-row"><span class="setting-label" id="pwd-lbl-upper"></span>
                                    <label class="toggle-switch"><input type="checkbox" id="pwd-opt-upper" checked><span class="toggle-slider"></span></label></div>
                                <div class="setting-row"><span class="setting-label" id="pwd-lbl-lower"></span>
                                    <label class="toggle-switch"><input type="checkbox" id="pwd-opt-lower" checked><span class="toggle-slider"></span></label></div>
                                <div class="setting-row"><span class="setting-label" id="pwd-lbl-numbers"></span>
                                    <label class="toggle-switch"><input type="checkbox" id="pwd-opt-numbers" checked><span class="toggle-slider"></span></label></div>
                                <div class="setting-row"><span class="setting-label" id="pwd-lbl-symbols"></span>
                                    <label class="toggle-switch"><input type="checkbox" id="pwd-opt-symbols"><span class="toggle-slider"></span></label></div>
                                <div class="setting-row"><span class="setting-label" id="pwd-lbl-ambiguous" style="max-width:280px;"></span>
                                    <label class="toggle-switch"><input type="checkbox" id="pwd-opt-ambiguous"><span class="toggle-slider"></span></label></div>
                            </div>
                        </div>
                    </div>
                </div>`;

                const outEl = c.querySelector('#pwd-output');
                const bitsEl = c.querySelector('#pwd-bits');
                const errorEl = c.querySelector('#pwd-error-msg');
                const fillEl = c.querySelector('#pwd-strength-fill');
                const labelEl = c.querySelector('#pwd-strength-label');
                const copyBtn = c.querySelector('#pwd-copy-btn');
                const regenBtn = c.querySelector('#pwd-regen-btn');
                const lengthInput = c.querySelector('#pwd-length');
                const lengthValue = c.querySelector('#pwd-length-value');
                const optUpper = c.querySelector('#pwd-opt-upper');
                const optLower = c.querySelector('#pwd-opt-lower');
                const optNumbers = c.querySelector('#pwd-opt-numbers');
                const optSymbols = c.querySelector('#pwd-opt-symbols');
                const optAmbiguous = c.querySelector('#pwd-opt-ambiguous');

                let current = '';

                function setFill(input) {
                    const min = parseFloat(input.min), max = parseFloat(input.max), val = parseFloat(input.value);
                    input.style.setProperty('--range-progress', ((val - min) / (max - min)) * 100 + '%');
                }

                function currentOpts() {
                    return {
                        upper: optUpper.checked, lower: optLower.checked,
                        numbers: optNumbers.checked, symbols: optSymbols.checked,
                        excludeAmbiguous: optAmbiguous.checked
                    };
                }

                function copyText(text, btnEl) {
                    if (!text) return;
                    const done = () => {
                        const original = btnEl.innerHTML;
                        btnEl.innerHTML = CHECK_ICON;
                        btnEl.classList.add('pwd-copied');
                        setTimeout(() => { btnEl.innerHTML = original; btnEl.classList.remove('pwd-copied'); }, 1100);
                    };
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
                    } else {
                        fallbackCopy(text, done);
                    }
                }
                function fallbackCopy(text, done) {
                    const ta = document.createElement('textarea');
                    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;';
                    document.body.appendChild(ta); ta.select();
                    try { document.execCommand('copy'); done(); } catch (e) {}
                    document.body.removeChild(ta);
                }

                function updateDisplay(pwd) {
                    current = pwd;
                    if (outEl.value !== pwd) outEl.value = pwd;
                    if (!pwd) {
                        bitsEl.textContent = '';
                        fillEl.style.width = '0%';
                        labelEl.textContent = '';
                        copyBtn.disabled = true;
                        return;
                    }
                    copyBtn.disabled = false;
                    const bits = pwdAnalyzeBits(pwd);
                    bitsEl.textContent = I18N.t('pwd.entropyBits', { bits });
                    const info = pwdStrengthInfo(bits);
                    fillEl.style.width = (info.ratio * 100) + '%';
                    fillEl.style.background = info.color;
                    labelEl.textContent = I18N.t(info.key);
                    labelEl.style.color = info.color;
                }

                function showError(msg) {
                    errorEl.textContent = msg;
                    errorEl.style.display = msg ? '' : 'none';
                }

                function regenerate() {
                    const length = parseInt(lengthInput.value);
                    const opts = currentOpts();
                    const pwd = pwdGenerate(length, opts);
                    if (!pwd) {
                        showError(I18N.t('pwd.selectAtLeastOne'));
                        updateDisplay('');
                        return;
                    }
                    showError('');
                    updateDisplay(pwd);
                }

                // Édition manuelle directe dans le champ : la force se recalcule en
                // direct sur ce qui est réellement tapé, sans toucher aux options.
                outEl.oninput = () => {
                    showError('');
                    updateDisplay(outEl.value);
                };

                lengthInput.oninput = () => { lengthValue.textContent = lengthInput.value; setFill(lengthInput); regenerate(); };
                [optUpper, optLower, optNumbers, optSymbols, optAmbiguous].forEach(el => { el.onchange = regenerate; });
                regenBtn.onclick = regenerate;
                copyBtn.onclick = () => copyText(current, copyBtn);

                function relocalize() {
                    c.querySelector('#pwd-length-label').textContent = I18N.t('pwd.length');
                    c.querySelector('#pwd-lbl-upper').textContent = I18N.t('pwd.uppercase');
                    c.querySelector('#pwd-lbl-lower').textContent = I18N.t('pwd.lowercase');
                    c.querySelector('#pwd-lbl-numbers').textContent = I18N.t('pwd.numbers');
                    c.querySelector('#pwd-lbl-symbols').textContent = I18N.t('pwd.symbols');
                    c.querySelector('#pwd-lbl-ambiguous').textContent = I18N.t('pwd.excludeAmbiguous');
                    c.querySelector('#pwd-regen-label').textContent = I18N.t('pwd.regenerate');
                    copyBtn.title = I18N.t('pwd.copy');
                }
                window.addEventListener('webosx:langchange', relocalize);

                setFill(lengthInput);
                relocalize();
                regenerate();

                const origClose = api.close;
                api.close = () => {
                    window.removeEventListener('webosx:langchange', relocalize);
                    origClose();
                };
            }
        });