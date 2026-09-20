import { PromptAction, Agent, ChatMessageContent, ChatContentPartText, ChatContentPartImage } from '@/types';
import { PROMPT_ACTIONS } from '@/lib/actions';
import { DEFAULT_AGENT, findAgentByToken, getAgent, AGENTS } from '@/lib/agents';

export type ResolutionTarget = 'action' | 'agent' | 'general';

export interface ParsedInput {
  target: ResolutionTarget;
  action?: PromptAction;
  agent?: Agent;
  prefixToken?: string; // e.g. "/traduzir" or "@dev"
  payloadText: string;
  rawInput: string;
}

export interface ComposerOptions {
  clipboardText?: string;
  clipboardImage?: string | null;
  customVisionPrompt?: string;
  customUiPrompt?: string;
  defaultAgentId?: string;
  availableAgents?: Agent[];
}

export interface ComposedExecution {
  target: ResolutionTarget;
  title: string;
  actionId: string;
  agentId: string;
  systemPrompt: string;
  userMessageContent: ChatMessageContent;
  effectiveInputText: string;
  isVision: boolean;
  imageToUse?: string | null;
}

/**
 * Parses user input to identify if it is an Action (/command), an Agent Context (@agent),
 * or Free Text. Follows the priority: Action > Agent > General.
 */
export function parseCommandInput(
  rawInput: string,
  availableActions: PromptAction[] = PROMPT_ACTIONS,
  availableAgents: Agent[] = AGENTS
): ParsedInput {
  const trimmed = rawInput.trim();

  // 1. Check for slash action command anywhere at the start or first token
  const firstToken = trimmed.split(/\s+/)[0] || '';
  const isSlash = firstToken.startsWith('/');
  const isAt = firstToken.startsWith('@');

  if (isSlash) {
    const slashLower = firstToken.toLowerCase();
    const action = availableActions.find(
      (a) =>
        a.command?.toLowerCase() === slashLower ||
        a.aliases?.some((al) => al.toLowerCase() === slashLower)
    );

    if (action) {
      const payload = trimmed.slice(firstToken.length).trim();
      return {
        target: 'action',
        action,
        prefixToken: firstToken,
        payloadText: payload,
        rawInput,
      };
    }
  }

  // 2. Check for @agent token
  if (isAt) {
    const firstLower = firstToken.toLowerCase();
    const agent = availableAgents.find(
      (a) =>
        a.handle.toLowerCase() === firstLower ||
        a.aliases.some((al) => al.toLowerCase() === firstLower)
    ) || findAgentByToken(firstToken);

    if (agent) {
      const rest = trimmed.slice(firstToken.length).trim();
      // Even if user typed @agent /traduzir, Action has sovereignty!
      if (rest.startsWith('/')) {
        const subFirstToken = rest.split(/\s+/)[0];
        const subAction = availableActions.find(
          (a) =>
            a.command?.toLowerCase() === subFirstToken.toLowerCase() ||
            a.aliases?.some((al) => al.toLowerCase() === subFirstToken.toLowerCase())
        );
        if (subAction) {
          const subPayload = rest.slice(subFirstToken.length).trim();
          return {
            target: 'action',
            action: subAction,
            prefixToken: subFirstToken,
            payloadText: subPayload,
            rawInput,
          };
        }
      }

      return {
        target: 'agent',
        agent,
        prefixToken: firstToken,
        payloadText: rest,
        rawInput,
      };
    }
  }

  // 3. Fallback: General text
  return {
    target: 'general',
    payloadText: trimmed,
    rawInput,
  };
}

/**
 * Pure prompt composer that enforces strict hierarchy:
 * Action (Sovereign) > Agent (@agent) > General (@general)
 *
 * Prevents prompt contamination: Actions NEVER inherit agent instructions.
 */
export function composeExecutionPlan(
  parsed: ParsedInput,
  options: ComposerOptions = {}
): ComposedExecution {
  const {
    clipboardText = '',
    clipboardImage = null,
    customVisionPrompt,
    customUiPrompt,
    defaultAgentId = 'general',
    availableAgents = AGENTS,
  } = options;

  const defaultAgent =
    availableAgents.find((a) => a.id === defaultAgentId) ||
    getAgent(defaultAgentId) ||
    DEFAULT_AGENT;
  const fallbackPayload = parsed.payloadText || clipboardText.trim();

  // --- HIERARCHY 1: EXPLICIT ACTION (SOVEREIGN) ---
  if (parsed.target === 'action' && parsed.action) {
    const action = parsed.action;
    let systemPrompt = action.systemPrompt;

    if (action.id === 'analyze_image' && customVisionPrompt?.trim()) {
      systemPrompt = customVisionPrompt;
    } else if (action.id === 'inspect_ui' && customUiPrompt?.trim()) {
      systemPrompt = customUiPrompt;
    }

    const formattedTextPrompt = action.userPromptTemplate
      ? action.userPromptTemplate(fallbackPayload)
      : action.userPromptTemplateString
      ? (action.userPromptTemplateString.includes('{input}')
          ? action.userPromptTemplateString.replace('{input}', fallbackPayload)
          : `${action.userPromptTemplateString}\n\n${fallbackPayload}`)
      : fallbackPayload;

    let userMessageContent: ChatMessageContent = formattedTextPrompt;
    let isVision = false;
    let imageToUse: string | null = null;

    if (action.isVisionAction) {
      isVision = true;
      imageToUse = clipboardImage;
      if (imageToUse) {
        userMessageContent = [
          {
            type: 'text',
            text: formattedTextPrompt || 'Analise a imagem com extremo detalhe conforme solicitado.',
          } as ChatContentPartText,
          {
            type: 'image_url',
            image_url: { url: imageToUse },
          } as ChatContentPartImage,
        ];
      }
    }

    return {
      target: 'action',
      title: action.title,
      actionId: action.id,
      agentId: 'none', // Sovereign: no agent contamination
      systemPrompt,
      userMessageContent,
      effectiveInputText: fallbackPayload || (imageToUse ? '[Imagem Analisada]' : ''),
      isVision,
      imageToUse,
    };
  }

  // --- HIERARCHY 2: CONTEXTUAL AGENT (@agent) ---
  if (parsed.target === 'agent' && parsed.agent) {
    const agent = parsed.agent;
    const systemPrompt = agent.systemInstruction;
    const effectiveText = fallbackPayload;

    return {
      target: 'agent',
      title: `${agent.name} (${agent.handle})`,
      actionId: 'agent_chat',
      agentId: agent.id,
      systemPrompt,
      userMessageContent: effectiveText,
      effectiveInputText: effectiveText,
      isVision: false,
    };
  }

  // --- HIERARCHY 3: GENERAL AI (FREE TEXT) ---
  const agent = defaultAgent || DEFAULT_AGENT;
  const systemPrompt = agent.systemInstruction;
  const effectiveText = fallbackPayload;

  return {
    target: 'general',
    title: `Chat (${agent.name})`,
    actionId: 'general_chat',
    agentId: agent.id,
    systemPrompt,
    userMessageContent: effectiveText,
    effectiveInputText: effectiveText,
    isVision: false,
  };
}
