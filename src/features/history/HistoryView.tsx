import React, { useState, useEffect, useRef } from 'react';
import { HistoryEntry, AppSettings } from '@/types';
import { StorageService, DEFAULT_SETTINGS } from '@/lib/storage';
import { ClipboardService } from '@/lib/clipboard';
import { Icon } from '@/components/Icon';

interface HistoryViewProps {
  onBack: () => void;
  onReuseText: (text: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onBack, onReuseText }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const loadHistory = async (query?: string) => {
    setIsLoading(true);
    const data = await StorageService.getHistory(50, query);
    setHistory(data);
    setIsLoading(false);
    setSelectedIndex(0);
  };

  useEffect(() => {
    StorageService.getSettings().then(setSettings);
  }, []);

  useEffect(() => {
    loadHistory(searchQuery);
  }, [searchQuery]);

  const handleCopy = async (item: HistoryEntry) => {
    await ClipboardService.write(item.output_text);
    if (item.id) {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDeleteItem = async (id?: number) => {
    if (!id) return;
    await StorageService.deleteHistory(id);
    await loadHistory(searchQuery);
  };

  const handleDelete = async (e: React.MouseEvent, id?: number) => {
    e.stopPropagation();
    await handleDeleteItem(id);
  };

  const handleClearAll = async () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
      await StorageService.clearHistory();
      await loadHistory();
    }
  };

  const selectedItem = history[selectedIndex];

  // Full keyboard navigation in HistoryView
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

      const mode = settings.keyboardNavMode;
      const enableVim = settings.enableVimMnemonicShortcuts;

      // Down navigation
      const isDown =
        e.key === 'ArrowDown' ||
        (mode !== 'standard' && e.ctrlKey && (e.key.toLowerCase() === 'n' || e.key.toLowerCase() === 'j')) ||
        (!isInput && enableVim && e.key === 'j');

      // Up navigation
      const isUp =
        e.key === 'ArrowUp' ||
        (mode !== 'standard' && e.ctrlKey && (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 'k')) ||
        (!isInput && enableVim && e.key === 'k');

      if (isDown) {
        e.preventDefault();
        setSelectedIndex((prev) => (history.length > 0 ? (prev + 1) % history.length : 0));
        return;
      }

      if (isUp) {
        e.preventDefault();
        setSelectedIndex((prev) =>
          history.length > 0 ? (prev === 0 ? history.length - 1 : prev - 1) : 0
        );
        return;
      }

      // Enter -> Reuse text
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        if (selectedItem) {
          e.preventDefault();
          onReuseText(selectedItem.output_text);
        }
        return;
      }

      // Copy: Ctrl+C or 'c' (when outside input)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        const selection = window.getSelection()?.toString();
        if (!selection && selectedItem) {
          e.preventDefault();
          handleCopy(selectedItem);
        }
        return;
      }

      if (!isInput && enableVim && e.key.toLowerCase() === 'c') {
        if (selectedItem) {
          e.preventDefault();
          handleCopy(selectedItem);
        }
        return;
      }

      // Delete item: Delete key or 'd' outside input
      if (e.key === 'Delete' || (!isInput && enableVim && e.key.toLowerCase() === 'd')) {
        if (selectedItem?.id) {
          e.preventDefault();
          handleDeleteItem(selectedItem.id);
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, selectedIndex, selectedItem, settings, onReuseText]);

  return (
    <div className="flex flex-col flex-1 min-h-0 p-3.5 space-y-2.5">
      {/* Header and Search */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-inherit hover:bg-black/10 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Voltar (Esc)"
          >
            <Icon name="ArrowLeft" className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Icon name="History" className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
            <span className="text-sm font-semibold">Histórico de Operações</span>
            <span className="text-zinc-400 text-xs">({history.length})</span>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-black/10 dark:hover:bg-zinc-800"
            title="Limpar todo o histórico do SQLite"
          >
            <Icon name="Trash2" className="w-3.5 h-3.5" />
            <span>Limpar tudo</span>
          </button>
        )}
      </div>

      <div className="relative shrink-0">
        <Icon name="Search" className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-400" />
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pesquisar por prompt, ação ou resposta no histórico... (Navegue com setas ou Ctrl+J/K)"
          autoFocus
          className="hud-input w-full pl-9 pr-3.5 py-2 rounded-xl border border-hud text-sm placeholder:text-zinc-400 focus:outline-none"
        />
      </div>

      {/* Split view: List on left, details on right */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-3 overflow-hidden">
        {/* Left column list */}
        <div className="col-span-5 flex flex-col min-h-0 overflow-hidden pr-1">
          <div className="flex-1 min-h-0 overflow-y-auto space-y-1">
            {isLoading ? (
              <div className="p-6 text-center text-sm text-zinc-400">Carregando...</div>
            ) : history.length === 0 ? (
              <div className="p-6 text-center text-sm text-zinc-400">Nenhum registro encontrado.</div>
            ) : (
              history.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-black/10 dark:bg-zinc-800 text-inherit border-hud shadow-xs'
                        : 'hover:bg-black/5 dark:hover:bg-zinc-900/70 text-zinc-400 hover:text-inherit border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold" style={isSelected ? { color: 'var(--accent-color)' } : undefined}>{item.action_title}</span>
                      <span className="text-xs text-zinc-400 font-mono">{item.created_at?.slice(11, 16) || ''}</span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">{item.input_text}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column details */}
        <div className="col-span-7 flex flex-col min-h-0 justify-between overflow-hidden hud-card rounded-xl p-3.5 border border-hud">
          {selectedItem ? (
            <>
              <div className="flex-1 min-h-0 overflow-y-auto space-y-3 select-text pr-1">
                <div>
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                    Entrada
                  </span>
                  <div className="text-[13px] bg-black/10 dark:bg-zinc-950/80 p-3 rounded-lg border border-hud whitespace-pre-wrap leading-relaxed">
                    {selectedItem.input_text}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold block mb-1" style={{ color: 'var(--accent-color)' }}>
                    Saída ({selectedItem.model})
                  </span>
                  <div className="text-[13px] bg-black/10 dark:bg-zinc-950/80 p-3 rounded-lg border border-hud whitespace-pre-wrap leading-relaxed">
                    {selectedItem.output_text}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-hud text-xs shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(selectedItem)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium transition-colors cursor-pointer text-xs shadow-xs"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                    title="Copiar resultado (c ou Ctrl+C)"
                  >
                    <Icon name={copiedId === selectedItem.id ? 'Check' : 'Copy'} className="w-3.5 h-3.5" />
                    <span>{copiedId === selectedItem.id ? 'Copiado!' : 'Copiar Saída'}</span>
                    <kbd className="text-[10px] bg-white/20 px-1 py-0.2 rounded font-mono ml-0.5">c</kbd>
                  </button>

                  <button
                    onClick={() => onReuseText(selectedItem.output_text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-zinc-800 hover:bg-black/10 dark:hover:bg-zinc-700 text-inherit border border-hud transition-colors cursor-pointer text-xs font-medium"
                    title="Usar esse texto em uma nova ação (Enter)"
                  >
                    <Icon name="RefreshCw" className="w-3.5 h-3.5" />
                    <span>Reutilizar</span>
                    <kbd className="text-[10px] bg-zinc-700 px-1 py-0.2 rounded font-mono ml-0.5">↵</kbd>
                  </button>
                </div>

                <button
                  onClick={(e) => handleDelete(e, selectedItem.id)}
                  className="flex items-center gap-1 p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
                  title="Excluir este item (d ou Delete)"
                >
                  <Icon name="Trash2" className="w-4 h-4" />
                  <kbd className="text-[10px] text-zinc-500 font-mono">d</kbd>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
              Selecione um item para ver os detalhes
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
