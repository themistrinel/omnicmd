import { readText, writeText, readImage } from '@tauri-apps/plugin-clipboard-manager';
import { invoke } from '@tauri-apps/api/core';

function isTauriEnvironment(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

function optimizeCanvasDataUrl(canvas: HTMLCanvasElement): string {
  const MAX_DIM = 1920;
  const { width, height } = canvas;
  if (width <= MAX_DIM && height <= MAX_DIM) {
    return canvas.toDataURL('image/png');
  }

  let targetW = width;
  let targetH = height;
  if (targetW > targetH) {
    targetH = Math.round((targetH * MAX_DIM) / targetW);
    targetW = MAX_DIM;
  } else {
    targetW = Math.round((targetW * MAX_DIM) / targetH);
    targetH = MAX_DIM;
  }

  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = targetW;
  scaledCanvas.height = targetH;
  const scaledCtx = scaledCanvas.getContext('2d');
  if (!scaledCtx) return canvas.toDataURL('image/png');

  scaledCtx.imageSmoothingEnabled = true;
  scaledCtx.imageSmoothingQuality = 'high';
  scaledCtx.drawImage(canvas, 0, 0, targetW, targetH);
  return scaledCanvas.toDataURL('image/jpeg', 0.88);
}

export class ClipboardService {
  static async read(): Promise<string> {
    // 1. Tenta via comando Tauri nativo (wl-paste nativo no Wayland/Hyprland)
    if (isTauriEnvironment()) {
      try {
        const res = await invoke<string>('read_from_clipboard');
        if (typeof res === 'string') {
          return res.trim();
        }
      } catch (err) {
        console.warn('Native read_from_clipboard failed, falling back:', err);
      }
    }

    // 2. Tenta plugin do Tauri
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
              return optimizeCanvasDataUrl(canvas);
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
    if (!content) return false;

    // 1. Tenta via comando Tauri nativo (wl-copy nativo para Hyprland/Wayland)
    if (isTauriEnvironment()) {
      try {
        await invoke('copy_to_clipboard', { text: content });
        return true;
      } catch (err) {
        console.warn('Native copy_to_clipboard failed, trying fallback:', err);
      }
    }

    // 2. Tenta plugin oficial do Tauri
    try {
      if (isTauriEnvironment()) {
        await writeText(content);
        return true;
      }
    } catch (err) {
      console.warn('Plugin writeText failed:', err);
    }

    // 3. Tenta API moderna do navegador (navigator.clipboard)
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
        return true;
      }
    } catch (err) {
      console.warn('navigator.clipboard.writeText failed:', err);
    }

    // 4. Fallback com textarea temporário (document.execCommand)
    try {
      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (success) return true;
    } catch (err) {
      console.error('All clipboard methods failed:', err);
    }

    return false;
  }
}
