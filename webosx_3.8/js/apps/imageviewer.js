        // ==================================================================
        // App "Visualiseur d'images" — affiche des images externes (import
        // disque ou glisser-déposer) ou internes au VFS (via l'app Mes
        // Fichiers ou le sélecteur "Ouvrir depuis Mes Fichiers..."). Zoom,
        // rotation, ajustement à la fenêtre, panoramique à la souris.
        // ==================================================================

        const IMAGEVIEWER_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 15-5-5-4 4-3-3-6 6"/></svg>`;
        const IMAGEVIEWER_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico', '.avif'];

        I18N.registerLang('fr', {
            'imgv.toolbar.openExternal': 'Ouvrir un fichier...',
            'imgv.toolbar.openVfs': 'Ouvrir depuis Mes Fichiers...',
            'imgv.toolbar.zoomOut': 'Zoom arrière',
            'imgv.toolbar.zoomIn': 'Zoom avant',
            'imgv.toolbar.fit': 'Ajuster à la fenêtre',
            'imgv.toolbar.zoom100': '100 %',
            'imgv.toolbar.rotate': 'Pivoter',
            'imgv.toolbar.download': 'Télécharger',
            'imgv.pickerTitle': 'Choisir une image',
            'imgv.empty': 'Glissez une image ici, ou utilisez le menu Ouvrir',
            'imgv.loadError': 'Impossible de charger cette image.'
        });
        I18N.registerLang('en', {
            'imgv.toolbar.openExternal': 'Open a file...',
            'imgv.toolbar.openVfs': 'Open from My Files...',
            'imgv.toolbar.zoomOut': 'Zoom out',
            'imgv.toolbar.zoomIn': 'Zoom in',
            'imgv.toolbar.fit': 'Fit to window',
            'imgv.toolbar.zoom100': '100%',
            'imgv.toolbar.rotate': 'Rotate',
            'imgv.toolbar.download': 'Download',
            'imgv.pickerTitle': 'Choose an image',
            'imgv.empty': 'Drop an image here, or use the Open menu',
            'imgv.loadError': 'Unable to load this image.'
        });
        I18N.registerLang('es', {
            'imgv.toolbar.openExternal': 'Abrir un archivo...',
            'imgv.toolbar.openVfs': 'Abrir desde Mis Archivos...',
            'imgv.toolbar.zoomOut': 'Alejar',
            'imgv.toolbar.zoomIn': 'Acercar',
            'imgv.toolbar.fit': 'Ajustar a la ventana',
            'imgv.toolbar.zoom100': '100 %',
            'imgv.toolbar.rotate': 'Girar',
            'imgv.toolbar.download': 'Descargar',
            'imgv.pickerTitle': 'Elegir una imagen',
            'imgv.empty': 'Suelta una imagen aquí, o usa el menú Abrir',
            'imgv.loadError': 'No se puede cargar esta imagen.'
        });
        I18N.registerLang('de', {
            'imgv.toolbar.openExternal': 'Datei öffnen...',
            'imgv.toolbar.openVfs': 'Aus Meine Dateien öffnen...',
            'imgv.toolbar.zoomOut': 'Verkleinern',
            'imgv.toolbar.zoomIn': 'Vergrößern',
            'imgv.toolbar.fit': 'An Fenster anpassen',
            'imgv.toolbar.zoom100': '100 %',
            'imgv.toolbar.rotate': 'Drehen',
            'imgv.toolbar.download': 'Herunterladen',
            'imgv.pickerTitle': 'Bild auswählen',
            'imgv.empty': 'Bild hierher ziehen oder das Menü Öffnen verwenden',
            'imgv.loadError': 'Dieses Bild kann nicht geladen werden.'
        });

        OS.registry.register({
            id: 'sys-imageviewer', name: I18N.t('app.imageviewer'), nameKey: 'app.imageviewer', icon: IMAGEVIEWER_ICON,
            defaultWidth: 720, defaultHeight: 540,
            init: (c, api) => {
                let scale = 1, rotation = 0, panX = 0, panY = 0;
                let naturalW = 0, naturalH = 0;
                let currentSrc = null, currentName = '', currentObjectUrl = null;
                let dragging = false, dragStartX = 0, dragStartY = 0, panStartX = 0, panStartY = 0;
                // Références DOM réassignées à chaque render() (recréées à chaque
                // changement de langue) — les fonctions ci-dessous, elles, ne sont
                // définies qu'une fois et lisent toujours la référence à jour.
                let canvasEl, imgEl, emptyEl, zoomLabelEl, filenameEl, dimensionsEl, downloadBtn, fileInput;

                function applyTransform() {
                    imgEl.style.transform = `translate(${panX}px, ${panY}px) rotate(${rotation}deg) scale(${scale})`;
                }
                function updateZoomLabel() { zoomLabelEl.textContent = Math.round(scale * 100) + '%'; }
                function setScale(s) { scale = Math.min(10, Math.max(0.05, s)); applyTransform(); updateZoomLabel(); }

                function fitToWindow() {
                    if (!naturalW || !naturalH) return;
                    const rect = canvasEl.getBoundingClientRect();
                    const pad = 24;
                    const availW = Math.max(1, rect.width - pad * 2), availH = Math.max(1, rect.height - pad * 2);
                    // Une rotation de 90/270° échange visuellement largeur et hauteur.
                    const rotated = (rotation % 180) !== 0;
                    const w = rotated ? naturalH : naturalW, h = rotated ? naturalW : naturalH;
                    scale = Math.min(availW / w, availH / h) || 1;
                    panX = 0; panY = 0;
                    applyTransform(); updateZoomLabel();
                }
                function zoom100() { scale = 1; panX = 0; panY = 0; applyTransform(); updateZoomLabel(); }
                function rotateImage() { rotation = (rotation + 90) % 360; fitToWindow(); }

                // Point d'entrée unique pour charger une image, quelle que soit sa
                // provenance (externe, VFS, ou boîte aux lettres depuis Mes Fichiers) —
                // évite de dupliquer la logique de chargement à chaque appelant.
                function loadImage(src, name) {
                    if (currentObjectUrl) { URL.revokeObjectURL(currentObjectUrl); currentObjectUrl = null; }
                    if (typeof src === 'string' && src.startsWith('blob:')) currentObjectUrl = src;
                    imgEl.onload = () => {
                        naturalW = imgEl.naturalWidth; naturalH = imgEl.naturalHeight;
                        currentName = name; currentSrc = src; rotation = 0; panX = 0; panY = 0;
                        emptyEl.style.display = 'none';
                        imgEl.style.display = 'block';
                        downloadBtn.disabled = false;
                        filenameEl.textContent = name || '';
                        dimensionsEl.textContent = `${naturalW} × ${naturalH}px`;
                        api.setTitle(name ? `${I18N.t('app.imageviewer')} — ${name}` : I18N.t('app.imageviewer'));
                        fitToWindow();
                    };
                    imgEl.onerror = () => { UI.notify({ title: I18N.t('app.imageviewer'), message: I18N.t('imgv.loadError'), type: 'error' }); };
                    imgEl.src = src;
                }

                function render() {
                    c.innerHTML = `
                    <div class="imgv-shell">
                        <div class="imgv-toolbar">
                            <button class="files-tool-btn" id="imgv-btn-open-external" title="${I18N.t('imgv.toolbar.openExternal')}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="m6 9 6-6 6 6"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>
                                <span>${I18N.t('imgv.toolbar.openExternal')}</span>
                            </button>
                            <button class="files-tool-btn" id="imgv-btn-open-vfs" title="${I18N.t('imgv.toolbar.openVfs')}">
                                ${FILES_APP_ICON}
                                <span>${I18N.t('imgv.toolbar.openVfs')}</span>
                            </button>
                            <span class="files-tool-sep"></span>
                            <button class="files-tool-btn" id="imgv-btn-zoom-out" title="${I18N.t('imgv.toolbar.zoomOut')}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="20" y1="20" x2="15.5" y2="15.5"/><line x1="7.5" y1="10.5" x2="13.5" y2="10.5"/></svg>
                            </button>
                            <span class="imgv-zoom-level" id="imgv-zoom-level">100%</span>
                            <button class="files-tool-btn" id="imgv-btn-zoom-in" title="${I18N.t('imgv.toolbar.zoomIn')}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="20" y1="20" x2="15.5" y2="15.5"/><line x1="10.5" y1="7.5" x2="10.5" y2="13.5"/><line x1="7.5" y1="10.5" x2="13.5" y2="10.5"/></svg>
                            </button>
                            <button class="files-tool-btn" id="imgv-btn-fit" title="${I18N.t('imgv.toolbar.fit')}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V5a1 1 0 0 1 1-1h4"/><path d="M20 9V5a1 1 0 0 0-1-1h-4"/><path d="M4 15v4a1 1 0 0 0 1 1h4"/><path d="M20 15v4a1 1 0 0 1-1 1h-4"/></svg>
                            </button>
                            <button class="files-tool-btn" id="imgv-btn-zoom-100" title="${I18N.t('imgv.toolbar.zoom100')}">
                                <span>${I18N.t('imgv.toolbar.zoom100')}</span>
                            </button>
                            <span class="files-tool-sep"></span>
                            <button class="files-tool-btn" id="imgv-btn-rotate" title="${I18N.t('imgv.toolbar.rotate')}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 1 3 6.7"/><path d="M3 21v-5h5"/></svg>
                            </button>
                            <span class="files-tool-fill"></span>
                            <button class="files-tool-btn" id="imgv-btn-download" title="${I18N.t('imgv.toolbar.download')}" disabled>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12"/><path d="m6 11 6 6 6-6"/><path d="M4 20h16"/></svg>
                            </button>
                        </div>
                        <div class="imgv-canvas" id="imgv-canvas">
                            <div class="imgv-empty" id="imgv-empty">${I18N.t('imgv.empty')}</div>
                            <img id="imgv-img" style="display:none;" draggable="false">
                        </div>
                        <div class="imgv-footer">
                            <span id="imgv-filename"></span>
                            <span class="files-tool-fill"></span>
                            <span id="imgv-dimensions"></span>
                        </div>
                        <input type="file" id="imgv-file-input" accept="image/*" style="display:none;">
                    </div>`;

                    canvasEl = c.querySelector('#imgv-canvas');
                    imgEl = c.querySelector('#imgv-img');
                    emptyEl = c.querySelector('#imgv-empty');
                    zoomLabelEl = c.querySelector('#imgv-zoom-level');
                    filenameEl = c.querySelector('#imgv-filename');
                    dimensionsEl = c.querySelector('#imgv-dimensions');
                    downloadBtn = c.querySelector('#imgv-btn-download');
                    fileInput = c.querySelector('#imgv-file-input');

                    c.querySelector('#imgv-btn-open-external').onclick = () => fileInput.click();
                    fileInput.onchange = () => {
                        const file = fileInput.files[0];
                        fileInput.value = '';
                        if (file) loadImage(URL.createObjectURL(file), file.name);
                    };

                    c.querySelector('#imgv-btn-open-vfs').onclick = async () => {
                        const result = await UI.filePicker({ title: I18N.t('imgv.pickerTitle'), extensions: IMAGEVIEWER_EXTENSIONS });
                        if (!result) return;
                        const r = await VFS.readFile(result.path);
                        if (!r.ok) { UI.notify({ title: I18N.t('app.imageviewer'), message: I18N.t('imgv.loadError'), type: 'error' }); return; }
                        loadImage(r.content, result.name);
                    };

                    canvasEl.addEventListener('dragover', (e) => { e.preventDefault(); canvasEl.classList.add('dragover'); });
                    canvasEl.addEventListener('dragleave', () => canvasEl.classList.remove('dragover'));
                    canvasEl.addEventListener('drop', (e) => {
                        e.preventDefault(); canvasEl.classList.remove('dragover');
                        const file = [...(e.dataTransfer.files || [])].find(f => f.type.startsWith('image/'));
                        if (file) loadImage(URL.createObjectURL(file), file.name);
                    });

                    c.querySelector('#imgv-btn-zoom-out').onclick = () => setScale(scale / 1.25);
                    c.querySelector('#imgv-btn-zoom-in').onclick = () => setScale(scale * 1.25);
                    c.querySelector('#imgv-btn-fit').onclick = fitToWindow;
                    c.querySelector('#imgv-btn-zoom-100').onclick = zoom100;
                    c.querySelector('#imgv-btn-rotate').onclick = rotateImage;
                    downloadBtn.onclick = () => {
                        if (!currentSrc) return;
                        const a = document.createElement('a');
                        a.href = currentSrc; a.download = currentName || 'image.png';
                        document.body.appendChild(a); a.click(); a.remove();
                    };

                    canvasEl.addEventListener('wheel', (e) => {
                        if (!currentSrc) return;
                        e.preventDefault();
                        setScale(scale * (e.deltaY < 0 ? 1.12 : 1 / 1.12));
                    }, { passive: false });
                    imgEl.addEventListener('dblclick', () => { (Math.abs(scale * 100 - 100) < 1) ? fitToWindow() : zoom100(); });
                    canvasEl.addEventListener('pointerdown', (e) => {
                        if (imgEl.style.display === 'none') return;
                        dragging = true; canvasEl.setPointerCapture(e.pointerId); canvasEl.classList.add('panning');
                        dragStartX = e.clientX; dragStartY = e.clientY; panStartX = panX; panStartY = panY;
                    });
                    canvasEl.addEventListener('pointermove', (e) => {
                        if (!dragging) return;
                        panX = panStartX + (e.clientX - dragStartX);
                        panY = panStartY + (e.clientY - dragStartY);
                        applyTransform();
                    });
                    canvasEl.addEventListener('pointerup', () => { dragging = false; canvasEl.classList.remove('panning'); });

                    // Réaffiche l'image déjà chargée après un changement de langue —
                    // c.innerHTML a tout reconstruit, mais l'image est déjà en cache
                    // navigateur (même src), donc réaffectation immédiate sans re-décodage.
                    if (currentSrc) {
                        imgEl.src = currentSrc;
                        imgEl.style.display = 'block'; emptyEl.style.display = 'none';
                        downloadBtn.disabled = false;
                        filenameEl.textContent = currentName || '';
                        dimensionsEl.textContent = naturalW ? `${naturalW} × ${naturalH}px` : '';
                        applyTransform(); updateZoomLabel();
                    }
                }

                render();

                // --- Image reçue depuis l'app "Mes Fichiers" (bouton "Ouvrir..." /
                // double-clic sur une image) --- même boîte aux lettres à usage unique
                // que mp3.js/video.js : ce visualiseur n'est pas singleton, un événement
                // global serait reçu par toutes les fenêtres déjà ouvertes. loadImage()
                // est déjà dans le scope englobant, donc utilisable directement ici.
                if (OS._pendingMediaOpen && OS._pendingMediaOpen.kind === 'image' && OS._pendingMediaOpen.src) {
                    const pending = OS._pendingMediaOpen;
                    OS._pendingMediaOpen = null;
                    loadImage(pending.src, pending.name);
                }

                window.addEventListener('webosx:langchange', render);
                const origClose = api.close;
                api.close = () => {
                    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
                    window.removeEventListener('webosx:langchange', render);
                    origClose();
                };
            }
        });
