import { parseCommandInput, composeExecutionPlan } from '../index.ts';
import { getPaletteSuggestions, completeQuery } from '../autocomplete.ts';
import { PromptAction, Agent } from '@/types';

function assertTrue(condition: boolean, msg?: string) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

function assertEqual<T>(actual: T, expected: T, msg?: string) {
  if (actual !== expected) {
    throw new Error(msg || `Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
  }
}

console.log('--- Test 1: Action Sovereignty (No Agent Contamination) ---');
{
  const parsed = parseCommandInput('/traduzir Olá mundo');
  assertEqual(parsed.target, 'action');
  assertEqual(parsed.action?.id, 'translate');
  assertEqual(parsed.payloadText, 'Olá mundo');

  const plan = composeExecutionPlan(parsed, { defaultAgentId: 'prompt' });
  assertEqual(plan.target, 'action');
  // Must NOT contain prompt engineer instructions
  assertTrue(!plan.systemPrompt.includes('Prompt Engineer'), 'Action system prompt should NOT contain Agent instruction');
  assertTrue(plan.systemPrompt.includes('tradutor'), 'Action system prompt must contain translator instruction');
  console.log('✓ Action sovereignty confirmed.');
}

console.log('--- Test 2: @agent /action conflict -> Action Wins (Sovereignty) ---');
{
  const parsed = parseCommandInput('@prompt /traduzir Texto de exemplo');
  assertEqual(parsed.target, 'action');
  assertEqual(parsed.action?.id, 'translate');

  const plan = composeExecutionPlan(parsed);
  assertEqual(plan.target, 'action');
  assertTrue(!plan.systemPrompt.includes('Prompt Engineer'));
  console.log('✓ Action wins over agent mention.');
}

console.log('--- Test 3: Explicit Agent Context (@dev) ---');
{
  const parsed = parseCommandInput('@dev explique useEffect');
  assertEqual(parsed.target, 'agent');
  assertEqual(parsed.agent?.id, 'dev');
  assertEqual(parsed.payloadText, 'explique useEffect');

  const plan = composeExecutionPlan(parsed);
  assertEqual(plan.target, 'agent');
  assertTrue(plan.systemPrompt.includes('engenheiro de software'), 'Should use Dev agent system prompt');
  console.log('✓ Contextual agent verified.');
}

console.log('--- Test 4: Free Text (General AI) ---');
{
  const parsed = parseCommandInput('Quanto é 2 + 2?');
  assertEqual(parsed.target, 'general');
  assertEqual(parsed.payloadText, 'Quanto é 2 + 2?');

  const plan = composeExecutionPlan(parsed);
  assertEqual(plan.target, 'general');
  assertEqual(plan.agentId, 'general');
  console.log('✓ Free text uses General AI.');
}

console.log('--- Test 5: Tab Autocomplete ---');
{
  const agentSuggestions = getPaletteSuggestions('@de');
  assertTrue(agentSuggestions.length > 0);
  assertEqual(agentSuggestions[0].token, '@dev');

  const completedAgent = completeQuery('@de', agentSuggestions[0]);
  assertEqual(completedAgent, '@dev ');

  const actionSuggestions = getPaletteSuggestions('/tr');
  assertTrue(actionSuggestions.length > 0);
  assertEqual(actionSuggestions[0].token, '/traduzir');

  const completedAction = completeQuery('/tr', actionSuggestions[0]);
  assertEqual(completedAction, '/traduzir ');
  console.log('✓ Tab autocomplete verified.');
}

console.log('--- Test 6: Custom User-Created Agent (@sql) ---');
{
  const customAgent: Agent = {
    id: 'agent_sql',
    name: 'Especialista SQL',
    handle: '@sql',
    aliases: ['@postgres', '@banco'],
    description: 'Escreve queries SQL de alta performance',
    icon: 'Database',
    systemInstruction: 'Você é um DBA Postgres especialista. Retorne apenas SQL otimizado.',
    isCustom: true,
  };

  const parsed = parseCommandInput('@sql crie tabela de usuários', undefined, [customAgent]);
  assertEqual(parsed.target, 'agent');
  assertEqual(parsed.agent?.id, 'agent_sql');
  assertEqual(parsed.payloadText, 'crie tabela de usuários');

  const plan = composeExecutionPlan(parsed, { availableAgents: [customAgent] });
  assertEqual(plan.target, 'agent');
  assertTrue(plan.systemPrompt.includes('DBA Postgres especialista'));
  console.log('✓ Custom user agent parsed and executed correctly.');
}

console.log('--- Test 7: Custom User-Created Action (/commit) with Template ---');
{
  const customAction: PromptAction = {
    id: 'action_commit',
    title: 'Gerar Mensagem de Commit',
    description: 'Cria mensagem de commit convencional',
    icon: 'GitCommit',
    command: '/commit',
    aliases: ['/ci'],
    systemPrompt: 'Você é um engenheiro de git. Gere mensagem no padrão Conventional Commits.',
    userPromptTemplateString: 'Gere o commit para a diff a seguir:\n\n"""\n{input}\n"""',
    isCustom: true,
  };

  const parsed = parseCommandInput('/commit fix: resolver bug no login', [customAction]);
  assertEqual(parsed.target, 'action');
  assertEqual(parsed.action?.id, 'action_commit');
  assertEqual(parsed.payloadText, 'fix: resolver bug no login');

  const plan = composeExecutionPlan(parsed);
  assertEqual(plan.target, 'action');
  assertTrue(plan.systemPrompt.includes('engenheiro de git'));
  assertTrue(typeof plan.userMessageContent === 'string' && plan.userMessageContent.includes('Gere o commit para a diff'));
  assertTrue(typeof plan.userMessageContent === 'string' && plan.userMessageContent.includes('fix: resolver bug no login'));
  console.log('✓ Custom user action with template parsed and composed correctly.');
}

console.log('\n=============================================');
console.log('ALL 7 CORE ARCHITECTURE & CUSTOM TESTS PASSED! 🚀');
console.log('=============================================');
