        OS.registry.register({
            id: 'sys-about', name: I18N.t('app.about'), nameKey: 'app.about', icon: ICONS.about, defaultWidth: 350, defaultHeight: 250, singleton: true,
            init: (c, api) => {
                c.style.padding = '20px'; c.style.alignItems = 'center'; c.style.justifyContent = 'center'; c.style.textAlign = 'center';
                function render() {
                    c.innerHTML = `<h2 style="margin-bottom:10px;color:var(--accent);">WebOSx</h2><p style="color:var(--text-secondary);margin-bottom:20px;">${I18N.t('about.version')}<br>${I18N.t('about.desc1')}</p><p style="font-size:12px;color:#666;">${I18N.t('about.desc2')}</p><button style="margin-top:20px;padding:8px 20px;background:var(--accent);color:white;border:none;border-radius:4px;cursor:pointer;">${I18N.t('about.ok')}</button>`;
                    c.querySelector('button').onclick = () => api.close();
                }
                render();
                window.addEventListener('webosx:langchange', render);
                const origClose = api.close;
                api.close = () => { window.removeEventListener('webosx:langchange', render); origClose(); };
            }
        });
