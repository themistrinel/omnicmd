import React, { useState, useEffect, useCallback } from 'react';
import {
  AppSettings,
  KeyboardNavigationMode,
  AIProviderId,
  ProviderConnectionConfig,
  FontFamily,
  AccentColor,
  AppearanceSettings,
  Language,
} from '@/types';
import { StorageService, DEFAULT_SETTINGS, DEFAULT_APPEARANCE } from '@/lib/storage';
import { PROMPT_ACTIONS } from '@/lib/actions';
import { AGENTS } from '@/lib/agents';
import { Icon } from '@/components/Icon';
import { ACCENT_COLORS, FONT_FAMILIES, applyAppearanceSettings } from '@/lib/theme';
import { getTranslation, SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { UpdaterService, UpdateCheckResult } from '@/lib/updater';
import { AgentsSettingsTab } from './AgentsSettingsTab';
import { ActionsSettingsTab } from './ActionsSettingsTab';

interface SettingsViewProps {
  onBack: () => void;
  onSaved: (newSettings: AppSettings) => void;
}

type SettingsSection = 'appearance' | 'language' | 'providers' | 'agents' | 'actions' | 'keyboard' | 'vision' | 'updater' | 'general';

interface SectionItem {
  id: SettingsSection;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
}

const SECTIONS: SectionItem[] = [
  {
    id: 'appearance',
    label: 'Aparência & HUD',
    shortLabel: 'Aparência',
    icon: 'Palette',
    description: 'Modo de cor, paleta de destaque, desfoque de vidro e tipografia',
  },
  {
    id: 'language',
    label: 'Idioma & Região',
    shortLabel: 'Idioma',
    icon: 'Globe',
    description: 'Selecione o idioma da interface (Português, English, Español)',
  },
  {
    id: 'providers',
    label: 'Provedores de IA',
    shortLabel: 'Provedores',
    icon: 'Cpu',
    description: 'Endpoints, chaves de API e modelos (9router, Omni e Custom)',
  },
  {
    id: 'agents',
    label: 'Agentes de IA (@)',
    shortLabel: 'Agentes',
    icon: 'Sparkles',
    description: 'Prompts de sistema prontos e customizados para @dev, @prompt, @writer...',
  },
  {
    id: 'actions',
    label: 'Ações de Prompt (/)',
    shortLabel: 'Ações',
    icon: 'Terminal',
    description: 'Prompts prontos e customizados para /traduzir, /corrigir, /resumir...',
  },
  {
    id: 'keyboard',
    label: 'Teclado & Atalhos',
    shortLabel: 'Teclado',
    icon: 'Sliders',
    description: 'Ergonomia de navegação zero-mouse, modos Vim/Readline e atalho global',
  },
  {
    id: 'vision',
    label: 'Visão & Prompts',
    shortLabel: 'Visão',
    icon: 'Eye',
    description: 'Prompts de sistema especializados para inspeção 360° e engenharia reversa',
  },
  {
    id: 'updater',
    label: 'Atualizações & Devlog',
    shortLabel: 'Updates',
    icon: 'RefreshCw',
    description: 'Verifique novas versões, changelogs e notas de atualização do Tauri',
  },
  {
    id: 'general',
    label: 'Geral & Padrões',
    shortLabel: 'Geral',
    icon: 'Sliders',
    description: 'Agente padrão para texto livre, leitura de clipboard e temperatura',
  },
];

const PROVIDER_METADATA: Record<
  AIProviderId,
  {
    name: string;
    tagline: string;
    icon: string;
    defaultEndpoint: string;
    quickModels: Array<{ id: string; label: string }>;
  }
> = {
  '9router': {
    name: '9router Gateway',
    tagline: 'Roteador inteligente local/remoto com fallback automático e modelos de alta velocidade',
    icon: 'Zap',
    defaultEndpoint: 'http://localhost:20128/v1',
    quickModels: [
      { id: 'ag/gemini-3.8-flash-low', label: '⚡ Flash Low' },
      { id: 'ag/gemini-3.8-flash', label: '3.8 Flash' },
      { id: 'antigravity', label: 'Antigravity' },
      { id: 'ag/gemini-3.8-flash-high', label: 'Flash High' },
      { id: 'ag/claude-sonnet-4-6', label: 'Claude Sonnet' },
    ],
  },
  omni: {
    name: 'Omni Router',
    tagline: 'Gateway unificado e modelos locais de código aberto (vLLM, Ollama, LM Studio)',
    icon: 'Globe',
    defaultEndpoint: 'http://localhost:8000/v1',
    quickModels: [
      { id: 'llama-3.3-70b', label: 'Llama 3.3 70B' },
      { id: 'qwen-2.5-coder-32b', label: 'Qwen 2.5 Coder' },
      { id: 'deepseek-r1-distill', label: 'DeepSeek R1' },
      { id: 'mistral-large', label: 'Mistral Large' },
    ],
  },
  custom: {
    name: 'OpenAI / Custom',
    tagline: 'Conexão direta oficial com OpenAI, OpenRouter, Groq, Together ou proxy personalizado',
    icon: 'Sliders',
    defaultEndpoint: 'https://api.openai.com/v1',
    quickModels: [
      { id: 'gpt-4o-mini', label: 'GPT-4o Mini' },
      { id: 'gpt-4o', label: 'GPT-4o' },
      { id: 'claude-3-5-sonnet-latest', label: 'Claude 3.5' },
      { id: 'groq/llama-3.3-70b-versatile', label: 'Groq Llama' },
    ],
  },
};

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack, onSaved }) => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [currentSection, setCurrentSection] = useState<SettingsSection>('appearance');
  const [activeProviderTab, setActiveProviderTab] = useState<AIProviderId>('9router');
  const [savedNotification, setSavedNotification] = useState(false);
  const [showApiKey, setShowApiKey] = useState<Record<AIProviderId, boolean>>({
    '9router': false,
    omni: false,
    custom: false,
  });

  // Updater state
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateResult, setUpdateResult] = useState<UpdateCheckResult | null>(null);
  const [installingUpdate, setInstallingUpdate] = useState(false);
  const [installProgress, setInstallProgress] = useState<number | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handleCheckUpdate = useCallback(async () => {
    setCheckingUpdate(true);
    setUpdateError(null);
    try {
      const result = await UpdaterService.checkForUpdates();
      setUpdateResult(result);
    } catch (err: unknown) {
      setUpdateError(err instanceof Error ? err.message : 'Falha ao verificar atualizações.');
    } finally {
      setCheckingUpdate(false);
    }
  }, []);

  const handleInstallUpdate = useCallback(async () => {
    setInstallingUpdate(true);
    setUpdateError(null);
    try {
      await UpdaterService.downloadAndInstall((p) => {
        if (p.total && p.total > 0) {
          setInstallProgress(Math.round((p.downloaded / p.total) * 100));
        }
      });
      await UpdaterService.relaunchApp();
    } catch (err: unknown) {
      setUpdateError(err instanceof Error ? err.message : 'Erro ao baixar ou aplicar a atualização.');
      setInstallingUpdate(false);
    }
  }, []);

  useEffect(() => {
    StorageService.getSettings().then((loaded) => {
      setSettings(loaded);
      setActiveProviderTab(loaded.activeProviderId || '9router');
      if (loaded.appearance) {
        applyAppearanceSettings(loaded.appearance);
      }
    });
  }, []);

  const appearance: AppearanceSettings = settings.appearance || DEFAULT_APPEARANCE;
  const t = getTranslation(settings.language);

  const handleUpdateLanguage = useCallback((lang: Language) => {
    setSettings((prev) => {
      const updated = { ...prev, language: lang };
      StorageService.saveSettings(updated);
      onSaved(updated);
      return updated;
    });
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  }, [onSaved]);

  const handleUpdateAppearance = useCallback(
    <K extends keyof AppearanceSettings>(field: K, value: AppearanceSettings[K]) => {
      setSettings((prev) => {
        const currentAppearance = prev.appearance || DEFAULT_APPEARANCE;
        const updatedAppearance: AppearanceSettings = {
          ...currentAppearance,
          [field]: value,
        };
        // Apply instantly to the DOM for immediate tactile response
        applyAppearanceSettings(updatedAppearance);
        return {
          ...prev,
          appearance: updatedAppearance,
        };
      });
    },
    []
  );

  const handleUpdateProviderConfig = useCallback(
    (providerId: AIProviderId, field: keyof ProviderConnectionConfig, value: string) => {
      setSettings((prev) => {
        const currentProviderConfig = prev.providers[providerId];
        const updatedConfig = { ...currentProviderConfig, [field]: value };
        const updatedProviders = { ...prev.providers, [providerId]: updatedConfig };
        const isCurrentActive = prev.activeProviderId === providerId;
        return {
          ...prev,
          providers: updatedProviders,
          ...(isCurrentActive
            ? {
                endpoint: field === 'endpoint' ? value : prev.endpoint,
                apiKey: field === 'apiKey' ? value : prev.apiKey,
                model: field === 'model' ? value : prev.model,
              }
            : {}),
        };
      });
    },
    []
  );

  const handleSetActiveProvider = useCallback((providerId: AIProviderId) => {
    setSettings((prev) => {
      const targetConfig = prev.providers[providerId];
      return {
        ...prev,
        activeProviderId: providerId,
        endpoint: targetConfig.endpoint,
        apiKey: targetConfig.apiKey,
        model: targetConfig.model,
      };
    });
  }, []);

  const handleSave = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      await StorageService.saveSettings(settings);
      if (settings.appearance) {
        applyAppearanceSettings(settings.appearance);
      }
      onSaved(settings);
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 2400);
    },
    [settings, onSaved]
  );

  // Keyboard ergonomics:
  // - Ctrl+S / Cmd+S: Save immediately
  // - Escape: Go back to search
  // - Up/Down / 1-5: Switch category when not typing in an input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSave();
        return;
      }

      const target = e.target as HTMLElement | null;
      const isTyping =
        target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT');

      if (!isTyping) {
        if (/^[1-5]$/.test(e.key)) {
          e.preventDefault();
          const targetSection = SECTIONS[parseInt(e.key, 10) - 1];
          if (targetSection) {
            setCurrentSection(targetSection.id);
          }
          return;
        }

        if (e.key === 'ArrowUp' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
          e.preventDefault();
          setCurrentSection((prev) => {
            const idx = SECTIONS.findIndex((s) => s.id === prev);
            return idx > 0 ? SECTIONS[idx - 1].id : SECTIONS[SECTIONS.length - 1].id;
          });
          return;
        }

        if (e.key === 'ArrowDown' || (e.ctrlKey && e.key.toLowerCase() === 'j')) {
          e.preventDefault();
          setCurrentSection((prev) => {
            const idx = SECTIONS.findIndex((s) => s.id === prev);
            return idx < SECTIONS.length - 1 ? SECTIONS[idx + 1].id : SECTIONS[0].id;
          });
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

  const activeAccent = ACCENT_COLORS[appearance.accentColor] || ACCENT_COLORS.sky;
  const currentProviderConfig = settings.providers[activeProviderTab];
  const activeSectionInfo = SECTIONS.find((s) => s.id === currentSection) || SECTIONS[0];

  return (
    <div className="flex flex-col flex-1 min-h-0 select-none">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-hud shrink-0 hud-header">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-inherit hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Voltar para a busca (Esc)"
          >
            <Icon name="ArrowLeft" className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-xs transition-colors"
              style={{
                backgroundColor: 'var(--accent-color)',
                boxShadow: `0 0 8px var(--accent-color)`,
              }}
            />
            <h1 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">{t.settingsTitle}</h1>
            <span className="text-slate-400 dark:text-zinc-500 text-xs">•</span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">{activeSectionInfo.shortLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {savedNotification && (
            <span className="text-xs flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in zoom-in-95 duration-150">
              <Icon name="Check" className="w-3.5 h-3.5" />
              <span>{t.settingsSaveSuccess}</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => handleSave()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
            style={{
              backgroundColor: 'var(--accent-color)',
              boxShadow: `0 2px 10px rgba(var(--accent-rgb), 0.35)`,
            }}
            title="Salvar alterações (Ctrl+S)"
          >
            <Icon name="Check" className="w-3.5 h-3.5" />
            <span>{settings.language === 'en-US' ? 'Save' : settings.language === 'es-ES' ? 'Guardar' : 'Salvar'}</span>
            <kbd className="text-[10px] bg-black/20 dark:bg-white/20 px-1 py-0.2 rounded font-mono ml-0.5">Ctrl+S</kbd>
          </button>
        </div>
      </header>

      {/* Split Master-Detail Layout */}
      <div className="flex-1 min-h-0 grid grid-cols-12 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="col-span-4 border-r border-hud flex flex-col justify-between p-2.5 overflow-hidden">
          <nav className="space-y-1" aria-label="Categorias de configuração">
            {SECTIONS.map((section, idx) => {
              const isSelected = currentSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setCurrentSection(section.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer border ${
                    isSelected
                      ? 'bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white border-hud shadow-xs'
                      : 'border-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-inherit hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  style={
                    isSelected
                      ? {
                          borderColor: 'rgba(var(--accent-rgb), 0.3)',
                          backgroundColor: 'rgba(var(--accent-rgb), 0.10)',
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      name={section.icon}
                      className="w-4 h-4 shrink-0 transition-colors"
                      style={isSelected ? { color: 'var(--accent-color)' } : undefined}
                    />
                    <span className="truncate">{section.label}</span>
                  </div>

                  {section.id === 'providers' && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded font-mono font-normal border shrink-0"
                      style={{
                        backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
                        borderColor: 'rgba(var(--accent-rgb), 0.3)',
                        color: 'var(--accent-color)',
                      }}
                    >
                      {settings.activeProviderId}
                    </span>
                  )}

                  {section.id !== 'providers' && (
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono shrink-0">{idx + 1}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar Status Card */}
          <div className="p-2.5 rounded-xl border border-hud hud-card space-y-1.5 text-[11px] text-slate-600 dark:text-zinc-400">
            <div className="flex items-center justify-between">
              <span className="font-medium">Tema do HUD</span>
              <span className="capitalize font-mono text-slate-800 dark:text-inherit text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
                {appearance.themeMode}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Destaque</span>
              <span className="flex items-center gap-1.5 font-medium" style={{ color: 'var(--accent-color)' }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
                {activeAccent.name}
              </span>
            </div>
            <div className="pt-1 border-t border-hud flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
              <span>↑↓ Navegar</span>
              <span>1-5 Alternar</span>
            </div>
          </div>
        </aside>

        {/* Right Content Pane */}
        <main className="col-span-8 flex flex-col min-h-0 overflow-y-auto px-4 py-3 text-sm">
          {/* ======================================================== */}
          {/* SECTION: IDIOMA & REGIÃO                                 */}
          {/* ======================================================== */}
          {currentSection === 'language' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{t.languageLabel}</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  {t.languageDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = (settings.language || 'pt-BR') === lang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => handleUpdateLanguage(lang.id)}
                      className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'border-sky-500 dark:border-white/20 bg-sky-500/10 dark:bg-white/[0.08] shadow-sm'
                          : 'border-hud hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                      }`}
                      style={
                        isSelected
                          ? {
                              borderColor: 'var(--accent-color)',
                              backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
                            }
                          : undefined
                      }
                    >
                      <span className="text-3xl">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{lang.name}</span>
                        <span className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{lang.nativeName}</span>
                      </div>
                      {isSelected && (
                        <span
                          className="mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                          style={{
                            backgroundColor: 'rgba(var(--accent-rgb), 0.18)',
                            color: 'var(--accent-text, var(--accent-color))',
                          }}
                        >
                          Ativo / Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: APARÊNCIA & HUD                                */}
          {/* ======================================================== */}
          {currentSection === 'appearance' && (
            <div className="space-y-4">
              {/* Section Header */}
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Aparência &amp; Estilo Visual</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Personalize o visual acrílico do HUD, modos de contraste e paletas temáticas.
                </p>
              </div>

              {/* Theme Mode Selector (Dark, Light, System) */}
              <div className="space-y-2">
                <label className="text-xs font-semibold block text-slate-800 dark:text-zinc-200">{t.themeModeLabel}</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateAppearance('themeMode', 'dark')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all cursor-pointer text-center ${
                      appearance.themeMode === 'dark'
                        ? 'border-hud shadow-sm'
                        : 'border-hud hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
                    }`}
                    style={
                      appearance.themeMode === 'dark'
                        ? {
                            borderColor: 'var(--accent-color)',
                            backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
                          }
                        : undefined
                    }
                  >
                    <Icon name="Moon" className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{t.themeDark}</span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400">{t.themeDarkDesc}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateAppearance('themeMode', 'light')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all cursor-pointer text-center ${
                      appearance.themeMode === 'light'
                        ? 'border-hud shadow-sm'
                        : 'border-hud hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
                    }`}
                    style={
                      appearance.themeMode === 'light'
                        ? {
                            borderColor: 'var(--accent-color)',
                            backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
                          }
                        : undefined
                    }
                  >
                    <Icon name="Sun" className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{t.themeLight}</span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400">{t.themeLightDesc}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateAppearance('themeMode', 'system')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all cursor-pointer text-center ${
                      appearance.themeMode === 'system'
                        ? 'border-hud shadow-sm'
                        : 'border-hud hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
                    }`}
                    style={
                      appearance.themeMode === 'system'
                        ? {
                            borderColor: 'var(--accent-color)',
                            backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
                          }
                        : undefined
                    }
                  >
                    <Icon name="Laptop" className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{t.themeSystem}</span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400">{t.themeSystemDesc}</span>
                  </button>
                </div>
              </div>

              {/* Accent Color Palette */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Cor de Destaque</label>
                  <span className="text-xs font-medium" style={{ color: 'var(--accent-color)' }}>
                    {activeAccent.name}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {(Object.keys(ACCENT_COLORS) as AccentColor[]).map((colorKey) => {
                    const meta = ACCENT_COLORS[colorKey];
                    const isSelected = appearance.accentColor === colorKey;
                    return (
                      <button
                        key={colorKey}
                        type="button"
                        onClick={() => handleUpdateAppearance('accentColor', colorKey)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-hud shadow-xs'
                            : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                        }`}
                        style={
                          isSelected
                            ? {
                                borderColor: meta.hex,
                                backgroundColor: `rgba(${meta.rgb}, 0.15)`,
                              }
                            : undefined
                        }
                        title={meta.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] transition-transform"
                          style={{
                            backgroundColor: meta.hex,
                            transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                            boxShadow: isSelected ? `0 0 10px ${meta.hex}` : undefined,
                          }}
                        >
                          {isSelected && <Icon name="Check" className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate max-w-full text-center">
                          {meta.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Live Theme Preview Pill Card */}
                <div
                  className="p-3 rounded-xl border transition-colors flex items-center justify-between text-xs mt-2"
                  style={{
                    backgroundColor: 'rgba(var(--accent-rgb), 0.08)',
                    borderColor: 'rgba(var(--accent-rgb), 0.25)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    />
                    <span className="font-semibold" style={{ color: 'var(--accent-color)' }}>
                      Prévia do Tema Ativo:
                    </span>
                    <span className="text-slate-600 dark:text-zinc-400">Botões, bordas e cursores respondem a esta cor</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-mono border font-semibold"
                      style={{
                        backgroundColor: 'rgba(var(--accent-rgb), 0.2)',
                        borderColor: 'var(--accent-color)',
                        color: 'var(--accent-color)',
                      }}
                    >
                      Tab
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded text-[11px] font-semibold text-white shadow-xs"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    >
                      Ação
                    </span>
                  </div>
                </div>
              </div>

              {/* Glassmorphism & Translucency */}
              <div className="space-y-3 pt-1">
                <label className="text-xs font-semibold block text-slate-800 dark:text-zinc-200">Vidro &amp; Desfoque Acrílico</label>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-zinc-300 font-medium">Opacidade de Fundo do HUD</span>
                    <span className="font-mono text-[11px] font-semibold" style={{ color: 'var(--accent-color)' }}>
                      {appearance.hudOpacity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    value={appearance.hudOpacity}
                    onChange={(e) => handleUpdateAppearance('hudOpacity', parseInt(e.target.value, 10))}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-black/20 dark:bg-white/20"
                    style={{ accentColor: 'var(--accent-color)' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-zinc-400">
                    <span>50% (Ultra-Translúcido)</span>
                    <span>75% (Acrílico Médio)</span>
                    <span>100% (Opaco)</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-zinc-300 font-medium">Desfoque Acrílico de Fundo</span>
                    <span className="font-mono text-[11px] font-semibold" style={{ color: 'var(--accent-color)' }}>
                      {appearance.hudBlur}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    step="1"
                    value={appearance.hudBlur}
                    onChange={(e) => handleUpdateAppearance('hudBlur', parseInt(e.target.value, 10))}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-black/20 dark:bg-white/20"
                    style={{ accentColor: 'var(--accent-color)' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-zinc-400">
                    <span>0px (Nítido sem blur)</span>
                    <span>16px (Padrão)</span>
                    <span>32px (Máxima profundidade)</span>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold block text-slate-800 dark:text-slate-200">Família Tipográfica</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(FONT_FAMILIES) as FontFamily[]).map((fontKey) => {
                    const fMeta = FONT_FAMILIES[fontKey];
                    const isSelected = appearance.fontFamily === fontKey;
                    return (
                      <button
                        key={fontKey}
                        type="button"
                        onClick={() => handleUpdateAppearance('fontFamily', fontKey)}
                        className={`flex flex-col items-start p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'border-hud shadow-xs'
                            : 'border-hud hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                        }`}
                        style={{
                          fontFamily: fMeta.css,
                          borderColor: isSelected ? 'var(--accent-color)' : undefined,
                          backgroundColor: isSelected ? 'rgba(var(--accent-rgb), 0.10)' : undefined,
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-semibold">{fMeta.name}</span>
                          {isSelected && (
                            <Icon name="Check" className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {fMeta.description}
                        </span>
                        <span
                          className="mt-2 text-xs px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 border border-hud w-full text-center"
                          style={{ fontFamily: fMeta.css }}
                        >
                          {fMeta.previewSample}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Native Window Borders for Hyprland / Wayland */}
              <div className="pt-3 border-t border-hud">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 pr-4">
                    <label className="text-xs font-semibold block text-slate-200">
                      Bordas Nativas do Sistema (Hyprland / Compositor)
                    </label>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Remove a borda interna e cantos arredondados fixos do app, delegando o contorno ativo (<code className="text-accent text-[10px]">col.active_border</code>), sombras e raio (<code className="text-accent text-[10px]">rounding</code>) diretamente ao seu compositor Hyprland.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={appearance.nativeBorders ?? false}
                    onClick={() => handleUpdateAppearance('nativeBorders', !(appearance.nativeBorders ?? false))}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      appearance.nativeBorders ? 'bg-accent' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        appearance.nativeBorders ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: PROVEDORES DE IA                                */}
          {/* ======================================================== */}
          {currentSection === 'providers' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">Provedores &amp; Gateways de IA</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Configure os roteadores locais ou remotos compatíveis com especificações OpenAI.
                </p>
              </div>

              {/* Provider Selection Cards */}
              <div className="grid grid-cols-3 gap-2">
                {(['9router', 'omni', 'custom'] as AIProviderId[]).map((pid) => {
                  const meta = PROVIDER_METADATA[pid];
                  const isSelectedTab = activeProviderTab === pid;
                  const isSystemActive = settings.activeProviderId === pid;

                  return (
                    <button
                      key={pid}
                      type="button"
                      onClick={() => setActiveProviderTab(pid)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        isSelectedTab
                          ? 'border-hud shadow-xs'
                          : 'border-hud hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
                      }`}
                      style={
                        isSelectedTab
                          ? {
                              borderColor: 'var(--accent-color)',
                              backgroundColor: 'rgba(var(--accent-rgb), 0.10)',
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon
                            name={meta.icon}
                            className="w-4 h-4"
                            style={{ color: isSelectedTab ? 'var(--accent-color)' : undefined }}
                          />
                          <span className="text-xs font-semibold">{meta.name}</span>
                        </div>
                        {isSystemActive && (
                          <span
                            className="w-2 h-2 rounded-full ring-2"
                            style={{
                              backgroundColor: 'var(--accent-color)',
                              boxShadow: `0 0 8px var(--accent-color)`,
                            }}
                            title="Provedor ativo no momento"
                          />
                        )}
                      </div>

                      <span className="text-[10px] text-zinc-400 line-clamp-1">
                        {isSystemActive ? 'Ativo no HUD' : 'Disponível'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Provider Details Form */}
              <div className="p-3.5 rounded-xl border border-hud hud-card space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-hud">
                  <div className="text-xs">
                    <span className="font-semibold">{PROVIDER_METADATA[activeProviderTab].name}</span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {PROVIDER_METADATA[activeProviderTab].tagline}
                    </p>
                  </div>

                  {settings.activeProviderId !== activeProviderTab ? (
                    <button
                      type="button"
                      onClick={() => handleSetActiveProvider(activeProviderTab)}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border shadow-xs"
                      style={{
                        backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
                        borderColor: 'var(--accent-color)',
                        color: 'var(--accent-color)',
                      }}
                    >
                      Definir como Ativo
                    </button>
                  ) : (
                    <span
                      className="font-medium text-[11px] flex items-center gap-1 shrink-0"
                      style={{ color: 'var(--accent-color)' }}
                    >
                      <Icon name="Check" className="w-3 h-3" />
                      Em Uso no HUD
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Endpoint Base</label>
                  <input
                    type="text"
                    value={currentProviderConfig.endpoint}
                    onChange={(e) => handleUpdateProviderConfig(activeProviderTab, 'endpoint', e.target.value)}
                    placeholder={PROVIDER_METADATA[activeProviderTab].defaultEndpoint}
                    className="hud-input w-full px-3 py-1.5 rounded-lg border font-mono text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Chave de API / Token</label>
                  <div className="relative">
                    <input
                      type={showApiKey[activeProviderTab] ? 'text' : 'password'}
                      value={currentProviderConfig.apiKey}
                      onChange={(e) => handleUpdateProviderConfig(activeProviderTab, 'apiKey', e.target.value)}
                      placeholder="Deixe vazio se o gateway local não exigir autenticação..."
                      className="hud-input w-full pl-3 pr-14 py-1.5 rounded-lg border font-mono text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowApiKey((prev) => ({ ...prev, [activeProviderTab]: !prev[activeProviderTab] }))
                      }
                      className="absolute right-2.5 top-2 text-zinc-400 hover:text-inherit text-xs cursor-pointer font-medium"
                    >
                      {showApiKey[activeProviderTab] ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Modelo Principal</label>
                  <input
                    type="text"
                    value={currentProviderConfig.model}
                    onChange={(e) => handleUpdateProviderConfig(activeProviderTab, 'model', e.target.value)}
                    placeholder="Nome do modelo ou combo..."
                    className="hud-input w-full px-3 py-1.5 rounded-lg border font-mono text-xs focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] text-zinc-400 self-center mr-1">Sugeridos:</span>
                    {PROVIDER_METADATA[activeProviderTab].quickModels.map((m) => {
                      const isModelSelected = currentProviderConfig.model === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleUpdateProviderConfig(activeProviderTab, 'model', m.id)}
                          className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                            isModelSelected
                              ? 'font-medium shadow-xs'
                              : 'border-transparent bg-black/10 dark:bg-white/10 text-zinc-400 hover:text-inherit hover:bg-black/15'
                          }`}
                          style={
                            isModelSelected
                              ? {
                                  backgroundColor: 'rgba(var(--accent-rgb), 0.2)',
                                  borderColor: 'var(--accent-color)',
                                  color: 'var(--accent-color)',
                                }
                              : undefined
                          }
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: AGENTES DE IA (@)                              */}
          {/* ======================================================== */}
          {currentSection === 'agents' && (
            <AgentsSettingsTab
              agents={settings.agents || AGENTS}
              onUpdateAgents={(updatedAgents) =>
                setSettings({ ...settings, agents: updatedAgents })
              }
            />
          )}

          {/* ======================================================== */}
          {/* SECTION: AÇÕES DE PROMPT (/)                            */}
          {/* ======================================================== */}
          {currentSection === 'actions' && (
            <ActionsSettingsTab
              actions={settings.actions || PROMPT_ACTIONS}
              onUpdateActions={(updatedActions) =>
                setSettings({ ...settings, actions: updatedActions })
              }
            />
          )}

          {/* ======================================================== */}
          {/* SECTION: TECLADO & ATALHOS                              */}
          {/* ======================================================== */}
          {currentSection === 'keyboard' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">Teclado &amp; Ergonomia Zero-Mouse</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Controle total do HUD por atalhos de teclado e comandos de muscle memory.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Modo de Navegação em Listas</label>
                  <select
                    value={settings.keyboardNavMode}
                    onChange={(e) =>
                      setSettings({ ...settings, keyboardNavMode: e.target.value as KeyboardNavigationMode })
                    }
                    className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none"
                  >
                    <option value="hybrid">Híbrido: Setas + Readline (Ctrl+N/P) + Vim (Ctrl+J/K)</option>
                    <option value="vim">Vim / Readline Focado: Ctrl+J/K e Ctrl+N/P prioritários</option>
                    <option value="standard">Padrão: Apenas Setas do Teclado</option>
                  </select>
                  <span className="text-[11px] text-zinc-400 block mt-0.5">
                    Permite descer e subir em listas sem tirar a mão da linha inicial (home row).
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-hud">
                  <div>
                    <span className="font-medium block text-xs">Atalhos Mnemônicos Rápidos</span>
                    <span className="text-xs text-zinc-400">
                      Teclas diretas de 1 toque fora de campos de texto (&apos;c&apos; copiar, &apos;e&apos; editar, &apos;r&apos; regenerar)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enableVimMnemonicShortcuts}
                    onChange={(e) =>
                      setSettings({ ...settings, enableVimMnemonicShortcuts: e.target.checked })
                    }
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: 'var(--accent-color)' }}
                  />
                </div>

                <div className="space-y-1 pt-2 border-t border-hud">
                  <label className="text-xs font-medium">Atalho Global de Invocação</label>
                  <input
                    type="text"
                    value={settings.globalShortcut}
                    onChange={(e) => setSettings({ ...settings, globalShortcut: e.target.value })}
                    placeholder="Super+Space"
                    className="hud-input w-full px-3 py-1.5 rounded-lg border font-mono text-xs focus:outline-none"
                  />
                  <span className="text-[11px] text-zinc-400 block mt-0.5">
                    Configurado na inicialização da aplicação Tauri (ex: Super+Space, Alt+Space).
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: VISÃO & PROMPTS                                */}
          {/* ======================================================== */}
          {currentSection === 'vision' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">Instruções de Visão &amp; Multimodal</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Personalize os prompts de sistema para análise de prints e telas capturadas da área de transferência.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Prompt de Sistema para Análise de Imagem (/analisar)</label>
                  <textarea
                    value={settings.customVisionPrompt || ''}
                    onChange={(e) => setSettings({ ...settings, customVisionPrompt: e.target.value })}
                    placeholder="Deixe em branco para usar o prompt padrão com OCR detalhado, leitura de layout e cores..."
                    rows={4}
                    className="hud-input w-full px-3 py-2 rounded-lg border text-xs focus:outline-none resize-y leading-relaxed font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Prompt de Sistema para UI &amp; Frontend (/analisar-ui)</label>
                  <textarea
                    value={settings.customUiPrompt || ''}
                    onChange={(e) => setSettings({ ...settings, customUiPrompt: e.target.value })}
                    placeholder="Deixe em branco para usar o prompt padrão de engenharia reversa de UI, Tailwind CSS e acessibilidade..."
                    rows={4}
                    className="hud-input w-full px-3 py-2 rounded-lg border text-xs focus:outline-none resize-y leading-relaxed font-sans"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: ATUALIZAÇÕES & DEVLOG (TAURI UPDATER)           */}
          {/* ======================================================== */}
          {currentSection === 'updater' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">Atualizações do Tauri &amp; Devlog</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Verifique novas versões binárias, changelogs e notas de engenharia do OmniCmd.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-hud hud-card space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
                        borderColor: 'rgba(var(--accent-rgb), 0.3)',
                        color: 'var(--accent-color)',
                      }}
                    >
                      <Icon name="RefreshCw" className={`w-5 h-5 ${checkingUpdate ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-inherit">Versão Atual:</span>
                        <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-black/20 dark:bg-white/10 text-inherit border border-hud">
                          v0.1.0
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        {updateResult?.available
                          ? `Nova versão v${updateResult.version} disponível para instalação!`
                          : updateResult
                          ? 'Você já está rodando a compilação mais recente.'
                          : 'Clique abaixo para buscar atualizações no repositório.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={checkingUpdate || installingUpdate}
                      onClick={handleCheckUpdate}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-hud transition-all cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-50"
                    >
                      {checkingUpdate ? 'Verificando...' : 'Verificar Agora'}
                    </button>

                    {updateResult?.available && (
                      <button
                        type="button"
                        disabled={installingUpdate}
                        onClick={handleInstallUpdate}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                        style={{
                          backgroundColor: 'var(--accent-color)',
                          boxShadow: '0 2px 10px rgba(var(--accent-rgb), 0.35)',
                        }}
                      >
                        <Icon name="Download" className="w-3.5 h-3.5" />
                        <span>
                          {installingUpdate
                            ? installProgress !== null
                              ? `Baixando (${installProgress}%)...`
                              : 'Instalando...'
                            : 'Atualizar App'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {updateError && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                    <Icon name="AlertCircle" className="w-4 h-4 shrink-0" />
                    <span>{updateError}</span>
                  </div>
                )}

                {updateResult?.body && (
                  <div className="space-y-1.5 pt-2 border-t border-hud">
                    <span className="text-xs font-semibold text-zinc-300">Notas de Atualização (Changelog):</span>
                    <div className="p-3 rounded-lg bg-black/20 dark:bg-white/5 border border-hud text-xs font-mono text-zinc-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
                      {updateResult.body}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: GERAL & PERFIL                                 */}
          {/* ======================================================== */}
          {currentSection === 'general' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Geral &amp; Idioma</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  Selecione o idioma da interface, parâmetros do modelo e agente padrão.
                </p>
              </div>

              {/* Language Selector */}
              <div className="space-y-2 pb-3 border-b border-hud">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold block text-slate-900 dark:text-zinc-200">{t.languageLabel}</label>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">{t.languageDesc}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = (settings.language || 'pt-BR') === lang.id;
                    return (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => handleUpdateLanguage(lang.id)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-sky-500 dark:border-white/20 bg-sky-500/10 dark:bg-white/[0.08] shadow-xs'
                            : 'border-hud hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
                        }`}
                        style={isSelected ? { borderColor: 'var(--accent-color)', backgroundColor: 'rgba(var(--accent-rgb), 0.12)' } : undefined}
                      >
                        <span className="text-xl shrink-0">{lang.flag}</span>
                        <div className="flex flex-col text-left truncate">
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">{lang.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-zinc-400">{lang.nativeName}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-800 dark:text-zinc-200">Agente Padrão (Texto Livre)</label>
                  <select
                    value={settings.defaultProfile}
                    onChange={(e) => setSettings({ ...settings, defaultProfile: e.target.value })}
                    className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none text-slate-900 dark:text-white"
                  >
                    {(settings.agents || AGENTS).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.handle ? `${p.handle} — ` : ''}{p.name} ({p.description})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 dark:text-zinc-200">Temperatura do Modelo</span>
                    <span className="font-mono text-[11px] font-semibold" style={{ color: 'var(--accent-color)' }}>
                      {settings.temperature}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.5"
                    step="0.05"
                    value={settings.temperature}
                    onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-black/20 dark:bg-white/20"
                    style={{ accentColor: 'var(--accent-color)' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 dark:text-zinc-500">
                    <span>0.0 (Determinístico / Código)</span>
                    <span>0.7 (Equilibrado)</span>
                    <span>1.5 (Criativo / Brainstorm)</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-hud">
                  <div>
                    <span className="font-medium block text-xs text-slate-800 dark:text-zinc-200">Leitura Automática da Área de Transferência</span>
                    <span className="text-xs text-slate-500 dark:text-zinc-400">
                      Detecta texto e imagens no clipboard ao abrir o HUD
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoReadClipboard}
                    onChange={(e) => setSettings({ ...settings, autoReadClipboard: e.target.checked })}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: 'var(--accent-color)' }}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
