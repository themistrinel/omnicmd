# OmniCmd Agent Guidelines & Project Directives

## 🌟 Global Directive on Releases and Documentation
> **Grandes mudanças funcionais, mudanças de UX/UI, novos recursos, correções importantes, alterações de comportamento, mudanças de plataforma e mudanças relevantes de arquitetura DEVEM ser avaliadas para atualização do website/devlog e, quando aplicável, para uma nova versão.**

## 🔄 Development & Release Workflow
1. **Mudanças Cotidianas / Ajustes Internos:**
   - Typos, refactors sem impacto funcional, testes internos, fixes de CI -> commit normal na branch de trabalho.
2. **Mudanças Relevantes:**
   - Features, suporte a SOs, melhorias de atalhos, novos designs, i18n -> atualizar `CHANGELOG.md` e `landing/src/data/devlogs.ts` com as novidades.
3. **Novas Versões Públicas (Builds & GitHub Releases):**
   - **AVISO CRÍTICO:** Releases públicas e geração de binários instaladores (`.deb`, `.AppImage`, `.msi`, `.exe`, `.dmg`) **SÓ ocorrem após criação e envio de Git Tag `v*` ao GitHub**. Fazer bump apenas nos arquivos JSON/TOML não cria o release!
   - **Passos Obrigatórios:**
     1. Executar `./scripts/bump-version.sh <version>` para sincronizar todos os manifestos (`package.json`, `Cargo.toml`, `tauri.conf.json`, `landing`).
     2. Assegurar que `CHANGELOG.md` e `landing/src/data/devlogs.ts` estejam alinhados com a versão.
     3. Commit e merge para a branch `master`.
     4. Gerar e enviar a tag Git:
        ```bash
        git tag -a v<version> origin/master -m "Release v<version>"
        git push origin v<version>
        ```
     5. O GitHub Actions (`release.yml`) compilará os binários para Linux, Windows e macOS automaticamente e criará a GitHub Release.
     6. O deploy da landing page (`deploy-landing.yml`) é acionado automaticamente após o sucesso da release.

## 🏗️ Build & CI Constraints
- **Tauri `frontendDist`:** Ao rodar `cargo check` ou `cargo test` isoladamente (ex: no CI), o diretório `dist` com `index.html` deve existir previamente (`mkdir -p dist && touch dist/index.html`), caso contrário o macro `tauri::generate_context!()` falhará em tempo de compilação.

## ⌨️ Multiplatform Shortcuts Contract
- **Windows:** Atalho padrão de launcher é `Alt+Space` (com fallbacks `Ctrl+Space`, `Ctrl+Shift+Space`). NUNCA registrar `Win+A` (conflito com a Central de Ações do Windows) ou `Win+Space` (conflito com troca de teclado).
- **macOS:** Atalho padrão é `Option+Space` (`Alt+Space`) ou `Command+Shift+Space`. NUNCA registrar `Cmd+Space` (conflito com Spotlight) ou `Cmd+A` (conflito com Selecionar Tudo).
- **Linux:** Suporte duplo: IPC socket daemon via script `omnicmd-toggle` (padrão Hyprland/Wayland) e hook de atalho global para sessões X11.
