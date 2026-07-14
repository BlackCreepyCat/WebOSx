        // ==================================================================
        // VFS — Système de fichiers virtuel de WebOSx, sur IndexedDB.
        // ------------------------------------------------------------------
        // API native du navigateur, aucune dépendance externe (pas de Dexie.js
        // ni autre wrapper) — juste un petit enrobage Promise maison autour
        // d'une API historiquement basée sur des événements.
        //
        // Pourquoi IndexedDB plutôt que localStorage (version précédente) :
        //   - Quota bien plus généreux (souvent plusieurs centaines de Mo à
        //     quelques Go selon navigateur/espace disque, contre 5-10 Mo).
        //   - Asynchrone : une écriture volumineuse ne gèle pas l'UI.
        //   - Chaque fichier est un enregistrement séparé : pas besoin de
        //     resérialiser TOUT le VFS à chaque modification, même minime.
        //
        // Modèle de stockage : un seul object store "nodes", clé = chemin
        // absolu complet ("/docs/notes.txt"). Un dossier n'est qu'un
        // enregistrement de type 'dir' sans contenu ; ses enfants sont
        // retrouvés par préfixe de clé (ex: tout ce qui commence par
        // "/docs/"), pas par imbrication d'objets — implique de renommer/
        // copier explicitement tous les descendants d'un dossier quand on le
        // déplace (fait dans rename()/copy() ci-dessous), contrairement à
        // l'ancien arbre imbriqué où déplacer un dossier déplaçait ses
        // enfants "gratuitement".
        //
        // "Chrooté" par construction, comme avant : resolvePath() ne permet
        // jamais de sortir de la racine.
        //
        // TOUTES les méthodes qui touchent au stockage sont maintenant
        // asynchrones (retournent une Promise) — c'est le changement principal
        // à connaître pour tout code qui utilisait VFS avant : il faut
        // `await` (ou `.then()`) partout où ce n'était pas nécessaire avant.
        // Seules les fonctions de pur calcul (resolvePath, pathToString,
        // isTextMime, formatSize) restent synchrones.
        // ==================================================================
        const VFS = {
            ROOT_NAME: 'Mes Fichiers',
            DB_NAME: 'webosx_vfs',
            DB_VERSION: 1,
            STORE_NAME: 'nodes',
            LEGACY_LS_KEY: 'webosx_vfs', // ancienne clé localStorage (pré-migration)
            MAX_FILE_BYTES: 200 * 1024 * 1024, // 200 Mo — plafond applicatif, bien en-deçà du quota IndexedDB réel (variable selon navigateur/espace disque libre)
            _dbPromise: null,
            _listeners: [],

            onChange(fn) { this._listeners.push(fn); },
            _notify() { this._listeners.forEach(fn => { try { fn(); } catch (e) { console.error(e); } }); },

            // ---- Connexion IndexedDB (mise en cache, ouverte une seule fois) ----
            _openDB() {
                if (this._dbPromise) return this._dbPromise;
                this._dbPromise = new Promise((resolve, reject) => {
                    if (!window.indexedDB) { reject(new Error('IndexedDB indisponible dans ce contexte')); return; }
                    const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
                    req.onupgradeneeded = () => {
                        const db = req.result;
                        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                            db.createObjectStore(this.STORE_NAME, { keyPath: 'path' });
                        }
                    };
                    req.onsuccess = () => {
                        const db = req.result;
                        this._migrateFromLocalStorage(db).then(() => resolve(db)).catch(() => resolve(db));
                    };
                    req.onerror = () => reject(req.error);
                });
                return this._dbPromise;
            },

            // Reprend automatiquement, une seule fois, les données de l'ancienne
            // version basée sur localStorage (arbre JSON imbriqué), si présentes.
            async _migrateFromLocalStorage(db) {
                let raw;
                try { raw = localStorage.getItem(this.LEGACY_LS_KEY); } catch (e) { return; }
                if (!raw) return;
                let tree;
                try { tree = JSON.parse(raw); } catch (e) { return; }
                await new Promise((resolve) => {
                    const tx = db.transaction(this.STORE_NAME, 'readwrite');
                    const store = tx.objectStore(this.STORE_NAME);
                    const walk = (node, path) => {
                        if (!node) return;
                        if (node.type === 'dir') {
                            if (path) store.put({ path, type: 'dir', mtime: node.mtime || Date.now() });
                            Object.keys(node.children || {}).forEach(name => walk(node.children[name], path + '/' + name));
                        } else if (node.type === 'file') {
                            store.put({ path, type: 'file', content: node.content, mime: node.mime, size: node.size, mtime: node.mtime, binary: !!node.binary });
                        }
                    };
                    walk(tree, '');
                    tx.oncomplete = resolve;
                    tx.onerror = resolve; // best-effort : on ne bloque pas le démarrage sur un échec de migration
                });
                try { localStorage.removeItem(this.LEGACY_LS_KEY); } catch (e) {}
            },

            async _store(mode) {
                const db = await this._openDB();
                return db.transaction(this.STORE_NAME, mode).objectStore(this.STORE_NAME);
            },

            // Enrobage Promise d'une IDBRequest, capturant aussi bien les erreurs
            // async (onerror) que les exceptions synchrones à la création de la
            // requête (ex: quota déjà dépassé sur certains navigateurs).
            _req(makeRequest) {
                return new Promise((resolve, reject) => {
                    let request;
                    try { request = makeRequest(); } catch (e) { reject(e); return; }
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                });
            },

            // Liste les enregistrements dont la clé commence par `prefix`, au
            // sein d'un store/transaction déjà ouvert (permet de chaîner
            // plusieurs opérations dans UNE seule transaction — utilisé par
            // remove()/rename()/copy() pour rester atomiques sur un dossier
            // et tous ses descendants).
            _cursorCollect(store, range) {
                return new Promise((resolve, reject) => {
                    const items = [];
                    const cur = store.openCursor(range);
                    cur.onsuccess = () => {
                        const c = cur.result;
                        if (!c) { resolve(items); return; }
                        items.push(c.value);
                        c.continue();
                    };
                    cur.onerror = () => reject(cur.error);
                });
            },
            _cursorDelete(store, range) {
                return new Promise((resolve, reject) => {
                    const cur = store.openCursor(range);
                    cur.onsuccess = () => {
                        const c = cur.result;
                        if (!c) { resolve(); return; }
                        c.delete();
                        c.continue();
                    };
                    cur.onerror = () => reject(cur.error);
                });
            },

            // ---- Résolution de chemins (pur calcul, synchrone) ----
            // cwd et le résultat sont des tableaux de segments (ex: ['docs','photos']).
            // Un chemin commençant par '/' est absolu (repart de la racine du VFS,
            // PAS du vrai système de fichiers). '..' ne peut jamais faire sortir de
            // la racine du VFS.
            resolvePath(cwd, input) {
                if (!input) return cwd.slice();
                const base = input.startsWith('/') ? [] : cwd.slice();
                input.split('/').filter(Boolean).forEach(seg => {
                    if (seg === '.') return;
                    if (seg === '..') { if (base.length) base.pop(); return; }
                    base.push(seg);
                });
                return base;
            },
            pathToString(segs) { return segs.length ? '/' + segs.join('/') : '/'; },
            _key(segs) { return '/' + segs.join('/'); }, // clé de stockage : toujours "/a/b", jamais juste "/" pour la racine (racine = pas d'enregistrement)

            async _parentExists(segs) {
                if (segs.length <= 1) return true; // le parent est la racine, existe toujours implicitement
                const parent = await this.stat(segs.slice(0, -1));
                return !!parent && parent.type === 'dir';
            },

            // ---- Consultation ----
            async stat(segs) {
                if (segs.length === 0) return { type: 'dir', size: 0, mtime: null };
                const store = await this._store('readonly');
                const node = await this._req(() => store.get(this._key(segs)));
                if (!node) return null;
                return { type: node.type, size: node.size || 0, mtime: node.mtime, mime: node.mime };
            },
            async exists(segs) { return !!(await this.stat(segs)); },
            async isDir(segs) { const s = await this.stat(segs); return !!s && s.type === 'dir'; },
            async isFile(segs) { const s = await this.stat(segs); return !!s && s.type === 'file'; },

            async list(segs) {
                if (segs.length > 0 && !(await this.isDir(segs))) return null;
                const prefix = segs.length ? this._key(segs) + '/' : '/';
                const store = await this._store('readonly');
                const range = IDBKeyRange.bound(prefix, prefix + '\uffff', false, false);
                const rows = await this._cursorCollect(store, range);
                const results = [];
                rows.forEach(row => {
                    const rel = row.path.slice(prefix.length);
                    if (rel && !rel.includes('/')) { // enfants directs uniquement, pas les petits-enfants
                        results.push({ name: rel, type: row.type, size: row.size || 0, mtime: row.mtime, mime: row.mime });
                    }
                });
                return results.sort((a, b) => {
                    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
                    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
                });
            },

            // ---- Mutations ----
            async mkdir(segs) {
                if (segs.length === 0) return { error: 'invalid' };
                if (!(await this._parentExists(segs))) return { error: 'invalid' };
                if (await this.exists(segs)) return { error: 'exists' };
                try {
                    const store = await this._store('readwrite');
                    await this._req(() => store.put({ path: this._key(segs), type: 'dir', mtime: Date.now() }));
                } catch (e) { return { error: 'quota' }; }
                this._notify();
                return { ok: true };
            },

            async touch(segs) {
                if (segs.length === 0) return { error: 'invalid' };
                if (!(await this._parentExists(segs))) return { error: 'invalid' };
                const path = this._key(segs);
                try {
                    const store = await this._store('readwrite');
                    const existing = await this._req(() => store.get(path));
                    if (existing) { existing.mtime = Date.now(); await this._req(() => store.put(existing)); }
                    else await this._req(() => store.put({ path, type: 'file', content: '', mime: 'text/plain', size: 0, mtime: Date.now(), binary: false }));
                } catch (e) { return { error: 'quota' }; }
                this._notify();
                return { ok: true };
            },

            async writeFile(segs, content, mime, binary) {
                if (segs.length === 0) return { error: 'invalid' };
                const size = binary ? Math.ceil(content.length * 0.75) : new Blob([content]).size;
                if (size > this.MAX_FILE_BYTES) return { error: 'tooLarge' };
                if (!(await this._parentExists(segs))) return { error: 'invalid' };
                const path = this._key(segs);
                try {
                    const store = await this._store('readwrite');
                    const existing = await this._req(() => store.get(path));
                    if (existing && existing.type === 'dir') return { error: 'isDir' };
                    await this._req(() => store.put({ path, type: 'file', content, mime: mime || 'text/plain', size, mtime: Date.now(), binary: !!binary }));
                } catch (e) { return { error: 'quota' }; }
                this._notify();
                return { ok: true };
            },

            async appendFile(segs, text) {
                const r = await this.readFile(segs);
                if (r.error === 'isDir') return r;
                if (r.error === 'notfound') return this.writeFile(segs, text, 'text/plain', false);
                if (r.binary) return { error: 'binary' };
                return this.writeFile(segs, r.content + text, 'text/plain', false);
            },

            async readFile(segs) {
                if (segs.length === 0) return { error: 'isDir' };
                const store = await this._store('readonly');
                const node = await this._req(() => store.get(this._key(segs)));
                if (!node) return { error: 'notfound' };
                if (node.type === 'dir') return { error: 'isDir' };
                return { ok: true, content: node.content, mime: node.mime, size: node.size, binary: !!node.binary };
            },

            async remove(segs, recursive) {
                if (segs.length === 0) return { error: 'invalid' };
                const path = this._key(segs);
                const store = await this._store('readwrite');
                const node = await this._req(() => store.get(path));
                if (!node) return { error: 'notfound' };
                if (node.type === 'dir') {
                    const prefix = path + '/';
                    const range = IDBKeyRange.bound(prefix, prefix + '\uffff', false, false);
                    const children = await this._cursorCollect(store, range);
                    if (children.length && !recursive) return { error: 'notEmpty' };
                    if (children.length) await this._cursorDelete(store, range);
                }
                await this._req(() => store.delete(path));
                this._notify();
                return { ok: true };
            },

            async rename(fromSegs, toSegs) {
                if (fromSegs.length === 0) return { error: 'invalid' };
                if (!(await this._parentExists(toSegs))) return { error: 'invalid' };
                const fromPath = this._key(fromSegs), toPath = this._key(toSegs);
                const store = await this._store('readwrite');
                const node = await this._req(() => store.get(fromPath));
                if (!node) return { error: 'invalid' };
                if (await this._req(() => store.get(toPath))) return { error: 'exists' };
                try {
                    if (node.type === 'dir') {
                        // Un dossier renommé doit entraîner tous ses descendants avec lui —
                        // ici, contrairement à l'ancien arbre imbriqué, chaque descendant
                        // est une clé de chemin séparée qu'il faut réécrire une à une.
                        const prefix = fromPath + '/';
                        const range = IDBKeyRange.bound(prefix, prefix + '\uffff', false, false);
                        const descendants = await this._cursorCollect(store, range);
                        for (const d of descendants) {
                            await this._req(() => store.delete(d.path));
                            await this._req(() => store.put(Object.assign({}, d, { path: toPath + d.path.slice(fromPath.length) })));
                        }
                    }
                    await this._req(() => store.delete(fromPath));
                    await this._req(() => store.put(Object.assign({}, node, { path: toPath })));
                } catch (e) { return { error: 'quota' }; }
                this._notify();
                return { ok: true };
            },

            async copy(fromSegs, toSegs) {
                if (fromSegs.length === 0) return { error: 'invalid' };
                if (!(await this._parentExists(toSegs))) return { error: 'invalid' };
                const fromPath = this._key(fromSegs), toPath = this._key(toSegs);
                const store = await this._store('readwrite');
                const node = await this._req(() => store.get(fromPath));
                if (!node) return { error: 'invalid' };
                if (await this._req(() => store.get(toPath))) return { error: 'exists' };
                try {
                    await this._req(() => store.put(Object.assign({}, node, { path: toPath })));
                    if (node.type === 'dir') {
                        const prefix = fromPath + '/';
                        const range = IDBKeyRange.bound(prefix, prefix + '\uffff', false, false);
                        const descendants = await this._cursorCollect(store, range);
                        for (const d of descendants) {
                            await this._req(() => store.put(Object.assign({}, d, { path: toPath + d.path.slice(fromPath.length) })));
                        }
                    }
                } catch (e) { return { error: 'quota' }; }
                this._notify();
                return { ok: true };
            },

            // ---- Un fichier "binaire" (importé, stocké en data URL base64)
            // n'est pas forcément illisible en texte — un .html/.txt/.json
            // importé porte cette même étiquette de stockage, seul son MIME dit
            // s'il est lisible en texte. isTextMime() centralise cette décision
            // (utilisée par le Bloc-notes et le Terminal). ----
            isTextMime(mime) {
                if (!mime) return true;
                return mime.startsWith('text/')
                    || mime === 'application/json'
                    || mime === 'application/javascript'
                    || mime === 'application/xml'
                    || mime.endsWith('+json')
                    || mime.endsWith('+xml');
            },

            // Comme readFile(), mais renvoie toujours du texte brut prêt à afficher :
            // décode automatiquement une data URL base64 si le MIME est textuel, et ne
            // renvoie { error: 'binary' } que pour du contenu réellement non-décodable
            // en texte (image, audio, PDF...).
            async readFileAsText(segs) {
                const r = await this.readFile(segs);
                if (r.error) return r;
                if (!r.binary) return r;
                if (!this.isTextMime(r.mime)) return { error: 'binary' };
                const commaIdx = r.content.indexOf(',');
                if (commaIdx === -1) return { error: 'binary' };
                const meta = r.content.slice(5, commaIdx);
                const payload = r.content.slice(commaIdx + 1);
                try {
                    let text;
                    if (meta.includes(';base64')) {
                        const bin = atob(payload);
                        const bytes = new Uint8Array(bin.length);
                        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                        text = new TextDecoder('utf-8').decode(bytes);
                    } else {
                        text = decodeURIComponent(payload);
                    }
                    return { ok: true, content: text, mime: r.mime, size: r.size };
                } catch (e) {
                    return { error: 'decodeFailed' };
                }
            },

            // Convertit un fichier du VFS en objet File natif du navigateur —
            // permet à une app qui manipule normalement des File réels (ex: mp3.js/
            // video.js, qui font URL.createObjectURL(file)) de consommer un fichier
            // du VFS sans rien changer à sa propre logique d'ajout de piste.
            async toFile(segs) {
                const r = await this.readFile(segs);
                if (r.error) return null;
                const name = segs[segs.length - 1];
                if (r.binary) {
                    const resp = await fetch(r.content);
                    const blob = await resp.blob();
                    return new File([blob], name, { type: r.mime || blob.type });
                }
                const blob = new Blob([r.content], { type: r.mime || 'text/plain' });
                return new File([blob], name, { type: r.mime || 'text/plain' });
            },

            // ---- Utilitaires ----
            async usageBytes() {
                const store = await this._store('readonly');
                const rows = await this._cursorCollect(store, null);
                return rows.reduce((total, row) => total + (row.size || 0), 0);
            },
            formatSize(bytes) {
                if (bytes < 1024) return bytes + ' o';
                if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
                return (bytes / 1024 / 1024).toFixed(2) + ' Mo';
            }
        };
