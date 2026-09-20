#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Instalador Oficial para Arch Linux & Hyprland
# ==============================================================================
# - Detecta ambiente Arch Linux e compositor Hyprland (Wayland)
# - Instala dependências essenciais de sistema (WebKit2GTK, wl-clipboard, etc.)
# - Instala os binários do OmniCmd em ~/.local/bin
# - Configura regras de janela (window rules) e atalhos (shortcuts) no Hyprland
# - Configura inicialização instantânea e ferramenta de auto-atualização
# ==============================================================================

set -eo pipefail

RED="\033[1;31m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
BLUE="\033[1;34m"
MAGENTA="\033[1;35m"
CYAN="\033[1;36m"
BOLD="\033[1m"
NC="\033[0m"

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[AVISO]${NC} $1"; }
log_error() { echo -e "${RED}[ERRO]${NC} $1"; }

REPO="themistrinel/omnicmd"
BRANCH="${OMNICMD_BRANCH:-main}"
RAW_BASE_URL="https://raw.githubusercontent.com/${REPO}/${BRANCH}"
FALLBACK_RAW_URL="https://raw.githubusercontent.com/${REPO}/feat-develop"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || echo "$PWD")"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." 2>/dev/null && pwd || echo "$PWD")"

INSTALL_DIR="${HOME}/.local/bin"
APPLICATIONS_DIR="${HOME}/.local/share/applications"
ICONS_DIR="${HOME}/.local/share/icons/hicolor/scalable/apps"
HYPR_CONFIG_DIR="${HOME}/.config/hypr"
HYPR_CONF="${HYPR_CONFIG_DIR}/hyprland.conf"
OMNICMD_HYPR_CONF="${HYPR_CONFIG_DIR}/omnicmd.conf"

fetch_raw_file() {
  local rel_path="$1"
  local dest="$2"

  if ! curl -fsSL "${RAW_BASE_URL}/${rel_path}" -o "$dest" 2>/dev/null; then
    curl -fsSL "${FALLBACK_RAW_URL}/${rel_path}" -o "$dest"
  fi
}

echo -e "${CYAN}${BOLD}"
echo "=============================================================================="
echo "    🚀 OmniCmd - Instalador & Otimizador para Hyprland (Arch Linux)          "
echo "=============================================================================="
echo -e "${NC}"

# ------------------------------------------------------------------------------
# 1. Validação de Sistema Operacional (Arch Linux)
# ------------------------------------------------------------------------------
log_info "Verificando distribuição..."
IS_ARCH=false
if [ -f /etc/arch-release ]; then
  IS_ARCH=true
elif [ -f /etc/os-release ]; then
  # shellcheck source=/dev/null
  . /etc/os-release
  if [ "${ID}" = "arch" ] || [[ "${ID_LIKE}" =~ arch ]]; then
    IS_ARCH=true
  fi
fi

if [ "$IS_ARCH" = false ]; then
  log_warn "Não foi detectado Arch Linux puro ou baseado em Arch (/etc/arch-release)."
  FORCE_RUN="N"
  if [ -c /dev/tty ]; then
    read -r -p "Deseja prosseguir mesmo assim? [s/N]: " FORCE_RUN < /dev/tty || FORCE_RUN="N"
  fi
  if [[ ! "$FORCE_RUN" =~ ^[SsYy]$ ]]; then
    log_error "Instalação cancelada. O instalador automático é otimizado para sistemas baseados em Arch Linux."
    exit 1
  fi
else
  log_success "Sistema Arch Linux identificado com sucesso!"
fi

# ------------------------------------------------------------------------------
# 2. Instalação de Dependências de Sistema
# ------------------------------------------------------------------------------
log_info "Verificando dependências necessárias para WebKitGTK, Wayland e Hyprland..."

PACKAGES=(
  "webkit2gtk-4.1"
  "libayatana-appindicator"
  "openssl"
  "wl-clipboard"
  "librsvg"
  "libxdo"
  "curl"
  "jq"
)

MISSING_PACKAGES=()
for pkg in "${PACKAGES[@]}"; do
  if ! pacman -Qi "$pkg" >/dev/null 2>&1; then
    MISSING_PACKAGES+=("$pkg")
  fi
done

if [ ${#MISSING_PACKAGES[@]} -gt 0 ]; then
  log_warn "Os seguintes pacotes necessários estão ausentes: ${MISSING_PACKAGES[*]}"
  
  SUDO_CMD=""
  if [ "$EUID" -ne 0 ]; then
    if command -v sudo >/dev/null 2>&1; then
      SUDO_CMD="sudo"
    else
      log_error "Comando sudo não encontrado. Por favor, instale como root: pacman -S ${MISSING_PACKAGES[*]}"
      exit 1
    fi
  fi

  log_info "Instalando pacotes via pacman (${MISSING_PACKAGES[*]})..."
  $SUDO_CMD pacman -S --needed --noconfirm "${MISSING_PACKAGES[@]}"
  log_success "Dependências instaladas com sucesso!"
else
  log_success "Todas as dependências de sistema já estão instaladas!"
fi

# ------------------------------------------------------------------------------
# 3. Preparação dos Diretórios Locais
# ------------------------------------------------------------------------------
mkdir -p "$INSTALL_DIR"
mkdir -p "$APPLICATIONS_DIR"
mkdir -p "$ICONS_DIR"
mkdir -p "$HYPR_CONFIG_DIR"

# ------------------------------------------------------------------------------
# 4. Instalação do Binário do OmniCmd
# ------------------------------------------------------------------------------
log_info "Preparando binário do OmniCmd..."

INSTALLED_FROM_LOCAL=false

# Se o usuário passou flag para compilar localmente
if [ "$1" = "--build" ] || [ "$1" = "-b" ]; then
  if [ -d "$ROOT_DIR/src-tauri" ]; then
    log_info "Flag --build detectada. Compilando binário nativo com Cargo..."
    cd "$ROOT_DIR"
    if command -v pnpm >/dev/null 2>&1; then
      pnpm build
      pnpm tauri build
    else
      cargo build --release --manifest-path src-tauri/Cargo.toml
    fi
    cp "$ROOT_DIR/src-tauri/target/release/omnicmd" "$INSTALL_DIR/omnicmd"
    INSTALLED_FROM_LOCAL=true
  fi
elif [ -f "$ROOT_DIR/src-tauri/target/release/omnicmd" ]; then
  log_info "Binário local compilado encontrado em target/release/omnicmd."
  cp "$ROOT_DIR/src-tauri/target/release/omnicmd" "$INSTALL_DIR/omnicmd"
  INSTALLED_FROM_LOCAL=true
elif [ -f "$ROOT_DIR/src-tauri/target/debug/omnicmd" ]; then
  log_info "Binário local de desenvolvimento encontrado em target/debug/omnicmd."
  cp "$ROOT_DIR/src-tauri/target/debug/omnicmd" "$INSTALL_DIR/omnicmd"
  INSTALLED_FROM_LOCAL=true
fi

if [ "$INSTALLED_FROM_LOCAL" = false ]; then
  log_info "Buscando release oficial mais recente no GitHub (${REPO})..."
  RELEASE_JSON="$(curl -sSL -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/${REPO}/releases/latest" 2>/dev/null || true)"
  
  DOWNLOAD_URL="$(echo "$RELEASE_JSON" | grep -o '"browser_download_url": "[^"]*"' | grep -iE 'amd64\.AppImage|\.AppImage|linux.*x86_64.*tar\.gz|linux-x64' | head -1 | cut -d'"' -f4 || true)"
  
  if [ -n "$DOWNLOAD_URL" ]; then
    log_info "Baixando release oficial de: $DOWNLOAD_URL..."
    TMP_DIR="$(mktemp -d)"
    DOWNLOAD_FILE="$TMP_DIR/omnicmd_download"
    curl -sSL --progress-bar -o "$DOWNLOAD_FILE" "$DOWNLOAD_URL"
    
    if [[ "$DOWNLOAD_URL" =~ \.tar\.gz$ ]]; then
      tar -xzf "$DOWNLOAD_FILE" -C "$TMP_DIR"
      FOUND_BIN="$(find "$TMP_DIR" -type f -name "omnicmd" | head -1)"
      if [ -n "$FOUND_BIN" ]; then
        DOWNLOAD_FILE="$FOUND_BIN"
      fi
    elif [[ "$DOWNLOAD_URL" =~ \.deb$ ]]; then
      ar -x "$DOWNLOAD_FILE" --output="$TMP_DIR" 2>/dev/null || true
      if [ -f "$TMP_DIR/data.tar.gz" ]; then
        tar -xzf "$TMP_DIR/data.tar.gz" -C "$TMP_DIR"
      elif [ -f "$TMP_DIR/data.tar.xz" ]; then
        tar -xJf "$TMP_DIR/data.tar.xz" -C "$TMP_DIR"
      fi
      FOUND_BIN="$(find "$TMP_DIR" -type f -name "omnicmd" | head -1)"
      if [ -n "$FOUND_BIN" ]; then
        DOWNLOAD_FILE="$FOUND_BIN"
      fi
    fi
    
    cp "$DOWNLOAD_FILE" "$INSTALL_DIR/omnicmd"
    rm -rf "$TMP_DIR"
    log_success "Binário baixado com sucesso!"
  else
    log_warn "Nenhuma release pré-compilada remota encontrada ainda no repositório."
    if [ -d "$ROOT_DIR/src-tauri" ] && command -v cargo >/dev/null 2>&1; then
      log_info "Compilando binário local com Cargo..."
      cd "$ROOT_DIR"
      cargo build --release --manifest-path src-tauri/Cargo.toml
      cp "$ROOT_DIR/src-tauri/target/release/omnicmd" "$INSTALL_DIR/omnicmd"
    else
      log_error "Não foi possível encontrar a release nem compilar localmente."
      log_info "Por favor, aguarde a conclusão do build de release no GitHub ou clone o repositório."
      exit 1
    fi
  fi
fi

chmod +x "$INSTALL_DIR/omnicmd"
log_success "Executável instalado em: ${INSTALL_DIR}/omnicmd"

# ------------------------------------------------------------------------------
# 5. Instalação dos Scripts Auxiliares (Toggle & Auto-Updater)
# ------------------------------------------------------------------------------
log_info "Instalando ferramentas auxiliares..."

# Script de alternância inteligente (Toggle)
if [ -f "$SCRIPT_DIR/omnicmd-toggle.sh" ]; then
  cp "$SCRIPT_DIR/omnicmd-toggle.sh" "$INSTALL_DIR/omnicmd-toggle"
else
  log_info "Baixando script omnicmd-toggle..."
  fetch_raw_file "scripts/omnicmd-toggle.sh" "$INSTALL_DIR/omnicmd-toggle"
fi
chmod +x "$INSTALL_DIR/omnicmd-toggle"
log_success "Script de alternância rápida instalado: ${INSTALL_DIR}/omnicmd-toggle"

# Script de auto-atualização (Update)
if [ -f "$SCRIPT_DIR/omnicmd-update.sh" ]; then
  cp "$SCRIPT_DIR/omnicmd-update.sh" "$INSTALL_DIR/omnicmd-update"
else
  log_info "Baixando script omnicmd-update..."
  fetch_raw_file "scripts/omnicmd-update.sh" "$INSTALL_DIR/omnicmd-update"
fi
chmod +x "$INSTALL_DIR/omnicmd-update"
log_success "Script de auto-atualização instalado: ${INSTALL_DIR}/omnicmd-update"

# ------------------------------------------------------------------------------
# 6. Instalação de Ícones e Atalho do Sistema (.desktop)
# ------------------------------------------------------------------------------
log_info "Configurando ícones e atalho no lançador de aplicativos..."

ICON_SRC="$ROOT_DIR/src-tauri/icons/ai-commander-icon.svg"
if [ -f "$ICON_SRC" ]; then
  cp "$ICON_SRC" "$ICONS_DIR/omnicmd.svg"
else
  log_info "Baixando ícone oficial do OmniCmd..."
  fetch_raw_file "src-tauri/icons/ai-commander-icon.svg" "$ICONS_DIR/omnicmd.svg" || true
fi

cat << EOF > "$APPLICATIONS_DIR/omnicmd.desktop"
[Desktop Entry]
Name=OmniCmd
Comment=The Keyboard-First AI Command Palette for Power Users
Exec=${INSTALL_DIR}/omnicmd-toggle
Icon=omnicmd
Terminal=false
Type=Application
Categories=Utility;Development;
StartupNotify=false
Keywords=ai;command;palette;assistant;spotlight;raycast;
EOF

chmod +x "$APPLICATIONS_DIR/omnicmd.desktop"
log_success "Lançador criado em: ${APPLICATIONS_DIR}/omnicmd.desktop"

# ------------------------------------------------------------------------------
# 7. Adaptação Específica para Hyprland (Window Rules & Shortcuts)
# ------------------------------------------------------------------------------
log_info "Configurando regras de janela e atalhos para o Hyprland..."

cat << 'EOF' > "$OMNICMD_HYPR_CONF"
# ==============================================================================
# OmniCmd - Configuração Dedicada para Hyprland
# Gerado automaticamente pelo instalador do OmniCmd
# ==============================================================================

# 1. Regras de Janela (Window Rules v2)
# Modo Nativo: Delega bordas ativas (col.active_border), cantos arredondados (rounding) e sombras ao Hyprland
windowrulev2 = float, class:^(omnicmd)$
windowrulev2 = center, class:^(omnicmd)$
windowrulev2 = size 800 560, class:^(omnicmd)$
windowrulev2 = stayfocused, class:^(omnicmd)$
windowrulev2 = pin, class:^(omnicmd)$
windowrulev2 = animation popin 95%, class:^(omnicmd)$

# 2. Atalhos de Teclado (Shortcuts / Binds)
# Pressione Super + Espaço para abrir ou fechar/alternar a paleta
bind = SUPER, SPACE, exec, ~/.local/bin/omnicmd-toggle

# Pressione Super + Shift + Espaço para abrir forçado
bind = SUPER SHIFT, SPACE, exec, ~/.local/bin/omnicmd
EOF

log_success "Arquivo de regras criado em: ${OMNICMD_HYPR_CONF}"

# Integrar no hyprland.conf caso não esteja incluído
if [ -f "$HYPR_CONF" ]; then
  if grep -q "omnicmd.conf" "$HYPR_CONF"; then
    log_info "A inclusão do omnicmd.conf já existe em ${HYPR_CONF}."
  else
    log_info "Criando backup de segurança em ${HYPR_CONF}.bak..."
    cp "$HYPR_CONF" "${HYPR_CONF}.bak.$(date +%Y%m%d%H%M%S)"
    
    echo "" >> "$HYPR_CONF"
    echo "# Integração Oficial OmniCmd AI Command Palette" >> "$HYPR_CONF"
    echo "source = ~/.config/hypr/omnicmd.conf" >> "$HYPR_CONF"
    log_success "Linha 'source = ~/.config/hypr/omnicmd.conf' adicionada ao seu hyprland.conf!"
  fi
else
  log_warn "Arquivo ${HYPR_CONF} não encontrado. Certifique-se de incluir 'source = ~/.config/hypr/omnicmd.conf' no seu arquivo de configuração do Hyprland."
fi

# ------------------------------------------------------------------------------
# 8. Verificação de PATH do Usuário
# ------------------------------------------------------------------------------
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
  log_warn "~/.local/bin não está atualmente no seu PATH!"
  log_info "Adicione 'export PATH=\"\$HOME/.local/bin:\$PATH\"' ao seu ~/.bashrc ou ~/.zshrc."
fi

# ------------------------------------------------------------------------------
# 9. Recarregar Hyprland em tempo real
# ------------------------------------------------------------------------------
if command -v hyprctl >/dev/null 2>&1; then
  log_info "Recarregando configurações do Hyprland..."
  hyprctl reload >/dev/null 2>&1 || true
  log_success "Hyprland recarregado com as novas regras e atalhos!"
fi

echo ""
echo -e "${GREEN}${BOLD}==============================================================================${NC}"
echo -e "${GREEN}${BOLD}   🎉 OmniCmd instalado e adaptado com sucesso para o Hyprland!              ${NC}"
echo -e "${GREEN}${BOLD}==============================================================================${NC}"
echo ""
echo -e "  • ${BOLD}Atalho Principal:${NC} ${CYAN}SUPER + SPACE${NC} (Abre ou fecha a paleta instantaneamente)"
echo -e "  • ${BOLD}Atalho Secundário:${NC} ${CYAN}SUPER + SHIFT + SPACE${NC}"
echo -e "  • ${BOLD}Comando de Alternância:${NC} ${CYAN}omnicmd-toggle${NC}"
echo -e "  • ${BOLD}Comando de Atualização:${NC} ${CYAN}omnicmd-update${NC} (Busca e instala novas versões do GitHub)"
echo -e "  • ${BOLD}Arquivo de Configuração:${NC} ${YELLOW}~/.config/hypr/omnicmd.conf${NC}"
echo ""
