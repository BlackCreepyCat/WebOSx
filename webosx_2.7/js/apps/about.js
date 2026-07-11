        OS.registry.register({
            id: 'sys-about', name: I18N.t('app.about'), nameKey: 'app.about', icon: ICONS.about, defaultWidth: 350, defaultHeight: 300, singleton: true,
            init: (c, api) => {
                c.style.padding = '20px'; c.style.alignItems = 'center'; c.style.justifyContent = 'center'; c.style.textAlign = 'center';
                const GITHUB_URL = 'https://github.com/BlackCreepyCat/WebOSx';
                // Icône générique "lien externe" (volontairement pas le logo GitHub,
                // qui est une marque déposée) : une flèche sortant d'un cadre.
                const LINK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;vertical-align:-2px;margin-right:6px;"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>`;
                function render() {
                    c.innerHTML = `<h2 style="margin-bottom:10px;color:var(--accent);">WebOSx</h2><p style="color:var(--text-secondary);margin-bottom:20px;">${I18N.t('about.version')}<br>${I18N.t('about.desc1')}</p><p style="font-size:12px;color:#666;">${I18N.t('about.desc2')}</p><div style="display:flex;gap:10px;justify-content:center;margin-top:20px;"><button id="about-github-btn" style="padding:8px 18px;background:transparent;color:var(--text-primary);border:1px solid var(--border-color);border-radius:4px;cursor:pointer;display:flex;align-items:center;">${LINK_ICON}GitHub</button><button id="about-ok-btn" style="padding:8px 20px;background:var(--accent);color:white;border:none;border-radius:4px;cursor:pointer;">${I18N.t('about.ok')}</button></div>`;
                    c.querySelector('#about-ok-btn').onclick = () => api.close();
                    const githubBtn = c.querySelector('#about-github-btn');
                    githubBtn.title = I18N.t('about.github');
                    githubBtn.onclick = () => window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
                }
                render();
                window.addEventListener('webosx:langchange', render);
                const origClose = api.close;
                api.close = () => { window.removeEventListener('webosx:langchange', render); origClose(); };
            }
        });
