        // ==================================================================
        // App Réglages — shell d'onglets façon "panneau de configuration".
        // Ce fichier ne contient QUE la coquille (barre latérale + zone de
        // contenu) et l'enregistrement des onglets/panneaux par défaut du
        // système. Toute la logique de rendu de chaque panneau vit dans son
        // propre `render()`, enregistré via SettingsRegistry (voir
        // js/core/settings-registry.js) — une future app peut ajouter son
        // propre onglet sans toucher à ce fichier.
        // ==================================================================

        const SETTINGS_TAB_ICONS = {
            appearance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-0.9 2-1.8 0-.5-.2-.9-.5-1.3-.4-.5-.2-1.3.5-1.5.5-.15 1-.1 1.5-.1A4.3 4.3 0 0 0 20 13.9C20 8 16.6 3 12 3Z"/><circle cx="7.3" cy="10.8" r="1" fill="currentColor" stroke="none"/><circle cx="9.3" cy="7.3" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="16.5" cy="10.5" r="1" fill="currentColor" stroke="none"/></svg>`,
            wallpaper: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"/><path d="M2 14c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"/><path d="M2 20c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"/></svg>`,
            performance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2"/></svg>`,
            desktop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="1.5"/><line x1="3" y1="8.5" x2="21" y2="8.5"/><line x1="9" y1="8.5" x2="9" y2="18"/></svg>`,
            language: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9Z"/></svg>`
        };

        // ---- Onglets par défaut (order espacé de 10 pour laisser des trous d'insertion) ----
        SettingsRegistry.registerTab({ id: 'appearance', titleKey: 'settings.tabs.appearance', icon: SETTINGS_TAB_ICONS.appearance, order: 10 });
        SettingsRegistry.registerTab({ id: 'wallpaper', titleKey: 'settings.tabs.wallpaper', icon: SETTINGS_TAB_ICONS.wallpaper, order: 20 });
        SettingsRegistry.registerTab({ id: 'performance', titleKey: 'settings.tabs.performance', icon: SETTINGS_TAB_ICONS.performance, order: 30 });
        SettingsRegistry.registerTab({ id: 'desktop', titleKey: 'settings.tabs.desktop', icon: SETTINGS_TAB_ICONS.desktop, order: 40 });
        SettingsRegistry.registerTab({ id: 'language', titleKey: 'settings.tabs.language', icon: SETTINGS_TAB_ICONS.language, order: 50 });

        // ---- Onglet "Apparence" : filets 3D ----
        SettingsRegistry.registerPanel({
            id: 'appearance-3d', tabId: 'appearance', order: 10,
            render(container, settings, save) {
                container.innerHTML = `
                <div class="setting-group">
                    <h3>${I18N.t('settings.appearance.title')}</h3>
                    <div class="setting-row">
                        <span class="setting-label">${I18N.t('settings.appearance.3d')}</span>
                        <label class="toggle-switch"><input type="checkbox" id="toggle-3d" ${settings.is3d ? 'checked' : ''}><span class="toggle-slider"></span></label>
                    </div>
                    <p style="font-size:11px;color:var(--text-secondary);margin-top:-10px;">${I18N.t('settings.appearance.3dDesc')}</p>
                </div>`;
                container.querySelector('#toggle-3d').onchange = (e) => { settings.is3d = e.target.checked; save(); };
            }
        });

        // ---- Onglet "Apparence" : couleur globale ----
        SettingsRegistry.registerPanel({
            id: 'appearance-color', tabId: 'appearance', order: 20,
            render(container, settings, save) {
                container.innerHTML = `
                <div class="setting-group">
                    <h3>${I18N.t('settings.color.title')}</h3>
                    <div class="setting-row">
                        <span class="setting-label">${I18N.t('settings.color.presets')}</span>
                        <div class="color-presets">
                            <div class="color-btn ${settings.hue===210&&(settings.saturation??80)===80?'active':''}" style="background:hsl(210,80%,55%);" data-hue="210" data-sat="80"></div>
                            <div class="color-btn ${settings.hue===0&&(settings.saturation??80)===80?'active':''}" style="background:hsl(0,80%,55%);" data-hue="0" data-sat="80"></div>
                            <div class="color-btn ${settings.hue===140&&(settings.saturation??80)===80?'active':''}" style="background:hsl(140,80%,55%);" data-hue="140" data-sat="80"></div>
                            <div class="color-btn ${settings.hue===30&&(settings.saturation??80)===80?'active':''}" style="background:hsl(30,80%,55%);" data-hue="30" data-sat="80"></div>
                            <div class="color-btn ${settings.hue===280&&(settings.saturation??80)===80?'active':''}" style="background:hsl(280,80%,55%);" data-hue="280" data-sat="80"></div>
                            <div class="color-btn ${(settings.saturation??80)===0?'active':''}" style="background:#ffffff;" data-hue="0" data-sat="0"></div>
                            <div class="color-btn ${settings.hue===210&&settings.saturation===18?'active':''}" style="background:#787f8a;" data-hue="210" data-sat="18"></div>
                        </div>
                    </div>
                </div>`;
                container.querySelectorAll('.color-btn').forEach(btn => {
                    btn.onclick = () => {
                        container.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        settings.hue = parseInt(btn.dataset.hue); settings.saturation = parseInt(btn.dataset.sat);
                        save();
                    };
                });
            }
        });

        // ---- Onglet "Fond d'écran" : fond animé (vagues) ----
        SettingsRegistry.registerPanel({
            id: 'wallpaper-waves', tabId: 'wallpaper', order: 10,
            render(container, settings, save) {
                container.innerHTML = `
                <div class="setting-group">
                    <h3>${I18N.t('settings.wave.title')}</h3>
                    <div class="setting-row">
                        <span class="setting-label">${I18N.t('settings.wave.show')}</span>
                        <label class="toggle-switch"><input type="checkbox" id="toggle-waves" ${settings.showWaves !== false ? 'checked' : ''}><span class="toggle-slider"></span></label>
                    </div>
                    <div id="wave-sliders-wrap" style="${settings.showWaves === false ? 'opacity:0.4;pointer-events:none;' : ''}">
                    <div class="wave-slider-row">
                        <div class="wave-slider-head">
                            <span class="setting-label">${I18N.t('settings.wave.speed')}</span>
                            <span class="wave-slider-value" id="wave-speed-value">${(settings.waveSpeed ?? 1).toFixed(1)}x</span>
                        </div>
                        <input type="range" class="wave-slider" id="wave-speed" min="0.1" max="2.5" step="0.1" value="${settings.waveSpeed ?? 1}">
                        <div class="wave-slider-ticks"><span>${I18N.t('settings.wave.speedSlow')}</span><span>${I18N.t('settings.wave.speedFast')}</span></div>
                    </div>
                    <div class="wave-slider-row" style="margin-top:18px;">
                        <div class="wave-slider-head">
                            <span class="setting-label">${I18N.t('settings.wave.width')}</span>
                            <span class="wave-slider-value" id="wave-width-value">${(settings.waveWidth ?? 1).toFixed(1)}x</span>
                        </div>
                        <input type="range" class="wave-slider" id="wave-width" min="0.3" max="2.5" step="0.1" value="${settings.waveWidth ?? 1}">
                        <div class="wave-slider-ticks"><span>${I18N.t('settings.wave.widthThin')}</span><span>${I18N.t('settings.wave.widthWide')}</span></div>
                    </div>
                    <div class="wave-slider-row" style="margin-top:18px;">
                        <div class="wave-slider-head">
                            <span class="setting-label">${I18N.t('settings.wave.opacity')}</span>
                            <span class="wave-slider-value" id="wave-opacity-value">${Math.round((settings.waveOpacity ?? 1) * 100)}%</span>
                        </div>
                        <input type="range" class="wave-slider" id="wave-opacity" min="0" max="1" step="0.05" value="${settings.waveOpacity ?? 1}">
                        <div class="wave-slider-ticks"><span>${I18N.t('settings.wave.opacityLow')}</span><span>${I18N.t('settings.wave.opacityHigh')}</span></div>
                    </div>
                    </div>
                </div>`;

                const toggleWaves = container.querySelector('#toggle-waves');
                const waveSlidersWrap = container.querySelector('#wave-sliders-wrap');
                toggleWaves.onchange = (e) => {
                    settings.showWaves = e.target.checked;
                    waveSlidersWrap.style.opacity = settings.showWaves ? '' : '0.4';
                    waveSlidersWrap.style.pointerEvents = settings.showWaves ? '' : 'none';
                    save();
                };

                const waveSpeed = container.querySelector('#wave-speed'), waveSpeedValue = container.querySelector('#wave-speed-value');
                const waveWidth = container.querySelector('#wave-width'), waveWidthValue = container.querySelector('#wave-width-value');
                const waveOpacity = container.querySelector('#wave-opacity'), waveOpacityValue = container.querySelector('#wave-opacity-value');
                function setFill(input) { const min = parseFloat(input.min), max = parseFloat(input.max), val = parseFloat(input.value); input.style.setProperty('--range-progress', ((val - min) / (max - min)) * 100 + '%'); }
                setFill(waveSpeed); setFill(waveWidth); setFill(waveOpacity);
                waveSpeed.oninput = (e) => { settings.waveSpeed = parseFloat(e.target.value); waveSpeedValue.textContent = settings.waveSpeed.toFixed(1) + 'x'; setFill(waveSpeed); save(); };
                waveWidth.oninput = (e) => { settings.waveWidth = parseFloat(e.target.value); waveWidthValue.textContent = settings.waveWidth.toFixed(1) + 'x'; setFill(waveWidth); save(); };
                waveOpacity.oninput = (e) => { settings.waveOpacity = parseFloat(e.target.value); waveOpacityValue.textContent = Math.round(settings.waveOpacity * 100) + '%'; setFill(waveOpacity); save(); };
            }
        });

        // ---- Onglet "Performance" : mode économie d'énergie ----
        SettingsRegistry.registerPanel({
            id: 'performance-lowpower', tabId: 'performance', order: 10,
            render(container, settings, save) {
                container.innerHTML = `
                <div class="setting-group">
                    <h3>${I18N.t('settings.performance.title')}</h3>
                    <div class="setting-row">
                        <span class="setting-label">${I18N.t('settings.performance.lowPower')}</span>
                        <label class="toggle-switch"><input type="checkbox" id="toggle-lowpower" ${settings.lowPower ? 'checked' : ''}><span class="toggle-slider"></span></label>
                    </div>
                    <p style="font-size:11px;color:var(--text-secondary);margin-top:-10px;">${I18N.t('settings.performance.lowPowerDesc')}${SettingsManager.isMobileDevice() ? `<br><span style="opacity:0.75;">${I18N.t('settings.performance.autoMobile')}</span>` : ''}</p>
                </div>`;
                container.querySelector('#toggle-lowpower').onchange = (e) => { settings.lowPower = e.target.checked; save(); };
            }
        });

        // ---- Onglet "Bureau" : réinitialisation de la disposition ----
        SettingsRegistry.registerPanel({
            id: 'desktop-reset', tabId: 'desktop', order: 10,
            render(container) {
                container.innerHTML = `
                <div class="setting-group">
                    <h3>${I18N.t('settings.desktop.title')}</h3>
                    <div class="setting-row">
                        <span class="setting-label">${I18N.t('settings.desktop.resetLayout')}</span>
                        <button id="btn-reset-desktop" style="padding:6px 14px;background:transparent;color:var(--danger);border:1px solid var(--border-color);border-radius:6px;cursor:pointer;font-size:12px;">${I18N.t('settings.desktop.resetLayout')}</button>
                    </div>
                    <p style="font-size:11px;color:var(--text-secondary);margin-top:-10px;">${I18N.t('settings.desktop.resetLayoutDesc')}</p>
                </div>`;
                container.querySelector('#btn-reset-desktop').onclick = () => {
                    if (!confirm(I18N.t('settings.desktop.resetConfirm'))) return;
                    OS.resetDesktopState();
                };
            }
        });

        // ---- Onglet "Langue" ----
        SettingsRegistry.registerPanel({
            id: 'language-select', tabId: 'language', order: 10,
            render(container) {
                container.innerHTML = `
                <div class="setting-group">
                    <h3>${I18N.t('settings.language.title')}</h3>
                    <div class="setting-row">
                        <span class="setting-label">${I18N.t('settings.language.label')}</span>
                        <select id="lang-select" style="background:var(--bg-window);color:var(--text-primary);border:1px solid var(--border-color);border-radius:6px;padding:6px 10px;font-family:inherit;font-size:13px;cursor:pointer;">
                            ${Object.keys(I18N.languages).map(code => `<option value="${code}" ${code === I18N.current ? 'selected' : ''}>${I18N.languages[code].short} — ${I18N.languages[code].name}</option>`).join('')}
                        </select>
                    </div>
                </div>`;
                container.querySelector('#lang-select').onchange = (e) => I18N.setLang(e.target.value);
            }
        });

        // ==================================================================
        // L'app elle-même : un pur shell. Elle ne connaît le détail d'aucun
        // réglage — elle affiche la barre latérale d'onglets enregistrés
        // dans SettingsRegistry, et délègue le rendu du contenu à chaque
        // panneau de l'onglet actif.
        // ==================================================================
        OS.registry.register({
            id: 'sys-settings', name: I18N.t('app.settings'), nameKey: 'app.settings', icon: ICONS.settings,
            defaultWidth: 800, defaultHeight: 500, singleton: true,
            init: (c, api) => {
                let settings = SettingsManager.load();
                // Mémorise l'onglet actif dans la fermeture de l'app (persiste tant que
                // la fenêtre reste ouverte, y compris à travers un changement de langue ;
                // repart sur le premier onglet à chaque réouverture de l'app).
                let activeTabId = SettingsRegistry.tabs[0] && SettingsRegistry.tabs[0].id;

                function save() { SettingsManager.save(settings); }

                function renderContent() {
                    const contentEl = c.querySelector('#settings-content');
                    if (!contentEl) return;
                    contentEl.innerHTML = '';
                    SettingsRegistry.panelsForTab(activeTabId).forEach(panel => {
                        const wrap = document.createElement('div');
                        contentEl.appendChild(wrap);
                        panel.render(wrap, settings, save);
                    });
                }

                function selectTab(id) {
                    if (id === activeTabId) return;
                    activeTabId = id;
                    c.querySelectorAll('.settings-tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tabId === id));
                    renderContent();
                }

                function render() {
                    c.innerHTML = `
                    <div class="settings-shell">
                        <div class="settings-sidebar" id="settings-sidebar"></div>
                        <div class="settings-container" id="settings-content"></div>
                    </div>`;
                    const sidebar = c.querySelector('#settings-sidebar');
                    SettingsRegistry.tabs.forEach(tab => {
                        const btn = document.createElement('button');
                        btn.className = 'settings-tab-btn' + (tab.id === activeTabId ? ' active' : '');
                        btn.dataset.tabId = tab.id;
                        btn.innerHTML = `${tab.icon || ''}<span>${I18N.t(tab.titleKey)}</span>`;
                        btn.onclick = () => selectTab(tab.id);
                        sidebar.appendChild(btn);
                    });
                    renderContent();
                }

                render();
                window.addEventListener('webosx:langchange', render);
                const origClose = api.close;
                api.close = () => { window.removeEventListener('webosx:langchange', render); origClose(); };
            }
        });
