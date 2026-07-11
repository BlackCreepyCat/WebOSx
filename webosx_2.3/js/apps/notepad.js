        OS.registry.register({
            id: 'sys-notepad', name: I18N.t('app.notepad'), nameKey: 'app.notepad', icon: ICONS.notepad, defaultWidth: 640, defaultHeight: 480,
            init: (c, api) => {
                let am = null;
                c.innerHTML = `
                <div class="notepad-menu-bar">
                    <div class="notepad-menu-item" data-menu="file">Fichier
                        <div class="notepad-dropdown">
                            <div class="notepad-dropdown-item" data-action="new"><span class="notepad-check">✓</span>Nouveau<span class="notepad-shortcut">Ctrl+N</span></div>
                            <div class="notepad-dropdown-item" data-action="open"><span class="notepad-check">✓</span>Ouvrir...<span class="notepad-shortcut">Ctrl+O</span></div>
                            <div class="notepad-dropdown-item" data-action="save"><span class="notepad-check">✓</span>Enregistrer sous...<span class="notepad-shortcut">Ctrl+S</span></div>
                            <div class="notepad-dropdown-sep"></div>
                            <div class="notepad-dropdown-item" data-action="close"><span class="notepad-check">✓</span>Fermer</div>
                        </div>
                    </div>
                    <div class="notepad-menu-item" data-menu="edit">Édition
                        <div class="notepad-dropdown">
                            <div class="notepad-dropdown-item" data-action="undo"><span class="notepad-check">✓</span>Annuler<span class="notepad-shortcut">Ctrl+Z</span></div>
                            <div class="notepad-dropdown-item" data-action="redo"><span class="notepad-check">✓</span>Rétablir<span class="notepad-shortcut">Ctrl+Y</span></div>
                            <div class="notepad-dropdown-sep"></div>
                            <div class="notepad-dropdown-item" data-action="cut"><span class="notepad-check">✓</span>Couper<span class="notepad-shortcut">Ctrl+X</span></div>
                            <div class="notepad-dropdown-item" data-action="copy"><span class="notepad-check">✓</span>Copier<span class="notepad-shortcut">Ctrl+C</span></div>
                            <div class="notepad-dropdown-item" data-action="paste"><span class="notepad-check">✓</span>Coller<span class="notepad-shortcut">Ctrl+V</span></div>
                            <div class="notepad-dropdown-sep"></div>
                            <div class="notepad-dropdown-item" data-action="selectall"><span class="notepad-check">✓</span>Tout sélectionner<span class="notepad-shortcut">Ctrl+A</span></div>
                            <div class="notepad-dropdown-item" data-action="find"><span class="notepad-check">✓</span>Rechercher...<span class="notepad-shortcut">Ctrl+F</span></div>
                        </div>
                    </div>
                    <div class="notepad-menu-item" data-menu="format">Format
                        <div class="notepad-dropdown">
                            <div class="notepad-dropdown-item" data-action="wordwrap"><span class="notepad-check">✓</span>Retour à la ligne automatique</div>
                            <div class="notepad-dropdown-item" data-action="linenumbers"><span class="notepad-check">✓</span>Afficher les numéros de ligne</div>
                            <div class="notepad-dropdown-sep"></div>
                            <div class="notepad-dropdown-item" data-action="zoomin"><span class="notepad-check">✓</span>Zoom avant<span class="notepad-shortcut">Ctrl++</span></div>
                            <div class="notepad-dropdown-item" data-action="zoomout"><span class="notepad-check">✓</span>Zoom arrière<span class="notepad-shortcut">Ctrl+-</span></div>
                            <div class="notepad-dropdown-item" data-action="zoomreset"><span class="notepad-check">✓</span>Réinitialiser le zoom<span class="notepad-shortcut">Ctrl+0</span></div>
                        </div>
                    </div>
                    <div class="notepad-menu-item" data-menu="help">Aide
                        <div class="notepad-dropdown">
                            <div class="notepad-dropdown-item" data-action="about"><span class="notepad-check">✓</span>À propos de WebOSx</div>
                        </div>
                    </div>
                </div>
                <div class="notepad-findbar" id="notepad-findbar">
                    <input type="text" id="notepad-find-input" placeholder="Rechercher dans le document...">
                    <span class="notepad-find-count" id="notepad-find-count"></span>
                    <button class="notepad-find-btn" data-find-action="prev" title="Précédent">˄</button>
                    <button class="notepad-find-btn" data-find-action="next" title="Suivant">˅</button>
                    <button class="notepad-find-btn close-find" data-find-action="close" title="Fermer">✕</button>
                </div>
                <div class="notepad-editor-wrap">
                    <div class="notepad-gutter" id="notepad-gutter"></div>
                    <textarea class="notepad-textarea" id="notepad-textarea" spellcheck="false" placeholder="Tapez votre texte ici..."></textarea>
                    <div class="notepad-mirror" id="notepad-mirror"></div>
                </div>
                <div class="notepad-status">
                    <span class="status-pos">Ln 1, Col 1</span>
                    <span id="notepad-charcount">0 caractère</span>
                    <span id="notepad-wordcount">0 mot</span>
                    <span class="status-fill"></span>
                    <span id="notepad-zoom" class="dim">100 %</span>
                    <span class="dim">UTF-8</span>
                </div>`;

                // --- Références DOM ---
                const ta = c.querySelector('#notepad-textarea');
                const gutter = c.querySelector('#notepad-gutter');
                const mirror = c.querySelector('#notepad-mirror');
                const sp = c.querySelector('.status-pos');
                const charCountEl = c.querySelector('#notepad-charcount');
                const wordCountEl = c.querySelector('#notepad-wordcount');
                const zoomEl = c.querySelector('#notepad-zoom');
                const findBar = c.querySelector('#notepad-findbar');
                const findInput = c.querySelector('#notepad-find-input');
                const findCount = c.querySelector('#notepad-find-count');
                const fileInput = document.createElement('input');
                fileInput.type = 'file'; fileInput.accept = '.txt,text/plain'; fileInput.hidden = true;
                c.appendChild(fileInput);

                // --- État ---
                let wordWrap = true;
                let showLineNumbers = true;
                let fontSize = 14;
                let currentFileName = 'document.txt';
                let isModified = false;
                let rafPending = false;

                // --- Utilitaires ---
                function baseName(name) { return name.replace(/\.[^/.]+$/, ''); }
                function setModified(v) {
                    isModified = v;
                    api.setTitle(`Bloc-notes — ${baseName(currentFileName)}${v ? ' •' : ''}`);
                }
                api.setTitle(`Bloc-notes — ${baseName(currentFileName)}`);

                function closeAllMenus() {
                    if (am) { am.classList.remove('show'); am = null; }
                    c.querySelectorAll('.notepad-menu-item').forEach(m => m.classList.remove('active'));
                }

                // --- Gouttière / numéros de ligne ---
                function applyMirrorStyle() {
                    const cs = getComputedStyle(ta);
                    mirror.style.fontFamily = cs.fontFamily;
                    mirror.style.fontSize = cs.fontSize;
                    mirror.style.lineHeight = cs.lineHeight;
                    mirror.style.paddingLeft = cs.paddingLeft;
                    mirror.style.paddingRight = cs.paddingRight;
                    mirror.style.letterSpacing = cs.letterSpacing;
                    mirror.style.width = ta.clientWidth + 'px';
                }

                function getCurrentLineIndex() {
                    const before = ta.value.substring(0, ta.selectionStart);
                    return before.split('\n').length - 1;
                }

                function rebuildGutter() {
                    if (!showLineNumbers) { gutter.style.display = 'none'; gutter.innerHTML = ''; return; }
                    gutter.style.display = 'block';
                    const lines = ta.value.split('\n');
                    const fontSizePx = parseFloat(getComputedStyle(ta).fontSize);
                    const lineHeightPx = fontSizePx * 1.5;
                    gutter.style.fontSize = fontSizePx + 'px';
                    const curLine = getCurrentLineIndex();
                    let html = '';
                    if (wordWrap) {
                        applyMirrorStyle();
                        for (let i = 0; i < lines.length; i++) {
                            mirror.textContent = lines[i].length ? lines[i] : ' ';
                            const rows = Math.max(1, Math.round(mirror.scrollHeight / lineHeightPx));
                            html += `<div class="gutter-line${i === curLine ? ' current' : ''}" style="height:${rows * lineHeightPx}px">${i + 1}</div>`;
                        }
                    } else {
                        for (let i = 0; i < lines.length; i++) {
                            html += `<div class="gutter-line${i === curLine ? ' current' : ''}" style="height:${lineHeightPx}px">${i + 1}</div>`;
                        }
                    }
                    gutter.innerHTML = html;
                    gutter.scrollTop = ta.scrollTop;
                }

                function scheduleGutterRebuild() {
                    if (rafPending) return;
                    rafPending = true;
                    requestAnimationFrame(() => { rafPending = false; rebuildGutter(); });
                }

                // --- Barre d'état ---
                function updateStatus() {
                    const v = ta.value, pos = ta.selectionStart;
                    const before = v.substring(0, pos), lines = before.split('\n');
                    sp.textContent = `Ln ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
                    charCountEl.textContent = `${v.length} caractère${v.length !== 1 ? 's' : ''}`;
                    const words = v.trim().length ? v.trim().split(/\s+/).length : 0;
                    wordCountEl.textContent = `${words} mot${words !== 1 ? 's' : ''}`;
                }

                function refreshAll() {
                    updateStatus();
                    scheduleGutterRebuild();
                }

                ta.addEventListener('input', () => { setModified(true); refreshAll(); });
                ta.addEventListener('click', refreshAll);
                ta.addEventListener('keyup', refreshAll);
                ta.addEventListener('scroll', () => { gutter.scrollTop = ta.scrollTop; });
                ta.addEventListener('copy', () => { const sel = ta.value.substring(ta.selectionStart, ta.selectionEnd); if (sel) internalClipboard = sel; });
                ta.addEventListener('cut', () => { const sel = ta.value.substring(ta.selectionStart, ta.selectionEnd); if (sel) internalClipboard = sel; });
                new ResizeObserver(() => scheduleGutterRebuild()).observe(ta);

                // --- Zoom ---
                function applyZoom() {
                    ta.style.fontSize = fontSize + 'px';
                    zoomEl.textContent = Math.round((fontSize / 14) * 100) + ' %';
                    scheduleGutterRebuild();
                }
                function zoomIn() { fontSize = Math.min(28, fontSize + 2); applyZoom(); }
                function zoomOut() { fontSize = Math.max(10, fontSize - 2); applyZoom(); }
                function zoomReset() { fontSize = 14; applyZoom(); }

                // --- Retour à la ligne / numéros ---
                function applyWordWrap() {
                    ta.classList.toggle('nowrap', !wordWrap);
                    c.querySelector('[data-action="wordwrap"]').classList.toggle('checked', wordWrap);
                    scheduleGutterRebuild();
                }
                function applyLineNumbers() {
                    c.querySelector('[data-action="linenumbers"]').classList.toggle('checked', showLineNumbers);
                    scheduleGutterRebuild();
                }

                // --- Fichier ---
                function newFile() {
                    ta.value = ''; currentFileName = 'document.txt'; setModified(false); refreshAll();
                }
                function openFile() { fileInput.click(); }
                fileInput.onchange = () => {
                    const file = fileInput.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                        ta.value = reader.result;
                        currentFileName = file.name;
                        setModified(false);
                        refreshAll();
                    };
                    reader.readAsText(file);
                    fileInput.value = '';
                };
                function saveFile() {
                    const blob = new Blob([ta.value], { type: 'text/plain' });
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = currentFileName || 'document.txt';
                    a.click();
                    URL.revokeObjectURL(a.href);
                    setModified(false);
                }

                // --- Édition ---
                let internalClipboard = '';
                function execEditCommand(cmd) {
                    ta.focus();
                    try { document.execCommand(cmd); } catch (e) { /* ignoré */ }
                    refreshAll();
                }
                function insertTextAtCursor(text) {
                    if (!text) return;
                    const start = ta.selectionStart, end = ta.selectionEnd;
                    ta.value = ta.value.substring(0, start) + text + ta.value.substring(end);
                    const newPos = start + text.length;
                    ta.focus();
                    ta.setSelectionRange(newPos, newPos);
                    setModified(true);
                    refreshAll();
                }
                function copyAction() {
                    const sel = ta.value.substring(ta.selectionStart, ta.selectionEnd);
                    if (sel) {
                        internalClipboard = sel;
                        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(sel).catch(() => {});
                    }
                    ta.focus();
                }
                function cutAction() {
                    const start = ta.selectionStart, end = ta.selectionEnd;
                    const sel = ta.value.substring(start, end);
                    if (sel) {
                        internalClipboard = sel;
                        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(sel).catch(() => {});
                        ta.value = ta.value.substring(0, start) + ta.value.substring(end);
                        ta.setSelectionRange(start, start);
                        setModified(true);
                    }
                    ta.focus();
                    refreshAll();
                }
                function pasteAction() {
                    ta.focus();
                    if (navigator.clipboard && navigator.clipboard.readText) {
                        navigator.clipboard.readText()
                            .then(text => insertTextAtCursor(text || internalClipboard))
                            .catch(() => insertTextAtCursor(internalClipboard));
                    } else {
                        insertTextAtCursor(internalClipboard);
                    }
                }

                // --- Recherche ---
                let lastMatches = [];
                function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
                function runSearch() {
                    const term = findInput.value;
                    if (!term) { lastMatches = []; findCount.textContent = ''; return; }
                    const re = new RegExp(escapeRegExp(term), 'gi');
                    lastMatches = [];
                    let m;
                    while ((m = re.exec(ta.value)) !== null) {
                        lastMatches.push(m.index);
                        if (m.index === re.lastIndex) re.lastIndex++;
                    }
                    findCount.textContent = lastMatches.length ? `0/${lastMatches.length}` : 'Aucun résultat';
                }
                function scrollToSelection() {
                    const fontSizePx = parseFloat(getComputedStyle(ta).fontSize);
                    const lineHeightPx = fontSizePx * 1.5;
                    const lineIdx = getCurrentLineIndex();
                    const targetTop = Math.max(0, lineIdx * lineHeightPx - ta.clientHeight / 2);
                    ta.scrollTop = targetTop;
                    gutter.scrollTop = targetTop;
                }
                function goToMatch(offset, term) {
                    ta.focus();
                    ta.setSelectionRange(offset, offset + term.length);
                    scrollToSelection();
                    refreshAll();
                }
                let findCursor = -1;
                function findNext() {
                    const term = findInput.value;
                    if (!term || lastMatches.length === 0) return;
                    findCursor = (findCursor + 1) % lastMatches.length;
                    findCount.textContent = `${findCursor + 1}/${lastMatches.length}`;
                    goToMatch(lastMatches[findCursor], term);
                }
                function findPrev() {
                    const term = findInput.value;
                    if (!term || lastMatches.length === 0) return;
                    findCursor = (findCursor - 1 + lastMatches.length) % lastMatches.length;
                    findCount.textContent = `${findCursor + 1}/${lastMatches.length}`;
                    goToMatch(lastMatches[findCursor], term);
                }
                function openFindBar() {
                    findBar.classList.add('show');
                    findInput.focus(); findInput.select();
                }
                function closeFindBar() {
                    findBar.classList.remove('show');
                    ta.focus();
                }
                findInput.oninput = () => { findCursor = -1; runSearch(); };
                findInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') { e.preventDefault(); e.shiftKey ? findPrev() : findNext(); }
                    else if (e.key === 'Escape') { closeFindBar(); }
                });
                c.querySelectorAll('[data-find-action]').forEach(btn => {
                    btn.onclick = () => {
                        const a = btn.dataset.findAction;
                        if (a === 'next') findNext();
                        else if (a === 'prev') findPrev();
                        else if (a === 'close') closeFindBar();
                    };
                });

                // --- Actions des menus ---
                const actions = {
                    new: newFile,
                    open: openFile,
                    save: saveFile,
                    close: () => api.close(),
                    undo: () => execEditCommand('undo'),
                    redo: () => execEditCommand('redo'),
                    cut: cutAction,
                    copy: copyAction,
                    paste: pasteAction,
                    selectall: () => { ta.focus(); ta.select(); },
                    find: openFindBar,
                    wordwrap: () => { wordWrap = !wordWrap; applyWordWrap(); },
                    linenumbers: () => { showLineNumbers = !showLineNumbers; applyLineNumbers(); },
                    zoomin: zoomIn,
                    zoomout: zoomOut,
                    zoomreset: zoomReset,
                    about: () => OS.launchApp('sys-about')
                };

                // --- Gestion des menus déroulants ---
                c.querySelectorAll('.notepad-menu-item').forEach(mi => {
                    mi.onclick = (e) => {
                        e.stopPropagation();
                        const dd = mi.querySelector('.notepad-dropdown');
                        if (am && am !== dd) { closeAllMenus(); }
                        if (dd.classList.contains('show')) { closeAllMenus(); }
                        else { dd.classList.add('show'); mi.classList.add('active'); am = dd; }
                    };
                });
                c.querySelectorAll('.notepad-dropdown-item').forEach(item => {
                    item.onclick = (e) => {
                        e.stopPropagation();
                        const action = item.dataset.action;
                        if (actions[action]) actions[action]();
                        closeAllMenus();
                    };
                });
                c.addEventListener('click', (e) => { if (!e.target.closest('.notepad-menu-item')) closeAllMenus(); });

                // --- Raccourcis clavier ---
                c.addEventListener('keydown', (e) => {
                    if (!e.ctrlKey) return;
                    const k = e.key.toLowerCase();
                    if (k === 's') { e.preventDefault(); saveFile(); }
                    else if (k === 'n') { e.preventDefault(); newFile(); }
                    else if (k === 'o') { e.preventDefault(); openFile(); }
                    else if (k === 'f') { e.preventDefault(); openFindBar(); }
                    else if (k === '+' || k === '=') { e.preventDefault(); zoomIn(); }
                    else if (k === '-') { e.preventDefault(); zoomOut(); }
                    else if (k === '0') { e.preventDefault(); zoomReset(); }
                });

                // --- Initialisation ---
                applyWordWrap();
                applyLineNumbers();
                applyZoom();
                refreshAll();
            }
        });
