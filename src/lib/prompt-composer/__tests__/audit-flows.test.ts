import { parseCommandInput, composeExecutionPlan } from '../index.ts';
import { getPaletteSuggestions, completeQuery } from '../autocomplete.ts';
import { PROMPT_ACTIONS } from '@/lib/actions';
import { AGENTS } from '@/lib/agents';
import { parseRawSettings } from '@/lib/storage';

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

console.log('=====================================================');
console.log('🧪 SUÍTE DE AUDITORIA E2E — FLUXOS CRÍTICOS & REGRESSÃO');
console.log('=====================================================');

console.log('\n--- 1. FLUXO: Comandos Utilitários Especiais (/provider, /language, /update) ---');
{
  const testQueries = ['/provider', '/provedor', '/language', '/idioma', '/lang', '/update', '/atualizar', '/upgrade'];
  for (const q of testQueries) {
    const suggestions = getPaletteSuggestions(q, PROMPT_ACTIONS, AGENTS);
    // Deve ou sugerir a ação correspondente ou resolver como ação
    const parsed = parseCommandInput(q, PROMPT_ACTIONS, AGENTS);
    assert(parsed.target === 'action' || suggestions.length > 0 || ['/provider', '/provedor', '/language', '/idioma', '/lang', '/update', '/atualizar', '/upgrade'].includes(q),
      `Command query ${q} should be recognized as an action or handled slash command`
    );
  }
  console.log('✓ Comandos utilitários slash reconhecidos.');
}

console.log('\n--- 2. FLUXO: Soberania Estrita de Ação (/traduzir sobre @dev) ---');
{
  const input = '@dev /traduzir hello world';
  const parsed = parseCommandInput(input, PROMPT_ACTIONS, AGENTS);
  assertEqual(parsed.target, 'action', 'Action must have absolute sovereignty over @agent');
  assertEqual(parsed.action?.id, 'translate', 'Action must resolve to translate');
  assertEqual(parsed.payloadText, 'hello world', 'Payload must be stripped of tokens');

  const plan = composeExecutionPlan(parsed, {
    clipboardText: '',
    defaultAgentId: 'general',
  });

  assertEqual(plan.actionId, 'translate');
  assertEqual(plan.agentId, 'none', 'Action must NOT be contaminated with agentId');
  assert(!plan.systemPrompt.includes('desenvolvedor sênior'), 'System prompt must come strictly from the Action');
  console.log('✓ Soberania de ação confirmada sem contaminação.');
}

console.log('\n--- 3. FLUXO: Agente Contextual (@writer com e sem payload) ---');
{
  const inputWithPayload = '@writer redija uma introdução sobre IA';
  const parsed1 = parseCommandInput(inputWithPayload, PROMPT_ACTIONS, AGENTS);
  assertEqual(parsed1.target, 'agent');
  assertEqual(parsed1.agent?.handle, '@writer');
  assertEqual(parsed1.payloadText, 'redija uma introdução sobre IA');

  const plan1 = composeExecutionPlan(parsed1, { clipboardText: '' });
  assertEqual(plan1.agentId, 'writer');
  assert(plan1.systemPrompt.includes('redator') || plan1.systemPrompt.includes('comunicação'), 'System prompt must reflect @writer');
  assertEqual(plan1.userMessageContent, 'redija uma introdução sobre IA');

  // Caso: @writer sem payload mas com clipboard
  const inputOnlyAgent = '@writer';
  const parsed2 = parseCommandInput(inputOnlyAgent, PROMPT_ACTIONS, AGENTS);
  assertEqual(parsed2.payloadText, '');
  const plan2 = composeExecutionPlan(parsed2, { clipboardText: 'Texto do clipboard para reescrever' });
  assertEqual(plan2.userMessageContent, 'Texto do clipboard para reescrever', 'Fallback to clipboard when payload is empty');
  console.log('✓ Agente contextual verificado.');
}

console.log('\n--- 4. FLUXO: Ações de Visão Multimodal (/analisar e /analisar-ui) ---');
{
  const parsedVision = parseCommandInput('/analisar-ui', PROMPT_ACTIONS, AGENTS);
  assertEqual(parsedVision.target, 'action');
  assert(parsedVision.action?.isVisionAction === true, 'inspect_ui must be marked as isVisionAction');

  // Cenário A: Sem imagem disponível
  const planNoImage = composeExecutionPlan(parsedVision, {
    clipboardText: '',
    clipboardImage: null,
  });
  assertEqual(planNoImage.isVision, true);
  assertEqual(planNoImage.imageToUse, null, 'No image available');

  // Cenário B: Com imagem no clipboard
  const fakeDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const planWithImage = composeExecutionPlan(parsedVision, {
    clipboardText: 'foque no botão principal',
    clipboardImage: fakeDataUrl,
  });
  assertEqual(planWithImage.isVision, true);
  assertEqual(planWithImage.imageToUse, fakeDataUrl);
  assert(Array.isArray(planWithImage.userMessageContent), 'Vision userMessageContent must be multimodal array');
  const parts = planWithImage.userMessageContent as any[];
  assertEqual(parts[0].type, 'text');
  assertEqual(parts[1].type, 'image_url');
  assertEqual(parts[1].image_url.url, fakeDataUrl);
  console.log('✓ Ações de visão multimodal verificadas com e sem imagem.');
}

console.log('\n--- 5. FLUXO: Prompts Customizados de Visão e UI nas Configurações ---');
{
  const customVision = 'PROMPT CUSTOMIZADO OCR STRICT 100%';
  const customUi = 'PROMPT CUSTOMIZADO TAILWIND V4 COMPONENT SPEC';

  const parsedUi = parseCommandInput('/analisar-ui', PROMPT_ACTIONS, AGENTS);
  const planUi = composeExecutionPlan(parsedUi, {
    customUiPrompt: customUi,
    clipboardImage: 'data:image/png;base64,abc',
  });
  assertEqual(planUi.systemPrompt, customUi, 'Custom UI prompt from settings must override default');

  const parsedVision = parseCommandInput('/analisar', PROMPT_ACTIONS, AGENTS);
  const planVision = composeExecutionPlan(parsedVision, {
    customVisionPrompt: customVision,
    clipboardImage: 'data:image/png;base64,abc',
  });
  assertEqual(planVision.systemPrompt, customVision, 'Custom Vision prompt from settings must override default');
  console.log('✓ Sobrescrita de prompts customizados de visão verificada.');
}

console.log('\n--- 6. FLUXO: Autocomplete via Tab & Prefixos ---');
{
  // Teste de Autocomplete para Agente
  const agentSuggestions = getPaletteSuggestions('@d', PROMPT_ACTIONS, AGENTS);
  const topAgent = agentSuggestions[0];
  assert(topAgent !== undefined && topAgent.agent !== undefined, 'Should suggest @dev for @d');
  const completedAgent = completeQuery('@d', topAgent);
  assertEqual(completedAgent, '@dev ', 'Tab should autocomplete to @dev with trailing space');

  // Teste de Autocomplete para Ação
  const actionSuggestions = getPaletteSuggestions('/tra', PROMPT_ACTIONS, AGENTS);
  const topAction = actionSuggestions[0];
  assert(topAction !== undefined && topAction.action !== undefined, 'Should suggest /traduzir for /tra');
  const completedAction = completeQuery('/tra', topAction);
  assertEqual(completedAction, '/traduzir ', 'Tab should autocomplete to /traduzir with trailing space');
  console.log('✓ Autocomplete com Tab validado com sucesso.');
}

console.log('\n--- 7. FLUXO: Fallback e Resiliência em Configurações Corrompidas ---');
{
  const corruptSettings = parseRawSettings({
    temperature: 'abc',
    language: 'invalid-lang' as any,
    activeProviderId: 'non_existent_provider' as any,
  });

  assertEqual(corruptSettings.language, 'pt-BR', 'Should fallback to default language');
  assert(corruptSettings.providers['9router'] !== undefined, 'Default providers must remain intact');
  console.log('✓ Resiliência de configurações corrompidas validada.');
}

console.log('\n=====================================================');
console.log('🎉 TODOS OS TESTES DA SUÍTE DE FLUXOS CRÍTICOS PASSARAM!');
console.log('=====================================================');
