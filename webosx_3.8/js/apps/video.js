        // Traductions propres à l'app Vidéo (auto-suffisantes, n'impactent pas js/core/lang/*.js)
        I18N.registerLang('fr', {
            'vid.dropHint': 'Déposez vos fichiers vidéo ici',
            'vid.noVideo': 'Aucune vidéo',
            'vid.emptyHint': 'Aucune vidéo. Ajoutez un fichier pour commencer.',
            'vid.fullscreen': 'Plein écran',
            'vid.previous': 'Précédent',
            'vid.playPause': 'Lecture/Pause',
            'vid.next': 'Suivant',
            'vid.repeat': 'Répéter',
            'vid.playlist': 'Playlist',
            'vid.add': '+ Ajouter',
            'vid.addFromFiles': 'Depuis Mes Fichiers...',
            'vid.addFromComputer': 'Depuis mon ordinateur...',
            'vid.clear': 'Vider',
            'vid.emptyPlaylist': 'Aucune vidéo. Cliquez sur « + Ajouter » pour importer des fichiers vidéo.',
            'vid.remove': 'Retirer'
        });
        I18N.registerLang('en', {
            'vid.dropHint': 'Drop your video files here',
            'vid.noVideo': 'No video',
            'vid.emptyHint': 'No video. Add a file to get started.',
            'vid.fullscreen': 'Fullscreen',
            'vid.previous': 'Previous',
            'vid.playPause': 'Play/Pause',
            'vid.next': 'Next',
            'vid.repeat': 'Repeat',
            'vid.playlist': 'Playlist',
            'vid.add': '+ Add',
            'vid.addFromFiles': 'From My Files...',
            'vid.addFromComputer': 'From my computer...',
            'vid.clear': 'Clear',
            'vid.emptyPlaylist': 'No videos. Click "+ Add" to import video files.',
            'vid.remove': 'Remove'
        });
        I18N.registerLang('es', {
            'vid.dropHint': 'Suelta tus archivos de vídeo aquí',
            'vid.noVideo': 'Ningún vídeo',
            'vid.emptyHint': 'Ningún vídeo. Añade un archivo para empezar.',
            'vid.fullscreen': 'Pantalla completa',
            'vid.previous': 'Anterior',
            'vid.playPause': 'Reproducir/Pausar',
            'vid.next': 'Siguiente',
            'vid.repeat': 'Repetir',
            'vid.playlist': 'Lista de reproducción',
            'vid.add': '+ Añadir',
            'vid.addFromFiles': 'Desde Mis Archivos...',
            'vid.addFromComputer': 'Desde mi ordenador...',
            'vid.clear': 'Vaciar',
            'vid.emptyPlaylist': 'Ningún vídeo. Haz clic en «+ Añadir» para importar archivos de vídeo.',
            'vid.remove': 'Quitar'
        });
        I18N.registerLang('de', {
            'vid.dropHint': 'Videodateien hier ablegen',
            'vid.noVideo': 'Kein Video',
            'vid.emptyHint': 'Kein Video. Fügen Sie eine Datei hinzu, um zu beginnen.',
            'vid.fullscreen': 'Vollbild',
            'vid.previous': 'Vorheriger',
            'vid.playPause': 'Wiedergabe/Pause',
            'vid.next': 'Nächster',
            'vid.repeat': 'Wiederholen',
            'vid.playlist': 'Wiedergabeliste',
            'vid.add': '+ Hinzufügen',
            'vid.addFromFiles': 'Aus Meine Dateien...',
            'vid.addFromComputer': 'Von meinem Computer...',
            'vid.clear': 'Leeren',
            'vid.emptyPlaylist': 'Keine Videos. Klicken Sie auf „+ Hinzufügen“, um Videodateien zu importieren.',
            'vid.remove': 'Entfernen'
        });

        OS.registry.register({
            id: 'sys-video', name: I18N.t('app.video'), nameKey: 'app.video', icon: ICONS.video, defaultWidth: 760, defaultHeight: 480,
            init: (c, api) => {
                c.innerHTML = `
                <div class="vid-container">
                    <div class="vid-dropzone-overlay" id="vid-dropzone">
                        <div class="vid-drop-icon">🎬</div>
                        <div id="vid-drop-text">${I18N.t('vid.dropHint')}</div>
                    </div>
                    <div class="vid-main">
                        <div class="vid-screen" id="vid-screen">
                            <video class="vid-el" id="vid-el" playsinline></video>
                            <div class="vid-placeholder" id="vid-placeholder">
                                <div class="vid-placeholder-icon">🎬</div>
                                <div class="vid-placeholder-text" id="vid-placeholder-text">${I18N.t('vid.emptyHint')}</div>
                            </div>
                            <button class="vid-fullscreen-btn" id="vid-fullscreen-btn" title="${I18N.t('vid.fullscreen')}">⛶</button>
                        </div>
                        <div class="vid-trackinfo">
                            <div class="vid-title" id="vid-title">${I18N.t('vid.noVideo')}</div>
                        </div>
                        <div class="vid-progress-row">
                            <span class="vid-time" id="vid-time-cur">0:00</span>
                            <input type="range" class="vid-seek wave-slider" id="vid-seek" min="0" max="1000" value="0">
                            <span class="vid-time right" id="vid-time-dur">0:00</span>
                        </div>
                        <div class="vid-controls">
                            <button class="vid-ctrl-btn" id="vid-prev-btn" title="${I18N.t('vid.previous')}">⏮</button>
                            <button class="vid-ctrl-btn big" id="vid-play-btn" title="${I18N.t('vid.playPause')}">▶</button>
                            <button class="vid-ctrl-btn" id="vid-next-btn" title="${I18N.t('vid.next')}">⏭</button>
                            <button class="vid-ctrl-btn" id="vid-loop-btn" title="${I18N.t('vid.repeat')}">🔁</button>
                        </div>
                        <div class="vid-volume-row">
                            <span>🔈</span>
                            <input type="range" class="vid-volume wave-slider" id="vid-volume" min="0" max="100" value="80">
                            <span>🔊</span>
                        </div>
                    </div>
                    <div class="vid-side">
                        <div class="vid-playlist-header">
                            <span class="vid-playlist-title" id="vid-playlist-title">${I18N.t('vid.playlist')}</span>
                            <div class="vid-playlist-actions">
                                <div class="addsrc-wrap">
                                    <button class="vid-add-btn" id="vid-add-btn">${I18N.t('vid.add')}</button>
                                    <div class="addsrc-menu" id="vid-add-menu">
                                        <div class="addsrc-menu-item" data-source="vfs">${FILES_APP_ICON}<span>${I18N.t('vid.addFromFiles')}</span></div>
                                        <div class="addsrc-menu-item" data-source="computer">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>
                                            <span>${I18N.t('vid.addFromComputer')}</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="vid-clear-btn" id="vid-clear-btn">${I18N.t('vid.clear')}</button>
                            </div>
                            <input type="file" id="vid-file-input" accept="video/*" multiple hidden>
                        </div>
                        <div class="vid-playlist" id="vid-playlist">
                            <div class="vid-playlist-empty">${I18N.t('vid.emptyPlaylist')}</div>
                        </div>
                    </div>
                </div>`;

                // --- Références DOM ---
                const dropText = c.querySelector('#vid-drop-text');
                const placeholderText = c.querySelector('#vid-placeholder-text');
                const playlistTitleEl = c.querySelector('#vid-playlist-title');
                const screenEl = c.querySelector('#vid-screen');
                const video = c.querySelector('#vid-el');
                const placeholder = c.querySelector('#vid-placeholder');
                const fullscreenBtn = c.querySelector('#vid-fullscreen-btn');
                const titleEl = c.querySelector('#vid-title');
                const seek = c.querySelector('#vid-seek');
                const timeCur = c.querySelector('#vid-time-cur');
                const timeDur = c.querySelector('#vid-time-dur');
                const playBtn = c.querySelector('#vid-play-btn');
                const prevBtn = c.querySelector('#vid-prev-btn');
                const nextBtn = c.querySelector('#vid-next-btn');
                const loopBtn = c.querySelector('#vid-loop-btn');
                const volume = c.querySelector('#vid-volume');
                const addBtn = c.querySelector('#vid-add-btn');
                const clearBtn = c.querySelector('#vid-clear-btn');
                const fileInput = c.querySelector('#vid-file-input');
                const playlistEl = c.querySelector('#vid-playlist');

                // --- État ---
                video.muted = false;
                video.defaultMuted = false;
                video.volume = 0.8;
                let tracks = [];      // { name, url, duration }
                let currentIdx = -1;
                let isPlaying = false;
                let isLoop = false;

                function setFill(input) {
                    const min = parseFloat(input.min), max = parseFloat(input.max), val = parseFloat(input.value) || 0;
                    input.style.setProperty('--range-progress', ((val - min) / (max - min)) * 100 + '%');
                }
                setFill(volume);

                function formatTime(s) {
                    if (!isFinite(s) || isNaN(s) || s < 0) return '0:00';
                    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
                    return `${m}:${String(sec).padStart(2, '0')}`;
                }

                // Échappe le HTML — nécessaire car name dérive du nom de fichier
                // local (non fiable : peut contenir des caractères HTML actifs).
                function escHtml(s) {
                    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                }

                // --- Playlist rendering ---
                function renderPlaylist() {
                    if (tracks.length === 0) {
                        playlistEl.innerHTML = `<div class="vid-playlist-empty">${I18N.t('vid.emptyPlaylist')}</div>`;
                        return;
                    }
                    playlistEl.innerHTML = tracks.map((t, i) => `
                        <div class="vid-track-item ${i === currentIdx ? 'playing' : ''}" data-idx="${i}">
                            <span class="vid-track-num">${i + 1}</span>
                            <div class="vid-track-eq ${isPlaying ? '' : 'paused'}"><span></span><span></span><span></span></div>
                            <div class="vid-track-info">
                                <div class="vid-track-name">${escHtml(t.name)}</div>
                            </div>
                            <span class="vid-track-dur">${t.duration ? formatTime(t.duration) : '--:--'}</span>
                            <button class="vid-track-remove" data-remove="${i}" title="${I18N.t('vid.remove')}">✕</button>
                        </div>`).join('');

                    playlistEl.querySelectorAll('.vid-track-item').forEach(item => {
                        item.onclick = (e) => {
                            if (e.target.closest('.vid-track-remove')) return;
                            const idx = parseInt(item.dataset.idx);
                            if (idx === currentIdx) { togglePlay(); } else { playTrack(idx); }
                        };
                    });
                    playlistEl.querySelectorAll('.vid-track-remove').forEach(btn => {
                        btn.onclick = (e) => {
                            e.stopPropagation();
                            removeTrack(parseInt(btn.dataset.remove));
                        };
                    });
                }

                function removeTrack(idx) {
                    const removedUrl = tracks[idx].url;
                    const wasCurrent = idx === currentIdx;
                    tracks.splice(idx, 1);
                    if (idx < currentIdx) currentIdx--;
                    else if (wasCurrent) {
                        video.pause(); video.removeAttribute('src'); video.load();
                        isPlaying = false; currentIdx = -1; updatePlayIcon();
                        titleEl.textContent = I18N.t('vid.noVideo');
                        seek.value = 0; timeCur.textContent = '0:00'; timeDur.textContent = '0:00';
                        setFill(seek);
                        placeholder.classList.remove('hidden');
                    }
                    URL.revokeObjectURL(removedUrl);
                    renderPlaylist();
                }

                function updatePlayIcon() {
                    playBtn.textContent = isPlaying ? '⏸' : '▶';
                }

                function playTrack(idx) {
                    if (idx < 0 || idx >= tracks.length) return;
                    currentIdx = idx;
                    const t = tracks[idx];
                    video.src = t.url;
                    video.muted = false;
                    video.volume = parseInt(volume.value) / 100;
                    titleEl.textContent = t.name;
                    placeholder.classList.add('hidden');
                    video.play().then(() => {
                        isPlaying = true; updatePlayIcon(); renderPlaylist();
                        UI.notify({ title: I18N.t('app.video'), message: t.name, type: 'info', duration: 4000, icon: ICONS.video });
                    })
                        .catch(() => { isPlaying = false; updatePlayIcon(); });
                    renderPlaylist();
                }

                function togglePlay() {
                    if (currentIdx === -1) { if (tracks.length) playTrack(0); return; }
                    if (isPlaying) { video.pause(); isPlaying = false; }
                    else { video.play().then(() => { isPlaying = true; updatePlayIcon(); renderPlaylist(); }); return; }
                    updatePlayIcon();
                    renderPlaylist();
                }

                function nextTrack(auto) {
                    if (tracks.length === 0) return;
                    let idx = currentIdx + 1;
                    if (idx >= tracks.length) {
                        if (auto && !isLoop) { isPlaying = false; updatePlayIcon(); return; }
                        idx = 0;
                    }
                    playTrack(idx);
                }

                function prevTrack() {
                    if (tracks.length === 0) return;
                    if (video.currentTime > 3) { video.currentTime = 0; return; }
                    let idx = currentIdx - 1;
                    if (idx < 0) idx = tracks.length - 1;
                    playTrack(idx);
                }

                // --- Import de fichiers ---
                function guessName(filename) {
                    return filename.replace(/\.[^/.]+$/, '');
                }

                const addMenu = c.querySelector('#vid-add-menu');
                addBtn.onclick = (e) => { e.stopPropagation(); addMenu.classList.toggle('show'); };
                addMenu.onclick = (e) => e.stopPropagation();
                const closeAddMenu = () => addMenu.classList.remove('show');
                document.addEventListener('click', closeAddMenu);
                addMenu.querySelector('[data-source="computer"]').onclick = () => { closeAddMenu(); fileInput.click(); };
                addMenu.querySelector('[data-source="vfs"]').onclick = async () => {
                    closeAddMenu();
                    const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogv', '.mov', '.mkv', '.avi'];
                    const result = await UI.filePicker({ title: I18N.t('vid.addFromFiles'), extensions: VIDEO_EXTENSIONS });
                    if (!result) return;
                    const file = await VFS.toFile(result.path);
                    if (file) addFiles([file]);
                };
                clearBtn.onclick = () => {
                    if (tracks.length === 0) return;
                    video.pause(); video.removeAttribute('src'); video.load();
                    tracks.forEach(t => URL.revokeObjectURL(t.url));
                    tracks = []; currentIdx = -1; isPlaying = false;
                    updatePlayIcon();
                    titleEl.textContent = I18N.t('vid.noVideo');
                    seek.value = 0; timeCur.textContent = '0:00'; timeDur.textContent = '0:00';
                    setFill(seek);
                    placeholder.classList.remove('hidden');
                    renderPlaylist();
                };
                fileInput.onchange = () => {
                    addFiles(fileInput.files);
                    fileInput.value = '';
                };

                function addFiles(fileList) {
                    const files = Array.from(fileList || []).filter(f => f.type.startsWith('video/'));
                    files.forEach(file => {
                        const url = URL.createObjectURL(file);
                        const name = guessName(file.name);
                        const track = { name, url, duration: 0 };
                        tracks.push(track);
                        const probe = document.createElement('video');
                        probe.preload = 'metadata';
                        probe.src = url;
                        probe.onloadedmetadata = () => { track.duration = probe.duration; renderPlaylist(); };
                    });
                    if (files.length) renderPlaylist();
                }

                // --- Glisser-déposer ---
                let dragCounter = 0;
                c.addEventListener('dragenter', (e) => {
                    e.preventDefault();
                    dragCounter++;
                    c.querySelector('.vid-container').classList.add('drag-over');
                });
                c.addEventListener('dragover', (e) => { e.preventDefault(); });
                c.addEventListener('dragleave', (e) => {
                    e.preventDefault();
                    dragCounter = Math.max(0, dragCounter - 1);
                    if (dragCounter === 0) c.querySelector('.vid-container').classList.remove('drag-over');
                });
                c.addEventListener('drop', (e) => {
                    e.preventDefault();
                    dragCounter = 0;
                    c.querySelector('.vid-container').classList.remove('drag-over');
                    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
                });

                // --- Contrôles ---
                playBtn.onclick = togglePlay;
                nextBtn.onclick = () => nextTrack(false);
                prevBtn.onclick = prevTrack;
                loopBtn.onclick = () => { isLoop = !isLoop; loopBtn.classList.toggle('active', isLoop); };
                volume.oninput = (e) => { video.volume = parseInt(e.target.value) / 100; setFill(volume); };

                fullscreenBtn.onclick = () => {
                    if (screenEl.requestFullscreen) screenEl.requestFullscreen();
                    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
                };

                let seeking = false;
                seek.addEventListener('pointerdown', () => seeking = true);
                seek.addEventListener('pointerup', () => seeking = false);
                seek.oninput = (e) => {
                    if (!video.duration) return;
                    const ratio = parseFloat(e.target.value) / 1000;
                    video.currentTime = ratio * video.duration;
                    setFill(seek);
                };

                video.addEventListener('timeupdate', () => {
                    if (!video.duration) return;
                    timeCur.textContent = formatTime(video.currentTime);
                    timeDur.textContent = formatTime(video.duration);
                    if (!seeking) { seek.value = (video.currentTime / video.duration) * 1000; setFill(seek); }
                });
                video.addEventListener('ended', () => {
                    if (isLoop && tracks.length === 1) { video.currentTime = 0; video.play(); return; }
                    nextTrack(true);
                });
                video.addEventListener('pause', () => { if (!video.ended) { isPlaying = false; updatePlayIcon(); renderPlaylist(); } });
                video.addEventListener('play', () => { isPlaying = true; updatePlayIcon(); renderPlaylist(); });

                // --- Localisation dynamique (sans re-rendu complet pour ne pas casser drag&drop / lecture) ---
                function applyLocale() {
                    dropText.textContent = I18N.t('vid.dropHint');
                    placeholderText.textContent = I18N.t('vid.emptyHint');
                    fullscreenBtn.title = I18N.t('vid.fullscreen');
                    prevBtn.title = I18N.t('vid.previous');
                    playBtn.title = I18N.t('vid.playPause');
                    nextBtn.title = I18N.t('vid.next');
                    loopBtn.title = I18N.t('vid.repeat');
                    playlistTitleEl.textContent = I18N.t('vid.playlist');
                    addBtn.textContent = I18N.t('vid.add');
                    clearBtn.textContent = I18N.t('vid.clear');
                    if (currentIdx === -1) titleEl.textContent = I18N.t('vid.noVideo');
                    renderPlaylist();
                }
                window.addEventListener('webosx:langchange', applyLocale);

                // --- Fichier reçu depuis l'app "Mes Fichiers" (bouton "Ouvrir...") ---
                // Même principe que dans mp3.js : boîte aux lettres à usage unique plutôt
                // qu'un événement global, pour ne pas que toutes les fenêtres vidéo déjà
                // ouvertes ne se mettent à lire le même fichier en même temps.
                if (OS._pendingMediaOpen && OS._pendingMediaOpen.kind === 'video' && OS._pendingMediaOpen.file) {
                    const pendingFile = OS._pendingMediaOpen.file;
                    OS._pendingMediaOpen = null;
                    addFiles([pendingFile]);
                    playTrack(tracks.length - 1);
                }

                // --- Nettoyage à la fermeture ---
                const origClose = api.close;
                api.close = () => {
                    video.pause();
                    tracks.forEach(t => URL.revokeObjectURL(t.url));
                    window.removeEventListener('webosx:langchange', applyLocale);
                    document.removeEventListener('click', closeAddMenu);
                    origClose();
                };
            }
        });
