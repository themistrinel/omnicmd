#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Arch Linux / Hyprland Auto-Updater Script
# ==============================================================================
# Verifica lançamentos no GitHub e atualiza a instalação local do OmniCmd.
# ==============================================================================

set -eo pipefail

REPO="themistrinel/omnicmd"
INSTALL_DIR="${HOME}/.local/bin"
TARGET_BIN="${INSTALL_DIR}/omnicmd"

RED="\033[1;31m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
BLUE="\033[1;34m"
CYAN="\033[1;36m"
NC="\033[0m"

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[AVISO]${NC} $1"; }
log_error() { echo -e "${RED}[ERRO]${NC} $1"; }

echo -e "${CYAN}====================================================${NC}"
echo -e "${CYAN}        ⚡ OmniCmd - Verificador de Atualização     ${NC}"
echo -e "${CYAN}====================================================${NC}"

# Detectar versão instalada
CURRENT_VERSION="0.0.0"
if [ -f "$TARGET_BIN" ]; then
  # Tenta extrair versão do binário ou de metadados
  CURRENT_VERSION="$("$TARGET_BIN" --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' || echo "0.1.0")"
fi
log_info "Versão local instalada: ${YELLOW}v${CURRENT_VERSION}${NC}"

log_info "Consultando a API do GitHub (${REPO})..."
RELEASE_JSON="$(curl -sSL -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/${REPO}/releases/latest" || true)"

if [ -z "$RELEASE_JSON" ] || echo "$RELEASE_JSON" | grep -q "Not Found"; then
  log_warn "Nenhuma release encontrada ou repositório inacessível no momento."
  exit 0
fi

LATEST_TAG="$(echo "$RELEASE_JSON" | grep -o '"tag_name": "[^"]*"' | head -1 | cut -d'"' -f4)"
LATEST_VERSION="${LATEST_TAG#v}"
RELEASE_BODY="$(echo "$RELEASE_JSON" | grep -o '"body": "[^"]*"' | head -1 | cut -d'"' -f4 | sed 's/\\r\\n/\n/g; s/\\n/\n/g' || true)"

if [ -z "$LATEST_VERSION" ]; then
  log_warn "Não foi possível obter a versão mais recente."
  exit 1
fi

log_info "Última versão disponível: ${GREEN}v${LATEST_VERSION}${NC}"

# Comparar versões
version_gt() {
  test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1"
}

if ! version_gt "$LATEST_VERSION" "$CURRENT_VERSION" && [ "$LATEST_VERSION" = "$CURRENT_VERSION" ]; then
  log_success "Você já está rodando a versão mais recente do OmniCmd (v${CURRENT_VERSION})!"
  exit 0
fi

echo ""
echo -e "${GREEN}✨ Nova versão disponível:${NC} ${YELLOW}v${CURRENT_VERSION}${NC} -> ${GREEN}v${LATEST_VERSION}${NC}"
if [ -n "$RELEASE_BODY" ]; then
  echo -e "${CYAN}Notas da versão:${NC}"
  echo "$RELEASE_BODY" | head -n 10
  echo ""
fi

# Perguntar ao usuário se deseja atualizar se for interativo
if [ -t 0 ]; then
  read -r -p "Deseja baixar e atualizar agora? [S/n]: " CONFIRM
  CONFIRM=${CONFIRM:-S}
  if [[ ! "$CONFIRM" =~ ^[SsYy]$ ]]; then
    log_info "Atualização cancelada pelo usuário."
    exit 0
  fi
fi

# Localizar asset de download para Linux (.AppImage ou .deb ou tar.gz ou binário)
DOWNLOAD_URL="$(echo "$RELEASE_JSON" | grep -o '"browser_download_url": "[^"]*"' | grep -iE 'amd64\.AppImage|\.AppImage|linux.*x86_64.*tar\.gz|linux-x64' | head -1 | cut -d'"' -f4 || true)"

if [ -z "$DOWNLOAD_URL" ]; then
  # Fallback: tentar qualquer asset de linux
  DOWNLOAD_URL="$(echo "$RELEASE_JSON" | grep -o '"browser_download_url": "[^"]*"' | grep -i 'linux' | head -1 | cut -d'"' -f4 || true)"
fi

if [ -z "$DOWNLOAD_URL" ]; then
  log_error "Não foi encontrado binário para Linux no release ${LATEST_TAG}."
  log_info "Você pode visitar: https://github.com/${REPO}/releases/tag/${LATEST_TAG}"
  exit 1
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

log_info "Baixando atualização de: $DOWNLOAD_URL..."
DOWNLOAD_FILE="$TMP_DIR/omnicmd_latest"
curl -sSL --progress-bar -o "$DOWNLOAD_FILE" "$DOWNLOAD_URL"

# Tratar arquivo baixado
if [[ "$DOWNLOAD_URL" =~ \.tar\.gz$ ]]; then
  tar -xzf "$DOWNLOAD_FILE" -C "$TMP_DIR"
  FOUND_BIN="$(find "$TMP_DIR" -type f -name "omnicmd" | head -1)"
  if [ -n "$FOUND_BIN" ]; then
    DOWNLOAD_FILE="$FOUND_BIN"
  fi
fi

chmod +x "$DOWNLOAD_FILE"

# Fechar instâncias do omnicmd antes de sobrescrever o executável
if pgrep -x "omnicmd" >/dev/null 2>&1; then
  log_info "Fechando instância aberta do OmniCmd..."
  pkill -x "omnicmd" || true
  sleep 1
fi

mkdir -p "$INSTALL_DIR"
cp "$DOWNLOAD_FILE" "$TARGET_BIN"
chmod +x "$TARGET_BIN"

log_success "OmniCmd atualizado com sucesso para v${LATEST_VERSION}!"
log_info "O binário foi instalado em: ${TARGET_BIN}"
