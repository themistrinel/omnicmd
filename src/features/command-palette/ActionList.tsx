import React, { useEffect, useRef } from 'react';
import { PaletteItem } from '@/lib/prompt-composer/autocomplete';
import { Icon } from '@/components/Icon';
import { Language } from '@/types';
import { getTranslation } from '@/lib/i18n';

interface ActionListProps {
  items: PaletteItem[];
  selectedIndex: number;
  onSelectItem: (item: PaletteItem) => void;
  onHoverIndex: (index: number) => void;
  clipboardPreview?: string;
  clipboardImagePreview?: string | null;
  language?: Language;
  searchQuery?: string;
}

export const ActionList: React.FC<ActionListProps> = ({
  items,
  selectedIndex,
  onSelectItem,
  onHoverIndex,
  clipboardPreview,
  clipboardImagePreview,
  language = 'pt-BR',
  searchQuery,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const t = getTranslation(language);

  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      }
    }
  }, [selectedIndex]);

  if (items.length === 0) {
    const trimmed = searchQuery?.trim() || '';
    const isFreeText = trimmed.length > 0 && !trimmed.startsWith('/') && !trimmed.startsWith('@');

    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400 text-base select-none px-6 text-center">
        {isFreeText ? (
          <>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border shadow-xs"
              style={{
                backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
                borderColor: 'rgba(var(--accent-rgb), 0.3)',
                color: 'var(--accent-color)',
              }}
            >
              <Icon name="Sparkles" className="w-6 h-6" />
            </div>
            <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              Pergunta em texto livre detectada
            </p>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm leading-relaxed">
              Pressione <kbd className="px-1.5 py-0.5 rounded font-mono font-semibold bg-black/10 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-hud">↵ Enter</kbd> para enviar diretamente ao Assistente Geral de IA.
            </span>
          </>
        ) : (
          <>
            <Icon name="Search" className="w-9 h-9 mb-2 opacity-50 text-slate-400" />
            <p className="font-semibold text-slate-800 dark:text-slate-200">{t.noResultsTitle}</p>
            <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.noResultsSubtitle}
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {clipboardImagePreview && (
        <div className="mx-4 mt-2 mb-1 py-1.5 border-b border-hud flex items-center justify-between text-xs shrink-0 select-none">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={clipboardImagePreview}
              alt="Screenshot do Clipboard"
              className="w-7 h-7 rounded object-cover border border-slate-300 dark:border-white/10 shrink-0 bg-black/10 dark:bg-black/30"
            />
            <div className="flex flex-col truncate">
              <span className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--accent-text, var(--accent-color))' }}>
                <Icon name="ImageIcon" className="w-3.5 h-3.5" />
                {t.imageDetectedTitle}
              </span>
              <span className="text-slate-600 dark:text-slate-300 text-[11px] truncate">
                {t.imageDetectedSubtitle}
              </span>
            </div>
          </div>
          <span
            className="text-[11px] font-mono px-1.5 py-0.5 rounded font-medium shrink-0 ml-2"
            style={{
              backgroundColor: 'rgba(var(--accent-rgb), 0.16)',
              color: 'var(--accent-text, var(--accent-color))',
            }}
          >
            {t.imageReadyBadge}
          </span>
        </div>
      )}

      {clipboardPreview && !clipboardImagePreview && (
        <div className="mx-4 mt-2 mb-1 py-1.5 border-b border-hud flex items-center gap-2.5 text-xs shrink-0 select-none">
          <Icon name="Clipboard" className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-text, var(--accent-color))' }} />
          <div className="flex-1 truncate leading-normal">
            <span className="text-slate-500 dark:text-slate-400 mr-2 font-medium">{t.inputDetected}</span>
            <span className="italic text-slate-800 dark:text-slate-200 font-mono text-[11px]">
              &ldquo;{clipboardPreview.slice(0, 120)}{clipboardPreview.length > 120 ? '...' : ''}&rdquo;
            </span>
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
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-100 group border ${
                isSelected
                  ? 'bg-sky-500/10 dark:bg-white/[0.08] text-slate-900 dark:text-white border-sky-500/30 dark:border-white/10 shadow-2xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-slate-950 dark:hover:text-white border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-5 h-5 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'text-[var(--accent-text,var(--accent-color))]'
                      : isAgent
                      ? 'text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300'
                      : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                  }`}
                >
                  <Icon name={item.icon} className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-[13px] font-semibold tracking-tight flex items-center gap-2">
                    <span className={isSelected ? 'text-slate-950 dark:text-white' : 'text-slate-900 dark:text-slate-100'}>
                      {item.title}
                    </span>
                    {item.token && (
                      <span
                        className="text-[11px] font-mono font-semibold px-1.5 py-0.2 rounded"
                        style={
                          isAgent
                            ? {
                                backgroundColor: 'rgba(56, 189, 248, 0.16)',
                                color: 'var(--accent-text, #0284c7)',
                                border: '1px solid rgba(56, 189, 248, 0.35)',
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
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors mt-0.5">
                    {item.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pl-3">
                {item.shortcutHint && (
                  <kbd
                    className={`text-[11px] px-1.5 py-0.5 rounded font-mono font-semibold transition-colors ${
                      isSelected
                        ? 'bg-sky-500/15 dark:bg-[#242730] text-sky-700 dark:text-[var(--accent-text,var(--accent-color))] border border-sky-500/30 dark:border-white/20'
                        : 'bg-white dark:bg-[#1c1e24] text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-white/10 shadow-2xs'
                    }`}
                  >
                    {item.shortcutHint}
                  </kbd>
                )}
                <kbd
                  className={`text-[11px] px-1.5 py-0.5 rounded font-mono font-semibold transition-colors ${
                    isSelected
                      ? 'bg-sky-500/15 dark:bg-[#242730] text-sky-800 dark:text-white border border-sky-500/30 dark:border-white/20'
                      : 'bg-white dark:bg-[#1c1e24] text-slate-700 dark:text-slate-200 border border-slate-300/80 dark:border-white/10 shadow-2xs'
                  }`}
                  title={isAgent ? t.autocompleteHint : t.executeHint}
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
