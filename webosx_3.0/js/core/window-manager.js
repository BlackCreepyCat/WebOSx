        class WindowManager {
            constructor() { this.windows = new Map(); this.topZIndex = 100; this.activeWindowId = null; this.nextWinId = 1; }
            createWindow(appConfig) {
                const id = 'win-' + (this.nextWinId++);
                const winEl = document.createElement('div');
                winEl.className = 'window'; winEl.id = id;
                // La barre des tâches fait 52px (cf. .window.maximized qui utilise
                // calc(100vh - 52px)) : on borne la hauteur créée à l'espace vertical
                // réellement disponible, moins une marge, pour qu'aucune app (même avec
                // une defaultHeight généreuse ou sur un petit écran) ne se retrouve avec
                // son bas hors-champ, inaccessible sous la barre des tâches.
                const TASKBAR_H = 52, MARGIN = 20;
                const availH = window.innerHeight - TASKBAR_H - MARGIN;
                const width = appConfig.defaultWidth || 600;
                const height = Math.min(appConfig.defaultHeight || 400, Math.max(200, availH));
                const top = Math.min(50 + Math.random() * 100, Math.max(0, window.innerHeight - TASKBAR_H - height - 10));
                winEl.style.width = width + 'px';
                winEl.style.height = height + 'px';
                winEl.style.left = (50 + Math.random() * 200) + 'px';
                winEl.style.top = top + 'px';
                winEl.style.zIndex = ++this.topZIndex;
                const resizable = appConfig.resizable !== false;
                const maximizable = appConfig.maximizable !== false;
                winEl.innerHTML = `
                    <div class="title-bar">
                        <div class="title"><span class="title-icon">${appConfig.icon || ''}</span><span class="title-text">${escHtml(appConfig.name)}</span></div>
                        <div class="window-controls">
                            <button class="min-btn" title="${I18N.t('chrome.win.minimize')}">─</button>
                            ${maximizable ? `<button class="max-btn" title="${I18N.t('chrome.win.maximize')}">☐</button>` : ''}
                            <button class="close-btn" title="${I18N.t('chrome.win.close')}">✕</button>
                        </div>
                    </div>
                    <div class="window-content"></div>`;
                document.getElementById('desktop').appendChild(winEl);
                if (resizable) this.setupResize(winEl);
                const state = { id, isMinimized: false, isMaximized: false, appConfig };
                this.windows.set(id, { el: winEl, state, taskbarBtn: null });
                const api = { getId: () => id, close: () => this.closeWindow(id), setTitle: (t) => winEl.querySelector('.title-text').innerText = t, getContent: () => winEl.querySelector('.window-content') };
                this.setupDrag(winEl, winEl.querySelector('.title-bar'));
                winEl.querySelector('.close-btn').onclick = (e) => { e.stopPropagation(); api.close(); };
                winEl.querySelector('.min-btn').onclick = (e) => { e.stopPropagation(); this.minimizeWindow(id); };
                if (maximizable) winEl.querySelector('.max-btn').onclick = (e) => { e.stopPropagation(); this.toggleMaximize(id); };
                winEl.onpointerdown = () => this.focusWindow(id);
                this.focusWindow(id);
                if (typeof appConfig.init === 'function') appConfig.init(winEl.querySelector('.window-content'), api);
                if (this.windows.has(id)) OS.onWindowCreated(id, appConfig);
                return api;
            }
            setupDrag(w, h) {
                let d=false, sx, sy, il, it;
                h.onpointerdown = (e) => { if(e.target.tagName==='BUTTON') return; const wd=this.windows.get(w.id); if(wd && wd.state.isMaximized) return; d=true; h.setPointerCapture(e.pointerId); sx=e.clientX; sy=e.clientY; const r=w.getBoundingClientRect(); il=r.left; it=r.top; };
                h.onpointermove = (e) => { if(!d) return; w.style.left = `${il + (e.clientX - sx)}px`; w.style.top = `${it + (e.clientY - sy)}px`; };
                h.onpointerup = () => d=false;
            }
            setupResize(w) {
                const dirs = ['n','s','e','w','ne','nw','se','sw'];
                dirs.forEach(dir => {
                    const h = document.createElement('div'); h.className = `resize-handle ${dir}`; h.style.touchAction = 'none'; w.appendChild(h);
                    h.onpointerdown = (e) => {
                        e.stopPropagation(); if(w.classList.contains('maximized')) return; h.setPointerCapture(e.pointerId);
                        const sx = e.clientX, sy = e.clientY, sW = w.offsetWidth, sH = w.offsetHeight, sL = w.offsetLeft, sT = w.offsetTop;
                        h.onpointermove = (e) => {
                            let dx = e.clientX - sx, dy = e.clientY - sy, nW = sW, nH = sH, nL = sL, nT = sT;
                            if(dir.includes('e')) nW = Math.max(300, sW + dx);
                            if(dir.includes('w')) { nW = Math.max(300, sW - dx); nL = sL + (sW - nW); }
                            if(dir.includes('s')) nH = Math.max(200, sH + dy);
                            if(dir.includes('n')) { nH = Math.max(200, sH - dy); nT = sT + (sH - nH); }
                            w.style.width = nW + 'px'; w.style.height = nH + 'px'; w.style.left = nL + 'px'; w.style.top = nT + 'px';
                        };
                        h.onpointerup = () => { h.onpointermove = null; h.onpointerup = null; };
                    };
                });
            }
            focusWindow(id) {
                if(this.activeWindowId === id) return;
                this.windows.forEach(d => { d.el.classList.remove('focused'); if(d.taskbarBtn) d.taskbarBtn.classList.remove('active'); });
                const d = this.windows.get(id);
                if(d) { d.el.classList.add('focused'); d.el.style.zIndex = ++this.topZIndex; if(d.taskbarBtn) d.taskbarBtn.classList.add('active'); this.activeWindowId = id; }
            }
            minimizeWindow(id) { const d = this.windows.get(id); if(d) { d.state.isMinimized = true; d.el.classList.add('minimized'); if(this.activeWindowId === id) this.activeWindowId = null; } }
            restoreWindow(id) { const d = this.windows.get(id); if(d) { d.state.isMinimized = false; d.el.classList.remove('minimized'); this.focusWindow(id); } }
            toggleMaximize(id) { const d = this.windows.get(id); if(d) { d.state.isMaximized = !d.state.isMaximized; d.el.classList.toggle('maximized'); } }
            closeWindow(id) { const d = this.windows.get(id); if(d) { OS.onWindowClosed(id); d.el.remove(); this.windows.delete(id); if(this.activeWindowId === id) this.activeWindowId = null; } }
        }
