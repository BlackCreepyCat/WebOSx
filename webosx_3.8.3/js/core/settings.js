        const SettingsManager = {
            // Détection mobile (même heuristique que wave-background.js : UA + pointeur
            // tactile). Sert uniquement à déterminer la valeur PAR DÉFAUT du mode
            // économie d'énergie — dès qu'un réglage est sauvegardé dans localStorage
            // (premier lancement compris, puisque SettingsManager.apply() écrit toujours
            // l'objet complet), cette valeur sauvegardée prime définitivement sur la
            // détection, y compris si l'utilisateur désactive manuellement le mode sur
            // un mobile détecté.
            isMobileDevice() {
                return /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent)
                    || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
            },
            get defaults() {
                return { is3d: false, hue: 210, saturation: 80, waveSpeed: 1, waveWidth: 1, waveOpacity: 1, showWaves: true, lowPower: this.isMobileDevice(), lang: 'fr' };
            },
            load() { 
                try { return Object.assign({}, this.defaults, JSON.parse(localStorage.getItem('webosx_settings'))); } 
                catch(e) { return Object.assign({}, this.defaults); } 
            },
            save(settings) { localStorage.setItem('webosx_settings', JSON.stringify(settings)); this.apply(settings); },
            apply(settings) {
                document.documentElement.style.setProperty('--hue', settings.hue);
                document.documentElement.style.setProperty('--sat', settings.saturation ?? 80);
                document.body.classList.toggle('theme-3d', settings.is3d);
                document.body.classList.toggle('waves-off', settings.showWaves === false);
                const wavesEl = document.getElementById('ps3-waves');
                if (wavesEl) wavesEl.style.opacity = settings.waveOpacity ?? 1;
                window.__waveConfig = {
                    speed: settings.waveSpeed ?? 1,
                    width: settings.waveWidth ?? 1,
                    enabled: settings.showWaves !== false,
                    lowPower: settings.lowPower === true
                };
            }
        };
        SettingsManager.apply(SettingsManager.load());
