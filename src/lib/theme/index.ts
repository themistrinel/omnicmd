import { AppearanceSettings, ThemeMode, FontFamily, AccentColor } from '@/types';

export interface AccentColorMeta {
  id: AccentColor;
  name: string;
  hex: string;
  rgb: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
  ringClass: string;
  hoverBgClass: string;
  lightTextClass: string;
}

export const ACCENT_COLORS: Record<AccentColor, AccentColorMeta> = {
  indigo: {
    id: 'indigo',
    name: 'Índigo',
    hex: '#6366f1',
    rgb: '99, 102, 241',
    textClass: 'text-indigo-400',
    bgClass: 'bg-indigo-600',
    borderClass: 'border-indigo-500',
    ringClass: 'ring-indigo-500',
    hoverBgClass: 'hover:bg-indigo-500',
    lightTextClass: 'text-indigo-600',
  },
  emerald: {
    id: 'emerald',
    name: 'Esmeralda',
    hex: '#10b981',
    rgb: '16, 185, 129',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-600',
    borderClass: 'border-emerald-500',
    ringClass: 'ring-emerald-500',
    hoverBgClass: 'hover:bg-emerald-500',
    lightTextClass: 'text-emerald-600',
  },
  violet: {
    id: 'violet',
    name: 'Violeta',
    hex: '#8b5cf6',
    rgb: '139, 92, 246',
    textClass: 'text-violet-400',
    bgClass: 'bg-violet-600',
    borderClass: 'border-violet-500',
    ringClass: 'ring-violet-500',
    hoverBgClass: 'hover:bg-violet-500',
    lightTextClass: 'text-violet-600',
  },
  amber: {
    id: 'amber',
    name: 'Âmbar',
    hex: '#f59e0b',
    rgb: '245, 158, 11',
    textClass: 'text-amber-400',
    bgClass: 'bg-amber-600',
    borderClass: 'border-amber-500',
    ringClass: 'ring-amber-500',
    hoverBgClass: 'hover:bg-amber-500',
    lightTextClass: 'text-amber-600',
  },
  cyan: {
    id: 'cyan',
    name: 'Ciano',
    hex: '#06b6d4',
    rgb: '6, 182, 212',
    textClass: 'text-cyan-400',
    bgClass: 'bg-cyan-600',
    borderClass: 'border-cyan-500',
    ringClass: 'ring-cyan-500',
    hoverBgClass: 'hover:bg-cyan-500',
    lightTextClass: 'text-cyan-600',
  },
  rose: {
    id: 'rose',
    name: 'Rose',
    hex: '#f43f5e',
    rgb: '244, 63, 94',
    textClass: 'text-rose-400',
    bgClass: 'bg-rose-600',
    borderClass: 'border-rose-500',
    ringClass: 'ring-rose-500',
    hoverBgClass: 'hover:bg-rose-500',
    lightTextClass: 'text-rose-600',
  },
  zinc: {
    id: 'zinc',
    name: 'Zinc / Mono',
    hex: '#71717a',
    rgb: '113, 113, 122',
    textClass: 'text-zinc-400',
    bgClass: 'bg-zinc-600',
    borderClass: 'border-zinc-500',
    ringClass: 'ring-zinc-500',
    hoverBgClass: 'hover:bg-zinc-500',
    lightTextClass: 'text-zinc-700',
  },
};

export interface FontFamilyMeta {
  id: FontFamily;
  name: string;
  description: string;
  previewSample: string;
  css: string;
}

export const FONT_FAMILIES: Record<FontFamily, FontFamilyMeta> = {
  system: {
    id: 'system',
    name: 'Interface do Sistema',
    description: 'Nativa, rápida e ergonomicamente alinhada ao seu SO',
    previewSample: 'Ag The quick brown fox 123',
    css: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  sans: {
    id: 'sans',
    name: 'Sans Moderna',
    description: 'Geométrica contemporânea com alta densidade e legibilidade',
    previewSample: 'Ag The quick brown fox 123',
    css: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  mono: {
    id: 'mono',
    name: 'Mono / Código',
    description: 'Monoespaçada de precisão estilo terminal e editor de código',
    previewSample: 'fn main() => 0x42;',
    css: '"JetBrains Mono", "Fira Code", "Cascadia Code", SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
};

let systemThemeMediaQuery: MediaQueryList | null = null;
let systemThemeListener: ((e: MediaQueryListEvent) => void) | null = null;

export function getEffectiveTheme(themeMode: ThemeMode): 'dark' | 'light' {
  if (themeMode === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  }
  return themeMode;
}

export function applyAppearanceSettings(appearance: AppearanceSettings): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const effectiveTheme = getEffectiveTheme(appearance.themeMode);

  // Apply dark / light class and data attributes
  if (effectiveTheme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }

  root.setAttribute('data-theme', effectiveTheme);
  root.setAttribute('data-theme-mode', appearance.themeMode);
  root.setAttribute('data-font', appearance.fontFamily);
  root.setAttribute('data-accent', appearance.accentColor);

  // CSS variables for HUD background & blur
  const opacity = Math.min(100, Math.max(50, appearance.hudOpacity ?? 95)) / 100;
  const blurPx = Math.min(32, Math.max(0, appearance.hudBlur ?? 20));

  root.style.setProperty('--hud-bg-opacity', opacity.toString());
  root.style.setProperty('--hud-blur', `${blurPx}px`);

  // Font family
  const fontMeta = FONT_FAMILIES[appearance.fontFamily] || FONT_FAMILIES.system;
  root.style.setProperty('--hud-font-family', fontMeta.css);
  document.body.style.fontFamily = fontMeta.css;

  // Accent color variables
  const accentMeta = ACCENT_COLORS[appearance.accentColor] || ACCENT_COLORS.indigo;
  root.style.setProperty('--accent-color', accentMeta.hex);
  root.style.setProperty('--accent-rgb', accentMeta.rgb);

  // Clean up previous system theme listener if mode is explicit
  if (appearance.themeMode !== 'system' && systemThemeMediaQuery && systemThemeListener) {
    systemThemeMediaQuery.removeEventListener('change', systemThemeListener);
    systemThemeMediaQuery = null;
    systemThemeListener = null;
  } else if (appearance.themeMode === 'system' && typeof window !== 'undefined' && window.matchMedia) {
    if (!systemThemeMediaQuery) {
      systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      systemThemeListener = () => {
        applyAppearanceSettings(appearance);
      };
      systemThemeMediaQuery.addEventListener('change', systemThemeListener);
    }
  }
}
