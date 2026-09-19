import React, { useState, useEffect } from 'react';
import {
  AppSettings,
  KeyboardNavigationMode,
  AIProviderId,
  ProviderConnectionConfig,
  FontFamily,
  AccentColor,
  AppearanceSettings,
} from '@/types';
import { StorageService, DEFAULT_SETTINGS, DEFAULT_APPEARANCE } from '@/lib/storage';
import { PROFILES } from '@/lib/profiles';
import { Icon } from '@/components/Icon';
import { ACCENT_COLORS, FONT_FAMILIES, applyAppearanceSettings } from '@/lib/theme';

interface SettingsViewProps {
  onBack: () => void;
  onSaved: (newSettings: AppSettings) => void;
}

type SettingsSection = 'appearance' | 'providers' | 'general';

const PROVIDER_METADATA: Record<
  AIProviderId,
  {
    name: string;
    description: string;
    icon: string;
    defaultEndpoint: string;
    quickModels: Array<{ id: string; label: string }>;
  }
> = {
  '9router': {
    name: '9router',
    description: 'Roteador inteligente local/remoto com combos otimizados',
    icon: 'Zap',
    defaultEndpoint: 'http://localhost:20128/v1',
    quickModels: [
      { id: 'ag/gemini-3.8-flash-low', label: '⚡ 3.8 Flash Low' },
      { id: 'ag/gemini-3.8-flash', label: '3.8 Flash' },
      { id: 'antigravity', label: 'Combo Antigravity' },
      { id: 'ag/gemini-3.8-flash-high', label: '3.8 Flash High' },
      { id: 'ag/claude-sonnet-4-6', label: 'Claude Sonnet' },
    ],
  },
  omni: {
    name: 'Omni Router',
    description: 'Gateway unificado e modelos abertos locais (vLLM / Ollama / Omni)',
    icon: 'Globe',
    defaultEndpoint: 'http://localhost:8000/v1',
    quickModels: [
      { id: 'llama-3.3-70b', label: 'Llama 3.3 70B' },
      { id: 'qwen-2.5-coder-32b', label: 'Qwen 2.5 Coder 32B' },
      { id: 'deepseek-r1-distill', label: 'DeepSeek R1 Distill' },
      { id: 'mistral-large', label: 'Mistral Large' },
    ],
  },
  custom: {
    name: 'Custom / OpenAI',
    description: 'OpenAI oficial, OpenRouter, Groq ou qualquer proxy compatível',
    icon: 'Sliders',
    defaultEndpoint: 'https://api.openai.com/v1',
    quickModels: [
      { id: 'gpt-4o-mini', label: 'GPT-4o Mini' },
      { id: 'gpt-4o', label: 'GPT-4o' },
      { id: 'claude-3-5-sonnet-latest', label: 'Claude 3.5 Sonnet' },
      { id: 'groq/llama-3.3-70b-versatile', label: 'Groq Llama 3.3' },
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

  const handleUpdateAppearance = <K extends keyof AppearanceSettings>(
    field: K,
    value: AppearanceSettings[K]
  ) => {
    setSettings((prev) => {
      const currentAppearance = prev.appearance || DEFAULT_APPEARANCE;
      const updatedAppearance: AppearanceSettings = {
        ...currentAppearance,
        [field]: value,
      };
      // Live feedback: apply right away to the DOM
      applyAppearanceSettings(updatedAppearance);
      return {
        ...prev,
        appearance: updatedAppearance,
      };
    });
  };

  const handleUpdateProviderConfig = (
    providerId: AIProviderId,
    field: keyof ProviderConnectionConfig,
    value: string
  ) => {
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
  };

  const handleSetActiveProvider = (providerId: AIProviderId) => {
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
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await StorageService.saveSettings(settings);
    if (settings.appearance) {
      applyAppearanceSettings(settings.appearance);
    }
    onSaved(settings);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  // Keyboard shortcut Ctrl+S inside settings to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings]);

  const activeProviderMeta = PROVIDER_METADATA[activeProviderTab];
  const activeTabConfig = settings.providers[activeProviderTab];
  const activeAccent = ACCENT_COLORS[appearance.accentColor] || ACCENT_COLORS.indigo;

  return (
    <div className="flex flex-col flex-1 min-h-0 p-3.5 space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-hud shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-inherit hover:bg-white/10 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Voltar (Esc)"
          >
            <Icon name="ArrowLeft" className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Icon name="Settings" className="w-4 h-4 text-accent-primary" style={{ color: activeAccent.hex }} />
            <span className="text-sm font-semibold">Configurações do OmniCmd</span>
          </div>
        </div>

        {savedNotification && (
          <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium animate-pulse">
            <Icon name="Check" className="w-4 h-4" />
            Salvo com sucesso!
          </span>
        )}
      </div>

      {/* Primary Section Switcher */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/10 dark:bg-zinc-950/70 rounded-xl border border-hud shrink-0">
        <button
          type="button"
          onClick={() => setCurrentSection('appearance')}
          className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            currentSection === 'appearance'
              ? 'bg-white/15 dark:bg-zinc-800 text-inherit shadow-xs font-semibold'
              : 'text-zinc-400 hover:text-inherit hover:bg-white/5'
          }`}
          style={currentSection === 'appearance' ? { borderBottom: `2px solid ${activeAccent.hex}` } : undefined}
        >
          <Icon name="Palette" className="w-3.5 h-3.5" style={{ color: currentSection === 'appearance' ? activeAccent.hex : undefined }} />
          <span>Aparência &amp; HUD</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentSection('providers')}
          className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            currentSection === 'providers'
              ? 'bg-white/15 dark:bg-zinc-800 text-inherit shadow-xs font-semibold'
              : 'text-zinc-400 hover:text-inherit hover:bg-white/5'
          }`}
          style={currentSection === 'providers' ? { borderBottom: `2px solid ${activeAccent.hex}` } : undefined}
        >
          <Icon name="Cpu" className="w-3.5 h-3.5" style={{ color: currentSection === 'providers' ? activeAccent.hex : undefined }} />
          <span>Provedores de IA</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentSection('general')}
          className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            currentSection === 'general'
              ? 'bg-white/15 dark:bg-zinc-800 text-inherit shadow-xs font-semibold'
              : 'text-zinc-400 hover:text-inherit hover:bg-white/5'
          }`}
          style={currentSection === 'general' ? { borderBottom: `2px solid ${activeAccent.hex}` } : undefined}
        >
          <Icon name="Sliders" className="w-3.5 h-3.5" style={{ color: currentSection === 'general' ? activeAccent.hex : undefined }} />
          <span>Geral &amp; Teclado</span>
        </button>
      </div>

      {/* Form content */}
      <form onSubmit={handleSave} className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3 text-sm">
          {/* ======================================================== */}
          {/* SECTION: APARÊNCIA & HUD                                */}
          {/* ======================================================== */}
          {currentSection === 'appearance' && (
            <div className="space-y-3">
              {/* Theme Mode Selector (Dark, Light, System) */}
              <div className="hud-card p-3.5 rounded-xl border border-hud space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Icon name="Sun" className="w-4 h-4" style={{ color: activeAccent.hex }} />
                    <span>Modo de Cor (Tema)</span>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    Ativo:{' '}
                    <strong className="capitalize font-medium" style={{ color: activeAccent.hex }}>
                      {appearance.themeMode === 'system' ? 'Sistema (Auto)' : appearance.themeMode === 'dark' ? 'Escuro' : 'Claro'}
                    </strong>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Dark Mode */}
                  <button
                    type="button"
                    onClick={() => handleUpdateAppearance('themeMode', 'dark')}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all cursor-pointer text-center ${
                      appearance.themeMode === 'dark'
                        ? 'bg-zinc-900 text-white shadow-md'
                        : 'bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/70 border-white/5'
                    }`}
                    style={appearance.themeMode === 'dark' ? { borderColor: activeAccent.hex } : undefined}
                  >
                    <Icon name="Moon" className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-semibold">Escuro</span>
                    <span className="text-[10px] text-zinc-400">Oled &amp; Zinc imersivo</span>
                  </button>

                  {/* Light Mode */}
                  <button
                    type="button"
                    onClick={() => handleUpdateAppearance('themeMode', 'light')}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all cursor-pointer text-center ${
                      appearance.themeMode === 'light'
                        ? 'bg-zinc-100 text-zinc-900 shadow-md border-zinc-300'
                        : 'bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/70 border-white/5'
                    }`}
                    style={appearance.themeMode === 'light' ? { borderColor: activeAccent.hex } : undefined}
                  >
                    <Icon name="Sun" className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-semibold">Claro</span>
                    <span className="text-[10px] text-zinc-400">Contraste diurno</span>
                  </button>

                  {/* System Mode */}
                  <button
                    type="button"
                    onClick={() => handleUpdateAppearance('themeMode', 'system')}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all cursor-pointer text-center ${
                      appearance.themeMode === 'system'
                        ? 'bg-zinc-800 text-white shadow-md'
                        : 'bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/70 border-white/5'
                    }`}
                    style={appearance.themeMode === 'system' ? { borderColor: activeAccent.hex } : undefined}
                  >
                    <Icon name="Laptop" className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-semibold">Sistema</span>
                    <span className="text-[10px] text-zinc-400">Sincroniza com o SO</span>
                  </button>
                </div>
              </div>

              {/* Accent Color Palette */}
              <div className="hud-card p-3.5 rounded-xl border border-hud space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Icon name="Palette" className="w-4 h-4" style={{ color: activeAccent.hex }} />
                    <span>Cores de Destaque (Accent Palette)</span>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    Cor atual: <strong style={{ color: activeAccent.hex }}>{activeAccent.name}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {(Object.keys(ACCENT_COLORS) as AccentColor[]).map((colorKey) => {
                    const meta = ACCENT_COLORS[colorKey];
                    const isSelected = appearance.accentColor === colorKey;
                    return (
                      <button
                        key={colorKey}
                        type="button"
                        onClick={() => handleUpdateAppearance('accentColor', colorKey)}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white/10 dark:bg-white/10 shadow-xs'
                            : 'bg-black/5 dark:bg-black/20 hover:bg-white/5 border-transparent'
                        }`}
                        style={isSelected ? { borderColor: meta.hex } : undefined}
                        title={meta.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full shadow-sm transition-transform flex items-center justify-center text-white text-[10px]"
                          style={{
                            backgroundColor: meta.hex,
                            transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                            boxShadow: isSelected ? `0 0 10px ${meta.hex}` : undefined,
                          }}
                        >
                          {isSelected && <Icon name="Check" className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span className="text-[10px] font-medium truncate max-w-full">
                          {meta.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Glassmorphism & Translucency (Opacity & Blur) */}
              <div className="hud-card p-3.5 rounded-xl border border-hud space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Icon name="Layers" className="w-4 h-4" style={{ color: activeAccent.hex }} />
                  <span>Transparência &amp; Desfoque Acrílico (Glassmorphism)</span>
                </div>

                {/* Opacity Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium">Opacidade do HUD (Fundo)</label>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/20 dark:bg-zinc-950 border border-hud font-semibold" style={{ color: activeAccent.hex }}>
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
                    className="w-full h-1.5 bg-zinc-700/50 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    style={{ accentColor: activeAccent.hex }}
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>50% (Vidro Ultra-Translúcido)</span>
                    <span>75% (Acrílico Médio)</span>
                    <span>100% (Totalmente Opaco)</span>
                  </div>
                </div>

                {/* Blur Slider */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium">Desfoque Acrílico (Blur de Fundo)</label>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/20 dark:bg-zinc-950 border border-hud font-semibold" style={{ color: activeAccent.hex }}>
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
                    className="w-full h-1.5 bg-zinc-700/50 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    style={{ accentColor: activeAccent.hex }}
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>0px (Vidro Nítido sem Desfoque)</span>
                    <span>16px (Suave)</span>
                    <span>32px (Profundidade Acrílica Máxima)</span>
                  </div>
                </div>
              </div>

              {/* Typography / Font Family */}
              <div className="hud-card p-3.5 rounded-xl border border-hud space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Icon name="Type" className="w-4 h-4" style={{ color: activeAccent.hex }} />
                    <span>Família Tipográfica (Fontes)</span>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    Fonte ativa: <strong style={{ color: activeAccent.hex }}>{FONT_FAMILIES[appearance.fontFamily]?.name}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                            ? 'bg-white/10 dark:bg-white/10 shadow-xs'
                            : 'bg-black/5 dark:bg-black/20 hover:bg-white/5 border-transparent'
                        }`}
                        style={{
                          fontFamily: fMeta.css,
                          borderColor: isSelected ? activeAccent.hex : undefined,
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-semibold">{fMeta.name}</span>
                          {isSelected && <Icon name="Check" className="w-3.5 h-3.5" style={{ color: activeAccent.hex }} />}
                        </div>
                        <span className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                          {fMeta.description}
                        </span>
                        <span
                          className="mt-2 text-xs px-2 py-1 rounded bg-black/20 dark:bg-zinc-950 border border-hud w-full text-center"
                          style={{ fontFamily: fMeta.css }}
                        >
                          {fMeta.previewSample}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: PROVEDORES DE IA                                */}
          {/* ======================================================== */}
          {currentSection === 'providers' && (
            <div className="space-y-3">
              <div className="hud-card p-3.5 rounded-xl border border-hud space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Icon name="Cpu" className="w-4 h-4" style={{ color: activeAccent.hex }} />
                    <span>Roteadores e Provedores de IA</span>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    Ativo agora:{' '}
                    <strong className="font-medium" style={{ color: activeAccent.hex }}>
                      {PROVIDER_METADATA[settings.activeProviderId]?.name}
                    </strong>
                  </span>
                </div>

                {/* Provider Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/20 dark:bg-zinc-950/80 rounded-xl border border-hud">
                  {(['9router', 'omni', 'custom'] as AIProviderId[]).map((pid) => {
                    const meta = PROVIDER_METADATA[pid];
                    const isTabSelected = activeProviderTab === pid;
                    const isSystemActive = settings.activeProviderId === pid;
                    return (
                      <button
                        key={pid}
                        type="button"
                        onClick={() => setActiveProviderTab(pid)}
                        className={`flex items-center justify-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isTabSelected
                            ? 'bg-white/15 dark:bg-zinc-800 text-inherit shadow-xs font-semibold'
                            : 'text-zinc-400 hover:text-inherit hover:bg-white/5'
                        }`}
                      >
                        <span>{meta.name}</span>
                        {isSystemActive && (
                          <span
                            className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20"
                            title="Provedor ativo no momento"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Tab Configuration */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between pb-1 border-b border-hud text-xs">
                    <span className="text-zinc-400">{activeProviderMeta.description}</span>
                    {settings.activeProviderId !== activeProviderTab ? (
                      <button
                        type="button"
                        onClick={() => handleSetActiveProvider(activeProviderTab)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border shadow-xs"
                        style={{
                          backgroundColor: `rgba(${activeAccent.rgb}, 0.2)`,
                          borderColor: activeAccent.hex,
                          color: activeAccent.hex,
                        }}
                      >
                        Definir como Provedor Ativo
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1">
                        <Icon name="Check" className="w-3 h-3" />
                        Provedor Principal em Uso
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium">Endpoint Base ({activeProviderMeta.name})</label>
                    <input
                      type="text"
                      value={activeTabConfig.endpoint}
                      onChange={(e) => handleUpdateProviderConfig(activeProviderTab, 'endpoint', e.target.value)}
                      placeholder={activeProviderMeta.defaultEndpoint}
                      className="hud-input w-full px-3 py-1.5 rounded-lg border font-mono text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium">API Key ({activeProviderMeta.name})</label>
                    <div className="relative">
                      <input
                        type={showApiKey[activeProviderTab] ? 'text' : 'password'}
                        value={activeTabConfig.apiKey}
                        onChange={(e) => handleUpdateProviderConfig(activeProviderTab, 'apiKey', e.target.value)}
                        placeholder="Chave de API / Token (deixe em branco se for gateway local sem autenticação)"
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
                    <label className="text-xs font-medium">Modelo Padrão ({activeProviderMeta.name})</label>
                    <input
                      type="text"
                      value={activeTabConfig.model}
                      onChange={(e) => handleUpdateProviderConfig(activeProviderTab, 'model', e.target.value)}
                      placeholder="Nome do modelo ou combo"
                      className="hud-input w-full px-3 py-1.5 rounded-lg border font-mono text-xs focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[11px] text-zinc-400 self-center mr-1">Sugeridos:</span>
                      {activeProviderMeta.quickModels.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleUpdateProviderConfig(activeProviderTab, 'model', m.id)}
                          className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                            activeTabConfig.model === m.id
                              ? 'font-medium shadow-xs'
                              : 'bg-black/10 dark:bg-zinc-800/80 hover:bg-white/10 text-zinc-400 hover:text-inherit border-transparent'
                          }`}
                          style={
                            activeTabConfig.model === m.id
                              ? {
                                  backgroundColor: `rgba(${activeAccent.rgb}, 0.25)`,
                                  borderColor: activeAccent.hex,
                                  color: activeAccent.hex,
                                }
                              : undefined
                          }
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION: GERAL & TECLADO                                */}
          {/* ======================================================== */}
          {currentSection === 'general' && (
            <div className="space-y-3">
              {/* Keyboard & Window Manager Preferences */}
              <div className="hud-card p-3 rounded-xl border border-hud space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Icon name="Terminal" className="w-4 h-4" style={{ color: activeAccent.hex }} />
                  <span>Navegação por Teclado (Zero-Mouse / Window Manager)</span>
                </div>

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
                  <span className="text-[11px] text-zinc-400 block">
                    Permite descer e subir em listas sem tirar a mão da linha inicial (home row).
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-hud">
                  <div>
                    <span className="font-medium block text-xs">Atalhos Mnemônicos Rápidos</span>
                    <span className="text-xs text-zinc-400">
                      Habilita teclas diretas em telas sem input de texto (ex: &apos;e&apos; editar, &apos;m&apos; markdown, &apos;d&apos; deletar no histórico)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enableVimMnemonicShortcuts}
                    onChange={(e) =>
                      setSettings({ ...settings, enableVimMnemonicShortcuts: e.target.checked })
                    }
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: activeAccent.hex }}
                  />
                </div>
              </div>

              {/* Vision & Image Analysis Settings */}
              <div className="hud-card p-3 rounded-xl border border-hud space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Icon name="Eye" className="w-4 h-4" style={{ color: activeAccent.hex }} />
                  <span>Instruções de Análise de Imagem (Visão de Extremo Detalhe)</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Prompt de Sistema Personalizado (/analisar)</label>
                  <textarea
                    value={settings.customVisionPrompt || ''}
                    onChange={(e) => setSettings({ ...settings, customVisionPrompt: e.target.value })}
                    placeholder="Deixe em branco para usar o prompt padrão de extrema inspeção 360° com OCR e cores..."
                    rows={2}
                    className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none resize-y leading-relaxed font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Prompt de Sistema para UI &amp; Frontend (/analisar-ui)</label>
                  <textarea
                    value={settings.customUiPrompt || ''}
                    onChange={(e) => setSettings({ ...settings, customUiPrompt: e.target.value })}
                    placeholder="Deixe em branco para usar o prompt padrão de engenharia reversa de UI, Tailwind e acessibilidade..."
                    rows={2}
                    className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none resize-y leading-relaxed font-sans"
                  />
                </div>
              </div>

              {/* Profile & General Behavior */}
              <div className="hud-card p-3 rounded-xl border border-hud space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Icon name="Sliders" className="w-4 h-4" style={{ color: activeAccent.hex }} />
                  <span>Geral &amp; Perfis</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Perfil Padrão Inicial</label>
                    <select
                      value={settings.defaultProfile}
                      onChange={(e) => setSettings({ ...settings, defaultProfile: e.target.value })}
                      className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none"
                    >
                      {PROFILES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium">Atalho Global</label>
                    <input
                      type="text"
                      value={settings.globalShortcut}
                      onChange={(e) => setSettings({ ...settings, globalShortcut: e.target.value })}
                      placeholder="Super+Space"
                      className="hud-input w-full px-3 py-1.5 rounded-lg border font-mono text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-hud">
                  <div>
                    <span className="font-medium block text-xs">Leitura Automática da Área de Transferência</span>
                    <span className="text-xs text-zinc-400">
                      Lê o clipboard ao abrir a paleta para execução com 1 toque
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoReadClipboard}
                    onChange={(e) => setSettings({ ...settings, autoReadClipboard: e.target.checked })}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: activeAccent.hex }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2.5 border-t border-hud shrink-0">
          <span className="text-xs text-zinc-400">
            Dica: pressione <kbd className="font-mono bg-black/20 dark:bg-zinc-900 border border-hud px-1 py-0.5 rounded">Ctrl+S</kbd> para salvar
          </span>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium text-sm shadow-md active:scale-95 transition-all cursor-pointer"
            style={{
              backgroundColor: activeAccent.hex,
              boxShadow: `0 4px 14px rgba(${activeAccent.rgb}, 0.4)`,
            }}
          >
            <Icon name="Check" className="w-4 h-4" />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </form>
    </div>
  );
};
