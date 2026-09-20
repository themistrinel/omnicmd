#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Quick Universal & Arch/Hyprland Uninstaller Entrypoint
# ==============================================================================
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/themistrinel/omnicmd/master/uninstall.sh | bash
#   ./uninstall.sh [--purge] [--yes]
#
# Environment variables:
#   OMNICMD_BRANCH   Branch to download from (default: master, with fallback to feat-develop)
# ==============================================================================

set -eo pipefail

REPO="themistrinel/omnicmd"
BRANCH="${OMNICMD_BRANCH:-master}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || echo "$PWD")"

if [ -f "$SCRIPT_DIR/scripts/uninstall-arch-hyprland.sh" ]; then
  exec bash "$SCRIPT_DIR/scripts/uninstall-arch-hyprland.sh" "$@"
else
  TMP_UNINSTALLER="$(mktemp -t omnicmd-uninstall-XXXXXX.sh)"
  trap 'rm -f "$TMP_UNINSTALLER"' EXIT

  URL="https://raw.githubusercontent.com/${REPO}/${BRANCH}/scripts/uninstall-arch-hyprland.sh"
  if ! curl -fsSL "$URL" -o "$TMP_UNINSTALLER" 2>/dev/null; then
    # Fallback para branch feat-develop
    URL="https://raw.githubusercontent.com/${REPO}/feat-develop/scripts/uninstall-arch-hyprland.sh"
    curl -fsSL "$URL" -o "$TMP_UNINSTALLER"
  fi

  chmod +x "$TMP_UNINSTALLER"
  exec bash "$TMP_UNINSTALLER" "$@"
fi
