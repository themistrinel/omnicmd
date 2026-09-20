import { PromptAction, Agent } from '@/types';
import { PROMPT_ACTIONS } from '@/lib/actions';
import { AGENTS } from '@/lib/agents';

export type SuggestionType = 'action' | 'agent';

export interface PaletteItem {
  id: string;
  type: SuggestionType;
  title: string;
  description: string;
  icon: string;
  token: string; // e.g. "/traduzir" or "@dev"
  action?: PromptAction;
  agent?: Agent;
  shortcutHint?: string;
}

/**
 * Returns filtered suggestions for the command palette based on what the user is typing.
 */
export function getPaletteSuggestions(
  searchQuery: string,
  availableActions: PromptAction[] = PROMPT_ACTIONS,
  availableAgents: Agent[] = AGENTS
): PaletteItem[] {
  const query = searchQuery.trim();

  // 1. User is searching for an agent with @
  if (query.startsWith('@')) {
    const term = query.toLowerCase();
    const token = term.split(/\s+/)[0];

    // If there is already text after the agent token (e.g. "@dev explain this"), do not filter agents
    if (term.includes(' ') && !term.endsWith('@')) {
      return [];
    }

    const filteredAgents = availableAgents.filter((agent) => {
      if (token === '@') return true;
      return (
        agent.handle.toLowerCase().startsWith(token) ||
        agent.name.toLowerCase().includes(token.slice(1)) ||
        agent.aliases.some((al) => al.toLowerCase().startsWith(token))
      );
    });

    return filteredAgents.map((agent) => ({
      id: `agent-${agent.id}`,
      type: 'agent',
      title: agent.name,
      description: agent.description,
      icon: agent.icon,
      token: agent.handle,
      agent,
    }));
  }

  // 2. User is searching for an action with /
  if (query.startsWith('/')) {
    const term = query.toLowerCase();
    const token = term.split(/\s+/)[0];

    // If there is already text after command (e.g. "/traduzir texto"), return empty or single matched action
    if (term.includes(' ')) {
      return [];
    }

    const filteredActions = availableActions.filter((action) => {
      if (token === '/') return true;
      return (
        action.command?.toLowerCase().startsWith(token) ||
        action.aliases?.some((al) => al.toLowerCase().startsWith(token))
      );
    });

    return filteredActions.map((action) => ({
      id: `action-${action.id}`,
      type: 'action',
      title: action.title,
      description: action.description,
      icon: action.icon,
      token: action.command || '',
      action,
      shortcutHint: action.shortcutHint,
    }));
  }

  // 3. User is typing standard text (search across actions)
  if (!query) {
    return availableActions.map((action) => ({
      id: `action-${action.id}`,
      type: 'action',
      title: action.title,
      description: action.description,
      icon: action.icon,
      token: action.command || '',
      action,
      shortcutHint: action.shortcutHint,
    }));
  }

  const queryLower = query.toLowerCase();
  const matchedActions = availableActions.filter((action) => {
    return (
      action.title.toLowerCase().includes(queryLower) ||
      action.description.toLowerCase().includes(queryLower) ||
      action.command?.toLowerCase().includes(queryLower) ||
      action.aliases?.some((a) => a.toLowerCase().includes(queryLower))
    );
  });

  return matchedActions.map((action) => ({
    id: `action-${action.id}`,
    type: 'action',
    title: action.title,
    description: action.description,
    icon: action.icon,
    token: action.command || '',
    action,
    shortcutHint: action.shortcutHint,
  }));
}

/**
 * Applies Tab autocomplete to the current query given the selected item.
 * Appends a trailing space so the user can immediately continue typing their input.
 */
export function completeQuery(currentQuery: string, item: PaletteItem): string {
  if (item.type === 'agent' && item.agent) {
    return `${item.agent.handle} `;
  }

  if (item.type === 'action' && item.action?.command) {
    return `${item.action.command} `;
  }

  return currentQuery;
}
