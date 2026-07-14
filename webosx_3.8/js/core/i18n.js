        // ==================================================================
        // I18N — Système de localisation de WebOSx
        // ------------------------------------------------------------------
        // Pour ajouter une langue :
        //   1. Créer js/core/lang/xx.js (copier lang/en.js comme base)
        //   2. Appeler I18N.registerLang('xx', { 'clé': 'traduction', ... })
        //   3. Déclarer la langue dans I18N.languages ci-dessous
        //   4. Ajouter <script src="js/core/lang/xx.js"></script> dans index.html
        //      (après i18n.js, avant window-manager.js)
        // Les clés absentes retombent automatiquement sur I18N.fallback,
        // une langue peut donc être partielle sans rien casser.
        // ==================================================================
        // Drapeaux en SVG inline plutôt qu'en emoji Unicode (🇫🇷, 🇬🇧…) : Windows ne
        // sait pas rendre les "regional indicator" (il retombe sur du texte/du vide),
        // contrairement à Android/iOS/macOS. Un drapeau invisible sur PC mais visible
        // sur mobile est donc normal avec des emoji — le SVG s'affiche pareil partout.
        const FLAG_SVG = {
            fr: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>',
            en: '<svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="36" fill="#00247d"/><path d="M0 0 60 36M60 0 0 36" stroke="#fff" stroke-width="6"/><path d="M0 0 60 36M60 0 0 36" stroke="#cf142b" stroke-width="2"/><path d="M30 0V36M0 18H60" stroke="#fff" stroke-width="10"/><path d="M30 0V36M0 18H60" stroke="#cf142b" stroke-width="4"/></svg>',
            es: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#AA151B"/><rect y="0.5" width="3" height="1" fill="#F1BF00"/></svg>',
            de: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="3" height="2" fill="#FFCE00"/><rect width="3" height="1.334" fill="#DD0000"/><rect width="3" height="0.667" fill="#000"/></svg>'
        };
        const I18N = {
            languages: {
                fr: { name: 'Français',  short: 'FR', flag: FLAG_SVG.fr, locale: 'fr-FR' },
                en: { name: 'English',   short: 'EN', flag: FLAG_SVG.en, locale: 'en-US' },
                es: { name: 'Español',   short: 'ES', flag: FLAG_SVG.es, locale: 'es-ES' },
                de: { name: 'Deutsch',   short: 'DE', flag: FLAG_SVG.de, locale: 'de-DE' }
            },
            fallback: 'en',
            current: 'fr',
            dict: {},
            listeners: [],

            registerLang(code, strings) {
                this.dict[code] = Object.assign(this.dict[code] || {}, strings);
            },

            t(key, vars) {
                let str = (this.dict[this.current] && this.dict[this.current][key])
                       ?? (this.dict[this.fallback] && this.dict[this.fallback][key])
                       ?? key;
                if (vars) Object.keys(vars).forEach(k => { str = str.replaceAll(`{${k}}`, vars[k]); });
                return str;
            },

            locale() {
                return (this.languages[this.current] || this.languages[this.fallback]).locale;
            },

            onChange(fn) { this.listeners.push(fn); },

            setLang(code) {
                if (!this.languages[code] || code === this.current) return;
                this.current = code;
                document.documentElement.lang = code;
                const s = SettingsManager.load();
                s.lang = code;
                SettingsManager.save(s);
                this.apply();
                this.listeners.forEach(fn => { try { fn(code); } catch (e) { console.error(e); } });
                window.dispatchEvent(new CustomEvent('webosx:langchange', { detail: { lang: code } }));
            },

            cycle() {
                const codes = Object.keys(this.languages);
                const idx = codes.indexOf(this.current);
                this.setLang(codes[(idx + 1) % codes.length]);
            },

            // Applique les traductions à tout élément marqué data-i18n(-placeholder|-title) dans root
            apply(root) {
                root = root || document;
                root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = this.t(el.dataset.i18n); });
                root.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = this.t(el.dataset.i18nPlaceholder); });
                root.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = this.t(el.dataset.i18nTitle); });
            },

            init() {
                const s = SettingsManager.load();
                const browserLang = (navigator.language || 'fr').slice(0, 2);
                this.current = this.languages[s.lang] ? s.lang : (this.languages[browserLang] ? browserLang : 'fr');
                document.documentElement.lang = this.current;
            }
        };
        I18N.init();

        // Utilitaire d'échappement HTML partagé par le noyau (os.js, window-manager.js).
        // Défense en profondeur : les noms d'app viennent aujourd'hui de sources fiables
        // (greffons enregistrés au chargement), mais rien ne garantit que ça reste vrai
        // pour un futur greffon qui calculerait un nom dynamiquement.
        function escHtml(s) {
            return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }
