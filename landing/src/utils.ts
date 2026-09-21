import React, { useEffect, useState } from 'react';
import { Apple, Monitor, Terminal } from 'lucide-react';
import { DownloadInfo, OSPlatform, PlatformDownloadLinks } from './types';
import { APP_VERSION, GITHUB_REPO, RELEASES_URL } from './constants';

export function detectUserOS(): OSPlatform {
  if (typeof window !== 'undefined') {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('mac') || ua.includes('darwin')) {
      return 'mac';
    } else if (ua.includes('win')) {
      return 'windows';
    }
  }
  return 'linux';
}

/**
 * Deterministic fallback download links matching exact Tauri build artifacts
 */
export function getDefaultDownloadLinks(version = APP_VERSION): PlatformDownloadLinks {
  const v = version.replace(/^v/, '');
  return {
    linuxDeb: `https://github.com/${GITHUB_REPO}/releases/download/v${v}/omnicmd_${v}_amd64.deb`,
    linuxAppImage: `https://github.com/${GITHUB_REPO}/releases/download/v${v}/omnicmd_${v}_amd64.AppImage`,
    macDmg: `https://github.com/${GITHUB_REPO}/releases/download/v${v}/omnicmd_${v}_universal.dmg`,
    windowsMsi: `https://github.com/${GITHUB_REPO}/releases/download/v${v}/omnicmd_${v}_x64_en-US.msi`,
    windowsExe: `https://github.com/${GITHUB_REPO}/releases/download/v${v}/omnicmd_${v}_x64-setup.exe`,
    version: v,
  };
}

/**
 * React hook that attempts dynamic discovery of the latest release assets from GitHub API,
 * gracefully falling back to deterministic versioned URLs.
 */
export function useResolvedDownloads(): PlatformDownloadLinks {
  const [links, setLinks] = useState<PlatformDownloadLinks>(() => getDefaultDownloadLinks());

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchLatestAssets() {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        const assets: Array<{ name: string; browser_download_url: string }> = data.assets || [];
        const tagName = (data.tag_name || '').replace(/^v/, '') || APP_VERSION;

        let debUrl = '';
        let appImageUrl = '';
        let dmgUrl = '';
        let msiUrl = '';
        let exeUrl = '';

        for (const asset of assets) {
          const name = asset.name.toLowerCase();
          const url = asset.browser_download_url;

          if (name.endsWith('.deb')) debUrl = url;
          else if (name.endsWith('.appimage')) appImageUrl = url;
          else if (name.endsWith('.dmg')) dmgUrl = url;
          else if (name.endsWith('.msi')) msiUrl = url;
          else if (name.endsWith('-setup.exe') || name.endsWith('.exe')) exeUrl = url;
        }

        const defaults = getDefaultDownloadLinks(tagName);

        if (isMounted) {
          setLinks({
            linuxDeb: debUrl || defaults.linuxDeb,
            linuxAppImage: appImageUrl || defaults.linuxAppImage,
            macDmg: dmgUrl || defaults.macDmg,
            windowsMsi: msiUrl || defaults.windowsMsi,
            windowsExe: exeUrl || defaults.windowsExe,
            version: tagName,
          });
        }
      } catch {
        // Silently preserve deterministic fallback on network failure or rate limit
      }
    }

    fetchLatestAssets();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return links;
}

export function getDownloadInfo(os: OSPlatform, customLinks?: PlatformDownloadLinks): DownloadInfo {
  const links = customLinks || getDefaultDownloadLinks();

  switch (os) {
    case 'mac':
      return {
        osName: 'macOS',
        icon: React.createElement(Apple, { className: 'w-5 h-5' }),
        format: 'Universal .dmg (Apple Silicon & Intel)',
        url: links.macDmg || RELEASES_URL,
        releaseNote: 'Requires macOS 11+ (Big Sur, Monterey, Ventura, Sonoma, Sequoia)',
      };
    case 'windows':
      return {
        osName: 'Windows',
        icon: React.createElement(Monitor, { className: 'w-5 h-5' }),
        format: 'Installer (.msi) & Portable (.exe)',
        url: links.windowsMsi || links.windowsExe || RELEASES_URL,
        secondaryUrl: links.windowsExe,
        secondaryFormat: 'Setup (.exe)',
        releaseNote: 'Requires Windows 10/11 64-bit with WebView2 runtime',
      };
    case 'linux':
    default:
      return {
        osName: 'Linux',
        icon: React.createElement(Terminal, { className: 'w-5 h-5' }),
        format: 'Debian/Ubuntu (.deb) & Universal (.AppImage)',
        url: links.linuxDeb || links.linuxAppImage || RELEASES_URL,
        secondaryUrl: links.linuxAppImage,
        secondaryFormat: 'Universal (.AppImage)',
        releaseNote: 'Requires GTK 3/4 & WebKit2GTK on modern Linux distributions',
      };
  }
}
