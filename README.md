<img width="2557" height="1229" alt="2026-07-11_163129" src="https://github.com/user-attachments/assets/ee8b4a58-35a3-4e6f-b29f-3e2643bc01b6" />

# WebOSx

A fictional web-based, desktop-style operating system, built entirely in vanilla HTML/CSS/JS (no framework, no external dependencies). Draggable/resizable windows, Start menu, taskbar, HSL hue-based theming, a PS3-style animated background, and a plugin system for adding apps.

## Table of contents

- [Overview](#overview)
- [Load order](#load-order)
- [The Core](#the-core)
  - [icons.js](#iconsjs)
  - [settings.js — SettingsManager](#settingsjs--settingsmanager)
  - [i18n.js — I18N](#i18njs--i18n)
  - [lang/*.js — language packs](#langjs--language-packs)
  - [wave-background.js](#wave-backgroundjs)
  - [window-manager.js — WindowManager](#window-managerjs--windowmanager)
  - [app-registry.js — AppRegistry](#app-registryjs--appregistry)
  - [os.js — OS](#osjs--os)
- [Plugins (apps)](#plugins-apps)
- [Creating a new application](#creating-a-new-application)
- [Adding a language](#adding-a-language)

## Overview

WebOSx runs entirely client-side. `index.html` loads a series of scripts in a strict order (see below), then `main.js` boots everything with `OS.init()`. Each application (Notepad, Terminal, Calculator, etc.) is a **plugin**: a plain object registered with an `AppRegistry`, independent from the core.

The core doesn't know anything about a specific app by name: it just displays a desktop icon, a Start menu entry, and creates a window via the `WindowManager` when it's double-clicked. All of an app's internal logic lives in its own file under `js/apps/`.

## Load order

```
js/core/icons.js            → SVG dictionary
js/core/settings.js         → SettingsManager (must be ready before i18n, which reads the saved language)
js/core/i18n.js             → I18N engine
js/core/lang/fr.js …        → translation packs (registered into I18N.dict)
js/core/wave-background.js  → background animation
js/core/window-manager.js   → WindowManager class
js/core/app-registry.js     → AppRegistry class (calls OS.onAppRegistered, so OS's logic must already be defined when registration happens)
js/core/os.js               → OS object, the orchestrator

js/apps/*.js                → plugins, each calling OS.registry.register({...})

js/main.js                  → OS.init()
```

⚠️ This order is deliberately fixed (see the `<!-- NOYAU (ne pas réordonner) -->` comment in `index.html`): each core file depends on the previous one (e.g. `i18n.js` needs `SettingsManager` to read the saved language; `window-manager.js` needs `I18N.t()` for window button tooltips).

---

## The Core

### icons.js

A simple `ICONS` object mapping an identifier (`about`, `settings`, `notepad`, `terminal`, `calc`, `clock`, `mp3`, `video`) to an inline SVG string. Used by apps as their icon (e.g. `icon: ICONS.notepad`).

### settings.js — `SettingsManager`

Handles persistence of user settings in `localStorage` (key `webosx_settings`).

| Function | Role |
|---|---|
| `defaults` | Default values: `is3d`, `hue` (0-360), `waveSpeed`, `waveWidth`, `showWaves`, `lang`. |
| `load()` | Reads `localStorage`, merges with `defaults` (tolerant of missing/corrupted data). |
| `save(settings)` | Serializes to JSON in `localStorage`, then calls `apply(settings)`. |
| `apply(settings)` | Applies settings to the DOM: sets the `--hue` CSS variable, toggles the `theme-3d` and `waves-off` classes on `<body>`, and updates `window.__waveConfig` (read by `wave-background.js`). |

This is the single entry point for reading/writing configuration; every other part of the code should go through it rather than touching `localStorage` directly.

### i18n.js — `I18N`

A very lightweight, dependency-free translation engine.

| Function | Role |
|---|---|
| `languages` | Metadata for each language (name, short code, flag, `Intl` locale). |
| `registerLang(code, strings)` | Merges a translation pack into `I18N.dict[code]`. Called once per `lang/xx.js` file. |
| `t(key, vars)` | Translates a key: looks in the current language, falls back to `fallback` (`en`), then returns the raw key if nothing is found. Supports `{var}` interpolation. |
| `locale()` | Returns the current language's `Intl` locale code (e.g. `fr-FR`), used to format the clock. |
| `onChange(fn)` | Registers a callback fired on every language change. |
| `setLang(code)` | Sets the active language, saves it via `SettingsManager`, re-applies translations (`apply()`), notifies listeners, and dispatches the global `webosx:langchange` event. |
| `cycle()` | Switches to the next language in `languages` order (keyboard shortcut `Ctrl+Space`). |
| `apply(root)` | Walks `root` (or the whole document) and translates any element marked `data-i18n`, `data-i18n-placeholder`, or `data-i18n-title`. |
| `init()` | Determines the starting language: saved setting → else browser language if supported → else `fr`. |

A global utility function `escHtml(s)` also lives in this file: basic HTML escaping used everywhere dynamic text (app names, etc.) gets injected via `innerHTML`.

### lang/*.js — language packs

`fr.js`, `en.js`, `es.js`, `de.js`: each calls `I18N.registerLang(code, { key: translation })`. Packs can be partial — a missing key automatically falls back to English (`fallback`). `fr.js` and `en.js` are the most complete; `es.js` and `de.js` only cover the base chrome and a few app keys.

### wave-background.js

PS3/PSP-style animated background: three glowing wavy ribbons drawn on a `<canvas>` with `requestAnimationFrame`.

| Function | Role |
|---|---|
| `resize()` | Recomputes the canvas's internal size (`clientWidth/Height × devicePixelRatio`). |
| `ResizeObserver` on `#ps3-waves` | Re-triggers `resize()` whenever the container's actual size changes — including when it goes from `display:none` (hidden) back to visible, which the window's `resize` event alone doesn't cover. |
| `getHue()` | Reads the current `--hue` CSS variable to tint the ribbons according to the active theme. |
| `getWaveConfig()` | Reads `window.__waveConfig` (set by `SettingsManager.apply`): speed, width, enabled/disabled. |
| `waveY(x, ribbon, t, offset, cfg)` | Computes a ribbon point's Y position at time `t` (two overlapping sine waves for an organic motion). |
| `drawRibbon(ribbon, t)` | Draws a ribbon: a blurred gradient fill plus a sharper glowing line on top. |
| `frame(ts)` | Main animation loop, continuously called via `requestAnimationFrame`. |
| `hexToHSL(hex)` | Converts a hex color to `{h, s, l}`, used by the custom color picker in Settings. |

### window-manager.js — `WindowManager`

Manages window lifecycle (creation, drag, resize, focus, minimize, maximize, close).

| Method | Role |
|---|---|
| `createWindow(appConfig)` | Builds a window's DOM from an app's config (title, icon, default size, `resizable`/`maximizable`), positions it randomly, appends it to the desktop, wires up the min/max/close buttons, calls `appConfig.init(contentEl, api)`, then notifies `OS.onWindowCreated`. Returns a small API (`getId`, `close`, `setTitle`, `getContent`) the app can use. |
| `setupDrag(winEl, handleEl)` | Makes the window draggable via its title bar (Pointer Events), disabled while maximized. |
| `setupResize(winEl)` | Adds 8 resize handles (n/s/e/w + corners) with a minimum size (300×200). |
| `focusWindow(id)` | Brings the window to the front (z-index), marks it `.focused`, activates its taskbar button. |
| `minimizeWindow(id)` / `restoreWindow(id)` | Hide/show a window without destroying it. |
| `toggleMaximize(id)` | Toggles the window's fullscreen mode. |
| `closeWindow(id)` | Destroys the window, notifies `OS.onWindowClosed`, cleans up state. |

### app-registry.js — `AppRegistry`

Minimal registry of available applications.

| Method | Role |
|---|---|
| `register(app)` | Validates that `id` and `name` are present, stores the app in a `Map`, then calls `OS.onAppRegistered(app)` so the core creates its desktop icon and menu entry. |
| `get(id)` | Retrieves an app's config by id. |

### os.js — `OS`

The orchestrator object: ties together the `WindowManager`, the `AppRegistry`, the taskbar, the Start menu, the language switcher, and the clock.

| Function | Role |
|---|---|
| `init()` | Entry point: wires up the taskbar, the language switcher, starts the boot sequence, starts the clock, listens for `webosx:langchange`. |
| `startBootSequence()` | Dismisses the boot screen after a delay. |
| `setupTaskbar()` | Wires up the Start button, closing menus on desktop click, the Start menu search field, and the "About"/"Settings" footer buttons. |
| `toggleStartMenu()` | Opens/closes the Start menu, resets the search field. |
| `filterStartMenu(query)` | Filters Start menu entries by name (case-insensitive search). |
| `setupLangSwitcher()` | Wires up the language button and the `Ctrl+Space` keyboard shortcut (ignored while focus is inside a text input). |
| `renderLangMenu()` / `updateLangButton()` | Build/refresh the language dropdown and the button showing the current flag + short code. |
| `toggleLangMenu(force)` | Opens/closes the language dropdown. |
| `updateClock()` | Updates the displayed time and date (called every second, localized via `I18N.locale()`). |
| `onAppRegistered(app)` | Callback fired by `AppRegistry.register`: creates the desktop icon, and the Start menu entry unless it's a system app (`sys-about`, `sys-settings`, reachable via the menu footer instead). |
| `renderDesktopIcon(app)` / `renderStartMenuItem(app)` | Generate the desktop icon and the Start menu row for an app, respectively, with double-click / double-tap handling. |
| `launchApp(id)` | Opens an app: if it's `singleton` and already open, refocuses/restores the existing window instead of creating a new one. |
| `onWindowCreated(id, cfg)` | Creates the matching taskbar button. |
| `onWindowClosed(id)` | Removes the taskbar button and clears the singleton reference if applicable. |
| `refreshLocalization()` | Called on `webosx:langchange`: retranslates every app name that declares a `nameKey`, rebuilds the desktop and Start menu, updates open windows' titles and window-button tooltips. |

---

## Plugins (apps)

Every script under `js/apps/` registers itself with the core via `OS.registry.register({...})`. Apps currently loaded in `index.html`:

| File | Role (based on name / icon) |
|---|---|
| `about.js` | WebOSx "About" window (`sys-about`, reachable only from the Start menu footer). |
| `settings-app.js` | Settings panel (`sys-settings`): 3D appearance, language, global hue, animated background. |
| `notepad.js` | Notepad. |
| `terminal.js` | Terminal. |
| `calculator.js` | Calculator. |
| `clock.js` | Clock. |
| `mp3.js` | MP3 player. |
| `video.js` | Video player. |
| `p2p.js` | Peer-to-peer feature (not detailed here — file not provided). |
| `chat.js` | Chat application (not detailed here — file not provided). |
| `minesweeper.js` | Minesweeper. |

> The internal details of `p2p.js`, `chat.js`, and the other apps weren't provided in this context; only their presence in `index.html` is documented here. Send them over if you'd like them documented too.

## Creating a new application

1. Create `js/apps/my-app.js`.
2. Register the app:

```js
OS.registry.register({
    id: 'my-app',                  // unique identifier
    name: I18N.t('app.myApp'),     // displayed name (or a plain string)
    nameKey: 'app.myApp',          // optional: enables auto-retranslation on language change
    icon: '🧩',                    // or ICONS.xxx
    defaultWidth: 500,
    defaultHeight: 400,
    singleton: true,               // optional: only one instance at a time
    resizable: true,                // optional, defaults to true
    maximizable: true,              // optional, defaults to true
    init: (contentEl, api) => {
        contentEl.innerHTML = '<p>Hello!</p>';
        // api.close(), api.setTitle('...'), api.getContent()
    }
});
```

3. Add `<script src="js/apps/my-app.js"></script>` to `index.html`, **after** the core block, in the PLUGINS section.

## Adding a language

1. Copy `js/core/lang/en.js` to `js/core/lang/xx.js`.
2. Translate the values (missing keys automatically fall back to English).
3. Declare the language in `I18N.languages` (`i18n.js`).
4. Add `<script src="js/core/lang/xx.js"></script>` to `index.html`, after `i18n.js` and before `window-manager.js`.
