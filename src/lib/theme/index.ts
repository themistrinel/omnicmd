import { AppearanceSettings, ThemeMode, FontFamily, AccentColor } from '@/types';

export interface AccentColorMeta {
  id: AccentColor;
  name: string;
  hex: string;
  rgb: string;
  textHex: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
  ringClass: string;
  hoverBgClass: string;
  lightTextClass: string;
}

export const ACCENT_COLORS: Record<AccentColor, AccentColorMeta> = {
  sky: {
    id: 'sky',
    name: 'Azul Ícone',
    hex: '#50a2e8',
    rgb: '80, 162, 232',
    textHex: '#70b7f5',
    textClass: 'text-sky-400',
    bgClass: 'bg-sky-500',
    borderClass: 'border-sky-400',
    ringClass: 'ring-sky-400',
    hoverBgClass: 'hover:bg-sky-400',
    lightTextClass: 'text-sky-700',
  },
  cyan: {
    id: 'cyan',
    name: 'Ciano Elétrico',
    hex: '#06b6d4',
    rgb: '6, 182, 212',
    textHex: '#22d3ee',
    textClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500',
    borderClass: 'border-cyan-400',
    ringClass: 'ring-cyan-400',
    hoverBgClass: 'hover:bg-cyan-400',
    lightTextClass: 'text-cyan-800',
  },
  amber: {
    id: 'amber',
    name: 'Solar / Âmbar',
    hex: '#f59e0b',
    rgb: '245, 158, 11',
    textHex: '#fbbf24',
    textClass: 'text-amber-400',
    bgClass: 'bg-amber-500',
    borderClass: 'border-amber-400',
    ringClass: 'ring-amber-400',
    hoverBgClass: 'hover:bg-amber-400',
    lightTextClass: 'text-amber-800',
  },
  emerald: {
    id: 'emerald',
    name: 'Esmeralda',
    hex: '#10b981',
    rgb: '16, 185, 129',
    textHex: '#34d399',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500',
    borderClass: 'border-emerald-400',
    ringClass: 'ring-emerald-400',
    hoverBgClass: 'hover:bg-emerald-400',
    lightTextClass: 'text-emerald-800',
  },
  indigo: {
    id: 'indigo',
    name: 'Índigo',
    hex: '#6366f1',
    rgb: '99, 102, 241',
    textHex: '#a5b4fc',
    textClass: 'text-indigo-300',
    bgClass: 'bg-indigo-500',
    borderClass: 'border-indigo-400',
    ringClass: 'ring-indigo-400',
    hoverBgClass: 'hover:bg-indigo-400',
    lightTextClass: 'text-indigo-800',
  },
  violet: {
    id: 'violet',
    name: 'Violeta',
    hex: '#8b5cf6',
    rgb: '139, 92, 246',
    textHex: '#c4b5fd',
    textClass: 'text-violet-300',
    bgClass: 'bg-violet-500',
    borderClass: 'border-violet-400',
    ringClass: 'ring-violet-400',
    hoverBgClass: 'hover:bg-violet-400',
    lightTextClass: 'text-violet-800',
  },
  rose: {
    id: 'rose',
    name: 'Rose',
    hex: '#f43f5e',
    rgb: '244, 63, 94',
    textHex: '#fb7185',
    textClass: 'text-rose-400',
    bgClass: 'bg-rose-500',
    borderClass: 'border-rose-400',
    ringClass: 'ring-rose-400',
    hoverBgClass: 'hover:bg-rose-400',
    lightTextClass: 'text-rose-800',
  },
  zinc: {
    id: 'zinc',
    name: 'Titânio / Mono',
    hex: '#a1a1aa',
    rgb: '161, 161, 170',
    textHex: '#f1f5f9',
    textClass: 'text-slate-100',
    bgClass: 'bg-zinc-500',
    borderClass: 'border-zinc-400',
    ringClass: 'ring-zinc-400',
    hoverBgClass: 'hover:bg-zinc-400',
    lightTextClass: 'text-zinc-900',
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
  ibm_plex: {
    id: 'ibm_plex',
    name: 'IBM Plex Sans',
    description: 'Tipografia de engenharia com proporções técnicas e alta densidade',
    previewSample: 'Ag The quick brown fox 123',
    css: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  mono: {
    id: 'mono',
    name: 'IBM Plex Mono',
    description: 'Monoespaçada de engenharia para comandos, atalhos e código',
    previewSample: 'fn main() => 0x42;',
    css: '"IBM Plex Mono", SFMono-Regular, Menlo, Monaco, monospace',
  },
  sans: {
    id: 'sans',
    name: 'Sans Técnica',
    description: 'Geométrica limpa com proporções equilibradas e legibilidade',
    previewSample: 'Ag The quick brown fox 123',
    css: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
  },
  system: {
    id: 'system',
    name: 'Interface do Sistema',
    description: 'Nativa rápida e alinhada ao seu sistema operacional',
    previewSample: 'Ag The quick brown fox 123',
    css: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
  const fontMeta = FONT_FAMILIES[appearance.fontFamily] || FONT_FAMILIES.ibm_plex;
  root.style.setProperty('--hud-font-family', fontMeta.css);
  document.body.style.fontFamily = fontMeta.css;

  // Accent color variables
  const accentMeta = ACCENT_COLORS[appearance.accentColor] || ACCENT_COLORS.sky;
  const isDark = effectiveTheme === 'dark';
  const effectiveHex = !isDark && accentMeta.id === 'sky' ? '#0284c7' : accentMeta.hex;
  const effectiveRgb = !isDark && accentMeta.id === 'sky' ? '2, 132, 199' : accentMeta.rgb;
  const effectiveText = isDark ? accentMeta.textHex : (!isDark && accentMeta.id === 'sky' ? '#0369a1' : accentMeta.hex);

  root.style.setProperty('--accent-color', effectiveHex);
  root.style.setProperty('--accent-rgb', effectiveRgb);
  root.style.setProperty('--accent-text', effectiveText);
  root.style.setProperty('--accent-text-color', effectiveText);
  root.style.setProperty('--accent-glow', `rgba(${effectiveRgb}, 0.20)`);
  root.style.setProperty('--accent-subtle', `rgba(${effectiveRgb}, 0.12)`);

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
