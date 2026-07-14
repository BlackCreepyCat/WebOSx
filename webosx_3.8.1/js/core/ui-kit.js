        // ==================================================================
        // UI — "Bibliothèque partagée" façon DLL système, pour que n'importe
        // quelle app (aujourd'hui ET les futures) puisse afficher des
        // notifications et des boîtes de dialogue SANS avoir à réinventer sa
        // propre UI de toast/modale à chaque fois.
        //
        //   UI.notify({ title, message, type, duration, icon, actions, onClick })
        //     -> id (pour UI.dismissNotify(id) si besoin de la fermer plus tôt)
        //
        //   UI.requester({ title, message, icon, buttons, cancelId, defaultId })
        //     -> Promise<idDuBoutonCliqué>   (Échap => cancelId, Entrée => defaultId)
        //
        //   Raccourcis :
        //   UI.alert(texte | opts)              -> Promise<void>            (bouton OK)
        //   UI.confirm(texte | opts)             -> Promise<boolean>         (Oui/Non)
        //   UI.confirmCancel(texte | opts)       -> Promise<'yes'|'no'|'cancel'>
        //
        // Une seule boîte de dialogue à l'écran à la fois : les appels
        // suivants sont mis en file et s'affichent l'un après l'autre, pour
        // éviter que deux apps ne se marchent dessus si elles demandent une
        // confirmation au même moment.
        // ==================================================================

        const UI_NOTIFY_ICONS = {
            info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.2"/><circle cx="12" cy="7.6" r="1" fill="currentColor" stroke="none"/></svg>`,
            success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="8 12.5 10.5 15 16 9"/></svg>`,
            warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 21.5 20h-19Z"/><line x1="12" y1="9.5" x2="12" y2="14"/><circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none"/></svg>`,
            error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/><line x1="15.5" y1="8.5" x2="8.5" y2="15.5"/></svg>`
        };
        const UI_REQUESTER_ICONS = Object.assign({}, UI_NOTIFY_ICONS, {
            question: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.35-1 .8-1 1.7v.3"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/></svg>`
        });

        const UI_PICKER_ICON_FOLDER = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>`;
        const UI_PICKER_ICON_FILE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v4h4"/></svg>`;

        const UI = {
            _notifyContainer: null,
            _requesterOverlay: null,
            _notifyIdSeq: 1,
            _requesterQueue: [],
            _requesterBusy: false,

            _ensureContainers() {
                if (!this._notifyContainer) {
                    this._notifyContainer = document.createElement('div');
                    this._notifyContainer.id = 'ui-notify-stack';
                    document.body.appendChild(this._notifyContainer);
                }
                if (!this._requesterOverlay) {
                    this._requesterOverlay = document.createElement('div');
                    this._requesterOverlay.id = 'ui-requester-overlay';
                    this._requesterOverlay.className = 'ui-requester-overlay';
                    document.body.appendChild(this._requesterOverlay);
                }
            },

            // ---- Notifications (toasts) ----
            notify(opts) {
                this._ensureContainers();
                opts = Object.assign({ type: 'info', duration: 5000, title: '', message: '', icon: null, actions: [], onClick: null }, opts);
                const id = 'notify-' + (this._notifyIdSeq++);
                const el = document.createElement('div');
                el.className = `ui-notify ui-notify-${opts.type}`;
                el.dataset.id = id;
                const iconSvg = opts.icon || UI_NOTIFY_ICONS[opts.type] || UI_NOTIFY_ICONS.info;
                el.innerHTML = `
                    <div class="ui-notify-icon">${iconSvg}</div>
                    <div class="ui-notify-body">
                        ${opts.title ? `<div class="ui-notify-title">${escHtml(opts.title)}</div>` : ''}
                        ${opts.message ? `<div class="ui-notify-message">${escHtml(opts.message)}</div>` : ''}
                        ${opts.actions.length ? `<div class="ui-notify-actions"></div>` : ''}
                    </div>
                    <button class="ui-notify-close" aria-label="close">&#10005;</button>
                    ${opts.duration ? `<div class="ui-notify-progress"><div class="ui-notify-progress-bar" style="animation-duration:${opts.duration}ms"></div></div>` : ''}
                `;
                if (opts.actions.length) {
                    const actionsEl = el.querySelector('.ui-notify-actions');
                    opts.actions.forEach(a => {
                        const btn = document.createElement('button');
                        btn.className = 'ui-notify-action-btn';
                        btn.textContent = a.label;
                        btn.onclick = (e) => { e.stopPropagation(); this.dismissNotify(id); if (a.onClick) a.onClick(); };
                        actionsEl.appendChild(btn);
                    });
                }
                el.querySelector('.ui-notify-close').onclick = (e) => { e.stopPropagation(); this.dismissNotify(id); };
                if (opts.onClick) el.onclick = () => { this.dismissNotify(id); opts.onClick(); };
                this._notifyContainer.appendChild(el);
                requestAnimationFrame(() => el.classList.add('show'));
                if (opts.duration) el._timer = setTimeout(() => this.dismissNotify(id), opts.duration);
                return id;
            },

            dismissNotify(id) {
                if (!this._notifyContainer) return;
                const el = this._notifyContainer.querySelector(`[data-id="${id}"]`);
                if (!el) return;
                if (el._timer) clearTimeout(el._timer);
                el.classList.remove('show');
                el.classList.add('hide');
                setTimeout(() => el.remove(), 250);
            },

            // ---- Requesters (boîtes de dialogue modales, mises en file) ----
            requester(opts) {
                this._ensureContainers();
                return new Promise(resolve => {
                    this._requesterQueue.push({ opts, resolve });
                    this._processRequesterQueue();
                });
            },

            // Requester avec un champ de saisie texte — remplace prompt() natif du
            // navigateur (non stylable, esthétique différente du reste de l'OS).
            // Résout avec la chaîne saisie (pas de .trim() automatique, à faire côté
            // appelant ou via `validate`), ou `null` si annulé (Échap / bouton Annuler)
            // — même contrat que window.prompt().
            //
            //   const name = await UI.prompt({ title, message, value, placeholder,
            //       validate: (v) => v.trim() ? null : 'Ce champ est requis' });
            prompt(rawOpts) {
                this._ensureContainers();
                const opts = typeof rawOpts === 'string' ? { message: rawOpts } : rawOpts;
                return new Promise(resolve => {
                    this._requesterQueue.push({
                        opts: null,
                        resolve,
                        _customShow: (done) => this._showPrompt(opts, done)
                    });
                    this._processRequesterQueue();
                });
            },

            _showRequester(rawOpts, done) {
                const opts = Object.assign({
                    title: '', message: '', icon: 'question',
                    buttons: [{ id: 'ok', label: I18N.t('ui.ok'), variant: 'primary' }],
                    cancelId: null, defaultId: null
                }, rawOpts);

                const overlay = this._requesterOverlay;
                const box = document.createElement('div');
                const iconKey = typeof opts.icon === 'string' && UI_REQUESTER_ICONS[opts.icon] ? opts.icon : null;
                box.className = 'ui-requester-box' + (iconKey ? ` ui-requester-${iconKey}` : '');
                const iconSvg = iconKey ? UI_REQUESTER_ICONS[iconKey] : (opts.icon || UI_REQUESTER_ICONS.question);
                box.innerHTML = `
                    <div class="ui-requester-icon">${iconSvg}</div>
                    <div class="ui-requester-content">
                        ${opts.title ? `<div class="ui-requester-title">${escHtml(opts.title)}</div>` : ''}
                        ${opts.message ? `<div class="ui-requester-message">${escHtml(opts.message)}</div>` : ''}
                        <div class="ui-requester-buttons"></div>
                    </div>`;

                const btnRow = box.querySelector('.ui-requester-buttons');
                const defaultId = opts.defaultId || opts.buttons[0].id;
                const cancelId = opts.cancelId !== null ? opts.cancelId : opts.buttons[opts.buttons.length - 1].id;

                const finish = (id) => {
                    document.removeEventListener('keydown', onKey);
                    overlay.classList.remove('show');
                    // Ne retire QUE cette boîte précise (et seulement si elle est encore
                    // là) plutôt que de vider tout l'overlay : si un autre requester en
                    // file d'attente s'est déjà affiché entre-temps (done() ci-dessous
                    // déclenche la suite de la file de façon synchrone), ce nettoyage
                    // différé ne doit pas effacer SON contenu à lui.
                    setTimeout(() => {
                        if (box.parentNode === overlay) box.remove();
                        if (!overlay.hasChildNodes()) overlay.style.display = 'none';
                    }, 200);
                    done(id);
                };

                opts.buttons.forEach(b => {
                    const btn = document.createElement('button');
                    btn.className = 'ui-requester-btn' + (b.variant === 'primary' ? ' primary' : b.variant === 'danger' ? ' danger' : '');
                    btn.textContent = b.label;
                    btn.onclick = () => finish(b.id);
                    btnRow.appendChild(btn);
                });

                function onKey(e) {
                    if (e.key === 'Escape') { e.preventDefault(); finish(cancelId); }
                    else if (e.key === 'Enter') { e.preventDefault(); finish(defaultId); }
                }

                overlay.innerHTML = '';
                overlay.appendChild(box);
                overlay.style.display = 'flex';
                document.addEventListener('keydown', onKey);
                requestAnimationFrame(() => overlay.classList.add('show'));
                setTimeout(() => { const b = btnRow.querySelector('.primary') || btnRow.firstElementChild; if (b) b.focus(); }, 50);
            },

            _showPrompt(rawOpts, done) {
                const opts = Object.assign({
                    title: '', message: '', value: '', placeholder: '',
                    icon: 'question', okLabel: null, cancelLabel: null, validate: null
                }, rawOpts);

                const overlay = this._requesterOverlay;
                const box = document.createElement('div');
                const iconKey = typeof opts.icon === 'string' && UI_REQUESTER_ICONS[opts.icon] ? opts.icon : null;
                box.className = 'ui-requester-box' + (iconKey ? ` ui-requester-${iconKey}` : '');
                const iconSvg = iconKey ? UI_REQUESTER_ICONS[iconKey] : (opts.icon || UI_REQUESTER_ICONS.question);
                box.innerHTML = `
                    <div class="ui-requester-icon">${iconSvg}</div>
                    <div class="ui-requester-content">
                        ${opts.title ? `<div class="ui-requester-title">${escHtml(opts.title)}</div>` : ''}
                        ${opts.message ? `<div class="ui-requester-message">${escHtml(opts.message)}</div>` : ''}
                        <input type="text" class="ui-requester-input" value="${escHtml(opts.value)}" placeholder="${escHtml(opts.placeholder)}" autocomplete="off" spellcheck="false">
                        <div class="ui-requester-error"></div>
                        <div class="ui-requester-buttons">
                            <button class="ui-requester-btn" data-role="cancel">${escHtml(opts.cancelLabel || I18N.t('ui.cancel'))}</button>
                            <button class="ui-requester-btn primary" data-role="ok">${escHtml(opts.okLabel || I18N.t('ui.ok'))}</button>
                        </div>
                    </div>`;

                const input = box.querySelector('.ui-requester-input');
                const errorEl = box.querySelector('.ui-requester-error');
                const okBtn = box.querySelector('[data-role="ok"]');
                const cancelBtn = box.querySelector('[data-role="cancel"]');

                const finish = (result) => {
                    document.removeEventListener('keydown', onKey);
                    overlay.classList.remove('show');
                    setTimeout(() => {
                        if (box.parentNode === overlay) box.remove();
                        if (!overlay.hasChildNodes()) overlay.style.display = 'none';
                    }, 200);
                    done(result);
                };

                const submit = () => {
                    const val = input.value;
                    if (opts.validate) {
                        const err = opts.validate(val);
                        if (err) { errorEl.textContent = err; input.focus(); return; }
                    }
                    finish(val);
                };

                okBtn.onclick = submit;
                cancelBtn.onclick = () => finish(null);
                input.addEventListener('input', () => { if (errorEl.textContent) errorEl.textContent = ''; });

                function onKey(e) {
                    if (e.key === 'Escape') { e.preventDefault(); finish(null); }
                    else if (e.key === 'Enter') { e.preventDefault(); submit(); }
                }

                overlay.innerHTML = '';
                overlay.appendChild(box);
                overlay.style.display = 'flex';
                document.addEventListener('keydown', onKey);
                requestAnimationFrame(() => overlay.classList.add('show'));
                setTimeout(() => { input.focus(); input.select(); }, 50);
            },

            alert(opts) {
                opts = typeof opts === 'string' ? { message: opts } : opts;
                return this.requester(Object.assign({ icon: 'info', buttons: [{ id: 'ok', label: I18N.t('ui.ok'), variant: 'primary' }] }, opts)).then(() => {});
            },

            confirm(opts) {
                opts = typeof opts === 'string' ? { message: opts } : opts;
                return this.requester(Object.assign({
                    icon: 'question',
                    buttons: [{ id: 'yes', label: I18N.t('ui.yes'), variant: 'primary' }, { id: 'no', label: I18N.t('ui.no') }],
                    cancelId: 'no'
                }, opts)).then(id => id === 'yes');
            },

            confirmCancel(opts) {
                opts = typeof opts === 'string' ? { message: opts } : opts;
                return this.requester(Object.assign({
                    icon: 'question',
                    buttons: [
                        { id: 'yes', label: I18N.t('ui.yes'), variant: 'primary' },
                        { id: 'no', label: I18N.t('ui.no') },
                        { id: 'cancel', label: I18N.t('ui.cancel') }
                    ],
                    cancelId: 'cancel'
                }, opts));
            },

            // ---- Sélecteur de fichier (navigue dans le VFS) ----
            // Réutilisable par n'importe quelle app qui a besoin d'ouvrir un fichier
            // depuis "Mes Fichiers" sans réimplémenter sa propre UI de navigation.
            //   UI.filePicker({ title, extensions: ['.txt','.md'] })
            //     -> Promise<{ path: string[], name: string } | null>   (null = annulé)
            // Passe par la même file d'attente que requester() (une seule boîte de
            // dialogue à l'écran à la fois).
            filePicker(rawOpts) {
                this._ensureContainers();
                return new Promise(resolve => {
                    this._requesterQueue.push({
                        opts: null,
                        resolve,
                        _customShow: (done) => this._showFilePicker(rawOpts, done)
                    });
                    this._processRequesterQueue();
                });
            },

            _processRequesterQueue() {
                if (this._requesterBusy || this._requesterQueue.length === 0) return;
                this._requesterBusy = true;
                const item = this._requesterQueue.shift();
                const onDone = (result) => {
                    this._requesterBusy = false;
                    item.resolve(result);
                    this._processRequesterQueue();
                };
                if (item._customShow) item._customShow(onDone);
                else this._showRequester(item.opts, onDone);
            },

            _showFilePicker(rawOpts, done) {
                const opts = Object.assign({ title: I18N.t('ui.filePicker.title'), extensions: null }, rawOpts);
                let cwd = [];
                let selected = null;

                const overlay = this._requesterOverlay;
                const box = document.createElement('div');
                box.className = 'ui-filepicker-box';
                box.innerHTML = `
                    <div class="ui-requester-title">${escHtml(opts.title)}</div>
                    <div class="ui-filepicker-breadcrumb"></div>
                    <div class="ui-filepicker-list"></div>
                    <div class="ui-requester-buttons">
                        <button class="ui-requester-btn" data-role="cancel">${escHtml(I18N.t('ui.cancel'))}</button>
                        <button class="ui-requester-btn primary" data-role="open" disabled>${escHtml(I18N.t('ui.filePicker.open'))}</button>
                    </div>`;

                const bcEl = box.querySelector('.ui-filepicker-breadcrumb');
                const listEl = box.querySelector('.ui-filepicker-list');
                const openBtn = box.querySelector('[data-role="open"]');
                const cancelBtn = box.querySelector('[data-role="cancel"]');

                const matchesExt = (name) => !opts.extensions || opts.extensions.some(ext => name.toLowerCase().endsWith(ext.toLowerCase()));

                const finish = (result) => {
                    document.removeEventListener('keydown', onKey);
                    overlay.classList.remove('show');
                    setTimeout(() => { if (box.parentNode === overlay) box.remove(); if (!overlay.hasChildNodes()) overlay.style.display = 'none'; }, 200);
                    done(result);
                };

                function renderBreadcrumb() {
                    bcEl.innerHTML = '';
                    const rootBtn = document.createElement('button');
                    rootBtn.className = 'ui-filepicker-crumb' + (cwd.length === 0 ? ' active' : '');
                    rootBtn.textContent = VFS.ROOT_NAME;
                    rootBtn.onclick = () => { cwd = []; selected = null; renderAll(); };
                    bcEl.appendChild(rootBtn);
                    cwd.forEach((seg, idx) => {
                        const sep = document.createElement('span'); sep.className = 'ui-filepicker-sep'; sep.textContent = '/';
                        bcEl.appendChild(sep);
                        const btn = document.createElement('button');
                        btn.className = 'ui-filepicker-crumb' + (idx === cwd.length - 1 ? ' active' : '');
                        btn.textContent = seg;
                        btn.onclick = () => { cwd = cwd.slice(0, idx + 1); selected = null; renderAll(); };
                        bcEl.appendChild(btn);
                    });
                }

                async function renderList() {
                    const raw = await VFS.list(cwd) || [];
                    const items = raw.filter(it => it.type === 'dir' || matchesExt(it.name));
                    listEl.innerHTML = '';
                    if (!items.length) { listEl.innerHTML = `<div class="ui-filepicker-empty">${escHtml(I18N.t('files.empty'))}</div>`; return; }
                    items.forEach(it => {
                        const row = document.createElement('div');
                        row.className = 'ui-filepicker-row' + (selected && selected.name === it.name ? ' selected' : '');
                        row.innerHTML = `<span class="ui-filepicker-icon">${it.type === 'dir' ? UI_PICKER_ICON_FOLDER : UI_PICKER_ICON_FILE}</span><span class="ui-filepicker-name">${escHtml(it.name)}</span>`;
                        row.onclick = () => {
                            if (it.type === 'dir') { cwd = [...cwd, it.name]; selected = null; renderAll(); return; }
                            selected = it;
                            renderAll();
                        };
                        row.ondblclick = () => { if (it.type === 'file') { selected = it; confirmOpen(); } };
                        listEl.appendChild(row);
                    });
                }

                async function renderAll() { renderBreadcrumb(); await renderList(); openBtn.disabled = !selected; }

                function confirmOpen() {
                    if (!selected) return;
                    finish({ path: [...cwd, selected.name], name: selected.name });
                }

                openBtn.onclick = confirmOpen;
                cancelBtn.onclick = () => finish(null);

                function onKey(e) {
                    if (e.key === 'Escape') { e.preventDefault(); finish(null); }
                    else if (e.key === 'Enter' && selected) { e.preventDefault(); confirmOpen(); }
                }

                overlay.innerHTML = '';
                overlay.appendChild(box);
                overlay.style.display = 'flex';
                document.addEventListener('keydown', onKey);
                requestAnimationFrame(() => overlay.classList.add('show'));
                renderAll();
            }
        };
