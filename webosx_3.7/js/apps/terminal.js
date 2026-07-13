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
            'term.ping.notifyFail': 'Échec du ping vers {host}',
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
            'term.help.base64': 'Encoder / décoder du texte en Base64',
            'term.help.hash': 'Empreinte SHA-1 / SHA-256 d\'un texte',
            'term.help.jwt': 'Décoder un token JWT (en-tête + charge utile)',
            'term.help.uuid': 'Générer un ou plusieurs UUID v4',
            'term.help.json': 'Formater ou minifier du JSON',
            'term.help.color': 'Convertir une couleur (hex / rgb / hsl)',
            'term.help.calc': 'Évaluer une expression mathématique',
            'term.help.base': 'Convertir un nombre entre bases numériques',
            'term.help.httpstatus': 'Signification d\'un code de statut HTTP',
            'term.base64.usage': 'Usage: base64 encode|decode [texte]',
            'term.base64.error': 'Erreur : chaîne Base64 invalide',
            'term.hash.usage': 'Usage: hash sha1|sha256 [texte]',
            'term.hash.unsupported': 'Algorithme non supporté (sha1, sha256 uniquement)',
            'term.hash.unavailable': 'Web Crypto indisponible (nécessite une connexion sécurisée : https:// ou localhost)',
            'term.jwt.usage': 'Usage: jwt [token]',
            'term.jwt.invalid': 'Token JWT invalide',
            'term.jwt.warning': '⚠ Signature non vérifiée — affichage du contenu uniquement',
            'term.jwt.header': 'En-tête :',
            'term.jwt.payload': 'Charge utile :',
            'term.json.usage': 'Usage: json format|minify [json]',
            'term.json.invalid': 'JSON invalide : {err}',
            'term.color.usage': 'Usage: color [#hex | rgb(...) | hsl(...)]',
            'term.color.invalid': 'Format de couleur non reconnu',
            'term.color.hex': 'Hex :',
            'term.color.rgb': 'RGB :',
            'term.color.hsl': 'HSL :',
            'term.calc.usage': 'Usage: calc [expression]',
            'term.calc.error': 'Erreur : {err}',
            'term.base.usage': 'Usage: base [nombre] [depuis] [vers]  (bin|oct|dec|hex ou 2-36)',
            'term.base.invalidBase': 'Base invalide : {b}',
            'term.base.invalidNumber': 'Nombre invalide pour la base {b}',
            'term.httpstatus.usage': 'Usage: httpstatus [code]',
            'term.httpstatus.unknown': 'Code inconnu : {code}',
            'term.help.wordcount': 'Compte les mots, caractères et temps de lecture',
            'term.help.case': 'Transforme la casse : upper/lower/title/camel/snake',
            'term.help.moyenne': 'Moyenne pondérée (note:coeff,note:coeff,...)',
            'term.help.ohm': 'Loi d\'Ohm — mettre _ sur la valeur à calculer',
            'term.help.pythagore': 'Hypoténuse d\'un triangle rectangle',
            'term.wordcount.usage': 'Usage: wordcount [texte]',
            'term.wordcount.words': 'Mots :',
            'term.wordcount.chars': 'Caractères :',
            'term.wordcount.charsNoSpace': 'sans espaces',
            'term.wordcount.readTime': 'Temps de lecture estimé :',
            'term.case.usage': 'Usage: case upper|lower|title|camel|snake [texte]',
            'term.moyenne.usage': 'Usage: moyenne note:coeff,note:coeff,...  (coeff optionnel, défaut 1)',
            'term.moyenne.invalid': 'Format invalide : {p}',
            'term.moyenne.zeroCoef': 'Somme des coefficients nulle',
            'term.moyenne.result': 'Moyenne : {avg} / 20  (sur {n} notes, total coef {coef})',
            'term.ohm.usage': 'Usage: ohm [V] [I] [R]  (mettre _ sur la valeur à calculer)',
            'term.ohm.needOneUnknown': 'Indiquez exactement un paramètre inconnu avec _',
            'term.ohm.invalidNumber': 'Valeur numérique invalide',
            'term.pythagore.usage': 'Usage: pythagore [côté a] [côté b]',
            'term.pythagore.invalid': 'Les deux côtés doivent être des nombres positifs',
            'term.pythagore.result': 'Hypoténuse : {c}',
            'term.help.cidr': 'Calculateur de sous-réseau (réseau, broadcast, plage)',
            'term.help.ports': 'Recherche un port bien connu (numéro ou service)',
            'term.help.secheaders': 'Vérifie les en-têtes de sécurité HTTP d\'une URL',
            'term.cidr.usage': 'Usage: cidr [ip]/[préfixe]  (ex: cidr 192.168.1.10/24)',
            'term.cidr.invalid': 'Adresse IP ou préfixe invalide',
            'term.cidr.network': 'Réseau :',
            'term.cidr.broadcast': 'Broadcast :',
            'term.cidr.mask': 'Masque :',
            'term.cidr.wildcard': 'Masque inversé :',
            'term.cidr.hosts': 'Hôtes utilisables :',
            'term.cidr.range': 'Plage :',
            'term.ports.usage': 'Usage: ports [numéro ou nom de service]',
            'term.ports.none': 'Aucune correspondance trouvée',
            'term.secheaders.usage': 'Usage: secheaders [url]',
            'term.secheaders.checking': 'Vérification de {url}...',
            'term.secheaders.missing': '(absent)',
            'term.secheaders.error': 'Erreur : {err} (souvent un blocage CORS du site cible)',
            'term.help.pwd': 'Affiche le dossier courant',
            'term.help.ls': 'Liste le contenu du dossier',
            'term.help.cd': 'Change de dossier',
            'term.help.mkdir': 'Crée un dossier',
            'term.help.touch': 'Crée un fichier vide',
            'term.help.cat': 'Affiche le contenu d\'un fichier texte',
            'term.help.echoRedirect': 'Affiche un texte (ou écrit dans un fichier avec > / >>)',
            'term.help.rm': 'Supprime un fichier (ou -r pour un dossier)',
            'term.help.rmdir': 'Supprime un dossier vide',
            'term.help.mv': 'Déplace / renomme un fichier ou dossier',
            'term.help.cp': 'Copie un fichier ou dossier',
            'term.help.tree': 'Affiche l\'arborescence du dossier',
            'term.help.find': 'Recherche un fichier/dossier par nom',
            'term.fs.notFound': 'Introuvable : {name}',
            'term.fs.notDir': 'Ce n\'est pas un dossier : {name}',
            'term.fs.isDir': 'C\'est un dossier : {name}',
            'term.fs.empty': '(vide)',
            'term.fs.exists': 'Ce nom existe déjà : {name}',
            'term.fs.notEmpty': 'Dossier non vide (utilisez rm -r)',
            'term.fs.binary': 'Fichier binaire — utilisez l\'app Mes Fichiers pour le télécharger',
            'term.fs.quota': 'Stockage local plein — libérez de la place',
            'term.fs.tooLarge': 'Fichier trop volumineux (max {max})',
            'term.fs.rootProtected': 'Impossible de supprimer/déplacer la racine',
            'term.fs.ok': '✓',
            'term.pwd.usage': '',
            'term.ls.usage': 'Usage: ls [dossier]',
            'term.cd.usage': 'Usage: cd [dossier]',
            'term.mkdir.usage': 'Usage: mkdir [nom]',
            'term.touch.usage': 'Usage: touch [nom]',
            'term.cat.usage': 'Usage: cat [fichier]',
            'term.rm.usage': 'Usage: rm [-r] [fichier|dossier]',
            'term.rmdir.usage': 'Usage: rmdir [dossier]',
            'term.mv.usage': 'Usage: mv [source] [destination]',
            'term.cp.usage': 'Usage: cp [source] [destination]',
            'term.tree.usage': '',
            'term.find.usage': 'Usage: find [motif]',
            'term.find.none': 'Aucun résultat pour "{pattern}"',
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
            'term.ping.notifyFail': 'Ping to {host} failed',
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
            'term.help.base64': 'Encode / decode text as Base64',
            'term.help.hash': 'SHA-1 / SHA-256 digest of a text',
            'term.help.jwt': 'Decode a JWT token (header + payload)',
            'term.help.uuid': 'Generate one or more UUID v4',
            'term.help.json': 'Format or minify JSON',
            'term.help.color': 'Convert a color (hex / rgb / hsl)',
            'term.help.calc': 'Evaluate a math expression',
            'term.help.base': 'Convert a number between numeric bases',
            'term.help.httpstatus': 'Meaning of an HTTP status code',
            'term.base64.usage': 'Usage: base64 encode|decode [text]',
            'term.base64.error': 'Error: invalid Base64 string',
            'term.hash.usage': 'Usage: hash sha1|sha256 [text]',
            'term.hash.unsupported': 'Unsupported algorithm (sha1, sha256 only)',
            'term.hash.unavailable': 'Web Crypto unavailable (requires a secure context: https:// or localhost)',
            'term.jwt.usage': 'Usage: jwt [token]',
            'term.jwt.invalid': 'Invalid JWT token',
            'term.jwt.warning': '⚠ Signature not verified — content display only',
            'term.jwt.header': 'Header:',
            'term.jwt.payload': 'Payload:',
            'term.json.usage': 'Usage: json format|minify [json]',
            'term.json.invalid': 'Invalid JSON: {err}',
            'term.color.usage': 'Usage: color [#hex | rgb(...) | hsl(...)]',
            'term.color.invalid': 'Unrecognized color format',
            'term.color.hex': 'Hex:',
            'term.color.rgb': 'RGB:',
            'term.color.hsl': 'HSL:',
            'term.calc.usage': 'Usage: calc [expression]',
            'term.calc.error': 'Error: {err}',
            'term.base.usage': 'Usage: base [number] [from] [to]  (bin|oct|dec|hex or 2-36)',
            'term.base.invalidBase': 'Invalid base: {b}',
            'term.base.invalidNumber': 'Invalid number for base {b}',
            'term.httpstatus.usage': 'Usage: httpstatus [code]',
            'term.httpstatus.unknown': 'Unknown code: {code}',
            'term.help.wordcount': 'Count words, characters and reading time',
            'term.help.case': 'Transform case: upper/lower/title/camel/snake',
            'term.help.moyenne': 'Weighted average (grade:weight,grade:weight,...)',
            'term.help.ohm': "Ohm's law — set _ on the value to compute",
            'term.help.pythagore': 'Hypotenuse of a right triangle',
            'term.wordcount.usage': 'Usage: wordcount [text]',
            'term.wordcount.words': 'Words:',
            'term.wordcount.chars': 'Characters:',
            'term.wordcount.charsNoSpace': 'without spaces',
            'term.wordcount.readTime': 'Estimated reading time:',
            'term.case.usage': 'Usage: case upper|lower|title|camel|snake [text]',
            'term.moyenne.usage': 'Usage: moyenne grade:weight,grade:weight,...  (weight optional, default 1)',
            'term.moyenne.invalid': 'Invalid format: {p}',
            'term.moyenne.zeroCoef': 'Sum of weights is zero',
            'term.moyenne.result': 'Average: {avg} / 20  ({n} grades, total weight {coef})',
            'term.ohm.usage': "Usage: ohm [V] [I] [R]  (set _ on the value to compute)",
            'term.ohm.needOneUnknown': 'Specify exactly one unknown parameter with _',
            'term.ohm.invalidNumber': 'Invalid numeric value',
            'term.pythagore.usage': 'Usage: pythagore [side a] [side b]',
            'term.pythagore.invalid': 'Both sides must be positive numbers',
            'term.pythagore.result': 'Hypotenuse: {c}',
            'term.help.cidr': 'Subnet calculator (network, broadcast, host range)',
            'term.help.ports': 'Look up a well-known port (number or service)',
            'term.help.secheaders': 'Check the HTTP security headers of a URL',
            'term.cidr.usage': 'Usage: cidr [ip]/[prefix]  (e.g. cidr 192.168.1.10/24)',
            'term.cidr.invalid': 'Invalid IP address or prefix',
            'term.cidr.network': 'Network:',
            'term.cidr.broadcast': 'Broadcast:',
            'term.cidr.mask': 'Mask:',
            'term.cidr.wildcard': 'Wildcard mask:',
            'term.cidr.hosts': 'Usable hosts:',
            'term.cidr.range': 'Range:',
            'term.ports.usage': 'Usage: ports [number or service name]',
            'term.ports.none': 'No match found',
            'term.secheaders.usage': 'Usage: secheaders [url]',
            'term.secheaders.checking': 'Checking {url}...',
            'term.secheaders.missing': '(missing)',
            'term.secheaders.error': 'Error: {err} (often a CORS block from the target site)',
            'term.help.pwd': 'Show the current directory',
            'term.help.ls': 'List directory contents',
            'term.help.cd': 'Change directory',
            'term.help.mkdir': 'Create a directory',
            'term.help.touch': 'Create an empty file',
            'term.help.cat': 'Display a text file\'s content',
            'term.help.echoRedirect': 'Display text (or write to a file with > / >>)',
            'term.help.rm': 'Delete a file (or -r for a directory)',
            'term.help.rmdir': 'Delete an empty directory',
            'term.help.mv': 'Move / rename a file or directory',
            'term.help.cp': 'Copy a file or directory',
            'term.help.tree': 'Show the directory tree',
            'term.help.find': 'Search a file/directory by name',
            'term.fs.notFound': 'Not found: {name}',
            'term.fs.notDir': 'Not a directory: {name}',
            'term.fs.isDir': 'Is a directory: {name}',
            'term.fs.empty': '(empty)',
            'term.fs.exists': 'That name already exists: {name}',
            'term.fs.notEmpty': 'Directory not empty (use rm -r)',
            'term.fs.binary': 'Binary file — use the My Files app to download it',
            'term.fs.quota': 'Local storage is full — free up space',
            'term.fs.tooLarge': 'File too large (max {max})',
            'term.fs.rootProtected': 'Cannot remove/move the root directory',
            'term.fs.ok': '✓',
            'term.pwd.usage': '',
            'term.ls.usage': 'Usage: ls [directory]',
            'term.cd.usage': 'Usage: cd [directory]',
            'term.mkdir.usage': 'Usage: mkdir [name]',
            'term.touch.usage': 'Usage: touch [name]',
            'term.cat.usage': 'Usage: cat [file]',
            'term.rm.usage': 'Usage: rm [-r] [file|directory]',
            'term.rmdir.usage': 'Usage: rmdir [directory]',
            'term.mv.usage': 'Usage: mv [source] [destination]',
            'term.cp.usage': 'Usage: cp [source] [destination]',
            'term.tree.usage': '',
            'term.find.usage': 'Usage: find [pattern]',
            'term.find.none': 'No results for "{pattern}"',
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
            'term.ping.notifyFail': 'Fallo al hacer ping a {host}',
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
            'term.help.base64': 'Codificar / decodificar texto en Base64',
            'term.help.hash': 'Huella SHA-1 / SHA-256 de un texto',
            'term.help.jwt': 'Decodificar un token JWT (cabecera + payload)',
            'term.help.uuid': 'Generar uno o varios UUID v4',
            'term.help.json': 'Formatear o minificar JSON',
            'term.help.color': 'Convertir un color (hex / rgb / hsl)',
            'term.help.calc': 'Evaluar una expresión matemática',
            'term.help.base': 'Convertir un número entre bases numéricas',
            'term.help.httpstatus': 'Significado de un código de estado HTTP',
            'term.base64.usage': 'Uso: base64 encode|decode [texto]',
            'term.base64.error': 'Error: cadena Base64 inválida',
            'term.hash.usage': 'Uso: hash sha1|sha256 [texto]',
            'term.hash.unsupported': 'Algoritmo no soportado (solo sha1, sha256)',
            'term.hash.unavailable': 'Web Crypto no disponible (requiere un contexto seguro: https:// o localhost)',
            'term.jwt.usage': 'Uso: jwt [token]',
            'term.jwt.invalid': 'Token JWT inválido',
            'term.jwt.warning': '⚠ Firma no verificada — solo se muestra el contenido',
            'term.jwt.header': 'Cabecera:',
            'term.jwt.payload': 'Payload:',
            'term.json.usage': 'Uso: json format|minify [json]',
            'term.json.invalid': 'JSON inválido: {err}',
            'term.color.usage': 'Uso: color [#hex | rgb(...) | hsl(...)]',
            'term.color.invalid': 'Formato de color no reconocido',
            'term.color.hex': 'Hex:',
            'term.color.rgb': 'RGB:',
            'term.color.hsl': 'HSL:',
            'term.calc.usage': 'Uso: calc [expresión]',
            'term.calc.error': 'Error: {err}',
            'term.base.usage': 'Uso: base [número] [desde] [hasta]  (bin|oct|dec|hex o 2-36)',
            'term.base.invalidBase': 'Base inválida: {b}',
            'term.base.invalidNumber': 'Número inválido para la base {b}',
            'term.httpstatus.usage': 'Uso: httpstatus [código]',
            'term.httpstatus.unknown': 'Código desconocido: {code}',
            'term.help.wordcount': 'Cuenta palabras, caracteres y tiempo de lectura',
            'term.help.case': 'Transforma mayúsculas/minúsculas: upper/lower/title/camel/snake',
            'term.help.moyenne': 'Media ponderada (nota:peso,nota:peso,...)',
            'term.help.ohm': 'Ley de Ohm — pon _ en el valor a calcular',
            'term.help.pythagore': 'Hipotenusa de un triángulo rectángulo',
            'term.wordcount.usage': 'Uso: wordcount [texto]',
            'term.wordcount.words': 'Palabras:',
            'term.wordcount.chars': 'Caracteres:',
            'term.wordcount.charsNoSpace': 'sin espacios',
            'term.wordcount.readTime': 'Tiempo de lectura estimado:',
            'term.case.usage': 'Uso: case upper|lower|title|camel|snake [texto]',
            'term.moyenne.usage': 'Uso: moyenne nota:peso,nota:peso,...  (peso opcional, por defecto 1)',
            'term.moyenne.invalid': 'Formato inválido: {p}',
            'term.moyenne.zeroCoef': 'La suma de los pesos es cero',
            'term.moyenne.result': 'Media: {avg} / 20  ({n} notas, peso total {coef})',
            'term.ohm.usage': 'Uso: ohm [V] [I] [R]  (pon _ en el valor a calcular)',
            'term.ohm.needOneUnknown': 'Indica exactamente un parámetro desconocido con _',
            'term.ohm.invalidNumber': 'Valor numérico inválido',
            'term.pythagore.usage': 'Uso: pythagore [lado a] [lado b]',
            'term.pythagore.invalid': 'Ambos lados deben ser números positivos',
            'term.pythagore.result': 'Hipotenusa: {c}',
            'term.help.cidr': 'Calculadora de subred (red, broadcast, rango de hosts)',
            'term.help.ports': 'Busca un puerto conocido (número o servicio)',
            'term.help.secheaders': 'Verifica las cabeceras de seguridad HTTP de una URL',
            'term.cidr.usage': 'Uso: cidr [ip]/[prefijo]  (ej: cidr 192.168.1.10/24)',
            'term.cidr.invalid': 'Dirección IP o prefijo inválido',
            'term.cidr.network': 'Red:',
            'term.cidr.broadcast': 'Broadcast:',
            'term.cidr.mask': 'Máscara:',
            'term.cidr.wildcard': 'Máscara inversa:',
            'term.cidr.hosts': 'Hosts utilizables:',
            'term.cidr.range': 'Rango:',
            'term.ports.usage': 'Uso: ports [número o nombre de servicio]',
            'term.ports.none': 'Sin coincidencias',
            'term.secheaders.usage': 'Uso: secheaders [url]',
            'term.secheaders.checking': 'Comprobando {url}...',
            'term.secheaders.missing': '(ausente)',
            'term.secheaders.error': 'Error: {err} (a menudo un bloqueo CORS del sitio de destino)',
            'term.help.pwd': 'Muestra el directorio actual',
            'term.help.ls': 'Lista el contenido del directorio',
            'term.help.cd': 'Cambia de directorio',
            'term.help.mkdir': 'Crea un directorio',
            'term.help.touch': 'Crea un archivo vacío',
            'term.help.cat': 'Muestra el contenido de un archivo de texto',
            'term.help.echoRedirect': 'Muestra texto (o escribe en un archivo con > / >>)',
            'term.help.rm': 'Elimina un archivo (o -r para un directorio)',
            'term.help.rmdir': 'Elimina un directorio vacío',
            'term.help.mv': 'Mueve / renombra un archivo o directorio',
            'term.help.cp': 'Copia un archivo o directorio',
            'term.help.tree': 'Muestra el árbol del directorio',
            'term.help.find': 'Busca un archivo/directorio por nombre',
            'term.fs.notFound': 'No encontrado: {name}',
            'term.fs.notDir': 'No es un directorio: {name}',
            'term.fs.isDir': 'Es un directorio: {name}',
            'term.fs.empty': '(vacío)',
            'term.fs.exists': 'Ese nombre ya existe: {name}',
            'term.fs.notEmpty': 'Directorio no vacío (usa rm -r)',
            'term.fs.binary': 'Archivo binario — usa la app Mis Archivos para descargarlo',
            'term.fs.quota': 'Almacenamiento local lleno — libera espacio',
            'term.fs.tooLarge': 'Archivo demasiado grande (máx. {max})',
            'term.fs.rootProtected': 'No se puede eliminar/mover la raíz',
            'term.fs.ok': '✓',
            'term.pwd.usage': '',
            'term.ls.usage': 'Uso: ls [directorio]',
            'term.cd.usage': 'Uso: cd [directorio]',
            'term.mkdir.usage': 'Uso: mkdir [nombre]',
            'term.touch.usage': 'Uso: touch [nombre]',
            'term.cat.usage': 'Uso: cat [archivo]',
            'term.rm.usage': 'Uso: rm [-r] [archivo|directorio]',
            'term.rmdir.usage': 'Uso: rmdir [directorio]',
            'term.mv.usage': 'Uso: mv [origen] [destino]',
            'term.cp.usage': 'Uso: cp [origen] [destino]',
            'term.tree.usage': '',
            'term.find.usage': 'Uso: find [patrón]',
            'term.find.none': 'Sin resultados para "{pattern}"',
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
            'term.ping.notifyFail': 'Ping zu {host} fehlgeschlagen',
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
            'term.help.base64': 'Text als Base64 kodieren / dekodieren',
            'term.help.hash': 'SHA-1-/SHA-256-Prüfsumme eines Textes',
            'term.help.jwt': 'JWT-Token dekodieren (Header + Payload)',
            'term.help.uuid': 'Eine oder mehrere UUID v4 erzeugen',
            'term.help.json': 'JSON formatieren oder minimieren',
            'term.help.color': 'Farbe umwandeln (hex / rgb / hsl)',
            'term.help.calc': 'Mathematischen Ausdruck auswerten',
            'term.help.base': 'Zahl zwischen Zahlensystemen umwandeln',
            'term.help.httpstatus': 'Bedeutung eines HTTP-Statuscodes',
            'term.base64.usage': 'Verwendung: base64 encode|decode [text]',
            'term.base64.error': 'Fehler: ungültige Base64-Zeichenkette',
            'term.hash.usage': 'Verwendung: hash sha1|sha256 [text]',
            'term.hash.unsupported': 'Nicht unterstützter Algorithmus (nur sha1, sha256)',
            'term.hash.unavailable': 'Web Crypto nicht verfügbar (erfordert sicheren Kontext: https:// oder localhost)',
            'term.jwt.usage': 'Verwendung: jwt [token]',
            'term.jwt.invalid': 'Ungültiges JWT-Token',
            'term.jwt.warning': '⚠ Signatur nicht überprüft — nur Inhaltsanzeige',
            'term.jwt.header': 'Header:',
            'term.jwt.payload': 'Payload:',
            'term.json.usage': 'Verwendung: json format|minify [json]',
            'term.json.invalid': 'Ungültiges JSON: {err}',
            'term.color.usage': 'Verwendung: color [#hex | rgb(...) | hsl(...)]',
            'term.color.invalid': 'Farbformat nicht erkannt',
            'term.color.hex': 'Hex:',
            'term.color.rgb': 'RGB:',
            'term.color.hsl': 'HSL:',
            'term.calc.usage': 'Verwendung: calc [ausdruck]',
            'term.calc.error': 'Fehler: {err}',
            'term.base.usage': 'Verwendung: base [zahl] [von] [nach]  (bin|oct|dec|hex oder 2-36)',
            'term.base.invalidBase': 'Ungültiges Zahlensystem: {b}',
            'term.base.invalidNumber': 'Ungültige Zahl für Basis {b}',
            'term.httpstatus.usage': 'Verwendung: httpstatus [code]',
            'term.httpstatus.unknown': 'Unbekannter Code: {code}',
            'term.help.wordcount': 'Wörter, Zeichen und Lesezeit zählen',
            'term.help.case': 'Groß-/Kleinschreibung ändern: upper/lower/title/camel/snake',
            'term.help.moyenne': 'Gewichteter Durchschnitt (note:gewicht,note:gewicht,...)',
            'term.help.ohm': 'Ohmsches Gesetz — _ beim zu berechnenden Wert setzen',
            'term.help.pythagore': 'Hypotenuse eines rechtwinkligen Dreiecks',
            'term.wordcount.usage': 'Verwendung: wordcount [text]',
            'term.wordcount.words': 'Wörter:',
            'term.wordcount.chars': 'Zeichen:',
            'term.wordcount.charsNoSpace': 'ohne Leerzeichen',
            'term.wordcount.readTime': 'Geschätzte Lesezeit:',
            'term.case.usage': 'Verwendung: case upper|lower|title|camel|snake [text]',
            'term.moyenne.usage': 'Verwendung: moyenne note:gewicht,note:gewicht,...  (Gewicht optional, Standard 1)',
            'term.moyenne.invalid': 'Ungültiges Format: {p}',
            'term.moyenne.zeroCoef': 'Summe der Gewichte ist null',
            'term.moyenne.result': 'Durchschnitt: {avg} / 20  ({n} Noten, Gesamtgewicht {coef})',
            'term.ohm.usage': 'Verwendung: ohm [V] [I] [R]  (_ beim zu berechnenden Wert setzen)',
            'term.ohm.needOneUnknown': 'Geben Sie genau einen unbekannten Parameter mit _ an',
            'term.ohm.invalidNumber': 'Ungültiger Zahlenwert',
            'term.pythagore.usage': 'Verwendung: pythagore [Seite a] [Seite b]',
            'term.pythagore.invalid': 'Beide Seiten müssen positive Zahlen sein',
            'term.pythagore.result': 'Hypotenuse: {c}',
            'term.help.cidr': 'Subnetz-Rechner (Netz, Broadcast, Host-Bereich)',
            'term.help.ports': 'Bekannten Port nachschlagen (Nummer oder Dienst)',
            'term.help.secheaders': 'HTTP-Sicherheitsheader einer URL prüfen',
            'term.cidr.usage': 'Verwendung: cidr [ip]/[präfix]  (z.B. cidr 192.168.1.10/24)',
            'term.cidr.invalid': 'Ungültige IP-Adresse oder ungültiges Präfix',
            'term.cidr.network': 'Netz:',
            'term.cidr.broadcast': 'Broadcast:',
            'term.cidr.mask': 'Maske:',
            'term.cidr.wildcard': 'Wildcard-Maske:',
            'term.cidr.hosts': 'Nutzbare Hosts:',
            'term.cidr.range': 'Bereich:',
            'term.ports.usage': 'Verwendung: ports [nummer oder dienstname]',
            'term.ports.none': 'Keine Übereinstimmung gefunden',
            'term.secheaders.usage': 'Verwendung: secheaders [url]',
            'term.secheaders.checking': 'Prüfe {url}...',
            'term.secheaders.missing': '(fehlt)',
            'term.secheaders.error': 'Fehler: {err} (oft eine CORS-Blockierung der Zielseite)',
            'term.help.pwd': 'Aktuelles Verzeichnis anzeigen',
            'term.help.ls': 'Verzeichnisinhalt auflisten',
            'term.help.cd': 'Verzeichnis wechseln',
            'term.help.mkdir': 'Verzeichnis erstellen',
            'term.help.touch': 'Leere Datei erstellen',
            'term.help.cat': 'Inhalt einer Textdatei anzeigen',
            'term.help.echoRedirect': 'Text anzeigen (oder mit > / >> in Datei schreiben)',
            'term.help.rm': 'Datei löschen (oder -r für Verzeichnis)',
            'term.help.rmdir': 'Leeres Verzeichnis löschen',
            'term.help.mv': 'Datei/Verzeichnis verschieben oder umbenennen',
            'term.help.cp': 'Datei oder Verzeichnis kopieren',
            'term.help.tree': 'Verzeichnisbaum anzeigen',
            'term.help.find': 'Datei/Verzeichnis nach Namen suchen',
            'term.fs.notFound': 'Nicht gefunden: {name}',
            'term.fs.notDir': 'Kein Verzeichnis: {name}',
            'term.fs.isDir': 'Ist ein Verzeichnis: {name}',
            'term.fs.empty': '(leer)',
            'term.fs.exists': 'Dieser Name existiert bereits: {name}',
            'term.fs.notEmpty': 'Verzeichnis nicht leer (rm -r verwenden)',
            'term.fs.binary': 'Binärdatei — zum Herunterladen die App Meine Dateien verwenden',
            'term.fs.quota': 'Lokaler Speicher voll — Speicherplatz freigeben',
            'term.fs.tooLarge': 'Datei zu groß (max. {max})',
            'term.fs.rootProtected': 'Stammverzeichnis kann nicht entfernt/verschoben werden',
            'term.fs.ok': '✓',
            'term.pwd.usage': '',
            'term.ls.usage': 'Verwendung: ls [verzeichnis]',
            'term.cd.usage': 'Verwendung: cd [verzeichnis]',
            'term.mkdir.usage': 'Verwendung: mkdir [name]',
            'term.touch.usage': 'Verwendung: touch [name]',
            'term.cat.usage': 'Verwendung: cat [datei]',
            'term.rm.usage': 'Verwendung: rm [-r] [datei|verzeichnis]',
            'term.rmdir.usage': 'Verwendung: rmdir [verzeichnis]',
            'term.mv.usage': 'Verwendung: mv [quelle] [ziel]',
            'term.cp.usage': 'Verwendung: cp [quelle] [ziel]',
            'term.tree.usage': '',
            'term.find.usage': 'Verwendung: find [muster]',
            'term.find.none': 'Keine Ergebnisse für "{pattern}"',
            'term.fileWarning': '⚠ Datei lokal geöffnet (file://): einige Browser schränken ausgehende Netzwerkanfragen in diesem Modus ein. Wenn "myip", "dns", "whois" oder "ping" fehlschlagen, versuchen Sie, diese Datei über einen lokalen Server (z. B. "python -m http.server") bereitzustellen oder online zu hosten.'
        });

        OS.registry.register({
            id: 'sys-terminal', name: I18N.t('app.terminal'), nameKey: 'app.terminal', icon: ICONS.terminal, defaultWidth: 640, defaultHeight: 430,
            init: (c, api) => {
                c.innerHTML = `
                <div class="terminal-wrap">
                    <div class="term-output"><span class="t-green t-bold">WebOSx Net-Terminal v2.0</span>\n<span class="t-dim">${I18N.t('term.subtitle')}</span>\n\n</div>
                    <div class="term-input-row">
                        <span class="term-prompt-label" id="term-prompt-label">user@webosx:~$</span>
                        <input type="text" id="term-input" autocomplete="off" spellcheck="false">
                    </div>
                </div>`;
                const out = c.querySelector('.term-output'), inp = c.querySelector('#term-input');
                let history = [], histIdx = -1, busy = false;
                let cwd = []; // segments du chemin courant dans le VFS (chrooté à VFS.ROOT_NAME)
                function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
                function print(html) { out.innerHTML += html + '\n'; out.scrollTop = out.scrollHeight; }
                function promptLabelText() { return `user@webosx:${cwd.length ? VFS.pathToString(cwd) : '~'}$`; }
                function updatePromptLabel() { c.querySelector('#term-prompt-label').textContent = promptLabelText(); }
                function prompt(cmd) { print(`<span class="t-green t-bold">${esc(promptLabelText())}</span> <span class="t-white">${esc(cmd)}</span>`); }
                function setBusy(v) { busy = v; inp.disabled = v; if (!v) setTimeout(() => inp.focus(), 10); }

                function buildHelp() {
                    return `<span class="t-cyan">${I18N.t('term.help.header')}</span>\n`
                        + `  <span class="t-yellow">help</span>                - ${I18N.t('term.help.help')}\n`
                        + `  <span class="t-yellow">clear</span>               - ${I18N.t('term.help.clear')}\n`
                        + `  <span class="t-yellow">echo [txt] [>|>>][f]</span> - ${I18N.t('term.help.echoRedirect')}\n`
                        + `  <span class="t-yellow">myip</span>                - ${I18N.t('term.help.myip')}\n`
                        + `  <span class="t-yellow">geoip [ip]</span>          - ${I18N.t('term.help.geoip')}\n`
                        + `  <span class="t-yellow">dns [domaine] [type]</span> - ${I18N.t('term.help.dns')}\n`
                        + `  <span class="t-yellow">whois [domaine]</span>     - ${I18N.t('term.help.whois')}\n`
                        + `  <span class="t-yellow">ping [domaine]</span>      - ${I18N.t('term.help.ping')}\n`
                        + `  <span class="t-yellow">useragent</span>           - ${I18N.t('term.help.useragent')}\n`
                        + `  <span class="t-yellow">theme [h]</span>           - ${I18N.t('term.help.theme')}\n`
                        + `  <span class="t-yellow">calc [expr]</span>         - ${I18N.t('term.help.calc')}\n`
                        + `  <span class="t-yellow">base [n] [de] [vers]</span> - ${I18N.t('term.help.base')}\n`
                        + `  <span class="t-yellow">base64 en|de [txt]</span>  - ${I18N.t('term.help.base64')}\n`
                        + `  <span class="t-yellow">hash sha1|256 [txt]</span> - ${I18N.t('term.help.hash')}\n`
                        + `  <span class="t-yellow">jwt [token]</span>         - ${I18N.t('term.help.jwt')}\n`
                        + `  <span class="t-yellow">uuid [n]</span>            - ${I18N.t('term.help.uuid')}\n`
                        + `  <span class="t-yellow">json fmt|min [json]</span> - ${I18N.t('term.help.json')}\n`
                        + `  <span class="t-yellow">color [valeur]</span>      - ${I18N.t('term.help.color')}\n`
                        + `  <span class="t-yellow">httpstatus [code]</span>   - ${I18N.t('term.help.httpstatus')}\n`
                        + `  <span class="t-yellow">wordcount [texte]</span>   - ${I18N.t('term.help.wordcount')}\n`
                        + `  <span class="t-yellow">case [mode] [txt]</span>   - ${I18N.t('term.help.case')}\n`
                        + `  <span class="t-yellow">moyenne [n:c,...]</span>   - ${I18N.t('term.help.moyenne')}\n`
                        + `  <span class="t-yellow">ohm [V] [I] [R]</span>     - ${I18N.t('term.help.ohm')}\n`
                        + `  <span class="t-yellow">pythagore [a] [b]</span>   - ${I18N.t('term.help.pythagore')}\n`
                        + `  <span class="t-yellow">cidr [ip/préfixe]</span>   - ${I18N.t('term.help.cidr')}\n`
                        + `  <span class="t-yellow">ports [n° ou nom]</span>   - ${I18N.t('term.help.ports')}\n`
                        + `  <span class="t-yellow">secheaders [url]</span>    - ${I18N.t('term.help.secheaders')}\n`
                        + `  <span class="t-cyan">--- ${I18N.t('app.files')} ---</span>\n`
                        + `  <span class="t-yellow">pwd</span>                 - ${I18N.t('term.help.pwd')}\n`
                        + `  <span class="t-yellow">ls [dossier]</span>        - ${I18N.t('term.help.ls')}\n`
                        + `  <span class="t-yellow">cd [dossier]</span>        - ${I18N.t('term.help.cd')}\n`
                        + `  <span class="t-yellow">mkdir [nom]</span>         - ${I18N.t('term.help.mkdir')}\n`
                        + `  <span class="t-yellow">touch [nom]</span>         - ${I18N.t('term.help.touch')}\n`
                        + `  <span class="t-yellow">cat [fichier]</span>       - ${I18N.t('term.help.cat')}\n`
                        + `  <span class="t-yellow">rm [-r] [cible]</span>     - ${I18N.t('term.help.rm')}\n`
                        + `  <span class="t-yellow">rmdir [dossier]</span>     - ${I18N.t('term.help.rmdir')}\n`
                        + `  <span class="t-yellow">mv [src] [dst]</span>      - ${I18N.t('term.help.mv')}\n`
                        + `  <span class="t-yellow">cp [src] [dst]</span>      - ${I18N.t('term.help.cp')}\n`
                        + `  <span class="t-yellow">tree [dossier]</span>      - ${I18N.t('term.help.tree')}\n`
                        + `  <span class="t-yellow">find [motif]</span>        - ${I18N.t('term.help.find')}`;
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
                        // Notification de fin de tâche : utile si l'utilisateur a basculé
                        // sur une autre fenêtre pendant les ~1s que prend le ping.
                        UI.notify({ title: I18N.t('app.terminal'), message: `ping ${host} — ${avg}ms`, type: 'success', duration: 4000 });
                    } else {
                        UI.notify({ title: I18N.t('app.terminal'), message: I18N.t('term.ping.notifyFail', { host }), type: 'warning', duration: 5000 });
                    }
                }

                function cmdUseragent() {
                    print(`<span class="t-white">${I18N.t('term.ua.label')}</span> ${esc(navigator.userAgent)}\n<span class="t-white">${I18N.t('term.ua.platform')}</span> ${esc(navigator.platform || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.ua.lang')}</span> ${esc(navigator.language)}\n<span class="t-white">${I18N.t('term.ua.resolution')}</span> ${window.screen.width}x${window.screen.height}\n<span class="t-white">${I18N.t('term.ua.cores')}</span> ${esc(navigator.hardwareConcurrency || I18N.t('term.unknown'))}\n<span class="t-white">${I18N.t('term.ua.online')}</span> ${navigator.onLine ? I18N.t('term.yes') : I18N.t('term.no')}`);
                }

                // ---- Utilitaires ajoutés : encodage, hash, JSON, couleurs, calcul, bases ----
                // Tous 100% client, aucune dépendance externe, aucune requête réseau.

                function utf8ToBytes(str) { return new TextEncoder().encode(str); }
                function bytesToUtf8(bytes) { return new TextDecoder().decode(bytes); }

                function b64EncodeUtf8(str) {
                    const bytes = utf8ToBytes(str);
                    let bin = '';
                    bytes.forEach(b => bin += String.fromCharCode(b));
                    return btoa(bin);
                }
                function b64DecodeUtf8(b64) {
                    const bin = atob(b64);
                    const bytes = new Uint8Array(bin.length);
                    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
                    return bytesToUtf8(bytes);
                }

                function cmdBase64(mode, rest) {
                    mode = (mode || '').toLowerCase();
                    if ((mode !== 'encode' && mode !== 'decode') || !rest) { print(`<span class="t-red">${I18N.t('term.base64.usage')}</span>`); return; }
                    try {
                        const result = mode === 'encode' ? b64EncodeUtf8(rest) : b64DecodeUtf8(rest);
                        print(`<span class="t-white">${esc(result)}</span>`);
                    } catch (err) {
                        print(`<span class="t-red">${I18N.t('term.base64.error')}</span>`);
                    }
                }

                async function cmdHash(algo, rest) {
                    const map = { sha1: 'SHA-1', sha256: 'SHA-256' };
                    const alg = map[(algo || '').toLowerCase()];
                    if (!alg || !rest) { print(`<span class="t-red">${I18N.t('term.hash.usage')}</span>`); return; }
                    if (!window.crypto || !window.crypto.subtle) { print(`<span class="t-red">${I18N.t('term.hash.unavailable')}</span>`); return; }
                    try {
                        const buf = await crypto.subtle.digest(alg, utf8ToBytes(rest));
                        const hex = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
                        print(`<span class="t-cyan">${hex}</span>`);
                    } catch (err) {
                        print(`<span class="t-red">${I18N.t('term.hash.unavailable')}</span>`);
                    }
                }

                function cmdJwt(token) {
                    if (!token) { print(`<span class="t-red">${I18N.t('term.jwt.usage')}</span>`); return; }
                    const parts = token.split('.');
                    if (parts.length < 2) { print(`<span class="t-red">${I18N.t('term.jwt.invalid')}</span>`); return; }
                    try {
                        const b64url = (seg) => { seg = seg.replace(/-/g, '+').replace(/_/g, '/'); while (seg.length % 4) seg += '='; return b64DecodeUtf8(seg); };
                        const header = JSON.parse(b64url(parts[0]));
                        const payload = JSON.parse(b64url(parts[1]));
                        print(`<span class="t-yellow">${I18N.t('term.jwt.warning')}</span>\n<span class="t-cyan">${I18N.t('term.jwt.header')}</span>\n${esc(JSON.stringify(header, null, 2))}\n<span class="t-cyan">${I18N.t('term.jwt.payload')}</span>\n${esc(JSON.stringify(payload, null, 2))}`);
                    } catch (err) {
                        print(`<span class="t-red">${I18N.t('term.jwt.invalid')}</span>`);
                    }
                }

                function genUuidV4() {
                    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
                    const bytes = crypto.getRandomValues(new Uint8Array(16));
                    bytes[6] = (bytes[6] & 0x0f) | 0x40; bytes[8] = (bytes[8] & 0x3f) | 0x80;
                    const hex = [...bytes].map(b => b.toString(16).padStart(2, '0'));
                    return `${hex.slice(0,4).join('')}-${hex.slice(4,6).join('')}-${hex.slice(6,8).join('')}-${hex.slice(8,10).join('')}-${hex.slice(10,16).join('')}`;
                }
                function cmdUuid(nArg) {
                    const n = Math.min(Math.max(parseInt(nArg) || 1, 1), 20);
                    let lines = [];
                    for (let i = 0; i < n; i++) lines.push(genUuidV4());
                    print(`<span class="t-cyan">${lines.join('\n')}</span>`);
                }

                function cmdJson(mode, rest) {
                    mode = (mode || '').toLowerCase();
                    if ((mode !== 'format' && mode !== 'minify') || !rest) { print(`<span class="t-red">${I18N.t('term.json.usage')}</span>`); return; }
                    try {
                        const obj = JSON.parse(rest);
                        const out = mode === 'format' ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
                        print(`<span class="t-white">${esc(out)}</span>`);
                    } catch (err) {
                        print(`<span class="t-red">${I18N.t('term.json.invalid', { err: esc(err.message) })}</span>`);
                    }
                }

                function rgbToHex(r, g, b) { return '#' + [r, g, b].map(x => Math.round(Math.min(255, Math.max(0, x))).toString(16).padStart(2, '0')).join(''); }
                function rgbToHsl(r, g, b) {
                    r /= 255; g /= 255; b /= 255;
                    const max = Math.max(r, g, b), min = Math.min(r, g, b);
                    let h, s, l = (max + min) / 2;
                    if (max === min) { h = s = 0; }
                    else {
                        const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
                        h /= 6;
                    }
                    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
                }
                function hslToRgbLocal(h, s, l) {
                    h = ((h % 360) + 360) % 360 / 360; s /= 100; l /= 100;
                    if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
                    const hue2rgb = (t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
                    return { r: Math.round(hue2rgb(h + 1 / 3) * 255), g: Math.round(hue2rgb(h) * 255), b: Math.round(hue2rgb(h - 1 / 3) * 255) };
                }
                function parseColorInput(input) {
                    input = input.trim();
                    let m;
                    if ((m = /^#?([0-9a-f]{3})$/i.exec(input))) { const [r, g, b] = m[1].split('').map(c => parseInt(c + c, 16)); return { r, g, b }; }
                    if ((m = /^#?([0-9a-f]{6})$/i.exec(input))) { const hex = m[1]; return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16) }; }
                    if ((m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(input))) { return { r: +m[1], g: +m[2], b: +m[3] }; }
                    if ((m = /^hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%/i.exec(input))) { return hslToRgbLocal(+m[1], +m[2], +m[3]); }
                    return null;
                }
                function cmdColor(input) {
                    if (!input) { print(`<span class="t-red">${I18N.t('term.color.usage')}</span>`); return; }
                    const rgb = parseColorInput(input);
                    if (!rgb) { print(`<span class="t-red">${I18N.t('term.color.invalid')}</span>`); return; }
                    const hex = rgbToHex(rgb.r, rgb.g, rgb.b), hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                    const swatch = `<span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${esc(hex)};border:1px solid rgba(255,255,255,0.3);vertical-align:-1px;margin-right:6px;"></span>`;
                    print(`${swatch}<span class="t-white">${I18N.t('term.color.hex')}</span> <span class="t-cyan">${hex}</span>\n<span class="t-white">${I18N.t('term.color.rgb')}</span> <span class="t-cyan">rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</span>\n<span class="t-white">${I18N.t('term.color.hsl')}</span> <span class="t-cyan">hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</span>`);
                }

                // Évaluateur d'expressions mathématiques "maison" (récursif-descendant),
                // volontairement SANS eval()/Function() pour ne jamais exécuter de code
                // arbitraire — seuls les nombres, opérateurs, parenthèses et un jeu de
                // fonctions/constantes whitelistées sont reconnus.
                function safeCalc(expr) {
                    const funcs = { sqrt: Math.sqrt, abs: Math.abs, floor: Math.floor, ceil: Math.ceil, round: Math.round, sin: Math.sin, cos: Math.cos, tan: Math.tan, log: Math.log10, ln: Math.log, exp: Math.exp, pow: Math.pow, min: Math.min, max: Math.max };
                    const consts = { pi: Math.PI, e: Math.E };
                    const s = expr.replace(/\s+/g, '');
                    let i = 0;
                    const peek = () => s[i];
                    const err = (msg) => { throw new Error(msg); };
                    function parseExpr() { let v = parseTerm(); while (peek() === '+' || peek() === '-') { const op = s[i++]; const rhs = parseTerm(); v = op === '+' ? v + rhs : v - rhs; } return v; }
                    function parseTerm() { let v = parseFactor(); while (peek() === '*' || peek() === '/' || peek() === '%') { const op = s[i++]; const rhs = parseFactor(); v = op === '*' ? v * rhs : op === '/' ? v / rhs : v % rhs; } return v; }
                    function parseFactor() { let v = parseUnary(); while (peek() === '^') { i++; v = Math.pow(v, parseUnary()); } return v; }
                    function parseUnary() { if (peek() === '-') { i++; return -parseUnary(); } if (peek() === '+') { i++; return parseUnary(); } return parseAtom(); }
                    function parseAtom() {
                        if (peek() === '(') { i++; const v = parseExpr(); if (peek() !== ')') err('parenthèse manquante'); i++; return v; }
                        const m = /^[a-zA-Z_]+/.exec(s.slice(i));
                        if (m) {
                            const name = m[0]; i += name.length;
                            if (peek() === '(') {
                                i++; const args = [parseExpr()];
                                while (peek() === ',') { i++; args.push(parseExpr()); }
                                if (peek() !== ')') err('parenthèse manquante'); i++;
                                if (!funcs[name]) err('fonction inconnue: ' + name);
                                return funcs[name](...args);
                            }
                            if (consts[name] !== undefined) return consts[name];
                            err('symbole inconnu: ' + name);
                        }
                        const numMatch = /^[0-9]*\.?[0-9]+/.exec(s.slice(i));
                        if (!numMatch) err('expression invalide');
                        i += numMatch[0].length;
                        return parseFloat(numMatch[0]);
                    }
                    if (!s) err('expression vide');
                    const result = parseExpr();
                    if (i < s.length) err('caractère inattendu: ' + s[i]);
                    if (!isFinite(result)) err('résultat non fini');
                    return result;
                }
                function cmdCalc(expr) {
                    if (!expr) { print(`<span class="t-red">${I18N.t('term.calc.usage')}</span>`); return; }
                    try {
                        const result = safeCalc(expr);
                        print(`<span class="t-cyan">${result}</span>`);
                    } catch (err) {
                        print(`<span class="t-red">${I18N.t('term.calc.error', { err: esc(err.message) })}</span>`);
                    }
                }

                function parseBaseArg(b) {
                    const map = { bin: 2, oct: 8, dec: 10, hex: 16 };
                    if (map[(b || '').toLowerCase()]) return map[b.toLowerCase()];
                    const n = parseInt(b, 10);
                    return (!isNaN(n) && n >= 2 && n <= 36) ? n : null;
                }
                function cmdBase(num, fromArg, toArg) {
                    if (!num || !fromArg || !toArg) { print(`<span class="t-red">${I18N.t('term.base.usage')}</span>`); return; }
                    const from = parseBaseArg(fromArg), to = parseBaseArg(toArg);
                    if (!from) { print(`<span class="t-red">${I18N.t('term.base.invalidBase', { b: esc(fromArg) })}</span>`); return; }
                    if (!to) { print(`<span class="t-red">${I18N.t('term.base.invalidBase', { b: esc(toArg) })}</span>`); return; }
                    const n = parseInt(num, from);
                    if (isNaN(n)) { print(`<span class="t-red">${I18N.t('term.base.invalidNumber', { b: esc(fromArg) })}</span>`); return; }
                    print(`<span class="t-cyan">${n.toString(to).toUpperCase()}</span>`);
                }

                const HTTP_STATUS_CODES = {
                    100: 'Continue', 101: 'Switching Protocols',
                    200: 'OK', 201: 'Created', 202: 'Accepted', 204: 'No Content', 206: 'Partial Content',
                    301: 'Moved Permanently', 302: 'Found', 303: 'See Other', 304: 'Not Modified', 307: 'Temporary Redirect', 308: 'Permanent Redirect',
                    400: 'Bad Request', 401: 'Unauthorized', 402: 'Payment Required', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed',
                    406: 'Not Acceptable', 408: 'Request Timeout', 409: 'Conflict', 410: 'Gone', 415: 'Unsupported Media Type',
                    418: "I'm a Teapot", 422: 'Unprocessable Entity', 425: 'Too Early', 429: 'Too Many Requests',
                    500: 'Internal Server Error', 501: 'Not Implemented', 502: 'Bad Gateway', 503: 'Service Unavailable', 504: 'Gateway Timeout'
                };
                function cmdHttpstatus(code) {
                    if (!code) { print(`<span class="t-red">${I18N.t('term.httpstatus.usage')}</span>`); return; }
                    const n = parseInt(code);
                    const desc = HTTP_STATUS_CODES[n];
                    if (!desc) { print(`<span class="t-red">${I18N.t('term.httpstatus.unknown', { code: esc(code) })}</span>`); return; }
                    const cls = n < 300 ? 't-green' : n < 400 ? 't-cyan' : n < 500 ? 't-yellow' : 't-red';
                    print(`<span class="${cls} t-bold">${n}</span> <span class="t-white">${esc(desc)}</span>`);
                }

                // ---- Rédaction / Enseignement ----
                function cmdWordcount(text) {
                    if (!text) { print(`<span class="t-red">${I18N.t('term.wordcount.usage')}</span>`); return; }
                    const words = text.trim().split(/\s+/).filter(Boolean);
                    const chars = text.length;
                    const charsNoSpace = text.replace(/\s+/g, '').length;
                    const minutes = words.length / 200; // ~200 mots/minute, vitesse de lecture moyenne
                    const readTime = minutes < 1 ? `${Math.max(1, Math.round(minutes * 60))}s` : `${Math.round(minutes)} min`;
                    print(`<span class="t-white">${I18N.t('term.wordcount.words')}</span> <span class="t-cyan">${words.length}</span>\n<span class="t-white">${I18N.t('term.wordcount.chars')}</span> <span class="t-cyan">${chars}</span> (${charsNoSpace} ${I18N.t('term.wordcount.charsNoSpace')})\n<span class="t-white">${I18N.t('term.wordcount.readTime')}</span> <span class="t-cyan">${readTime}</span>`);
                }

                function toTitleCase(s) { return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); }
                function toCamelCase(s) { return s.trim().split(/[\s_-]+/).filter(Boolean).map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()).join(''); }
                function toSnakeCase(s) { return s.trim().split(/[\s-]+/).filter(Boolean).join('_').toLowerCase(); }
                function cmdCase(mode, text) {
                    mode = (mode || '').toLowerCase();
                    if (!text || !['upper', 'lower', 'title', 'camel', 'snake'].includes(mode)) { print(`<span class="t-red">${I18N.t('term.case.usage')}</span>`); return; }
                    const out = mode === 'upper' ? text.toUpperCase()
                        : mode === 'lower' ? text.toLowerCase()
                        : mode === 'title' ? toTitleCase(text)
                        : mode === 'camel' ? toCamelCase(text)
                        : toSnakeCase(text);
                    print(`<span class="t-white">${esc(out)}</span>`);
                }

                function cmdMoyenne(arg) {
                    if (!arg) { print(`<span class="t-red">${I18N.t('term.moyenne.usage')}</span>`); return; }
                    const pairs = arg.split(',').map(p => p.trim()).filter(Boolean);
                    let totalPoints = 0, totalCoef = 0;
                    for (const p of pairs) {
                        const [noteStr, coefStr] = p.split(':');
                        const note = parseFloat(noteStr);
                        const coef = coefStr !== undefined ? parseFloat(coefStr) : 1;
                        if (isNaN(note) || isNaN(coef)) { print(`<span class="t-red">${I18N.t('term.moyenne.invalid', { p: esc(p) })}</span>`); return; }
                        totalPoints += note * coef; totalCoef += coef;
                    }
                    if (totalCoef === 0) { print(`<span class="t-red">${I18N.t('term.moyenne.zeroCoef')}</span>`); return; }
                    const avg = (totalPoints / totalCoef).toFixed(2);
                    print(`<span class="t-cyan">${I18N.t('term.moyenne.result', { avg, n: pairs.length, coef: totalCoef })}</span>`);
                }

                // ---- Bâtiment / Électricité ----
                function cmdOhm(vArg, iArg, rArg) {
                    if (!vArg || !iArg || !rArg) { print(`<span class="t-red">${I18N.t('term.ohm.usage')}</span>`); return; }
                    const parseOrNull = (s) => (s === '_' || s === '?') ? null : parseFloat(s);
                    const v = parseOrNull(vArg), i = parseOrNull(iArg), r = parseOrNull(rArg);
                    const unknowns = [v, i, r].filter(x => x === null).length;
                    if (unknowns !== 1) { print(`<span class="t-red">${I18N.t('term.ohm.needOneUnknown')}</span>`); return; }
                    if ([v, i, r].some(x => x !== null && isNaN(x))) { print(`<span class="t-red">${I18N.t('term.ohm.invalidNumber')}</span>`); return; }
                    if (v === null) print(`<span class="t-cyan">V = ${(i * r).toFixed(3)} V</span>`);
                    else if (i === null) print(`<span class="t-cyan">I = ${(v / r).toFixed(3)} A</span>`);
                    else print(`<span class="t-cyan">R = ${(v / i).toFixed(3)} Ω</span>`);
                }

                function cmdPythagore(aArg, bArg) {
                    if (!aArg || !bArg) { print(`<span class="t-red">${I18N.t('term.pythagore.usage')}</span>`); return; }
                    const a = parseFloat(aArg), b = parseFloat(bArg);
                    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) { print(`<span class="t-red">${I18N.t('term.pythagore.invalid')}</span>`); return; }
                    const c = Math.sqrt(a * a + b * b);
                    print(`<span class="t-cyan">${I18N.t('term.pythagore.result', { c: c.toFixed(3) })}</span>`);
                }

                // ---- Réseau (calcul / référence, aucune vraie sonde réseau bas niveau :
                // un navigateur n'a pas accès aux sockets bruts / ICMP, contrairement à
                // un vrai traceroute ou scanner de ports) ----
                function ipToInt(ip) {
                    const parts = ip.split('.').map(Number);
                    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
                    return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
                }
                function intToIp(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); }
                function cmdCidr(arg) {
                    if (!arg || !arg.includes('/')) { print(`<span class="t-red">${I18N.t('term.cidr.usage')}</span>`); return; }
                    const [ipStr, prefixStr] = arg.split('/');
                    const prefix = parseInt(prefixStr, 10);
                    const ip = ipToInt(ipStr);
                    if (ip === null || isNaN(prefix) || prefix < 0 || prefix > 32) { print(`<span class="t-red">${I18N.t('term.cidr.invalid')}</span>`); return; }
                    const maskBits = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
                    const network = (ip & maskBits) >>> 0;
                    const broadcast = (network | (~maskBits >>> 0)) >>> 0;
                    const wildcard = (~maskBits) >>> 0;
                    const totalHosts = Math.pow(2, 32 - prefix);
                    const usable = prefix >= 31 ? 0 : totalHosts - 2;
                    const firstHost = prefix >= 31 ? network : network + 1;
                    const lastHost = prefix >= 31 ? broadcast : broadcast - 1;
                    print(`<span class="t-white">${I18N.t('term.cidr.network')}</span> <span class="t-cyan">${intToIp(network)}/${prefix}</span>\n<span class="t-white">${I18N.t('term.cidr.mask')}</span> <span class="t-cyan">${intToIp(maskBits)}</span>\n<span class="t-white">${I18N.t('term.cidr.wildcard')}</span> <span class="t-cyan">${intToIp(wildcard)}</span>\n<span class="t-white">${I18N.t('term.cidr.broadcast')}</span> <span class="t-cyan">${intToIp(broadcast)}</span>\n<span class="t-white">${I18N.t('term.cidr.hosts')}</span> <span class="t-cyan">${usable}</span>\n<span class="t-white">${I18N.t('term.cidr.range')}</span> <span class="t-cyan">${intToIp(firstHost)} - ${intToIp(lastHost)}</span>`);
                }

                const WELL_KNOWN_PORTS = {
                    20: 'FTP (données)', 21: 'FTP (contrôle)', 22: 'SSH', 23: 'Telnet', 25: 'SMTP',
                    53: 'DNS', 67: 'DHCP (serveur)', 68: 'DHCP (client)', 69: 'TFTP', 80: 'HTTP',
                    110: 'POP3', 119: 'NNTP', 123: 'NTP', 143: 'IMAP', 161: 'SNMP', 194: 'IRC',
                    389: 'LDAP', 443: 'HTTPS', 445: 'SMB', 465: 'SMTPS', 514: 'Syslog',
                    587: 'SMTP (submission)', 631: 'IPP', 636: 'LDAPS', 993: 'IMAPS', 995: 'POP3S',
                    1433: 'MSSQL', 1521: 'Oracle DB', 2049: 'NFS', 3306: 'MySQL/MariaDB',
                    3389: 'RDP', 5432: 'PostgreSQL', 5900: 'VNC', 5984: 'CouchDB', 6379: 'Redis',
                    8080: 'HTTP (alt)', 8443: 'HTTPS (alt)', 9200: 'Elasticsearch', 27017: 'MongoDB'
                };
                function cmdPorts(query) {
                    if (!query) { print(`<span class="t-red">${I18N.t('term.ports.usage')}</span>`); return; }
                    const asNum = parseInt(query, 10);
                    if (!isNaN(asNum) && String(asNum) === query.trim()) {
                        const name = WELL_KNOWN_PORTS[asNum];
                        print(name ? `<span class="t-cyan">${asNum}</span> — <span class="t-white">${esc(name)}</span>` : `<span class="t-yellow">${I18N.t('term.ports.none')}</span>`);
                        return;
                    }
                    const q = query.toLowerCase();
                    const matches = Object.entries(WELL_KNOWN_PORTS).filter(([, name]) => name.toLowerCase().includes(q));
                    if (!matches.length) { print(`<span class="t-yellow">${I18N.t('term.ports.none')}</span>`); return; }
                    print(matches.map(([port, name]) => `<span class="t-cyan">${port}</span> — <span class="t-white">${esc(name)}</span>`).join('\n'));
                }

                const SECURITY_HEADERS = ['strict-transport-security', 'content-security-policy', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy'];
                async function cmdSecheaders(urlArg) {
                    if (!urlArg) { print(`<span class="t-red">${I18N.t('term.secheaders.usage')}</span>`); return; }
                    const url = /^https?:\/\//i.test(urlArg) ? urlArg : `https://${urlArg}`;
                    print(`<span class="t-dim">${I18N.t('term.secheaders.checking', { url: esc(url) })}</span>`);
                    try {
                        const r = await fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store' });
                        const lines = SECURITY_HEADERS.map(h => {
                            const v = r.headers.get(h);
                            return v
                                ? `<span class="t-green">✓</span> <span class="t-white">${h}</span> : <span class="t-cyan">${esc(v)}</span>`
                                : `<span class="t-red">✗</span> <span class="t-white">${h}</span> <span class="t-dim">${I18N.t('term.secheaders.missing')}</span>`;
                        });
                        print(lines.join('\n'));
                    } catch (err) {
                        print(`<span class="t-red">${I18N.t('term.secheaders.error', { err: esc(err.message) })}</span>`);
                        if (location.protocol === 'file:') print(`<span class="t-yellow">${I18N.t('term.fileHint')}</span>`);
                    }
                }

                // ---- Système de fichiers virtuel (VFS, voir js/core/vfs.js) ----
                // Toutes ces commandes opèrent sur le même VFS que l'app "Mes Fichiers" :
                // un fichier créé ici avec touch/echo apparaît immédiatement dans
                // l'explorateur graphique, et inversement.
                function cmdPwd() { print(`<span class="t-white">${esc(VFS.pathToString(cwd))}</span>`); }

                async function cmdLs(argPath) {
                    const segs = argPath ? VFS.resolvePath(cwd, argPath) : cwd;
                    const items = await VFS.list(segs);
                    if (items === null) { print(`<span class="t-red">${I18N.t('term.fs.notDir', { name: esc(argPath || VFS.pathToString(segs)) })}</span>`); return; }
                    if (!items.length) { print(`<span class="t-dim">${I18N.t('term.fs.empty')}</span>`); return; }
                    print(items.map(it => {
                        const cls = it.type === 'dir' ? 't-cyan' : 't-white';
                        const suffix = it.type === 'dir' ? '/' : '';
                        const size = it.type === 'dir' ? '' : `  <span class="t-dim">${VFS.formatSize(it.size)}</span>`;
                        return `<span class="${cls}">${esc(it.name)}${suffix}</span>${size}`;
                    }).join('\n'));
                }

                async function cmdCd(argPath) {
                    if (!argPath || argPath === '~') { cwd = []; updatePromptLabel(); return; }
                    const segs = VFS.resolvePath(cwd, argPath);
                    if (!(await VFS.isDir(segs))) { print(`<span class="t-red">${I18N.t('term.fs.notDir', { name: esc(argPath) })}</span>`); return; }
                    cwd = segs;
                    updatePromptLabel();
                }

                async function cmdMkdir(name) {
                    if (!name) { print(`<span class="t-red">${I18N.t('term.mkdir.usage')}</span>`); return; }
                    const r = await VFS.mkdir(VFS.resolvePath(cwd, name));
                    if (r.error === 'exists') print(`<span class="t-red">${I18N.t('term.fs.exists', { name: esc(name) })}</span>`);
                    else if (r.error) print(`<span class="t-red">${I18N.t('term.fs.notFound', { name: esc(name) })}</span>`);
                    else print(`<span class="t-green">${I18N.t('term.fs.ok')}</span>`);
                }

                async function cmdTouch(name) {
                    if (!name) { print(`<span class="t-red">${I18N.t('term.touch.usage')}</span>`); return; }
                    const r = await VFS.touch(VFS.resolvePath(cwd, name));
                    if (r.error) print(`<span class="t-red">${I18N.t('term.fs.notFound', { name: esc(name) })}</span>`);
                    else print(`<span class="t-green">${I18N.t('term.fs.ok')}</span>`);
                }

                async function cmdCat(name) {
                    if (!name) { print(`<span class="t-red">${I18N.t('term.cat.usage')}</span>`); return; }
                    const r = await VFS.readFileAsText(VFS.resolvePath(cwd, name));
                    if (r.error === 'isDir') { print(`<span class="t-red">${I18N.t('term.fs.isDir', { name: esc(name) })}</span>`); return; }
                    if (r.error === 'binary') { print(`<span class="t-yellow">${I18N.t('term.fs.binary')}</span>`); return; }
                    if (r.error) { print(`<span class="t-red">${I18N.t('term.fs.notFound', { name: esc(name) })}</span>`); return; }
                    print(`<span class="t-white">${esc(r.content) || I18N.t('term.fs.empty')}</span>`);
                }

                async function cmdRm(rest) {
                    let recursive = false, target = rest[0];
                    if (target === '-r') { recursive = true; target = rest[1]; }
                    if (!target) { print(`<span class="t-red">${I18N.t('term.rm.usage')}</span>`); return; }
                    const segs = VFS.resolvePath(cwd, target);
                    if (segs.length === 0) { print(`<span class="t-red">${I18N.t('term.fs.rootProtected')}</span>`); return; }
                    const r = await VFS.remove(segs, recursive);
                    if (r.error === 'notEmpty') print(`<span class="t-red">${I18N.t('term.fs.notEmpty')}</span>`);
                    else if (r.error) print(`<span class="t-red">${I18N.t('term.fs.notFound', { name: esc(target) })}</span>`);
                    else print(`<span class="t-green">${I18N.t('term.fs.ok')}</span>`);
                }

                async function cmdRmdir(name) {
                    if (!name) { print(`<span class="t-red">${I18N.t('term.rmdir.usage')}</span>`); return; }
                    const segs = VFS.resolvePath(cwd, name);
                    if (segs.length === 0) { print(`<span class="t-red">${I18N.t('term.fs.rootProtected')}</span>`); return; }
                    const r = await VFS.remove(segs, false);
                    if (r.error === 'notEmpty') print(`<span class="t-red">${I18N.t('term.fs.notEmpty')}</span>`);
                    else if (r.error) print(`<span class="t-red">${I18N.t('term.fs.notFound', { name: esc(name) })}</span>`);
                    else print(`<span class="t-green">${I18N.t('term.fs.ok')}</span>`);
                }

                async function cmdMv(src, dst) {
                    if (!src || !dst) { print(`<span class="t-red">${I18N.t('term.mv.usage')}</span>`); return; }
                    const s = VFS.resolvePath(cwd, src);
                    if (s.length === 0) { print(`<span class="t-red">${I18N.t('term.fs.rootProtected')}</span>`); return; }
                    const r = await VFS.rename(s, VFS.resolvePath(cwd, dst));
                    if (r.error === 'exists') print(`<span class="t-red">${I18N.t('term.fs.exists', { name: esc(dst) })}</span>`);
                    else if (r.error) print(`<span class="t-red">${I18N.t('term.fs.notFound', { name: esc(src) })}</span>`);
                    else print(`<span class="t-green">${I18N.t('term.fs.ok')}</span>`);
                }

                async function cmdCp(src, dst) {
                    if (!src || !dst) { print(`<span class="t-red">${I18N.t('term.cp.usage')}</span>`); return; }
                    const r = await VFS.copy(VFS.resolvePath(cwd, src), VFS.resolvePath(cwd, dst));
                    if (r.error === 'exists') print(`<span class="t-red">${I18N.t('term.fs.exists', { name: esc(dst) })}</span>`);
                    else if (r.error) print(`<span class="t-red">${I18N.t('term.fs.notFound', { name: esc(src) })}</span>`);
                    else print(`<span class="t-green">${I18N.t('term.fs.ok')}</span>`);
                }

                async function cmdTree(argPath) {
                    const segs = argPath ? VFS.resolvePath(cwd, argPath) : cwd;
                    if (!(await VFS.isDir(segs))) { print(`<span class="t-red">${I18N.t('term.fs.notDir', { name: esc(argPath || VFS.pathToString(segs)) })}</span>`); return; }
                    const lines = [];
                    async function walk(s, prefix) {
                        const items = await VFS.list(s) || [];
                        for (let idx = 0; idx < items.length; idx++) {
                            const it = items[idx];
                            const last = idx === items.length - 1;
                            const branch = prefix + (last ? '└── ' : '├── ');
                            lines.push(it.type === 'dir' ? `${branch}<span class="t-cyan">${esc(it.name)}/</span>` : `${branch}${esc(it.name)}`);
                            if (it.type === 'dir') await walk([...s, it.name], prefix + (last ? '    ' : '│   '));
                        }
                    }
                    await walk(segs, '');
                    print(lines.length ? lines.join('\n') : `<span class="t-dim">${I18N.t('term.fs.empty')}</span>`);
                }

                async function cmdFind(pattern) {
                    if (!pattern) { print(`<span class="t-red">${I18N.t('term.find.usage')}</span>`); return; }
                    const results = [];
                    const q = pattern.toLowerCase();
                    async function walk(s) {
                        const items = await VFS.list(s) || [];
                        for (const it of items) {
                            const full = VFS.pathToString([...s, it.name]);
                            if (it.name.toLowerCase().includes(q)) results.push(it.type === 'dir' ? `${full}/` : full);
                            if (it.type === 'dir') await walk([...s, it.name]);
                        }
                    }
                    await walk(cwd);
                    print(results.length ? results.map(esc).join('\n') : `<span class="t-yellow">${I18N.t('term.find.none', { pattern: esc(pattern) })}</span>`);
                }

                async function handleCommand(cmd) {
                    const parts = cmd.split(/\s+/), base = parts[0].toLowerCase();
                    if (base === 'help') { print(buildHelp()); return; }
                    if (base === 'clear') { out.innerHTML = ''; return; }
                    if (base === 'echo') {
                        const rest = cmd.replace(/^\s*echo\s?/i, '');
                        const m = /^(.*?)(>>|>)\s*(\S+)\s*$/.exec(rest);
                        if (m) {
                            const text = m[1].trim(), append = m[2] === '>>', filename = m[3];
                            const segs = VFS.resolvePath(cwd, filename);
                            const r = append ? await VFS.appendFile(segs, text + '\n') : await VFS.writeFile(segs, text + '\n', 'text/plain', false);
                            if (r.error === 'isDir') print(`<span class="t-red">${I18N.t('term.fs.isDir', { name: esc(filename) })}</span>`);
                            else if (r.error === 'binary') print(`<span class="t-red">${I18N.t('term.fs.binary')}</span>`);
                            else if (r.error === 'tooLarge') print(`<span class="t-red">${I18N.t('term.fs.tooLarge', { max: VFS.formatSize(VFS.MAX_FILE_BYTES) })}</span>`);
                            else if (r.error) print(`<span class="t-red">${I18N.t('term.fs.quota')}</span>`);
                            else print(`<span class="t-green">${I18N.t('term.fs.ok')}</span>`);
                        } else {
                            print(`<span class="t-white">${esc(rest)}</span>`);
                        }
                        return;
                    }
                    if (base === 'theme') { const h = parseInt(parts[1]); if (!isNaN(h) && h >= 0 && h <= 360) { let s = SettingsManager.load(); s.hue = h; SettingsManager.save(s); print(`<span class="t-green">${I18N.t('term.theme.changed', { hue: h })}</span>`); } else print(`<span class="t-red">${I18N.t('term.theme.usage')}</span>`); return; }
                    if (base === 'useragent') { cmdUseragent(); return; }
                    if (base === 'myip') { await cmdMyip(); return; }
                    if (base === 'geoip') { await cmdGeoip(parts[1]); return; }
                    if (base === 'dns') { await cmdDns(parts[1], parts[2]); return; }
                    if (base === 'whois') { await cmdWhois(parts[1]); return; }
                    if (base === 'ping') { await cmdPing(parts[1]); return; }
                    if (base === 'calc') { cmdCalc(parts.slice(1).join(' ')); return; }
                    if (base === 'base') { cmdBase(parts[1], parts[2], parts[3]); return; }
                    if (base === 'base64') { cmdBase64(parts[1], parts.slice(2).join(' ')); return; }
                    if (base === 'hash') { await cmdHash(parts[1], parts.slice(2).join(' ')); return; }
                    if (base === 'jwt') { cmdJwt(parts[1]); return; }
                    if (base === 'uuid') { cmdUuid(parts[1]); return; }
                    if (base === 'json') { cmdJson(parts[1], parts.slice(2).join(' ')); return; }
                    if (base === 'color') { cmdColor(parts.slice(1).join(' ')); return; }
                    if (base === 'httpstatus') { cmdHttpstatus(parts[1]); return; }
                    if (base === 'wordcount') { cmdWordcount(parts.slice(1).join(' ')); return; }
                    if (base === 'case') { cmdCase(parts[1], parts.slice(2).join(' ')); return; }
                    if (base === 'moyenne') { cmdMoyenne(parts.slice(1).join(' ')); return; }
                    if (base === 'ohm') { cmdOhm(parts[1], parts[2], parts[3]); return; }
                    if (base === 'pythagore') { cmdPythagore(parts[1], parts[2]); return; }
                    if (base === 'cidr') { cmdCidr(parts[1]); return; }
                    if (base === 'ports') { cmdPorts(parts.slice(1).join(' ')); return; }
                    if (base === 'secheaders') { await cmdSecheaders(parts[1]); return; }
                    if (base === 'pwd') { cmdPwd(); return; }
                    if (base === 'ls') { await cmdLs(parts[1]); return; }
                    if (base === 'cd') { await cmdCd(parts[1]); return; }
                    if (base === 'mkdir') { await cmdMkdir(parts.slice(1).join(' ')); return; }
                    if (base === 'touch') { await cmdTouch(parts.slice(1).join(' ')); return; }
                    if (base === 'cat') { await cmdCat(parts.slice(1).join(' ')); return; }
                    if (base === 'rm') { await cmdRm(parts.slice(1)); return; }
                    if (base === 'rmdir') { await cmdRmdir(parts.slice(1).join(' ')); return; }
                    if (base === 'mv') { await cmdMv(parts[1], parts[2]); return; }
                    if (base === 'cp') { await cmdCp(parts[1], parts[2]); return; }
                    if (base === 'tree') { await cmdTree(parts[1]); return; }
                    if (base === 'find') { await cmdFind(parts.slice(1).join(' ')); return; }
                    print(`<span class="t-red">${I18N.t('term.unknownCmd', { cmd: esc(base) })}</span>. ${I18N.t('term.helpHint')}`);
                }

                inp.addEventListener('keydown', (e) => {
                    // Ctrl+A / Cmd+A : sélectionne tout l'historique affiché plutôt que
                    // le contenu du champ de saisie (généralement vide) — permet un vrai
                    // "sélectionner tout" façon terminal, suivi d'un Ctrl+C classique.
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
                        e.preventDefault();
                        const range = document.createRange();
                        range.selectNodeContents(out);
                        const sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                        return;
                    }
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
                // Ne reprend le focus sur le champ de saisie QUE si aucun texte n'est
                // actuellement sélectionné dans la sortie : sinon, resélectionner le
                // champ (vide) juste après un clic-glissé de sélection ferait que
                // Ctrl+C copierait le champ vide au lieu du texte visé par l'utilisateur.
                c.querySelector('.terminal-wrap').onclick = () => {
                    const sel = window.getSelection();
                    if (sel && sel.toString().length > 0) return;
                    inp.focus();
                };
            }
        });
