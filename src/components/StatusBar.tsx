import React from 'react';
import { AIProviderId } from '@/types';
import { Icon } from './Icon';
import { UpdateCheckResult } from '@/lib/updater';

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
    <div className="flex items-center justify-between px-4 py-2 border-t border-hud text-xs select-none shrink-0">
      <div className="flex items-center gap-2 shrink-0">
        {/* Raycast Context Badge or Quick Hints */}
        {contextBadge ? (
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md font-medium text-xs shrink-0"
            style={
              contextBadge.type === 'agent'
                ? {
                    backgroundColor: 'rgba(56, 189, 248, 0.16)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                  }
                : {
                    backgroundColor: 'rgba(var(--accent-rgb), 0.16)',
                    color: 'var(--accent-text, var(--accent-color))',
                    border: '1px solid rgba(var(--accent-rgb), 0.3)',
                  }
            }
          >
            <Icon name={contextBadge.icon} className="w-3.5 h-3.5" />
            <span>{contextBadge.label}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400 text-[11px] shrink-0">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 bg-[#1c1e24] border border-white/15 rounded text-slate-300 font-mono text-[10px]">
                /
              </kbd>
              <span>Ações</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 bg-[#1c1e24] border border-white/15 rounded text-slate-300 font-mono text-[10px]">
                @
              </kbd>
              <span>Agentes</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.2 bg-[#1c1e24] border border-white/15 rounded text-slate-300 font-mono text-[10px]">
                Tab
              </kbd>
              <span>Completar</span>
            </span>
          </div>
        )}

        {onCycleProvider && (
          <button
            onClick={onCycleProvider}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/[0.08] text-inherit transition-colors cursor-pointer font-mono text-[11px] shrink-0 ml-1"
            title="Alternar Provedor de IA (Clique ou /provider)"
          >
            <Icon name={currentProviderInfo.icon} className="w-3 h-3 shrink-0" style={{ color: 'var(--accent-text, var(--accent-color))' }} />
            <span className="font-semibold shrink-0">{currentProviderInfo.label}:</span>
            <span className="text-slate-300 shrink-0" title={model}>
              {model}
            </span>
          </button>
        )}

        {!onCycleProvider && (
          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs shrink-0">
            <Icon name="Cpu" className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span title={model}>{model}</span>
          </div>
        )}

        {hasClipboardText && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs shrink-0 font-medium">
            <Icon name="Clipboard" className="w-3.5 h-3.5 text-emerald-400" />
            <span>Área de transferência</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {availableUpdate?.available && onOpenUpdateModal && (
          <button
            onClick={onOpenUpdateModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all hover:brightness-110 animate-pulse border shadow-xs"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.18)',
              color: '#34d399',
              borderColor: 'rgba(16, 185, 129, 0.45)',
            }}
            title={`Nova versão v${availableUpdate.version} disponível! Clique para atualizar.`}
          >
            <Icon name="Sparkles" className="w-3.5 h-3.5 text-emerald-400" />
            <span>Update v{availableUpdate.version}</span>
          </button>
        )}

        <button
          onClick={onOpenHistory}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
          title="Abrir Histórico (Ctrl+H)"
        >
          <Icon name="History" className="w-3.5 h-3.5 text-slate-400" />
          <span>Histórico</span>
          <kbd className="text-[11px] bg-[#1c1e24] border border-white/15 px-1.5 py-0.5 rounded font-mono font-medium text-slate-200">Ctrl+H</kbd>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
          title="Configurações (Ctrl+,)"
        >
          <Icon name="Settings" className="w-3.5 h-3.5 text-slate-400" />
          <span>Configurações</span>
          <kbd className="text-[11px] bg-[#1c1e24] border border-white/15 px-1.5 py-0.5 rounded font-mono font-medium text-slate-200">Ctrl+,</kbd>
        </button>

        {onOpenCheatsheet && (
          <button
            onClick={onOpenCheatsheet}
            className="flex items-center gap-1 px-1.5 py-1 rounded-md hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
            title="Mapa de Atalhos (?)"
          >
            <Icon name="HelpCircle" className="w-3.5 h-3.5 text-slate-400" />
            <kbd className="text-[11px] bg-[#1c1e24] border border-white/15 px-1.5 py-0.5 rounded font-mono font-medium text-slate-200">?</kbd>
          </button>
        )}
      </div>
    </div>
  );
};
