import React from 'react';
import { Apple, Monitor, Terminal } from 'lucide-react';
import { DownloadInfo, OSPlatform } from './types';

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

export function getDownloadInfo(os: OSPlatform): DownloadInfo {
  switch (os) {
    case 'mac':
      return {
        osName: 'macOS',
        icon: React.createElement(Apple, { className: 'w-5 h-5' }),
        format: 'Universal .dmg (Apple Silicon & Intel)',
        url: 'https://github.com/themistrinel/omnicmd/releases/latest/download/OmniCmd_macOS_universal.dmg',
        releaseNote: 'Requires macOS 11+ (Big Sur, Monterey, Ventura, Sonoma, Sequoia)',
      };
    case 'windows':
      return {
        osName: 'Windows',
        icon: React.createElement(Monitor, { className: 'w-5 h-5' }),
        format: 'Installer (.msi) & Portable (.exe)',
        url: 'https://github.com/themistrinel/omnicmd/releases/latest/download/OmniCmd_x64_en-US.msi',
        releaseNote: 'Requires Windows 10/11 64-bit with WebView2 runtime',
      };
    case 'linux':
    default:
      return {
        osName: 'Linux',
        icon: React.createElement(Terminal, { className: 'w-5 h-5' }),
        format: 'Debian/Ubuntu (.deb) & Universal (.AppImage)',
        url: 'https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_amd64.deb',
        releaseNote: 'Requires GTK 3/4 & WebKit2GTK on modern Linux distributions',
      };
  }
}
