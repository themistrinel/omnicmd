#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Desinstalador Completo para Arch Linux & Hyprland
# ==============================================================================
# Remove com segurança todos os componentes instalados pelo OmniCmd:
# - Processos em execução e sockets IPC
# - Binários e utilitários em ~/.local/bin (omnicmd, toggle, update, uninstall)
# - Atalhos do sistema (.desktop) e ícones
# - Configurações e integrações no Hyprland (~/.config/hypr/omnicmd.conf)
# - Dados locais, histórico SQLite e caches (com flag --purge ou confirmação)
# ==============================================================================

set -eo pipefail

RED="\033[1;31m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
BLUE="\033[1;34m"
CYAN="\033[1;36m"
BOLD="\033[1m"
NC="\033[0m"

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[AVISO]${NC} $1"; }
log_error() { echo -e "${RED}[ERRO]${NC} $1"; }

PURGE=false
YES=false

for arg in "$@"; do
  case "$arg" in
    --purge|-p)
      PURGE=true
      ;;
    --yes|-y)
      YES=true
      ;;
    --help|-h)
      echo "Uso: $0 [OPÇÕES]"
      echo ""
      echo "Opções:"
      echo "  -p, --purge    Remove também os dados do usuário, histórico SQLite e caches"
      echo "  -y, --yes      Não pede confirmação interativa"
      echo "  -h, --help     Exibe esta ajuda"
      exit 0
      ;;
  esac
done

echo -e "${CYAN}${BOLD}"
echo "=============================================================================="
echo "    🗑️  OmniCmd - Desinstalador Completo para Arch Linux & Hyprland         "
echo "=============================================================================="
echo -e "${NC}"

if [ "$YES" = false ] && [ -t 0 ]; then
  read -r -p "Tem certeza que deseja desinstalar o OmniCmd? [s/N]: " CONFIRM
  CONFIRM=${CONFIRM:-N}
  if [[ ! "$CONFIRM" =~ ^[SsYy]$ ]]; then
    log_info "Desinstalação cancelada pelo usuário."
    exit 0
  fi
fi

# ------------------------------------------------------------------------------
# 1. Finalizar processos em execução e sockets
# ------------------------------------------------------------------------------
log_info "Finalizando processos do OmniCmd em execução..."
pkill -9 -x "omnicmd" 2>/dev/null || true
pkill -9 -f "omnicmd-toggle" 2>/dev/null || true

# Limpeza de sockets IPC
rm -f "${XDG_RUNTIME_DIR:-/tmp}/omnicmd.sock" 2>/dev/null || true
rm -f /tmp/omnicmd*.sock 2>/dev/null || true
log_success "Processos e sockets limpos."

# ------------------------------------------------------------------------------
# 2. Remoção de Binários e Utilitários em ~/.local/bin
# ------------------------------------------------------------------------------
log_info "Removendo binários e scripts de ~/.local/bin/..."
BINARIES=(
  "$HOME/.local/bin/omnicmd"
  "$HOME/.local/bin/omnicmd-toggle"
  "$HOME/.local/bin/omnicmd-update"
  "$HOME/.local/bin/omnicmd-uninstall"
)

for bin in "${BINARIES[@]}"; do
  if [ -f "$bin" ] || [ -L "$bin" ]; then
    rm -f "$bin"
    log_info "Removido: $bin"
  fi
done
log_success "Binários removidos com sucesso."

# ------------------------------------------------------------------------------
# 3. Remoção do Lançador Desktop e Ícones
# ------------------------------------------------------------------------------
log_info "Removendo atalhos do sistema e ícones..."
DESKTOP_FILES=(
  "$HOME/.local/share/applications/omnicmd.desktop"
  "$HOME/.local/share/applications/appimagekit_"*"omnicmd.desktop"
)

for desk in "${DESKTOP_FILES[@]}"; do
  for f in $desk; do
    if [ -f "$f" ]; then
      rm -f "$f"
      log_info "Removido: $f"
    fi
  done
done

# Remover ícones
find "$HOME/.local/share/icons/hicolor" -type f -name "*omnicmd*" -delete 2>/dev/null || true

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$HOME/.local/share/applications" 2>/dev/null || true
fi
log_success "Atalhos e ícones removidos."

# ------------------------------------------------------------------------------
# 4. Limpeza das Configurações do Hyprland
# ------------------------------------------------------------------------------
log_info "Removendo regras e atalhos do Hyprland..."
HYPR_DIR="$HOME/.config/hypr"
HYPR_CONF="$HYPR_DIR/hyprland.conf"
HYPR_LUA="$HYPR_DIR/hyprland.lua"
OMNICMD_CONF="$HYPR_DIR/omnicmd.conf"
OMNICMD_LUA="$HYPR_DIR/omnicmd.lua"

# Remove os arquivos de configuração dedicados
if [ -f "$OMNICMD_CONF" ]; then
  rm -f "$OMNICMD_CONF"
  log_info "Removido: $OMNICMD_CONF"
fi
if [ -f "$OMNICMD_LUA" ]; then
  rm -f "$OMNICMD_LUA"
  log_info "Removido: $OMNICMD_LUA"
fi

# Remove a integração de hyprland.conf
if [ -f "$HYPR_CONF" ]; then
  if grep -q "omnicmd" "$HYPR_CONF"; then
    log_info "Removendo integração do OmniCmd em $HYPR_CONF..."
    TMP_HYPR="$(mktemp)"
    sed -E '/(# Integração Oficial OmniCmd|source.*omnicmd\.conf)/d' "$HYPR_CONF" > "$TMP_HYPR"
    mv "$TMP_HYPR" "$HYPR_CONF"
    log_success "Integração removida de $HYPR_CONF."
  fi
fi

# Remove a integração de hyprland.lua
if [ -f "$HYPR_LUA" ]; then
  if grep -q "omnicmd" "$HYPR_LUA"; then
    log_info "Removendo integração do OmniCmd em $HYPR_LUA..."
    TMP_HYPR="$(mktemp)"
    sed -E '/(-- Integração Oficial OmniCmd|pcall\(require,\s*"omnicmd"\))/d' "$HYPR_LUA" > "$TMP_HYPR"
    mv "$TMP_HYPR" "$HYPR_LUA"
    log_success "Integração removida de $HYPR_LUA."
  fi
fi

# Recarrega o Hyprland para aplicar a remoção de atalhos e regras
if command -v hyprctl >/dev/null 2>&1; then
  log_info "Recarregando configurações do Hyprland..."
  hyprctl reload >/dev/null 2>&1 || true
  log_success "Hyprland recarregado."
fi

# ------------------------------------------------------------------------------
# 5. Remoção de Pacotes AppImage residuais em ~/Applications
# ------------------------------------------------------------------------------
if [ -d "$HOME/Applications" ]; then
  find "$HOME/Applications" -maxdepth 1 -type f -name "*omnicmd*" -delete 2>/dev/null || true
fi

# ------------------------------------------------------------------------------
# 6. Dados de Aplicação, Histórico SQLite e Caches
# ------------------------------------------------------------------------------
DATA_DIRS=(
  "$HOME/.local/share/com.omnicmd.desktop"
  "$HOME/.local/share/omnicmd"
  "$HOME/.config/com.omnicmd.desktop"
  "$HOME/.cache/com.omnicmd.desktop"
)

HAS_DATA=false
for d in "${DATA_DIRS[@]}"; do
  if [ -d "$d" ]; then
    HAS_DATA=true
    break
  fi
done

if [ "$HAS_DATA" = true ]; then
  DO_PURGE="$PURGE"
  if [ "$PURGE" = false ] && [ "$YES" = false ] && [ -t 0 ]; then
    echo ""
    read -r -p "Deseja também apagar o histórico de comandos SQLite e configurações salvas? [s/N]: " CONFIRM_DATA
    CONFIRM_DATA=${CONFIRM_DATA:-N}
    if [[ "$CONFIRM_DATA" =~ ^[SsYy]$ ]]; then
      DO_PURGE=true
    fi
  fi

  if [ "$DO_PURGE" = true ]; then
    log_info "Removendo histórico SQLite e configurações de dados..."
    for d in "${DATA_DIRS[@]}"; do
      if [ -d "$d" ]; then
        rm -rf "$d"
        log_info "Removido diretório: $d"
      fi
    done
    log_success "Dados locais e histórico removidos com sucesso."
  else
    log_info "Dados locais e histórico SQLite foram mantidos em ~/.local/share/com.omnicmd.desktop."
  fi
fi

echo ""
echo -e "${GREEN}${BOLD}==============================================================================${NC}"
echo -e "${GREEN}${BOLD}   ✨ OmniCmd foi completamente desinstalado do seu sistema!                 ${NC}"
echo -e "${GREEN}${BOLD}==============================================================================${NC}"
echo ""
