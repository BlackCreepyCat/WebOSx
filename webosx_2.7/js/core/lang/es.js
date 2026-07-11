        // Pack complet : toutes les clés du noyau (chrome.*, app.*, about.*, settings.*)
        // sont désormais traduites. Les clés manquant encore d'une app viendraient
        // automatiquement de I18N.fallback ('en') — voir i18n.js.
        I18N.registerLang('es', {
            'chrome.start.brandSub': 'Todas las aplicaciones',
            'chrome.start.searchPlaceholder': 'Buscar una aplicación...',
            'chrome.start.empty': 'Sin resultados',
            'chrome.start.about': 'Acerca de',
            'chrome.start.settings': 'Configuración',
            'chrome.lang.switch': 'Cambiar idioma',
            'chrome.win.minimize': 'Minimizar',
            'chrome.win.maximize': 'Maximizar',
            'chrome.win.close': 'Cerrar',

            'app.about': 'Acerca de',
            'app.settings': 'Configuración',
            'app.notepad': 'Bloc de notas',
            'app.terminal': 'Terminal',
            'app.calc': 'Calculadora',
            'app.clock': 'Reloj',
            'app.mp3': 'Reproductor MP3',
            'app.video': 'Reproductor de vídeo',

            'about.version': 'Versión 2.7',
            'about.desc1': 'Sistema operativo gráfico basado en web.',
            'about.desc2': 'Motor HSL y renderizado 3D.',
            'about.ok': 'Aceptar',
            'about.github': 'Ver en GitHub',

            'settings.appearance.title': 'Apariencia de la interfaz',
            'settings.appearance.3d': 'Activar contornos 3D (Relieve)',
            'settings.appearance.3dDesc': 'Añade sombras internas para un efecto de material sobre fondos oscuros.',
            'settings.color.title': 'Colorización global',
            'settings.color.presets': 'Tonos rápidos:',
            'settings.color.custom': 'Color personalizado:',
            'settings.wave.title': 'Fondo animado (olas)',
            'settings.wave.show': 'Mostrar fondo animado',
            'settings.wave.speed': 'Velocidad',
            'settings.wave.speedSlow': 'Lento',
            'settings.wave.speedFast': 'Rápido',
            'settings.wave.width': 'Ancho de las olas',
            'settings.wave.widthThin': 'Fino',
            'settings.wave.widthWide': 'Ancho',
            'settings.wave.opacity': 'Opacidad',
            'settings.wave.opacityLow': 'Transparente',
            'settings.wave.opacityHigh': 'Opaco',
            'settings.language.title': 'Idioma',
            'settings.language.label': 'Idioma de la interfaz:'
        });
