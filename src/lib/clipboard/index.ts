import { readText, writeText, readImage } from '@tauri-apps/plugin-clipboard-manager';

function isTauriEnvironment(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

export class ClipboardService {
  static async read(): Promise<string> {
    try {
      if (isTauriEnvironment()) {
        const text = await readText();
        return text ? text.trim() : '';
      } else if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        return text ? text.trim() : '';
      }
    } catch (err) {
      console.warn('Could not read clipboard text:', err);
    }
    return '';
  }

  static async readImageDataUrl(): Promise<string | null> {
    try {
      if (isTauriEnvironment()) {
        const img = await readImage();
        if (img) {
          const rgba = await img.rgba();
          const size = await img.size();
          if (size.width > 0 && size.height > 0 && rgba && rgba.length > 0) {
            const canvas = document.createElement('canvas');
            canvas.width = size.width;
            canvas.height = size.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const imgData = ctx.createImageData(size.width, size.height);
              imgData.data.set(rgba);
              ctx.putImageData(imgData, 0, 0);
              return canvas.toDataURL('image/png');
            }
          }
        }
      } else if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find((t) => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = () => resolve(null);
              reader.readAsDataURL(blob);
            });
          }
        }
      }
    } catch (_) {
      // Clipboard doesn't contain an image or access not granted
    }
    return null;
  }

  static async write(content: string): Promise<boolean> {
    try {
      if (isTauriEnvironment()) {
        await writeText(content);
        return true;
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
        return true;
      }
    } catch (err) {
      console.error('Could not write to clipboard:', err);
    }
    return false;
  }
}
