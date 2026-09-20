#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Quick Universal & Arch/Hyprland Installer Entrypoint
# ==============================================================================
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/themistrinel/omnicmd/main/install.sh | bash
#
# Environment variables:
#   OMNICMD_BRANCH   Branch to download from (default: main, with fallback to feat-develop)
# ==============================================================================

set -eo pipefail

REPO="themistrinel/omnicmd"
BRANCH="${OMNICMD_BRANCH:-main}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || echo "$PWD")"

if [ -f "$SCRIPT_DIR/scripts/install-arch-hyprland.sh" ]; then
  exec bash "$SCRIPT_DIR/scripts/install-arch-hyprland.sh" "$@"
else
  TMP_INSTALLER="$(mktemp -t omnicmd-install-XXXXXX.sh)"
  trap 'rm -f "$TMP_INSTALLER"' EXIT

  URL="https://raw.githubusercontent.com/${REPO}/${BRANCH}/scripts/install-arch-hyprland.sh"
  if ! curl -fsSL "$URL" -o "$TMP_INSTALLER" 2>/dev/null; then
    # Fallback para branch feat-develop caso main ainda esteja sendo preparada
    URL="https://raw.githubusercontent.com/${REPO}/feat-develop/scripts/install-arch-hyprland.sh"
    curl -fsSL "$URL" -o "$TMP_INSTALLER"
  fi

  chmod +x "$TMP_INSTALLER"
  exec bash "$TMP_INSTALLER" "$@"
fi
