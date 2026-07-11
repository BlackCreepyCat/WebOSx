        const SettingsManager = {
            defaults: { is3d: false, hue: 210, saturation: 80, waveSpeed: 1, waveWidth: 1, waveOpacity: 1, showWaves: true, lang: 'fr' },
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
                window.__waveConfig = { speed: settings.waveSpeed ?? 1, width: settings.waveWidth ?? 1, enabled: settings.showWaves !== false };
            }
        };
        SettingsManager.apply(SettingsManager.load());
