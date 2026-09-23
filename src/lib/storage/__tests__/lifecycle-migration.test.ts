import { parseRawSettings, DEFAULT_SETTINGS } from '../index.ts';
import { PROMPT_ACTIONS } from '@/lib/actions';
import { AGENTS } from '@/lib/agents';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

function assertEqual<T>(actual: T, expected: T, msg?: string) {
  if (actual !== expected) {
    throw new Error(msg || `Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
  }
}

console.log('--- Test 1: Corrupted JSON handling in SQLite rawMap ---');
{
  const corruptedMap: Record<string, string> = {
    providers_json: '{ invalid json ...',
    appearance_json: 'null',
    agents_json: 'NOT_JSON',
    actions_json: '[{"broken": true',
  };

  const parsed = parseRawSettings(corruptedMap);
  assert(parsed.providers['9router'] !== undefined, 'Providers should fallback to default on invalid JSON');
  assert(parsed.appearance?.accentColor === 'sky', 'Appearance should fallback gracefully on invalid JSON');
  assert(parsed.agents?.length === AGENTS.length, 'Agents should fallback to default AGENTS on corrupted JSON');
  assert(parsed.actions?.length === PROMPT_ACTIONS.length, 'Actions should fallback to PROMPT_ACTIONS on corrupted JSON');
  console.log('✓ Corrupted JSON graceful degradation confirmed.');
}

console.log('--- Test 2: Invalid Temperature Parsing Fallback ---');
{
  const rawMap1: Record<string, string> = { temperature: 'not-a-number' };
  const parsed1 = parseRawSettings(rawMap1);
  assertEqual(parsed1.temperature, DEFAULT_SETTINGS.temperature, 'Invalid temperature should fallback to default 0.7 without NaN');

  const rawMap2: Record<string, string> = { temperature: '0.9' };
  const parsed2 = parseRawSettings(rawMap2);
  assertEqual(parsed2.temperature, 0.9, 'Valid float temperature should parse correctly');
  console.log('✓ Temperature parsing and fallback verified.');
}

console.log('--- Test 3: Upgrade Scenario - User with older actions_json vs New Default Actions ---');
{
  // Simulate an older user that saved settings in version 0.1.0 where only 1 custom or older action was stored
  const oldSavedActions = [
    {
      id: 'improve_prompt',
      title: 'Melhorar Texto Antigo',
      description: 'Versão antiga',
      icon: 'Wand2',
      command: '/melhorar',
      aliases: ['/prompt'],
      systemPrompt: 'prompt antigo',
    },
  ];

  const rawMap: Record<string, string> = {
    actions_json: JSON.stringify(oldSavedActions),
  };

  const parsed = parseRawSettings(rawMap);
  const actions = parsed.actions || [];
  console.log(`  Actions in new version PROMPT_ACTIONS: ${PROMPT_ACTIONS.length}`);
  console.log(`  Actions parsed from user with old actions_json: ${actions.length}`);

  const hasTranslate = actions.some((a) => a.id === 'translate');
  const hasInspectUi = actions.some((a) => a.id === 'inspect_ui');
  const hasUpdate = actions.some((a) => a.id === 'check_update');
  
  assert(hasTranslate, "Upgraded user must have 'translate' action");
  assert(hasInspectUi, "Upgraded user must have 'inspect_ui' action");
  assert(hasUpdate, "Upgraded user must have 'check_update' action");
  console.log('✓ Automatic merge of new default actions confirmed on version upgrade!');
}

console.log('--- Test 4: Custom User Actions and Agents Preservation ---');
{
  const customAction = {
    id: 'custom_sql_gen',
    title: 'Gerar SQL',
    description: 'Cria queries SQL otimizadas',
    icon: 'Database',
    command: '/sql',
    aliases: ['/query'],
    systemPrompt: 'Você é um DBA sênior.',
    userPromptTemplateString: 'Tabela: {input}',
    isCustom: true,
  };

  const customAgent = {
    id: 'agent_dba',
    name: 'DBA Expert',
    handle: '@dba',
    aliases: ['@database'],
    description: 'Especialista em banco de dados',
    icon: 'Cpu',
    systemInstruction: 'Atue como DBA Postgres.',
    isCustom: true,
  };

  const rawMap: Record<string, string> = {
    actions_json: JSON.stringify([...PROMPT_ACTIONS, customAction]),
    agents_json: JSON.stringify([...AGENTS, customAgent]),
  };

  const parsed = parseRawSettings(rawMap);
  const foundAction = (parsed.actions || []).find((a) => a.id === 'custom_sql_gen');
  assert(foundAction !== undefined, 'Custom action must be preserved');
  assertEqual(foundAction?.command, '/sql');
  assert(typeof foundAction?.userPromptTemplate === 'function', 'Template must be hydrated into a function');
  assertEqual(foundAction?.userPromptTemplate!('usuarios'), 'Tabela: usuarios');

  const foundAgent = (parsed.agents || []).find((a) => a.id === 'agent_dba');
  assert(foundAgent !== undefined, 'Custom agent must be preserved');
  assertEqual(foundAgent?.handle, '@dba');
  console.log('✓ Custom actions and agents preservation verified.');
}

console.log('--- Test 5: Legacy Appearance Values Migration ---');
{
  // Test legacy amber accent color migration
  const legacyMap: Record<string, string> = {
    appearance_json: JSON.stringify({
      accentColor: 'amber',
      hudOpacity: 95,
      themeMode: 'dark',
    }),
  };

  const parsed = parseRawSettings(legacyMap);
  assertEqual(parsed.appearance?.accentColor, 'sky', 'Legacy amber accent should migrate to sky');
  assertEqual(parsed.appearance?.hudOpacity, 82, 'Legacy 95 opacity should normalize to 82');
  assertEqual(parsed.appearance?.themeMode, 'dark', 'themeMode dark should be preserved');
  console.log('✓ Legacy appearance migration verified.');
}
