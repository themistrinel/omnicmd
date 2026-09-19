import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';

function isTauriEnvironment(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

export class WindowService {
  static async hide(): Promise<void> {
    if (isTauriEnvironment()) {
      try {
        await invoke('hide_window');
        return;
      } catch (err) {
        console.warn('Failed to hide window:', err);
      }
    }
  }

  static async show(): Promise<void> {
    if (isTauriEnvironment()) {
      try {
        await invoke('show_window');
        return;
      } catch (err) {
        console.warn('Failed to show window:', err);
      }
    }
  }

  static async onPaletteOpened(callback: () => void): Promise<UnlistenFn | (() => void)> {
    if (isTauriEnvironment()) {
      try {
        return await listen('palette-opened', () => {
          callback();
        });
      } catch (err) {
        console.warn('Could not listen for palette-opened event:', err);
      }
    }
    return () => {};
  }
}
