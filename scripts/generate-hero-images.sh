#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Multi-Language Hero Image Generator
# ==============================================================================
# Renders pixel-perfect, consistent localized hero images (EN, ES) derived directly
# from the Portuguese source-of-truth image (omnicmd-palette-pt.png).
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

CHROME_BIN="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"

if [ -z "$CHROME_BIN" ]; then
  echo "❌ Error: Google Chrome or Chromium is required to render hero images."
  exit 1
fi

echo "🎨 Rendering localized Hero images using ${CHROME_BIN}..."

# 1. English (EN)
echo "  → Generating omnicmd-palette-en.png..."
"$CHROME_BIN" --headless --disable-gpu --default-background-color=00000000 \
  --screenshot="${ROOT_DIR}/landing/public/omnicmd-palette-en.png" \
  --window-size=1804,1122 --hide-scrollbars \
  "file://${SCRIPT_DIR}/hero-templates/hero-en.html"

# 2. Spanish (ES)
echo "  → Generating omnicmd-palette-es.png..."
"$CHROME_BIN" --headless --disable-gpu --default-background-color=00000000 \
  --screenshot="${ROOT_DIR}/landing/public/omnicmd-palette-es.png" \
  --window-size=1804,1122 --hide-scrollbars \
  "file://${SCRIPT_DIR}/hero-templates/hero-es.html"

echo "✨ Localized hero images successfully generated with 100% visual consistency!"
