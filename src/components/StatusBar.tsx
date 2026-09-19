import React from 'react';
import { Profile, AIProviderId } from '@/types';
import { Icon } from './Icon';

interface StatusBarProps {
  activeProfile: Profile;
  onToggleProfile: () => void;
  activeProviderId?: AIProviderId;
  onCycleProvider?: () => void;
  model: string;
  hasClipboardText: boolean;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenCheatsheet?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeProfile,
  onToggleProfile,
  activeProviderId = '9router',
  onCycleProvider,
  model,
  hasClipboardText,
  onOpenHistory,
  onOpenSettings,
  onOpenCheatsheet,
}) => {
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
    <div className="flex items-center justify-between px-4 py-2.5 border-t border-hud hud-status text-xs select-none shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleProfile}
          className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-zinc-900 hover:bg-black/10 dark:hover:bg-zinc-800 text-inherit transition-colors border border-hud cursor-pointer"
          title="Alternar Perfil (Tab)"
        >
          <Icon name={activeProfile.icon} className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
          <span className="font-medium text-xs">{activeProfile.name}</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-black/10 dark:bg-zinc-800 font-mono rounded border border-hud">Tab</span>
        </button>

        {onCycleProvider && (
          <button
            onClick={onCycleProvider}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/5 dark:bg-zinc-900/80 hover:bg-black/10 dark:hover:bg-zinc-800 text-inherit transition-colors border border-hud cursor-pointer font-mono text-[11px]"
            title="Alternar Provedor de IA (Clique ou /provider)"
          >
            <Icon name={currentProviderInfo.icon} className="w-3 h-3" style={{ color: 'var(--accent-color)' }} />
            <span className="font-semibold">{currentProviderInfo.label}:</span>
            <span className="truncate max-w-[120px] text-zinc-400" title={model}>
              {model}
            </span>
          </button>
        )}

        {!onCycleProvider && (
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs">
            <Icon name="Cpu" className="w-3.5 h-3.5 text-zinc-400" />
            <span className="truncate max-w-[140px]" title={model}>{model}</span>
          </div>
        )}

        {hasClipboardText && (
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-300 text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
            <Icon name="Clipboard" className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Área de transferência</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3.5">
        <button
          onClick={onOpenHistory}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-inherit transition-colors cursor-pointer text-xs"
          title="Abrir Histórico (Ctrl+H)"
        >
          <Icon name="History" className="w-3.5 h-3.5" />
          <span>Histórico</span>
          <kbd className="text-[10px] bg-black/10 dark:bg-zinc-900 border border-hud px-1.5 py-0.5 rounded font-mono">Ctrl+H</kbd>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-inherit transition-colors cursor-pointer text-xs"
          title="Configurações (Ctrl+,)"
        >
          <Icon name="Settings" className="w-3.5 h-3.5" />
          <span>Configurações</span>
          <kbd className="text-[10px] bg-black/10 dark:bg-zinc-900 border border-hud px-1.5 py-0.5 rounded font-mono">Ctrl+,</kbd>
        </button>

        {onOpenCheatsheet && (
          <button
            onClick={onOpenCheatsheet}
            className="flex items-center gap-1 text-zinc-400 hover:text-inherit transition-colors cursor-pointer text-xs"
            title="Mapa de Atalhos (?)"
          >
            <Icon name="HelpCircle" className="w-3.5 h-3.5" />
            <kbd className="text-[10px] bg-black/10 dark:bg-zinc-900 border border-hud px-1.5 py-0.5 rounded font-mono">?</kbd>
          </button>
        )}

        <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
          <span>Sair</span>
          <kbd className="text-[10px] bg-black/10 dark:bg-zinc-900 border border-hud px-1.5 py-0.5 rounded font-mono">Esc</kbd>
        </div>
      </div>
    </div>
  );
};
