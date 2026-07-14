        // ==================================================================
        // SettingsRegistry — permet à n'importe quel greffon (fichier de
        // js/apps/) d'ajouter son propre onglet et/ou panneau dans l'app
        // Réglages, sans jamais avoir à modifier settings-app.js. Même
        // logique d'extensibilité que AppRegistry pour les apps du bureau.
        //
        // Un ONGLET (tab) est une catégorie affichée dans la barre latérale
        // (ex: "Apparence", "Performance"). Un PANNEAU (panel) est un bloc
        // de réglages rattaché à un onglet — plusieurs panneaux peuvent
        // partager un même onglet, rendus dans l'ordre de leur `order`
        // (convention : espacer de 10 en 10 pour laisser de la place à de
        // futures insertions, comme pour les onglets eux-mêmes).
        //
        // Exemple d'ajout depuis une app tierce (ex: js/apps/mp3.js) :
        //
        //   SettingsRegistry.registerTab({
        //       id: 'audio', titleKey: 'settings.tabs.audio',
        //       icon: `<svg viewBox="0 0 24 24">...</svg>`, order: 25
        //   });
        //   SettingsRegistry.registerPanel({
        //       id: 'audio-volume', tabId: 'audio', order: 10,
        //       render(container, settings, save) {
        //           container.innerHTML = `<div class="setting-group">...</div>`;
        //           container.querySelector('#vol').oninput = (e) => {
        //               settings.volume = parseFloat(e.target.value);
        //               save();
        //           };
        //       }
        //   });
        //
        // `render(container, settings, save)` est rappelée à chaque fois que
        // l'onglet parent est affiché (changement d'onglet, réouverture de
        // l'app, changement de langue) : le panneau reconstruit son propre
        // DOM à chaque fois, il n'a pas besoin de gérer lui-même le nettoyage.
        // `settings` est l'objet partagé (chargé via SettingsManager.load()) ;
        // `save()` persiste et applique les changements immédiatement.
        // ==================================================================
        const SettingsRegistry = {
            tabs: [],
            panels: [],

            registerTab(tab) {
                if (!tab || !tab.id || !tab.titleKey) throw new Error('Onglet de configuration invalide (id/titleKey requis)');
                if (this.tabs.some(t => t.id === tab.id)) return; // déjà enregistré : évite les doublons
                this.tabs.push(Object.assign({ order: 100, icon: '' }, tab));
                this.tabs.sort((a, b) => a.order - b.order);
            },

            registerPanel(panel) {
                if (!panel || !panel.id || !panel.tabId || typeof panel.render !== 'function') {
                    throw new Error('Panneau de configuration invalide (id/tabId/render requis)');
                }
                if (this.panels.some(p => p.id === panel.id)) return;
                this.panels.push(Object.assign({ order: 100 }, panel));
                this.panels.sort((a, b) => a.order - b.order);
            },

            panelsForTab(tabId) {
                return this.panels.filter(p => p.tabId === tabId);
            }
        };
