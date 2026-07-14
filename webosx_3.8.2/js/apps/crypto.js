        // ==================================================================
        // APP : Crypto Tracker — Top 25/50/100 cryptomonnaies (prix, variation
        // 24h, capitalisation, volume, mini-graphiques 24h & 7 jours), rafraîchi
        // toutes les 60 secondes. Source de données : API publique CoinGecko
        // (endpoint /coins/markets, sans clé requise).
        //
        // Astuce technique : CoinGecko renvoie sparkline_in_7d.price = 168 points
        // horaires (7 jours x 24h). Les 24 derniers points de ce même tableau
        // donnent donc gratuitement un graphique "24 dernières heures", sans
        // appel API supplémentaire par pièce.
        //
        // Traductions propres à l'app (auto-suffisantes, n'impactent pas
        // js/core/lang/*.js), même convention que calculator.js.
        // ==================================================================
        I18N.registerLang('fr', {
            'app.crypto': 'Crypto',
            'crypto.search': 'Rechercher une crypto...',
            'crypto.col.rank': '#',
            'crypto.col.name': 'Nom',
            'crypto.col.price': 'Prix',
            'crypto.col.change': 'Var. 24h',
            'crypto.col.cap': 'Cap. marché',
            'crypto.col.vol': 'Volume 24h',
            'crypto.col.chart24h': 'Graph 24h',
            'crypto.col.chart7d': 'Graph 7j',
            'crypto.limit.label': 'Top :',
            'crypto.updated': 'Mis à jour à {time}',
            'crypto.nextRefresh': 'Actualisation dans {s}s',
            'crypto.refreshing': 'Actualisation...',
            'crypto.refreshNow': 'Actualiser',
            'crypto.loading': 'Chargement des cours...',
            'crypto.error': 'Impossible de récupérer les cours.',
            'crypto.retry': 'Réessayer',
            'crypto.stale': 'Dernières données connues (échec du dernier rafraîchissement)',
            'crypto.empty': 'Aucun résultat',
            'crypto.summary.cap': 'Cap. totale (top {n})',
            'crypto.summary.up': 'En hausse',
            'crypto.summary.down': 'En baisse'
        });
        I18N.registerLang('en', {
            'app.crypto': 'Crypto',
            'crypto.search': 'Search a coin...',
            'crypto.col.rank': '#',
            'crypto.col.name': 'Name',
            'crypto.col.price': 'Price',
            'crypto.col.change': '24h %',
            'crypto.col.cap': 'Market Cap',
            'crypto.col.vol': '24h Volume',
            'crypto.col.chart24h': '24h Chart',
            'crypto.col.chart7d': '7d Chart',
            'crypto.limit.label': 'Top:',
            'crypto.updated': 'Updated at {time}',
            'crypto.nextRefresh': 'Refreshing in {s}s',
            'crypto.refreshing': 'Refreshing...',
            'crypto.refreshNow': 'Refresh',
            'crypto.loading': 'Loading prices...',
            'crypto.error': 'Could not fetch prices.',
            'crypto.retry': 'Retry',
            'crypto.stale': 'Last known data (last refresh failed)',
            'crypto.empty': 'No results',
            'crypto.summary.cap': 'Total cap (top {n})',
            'crypto.summary.up': 'Gainers',
            'crypto.summary.down': 'Losers'
        });
        I18N.registerLang('es', {
            'app.crypto': 'Cripto',
            'crypto.search': 'Buscar una cripto...',
            'crypto.col.rank': '#',
            'crypto.col.name': 'Nombre',
            'crypto.col.price': 'Precio',
            'crypto.col.change': 'Var. 24h',
            'crypto.col.cap': 'Cap. de mercado',
            'crypto.col.vol': 'Volumen 24h',
            'crypto.col.chart24h': 'Gráfico 24h',
            'crypto.col.chart7d': 'Gráfico 7d',
            'crypto.limit.label': 'Top:',
            'crypto.updated': 'Actualizado a las {time}',
            'crypto.nextRefresh': 'Actualización en {s}s',
            'crypto.refreshing': 'Actualizando...',
            'crypto.refreshNow': 'Actualizar',
            'crypto.loading': 'Cargando precios...',
            'crypto.error': 'No se pudieron obtener los precios.',
            'crypto.retry': 'Reintentar',
            'crypto.stale': 'Últimos datos conocidos (falló la última actualización)',
            'crypto.empty': 'Sin resultados',
            'crypto.summary.cap': 'Cap. total (top {n})',
            'crypto.summary.up': 'En alza',
            'crypto.summary.down': 'En baja'
        });
        I18N.registerLang('de', {
            'app.crypto': 'Krypto',
            'crypto.search': 'Coin suchen...',
            'crypto.col.rank': '#',
            'crypto.col.name': 'Name',
            'crypto.col.price': 'Preis',
            'crypto.col.change': '24h Änd.',
            'crypto.col.cap': 'Marktkap.',
            'crypto.col.vol': '24h Volumen',
            'crypto.col.chart24h': '24h-Chart',
            'crypto.col.chart7d': '7T-Chart',
            'crypto.limit.label': 'Top:',
            'crypto.updated': 'Aktualisiert um {time}',
            'crypto.nextRefresh': 'Aktualisierung in {s}s',
            'crypto.refreshing': 'Aktualisiere...',
            'crypto.refreshNow': 'Aktualisieren',
            'crypto.loading': 'Kurse werden geladen...',
            'crypto.error': 'Kurse konnten nicht geladen werden.',
            'crypto.retry': 'Erneut versuchen',
            'crypto.stale': 'Letzte bekannte Daten (letzte Aktualisierung fehlgeschlagen)',
            'crypto.empty': 'Keine Ergebnisse',
            'crypto.summary.cap': 'Gesamtkap. (Top {n})',
            'crypto.summary.up': 'Im Plus',
            'crypto.summary.down': 'Im Minus'
        });
        I18N.registerLang('it', {
            'app.crypto': 'Crypto',
            'crypto.search': 'Cerca una moneta...',
            'crypto.col.rank': '#',
            'crypto.col.name': 'Nome',
            'crypto.col.price': 'Prezzo',
            'crypto.col.change': 'Var. 24h',
            'crypto.col.cap': 'Cap. di mercato',
            'crypto.col.vol': 'Volume 24h',
            'crypto.col.chart24h': 'Grafico 24h',
            'crypto.col.chart7d': 'Grafico 7g',
            'crypto.limit.label': 'Top:',
            'crypto.updated': 'Aggiornato alle {time}',
            'crypto.nextRefresh': 'Aggiornamento tra {s}s',
            'crypto.refreshing': 'Aggiornamento...',
            'crypto.refreshNow': 'Aggiorna',
            'crypto.loading': 'Caricamento prezzi...',
            'crypto.error': 'Impossibile recuperare i prezzi.',
            'crypto.retry': 'Riprova',
            'crypto.stale': 'Ultimi dati noti (ultimo aggiornamento non riuscito)',
            'crypto.empty': 'Nessun risultato',
            'crypto.summary.cap': 'Cap. totale (top {n})',
            'crypto.summary.up': 'In rialzo',
            'crypto.summary.down': 'In ribasso'
        });
        I18N.registerLang('pt', {
            'app.crypto': 'Cripto',
            'crypto.search': 'Pesquisar uma moeda...',
            'crypto.col.rank': '#',
            'crypto.col.name': 'Nome',
            'crypto.col.price': 'Preço',
            'crypto.col.change': 'Var. 24h',
            'crypto.col.cap': 'Cap. de mercado',
            'crypto.col.vol': 'Volume 24h',
            'crypto.col.chart24h': 'Gráfico 24h',
            'crypto.col.chart7d': 'Gráfico 7d',
            'crypto.limit.label': 'Top:',
            'crypto.updated': 'Atualizado às {time}',
            'crypto.nextRefresh': 'A atualizar em {s}s',
            'crypto.refreshing': 'A atualizar...',
            'crypto.refreshNow': 'Atualizar',
            'crypto.loading': 'A carregar preços...',
            'crypto.error': 'Não foi possível obter os preços.',
            'crypto.retry': 'Tentar novamente',
            'crypto.stale': 'Últimos dados conhecidos (última atualização falhou)',
            'crypto.empty': 'Sem resultados',
            'crypto.summary.cap': 'Cap. total (top {n})',
            'crypto.summary.up': 'Em alta',
            'crypto.summary.down': 'Em baixa'
        });

        // Icône façon "pièce" (dans le même style trait/stroke que ICONS.*)
        const CRYPTO_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 8.5h3.2a2 2 0 0 1 0 4H9.5m0-4v8m0-4h3.6a2 2 0 0 1 0 4H9.5m0-8V7m0 9.5V18"/></svg>`;

        const CRYPTO_REFRESH_MS = 60000;
        const CRYPTO_LIMITS = [25, 50, 100];
        // Persiste le choix "Top N" tant que la page reste ouverte (partagé entre
        // fermeture/réouverture de la fenêtre, remis à 50 seulement au rechargement).
        let cryptoLimit = 50;

        function cryptoApiUrl(limit) {
            return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h,7d`;
        }

        // Injecte les styles une seule fois (partagés par toutes les fenêtres Crypto ouvertes)
        function ensureCryptoStyles() {
            if (document.getElementById('crypto-app-styles')) return;
            const style = document.createElement('style');
            style.id = 'crypto-app-styles';
            style.textContent = `
.crypto-app { display:flex; flex-direction:column; height:100%; font-size:13px; }
.crypto-toolbar { display:flex; align-items:center; gap:10px; padding:12px 14px; border-bottom:1px solid var(--border-color); flex-shrink:0; flex-wrap:wrap; }
.crypto-search-wrap { display:flex; align-items:center; gap:6px; flex:1; min-width:140px; background:var(--bg-window); border:1px solid var(--border-color); border-radius:6px; padding:0 10px; transition:border-color .15s; }
.crypto-search-wrap:focus-within { border-color:var(--accent); }
.crypto-search-wrap svg { flex-shrink:0; width:14px; height:14px; color:var(--text-secondary); }
.crypto-search { flex:1; min-width:0; background:transparent; color:var(--text-primary); border:none; padding:7px 0; font-family:inherit; font-size:12.5px; outline:none; }
.crypto-limit-wrap { display:flex; align-items:center; gap:6px; flex-shrink:0; }
.crypto-limit-wrap .lbl { font-size:11.5px; color:var(--text-secondary); white-space:nowrap; }
.crypto-limit-select { background:var(--bg-window); color:var(--text-primary); border:1px solid var(--border-color); border-radius:6px; padding:6px 8px; font-family:inherit; font-size:12px; cursor:pointer; outline:none; }
.crypto-limit-select:hover { border-color:var(--accent); }
.crypto-refresh-btn { display:flex; align-items:center; gap:6px; background:transparent; color:var(--text-primary); border:1px solid var(--border-color); border-radius:6px; padding:7px 12px; font-family:inherit; font-size:12px; cursor:pointer; white-space:nowrap; transition:background .15s,border-color .15s; flex-shrink:0; }
.crypto-refresh-btn:hover { border-color:var(--accent); }
.crypto-refresh-btn svg { width:14px; height:14px; transition:transform .5s ease; }
.crypto-refresh-btn.spinning svg { animation:crypto-spin 0.8s linear infinite; }
@keyframes crypto-spin { to { transform:rotate(360deg); } }
.crypto-status-row { display:flex; justify-content:space-between; align-items:center; padding:6px 14px; font-size:10.5px; color:var(--text-secondary); flex-shrink:0; }
.crypto-status-row .crypto-stale { color:#e0a030; }
.crypto-summary { display:flex; gap:10px; padding:0 14px 10px; flex-shrink:0; flex-wrap:wrap; }
.crypto-summary-chip { flex:1; min-width:130px; background:var(--bg-window); border:1px solid var(--border-color); border-radius:8px; padding:8px 12px; }
.crypto-summary-chip .lbl { font-size:10px; color:var(--text-secondary); text-transform:uppercase; letter-spacing:.4px; }
.crypto-summary-chip .val { font-size:15px; font-weight:600; margin-top:2px; color:var(--text-primary); }
.crypto-summary-chip .val.up { color:var(--crypto-up,#33cc7a); }
.crypto-summary-chip .val.down { color:var(--crypto-down,#e85454); }
.crypto-list-wrap { flex:1; overflow-y:auto; overflow-x:hidden; position:relative; }
.crypto-head, .crypto-row { display:grid; grid-template-columns: 34px minmax(0,1.5fr) 96px 82px 92px 92px 92px 92px; align-items:center; gap:8px; padding:0 14px; }
.crypto-app.compact .crypto-head, .crypto-app.compact .crypto-row { grid-template-columns: 30px minmax(0,1.6fr) 90px 72px; }
.crypto-app.compact .col-cap, .crypto-app.compact .col-vol, .crypto-app.compact .col-chart24h, .crypto-app.compact .col-chart7d,
.crypto-app.compact .crypto-cap, .crypto-app.compact .crypto-vol, .crypto-app.compact .crypto-spark-cell { display:none !important; }
.crypto-head { position:sticky; top:0; z-index:2; background:var(--bg-window); border-bottom:1px solid var(--border-color); padding-top:8px; padding-bottom:8px; font-size:10.5px; color:var(--text-secondary); text-transform:uppercase; letter-spacing:.4px; }
.crypto-head span { cursor:pointer; user-select:none; display:flex; align-items:center; gap:3px; transition:color .15s; }
.crypto-head span:hover { color:var(--text-primary); }
.crypto-head span.sorted { color:var(--accent); }
.crypto-head span .sort-arrow { font-size:9px; opacity:.8; }
.crypto-row { height:56px; border-bottom:1px solid rgba(128,128,128,0.08); opacity:0; transform:translateY(6px); animation:crypto-row-in .35s ease forwards; animation-delay:calc(var(--i, 0) * 12ms); transition:background .15s; }
.crypto-row:hover { background:rgba(128,128,128,0.06); }
@keyframes crypto-row-in { to { opacity:1; transform:translateY(0); } }
.crypto-rank { font-size:11.5px; color:var(--text-secondary); font-variant-numeric:tabular-nums; }
.crypto-name-cell { display:flex; align-items:center; gap:9px; min-width:0; }
.crypto-icon { width:26px; height:26px; border-radius:50%; flex-shrink:0; background:rgba(128,128,128,0.15); }
.crypto-name-text { display:flex; flex-direction:column; min-width:0; }
.crypto-name { font-size:12.5px; font-weight:600; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.crypto-symbol { font-size:10.5px; color:var(--text-secondary); }
.crypto-price { font-variant-numeric:tabular-nums; font-weight:600; color:var(--text-primary); border-radius:4px; padding:2px 5px; margin:-2px -5px; }
.crypto-price.flash-up { animation:crypto-flash-up 1.1s ease; }
.crypto-price.flash-down { animation:crypto-flash-down 1.1s ease; }
@keyframes crypto-flash-up { 0%{background:rgba(51,204,122,0.35);} 100%{background:rgba(51,204,122,0);} }
@keyframes crypto-flash-down { 0%{background:rgba(232,84,84,0.35);} 100%{background:rgba(232,84,84,0);} }
.crypto-change { display:inline-flex; align-items:center; gap:2px; font-size:11.5px; font-weight:600; font-variant-numeric:tabular-nums; padding:3px 7px; border-radius:5px; width:fit-content; }
.crypto-change svg { width:10px; height:10px; }
.crypto-change.up { color:var(--crypto-up,#33cc7a); background:rgba(51,204,122,0.12); }
.crypto-change.down { color:var(--crypto-down,#e85454); background:rgba(232,84,84,0.12); }
.crypto-cap, .crypto-vol { font-size:11.5px; color:var(--text-secondary); font-variant-numeric:tabular-nums; }
.crypto-spark-cell { display:flex; align-items:center; justify-content:center; }
.crypto-spark { width:84px; height:32px; display:block; }
.crypto-empty, .crypto-loading, .crypto-error { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; padding:60px 20px; color:var(--text-secondary); text-align:center; flex:1; }
.crypto-loading .crypto-spinner { width:26px; height:26px; border-radius:50%; border:2.5px solid rgba(128,128,128,0.25); border-top-color:var(--accent); animation:crypto-spin .7s linear infinite; }
.crypto-error-btn { background:var(--accent); color:#fff; border:none; border-radius:6px; padding:7px 16px; font-family:inherit; font-size:12px; cursor:pointer; }
`;
            document.head.appendChild(style);
        }

        OS.registry.register({
            id: 'sys-crypto', name: I18N.t('app.crypto'), nameKey: 'app.crypto', icon: CRYPTO_ICON,
            defaultWidth: 1020, defaultHeight: 680,
            init: (c, api) => {
                ensureCryptoStyles();

                let coins = [];                  // dernières données reçues
                let prevPrices = new Map();       // id -> prix précédent, pour l'animation flash
                let sort = { key: 'market_cap_rank', dir: 1 };
                let query = '';
                let refreshTimer = null, countdownTimer = null, secondsLeft = 60;
                let loading = false, hasData = false, isStale = false;
                let destroyed = false;

                c.innerHTML = `
                <div class="crypto-app">
                    <div class="crypto-toolbar">
                        <div class="crypto-search-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            <input type="text" class="crypto-search" id="crypto-search" placeholder="${I18N.t('crypto.search')}" autocomplete="off">
                        </div>
                        <div class="crypto-limit-wrap">
                            <span class="lbl" id="crypto-limit-label">${I18N.t('crypto.limit.label')}</span>
                            <select class="crypto-limit-select" id="crypto-limit-select">
                                ${CRYPTO_LIMITS.map(n => `<option value="${n}" ${n === cryptoLimit ? 'selected' : ''}>${n}</option>`).join('')}
                            </select>
                        </div>
                        <button class="crypto-refresh-btn" id="crypto-refresh-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.35"/><polyline points="21 3 21 9 15 9"/></svg>
                            <span id="crypto-refresh-label">${I18N.t('crypto.refreshNow')}</span>
                        </button>
                    </div>
                    <div class="crypto-status-row">
                        <span id="crypto-updated-at"></span>
                        <span id="crypto-countdown"></span>
                    </div>
                    <div class="crypto-summary" id="crypto-summary" style="display:none;">
                        <div class="crypto-summary-chip"><div class="lbl" id="crypto-sum-cap-lbl">${I18N.t('crypto.summary.cap', { n: cryptoLimit })}</div><div class="val" id="crypto-sum-cap">—</div></div>
                        <div class="crypto-summary-chip"><div class="lbl">${I18N.t('crypto.summary.up')}</div><div class="val up" id="crypto-sum-up">—</div></div>
                        <div class="crypto-summary-chip"><div class="lbl">${I18N.t('crypto.summary.down')}</div><div class="val down" id="crypto-sum-down">—</div></div>
                    </div>
                    <div class="crypto-list-wrap" id="crypto-list-wrap">
                        <div class="crypto-loading" id="crypto-initial-loading">
                            <div class="crypto-spinner"></div>
                            <div>${I18N.t('crypto.loading')}</div>
                        </div>
                    </div>
                </div>`;

                const searchInput = c.querySelector('#crypto-search');
                const limitSelect = c.querySelector('#crypto-limit-select');
                const limitLabel = c.querySelector('#crypto-limit-label');
                const refreshBtn = c.querySelector('#crypto-refresh-btn');
                const refreshLabel = c.querySelector('#crypto-refresh-label');
                const updatedAtEl = c.querySelector('#crypto-updated-at');
                const countdownEl = c.querySelector('#crypto-countdown');
                const listWrap = c.querySelector('#crypto-list-wrap');
                const summaryEl = c.querySelector('#crypto-summary');
                const sumCapLbl = c.querySelector('#crypto-sum-cap-lbl');
                const sumCapEl = c.querySelector('#crypto-sum-cap');
                const sumUpEl = c.querySelector('#crypto-sum-up');
                const sumDownEl = c.querySelector('#crypto-sum-down');

                // ---- Formatage ----
                function fmtPrice(p) {
                    if (p == null || isNaN(p)) return '—';
                    let decimals = 2;
                    if (p < 1) decimals = 4;
                    if (p < 0.01) decimals = 6;
                    if (p < 0.0001) decimals = 8;
                    return '$' + p.toLocaleString(I18N.locale(), { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
                }
                function fmtCompact(n) {
                    if (n == null || isNaN(n)) return '—';
                    try { return new Intl.NumberFormat(I18N.locale(), { notation: 'compact', maximumFractionDigits: 2 }).format(n); }
                    catch (e) { return String(Math.round(n)); }
                }
                function fmtTime(d) {
                    return d.toLocaleTimeString(I18N.locale(), { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                }

                const CHEVRON_UP = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 8l6 8H6z"/></svg>`;
                const CHEVRON_DOWN = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 16 6 8h12z"/></svg>`;

                function sparklineSVG(prices, up) {
                    if (!prices || prices.length < 2) return '';
                    const w = 100, h = 32;
                    const min = Math.min(...prices), max = Math.max(...prices);
                    const range = (max - min) || 1;
                    const step = w / (prices.length - 1);
                    const pts = prices.map((p, i) => `${(i * step).toFixed(1)},${(h - ((p - min) / range) * h).toFixed(1)}`).join(' ');
                    return `<svg class="crypto-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="${up ? 'var(--crypto-up,#33cc7a)' : 'var(--crypto-down,#e85454)'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                }

                // Les 24 derniers points de sparkline_in_7d (168 points horaires = 7j)
                // correspondent aux 24 dernières heures — pas d'appel API en plus.
                function last24hSeries(cn) {
                    const arr = cn.sparkline_in_7d && cn.sparkline_in_7d.price;
                    if (!arr || arr.length === 0) return null;
                    return arr.length > 24 ? arr.slice(-24) : arr;
                }

                // ---- Tri / filtre ----
                function getFiltered() {
                    let list = coins;
                    if (query) {
                        const q = query.toLowerCase();
                        list = list.filter(cn => cn.name.toLowerCase().includes(q) || cn.symbol.toLowerCase().includes(q));
                    }
                    const key = sort.key, dir = sort.dir;
                    list = [...list].sort((a, b) => {
                        const av = a[key] ?? 0, bv = b[key] ?? 0;
                        if (av < bv) return -1 * dir;
                        if (av > bv) return 1 * dir;
                        return 0;
                    });
                    return list;
                }

                // ---- Rendu de la liste ----
                function renderHead() {
                    const cols = [
                        { key: 'market_cap_rank', label: I18N.t('crypto.col.rank'), cls: 'col-rank' },
                        { key: 'name', label: I18N.t('crypto.col.name'), cls: 'col-name' },
                        { key: 'current_price', label: I18N.t('crypto.col.price'), cls: 'col-price' },
                        { key: 'price_change_percentage_24h', label: I18N.t('crypto.col.change'), cls: 'col-change' },
                        { key: 'market_cap', label: I18N.t('crypto.col.cap'), cls: 'col-cap' },
                        { key: 'total_volume', label: I18N.t('crypto.col.vol'), cls: 'col-vol' },
                        { key: null, label: I18N.t('crypto.col.chart24h'), cls: 'col-chart24h' },
                        { key: null, label: I18N.t('crypto.col.chart7d'), cls: 'col-chart7d' }
                    ];
                    return `<div class="crypto-head">${cols.map(col => {
                        if (!col.key) return `<span class="${col.cls}">${col.label}</span>`;
                        const active = sort.key === col.key;
                        const arrow = active ? (sort.dir === 1 ? '▲' : '▼') : '';
                        return `<span class="${col.cls}${active ? ' sorted' : ''}" data-sort="${col.key}">${col.label}${arrow ? ` <span class="sort-arrow">${arrow}</span>` : ''}</span>`;
                    }).join('')}</div>`;
                }

                function renderRows(list) {
                    if (list.length === 0) {
                        return `<div class="crypto-empty">${I18N.t('crypto.empty')}</div>`;
                    }
                    return list.map((cn, i) => {
                        const up24 = (cn.price_change_percentage_24h ?? 0) >= 0;
                        const change7d = cn.price_change_percentage_7d_in_currency;
                        const series24 = last24hSeries(cn);
                        const series7d = cn.sparkline_in_7d && cn.sparkline_in_7d.price;
                        const up7d = change7d != null ? change7d >= 0 : (series7d && series7d.length > 1 ? series7d[series7d.length - 1] >= series7d[0] : up24);
                        const prev = prevPrices.get(cn.id);
                        let flashCls = '';
                        if (prev != null && prev !== cn.current_price) flashCls = cn.current_price > prev ? ' flash-up' : ' flash-down';
                        return `<div class="crypto-row" style="--i:${i}" data-id="${cn.id}">
                            <div class="crypto-rank col-rank">${cn.market_cap_rank ?? '—'}</div>
                            <div class="crypto-name-cell col-name">
                                <img class="crypto-icon" src="${cn.image}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
                                <div class="crypto-name-text">
                                    <span class="crypto-name">${escHtml(cn.name)}</span>
                                    <span class="crypto-symbol">${escHtml((cn.symbol || '').toUpperCase())}</span>
                                </div>
                            </div>
                            <div class="crypto-price col-price${flashCls}">${fmtPrice(cn.current_price)}</div>
                            <div class="crypto-change col-change ${up24 ? 'up' : 'down'}">${up24 ? CHEVRON_UP : CHEVRON_DOWN}${Math.abs(cn.price_change_percentage_24h ?? 0).toFixed(2)}%</div>
                            <div class="crypto-cap col-cap">${fmtCompact(cn.market_cap)}</div>
                            <div class="crypto-vol col-vol">${fmtCompact(cn.total_volume)}</div>
                            <div class="crypto-spark-cell col-chart24h">${sparklineSVG(series24, up24)}</div>
                            <div class="crypto-spark-cell col-chart7d">${sparklineSVG(series7d, up7d)}</div>
                        </div>`;
                    }).join('');
                }

                function renderList() {
                    const list = getFiltered();
                    listWrap.innerHTML = renderHead() + renderRows(list);
                    listWrap.querySelectorAll('[data-sort]').forEach(el => {
                        el.onclick = () => {
                            const key = el.dataset.sort;
                            if (sort.key === key) sort.dir *= -1; else { sort.key = key; sort.dir = (key === 'name') ? 1 : -1; }
                            renderList();
                        };
                    });
                }

                function renderSummary() {
                    if (coins.length === 0) { summaryEl.style.display = 'none'; return; }
                    summaryEl.style.display = '';
                    const totalCap = coins.reduce((s, cn) => s + (cn.market_cap || 0), 0);
                    const upCount = coins.filter(cn => (cn.price_change_percentage_24h ?? 0) >= 0).length;
                    sumCapLbl.textContent = I18N.t('crypto.summary.cap', { n: cryptoLimit });
                    sumCapEl.textContent = '$' + fmtCompact(totalCap);
                    sumUpEl.textContent = upCount;
                    sumDownEl.textContent = coins.length - upCount;
                }

                // ---- Chargement des données ----
                async function fetchCoins() {
                    if (destroyed) return;
                    loading = true;
                    refreshBtn.classList.add('spinning');
                    refreshLabel.textContent = I18N.t('crypto.refreshing');
                    if (!hasData) listWrap.innerHTML = `<div class="crypto-loading"><div class="crypto-spinner"></div><div>${I18N.t('crypto.loading')}</div></div>`;

                    try {
                        const res = await fetch(cryptoApiUrl(cryptoLimit));
                        if (!res.ok) throw new Error('HTTP ' + res.status);
                        const data = await res.json();
                        if (destroyed) return;
                        if (!Array.isArray(data) || data.length === 0) throw new Error('empty');

                        prevPrices = new Map(coins.map(cn => [cn.id, cn.current_price]));
                        coins = data;
                        hasData = true;
                        isStale = false;

                        renderList();
                        renderSummary();
                        updatedAtEl.textContent = I18N.t('crypto.updated', { time: fmtTime(new Date()) });
                        updatedAtEl.classList.remove('crypto-stale');
                    } catch (err) {
                        if (destroyed) return;
                        if (hasData) {
                            isStale = true;
                            updatedAtEl.textContent = I18N.t('crypto.stale');
                            updatedAtEl.classList.add('crypto-stale');
                        } else {
                            listWrap.innerHTML = `<div class="crypto-error">
                                <div>${I18N.t('crypto.error')}</div>
                                <button class="crypto-error-btn" id="crypto-retry-btn">${I18N.t('crypto.retry')}</button>
                            </div>`;
                            const retryBtn = listWrap.querySelector('#crypto-retry-btn');
                            if (retryBtn) retryBtn.onclick = () => fetchCoins();
                        }
                    } finally {
                        if (!destroyed) {
                            loading = false;
                            refreshBtn.classList.remove('spinning');
                            refreshLabel.textContent = I18N.t('crypto.refreshNow');
                        }
                    }
                }

                // ---- Cycle de rafraîchissement (60s) + compte à rebours affiché ----
                function scheduleRefresh() {
                    secondsLeft = CRYPTO_REFRESH_MS / 1000;
                    clearInterval(refreshTimer);
                    refreshTimer = setInterval(() => { secondsLeft = CRYPTO_REFRESH_MS / 1000; fetchCoins(); }, CRYPTO_REFRESH_MS);
                }
                function startCountdown() {
                    clearInterval(countdownTimer);
                    countdownTimer = setInterval(() => {
                        secondsLeft = Math.max(0, secondsLeft - 1);
                        countdownEl.textContent = I18N.t('crypto.nextRefresh', { s: secondsLeft });
                    }, 1000);
                }

                refreshBtn.onclick = () => { if (loading) return; scheduleRefresh(); fetchCoins(); };
                searchInput.oninput = () => { query = searchInput.value.trim(); renderList(); };
                limitSelect.onchange = () => {
                    cryptoLimit = parseInt(limitSelect.value, 10) || 50;
                    hasData = false;
                    coins = [];
                    prevPrices = new Map();
                    scheduleRefresh();
                    fetchCoins();
                };

                // ---- Largeur réduite : masque les colonnes secondaires ----
                const ro = new ResizeObserver(entries => {
                    const w = entries[0].contentRect.width;
                    c.querySelector('.crypto-app').classList.toggle('compact', w < 680);
                });
                ro.observe(c);

                // ---- Localisation dynamique sans perdre les données déjà chargées ----
                function applyLocale() {
                    searchInput.placeholder = I18N.t('crypto.search');
                    limitLabel.textContent = I18N.t('crypto.limit.label');
                    refreshLabel.textContent = loading ? I18N.t('crypto.refreshing') : I18N.t('crypto.refreshNow');
                    if (hasData) {
                        renderList();
                        renderSummary();
                        updatedAtEl.textContent = isStale ? I18N.t('crypto.stale') : I18N.t('crypto.updated', { time: fmtTime(new Date()) });
                    }
                    countdownEl.textContent = I18N.t('crypto.nextRefresh', { s: secondsLeft });
                    const chips = c.querySelectorAll('.crypto-summary-chip .lbl');
                    if (chips[1]) chips[1].textContent = I18N.t('crypto.summary.up');
                    if (chips[2]) chips[2].textContent = I18N.t('crypto.summary.down');
                }
                window.addEventListener('webosx:langchange', applyLocale);

                // ---- Démarrage ----
                scheduleRefresh();
                startCountdown();
                fetchCoins();

                // ---- Nettoyage à la fermeture ----
                const origClose = api.close;
                api.close = () => {
                    destroyed = true;
                    clearInterval(refreshTimer);
                    clearInterval(countdownTimer);
                    ro.disconnect();
                    window.removeEventListener('webosx:langchange', applyLocale);
                    origClose();
                };
            }
        });
