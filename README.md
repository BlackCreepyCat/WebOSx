## The sole purpose of this distribution is to provide you a solid and light base to work from... Nothing more... Why have an OS in a web browser tab? Why not! It's the only question :)

<img width="2559" height="1234" alt="image" src="https://github.com/user-attachments/assets/104ed557-b884-4e51-aa0b-9e79d0486e04" />

<img width="2559" height="1283" alt="image" src="https://github.com/user-attachments/assets/d27c12da-42bf-427f-9d03-ba2d29b08042" />

Version 3.7, with new tools:
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/8ee48eda-97ff-489b-a8d9-627831637d2e" />


Future 5.0 version (WIP) on the way on Itch.io (read licence.txt):
<img width="2049" height="1266" alt="image" src="https://github.com/user-attachments/assets/ee225c90-a738-4149-b5fc-e01cc4b562b1" />

Youtube tutorial for P2P exchanges: https://youtu.be/4vpawIp4DDY 
Youtube video: https://youtu.be/NDZ0tzudyoE

Youtube testing by "Mille e Una Avventura" : https://www.youtube.com/watch?v=PTm99TR_mgA

Online demo: https://www.creepycat.fr/webosx/

# WebOSx (C)2026 By Creepy Cat (www.creepycat.fr)

A desktop operating system simulation that runs entirely in a single browser tab. No backend, no build step, no framework — just HTML, CSS and vanilla JavaScript, loaded as plain `<script>` tags.

Everything you'd expect from a toy OS is here: draggable/resizable windows, a taskbar, a Start menu, a language switcher, a real virtual file system, and about twenty bundled applications (terminal, file explorer, notepad, image viewer, MP3/video players, calculator, games, and more).

# Why this software? It's completely pointless!!!:
With the upcoming control and surveillance measures, I thought that tools like this, where anyone can be a server anywhere, without software to install or server to setup, even on any system or browser (i don't tested all network configurations... feel free to do it! There will certainly be situations where it won't work, example if the network is too complex, or if your browser has extensions that block all JavaScript), a raspberry (create a files server in a browser tab!)? or a mobile phone / tablet (I’ve tested it! with a mouse connected to my samsung) could be helpful in the future for temporary flash files transfert and private flash chatrooms with your friends... Besides, I do whatever i want! :)

---
## 3.8.4 version fixes (soon):
1. New calendar application.
2. About window fixed (and need to stay like this).
3. A new system to hide the applications you don't use. Clean the desktop!
<img width="1808" height="1072" alt="image" src="https://github.com/user-attachments/assets/f6410f65-3cca-4c64-b651-f1fb834b82c4" />


   
## 3.8.2 version fixes:
1. Italian and Portuguese translations added! (Hello 'Mille e Una Avventura!')
   
## 3.8 version fixes:
1. Notepad localization when you start the appp has been fixed.
2. Chat application messages connection/history/display fixed.
3. Taskbar langages flags are now ok on mobile/desktop.
4. On mobile the windows maximize gadget icon is fixed.
5. Sticky notes borders fixed.
6. Notifications/requester library added.
7. File application double click fixed.
8. New configuration panel stylish.
9. Low power mode included for mobile/tablet


## Table of contents:

1. [What WebOSx does](#1-what-webosx-does)
2. [The persistent desktop](#2-the-persistent-desktop)
3. [Project structure](#3-project-structure)
4. [Architecture: how the OS boots](#4-architecture-how-the-os-boots)
5. [Core modules reference](#5-core-modules-reference)
6. [Bundled applications](#6-bundled-applications)
7. [Adding a new application — full walkthrough](#7-adding-a-new-application--full-walkthrough)
8. [Internationalization](#8-internationalization)
9. [Versioning / cache-busting](#9-versioning--cache-busting)

---

## 1. What WebOSx does

WebOSx recreates the *feel* of a desktop operating system inside the browser:

- **Window management** — draggable, resizable windows with minimize/maximize/close, a taskbar with per-window entries (and a dedicated close button on each, so a window dragged off-screen is never unreachable), a Start menu with search.
- **Theming** — a single hue/saturation pair drives the entire UI (window chrome, the animated WebGL wave background, icons), plus an optional "3D relief" visual mode. Configurable from a tabbed Settings app.
- **A real virtual file system** (see [§2](#2-the-persistent-desktop)) — a sandboxed "My Files" area that many apps read from and write to.
- **A shared UI toolkit** — toast notifications and modal dialogs (confirm/alert/text-prompt/file-picker) that any app can call into, so nobody has to hand-roll their own popup system.
- **Multi-language UI** — French, English, Spanish and German, switchable at runtime, with a fallback chain so a partially-translated app never breaks.
- **~20 bundled apps** — see [§6](#6-bundled-applications).

The whole thing is designed to be **hackable**: every subsystem (windowing, file system, notifications, settings) is a small, independent, documented module that new apps opt into rather than a monolith you have to understand end-to-end before touching anything.

---

## 2. The persistent desktop

Nothing here talks to a server. Everything is stored **in the visitor's own browser**, which has a few important consequences:

| What | Where it's stored | Survives a reload? | Shared across devices? |
|---|---|---|---|
| Desktop layout (which windows were open, their position/size) | `localStorage` (`webosx_desktop_state`) | Yes | No |
| Theme, language, wave background settings | `localStorage` (`webosx_settings`) | Yes | No |
| **Virtual file system** ("My Files" — anything a user imports, or creates via Notepad/Terminal) | **IndexedDB** (`webosx_vfs` database) | Yes | No |
| Sticky notes | `localStorage` (`webosx_stickynotes`) | Yes | No |

**Why IndexedDB for the file system and not `localStorage` for everything?** `localStorage` caps out around 5–10 MB *total* per origin and is synchronous (a big write can freeze the UI). IndexedDB's quota is typically hundreds of MB to a few GB depending on the browser and free disk space, and every operation is asynchronous. The VFS used to run on `localStorage` in an earlier version; it was migrated to IndexedDB with an automatic, silent one-time import of any pre-existing `localStorage` data, so nobody loses their files across the upgrade.

**On boot**, `OS.restoreDesktop()` (in `os.js`) reads the saved layout and re-launches every window that was open, restoring position, size, minimized/maximized state, and z-order — clamped to the current viewport so a window saved off-screen (or a browser window that's since been resized smaller) always reappears reachable.

Because storage is entirely client-side, **there is no way to prevent a determined user from reading the JavaScript source** — the browser has to receive it in full to run it. Don't treat this project as a place to keep secrets.

---

## 3. Project structure

```
webosx/
├── index.html                 # single entry point — lists every <script> in load order
├── css/
│   └── core.css                # the entire UI's styling (one flat file)
└── js/
    ├── main.js                 # last script loaded — calls OS.init()
    ├── core/                   # the OS itself — load this before any app
    │   ├── icons.js             # shared SVG icon library (ICONS.xxx)
    │   ├── settings.js          # SettingsManager — theme/appearance persistence
    │   ├── i18n.js               # I18N — translation engine
    │   ├── lang/
    │   │   ├── fr.js  en.js  es.js  de.js   # core UI strings, one file per language
    │   ├── wave-background.js   # animated WebGL background
    │   ├── window-manager.js    # WindowManager — draggable/resizable windows
    │   ├── app-registry.js      # AppRegistry — where apps register themselves
    │   ├── settings-registry.js # SettingsRegistry — extensible Settings tabs/panels
    │   ├── vfs.js                # VFS — virtual file system (IndexedDB-backed)
    │   ├── ui-kit.js             # UI — shared notifications & dialogs
    │   └── os.js                 # OS — boot sequence, taskbar, Start menu, desktop persistence
    └── apps/                   # every application — each file is self-contained
        ├── about.js  settings-app.js  files.js  imageviewer.js
        ├── notepad.js  terminal.js  calculator.js  clock.js  timer.js
        ├── weather.js  password.js  xeyes.js  mp3.js  video.js
        ├── p2p.js  chat.js  minesweeper.js  crypto.js
        └── unitconverter.js  stickynote.js  todo.js
```

`index.html` loads scripts in two blocks, in this exact order:

1. **NOYAU (core)** — `icons.js` → `settings.js` → `i18n.js` → the four `lang/*.js` packs → `wave-background.js` → `window-manager.js` → `app-registry.js` → `settings-registry.js` → `vfs.js` → `ui-kit.js` → `os.js`.
2. **GREFFONS (plugins/apps)** — every file in `js/apps/`, in any order (each one registers itself independently; order between apps doesn't matter, but every app file must come *after* the core block).

Then `js/main.js` runs `OS.init()`, which boots the desktop.

---

## 4. Architecture: how the OS boots

```
 1. <script> tags load synchronously, top to bottom.
 2. Each core file defines a global object (OS, VFS, UI, I18N, SettingsManager, ...).
 3. Each app file, as it loads, calls OS.registry.register({...}) — this just adds
    the app's config to a Map. No window is created yet.
 4. main.js calls OS.init():
      - wires up the taskbar, Start menu, language switcher, fullscreen switcher
      - starts the boot-screen timer (a 5.8s overlay that hides the desktop
        while windows are silently restored underneath it)
      - calls OS.restoreDesktop(), which re-launches whatever windows were
        open last session (reading localStorage)
 5. The user double-clicks a desktop icon → OS.launchApp(id) → 
    WindowManager.createWindow(appConfig) builds the window chrome (title bar,
    resize handles, taskbar entry) and calls appConfig.init(contentEl, api).
```

**Everything is global, on purpose.** There's no module bundler and no `import`/`export` — `OS`, `VFS`, `UI`, `I18N`, `SettingsManager`, `SettingsRegistry`, `ICONS`, and `escHtml()` are simply script-scope `const`/`function` declarations that become available to every script loaded afterward, because they're all classic (non-module) `<script>` tags sharing one global scope. This is deliberate: it keeps the barrier to entry for a new app at "write a `.js` file and add one `<script>` tag."

---

## 5. Core modules reference

| Global | File | Responsibility |
|---|---|---|
| `OS` | `os.js` | Boot sequence, taskbar, Start menu, language/fullscreen switchers, desktop layout persistence. Owns `OS.wm` (a `WindowManager`) and `OS.registry` (an `AppRegistry`). |
| `WindowManager` (`OS.wm`) | `window-manager.js` | Creates/drags/resizes/closes window DOM elements. Windows are clamped to stay on-screen. Per-app minimum resize size is configurable via `minWidth`/`minHeight`. |
| `AppRegistry` (`OS.registry`) | `app-registry.js` | A `Map` of `appId → appConfig`. `.register(config)` throws if `id`/`name` are missing. |
| `I18N` | `i18n.js` + `lang/*.js` | `I18N.t(key, vars)` looks up a string in the current language, falling back to English, then to the raw key. `I18N.registerLang(code, {...})` merges strings into a language — apps typically register their *own* strings locally rather than editing the four core `lang/*.js` files. |
| `SettingsManager` | `settings.js` | Reads/writes theme, hue/saturation, 3D mode and wave-background settings to `localStorage`, and applies them live (CSS custom properties). |
| `SettingsRegistry` | `settings-registry.js` | Lets any app add its own tab/panel to the Settings app without editing `settings-app.js`. See its own file header for a usage example. |
| `VFS` | `vfs.js` | The virtual file system. Every method that touches storage is **`async`**. See below. |
| `UI` | `ui-kit.js` | Shared notifications (`UI.notify`) and modal dialogs (`UI.alert`, `UI.confirm`, `UI.confirmCancel`, `UI.prompt`, `UI.filePicker`). All dialog calls are queued, so two apps popping a confirm at the same time never collide. |
| `ICONS` | `icons.js` | A handful of shared SVG icon strings (`ICONS.notepad`, `ICONS.mp3`, ...) reused by multiple apps. Apps needing a one-off icon just inline their own SVG constant instead of adding to this file. |
| `escHtml(str)` | `i18n.js` | The one shared HTML-escaping helper — always use it before interpolating any user- or file-provided string into `innerHTML`. |

### The VFS API (all async unless noted)

```js
VFS.list(pathSegments)                    // -> [{name, type, size, mtime, mime}] | null
VFS.mkdir(pathSegments)                   // -> {ok:true} | {error:'exists'|'invalid'|'quota'}
VFS.touch(pathSegments)
VFS.writeFile(pathSegments, content, mime, binary)
VFS.appendFile(pathSegments, text)
VFS.readFile(pathSegments)                // -> {ok, content, mime, size, binary} | {error}
VFS.readFileAsText(pathSegments)          // like readFile, but auto-decodes base64 text imports
VFS.remove(pathSegments, recursive)
VFS.rename(fromSegments, toSegments)
VFS.copy(fromSegments, toSegments)
VFS.exists(segs) / isDir(segs) / isFile(segs) / stat(segs)
VFS.toFile(segs)                          // -> a real browser File object (for <audio>/<video> etc.)
VFS.resolvePath(cwd, input)               // SYNC — path-string parsing, sandboxed to the VFS root
VFS.pathToString(segs)                    // SYNC
VFS.isTextMime(mime)                      // SYNC
VFS.formatSize(bytes)                     // SYNC — "1.2 Mo"-style formatting
VFS.usageBytes()                          // -> total bytes stored
VFS.onChange(fn)                          // fn() is called after ANY successful mutation, by anyone
```

Paths are arrays of segments (`['docs', 'notes.txt']`), never raw strings — use `VFS.resolvePath()` to turn user-typed input into a segment array. The VFS is **chrooted**: `..` past the root is a no-op, there's no way to address anything outside it.

If your app both *writes* to the VFS and *reacts* to `VFS.onChange` (e.g. to live-refresh a list), guard against reacting to your own writes — see the pattern in `todo.js` (a `savingInternally` flag checked at the top of the change handler).

### The UI kit

```js
UI.notify({ title, message, type: 'info'|'success'|'warning'|'error', duration, icon, actions, onClick });
await UI.alert('Just a heads up.');
const yes = await UI.confirm({ title, message, icon: 'warning' });        // -> boolean
const choice = await UI.confirmCancel({ title, message });                 // -> 'yes'|'no'|'cancel'
const text = await UI.prompt({ title, message, value, validate: v => v.trim() ? null : 'Required' }); // -> string | null
const picked = await UI.filePicker({ title, extensions: ['.png', '.jpg'] }); // -> {path, name} | null
```

---

## 6. Bundled applications

| App | id | Notes |
|---|---|---|
| About | `sys-about` | Singleton |
| Settings | `sys-settings` | Tabbed shell built on `SettingsRegistry` |
| My Files | `sys-files` | The VFS file explorer — upload, rename, delete, download, and a type-aware "Open..." button/double-click that routes to Notepad, the image viewer, or the media players |
| Image Viewer | `sys-imageviewer` | External files, VFS files, zoom/pan/rotate |
| Notepad | `sys-notepad` | Real disk open/save *and* VFS open/save, via `UI.filePicker` |
| Terminal | `sys-terminal` | ~40 commands: network tools, hashing/encoding, math, and a full `ls`/`cd`/`cat`/`rm`/`tree`/... shell over the VFS |
| Calculator | `sys-calc` | |
| Clock | `sys-clock` | Analog canvas clock, hue-tinted |
| Timer & Stopwatch | `sys-timer` | Re-uses the clock's canvas drawing recipe — a countdown ring + hand for the timer, real sweeping hands for the stopwatch |
| Weather | `sys-weather` | |
| Password Generator | `sys-pwgen` | |
| Eyes | `sys-xeyes` | Not singleton — a small homage to X11's `xeyes` |
| MP3 Player | `sys-mp3` | Playlist import from disk *or* from My Files |
| Video Player | `sys-video` | Same import options as the MP3 player |
| P2P Transfer | `p2p-transfer` | WebRTC file transfer, no server |
| P2P Chat | `p2p-chat` | WebRTC chat, no server |
| Minesweeper | `sys-minesweeper` | |
| Crypto | `sys-crypto` | |
| Unit Converter | `sys-unitconverter` | 10 categories, live bidirectional conversion, full reference table |
| Sticky Note | `sys-stickynote` | Not a normal window — see its file header for how it reskins the generic window chrome |
| To-Do | `sys-todo` | Multiple lists in one human-readable JSON file in the VFS root |

---

## 7. Adding a new application — full walkthrough

Below is a complete, working example: a tiny **Word Counter** app. It shows the required boilerplate plus three optional building blocks (VFS, i18n, notifications) so you can drop whichever ones you actually need.

### 7.1 Minimal skeleton

Every app is one `.js` file that calls `OS.registry.register(...)` at the top level:

```js
// js/apps/wordcounter.js
OS.registry.register({
    id: 'sys-wordcounter',              // must be globally unique
    name: 'Word Counter',               // shown in the Start menu / taskbar / title bar
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round">
             <path d="M4 6h16M4 12h10M4 18h13"/>
           </svg>`,
    defaultWidth: 420, defaultHeight: 320,
    init: (content, api) => {
        content.innerHTML = `
            <div style="padding:16px;display:flex;flex-direction:column;gap:10px;height:100%;">
                <textarea id="wc-input" style="flex:1;resize:none;padding:8px;
                    background:var(--bg-desktop);color:var(--text-primary);
                    border:1px solid var(--border-color);border-radius:6px;"></textarea>
                <div id="wc-result" style="font-size:13px;color:var(--text-secondary);"></div>
            </div>`;

        const input = content.querySelector('#wc-input');
        const result = content.querySelector('#wc-result');
        input.oninput = () => {
            const words = input.value.trim().split(/\s+/).filter(Boolean).length;
            result.textContent = `${words} word(s), ${input.value.length} character(s)`;
        };
    }
});
```

Then register the script tag in `index.html`, anywhere inside the GREFFONS block (after the NOYAU block, order relative to other apps doesn't matter):

```html
<script src="js/apps/wordcounter.js?v=3.7"></script>
```

That's a complete, working app. Double-click its icon on the desktop and it opens in a window like any other.

### 7.2 The `init(content, api)` signature

- `content` is the window's content `<div>` — already empty, sized, and scrollable. This is *your* app's canvas; nothing outside it is yours to touch (though see §7.5 for the one documented exception, sticky notes).
- `api` exposes:
  ```js
  api.getId()                       // this window's internal id
  api.close()                       // close the window programmatically
  api.setTitle(text)                // change the title bar text
  api.getContent()                  // same element as the `content` param
  api.setGeometry(x, y, w, h)       // used internally by desktop-layout restore
  ```
  You can wrap `api.close` to run cleanup first — every bundled app that holds a timer, an `AudioContext`, an event listener, or a `ResizeObserver` does this:
  ```js
  const originalClose = api.close;
  api.close = () => {
      clearInterval(myTimer);
      window.removeEventListener('webosx:langchange', render);
      originalClose();
  };
  ```

### 7.3 Useful `appConfig` fields

```js
OS.registry.register({
    id: 'sys-example',
    name: 'Example',
    nameKey: 'app.example',    // see §8 — lets the displayed name follow the active language
    icon: '<svg>...</svg>',
    defaultWidth: 500, defaultHeight: 400,
    minWidth: 300, minHeight: 200,   // resize floor (defaults to 300×200 if omitted)
    resizable: true,                  // default true
    maximizable: true,                // default true
    singleton: true,                  // re-launching focuses the existing window instead of opening a new one
    persistState: false,              // opt out of desktop-layout save/restore entirely
    noTaskbar: true,                  // don't show a taskbar entry (used by Sticky Note)
    init: (content, api) => { /* ... */ }
});
```

Use `singleton: true` for anything that only makes sense as one instance (Settings, Files, a To-Do list). Leave it off for anything a user might reasonably want several of at once (Notepad, the image viewer, Sticky Notes).

### 7.4 Adding VFS access, translations, and notifications

Expanding the example: save/load the text to the VFS, translate the UI, and confirm on save.

```js
// js/apps/wordcounter.js

// App-local strings — merged into the global dictionary, don't touch js/core/lang/*.js
// for anything that isn't a name shown OUTSIDE this app's own window.
I18N.registerLang('en', { 'app.wordcounter': 'Word Counter', 'wc.saved': 'Saved to My Files.' });
I18N.registerLang('fr', { 'app.wordcounter': 'Compteur de mots', 'wc.saved': 'Enregistré dans Mes Fichiers.' });
I18N.registerLang('es', { 'app.wordcounter': 'Contador de palabras', 'wc.saved': 'Guardado en Mis Archivos.' });
I18N.registerLang('de', { 'app.wordcounter': 'Wortzähler', 'wc.saved': 'In Meine Dateien gespeichert.' });

OS.registry.register({
    id: 'sys-wordcounter',
    name: I18N.t('app.wordcounter'),
    nameKey: 'app.wordcounter',     // keeps the title/taskbar label in sync on language switch
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h13"/></svg>`,
    defaultWidth: 420, defaultHeight: 340,
    init: (content, api) => {
        content.innerHTML = `
            <div style="padding:16px;display:flex;flex-direction:column;gap:10px;height:100%;">
                <textarea id="wc-input" style="flex:1;resize:none;"></textarea>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span id="wc-result" style="font-size:13px;color:var(--text-secondary);"></span>
                    <button id="wc-save" class="files-tool-btn">Save</button>
                </div>
            </div>`;

        const input = content.querySelector('#wc-input');
        const result = content.querySelector('#wc-result');
        const update = () => {
            const words = input.value.trim().split(/\s+/).filter(Boolean).length;
            result.textContent = `${words} word(s)`;
        };
        input.oninput = update;
        update();

        content.querySelector('#wc-save').onclick = async () => {
            await VFS.writeFile(['word-count-notes.txt'], input.value, 'text/plain', false);
            UI.notify({ title: I18N.t('app.wordcounter'), message: I18N.t('wc.saved'), type: 'success' });
        };
    }
});
```

A few things worth calling out:

- `VFS.writeFile` is `async` — always `await` it (every VFS method that touches storage is).
- Registering the same i18n key from two different app files is harmless (the second call just overwrites), but *don't* register the same key differently on purpose — pick a namespaced prefix per app (`wc.*` here) to avoid collisions.
- `UI.notify` needs no import, no setup — it's a global, always available.

### 7.5 Advanced: reskinning the window chrome

Sticky Note (`js/apps/stickynote.js`) is the one app that goes further than the content `<div>` — it reaches up via `content.closest('.window')` to restyle the title bar and hide the maximize/minimize buttons, so it looks like an actual sticky note instead of a generic app window. Read that file's header comment before attempting something similar; it also documents a subtlety around `addEventListener` vs. `.onpointerup =` that matters if you hook into the same title-bar element the `WindowManager` already wires up for dragging.

### 7.6 Cross-app communication: the "pending mailbox" pattern

Some apps need another app to open something *specific* on launch — e.g. My Files' "Open with..." needs to tell a freshly-launched MP3 Player which track to play. Since non-singleton apps always create a **new** window, a plain global event would be received by every already-open window of that app simultaneously. The fix used throughout the codebase (`mp3.js`, `video.js`, `imageviewer.js`) is a one-shot mailbox on `OS`:

```js
// Caller (e.g. files.js):
OS._pendingMediaOpen = { kind: 'mp3', file: someFile };
OS.launchApp('sys-mp3');

// Callee (mp3.js), near the end of init() — createWindow() calls init()
// synchronously, so the mailbox is guaranteed to still hold our data here:
if (OS._pendingMediaOpen && OS._pendingMediaOpen.kind === 'mp3') {
    const file = OS._pendingMediaOpen.file;
    OS._pendingMediaOpen = null;   // clear immediately — avoids leaking into the next launch
    addFiles([file]);
}
```

For a **singleton** app (like Notepad), a plain `CustomEvent` on `window` is fine instead, since there's only ever at most one listener:

```js
window.dispatchEvent(new CustomEvent('webosx:notepad-open-vfs', { detail: { name, content } }));
```

---

## 8. Internationalization

- `I18N.t(key, vars)` — looks up `key` in the active language, falls back to English, then to the literal key string if nothing matches. `vars` does `{placeholder}` substitution: `I18N.t('todo.itemsLeft', { n: 3 })` → `"3 left"`.
- `data-i18n="key"`, `data-i18n-placeholder="key"`, `data-i18n-title="key"` on any static HTML element are applied automatically by `I18N.apply()` (used for the chrome markup in `index.html`; apps generate their HTML dynamically and just call `I18N.t()` directly instead).
- Give an app's `appConfig` a `nameKey` and `OS.refreshLocalization()` (fired on every language switch) will keep the desktop icon, taskbar label, and window title in sync automatically. Anything *inside* your window's content needs its own `webosx:langchange` listener if it should re-translate live:
  ```js
  window.addEventListener('webosx:langchange', render); // re-run your own render function
  ```
- Where to put new strings: if a key is only ever used inside your own app, `I18N.registerLang(...)` it locally in your app file (see §7.4). Only touch `js/core/lang/*.js` for strings genuinely shared across the OS shell (menu labels, window controls, and so on).
- All four languages (`fr`, `en`, `es`, `de`) should stay in lockstep — every key present in one should be present in all four, even bundled per-app packs. Missing keys silently fall back to English rather than crashing, but a translation-complete app is the standard the rest of the codebase holds to.

---

## 9. Versioning / cache-busting

Every `<script>` tag in `index.html` carries a `?v=X.Y` query string, and the About app's version label matches it. **Bump both together on every deploy** — browsers aggressively cache same-URL scripts, and a stale cached file loading alongside fresh ones is a common source of "it works locally but not after I pushed" bugs.

```html
<script src="js/apps/todo.js?v=3.7"></script>
```
```js
'about.version': 'Version 3.7',
```

A tiny helper script that reads the version from one place and rewrites both would be a reasonable contribution if this project grows a build step — right now it's manual by design, to keep "no build step" true.


             _,'|             _.-''``-...___..--';)
           /_ \'.      __..-' ,      ,--...--''''
          <\    .`--'''       `     /'
           `-';'               ;   ; ;
     __...--''     ___...--_..'  .;.'
    (,__....----'''       (,..--''   
