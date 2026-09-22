# OmniCmd - Agent Instructions & Project Directives

Este repositório contém o **OmniCmd** (Desktop App Tauri v2 + React 19 + Landing Page Astro/Vite).
Todo agente que trabalhar neste repositório DEVE seguir rigorosamente as regras abaixo.

---

## 🎯 1. Regra Fundamental de Ciclo de Vida e Releases
> **Grandes mudanças funcionais, mudanças de UX/UI, novos recursos, correções importantes, alterações de comportamento, mudanças de plataforma e mudanças relevantes de arquitetura DEVEM ser avaliadas para atualização do website/devlog e, quando aplicável, para uma nova versão.**

### Classificação de Mudanças:
1. **Mudanças Cotidianas / Ajustes Internos:**
   - Typos, refactors sem impacto funcional, testes internos, fixes de CI.
   - *Ação:* Commit normal na branch de trabalho.
2. **Mudanças Relevantes:**
   - Features, suporte a SOs, melhorias de atalhos, novos designs, i18n, correções de UX/UI.
   - *Ação:* Atualizar `CHANGELOG.md` e `landing/src/data/devlogs.ts` (e traduções em `landing/src/i18n/locales/`).
3. **Novas Versões Públicas (Builds & GitHub Releases):**
   - **IMPORTANTE:** Releases e compilação de binários (`.deb`, `.AppImage`, `.msi`, `.exe`, `.dmg`) **SÓ acontecem via Git Tag `v*`** disparada para o GitHub. Fazer apenas bump nos arquivos de texto NÃO cria a release no GitHub!
   - *Procedimento Obrigatório para Release:*
     1. Executar `./scripts/bump-version.sh <version>` para sincronizar todos os manifestos (`package.json`, `Cargo.toml`, `tauri.conf.json`, `landing`).
     2. Garantir que `CHANGELOG.md` e `landing/src/data/devlogs.ts` estejam alinhados com a versão.
     3. Fazer commit e push para a branch `master`.
     4. **Criar e enviar a tag Git**:
        ```bash
        git tag -a v<version> origin/master -m "Release v<version>"
        git push origin v<version>
        ```
     5. O GitHub Actions (`release.yml`) compilará automaticamente para Linux, Windows e macOS e publicará o Release no GitHub. O deploy da landing page (`deploy-landing.yml`) é acionado logo em seguida.

---

## 🏗️ 2. Build & CI Constraints
- **Tauri `frontendDist`:** Em qualquer job de CI ou script que rode `cargo check` ou `cargo test` isoladamente, a pasta `dist` com `index.html` deve existir previamente (`mkdir -p dist && touch dist/index.html`), caso contrário o macro `tauri::generate_context!()` entrará em pânico em tempo de compilação.
- **Validação Local:** Antes de abrir PR ou criar tag de release, valide:
  ```bash
  pnpm lint && pnpm test && pnpm build && pnpm build:landing
  cargo check --manifest-path src-tauri/Cargo.toml
  ```

---

## ⌨️ 3. Contrato de Atalhos Multiplataforma
- **Windows:** Atalho padrão é `Alt+Space` (fallbacks `Ctrl+Space`, `Ctrl+Shift+Space`). **NUNCA** registrar `Win+A` (conflito com a Central de Ações do Windows) ou `Win+Space` (conflito com troca de teclado do Windows).
- **macOS:** Atalho padrão é `Option+Space` (`Alt+Space`) ou `Command+Shift+Space`. **NUNCA** registrar `Cmd+Space` (conflito com Spotlight) ou `Cmd+A` (conflito com Selecionar Tudo).
- **Linux:** Suporte duplo: IPC socket daemon via script `omnicmd-toggle` (padrão Hyprland/Wayland) e hook de atalho global para sessões X11.
