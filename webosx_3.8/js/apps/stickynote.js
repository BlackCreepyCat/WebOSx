        // ==================================================================
        // App "Post-it" — notes autocollantes flottantes.
        // ------------------------------------------------------------------
        // Contrairement aux autres apps, chaque instance réutilise la fenêtre
        // générique du WindowManager (drag, z-index, fermeture...) mais la
        // reskinne entièrement via CSS pour ressembler à un vrai Post-it :
        // couleur au choix, légère rotation aléatoire qui se redresse au
        // survol, coin corné, pas de barre de titre classique, pas d'entrée
        // dans la barre des tâches (noTaskbar).
        //
        // Persistance dédiée (StickyNotesStore, clé localStorage séparée) —
        // volontairement EXCLUE du système générique de sauvegarde de la
        // disposition du bureau (persistState:false), qui ne connaît que la
        // géométrie des fenêtres, pas le texte d'une note : le laisser faire
        // aurait recréé des notes vides au démarrage suivant.
        // ==================================================================

        const STICKYNOTE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h13l3 3v13H4Z"/><path d="M17 4v3h3"/></svg>`;
        const STICKYNOTE_COLORS = ['#ffd93d', '#ff6fa5', '#4fc3f7', '#6fcf70', '#b388ff', '#ff9645'];

        const StickyNotesStore = {
            KEY: 'webosx_stickynotes',
            list() {
                try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
                catch (e) { return []; }
            },
            save(note) {
                const notes = this.list();
                const idx = notes.findIndex(n => n.id === note.id);
                if (idx === -1) notes.push(note); else notes[idx] = note;
                try { localStorage.setItem(this.KEY, JSON.stringify(notes)); } catch (e) {}
            },
            remove(id) {
                try { localStorage.setItem(this.KEY, JSON.stringify(this.list().filter(n => n.id !== id))); } catch (e) {}
            }
        };

        function genStickyNoteId() { return 'note-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8); }

        I18N.registerLang('fr', { 'app.stickynote': 'Post-it', 'sn.placeholder': 'Écrire ici...' });
        I18N.registerLang('en', { 'app.stickynote': 'Sticky Note', 'sn.placeholder': 'Type here...' });
        I18N.registerLang('es', { 'app.stickynote': 'Nota adhesiva', 'sn.placeholder': 'Escribe aquí...' });
        I18N.registerLang('de', { 'app.stickynote': 'Notizzettel', 'sn.placeholder': 'Hier schreiben...' });

        OS.registry.register({
            id: 'sys-stickynote', name: I18N.t('app.stickynote'), nameKey: 'app.stickynote', icon: STICKYNOTE_ICON,
            defaultWidth: 220, defaultHeight: 210, minWidth: 140, minHeight: 130, maximizable: false,
            persistState: false, // persistance dédiée ci-dessus, pas le système générique de bureau
            noTaskbar: true,     // un vrai Post-it n'a pas d'entrée dans la barre des tâches
            init: (c, api) => {
                // Boîte aux lettres à usage unique (même principe que mp3.js/video.js/
                // imageviewer.js) : au redémarrage, restorePersistedNotes() y dépose
                // chaque note sauvegardée avant de lancer une fenêtre pour elle. Un
                // double-clic normal sur l'icône du bureau laisse cette boîte vide,
                // donc crée une note neuve.
                const pending = OS._pendingStickyNote;
                OS._pendingStickyNote = null;

                const note = pending || {
                    id: genStickyNoteId(),
                    text: '',
                    color: STICKYNOTE_COLORS[Math.floor(Math.random() * STICKYNOTE_COLORS.length)],
                    rotation: (Math.random() * 8 - 4).toFixed(1)
                };

                const winEl = c.closest('.window');
                winEl.classList.add('sticky-note-window');
                winEl.style.setProperty('--note-color', note.color);
                winEl.style.transform = `rotate(${note.rotation}deg)`;
                if (note.x != null) winEl.style.left = note.x + 'px';
                if (note.y != null) winEl.style.top = note.y + 'px';
                if (note.w != null) winEl.style.width = note.w + 'px';
                if (note.h != null) winEl.style.height = note.h + 'px';

                const titleBar = winEl.querySelector('.title-bar');
                const controls = titleBar.querySelector('.window-controls');

                // Petite palette de couleurs, visible au survol (voir CSS), insérée
                // avant les boutons de fenêtre existants (min/max sont masqués via CSS
                // pour ce type de fenêtre, seul "fermer" reste visible).
                const palette = document.createElement('div');
                palette.className = 'sn-palette';
                STICKYNOTE_COLORS.forEach(color => {
                    const sw = document.createElement('button');
                    sw.type = 'button';
                    sw.className = 'sn-swatch';
                    sw.style.background = color;
                    sw.onclick = (e) => {
                        e.stopPropagation();
                        note.color = color;
                        winEl.style.setProperty('--note-color', color);
                        StickyNotesStore.save(note);
                    };
                    palette.appendChild(sw);
                });
                titleBar.insertBefore(palette, controls);

                c.innerHTML = `<textarea class="sn-textarea" placeholder="${escHtml(I18N.t('sn.placeholder'))}"></textarea>`;
                const ta = c.querySelector('.sn-textarea');
                ta.value = note.text || '';

                let saveTimer = null;
                ta.oninput = () => {
                    note.text = ta.value;
                    clearTimeout(saveTimer);
                    saveTimer = setTimeout(() => StickyNotesStore.save(note), 400);
                };

                // Sauvegarde la position après un déplacement. addEventListener plutôt
                // que .onpointerup= : WindowManager.setupDrag() a déjà posé SON propre
                // handler via assignation directe de propriété sur ce même élément
                // (un seul handler possible avec cette syntaxe) — addEventListener, lui,
                // s'ajoute sans l'écraser.
                titleBar.addEventListener('pointerup', () => {
                    note.x = winEl.offsetLeft; note.y = winEl.offsetTop;
                    StickyNotesStore.save(note);
                });

                // Persiste aussi la taille après un redimensionnement. Un ResizeObserver
                // plutôt qu'un hook direct sur les poignées de redimensionnement : ces
                // dernières utilisent déjà .onpointerup= en interne dans
                // WindowManager.setupResize() (un seul handler possible avec cette
                // syntaxe), donc s'y greffer casserait leur propre logique de fin de
                // redimensionnement. Le ResizeObserver, lui, détecte tout changement de
                // taille sans interférer avec la mécanique interne.
                let resizeSaveTimer = null;
                const ro = new ResizeObserver(() => {
                    note.w = winEl.offsetWidth; note.h = winEl.offsetHeight;
                    clearTimeout(resizeSaveTimer);
                    resizeSaveTimer = setTimeout(() => StickyNotesStore.save(note), 300);
                });
                ro.observe(winEl);

                StickyNotesStore.save(note);

                const origClose = api.close;
                api.close = () => { ro.disconnect(); StickyNotesStore.remove(note.id); origClose(); };
            }
        });

        // Recrée au chargement toutes les notes laissées lors d'une session
        // précédente. S'exécute au moment où ce script se charge (comme
        // SettingsManager.apply(SettingsManager.load()) dans settings.js) : #desktop
        // et OS.wm existent déjà à ce stade (définis par le noyau, chargé avant tous
        // les greffons), donc créer des fenêtres ici est sûr.
        (function restorePersistedStickyNotes() {
            StickyNotesStore.list().forEach(note => {
                OS._pendingStickyNote = note;
                OS.launchApp('sys-stickynote');
            });
        })();
