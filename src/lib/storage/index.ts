import { invoke } from '@tauri-apps/api/core';
import { AppSettings, HistoryEntry, AppearanceSettings, PromptAction } from '@/types';
import { PROMPT_ACTIONS } from '@/lib/actions';
import { AGENTS } from '@/lib/agents';

export const DEFAULT_APPEARANCE: AppearanceSettings = {
  themeMode: 'system',
  hudOpacity: 82,
  hudBlur: 24,
  fontFamily: 'ibm_plex',
  accentColor: 'sky',
};

function hydrateActions(savedActions: PromptAction[]): PromptAction[] {
  return savedActions.map((saved) => {
    const defaultAction = PROMPT_ACTIONS.find((a) => a.id === saved.id);
    let userPromptTemplate = defaultAction?.userPromptTemplate;
    if (saved.userPromptTemplateString) {
      userPromptTemplate = (input: string) =>
        saved.userPromptTemplateString!.includes('{input}')
          ? saved.userPromptTemplateString!.replace('{input}', input)
          : `${saved.userPromptTemplateString}\n\n${input}`;
    }
    return {
      ...defaultAction,
      ...saved,
      userPromptTemplate: userPromptTemplate || defaultAction?.userPromptTemplate,
    };
  });
}

export const DEFAULT_SETTINGS: AppSettings = {
  activeProviderId: '9router',
  endpoint: 'http://localhost:20128/v1',
  apiKey: '',
  model: 'ag/gemini-3.8-flash-low',
  providers: {
    '9router': {
      endpoint: 'http://localhost:20128/v1',
      apiKey: '',
      model: 'ag/gemini-3.8-flash-low',
    },
    omni: {
      endpoint: 'http://localhost:8000/v1',
      apiKey: '',
      model: 'llama-3.3-70b',
    },
    custom: {
      endpoint: 'https://api.openai.com/v1',
      apiKey: '',
      model: 'gpt-4o-mini',
    },
  },
  defaultProfile: 'general',
  globalShortcut: 'Super+Space',
  autoReadClipboard: true,
  temperature: 0.7,
  keyboardNavMode: 'hybrid',
  enableVimMnemonicShortcuts: true,
  appearance: DEFAULT_APPEARANCE,
  agents: AGENTS,
  actions: PROMPT_ACTIONS,
};

function isTauriEnvironment(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

export class StorageService {
  static async getSettings(): Promise<AppSettings> {
    if (isTauriEnvironment()) {
      try {
        const rawMap = await invoke<Record<string, string>>('db_get_settings');
        const activeProviderId = (rawMap.activeProviderId as any) || DEFAULT_SETTINGS.activeProviderId;

        // Load provider specific settings if stored
        let parsedProviders = DEFAULT_SETTINGS.providers;
        if (rawMap.providers_json) {
          try {
            parsedProviders = { ...DEFAULT_SETTINGS.providers, ...JSON.parse(rawMap.providers_json) };
          } catch (_) {}
        }

        let parsedAppearance: AppearanceSettings = DEFAULT_APPEARANCE;
        if (rawMap.appearance_json) {
          try {
            const decoded = JSON.parse(rawMap.appearance_json);
            parsedAppearance = { ...DEFAULT_APPEARANCE, ...decoded };
            if ((parsedAppearance.accentColor as string) === 'amber') {
              parsedAppearance.accentColor = 'sky';
            }
            if (parsedAppearance.hudOpacity === 95 || !parsedAppearance.hudOpacity) {
              parsedAppearance.hudOpacity = 82;
            }
          } catch (_) {}
        }

        const currentActiveConfig =
          parsedProviders[activeProviderId as keyof typeof parsedProviders] ||
          DEFAULT_SETTINGS.providers['9router'];
        const endpoint = rawMap.endpoint || currentActiveConfig.endpoint;
        const apiKey = rawMap.apiKey || currentActiveConfig.apiKey;
        const model = rawMap.model || currentActiveConfig.model;

        let parsedAgents = AGENTS;
        if (rawMap.agents_json) {
          try {
            parsedAgents = JSON.parse(rawMap.agents_json);
          } catch (_) {}
        }

        let parsedActions = PROMPT_ACTIONS;
        if (rawMap.actions_json) {
          try {
            parsedActions = hydrateActions(JSON.parse(rawMap.actions_json));
          } catch (_) {}
        }

        return {
          activeProviderId,
          endpoint,
          apiKey,
          model,
          providers: parsedProviders,
          defaultProfile: rawMap.defaultProfile || DEFAULT_SETTINGS.defaultProfile,
          globalShortcut: rawMap.globalShortcut || DEFAULT_SETTINGS.globalShortcut,
          autoReadClipboard: rawMap.autoReadClipboard !== undefined
            ? rawMap.autoReadClipboard === 'true'
            : DEFAULT_SETTINGS.autoReadClipboard,
          temperature: rawMap.temperature ? parseFloat(rawMap.temperature) : DEFAULT_SETTINGS.temperature,
          keyboardNavMode: (rawMap.keyboardNavMode as any) || DEFAULT_SETTINGS.keyboardNavMode,
          enableVimMnemonicShortcuts: rawMap.enableVimMnemonicShortcuts !== undefined
            ? rawMap.enableVimMnemonicShortcuts === 'true'
            : DEFAULT_SETTINGS.enableVimMnemonicShortcuts,
          appearance: parsedAppearance,
          customVisionPrompt: rawMap.customVisionPrompt || undefined,
          customUiPrompt: rawMap.customUiPrompt || undefined,
          agents: parsedAgents,
          actions: parsedActions,
        };
      } catch (err) {
        console.warn('Failed to load settings from SQLite, using defaults:', err);
      }
    } else {
      const stored = localStorage.getItem('ai_commander_settings');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const rawApp = {
            ...DEFAULT_APPEARANCE,
            ...(parsed.appearance || {}),
          };
          if ((rawApp.accentColor as string) === 'amber') {
            rawApp.accentColor = 'sky';
          }
          if (rawApp.hudOpacity === 95 || !rawApp.hudOpacity) {
            rawApp.hudOpacity = 82;
          }
          return {
            ...DEFAULT_SETTINGS,
            ...parsed,
            providers: {
              ...DEFAULT_SETTINGS.providers,
              ...(parsed.providers || {}),
            },
            appearance: rawApp,
            agents: parsed.agents || AGENTS,
            actions: parsed.actions ? hydrateActions(parsed.actions) : PROMPT_ACTIONS,
          };
        } catch (_) {}
      }
    }
    return DEFAULT_SETTINGS;
  }

  static async saveSetting(
    key: keyof AppSettings,
    value: string | boolean | number | Record<string, any>
  ): Promise<void> {
    const stringVal = typeof value === 'object' ? JSON.stringify(value) : String(value);
    const dbKey =
      key === 'providers'
        ? 'providers_json'
        : key === 'appearance'
        ? 'appearance_json'
        : key === 'agents'
        ? 'agents_json'
        : key === 'actions'
        ? 'actions_json'
        : (key as string);

    if (isTauriEnvironment()) {
      try {
        await invoke('db_set_setting', { key: dbKey, value: stringVal });
        return;
      } catch (err) {
        console.error('Failed to save setting to SQLite:', err);
      }
    }
    const current = await this.getSettings();
    const updated = { ...current, [key]: value };
    localStorage.setItem('ai_commander_settings', JSON.stringify(updated));
  }

  static async saveSettings(settings: Partial<AppSettings>): Promise<void> {
    for (const [k, v] of Object.entries(settings)) {
      await this.saveSetting(k as keyof AppSettings, v as any);
    }
  }

  static async getHistory(limit: number = 50, search?: string): Promise<HistoryEntry[]> {
    if (isTauriEnvironment()) {
      try {
        return await invoke<HistoryEntry[]>('db_get_history', {
          limit,
          search: search || null,
        });
      } catch (err) {
        console.error('Failed to load history from SQLite:', err);
        return [];
      }
    } else {
      const stored = localStorage.getItem('ai_commander_history');
      if (stored) {
        try {
          let list: HistoryEntry[] = JSON.parse(stored);
          if (search) {
            const q = search.toLowerCase();
            list = list.filter(
              (h) =>
                h.input_text.toLowerCase().includes(q) ||
                h.output_text.toLowerCase().includes(q) ||
                h.action_title.toLowerCase().includes(q)
            );
          }
          return list.slice(0, limit);
        } catch (_) {}
      }
      return [];
    }
  }

  static async saveHistory(entry: HistoryEntry): Promise<number> {
    if (isTauriEnvironment()) {
      try {
        return await invoke<number>('db_save_history', { item: entry });
      } catch (err) {
        console.error('Failed to save history to SQLite:', err);
      }
    }
    // Web fallback
    const list = await this.getHistory(200);
    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now(),
      created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };
    list.unshift(newEntry);
    localStorage.setItem('ai_commander_history', JSON.stringify(list));
    return newEntry.id!;
  }

  static async deleteHistory(id: number): Promise<void> {
    if (isTauriEnvironment()) {
      try {
        await invoke('db_delete_history', { id });
        return;
      } catch (err) {
        console.error('Failed to delete history item in SQLite:', err);
      }
    }
    const list = await this.getHistory(200);
    const filtered = list.filter((h) => h.id !== id);
    localStorage.setItem('ai_commander_history', JSON.stringify(filtered));
  }

  static async clearHistory(): Promise<void> {
    if (isTauriEnvironment()) {
      try {
        await invoke('db_clear_history');
        return;
      } catch (err) {
        console.error('Failed to clear history in SQLite:', err);
      }
    }
    localStorage.removeItem('ai_commander_history');
  }
}
