import React, { useEffect, useRef } from 'react';
import { PaletteItem } from '@/lib/prompt-composer/autocomplete';
import { Icon } from '@/components/Icon';

interface ActionListProps {
  items: PaletteItem[];
  selectedIndex: number;
  onSelectItem: (item: PaletteItem) => void;
  onHoverIndex: (index: number) => void;
  clipboardPreview?: string;
  clipboardImagePreview?: string | null;
}

export const ActionList: React.FC<ActionListProps> = ({
  items,
  selectedIndex,
  onSelectItem,
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

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-base">
        <Icon name="Search" className="w-9 h-9 mb-2 opacity-50 text-slate-400" />
        <p className="font-medium text-slate-200">Nenhum comando ou agente encontrado.</p>
        <span className="text-sm text-slate-400 mt-1">
          Digite <code className="text-zinc-200 font-mono">/</code> para ações ou <code className="text-zinc-200 font-mono">@</code> para agentes
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {clipboardImagePreview && (
        <div className="mx-4 mt-2 mb-1 py-1.5 border-b border-white/[0.08] flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={clipboardImagePreview}
              alt="Screenshot do Clipboard"
              className="w-7 h-7 rounded object-cover border border-white/10 shrink-0 bg-black/30"
            />
            <div className="flex flex-col truncate">
              <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--accent-text, var(--accent-color))' }}>
                <Icon name="ImageIcon" className="w-3.5 h-3.5" />
                Imagem detectada na área de transferência
              </span>
              <span className="text-slate-300 text-[11px] truncate">
                Pronta para /analisar ou /analisar-ui (Pressione Alt+9 ou Alt+0)
              </span>
            </div>
          </div>
          <span
            className="text-[11px] font-mono px-1.5 py-0.5 rounded font-medium"
            style={{
              backgroundColor: 'rgba(var(--accent-rgb), 0.18)',
              color: 'var(--accent-text, var(--accent-color))',
            }}
          >
            Print pronto
          </span>
        </div>
      )}

      {clipboardPreview && !clipboardImagePreview && (
        <div className="mx-4 mt-2 mb-1 py-1.5 border-b border-white/[0.08] flex items-center gap-2.5 text-xs shrink-0 text-slate-300">
          <Icon name="Clipboard" className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-text, var(--accent-color))' }} />
          <div className="flex-1 truncate leading-normal">
            <span className="text-slate-400 mr-2 font-medium">Entrada detectada:</span>
            <span className="italic text-slate-200">&ldquo;{clipboardPreview.slice(0, 120)}{clipboardPreview.length > 120 ? '...' : ''}&rdquo;</span>
          </div>
        </div>
      )}

      <div
        id="command-action-list"
        role="listbox"
        aria-label="Ações e agentes sugeridos"
        ref={listRef}
        className="flex-1 min-h-0 overflow-y-auto px-2 py-1 space-y-0.5"
      >
        {items.map((item, idx) => {
          const isSelected = idx === selectedIndex;
          const isAgent = item.type === 'agent';

          return (
            <div
              key={item.id}
              id={`palette-item-${item.id}`}
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelectItem(item)}
              onMouseEnter={() => onHoverIndex(idx)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-100 group ${
                isSelected
                  ? 'bg-white/[0.08] text-white'
                  : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'text-[var(--accent-text,var(--accent-color))]'
                        : isAgent
                        ? 'text-sky-400 group-hover:text-sky-300'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    <Icon name={item.icon} className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-[13px] font-medium tracking-tight flex items-center gap-2">
                      <span>{item.title}</span>
                      {item.token && (
                        <span
                          className="text-[11px] font-mono font-medium px-1.5 py-0.2 rounded"
                          style={
                            isAgent
                              ? {
                                  backgroundColor: 'rgba(56, 189, 248, 0.16)',
                                  color: '#38bdf8',
                                  border: '1px solid rgba(56, 189, 248, 0.3)',
                                }
                              : {
                                  backgroundColor: 'rgba(var(--accent-rgb), 0.14)',
                                  color: 'var(--accent-text, var(--accent-color))',
                                }
                          }
                        >
                        {item.token}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-300 truncate group-hover:text-slate-200 transition-colors mt-0.5">
                    {item.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pl-3">
                {item.shortcutHint && (
                  <kbd
                    className={`text-[11px] px-1.5 py-0.5 rounded font-mono font-medium transition-colors ${
                      isSelected
                        ? 'bg-[#242730] text-[var(--accent-text,var(--accent-color))] border border-white/20'
                        : 'bg-[#1c1e24] text-slate-200 border border-white/10'
                    }`}
                  >
                    {item.shortcutHint}
                  </kbd>
                )}
                <kbd
                  className={`text-[11px] px-1.5 py-0.5 rounded font-mono font-medium transition-colors ${
                    isSelected
                      ? 'bg-[#242730] text-white border border-white/20'
                      : 'bg-[#1c1e24] text-slate-200 border border-white/10'
                  }`}
                  title={isAgent ? 'Tab para autocompletar' : 'Enter para executar'}
                >
                  {isAgent ? 'Tab' : '↵'}
                </kbd>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
