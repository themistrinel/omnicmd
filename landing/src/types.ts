import React from 'react';

export type OSPlatform = 'mac' | 'linux' | 'windows';

export interface DownloadInfo {
  osName: string;
  icon: React.ReactNode;
  format: string;
  url: string;
  releaseNote: string;
  secondaryUrl?: string;
  secondaryFormat?: string;
}

export interface PlatformDownloadLinks {
  linuxDeb: string;
  linuxAppImage: string;
  macDmg: string;
  windowsMsi: string;
  windowsExe: string;
  version: string;
}

export interface BenchmarkRow {
  metric: string;
  omniValue: string;
  electronValue: string;
  advantage: string;
}

export interface ShortcutItem {
  title: string;
  description: string;
  keys: string[];
  separator?: string;
}

export interface DevlogRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
  };
  prerelease: boolean;
  draft: boolean;
}

