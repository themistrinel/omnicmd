#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Hyprland Smart Window Toggle Script
# ==============================================================================
# Alterna instantaneamente a visibilidade e foco do OmniCmd no Hyprland:
# - Se não estiver rodando: inicia a aplicação.
# - Se estiver visível e em foco: fecha/oculta.
# - Se estiver aberto em segundo plano: traz o foco para a janela.
# ==============================================================================

set -eo pipefail

OMNICMD_BIN="$(command -v omnicmd 2>/dev/null || echo "$HOME/.local/bin/omnicmd")"

if ! command -v hyprctl >/dev/null 2>&1; then
  # Fallback caso não esteja no Hyprland
  if pgrep -x "omnicmd" >/dev/null; then
    pkill -x "omnicmd"
  else
    "$OMNICMD_BIN" "$@" &
  fi
  exit 0
fi

# Verifica se o processo está em execução
if ! pgrep -x "omnicmd" >/dev/null 2>&1; then
  # Não está rodando: inicia
  "$OMNICMD_BIN" "$@" >/dev/null 2>&1 &
  exit 0
fi

# Verifica se a janela ativa no momento é o omnicmd
ACTIVE_CLASS="$(hyprctl activewindow -j 2>/dev/null | grep -o '"class": "[^"]*"' | cut -d'"' -f4 || true)"

if [[ "$ACTIVE_CLASS" =~ ^[oO]mnicmd$ ]]; then
  # Está em foco: fecha a janela (ou mata para toggle rápido)
  hyprctl dispatch closewindow "class:^(omnicmd)$" 2>/dev/null || pkill -x "omnicmd"
else
  # Está aberto em segundo plano: foca e traz para frente
  hyprctl dispatch focuswindow "class:^(omnicmd)$" 2>/dev/null || {
    # Se a janela não existir mais, inicia novamente
    "$OMNICMD_BIN" "$@" >/dev/null 2>&1 &
  }
fi
