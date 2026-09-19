# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
