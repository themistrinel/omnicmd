import { describe, it, expect, afterEach } from 'vitest';
import { en } from '../locales/en';
import { pt } from '../locales/pt';
import { es } from '../locales/es';
import { detectBrowserLanguage } from '../LanguageContext';

describe('i18n suite', () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  it('detects language correctly', () => {
    // Mock navigator with pt-BR
    globalThis.window = {
      navigator: {
        languages: ['pt-BR', 'pt', 'en-US'],
        language: 'pt-BR',
      },
    } as unknown as Window & typeof globalThis;
    expect(detectBrowserLanguage()).toBe('pt');

    // Mock navigator with es-ES
    globalThis.window = {
      navigator: {
        languages: ['es-ES', 'es', 'en'],
        language: 'es-ES',
      },
    } as unknown as Window & typeof globalThis;
    expect(detectBrowserLanguage()).toBe('es');

    // Mock navigator with en-GB
    globalThis.window = {
      navigator: {
        languages: ['en-GB', 'en'],
        language: 'en-GB',
      },
    } as unknown as Window & typeof globalThis;
    expect(detectBrowserLanguage()).toBe('en');

    // Mock navigator with unsupported language (e.g. ja-JP)
    globalThis.window = {
      navigator: {
        languages: ['ja-JP', 'ja'],
        language: 'ja-JP',
      },
    } as unknown as Window & typeof globalThis;
    expect(detectBrowserLanguage()).toBe('en');
  });

  it('validates translations integrity across all supported locales', () => {
    const locales = { en, pt, es };

    for (const [code, trans] of Object.entries(locales)) {
      expect(trans.nav.cockpit, `${code} missing nav.cockpit`).toBeDefined();
      expect(trans.hero.headline, `${code} missing hero.headline`).toBeDefined();
      expect(trans.hero.paletteImage, `${code} missing hero.paletteImage`).toBeDefined();
      expect(trans.hero.paletteAlt, `${code} missing hero.paletteAlt`).toBeDefined();
      expect(
        trans.hero.paletteImage,
        `${code} hero.paletteImage should point to ./omnicmd-palette-${code}.png`,
      ).toBe(`./omnicmd-palette-${code}.png`);
      expect(trans.features.headline, `${code} missing features.headline`).toBeDefined();
      expect(trans.workflow.headline, `${code} missing workflow.headline`).toBeDefined();
      expect(trans.benchmarks.headline, `${code} missing benchmarks.headline`).toBeDefined();
      expect(trans.commands.headline, `${code} missing commands.headline`).toBeDefined();
      expect(trans.downloads.headline, `${code} missing downloads.headline`).toBeDefined();
      expect(trans.devlogs.headline, `${code} missing devlogs.headline`).toBeDefined();
      expect(trans.cta.headline, `${code} missing cta.headline`).toBeDefined();

      expect(trans.commands.items.length).toBe(8);
      expect(trans.commands.systemItems.length).toBe(4);
      expect(trans.features.card1.directives.length).toBe(4);
      expect(trans.devlogs.changes.length).toBe(3);
    }
  });
});

