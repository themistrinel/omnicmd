export interface UpdateCheckResult {
  available: boolean;
  currentVersion: string;
  version?: string;
  date?: string;
  body?: string;
}

export class UpdaterService {
  private static isTauriEnvironment(): boolean {
    return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
  }

  static async checkForUpdates(): Promise<UpdateCheckResult> {
    const currentVersion = '0.1.0';

    if (!this.isTauriEnvironment()) {
      // Fallback in web / dev browser environment using GitHub Releases API
      try {
        const response = await fetch('https://api.github.com/repos/omnicmd/omnicmd/releases/latest', {
          headers: { Accept: 'application/vnd.github.v3+json' },
        });
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

    try {
      const { check } = await import('@tauri-apps/plugin-updater');
      const update = await check();
      if (update) {
        return {
          available: true,
          currentVersion: update.currentVersion,
          version: update.version,
          date: update.date,
          body: update.body,
        };
      }
      return { available: false, currentVersion };
    } catch (err) {
      console.warn('Tauri updater check error:', err);
      return { available: false, currentVersion };
    }
  }

  static async downloadAndInstall(
    onProgress?: (progress: { downloaded: number; total?: number }) => void
  ): Promise<boolean> {
    if (!this.isTauriEnvironment()) {
      window.open('https://github.com/omnicmd/omnicmd/releases/latest', '_blank');
      return true;
    }

    try {
      const { check } = await import('@tauri-apps/plugin-updater');
      const update = await check();
      if (!update) return false;

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

      return true;
    } catch (err) {
      console.error('Failed to download & install update:', err);
      throw err;
    }
  }

  static async relaunchApp(): Promise<void> {
    if (!this.isTauriEnvironment()) {
      window.location.reload();
      return;
    }
    try {
      // In Tauri v2 core, window.location.reload or core process invocation can trigger reload
      window.location.reload();
    } catch {
      window.location.reload();
    }
  }

  private static compareSemver(v1: string, v2: string): number {
    const parts1 = v1.split('.').map((p) => parseInt(p, 10) || 0);
    const parts2 = v2.split('.').map((p) => parseInt(p, 10) || 0);
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const num1 = parts1[i] || 0;
      const num2 = parts2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }
}
