import { getVersion } from '@tauri-apps/api/app';
import { invoke } from '@tauri-apps/api/core';
import { APP_VERSION } from '@/constants';

export interface UpdateCheckResult {
  available: boolean;
  currentVersion: string;
  version?: string;
  date?: string;
  body?: string;
}

export type InstallUpdateResult = { type: 'INSTALLED' } | { type: 'REDIRECTED_TO_BROWSER' };

export class UpdaterService {
  private static isTauriEnvironment(): boolean {
    return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
  }

  static async getCurrentVersion(): Promise<string> {
    const fallbackVersion = APP_VERSION;
    if (this.isTauriEnvironment()) {
      try {
        const v = await getVersion();
        if (v) return v;
      } catch {
        // Fallback
      }
    }
    return fallbackVersion;
  }

  static async checkForUpdates(): Promise<UpdateCheckResult> {
    const currentVersion = await this.getCurrentVersion();

    if (this.isTauriEnvironment()) {
      try {
        const { check } = await import('@tauri-apps/plugin-updater');
        const update = await check();
        if (update) {
          return {
            available: true,
            currentVersion: update.currentVersion || currentVersion,
            version: update.version,
            date: update.date,
            body: update.body,
          };
        }
      } catch (err) {
        console.warn('Tauri updater check failed, trying GitHub API fallback:', err);
      }
    }

    // Fallback: GitHub Releases API
    try {
      const response = await fetch(
        'https://api.github.com/repos/themistrinel/omnicmd/releases/latest',
        {
          headers: { Accept: 'application/vnd.github.v3+json' },
        }
      );
      if (!response.ok) {
        return { available: false, currentVersion };
      }
      const data = await response.json();
      const latestTag = data.tag_name ? data.tag_name.replace(/^v/, '') : currentVersion;
      const isNewer = this.compareSemver(latestTag, currentVersion) > 0;

      return {
        available: isNewer,
        currentVersion,
        version: latestTag,
        date: data.published_at,
        body: data.body,
      };
    } catch (err) {
      console.warn('Failed to query GitHub releases for updates:', err);
      return { available: false, currentVersion };
    }
  }

  static async downloadAndInstall(
    onProgress?: (progress: { downloaded: number; total?: number }) => void
  ): Promise<InstallUpdateResult> {
    if (!this.isTauriEnvironment()) {
      window.open('https://github.com/themistrinel/omnicmd/releases/latest', '_blank');
      return { type: 'REDIRECTED_TO_BROWSER' };
    }

    try {
      const { check } = await import('@tauri-apps/plugin-updater');
      const update = await check();
      if (!update) {
        // Fallback: abre a página de download do GitHub se o updater interno não tiver o pacote assinado
        window.open('https://github.com/themistrinel/omnicmd/releases/latest', '_blank');
        return { type: 'REDIRECTED_TO_BROWSER' };
      }

      let downloaded = 0;
      let total: number | undefined;

      await update.downloadAndInstall((event) => {
        if (event.event === 'Started') {
          total = event.data.contentLength;
          if (onProgress) onProgress({ downloaded: 0, total });
        } else if (event.event === 'Progress') {
          downloaded += event.data.chunkLength;
          if (onProgress) onProgress({ downloaded, total });
        } else if (event.event === 'Finished') {
          if (onProgress) onProgress({ downloaded: total || downloaded, total });
        }
      });

      return { type: 'INSTALLED' };
    } catch (err) {
      console.error('Failed to download & install update via internal updater, opening GitHub:', err);
      window.open('https://github.com/themistrinel/omnicmd/releases/latest', '_blank');
      return { type: 'REDIRECTED_TO_BROWSER' };
    }
  }

  static async relaunchApp(): Promise<void> {
    if (this.isTauriEnvironment()) {
      try {
        await invoke('restart_app');
        return;
      } catch (err) {
        console.warn('Failed to invoke restart_app command:', err);
      }
    }
    window.location.reload();
  }

  private static compareSemver(v1: string, v2: string): number {
    const cleanV1 = v1.replace(/^v/, '').split('-')[0];
    const cleanV2 = v2.replace(/^v/, '').split('-')[0];
    const parts1 = cleanV1.split('.').map((p) => parseInt(p, 10) || 0);
    const parts2 = cleanV2.split('.').map((p) => parseInt(p, 10) || 0);
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const num1 = parts1[i] || 0;
      const num2 = parts2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }
}
