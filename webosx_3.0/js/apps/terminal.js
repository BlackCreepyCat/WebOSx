        // Traductions propres à l'app Terminal (auto-suffisantes, n'impactent pas js/core/lang/*.js)
        I18N.registerLang('fr', {
            'term.subtitle': 'Terminal réseau — outils web en direct. Tapez "help" pour la liste des commandes.',
            'term.help.header': 'Commandes disponibles :',
            'term.help.help': 'Afficher cette aide',
            'term.help.clear': 'Effacer l\'écran',
            'term.help.echo': 'Afficher un texte',
            'term.help.myip': 'Afficher mon IP publique + géoloc',
            'term.help.geoip': 'Géolocaliser une adresse IP',
            'term.help.dns': 'Résoudre un enregistrement DNS (A, AAAA, MX, TXT, NS...)',
            'term.help.whois': 'Infos d\'enregistrement d\'un domaine (RDAP)',
            'term.help.ping': 'Latence approximative vers un hôte',
            'term.help.useragent': 'Infos sur le navigateur / la machine',
            'term.help.theme': 'Changer la teinte (0-360)',
            'term.network.fail': 'requête réseau échouée ({err})',
            'term.network.noConn': 'connexion impossible',
            'term.myip.searching': 'Recherche de l\'IP publique...',
            'term.myip.labelIPv4': 'IP publique (IPv4) :',
            'term.label.city': 'Ville :',
            'term.label.isp': 'Fournisseur :',
            'term.label.coords': 'Coordonnées :',
            'term.label.tz': 'Fuseau horaire :',
            'term.myip.geoUnavailable': '(géolocalisation indisponible)',
            'term.myip.ipifyFail': '(ipify indisponible : {err}, tentative alternative...)',
            'term.myip.labelGeneric': 'IP publique{v6} :',
            'term.myip.ipv6Suffix': ' (IPv6)',
            'term.myip.fetchFail': 'Erreur : impossible de récupérer l\'IP publique ({err}).',
            'term.fileHint': 'Astuce : ce fichier est ouvert en local (file://). Certains navigateurs bloquent les requêtes réseau sortantes dans ce mode. Essayez de le servir via un petit serveur local (ex: "python -m http.server") ou de l\'héberger en ligne.',
            'term.myip.ipv6Note': 'Note : adresse au format IPv6 (contient des ":"), c\'est normal si votre connexion utilise IPv6 — elle ne ressemblera donc pas à "192.xx.xx.xx".',
            'term.geoip.usage': 'Usage: geoip [adresse-ip]',
            'term.geoip.searching': 'Géolocalisation de {ip}...',
            'term.error': 'Erreur : {err}',
            'term.label.country': 'Pays :',
            'term.label.region': 'Région :',
            'term.label.ispShort': 'FAI :',
            'term.label.asn': 'ASN :',
            'term.unknown': 'inconnu',
            'term.dns.usage': 'Usage: dns [domaine] [type=A|AAAA|MX|TXT|NS|CNAME|SOA]',
            'term.dns.resolving': 'Résolution DNS {type} pour {domain}...',
            'term.dns.none': 'Aucun enregistrement {type} trouvé pour {domain}.',
            'term.dns.records': 'Enregistrements {type} pour {domain} :',
            'term.dns.error': 'Erreur DNS : {err}',
            'term.whois.usage': 'Usage: whois [domaine]',
            'term.whois.querying': 'Requête RDAP pour {domain}...',
            'term.label.domain': 'Domaine :',
            'term.label.status': 'Statut :',
            'term.label.registrar': 'Registrar :',
            'term.label.created': 'Créé le :',
            'term.label.expires': 'Expire le :',
            'term.label.nameservers': 'Serveurs de noms :',
            'term.whois.error': 'Erreur WHOIS : domaine introuvable ou non pris en charge ({err})',
            'term.ping.usage': 'Usage: ping [domaine]',
            'term.ping.pinging': 'Ping vers {host} (via HTTPS)...',
            'term.ping.response': 'Réponse de {host} : temps={ms}ms',
            'term.ping.noResponse': 'Aucune réponse (hôte injoignable ou bloqué par CORS)',
            'term.ping.stats': 'Statistiques :',
            'term.ua.label': 'User-Agent :',
            'term.ua.platform': 'Plateforme :',
            'term.ua.lang': 'Langue :',
            'term.ua.resolution': 'Résolution :',
            'term.ua.cores': 'Cœurs CPU :',
            'term.ua.online': 'En ligne :',
            'term.yes': 'oui',
            'term.no': 'non',
            'term.theme.changed': 'Teinte changée à {hue}°',
            'term.theme.usage': 'Usage: theme [0-360]',
            'term.unknownCmd': 'Commande inconnue : {cmd}',
            'term.helpHint': 'Tapez "help" pour l\'aide.',
            'term.fileWarning': '⚠ Fichier ouvert en local (file://) : certains navigateurs restreignent les requêtes réseau sortantes dans ce mode. Si "myip", "dns", "whois" ou "ping" échouent, essayez de servir ce fichier via un serveur local (ex: "python -m http.server") ou de l\'héberger en ligne.'
        });
        I18N.registerLang('en', {
            'term.subtitle': 'Network terminal — live web tools. Type "help" for the command list.',
            'term.help.header': 'Available commands:',
            'term.help.help': 'Show this help',
            'term.help.clear': 'Clear the screen',
            'term.help.echo': 'Display text',
            'term.help.myip': 'Show my public IP + geolocation',
            'term.help.geoip': 'Geolocate an IP address',
            'term.help.dns': 'Resolve a DNS record (A, AAAA, MX, TXT, NS...)',
            'term.help.whois': 'Domain registration info (RDAP)',
            'term.help.ping': 'Approximate latency to a host',
            'term.help.useragent': 'Browser / machine info',
            'term.help.theme': 'Change the accent hue (0-360)',
            'term.network.fail': 'network request failed ({err})',
            'term.network.noConn': 'connection unavailable',
            'term.myip.searching': 'Looking up public IP...',
            'term.myip.labelIPv4': 'Public IP (IPv4):',
            'term.label.city': 'City:',
            'term.label.isp': 'Provider:',
            'term.label.coords': 'Coordinates:',
            'term.label.tz': 'Timezone:',
            'term.myip.geoUnavailable': '(geolocation unavailable)',
            'term.myip.ipifyFail': '(ipify unavailable: {err}, trying fallback...)',
            'term.myip.labelGeneric': 'Public IP{v6}:',
            'term.myip.ipv6Suffix': ' (IPv6)',
            'term.myip.fetchFail': 'Error: could not retrieve public IP ({err}).',
            'term.fileHint': 'Tip: this file is open locally (file://). Some browsers block outgoing network requests in this mode. Try serving it via a small local server (e.g. "python -m http.server") or hosting it online.',
            'term.myip.ipv6Note': 'Note: address in IPv6 format (contains ":"), which is normal if your connection uses IPv6 — it won\'t look like "192.xx.xx.xx".',
            'term.geoip.usage': 'Usage: geoip [ip-address]',
            'term.geoip.searching': 'Geolocating {ip}...',
            'term.error': 'Error: {err}',
            'term.label.country': 'Country:',
            'term.label.region': 'Region:',
            'term.label.ispShort': 'ISP:',
            'term.label.asn': 'ASN:',
            'term.unknown': 'unknown',
            'term.dns.usage': 'Usage: dns [domain] [type=A|AAAA|MX|TXT|NS|CNAME|SOA]',
            'term.dns.resolving': 'Resolving {type} DNS for {domain}...',
            'term.dns.none': 'No {type} record found for {domain}.',
            'term.dns.records': '{type} records for {domain}:',
            'term.dns.error': 'DNS error: {err}',
            'term.whois.usage': 'Usage: whois [domain]',
            'term.whois.querying': 'RDAP query for {domain}...',
            'term.label.domain': 'Domain:',
            'term.label.status': 'Status:',
            'term.label.registrar': 'Registrar:',
            'term.label.created': 'Created on:',
            'term.label.expires': 'Expires on:',
            'term.label.nameservers': 'Nameservers:',
            'term.whois.error': 'WHOIS error: domain not found or unsupported ({err})',
            'term.ping.usage': 'Usage: ping [domain]',
            'term.ping.pinging': 'Pinging {host} (via HTTPS)...',
            'term.ping.response': 'Response from {host}: time={ms}ms',
            'term.ping.noResponse': 'No response (host unreachable or blocked by CORS)',
            'term.ping.stats': 'Statistics:',
            'term.ua.label': 'User-Agent:',
            'term.ua.platform': 'Platform:',
            'term.ua.lang': 'Language:',
            'term.ua.resolution': 'Resolution:',
            'term.ua.cores': 'CPU cores:',
            'term.ua.online': 'Online:',
            'term.yes': 'yes',
            'term.no': 'no',
            'term.theme.changed': 'Hue changed to {hue}°',
            'term.theme.usage': 'Usage: theme [0-360]',
            'term.unknownCmd': 'Unknown command: {cmd}',
            'term.helpHint': 'Type "help" for assistance.',
            'term.fileWarning': '⚠ File opened locally (file://): some browsers restrict outgoing network requests in this mode. If "myip", "dns", "whois" or "ping" fail, try serving this file via a local server (e.g. "python -m http.server") or hosting it online.'
        });
        I18N.registerLang('es', {
            'term.subtitle': 'Terminal de red — herramientas web en directo. Escribe "help" para la lista de comandos.',
            'term.help.header': 'Comandos disponibles:',
            'term.help.help': 'Mostrar esta ayuda',
            'term.help.clear': 'Limpiar la pantalla',
            'term.help.echo': 'Mostrar un texto',
            'term.help.myip': 'Mostrar mi IP pública + geolocalización',
            'term.help.geoip': 'Geolocalizar una dirección IP',
            'term.help.dns': 'Resolver un registro DNS (A, AAAA, MX, TXT, NS...)',
            'term.help.whois': 'Info de registro de un dominio (RDAP)',
            'term.help.ping': 'Latencia aproximada a un host',
            'term.help.useragent': 'Info del navegador / equipo',
            'term.help.theme': 'Cambiar el matiz (0-360)',
            'term.network.fail': 'solicitud de red fallida ({err})',
            'term.network.noConn': 'conexión no disponible',
            'term.myip.searching': 'Buscando la IP pública...',
            'term.myip.labelIPv4': 'IP pública (IPv4):',
            'term.label.city': 'Ciudad:',
            'term.label.isp': 'Proveedor:',
            'term.label.coords': 'Coordenadas:',
            'term.label.tz': 'Zona horaria:',
            'term.myip.geoUnavailable': '(geolocalización no disponible)',
            'term.myip.ipifyFail': '(ipify no disponible: {err}, probando alternativa...)',
            'term.myip.labelGeneric': 'IP pública{v6}:',
            'term.myip.ipv6Suffix': ' (IPv6)',
            'term.myip.fetchFail': 'Error: no se pudo obtener la IP pública ({err}).',
            'term.fileHint': 'Consejo: este archivo está abierto localmente (file://). Algunos navegadores bloquean las solicitudes de red salientes en este modo. Prueba a servirlo con un pequeño servidor local (ej: "python -m http.server") o alojarlo en línea.',
            'term.myip.ipv6Note': 'Nota: dirección en formato IPv6 (contiene ":"), es normal si tu conexión usa IPv6 — no se parecerá a "192.xx.xx.xx".',
            'term.geoip.usage': 'Uso: geoip [dirección-ip]',
            'term.geoip.searching': 'Geolocalizando {ip}...',
            'term.error': 'Error: {err}',
            'term.label.country': 'País:',
            'term.label.region': 'Región:',
            'term.label.ispShort': 'ISP:',
            'term.label.asn': 'ASN:',
            'term.unknown': 'desconocido',
            'term.dns.usage': 'Uso: dns [dominio] [tipo=A|AAAA|MX|TXT|NS|CNAME|SOA]',
            'term.dns.resolving': 'Resolviendo DNS {type} para {domain}...',
            'term.dns.none': 'No se encontró registro {type} para {domain}.',
            'term.dns.records': 'Registros {type} para {domain}:',
            'term.dns.error': 'Error DNS: {err}',
            'term.whois.usage': 'Uso: whois [dominio]',
            'term.whois.querying': 'Consulta RDAP para {domain}...',
            'term.label.domain': 'Dominio:',
            'term.label.status': 'Estado:',
            'term.label.registrar': 'Registrador:',
            'term.label.created': 'Creado el:',
            'term.label.expires': 'Expira el:',
            'term.label.nameservers': 'Servidores de nombres:',
            'term.whois.error': 'Error WHOIS: dominio no encontrado o no compatible ({err})',
            'term.ping.usage': 'Uso: ping [dominio]',
            'term.ping.pinging': 'Haciendo ping a {host} (vía HTTPS)...',
            'term.ping.response': 'Respuesta de {host}: tiempo={ms}ms',
            'term.ping.noResponse': 'Sin respuesta (host inalcanzable o bloqueado por CORS)',
            'term.ping.stats': 'Estadísticas:',
            'term.ua.label': 'User-Agent:',
            'term.ua.platform': 'Plataforma:',
            'term.ua.lang': 'Idioma:',
            'term.ua.resolution': 'Resolución:',
            'term.ua.cores': 'Núcleos CPU:',
            'term.ua.online': 'En línea:',
            'term.yes': 'sí',
            'term.no': 'no',
            'term.theme.changed': 'Matiz cambiado a {hue}°',
            'term.theme.usage': 'Uso: theme [0-360]',
            'term.unknownCmd': 'Comando desconocido: {cmd}',
            'term.helpHint': 'Escribe "help" para ayuda.',
            'term.fileWarning': '⚠ Archivo abierto localmente (file://): algunos navegadores restringen las solicitudes de red salientes en este modo. Si "myip", "dns", "whois" o "ping" fallan, prueba a servir este archivo con un servidor local (ej: "python -m http.server") o alojarlo en línea.'
        });
        I18N.registerLang('de', {
            'term.subtitle': 'Netzwerkterminal — Live-Webtools. Geben Sie "help" für die Befehlsliste ein.',
            'term.help.header': 'Verfügbare Befehle:',
            'term.help.help': 'Diese Hilfe anzeigen',
            'term.help.clear': 'Bildschirm leeren',
            'term.help.echo': 'Text anzeigen',
            'term.help.myip': 'Meine öffentliche IP + Standort anzeigen',
            'term.help.geoip': 'Eine IP-Adresse lokalisieren',
            'term.help.dns': 'Einen DNS-Eintrag auflösen (A, AAAA, MX, TXT, NS...)',
            'term.help.whois': 'Registrierungsinfos einer Domain (RDAP)',
            'term.help.ping': 'Ungefähre Latenz zu einem Host',
            'term.help.useragent': 'Browser-/Geräteinfos',
            'term.help.theme': 'Farbton ändern (0-360)',
            'term.network.fail': 'Netzwerkanfrage fehlgeschlagen ({err})',
            'term.network.noConn': 'keine Verbindung möglich',
            'term.myip.searching': 'Öffentliche IP wird gesucht...',
            'term.myip.labelIPv4': 'Öffentliche IP (IPv4):',
            'term.label.city': 'Stadt:',
            'term.label.isp': 'Anbieter:',
            'term.label.coords': 'Koordinaten:',
            'term.label.tz': 'Zeitzone:',
            'term.myip.geoUnavailable': '(Standortbestimmung nicht verfügbar)',
            'term.myip.ipifyFail': '(ipify nicht verfügbar: {err}, versuche Alternative...)',
            'term.myip.labelGeneric': 'Öffentliche IP{v6}:',
            'term.myip.ipv6Suffix': ' (IPv6)',
            'term.myip.fetchFail': 'Fehler: öffentliche IP konnte nicht abgerufen werden ({err}).',
            'term.fileHint': 'Tipp: Diese Datei ist lokal geöffnet (file://). Einige Browser blockieren ausgehende Netzwerkanfragen in diesem Modus. Versuchen Sie, sie über einen kleinen lokalen Server (z. B. "python -m http.server") bereitzustellen oder online zu hosten.',
            'term.myip.ipv6Note': 'Hinweis: Adresse im IPv6-Format (enthält ":"), das ist normal, wenn Ihre Verbindung IPv6 verwendet — sie sieht daher nicht wie "192.xx.xx.xx" aus.',
            'term.geoip.usage': 'Verwendung: geoip [ip-adresse]',
            'term.geoip.searching': 'Lokalisiere {ip}...',
            'term.error': 'Fehler: {err}',
            'term.label.country': 'Land:',
            'term.label.region': 'Region:',
            'term.label.ispShort': 'ISP:',
            'term.label.asn': 'ASN:',
            'term.unknown': 'unbekannt',
            'term.dns.usage': 'Verwendung: dns [domain] [typ=A|AAAA|MX|TXT|NS|CNAME|SOA]',
            'term.dns.resolving': 'Löse {type}-DNS für {domain} auf...',
            'term.dns.none': 'Kein {type}-Eintrag für {domain} gefunden.',
            'term.dns.records': '{type}-Einträge für {domain}:',
            'term.dns.error': 'DNS-Fehler: {err}',
            'term.whois.usage': 'Verwendung: whois [domain]',
            'term.whois.querying': 'RDAP-Anfrage für {domain}...',
            'term.label.domain': 'Domain:',
            'term.label.status': 'Status:',
            'term.label.registrar': 'Registrar:',
            'term.label.created': 'Erstellt am:',
            'term.label.expires': 'Läuft ab am:',
            'term.label.nameservers': 'Nameserver:',
            'term.whois.error': 'WHOIS-Fehler: Domain nicht gefunden oder nicht unterstützt ({err})',
            'term.ping.usage': 'Verwendung: ping [domain]',
            'term.ping.pinging': 'Ping zu {host} (über HTTPS)...',
            'term.ping.response': 'Antwort von {host}: Zeit={ms}ms',
            'term.ping.noResponse': 'Keine Antwort (Host nicht erreichbar oder durch CORS blockiert)',
            'term.ping.stats': 'Statistik:',
            'term.ua.label': 'User-Agent:',
            'term.ua.platform': 'Plattform:',
            'term.ua.lang': 'Sprache:',
            'term.ua.resolution': 'Auflösung:',
            'term.ua.cores': 'CPU-Kerne:',
            'term.ua.online': 'Online:',
            'term.yes': 'ja',
            'term.no': 'nein',
            'term.theme.changed': 'Farbton geändert auf {hue}°',
            'term.theme.usage': 'Verwendung: theme [0-360]',
            'term.unknownCmd': 'Unbekannter Befehl: {cmd}',
            'term.helpHint': 'Geben Sie "help" für Hilfe ein.',
            'term.fileWarning': '⚠ Datei lokal geöffnet (file://): einige Browser schränken ausgehende Netzwerkanfragen in diesem Modus ein. Wenn "myip", "dns", "whois" oder "ping" fehlschlagen, versuchen Sie, diese Datei über einen lokalen Server (z. B. "python -m http.server") bereitzustellen oder online zu hosten.'
        });

        OS.registry.register({
            id: 'sys-terminal', name: I18N.t('app.terminal'), nameKey: 'app.terminal', icon: ICONS.terminal, defaultWidth: 640, defaultHeight: 430,
            init: (c, api) => {
                c.innerHTML = `
                <div class="terminal-wrap">
                    <div class="term-output"><span class="t-green t-bold">WebOSx Net-Terminal v2.0</span>\n<span class="t-dim">${I18N.t('term.subtitle')}</span>\n\n</div>
                    <div class="term-input-row">
                        <span class="term-prompt-label">user@webosx:~$</span>
                        <input type="text" id="term-input" autocomplete="off" spellcheck="false">
                    </div>
                </div>`;
                const out = c.querySelector('.term-output'), inp = c.querySelector('#term-input');
                let history = [], histIdx = -1, busy = false;
                function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
                function print(html) { out.innerHTML += html + '\n'; out.scrollTop = out.scrollHeight; }
                function prompt(cmd) { print(`<span class="t-green t-bold">user@webosx:~$</span> <span class="t-white">${esc(cmd)}</span>`); }
                function setBusy(v) { busy = v; inp.disabled = v; if (!v) setTimeout(() => inp.focus(), 10); }

                function buildHelp() {
                    return `<span class="t-cyan">${I18N.t('term.help.header')}</span>\n`
                        + `  <span class="t-yellow">help</span>                - ${I18N.t('term.help.help')}\n`
                        + `  <span class="t-yellow">clear</span>               - ${I18N.t('term.help.clear')}\n`
                        + `  <span class="t-yellow">echo [txt]</span>          - ${I18N.t('term.help.echo')}\n`
                        + `  <span class="t-yellow">myip</span>                - ${I18N.t('term.help.myip')}\n`
                        + `  <span class="t-yellow">geoip [ip]</span>          - ${I18N.t('term.help.geoip')}\n`
                        + `  <span class="t-yellow">dns [domaine] [type]</span> - ${I18N.t('term.help.dns')}\n`
                        + `  <span class="t-yellow">whois [domaine]</span>     - ${I18N.t('term.help.whois')}\n`
                        + `  <span class="t-yellow">ping [domaine]</span>      - ${I18N.t('term.help.ping')}\n`
                        + `  <span class="t-yellow">useragent</span>           - ${I18N.t('term.help.useragent')}\n`
                        + `  <span class="t-yellow">theme [h]</span>           - ${I18N.t('term.help.theme')}`;
                }

                async function getJSON(url) {
                    let r;
                    try {
                        r = await fetch(url, { cache: 'no-store' });
                    } catch (err) {
                        throw new Error(I18N.t('term.network.fail', { err: err.message || I18N.t('term.network.noConn') }));
                    }
                    if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`);
                    return r.json();
                }

                async function cmdMyip() {
                    print(`<span class="t-dim">${I18N.t('term.myip.searching')}</span>`);
                    // 1er essai : ipify (garantit une adresse IPv4 classique, format 192.xx.xx.xx)
                    try {
                        const { ip } = await getJSON('https://api.ipify.org?format=json');
                        let g = null;
                        try { g = await getJSON(`https://ipwho.is/${ip}`); } catch (_) { /* géoloc optionnelle */ }
                        if (g && g.success) {
                            print(`<span class="t-white">${I18N.t('term.myip.labelIPv4')}</span> <span class="t-cyan">${esc(ip)}</span>\n<span class="t-white">${I18N.t('term.label.city')}</span> ${esc(g.city)}, ${esc(g.region)}, ${esc(g.country)}\n<span class="t-white">${I18N.t('term.label.isp')}</span> ${esc(g.connection?.isp || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.label.coords')}</span> ${esc(g.latitude)}, ${esc(g.longitude)}\n<span class="t-white">${I18N.t('term.label.tz')}</span> ${esc(g.timezone?.id || I18N.t('term.unknown'))}`);
                        } else {
                            print(`<span class="t-white">${I18N.t('term.myip.labelIPv4')}</span> <span class="t-cyan">${esc(ip)}</span>\n<span class="t-dim">${I18N.t('term.myip.geoUnavailable')}</span>`);
                        }
                        return;
                    } catch (err1) {
                        print(`<span class="t-dim">${I18N.t('term.myip.ipifyFail', { err: esc(err1.message) })}</span>`);
                    }
                    // 2e essai (repli) : ipwho.is en auto-détection — peut renvoyer une IPv6 selon votre connexion
                    try {
                        const g = await getJSON('https://ipwho.is/');
                        if (!g.success) throw new Error(g.message || 'réponse invalide');
                        const isV6 = g.ip && g.ip.includes(':');
                        print(`<span class="t-white">${I18N.t('term.myip.labelGeneric', { v6: isV6 ? I18N.t('term.myip.ipv6Suffix') : '' })}</span> <span class="t-cyan">${esc(g.ip)}</span>\n<span class="t-white">${I18N.t('term.label.city')}</span> ${esc(g.city)}, ${esc(g.region)}, ${esc(g.country)}\n<span class="t-white">${I18N.t('term.label.isp')}</span> ${esc(g.connection?.isp || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.label.coords')}</span> ${esc(g.latitude)}, ${esc(g.longitude)}\n<span class="t-white">${I18N.t('term.label.tz')}</span> ${esc(g.timezone?.id || I18N.t('term.unknown'))}`);
                        if (isV6) print(`<span class="t-dim">${I18N.t('term.myip.ipv6Note')}</span>`);
                    } catch (err2) {
                        print(`<span class="t-red">${I18N.t('term.myip.fetchFail', { err: esc(err2.message) })}</span>`);
                        if (location.protocol === 'file:') print(`<span class="t-yellow">${I18N.t('term.fileHint')}</span>`);
                    }
                }

                async function cmdGeoip(ip) {
                    if (!ip) { print(`<span class="t-red">${I18N.t('term.geoip.usage')}</span>`); return; }
                    print(`<span class="t-dim">${I18N.t('term.geoip.searching', { ip: esc(ip) })}</span>`);
                    try {
                        const g = await getJSON(`https://ipwho.is/${encodeURIComponent(ip)}`);
                        if (!g.success) { print(`<span class="t-red">${I18N.t('term.error', { err: esc(g.message || I18N.t('term.unknown')) })}</span>`); return; }
                        print(`<span class="t-white">IP :</span> <span class="t-cyan">${esc(g.ip)}</span>\n<span class="t-white">${I18N.t('term.label.country')}</span> ${esc(g.country)} (${esc(g.country_code)})\n<span class="t-white">${I18N.t('term.label.region')}</span> ${esc(g.region)}\n<span class="t-white">${I18N.t('term.label.city')}</span> ${esc(g.city)}\n<span class="t-white">${I18N.t('term.label.ispShort')}</span> ${esc(g.connection?.isp || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.label.asn')}</span> ${esc(g.connection?.asn ?? I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.label.coords')}</span> ${esc(g.latitude)}, ${esc(g.longitude)}`);
                    } catch (err) {
                        print(`<span class="t-red">${I18N.t('term.error', { err: esc(err.message) })}</span>`);
                        if (location.protocol === 'file:') print(`<span class="t-yellow">${I18N.t('term.fileHint')}</span>`);
                    }
                }

                async function cmdDns(domain, type) {
                    if (!domain) { print(`<span class="t-red">${I18N.t('term.dns.usage')}</span>`); return; }
                    type = (type || 'A').toUpperCase();
                    print(`<span class="t-dim">${I18N.t('term.dns.resolving', { type, domain: esc(domain) })}</span>`);
                    try {
                        const d = await getJSON(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${encodeURIComponent(type)}`);
                        if (!d.Answer || d.Answer.length === 0) { print(`<span class="t-yellow">${I18N.t('term.dns.none', { type, domain: esc(domain) })}</span>`); return; }
                        let lines = `<span class="t-cyan">${I18N.t('term.dns.records', { type, domain: esc(domain) })}</span>`;
                        d.Answer.forEach(a => { lines += `\n  <span class="t-white">${esc(a.name)}</span>  TTL=${a.TTL}  <span class="t-yellow">${esc(a.data)}</span>`; });
                        print(lines);
                    } catch (err) { print(`<span class="t-red">${I18N.t('term.dns.error', { err: esc(err.message) })}</span>`); }
                }

                async function cmdWhois(domain) {
                    if (!domain) { print(`<span class="t-red">${I18N.t('term.whois.usage')}</span>`); return; }
                    print(`<span class="t-dim">${I18N.t('term.whois.querying', { domain: esc(domain) })}</span>`);
                    try {
                        const d = await getJSON(`https://rdap.org/domain/${encodeURIComponent(domain)}`);
                        const registrar = (d.entities || []).find(e => (e.roles || []).includes('registrar'));
                        const regName = registrar?.vcardArray?.[1]?.find(f => f[0] === 'fn')?.[3] || I18N.t('term.unknown');
                        const events = d.events || [];
                        const findEvt = (a) => events.find(e => e.eventAction === a)?.eventDate;
                        let lines = `<span class="t-cyan">${I18N.t('term.label.domain')}</span> <span class="t-white">${esc(d.ldhName || domain)}</span>\n<span class="t-white">${I18N.t('term.label.status')}</span> ${esc((d.status || []).join(', ') || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.label.registrar')}</span> ${esc(regName)}\n<span class="t-white">${I18N.t('term.label.created')}</span> ${esc(findEvt('registration') || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.label.expires')}</span> ${esc(findEvt('expiration') || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.label.nameservers')}</span> ${esc((d.nameservers || []).map(n => n.ldhName).join(', ') || I18N.t('term.unknown'))}`;
                        print(lines);
                    } catch (err) { print(`<span class="t-red">${I18N.t('term.whois.error', { err: esc(err.message) })}</span>`); }
                }

                async function cmdPing(domain) {
                    if (!domain) { print(`<span class="t-red">${I18N.t('term.ping.usage')}</span>`); return; }
                    let host = domain.replace(/^https?:\/\//, '').split('/')[0];
                    print(`<span class="t-dim">${I18N.t('term.ping.pinging', { host: esc(host) })}</span>`);
                    const results = [];
                    for (let i = 0; i < 4; i++) {
                        const t0 = performance.now();
                        try {
                            await fetch(`https://${host}/favicon.ico`, { mode: 'no-cors', cache: 'no-store' });
                            const t1 = performance.now();
                            const ms = (t1 - t0).toFixed(1);
                            results.push(parseFloat(ms));
                            print(`  ${I18N.t('term.ping.response', { host: `<span class="t-white">${esc(host)}</span>`, ms: `<span class="t-cyan">${ms}</span>` })}`);
                        } catch (err) {
                            print(`  <span class="t-red">${I18N.t('term.ping.noResponse')}</span>`);
                        }
                        await new Promise(r => setTimeout(r, 200));
                    }
                    if (results.length) {
                        const avg = (results.reduce((a,b) => a+b, 0) / results.length).toFixed(1);
                        print(`<span class="t-cyan">${I18N.t('term.ping.stats')}</span> min=${Math.min(...results)}ms max=${Math.max(...results)}ms moy=${avg}ms`);
                    }
                }

                function cmdUseragent() {
                    print(`<span class="t-white">${I18N.t('term.ua.label')}</span> ${esc(navigator.userAgent)}\n<span class="t-white">${I18N.t('term.ua.platform')}</span> ${esc(navigator.platform || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.ua.lang')}</span> ${esc(navigator.language)}\n<span class="t-white">${I18N.t('term.ua.resolution')}</span> ${window.screen.width}x${window.screen.height}\n<span class="t-white">${I18N.t('term.ua.cores')}</span> ${esc(navigator.hardwareConcurrency || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.ua.online')}</span> ${navigator.onLine ? I18N.t('term.yes') : I18N.t('term.no')}`);
                }

                async function handleCommand(cmd) {
                    const parts = cmd.split(/\s+/), base = parts[0].toLowerCase();
                    if (base === 'help') { print(buildHelp()); return; }
                    if (base === 'clear') { out.innerHTML = ''; return; }
                    if (base === 'echo') { print(`<span class="t-white">${esc(parts.slice(1).join(' '))}</span>`); return; }
                    if (base === 'theme') { const h = parseInt(parts[1]); if (!isNaN(h) && h >= 0 && h <= 360) { let s = SettingsManager.load(); s.hue = h; SettingsManager.save(s); print(`<span class="t-green">${I18N.t('term.theme.changed', { hue: h })}</span>`); } else print(`<span class="t-red">${I18N.t('term.theme.usage')}</span>`); return; }
                    if (base === 'useragent') { cmdUseragent(); return; }
                    if (base === 'myip') { await cmdMyip(); return; }
                    if (base === 'geoip') { await cmdGeoip(parts[1]); return; }
                    if (base === 'dns') { await cmdDns(parts[1], parts[2]); return; }
                    if (base === 'whois') { await cmdWhois(parts[1]); return; }
                    if (base === 'ping') { await cmdPing(parts[1]); return; }
                    print(`<span class="t-red">${I18N.t('term.unknownCmd', { cmd: esc(base) })}</span>. ${I18N.t('term.helpHint')}`);
                }

                inp.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        if (busy) return;
                        const cmd = inp.value.trim();
                        if (!cmd) { print(`<span class="t-green t-bold">user@webosx:~$</span> `); return; }
                        history.unshift(cmd); histIdx = -1;
                        prompt(cmd);
                        inp.value = '';
                        setBusy(true);
                        handleCommand(cmd).catch(err => print(`<span class="t-red">${I18N.t('term.error', { err: esc(err.message) })}</span>`)).finally(() => setBusy(false));
                    } else if (e.key === 'ArrowUp') { e.preventDefault(); if (histIdx < history.length - 1) { histIdx++; inp.value = history[histIdx]; } }
                    else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx > 0) { histIdx--; inp.value = history[histIdx]; } else { histIdx = -1; inp.value = ''; } }
                });
                if (location.protocol === 'file:') {
                    print(`<span class="t-yellow">${I18N.t('term.fileWarning')}</span>`);
                }
                setTimeout(() => inp.focus(), 100);
                c.querySelector('.terminal-wrap').onclick = () => inp.focus();
            }
        });
