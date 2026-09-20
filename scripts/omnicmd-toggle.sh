#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Hyprland Smart Window Toggle Script
# ==============================================================================
# Alterna instantaneamente a visibilidade e foco do OmniCmd:
# - Se não estiver rodando: inicia a aplicação desacoplada em segundo plano.
# - Se estiver rodando: envia sinal instantâneo de toggle via IPC Unix Socket.
# ==============================================================================

set -eo pipefail

OMNICMD_BIN="$(command -v omnicmd 2>/dev/null || echo "$HOME/.local/bin/omnicmd")"
SOCKET_PATH="${XDG_RUNTIME_DIR:-/tmp}/omnicmd.sock"

# 1. Se o processo estiver rodando e com socket ativo, alterna via IPC (< 1ms)
if pgrep -x "omnicmd" >/dev/null 2>&1 || [ -S "$SOCKET_PATH" ]; then
  if "$OMNICMD_BIN" --toggle >/dev/null 2>&1; then
    exit 0
  fi
fi

# 2. Se não estiver rodando, inicia o processo em segundo plano desacoplado
nohup "$OMNICMD_BIN" >/dev/null 2>&1 &
exit 0
