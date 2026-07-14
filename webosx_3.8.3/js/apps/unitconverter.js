        // ==================================================================
        // App "Convertisseur d'unités" — 10 catégories, conversion
        // bidirectionnelle en direct (taper dans "De" met "Vers" à jour et
        // vice-versa), plus un tableau de référence listant la valeur dans
        // TOUTES les unités de la catégorie à la fois.
        // ==================================================================

        const UNITCONV_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v14a2 2 0 0 0 2 2h1"/><path d="M4 6h4"/><path d="M4 10h4"/><path d="M4 14h4"/><path d="M17 21V7a2 2 0 0 0-2-2h-1"/><path d="M20 18h-4"/><path d="M20 14h-4"/><path d="M20 10h-4"/></svg>`;

        const UC_ICONS = {
            length: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="9" width="19" height="6" rx="1"/><path d="M6 9v3"/><path d="M10 9v3"/><path d="M14 9v3"/><path d="M18 9v3"/></svg>`,
            mass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.2"/><path d="M8.5 10.5 5 21h14l-3.5-10.5"/></svg>`,
            temperature: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14.5V4a2 2 0 1 0-4 0v10.5a4 4 0 1 0 4 0Z"/><line x1="10" y1="7" x2="12" y2="7"/></svg>`,
            speed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15a8 8 0 1 1 16 0"/><path d="M12 15 16 9"/><circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/></svg>`,
            volume: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6"/><path d="M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M7.5 15h9"/></svg>`,
            area: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 4l16 16"/></svg>`,
            time: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
            data: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5.5" rx="8" ry="2.8"/><path d="M4 5.5v6c0 1.5 3.5 2.8 8 2.8s8-1.3 8-2.8v-6"/><path d="M4 11.5v6c0 1.5 3.5 2.8 8 2.8s8-1.3 8-2.8v-6"/></svg>`,
            pressure: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 13 15.5 8.5"/><path d="M12 4v1.5"/></svg>`,
            energy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>`
        };

        // Chaque unité : facteur multiplicatif vers l'unité de base de la catégorie
        // (base = facteur 1). La température est un cas spécial (non-linéaire, voir
        // ucConvertTemp ci-dessous) donc ses unités n'ont pas de facteur.
        const UC_CATEGORIES = [
            { id: 'length', units: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344, nmi: 1852 } },
            { id: 'mass', units: { mg: 0.000001, g: 0.001, kg: 1, t: 1000, oz: 0.0283495, lb: 0.45359237, st: 6.35029 } },
            { id: 'temperature', special: true, units: { 'c': null, 'f': null, 'k': null } },
            { id: 'speed', units: { 'm/s': 1, 'km/h': 0.277778, mph: 0.44704, kn: 0.514444, 'ft/s': 0.3048 } },
            { id: 'volume', units: { ml: 0.001, cl: 0.01, l: 1, 'm³': 1000, galUS: 3.78541, galUK: 4.54609, pt: 0.473176, cup: 0.24, flozUS: 0.0295735 } },
            { id: 'area', units: { 'mm²': 0.000001, 'cm²': 0.0001, 'm²': 1, 'km²': 1000000, ha: 10000, acre: 4046.86, 'ft²': 0.092903, 'in²': 0.00064516, 'mi²': 2589988.11 } },
            { id: 'time', units: { ms: 0.001, s: 1, min: 60, h: 3600, j: 86400, sem: 604800, mois: 2592000, an: 31557600 } },
            { id: 'data', units: { bit: 0.125, o: 1, Ko: 1024, Mo: 1048576, Go: 1073741824, To: 1099511627776, Po: 1125899906842624 } },
            { id: 'pressure', units: { Pa: 1, kPa: 1000, bar: 100000, atm: 101325, psi: 6894.76, mmHg: 133.322 } },
            { id: 'energy', units: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3600000, BTU: 1055.06 } }
        ];

        function ucCelsiusFrom(unit, v) {
            if (unit === 'c') return v;
            if (unit === 'f') return (v - 32) * 5 / 9;
            return v - 273.15; // k
        }
        function ucCelsiusTo(unit, c) {
            if (unit === 'c') return c;
            if (unit === 'f') return c * 9 / 5 + 32;
            return c + 273.15; // k
        }
        function ucToBase(val, unit, cat) {
            if (cat.special) return ucCelsiusFrom(unit, val);
            return val * cat.units[unit];
        }
        function ucFromBase(base, unit, cat) {
            if (cat.special) return ucCelsiusTo(unit, base);
            return base / cat.units[unit];
        }
        // Formatage intelligent : évite les longues traînées de décimales issues
        // de l'arithmétique flottante, sans pour autant tronquer bêtement un
        // résultat legitimement précis.
        function ucFormat(n) {
            if (!isFinite(n)) return '—';
            if (Math.abs(n) < 1e-12) return '0';
            if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toString();
            const abs = Math.abs(n);
            let str = (abs >= 1e9 || abs < 1e-6) ? n.toExponential(4) : n.toPrecision(6);
            if (!str.includes('e')) str = parseFloat(str).toString();
            return str;
        }

        I18N.registerLang('fr', {
            'app.unitconverter': 'Convertisseur d\'unités',
            'uc.cat.length': 'Longueur', 'uc.cat.mass': 'Masse', 'uc.cat.temperature': 'Température',
            'uc.cat.speed': 'Vitesse', 'uc.cat.volume': 'Volume', 'uc.cat.area': 'Surface',
            'uc.cat.time': 'Temps', 'uc.cat.data': 'Données', 'uc.cat.pressure': 'Pression', 'uc.cat.energy': 'Énergie',
            'uc.from': 'De', 'uc.to': 'Vers', 'uc.swap': 'Inverser', 'uc.allUnits': 'Toutes les unités'
        });
        I18N.registerLang('en', {
            'app.unitconverter': 'Unit Converter',
            'uc.cat.length': 'Length', 'uc.cat.mass': 'Mass', 'uc.cat.temperature': 'Temperature',
            'uc.cat.speed': 'Speed', 'uc.cat.volume': 'Volume', 'uc.cat.area': 'Area',
            'uc.cat.time': 'Time', 'uc.cat.data': 'Data', 'uc.cat.pressure': 'Pressure', 'uc.cat.energy': 'Energy',
            'uc.from': 'From', 'uc.to': 'To', 'uc.swap': 'Swap', 'uc.allUnits': 'All units'
        });
        I18N.registerLang('es', {
            'app.unitconverter': 'Convertidor de unidades',
            'uc.cat.length': 'Longitud', 'uc.cat.mass': 'Masa', 'uc.cat.temperature': 'Temperatura',
            'uc.cat.speed': 'Velocidad', 'uc.cat.volume': 'Volumen', 'uc.cat.area': 'Superficie',
            'uc.cat.time': 'Tiempo', 'uc.cat.data': 'Datos', 'uc.cat.pressure': 'Presión', 'uc.cat.energy': 'Energía',
            'uc.from': 'De', 'uc.to': 'A', 'uc.swap': 'Invertir', 'uc.allUnits': 'Todas las unidades'
        });
        I18N.registerLang('de', {
            'app.unitconverter': 'Einheitenumrechner',
            'uc.cat.length': 'Länge', 'uc.cat.mass': 'Masse', 'uc.cat.temperature': 'Temperatur',
            'uc.cat.speed': 'Geschwindigkeit', 'uc.cat.volume': 'Volumen', 'uc.cat.area': 'Fläche',
            'uc.cat.time': 'Zeit', 'uc.cat.data': 'Daten', 'uc.cat.pressure': 'Druck', 'uc.cat.energy': 'Energie',
            'uc.from': 'Von', 'uc.to': 'Nach', 'uc.swap': 'Tauschen', 'uc.allUnits': 'Alle Einheiten'
        });
        I18N.registerLang('it', {
            'app.unitconverter': 'Convertitore di unità',
            'uc.cat.length': 'Lunghezza', 'uc.cat.mass': 'Massa', 'uc.cat.temperature': 'Temperatura',
            'uc.cat.speed': 'Velocità', 'uc.cat.volume': 'Volume', 'uc.cat.area': 'Superficie',
            'uc.cat.time': 'Tempo', 'uc.cat.data': 'Dati', 'uc.cat.pressure': 'Pressione', 'uc.cat.energy': 'Energia',
            'uc.from': 'Da', 'uc.to': 'A', 'uc.swap': 'Inverti', 'uc.allUnits': 'Tutte le unità'
        });
        I18N.registerLang('pt', {
            'app.unitconverter': 'Conversor de unidades',
            'uc.cat.length': 'Comprimento', 'uc.cat.mass': 'Massa', 'uc.cat.temperature': 'Temperatura',
            'uc.cat.speed': 'Velocidade', 'uc.cat.volume': 'Volume', 'uc.cat.area': 'Área',
            'uc.cat.time': 'Tempo', 'uc.cat.data': 'Dados', 'uc.cat.pressure': 'Pressão', 'uc.cat.energy': 'Energia',
            'uc.from': 'De', 'uc.to': 'Para', 'uc.swap': 'Inverter', 'uc.allUnits': 'Todas as unidades'
        });

        OS.registry.register({
            id: 'sys-unitconverter', name: I18N.t('app.unitconverter'), nameKey: 'app.unitconverter', icon: UNITCONV_ICON,
            defaultWidth: 620, defaultHeight: 500, singleton: true,
            init: (c, api) => {
                let activeCat = UC_CATEGORIES[0];
                let fromUnit, toUnit;

                function unitsOf(cat) { return Object.keys(cat.units); }

                function initUnitsForCategory(cat) {
                    const keys = unitsOf(cat);
                    fromUnit = keys[0];
                    toUnit = keys[1] || keys[0];
                }
                initUnitsForCategory(activeCat);

                function render() {
                    c.innerHTML = `
                    <div class="uc-shell">
                        <div class="settings-sidebar" id="uc-sidebar"></div>
                        <div class="uc-main">
                            <div class="uc-row">
                                <input type="number" class="uc-input" id="uc-from-input" value="1">
                                <select class="uc-select" id="uc-from-select"></select>
                            </div>
                            <button class="uc-swap-btn" id="uc-swap" title="${I18N.t('uc.swap')}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10 3 6l4-4"/><path d="M3 6h13a4 4 0 0 1 4 4v1"/><path d="M17 14l4 4-4 4"/><path d="M21 18H8a4 4 0 0 1-4-4v-1"/></svg>
                            </button>
                            <div class="uc-row">
                                <input type="number" class="uc-input" id="uc-to-input">
                                <select class="uc-select" id="uc-to-select"></select>
                            </div>
                            <div class="uc-table-title">${I18N.t('uc.allUnits')}</div>
                            <div class="uc-table" id="uc-table"></div>
                        </div>
                    </div>`;

                    const sidebar = c.querySelector('#uc-sidebar');
                    UC_CATEGORIES.forEach(cat => {
                        const btn = document.createElement('button');
                        btn.className = 'settings-tab-btn' + (cat === activeCat ? ' active' : '');
                        btn.innerHTML = `${UC_ICONS[cat.id]}<span>${I18N.t('uc.cat.' + cat.id)}</span>`;
                        btn.onclick = () => { activeCat = cat; initUnitsForCategory(cat); render(); };
                        sidebar.appendChild(btn);
                    });

                    const fromInput = c.querySelector('#uc-from-input');
                    const toInput = c.querySelector('#uc-to-input');
                    const fromSelect = c.querySelector('#uc-from-select');
                    const toSelect = c.querySelector('#uc-to-select');
                    const tableEl = c.querySelector('#uc-table');

                    unitsOf(activeCat).forEach(u => {
                        fromSelect.innerHTML += `<option value="${u}" ${u === fromUnit ? 'selected' : ''}>${u}</option>`;
                        toSelect.innerHTML += `<option value="${u}" ${u === toUnit ? 'selected' : ''}>${u}</option>`;
                    });

                    let updating = false;

                    function renderTable(baseVal) {
                        tableEl.innerHTML = unitsOf(activeCat).map(u => {
                            const v = ucFromBase(baseVal, u, activeCat);
                            return `<div class="uc-table-row"><span class="uc-table-unit">${u}</span><span class="uc-table-value">${ucFormat(v)}</span></div>`;
                        }).join('');
                    }

                    function convertFromSource() {
                        if (updating) return;
                        updating = true;
                        const val = parseFloat(fromInput.value);
                        if (isFinite(val)) {
                            const base = ucToBase(val, fromUnit, activeCat);
                            toInput.value = ucFormat(ucFromBase(base, toUnit, activeCat));
                            renderTable(base);
                        } else {
                            toInput.value = ''; tableEl.innerHTML = '';
                        }
                        updating = false;
                    }
                    function convertFromTarget() {
                        if (updating) return;
                        updating = true;
                        const val = parseFloat(toInput.value);
                        if (isFinite(val)) {
                            const base = ucToBase(val, toUnit, activeCat);
                            fromInput.value = ucFormat(ucFromBase(base, fromUnit, activeCat));
                            renderTable(base);
                        }
                        updating = false;
                    }

                    fromInput.oninput = convertFromSource;
                    toInput.oninput = convertFromTarget;
                    fromSelect.onchange = () => { fromUnit = fromSelect.value; convertFromSource(); };
                    toSelect.onchange = () => { toUnit = toSelect.value; convertFromSource(); };

                    c.querySelector('#uc-swap').onclick = () => {
                        [fromUnit, toUnit] = [toUnit, fromUnit];
                        fromSelect.value = fromUnit; toSelect.value = toUnit;
                        const tmp = fromInput.value; fromInput.value = toInput.value || tmp;
                        convertFromSource();
                    };

                    convertFromSource();
                }

                render();
                window.addEventListener('webosx:langchange', render);
                const origClose = api.close;
                api.close = () => { window.removeEventListener('webosx:langchange', render); origClose(); };
            }
        });
