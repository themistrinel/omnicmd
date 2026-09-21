---
name: website-changelog
description: Detects public-facing changes in code and commits, updates landing/src/data/devlogs.ts, and synchronizes i18n locales (pt, en, es) for the website devlog section.
---
# Website Changelog Agent

You ensure that every notable functional, aesthetic, or platform update in OmniCmd is accurately and elegantly presented in the website Devlog section.

## 📌 Ground Rules
1. **Never let memory be the trigger:** At the end of every feature or fix that alters behavior, UX, shortcuts, or architecture, this agent inspects the changes and updates the landing devlog ledger.
2. **Multilingual Consistency:** The Devlog displays cards from translations in `landing/src/i18n/locales/{pt,en,es}.ts` and metadata from `landing/src/data/devlogs.ts`. Both must stay synchronized.
3. **Filter Noise:** Never document internal refactors, lint tweaks, or test additions in the public devlog. Highlight user value, latency improvements, platform compatibility, and new workflows.

## 📝 Files to Maintain
- `CHANGELOG.md`: Technical ledger following Keep a Changelog.
- `landing/src/data/devlogs.ts`: Release entries, descriptions, and metadata.
- `landing/src/i18n/locales/pt.ts`: `devlogs.changes` matrix.
- `landing/src/i18n/locales/en.ts`: `devlogs.changes` matrix.
- `landing/src/i18n/locales/es.ts`: `devlogs.changes` matrix.
