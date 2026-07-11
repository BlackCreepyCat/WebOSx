        // ==================================================================
        // P2P Transfer — app de transfert de fichiers pair-à-pair (WebRTC via PeerJS)
        // Portage de l'outil "P2P Transfer 2.0" (Creepy Cat) vers WebOSx.
        // ------------------------------------------------------------------
        // Le moteur d'origine (fonction __p2pEngine ci-dessous) est repris quasi
        // tel quel : il attend que le HTML existe dans le DOM (getElementById un
        // peu partout) et expose ses handlers via des attributs onclick="" inline.
        // On l'encapsule dans une fonction pour ne PAS polluer le scope global
        // au chargement de l'OS ; elle n'est appelée qu'à l'ouverture de la
        // fenêtre, et seules les fonctions référencées par le HTML (onclick=...)
        // sont republiées sur window, le temps que la fenêtre reste ouverte.
        //
        // Localisation : les textes visibles (boutons, titres, placeholders,
        // tooltips) suivent la langue de l'OS via data-i18n / I18N.apply().
        // Les messages de statut et d'erreur générés dynamiquement par le
        // moteur (ex: "Waiting for receiver to connect…") restent en anglais.
        // ==================================================================

        const P2P_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h11"/><path d="M11 7l5 5-5 5"/><path d="M20 6v12"/></svg>`;

        I18N.registerLang('fr', {
            "app.p2p": "Transfert P2P",
            "p2p.role.title": "SÉLECTIONNER UN MODE",
            "p2p.role.subtitle": "WebRTC direct · Aucun serveur · Aucune limite d'envoi",
            "p2p.role.send.label": "Envoyer",
            "p2p.role.send.desc": "Partagez des fichiers directement à un correspondant",
            "p2p.role.receive.label": "Recevoir",
            "p2p.role.receive.desc": "Téléchargez depuis un émetteur ou un serveur",
            "p2p.role.server.label": "Serveur",
            "p2p.role.server.desc": "Hébergez une bibliothèque de fichiers pour plusieurs correspondants",
            "p2p.role.hint": "Survolez ou touchez un mode pour plus de détails · Cliquez pour commencer",
            "p2p.role.loading": "Chargement du moteur P2P…",
            "p2p.role.edgeStrong": "Microsoft Edge recommandé",
            "p2p.role.edgeDesc": " — Edge prend en charge la File System Access API, qui permet d'enregistrer les fichiers reçus directement dans un dossier choisi, sans boîte de dialogue par fichier. Les autres navigateurs utiliseront le téléchargement classique fichier par fichier.",
            "p2p.common.shaTooltipSend": "Vérifier l'intégrité des fichiers via un hash SHA-256",
            "p2p.common.shaTooltipSrv": "Calcule et envoie le hash SHA-256 aux destinataires pour vérification d'intégrité",
            "p2p.table.name": "Nom",
            "p2p.table.size": "Taille",
            "p2p.table.status": "Statut",
            "p2p.table.hash": "Hash",
            "p2p.dropzone.text": "Déposez des fichiers ici ou cliquez pour parcourir",
            "p2p.session.label": "Session",
            "p2p.sender.clear": "✕ Effacer les terminés",
            "p2p.sender.send": "▶ Envoyer",
            "p2p.sender.progressLabel": "Envoi en cours",
            "p2p.receiver.senderCode": "Code de l'émetteur",
            "p2p.receiver.connect": "Connexion ▶",
            "p2p.receiver.downloadFolder": "Dossier de téléchargement",
            "p2p.receiver.chooseFolder": "📁 Choisir",
            "p2p.receiver.autoDownload": "Téléchargement automatique (aucun dossier choisi)",
            "p2p.receiver.deselectFolderTitle": "Désélectionner le dossier",
            "p2p.receiver.clearReceived": "✕ Effacer les reçus",
            "p2p.receiver.connectedTo": "Connecté à",
            "p2p.receiver.settingsTitle": "Modifier la connexion / le dossier",
            "p2p.receiver.settingsBtn": "⚙ réglages",
            "p2p.receiver.availableFiles": "Fichiers disponibles",
            "p2p.receiver.selectAll": "Tout sélectionner",
            "p2p.receiver.deselectAll": "Tout désélectionner",
            "p2p.receiver.downloadSelected": "↓ Télécharger la sélection",
            "p2p.receiver.waitingFiles": "En attente de fichiers…",
            "p2p.receiver.connectPrompt": "Connectez-vous à un émetteur pour commencer à recevoir",
            "p2p.receiver.allReceived": "Tous les fichiers ont été reçus !",
            "p2p.receiver.progressLabel": "Réception en cours",
            "p2p.server.label": "Serveur",
            "p2p.server.receiversTitle": "⬇ Destinataires",
            "p2p.server.receiversDesc": "Progression du téléchargement et vérification ACK",
            "p2p.statusbar.tagline": "WebRTC · Sans relais · Sans limites",
            "p2p.tooltip.sender.title": "↑ Mode Envoi",
            "p2p.tooltip.sender.l1": "Vous partagez des fichiers — le destinataire se connecte avec votre code de session à 6 caractères",
            "p2p.tooltip.sender.l2": "Les fichiers transitent en pair-à-pair — rien ne passe par un serveur",
            "p2p.tooltip.sender.l3": "Vérification d'intégrité SHA-256 et reprise automatique en cas de coupure",
            "p2p.tooltip.sender.l4": "Un seul destinataire à la fois — utilisez le mode Serveur pour plusieurs destinataires",
            "p2p.tooltip.receiver.title": "↓ Mode Réception",
            "p2p.tooltip.receiver.l1": "Saisissez le code à 6 caractères donné par l'émetteur ou le serveur pour vous connecter",
            "p2p.tooltip.receiver.l2": "Choisissez un dossier de sortie — les fichiers s'enregistrent directement sur le disque, sans boîte de dialogue par fichier",
            "p2p.tooltip.receiver.l3": "Le transfert reprend automatiquement en cas de coupure en cours de fichier",
            "p2p.tooltip.receiver.l4": "Fonctionne avec les correspondants en mode Envoi comme en mode Serveur",
            "p2p.tooltip.server.title": "⊞ Mode Serveur",
            "p2p.tooltip.server.l1": "Hébergez des fichiers que plusieurs destinataires peuvent parcourir et télécharger simultanément",
            "p2p.tooltip.server.l2": "Chaque destinataire choisit les fichiers à télécharger — les transferts s'exécutent en parallèle",
            "p2p.tooltip.server.l3": "Le suivi ACK en direct confirme la réception complète de chaque fichier par client",
            "p2p.tooltip.server.l4": "Ajoutez ou retirez des fichiers à tout moment — les destinataires connectés sont notifiés instantanément"
        });

        I18N.registerLang('en', {
            "app.p2p": "P2P Transfer",
            "p2p.role.title": "SELECT MODE",
            "p2p.role.subtitle": "Direct WebRTC · No server · No upload limit",
            "p2p.role.send.label": "Send",
            "p2p.role.send.desc": "Share files directly to a peer",
            "p2p.role.receive.label": "Receive",
            "p2p.role.receive.desc": "Download from a sender or server",
            "p2p.role.server.label": "Server",
            "p2p.role.server.desc": "Host a file library for multiple peers",
            "p2p.role.hint": "Hover or tap a mode for details · Click to get started",
            "p2p.role.loading": "Loading P2P engine…",
            "p2p.role.edgeStrong": "Microsoft Edge recommended",
            "p2p.role.edgeDesc": " — Edge supports the File System Access API, allowing received files to be saved directly to a chosen output folder without individual download dialogs. Other browsers will fall back to standard per-file downloads.",
            "p2p.common.shaTooltipSend": "Verify file integrity via SHA-256 hash",
            "p2p.common.shaTooltipSrv": "Compute & send SHA-256 hash to receivers for integrity check",
            "p2p.table.name": "Name",
            "p2p.table.size": "Size",
            "p2p.table.status": "Status",
            "p2p.table.hash": "Hash",
            "p2p.dropzone.text": "Drop files here or click to browse",
            "p2p.session.label": "Session",
            "p2p.sender.clear": "✕ Clear done",
            "p2p.sender.send": "▶ Send",
            "p2p.sender.progressLabel": "Sending",
            "p2p.receiver.senderCode": "Sender code",
            "p2p.receiver.connect": "Connect ▶",
            "p2p.receiver.downloadFolder": "Download folder",
            "p2p.receiver.chooseFolder": "📁 Choose",
            "p2p.receiver.autoDownload": "Auto-download (no folder selected)",
            "p2p.receiver.deselectFolderTitle": "Deselect folder",
            "p2p.receiver.clearReceived": "✕ Clear received",
            "p2p.receiver.connectedTo": "Connected to",
            "p2p.receiver.settingsTitle": "Edit connection / folder",
            "p2p.receiver.settingsBtn": "⚙ settings",
            "p2p.receiver.availableFiles": "Available files",
            "p2p.receiver.selectAll": "Select all",
            "p2p.receiver.deselectAll": "Deselect all",
            "p2p.receiver.downloadSelected": "↓ Download selected",
            "p2p.receiver.waitingFiles": "Waiting for files…",
            "p2p.receiver.connectPrompt": "Connect to a sender to start receiving",
            "p2p.receiver.allReceived": "All files received!",
            "p2p.receiver.progressLabel": "Receiving",
            "p2p.server.label": "Server",
            "p2p.server.receiversTitle": "⬇ Receivers",
            "p2p.server.receiversDesc": "Download progress & ACK verification",
            "p2p.statusbar.tagline": "WebRTC · No relay · No limits",
            "p2p.tooltip.sender.title": "↑ Send mode",
            "p2p.tooltip.sender.l1": "You share files — the receiver connects using your 6-character session code",
            "p2p.tooltip.sender.l2": "Files stream peer-to-peer — nothing passes through a server",
            "p2p.tooltip.sender.l3": "SHA-256 integrity check and automatic resume if the connection drops",
            "p2p.tooltip.sender.l4": "One receiver at a time — use Server mode for multiple recipients",
            "p2p.tooltip.receiver.title": "↓ Receive mode",
            "p2p.tooltip.receiver.l1": "Enter the 6-character code given by the sender or server to connect",
            "p2p.tooltip.receiver.l2": "Select an output folder — files save directly to disk, no per-file dialogs",
            "p2p.tooltip.receiver.l3": "Transfer resumes automatically if the connection drops mid-file",
            "p2p.tooltip.receiver.l4": "Works with both Send mode and Server mode peers",
            "p2p.tooltip.server.title": "⊞ Server mode",
            "p2p.tooltip.server.l1": "Host files that multiple receivers can browse and download simultaneously",
            "p2p.tooltip.server.l2": "Each receiver picks which files to download — transfers run in parallel",
            "p2p.tooltip.server.l3": "Live ACK tracking confirms each file was fully received per client",
            "p2p.tooltip.server.l4": "Add or remove files at any time — connected receivers are notified instantly"
        });

        I18N.registerLang('es', {
            "app.p2p": "Transferencia P2P",
            "p2p.role.title": "SELECCIONAR MODO",
            "p2p.role.subtitle": "WebRTC directo · Sin servidor · Sin límite de subida",
            "p2p.role.send.label": "Enviar",
            "p2p.role.send.desc": "Comparte archivos directamente con un par",
            "p2p.role.receive.label": "Recibir",
            "p2p.role.receive.desc": "Descarga desde un emisor o un servidor",
            "p2p.role.server.label": "Servidor",
            "p2p.role.server.desc": "Aloja una biblioteca de archivos para varios pares",
            "p2p.role.hint": "Pasa el cursor o toca un modo para más detalles · Haz clic para empezar",
            "p2p.role.loading": "Cargando el motor P2P…",
            "p2p.role.edgeStrong": "Se recomienda Microsoft Edge",
            "p2p.role.edgeDesc": " — Edge admite la File System Access API, que permite guardar los archivos recibidos directamente en una carpeta elegida sin diálogos por archivo. Otros navegadores usarán la descarga clásica por archivo.",
            "p2p.common.shaTooltipSend": "Verificar la integridad de los archivos mediante hash SHA-256",
            "p2p.common.shaTooltipSrv": "Calcula y envía el hash SHA-256 a los receptores para verificar la integridad",
            "p2p.table.name": "Nombre",
            "p2p.table.size": "Tamaño",
            "p2p.table.status": "Estado",
            "p2p.table.hash": "Hash",
            "p2p.dropzone.text": "Suelta archivos aquí o haz clic para explorar",
            "p2p.session.label": "Sesión",
            "p2p.sender.clear": "✕ Borrar completados",
            "p2p.sender.send": "▶ Enviar",
            "p2p.sender.progressLabel": "Enviando",
            "p2p.receiver.senderCode": "Código del emisor",
            "p2p.receiver.connect": "Conectar ▶",
            "p2p.receiver.downloadFolder": "Carpeta de descarga",
            "p2p.receiver.chooseFolder": "📁 Elegir",
            "p2p.receiver.autoDownload": "Descarga automática (sin carpeta seleccionada)",
            "p2p.receiver.deselectFolderTitle": "Deseleccionar carpeta",
            "p2p.receiver.clearReceived": "✕ Borrar recibidos",
            "p2p.receiver.connectedTo": "Conectado a",
            "p2p.receiver.settingsTitle": "Editar conexión / carpeta",
            "p2p.receiver.settingsBtn": "⚙ ajustes",
            "p2p.receiver.availableFiles": "Archivos disponibles",
            "p2p.receiver.selectAll": "Seleccionar todo",
            "p2p.receiver.deselectAll": "Deseleccionar todo",
            "p2p.receiver.downloadSelected": "↓ Descargar selección",
            "p2p.receiver.waitingFiles": "Esperando archivos…",
            "p2p.receiver.connectPrompt": "Conéctate a un emisor para empezar a recibir",
            "p2p.receiver.allReceived": "¡Todos los archivos recibidos!",
            "p2p.receiver.progressLabel": "Recibiendo",
            "p2p.server.label": "Servidor",
            "p2p.server.receiversTitle": "⬇ Receptores",
            "p2p.server.receiversDesc": "Progreso de descarga y verificación ACK",
            "p2p.statusbar.tagline": "WebRTC · Sin retransmisión · Sin límites",
            "p2p.tooltip.sender.title": "↑ Modo Envío",
            "p2p.tooltip.sender.l1": "Compartes archivos — el receptor se conecta con tu código de sesión de 6 caracteres",
            "p2p.tooltip.sender.l2": "Los archivos viajan de par a par — nada pasa por un servidor",
            "p2p.tooltip.sender.l3": "Verificación de integridad SHA-256 y reanudación automática si se corta la conexión",
            "p2p.tooltip.sender.l4": "Un receptor a la vez — usa el modo Servidor para varios destinatarios",
            "p2p.tooltip.receiver.title": "↓ Modo Recepción",
            "p2p.tooltip.receiver.l1": "Introduce el código de 6 caracteres del emisor o servidor para conectarte",
            "p2p.tooltip.receiver.l2": "Elige una carpeta de salida — los archivos se guardan directamente en el disco, sin diálogos por archivo",
            "p2p.tooltip.receiver.l3": "La transferencia se reanuda automáticamente si se corta a mitad de un archivo",
            "p2p.tooltip.receiver.l4": "Funciona tanto con pares en modo Envío como en modo Servidor",
            "p2p.tooltip.server.title": "⊞ Modo Servidor",
            "p2p.tooltip.server.l1": "Aloja archivos que varios receptores pueden explorar y descargar simultáneamente",
            "p2p.tooltip.server.l2": "Cada receptor elige qué archivos descargar — las transferencias se ejecutan en paralelo",
            "p2p.tooltip.server.l3": "El seguimiento ACK en vivo confirma la recepción completa de cada archivo por cliente",
            "p2p.tooltip.server.l4": "Añade o elimina archivos en cualquier momento — los receptores conectados son notificados al instante"
        });

        I18N.registerLang('de', {
            "app.p2p": "P2P-Übertragung",
            "p2p.role.title": "MODUS WÄHLEN",
            "p2p.role.subtitle": "Direktes WebRTC · Kein Server · Kein Upload-Limit",
            "p2p.role.send.label": "Senden",
            "p2p.role.send.desc": "Dateien direkt an einen Peer freigeben",
            "p2p.role.receive.label": "Empfangen",
            "p2p.role.receive.desc": "Von einem Sender oder Server herunterladen",
            "p2p.role.server.label": "Server",
            "p2p.role.server.desc": "Eine Dateibibliothek für mehrere Peers bereitstellen",
            "p2p.role.hint": "Modus antippen oder überfahren für Details · Klicken zum Starten",
            "p2p.role.loading": "P2P-Engine wird geladen…",
            "p2p.role.edgeStrong": "Microsoft Edge empfohlen",
            "p2p.role.edgeDesc": " — Edge unterstützt die File System Access API, wodurch empfangene Dateien direkt in einem gewählten Ordner gespeichert werden können, ohne Dialog pro Datei. Andere Browser nutzen den klassischen Download pro Datei.",
            "p2p.common.shaTooltipSend": "Dateiintegrität per SHA-256-Hash prüfen",
            "p2p.common.shaTooltipSrv": "Berechnet und sendet den SHA-256-Hash an Empfänger zur Integritätsprüfung",
            "p2p.table.name": "Name",
            "p2p.table.size": "Größe",
            "p2p.table.status": "Status",
            "p2p.table.hash": "Hash",
            "p2p.dropzone.text": "Dateien hier ablegen oder klicken zum Durchsuchen",
            "p2p.session.label": "Sitzung",
            "p2p.sender.clear": "✕ Erledigte entfernen",
            "p2p.sender.send": "▶ Senden",
            "p2p.sender.progressLabel": "Wird gesendet",
            "p2p.receiver.senderCode": "Sender-Code",
            "p2p.receiver.connect": "Verbinden ▶",
            "p2p.receiver.downloadFolder": "Download-Ordner",
            "p2p.receiver.chooseFolder": "📁 Wählen",
            "p2p.receiver.autoDownload": "Automatischer Download (kein Ordner ausgewählt)",
            "p2p.receiver.deselectFolderTitle": "Ordnerauswahl aufheben",
            "p2p.receiver.clearReceived": "✕ Empfangene entfernen",
            "p2p.receiver.connectedTo": "Verbunden mit",
            "p2p.receiver.settingsTitle": "Verbindung / Ordner bearbeiten",
            "p2p.receiver.settingsBtn": "⚙ Einstellungen",
            "p2p.receiver.availableFiles": "Verfügbare Dateien",
            "p2p.receiver.selectAll": "Alle auswählen",
            "p2p.receiver.deselectAll": "Alle abwählen",
            "p2p.receiver.downloadSelected": "↓ Auswahl herunterladen",
            "p2p.receiver.waitingFiles": "Warten auf Dateien…",
            "p2p.receiver.connectPrompt": "Mit einem Sender verbinden, um Dateien zu empfangen",
            "p2p.receiver.allReceived": "Alle Dateien empfangen!",
            "p2p.receiver.progressLabel": "Wird empfangen",
            "p2p.server.label": "Server",
            "p2p.server.receiversTitle": "⬇ Empfänger",
            "p2p.server.receiversDesc": "Download-Fortschritt & ACK-Prüfung",
            "p2p.statusbar.tagline": "WebRTC · Kein Relay · Keine Limits",
            "p2p.tooltip.sender.title": "↑ Sendemodus",
            "p2p.tooltip.sender.l1": "Du teilst Dateien — der Empfänger verbindet sich mit deinem 6-stelligen Sitzungscode",
            "p2p.tooltip.sender.l2": "Dateien werden Peer-to-Peer übertragen — nichts läuft über einen Server",
            "p2p.tooltip.sender.l3": "SHA-256-Integritätsprüfung und automatische Fortsetzung bei Verbindungsabbruch",
            "p2p.tooltip.sender.l4": "Nur ein Empfänger gleichzeitig — für mehrere Empfänger den Servermodus nutzen",
            "p2p.tooltip.receiver.title": "↓ Empfangsmodus",
            "p2p.tooltip.receiver.l1": "Gib den 6-stelligen Code des Senders oder Servers ein, um dich zu verbinden",
            "p2p.tooltip.receiver.l2": "Wähle einen Ausgabeordner — Dateien werden direkt gespeichert, ohne Dialog pro Datei",
            "p2p.tooltip.receiver.l3": "Die Übertragung wird bei Abbruch mitten in einer Datei automatisch fortgesetzt",
            "p2p.tooltip.receiver.l4": "Funktioniert sowohl mit Sende- als auch mit Servermodus-Peers",
            "p2p.tooltip.server.title": "⊞ Servermodus",
            "p2p.tooltip.server.l1": "Stelle Dateien bereit, die mehrere Empfänger gleichzeitig durchsuchen und herunterladen können",
            "p2p.tooltip.server.l2": "Jeder Empfänger wählt, welche Dateien heruntergeladen werden — Übertragungen laufen parallel",
            "p2p.tooltip.server.l3": "Live-ACK-Tracking bestätigt den vollständigen Empfang jeder Datei pro Client",
            "p2p.tooltip.server.l4": "Dateien jederzeit hinzufügen oder entfernen — verbundene Empfänger werden sofort benachrichtigt"
        });

        const P2P_HTML = `<div id="p2p-app">

<div id="app">

  <!-- ═══ MAIN ═══ -->
  <div id="main">

    <!-- ── SCREEN 0 : Role selection ── -->
    <div class="screen visible" id="screen-role">
      <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:0.74em;">
        <div class="role-panel">
          <div class="role-panel-header">
            <div class="role-panel-title" style="color:#22c55e" data-i18n="p2p.role.title">SELECT MODE</div>
            <div class="role-panel-sub" data-i18n="p2p.role.subtitle">Direct WebRTC · No server · No upload limit</div>
          </div>
          <div class="role-btns">
            <button class="role-btn" id="btn-sender" onclick="chooseRole('sender')" data-tooltip="sender">
              <span class="r-icon">↑</span>
              <span class="r-label" data-i18n="p2p.role.send.label">Send</span>
              <span class="r-desc" data-i18n="p2p.role.send.desc">Share files directly to a peer</span>
            </button>
            <button class="role-btn" id="btn-receiver" onclick="chooseRole('receiver')" data-tooltip="receiver">
              <span class="r-icon">↓</span>
              <span class="r-label" data-i18n="p2p.role.receive.label">Receive</span>
              <span class="r-desc" data-i18n="p2p.role.receive.desc">Download from a sender or server</span>
            </button>
            <button class="role-btn" id="btn-server" onclick="chooseRole('server')" data-tooltip="server">
              <span class="r-icon" style="color:var(--cyan)">⊞</span>
              <span class="r-label" data-i18n="p2p.role.server.label">Server</span>
              <span class="r-desc" data-i18n="p2p.role.server.desc">Host a file library for multiple peers</span>
            </button>
          </div>
          <div class="role-hint status pulse" data-i18n="p2p.role.hint">Hover or tap a mode for details · Click to get started</div>
          <div class="role-edge-note">
            <span class="edge-icon">💡</span>
            <span><strong style="color:var(--text);letter-spacing:.04em" data-i18n="p2p.role.edgeStrong">Microsoft Edge recommended</strong><span data-i18n="p2p.role.edgeDesc"> — Edge supports the File System Access API, allowing received files to be saved directly to a chosen output folder without individual download dialogs. Other browsers will fall back to standard per-file downloads.</span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── SCREEN SENDER ── -->
    <div class="screen" id="screen-sender">

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="toolbar-left">
          <div class="session-block">
            <span class="sess-label" data-i18n="p2p.session.label">Session</span>
            <div class="code-pill" id="my-code"
              role="button" tabindex="0"
              onclick="copyCode()"
              onkeydown="if(event.key==='Enter'||event.key===' ')copyCode()">
              · · · · · ·
            </div>
          </div>
          <span class="queue-count hidden" id="queue-count">0</span>
        </div>
        <div class="toolbar-right">
          <label class="tb-toggle" title="Verify file integrity via SHA-256 hash" data-i18n-title="p2p.common.shaTooltipSend">
            <input type="checkbox" id="sha-toggle-send" onchange="onShaToggle(this)">
            <span class="tb-toggle-track"></span>
            <span class="tb-toggle-label">SHA-256</span>
          </label>
          <button class="tb-btn danger" id="btn-clear" onclick="clearConfirmed()" style="display:none" data-i18n="p2p.sender.clear">✕ Clear done</button>
          <button class="tb-btn primary" id="btn-send" onclick="startSendQueue()" disabled data-i18n="p2p.sender.send">▶ Send</button>
        </div>
      </div>

      <!-- Status -->
      <div class="status pulse" id="status-sender">Waiting for receiver to connect…</div>

      <!-- File section -->
      <div class="file-section">
        <div class="file-table-header">
          <span></span>
          <span data-i18n="p2p.table.name">Name</span>
          <span style="text-align:right" data-i18n="p2p.table.size">Size</span>
          <span style="text-align:center" data-i18n="p2p.table.status">Status</span>
          <span style="text-align:center" data-i18n="p2p.table.hash">Hash</span>
          <span></span>
        </div>

        <div id="send-queue" class="file-queue"></div>

        <div class="dropzone" id="dropzone">
          <input type="file" id="file-input" multiple onchange="onFilesSelected(this.files)" />
          <span class="dz-icon">⬆</span>
          <span class="dz-text" data-i18n="p2p.dropzone.text">Drop files here or click to browse</span>
        </div>
      </div>

      <!-- Global progress -->
      <div class="progress-wrap" id="send-progress" style="display:none">
        <div class="progress-label">
          <span id="send-file-label" data-i18n="p2p.sender.progressLabel">Sending</span>
          <span style="display:flex;gap:0.3em;align-items:center;flex-shrink:0">
            <span id="send-speed"></span>
            <span class="pct" id="send-pct">0%</span>
          </span>
        </div>
        <div class="progress-track"><div class="progress-bar" id="send-bar"></div></div>
      </div>

    </div><!-- /screen-sender -->

    <!-- ── SCREEN RECEIVER ── -->
    <div class="screen" id="screen-receiver">

      <!-- Connect form -->
      <div class="recv-form">
        <div class="recv-form-inner" style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap;">
        <div class="recv-row">
          <div class="recv-field">
            <span class="field-label" data-i18n="p2p.receiver.senderCode">Sender code</span>
            <input type="text" id="peer-code" placeholder="XXXXXX" maxlength="6"
              onkeydown="if(event.key==='Enter')connectToPeer()" />
          </div>
          <button class="tb-btn primary large" id="btn-connect" onclick="connectToPeer()" style="align-self:flex-end" data-i18n="p2p.receiver.connect">Connect ▶</button>
          <div class="recv-field">
            <span class="field-label" data-i18n="p2p.receiver.downloadFolder">Download folder</span>
            <div class="dir-row">
              <button class="btn-dir" id="btn-dir" onclick="pickDirectory()" data-i18n="p2p.receiver.chooseFolder">📁 Choose</button>
              <span class="dir-path" id="dir-path" onclick="onDirPathClick()" data-i18n="p2p.receiver.autoDownload">Auto-download (no folder selected)</span>
              <button class="btn-dir" id="btn-dir-clear" onclick="clearDirectory()" title="Deselect folder" data-i18n-title="p2p.receiver.deselectFolderTitle" style="display:none;padding:0.3em 0.44em;color:var(--dim)">✕</button>
            </div>
          </div>
        </div>
        <button class="tb-btn danger" id="btn-clear-recv" onclick="clearReceived()"
          style="display:none;flex-shrink:0;align-self:center" data-i18n="p2p.receiver.clearReceived">✕ Clear received</button>
        </div>
        <!-- Mini bar shown when connected — collapses the form to save vertical space on mobile -->
        <div class="recv-form-mini" id="recv-form-mini">
          <span style="color:var(--dim2);font-size:0.7em;letter-spacing:.08em;text-transform:uppercase;font-weight:600" data-i18n="p2p.receiver.connectedTo">Connected to</span>
          <span class="recv-mini-code" id="recv-mini-code"></span>
          <span id="recv-mini-folder" style="font-size:0.63em;color:var(--dim2)"></span>
          <button class="recv-mini-expand" onclick="expandRecvForm()" title="Edit connection / folder" data-i18n-title="p2p.receiver.settingsTitle" data-i18n="p2p.receiver.settingsBtn">⚙ settings</button>
        </div>
      </div>

      <!-- Status -->
      <div class="status" id="status-receiver">Enter the code and connect</div>

      <!-- Receive file table -->
      <div class="file-section" style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
        <div class="file-table-header" id="recv-table-header" style="display:none">
          <span></span>
          <span data-i18n="p2p.table.name">Name</span>
          <span style="text-align:right" data-i18n="p2p.table.size">Size</span>
          <span style="text-align:center" data-i18n="p2p.table.status">Status</span>
          <span style="text-align:center" data-i18n="p2p.table.hash">Hash</span>
          <span></span>
        </div>

        <!-- Server mode: file selection list -->
        <div class="recv-filelist-panel" id="recv-filelist" style="display:none;">
          <div class="rfl-header">
            <span class="rfl-title" data-i18n="p2p.receiver.availableFiles">Available files</span>
            <div class="rfl-actions">
              <button class="tb-btn" onclick="rflSelectAll(true)" data-i18n="p2p.receiver.selectAll">Select all</button>
              <button class="tb-btn" onclick="rflSelectAll(false)" data-i18n="p2p.receiver.deselectAll">Deselect all</button>
            </div>
          </div>
          <div class="rfl-list" id="rfl-list"></div>
          <div class="rfl-footer">
            <span class="rfl-sel-count" id="rfl-sel-count"><span>0</span> file(s) selected</span>
            <button class="tb-btn primary large" id="btn-rfl-download" onclick="rflStartDownload()" disabled data-i18n="p2p.receiver.downloadSelected">↓ Download selected</button>
          </div>
        </div>

        <div id="recv-queue" class="file-queue" style="display:none"></div>

        <div id="recv-dropzone">
          <span class="recv-dz-icon">⬇</span>
          <span class="recv-dz-text" data-i18n="p2p.receiver.waitingFiles">Waiting for files…</span>
          <span class="recv-dz-sub" data-i18n="p2p.receiver.connectPrompt">Connect to a sender to start receiving</span>
        </div>
      </div>

      <!-- Done banner -->
      <div id="recv-done-msg" style="display:none" class="done-banner">
        <span>✓</span>
        <span data-i18n="p2p.receiver.allReceived">All files received!</span>
        <span class="done-detail" id="recv-done-detail"></span>
      </div>

<!-- Global progress -->
      <div class="progress-wrap" id="recv-progress" style="display:none">
        <div class="progress-label">
          <span id="recv-file-label" data-i18n="p2p.receiver.progressLabel">Receiving</span>
          <span style="display:flex;gap:0.3em;align-items:center;flex-shrink:0">
            <span id="recv-speed"></span>
            <span class="pct" id="recv-pct">0%</span>
          </span>
        </div>
        <div class="progress-track"><div class="progress-bar" id="recv-bar"></div></div>
      </div>

    </div><!-- /screen-receiver -->

    <!-- ── SCREEN SERVER ── -->
    <div class="screen" id="screen-server">

      <!-- Toolbar -->
      <div class="toolbar">
        <div class="toolbar-left">
          <div class="session-block">
            <span class="sess-label" style="color:var(--cyan)" data-i18n="p2p.server.label">Server</span>
            <div class="code-pill" id="srv-code"
              role="button" tabindex="0"
              style="color:var(--cyan);background:rgba(6,182,212,.08);border-color:rgba(6,182,212,.25);"
              onclick="copyCodeSrv()"
              onkeydown="if(event.key==='Enter'||event.key===' ')copyCodeSrv()">
              · · · · · ·
            </div>
          </div>
          <span class="queue-count hidden" id="srv-queue-count">0 files</span>
        </div>
        <div class="toolbar-right">
          <label class="tb-toggle" title="Compute &amp; send SHA-256 hash to receivers for integrity check" data-i18n-title="p2p.common.shaTooltipSrv">
            <input type="checkbox" id="sha-toggle-srv" onchange="onSrvShaToggle(this)">
            <span class="tb-toggle-track"></span>
            <span class="tb-toggle-label">SHA-256</span>
          </label>
          <span class="srv-clients-badge" id="srv-clients-badge">0 connected</span>
        </div>
      </div>

      <!-- Status -->
      <div class="status pulse" id="status-server">Initializing server…</div>

      <!-- Receivers panel (visible when at least one receiver connects) -->
      <div id="srv-receivers-panel">
        <div class="srv-recv-header">
          <span class="srv-recv-title" data-i18n="p2p.server.receiversTitle">⬇ Receivers</span>
          <span style="font-size:0.56em;color:var(--dim);letter-spacing:.1em;text-transform:uppercase" data-i18n="p2p.server.receiversDesc">
            Download progress &amp; ACK verification
          </span>
        </div>
        <div class="srv-recv-list" id="srv-recv-list"></div>
      </div>

      <!-- File section -->
      <div class="file-section">
        <div class="file-table-header">
          <span></span>
          <span data-i18n="p2p.table.name">Name</span>
          <span style="text-align:right" data-i18n="p2p.table.size">Size</span>
          <span style="text-align:center" data-i18n="p2p.table.status">Status</span>
          <span style="text-align:center" data-i18n="p2p.table.hash">Hash</span>
          <span></span>
        </div>

        <div id="srv-queue" class="file-queue"></div>

        <div class="dropzone" id="srv-dropzone">
          <input type="file" id="srv-file-input" multiple onchange="onSrvFilesSelected(this.files)" />
          <span class="dz-icon">⬆</span>
          <span class="dz-text" data-i18n="p2p.dropzone.text">Drop files here or click to browse</span>
        </div>
      </div>

    </div><!-- /screen-server -->

  </div><!-- /main -->

  <!-- ═══ STATUS BAR ═══ -->
  <div id="statusbar">
    <span class="sb-item">P2PTRANSFER</span>
    <span class="sb-sep">|</span>
    <span class="sb-item" data-i18n="p2p.statusbar.tagline">WebRTC · No relay · No limits</span>
    <span class="sb-sep">|</span>
    <span class="sb-item sb-green" id="sb-mode">Idle</span>
    <div id="conn-bar">
      <span class="conn-dot waiting" id="conn-dot"></span>
      <span class="conn-label" id="conn-label">CONNECTING</span>
      <span class="conn-ping" id="conn-ping"></span>
    </div>
  </div>

</div><!-- /app -->

<!-- Global role tooltip — fixed positioned, above all overflow contexts -->
<div id="role-tooltip"></div>
</div><!-- /p2p-app -->`;

        function __p2pEngine() {
            /* ════════════════════════════════════════════════════════
               ROLE TOOLTIPS — body-level, immune to overflow:hidden
            ════════════════════════════════════════════════════════ */
            // Clés I18N — le contenu est résolu à l'affichage via I18N.t(), donc
            // toujours dans la langue courante même après un changement de langue.
            var _tooltipKeys={
              sender:{t:'p2p.tooltip.sender.title', l:['p2p.tooltip.sender.l1','p2p.tooltip.sender.l2','p2p.tooltip.sender.l3','p2p.tooltip.sender.l4']},
              receiver:{t:'p2p.tooltip.receiver.title', l:['p2p.tooltip.receiver.l1','p2p.tooltip.receiver.l2','p2p.tooltip.receiver.l3','p2p.tooltip.receiver.l4']},
              server:{t:'p2p.tooltip.server.title', l:['p2p.tooltip.server.l1','p2p.tooltip.server.l2','p2p.tooltip.server.l3','p2p.tooltip.server.l4']}
            };
            function _tooltipItems(key){
              var e=_tooltipKeys[key];
              if(!e)return null;
              var items=[{t:I18N.t(e.t)}];
              e.l.forEach(function(k){items.push({l:I18N.t(k)});});
              return items;
            }

            var _tt=document.getElementById('role-tooltip');
            var _ttTarget=null;

            function _ttShow(btn){
              var key=btn.getAttribute('data-tooltip');
              var items=_tooltipItems(key);
              if(!items)return;
              var html='';
              items.forEach(function(item){
                if(item.t){html+='<div class="role-tooltip-title">'+item.t+'</div>';}
                else{html+='<div class="role-tooltip-line"><span class="tt-dot">▸</span>'+item.l+'</div>';}
              });
              _tt.innerHTML=html;
              _tt.classList.add('visible');
              _ttPosition(btn);
            }

            function _ttPosition(btn){
              var r=btn.getBoundingClientRect();
              var tw=_tt.offsetWidth;
              var th=_tt.offsetHeight;
              var left=r.left+r.width/2-tw/2;
              var top=r.top-th-10; // 10px above the button
              // clamp horizontally within viewport
              left=Math.max(8,Math.min(left,window.innerWidth-tw-8));
              // if above viewport, flip below
              if(top<8){top=r.bottom+10;}
              _tt.style.left=left+'px';
              _tt.style.top=top+'px';
              // arrow direction
              _tt.classList.toggle('flipped', top > r.top);
            }

            function _ttHide(){_tt.classList.remove('visible');}

            document.querySelectorAll('.role-btn[data-tooltip]').forEach(function(btn){
              btn.addEventListener('mouseenter',function(){_ttTarget=btn;_ttShow(btn);});
              btn.addEventListener('mouseleave',function(){_ttTarget=null;_ttHide();});
              btn.addEventListener('focus',function(){_ttTarget=btn;_ttShow(btn);});
              btn.addEventListener('blur',function(){_ttTarget=null;_ttHide();});
              // Touch: tap toggles tooltip; tap outside dismisses
              btn.addEventListener('touchstart',function(e){
                if(_ttTarget===btn){_ttTarget=null;_ttHide();}
                else{e.preventDefault();_ttTarget=btn;_ttShow(btn);}
              },{passive:false});
            });
            document.addEventListener('touchstart',function(e){
              if(_ttTarget&&!_ttTarget.contains(e.target)){_ttTarget=null;_ttHide();}
            },{passive:true});
            window.addEventListener('scroll',function(){if(_ttTarget)_ttPosition(_ttTarget);},true);

            /* ════════════════════════════════════════════════════════
               DRAG & DROP
            ════════════════════════════════════════════════════════ */
            var dz=document.getElementById('dropzone');
            dz.addEventListener('dragover',function(e){e.preventDefault();dz.classList.add('drag-over');});
            dz.addEventListener('dragleave',function(e){
              if(!dz.contains(e.relatedTarget))dz.classList.remove('drag-over');
            });
            dz.addEventListener('drop',function(e){e.preventDefault();dz.classList.remove('drag-over');addFiles(e.dataTransfer.files);});

            /* ════════════════════════════════════════════════════════
               UTILITAIRES
            ════════════════════════════════════════════════════════ */
            function escHtml(s){
              return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
            }
            function fmtB(b){
              if(b===0)return '0 B';
              if(b<1024)return b+' B';
              if(b<1048576)return(b/1024).toFixed(1)+' KB';
              if(b<1073741824)return(b/1048576).toFixed(1)+' MB';
              return(b/1073741824).toFixed(2)+' GB';
            }
            function sanitizeFilename(name){
              var s=String(name).replace(/[/\\?%*:|"<>\x00]/g,'_').trim().substring(0,255)||'file';
              // Block path traversal via bare dot names
              if(s==='.'||s==='..')s='file';
              // Strip trailing dots and spaces — invalid on Windows and can bypass extension filters
              s=s.replace(/[. ]+$/,'').trim()||'file';
              return s;
            }

            /* ════════════════════════════════════════════════════════
               SHA-256 INTÉGRITÉ
            ════════════════════════════════════════════════════════ */
            function hexHash(buffer){
              return Array.from(new Uint8Array(buffer))
                .map(function(b){return b.toString(16).padStart(2,'0');}).join('');
            }
            var SHA_MAX_BYTES=500*1024*1024; // 500 MB — above this SHA-256 is disabled to avoid OOM
            var HASH_CHUNK=4*1024*1024; // 4 MB slices

            async function computeFileHash(file){
              if(file.size>SHA_MAX_BYTES){
                console.warn('SHA-256 skipped — file exceeds 500 MB limit');
                return null;
              }
              if(file.size<=67108864){
                var buf=await file.arrayBuffer();
                return hexHash(await crypto.subtle.digest('SHA-256',buf));
              }
              var offset=0;var parts=[];
              while(offset<file.size){
                var slice=file.slice(offset,offset+HASH_CHUNK);
                var ab=await slice.arrayBuffer();
                parts.push(new Uint8Array(ab));
                offset+=HASH_CHUNK;
              }
              var total=parts.reduce(function(s,p){return s+p.length;},0);
              var merged=new Uint8Array(total);var off=0;
              parts.forEach(function(p){merged.set(p,off);off+=p.length;});
              return hexHash(await crypto.subtle.digest('SHA-256',merged.buffer));
            }
            async function computeChunksHash(chunks){
              var total=chunks.reduce(function(s,c){return s+(c.byteLength||0);},0);
              if(total>SHA_MAX_BYTES){console.warn('SHA-256 skipped — chunks exceed 500 MB');return null;}
              var merged=new Uint8Array(total);
              var off=0;
              chunks.forEach(function(c){merged.set(new Uint8Array(c),off);off+=c.byteLength;});
              var digest=await crypto.subtle.digest('SHA-256',merged.buffer);
              return hexHash(digest);
            }
            async function computeBlobHash(blob){
              if(blob.size>SHA_MAX_BYTES){console.warn('SHA-256 skipped — blob exceeds 500 MB');return null;}
              if(blob.size<=67108864){
                var buf=await blob.arrayBuffer();
                return hexHash(await crypto.subtle.digest('SHA-256',buf));
              }
              var offset=0;var parts=[];
              while(offset<blob.size){
                var slice=blob.slice(offset,offset+HASH_CHUNK);
                var ab=await slice.arrayBuffer();
                parts.push(new Uint8Array(ab));
                offset+=HASH_CHUNK;
              }
              var total=parts.reduce(function(s,p){return s+p.length;},0);
              var merged=new Uint8Array(total);var off=0;
              parts.forEach(function(p){merged.set(p,off);off+=p.length;});
              return hexHash(await crypto.subtle.digest('SHA-256',merged.buffer));
            }

            function validateMeta(msg){
              if(!msg||typeof msg.name!=='string'||msg.name.length===0||msg.name.length>500)return false;
              if(typeof msg.size!=='number'||!isFinite(msg.size)||msg.size<0||msg.size>107374182400)return false;
              if(typeof msg.idx!=='number'||!Number.isInteger(msg.idx)||msg.idx<0||msg.idx>9999)return false;
              if(typeof msg.total!=='number'||!Number.isInteger(msg.total)||msg.total<1||msg.total>9999)return false;
              if(msg.idx>=msg.total)return false; // idx must be strictly less than total
              if(msg.resumeOffset!==undefined&&msg.resumeOffset!==null){
                if(typeof msg.resumeOffset!=='number'||!Number.isInteger(msg.resumeOffset)||!isFinite(msg.resumeOffset)||msg.resumeOffset<0||msg.resumeOffset>msg.size)return false;
              }
              if(msg.hash!==undefined&&msg.hash!==null){
                if(typeof msg.hash!=='string'||!/^[0-9a-f]{64}$/.test(msg.hash))return false;
              }
              return true;
            }

            function setStatus(id,msg,type){
              var el=document.getElementById(id);
              if(!el)return;
              el.textContent=msg;el.className='status'+(type?' '+type:'');
              if(!type)el.classList.add('pulse');
              // Mirror to statusbar
              var sb=document.getElementById('sb-mode');
              if(sb&&(id==='status-sender'||id==='status-receiver'||id==='status-server'))sb.textContent=msg;
            }

            function showScreen(id){
              ['screen-role','screen-sender','screen-receiver','screen-server'].forEach(function(s){
                document.getElementById(s).classList.remove('visible');
              });
              document.getElementById(id).classList.add('visible');
            }

            function truncName(n){return n.length>30?n.substring(0,28)+'…':n;}

            /* ════════════════════════════════════════════════════════
               ÉTAT GLOBAL
            ════════════════════════════════════════════════════════ */
            var peer=null;
            // Centralized blob URL revocation — avoids accumulating one beforeunload listener per file
            var _pendingBlobUrls=new Map();
            window.addEventListener('beforeunload',function(){
              _pendingBlobUrls.forEach(function(timer,url){clearTimeout(timer);URL.revokeObjectURL(url);});
              _pendingBlobUrls.clear();
            });
            var conn=null;
            var myCode='';
            var fileQueue=[];
            var sendIdx=0;
            var sending=false;
            var sendOffset=0;
            var roleChosen=false;
            var CHUNK=256*1024;
            var PEER_TIMEOUT=15000;
            var reconnectTimer=null;
            var reconnectAttempts=0;
            var MAX_RECONNECT=8;
            var resumeState={idx:-1,recvd:0,chunks:[]};
            var shaEnabled=false;
            function onShaToggle(el){shaEnabled=el.checked;}
            var srvShaEnabled=false;
            function onSrvShaToggle(el){srvShaEnabled=el.checked;}

            /* ════════════════════════════════════════════════════════
               CALCUL DE VITESSE ET ETA
            ════════════════════════════════════════════════════════ */
            var speedState={send:{t0:0,bytes0:0},recv:{t0:0,bytes0:0}};
            function _speedKey(elId){return elId.indexOf('send')!==-1?'send':'recv';}
            function updateSpeed(elId,bytesSent,totalBytes){
              var k=_speedKey(elId),st=speedState[k];
              var now=performance.now();
              if(st.t0===0){st.t0=now;st.bytes0=bytesSent;return;}
              var dt=(now-st.t0)/1000;
              if(dt<0.4)return;
              var rate=(bytesSent-st.bytes0)/dt;
              st.t0=now;st.bytes0=bytesSent;
              var rateStr=rate>1048576?(rate/1048576).toFixed(1)+' MB/s':(rate/1024).toFixed(0)+' KB/s';
              var rem=totalBytes-bytesSent;
              var etaStr=rate>0?' · '+fmtEta(rem/rate):'';
              var el=document.getElementById(elId);
              if(el)el.textContent=rateStr+etaStr;
            }
            function fmtEta(s){
              if(!isFinite(s)||s<0)return '';
              if(s<60)return Math.ceil(s)+'s';
              if(s<3600)return Math.ceil(s/60)+'m';
              return (s/3600).toFixed(1)+'h';
            }
            function resetSpeed(elId){var k=_speedKey(elId);speedState[k]={t0:0,bytes0:0};var el=document.getElementById(elId);if(el)el.textContent='';}

            /* ════════════════════════════════════════════════════════
               SON DE SUCCÈS (Web Audio API)
            ════════════════════════════════════════════════════════ */
            var _audioCtx=null;
            function _getAudioCtx(){
              if(!_audioCtx||_audioCtx.state==='closed'){
                try{_audioCtx=new(window.AudioContext||window.webkitAudioContext)();}catch(_){_audioCtx=null;}
              }
              return _audioCtx;
            }
            function playBeep(freq,dur,vol){
              try{
                var ctx=_getAudioCtx();
                if(!ctx)return;
                // Resume context if suspended (browser autoplay policy)
                if(ctx.state==='suspended')ctx.resume();
                var osc=ctx.createOscillator();
                var gain=ctx.createGain();
                osc.connect(gain);gain.connect(ctx.destination);
                osc.type='sine';osc.frequency.setValueAtTime(freq||880,ctx.currentTime);
                gain.gain.setValueAtTime(vol||0.18,ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+(dur||0.3));
                osc.start(ctx.currentTime);osc.stop(ctx.currentTime+(dur||0.3));
              }catch(e){}
            }
            function playSuccessSound(){
              playBeep(660,0.18,0.15);
              setTimeout(function(){playBeep(880,0.22,0.18);},150);
            }

            /* ════════════════════════════════════════════════════════
               INDICATEUR DE CONNEXION + PING/PONG RTT
            ════════════════════════════════════════════════════════ */
            var pingTimer=null,pingT0=0,pingWait=false,pingTimeoutTimer=null;
            function setConnState(state,label,ping){
              var bar=document.getElementById('conn-bar');
              var dot=document.getElementById('conn-dot');
              var lbl=document.getElementById('conn-label');
              var pngEl=document.getElementById('conn-ping');
              if(!bar)return;
              bar.style.display='flex';
              dot.className='conn-dot '+state;
              lbl.className='conn-label '+state;
              lbl.textContent=label||'';
              pngEl.textContent=ping||'';
            }
            function startPing(){
              stopPing();
              pingTimer=setInterval(function(){
                if(conn&&conn.open&&!pingWait){
                  pingT0=performance.now();pingWait=true;
                  try{conn.send({type:'ping',t:pingT0});}catch(_){pingWait=false;return;}
                  pingTimeoutTimer=setTimeout(function(){
                    if(pingWait){
                      pingWait=false;
                      setConnState('err','No response — connection may be dead');
                      console.warn('Ping timeout — pong not received within 5s');
                    }
                  },5000);
                }
              },2500);
            }
            function stopPing(){
              if(pingTimer){clearInterval(pingTimer);pingTimer=null;}
              if(pingTimeoutTimer){clearTimeout(pingTimeoutTimer);pingTimeoutTimer=null;}
              pingWait=false;
            }

            /* ════════════════════════════════════════════════════════
               BACK-PRESSURE WEBRTC
            ════════════════════════════════════════════════════════ */
            var HIGH_WATER=1024*1024;
            var LOW_WATER =256*1024;
            var _bpPending=false;
            function resetBackPressure(){
              if(_bpPending){
                _bpPending=false;
                var dc=conn&&conn.dataChannel;
                if(dc&&dc.onbufferedamountlow)dc.onbufferedamountlow=null;
              }
            }
            function scheduleNextChunk(nextChunkFn){
              var dc=conn&&conn.dataChannel;
              if(!dc){setTimeout(nextChunkFn,8);return;}
              if(dc.bufferedAmount>HIGH_WATER){
                _bpPending=true;
                dc.bufferedAmountLowThreshold=LOW_WATER;
                dc.onbufferedamountlow=function(){
                  dc.onbufferedamountlow=null;_bpPending=false;
                  nextChunkFn();
                };
              } else {
                setTimeout(nextChunkFn,8);
              }
            }

            function updateQueueCount(){
              var el=document.getElementById('queue-count');
              if(!el)return;
              var total=fileQueue.length;
              var done=fileQueue.filter(function(e){return e.el.classList.contains('confirmed')||e.el.classList.contains('done');}).length;
              if(total===0){el.classList.add('hidden');return;}
              el.classList.remove('hidden');
              el.textContent=done+' / '+total+' file'+(total>1?'s':'');
            }

            function scrollToActive(queueId){
              var container=document.getElementById(queueId);
              if(!container)return;
              var active=container.querySelector('.fq-item.active');
              if(!active)return;
              if(typeof active.scrollIntoView==='function'){
                active.scrollIntoView({behavior:'smooth',block:'nearest'});
              } else {
                var itemTop=active.offsetTop-container.offsetTop;
                var target=itemTop-(container.clientHeight/2)+(active.offsetHeight/2);
                container.scrollTop=Math.max(0,target);
              }
            }

            function genCode(){
              var c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',s='',rnd=new Uint32Array(6);
              crypto.getRandomValues(rnd);
              for(var i=0;i<6;i++)s+=c[rnd[i]%c.length];
              return s;
            }

            /* ════════════ CHOIX DE ROLE ════════════ */
            function chooseRole(role){
              if(roleChosen)return;
              roleChosen=true;
              document.getElementById('btn-sender').disabled=true;
              document.getElementById('btn-receiver').disabled=true;
              document.getElementById('btn-server').disabled=true;
              document.getElementById('btn-'+role).classList.add('selected');
              var hint=document.querySelector('.role-hint');
              if(hint){hint.className='role-hint status ok';hint.textContent='Loading…';}
              if(role==='sender')initSender();
              else if(role==='server')initServer();
              else initReceiver();
            }

            /* ════════════ SENDER INIT ════════════ */
            function initSender(){
              showScreen('screen-sender');
              myCode=genCode();
              setStatus('status-sender','Initializing…','');
              setConnState('waiting','Waiting for receiver…');
              document.getElementById('sb-mode').textContent='SEND mode';

              var initTimer=setTimeout(function(){
                setStatus('status-sender','Connection to relay server timed out. Check your network.','err');
              },PEER_TIMEOUT);

              peer=new Peer(myCode,{debug:0,serialization:'binary'});
              peer.on('open',function(id){
                clearTimeout(initTimer);
                document.getElementById('my-code').textContent=id;
                setStatus('status-sender','Waiting for receiver to connect…','');
              });
              peer.on('connection',function(c){
                // Reject if a live connection already exists
                if(conn&&conn.open){c.close();return;}
                // Clean up any stale non-open connection first
                if(conn){try{conn.close();}catch(_){}conn=null;}
                conn=c;
                attachSenderConn();
              });
              peer.on('error',function(e){
                clearTimeout(initTimer);
                setStatus('status-sender','PeerJS error: '+(e.type||e),'err');
                // Clean up sender state so role selection starts fresh
                sending=false; sendIdx=0; sendOffset=0; sendTotal=0;
                var q=document.getElementById('send-queue');
                if(q)q.innerHTML='';
                fileQueue=[];
                document.getElementById('btn-clear').style.display='none';
                document.getElementById('send-progress').style.display='none';
                document.getElementById('my-code').textContent='· · · · · ·';
                var qc=document.getElementById('queue-count');if(qc)qc.classList.add('hidden');
                roleChosen=false;
                showScreen('screen-role');
                var bar=document.getElementById('conn-bar');if(bar)bar.style.display='none';
                document.getElementById('btn-sender').disabled=false;
                document.getElementById('btn-receiver').disabled=false;
                document.getElementById('btn-server').disabled=false;
                document.getElementById('btn-sender').classList.remove('selected');
                try{peer.destroy();}catch(_){}
                peer=null;
              });

              if(window._senderOfflineListener){
                window.removeEventListener('offline',window._senderOfflineListener);
                window.removeEventListener('online',window._senderOnlineListener);
              }
              window._senderOfflineListener=function(){
                setStatus('status-sender','Network offline — transfer paused','err');
                if(sending){sending=false;markCurrentPaused();updateSendBtn();}
              };
              window._senderOnlineListener=function(){
                setStatus('status-sender','Network back — receiver needs to reconnect','info');
              };
              window.addEventListener('offline',window._senderOfflineListener);
              window.addEventListener('online',window._senderOnlineListener);
            }

            /* ════════════ SENDER CONN HANDLERS ════════════ */
            function attachSenderConn(){
              conn.on('open',function(){
                reconnectAttempts=0;clearTimeout(reconnectTimer);
                setStatus('status-sender','Receiver connected — ready!','ok');
                setConnState('ok','Connected');
                startPing();
                updateSendBtn();
              });
              conn.on('data',function(msg){
                if(!msg||typeof msg.type!=='string')return;
                if(msg.type==='pong'&&pingWait){
                  var rtt=Math.round(performance.now()-pingT0);pingWait=false;
                  if(pingTimeoutTimer){clearTimeout(pingTimeoutTimer);pingTimeoutTimer=null;}
                  setConnState('ok','Connected','· '+rtt+' ms');
                  return;
                }
                if(msg.type==='ping'){try{conn.send({type:'pong',t:msg.t});}catch(_){}return;}
                if(msg.type==='ack'){
                  var ackIdx=msg.idx;
                  var ackName=msg.name;
                  // Prefer strict idx+name match, then name-only — never bare idx (stale after queue mutations)
                  var ackEntry=null;
                  for(var ai=0;ai<fileQueue.length;ai++){
                    var ae=fileQueue[ai];
                    if(ae.file&&ae.file.name===ackName){
                      if(ackEntry===null)ackEntry=ae;
                      if(ai===ackIdx){ackEntry=ae;break;}
                    }
                  }
                  if(ackEntry){
                    ackEntry.el.classList.remove('active','paused');
                    ackEntry.el.classList.add('confirmed');
                    ackEntry.stEl.textContent='✓ Ack';
                    ackEntry.stEl.className='fq-st confirmed';
                    ackEntry.barEl.style.transform='scaleX(1)';
                  }
                  document.getElementById('btn-clear').style.display='inline-block';
                  updateQueueCount();
                  return;
                }
                if(msg.type==='ack_all'){
                  setStatus('status-sender','✓✓ All files confirmed by receiver!','ok');
                  document.getElementById('send-progress').style.display='none';
                  resetSpeed('send-speed');
                  fileQueue.forEach(function(e){
                    e.el.classList.remove('active','paused');
                    e.el.classList.add('confirmed');
                    if(e.stEl.className.indexOf('confirmed')===-1){
                      e.stEl.textContent='✓ Ack';e.stEl.className='fq-st confirmed';
                    }
                    e.barEl.style.transform='scaleX(1)';
                  });
                  document.getElementById('btn-clear').style.display='inline-block';
                  updateQueueCount();
                  return;
                }
                if(msg.type==='hello'){
                  var rIdx=typeof msg.idx==='number'&&Number.isInteger(msg.idx)?msg.idx:-1;
                  var rOff=typeof msg.offset==='number'&&Number.isInteger(msg.offset)&&msg.offset>=0?msg.offset:0;
                  // Validate bounds before trusting receiver's resume state
                  if(rIdx>=0&&rIdx<fileQueue.length){
                    var maxOff=fileQueue[rIdx]&&fileQueue[rIdx].file?fileQueue[rIdx].file.size:0;
                    sendIdx=rIdx;
                    sendOffset=Math.min(rOff,maxOff); // clamp to actual file size
                  }
                  setStatus('status-sender',rIdx>=0?'Receiver reconnected — resuming…':'Receiver connected — ready!',rIdx>=0?'info':'ok');
                  setConnState('ok','Connected');
                  startPing();
                  updateSendBtn();
                  // Only auto-resume when receiver indicated a genuine in-progress file (rIdx>=0).
                  // On a fresh first connect (rIdx=-1) the user must click Send intentionally.
                  // Also initialise sendTotal here so the global progress bar has a valid denominator.
                  if(rIdx>=0&&conn&&conn.open&&fileQueue.length>0&&!sending){
                    sendTotal=fileQueue.length;
                    sending=true;document.getElementById('btn-send').disabled=true;
                    sendNext();
                  }
                  return;
                }
              });
              conn.on('close',function(){
                stopPing();resetBackPressure();
                setConnState('waiting','Disconnected');
                setStatus('status-sender','Receiver disconnected','err');
                sending=false;markCurrentPaused();updateSendBtn();
                conn=null;
              });
              conn.on('error',function(e){
                stopPing();resetBackPressure();
                setConnState('err','Error');
                setStatus('status-sender','Connection error: '+(e.type||e),'err');
                sending=false;markCurrentPaused();updateSendBtn();
                conn=null;
              });
            }

            function markCurrentPaused(){
              if(sendIdx<fileQueue.length){
                var e=fileQueue[sendIdx];
                e.el.classList.remove('active');
                e.el.classList.add('paused');
                e.stEl.textContent='Paused';
                e.stEl.className='fq-st paused';
              }
            }

            /* ════════════ COPY CODE ════════════ */
            function copyCode(){
              var el=document.getElementById('my-code');
              var text=el.textContent.replace(/\s/g,'');
              var prev=el.textContent;
              if(!text||!/^[A-HJ-NP-Z2-9]{6}$/.test(text))return;
              if(navigator.clipboard&&navigator.clipboard.writeText){
                navigator.clipboard.writeText(text).then(function(){
                  el.textContent='Copied!';
                  setTimeout(function(){el.textContent=prev;},1200);
                }).catch(function(){fallbackCopy(text,el,prev);});
              } else {
                fallbackCopy(text,el,prev);
              }
            }
            function fallbackCopy(text,el,prev){
              var ta=document.createElement('textarea');
              ta.value=text;ta.style.cssText='position:fixed;opacity:0;';
              document.body.appendChild(ta);ta.select();
              try{document.execCommand('copy');el.textContent='Copied!';}
              catch(e){el.textContent='Copy manually';}
              document.body.removeChild(ta);
              setTimeout(function(){el.textContent=prev;},1200);
            }

            function onFilesSelected(files){
              addFiles(files);
              var inp=document.getElementById('file-input');
              if(inp)inp.value='';
            }

            /* ════════════ MAKE FQ ITEM ════════════ */
            function makeFqItem(f){
              var item=document.createElement('div');item.className='fq-item';
              var stEl=document.createElement('span');stEl.className='fq-st';stEl.textContent='—';
              var shaEl=document.createElement('span');shaEl.className='sha-badge waiting';shaEl.title='';shaEl.textContent='—';
              var trackDiv=document.createElement('div');trackDiv.className='mini-track';trackDiv.style.width='100%';
              var barDiv=document.createElement('div');barDiv.className='mini-bar';
              trackDiv.appendChild(barDiv);
              item.innerHTML='<span class="fq-icon-sm">📄</span>'
                +'<span class="fq-name">'+escHtml(truncName(f.name))+'</span>'
                +'<span class="fq-size">'+fmtB(f.size)+'</span>';
              item.appendChild(stEl);
              item.appendChild(shaEl);
              var rmBtn=document.createElement('button');
              rmBtn.className='fq-remove';rmBtn.textContent='✕';rmBtn.title='Remove';
              rmBtn.onclick=function(){removeFqItem(item);};
              item.appendChild(rmBtn);
              var prow=document.createElement('div');prow.className='fq-prow';
              prow.appendChild(trackDiv);item.appendChild(prow);
              return {el:item,barEl:barDiv,stEl:stEl,shaEl:shaEl};
            }

            function removeFqItem(itemEl){
              if(itemEl.classList.contains('active'))return;
              var idx=fileQueue.findIndex(function(e){return e.el===itemEl;});
              if(idx===-1)return;
              if(idx===sendIdx){sendOffset=0;}
              if(idx<sendIdx)sendIdx=Math.max(0,sendIdx-1);
              fileQueue.splice(idx,1);
              var q=document.getElementById('send-queue');
              if(q&&itemEl.parentNode===q)q.removeChild(itemEl);
              updateSendBtn();
              updateQueueCount();
            }

            function addFiles(files){
              var q=document.getElementById('send-queue');
              var dupeCount=0;
              for(var i=0;i<files.length;i++){
                var f=files[i];
                var isDupe=fileQueue.some(function(e){
                  return e.file.name===f.name&&e.file.size===f.size&&e.file.lastModified===f.lastModified;
                });
                if(isDupe){dupeCount++;continue;}
                var parts=makeFqItem(f);
                q.appendChild(parts.el);
                fileQueue.push({file:f,el:parts.el,barEl:parts.barEl,stEl:parts.stEl,shaEl:parts.shaEl});
              }
              if(dupeCount>0){
                setStatus('status-sender',dupeCount+' duplicate file'+(dupeCount>1?'s':'')+' skipped','info');
                setTimeout(function(){
                  if(!sending)setStatus('status-sender',conn&&conn.open?'Ready to send':'Waiting for receiver to connect…','');
                },3000);
              }
              updateSendBtn();
              updateQueueCount();
            }

            function clearReceived(){
              if(reconnectTimer){clearTimeout(reconnectTimer);reconnectTimer=null;reconnectAttempts=0;}
              var rq=document.getElementById('recv-queue');
              if(rq){rq.innerHTML='';rq.style.display='none';}
              document.getElementById('recv-table-header').style.display='none';
              document.getElementById('btn-clear-recv').style.display='none';
              document.getElementById('recv-progress').style.display='none';
              document.getElementById('recv-done-msg').style.display='none';
              var bc=document.getElementById('btn-connect');if(bc)bc.disabled=false;
              // Reset resume state so next connect doesn't try to resume old files
              resumeState={idx:-1,recvd:0,chunks:[]};
              window._rItems={};
              // NOTE: _rflDownloaded is intentionally NOT reset here.
              // It tracks files received during this session so they stay marked as done
              // after a UI clear — the only mechanism mobile has (no disk scan available).
              // Expand form if currently disconnected so user can re-enter a code
              if(!conn||!conn.open)expandRecvForm();
              // If connected to a server, re-show the file selection list instead of the dropzone
              if(_rflFiles&&_rflFiles.length>0&&_rflConn&&_rflConn.open){
                showRecvFilelist(_rflFiles,_rflConn).catch(function(e){console.error('showRecvFilelist error',e);});
              } else {
                document.getElementById('recv-dropzone').classList.remove('hidden');
              }
            }

            function clearConfirmed(){
              if(sending)return;
              var q=document.getElementById('send-queue');
              fileQueue=fileQueue.filter(function(e){
                if(e.el.classList.contains('confirmed')){q.removeChild(e.el);return false;}
                return true;
              });
              sendIdx=0;sendOffset=0;
              document.getElementById('btn-clear').style.display='none';
              updateSendBtn();
              updateQueueCount();
            }

            function updateSendBtn(){
              var allConfirmed=fileQueue.length>0&&fileQueue.every(function(e){return e.el.classList.contains('confirmed');});
              var btn=document.getElementById('btn-send');
              btn.disabled=!(conn&&conn.open&&fileQueue.length>0&&!sending&&!allConfirmed);
              if(sending){btn.textContent='▶ Sending…';}
              else if(allConfirmed){btn.textContent='✓ All done';}
              else{btn.textContent='▶ Send';}
            }

            var sendTotal=0; // snapshotted at startSendQueue

            function startSendQueue(){
              if(!conn||!conn.open||sending||fileQueue.length===0)return;
              sending=true;
              sendTotal=fileQueue.length; // freeze total for this send session
              document.getElementById('btn-send').disabled=true;
              if(sendOffset===0)sendIdx=0;
              resetSpeed('send-speed');
              sendNext();
            }

            /* ════════════ SENDNEXT ════════════ */
            function sendNext(){
              while(sendIdx<fileQueue.length&&(fileQueue[sendIdx].el.classList.contains('done')||fileQueue[sendIdx].el.classList.contains('confirmed'))){
                sendIdx++;sendOffset=0;
              }
              if(sendIdx>=fileQueue.length){
                sending=false;
                setStatus('status-sender','✓ All files sent!','ok');
                document.getElementById('send-progress').style.display='none';
                resetSpeed('send-speed');updateSendBtn();return;
              }
              var entry=fileQueue[sendIdx];
              fileQueue.forEach(function(e,i){if(i!==sendIdx)e.el.classList.remove('active','paused');});
              entry.el.classList.remove('paused');entry.el.classList.add('active');
              entry.stEl.textContent='…';entry.stEl.className='fq-st sending';
              entry._scrolled=false;
              scrollToActive('send-queue');
              var f=entry.file;
              // Use snapshotted total bytes from sendTotal-mapped queue to avoid drift if files added mid-send
              var totalBytes=fileQueue.slice(0,sendTotal).reduce(function(s,e){return s+e.file.size;},0);

              var doSend=async function(){
                var hash=null;
                if(shaEnabled&&entry.shaEl){
                  entry.shaEl.className='sha-badge hashing';entry.shaEl.textContent='Hashing…';
                  try{hash=await computeFileHash(f);}catch(_){hash=null;}
                  if(hash){
                    entry.shaEl.className='sha-badge ok';
                    entry.shaEl.textContent='#'+hash.substring(0,8)+'…';
                    entry.shaEl.title='SHA-256: '+hash;
                  } else if(f.size>SHA_MAX_BYTES){
                    entry.shaEl.className='sha-badge waiting';entry.shaEl.textContent='> 500 MB';entry.shaEl.title='File too large for SHA-256';
                  } else {
                    entry.shaEl.className='sha-badge err';entry.shaEl.textContent='Hash err';
                  }
                } else if(entry.shaEl){
                  entry.shaEl.className='sha-badge waiting';entry.shaEl.textContent='—';
                }

                if(!conn||!conn.open){sending=false;markCurrentPaused();updateSendBtn();return;}

                var metaMsg={type:'meta',name:f.name,size:f.size,idx:sendIdx,
                  total:sendTotal,resumeOffset:sendOffset,
                  hash:hash,sha:shaEnabled&&hash!==null};
                try{conn.send(metaMsg);}catch(e){
                  sending=false;markCurrentPaused();updateSendBtn();
                  setStatus('status-sender','Send error: '+(e.message||e),'err');return;
                }

                var progWrap=document.getElementById('send-progress');
                var progBar=document.getElementById('send-bar');
                var progPct=document.getElementById('send-pct');
                var progLbl=document.getElementById('send-file-label');
                progWrap.style.display='flex';
                progLbl.textContent=truncName(f.name);

                if(f.size===0){
                  entry.el.classList.remove('active');entry.el.classList.add('done');
                  entry.stEl.textContent='✓';entry.stEl.className='fq-st done';
                  entry.barEl.style.transform='scaleX(1)';
                  sendIdx++;sendOffset=0;
                  // Keep sending=true — let sendNext() decide when to clear it
                  setTimeout(sendNext,50);return;
                }

                var bytesSent=sendOffset;
                var reader=new FileReader();
                var offset=sendOffset;
                var connAtSendStart=conn; // capture for stale-check

                function readChunk(){
                  // Bail if connection was replaced since this send started
                  if(conn!==connAtSendStart||!conn||!conn.open){
                    sending=false;markCurrentPaused();updateSendBtn();
                    setStatus('status-sender','Connection lost','err');return;
                  }
                  if(offset>=f.size){
                    resetBackPressure();
                    entry.el.classList.remove('active');entry.el.classList.add('done');
                    entry.stEl.textContent='Sent';entry.stEl.className='fq-st done';
                    entry.barEl.style.transform='scaleX(1)';
                    progBar.style.transform='scaleX(1)';progPct.textContent='100%';
                    sendIdx++;sendOffset=0;
                    // Do NOT clear sending here — sendNext() owns the flag lifecycle.
                    // Clearing it here opens a 50ms window where startSendQueue() could
                    // be called again and reset sendIdx=0, restarting the whole queue.
                    setTimeout(sendNext,50);return;
                  }
                  var slice=f.slice(offset,offset+CHUNK);
                  reader.readAsArrayBuffer(slice);
                }

                reader.onload=function(e){
                  if(conn!==connAtSendStart||!conn||!conn.open){
                    sending=false;markCurrentPaused();updateSendBtn();
                    setStatus('status-sender','Connection lost','err');return;
                  }
                  var buf=e.target.result;
                  try{conn.send(buf);}catch(err){
                    sending=false;markCurrentPaused();updateSendBtn();
                    setStatus('status-sender','Send error: '+(err.message||err),'err');return;
                  }
                  offset+=buf.byteLength;bytesSent+=buf.byteLength;sendOffset=offset;
                  var p=f.size>0?offset/f.size:1;
                  entry.barEl.style.transform='scaleX('+p+')';
                  var totalSent=fileQueue.slice(0,sendIdx).reduce(function(s,e){return s+e.file.size;},0)+bytesSent;
                  var tp=totalBytes>0?totalSent/totalBytes:1;
                  progBar.style.transform='scaleX('+tp+')';
                  progPct.textContent=Math.round(tp*100)+'%';
                  entry.stEl.textContent=Math.round(p*100)+'%';entry.stEl.className='fq-st sending';
                  updateSpeed('send-speed',bytesSent,f.size);
                  if(!entry._scrolled){entry._scrolled=true;scrollToActive('send-queue');}
                  scheduleNextChunk(readChunk);
                };
                reader.onerror=function(){
                  resetBackPressure();
                  sending=false;markCurrentPaused();updateSendBtn();
                  setStatus('status-sender','File read error','err');
                };
                readChunk();
              };
              doSend().catch(function(e){
                sending=false;markCurrentPaused();updateSendBtn();
                setStatus('status-sender','Error: '+(e.message||e),'err');
              });
            }

            /* ════════════ RECEIVER FORM COLLAPSE ════════════ */
            function minimizeRecvForm(code){
              var form=document.querySelector('#screen-receiver .recv-form');
              if(form)form.classList.add('minimized');
              var mc=document.getElementById('recv-mini-code');
              if(mc)mc.textContent=code||'';
              var mf=document.getElementById('recv-mini-folder');
              if(mf)mf.textContent=dirHandle?'📂 '+dirHandle.name:'';
            }
            function expandRecvForm(){
              var form=document.querySelector('#screen-receiver .recv-form');
              if(form)form.classList.remove('minimized');
              // Disable connect button if a live connection already exists
              var bc=document.getElementById('btn-connect');
              if(bc)bc.disabled=!!(conn&&conn.open);
            }

            /* ════════════ RECEIVER INIT ════════════ */
            function initReceiver(){
              showScreen('screen-receiver');
              setStatus('status-receiver','Enter the code and connect','');
              document.getElementById('sb-mode').textContent='RECEIVE mode';

              if(window._receiverOfflineListener){
                window.removeEventListener('offline',window._receiverOfflineListener);
                window.removeEventListener('online',window._receiverOnlineListener);
              }
              window._receiverOfflineListener=function(){
                setStatus('status-receiver','Network offline — transfer paused','err');
              };
              window._receiverOnlineListener=function(){
                setStatus('status-receiver','Network back — reconnecting…','info');
                connectToPeer(true);
              };
              window.addEventListener('offline',window._receiverOfflineListener);
              window.addEventListener('online',window._receiverOnlineListener);
            }

            var dirHandle=null;

            function onDirPathClick(){
              if(dirHandle)pickDirectory();
            }

            async function pickDirectory(){
              if(!window.showDirectoryPicker){
                // iOS Safari doesn't support File System Access API at all
                var isIOS=/iP(hone|od|ad)/.test(navigator.userAgent)||
                  (navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
                if(isIOS){
                  setStatus('status-receiver','iOS does not support folder selection — files will be downloaded individually to your Downloads','info');
                } else {
                  setStatus('status-receiver','Folder selection not supported in this browser — try Edge or Chrome on desktop/Android','info');
                }
                return;
              }
              try{
                dirHandle=await window.showDirectoryPicker({mode:'readwrite'});
                document.getElementById('btn-dir').classList.add('chosen');
                var dp=document.getElementById('dir-path');
                dp.textContent='📂 '+dirHandle.name;
                dp.title='Click to change folder: '+dirHandle.name;
                dp.classList.add('has-dir');
                var clrBtn=document.getElementById('btn-dir-clear');
                if(clrBtn)clrBtn.style.display='';
              }catch(e){
                if(e.name!=='AbortError'){
                  setStatus('status-receiver','Could not access folder: '+(e.message||e),'err');
                }
              }
            }

            function clearDirectory(){
              dirHandle=null;
              document.getElementById('btn-dir').classList.remove('chosen');
              var dp=document.getElementById('dir-path');
              dp.textContent='Auto-download (no folder selected)';
              dp.title='';
              dp.classList.remove('has-dir');
              var clrBtn=document.getElementById('btn-dir-clear');
              if(clrBtn)clrBtn.style.display='none';
            }

            var _connecting=false;
            function connectToPeer(isReconnect){
              if(_connecting)return;
              _connecting=true;
              if(reconnectTimer){clearTimeout(reconnectTimer);reconnectTimer=null;}
              // Manual connect resets the retry counter
              if(!isReconnect)reconnectAttempts=0;
              var codeEl=document.getElementById('peer-code');
              var code=codeEl.value.trim().toUpperCase();
              if(!/^[A-HJ-NP-Z2-9]{6}$/.test(code)){setStatus('status-receiver','Invalid code — use letters and digits only (A-Z, 2-9)','err');_connecting=false;return;}
              document.getElementById('btn-connect').disabled=true;
              setStatus('status-receiver','Connecting to '+code+'…','');
              setConnState('waiting','Connecting…');

              var _connectCancelled=false;
              var initTimer=setTimeout(function(){
                _connectCancelled=true;
                setStatus('status-receiver','Connection timed out. Check the code and your network.','err');
                document.getElementById('btn-connect').disabled=false;
                _connecting=false;
                if(peer)peer.off('open',doConnect);
              },PEER_TIMEOUT);

              if(!peer||peer.destroyed){
                peer=new Peer({debug:0,serialization:'binary'});
              }

              function doConnect(){
                if(_connectCancelled)return;
                clearTimeout(initTimer);
                if(conn){try{conn.close();}catch(_){} conn=null;}
                // Only reset receiver UI on a fresh (non-resume) connect
                var isFreshConnect=(resumeState.idx===-1&&resumeState.recvd===0);
                var rqFresh=document.getElementById('recv-queue');
                if(isFreshConnect&&rqFresh&&rqFresh.children.length>0){
                  rqFresh.innerHTML='';rqFresh.style.display='none';
                  document.getElementById('recv-table-header').style.display='none';
                  window._rItems={};
                  document.getElementById('recv-dropzone').classList.remove('hidden');
                  document.getElementById('recv-done-msg').style.display='none';
                  document.getElementById('recv-progress').style.display='none';
                  document.getElementById('btn-clear-recv').style.display='none';
                }
                // Fresh connect to a (possibly different) server — reset downloaded tracking
                if(isFreshConnect){_rflDownloaded=new Set();}
                conn=peer.connect(code,{reliable:true,serialization:'binary'});
                _connecting=false;
                attachReceiverConn();
              }
              if(peer.open){doConnect();}
              else{
                var _onPeerError=function(e){
                  clearTimeout(initTimer);
                  _connectCancelled=true;
                  setStatus('status-receiver','Could not connect: '+(e.type||e),'err');
                  document.getElementById('btn-connect').disabled=false;
                  _connecting=false;
                  try{peer.destroy();}catch(_){}
                  peer=null;
                };
                peer.once('open',function(){
                  // Remove the error listener so it cannot fire after a successful connection
                  peer.off('error',_onPeerError);
                  doConnect();
                });
                peer.once('error',_onPeerError);
              }
            }

            function attachReceiverConn(){
              var writable=null;
              // Always start from the current window._rItems so clearReceived() takes effect
              window._rItems=window._rItems||{};
              var rItems=window._rItems;
              var recvMeta=null;
              var msgQueue=[];
              var processing=false;

              var _helloTimeoutTimer=null;

              conn.on('open',function(){
                reconnectAttempts=0;clearTimeout(reconnectTimer);
                setStatus('status-receiver','Connected, waiting for files…','ok');
                setConnState('ok','Connected');
                startPing();
                document.getElementById('btn-connect').disabled=false;
                // Collapse the form on mobile to free vertical space for the file list
                var codeVal=document.getElementById('peer-code').value.trim().toUpperCase();
                minimizeRecvForm(codeVal);
                var helloMsg={type:'hello',idx:resumeState.idx,offset:resumeState.recvd};
                try{conn.send(helloMsg);}catch(_){}
                // If sender sends nothing within 10s, warn the user
                _helloTimeoutTimer=setTimeout(function(){
                  if(conn&&conn.open&&!recvMeta){
                    setStatus('status-receiver','Connected but sender sent nothing...','info');
                  }
                },10000);
              });

              conn.on('close',function(){
                stopPing();
                if(_helloTimeoutTimer){clearTimeout(_helloTimeoutTimer);_helloTimeoutTimer=null;}
                if(writable){try{writable.close();}catch(_){}writable=null;}
                setConnState('waiting','Disconnected');
                setStatus('status-receiver','Connection closed','err');
                expandRecvForm();
                conn=null;
                if(reconnectAttempts<MAX_RECONNECT){
                  reconnectAttempts++;
                  var delay=Math.min(1000*Math.pow(1.5,reconnectAttempts),15000);
                  setStatus('status-receiver','Reconnecting in '+(delay/1000).toFixed(0)+'s… (attempt '+reconnectAttempts+')','');
                  reconnectTimer=setTimeout(function(){_connecting=false;connectToPeer(true);},delay);
                } else {
                  // All reconnect attempts exhausted — auto-reset UI after 5s
                  setStatus('status-receiver','Sender unreachable — resetting in 5s…','err');
                  setTimeout(function(){
                    reconnectAttempts=0;
                    resumeState={idx:-1,recvd:0,chunks:[]};
                    window._rItems={};
                    var rq=document.getElementById('recv-queue');
                    if(rq){rq.innerHTML='';rq.style.display='none';}
                    document.getElementById('recv-table-header').style.display='none';
                    document.getElementById('recv-progress').style.display='none';
                    document.getElementById('recv-done-msg').style.display='none';
                    document.getElementById('btn-clear-recv').style.display='none';
                    document.getElementById('recv-filelist').style.display='none';
                    document.getElementById('recv-dropzone').classList.remove('hidden');
                    var bc=document.getElementById('btn-connect');if(bc)bc.disabled=false;
                    _rflFiles=[];_rflConn=null;
                    setConnState('waiting','Disconnected');
                    expandRecvForm();
                    setStatus('status-receiver','Sender disconnected — enter a new code to reconnect','err');
                  },5000);
                }
              });

              async function processMsg(msg){
                if(!msg)return;
                // Capture local conn reference — outer `conn` may be null after disconnect
                var localConn=conn;
                if(typeof msg==='object'&&!(msg instanceof ArrayBuffer)&&msg.type){
                  if(msg.type==='ping'){try{if(localConn&&localConn.open)localConn.send({type:'pong',t:msg.t});}catch(_){}return;}
                  if(msg.type==='pong'&&pingWait){
                    var rtt=Math.round(performance.now()-pingT0);pingWait=false;
                    if(pingTimeoutTimer){clearTimeout(pingTimeoutTimer);pingTimeoutTimer=null;}
                    setConnState('ok','Connected','· '+rtt+' ms');
                    return;
                  }
                  // SERVER MODE: receive file list with checkboxes
                  if(msg.type==='filelist'){
                    if(_helloTimeoutTimer){clearTimeout(_helloTimeoutTimer);_helloTimeoutTimer=null;}
                    // Ignore filelist updates while a download is actively in progress
                    // (server broadcasting after adding a file must not disrupt ongoing transfers)
                    var rqActive=document.getElementById('recv-queue');
                    if(recvMeta!==null||(rqActive&&rqActive.style.display!=='none'&&rqActive.children.length>0)){
                      // Validate before storing silently
                      var rawSilent=Array.isArray(msg.files)?msg.files:[];
                      _rflFiles=rawSilent.filter(function(f,i){
                        return f&&typeof f.name==='string'&&f.name.length>0&&f.name.length<=500
                          &&typeof f.size==='number'&&isFinite(f.size)&&f.size>=0&&f.size<=107374182400
                          &&typeof f.idx==='number'&&Number.isInteger(f.idx)&&f.idx===i;
                      });
                      _rflConn=conn;
                      return;
                    }
                    _rflConn=conn;
                    var rawFiles=Array.isArray(msg.files)?msg.files:[];
                    // Validate each entry — reject malformed items
                    var validFiles=rawFiles.filter(function(f,i){
                      return f&&typeof f.name==='string'&&f.name.length>0&&f.name.length<=500
                        &&typeof f.size==='number'&&isFinite(f.size)&&f.size>=0&&f.size<=107374182400
                        &&typeof f.idx==='number'&&Number.isInteger(f.idx)&&f.idx===i;
                    });
                    showRecvFilelist(validFiles,conn).catch(function(e){console.error('showRecvFilelist error',e);});
                    return;
                  }
                  if(msg.type==='meta'){
                    if(_helloTimeoutTimer){clearTimeout(_helloTimeoutTimer);_helloTimeoutTimer=null;}
                    if(!validateMeta(msg)){console.warn('Invalid meta',msg);return;}
                    var MEM_WARN_BYTES=200*1024*1024;
                    if(msg.size>MEM_WARN_BYTES&&!dirHandle){setStatus('status-receiver','⚠ Large file ('+fmtB(msg.size)+')','info');}
                    var resumeOffset=msg.resumeOffset||0;
                    var key=msg.idx+'_'+msg.name;
                    // resumeOffset must be >0 to actually resume; 0 means sender restarts from scratch
                    var isResume=(msg.idx===resumeState.idx&&resumeState.recvd>0&&resumeOffset>0);
                    var startRecvd=isResume?Math.min(resumeState.recvd,resumeOffset):0;
                    if(!isResume){resumeState={idx:msg.idx,recvd:0,chunks:[]};}
                    else{resumeState.idx=msg.idx;}
                    recvMeta=msg;
                    rItems[key]?rItems[key].recvd=startRecvd:null;

                    var rq=document.getElementById('recv-queue');
                    var rb=document.getElementById('recv-bar');
                    var rpct=document.getElementById('recv-pct');
                    rq.style.display='flex';
                    document.getElementById('recv-table-header').style.display='grid';
                    document.getElementById('recv-dropzone').classList.add('hidden');
                    document.getElementById('recv-progress').style.display='flex';
                    var resumeP=msg.size>0?startRecvd/msg.size:0;
                    rb.style.transform='scaleX('+resumeP+')';rpct.textContent=Math.round(resumeP*100)+'%';
                    document.getElementById('recv-file-label').textContent=truncName(msg.name);
                    resetSpeed('recv-speed');

                    if(!rItems[key]){
                      var parts=makeFqItem({name:msg.name,size:msg.size});
                      parts.el.classList.add('active');
                      parts.stEl.textContent='…';parts.stEl.className='fq-st sending';
                      rq.appendChild(parts.el);
                      if(parts.shaEl){
                        if(msg.hash){
                          parts.shaEl.className='sha-badge waiting';
                          parts.shaEl.textContent='# '+msg.hash.substring(0,8)+'…';
                          parts.shaEl.title='Expected SHA-256: '+msg.hash+'\n(verifying after reception)';
                        } else {
                          parts.shaEl.className='sha-badge waiting';
                          parts.shaEl.textContent='No hash';
                          parts.shaEl.title='Sender did not provide a hash';
                        }
                      }
                      rItems[key]={el:parts.el,barEl:parts.barEl,stEl:parts.stEl,shaEl:parts.shaEl,recvd:startRecvd,expectedHash:msg.hash||null,resumedFrom:startRecvd,senderSha:msg.sha===true};
                      setTimeout(function(){scrollToActive('recv-queue');},50);
                    } else {
                      rItems[key].el.classList.remove('paused');rItems[key].el.classList.add('active');
                      rItems[key].stEl.textContent='…';rItems[key].stEl.className='fq-st sending';
                      scrollToActive('recv-queue');
                    }
                    rItems[key].barEl.style.transform='scaleX('+resumeP+')';

                    if(msg.size===0){
                      var _connEmpty=conn; // capture now — no await below but defensive
                      var it0=rItems[key];
                      if(it0){it0.el.classList.remove('active');it0.el.classList.add('done');it0.stEl.textContent='✓';it0.stEl.className='fq-st done';}
                      setStatus('status-receiver','✓ '+truncName(msg.name)+' (empty)','ok');
                      playSuccessSound();
                      _rflDownloaded.add(msg.name);
                      try{if(_connEmpty)_connEmpty.send({type:'ack',idx:msg.idx,name:msg.name});}catch(_){}
                      if(msg.idx+1>=msg.total){
                        try{if(_connEmpty)_connEmpty.send({type:'ack_all'});}catch(_){}
                        document.getElementById('recv-progress').style.display='none';
                        setStatus('status-receiver','✓✓ All files received!','ok');
                        document.getElementById('btn-clear-recv').style.display='inline-block';
                        var dm0=document.getElementById('recv-done-msg');
                        document.getElementById('recv-done-detail').textContent=msg.total+' file'+(msg.total>1?'s':'')+' downloaded successfully';
                        dm0.style.display='flex';
                      }
                      return;
                    }

                    if(dirHandle){
                      if(writable){try{await writable.close();}catch(_){}writable=null;}
                      try{
                        var safeName=sanitizeFilename(msg.name);
                        var fh=await dirHandle.getFileHandle(safeName,{create:true});
                        if(isResume&&startRecvd>0){
                          try{
                            writable=await fh.createWritable({keepExistingData:true});
                            if(typeof writable.seek==='function'){
                              await writable.seek(startRecvd);
                            } else {
                              await writable.close();
                              writable=await fh.createWritable();
                              startRecvd=0;resumeState.recvd=0;rItems[key].recvd=0;
                            }
                          }catch(_){writable=await fh.createWritable();startRecvd=0;resumeState.recvd=0;rItems[key].recvd=0;}
                        } else {
                          writable=await fh.createWritable();
                        }
                      }catch(e){
                        setStatus('status-receiver','Cannot write to folder: '+(e.message||e),'err');
                        dirHandle=null;
                        document.getElementById('btn-dir').classList.remove('chosen');
                        var dpErr=document.getElementById('dir-path');
                        dpErr.textContent='Auto-download (no folder selected)';
                        dpErr.classList.remove('has-dir');
                      }
                    }
                    return;
                  }
                  return;
                }

                // Binary chunk
                if(!(msg instanceof ArrayBuffer)&&!(msg instanceof Uint8Array)){return;}
                if(!recvMeta){return;}
                var key2=recvMeta.idx+'_'+recvMeta.name;
                var itemRef=rItems[key2];
                if(!itemRef){return;}
                // Always extract an exact ArrayBuffer — Uint8Array.buffer may be a larger shared backing store
                var chunk;
                if(msg instanceof ArrayBuffer){
                  chunk=msg;
                } else {
                  chunk=(msg.byteOffset===0&&msg.byteLength===msg.buffer.byteLength)
                    ? msg.buffer
                    : msg.buffer.slice(msg.byteOffset, msg.byteOffset+msg.byteLength);
                }
                // Security: reject absurdly large single chunks and ignore bytes past meta.size
                if(chunk.byteLength > CHUNK * 4){console.warn('Chunk too large, dropping:',chunk.byteLength);return;}
                var remaining=recvMeta.size - itemRef.recvd;
                if(remaining<=0){return;}
                if(chunk.byteLength > remaining){chunk=chunk.slice(0,remaining);}
                itemRef.recvd+=chunk.byteLength;
                resumeState.recvd=itemRef.recvd;

                var p=recvMeta.size>0?itemRef.recvd/recvMeta.size:1;
                itemRef.barEl.style.transform='scaleX('+p+')';
                itemRef.stEl.textContent=Math.round(p*100)+'%';
                itemRef.stEl.className='fq-st sending';
                var rb2=document.getElementById('recv-bar');
                var rpct2=document.getElementById('recv-pct');
                if(rb2)rb2.style.transform='scaleX('+p+')';
                if(rpct2)rpct2.textContent=Math.round(p*100)+'%';
                updateSpeed('recv-speed',itemRef.recvd,recvMeta.size);
                if(!itemRef._scrolled){itemRef._scrolled=true;scrollToActive('recv-queue');}

                if(dirHandle&&writable){
                  try{await writable.write(chunk);}
                  catch(e){
                    setStatus('status-receiver','Write error: '+(e.message||e),'err');
                    // Abort — close writable, clear state so next meta starts fresh
                    try{writable.close();}catch(_){}writable=null;
                    resumeState={idx:-1,recvd:0,chunks:[]};
                    recvMeta=null;
                    return;
                  }
                } else {
                  resumeState.chunks.push(chunk);
                }

                if(itemRef.recvd>=recvMeta.size){
                  // Snapshot ALL closure-captured mutable state before any async yield
                  var _meta=recvMeta, _item=itemRef, _chunks=resumeState.chunks.slice();
                  var _writable=writable; writable=null; // hand off ownership
                  var _conn=conn; // capture conn now — it may change after async yields
                  var _finalize=async function(){
                    // Yield to let the event loop breathe before heavy operations
                    await new Promise(function(r){setTimeout(r,0);});

                    var hashOk=null;
                    if(_item.expectedHash){
                      if(_item.shaEl){_item.shaEl.className='sha-badge hashing';_item.shaEl.textContent='Verifying…';}
                      try{
                        var computedHash;
                        if(dirHandle&&_writable){
                          await _writable.close();_writable=null;
                          var fhr=await dirHandle.getFileHandle(sanitizeFilename(_meta.name));
                          var fr=await fhr.getFile();
                          computedHash=await computeBlobHash(fr);
                        } else {
                          computedHash=await computeChunksHash(_chunks);
                        }
                        hashOk=(computedHash!==null&&computedHash===_item.expectedHash);
                        if(_item.shaEl){
                          if(computedHash===null){
                            _item.shaEl.className='sha-badge waiting';
                            _item.shaEl.textContent='> 500 MB';
                            _item.shaEl.title='File too large for SHA-256 verification';
                          } else {
                            _item.shaEl.className='sha-badge '+(hashOk?'ok':'err');
                            _item.shaEl.textContent=hashOk?'✓ OK':'✗ FAIL';
                            _item.shaEl.title=(hashOk?'Hash match: ':'Mismatch! Expected: ')+_item.expectedHash+(hashOk?'':'\nGot: '+computedHash);
                          }
                        }
                      }catch(e){hashOk=null;if(_item.shaEl){_item.shaEl.className='sha-badge err';_item.shaEl.textContent='Hash err';}}
                    }

                    if(dirHandle&&_writable){try{await _writable.close();}catch(_){}}

                    // Reset resumeState early so the next file can start accumulating chunks
                    // while the Blob is being constructed below
                    resumeState={idx:-1,recvd:0,chunks:[]};

                    // If hash check explicitly failed — abort: mark file bad, do not save, do not ACK
                    if(hashOk===false){
                      _item.el.classList.remove('active');_item.el.classList.add('paused');
                      _item.stEl.textContent='✗ Bad';_item.stEl.className='fq-st paused';
                      setStatus('status-receiver','⚠ '+truncName(_meta.name)+' — hash mismatch, file rejected!','err');
                      // Attempt to delete the corrupt file from disk if dirHandle exists
                      if(dirHandle){
                        try{await dirHandle.removeEntry(sanitizeFilename(_meta.name));}catch(_){}
                      }
                      if(recvMeta===_meta)recvMeta=null;
                      return;
                    }

                    if(!dirHandle){
                      // Yield again before Blob construction — can freeze thread for large files
                      await new Promise(function(r){setTimeout(r,0);});
                      saveBlob(_meta,_chunks,_item);
                    } else {
                      _item.el.classList.remove('active');_item.el.classList.add('done');
                      _item.stEl.textContent='Saved';_item.stEl.className='fq-st done';
                      setStatus('status-receiver','✓ '+truncName(_meta.name)+' saved!','ok');
                      playSuccessSound();
                    }

                    // Track downloaded file name for re-display after Clear Received
                    _rflDownloaded.add(_meta.name);

                    try{if(_conn)_conn.send({type:'ack',idx:_meta.idx,name:_meta.name});}catch(_){}

                    if(_meta&&_meta.idx+1>=_meta.total){
                      try{if(_conn)_conn.send({type:'ack_all'});}catch(_){}
                      document.getElementById('recv-progress').style.display='none';
                      setStatus('status-receiver','✓✓ All files received!','ok');
                      document.getElementById('btn-clear-recv').style.display='inline-block';
                      var doneMsg=document.getElementById('recv-done-msg');
                      var total2=_meta.total;
                      document.getElementById('recv-done-detail').textContent=total2+' file'+(total2>1?'s':'')+' downloaded successfully';
                      doneMsg.style.display='flex';
                    }
                    // Clear recvMeta so stray chunks after last byte are ignored cleanly
                    if(recvMeta===_meta)recvMeta=null;
                  };
                  await _finalize();
                }
              }

              async function drainQueue(){
                processing=true;
                while(msgQueue.length>0){
                  var m=msgQueue.shift();
                  try{await processMsg(m);}catch(e){console.error('processMsg error',e);}
                }
                processing=false;
              }

              conn.on('data',function(msg){
                msgQueue.push(msg);
                if(!processing)drainQueue();
              });
              conn.on('error',function(e){
                setStatus('status-receiver','Connection error: '+(e.type||e),'err');
                stopPing();setConnState('err','Error');
                if(_helloTimeoutTimer){clearTimeout(_helloTimeoutTimer);_helloTimeoutTimer=null;}
                if(writable){try{writable.close();}catch(_){}writable=null;}
                document.getElementById('btn-connect').disabled=false;
                conn=null;
                if(reconnectAttempts<MAX_RECONNECT){
                  reconnectAttempts++;
                  var delay=Math.min(1000*Math.pow(1.5,reconnectAttempts),15000);
                  setStatus('status-receiver','Reconnecting in '+(delay/1000).toFixed(0)+'s… (attempt '+reconnectAttempts+')','');
                  reconnectTimer=setTimeout(function(){_connecting=false;connectToPeer(true);},delay);
                } else {
                  // Same auto-reset as conn.on('close') after exhausted retries
                  setStatus('status-receiver','Sender unreachable — resetting in 5s…','err');
                  setTimeout(function(){
                    reconnectAttempts=0;
                    resumeState={idx:-1,recvd:0,chunks:[]};
                    window._rItems={};
                    var rq=document.getElementById('recv-queue');
                    if(rq){rq.innerHTML='';rq.style.display='none';}
                    document.getElementById('recv-table-header').style.display='none';
                    document.getElementById('recv-progress').style.display='none';
                    document.getElementById('recv-done-msg').style.display='none';
                    document.getElementById('btn-clear-recv').style.display='none';
                    document.getElementById('recv-filelist').style.display='none';
                    document.getElementById('recv-dropzone').classList.remove('hidden');
                    var bc=document.getElementById('btn-connect');if(bc)bc.disabled=false;
                    _rflFiles=[];_rflConn=null;
                    setConnState('waiting','Disconnected');
                    expandRecvForm();
                    setStatus('status-receiver','Sender disconnected — enter a new code to reconnect','err');
                  },5000);
                }
              });
            }

            /* ════════════════════════════════════════════════════════
               SERVER MODE
            ════════════════════════════════════════════════════════ */
            var serverConns=[];      // active connections
            var serverFileQueue=[];  // {file, el, barEl, stEl} — files the server hosts
            var _srvRecvCounter=0;   // sequential receiver number for display

            var MAX_SERVER_CONNS=20; // DoS protection

            function initServer(){
              showScreen('screen-server');
              myCode=genCode();
              setConnState('waiting','Waiting for receivers…');
              document.getElementById('sb-mode').textContent='SERVER mode';
              setStatus('status-server','Initializing…','');

              var srvDz=document.getElementById('srv-dropzone');
              srvDz.addEventListener('dragover',function(e){e.preventDefault();srvDz.classList.add('drag-over');});
              srvDz.addEventListener('dragleave',function(e){if(!srvDz.contains(e.relatedTarget))srvDz.classList.remove('drag-over');});
              srvDz.addEventListener('drop',function(e){e.preventDefault();srvDz.classList.remove('drag-over');addSrvFiles(e.dataTransfer.files);});

              var initTimer=setTimeout(function(){
                setStatus('status-server','Connection to relay server timed out. Check your network.','err');
              },PEER_TIMEOUT);

              peer=new Peer(myCode,{debug:0,serialization:'binary'});
              peer.on('open',function(id){
                clearTimeout(initTimer);
                document.getElementById('srv-code').textContent=id;
                setStatus('status-server','Server ready — share the code with receivers','ok');
              });
              peer.on('connection',function(c){
                if(serverConns.filter(function(x){return x.open;}).length>=MAX_SERVER_CONNS){
                  try{c.close();}catch(_){}
                  console.warn('Max connections reached — rejected incoming connection');
                  return;
                }
                serverConns.push(c);
                updateSrvClientsUI();
                attachServerConn(c);
              });
              peer.on('error',function(e){
                clearTimeout(initTimer);
                setStatus('status-server','PeerJS error: '+(e.type||e),'err');
                roleChosen=false;
                showScreen('screen-role');
                var bar=document.getElementById('conn-bar');if(bar)bar.style.display='none';
                document.getElementById('btn-sender').disabled=false;
                document.getElementById('btn-receiver').disabled=false;
                document.getElementById('btn-server').disabled=false;
                document.getElementById('btn-sender').classList.remove('selected');
                document.getElementById('btn-server').classList.remove('selected');
                try{peer.destroy();}catch(_){}
                peer=null;
              });
            }

            /* ── Create receiver UI row ── */
            function createReceiverRow(num){
              var panel=document.getElementById('srv-receivers-panel');
              panel.classList.add('visible');
              var list=document.getElementById('srv-recv-list');

              var item=document.createElement('div');
              item.className='srv-recv-item';

              var idEl=document.createElement('span');
              idEl.className='srv-recv-id';
              idEl.textContent='RCV '+num;

              var progWrap=document.createElement('div');
              progWrap.className='srv-recv-prog-wrap';
              var fnEl=document.createElement('span');
              fnEl.className='srv-recv-filename';
              fnEl.textContent='Waiting for request…';
              var track=document.createElement('div');
              track.className='srv-recv-track';
              var bar=document.createElement('div');
              bar.className='srv-recv-bar';
              track.appendChild(bar);
              progWrap.appendChild(fnEl);
              progWrap.appendChild(track);

              var pctEl=document.createElement('span');
              pctEl.className='srv-recv-pct';
              pctEl.textContent='—';

              var speedEl=document.createElement('span');
              speedEl.className='srv-recv-speed';
              speedEl.textContent='';

              var ackEl=document.createElement('span');
              ackEl.className='srv-ack-badge waiting';
              ackEl.textContent='⌛ Waiting';

              item.appendChild(idEl);
              item.appendChild(progWrap);
              item.appendChild(pctEl);
              item.appendChild(speedEl);
              item.appendChild(ackEl);
              list.appendChild(item);

              return {el:item, fnEl:fnEl, bar:bar, pctEl:pctEl, speedEl:speedEl, ackEl:ackEl};
            }

            function attachServerConn(c){
              c._srvSending=false;
              c._srvQueue=[];
              c._srvIdx=0;
              c._sendGen=0;
              _srvRecvCounter++;
              c._recvNum=_srvRecvCounter;
              c._ackCount=0;
              c._totalRequested=0;
              // speed tracking per receiver
              c._speedT0=0; c._speedBytes0=0;

              c.on('open',function(){
                // Create the receiver row in the UI
                c._ui=createReceiverRow(c._recvNum);
                updateSrvClientsUI();
                setStatus('status-server','Receiver #'+c._recvNum+' connected — sending file list…','ok');
                sendFilelistTo(c);
              });

              c.on('data',function(msg){
                if(!msg||typeof msg.type!=='string')return;
                if(msg.type==='ping'){try{c.send({type:'pong',t:msg.t});}catch(_){}return;}
                if(msg.type==='pong')return;
                if(msg.type==='request'){
                  var indices=Array.isArray(msg.indices)?msg.indices:[];
                  if(indices.length===0)return;
                  // Security: validate bounds, deduplicate, cap at 500 files
                  var seen=new Set();
                  var safeIndices=indices.filter(function(i){
                    if(typeof i!=='number'||!Number.isInteger(i)||i<0||i>=serverFileQueue.length)return false;
                    if(seen.has(i))return false;
                    seen.add(i);return true;
                  }).slice(0,500);
                  if(safeIndices.length===0)return;
                  c._srvQueue=safeIndices.map(function(i){return serverFileQueue[i]||null;}).filter(Boolean);
                  c._totalRequested=c._srvQueue.length;
                  c._ackCount=0;
                  c._srvIdx=0; // MUST reset — otherwise srvSendNext thinks the queue is already exhausted
                  // Increment generation to cancel any in-flight transfer from a previous request
                  c._sendGen=(c._sendGen||0)+1;
                  var currentGen=c._sendGen;
                  if(c._ackTimeoutTimer){clearTimeout(c._ackTimeoutTimer);c._ackTimeoutTimer=null;}
                  // Update ACK badge to "sending"
                  if(c._ui){
                    c._ui.ackEl.className='srv-ack-badge sending';
                    c._ui.ackEl.textContent='▶ Sending';
                  }
                  if(c._srvQueue.length>0&&!c._srvSending){
                    c._srvSending=true;
                    srvSendNext(c,currentGen);
                  } else if(c._srvSending){
                    // Old in-flight transfer will detect the gen change and abort itself.
                    // Give it a tick to bail, then start the new gen.
                    c._srvSending=false;
                    setTimeout(function(){
                      if(!c._srvSending&&c._srvQueue.length>0){
                        c._srvSending=true;
                        srvSendNext(c,c._sendGen);
                      }
                    },50);
                  }
                  return;
                }
                // ACK from receiver — file confirmed received ✓
                if(msg.type==='ack'){
                  c._ackCount++;
                  if(c._ackTimeoutTimer){clearTimeout(c._ackTimeoutTimer);c._ackTimeoutTimer=null;}
                  if(c._ui){
                    var allDone=(c._totalRequested>0&&c._ackCount>=c._totalRequested);
                    if(allDone){
                      c._ui.ackEl.className='srv-ack-badge all-ok';
                      c._ui.ackEl.textContent='✓✓ ALL OK';
                    } else {
                      c._ui.ackEl.className='srv-ack-badge partial';
                      c._ui.ackEl.textContent='✓ '+c._ackCount+'/'+c._totalRequested;
                      // Restart timeout — still waiting for more acks
                      c._ackTimeoutTimer=setTimeout(function(){
                        if(c._ui&&c._ackCount<c._totalRequested){
                          c._ui.ackEl.className='srv-ack-badge waiting';
                          c._ui.ackEl.textContent='⚠ ACK timeout';
                          c._ui.ackEl.title='Receiver confirmed '+c._ackCount+'/'+c._totalRequested+' files — connection may have dropped';
                        }
                      },60000);
                    }
                  }
                  setStatus('status-server','Receiver #'+c._recvNum+' confirmed file '+(c._ackCount)+'/'+c._totalRequested,'ok');
                  return;
                }
                if(msg.type==='ack_all'){
                  if(c._ackTimeoutTimer){clearTimeout(c._ackTimeoutTimer);c._ackTimeoutTimer=null;}
                  if(c._ui){
                    c._ui.ackEl.className='srv-ack-badge all-ok';
                    c._ui.ackEl.textContent='✓✓ ALL OK';
                    c._ui.pctEl.className='srv-recv-pct done';
                    c._ui.bar.className='srv-recv-bar done';
                    c._ui.speedEl.textContent='';
                    c._ui.ackEl.title='';
                  }
                  setStatus('status-server','✓ Receiver #'+c._recvNum+' download complete!','ok');
                  return;
                }
              });

              c.on('close',function(){
                serverConns=serverConns.filter(function(x){return x!==c;});
                if(c._ackTimeoutTimer){clearTimeout(c._ackTimeoutTimer);c._ackTimeoutTimer=null;}
                updateSrvClientsUI();
                setStatus('status-server','Receiver #'+c._recvNum+' disconnected — removing in 10s…','info');
                if(c._ui){
                  c._ui.el.classList.add('disconnected');
                  c._ui.speedEl.textContent='disconnected';
                  // Countdown display + auto-remove after 10s
                  var countdown=10;
                  c._ui.ackEl.className='srv-ack-badge waiting';
                  c._ui.ackEl.textContent='🗑 '+countdown+'s';
                  var tick=setInterval(function(){
                    countdown--;
                    if(!c._ui||!c._ui.el.parentNode){clearInterval(tick);return;}
                    if(countdown<=0){
                      clearInterval(tick);
                      var list=document.getElementById('srv-recv-list');
                      if(list&&c._ui.el.parentNode===list)list.removeChild(c._ui.el);
                      // Hide panel if no rows left
                      if(list&&list.children.length===0){
                        var panel=document.getElementById('srv-receivers-panel');
                        if(panel)panel.classList.remove('visible');
                      }
                    } else {
                      c._ui.ackEl.textContent='🗑 '+countdown+'s';
                    }
                  },1000);
                }
              });
              c.on('error',function(){
                serverConns=serverConns.filter(function(x){return x!==c;});
                if(c._ackTimeoutTimer){clearTimeout(c._ackTimeoutTimer);c._ackTimeoutTimer=null;}
                if(c._ui){c._ui.el.classList.add('disconnected');}
                updateSrvClientsUI();
              });
            }

            function sendFilelistTo(c){
              var list=serverFileQueue.map(function(entry,i){
                return {name:entry.file.name,size:entry.file.size,idx:i};
              });
              try{c.send({type:'filelist',files:list});}catch(e){}
            }

            function broadcastFilelist(){
              serverConns.forEach(function(c){if(c.open)sendFilelistTo(c);});
            }

            function updateSrvClientsUI(){
              var active=serverConns.filter(function(c){return c.open;}).length;
              var badge=document.getElementById('srv-clients-badge');
              if(badge){
                badge.textContent=active+' connected';
                badge.className='srv-clients-badge'+(active>0?' active':'');
              }
              var cbr=document.getElementById('conn-bar');
              if(cbr)cbr.style.display='flex';
              if(active>0){
                setConnState('ok',active+' receiver'+(active>1?'s':'')+' connected','');
              } else {
                setConnState('waiting','Waiting for receivers…');
              }
            }

            /* ── Server: send files to a specific connection ── */
            function srvSendNext(c,gen){
              if(gen!==c._sendGen){c._srvSending=false;return;}
              while(c._srvIdx<c._srvQueue.length){
                var entry=c._srvQueue[c._srvIdx];
                if(entry&&entry.el&&(entry.el.classList.contains('done')||entry.el.classList.contains('confirmed'))){
                  c._srvIdx++;continue;
                }
                break;
              }
              if(c._srvIdx>=c._srvQueue.length){
                c._srvSending=false;
                // Start ACK timeout — if receiver doesn't confirm within 2 min, warn
                if(c._ackCount<c._totalRequested){
                  if(c._ackTimeoutTimer)clearTimeout(c._ackTimeoutTimer);
                  c._ackTimeoutTimer=setTimeout(function(){
                    if(c._ui&&c._ackCount<c._totalRequested){
                      c._ui.ackEl.className='srv-ack-badge waiting';
                      c._ui.ackEl.textContent='⚠ ACK timeout';
                      c._ui.ackEl.title='No confirmation after 2 min — receiver may have disconnected';
                    }
                  },120000);
                }
                return;
              }
              var entry=c._srvQueue[c._srvIdx];
              var f=entry.file;
              var totalFiles=c._srvQueue.length;

              // Update receiver UI: new file starting
              if(c._ui){
                c._ui.fnEl.textContent=truncName(f.name)+' ('+(c._srvIdx+1)+'/'+totalFiles+')';
                c._ui.bar.className='srv-recv-bar';
                c._ui.bar.style.transform='scaleX(0)';
                c._ui.pctEl.className='srv-recv-pct';
                c._ui.pctEl.textContent='0%';
                c._ui.ackEl.className='srv-ack-badge sending';
                c._ui.ackEl.textContent='▶ Sending…';
                c._speedT0=0;c._speedBytes0=0;
              }

              var doSend=async function(){
                if(!c||!c.open||gen!==c._sendGen){c._srvSending=false;return;}

                // ── SHA-256 hashing (if enabled) — use cached hash if already computed ──
                var hash=null;
                if(srvShaEnabled){
                  if(entry._cachedHash!==undefined){
                    hash=entry._cachedHash;
                    if(entry.shaEl){
                      if(hash){
                        entry.shaEl.className='sha-badge ok';
                        entry.shaEl.textContent='#'+hash.substring(0,8)+'…';
                        entry.shaEl.title='SHA-256: '+hash;
                      } else {
                        entry.shaEl.className='sha-badge waiting';
                        entry.shaEl.textContent=f.size>SHA_MAX_BYTES?'> 500 MB':'Hash err';
                      }
                    }
                  } else {
                    if(entry.shaEl){entry.shaEl.className='sha-badge hashing';entry.shaEl.textContent='Hashing…';}
                    try{hash=await computeFileHash(f);}catch(_){hash=null;}
                    entry._cachedHash=hash; // always cache — avoids re-hashing for subsequent receivers
                    if(entry.shaEl){
                      if(hash){
                        entry.shaEl.className='sha-badge ok';
                        entry.shaEl.textContent='#'+hash.substring(0,8)+'…';
                        entry.shaEl.title='SHA-256: '+hash;
                      } else if(f.size>SHA_MAX_BYTES){
                        entry.shaEl.className='sha-badge waiting';entry.shaEl.textContent='> 500 MB';
                        entry.shaEl.title='File too large for SHA-256';
                      } else {
                        entry.shaEl.className='sha-badge err';entry.shaEl.textContent='Hash err';
                      }
                    }
                  }
                } else if(entry.shaEl){
                  entry.shaEl.className='sha-badge waiting';entry.shaEl.textContent='—';
                }

                if(!c||!c.open||gen!==c._sendGen){c._srvSending=false;return;}

                var metaMsg={type:'meta',name:f.name,size:f.size,
                  idx:c._srvIdx,total:totalFiles,resumeOffset:0,
                  hash:hash,sha:srvShaEnabled&&hash!==null};
                try{c.send(metaMsg);}catch(e){c._srvSending=false;return;}

                if(f.size===0){
                  c._srvIdx++;setTimeout(function(){srvSendNext(c,gen);},50);return;
                }

                var offset=0;
                var connRef=c;

                function readChunk(){
                  if(!connRef||!connRef.open||gen!==connRef._sendGen){connRef._srvSending=false;return;}
                  if(offset>=f.size){
                    // File fully sent — update receiver UI
                    if(connRef._ui){
                      connRef._ui.bar.style.transform='scaleX(1)';
                      connRef._ui.pctEl.textContent='100%';
                      connRef._ui.ackEl.className='srv-ack-badge waiting';
                      connRef._ui.ackEl.textContent='⌛ ACK…';
                      connRef._ui.speedEl.textContent='';
                    }
                    connRef._srvIdx++;
                    setTimeout(function(){srvSendNext(connRef,gen);},50);
                    return;
                  }
                  var slice=f.slice(offset,offset+CHUNK);
                  var reader=new FileReader();
                  reader.onload=function(ev){
                    if(!connRef||!connRef.open||gen!==connRef._sendGen){connRef._srvSending=false;return;}
                    var buf=ev.target.result;
                    offset+=buf.byteLength;
                    try{connRef.send(buf);}
                    catch(e){connRef._srvSending=false;return;}

                    // Update per-receiver progress bar
                    if(connRef._ui&&f.size>0){
                      var p=offset/f.size;
                      connRef._ui.bar.style.transform='scaleX('+p+')';
                      connRef._ui.pctEl.textContent=Math.round(p*100)+'%';
                      // Speed calculation
                      var now=performance.now();
                      if(connRef._speedT0===0){connRef._speedT0=now;connRef._speedBytes0=offset;}
                      else {
                        var dt=(now-connRef._speedT0)/1000;
                        if(dt>=0.5){
                          var rate=(offset-connRef._speedBytes0)/dt;
                          connRef._speedT0=now;connRef._speedBytes0=offset;
                          connRef._ui.speedEl.textContent=rate>1048576?(rate/1048576).toFixed(1)+' MB/s':(rate/1024).toFixed(0)+' KB/s';
                        }
                      }
                    }

                    scheduleNextChunkSrv(connRef,readChunk);
                  };
                  reader.onerror=function(){
                    connRef._srvSending=false;
                    if(connRef._ui){connRef._ui.ackEl.className='srv-ack-badge waiting';connRef._ui.ackEl.textContent='⚠ Read err';}
                    setStatus('status-server','File read error for receiver #'+connRef._recvNum,'err');
                  };
                  reader.readAsArrayBuffer(slice);
                }
                readChunk();
              };
              doSend().catch(function(e){
                console.error('srvSendNext error:',e);
                c._srvSending=false;
                if(c._ui){c._ui.ackEl.className='srv-ack-badge waiting';c._ui.ackEl.textContent='⚠ Error';}
              });
            }

            function scheduleNextChunkSrv(c,fn){
              var dc=c&&c.dataChannel;
              if(!dc){setTimeout(fn,8);return;}
              if(dc.bufferedAmount>HIGH_WATER){
                dc.bufferedAmountLowThreshold=LOW_WATER;
                dc.onbufferedamountlow=function(){dc.onbufferedamountlow=null;if(c&&c.open)fn();};
              } else {
                setTimeout(fn,8);
              }
            }

            /* ── Server: file management ── */
            function onSrvFilesSelected(files){
              addSrvFiles(files);
              var inp=document.getElementById('srv-file-input');
              if(inp)inp.value='';
            }

            function addSrvFiles(files){
              var q=document.getElementById('srv-queue');
              for(var i=0;i<files.length;i++){
                var f=files[i];
                var isDupe=serverFileQueue.some(function(e){
                  return e.file.name===f.name&&e.file.size===f.size&&e.file.lastModified===f.lastModified;
                });
                if(isDupe)continue;
                var parts=makeSrvItem(f);
                q.appendChild(parts.el);
                serverFileQueue.push({file:f,el:parts.el,barEl:parts.barEl,stEl:parts.stEl,shaEl:parts.shaEl});
              }
              updateSrvQueueCount();
              // Notify already-connected receivers about updated list
              broadcastFilelist();
            }

            function makeSrvItem(f){
              var item=document.createElement('div');item.className='fq-item';
              var stEl=document.createElement('span');stEl.className='fq-st';stEl.textContent='Ready';
              stEl.style.color='var(--cyan)';
              var shaEl=document.createElement('span');shaEl.className='sha-badge waiting';shaEl.textContent='—';
              item.innerHTML='<span class="fq-icon-sm">📄</span>'
                +'<span class="fq-name">'+escHtml(truncName(f.name))+'</span>'
                +'<span class="fq-size">'+fmtB(f.size)+'</span>';
              item.appendChild(stEl);
              item.appendChild(shaEl);
              var rmBtn=document.createElement('button');
              rmBtn.className='fq-remove';rmBtn.textContent='✕';rmBtn.title='Remove';
              rmBtn.onclick=function(){removeSrvItem(item);};
              item.appendChild(rmBtn);
              return {el:item,barEl:null,stEl:stEl,shaEl:shaEl};
            }

            function removeSrvItem(itemEl){
              var idx=serverFileQueue.findIndex(function(e){return e.el===itemEl;});
              if(idx===-1)return;
              serverFileQueue.splice(idx,1);
              var q=document.getElementById('srv-queue');
              if(q&&itemEl.parentNode===q)q.removeChild(itemEl);
              updateSrvQueueCount();
              broadcastFilelist();
            }

            function updateSrvQueueCount(){
              var el=document.getElementById('srv-queue-count');
              if(!el)return;
              var n=serverFileQueue.length;
              if(n===0){el.classList.add('hidden');return;}
              el.classList.remove('hidden');
              el.textContent=n+' file'+(n>1?'s':'');
            }

            function copyCodeSrv(){
              var el=document.getElementById('srv-code');
              var text=el.textContent.replace(/\s/g,'');
              var prev=el.textContent;
              if(!text||!/^[A-HJ-NP-Z2-9]{6}$/.test(text))return;
              if(navigator.clipboard&&navigator.clipboard.writeText){
                navigator.clipboard.writeText(text).then(function(){
                  el.textContent='Copied!';setTimeout(function(){el.textContent=prev;},1200);
                }).catch(function(){fallbackCopySrv(text,el,prev);});
              } else {fallbackCopySrv(text,el,prev);}
            }
            function fallbackCopySrv(text,el,prev){
              var ta=document.createElement('textarea');ta.value=text;
              ta.style.cssText='position:fixed;opacity:0;';document.body.appendChild(ta);ta.select();
              try{document.execCommand('copy');el.textContent='Copied!';}
              catch(e){el.textContent='Copy manually';}
              document.body.removeChild(ta);setTimeout(function(){el.textContent=prev;},1200);
            }

            /* ════════════════════════════════════════════════════════
               RECEIVER — FILELIST (SERVER MODE)
            ════════════════════════════════════════════════════════ */
            var _rflFiles=[];   // [{name,size,idx}] received from server
            var _rflConn=null;  // reference to the active connection
            var _rflDownloaded=new Set(); // names of files already downloaded this session
            var _rflGeneration=0; // incremented each time showRecvFilelist starts — stale runs abort

            async function showRecvFilelist(files,c){
              var gen=++_rflGeneration; // capture generation for this call
              _rflFiles=files;
              _rflConn=c;
              document.getElementById('recv-dropzone').classList.add('hidden');
              document.getElementById('recv-filelist').style.display='flex';
              var list=document.getElementById('rfl-list');
              list.innerHTML='';

              // ── Check which files already exist on disk (if a folder is selected) ──
              var onDisk=new Set();
              if(dirHandle){
                setStatus('status-receiver','Checking local folder…','');
                await Promise.all(files.map(async function(f){
                  try{
                    var fh=await dirHandle.getFileHandle(sanitizeFilename(f.name));
                    // Also verify size matches — partial/corrupt files shouldn't be skipped
                    var existing=await fh.getFile();
                    if(existing.size===f.size)onDisk.add(f.name);
                  }catch(_){/* file not found — normal */}
                }));
              }
              // Abort if a newer call superseded us during the async disk check
              if(gen!==_rflGeneration)return;

              files.forEach(function(f){
                var alreadyDone=_rflDownloaded.has(f.name)||onDisk.has(f.name);
                var isOnDisk=onDisk.has(f.name)&&!_rflDownloaded.has(f.name);
                var row=document.createElement('div');row.className='rfl-item';
                if(alreadyDone)row.dataset.done='1';
                var cb=document.createElement('input');
                cb.type='checkbox';cb.className='rfl-cb';cb.checked=!alreadyDone;
                cb.onchange=function(){rflUpdateCount();row.classList.toggle('selected',cb.checked);};
                var icon=document.createElement('span');icon.className='rfl-icon';
                icon.textContent=alreadyDone?'✓':'📄';
                if(alreadyDone)icon.style.color='var(--green)';
                var name=document.createElement('span');name.className='rfl-name';name.textContent=f.name;
                name.title=f.name;
                if(alreadyDone)name.style.color='var(--dim)';
                var size=document.createElement('span');size.className='rfl-size';size.textContent=fmtB(f.size);
                if(alreadyDone){
                  var doneTag=document.createElement('span');
                  doneTag.style.cssText='font-size:0.48em;font-weight:700;letter-spacing:.08em;flex-shrink:0;';
                  if(isOnDisk){
                    doneTag.style.color='var(--cyan)';
                    doneTag.textContent='📁 on disk';
                    doneTag.title='File already exists in selected folder (same size)';
                  } else {
                    doneTag.style.color='var(--green)';
                    doneTag.textContent='✓ done';
                  }
                  row.appendChild(cb);row.appendChild(icon);row.appendChild(name);row.appendChild(doneTag);
                } else {
                  row.appendChild(cb);row.appendChild(icon);row.appendChild(name);row.appendChild(size);
                  row.classList.add('selected');
                }
                row.onclick=function(e){if(e.target===cb)return;cb.checked=!cb.checked;cb.dispatchEvent(new Event('change'));};
                list.appendChild(row);
              });

              rflUpdateCount();
              var remaining=files.filter(function(f){return!_rflDownloaded.has(f.name)&&!onDisk.has(f.name);}).length;
              var allSkipped=new Set([..._rflDownloaded,...onDisk]);
              var skippedCount=files.filter(function(f){return allSkipped.has(f.name);}).length;
              var msg=remaining>0
                ? remaining+' file'+(remaining>1?'s':'')+' to download'+(skippedCount>0?' · '+skippedCount+' skipped (already present)':'')
                : 'All files already present';
              setStatus('status-receiver',msg,'ok');
            }

            function rflUpdateCount(){
              var rows=document.getElementById('rfl-list').querySelectorAll('.rfl-cb');
              var selected=0;rows.forEach(function(cb){if(cb.checked)selected++;});
              var countEl=document.getElementById('rfl-sel-count');
              if(countEl)countEl.innerHTML='<span>'+selected+'</span> file'+(selected!==1?'s':'')+' selected';
              var btn=document.getElementById('btn-rfl-download');
              if(btn)btn.disabled=(selected===0);
            }

            function rflSelectAll(val){
              var rows=document.getElementById('rfl-list').querySelectorAll('.rfl-item');
              rows.forEach(function(row){
                var cb=row.querySelector('.rfl-cb');
                if(!cb)return;
                // "Select all" skips items already done/on-disk — "Deselect all" deselects everything
                if(val&&row.dataset.done==='1')return;
                cb.checked=val;row.classList.toggle('selected',val);
              });
              rflUpdateCount();
            }

            function rflStartDownload(){
              if(!_rflConn||!_rflConn.open){
                setStatus('status-receiver','Connection lost — cannot download','err');return;
              }
              var rows=document.getElementById('rfl-list').querySelectorAll('.rfl-cb');
              var indices=[];
              rows.forEach(function(cb,i){
                if(cb.checked&&_rflFiles[i]!==undefined)indices.push(_rflFiles[i].idx);
              });
              if(indices.length===0)return;
              // Hide selection panel, show recv queue + header
              document.getElementById('recv-filelist').style.display='none';
              document.getElementById('recv-table-header').style.display='grid';
              document.getElementById('recv-queue').style.display='flex';
              setStatus('status-receiver','Downloading '+indices.length+' file'+(indices.length>1?'s':'')+'…','');
              try{_rflConn.send({type:'request',indices:indices});}catch(e){
                setStatus('status-receiver','Error sending request: '+(e.message||e),'err');
              }
            }


            function saveBlob(meta,chunks,itemRef){
              var ext=(meta.name||'').split('.').pop().toLowerCase();
              // Executable/injectable types must not be served with their native MIME
              // — browser could execute them if the user navigates to the blob URL
              var DANGEROUS_EXTS={
                html:1,htm:1,xhtml:1,shtml:1,
                js:1,mjs:1,jsx:1,ts:1,tsx:1,
                svg:1,               // SVG can embed scripts
                xml:1,               // XML + XSLT can execute
                vbs:1,wsf:1,wsh:1,  // Windows script
                py:1,rb:1,pl:1,sh:1,bash:1,zsh:1,fish:1,
                bat:1,cmd:1,ps1:1,psm1:1,psd1:1,
                exe:1,dll:1,com:1,msi:1,app:1,dmg:1,pkg:1,
                php:1,asp:1,aspx:1,jsp:1,cgi:1
              };
              var mimeMap={
                pdf:'application/pdf',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',
                gif:'image/gif',webp:'image/webp',
                mp4:'video/mp4',webm:'video/webm',mp3:'audio/mpeg',wav:'audio/wav',ogg:'audio/ogg',
                zip:'application/zip',gz:'application/gzip','7z':'application/x-7z-compressed',
                tar:'application/x-tar',rar:'application/vnd.rar',
                json:'application/json',txt:'text/plain',csv:'text/plain',
                css:'text/css',
                doc:'application/msword',
                docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                woff:'font/woff',woff2:'font/woff2',ttf:'font/ttf',otf:'font/otf'
              };
              // Any dangerous or unknown type → binary download, never executable
              var mimeType=DANGEROUS_EXTS[ext]?'application/octet-stream':(mimeMap[ext]||'application/octet-stream');
              var blob=new Blob(chunks,{type:mimeType});
              var url=URL.createObjectURL(blob);
              var safeName=sanitizeFilename(meta.name);
              if(itemRef){
                itemRef.el.classList.remove('active');itemRef.el.classList.add('done');
                var a=document.createElement('a');
                a.className='fq-st done';a.style.cssText='text-decoration:none;';
                a.href=url;a.download=safeName;a.textContent='↓ DL';
                itemRef.stEl.replaceWith(a);
              }
              var a2=document.createElement('a');a2.href=url;a2.download=safeName;
              document.body.appendChild(a2);a2.click();document.body.removeChild(a2);
              // Track URL for centralized revocation (see _pendingBlobUrls at top)
              var revokeTimer=setTimeout(function(){URL.revokeObjectURL(url);_pendingBlobUrls.delete(url);},300000);
              _pendingBlobUrls.set(url,revokeTimer);
              setStatus('status-receiver','✓ '+truncName(meta.name)+' received!','ok');
              playSuccessSound();
            }


          // Republie sur window uniquement les handlers référencés par des attributs
          // onclick/onchange/oninput inline dans le HTML ci-dessus.
          Object.assign(window, {
            chooseRole, clearConfirmed, clearDirectory, clearReceived,
            connectToPeer, copyCode, copyCodeSrv, expandRecvForm,
            onDirPathClick, onFilesSelected, onShaToggle, onSrvFilesSelected,
            onSrvShaToggle, pickDirectory, rflSelectAll, rflStartDownload,
            startSendQueue
          });

          // Nettoyage exposé pour la fermeture de fenêtre WebOSx
          window.__p2pTeardown = function () {
            try { stopPing(); } catch (e) {}
            try { if (reconnectTimer) clearTimeout(reconnectTimer); } catch (e) {}
            try { if (peer) peer.destroy(); } catch (e) {}
            try {
              _pendingBlobUrls.forEach(function (timer, url) {
                clearTimeout(timer); URL.revokeObjectURL(url);
              });
              _pendingBlobUrls.clear();
            } catch (e) {}
          };
        }

        // Charge PeerJS une seule fois (paresseux : seulement à la première ouverture de l'app).
        function __p2pEnsurePeerJs(cb) {
          if (window.Peer) { cb(); return; }
            if (window.__p2pPeerJsQueue) { window.__p2pPeerJsQueue.push(cb); return; }
            window.__p2pPeerJsQueue = [cb];
            function done() {
                const q = window.__p2pPeerJsQueue || [];
                window.__p2pPeerJsQueue = null;
                q.forEach(fn => fn());
            }
            // NOTE SÉCURITÉ : aucun des deux scripts tiers ci-dessous n'était protégé par
            // Subresource Integrity (SRI). Si l'un ou l'autre hôte est compromis ou
            // intercepté, le code chargé s'exécute avec les pleins pouvoirs dans l'OS.
            // Le fallback unpkg est maintenant épinglé avec un hash SHA-384 vérifié
            // (calculé depuis le paquet npm officiel peerjs@1.5.4). Le hash du script
            // servi par creepycat.fr n'a pas pu être vérifié depuis cet environnement
            // (domaine non accessible) — à calculer et épingler côté hébergeur avec :
            //   openssl dgst -sha384 -binary peerjs.min.js | openssl base64 -A
            const s = document.createElement('script');
            s.src = 'https://www.creepycat.fr/webapp/js/peerjs.min.js';
            s.onload = done;
            s.onerror = function () {
                const s2 = document.createElement('script');
                s2.src = 'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js';
                s2.integrity = 'sha384-nlUQ8ZqCbvStErob+biJNzSgltf6urV3VGqhfIfzhmg9RXmpeRm76ELw0pYnKlTR';
                s2.crossOrigin = 'anonymous';
                s2.onload = done;
                s2.onerror = function () {
                    console.error('P2P: échec de chargement de PeerJS (intégrité ou réseau)');
                };
                document.head.appendChild(s2);
            };
            document.head.appendChild(s);
        }

        OS.registry.register({
            id: 'p2p-transfer',
            name: I18N.t('app.p2p'),
            nameKey: 'app.p2p',
            icon: P2P_ICON,
            defaultWidth: 860,
            defaultHeight: 660,
            singleton: true, // le moteur utilise des document.getElementById() globaux,
                              // pas de scoping par fenêtre : une seule instance à la fois.
                              // Relancer l'app focus la fenêtre existante (géré par OS.launchApp).
            init: (c, api) => {
                c.innerHTML = P2P_HTML;
                I18N.apply(c);

                function relocalize() { I18N.apply(c); }
                window.addEventListener('webosx:langchange', relocalize);

                const hint = c.querySelector('.role-hint');
                const roleBtns = c.querySelectorAll('.role-btn');
                const hintOriginal = hint ? hint.textContent : '';
                if (hint) hint.textContent = I18N.t('p2p.role.loading');
                roleBtns.forEach(b => b.disabled = true);

                __p2pEnsurePeerJs(() => {
                    __p2pEngine();
                    roleBtns.forEach(b => b.disabled = false);
                    if (hint) hint.textContent = hintOriginal;
                });

                const origClose = api.close;
                api.close = () => {
                    window.removeEventListener('webosx:langchange', relocalize);
                    if (window.__p2pTeardown) { try { window.__p2pTeardown(); } catch (e) {} }
                    origClose();
                };
            }
        });
