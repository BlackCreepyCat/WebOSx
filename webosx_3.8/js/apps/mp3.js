        // Traductions propres à l'app MP3 (auto-suffisantes, n'impactent pas js/core/lang/*.js)
        I18N.registerLang('fr', {
            'mp3.dropHint': 'Déposez vos fichiers audio ici',
            'mp3.noTrack': 'Aucune piste',
            'mp3.addMusicHint': 'Ajoutez de la musique pour commencer',
            'mp3.shuffle': 'Lecture aléatoire',
            'mp3.previous': 'Précédent',
            'mp3.playPause': 'Lecture/Pause',
            'mp3.next': 'Suivant',
            'mp3.repeat': 'Répéter',
            'mp3.playlist': 'Playlist',
            'mp3.add': '+ Ajouter',
            'mp3.addFromFiles': 'Depuis Mes Fichiers...',
            'mp3.addFromComputer': 'Depuis mon ordinateur...',
            'mp3.clear': 'Vider',
            'mp3.emptyPlaylist': 'Aucune piste. Cliquez sur « + Ajouter » pour importer des fichiers audio.',
            'mp3.remove': 'Retirer',
            'mp3.unknownArtist': 'Artiste inconnu'
        });
        I18N.registerLang('en', {
            'mp3.dropHint': 'Drop your audio files here',
            'mp3.noTrack': 'No track',
            'mp3.addMusicHint': 'Add music to get started',
            'mp3.shuffle': 'Shuffle',
            'mp3.previous': 'Previous',
            'mp3.playPause': 'Play/Pause',
            'mp3.next': 'Next',
            'mp3.repeat': 'Repeat',
            'mp3.playlist': 'Playlist',
            'mp3.add': '+ Add',
            'mp3.addFromFiles': 'From My Files...',
            'mp3.addFromComputer': 'From my computer...',
            'mp3.clear': 'Clear',
            'mp3.emptyPlaylist': 'No tracks. Click "+ Add" to import audio files.',
            'mp3.remove': 'Remove',
            'mp3.unknownArtist': 'Unknown artist'
        });
        I18N.registerLang('es', {
            'mp3.dropHint': 'Suelta tus archivos de audio aquí',
            'mp3.noTrack': 'Ninguna pista',
            'mp3.addMusicHint': 'Añade música para empezar',
            'mp3.shuffle': 'Aleatorio',
            'mp3.previous': 'Anterior',
            'mp3.playPause': 'Reproducir/Pausar',
            'mp3.next': 'Siguiente',
            'mp3.repeat': 'Repetir',
            'mp3.playlist': 'Lista de reproducción',
            'mp3.add': '+ Añadir',
            'mp3.addFromFiles': 'Desde Mis Archivos...',
            'mp3.addFromComputer': 'Desde mi ordenador...',
            'mp3.clear': 'Vaciar',
            'mp3.emptyPlaylist': 'Ninguna pista. Haz clic en «+ Añadir» para importar archivos de audio.',
            'mp3.remove': 'Quitar',
            'mp3.unknownArtist': 'Artista desconocido'
        });
        I18N.registerLang('de', {
            'mp3.dropHint': 'Audiodateien hier ablegen',
            'mp3.noTrack': 'Kein Titel',
            'mp3.addMusicHint': 'Fügen Sie Musik hinzu, um zu beginnen',
            'mp3.shuffle': 'Zufallswiedergabe',
            'mp3.previous': 'Vorheriger',
            'mp3.playPause': 'Wiedergabe/Pause',
            'mp3.next': 'Nächster',
            'mp3.repeat': 'Wiederholen',
            'mp3.playlist': 'Wiedergabeliste',
            'mp3.add': '+ Hinzufügen',
            'mp3.addFromFiles': 'Aus Meine Dateien...',
            'mp3.addFromComputer': 'Von meinem Computer...',
            'mp3.clear': 'Leeren',
            'mp3.emptyPlaylist': 'Keine Titel. Klicken Sie auf „+ Hinzufügen“, um Audiodateien zu importieren.',
            'mp3.remove': 'Entfernen',
            'mp3.unknownArtist': 'Unbekannter Künstler'
        });

        OS.registry.register({
            id: 'sys-mp3', name: I18N.t('app.mp3'), nameKey: 'app.mp3', icon: ICONS.mp3, defaultWidth: 560, defaultHeight: 460,
            init: (c, api) => {
                c.innerHTML = `
                <div class="mp3-container">
                    <div class="mp3-dropzone-overlay" id="mp3-dropzone">
                        <div class="mp3-drop-icon">🎵</div>
                        <div id="mp3-drop-text">${I18N.t('mp3.dropHint')}</div>
                    </div>
                    <div class="mp3-main">
                        <div class="mp3-visual">
                            <canvas class="mp3-vu-canvas" id="mp3-vu"></canvas>
                            <div class="mp3-disc" id="mp3-disc"><div class="mp3-disc-hole"></div></div>
                        </div>
                        <div class="mp3-trackinfo">
                            <div class="mp3-title" id="mp3-title">${I18N.t('mp3.noTrack')}</div>
                            <div class="mp3-artist" id="mp3-artist">${I18N.t('mp3.addMusicHint')}</div>
                        </div>
                        <div class="mp3-progress-row">
                            <span class="mp3-time" id="mp3-time-cur">0:00</span>
                            <input type="range" class="mp3-seek wave-slider" id="mp3-seek" min="0" max="1000" value="0">
                            <span class="mp3-time right" id="mp3-time-dur">0:00</span>
                        </div>
                        <div class="mp3-controls">
                            <button class="mp3-ctrl-btn" id="mp3-shuffle-btn" title="${I18N.t('mp3.shuffle')}">🔀</button>
                            <button class="mp3-ctrl-btn" id="mp3-prev-btn" title="${I18N.t('mp3.previous')}">⏮</button>
                            <button class="mp3-ctrl-btn big" id="mp3-play-btn" title="${I18N.t('mp3.playPause')}">▶</button>
                            <button class="mp3-ctrl-btn" id="mp3-next-btn" title="${I18N.t('mp3.next')}">⏭</button>
                            <button class="mp3-ctrl-btn" id="mp3-repeat-btn" title="${I18N.t('mp3.repeat')}">🔁</button>
                        </div>
                        <div class="mp3-volume-row">
                            <span>🔈</span>
                            <input type="range" class="mp3-volume wave-slider" id="mp3-volume" min="0" max="100" value="80">
                            <span>🔊</span>
                        </div>
                    </div>
                    <div class="mp3-side">
                        <div class="mp3-playlist-header">
                            <span class="mp3-playlist-title" id="mp3-playlist-title">${I18N.t('mp3.playlist')}</span>
                            <div class="mp3-playlist-actions">
                                <div class="addsrc-wrap">
                                    <button class="mp3-add-btn" id="mp3-add-btn">${I18N.t('mp3.add')}</button>
                                    <div class="addsrc-menu" id="mp3-add-menu">
                                        <div class="addsrc-menu-item" data-source="vfs">${FILES_APP_ICON}<span>${I18N.t('mp3.addFromFiles')}</span></div>
                                        <div class="addsrc-menu-item" data-source="computer">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>
                                            <span>${I18N.t('mp3.addFromComputer')}</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="mp3-clear-btn" id="mp3-clear-btn">${I18N.t('mp3.clear')}</button>
                            </div>
                            <input type="file" id="mp3-file-input" accept="audio/*" multiple hidden>
                        </div>
                        <div class="mp3-playlist" id="mp3-playlist">
                            <div class="mp3-playlist-empty">${I18N.t('mp3.emptyPlaylist')}</div>
                        </div>
                    </div>
                </div>`;

                // --- Références DOM ---
                const dropText = c.querySelector('#mp3-drop-text');
                const playlistTitleEl = c.querySelector('#mp3-playlist-title');
                const canvas = c.querySelector('#mp3-vu');
                const ctx2d = canvas.getContext('2d');
                const disc = c.querySelector('#mp3-disc');
                const titleEl = c.querySelector('#mp3-title');
                const artistEl = c.querySelector('#mp3-artist');
                const seek = c.querySelector('#mp3-seek');
                const timeCur = c.querySelector('#mp3-time-cur');
                const timeDur = c.querySelector('#mp3-time-dur');
                const playBtn = c.querySelector('#mp3-play-btn');
                const prevBtn = c.querySelector('#mp3-prev-btn');
                const nextBtn = c.querySelector('#mp3-next-btn');
                const shuffleBtn = c.querySelector('#mp3-shuffle-btn');
                const repeatBtn = c.querySelector('#mp3-repeat-btn');
                const volume = c.querySelector('#mp3-volume');
                const addBtn = c.querySelector('#mp3-add-btn');
                const clearBtn = c.querySelector('#mp3-clear-btn');
                const fileInput = c.querySelector('#mp3-file-input');
                const playlistEl = c.querySelector('#mp3-playlist');

                // --- État ---
                const audio = new Audio();
                audio.volume = 0.8;
                let tracks = [];      // { name, artist, url, duration }
                let currentIdx = -1;
                let isPlaying = false;
                let isShuffle = false;
                let repeatMode = 0;   // 0=off, 1=repeat all, 2=repeat one
                let animId = null;
                let audioCtx = null, analyser = null, sourceNode = null, freqData = null;

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

                // Échappe le HTML — nécessaire car name/artist dérivent du nom de fichier
                // local (non fiable : peut contenir des caractères HTML actifs).
                function escHtml(s) {
                    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                }

                // --- Canvas / vumètre ---
                let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
                function resizeCanvas() {
                    W = canvas.clientWidth; H = canvas.clientHeight;
                    canvas.width = W * dpr; canvas.height = H * dpr;
                    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
                }
                const ro = new ResizeObserver(resizeCanvas);
                ro.observe(canvas);
                resizeCanvas();

                function getHue() {
                    const v = getComputedStyle(document.documentElement).getPropertyValue('--hue').trim();
                    const parsed = parseFloat(v);
                    return Number.isNaN(parsed) ? 210 : parsed;
                }

                function ensureAudioGraph() {
                    if (audioCtx) return;
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    sourceNode = audioCtx.createMediaElementSource(audio);
                    analyser = audioCtx.createAnalyser();
                    analyser.fftSize = 128;
                    analyser.smoothingTimeConstant = 0.8;
                    freqData = new Uint8Array(analyser.frequencyBinCount);
                    sourceNode.connect(analyser);
                    analyser.connect(audioCtx.destination);
                }

                function drawVu() {
                    const hue = getHue();
                    ctx2d.clearRect(0, 0, W, H);
                    const barCount = 28;
                    const gap = 3;
                    const barW = (W - gap * (barCount - 1)) / barCount;
                    for (let i = 0; i < barCount; i++) {
                        let ratio;
                        if (analyser && isPlaying) {
                            const idx = Math.floor((i / barCount) * freqData.length);
                            ratio = freqData[idx] / 255;
                        } else {
                            // animation "veille" douce quand rien ne joue
                            ratio = 0.06 + 0.03 * Math.sin(Date.now() / 600 + i);
                        }
                        const barH = Math.max(3, ratio * (H * 0.85));
                        const x = i * (barW + gap);
                        const y = H - barH;
                        const grad = ctx2d.createLinearGradient(0, H, 0, H - H * 0.85);
                        grad.addColorStop(0, `hsla(${hue}, 80%, 50%, 0.85)`);
                        grad.addColorStop(0.6, `hsla(${hue + 15}, 85%, 60%, 0.9)`);
                        grad.addColorStop(1, `hsla(${hue + 25}, 90%, 70%, 0.95)`);
                        ctx2d.fillStyle = grad;
                        const r = Math.min(3, barW / 2);
                        ctx2d.beginPath();
                        ctx2d.moveTo(x, y + r);
                        ctx2d.arcTo(x, y, x + r, y, r);
                        ctx2d.arcTo(x + barW, y, x + barW, y + r, r);
                        ctx2d.lineTo(x + barW, H);
                        ctx2d.lineTo(x, H);
                        ctx2d.closePath();
                        ctx2d.fill();
                    }
                    if (analyser && isPlaying) analyser.getByteFrequencyData(freqData);
                    animId = requestAnimationFrame(drawVu);
                }
                animId = requestAnimationFrame(drawVu);

                // --- Playlist rendering ---
                function renderPlaylist() {
                    if (tracks.length === 0) {
                        playlistEl.innerHTML = `<div class="mp3-playlist-empty">${I18N.t('mp3.emptyPlaylist')}</div>`;
                        return;
                    }
                    playlistEl.innerHTML = tracks.map((t, i) => `
                        <div class="mp3-track-item ${i === currentIdx ? 'playing' : ''}" data-idx="${i}">
                            <span class="mp3-track-num">${i + 1}</span>
                            <div class="mp3-track-eq ${isPlaying ? '' : 'paused'}"><span></span><span></span><span></span></div>
                            <div class="mp3-track-info">
                                <div class="mp3-track-name">${escHtml(t.name)}</div>
                                <div class="mp3-track-artist">${escHtml(t.artist)}</div>
                            </div>
                            <span class="mp3-track-dur">${t.duration ? formatTime(t.duration) : '--:--'}</span>
                            <button class="mp3-track-remove" data-remove="${i}" title="${I18N.t('mp3.remove')}">✕</button>
                        </div>`).join('');

                    playlistEl.querySelectorAll('.mp3-track-item').forEach(item => {
                        item.onclick = (e) => {
                            if (e.target.closest('.mp3-track-remove')) return;
                            const idx = parseInt(item.dataset.idx);
                            if (idx === currentIdx) { togglePlay(); } else { playTrack(idx); }
                        };
                    });
                    playlistEl.querySelectorAll('.mp3-track-remove').forEach(btn => {
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
                        audio.pause(); audio.removeAttribute('src'); audio.load();
                        isPlaying = false; currentIdx = -1; updatePlayIcon();
                        titleEl.textContent = I18N.t('mp3.noTrack');
                        artistEl.textContent = I18N.t('mp3.addMusicHint');
                        seek.value = 0; timeCur.textContent = '0:00'; timeDur.textContent = '0:00';
                        disc.classList.remove('spinning');
                    }
                    URL.revokeObjectURL(removedUrl);
                    renderPlaylist();
                }

                function updatePlayIcon() {
                    playBtn.textContent = isPlaying ? '⏸' : '▶';
                    disc.classList.toggle('spinning', isPlaying);
                }

                function playTrack(idx) {
                    if (idx < 0 || idx >= tracks.length) return;
                    ensureAudioGraph();
                    if (audioCtx.state === 'suspended') audioCtx.resume();
                    currentIdx = idx;
                    const t = tracks[idx];
                    audio.src = t.url;
                    titleEl.textContent = t.name;
                    artistEl.textContent = t.artist;
                    audio.play().then(() => {
                        isPlaying = true; updatePlayIcon(); renderPlaylist();
                        // Notif à chaque nouveau morceau, dans le .then() : ne se déclenche
                        // que si la lecture démarre vraiment (pas si le navigateur bloque
                        // l'autoplay ou si le fichier est invalide).
                        UI.notify({ title: I18N.t('app.mp3'), message: t.artist ? `${t.name} — ${t.artist}` : t.name, type: 'info', duration: 4000, icon: ICONS.mp3 });
                    })
                        .catch(() => { isPlaying = false; updatePlayIcon(); });
                    renderPlaylist();
                }

                function togglePlay() {
                    if (currentIdx === -1) { if (tracks.length) playTrack(0); return; }
                    ensureAudioGraph();
                    if (audioCtx.state === 'suspended') audioCtx.resume();
                    if (isPlaying) { audio.pause(); isPlaying = false; }
                    else { audio.play().then(() => { isPlaying = true; updatePlayIcon(); renderPlaylist(); }); return; }
                    updatePlayIcon();
                    renderPlaylist();
                }

                function nextTrack(auto) {
                    if (tracks.length === 0) return;
                    let idx;
                    if (isShuffle) {
                        if (tracks.length === 1) idx = 0;
                        else { do { idx = Math.floor(Math.random() * tracks.length); } while (idx === currentIdx); }
                    } else {
                        idx = currentIdx + 1;
                        if (idx >= tracks.length) {
                            if (auto && repeatMode !== 1) { isPlaying = false; updatePlayIcon(); return; }
                            idx = 0;
                        }
                    }
                    playTrack(idx);
                }

                function prevTrack() {
                    if (tracks.length === 0) return;
                    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
                    let idx = currentIdx - 1;
                    if (idx < 0) idx = tracks.length - 1;
                    playTrack(idx);
                }

                // --- Import de fichiers ---
                function guessNameArtist(filename) {
                    const base = filename.replace(/\.[^/.]+$/, '');
                    const parts = base.split(' - ');
                    if (parts.length >= 2) return { artist: parts[0].trim(), name: parts.slice(1).join(' - ').trim() };
                    return { artist: I18N.t('mp3.unknownArtist'), name: base };
                }

                const addMenu = c.querySelector('#mp3-add-menu');
                addBtn.onclick = (e) => { e.stopPropagation(); addMenu.classList.toggle('show'); };
                addMenu.onclick = (e) => e.stopPropagation();
                const closeAddMenu = () => addMenu.classList.remove('show');
                document.addEventListener('click', closeAddMenu);
                addMenu.querySelector('[data-source="computer"]').onclick = () => { closeAddMenu(); fileInput.click(); };
                addMenu.querySelector('[data-source="vfs"]').onclick = async () => {
                    closeAddMenu();
                    const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.flac', '.aac', '.opus', '.weba'];
                    const result = await UI.filePicker({ title: I18N.t('mp3.addFromFiles'), extensions: AUDIO_EXTENSIONS });
                    if (!result) return;
                    const file = await VFS.toFile(result.path);
                    if (file) addFiles([file]);
                };
                clearBtn.onclick = () => {
                    if (tracks.length === 0) return;
                    audio.pause(); audio.removeAttribute('src'); audio.load();
                    tracks.forEach(t => URL.revokeObjectURL(t.url));
                    tracks = []; currentIdx = -1; isPlaying = false;
                    updatePlayIcon();
                    titleEl.textContent = I18N.t('mp3.noTrack');
                    artistEl.textContent = I18N.t('mp3.addMusicHint');
                    seek.value = 0; timeCur.textContent = '0:00'; timeDur.textContent = '0:00';
                    setFill(seek);
                    disc.classList.remove('spinning');
                    renderPlaylist();
                };
                fileInput.onchange = () => {
                    addFiles(fileInput.files);
                    fileInput.value = '';
                };

                function addFiles(fileList) {
                    const files = Array.from(fileList || []).filter(f => f.type.startsWith('audio/'));
                    files.forEach(file => {
                        const url = URL.createObjectURL(file);
                        const { name, artist } = guessNameArtist(file.name);
                        const track = { name, artist, url, duration: 0 };
                        tracks.push(track);
                        const probe = new Audio();
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
                    c.querySelector('.mp3-container').classList.add('drag-over');
                });
                c.addEventListener('dragover', (e) => { e.preventDefault(); });
                c.addEventListener('dragleave', (e) => {
                    e.preventDefault();
                    dragCounter = Math.max(0, dragCounter - 1);
                    if (dragCounter === 0) c.querySelector('.mp3-container').classList.remove('drag-over');
                });
                c.addEventListener('drop', (e) => {
                    e.preventDefault();
                    dragCounter = 0;
                    c.querySelector('.mp3-container').classList.remove('drag-over');
                    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
                });

                // --- Contrôles ---
                playBtn.onclick = togglePlay;
                nextBtn.onclick = () => nextTrack(false);
                prevBtn.onclick = prevTrack;
                shuffleBtn.onclick = () => { isShuffle = !isShuffle; shuffleBtn.classList.toggle('active', isShuffle); };
                repeatBtn.onclick = () => {
                    repeatMode = (repeatMode + 1) % 3;
                    repeatBtn.classList.toggle('active', repeatMode !== 0);
                    repeatBtn.textContent = repeatMode === 2 ? '🔂' : '🔁';
                };
                volume.oninput = (e) => { audio.volume = parseInt(e.target.value) / 100; setFill(volume); };

                let seeking = false;
                seek.addEventListener('pointerdown', () => seeking = true);
                seek.addEventListener('pointerup', () => seeking = false);
                seek.oninput = (e) => {
                    if (!audio.duration) return;
                    const ratio = parseFloat(e.target.value) / 1000;
                    audio.currentTime = ratio * audio.duration;
                    setFill(seek);
                };

                audio.addEventListener('timeupdate', () => {
                    if (!audio.duration) return;
                    timeCur.textContent = formatTime(audio.currentTime);
                    timeDur.textContent = formatTime(audio.duration);
                    if (!seeking) { seek.value = (audio.currentTime / audio.duration) * 1000; setFill(seek); }
                });
                audio.addEventListener('ended', () => {
                    if (repeatMode === 2) { audio.currentTime = 0; audio.play(); return; }
                    nextTrack(true);
                });
                audio.addEventListener('pause', () => { if (!audio.ended) { isPlaying = false; updatePlayIcon(); renderPlaylist(); } });
                audio.addEventListener('play', () => { isPlaying = true; updatePlayIcon(); renderPlaylist(); });

                // --- Localisation dynamique (sans re-rendu complet pour ne pas casser drag&drop / lecture) ---
                function applyLocale() {
                    dropText.textContent = I18N.t('mp3.dropHint');
                    shuffleBtn.title = I18N.t('mp3.shuffle');
                    prevBtn.title = I18N.t('mp3.previous');
                    playBtn.title = I18N.t('mp3.playPause');
                    nextBtn.title = I18N.t('mp3.next');
                    repeatBtn.title = I18N.t('mp3.repeat');
                    playlistTitleEl.textContent = I18N.t('mp3.playlist');
                    addBtn.textContent = I18N.t('mp3.add');
                    clearBtn.textContent = I18N.t('mp3.clear');
                    if (currentIdx === -1) {
                        titleEl.textContent = I18N.t('mp3.noTrack');
                        artistEl.textContent = I18N.t('mp3.addMusicHint');
                    }
                    renderPlaylist();
                }
                window.addEventListener('webosx:langchange', applyLocale);

                // --- Fichier reçu depuis l'app "Mes Fichiers" (bouton "Ouvrir...") ---
                // OS._pendingMediaOpen est déposé par files.js juste avant OS.launchApp('sys-mp3'),
                // et lu une seule fois ICI plutôt que via un événement global : ce lecteur
                // n'est pas singleton, donc un événement diffusé à toutes les fenêtres mp3
                // déjà ouvertes les ferait toutes lire le même fichier simultanément.
                if (OS._pendingMediaOpen && OS._pendingMediaOpen.kind === 'mp3' && OS._pendingMediaOpen.file) {
                    const pendingFile = OS._pendingMediaOpen.file;
                    OS._pendingMediaOpen = null;
                    addFiles([pendingFile]);
                    playTrack(tracks.length - 1);
                }

                // --- Nettoyage à la fermeture ---
                const origClose = api.close;
                api.close = () => {
                    if (animId) cancelAnimationFrame(animId);
                    ro.disconnect();
                    audio.pause();
                    tracks.forEach(t => URL.revokeObjectURL(t.url));
                    if (audioCtx) audioCtx.close().catch(() => {});
                    window.removeEventListener('webosx:langchange', applyLocale);
                    document.removeEventListener('click', closeAddMenu);
                    origClose();
                };
            }
        });
