import React, { useEffect, useRef } from 'react';
import { PromptAction } from '@/types';
import { Icon } from '@/components/Icon';

interface ActionListProps {
  actions: PromptAction[];
  selectedIndex: number;
  onSelectAction: (action: PromptAction) => void;
  onHoverIndex: (index: number) => void;
  clipboardPreview?: string;
  clipboardImagePreview?: string | null;
}

export const ActionList: React.FC<ActionListProps> = ({
  actions,
  selectedIndex,
  onSelectAction,
  onHoverIndex,
  clipboardPreview,
  clipboardImagePreview,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      }
    }
  }, [selectedIndex]);

  if (actions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-zinc-400 text-base">
        <Icon name="Search" className="w-9 h-9 mb-2 opacity-50 text-zinc-400" />
        <p className="font-medium text-zinc-300">Nenhuma ação encontrada para esta busca.</p>
        <span className="text-sm text-zinc-400 mt-1">Tente pesquisar por &quot;prompt&quot;, &quot;traduzir&quot; ou &quot;resumir&quot;</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {clipboardImagePreview && (
        <div
          className="mx-3 mt-2 mb-1 p-2 rounded-xl border flex items-center justify-between text-xs shrink-0"
          style={{
            backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
            borderColor: 'rgba(var(--accent-rgb), 0.35)',
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={clipboardImagePreview}
              alt="Screenshot do Clipboard"
              className="w-9 h-9 rounded-lg object-cover border border-hud shrink-0 bg-black/20 shadow-xs"
            />
            <div className="flex flex-col truncate">
              <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--accent-color)' }}>
                <Icon name="ImageIcon" className="w-3.5 h-3.5" />
                Imagem detectada na área de transferência
              </span>
              <span className="text-zinc-400 text-[11px] truncate">
                Pronta para /analisar ou /analisar-ui (Pressione Alt+9 ou Alt+0)
              </span>
            </div>
          </div>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded border"
            style={{
              backgroundColor: 'rgba(var(--accent-rgb), 0.2)',
              borderColor: 'rgba(var(--accent-rgb), 0.4)',
              color: 'var(--accent-color)',
            }}
          >
            Print pronto
          </span>
        </div>
      )}

      {clipboardPreview && !clipboardImagePreview && (
        <div className="mx-3 mt-2.5 mb-1.5 p-2.5 rounded-xl hud-card border border-hud flex items-start gap-2.5 text-xs shrink-0">
          <Icon name="Clipboard" className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
          <div className="flex-1 truncate leading-normal">
            <span className="text-zinc-400 mr-2 font-medium">Entrada detectada:</span>
            <span className="italic">&ldquo;{clipboardPreview.slice(0, 120)}{clipboardPreview.length > 120 ? '...' : ''}&rdquo;</span>
          </div>
        </div>
      )}

      <div
        id="command-action-list"
        role="listbox"
        aria-label="Ações de prompt sugeridas"
        ref={listRef}
        className="flex-1 min-h-0 overflow-y-auto px-2.5 py-1.5 space-y-1"
      >
        {actions.map((action, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <div
              key={action.id}
              id={`action-item-${action.id}`}
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelectAction(action)}
              onMouseEnter={() => onHoverIndex(idx)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group ${
                isSelected
                  ? 'bg-black/10 dark:bg-zinc-800 text-inherit shadow-xs border border-hud'
                  : 'text-inherit hover:bg-black/5 dark:hover:bg-zinc-900/70 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'border shadow-xs'
                      : 'bg-black/5 dark:bg-zinc-900 text-zinc-400 group-hover:text-inherit border border-hud'
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: 'rgba(var(--accent-rgb), 0.2)',
                          borderColor: 'var(--accent-color)',
                          color: 'var(--accent-color)',
                        }
                      : undefined
                  }
                >
                  <Icon name={action.icon} className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-semibold tracking-normal flex items-center gap-2">
                    <span>{action.title}</span>
                    {action.command && (
                      <span
                        className="text-[11px] font-mono font-normal px-1.5 py-0.5 rounded border"
                        style={{
                          backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
                          borderColor: 'rgba(var(--accent-rgb), 0.25)',
                          color: 'var(--accent-color)',
                        }}
                      >
                        {action.command}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-zinc-400 truncate group-hover:text-zinc-300 transition-colors mt-0.5">
                    {action.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pl-3">
                {action.shortcutHint && (
                  <kbd
                    className={`text-xs px-2 py-0.5 rounded-md font-mono transition-colors ${
                      isSelected
                        ? 'bg-black/15 dark:bg-zinc-900 border border-hud shadow-xs'
                        : 'bg-black/5 dark:bg-zinc-900/60 text-zinc-400 border border-hud'
                    }`}
                    style={isSelected ? { color: 'var(--accent-color)' } : undefined}
                  >
                    {action.shortcutHint}
                  </kbd>
                )}
                <kbd
                  className={`text-xs px-1.5 py-0.5 rounded-md font-mono transition-colors ${
                    isSelected
                      ? 'bg-black/15 dark:bg-zinc-900 text-inherit border border-hud shadow-xs'
                      : 'bg-black/5 dark:bg-zinc-900/60 text-zinc-500 border border-hud'
                  }`}
                  title="Pressione Enter para selecionar"
                >
                  ↵
                </kbd>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
