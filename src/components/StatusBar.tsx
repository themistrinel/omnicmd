import React from 'react';
import { AIProviderId, Language } from '@/types';
import { Icon } from './Icon';
import { UpdateCheckResult } from '@/lib/updater';
import { getTranslation } from '@/lib/i18n';

interface ContextBadge {
  type: 'action' | 'agent';
  label: string;
  icon: string;
}

interface StatusBarProps {
  contextBadge?: ContextBadge | null;
  activeProviderId?: AIProviderId;
  onCycleProvider?: () => void;
  model: string;
  hasClipboardText: boolean;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenCheatsheet?: () => void;
  availableUpdate?: UpdateCheckResult | null;
  onOpenUpdateModal?: () => void;
  language?: Language;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  contextBadge,
  activeProviderId = '9router',
  onCycleProvider,
  model,
  hasClipboardText,
  onOpenHistory,
  onOpenSettings,
  onOpenCheatsheet,
  availableUpdate,
  onOpenUpdateModal,
  language = 'pt-BR',
}) => {
  const t = getTranslation(language);

  const providerLabels: Record<AIProviderId, { label: string; icon: string }> = {
    '9router': { label: '9router', icon: 'Zap' },
    omni: { label: 'Omni', icon: 'Globe' },
    custom: { label: 'Custom', icon: 'Sliders' },
  };

  const currentProviderInfo = providerLabels[activeProviderId] || {
    label: activeProviderId,
    icon: 'Cpu',
  };

  return (
    <div className="w-full flex items-center justify-between px-3 py-1.5 border-t border-hud text-xs select-none shrink-0 bg-transparent overflow-hidden">
      {/* Left side: Context badge or command hints & provider */}
      <div className="flex items-center gap-2 min-w-0 overflow-hidden">
        {contextBadge ? (
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md font-semibold text-xs shrink-0"
            style={
              contextBadge.type === 'agent'
                ? {
                    backgroundColor: 'rgba(56, 189, 248, 0.16)',
                    color: '#0284c7',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                  }
                : {
                    backgroundColor: 'rgba(var(--accent-rgb), 0.16)',
                    color: 'var(--accent-text, var(--accent-color))',
                    border: '1px solid rgba(var(--accent-rgb), 0.3)',
                  }
            }
          >
            <Icon name={contextBadge.icon} className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{contextBadge.label}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] shrink-0 font-medium">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 bg-white dark:bg-[#1c1e24] border border-slate-300 dark:border-white/15 rounded text-slate-700 dark:text-slate-300 font-mono text-[10px] shadow-2xs font-semibold">
                /
              </kbd>
              <span>{t.actions}</span>
            </span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 bg-white dark:bg-[#1c1e24] border border-slate-300 dark:border-white/15 rounded text-slate-700 dark:text-slate-300 font-mono text-[10px] shadow-2xs font-semibold">
                @
              </kbd>
              <span>{t.agents}</span>
            </span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 bg-white dark:bg-[#1c1e24] border border-slate-300 dark:border-white/15 rounded text-slate-700 dark:text-slate-300 font-mono text-[10px] shadow-2xs font-semibold">
                Tab
              </kbd>
              <span>Tab</span>
            </span>
          </div>
        )}

        {onCycleProvider && (
          <button
            onClick={onCycleProvider}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 transition-colors cursor-pointer font-mono text-[11px] shrink-0 max-w-[200px]"
            title="Alternar Provedor de IA (Clique ou /provider)"
          >
            <Icon name={currentProviderInfo.icon} className="w-3 h-3 shrink-0" style={{ color: 'var(--accent-text, var(--accent-color))' }} />
            <span className="font-semibold shrink-0 text-slate-900 dark:text-slate-100">{currentProviderInfo.label}:</span>
            <span className="text-slate-600 dark:text-slate-300 truncate font-medium" title={model}>
              {model}
            </span>
          </button>
        )}

        {!onCycleProvider && (
          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-mono text-xs shrink-0 font-medium">
            <Icon name="Cpu" className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate max-w-[120px]" title={model}>{model}</span>
          </div>
        )}
      </div>

      {/* Right side: Action navigation buttons */}
      <div className="flex items-center gap-1.5 shrink-0 pl-2">
        {availableUpdate?.available && onOpenUpdateModal && (
          <button
            onClick={onOpenUpdateModal}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold cursor-pointer transition-all hover:brightness-110 animate-pulse border shadow-xs"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.18)',
              color: '#059669',
              borderColor: 'rgba(16, 185, 129, 0.45)',
            }}
            title={`Nova versão v${availableUpdate.version} disponível!`}
          >
            <Icon name="Sparkles" className="w-3 h-3 text-emerald-500" />
            <span>v{availableUpdate.version}</span>
          </button>
        )}

        <button
          onClick={onOpenHistory}
          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer text-xs font-medium"
          title={`${t.history} (Ctrl+H)`}
        >
          <Icon name="History" className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
          <span>{t.history}</span>
          <kbd className="text-[10px] bg-white dark:bg-[#1c1e24] border border-slate-300 dark:border-white/15 px-1 py-0.2 rounded font-mono font-semibold text-slate-700 dark:text-slate-200 shadow-2xs">Ctrl+H</kbd>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer text-xs font-medium"
          title={`${t.settings} (Ctrl+,)`}
        >
          <Icon name="Settings" className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
          <span>{t.settings}</span>
          <kbd className="text-[10px] bg-white dark:bg-[#1c1e24] border border-slate-300 dark:border-white/15 px-1 py-0.2 rounded font-mono font-semibold text-slate-700 dark:text-slate-200 shadow-2xs">Ctrl+,</kbd>
        </button>

        {onOpenCheatsheet && (
          <button
            onClick={onOpenCheatsheet}
            className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer text-xs font-medium"
            title={`${t.cheatsheet} (?)`}
          >
            <Icon name="HelpCircle" className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <kbd className="text-[10px] bg-white dark:bg-[#1c1e24] border border-slate-300 dark:border-white/15 px-1 py-0.2 rounded font-mono font-semibold text-slate-700 dark:text-slate-200 shadow-2xs">?</kbd>
          </button>
        )}
      </div>
    </div>
  );
};
