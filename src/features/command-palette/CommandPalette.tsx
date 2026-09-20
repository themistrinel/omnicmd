import React, { useState, useEffect, useRef, useMemo } from 'react';
import { listen } from '@tauri-apps/api/event';
import { PromptAction, Agent, AppSettings, HistoryEntry, AIProviderId } from '@/types';
import { PROMPT_ACTIONS } from '@/lib/actions';
import { AGENTS, DEFAULT_AGENT, getAgent } from '@/lib/agents';
import { StorageService, DEFAULT_SETTINGS } from '@/lib/storage';
import { ClipboardService } from '@/lib/clipboard';
import { WindowService } from '@/lib/shortcuts';
import { aiRegistry, NineRouterProvider } from '@/lib/ai';
import { applyAppearanceSettings } from '@/lib/theme';
import {
  parseCommandInput,
  composeExecutionPlan,
  ParsedInput,
  ComposedExecution,
} from '@/lib/prompt-composer';
import {
  getPaletteSuggestions,
  completeQuery,
  PaletteItem,
} from '@/lib/prompt-composer/autocomplete';

import { ActionList } from './ActionList';
import { InputView } from './InputView';
import { ResultView } from './ResultView';
import { HistoryView } from '@/features/history/HistoryView';
import { SettingsView } from '@/features/settings/SettingsView';
import { VoiceInputModal } from '@/features/voice/VoiceInputModal';
import { KeyboardCheatsheetModal } from '@/components/KeyboardCheatsheetModal';
import { StatusBar } from '@/components/StatusBar';
import { Icon } from '@/components/Icon';

type ViewMode = 'SEARCH' | 'INPUT' | 'RESULT' | 'HISTORY' | 'SETTINGS';

export const CommandPalette: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('SEARCH');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  // Active execution state
  const [activeAction, setActiveAction] = useState<PromptAction>(PROMPT_ACTIONS[0]);
  const [activeAgent, setActiveAgent] = useState<Agent>(DEFAULT_AGENT);
  const [activeExecutionPlan, setActiveExecutionPlan] = useState<ComposedExecution | null>(null);

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  const [clipboardText, setClipboardText] = useState('');
  const [clipboardImage, setClipboardImage] = useState<string | null>(null);
  const [currentInputText, setCurrentInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load settings and listeners
  useEffect(() => {
    StorageService.getSettings().then((loaded) => {
      setSettings(loaded);
      if (loaded.appearance) {
        applyAppearanceSettings(loaded.appearance);
      }
      const initialAgent = getAgent(loaded.defaultProfile || 'general');
      setActiveAgent(initialAgent);

      const providerId = loaded.activeProviderId || '9router';
      aiRegistry.setActiveProvider(providerId);
      const provider = aiRegistry.getProvider(providerId) as NineRouterProvider;
      provider.setCredentials(loaded.endpoint, loaded.apiKey, loaded.model);
    });

    const checkClipboard = async () => {
      const [text, img] = await Promise.all([
        ClipboardService.read(),
        ClipboardService.readImageDataUrl(),
      ]);
      if (text) {
        setClipboardText(text);
      }
      setClipboardImage(img);
    };

    checkClipboard();

    // Listen to palette-opened event from Tauri backend
    let unlisten: (() => void) | undefined;
    let unlistenHistory: (() => void) | undefined;
    let unlistenSettings: (() => void) | undefined;

    WindowService.onPaletteOpened(() => {
      setViewMode('SEARCH');
      setSearchQuery('');
      setSelectedItemIndex(0);
      checkClipboard();
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }).then((fn) => {
      unlisten = fn;
    });

    if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
      listen('open-history', () => {
        setViewMode('HISTORY');
      }).then((fn) => {
        unlistenHistory = fn;
      });

      listen('open-settings', () => {
        setViewMode('SETTINGS');
      }).then((fn) => {
        unlistenSettings = fn;
      });
    }

    return () => {
      if (unlisten) unlisten();
      if (unlistenHistory) unlistenHistory();
      if (unlistenSettings) unlistenSettings();
    };
  }, []);

  // Filter items (Actions and Agents) based on search query and custom settings
  const currentActions = settings.actions || PROMPT_ACTIONS;
  const currentAgents = settings.agents || AGENTS;

  const suggestions = useMemo(() => {
    return getPaletteSuggestions(searchQuery, currentActions, currentAgents);
  }, [searchQuery, currentActions, currentAgents]);

  // Safe bounded index without state cascading
  const safeIndex = selectedItemIndex >= suggestions.length
    ? Math.max(0, suggestions.length - 1)
    : selectedItemIndex;

  // Dynamic context badge for StatusBar
  const contextBadge = useMemo(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.startsWith('@')) {
      const token = trimmed.split(/\s+/)[0];
      const matched = currentAgents.find(
        (a) => a.handle.toLowerCase() === token.toLowerCase()
      );
      if (matched) {
        return { type: 'agent' as const, label: matched.handle, icon: matched.icon };
      }
      return { type: 'agent' as const, label: 'Agente', icon: 'Sparkles' };
    }
    if (trimmed.startsWith('/')) {
      const token = trimmed.split(/\s+/)[0];
      const matched = currentActions.find(
        (a) => a.command?.toLowerCase() === token.toLowerCase()
      );
      if (matched) {
        return { type: 'action' as const, label: matched.command || matched.title, icon: matched.icon };
      }
      return { type: 'action' as const, label: 'Ação', icon: 'Terminal' };
    }
    return null;
  }, [searchQuery, currentAgents, currentActions]);

  // Pure execution engine
  const executePlan = async (plan: ComposedExecution) => {
    setActiveExecutionPlan(plan);
    setCurrentInputText(plan.effectiveInputText);
    setViewMode('RESULT');
    setIsLoading(true);
    setOutputText('');
    setErrorMessage(null);

    try {
      const activePid = settings.activeProviderId || '9router';
      const provider = aiRegistry.getProvider(activePid) as NineRouterProvider;
      provider.setCredentials(settings.endpoint, settings.apiKey, settings.model);

      const messages: any[] = [
        { role: 'system', content: plan.systemPrompt },
        { role: 'user', content: plan.userMessageContent },
      ];

      const response = await provider.generateCompletion({
        messages,
        model: settings.model,
        temperature: settings.temperature,
      });

      setOutputText(response.text);

      // Save to SQLite history
      const entry: HistoryEntry = {
        action_id: plan.actionId,
        action_title: plan.title,
        model: response.model || settings.model,
        profile_id: plan.agentId || 'general',
        input_text: plan.effectiveInputText,
        output_text: response.text,
      };
      await StorageService.saveHistory(entry);
    } catch (err: any) {
      console.error('Execution error:', err);
      setErrorMessage(
        err?.message || err?.toString() || 'Erro desconhecido ao processar requisição com o modelo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger execution from parsed command
  const runParsedInput = (parsed: ParsedInput) => {
    const plan = composeExecutionPlan(parsed, {
      clipboardText,
      clipboardImage,
      customVisionPrompt: settings.customVisionPrompt,
      customUiPrompt: settings.customUiPrompt,
      defaultAgentId: settings.defaultProfile || 'general',
      availableAgents: currentAgents,
    });

    if (parsed.action) {
      setActiveAction(parsed.action);
    }
    if (parsed.agent) {
      setActiveAgent(parsed.agent);
    }

    // If text and image are both empty and it's an action, give user chance to type in InputView
    if (!plan.effectiveInputText && !plan.imageToUse && parsed.target === 'action' && parsed.action) {
      setActiveAction(parsed.action);
      setCurrentInputText('');
      setViewMode('INPUT');
      return;
    }

    executePlan(plan);
  };

  // Cycle AI Provider
  const handleCycleProvider = async () => {
    const providerList: AIProviderId[] = ['9router', 'omni', 'custom'];
    const currentIndex = providerList.indexOf(settings.activeProviderId || '9router');
    const nextProviderId = providerList[(currentIndex + 1) % providerList.length];

    const nextConfig = settings.providers[nextProviderId];
    const updatedSettings: AppSettings = {
      ...settings,
      activeProviderId: nextProviderId,
      endpoint: nextConfig.endpoint,
      apiKey: nextConfig.apiKey,
      model: nextConfig.model,
    };

    setSettings(updatedSettings);
    aiRegistry.setActiveProvider(nextProviderId);
    const provider = aiRegistry.getProvider(nextProviderId) as NineRouterProvider;
    provider.setCredentials(nextConfig.endpoint, nextConfig.apiKey, nextConfig.model);

    await StorageService.saveSettings(updatedSettings);
  };

  // User selects an item from the list (via click or Enter)
  const handleSelectItem = (item: PaletteItem) => {
    if (item.type === 'agent' && item.agent) {
      const currentQuery = searchQuery.trim();
      // If query is just "@" or begins with "@", autocomplete to "@agent "
      if (!currentQuery.includes(' ') || currentQuery === '@') {
        const completed = `${item.agent.handle} `;
        setSearchQuery(completed);
        setTimeout(() => searchInputRef.current?.focus(), 20);
        return;
      }
      // If query already has arguments, run agent
      const parsed = parseCommandInput(
        `${item.agent.handle} ${currentQuery.replace(/^@\w+\s*/, '')}`,
        currentActions,
        currentAgents
      );
      runParsedInput(parsed);
      return;
    }

    if (item.type === 'action' && item.action) {
      const action = item.action;
      setActiveAction(action);

      // Check if query is slash command /provider
      const query = searchQuery.trim();
      if (query === '/provider' || query === '/provedor') {
        handleCycleProvider();
        setSearchQuery('');
        return;
      }

      // Check for user-provided argument in search input
      let textToUse = '';
      if (query.startsWith('/')) {
        const parts = query.split(/\s+/);
        const afterCommand = parts.slice(1).join(' ').trim();
        textToUse = afterCommand || clipboardText.trim();
      } else {
        textToUse = query || clipboardText.trim();
      }

      const parsed: ParsedInput = {
        target: 'action',
        action,
        prefixToken: action.command,
        payloadText: textToUse,
        rawInput: query,
      };

      runParsedInput(parsed);
    }
  };

  // Direct keyboard shortcut execution (Alt+1..9, Alt+0)
  const handleDirectActionShortcut = (index: number) => {
    const targetAction = currentActions[index];
    if (targetAction) {
      handleSelectItem({
        id: `action-${targetAction.id}`,
        type: 'action',
        title: targetAction.title,
        description: targetAction.description,
        icon: targetAction.icon,
        token: targetAction.command || '',
        action: targetAction,
      });
    }
  };

  // Global keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Escape key
    if (e.key === 'Escape') {
      e.preventDefault();
      if (isCheatsheetOpen) {
        setIsCheatsheetOpen(false);
      } else if (isVoiceOpen) {
        setIsVoiceOpen(false);
      } else if (viewMode !== 'SEARCH') {
        setViewMode('SEARCH');
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else {
        WindowService.hide();
      }
      return;
    }

    // Question mark (?) -> Toggle Keyboard Cheatsheet
    const target = e.target as HTMLElement | null;
    const isEditingInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
    if (e.key === '?' && (!isEditingInput || (target === searchInputRef.current && !searchQuery))) {
      e.preventDefault();
      setIsCheatsheetOpen((prev) => !prev);
      return;
    }

    // Ctrl+H -> History
    if (e.ctrlKey && e.key.toLowerCase() === 'h') {
      e.preventDefault();
      setViewMode(viewMode === 'HISTORY' ? 'SEARCH' : 'HISTORY');
      return;
    }

    // Ctrl+, -> Settings
    if (e.ctrlKey && e.key === ',') {
      e.preventDefault();
      setViewMode(viewMode === 'SETTINGS' ? 'SEARCH' : 'SETTINGS');
      return;
    }

    // Tab -> Autocomplete in SEARCH mode (Raycast style)
    if (e.key === 'Tab' && viewMode === 'SEARCH') {
      e.preventDefault();
      const currentItem = suggestions[safeIndex];
      if (currentItem) {
        const nextQuery = completeQuery(searchQuery, currentItem);
        setSearchQuery(nextQuery);
      }
      return;
    }

    // Shortcuts only in SEARCH mode
    if (viewMode === 'SEARCH') {
      // Direct number shortcuts: Alt+1 to Alt+9, Alt+0
      if (e.altKey || e.ctrlKey) {
        if (/^[1-9]$/.test(e.key)) {
          e.preventDefault();
          handleDirectActionShortcut(parseInt(e.key, 10) - 1);
          return;
        } else if (e.key === '0') {
          e.preventDefault();
          handleDirectActionShortcut(9); // 10th action: inspect_ui
          return;
        }
      }

      const mode = settings.keyboardNavMode;
      const isDownNav =
        e.key === 'ArrowDown' ||
        (mode !== 'standard' && e.ctrlKey && (e.key.toLowerCase() === 'n' || e.key.toLowerCase() === 'j'));

      const isUpNav =
        e.key === 'ArrowUp' ||
        (mode !== 'standard' && e.ctrlKey && (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 'k'));

      if (isDownNav) {
        e.preventDefault();
        setSelectedItemIndex((prev) => (prev + 1) % Math.max(1, suggestions.length));
      } else if (isUpNav) {
        e.preventDefault();
        setSelectedItemIndex((prev) =>
          prev === 0 ? Math.max(0, suggestions.length - 1) : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();

        // 1. Check if raw query matches /provider command
        const trimmed = searchQuery.trim();
        if (trimmed === '/provider' || trimmed === '/provedor') {
          handleCycleProvider();
          setSearchQuery('');
          return;
        }

        // 2. Check if the user typed an explicit @agent or /action command
        const parsed = parseCommandInput(searchQuery, currentActions, currentAgents);
        if (parsed.target === 'action' || parsed.target === 'agent') {
          runParsedInput(parsed);
          return;
        }

        // 3. If there is a selected suggestion in the list, use it
        const selectedItem = suggestions[safeIndex];
        if (selectedItem) {
          handleSelectItem(selectedItem);
          return;
        }

        // 4. Fallback: Free text -> run with General AI
        if (trimmed) {
          runParsedInput(parsed);
        }
      }
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className="w-full h-full hud-window rounded-2xl border border-hud flex flex-col overflow-hidden relative select-none"
    >
      {/* Top Search bar when in SEARCH mode */}
      {viewMode === 'SEARCH' && (
        <div className="flex items-center px-4 py-3.5 border-b border-hud gap-3 shrink-0 hud-header">
          <Icon name="Search" className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            role="combobox"
            aria-expanded={suggestions.length > 0}
            aria-autocomplete="list"
            aria-controls="command-action-list"
            aria-activedescendant={
              suggestions[safeIndex]
                ? `palette-item-${suggestions[safeIndex].id}`
                : undefined
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedItemIndex(0);
            }}
            placeholder="Digite / para ações, @ para agentes, ou texto livre..."
            autoFocus
            className="flex-1 bg-transparent text-[15px] placeholder:text-slate-400 focus:outline-none tracking-normal font-sans"
          />

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Entrada por Voz"
            >
              <Icon name="Mic" className="w-4 h-4" />
            </button>

            <button
              onClick={() => WindowService.hide()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Fechar (Esc)"
            >
              <Icon name="X" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Center Views */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {viewMode === 'SEARCH' && (
          <ActionList
            items={suggestions}
            selectedIndex={safeIndex}
            onSelectItem={handleSelectItem}
            onHoverIndex={setSelectedItemIndex}
            clipboardPreview={clipboardText}
            clipboardImagePreview={clipboardImage}
          />
        )}

        {viewMode === 'INPUT' && (
          <InputView
            action={activeAction}
            profile={activeAgent}
            inputText={currentInputText}
            onChangeInput={setCurrentInputText}
            onSubmit={() => {
              const parsed: ParsedInput = {
                target: 'action',
                action: activeAction,
                prefixToken: activeAction.command,
                payloadText: currentInputText,
                rawInput: currentInputText,
              };
              runParsedInput(parsed);
            }}
            onBack={() => setViewMode('SEARCH')}
            onPasteClipboard={async () => {
              const text = await ClipboardService.read();
              if (text) setCurrentInputText(text);
            }}
            isLoading={isLoading}
          />
        )}

        {viewMode === 'RESULT' && (
          <ResultView
            action={activeAction}
            profile={activeAgent}
            model={settings.model}
            inputText={currentInputText}
            outputText={outputText}
            errorMessage={errorMessage}
            isLoading={isLoading}
            enableVimMnemonicShortcuts={settings.enableVimMnemonicShortcuts}
            sourceImage={activeAction.isVisionAction ? clipboardImage : null}
            onCopy={() => {}}
            onRegenerate={() => {
              if (activeExecutionPlan) {
                executePlan(activeExecutionPlan);
              } else {
                const parsed: ParsedInput = {
                  target: 'action',
                  action: activeAction,
                  prefixToken: activeAction.command,
                  payloadText: currentInputText,
                  rawInput: currentInputText,
                };
                runParsedInput(parsed);
              }
            }}
            onEdit={() => setViewMode('INPUT')}
            onOpenSettings={() => setViewMode('SETTINGS')}
            onTransformToPrompt={(text) => {
              const improveAction = PROMPT_ACTIONS[0];
              const parsed: ParsedInput = {
                target: 'action',
                action: improveAction,
                prefixToken: improveAction.command,
                payloadText: text,
                rawInput: text,
              };
              runParsedInput(parsed);
            }}
            onClose={() => WindowService.hide()}
            onBack={() => setViewMode('SEARCH')}
          />
        )}

        {viewMode === 'HISTORY' && (
          <HistoryView
            onBack={() => setViewMode('SEARCH')}
            onReuseText={(text) => {
              setClipboardText(text);
              setCurrentInputText(text);
              setViewMode('SEARCH');
            }}
          />
        )}

        {viewMode === 'SETTINGS' && (
          <SettingsView
            onBack={() => setViewMode('SEARCH')}
            onSaved={(newSettings) => {
              setSettings(newSettings);
              if (newSettings.appearance) {
                applyAppearanceSettings(newSettings.appearance);
              }
              setActiveAgent(getAgent(newSettings.defaultProfile || 'general'));
              const pid = newSettings.activeProviderId || '9router';
              aiRegistry.setActiveProvider(pid);
              const provider = aiRegistry.getProvider(pid) as NineRouterProvider;
              provider.setCredentials(newSettings.endpoint, newSettings.apiKey, newSettings.model);
            }}
          />
        )}
      </div>

      {/* Global Bottom Status Bar */}
      <StatusBar
        contextBadge={contextBadge}
        activeProviderId={settings.activeProviderId}
        onCycleProvider={handleCycleProvider}
        model={settings.model}
        hasClipboardText={!!clipboardText}
        onOpenHistory={() => setViewMode('HISTORY')}
        onOpenSettings={() => setViewMode('SETTINGS')}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
      />

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceOpen}
        onTranscriptionComplete={(transcript) => {
          setIsVoiceOpen(false);
          if (transcript) {
            setSearchQuery(transcript);
            setClipboardText(transcript);
          }
        }}
        onCancel={() => setIsVoiceOpen(false)}
      />

      {/* Keyboard Cheatsheet Modal (?) */}
      <KeyboardCheatsheetModal
        isOpen={isCheatsheetOpen}
        onClose={() => setIsCheatsheetOpen(false)}
      />
    </div>
  );
};
