#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Multiplatform & Local Build Helper Script
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${ROOT_DIR}"

echo "========================================="
echo "   🚀 OmniCmd Build Helper"
echo "========================================="

# Helper functions
info() {
  echo -e "\033[1;34m[INFO]\033[0m $1"
}

success() {
  echo -e "\033[1;32m[SUCCESS]\033[0m $1"
}

warn() {
  echo -e "\033[1;33m[WARN]\033[0m $1"
}

error() {
  echo -e "\033[1;31m[ERROR]\033[0m $1"
  exit 1
}

# 1. Dependency checks
info "Checking environment dependencies..."

command -v node >/dev/null 2>&1 || error "Node.js is not installed."
command -v pnpm >/dev/null 2>&1 || error "pnpm is not installed. Run: npm install -g pnpm"
command -v cargo >/dev/null 2>&1 || error "Rust / Cargo is not installed. Install via https://rustup.rs"

# Detect OS
OS="$(uname -s)"
case "${OS}" in
  Linux*)     MACHINE="Linux";;
  Darwin*)    MACHINE="Mac";;
  CYGWIN*|MINGW*|MSYS*) MACHINE="Windows";;
  *)          MACHINE="UNKNOWN:${OS}"
esac
info "Detected platform: ${MACHINE}"

# Check Linux build libraries if running on Linux
if [ "${MACHINE}" = "Linux" ]; then
  info "Checking essential Linux packages..."
  MISSING_PKG=0
  for pkg in libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev libssl-dev; do
    if ! dpkg -s "$pkg" >/dev/null 2>&1; then
      warn "Package '$pkg' might be missing. Install with: sudo apt install $pkg"
      MISSING_PKG=1
    fi
  done
  if [ $MISSING_PKG -eq 0 ]; then
    info "All system libraries look ready."
  fi
fi

# 2. Install JS dependencies
info "Installing frontend dependencies with pnpm..."
pnpm install

# 3. Type check & build frontend
info "Type-checking and building web frontend..."
pnpm build

# 4. Check Cargo & Tauri
MODE="${1:-check}"

case "${MODE}" in
  check)
    info "Running Rust check & compilation verification..."
    cargo check --manifest-path src-tauri/Cargo.toml
    success "Check completed! Frontend and Rust code compile cleanly."
    echo ""
    echo "To produce full release binaries/installers for your platform, run:"
    echo "  ./scripts/build-local.sh bundle"
    ;;
  bundle)
    info "Building release bundle via Tauri CLI..."
    pnpm tauri build
    success "Release bundle built successfully! Check src-tauri/target/release/bundle/"
    ;;
  *)
    echo "Usage: $0 [check|bundle]"
    exit 1
    ;;
esac
