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
        const I18N = {
            languages: {
                fr: { name: 'Français',  short: 'FR', flag: '🇫🇷', locale: 'fr-FR' },
                en: { name: 'English',   short: 'EN', flag: '🇬🇧', locale: 'en-US' },
                es: { name: 'Español',   short: 'ES', flag: '🇪🇸', locale: 'es-ES' },
                de: { name: 'Deutsch',   short: 'DE', flag: '🇩🇪', locale: 'de-DE' }
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
