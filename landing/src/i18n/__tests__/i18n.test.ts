import assert from 'node:assert';
import { en } from '../locales/en';
import { pt } from '../locales/pt';
import { es } from '../locales/es';
import { detectBrowserLanguage } from '../LanguageContext';

function testLanguageDetection() {
  const originalWindow = globalThis.window;

  // Mock navigator with pt-BR
  // @ts-expect-error Mocking window
  globalThis.window = {
    navigator: {
      languages: ['pt-BR', 'pt', 'en-US'],
      language: 'pt-BR',
    },
  };
  assert.strictEqual(detectBrowserLanguage(), 'pt', 'Should detect Portuguese from pt-BR');

  // Mock navigator with es-ES
  // @ts-expect-error Mocking window
  globalThis.window = {
    navigator: {
      languages: ['es-ES', 'es', 'en'],
      language: 'es-ES',
    },
  };
  assert.strictEqual(detectBrowserLanguage(), 'es', 'Should detect Spanish from es-ES');

  // Mock navigator with en-GB
  // @ts-expect-error Mocking window
  globalThis.window = {
    navigator: {
      languages: ['en-GB', 'en'],
      language: 'en-GB',
    },
  };
  assert.strictEqual(detectBrowserLanguage(), 'en', 'Should detect English from en-GB');

  // Mock navigator with unsupported language (e.g. ja-JP)
  // @ts-expect-error Mocking window
  globalThis.window = {
    navigator: {
      languages: ['ja-JP', 'ja'],
      language: 'ja-JP',
    },
  };
  assert.strictEqual(detectBrowserLanguage(), 'en', 'Should fallback to English for unsupported languages');

  // Restore
  // @ts-expect-error Restoring window
  globalThis.window = originalWindow;

  console.log('✓ testLanguageDetection passed');
}

function testTranslationsIntegrity() {
  const locales = { en, pt, es };

  for (const [code, trans] of Object.entries(locales)) {
    assert.ok(trans.nav.cockpit, `${code} missing nav.cockpit`);
    assert.ok(trans.hero.headline, `${code} missing hero.headline`);
    assert.ok(trans.features.headline, `${code} missing features.headline`);
    assert.ok(trans.workflow.headline, `${code} missing workflow.headline`);
    assert.ok(trans.benchmarks.headline, `${code} missing benchmarks.headline`);
    assert.ok(trans.commands.headline, `${code} missing commands.headline`);
    assert.ok(trans.downloads.headline, `${code} missing downloads.headline`);
    assert.ok(trans.devlogs.headline, `${code} missing devlogs.headline`);
    assert.ok(trans.cta.headline, `${code} missing cta.headline`);

    assert.strictEqual(
      trans.commands.items.length,
      8,
      `${code} commands.items should have 8 directives`,
    );

    assert.strictEqual(
      trans.commands.systemItems.length,
      4,
      `${code} commands.systemItems should have 4 items`,
    );

    assert.strictEqual(
      trans.features.card1.directives.length,
      4,
      `${code} features.card1.directives should have 4 items`,
    );

    assert.strictEqual(
      trans.devlogs.changes.length,
      3,
      `${code} devlogs.changes should have 3 items`,
    );
  }

  console.log('✓ testTranslationsIntegrity passed');
}

testLanguageDetection();
testTranslationsIntegrity();
console.log('All i18n tests passed successfully!');
