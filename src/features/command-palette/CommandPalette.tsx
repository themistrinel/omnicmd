import React, { useState, useEffect, useRef } from 'react';
import { listen } from '@tauri-apps/api/event';
import { PromptAction, Profile, AppSettings, HistoryEntry, AIProviderId } from '@/types';
import { PROMPT_ACTIONS } from '@/lib/actions';
import { PROFILES, getProfile } from '@/lib/profiles';
import { StorageService, DEFAULT_SETTINGS } from '@/lib/storage';
import { ClipboardService } from '@/lib/clipboard';
import { WindowService } from '@/lib/shortcuts';
import { aiRegistry, NineRouterProvider } from '@/lib/ai';
import { applyAppearanceSettings } from '@/lib/theme';

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
  const [selectedActionIndex, setSelectedActionIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<PromptAction>(PROMPT_ACTIONS[0]);
  const [activeProfile, setActiveProfile] = useState<Profile>(PROFILES[0]);
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

  // Load settings and setup listeners
  useEffect(() => {
    StorageService.getSettings().then((loaded) => {
      setSettings(loaded);
      if (loaded.appearance) {
        applyAppearanceSettings(loaded.appearance);
      }
      setActiveProfile(getProfile(loaded.defaultProfile));
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
      setSelectedActionIndex(0);
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

  // Filter actions based on search query, commands and aliases
  const trimmedSearch = searchQuery.trim();
  const isSlash = trimmedSearch.startsWith('/');

  const filteredActions = PROMPT_ACTIONS.filter((action) => {
    if (!trimmedSearch) return true;

    if (isSlash) {
      const slashPart = trimmedSearch.split(' ')[0].toLowerCase();
      const matchesCommand = action.command?.toLowerCase().startsWith(slashPart);
      const matchesAlias = action.aliases?.some((alias) => alias.toLowerCase().startsWith(slashPart));
      return matchesCommand || matchesAlias;
    }

    const queryLower = searchQuery.toLowerCase();
    return (
      action.title.toLowerCase().includes(queryLower) ||
      action.description.toLowerCase().includes(queryLower) ||
      action.command?.toLowerCase().includes(queryLower) ||
      action.aliases?.some((a) => a.toLowerCase().includes(queryLower))
    );
  });

  // Keep selected index within bounds
  useEffect(() => {
    if (selectedActionIndex >= filteredActions.length) {
      setSelectedActionIndex(Math.max(0, filteredActions.length - 1));
    }
  }, [filteredActions.length, selectedActionIndex]);

  // Profile cycle helper
  const handleCycleProfile = () => {
    const currentIndex = PROFILES.findIndex((p) => p.id === activeProfile.id);
    const nextIndex = (currentIndex + 1) % PROFILES.length;
    const nextProfile = PROFILES[nextIndex];
    setActiveProfile(nextProfile);
  };

  // Execution pipeline
  const executeActionWithInput = async (
    action: PromptAction,
    inputContent: string,
    imageDataUrl?: string | null
  ) => {
    // If it's a vision action without an image, check if we have one in clipboard
    const imageToUse = imageDataUrl !== undefined ? imageDataUrl : clipboardImage;

    if (!inputContent.trim() && !imageToUse) {
      // If empty, transition to manual input view
      setSelectedAction(action);
      setCurrentInputText('');
      setViewMode('INPUT');
      return;
    }

    setSelectedAction(action);
    setCurrentInputText(inputContent);
    setViewMode('RESULT');
    setIsLoading(true);
    setOutputText('');
    setErrorMessage(null);

    try {
      const activePid = settings.activeProviderId || '9router';
      const provider = aiRegistry.getProvider(activePid) as NineRouterProvider;
      provider.setCredentials(settings.endpoint, settings.apiKey, settings.model);

      const formattedTextPrompt = action.userPromptTemplate
        ? action.userPromptTemplate(inputContent)
        : inputContent;

      let actionSystemPrompt = action.systemPrompt;
      if (action.id === 'analyze_image' && settings.customVisionPrompt?.trim()) {
        actionSystemPrompt = settings.customVisionPrompt;
      } else if (action.id === 'inspect_ui' && settings.customUiPrompt?.trim()) {
        actionSystemPrompt = settings.customUiPrompt;
      }

      const systemPromptCombined = `${activeProfile.systemInstruction}\n\nInstrução da Ação:\n${actionSystemPrompt}`;

      // Build user content (text only or multimodal text + image)
      let userMessageContent: any = formattedTextPrompt;
      if (imageToUse && action.isVisionAction) {
        userMessageContent = [
          {
            type: 'text',
            text: formattedTextPrompt || 'Analise a imagem com extremo detalhe conforme solicitado.',
          },
          {
            type: 'image_url',
            image_url: {
              url: imageToUse,
              detail: 'high',
            },
          },
        ];
      }

      const response = await provider.generateCompletion({
        messages: [
          { role: 'system', content: systemPromptCombined },
          { role: 'user', content: userMessageContent },
        ],
        model: settings.model || activeProfile.preferredModel,
        temperature: settings.temperature,
      });

      setOutputText(response.text);

      // Save to SQLite history
      const entry: HistoryEntry = {
        action_id: action.id,
        action_title: action.title,
        model: response.model || settings.model,
        profile_id: activeProfile.id,
        input_text: inputContent || (imageToUse ? '[Imagem Analisada]' : ''),
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

  const handleSelectAction = (action: PromptAction) => {
    const query = searchQuery.trim();
    const clipText = clipboardText.trim();

    // Check if query is slash command /provider
    if (query === '/provider' || query === '/provedor') {
      handleCycleProvider();
      setSearchQuery('');
      return;
    }

    // Check if query is a slash command: /comando <texto opcional>
    let textToUse = '';
    if (query.startsWith('/')) {
      const parts = query.split(/\s+/);
      const afterCommand = parts.slice(1).join(' ').trim();
      textToUse = afterCommand || clipText;
    } else {
      textToUse = query || clipText;
    }

    if (action.isVisionAction) {
      // Vision action can run with image directly even if text is empty
      executeActionWithInput(action, textToUse, clipboardImage);
    } else if (textToUse) {
      executeActionWithInput(action, textToUse);
    } else {
      setSelectedAction(action);
      setCurrentInputText('');
      setViewMode('INPUT');
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

    // Question mark (?) -> Toggle Keyboard Cheatsheet (only when not typing in an input/textarea)
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

    // Tab -> Cycle Profile
    if (e.key === 'Tab') {
      e.preventDefault();
      handleCycleProfile();
      return;
    }

    // Shortcuts only in SEARCH mode
    if (viewMode === 'SEARCH') {
      // Direct number shortcuts: Alt+1 to Alt+9, Alt+0
      if (e.altKey || e.ctrlKey) {
        if (/^[1-9]$/.test(e.key)) {
          const num = parseInt(e.key, 10);
          const targetAction = PROMPT_ACTIONS[num - 1];
          if (targetAction) {
            e.preventDefault();
            handleSelectAction(targetAction);
            return;
          }
        } else if (e.key === '0') {
          const targetAction = PROMPT_ACTIONS[9]; // 10th action: inspect_ui
          if (targetAction) {
            e.preventDefault();
            handleSelectAction(targetAction);
            return;
          }
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
        setSelectedActionIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
      } else if (isUpNav) {
        e.preventDefault();
        setSelectedActionIndex((prev) =>
          prev === 0 ? Math.max(0, filteredActions.length - 1) : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const action = filteredActions[selectedActionIndex];
        if (action) {
          handleSelectAction(action);
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
            <Icon name="Search" className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              role="combobox"
              aria-expanded={filteredActions.length > 0}
              aria-autocomplete="list"
              aria-controls="command-action-list"
              aria-activedescendant={
                filteredActions[selectedActionIndex]
                  ? `action-item-${filteredActions[selectedActionIndex].id}`
                  : undefined
              }
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedActionIndex(0);
              }}
              placeholder="Digite um comando, ação ou texto livre..."
              autoFocus
              className="flex-1 bg-transparent text-[15px] placeholder:text-zinc-400 focus:outline-none tracking-normal"
            />

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsVoiceOpen(true)}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-zinc-800 text-zinc-400 hover:text-inherit transition-colors cursor-pointer"
                title="Entrada por Voz"
              >
                <Icon name="Mic" className="w-4 h-4" />
              </button>

              <button
                onClick={() => WindowService.hide()}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-inherit hover:bg-black/10 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
              actions={filteredActions}
              selectedIndex={selectedActionIndex}
              onSelectAction={handleSelectAction}
              onHoverIndex={setSelectedActionIndex}
              clipboardPreview={clipboardText}
              clipboardImagePreview={clipboardImage}
            />
          )}

          {viewMode === 'INPUT' && (
            <InputView
              action={selectedAction}
              profile={activeProfile}
              inputText={currentInputText}
              onChangeInput={setCurrentInputText}
              onSubmit={() => executeActionWithInput(selectedAction, currentInputText)}
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
              action={selectedAction}
              profile={activeProfile}
              model={settings.model}
              inputText={currentInputText}
              outputText={outputText}
              errorMessage={errorMessage}
              isLoading={isLoading}
              enableVimMnemonicShortcuts={settings.enableVimMnemonicShortcuts}
              sourceImage={selectedAction.isVisionAction ? clipboardImage : null}
              onCopy={() => {}}
              onRegenerate={() => executeActionWithInput(selectedAction, currentInputText)}
              onEdit={() => setViewMode('INPUT')}
              onOpenSettings={() => setViewMode('SETTINGS')}
              onTransformToPrompt={(text) => {
                const improveAction = PROMPT_ACTIONS[0];
                executeActionWithInput(improveAction, text);
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
                setActiveProfile(getProfile(newSettings.defaultProfile));
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
          activeProfile={activeProfile}
          onToggleProfile={handleCycleProfile}
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
