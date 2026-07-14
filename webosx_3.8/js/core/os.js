        const OS = {
            wm: new WindowManager(), registry: new AppRegistry(), startMenuOpen: false, langMenuOpen: false, fullscreenMenuOpen: false,
            singletonWindows: new Map(),

            // ---- Persistance du bureau (fenêtres ouvertes + géométrie) ----
            // On sauvegarde UNIQUEMENT quelles apps sont ouvertes et leur état de
            // fenêtre (position, taille, minimisé/agrandi, empilement). Le contenu
            // interne de chaque app (texte du bloc-notes, historique calculatrice...)
            // n'est pas concerné : au retour, chaque app se relance à l'état neuf.
            DESKTOP_STATE_KEY: 'webosx_desktop_state',
            _persistTimer: null,
            _restoringDesktop: false,

            init() {
                this.setupTaskbar();
                this.setupLangSwitcher();
                this.setupFullscreenSwitcher();
                this.startBootSequence();
                this.updateClock();
                setInterval(() => this.updateClock(), 1000);
                window.addEventListener('webosx:langchange', () => this.refreshLocalization());
                // Filet de sécurité : capture tout changement non couvert par un hook
                // explicite (ex. fermeture d'onglet en plein drag). Version synchrone
                // (pas de debounce) car le navigateur ne laisse pas le temps à un
                // setTimeout de se déclencher pendant un beforeunload.
                window.addEventListener('beforeunload', () => this.persistDesktopNow());
                this.restoreDesktop();
            },

            startBootSequence() { setTimeout(() => { document.getElementById('boot-screen').classList.add('hidden'); setTimeout(() => document.getElementById('boot-screen').remove(), 800); }, 5800); },

            // Sauvegarde débattue (debounce 300ms) : appelée très souvent (chaque
            // focus, chaque fin de drag/resize...), on ne veut écrire dans
            // localStorage qu'une fois l'activité retombée.
            persistDesktop() {
                if (this._restoringDesktop) return;
                clearTimeout(this._persistTimer);
                this._persistTimer = setTimeout(() => this.persistDesktopNow(), 300);
            },

            persistDesktopNow() {
                try {
                    const snapshot = this.wm.getSnapshot();
                    localStorage.setItem(this.DESKTOP_STATE_KEY, JSON.stringify(snapshot));
                } catch (e) {
                    // Stockage indisponible ou quota dépassé : on ignore silencieusement,
                    // la persistance du bureau est une amélioration de confort, pas une
                    // fonctionnalité critique.
                }
            },

            resetDesktopState() {
                // Annule le timer de sauvegarde différée en attente : sans ça, un
                // debounce programmé juste avant (ex. l'ouverture des Réglages
                // elle-même) se déclenche APRÈS ce removeItem — notamment parce que
                // confirm() est bloquant et laisse largement le temps aux 300ms de
                // s'écouler — et réécrit l'ancien snapshot par-dessus, annulant la
                // réinitialisation.
                clearTimeout(this._persistTimer);
                this._persistTimer = null;
                this._restoringDesktop = true; // empêche closeWindow() de re-déclencher une sauvegarde à chaque fermeture
                // Ferme réellement toutes les fenêtres ouvertes plutôt que de se
                // contenter d'effacer le stockage : sinon les fenêtres actuellement
                // ouvertes resteraient visibles jusqu'au prochain rechargement, et
                // toute action dessus (focus, déplacement...) réécrirait un état non
                // vide dans localStorage.
                [...this.wm.windows.keys()].forEach(id => this.wm.closeWindow(id));
                this.singletonWindows.clear();
                this._restoringDesktop = false;
                try { localStorage.removeItem(this.DESKTOP_STATE_KEY); } catch (e) {}
            },

            restoreDesktop() {
                let saved;
                try { saved = JSON.parse(localStorage.getItem(this.DESKTOP_STATE_KEY)); } catch (e) { saved = null; }
                if (!Array.isArray(saved) || saved.length === 0) return;

                // Relance dans l'ordre d'empilement d'origine (z croissant) pour
                // reproduire le même ordre visuel, puis refocalise la fenêtre qui
                // était active au moment de la sauvegarde.
                const sorted = [...saved].sort((a, b) => (a.z || 0) - (b.z || 0));
                this._restoringDesktop = true;
                let activeId = null;

                sorted.forEach(w => {
                    const app = this.registry.get(w.appId);
                    if (!app || app.persistState === false) return;

                    // Réutilise launchApp() pour respecter la logique singleton telle
                    // quelle (une app "singleton" ne peut de toute façon apparaître
                    // qu'une fois dans le snapshot).
                    this.launchApp(w.appId);
                    const winId = app.singleton
                        ? this.singletonWindows.get(w.appId)
                        : [...this.wm.windows.keys()].pop();
                    const d = this.wm.windows.get(winId);
                    if (!d) return;

                    // Même bornage que setupDrag() dans window-manager.js : rattrape une
                    // position sauvegardée hors-écran (sauvegardée avant ce correctif, ou
                    // si la fenêtre du navigateur a été rétrécie depuis).
                    const TASKBAR_H = 52, MIN_VISIBLE_X = 120, MIN_VISIBLE_TOP = 40;
                    const width = app.resizable !== false ? w.w : d.el.offsetWidth;
                    const maxLeft = window.innerWidth - MIN_VISIBLE_X;
                    const minLeft = -(width - MIN_VISIBLE_X);
                    const maxTop = window.innerHeight - TASKBAR_H - MIN_VISIBLE_TOP;
                    const clampedX = Math.min(Math.max(w.x, minLeft), Math.max(minLeft, maxLeft));
                    const clampedY = Math.min(Math.max(w.y, 0), Math.max(0, maxTop));

                    const api = { setGeometry: (x, y, ww, hh) => { d.el.style.left = x + 'px'; d.el.style.top = y + 'px'; if (ww != null) d.el.style.width = ww + 'px'; if (hh != null) d.el.style.height = hh + 'px'; } };
                    api.setGeometry(clampedX, clampedY, app.resizable !== false ? w.w : null, app.resizable !== false ? w.h : null);

                    if (w.maximized && app.maximizable !== false) this.wm.toggleMaximize(winId);
                    if (w.minimized) this.wm.minimizeWindow(winId);
                    if (w.active) activeId = winId;
                });

                this._restoringDesktop = false;
                if (activeId) this.wm.focusWindow(activeId);
                // Réécrit un snapshot propre une fois la restauration terminée (plutôt
                // que de garder l'ancien, potentiellement légèrement désynchronisé si
                // une app a été supprimée entre-temps).
                this.persistDesktopNow();
            },

            setupTaskbar() {
                document.getElementById('start-btn').onclick = (e) => { e.stopPropagation(); this.toggleStartMenu(); };
                document.getElementById('desktop').onclick = () => {
                    if (this.startMenuOpen) this.toggleStartMenu();
                    if (this.langMenuOpen) this.toggleLangMenu(false);
                    if (this.fullscreenMenuOpen) this.toggleFullscreenMenu(false);
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
                    if (this.fullscreenMenuOpen) this.toggleFullscreenMenu(false);
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
                document.getElementById('lang-flag').innerHTML = lang.flag;
                document.getElementById('lang-code').textContent = lang.short;
            },

            toggleLangMenu(force) {
                this.langMenuOpen = force !== undefined ? force : !this.langMenuOpen;
                document.getElementById('lang-menu').classList.toggle('open', this.langMenuOpen);
                document.getElementById('lang-btn').classList.toggle('active', this.langMenuOpen);
                if (this.langMenuOpen && this.fullscreenMenuOpen) this.toggleFullscreenMenu(false);
            },

            // ---- Plein écran ----
            FULLSCREEN_ICON_ENTER: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V5a1 1 0 0 1 1-1h4"/><path d="M20 9V5a1 1 0 0 0-1-1h-4"/><path d="M4 15v4a1 1 0 0 0 1 1h4"/><path d="M20 15v4a1 1 0 0 1-1 1h-4"/></svg>`,
            FULLSCREEN_ICON_EXIT: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H5a1 1 0 0 0-1 1v4"/><path d="M15 4h4a1 1 0 0 1 1 1v4"/><path d="M9 20H5a1 1 0 0 1-1-1v-4"/><path d="M15 20h4a1 1 0 0 0 1-1v-4"/></svg>`,

            setupFullscreenSwitcher() {
                const btn = document.getElementById('fullscreen-btn');
                btn.onclick = (e) => { e.stopPropagation(); this.toggleFullscreenMenu(); };
                document.getElementById('fullscreen-menu').onclick = (e) => e.stopPropagation();
                // F11 gère le plein écran nativement dans la plupart des navigateurs, mais
                // Échap (et F11 lui-même) peuvent en sortir sans passer par notre bouton :
                // on écoute 'fullscreenchange' pour rester synchronisé dans tous les cas.
                document.addEventListener('fullscreenchange', () => { this.updateFullscreenButton(); this.renderFullscreenMenu(); });
                this.updateFullscreenButton();
                this.renderFullscreenMenu();
            },

            renderFullscreenMenu() {
                const menu = document.getElementById('fullscreen-menu');
                const isFs = !!document.fullscreenElement;
                menu.innerHTML = '';
                const item = document.createElement('div');
                item.className = 'lang-menu-item';
                item.innerHTML = `<span class="lm-icon">${isFs ? this.FULLSCREEN_ICON_EXIT : this.FULLSCREEN_ICON_ENTER}</span><span class="lm-name">${I18N.t(isFs ? 'chrome.fullscreen.exit' : 'chrome.fullscreen.enter')}</span>`;
                item.onclick = () => { this.toggleFullscreen(); this.toggleFullscreenMenu(false); };
                menu.appendChild(item);
            },

            updateFullscreenButton() {
                const isFs = !!document.fullscreenElement;
                document.getElementById('fullscreen-icon').innerHTML = isFs ? this.FULLSCREEN_ICON_EXIT : this.FULLSCREEN_ICON_ENTER;
            },

            toggleFullscreen() {
                if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                } else {
                    document.documentElement.requestFullscreen().catch(() => {
                        // Certains navigateurs refusent si l'appel ne vient pas directement
                        // d'une interaction utilisateur, ou si l'API est indisponible
                        // (iframe sans allow="fullscreen", restrictions navigateur...).
                        UI.notify({ title: I18N.t('chrome.fullscreen.switch'), message: I18N.t('chrome.fullscreen.unavailable'), type: 'warning' });
                    });
                }
            },

            toggleFullscreenMenu(force) {
                this.fullscreenMenuOpen = force !== undefined ? force : !this.fullscreenMenuOpen;
                document.getElementById('fullscreen-menu').classList.toggle('open', this.fullscreenMenuOpen);
                document.getElementById('fullscreen-btn').classList.toggle('active', this.fullscreenMenuOpen);
                if (this.fullscreenMenuOpen && this.langMenuOpen) this.toggleLangMenu(false);
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
                // Certaines apps (ex: Post-it) ne doivent pas avoir d'entrée dans la
                // barre des tâches — elles ne se comportent pas comme des fenêtres de
                // travail classiques.
                if (cfg.noTaskbar) return;
                const b = document.createElement('div'); b.className = 'taskbar-app active';
                b.innerHTML = `<button class="taskbar-app-main"><span class="taskbar-icon">${cfg.icon||''}</span>${escHtml(cfg.name)}</button><button class="taskbar-app-close" title="${I18N.t('chrome.win.close')}">&#10005;</button>`;
                b.querySelector('.taskbar-app-main').onclick = () => { const d = this.wm.windows.get(id); if(d) { if(d.state.isMinimized) this.wm.restoreWindow(id); else if(this.wm.activeWindowId === id) this.wm.minimizeWindow(id); else this.wm.focusWindow(id); } };
                // Fermeture directe depuis la barre des tâches, sans passer par la
                // fenêtre elle-même : utile si une fenêtre a été traînée hors de
                // l'écran (le drag n'est pas borné aux limites visibles) et devient
                // sinon impossible à ré-atteindre à la souris.
                b.querySelector('.taskbar-app-close').onclick = (e) => { e.stopPropagation(); this.wm.closeWindow(id); };
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
                    if (d.taskbarBtn) {
                        const mainBtn = d.taskbarBtn.querySelector('.taskbar-app-main');
                        if (mainBtn) mainBtn.innerHTML = `<span class="taskbar-icon">${cfg.icon||''}</span>${escHtml(cfg.name)}`;
                        const closeBtn = d.taskbarBtn.querySelector('.taskbar-app-close');
                        if (closeBtn) closeBtn.title = I18N.t('chrome.win.close');
                    }
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
