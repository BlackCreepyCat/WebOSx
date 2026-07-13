        // ==================================================================
        // Chat — salon de discussion pair-à-pair (WebRTC via PeerJS)
        // ------------------------------------------------------------------
        // Topologie en étoile, comme le mode Serveur du P2P Transfer :
        // celui qui crée le salon devient l'hôte (Peer(code)), chaque
        // participant s'y connecte directement (peer.connect(code)).
        // L'hôte relaie chaque message et la liste des participants à
        // tout le monde — les clients ne se parlent jamais entre eux.
        //
        // Réutilise le look'n'feel de l'app P2P (mêmes classes CSS,
        // même charte : boutons plats, code de session, indicateur de
        // connexion) pour rester cohérent avec le reste de WebOSx.
        // ==================================================================

        const CHAT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5h16v11H8.5L4 19.5Z"/><line x1="7.5" y1="8.5" x2="16.5" y2="8.5"/><line x1="7.5" y1="12" x2="13.5" y2="12"/></svg>`;

        I18N.registerLang('fr', {
            "app.chat": "Discussion",
            "chat.role.title": "Salon de discussion",
            "chat.role.subtitle": "WebRTC direct · Aucun serveur · Aucun compte",
            "chat.role.create.label": "Créer",
            "chat.role.create.desc": "Démarrer un nouveau salon et inviter des amis",
            "chat.role.join.label": "Rejoindre",
            "chat.role.join.desc": "Rejoindre un salon existant avec un code",
            "chat.setup.pseudoLabel": "Votre pseudo",
            "chat.setup.pseudoPlaceholder": "Pseudo",
            "chat.setup.encryptLabel": "🔒 Chiffrer les messages",
            "chat.setup.encryptTooltip": "Chiffrement de bout en bout (AES-256) : même l'hôte ne peut pas lire les messages sans la phrase secrète",
            "chat.setup.passphraseLabel": "Phrase secrète",
            "chat.setup.passphrasePlaceholder": "Phrase secrète",
            "chat.setup.errPassphrase": "Entrez une phrase secrète",
            "chat.setup.codeLabel": "Code du salon",
            "chat.setup.codePlaceholder": "XXXXXX",
            "chat.setup.createBtn": "Créer le salon ▶",
            "chat.setup.joinBtn": "Rejoindre ▶",
            "chat.setup.back": "◀ Retour",
            "chat.setup.errPseudo": "Choisissez un pseudo",
            "chat.setup.errCode": "Code invalide — 6 lettres/chiffres",
            "chat.room.leave": "Quitter",
            "chat.room.participants": "Participants",
            "chat.room.you": "(vous)",
            "chat.room.kick": "Exclure du salon",
            "chat.room.composerPlaceholder": "Écrivez un message…",
            "chat.room.send": "Envoyer",
            "chat.room.locked": "Message chiffré (mauvaise phrase secrète ?)",
            "chat.status.hostReady": "Salon créé — partagez le code pour inviter",
            "chat.status.connecting": "Connexion au salon…",
            "chat.status.connected": "Connecté",
            "chat.status.disconnected": "Déconnecté du salon",
            "chat.status.hostClosed": "L'hôte a fermé le salon",
            "chat.status.kicked": "Vous avez été exclu du salon",
            "chat.status.connectError": "Connexion impossible — vérifiez le code",
            "chat.status.full": "Ce salon est complet",
            "chat.system.joined": "{pseudo} a rejoint le salon",
            "chat.system.left": "{pseudo} a quitté le salon",
            "chat.system.kicked": "{pseudo} a été exclu du salon",
            "chat.copy.copied": "Copié !",
            "chat.copy.manual": "Copie manuelle"
        });
        I18N.registerLang('en', {
            "app.chat": "Chat",
            "chat.role.title": "Chat room",
            "chat.role.subtitle": "Direct WebRTC · No server · No account",
            "chat.role.create.label": "Create",
            "chat.role.create.desc": "Start a new room and invite friends",
            "chat.role.join.label": "Join",
            "chat.role.join.desc": "Join an existing room with a code",
            "chat.setup.pseudoLabel": "Your name",
            "chat.setup.pseudoPlaceholder": "Name",
            "chat.setup.encryptLabel": "🔒 Encrypt messages",
            "chat.setup.encryptTooltip": "End-to-end encryption (AES-256): not even the host can read messages without the passphrase",
            "chat.setup.passphraseLabel": "Passphrase",
            "chat.setup.passphrasePlaceholder": "Passphrase",
            "chat.setup.errPassphrase": "Enter a passphrase",
            "chat.setup.codeLabel": "Room code",
            "chat.setup.codePlaceholder": "XXXXXX",
            "chat.setup.createBtn": "Create room ▶",
            "chat.setup.joinBtn": "Join ▶",
            "chat.setup.back": "◀ Back",
            "chat.setup.errPseudo": "Pick a name first",
            "chat.setup.errCode": "Invalid code — 6 letters/digits",
            "chat.room.leave": "Leave",
            "chat.room.participants": "Participants",
            "chat.room.you": "(you)",
            "chat.room.kick": "Remove from room",
            "chat.room.composerPlaceholder": "Type a message…",
            "chat.room.send": "Send",
            "chat.room.locked": "Encrypted message (wrong passphrase?)",
            "chat.status.hostReady": "Room created — share the code to invite people",
            "chat.status.connecting": "Connecting to room…",
            "chat.status.connected": "Connected",
            "chat.status.disconnected": "Disconnected from room",
            "chat.status.hostClosed": "The host closed the room",
            "chat.status.kicked": "You were removed from the room",
            "chat.status.connectError": "Could not connect — check the code",
            "chat.status.full": "This room is full",
            "chat.system.joined": "{pseudo} joined the room",
            "chat.system.left": "{pseudo} left the room",
            "chat.system.kicked": "{pseudo} was removed from the room",
            "chat.copy.copied": "Copied!",
            "chat.copy.manual": "Copy manually"
        });
        I18N.registerLang('es', {
            "app.chat": "Chat",
            "chat.role.title": "Sala de chat",
            "chat.role.subtitle": "WebRTC directo · Sin servidor · Sin cuenta",
            "chat.role.create.label": "Crear",
            "chat.role.create.desc": "Inicia una sala nueva e invita a tus amigos",
            "chat.role.join.label": "Unirse",
            "chat.role.join.desc": "Únete a una sala existente con un código",
            "chat.setup.pseudoLabel": "Tu nombre",
            "chat.setup.pseudoPlaceholder": "Nombre",
            "chat.setup.encryptLabel": "🔒 Cifrar los mensajes",
            "chat.setup.encryptTooltip": "Cifrado de extremo a extremo (AES-256): ni siquiera el anfitrión puede leer los mensajes sin la frase secreta",
            "chat.setup.passphraseLabel": "Frase secreta",
            "chat.setup.passphrasePlaceholder": "Frase secreta",
            "chat.setup.errPassphrase": "Introduce una frase secreta",
            "chat.setup.codeLabel": "Código de la sala",
            "chat.setup.codePlaceholder": "XXXXXX",
            "chat.setup.createBtn": "Crear sala ▶",
            "chat.setup.joinBtn": "Unirse ▶",
            "chat.setup.back": "◀ Volver",
            "chat.setup.errPseudo": "Elige un nombre",
            "chat.setup.errCode": "Código inválido — 6 letras/números",
            "chat.room.leave": "Salir",
            "chat.room.participants": "Participantes",
            "chat.room.you": "(tú)",
            "chat.room.kick": "Expulsar de la sala",
            "chat.room.composerPlaceholder": "Escribe un mensaje…",
            "chat.room.send": "Enviar",
            "chat.room.locked": "Mensaje cifrado (¿frase secreta incorrecta?)",
            "chat.status.hostReady": "Sala creada — comparte el código para invitar",
            "chat.status.connecting": "Conectando a la sala…",
            "chat.status.connected": "Conectado",
            "chat.status.disconnected": "Desconectado de la sala",
            "chat.status.hostClosed": "El anfitrión cerró la sala",
            "chat.status.kicked": "Has sido expulsado de la sala",
            "chat.status.connectError": "No se pudo conectar — revisa el código",
            "chat.status.full": "Esta sala está llena",
            "chat.system.joined": "{pseudo} se unió a la sala",
            "chat.system.left": "{pseudo} salió de la sala",
            "chat.system.kicked": "{pseudo} fue expulsado de la sala",
            "chat.copy.copied": "¡Copiado!",
            "chat.copy.manual": "Copia manual"
        });
        I18N.registerLang('de', {
            "app.chat": "Chat",
            "chat.role.title": "Chatraum",
            "chat.role.subtitle": "Direktes WebRTC · Kein Server · Kein Konto",
            "chat.role.create.label": "Erstellen",
            "chat.role.create.desc": "Neuen Raum starten und Freunde einladen",
            "chat.role.join.label": "Beitreten",
            "chat.role.join.desc": "Einem bestehenden Raum mit Code beitreten",
            "chat.setup.pseudoLabel": "Dein Name",
            "chat.setup.pseudoPlaceholder": "Name",
            "chat.setup.encryptLabel": "🔒 Nachrichten verschlüsseln",
            "chat.setup.encryptTooltip": "Ende-zu-Ende-Verschlüsselung (AES-256): selbst der Host kann Nachrichten ohne die Passphrase nicht lesen",
            "chat.setup.passphraseLabel": "Passphrase",
            "chat.setup.passphrasePlaceholder": "Passphrase",
            "chat.setup.errPassphrase": "Bitte eine Passphrase eingeben",
            "chat.setup.codeLabel": "Raum-Code",
            "chat.setup.codePlaceholder": "XXXXXX",
            "chat.setup.createBtn": "Raum erstellen ▶",
            "chat.setup.joinBtn": "Beitreten ▶",
            "chat.setup.back": "◀ Zurück",
            "chat.setup.errPseudo": "Bitte einen Namen wählen",
            "chat.setup.errCode": "Ungültiger Code — 6 Buchstaben/Ziffern",
            "chat.room.leave": "Verlassen",
            "chat.room.participants": "Teilnehmer",
            "chat.room.you": "(du)",
            "chat.room.kick": "Aus dem Raum entfernen",
            "chat.room.composerPlaceholder": "Nachricht schreiben…",
            "chat.room.send": "Senden",
            "chat.room.locked": "Verschlüsselte Nachricht (falsche Passphrase?)",
            "chat.status.hostReady": "Raum erstellt — Code zum Einladen teilen",
            "chat.status.connecting": "Verbinde mit Raum…",
            "chat.status.connected": "Verbunden",
            "chat.status.disconnected": "Vom Raum getrennt",
            "chat.status.hostClosed": "Der Host hat den Raum geschlossen",
            "chat.status.kicked": "Du wurdest aus dem Raum entfernt",
            "chat.status.connectError": "Verbindung fehlgeschlagen — Code prüfen",
            "chat.status.full": "Dieser Raum ist voll",
            "chat.system.joined": "{pseudo} ist dem Raum beigetreten",
            "chat.system.left": "{pseudo} hat den Raum verlassen",
            "chat.system.kicked": "{pseudo} wurde aus dem Raum entfernt",
            "chat.copy.copied": "Kopiert!",
            "chat.copy.manual": "Manuell kopieren"
        });

        const CHAT_HTML = `<div id="chat-app">
<div id="app">
  <div id="main">

    <!-- ── SCREEN 0 : choix Créer / Rejoindre ── -->
    <div class="screen visible" id="chat-screen-role">
      <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:0.74em;">
        <div class="role-panel">
          <div class="role-panel-header">
            <div class="role-panel-title" data-i18n="chat.role.title">Chat room</div>
            <div class="role-panel-sub" data-i18n="chat.role.subtitle">Direct WebRTC · No server · No account</div>
          </div>
          <div class="role-btns chat-role-btns">
            <button class="role-btn" id="chat-btn-create" onclick="chatChooseRole('create')">
              <span class="r-icon">＋</span>
              <span class="r-label" data-i18n="chat.role.create.label">Create</span>
              <span class="r-desc" data-i18n="chat.role.create.desc">Start a new room and invite friends</span>
            </button>
            <button class="role-btn" id="chat-btn-join" onclick="chatChooseRole('join')">
              <span class="r-icon">↳</span>
              <span class="r-label" data-i18n="chat.role.join.label">Join</span>
              <span class="r-desc" data-i18n="chat.role.join.desc">Join an existing room with a code</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── SCREEN 1 : pseudo (+ code si on rejoint) ── -->
    <div class="screen" id="chat-screen-setup">
      <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:0.74em;">
        <div class="role-panel chat-setup-panel">
          <div class="role-panel-header">
            <div class="role-panel-title" id="chat-setup-title" data-i18n="chat.role.create.label">Create</div>
          </div>
          <div class="chat-setup-body">
            <div class="recv-field">
              <span class="field-label" data-i18n="chat.setup.pseudoLabel">Your name</span>
              <input type="text" id="chat-pseudo" class="chat-text-input" maxlength="18"
                data-i18n-placeholder="chat.setup.pseudoPlaceholder" placeholder="Name"
                onkeydown="if(event.key==='Enter')chatGo()" />
            </div>
            <label class="tb-toggle chat-encrypt-toggle" title="Chiffrement de bout en bout (AES-256), le relais ne voit jamais le texte" data-i18n-title="chat.setup.encryptTooltip">
              <input type="checkbox" id="chat-encrypt-toggle" onchange="chatOnEncryptToggle(this)">
              <span class="tb-toggle-track"></span>
              <span class="tb-toggle-label" data-i18n="chat.setup.encryptLabel">🔒 Chiffrer les messages</span>
            </label>
            <div class="recv-field" id="chat-passphrase-field" style="display:none">
              <span class="field-label" data-i18n="chat.setup.passphraseLabel">Phrase secrète</span>
              <input type="password" id="chat-passphrase" class="chat-text-input" maxlength="64"
                data-i18n-placeholder="chat.setup.passphrasePlaceholder" placeholder="Phrase secrète"
                onkeydown="if(event.key==='Enter')chatGo()" />
            </div>
            <div class="recv-field" id="chat-setup-code-field" style="display:none">
              <span class="field-label" data-i18n="chat.setup.codeLabel">Room code</span>
              <input type="text" id="chat-code-input" class="chat-text-input" maxlength="6"
                data-i18n-placeholder="chat.setup.codePlaceholder" placeholder="XXXXXX"
                onkeydown="if(event.key==='Enter')chatGo()" />
            </div>
            <div class="chat-setup-actions">
              <button class="tb-btn" onclick="chatBackToRole()" data-i18n="chat.setup.back">◀ Back</button>
              <button class="tb-btn primary large" id="chat-setup-go" onclick="chatGo()" data-i18n="chat.setup.createBtn">Create room ▶</button>
            </div>
            <div class="status err" id="chat-setup-status" style="padding:0;background:transparent;border:none;min-height:0;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── SCREEN 2 : salon ── -->
    <div class="screen" id="chat-screen-room">
      <div class="toolbar">
        <div class="toolbar-left">
          <div class="session-block">
            <span class="sess-label" data-i18n="p2p.session.label">Session</span>
            <div class="code-pill" id="chat-code" role="button" tabindex="0"
              onclick="chatCopyCode()" onkeydown="if(event.key==='Enter'||event.key===' ')chatCopyCode()">· · · · · ·</div>
          </div>
          <span class="srv-clients-badge active" id="chat-participant-count">1</span>
          <span class="chat-lock-badge" id="chat-lock-badge" style="display:none">🔒</span>
        </div>
        <div class="toolbar-right">
          <button class="tb-btn danger" onclick="chatLeave()" data-i18n="chat.room.leave">Leave</button>
        </div>
      </div>

      <div class="status pulse" id="chat-status">…</div>

      <div class="chat-body">
        <div class="chat-sidebar">
          <div class="chat-sidebar-title" data-i18n="chat.room.participants">Participants</div>
          <div id="chat-sidebar-list"></div>
        </div>
        <div class="chat-main-col">
          <div class="chat-messages" id="chat-messages"></div>
          <div class="chat-composer">
            <input type="text" id="chat-input" class="chat-text-input" maxlength="2000"
              data-i18n-placeholder="chat.room.composerPlaceholder" placeholder="Type a message…"
              onkeydown="if(event.key==='Enter')chatSend()" disabled />
            <button class="tb-btn primary" id="chat-send-btn" onclick="chatSend()" data-i18n="chat.room.send" disabled>Send</button>
          </div>
        </div>
      </div>

      <div id="chat-statusbar">
        <span class="sb-item">CHAT</span>
        <span class="sb-sep">|</span>
        <span class="sb-item sb-green" id="chat-sb-mode">…</span>
        <div class="chat-conn-bar">
          <span class="conn-dot waiting" id="chat-conn-dot"></span>
          <span class="conn-label" id="chat-conn-label">…</span>
        </div>
      </div>
    </div>

  </div>
</div>
</div>`;

        function __chatEngine() {
            /* ════════════ UTILITAIRES ════════════ */
            function escHtml(s) {
                return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            }
            function genCode() {
                var c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = '', rnd = new Uint32Array(6);
                crypto.getRandomValues(rnd);
                for (var i = 0; i < 6; i++) s += c[rnd[i] % c.length];
                return s;
            }
            function fmtTime(ts) {
                var d = new Date(ts);
                return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
            }
            function setStatus(msg, type) {
                var el = document.getElementById('chat-status');
                if (!el) return;
                el.textContent = msg; el.className = 'status' + (type ? ' ' + type : '');
                if (!type) el.classList.add('pulse');
                var sb = document.getElementById('chat-sb-mode');
                if (sb) sb.textContent = msg;
            }
            function setSetupError(msg) {
                var el = document.getElementById('chat-setup-status');
                if (el) el.textContent = msg || '';
            }
            function setConnState(state, label) {
                var dot = document.getElementById('chat-conn-dot');
                var lbl = document.getElementById('chat-conn-label');
                if (!dot || !lbl) return;
                dot.className = 'conn-dot ' + state;
                lbl.className = 'conn-label ' + state;
                lbl.textContent = label || '';
            }
            function showScreen(id) {
                ['chat-screen-role', 'chat-screen-setup', 'chat-screen-room'].forEach(function (s) {
                    document.getElementById(s).classList.remove('visible');
                });
                document.getElementById(id).classList.add('visible');
            }
            function setComposerEnabled(on) {
                var inp = document.getElementById('chat-input');
                var btn = document.getElementById('chat-send-btn');
                if (inp) inp.disabled = !on;
                if (btn) btn.disabled = !on;
            }

            var MAX_PSEUDO = 18, MAX_MSG = 2000, MAX_PARTICIPANTS = 30;

            /* ════════════ ÉTAT GLOBAL ════════════ */
            var peer = null;
            var isHost = false;
            var myId = '';
            var myPseudo = '';
            var hostConn = null;                 // côté client : connexion vers l'hôte
            var conns = new Map();                // côté hôte : peerId -> {conn, pseudo}
            var pendingRole = 'create';
            var cryptoKey = null;                 // clé AES-GCM dérivée de la phrase secrète (null = salon non chiffré)
            var iWasKicked = false;                // côté client : distingue "exclu" d'une simple déconnexion

            /* ════════════ CHIFFREMENT (AES-256-GCM, dérivé via PBKDF2) ════════════
               La phrase secrète ne transite jamais sur le réseau : chaque participant
               la saisit localement. L'hôte relaie des blobs chiffrés qu'il ne peut lire
               que s'il connaît lui aussi la phrase — comme n'importe quel autre participant. */
            // Le sel PBKDF2 est dérivé du code de salon (aléatoire, 6 caractères,
            // généré via crypto.getRandomValues) plutôt que d'une constante fixe :
            // un sel unique par salon empêche un attaquant de précalculer une seule
            // table de hachage réutilisable contre toutes les conversations WebOSx.
            var CRYPTO_SALT_PREFIX = 'webosx-chat-v1';
            function deriveKey(passphrase, roomCode) {
                var enc = new TextEncoder();
                var salt = enc.encode(CRYPTO_SALT_PREFIX + ':' + roomCode);
                return crypto.subtle.importKey('raw', enc.encode(passphrase), { name: 'PBKDF2' }, false, ['deriveKey'])
                    .then(function (keyMaterial) {
                        return crypto.subtle.deriveKey(
                            { name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256' },
                            keyMaterial,
                            { name: 'AES-GCM', length: 256 },
                            false,
                            ['encrypt', 'decrypt']
                        );
                    });
            }
            function encryptText(text) {
                var iv = crypto.getRandomValues(new Uint8Array(12));
                var enc = new TextEncoder().encode(text);
                return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, cryptoKey, enc).then(function (buf) {
                    return { iv: Array.from(iv), data: Array.from(new Uint8Array(buf)) };
                });
            }
            function decryptText(payload) {
                var iv = new Uint8Array(payload.iv);
                var data = new Uint8Array(payload.data);
                return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, cryptoKey, data)
                    .then(function (buf) { return new TextDecoder().decode(buf); });
            }
            // Enveloppe un message sortant : {text} en clair, ou {enc:{iv,data}} si un mot de passe est actif.
            function packOutgoing(text) {
                if (!cryptoKey) return Promise.resolve({ text: text });
                return encryptText(text).then(function (enc) { return { enc: enc }; });
            }
            // Déballe un message entrant → renvoie une Promise<string>. Rejette si chiffré mais indéchiffrable.
            function unpackIncoming(msg) {
                if (msg.enc) {
                    if (!cryptoKey) return Promise.reject(new Error('no-key'));
                    return decryptText(msg.enc);
                }
                return Promise.resolve(msg.text || '');
            }

            /* ════════════ RENDU ════════════ */
            function renderRoster(list) {
                var box = document.getElementById('chat-sidebar-list');
                var count = document.getElementById('chat-participant-count');
                if (count) count.textContent = list.length;
                if (!box) return;
                box.innerHTML = '';
                list.forEach(function (p) {
                    var row = document.createElement('div');
                    row.className = 'chat-participant' + (p.host ? ' is-host' : '');

                    var dot = document.createElement('span');
                    dot.className = p.host ? 'chat-participant-host-icon' : 'chat-participant-dot';
                    if (p.host) dot.textContent = '🖥️';
                    row.appendChild(dot);

                    var name = document.createElement('span');
                    name.className = 'chat-participant-name';
                    name.textContent = p.pseudo;
                    row.appendChild(name);

                    if (p.id === myId) {
                        var you = document.createElement('span');
                        you.className = 'chat-participant-you';
                        you.textContent = I18N.t('chat.room.you');
                        row.appendChild(you);
                    } else if (isHost && !p.host) {
                        var kickBtn = document.createElement('button');
                        kickBtn.className = 'chat-kick-btn';
                        kickBtn.title = I18N.t('chat.room.kick');
                        kickBtn.textContent = '✕';
                        kickBtn.onclick = function () { kickUser(p.id); };
                        row.appendChild(kickBtn);
                    }

                    box.appendChild(row);
                });
            }

            function renderMessage(msg, mine, text, locked) {
                var box = document.getElementById('chat-messages');
                if (!box) return;
                var wrap = document.createElement('div');
                wrap.className = 'chat-msg ' + (mine ? 'mine' : 'theirs');
                var meta = mine ? '' : '<div class="chat-msg-meta">' + escHtml(msg.pseudo) + '</div>';
                wrap.innerHTML = meta
                    + '<div class="chat-bubble' + (locked ? ' locked' : '') + '"></div>'
                    + '<div class="chat-msg-time">' + fmtTime(msg.ts) + '</div>';
                wrap.querySelector('.chat-bubble').textContent = locked ? ('🔒 ' + I18N.t('chat.room.locked')) : text;
                box.appendChild(wrap);
                box.scrollTop = box.scrollHeight;
            }

            function renderSystem(text) {
                var box = document.getElementById('chat-messages');
                if (!box) return;
                var wrap = document.createElement('div');
                wrap.className = 'chat-msg system';
                wrap.textContent = text;
                box.appendChild(wrap);
                box.scrollTop = box.scrollHeight;
            }

            /* ════════════ RÔLE / SETUP ════════════ */
            function chatChooseRole(role) {
                pendingRole = role;
                var title = document.getElementById('chat-setup-title');
                var goBtn = document.getElementById('chat-setup-go');
                var codeField = document.getElementById('chat-setup-code-field');
                if (role === 'create') {
                    title.setAttribute('data-i18n', 'chat.role.create.label');
                    goBtn.setAttribute('data-i18n', 'chat.setup.createBtn');
                    codeField.style.display = 'none';
                } else {
                    title.setAttribute('data-i18n', 'chat.role.join.label');
                    goBtn.setAttribute('data-i18n', 'chat.setup.joinBtn');
                    codeField.style.display = '';
                }
                I18N.apply(document.getElementById('chat-screen-setup'));
                setSetupError('');
                showScreen('chat-screen-setup');
                setTimeout(function () { document.getElementById('chat-pseudo').focus(); }, 100);
            }

            function chatBackToRole() {
                setSetupError('');
                showScreen('chat-screen-role');
            }

            function chatGo() {
                var pseudo = document.getElementById('chat-pseudo').value.trim().slice(0, MAX_PSEUDO);
                if (!pseudo) { setSetupError(I18N.t('chat.setup.errPseudo')); return; }
                myPseudo = pseudo;

                var encOn = document.getElementById('chat-encrypt-toggle').checked;
                var passphrase = document.getElementById('chat-passphrase').value;
                if (encOn && !passphrase) { setSetupError(I18N.t('chat.setup.errPassphrase')); return; }

                // Le code de salon doit être connu AVANT la dérivation de clé (il sert de sel).
                // Pour l'hôte, on le génère ici et on le transmet à chatStartHost pour qu'il
                // ne le régénère pas ; pour un client, il vient du champ code déjà saisi.
                var roomCode;
                if (pendingRole === 'create') {
                    roomCode = genCode();
                } else {
                    roomCode = document.getElementById('chat-code-input').value.trim().toUpperCase();
                    if (!/^[A-HJ-NP-Z2-9]{6}$/.test(roomCode)) { setSetupError(I18N.t('chat.setup.errCode')); return; }
                }

                function proceed() {
                    var badge = document.getElementById('chat-lock-badge');
                    if (badge) badge.style.display = cryptoKey ? '' : 'none';
                    if (pendingRole === 'create') {
                        chatStartHost(roomCode);
                    } else {
                        chatStartClient(roomCode);
                    }
                }

                if (encOn) {
                    var goBtn = document.getElementById('chat-setup-go');
                    goBtn.disabled = true;
                    deriveKey(passphrase, roomCode).then(function (key) {
                        cryptoKey = key;
                        goBtn.disabled = false;
                        proceed();
                    }).catch(function () {
                        goBtn.disabled = false;
                        setSetupError(I18N.t('chat.setup.errPassphrase'));
                    });
                } else {
                    cryptoKey = null;
                    proceed();
                }
            }

            function chatOnEncryptToggle(cb) {
                var field = document.getElementById('chat-passphrase-field');
                field.style.display = cb.checked ? '' : 'none';
                if (cb.checked) setTimeout(function () { document.getElementById('chat-passphrase').focus(); }, 50);
                else document.getElementById('chat-passphrase').value = '';
            }

            /* ════════════ HÔTE ════════════ */
            function chatStartHost(code) {
                isHost = true;
                conns = new Map();
                code = code || genCode();
                showScreen('chat-screen-room');
                document.getElementById('chat-code').textContent = code;
                document.getElementById('chat-sb-mode').textContent = 'HOST';
                setStatus(I18N.t('chat.status.connecting'), '');
                setConnState('waiting', I18N.t('chat.status.connecting'));
                peer = new Peer(code, { debug: 0 });
                peer.on('open', function (id) {
                    myId = id;
                    document.getElementById('chat-code').textContent = id;
                    setConnState('ok', I18N.t('chat.status.connected'));
                    setStatus(I18N.t('chat.status.hostReady'), 'ok');
                    setComposerEnabled(true);
                    renderRoster([{ id: myId, pseudo: myPseudo, host: true }]);
                });
                peer.on('connection', function (c) {
                    if (conns.size >= MAX_PARTICIPANTS) { try { c.close(); } catch (e) {} return; }
                    c.on('open', function () { try { c.send({ type: 'welcome' }); } catch (e) {} });
                    c.on('data', function (msg) { hostHandleData(c, msg); });
                    c.on('close', function () { hostRemoveConn(c); });
                    c.on('error', function () { hostRemoveConn(c); });
                });
                peer.on('error', function (e) {
                    setStatus(I18N.t('chat.status.connectError') + ' (' + (e.type || e) + ')', 'err');
                    setConnState('err', 'Error');
                    setComposerEnabled(false);
                });
            }

            function hostHandleData(c, msg) {
                if (!msg || typeof msg.type !== 'string') return;
                if (msg.type === 'hello') {
                    var pseudo = (typeof msg.pseudo === 'string' ? msg.pseudo.trim() : '').slice(0, MAX_PSEUDO) || 'Invité';
                    conns.set(c.peer, { conn: c, pseudo: pseudo });
                    hostBroadcastRoster();
                    hostBroadcast({ type: 'system', text: I18N.t('chat.system.joined', { pseudo: pseudo }) }, null);
                    renderSystem(I18N.t('chat.system.joined', { pseudo: pseudo }));
                    UI.notify({ title: I18N.t('app.chat'), message: I18N.t('chat.system.joined', { pseudo: pseudo }), type: 'success', duration: 4000, icon: CHAT_ICON });
                    return;
                }
                if (msg.type === 'msg') {
                    var entry = conns.get(c.peer);
                    if (!entry) return;
                    var out = { type: 'msg', id: c.peer, pseudo: entry.pseudo, ts: Date.now() };
                    if (msg.enc && typeof msg.enc === 'object') {
                        out.enc = msg.enc;
                    } else {
                        var text = (typeof msg.text === 'string' ? msg.text : '').slice(0, MAX_MSG).trim();
                        if (!text) return;
                        out.text = text;
                    }
                    // Relayé tel quel : l'hôte ne déchiffre pas pour transmettre, seulement pour son propre affichage.
                    hostBroadcast(out, null);
                    unpackIncoming(out).then(function (text) {
                        renderMessage(out, false, text, false);
                    }).catch(function () {
                        renderMessage(out, false, null, true);
                    });
                    return;
                }
            }

            function hostRemoveConn(c) {
                var entry = conns.get(c.peer);
                if (!entry) return;
                conns.delete(c.peer);
                hostBroadcastRoster();
                hostBroadcast({ type: 'system', text: I18N.t('chat.system.left', { pseudo: entry.pseudo }) }, null);
                renderSystem(I18N.t('chat.system.left', { pseudo: entry.pseudo }));
                UI.notify({ title: I18N.t('app.chat'), message: I18N.t('chat.system.left', { pseudo: entry.pseudo }), type: 'warning', duration: 4000, icon: CHAT_ICON });
            }

            function kickUser(peerId) {
                if (!isHost) return;
                var entry = conns.get(peerId);
                if (!entry) return;
                try { entry.conn.send({ type: 'kicked' }); } catch (e) {}
                conns.delete(peerId);
                hostBroadcastRoster();
                hostBroadcast({ type: 'system', text: I18N.t('chat.system.kicked', { pseudo: entry.pseudo }) }, null);
                renderSystem(I18N.t('chat.system.kicked', { pseudo: entry.pseudo }));
                setTimeout(function () { try { entry.conn.close(); } catch (e) {} }, 200);
            }

            function hostRosterList() {
                var list = [{ id: myId, pseudo: myPseudo, host: true }];
                conns.forEach(function (e, id) { list.push({ id: id, pseudo: e.pseudo, host: false }); });
                return list;
            }

            function hostBroadcastRoster() {
                var list = hostRosterList();
                renderRoster(list);
                hostBroadcast({ type: 'roster', users: list }, null);
            }

            function hostBroadcast(payload, exceptId) {
                conns.forEach(function (e, id) {
                    if (id === exceptId) return;
                    try { e.conn.send(payload); } catch (err) {}
                });
            }

            /* ════════════ CLIENT ════════════ */
            function chatStartClient(code) {
                isHost = false;
                iWasKicked = false;
                setStatus(I18N.t('chat.status.connecting'), '');
                setConnState('waiting', I18N.t('chat.status.connecting'));
                showScreen('chat-screen-room');
                document.getElementById('chat-code').textContent = code;
                document.getElementById('chat-sb-mode').textContent = 'JOIN';

                peer = new Peer({ debug: 0 });
                peer.on('open', function (id) {
                    myId = id;
                    hostConn = peer.connect(code, { reliable: true });
                    var welcomeTimer = setTimeout(function () {
                        setStatus(I18N.t('chat.status.connectError'), 'err');
                        setConnState('err', 'Error');
                        setComposerEnabled(false);
                    }, 10000);
                    hostConn.on('open', function () {
                        // On attend le "welcome" de l'hôte (envoyé quand SA copie de la connexion
                        // s'ouvre) avant d'envoyer "hello" : envoyer immédiatement ici peut arriver
                        // avant que le canal ne soit vraiment prêt côté hôte, et se perdre en silence.
                    });
                    hostConn.on('data', function (msg) { clearTimeout(welcomeTimer); clientHandleData(msg); });
                    hostConn.on('close', function () {
                        if (iWasKicked) return;
                        setStatus(I18N.t('chat.status.hostClosed'), 'err');
                        setConnState('err', I18N.t('chat.status.disconnected'));
                        setComposerEnabled(false);
                        UI.notify({ title: I18N.t('app.chat'), message: I18N.t('chat.status.hostClosed'), type: 'error', duration: 5000, icon: CHAT_ICON });
                    });
                    hostConn.on('error', function () {
                        setStatus(I18N.t('chat.status.connectError'), 'err');
                        setConnState('err', 'Error');
                        setComposerEnabled(false);
                    });
                });
                peer.on('error', function (e) {
                    setStatus(I18N.t('chat.status.connectError') + ' (' + (e.type || e) + ')', 'err');
                    setConnState('err', 'Error');
                    setComposerEnabled(false);
                });
            }

            function clientHandleData(msg) {
                if (!msg || typeof msg.type !== 'string') return;
                if (msg.type === 'welcome') {
                    try { hostConn.send({ type: 'hello', pseudo: myPseudo }); } catch (e) {}
                    setStatus(I18N.t('chat.status.connected'), 'ok');
                    setConnState('ok', I18N.t('chat.status.connected'));
                    setComposerEnabled(true);
                    renderRoster([{ id: myId, pseudo: myPseudo }]);
                    UI.notify({ title: I18N.t('app.chat'), message: I18N.t('chat.status.connected'), type: 'success', duration: 3500, icon: CHAT_ICON });
                    return;
                }
                if (msg.type === 'roster' && Array.isArray(msg.users)) {
                    var list = msg.users.filter(function (u) {
                        return u && typeof u.id === 'string' && typeof u.pseudo === 'string' && u.pseudo.length <= MAX_PSEUDO;
                    });
                    renderRoster(list);
                    return;
                }
                if (msg.type === 'msg') {
                    if (typeof msg.id !== 'string') return;
                    unpackIncoming(msg).then(function (text) {
                        renderMessage(msg, msg.id === myId, text, false);
                    }).catch(function () {
                        renderMessage(msg, msg.id === myId, null, true);
                    });
                    return;
                }
                if (msg.type === 'system' && typeof msg.text === 'string') {
                    renderSystem(msg.text);
                    return;
                }
                if (msg.type === 'kicked') {
                    iWasKicked = true;
                    setStatus(I18N.t('chat.status.kicked'), 'err');
                    setConnState('err', I18N.t('chat.status.disconnected'));
                    setComposerEnabled(false);
                    UI.notify({ title: I18N.t('app.chat'), message: I18N.t('chat.status.kicked'), type: 'error', duration: 5000, icon: CHAT_ICON });
                    return;
                }
            }

            /* ════════════ ENVOI / COPIE / SORTIE ════════════ */
            function chatSend() {
                var inp = document.getElementById('chat-input');
                var text = inp.value.slice(0, MAX_MSG).trim();
                if (!text) return;
                inp.value = '';
                packOutgoing(text).then(function (packed) {
                    if (isHost) {
                        var out = Object.assign({ type: 'msg', id: myId, pseudo: myPseudo, ts: Date.now() }, packed);
                        renderMessage(out, true, text, false);
                        hostBroadcast(out, null);
                    } else if (hostConn && hostConn.open) {
                        try { hostConn.send(Object.assign({ type: 'msg' }, packed)); } catch (e) {}
                    }
                });
                inp.focus();
            }

            function chatCopyCode() {
                var el = document.getElementById('chat-code');
                var text = el.textContent.replace(/\s/g, '');
                var prev = el.textContent;
                if (!text || !/^[A-HJ-NP-Z2-9]{6}$/.test(text)) return;
                function done() { el.textContent = I18N.t('chat.copy.copied'); setTimeout(function () { el.textContent = prev; }, 1200); }
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, el, prev); });
                } else {
                    fallbackCopy(text, el, prev);
                }
            }
            function fallbackCopy(text, el, prev) {
                var ta = document.createElement('textarea');
                ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;';
                document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); el.textContent = I18N.t('chat.copy.copied'); }
                catch (e) { el.textContent = I18N.t('chat.copy.manual'); }
                document.body.removeChild(ta);
                setTimeout(function () { el.textContent = prev; }, 1200);
            }

            function chatTeardownConnection() {
                try { if (peer) peer.destroy(); } catch (e) {}
                peer = null; hostConn = null; conns = new Map();
                myId = ''; isHost = false; cryptoKey = null; iWasKicked = false;
            }

            function chatLeave() {
                chatTeardownConnection();
                document.getElementById('chat-messages').innerHTML = '';
                document.getElementById('chat-sidebar-list').innerHTML = '';
                document.getElementById('chat-input').value = '';
                document.getElementById('chat-lock-badge').style.display = 'none';
                var encToggle = document.getElementById('chat-encrypt-toggle');
                encToggle.checked = false;
                document.getElementById('chat-passphrase-field').style.display = 'none';
                document.getElementById('chat-passphrase').value = '';
                setComposerEnabled(false);
                setSetupError('');
                showScreen('chat-screen-role');
            }

            window.chatChooseRole = chatChooseRole;
            window.chatBackToRole = chatBackToRole;
            window.chatGo = chatGo;
            window.chatOnEncryptToggle = chatOnEncryptToggle;
            window.chatSend = chatSend;
            window.chatCopyCode = chatCopyCode;
            window.chatLeave = chatLeave;

            window.__chatTeardown = function () {
                try { chatTeardownConnection(); } catch (e) {}
            };
        }

        OS.registry.register({
            id: 'p2p-chat',
            name: I18N.t('app.chat'),
            nameKey: 'app.chat',
            icon: CHAT_ICON,
            defaultWidth: 760,
            defaultHeight: 560,
            singleton: true, // même contrainte que P2P Transfer : DOM à IDs fixes,
                              // pas de scoping par fenêtre. Relancer l'app focus
                              // la fenêtre existante (géré par OS.launchApp).
            init: (c, api) => {
                c.innerHTML = CHAT_HTML;
                I18N.apply(c);

                function relocalize() { I18N.apply(c); }
                window.addEventListener('webosx:langchange', relocalize);

                const roleBtns = c.querySelectorAll('.role-btn');
                roleBtns.forEach(b => b.disabled = true);

                // __p2pEnsurePeerJs est défini par js/apps/p2p.js (chargé avant
                // ce fichier dans index.html) : on réutilise le même chargeur
                // paresseux pour ne charger la lib PeerJS qu'une seule fois.
                __p2pEnsurePeerJs(() => {
                    __chatEngine();
                    roleBtns.forEach(b => b.disabled = false);
                });

                const origClose = api.close;
                api.close = () => {
                    window.removeEventListener('webosx:langchange', relocalize);
                    if (window.__chatTeardown) { try { window.__chatTeardown(); } catch (e) {} }
                    origClose();
                };
            }
        });
