        // ==================================================================
        // App "Mes Fichiers" — explorateur pour le système de fichiers
        // virtuel (VFS, voir js/core/vfs.js). Import, suppression,
        // renommage et téléchargement de fichiers, tout restant chrooté
        // dans ce dossier virtuel dédié — aucun accès au vrai disque en
        // dehors des imports/exports explicites de l'utilisateur.
        // ==================================================================

        // Icône dédiée : un dossier + une pastille accent, pour bien le
        // distinguer visuellement d'un dossier générique — signal clair
        // que c'est LE dossier personnel de l'utilisateur dans l'OS.
        const FILES_APP_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><circle cx="17.3" cy="8.3" r="1.7" fill="currentColor" stroke="none" stroke-width="0"/></svg>`;
        const ICON_FOLDER = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>`;
        const ICON_FILE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v4h4"/></svg>`;
        const ICON_FILE_IMAGE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v4h4"/><circle cx="11" cy="13.5" r="1.3"/><path d="m9 17.5 2.3-2.6 1.4 1.6 1.8-2.2 2 3.2"/></svg>`;

        // escHtml est l'utilitaire d'échappement global défini dans js/core/i18n.js
        // (déjà utilisé par os.js et window-manager.js) ; esc() est juste un alias
        // court, cohérent avec la convention de nommage utilisée dans terminal.js.
        const esc = escHtml;

        I18N.registerLang('fr', {
            'files.toolbar.upload': 'Importer',
            'files.toolbar.newFolder': 'Nouveau dossier',
            'files.toolbar.rename': 'Renommer',
            'files.toolbar.delete': 'Supprimer',
            'files.toolbar.download': 'Télécharger',
            'files.toolbar.open': 'Ouvrir...',
            'files.openError': 'Impossible d\'ouvrir ce fichier.',
            'files.noAppForType': 'Aucune application ne sait ouvrir ce type de fichier.',
            'files.empty': 'Ce dossier est vide',
            'files.usage': '{used} utilisés',
            'files.newFolderPrompt': 'Nom du nouveau dossier :',
            'files.renamePrompt': 'Nouveau nom :',
            'files.deleteConfirm': 'Supprimer {n} élément(s) ? Cette action est irréversible.',
            'files.nameExists': 'Ce nom existe déjà ici.',
            'files.invalidName': 'Nom invalide (non vide, sans "/").',
            'files.tooLarge': 'Fichier trop volumineux (max {max} par fichier).',
            'files.quota': 'Stockage local plein — libérez de la place avant de continuer.',
            'files.itemsCount': '{n} élément(s)',
            'files.storageUnavailable': 'Stockage local indisponible dans ce contexte (souvent le cas en file://) — servez la page via un serveur local (ex: "python -m http.server") ou en ligne.',
            'files.readError': 'Erreur de lecture du fichier "{name}"',
            'files.writeError': 'Erreur d\'écriture : {err}',
            'files.uploadedNotify': '{n} fichier(s) importé(s)',
            'files.deletedNotify': '{n} élément(s) supprimé(s)'
        });
        I18N.registerLang('en', {
            'files.toolbar.upload': 'Upload',
            'files.toolbar.newFolder': 'New folder',
            'files.toolbar.rename': 'Rename',
            'files.toolbar.delete': 'Delete',
            'files.toolbar.download': 'Download',
            'files.toolbar.open': 'Open...',
            'files.openError': 'Unable to open this file.',
            'files.noAppForType': 'No app can open this file type.',
            'files.empty': 'This folder is empty',
            'files.usage': '{used} used',
            'files.newFolderPrompt': 'New folder name:',
            'files.renamePrompt': 'New name:',
            'files.deleteConfirm': 'Delete {n} item(s)? This cannot be undone.',
            'files.nameExists': 'That name already exists here.',
            'files.invalidName': 'Invalid name (non-empty, no "/").',
            'files.tooLarge': 'File too large (max {max} per file).',
            'files.quota': 'Local storage is full — free up space before continuing.',
            'files.itemsCount': '{n} item(s)',
            'files.storageUnavailable': 'Local storage is unavailable in this context (often the case with file://) — serve the page via a local server (e.g. "python -m http.server") or host it online.',
            'files.readError': 'Error reading file "{name}"',
            'files.writeError': 'Write error: {err}',
            'files.uploadedNotify': '{n} file(s) uploaded',
            'files.deletedNotify': '{n} item(s) deleted'
        });
        I18N.registerLang('es', {
            'files.toolbar.upload': 'Importar',
            'files.toolbar.newFolder': 'Nueva carpeta',
            'files.toolbar.rename': 'Renombrar',
            'files.toolbar.delete': 'Eliminar',
            'files.toolbar.download': 'Descargar',
            'files.toolbar.open': 'Abrir...',
            'files.openError': 'No se puede abrir este archivo.',
            'files.noAppForType': 'Ninguna aplicación puede abrir este tipo de archivo.',
            'files.empty': 'Esta carpeta está vacía',
            'files.usage': '{used} usados',
            'files.newFolderPrompt': 'Nombre de la nueva carpeta:',
            'files.renamePrompt': 'Nuevo nombre:',
            'files.deleteConfirm': '¿Eliminar {n} elemento(s)? Esta acción no se puede deshacer.',
            'files.nameExists': 'Ese nombre ya existe aquí.',
            'files.invalidName': 'Nombre inválido (no vacío, sin "/").',
            'files.tooLarge': 'Archivo demasiado grande (máx. {max} por archivo).',
            'files.quota': 'Almacenamiento local lleno — libera espacio antes de continuar.',
            'files.itemsCount': '{n} elemento(s)',
            'files.storageUnavailable': 'Almacenamiento local no disponible en este contexto (frecuente con file://) — sirve la página con un servidor local (ej: "python -m http.server") o en línea.',
            'files.readError': 'Error al leer el archivo "{name}"',
            'files.writeError': 'Error de escritura: {err}',
            'files.uploadedNotify': '{n} archivo(s) importado(s)',
            'files.deletedNotify': '{n} elemento(s) eliminado(s)'
        });
        I18N.registerLang('de', {
            'files.toolbar.upload': 'Importieren',
            'files.toolbar.newFolder': 'Neuer Ordner',
            'files.toolbar.rename': 'Umbenennen',
            'files.toolbar.delete': 'Löschen',
            'files.toolbar.download': 'Herunterladen',
            'files.toolbar.open': 'Öffnen...',
            'files.openError': 'Diese Datei kann nicht geöffnet werden.',
            'files.noAppForType': 'Keine App kann diesen Dateityp öffnen.',
            'files.empty': 'Dieser Ordner ist leer',
            'files.usage': '{used} belegt',
            'files.newFolderPrompt': 'Name des neuen Ordners:',
            'files.renamePrompt': 'Neuer Name:',
            'files.deleteConfirm': '{n} Element(e) löschen? Dies kann nicht rückgängig gemacht werden.',
            'files.nameExists': 'Dieser Name existiert hier bereits.',
            'files.invalidName': 'Ungültiger Name (nicht leer, ohne "/").',
            'files.tooLarge': 'Datei zu groß (max. {max} pro Datei).',
            'files.quota': 'Lokaler Speicher voll — geben Sie Speicherplatz frei, bevor Sie fortfahren.',
            'files.itemsCount': '{n} Element(e)',
            'files.storageUnavailable': 'Lokaler Speicher in diesem Kontext nicht verfügbar (oft bei file:// der Fall) — Seite über einen lokalen Server bereitstellen (z.B. "python -m http.server") oder online hosten.',
            'files.readError': 'Fehler beim Lesen der Datei "{name}"',
            'files.writeError': 'Schreibfehler: {err}',
            'files.uploadedNotify': '{n} Datei(en) importiert',
            'files.deletedNotify': '{n} Element(e) gelöscht'
        });
        I18N.registerLang('it', {
            'files.toolbar.upload': 'Carica',
            'files.toolbar.newFolder': 'Nuova cartella',
            'files.toolbar.rename': 'Rinomina',
            'files.toolbar.delete': 'Elimina',
            'files.toolbar.download': 'Scarica',
            'files.toolbar.open': 'Apri...',
            'files.openError': 'Impossibile aprire questo file.',
            'files.noAppForType': 'Nessuna app può aprire questo tipo di file.',
            'files.empty': 'Questa cartella è vuota',
            'files.usage': '{used} usati',
            'files.newFolderPrompt': 'Nome della nuova cartella:',
            'files.renamePrompt': 'Nuovo nome:',
            'files.deleteConfirm': 'Eliminare {n} elemento/i? Questa azione non può essere annullata.',
            'files.nameExists': 'Questo nome esiste già qui.',
            'files.invalidName': 'Nome non valido (non vuoto, senza "/").',
            'files.tooLarge': 'File troppo grande (max {max} per file).',
            'files.quota': 'Spazio di archiviazione locale pieno — libera spazio prima di continuare.',
            'files.itemsCount': '{n} elemento/i',
            'files.storageUnavailable': 'Archiviazione locale non disponibile in questo contesto (spesso il caso con file://) — servi la pagina tramite un server locale (es. "python -m http.server") oppure online.',
            'files.readError': 'Errore durante la lettura del file "{name}"',
            'files.writeError': 'Errore di scrittura: {err}',
            'files.uploadedNotify': '{n} file caricati',
            'files.deletedNotify': '{n} elemento/i eliminati'
        });
        I18N.registerLang('pt', {
            'files.toolbar.upload': 'Carregar',
            'files.toolbar.newFolder': 'Nova pasta',
            'files.toolbar.rename': 'Renomear',
            'files.toolbar.delete': 'Eliminar',
            'files.toolbar.download': 'Transferir',
            'files.toolbar.open': 'Abrir...',
            'files.openError': 'Não é possível abrir este ficheiro.',
            'files.noAppForType': 'Nenhuma aplicação consegue abrir este tipo de ficheiro.',
            'files.empty': 'Esta pasta está vazia',
            'files.usage': '{used} usados',
            'files.newFolderPrompt': 'Nome da nova pasta:',
            'files.renamePrompt': 'Novo nome:',
            'files.deleteConfirm': 'Eliminar {n} item(ns)? Esta ação não pode ser desfeita.',
            'files.nameExists': 'Esse nome já existe aqui.',
            'files.invalidName': 'Nome inválido (não vazio, sem "/").',
            'files.tooLarge': 'Ficheiro demasiado grande (máx. {max} por ficheiro).',
            'files.quota': 'Armazenamento local cheio — liberte espaço antes de continuar.',
            'files.itemsCount': '{n} item(ns)',
            'files.storageUnavailable': 'Armazenamento local indisponível neste contexto (frequente com file://) — sirva a página através de um servidor local (ex.: "python -m http.server") ou online.',
            'files.readError': 'Erro ao ler o ficheiro "{name}"',
            'files.writeError': 'Erro de escrita: {err}',
            'files.uploadedNotify': '{n} ficheiro(s) carregado(s)',
            'files.deletedNotify': '{n} item(ns) eliminado(s)'
        });

        OS.registry.register({
            id: 'sys-files', name: I18N.t('app.files'), nameKey: 'app.files', icon: FILES_APP_ICON,
            defaultWidth: 640, defaultHeight: 460, singleton: true,
            init: (c, api) => {
                let cwd = [];
                let selected = new Set();

                async function storageAvailable() {
                    try { await VFS._openDB(); return true; }
                    catch (e) { return false; }
                }

                function notifyError(msg) { UI.notify({ title: I18N.t('app.files'), message: msg, type: 'error', duration: 6000 }); }
                function notifyWarning(msg) { UI.notify({ title: I18N.t('app.files'), message: msg, type: 'warning', duration: 6000 }); }
                function notifySuccess(msg) { UI.notify({ title: I18N.t('app.files'), message: msg, type: 'success', duration: 3500 }); }

                function iconFor(item) {
                    if (item.type === 'dir') return ICON_FOLDER;
                    if (item.mime && item.mime.startsWith('image/')) return ICON_FILE_IMAGE;
                    return ICON_FILE;
                }

                async function uniqueName(name) {
                    const items = await VFS.list(cwd) || [];
                    const taken = new Set(items.map(i => i.name));
                    if (!taken.has(name)) return name;
                    const dot = name.lastIndexOf('.');
                    const base = dot > 0 ? name.slice(0, dot) : name;
                    const ext = dot > 0 ? name.slice(dot) : '';
                    let n = 2;
                    while (taken.has(`${base} (${n})${ext}`)) n++;
                    return `${base} (${n})${ext}`;
                }

                function downloadNode(name, node) {
                    const a = document.createElement('a');
                    if (node.binary) {
                        a.href = node.content;
                    } else {
                        const blob = new Blob([node.content], { type: node.mime || 'text/plain' });
                        a.href = URL.createObjectURL(blob);
                    }
                    a.download = name;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    if (!node.binary) setTimeout(() => URL.revokeObjectURL(a.href), 1000);
                }

                async function navigate(segs) { cwd = segs; selected.clear(); await render(); }

                // Routage unique par type de fichier — utilisé à la fois par le bouton
                // "Ouvrir..." et le double-clic sur une ligne, pour ne jamais avoir à
                // maintenir cette logique à deux endroits différents.
                async function openItem(item) {
                    const path = [...cwd, item.name];
                    const mime = item.mime || '';

                    // Priorité aux images AVANT le texte : un .svg est du XML valide
                    // (donc VFS.isTextMime() le laisserait passer comme "texte"), mais
                    // on veut le voir dessiné, pas lire son code source.
                    if (/^image\//.test(mime)) {
                        const r = await VFS.readFile(path);
                        if (!r.ok) { notifyError(I18N.t('files.openError')); return; }
                        OS._pendingMediaOpen = { kind: 'image', src: r.content, name: item.name };
                        OS.launchApp('sys-imageviewer');
                        return;
                    }

                    if (VFS.isTextMime(mime)) {
                        // readFileAsText() décode aussi les fichiers texte importés en
                        // binaire (base64) — voir la correction du bug "erreur binary".
                        const r = await VFS.readFileAsText(path);
                        if (r.error === 'binary') { notifyWarning(I18N.t('notepad.vfs.binaryFile')); return; }
                        if (r.error) { notifyError(I18N.t('notepad.vfs.readError', { err: r.error })); return; }
                        OS.launchApp('sys-notepad');
                        window.dispatchEvent(new CustomEvent('webosx:notepad-open-vfs', { detail: { name: item.name, content: r.content } }));
                        return;
                    }

                    if (/^audio\//.test(mime) || /^video\//.test(mime)) {
                        const file = await VFS.toFile(path);
                        if (!file) { notifyError(I18N.t('files.openError')); return; }
                        const kind = /^audio\//.test(mime) ? 'mp3' : 'video';
                        // Mp3/Video/Image ne sont pas des apps singleton : on dépose le
                        // fichier dans une boîte aux lettres à usage unique plutôt que
                        // d'émettre un événement global (que TOUTES les fenêtres déjà
                        // ouvertes de ce lecteur recevraient, et se mettraient à lire en
                        // même temps).
                        OS._pendingMediaOpen = { kind, file };
                        OS.launchApp(kind === 'mp3' ? 'sys-mp3' : 'sys-video');
                        return;
                    }

                    notifyWarning(I18N.t('files.noAppForType'));
                }

                function renderBreadcrumb() {
                    const bc = c.querySelector('#files-breadcrumb');
                    bc.innerHTML = '';
                    const rootBtn = document.createElement('button');
                    rootBtn.className = 'files-crumb' + (cwd.length === 0 ? ' active' : '');
                    rootBtn.innerHTML = `${FILES_APP_ICON}<span>${esc(VFS.ROOT_NAME)}</span>`;
                    rootBtn.onclick = () => navigate([]);
                    bc.appendChild(rootBtn);
                    cwd.forEach((seg, idx) => {
                        const sep = document.createElement('span');
                        sep.className = 'files-crumb-sep'; sep.textContent = '/';
                        bc.appendChild(sep);
                        const btn = document.createElement('button');
                        btn.className = 'files-crumb' + (idx === cwd.length - 1 ? ' active' : '');
                        btn.textContent = seg;
                        btn.onclick = () => navigate(cwd.slice(0, idx + 1));
                        bc.appendChild(btn);
                    });
                }

                async function updateToolbarState() {
                    const n = selected.size;
                    c.querySelector('#files-btn-rename').disabled = n !== 1;
                    c.querySelector('#files-btn-delete').disabled = n === 0;
                    const items = await VFS.list(cwd) || [];
                    const selectedItems = items.filter(i => selected.has(i.name));
                    c.querySelector('#files-btn-download').disabled = n === 0 || selectedItems.some(i => i.type === 'dir');
                    // "Ouvrir..." : uniquement pour UN seul fichier ouvrable (texte, audio
                    // ou vidéo) sélectionné — pas un dossier, pas une image/PDF/etc.
                    const openable = selectedItems[0] && selectedItems[0].type === 'file' && (VFS.isTextMime(selectedItems[0].mime) || /^(audio|video|image)\//.test(selectedItems[0].mime || ''));
                    c.querySelector('#files-btn-open').disabled = n !== 1 || !openable;
                }

                // Ne fait que refléter `selected` sur les lignes déjà présentes dans le DOM
                // (ajoute/retire la classe .selected), sans rien recréer. Utilisé sur un
                // simple clic : reconstruire toute la liste à ce moment-là (voir renderList)
                // remplaçait les noeuds DOM entre les deux clics d'un double-clic, ce qui
                // empêchait le navigateur de reconnaître la séquence comme un double-clic
                // dès qu'il y avait plusieurs lignes (le second clic tombait sur un noeud
                // fraîchement recréé, sans historique de clic).
                function updateSelectionClasses() {
                    const listEl = c.querySelector('#files-list');
                    listEl.querySelectorAll('.files-row').forEach(row => {
                        row.classList.toggle('selected', selected.has(row.dataset.name));
                    });
                }

                async function renderList() {
                    const listEl = c.querySelector('#files-list');
                    const items = await VFS.list(cwd) || [];
                    listEl.innerHTML = '';
                    if (items.length === 0) {
                        listEl.innerHTML = `<div class="files-empty">${I18N.t('files.empty')}</div>`;
                    } else {
                        items.forEach(item => {
                            const row = document.createElement('div');
                            row.dataset.name = item.name;
                            row.className = 'files-row' + (selected.has(item.name) ? ' selected' : '');
                            const dateStr = item.mtime ? new Date(item.mtime).toLocaleDateString(I18N.locale(), { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
                            row.innerHTML = `<span class="files-row-icon">${iconFor(item)}</span><span class="files-row-name">${esc(item.name)}</span><span class="files-row-size">${item.type === 'dir' ? '' : VFS.formatSize(item.size)}</span><span class="files-row-date">${dateStr}</span>`;
                            row.onclick = (e) => {
                                if (e.ctrlKey || e.metaKey) { selected.has(item.name) ? selected.delete(item.name) : selected.add(item.name); }
                                else { selected.clear(); selected.add(item.name); }
                                updateSelectionClasses(); updateToolbarState();
                            };
                            row.ondblclick = async () => {
                                if (item.type === 'dir') { await navigate([...cwd, item.name]); return; }
                                const mime = item.mime || '';
                                if (VFS.isTextMime(mime) || /^(audio|video|image)\//.test(mime)) { await openItem(item); return; }
                                const r = await VFS.readFile([...cwd, item.name]);
                                if (r.ok) downloadNode(item.name, r);
                            };
                            listEl.appendChild(row);
                        });
                    }
                    c.querySelector('#files-count').textContent = I18N.t('files.itemsCount', { n: items.length });
                    c.querySelector('#files-usage').textContent = I18N.t('files.usage', { used: VFS.formatSize(await VFS.usageBytes()) });
                    await updateToolbarState();
                }

                async function render() {
                    renderBreadcrumb();
                    await renderList();
                }

                function setup() {
                    c.innerHTML = `
                    <div class="files-shell">
                        <div class="files-toolbar">
                            <button class="files-tool-btn" id="files-btn-upload" title="${I18N.t('files.toolbar.upload')}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="m6 9 6-6 6 6"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>
                                <span>${I18N.t('files.toolbar.upload')}</span>
                            </button>
                            <button class="files-tool-btn" id="files-btn-newfolder" title="${I18N.t('files.toolbar.newFolder')}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="9.5" y1="13.5" x2="14.5" y2="13.5"/></svg>
                                <span>${I18N.t('files.toolbar.newFolder')}</span>
                            </button>
                            <span class="files-tool-sep"></span>
                            <button class="files-tool-btn" id="files-btn-rename" title="${I18N.t('files.toolbar.rename')}" disabled>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                            </button>
                            <button class="files-tool-btn" id="files-btn-open" title="${I18N.t('files.toolbar.open')}" disabled>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M20 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                            </button>
                            <button class="files-tool-btn" id="files-btn-download" title="${I18N.t('files.toolbar.download')}" disabled>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12"/><path d="m6 11 6 6 6-6"/><path d="M4 20h16"/></svg>
                            </button>
                            <button class="files-tool-btn files-tool-danger" id="files-btn-delete" title="${I18N.t('files.toolbar.delete')}" disabled>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>
                            </button>
                            <span class="files-tool-fill"></span>
                        </div>
                        <div class="files-breadcrumb" id="files-breadcrumb"></div>
                        <div class="files-list" id="files-list"></div>
                        <div class="files-footer">
                            <span id="files-count"></span>
                            <span class="files-tool-fill"></span>
                            <span id="files-usage"></span>
                        </div>
                        <input type="file" id="files-upload-input" multiple style="display:none;">
                    </div>`;

                    const uploadInput = c.querySelector('#files-upload-input');
                    c.querySelector('#files-btn-upload').onclick = async () => {
                        if (!(await storageAvailable())) { notifyError(I18N.t('files.storageUnavailable')); return; }
                        uploadInput.click();
                    };
                    uploadInput.onchange = () => {
                        const files = [...uploadInput.files];
                        uploadInput.value = '';
                        if (!files.length) return;
                        let uploadedCount = 0, remaining = files.length;
                        const checkUploadDone = () => {
                            remaining--;
                            // Une seule notification groupée à la fin du lot plutôt qu'un
                            // toast par fichier : évite de spammer le coin de l'écran si
                            // l'utilisateur importe 10 fichiers d'un coup.
                            if (remaining === 0 && uploadedCount > 0) {
                                notifySuccess(I18N.t('files.uploadedNotify', { n: uploadedCount }));
                            }
                        };
                        files.forEach(file => {
                            const reader = new FileReader();
                            reader.onerror = () => { console.error('files: échec de lecture', file.name, reader.error); notifyError(I18N.t('files.readError', { name: file.name })); checkUploadDone(); };
                            reader.onload = async () => {
                                try {
                                    const name = await uniqueName(file.name);
                                    const r = await VFS.writeFile([...cwd, name], reader.result, file.type || 'application/octet-stream', true);
                                    if (r.error === 'tooLarge') notifyWarning(I18N.t('files.tooLarge', { max: VFS.formatSize(VFS.MAX_FILE_BYTES) }));
                                    else if (r.error === 'quota') notifyError(I18N.t('files.quota'));
                                    else if (r.error) { console.error('files: écriture refusée', r); notifyError(I18N.t('files.writeError', { err: r.error })); }
                                    else { uploadedCount++; await render(); }
                                } catch (err) {
                                    console.error('files: exception à l\'import', err);
                                    notifyError(I18N.t('files.writeError', { err: err.message }));
                                }
                                checkUploadDone();
                            };
                            reader.readAsDataURL(file);
                        });
                    };

                    c.querySelector('#files-btn-newfolder').onclick = async () => {
                        const name = await UI.prompt({
                            title: I18N.t('files.toolbar.newFolder'),
                            message: I18N.t('files.newFolderPrompt'),
                            validate: (v) => (!v.trim() || v.includes('/')) ? I18N.t('files.invalidName') : null
                        });
                        if (name === null) return;
                        const r = await VFS.mkdir([...cwd, name.trim()]);
                        if (r.error === 'exists') notifyWarning(I18N.t('files.nameExists'));
                        else await render();
                    };

                    c.querySelector('#files-btn-rename').onclick = async () => {
                        if (selected.size !== 1) return;
                        const oldName = [...selected][0];
                        const newName = await UI.prompt({
                            title: I18N.t('files.toolbar.rename'),
                            message: I18N.t('files.renamePrompt'),
                            value: oldName,
                            validate: (v) => (!v.trim() || v.includes('/')) ? I18N.t('files.invalidName') : null
                        });
                        if (newName === null || newName === oldName) return;
                        const r = await VFS.rename([...cwd, oldName], [...cwd, newName.trim()]);
                        if (r.error === 'exists') notifyWarning(I18N.t('files.nameExists'));
                        else { selected.clear(); selected.add(newName.trim()); await render(); }
                    };

                    c.querySelector('#files-btn-delete').onclick = async () => {
                        if (selected.size === 0) return;
                        const n = selected.size;
                        const ok = await UI.confirm({
                            title: I18N.t('files.toolbar.delete'),
                            message: I18N.t('files.deleteConfirm', { n }),
                            icon: 'warning'
                        });
                        if (!ok) return;
                        // for...of + await plutôt que forEach (qui n'attend pas les
                        // callbacks async) : chaque suppression doit être terminée avant
                        // de passer à la suivante.
                        for (const name of selected) { await VFS.remove([...cwd, name], true); }
                        selected.clear();
                        await render();
                        notifySuccess(I18N.t('files.deletedNotify', { n }));
                    };

                    c.querySelector('#files-btn-open').onclick = async () => {
                        if (selected.size !== 1) return;
                        const items = await VFS.list(cwd) || [];
                        const item = items.find(i => selected.has(i.name));
                        if (!item || item.type !== 'file') return;
                        await openItem(item);
                    };

                    c.querySelector('#files-btn-download').onclick = async () => {
                        const items = await VFS.list(cwd) || [];
                        for (const i of items) {
                            if (!selected.has(i.name) || i.type !== 'file') continue;
                            const r = await VFS.readFile([...cwd, i.name]);
                            if (r.ok) downloadNode(i.name, r);
                        }
                    };

                    render();
                }

                setup();
                const onVfsChange = () => render();
                VFS.onChange(onVfsChange);
                window.addEventListener('webosx:langchange', setup);
                const origClose = api.close;
                api.close = () => {
                    window.removeEventListener('webosx:langchange', setup);
                    VFS._listeners = VFS._listeners.filter(fn => fn !== onVfsChange);
                    origClose();
                };
            }
        });
