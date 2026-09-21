# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.1] - 2026-09-21

### 🚀 Multiplatform Shortcuts, Resilient Downloads & i18n

#### Multiplatform & Shortcuts
- **Windows Shortcuts**: Configured native launcher hotkeys (`Alt+Space`, `Ctrl+Space`, `Alt+A`) preventing collisions with Windows Action Center (`Win+A`) and Keyboard Input Switcher (`Win+Space`).
- **macOS Support**: Registered `Option+Space` (`Alt+Space`) launcher shortcut avoiding Spotlight collision (`Cmd+Space`), with foreground app activation and proper focus acquisition.
- **Window Focus & Restoration**: Added explicit `unminimize()` prior to `show()` and `set_focus()` across all platforms to prevent focus stealing rejections.
- **Cross-Platform IPC**: Unified single-instance and `--toggle` daemon messaging across Linux/macOS (UNIX domain sockets) and Windows (local loopback TCP).

#### Website & Resilient Downloads
- **Dynamic Asset Resolution**: Website downloads now resolve assets dynamically from the latest GitHub Release with deterministic, version-pinned fallbacks matching Tauri build artifacts (`.deb`, `.AppImage`, `.msi`, `.exe`, `.dmg`).
- **Multilingual i18n**: Integrated internationalization across the landing page with instant switching between English, Portuguese, and Spanish.
- **Audited Devlogs**: Updated the website devlog ledger and release manager agent to keep public notes synchronized with repository developments.

#### Native Clipboard & Linux Tooling
- **Native Wayland/X11 Clipboard**: Direct support for `wl-copy` / `wl-paste` on Wayland and `xclip` on X11 with seamless Tauri clipboard fallbacks.
- **Maintenance Scripts**: Added automated uninstaller (`uninstall.sh`, `uninstall-arch-hyprland.sh`) and instant updater (`omnicmd-update.sh`).

---

## [0.1.0] - 2026-09-19

### 🚀 Initial Public Release

#### Features
- **HUD Command Palette**: Seamless floating window overlay invokable via global hotkey (`Super+Space`).
- **Clipboard Context Auto-Injection**: Automatic capture of current text selection for immediate zero-friction prompt processing.
- **Provider Switching**: Fast switching between **9router**, **Omni**, and **Custom OpenAI-compatible** endpoints with model parameter controls.
- **Persona Presets**: Quick persona switching via `Alt+1..6` (General, Developer, Concise, Creative, Academic, Executive).
- **Vim Mnemonic Navigation**: Full keyboard navigation support with arrow keys, `Ctrl+j/k`, and direct number execution `#1..9`.
- **System Tray Integration**: Background daemon with tray icon, quick toggle, history access, and settings modal.
- **Local Persistence**: Secure SQLite storage for action history, custom prompt presets, and encrypted provider configuration.

#### Multiplatform Builds
- Linux `.deb` and `.AppImage` support.
- Windows `.msi` and executable installer support.
- macOS `.dmg` Universal Binary (Intel & Apple Silicon).
