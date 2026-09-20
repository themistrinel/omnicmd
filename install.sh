#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Quick Universal & Arch/Hyprland Installer Entrypoint
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || echo "$PWD")"

if [ -f "$SCRIPT_DIR/scripts/install-arch-hyprland.sh" ]; then
  exec bash "$SCRIPT_DIR/scripts/install-arch-hyprland.sh" "$@"
else
  # Quando executado via `curl ... | bash` direto da URL
  TMP_INSTALLER="$(mktemp)"
  curl -fsSL "https://raw.githubusercontent.com/themistrinel/omnicmd/main/scripts/install-arch-hyprland.sh" -o "$TMP_INSTALLER"
  chmod +x "$TMP_INSTALLER"
  exec bash "$TMP_INSTALLER" "$@"
fi
