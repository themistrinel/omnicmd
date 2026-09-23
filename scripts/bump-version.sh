#!/usr/bin/env bash
# ==============================================================================
# OmniCmd - Unified Version Bump & Release Automation Script
# ==============================================================================
# Synchronizes versions across all project surfaces:
# - package.json (root)
# - src-tauri/Cargo.toml
# - src-tauri/tauri.conf.json
# - landing/package.json
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

NEW_VERSION="$1"

if [ -z "$NEW_VERSION" ]; then
  CURRENT_VERSION=$(node -p "require('${ROOT_DIR}/package.json').version")
  echo "Current version: ${CURRENT_VERSION}"
  echo "Usage: ./scripts/bump-version.sh <new_version> [--commit] [--tag]"
  echo "Example: ./scripts/bump-version.sh 0.1.1 --commit --tag"
  exit 1
fi

# Strip optional leading 'v'
NEW_VERSION="${NEW_VERSION#v}"

# Validate SemVer format
if [[ ! "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.]+)?$ ]]; then
  echo "❌ Error: '${NEW_VERSION}' is not a valid Semantic Version (e.g. 0.1.1, 0.2.0, 1.0.0-rc1)"
  exit 1
fi

echo "🚀 Bumping OmniCmd version to ${NEW_VERSION} across all files..."

# 1. Update root package.json
node -e "
const fs = require('fs');
const pkgPath = '${ROOT_DIR}/package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = '${NEW_VERSION}';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
"
echo "  ✓ Updated package.json"

# 2. Update landing/package.json
node -e "
const fs = require('fs');
const pkgPath = '${ROOT_DIR}/landing/package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = '${NEW_VERSION}';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
"
echo "  ✓ Updated landing/package.json"

# 3. Update src-tauri/tauri.conf.json
node -e "
const fs = require('fs');
const confPath = '${ROOT_DIR}/src-tauri/tauri.conf.json';
const conf = JSON.parse(fs.readFileSync(confPath, 'utf8'));
conf.version = '${NEW_VERSION}';
fs.writeFileSync(confPath, JSON.stringify(conf, null, 2) + '\n');
"
echo "  ✓ Updated src-tauri/tauri.conf.json"

# 4. Update src-tauri/Cargo.toml (version under [package])
node -e "
const fs = require('fs');
const cargoPath = '${ROOT_DIR}/src-tauri/Cargo.toml';
let content = fs.readFileSync(cargoPath, 'utf8');
content = content.replace(/(name\s*=\s*\"omnicmd\"\s*\nversion\s*=\s*\")[^\"]+(\")/, '\$1${NEW_VERSION}\$2');
fs.writeFileSync(cargoPath, content);
"
echo "  ✓ Updated src-tauri/Cargo.toml"

# 5. Update landing/src/constants.ts and src/constants.ts (APP_VERSION)
node -e "
const fs = require('fs');
for (const p of ['${ROOT_DIR}/landing/src/constants.ts', '${ROOT_DIR}/src/constants.ts']) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/(export const APP_VERSION\s*=\s*')[^']+(';)/, '\$1${NEW_VERSION}\$2');
    fs.writeFileSync(p, content);
  }
}
"
echo "  ✓ Updated landing/src/constants.ts and src/constants.ts"

# 6. Run typecheck & build to verify consistency
echo "🔍 Verifying builds with new version..."
cd "${ROOT_DIR}"
pnpm build >/dev/null
pnpm build:landing >/dev/null
echo "  ✓ App and landing builds verified!"

# 7. Optional Git Commit & Tag
DO_COMMIT=false
DO_TAG=false

for arg in "$@"; do
  if [ "$arg" == "--commit" ]; then
    DO_COMMIT=true
  elif [ "$arg" == "--tag" ]; then
    DO_TAG=true
  fi
done

if [ "$DO_COMMIT" = true ]; then
  git add package.json landing/package.json src-tauri/tauri.conf.json src-tauri/Cargo.toml CHANGELOG.md landing/src/data/devlogs.ts landing/src/i18n/locales/
  git commit -m "chore(release): bump version to v${NEW_VERSION}"
  echo "  ✓ Created commit for v${NEW_VERSION}"
fi

if [ "$DO_TAG" = true ]; then
  git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}"
  echo "  ✓ Created git tag v${NEW_VERSION}"
  echo "👉 Push to trigger automated GitHub Release build:"
  echo "   git push origin master && git push origin v${NEW_VERSION}"
fi

echo "✨ Successfully bumped version to ${NEW_VERSION}!"
