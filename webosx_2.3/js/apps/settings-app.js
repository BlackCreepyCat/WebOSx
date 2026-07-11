        OS.registry.register({
            id: 'sys-settings', name: I18N.t('app.settings'), nameKey: 'app.settings', icon: ICONS.settings, defaultWidth: 480, defaultHeight: 640, singleton: true,
            init: (c, api) => {
                let settings = SettingsManager.load();

                function render() {
                    c.innerHTML = `
                    <div class="settings-container">
                        <div class="setting-group">
                            <h3>${I18N.t('settings.appearance.title')}</h3>
                            <div class="setting-row">
                                <span class="setting-label">${I18N.t('settings.appearance.3d')}</span>
                                <label class="toggle-switch"><input type="checkbox" id="toggle-3d" ${settings.is3d ? 'checked' : ''}><span class="toggle-slider"></span></label>
                            </div>
                            <p style="font-size:11px;color:var(--text-secondary);margin-top:-10px;">${I18N.t('settings.appearance.3dDesc')}</p>
                        </div>
                        <div class="setting-group">
                            <h3>${I18N.t('settings.language.title')}</h3>
                            <div class="setting-row">
                                <span class="setting-label">${I18N.t('settings.language.label')}</span>
                                <select id="lang-select" style="background:var(--bg-window);color:var(--text-primary);border:1px solid var(--border-color);border-radius:6px;padding:6px 10px;font-family:inherit;font-size:13px;cursor:pointer;">
                                    ${Object.keys(I18N.languages).map(code => `<option value="${code}" ${code === I18N.current ? 'selected' : ''}>${I18N.languages[code].flag} ${I18N.languages[code].name}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="setting-group">
                            <h3>${I18N.t('settings.color.title')}</h3>
                            <div class="setting-row">
                                <span class="setting-label">${I18N.t('settings.color.presets')}</span>
                                <div class="color-presets">
                                    <div class="color-btn ${settings.hue===210?'active':''}" style="background:hsl(210,80%,55%);" data-hue="210" data-color="#0078d4"></div>
                                    <div class="color-btn ${settings.hue===0?'active':''}" style="background:hsl(0,80%,55%);" data-hue="0" data-color="#e74c3c"></div>
                                    <div class="color-btn ${settings.hue===140?'active':''}" style="background:hsl(140,80%,55%);" data-hue="140" data-color="#2ecc71"></div>
                                    <div class="color-btn ${settings.hue===30?'active':''}" style="background:hsl(30,80%,55%);" data-hue="30" data-color="#f39c12"></div>
                                    <div class="color-btn ${settings.hue===280?'active':''}" style="background:hsl(280,80%,55%);" data-hue="280" data-color="#9b59b6"></div>
                                </div>
                            </div>
                            <div class="setting-row">
                                <span class="setting-label">${I18N.t('settings.color.custom')}</span>
                                <input type="color" id="color-picker" value="#0078d4" style="border:none;background:none;width:50px;height:40px;cursor:pointer;border-radius:4px;">
                            </div>
                        </div>
                        <div class="setting-group">
                            <h3>${I18N.t('settings.wave.title')}</h3>
                            <div class="setting-row">
                                <span class="setting-label">${I18N.t('settings.wave.show')}</span>
                                <label class="toggle-switch"><input type="checkbox" id="toggle-waves" ${settings.showWaves !== false ? 'checked' : ''}><span class="toggle-slider"></span></label>
                            </div>
                            <div id="wave-sliders-wrap" style="${settings.showWaves === false ? 'opacity:0.4;pointer-events:none;' : ''}">
                            <div class="wave-slider-row">
                                <div class="wave-slider-head">
                                    <span class="setting-label"><span class="wave-slider-icon">🐢💨</span>${I18N.t('settings.wave.speed')}</span>
                                    <span class="wave-slider-value" id="wave-speed-value">${(settings.waveSpeed ?? 1).toFixed(1)}x</span>
                                </div>
                                <input type="range" class="wave-slider" id="wave-speed" min="0.1" max="2.5" step="0.1" value="${settings.waveSpeed ?? 1}">
                                <div class="wave-slider-ticks"><span>${I18N.t('settings.wave.speedSlow')}</span><span>${I18N.t('settings.wave.speedFast')}</span></div>
                            </div>
                            <div class="wave-slider-row" style="margin-top:18px;">
                                <div class="wave-slider-head">
                                    <span class="setting-label"><span class="wave-slider-icon">〰️⇔</span>${I18N.t('settings.wave.width')}</span>
                                    <span class="wave-slider-value" id="wave-width-value">${(settings.waveWidth ?? 1).toFixed(1)}x</span>
                                </div>
                                <input type="range" class="wave-slider" id="wave-width" min="0.3" max="2.5" step="0.1" value="${settings.waveWidth ?? 1}">
                                <div class="wave-slider-ticks"><span>${I18N.t('settings.wave.widthThin')}</span><span>${I18N.t('settings.wave.widthWide')}</span></div>
                            </div>
                            </div>
                        </div>
                    </div>`;

                    const toggle3d = c.querySelector('#toggle-3d');
                    const toggleWaves = c.querySelector('#toggle-waves');
                    const waveSlidersWrap = c.querySelector('#wave-sliders-wrap');
                    const colorBtns = c.querySelectorAll('.color-btn');
                    const colorPicker = c.querySelector('#color-picker');
                    const langSelect = c.querySelector('#lang-select');
                    toggle3d.onchange = (e) => { settings.is3d = e.target.checked; SettingsManager.save(settings); };
                    toggleWaves.onchange = (e) => {
                        settings.showWaves = e.target.checked;
                        waveSlidersWrap.style.opacity = settings.showWaves ? '' : '0.4';
                        waveSlidersWrap.style.pointerEvents = settings.showWaves ? '' : 'none';
                        SettingsManager.save(settings);
                    };
                    langSelect.onchange = (e) => I18N.setLang(e.target.value);
                    colorBtns.forEach(btn => {
                        btn.onclick = () => { colorBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); settings.hue = parseInt(btn.dataset.hue); colorPicker.value = btn.dataset.color; SettingsManager.save(settings); };
                    });
                    colorPicker.oninput = (e) => { colorBtns.forEach(b => b.classList.remove('active')); const hsl = hexToHSL(e.target.value); settings.hue = hsl.h; SettingsManager.save(settings); };
                    const waveSpeed = c.querySelector('#wave-speed'), waveSpeedValue = c.querySelector('#wave-speed-value');
                    const waveWidth = c.querySelector('#wave-width'), waveWidthValue = c.querySelector('#wave-width-value');
                    function setFill(input) { const min = parseFloat(input.min), max = parseFloat(input.max), val = parseFloat(input.value); input.style.setProperty('--range-progress', ((val - min) / (max - min)) * 100 + '%'); }
                    setFill(waveSpeed); setFill(waveWidth);
                    waveSpeed.oninput = (e) => { settings.waveSpeed = parseFloat(e.target.value); waveSpeedValue.textContent = settings.waveSpeed.toFixed(1) + 'x'; setFill(waveSpeed); SettingsManager.save(settings); };
                    waveWidth.oninput = (e) => { settings.waveWidth = parseFloat(e.target.value); waveWidthValue.textContent = settings.waveWidth.toFixed(1) + 'x'; setFill(waveWidth); SettingsManager.save(settings); };
                }

                render();
                window.addEventListener('webosx:langchange', render);
                const origClose = api.close;
                api.close = () => { window.removeEventListener('webosx:langchange', render); origClose(); };
            }
        });
