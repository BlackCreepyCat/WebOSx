        OS.registry.register({
            id: 'sys-about', name: I18N.t('app.about'), nameKey: 'app.about', icon: ICONS.about, defaultWidth: 460, defaultHeight: 540, singleton: true,
            init: (c, api) => {
                c.style.padding = '0'; c.style.alignItems = 'stretch'; c.style.justifyContent = 'flex-start'; c.style.textAlign = 'center';
                const GITHUB_URL = 'https://github.com/BlackCreepyCat/WebOSx';
                // Icône générique "lien externe" (volontairement pas le logo GitHub,
                // qui est une marque déposée) : une flèche sortant d'un cadre.
                const LINK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;vertical-align:-2px;margin-right:6px;"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>`;

                if (!document.getElementById('about-anim-style')) {
                    const style = document.createElement('style');
                    style.id = 'about-anim-style';
                    style.textContent = `
                        .about-wrap { padding: 30px 26px 8px; max-width: 380px; margin: 0 auto; }
                        .about-anim { opacity: 0; animation: aboutFadeUp .65s cubic-bezier(.2,.7,.3,1) forwards; animation-delay: var(--d, 0s); }
                        @keyframes aboutFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
                        .about-hex-wrap { width: 72px; height: 72px; margin: 0 auto 16px; }
                        .about-hex { width: 100%; height: 100%; overflow: visible; }
                        .about-hex-outline {
                            stroke-dasharray: 300; stroke-dashoffset: 300;
                            filter: drop-shadow(0 0 6px hsla(var(--hue), calc(80% * var(--sat, 80) / 80), 60%, 0.5));
                            animation: aboutHexDraw 1.3s cubic-bezier(.65,0,.35,1) forwards;
                        }
                        .about-hex-fill {
                            opacity: 0; transform-origin: 50px 50px; transform: scale(0.85);
                            animation: aboutHexFillIn 0.8s ease-out 1.1s forwards,
                                       aboutHexPulse 6s ease-in-out 1.9s infinite;
                        }
                        @keyframes aboutHexDraw { to { stroke-dashoffset: 0; } }
                        @keyframes aboutHexFillIn { to { opacity: 1; transform: scale(1); } }
                        @keyframes aboutHexPulse {
                            0%, 100% { filter: drop-shadow(0 0 8px hsla(var(--hue), calc(80% * var(--sat, 80) / 80), 60%, .35)); transform: scale(1); }
                            50%      { filter: drop-shadow(0 0 16px hsla(var(--hue), calc(80% * var(--sat, 80) / 80), 60%, .65)); transform: scale(1.035); }
                        }
                        .about-title { margin: 0 0 4px; font-size: 23px; font-weight: 700; letter-spacing: .3px; background: linear-gradient(90deg, var(--accent), var(--text-primary), var(--accent)); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: aboutFadeUp .65s cubic-bezier(.2,.7,.3,1) forwards, aboutShimmer 6s linear infinite .65s; }
                        @keyframes aboutShimmer { to { background-position: -200% center; } }
                        .about-tagline { font-size: 12.5px; color: var(--text-secondary); margin-bottom: 10px; }
                        .about-copyright { font-size: 11px; color: var(--text-secondary); opacity: .75; letter-spacing: .2px; margin-bottom: 18px; }
                        .about-divider { width: 44px; height: 2px; border-radius: 2px; margin: 0 auto 18px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: .7; }
                        .about-what { text-align: left; }
                        .about-what h3 { margin: 0 0 8px; font-size: 14px; font-weight: 600; color: var(--text-primary); }
                        .about-what p { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--text-secondary); }
                        .about-tags { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin: 18px 0 4px; }
                        .about-tag { font-size: 10.5px; padding: 3px 10px; border-radius: 20px; border: 1px solid var(--border-color); color: var(--text-secondary); background: rgba(255,255,255,0.03); transition: border-color .2s ease, color .2s ease, transform .2s ease; }
                        .about-tag:hover { border-color: var(--accent); color: var(--text-primary); transform: translateY(-1px); }
                        .about-actions { display: flex; gap: 10px; justify-content: center; margin: 22px 0 26px; }
                        .about-btn { padding: 8px 18px; border-radius: 5px; cursor: pointer; display: flex; align-items: center; font-size: 13px; transition: transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease; }
                        .about-btn:hover { transform: translateY(-2px); }
                        .about-btn:active { transform: translateY(0); }
                        #about-github-btn { background: transparent; color: var(--text-primary); border: 1px solid var(--border-color); }
                        #about-github-btn:hover { border-color: var(--accent); box-shadow: 0 4px 14px rgba(0,0,0,.25); }
                        #about-ok-btn { background: var(--accent); color: #fff; border: none; }
                        #about-ok-btn:hover { box-shadow: 0 4px 16px rgba(0,0,0,.3); }
                    `;
                    document.head.appendChild(style);
                }

                function render() {
                    c.innerHTML = `
                        <div class="about-wrap">
                            <div class="about-hex-wrap about-anim" style="--d:0s">
                                <svg class="about-hex" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="aboutHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color:hsl(var(--hue), 80%, 58%)"/>
                                            <stop offset="100%" style="stop-color:hsl(calc(var(--hue) + 25), 75%, 48%)"/>
                                        </linearGradient>
                                    </defs>
                                    <polygon class="about-hex-fill" points="50,4 90,27 90,73 50,96 10,73 10,27" fill="url(#aboutHexGrad)"/>
                                    <polygon class="about-hex-outline" points="50,4 90,27 90,73 50,96 10,73 10,27" fill="none" stroke="url(#aboutHexGrad)" stroke-width="3"/>
                                </svg>
                            </div>
                            <h2 class="about-title">WebOSx</h2>
                            <div class="about-tagline about-anim" style="--d:.14s">${I18N.t('about.version')} — ${I18N.t('about.desc1')}</div>
                            <div class="about-copyright about-anim" style="--d:.2s">${I18N.t('about.copyright')}</div>
                            <div class="about-divider about-anim" style="--d:.26s"></div>
                            <div class="about-what about-anim" style="--d:.32s">
                                <h3>${I18N.t('about.whatTitle')}</h3>
                                <p>${I18N.t('about.whatDesc')}</p>
                            </div>
                            <div class="about-tags about-anim" style="--d:.42s">
                                <span class="about-tag">HTML</span><span class="about-tag">CSS</span><span class="about-tag">JavaScript</span>
                            </div>
                            <div class="about-actions about-anim" style="--d:.5s">
                                <button id="about-github-btn" class="about-btn">${LINK_ICON}GitHub</button>
                                <button id="about-ok-btn" class="about-btn">${I18N.t('about.ok')}</button>
                            </div>
                        </div>`;
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
