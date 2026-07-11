        // Pack complet : toutes les clés du noyau (chrome.*, app.*, about.*, settings.*)
        // sont désormais traduites. Les clés manquent encore d'une app viendraient
        // automatiquement de I18N.fallback ('en') — voir i18n.js.
        I18N.registerLang('de', {
            'chrome.start.brandSub': 'Alle Anwendungen',
            'chrome.start.searchPlaceholder': 'App suchen...',
            'chrome.start.empty': 'Keine Ergebnisse',
            'chrome.start.about': 'Info',
            'chrome.start.settings': 'Einstellungen',
            'chrome.lang.switch': 'Sprache wechseln',
            'chrome.win.minimize': 'Minimieren',
            'chrome.win.maximize': 'Maximieren',
            'chrome.win.close': 'Schließen',

            'app.about': 'Info',
            'app.settings': 'Einstellungen',
            'app.notepad': 'Notizblock',
            'app.terminal': 'Terminal',
            'app.calc': 'Taschenrechner',
            'app.clock': 'Uhr',
            'app.mp3': 'MP3-Player',
            'app.video': 'Videoplayer',

            'about.version': 'Version 1.0.0',
            'about.desc1': 'Webbasiertes grafisches Betriebssystem.',
            'about.desc2': 'HSL-Engine & 3D-Rendering.',
            'about.ok': 'OK',

            'settings.appearance.title': 'Oberflächendarstellung',
            'settings.appearance.3d': '3D-Konturen aktivieren (Relief)',
            'settings.appearance.3dDesc': 'Fügt innere Schatten für einen materiellen Effekt auf dunklem Hintergrund hinzu.',
            'settings.color.title': 'Globale Farbgebung',
            'settings.color.presets': 'Schnellauswahl:',
            'settings.color.custom': 'Eigene Farbe:',
            'settings.wave.title': 'Animierter Hintergrund (Wellen)',
            'settings.wave.show': 'Animierten Hintergrund anzeigen',
            'settings.wave.speed': 'Geschwindigkeit',
            'settings.wave.speedSlow': 'Langsam',
            'settings.wave.speedFast': 'Schnell',
            'settings.wave.width': 'Wellenbreite',
            'settings.wave.widthThin': 'Dünn',
            'settings.wave.widthWide': 'Breit',
            'settings.wave.opacity': 'Deckkraft',
            'settings.wave.opacityLow': 'Transparent',
            'settings.wave.opacityHigh': 'Deckend',
            'settings.language.title': 'Sprache',
            'settings.language.label': 'Oberflächensprache:'
        });
