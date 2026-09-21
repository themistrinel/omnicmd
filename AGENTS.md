# OmniCmd Agent Guidelines & Project Directives

## 🌟 Global Directive on Releases and Documentation
> **Grandes mudanças funcionais, mudanças de UX/UI, novos recursos, correções importantes, alterações de comportamento, mudanças de plataforma e mudanças relevantes de arquitetura DEVEM ser avaliadas para atualização do website/devlog e, quando aplicável, para uma nova versão.**

## 🔄 Development & Release Workflow
1. **Mudanças Cotidianas / Ajustes Internos:**
   - Typos, refactors sem impacto funcional, testes internos -> commit normal na branch de trabalho.
2. **Mudanças Relevantes:**
   - Features, suporte a SOs, melhorias de atalhos, novos designs -> atualizar `CHANGELOG.md` e `landing/src/data/devlogs.ts` com as novidades.
3. **Novas Versões Públicas:**
   - Executar `./scripts/bump-version.sh <version>` para sincronizar todos os manifestos (`package.json`, `Cargo.toml`, `tauri.conf.json`, `landing`).
   - Gerar tag `v<version>` para disparar o GitHub Actions (`release.yml`).
   - O deploy da landing page (`deploy-landing.yml`) é acionado automaticamente após a publicação da release.

## ⌨️ Multiplatform Shortcuts Contract
- **Windows:** Atalho padrão de launcher é `Alt+Space` (com fallbacks `Ctrl+Space`, `Ctrl+Shift+Space`). NUNCA registrar `Win+A` (conflito com a Central de Ações do Windows) ou `Win+Space` (conflito com troca de teclado).
- **macOS:** Atalho padrão é `Option+Space` (`Alt+Space`) ou `Command+Shift+Space`. NUNCA registrar `Cmd+Space` (conflito com Spotlight) ou `Cmd+A` (conflito com Selecionar Tudo).
- **Linux:** Suporte duplo: IPC socket daemon via script `omnicmd-toggle` (padrão Hyprland/Wayland) e hook de atalho global para sessões X11.
