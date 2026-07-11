        // ==================================================================
        // Météo — API Open-Meteo (gratuite, sans clé). Visuel canvas animé
        // (soleil / lune / nuages / pluie / neige / orage) dérivé du code
        // météo WMO retourné par l'API, coloré via --hue comme le reste de
        // l'OS (même logique que clock.js et wave-background.js).
        // ==================================================================

        const WEATHER_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.5a4 4 0 0 1-1 7.9"/><circle cx="17" cy="5.5" r="2.2" stroke-width="1.4"/><line x1="17" y1="1.8" x2="17" y2="2.6" stroke-width="1.2"/><line x1="17" y1="8.4" x2="17" y2="9.2" stroke-width="1.2"/><line x1="20.2" y1="5.5" x2="19.4" y2="5.5" stroke-width="1.2"/><line x1="14.6" y1="5.5" x2="13.8" y2="5.5" stroke-width="1.2"/></svg>`;

        I18N.registerLang('fr', {
            'app.weather': 'Météo',
            'weather.searchPlaceholder': 'Rechercher une ville...',
            'weather.useLocation': 'Ma position',
            'weather.locating': 'Localisation…',
            'weather.loading': 'Chargement…',
            'weather.notFound': 'Aucune ville trouvée',
            'weather.searchError': 'Recherche indisponible',
            'weather.locationError': 'Position indisponible',
            'weather.error': 'Impossible de charger la météo',
            'weather.retry': 'Réessayer',
            'weather.feelsLike': 'Ressenti',
            'weather.humidity': 'Humidité',
            'weather.wind': 'Vent',
            'weather.forecast': 'Prévisions 5 jours',
            'weather.updated': 'Mis à jour à {time}',
            'weather.today': "Aujourd'hui",
            'weather.cond.clear': 'Ciel dégagé',
            'weather.cond.mainlyClear': 'Plutôt dégagé',
            'weather.cond.partlyCloudy': 'Partiellement nuageux',
            'weather.cond.overcast': 'Couvert',
            'weather.cond.fog': 'Brouillard',
            'weather.cond.drizzle': 'Bruine',
            'weather.cond.freezingDrizzle': 'Bruine verglaçante',
            'weather.cond.rain': 'Pluie',
            'weather.cond.freezingRain': 'Pluie verglaçante',
            'weather.cond.snow': 'Neige',
            'weather.cond.snowGrains': 'Neige en grains',
            'weather.cond.rainShowers': 'Averses',
            'weather.cond.snowShowers': 'Averses de neige',
            'weather.cond.thunderstorm': 'Orage',
            'weather.cond.thunderstormHail': 'Orage de grêle',
            'weather.cond.unknown': 'Conditions inconnues'
        });
        I18N.registerLang('en', {
            'app.weather': 'Weather',
            'weather.searchPlaceholder': 'Search for a city...',
            'weather.useLocation': 'My location',
            'weather.locating': 'Locating…',
            'weather.loading': 'Loading…',
            'weather.notFound': 'No city found',
            'weather.searchError': 'Search unavailable',
            'weather.locationError': 'Location unavailable',
            'weather.error': 'Could not load weather',
            'weather.retry': 'Retry',
            'weather.feelsLike': 'Feels like',
            'weather.humidity': 'Humidity',
            'weather.wind': 'Wind',
            'weather.forecast': '5-day forecast',
            'weather.updated': 'Updated at {time}',
            'weather.today': 'Today',
            'weather.cond.clear': 'Clear sky',
            'weather.cond.mainlyClear': 'Mainly clear',
            'weather.cond.partlyCloudy': 'Partly cloudy',
            'weather.cond.overcast': 'Overcast',
            'weather.cond.fog': 'Fog',
            'weather.cond.drizzle': 'Drizzle',
            'weather.cond.freezingDrizzle': 'Freezing drizzle',
            'weather.cond.rain': 'Rain',
            'weather.cond.freezingRain': 'Freezing rain',
            'weather.cond.snow': 'Snow',
            'weather.cond.snowGrains': 'Snow grains',
            'weather.cond.rainShowers': 'Rain showers',
            'weather.cond.snowShowers': 'Snow showers',
            'weather.cond.thunderstorm': 'Thunderstorm',
            'weather.cond.thunderstormHail': 'Thunderstorm with hail',
            'weather.cond.unknown': 'Unknown conditions'
        });
        I18N.registerLang('es', {
            'app.weather': 'Meteo',
            'weather.searchPlaceholder': 'Buscar una ciudad...',
            'weather.useLocation': 'Mi ubicación',
            'weather.locating': 'Localizando…',
            'weather.loading': 'Cargando…',
            'weather.notFound': 'Ninguna ciudad encontrada',
            'weather.searchError': 'Búsqueda no disponible',
            'weather.locationError': 'Ubicación no disponible',
            'weather.error': 'No se pudo cargar el tiempo',
            'weather.retry': 'Reintentar',
            'weather.feelsLike': 'Sensación',
            'weather.humidity': 'Humedad',
            'weather.wind': 'Viento',
            'weather.forecast': 'Previsión a 5 días',
            'weather.updated': 'Actualizado a las {time}',
            'weather.today': 'Hoy',
            'weather.cond.clear': 'Cielo despejado',
            'weather.cond.mainlyClear': 'Mayormente despejado',
            'weather.cond.partlyCloudy': 'Parcialmente nublado',
            'weather.cond.overcast': 'Nublado',
            'weather.cond.fog': 'Niebla',
            'weather.cond.drizzle': 'Llovizna',
            'weather.cond.freezingDrizzle': 'Llovizna helada',
            'weather.cond.rain': 'Lluvia',
            'weather.cond.freezingRain': 'Lluvia helada',
            'weather.cond.snow': 'Nieve',
            'weather.cond.snowGrains': 'Nieve granulada',
            'weather.cond.rainShowers': 'Chubascos',
            'weather.cond.snowShowers': 'Chubascos de nieve',
            'weather.cond.thunderstorm': 'Tormenta',
            'weather.cond.thunderstormHail': 'Tormenta con granizo',
            'weather.cond.unknown': 'Condiciones desconocidas'
        });
        I18N.registerLang('de', {
            'app.weather': 'Wetter',
            'weather.searchPlaceholder': 'Stadt suchen...',
            'weather.useLocation': 'Mein Standort',
            'weather.locating': 'Orten…',
            'weather.loading': 'Wird geladen…',
            'weather.notFound': 'Keine Stadt gefunden',
            'weather.searchError': 'Suche nicht verfügbar',
            'weather.locationError': 'Standort nicht verfügbar',
            'weather.error': 'Wetter konnte nicht geladen werden',
            'weather.retry': 'Erneut versuchen',
            'weather.feelsLike': 'Gefühlt',
            'weather.humidity': 'Luftfeuchtigkeit',
            'weather.wind': 'Wind',
            'weather.forecast': '5-Tage-Vorhersage',
            'weather.updated': 'Aktualisiert um {time}',
            'weather.today': 'Heute',
            'weather.cond.clear': 'Klarer Himmel',
            'weather.cond.mainlyClear': 'Überwiegend klar',
            'weather.cond.partlyCloudy': 'Teilweise bewölkt',
            'weather.cond.overcast': 'Bedeckt',
            'weather.cond.fog': 'Nebel',
            'weather.cond.drizzle': 'Nieselregen',
            'weather.cond.freezingDrizzle': 'Gefrierender Nieselregen',
            'weather.cond.rain': 'Regen',
            'weather.cond.freezingRain': 'Gefrierender Regen',
            'weather.cond.snow': 'Schnee',
            'weather.cond.snowGrains': 'Schneegriesel',
            'weather.cond.rainShowers': 'Regenschauer',
            'weather.cond.snowShowers': 'Schneeschauer',
            'weather.cond.thunderstorm': 'Gewitter',
            'weather.cond.thunderstormHail': 'Gewitter mit Hagel',
            'weather.cond.unknown': 'Unbekannte Bedingungen'
        });

        // ---- Table des codes météo WMO -> {groupe visuel, clé de traduction} ----
        const WEATHER_CODES = {
            0:  { group: 'clear',    key: 'weather.cond.clear' },
            1:  { group: 'clear',    key: 'weather.cond.mainlyClear' },
            2:  { group: 'cloudy',   key: 'weather.cond.partlyCloudy' },
            3:  { group: 'cloudy',   key: 'weather.cond.overcast' },
            45: { group: 'fog',      key: 'weather.cond.fog' },
            48: { group: 'fog',      key: 'weather.cond.fog' },
            51: { group: 'rain',     key: 'weather.cond.drizzle' },
            53: { group: 'rain',     key: 'weather.cond.drizzle' },
            55: { group: 'rain',     key: 'weather.cond.drizzle' },
            56: { group: 'rain',     key: 'weather.cond.freezingDrizzle' },
            57: { group: 'rain',     key: 'weather.cond.freezingDrizzle' },
            61: { group: 'rain',     key: 'weather.cond.rain' },
            63: { group: 'rain',     key: 'weather.cond.rain' },
            65: { group: 'rain',     key: 'weather.cond.rain' },
            66: { group: 'rain',     key: 'weather.cond.freezingRain' },
            67: { group: 'rain',     key: 'weather.cond.freezingRain' },
            71: { group: 'snow',     key: 'weather.cond.snow' },
            73: { group: 'snow',     key: 'weather.cond.snow' },
            75: { group: 'snow',     key: 'weather.cond.snow' },
            77: { group: 'snow',     key: 'weather.cond.snowGrains' },
            80: { group: 'rain',     key: 'weather.cond.rainShowers' },
            81: { group: 'rain',     key: 'weather.cond.rainShowers' },
            82: { group: 'rain',     key: 'weather.cond.rainShowers' },
            85: { group: 'snow',     key: 'weather.cond.snowShowers' },
            86: { group: 'snow',     key: 'weather.cond.snowShowers' },
            95: { group: 'thunder',  key: 'weather.cond.thunderstorm' },
            96: { group: 'thunder',  key: 'weather.cond.thunderstormHail' },
            99: { group: 'thunder',  key: 'weather.cond.thunderstormHail' }
        };
        function wxInfo(code) { return WEATHER_CODES[code] || { group: 'cloudy', key: 'weather.cond.unknown' }; }

        const WEATHER_STYLE = `
            .wx-wrap { display:flex; flex-direction:column; height:100%; color:var(--text-primary); }
            .wx-search-row { display:flex; gap:8px; padding:14px 16px 10px; }
            .wx-search-row input { flex:1; background:var(--surface,var(--bg-window)); color:var(--text-primary); border:1px solid var(--border-color); border-radius:8px; padding:9px 12px; font-family:inherit; font-size:13px; }
            .wx-locate-btn { background:var(--surface,var(--bg-window)); border:1px solid var(--border-color); color:var(--text-primary); border-radius:8px; width:38px; flex:0 0 38px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .15s; }
            .wx-locate-btn:hover { background:var(--accent); color:#fff; border-color:var(--accent); }
            .wx-locate-btn svg { width:17px; height:17px; }
            .wx-suggest { margin:0 16px; background:var(--surface,var(--bg-window)); border:1px solid var(--border-color); border-radius:8px; overflow:hidden; display:none; position:relative; z-index:5; }
            .wx-suggest.open { display:block; }
            .wx-suggest-item { padding:9px 12px; font-size:13px; cursor:pointer; border-bottom:1px solid var(--border-color); }
            .wx-suggest-item:last-child { border-bottom:none; }
            .wx-suggest-item:hover { background:hsla(var(--hue), 60%, 55%, 0.18); }
            .wx-suggest-item small { color:var(--text-secondary); }
            .wx-body { flex:1; overflow-y:auto; padding:6px 16px 18px; display:flex; flex-direction:column; gap:18px; }
            .wx-hero { display:flex; flex-direction:column; align-items:center; text-align:center; padding-top:6px; }
            .wx-hero-canvas-wrap { width:130px; height:130px; }
            .wx-city { font-size:16px; font-weight:600; margin-top:4px; }
            .wx-city small { display:block; font-size:11px; font-weight:400; color:var(--text-secondary); margin-top:2px; }
            .wx-temp { font-size:56px; font-weight:300; line-height:1; margin-top:2px; letter-spacing:-1px; }
            .wx-cond { color:var(--text-secondary); font-size:13px; margin-top:2px; }
            .wx-meta-row { display:flex; justify-content:center; gap:22px; margin-top:14px; }
            .wx-meta { text-align:center; }
            .wx-meta .lbl { font-size:10.5px; color:var(--text-secondary); text-transform:uppercase; letter-spacing:.04em; }
            .wx-meta .val { font-size:14px; margin-top:3px; font-weight:600; }
            .wx-updated { font-size:10.5px; color:var(--text-secondary); margin-top:12px; }
            .wx-forecast-title { font-size:11.5px; color:var(--text-secondary); text-transform:uppercase; letter-spacing:.05em; margin-bottom:2px; }
            .wx-forecast { display:flex; gap:8px; }
            .wx-fday { flex:1; background:var(--surface,var(--bg-window)); border:1px solid var(--border-color); border-radius:10px; padding:10px 4px 12px; display:flex; flex-direction:column; align-items:center; gap:4px; }
            .wx-fday .fname { font-size:11px; color:var(--text-secondary); text-transform:capitalize; }
            .wx-fday canvas { width:34px; height:34px; }
            .wx-fday .fmax { font-size:13px; font-weight:600; }
            .wx-fday .fmin { font-size:11px; color:var(--text-secondary); }
            .wx-state { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:var(--text-secondary); font-size:13px; text-align:center; padding:20px; }
            .wx-state svg { width:34px; height:34px; opacity:.5; }
            .wx-retry-btn { background:var(--accent); color:#fff; border:none; border-radius:7px; padding:7px 16px; font-size:12.5px; cursor:pointer; }
            .wx-spinner { width:22px; height:22px; border-radius:50%; border:2.5px solid hsla(var(--hue),40%,60%,.25); border-top-color:var(--accent); animation:wx-spin .8s linear infinite; }
            @keyframes wx-spin { to { transform:rotate(360deg); } }
        `;

        // ---- Rendu procédural d'une scène météo dans un canvas (soleil / lune /
        // nuages / pluie / neige / orage), teintée via --hue comme le reste de l'OS.
        function drawWeatherScene(ctx, w, h, t, group, isDay, hue) {
            ctx.clearRect(0, 0, w, h);
            const cx = w / 2, cy = h / 2;

            function cloud(x, y, s, alpha) {
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = `hsl(${hue}, 12%, ${isDay ? 82 : 62}%)`;
                ctx.beginPath();
                ctx.ellipse(x, y, s * 0.55, s * 0.34, 0, 0, Math.PI * 2);
                ctx.ellipse(x - s * 0.42, y + s * 0.06, s * 0.34, s * 0.26, 0, 0, Math.PI * 2);
                ctx.ellipse(x + s * 0.46, y + s * 0.08, s * 0.38, s * 0.28, 0, 0, Math.PI * 2);
                ctx.ellipse(x + s * 0.05, y - s * 0.14, s * 0.4, s * 0.3, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            if (isDay && (group === 'clear' || group === 'cloudy')) {
                const sunR = w * 0.16;
                const pulse = 1 + Math.sin(t * 1.4) * 0.04;
                const grad = ctx.createRadialGradient(cx, cy * 0.85, 0, cx, cy * 0.85, sunR * 2.6);
                grad.addColorStop(0, `hsla(${hue + 20}, 90%, 65%, 0.55)`);
                grad.addColorStop(1, `hsla(${hue + 20}, 90%, 65%, 0)`);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
                ctx.save();
                ctx.translate(cx, cy * 0.85);
                ctx.rotate(t * 0.15);
                ctx.strokeStyle = `hsl(${hue + 20}, 85%, 65%)`;
                ctx.lineWidth = 2.4; ctx.lineCap = 'round';
                for (let i = 0; i < 8; i++) {
                    const a = (i / 8) * Math.PI * 2;
                    const r1 = sunR * pulse * 1.25, r2 = sunR * pulse * 1.55;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
                    ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
                    ctx.stroke();
                }
                ctx.restore();
                ctx.beginPath();
                ctx.arc(cx, cy * 0.85, sunR * pulse, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${hue + 25}, 90%, 62%)`;
                ctx.fill();
            } else if (!isDay && (group === 'clear' || group === 'cloudy')) {
                for (let i = 0; i < 16; i++) {
                    const sx = (Math.sin(i * 12.9898) * 43758.5453 % 1 + 1) % 1 * w;
                    const sy = (Math.sin(i * 78.233) * 12345.678 % 1 + 1) % 1 * h * 0.7;
                    const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + i * 2));
                    ctx.globalAlpha = tw;
                    ctx.fillStyle = '#fff';
                    ctx.beginPath(); ctx.arc(sx, sy, 1.2, 0, Math.PI * 2); ctx.fill();
                }
                ctx.globalAlpha = 1;
                const moonR = w * 0.15;
                ctx.beginPath();
                ctx.arc(cx, cy * 0.85, moonR, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${hue + 10}, 20%, 82%)`;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(cx + moonR * 0.5, cy * 0.85 - moonR * 0.25, moonR * 0.85, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${hue + 10}, 15%, ${isDay ? 90 : 15}%)`;
                ctx.globalCompositeOperation = 'destination-out';
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            }

            if (group === 'cloudy' || group === 'rain' || group === 'snow' || group === 'thunder') {
                const drift = Math.sin(t * 0.35) * w * 0.05;
                cloud(cx - w * 0.06 + drift, cy * 0.95, w * 0.62, group === 'thunder' ? 0.95 : 0.9);
                if (group !== 'cloudy') cloud(cx + w * 0.18 - drift * 0.6, cy * 0.72, w * 0.4, 0.55);
            }

            if (group === 'fog') {
                for (let i = 0; i < 4; i++) {
                    const yy = h * (0.35 + i * 0.15) + Math.sin(t * 0.6 + i) * 4;
                    ctx.globalAlpha = 0.35 - i * 0.05;
                    ctx.fillStyle = `hsl(${hue}, 10%, 75%)`;
                    ctx.beginPath();
                    ctx.roundRect ? ctx.roundRect(w * 0.08, yy, w * 0.84, h * 0.09, 20) : ctx.rect(w * 0.08, yy, w * 0.84, h * 0.09);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            }

            if (group === 'rain') {
                ctx.strokeStyle = `hsl(${hue + 200}, 70%, 65%)`;
                ctx.lineWidth = 1.6; ctx.lineCap = 'round';
                for (let i = 0; i < 14; i++) {
                    const bx = (i * 37.13) % w;
                    const speed = 3.2 + (i % 3) * 0.7;
                    const by = ((t * 60 * speed + i * 23) % (h + 20)) - 10;
                    ctx.globalAlpha = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(bx, by);
                    ctx.lineTo(bx - 3, by + 9);
                    ctx.stroke();
                }
                ctx.globalAlpha = 1;
            }

            if (group === 'snow') {
                ctx.fillStyle = '#fff';
                for (let i = 0; i < 16; i++) {
                    const bx = (i * 29.7) % w + Math.sin(t * 1.2 + i) * 5;
                    const speed = 0.7 + (i % 4) * 0.25;
                    const by = ((t * 30 * speed + i * 17) % (h + 12)) - 6;
                    ctx.globalAlpha = 0.85;
                    ctx.beginPath();
                    ctx.arc(bx, by, 1.6 + (i % 3) * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            }

            if (group === 'thunder') {
                const flashPhase = (t * 0.7) % 3.2;
                if (flashPhase < 0.12) {
                    ctx.globalAlpha = (0.12 - flashPhase) / 0.12 * 0.5;
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(0, 0, w, h);
                    ctx.globalAlpha = 1;
                    ctx.strokeStyle = `hsl(${hue + 40}, 90%, 75%)`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(cx - 4, cy * 0.9);
                    ctx.lineTo(cx + 6, cy * 1.05);
                    ctx.lineTo(cx - 2, cy * 1.1);
                    ctx.lineTo(cx + 8, cy * 1.35);
                    ctx.stroke();
                }
            }
        }

        function fmtTemp(v) { return (v === null || v === undefined || isNaN(v)) ? '--' : Math.round(v) + '°'; }

        OS.registry.register({
            id: 'sys-weather', name: I18N.t('app.weather'), nameKey: 'app.weather', icon: WEATHER_ICON,
            defaultWidth: 400, defaultHeight: 610, resizable: false, maximizable: false, singleton: true,
            init: (c, api) => {
                if (!document.getElementById('wx-inline-style')) {
                    const styleEl = document.createElement('style');
                    styleEl.id = 'wx-inline-style';
                    styleEl.textContent = WEATHER_STYLE;
                    document.head.appendChild(styleEl);
                }

                c.innerHTML = `
                <div class="wx-wrap">
                    <div class="wx-search-row">
                        <input type="text" id="wx-search" autocomplete="off">
                        <button class="wx-locate-btn" id="wx-locate" type="button">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>
                        </button>
                    </div>
                    <div class="wx-suggest" id="wx-suggest"></div>
                    <div class="wx-body" id="wx-body"></div>
                </div>`;

                const searchInput = c.querySelector('#wx-search');
                const suggestBox = c.querySelector('#wx-suggest');
                const locateBtn = c.querySelector('#wx-locate');
                const body = c.querySelector('#wx-body');

                let heroAnimId = null;
                let heroDrawState = null;
                let searchDebounce = null;
                let currentData = null;
                let currentLoc = null;

                function loadLastLoc() {
                    try { return JSON.parse(localStorage.getItem('webosx_weather_loc')); } catch (e) { return null; }
                }
                function saveLastLoc(loc) {
                    try { localStorage.setItem('webosx_weather_loc', JSON.stringify(loc)); } catch (e) {}
                }

                function stopHeroAnim() { if (heroAnimId) { cancelAnimationFrame(heroAnimId); heroAnimId = null; } }

                function renderState(kind, msg) {
                    stopHeroAnim();
                    if (kind === 'loading') {
                        body.innerHTML = `<div class="wx-state"><div class="wx-spinner"></div><div>${msg}</div></div>`;
                    } else {
                        body.innerHTML = `
                        <div class="wx-state">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16.3" r="1" fill="currentColor" stroke="none"/></svg>
                            <div>${msg}</div>
                            <button class="wx-retry-btn" id="wx-retry">${I18N.t('weather.retry')}</button>
                        </div>`;
                        const retryBtn = body.querySelector('#wx-retry');
                        if (retryBtn) retryBtn.onclick = () => { if (currentLoc) fetchWeather(currentLoc); };
                    }
                }

                function getHue() {
                    const v = getComputedStyle(document.documentElement).getPropertyValue('--hue').trim();
                    const p = parseFloat(v);
                    return Number.isNaN(p) ? 210 : p;
                }

                function renderWeather(loc, data) {
                    stopHeroAnim();
                    currentData = data; currentLoc = loc;
                    const cur = data.current;
                    const info = wxInfo(cur.weather_code);
                    const isDay = cur.is_day === 1;
                    const daily = data.daily;

                    let forecastHtml = '';
                    for (let i = 0; i < Math.min(5, daily.time.length); i++) {
                        const d = new Date(daily.time[i] + 'T12:00:00');
                        const dname = i === 0 ? I18N.t('weather.today') : d.toLocaleDateString(I18N.locale(), { weekday: 'short' });
                        forecastHtml += `
                        <div class="wx-fday">
                            <div class="fname">${dname}</div>
                            <canvas class="wx-fcanvas" data-code="${daily.weather_code[i]}" width="68" height="68"></canvas>
                            <div class="fmax">${fmtTemp(daily.temperature_2m_max[i])}</div>
                            <div class="fmin">${fmtTemp(daily.temperature_2m_min[i])}</div>
                        </div>`;
                    }

                    const now = new Date();
                    const timeStr = now.toLocaleTimeString(I18N.locale(), { hour: '2-digit', minute: '2-digit' });

                    body.innerHTML = `
                    <div class="wx-hero">
                        <div class="wx-hero-canvas-wrap"><canvas id="wx-hero-canvas" width="130" height="130"></canvas></div>
                        <div class="wx-city">${escHtml(loc.name)}<small>${escHtml(loc.country || '')}</small></div>
                        <div class="wx-temp">${fmtTemp(cur.temperature_2m)}</div>
                        <div class="wx-cond">${I18N.t(info.key)}</div>
                        <div class="wx-meta-row">
                            <div class="wx-meta"><div class="lbl">${I18N.t('weather.feelsLike')}</div><div class="val">${fmtTemp(cur.apparent_temperature)}</div></div>
                            <div class="wx-meta"><div class="lbl">${I18N.t('weather.humidity')}</div><div class="val">${Math.round(cur.relative_humidity_2m)}%</div></div>
                            <div class="wx-meta"><div class="lbl">${I18N.t('weather.wind')}</div><div class="val">${Math.round(cur.wind_speed_10m)} km/h</div></div>
                        </div>
                        <div class="wx-updated">${I18N.t('weather.updated', { time: timeStr })}</div>
                    </div>
                    <div>
                        <div class="wx-forecast-title">${I18N.t('weather.forecast')}</div>
                        <div class="wx-forecast">${forecastHtml}</div>
                    </div>`;

                    // Icônes des jours (statiques, une seule frame)
                    body.querySelectorAll('.wx-fcanvas').forEach(cv => {
                        const ictx = cv.getContext('2d');
                        const fi = wxInfo(parseInt(cv.dataset.code));
                        drawWeatherScene(ictx, 68, 68, 0.6, fi.group, true, getHue());
                    });

                    // Icône héro animée
                    const heroCanvas = body.querySelector('#wx-hero-canvas');
                    const hctx = heroCanvas.getContext('2d');
                    let start = null;
                    function heroFrame(ts) {
                        if (!start) start = ts;
                        const t = (ts - start) / 1000;
                        drawWeatherScene(hctx, 130, 130, t, info.group, isDay, getHue());
                        heroAnimId = requestAnimationFrame(heroFrame);
                    }
                    heroAnimId = requestAnimationFrame(heroFrame);
                }

                function fetchWeather(loc) {
                    renderState('loading', I18N.t('weather.loading'));
                    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=6`;
                    fetch(url).then(r => { if (!r.ok) throw new Error('http'); return r.json(); })
                        .then(data => { saveLastLoc(loc); renderWeather(loc, data); })
                        .catch(() => renderState('error', I18N.t('weather.error')));
                }

                function geocodeSearch(q) {
                    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=${I18N.current}&format=json`;
                    return fetch(url).then(r => r.json()).then(d => d.results || []);
                }

                function showSuggestions(results) {
                    if (!results.length) {
                        suggestBox.innerHTML = `<div class="wx-suggest-item">${I18N.t('weather.notFound')}</div>`;
                        suggestBox.classList.add('open');
                        return;
                    }
                    suggestBox.innerHTML = results.map((r, i) =>
                        `<div class="wx-suggest-item" data-idx="${i}">${escHtml(r.name)}${r.admin1 ? ', ' + escHtml(r.admin1) : ''} <small>${escHtml(r.country || '')}</small></div>`
                    ).join('');
                    suggestBox.classList.add('open');
                    suggestBox.querySelectorAll('.wx-suggest-item').forEach(item => {
                        item.onclick = () => {
                            const r = results[parseInt(item.dataset.idx)];
                            if (!r) return;
                            suggestBox.classList.remove('open');
                            searchInput.value = '';
                            fetchWeather({ lat: r.latitude, lon: r.longitude, name: r.name, country: r.country });
                        };
                    });
                }

                searchInput.oninput = () => {
                    const q = searchInput.value.trim();
                    clearTimeout(searchDebounce);
                    if (q.length < 2) { suggestBox.classList.remove('open'); return; }
                    searchDebounce = setTimeout(() => {
                        geocodeSearch(q).then(showSuggestions).catch(() => {
                            suggestBox.innerHTML = `<div class="wx-suggest-item">${I18N.t('weather.searchError')}</div>`;
                            suggestBox.classList.add('open');
                        });
                    }, 400);
                };
                searchInput.onfocus = () => { if (suggestBox.innerHTML) suggestBox.classList.add('open'); };
                c.addEventListener('pointerdown', (e) => {
                    if (!suggestBox.contains(e.target) && e.target !== searchInput) suggestBox.classList.remove('open');
                });

                function useMyLocation() {
                    if (!navigator.geolocation) { renderState('error', I18N.t('weather.locationError')); return; }
                    renderState('loading', I18N.t('weather.locating'));
                    navigator.geolocation.getCurrentPosition((pos) => {
                        const lat = pos.coords.latitude, lon = pos.coords.longitude;
                        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${I18N.current}`)
                            .then(r => r.json()).catch(() => ({}))
                            .then(rg => {
                                const name = (rg && (rg.city || rg.locality)) || I18N.t('weather.useLocation');
                                const country = (rg && rg.countryName) || '';
                                fetchWeather({ lat, lon, name, country });
                            });
                    }, () => renderState('error', I18N.t('weather.locationError')), { timeout: 8000 });
                }
                locateBtn.onclick = useMyLocation;

                function relocalize() {
                    searchInput.placeholder = I18N.t('weather.searchPlaceholder');
                    if (currentLoc && currentData) renderWeather(currentLoc, currentData);
                }
                window.addEventListener('webosx:langchange', relocalize);
                relocalize();

                // ---- Démarrage : dernière position connue, sinon géoloc, sinon Paris ----
                const last = loadLastLoc();
                if (last && last.lat != null) {
                    fetchWeather(last);
                } else if (navigator.geolocation) {
                    useMyLocation();
                } else {
                    fetchWeather({ lat: 48.8566, lon: 2.3522, name: 'Paris', country: 'France' });
                }

                const origClose = api.close;
                api.close = () => {
                    stopHeroAnim();
                    window.removeEventListener('webosx:langchange', relocalize);
                    origClose();
                };
            }
        });
