# Contributing to OmniCmd

First off, thank you for considering contributing to **OmniCmd**! 🙌

OmniCmd is built for developers and power users who want a distraction-free, keyboard-centric interface to LLMs and automation.

---

## 🛠️ Development Setup

### Prerequisites
* **Node.js**: v20+
* **pnpm**: v9+
* **Rust**: stable toolchain (`rustup default stable`)
* **Linux Dependencies** (if on Linux):
  ```bash
  sudo apt-get install libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev libssl-dev build-essential
  ```

### Quickstart
1. Fork and clone the repository:
   ```bash
   git clone https://github.com/omnicmd/omnicmd.git
   cd omnicmd
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server (with live-reload):
   ```bash
   pnpm tauri dev
   ```

---

## 🧪 Code Quality & Testing

Before submitting a Pull Request, please ensure all checks pass:

```bash
# Type check and build web assets
pnpm build

# Lint code
pnpm lint

# Check Rust backend
cargo check --manifest-path src-tauri/Cargo.toml
```

---

## 🔀 Git Workflow & Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/):
* `feat:` new feature or user-facing addition
* `fix:` bug fix
* `perf:` performance enhancement
* `refactor:` code restructuring without feature change
* `docs:` documentation updates
* `style:` formatting or UI styling tweaks

---

## 🌟 Releases, Devlogs & Website Documentation Policy

> **Grandes mudanças funcionais, mudanças de UX/UI, novos recursos, correções importantes, alterações de comportamento, mudanças de plataforma e mudanças relevantes de arquitetura DEVEM ser avaliadas para atualização do website/devlog e, quando aplicável, para uma nova versão.**

1. **Mudanças internas/pequenas** (typos, refactors internos, configs de teste) -> Commit normal.
2. **Mudanças relevantes** (novos recursos, correções que afetam usuários, suporte a SO) -> Atualizar `CHANGELOG.md` e `landing/src/data/devlogs.ts` (junto com locales em `landing/src/i18n/locales/`).
3. **Novas releases públicas** -> Usar `./scripts/bump-version.sh <version> --tag` para sincronizar os manifestos e disparar a GitHub Actions Release.

---

## 💡 Submitting a Pull Request
1. Create a feature branch (`git checkout -b feat/my-awesome-feature`).
2. Keep PRs focused on a single change or bug.
3. Include screenshots or terminal logs for UI/behavior changes.
4. Ensure no private API keys, secrets, or local tokens are committed.
