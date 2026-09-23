import { parseRawSettings } from '../index.ts';

function assertEqual<T>(actual: T, expected: T, msg?: string) {
  if (actual !== expected) {
    throw new Error(msg || `Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
  }
}

console.log('--- Test 1: Language persistence from SQLite rawMap (pt-BR default) ---');
{
  const rawMap: Record<string, string> = {};
  const settings = parseRawSettings(rawMap);
  assertEqual(settings.language, 'pt-BR', 'Should default to pt-BR when no language in SQLite');
  console.log('✓ Default language confirmed.');
}

console.log('--- Test 2: Language persistence from SQLite rawMap (en-US) ---');
{
  const rawMap: Record<string, string> = { language: 'en-US' };
  const settings = parseRawSettings(rawMap);
  assertEqual(settings.language, 'en-US', 'Should properly restore en-US from SQLite');
  console.log('✓ en-US restored correctly.');
}

console.log('--- Test 3: Language persistence from SQLite rawMap (es-ES) ---');
{
  const rawMap: Record<string, string> = { language: 'es-ES' };
  const settings = parseRawSettings(rawMap);
  assertEqual(settings.language, 'es-ES', 'Should properly restore es-ES from SQLite');
  console.log('✓ es-ES restored correctly.');
}

console.log('--- Test 4: Invalid language fallback protection ---');
{
  const rawMap: Record<string, string> = { language: 'fr-FR' };
  const settings = parseRawSettings(rawMap);
  assertEqual(settings.language, 'pt-BR', 'Should fallback to pt-BR if an unsupported language is in SQLite');
  console.log('✓ Unsupported language fallback confirmed.');
}

console.log('--- Test 5: autoReadClipboard boolean parsing ---');
{
  const rawMapTrue: Record<string, string> = { autoReadClipboard: 'true' };
  assertEqual(parseRawSettings(rawMapTrue).autoReadClipboard, true);

  const rawMapFalse: Record<string, string> = { autoReadClipboard: 'false' };
  assertEqual(parseRawSettings(rawMapFalse).autoReadClipboard, false);
  console.log('✓ autoReadClipboard parsing confirmed.');
}

console.log('=============================================');
console.log('ALL STORAGE & LANGUAGE PERSISTENCE TESTS PASSED! 🚀');
console.log('=============================================');
