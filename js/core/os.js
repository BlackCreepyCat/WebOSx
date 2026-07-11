        const OS = {
            wm: new WindowManager(), registry: new AppRegistry(), startMenuOpen: false, langMenuOpen: false,
            singletonWindows: new Map(),

            init() {
                this.setupTaskbar();
                this.setupLangSwitcher();
                this.startBootSequence();
                this.updateClock();
                setInterval(() => this.updateClock(), 1000);
                window.addEventListener('webosx:langchange', () => this.refreshLocalization());
            },

            startBootSequence() { setTimeout(() => { document.getElementById('boot-screen').classList.add('hidden'); setTimeout(() => document.getElementById('boot-screen').remove(), 800); }, 11600); },

            setupTaskbar() {
                document.getElementById('start-btn').onclick = (e) => { e.stopPropagation(); this.toggleStartMenu(); };
                document.getElementById('desktop').onclick = () => {
                    if (this.startMenuOpen) this.toggleStartMenu();
                    if (this.langMenuOpen) this.toggleLangMenu(false);
                };
                document.getElementById('start-menu').onclick = (e) => e.stopPropagation();

                const search = document.getElementById('start-search');
                search.oninput = () => this.filterStartMenu(search.value);

                document.getElementById('start-about-btn').onclick = () => { this.launchApp('sys-about'); this.toggleStartMenu(); };
                document.getElementById('start-settings-btn').onclick = () => { this.launchApp('sys-settings'); this.toggleStartMenu(); };
            },

            toggleStartMenu() {
                this.startMenuOpen = !this.startMenuOpen;
                document.getElementById('start-menu').classList.toggle('open', this.startMenuOpen);
                if (this.startMenuOpen) {
                    if (this.langMenuOpen) this.toggleLangMenu(false);
                    const search = document.getElementById('start-search');
                    search.value = '';
                    this.filterStartMenu('');
                    setTimeout(() => search.focus(), 150);
                }
            },

            filterStartMenu(query) {
                const q = query.trim().toLowerCase();
                let visibleCount = 0;
                document.querySelectorAll('#start-menu-list .start-app-item').forEach(item => {
                    const match = item.dataset.name.toLowerCase().includes(q);
                    item.classList.toggle('hidden', !match);
                    if (match) visibleCount++;
                });
                document.getElementById('start-menu-empty').classList.toggle('visible', visibleCount === 0);
            },

            // ---- Sélecteur de langue (façon barre de langue Windows) ----
            setupLangSwitcher() {
                const btn = document.getElementById('lang-btn');
                btn.onclick = (e) => { e.stopPropagation(); this.toggleLangMenu(); };
                document.getElementById('lang-menu').onclick = (e) => e.stopPropagation();
                this.renderLangMenu();
                this.updateLangButton();
                // Raccourci clavier façon Windows (Alt+Shift), ici Ctrl+Espace pour éviter les conflits navigateur
                window.addEventListener('keydown', (e) => {
                    if (!(e.ctrlKey && e.code === 'Space')) return;
                    // Ne pas voler le raccourci quand le focus est dans un champ de saisie
                    // (input, textarea, contenteditable) — ex: terminal, bloc-notes, chat.
                    const t = e.target;
                    const isEditable = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
                    if (isEditable) return;
                    e.preventDefault(); I18N.cycle();
                });
            },

            renderLangMenu() {
                const menu = document.getElementById('lang-menu');
                menu.innerHTML = '';
                Object.keys(I18N.languages).forEach(code => {
                    const lang = I18N.languages[code];
                    const item = document.createElement('div');
                    item.className = 'lang-menu-item' + (code === I18N.current ? ' active' : '');
                    item.innerHTML = `<span class="lm-flag">${lang.flag}</span><span class="lm-name">${lang.name}</span><svg class="lm-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
                    item.onclick = () => { I18N.setLang(code); this.toggleLangMenu(false); };
                    menu.appendChild(item);
                });
            },

            updateLangButton() {
                const lang = I18N.languages[I18N.current];
                document.getElementById('lang-flag').textContent = lang.flag;
                document.getElementById('lang-code').textContent = lang.short;
            },

            toggleLangMenu(force) {
                this.langMenuOpen = force !== undefined ? force : !this.langMenuOpen;
                document.getElementById('lang-menu').classList.toggle('open', this.langMenuOpen);
                document.getElementById('lang-btn').classList.toggle('active', this.langMenuOpen);
            },

            // ---- Horloge ----
            updateClock() {
                const n = new Date();
                document.getElementById('clock-time').innerText = `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
                document.getElementById('clock-date').innerText = n.toLocaleDateString(I18N.locale(), {weekday:'short', year:'numeric', month:'short', day:'numeric'});
            },

            // ---- Enregistrement / rendu des applications ----
            onAppRegistered(app) {
                this.renderDesktopIcon(app);
                if (app.id !== 'sys-about' && app.id !== 'sys-settings') this.renderStartMenuItem(app);
            },

            renderDesktopIcon(app) {
                const ic = document.createElement('div'); ic.className = 'desktop-icon'; ic.dataset.appId = app.id;
                ic.innerHTML = `<div class="icon">${app.icon||'📄'}</div><span>${escHtml(app.name)}</span>`;
                ic.ondblclick = () => this.launchApp(app.id);
                let lt = 0; ic.ontouchend = (e) => { const n = Date.now(); if(n - lt < 300) { e.preventDefault(); this.launchApp(app.id); } lt = n; };
                document.getElementById('desktop').appendChild(ic);
            },

            renderStartMenuItem(app) {
                const m = document.createElement('div'); m.className = 'start-app-item'; m.dataset.name = app.name; m.dataset.appId = app.id;
                m.innerHTML = `<div class="icon">${app.icon||'📄'}</div><span>${escHtml(app.name)}</span>`;
                m.onclick = () => { this.launchApp(app.id); this.toggleStartMenu(); };
                document.getElementById('start-menu-list').appendChild(m);
            },

            launchApp(id) {
                const a = this.registry.get(id);
                if (!a) return;
                if (a.singleton) {
                    const openId = this.singletonWindows.get(id);
                    if (openId && this.wm.windows.has(openId)) {
                        const d = this.wm.windows.get(openId);
                        if (d.state.isMinimized) this.wm.restoreWindow(openId); else this.wm.focusWindow(openId);
                        return;
                    }
                    this.singletonWindows.delete(id);
                }
                const api = this.wm.createWindow(a);
                if (a.singleton) this.singletonWindows.set(id, api.getId());
            },

            onWindowCreated(id, cfg) {
                const b = document.createElement('button'); b.className = 'taskbar-app active'; b.innerHTML = `<span class="taskbar-icon">${cfg.icon||''}</span>${escHtml(cfg.name)}`;
                b.onclick = () => { const d = this.wm.windows.get(id); if(d) { if(d.state.isMinimized) this.wm.restoreWindow(id); else if(this.wm.activeWindowId === id) this.wm.minimizeWindow(id); else this.wm.focusWindow(id); } };
                document.getElementById('taskbar-apps').appendChild(b); this.wm.windows.get(id).taskbarBtn = b;
            },

            onWindowClosed(id) {
                const d = this.wm.windows.get(id); if (d && d.taskbarBtn) d.taskbarBtn.remove();
                this.singletonWindows.forEach((winId, appId) => { if (winId === id) this.singletonWindows.delete(appId); });
            },

            // ---- Rafraîchissement complet quand la langue change ----
            // Toute app enregistrée avec un `nameKey` verra son libellé (icône bureau, menu
            // démarrer, barre des tâches, titre de fenêtre) automatiquement retraduit ici.
            // Pour le contenu interne d'une app, écouter 'webosx:langchange' depuis son init().
            refreshLocalization() {
                this.registry.apps.forEach(app => { if (app.nameKey) app.name = I18N.t(app.nameKey); });

                document.querySelectorAll('#desktop .desktop-icon').forEach(el => el.remove());
                document.getElementById('start-menu-list').innerHTML = '';
                this.registry.apps.forEach(app => {
                    this.renderDesktopIcon(app);
                    if (app.id !== 'sys-about' && app.id !== 'sys-settings') this.renderStartMenuItem(app);
                });
                this.filterStartMenu(document.getElementById('start-search').value || '');

                this.wm.windows.forEach(d => {
                    const cfg = d.state.appConfig;
                    if (!cfg.nameKey) return;
                    const titleEl = d.el.querySelector('.title-text'); if (titleEl) titleEl.textContent = cfg.name;
                    if (d.taskbarBtn) d.taskbarBtn.innerHTML = `<span class="taskbar-icon">${cfg.icon||''}</span>${escHtml(cfg.name)}`;
                    const minBtn = d.el.querySelector('.min-btn'); if (minBtn) minBtn.title = I18N.t('chrome.win.minimize');
                    const maxBtn = d.el.querySelector('.max-btn'); if (maxBtn) maxBtn.title = I18N.t('chrome.win.maximize');
                    const closeBtn = d.el.querySelector('.close-btn'); if (closeBtn) closeBtn.title = I18N.t('chrome.win.close');
                });

                this.renderLangMenu();
                this.updateLangButton();
                I18N.apply();
                this.updateClock();
            }
        };
