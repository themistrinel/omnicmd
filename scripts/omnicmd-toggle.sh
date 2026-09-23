#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Hyprland Smart Window Toggle Script
# ==============================================================================
# Alterna instantaneamente a visibilidade e foco do OmniCmd:
# - Se não estiver rodando: inicia a aplicação desacoplada em segundo plano.
# - Se estiver rodando: envia sinal instantâneo de toggle via IPC Unix Socket.
# ==============================================================================

set -eo pipefail

export GDK_BACKEND="wayland,x11"
export WEBKIT_DISABLE_DMABUF_RENDERER="1"

# Garante ~/.local/bin no PATH para comandos disparados por compositores
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
  export PATH="$HOME/.local/bin:$PATH"
fi

OMNICMD_BIN="$(command -v omnicmd 2>/dev/null || echo "$HOME/.local/bin/omnicmd")"

if [ -n "$XDG_RUNTIME_DIR" ]; then
  SOCKET_PATH="$XDG_RUNTIME_DIR/omnicmd.sock"
else
  CURRENT_USER="${USER:-default}"
  SOCKET_PATH="/tmp/omnicmd-${CURRENT_USER}.sock"
fi

# 1. Se o processo estiver rodando, tenta alternar via IPC (< 1ms)
if pgrep -x "omnicmd" >/dev/null 2>&1; then
  if "$OMNICMD_BIN" --toggle >/dev/null 2>&1; then
    exit 0
  fi
fi

# Se não estiver rodando (ou o IPC falhou), limpa socket residual se houver
rm -f "$SOCKET_PATH" 2>/dev/null || true

# 2. Se não estiver rodando, inicia o processo em segundo plano desacoplado
nohup "$OMNICMD_BIN" </dev/null >/dev/null 2>&1 &
disown
exit 0
