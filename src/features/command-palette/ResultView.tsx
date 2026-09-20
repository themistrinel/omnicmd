import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PromptAction, Profile } from '@/types';
import { Icon } from '@/components/Icon';
import { ClipboardService } from '@/lib/clipboard';

interface ResultViewProps {
  action: PromptAction;
  profile: Profile;
  model: string;
  inputText: string;
  outputText: string;
  errorMessage?: string | null;
  isLoading: boolean;
  enableVimMnemonicShortcuts?: boolean;
  sourceImage?: string | null;
  onCopy: () => void;
  onRegenerate: () => void;
  onEdit: () => void;
  onOpenSettings?: () => void;
  onTransformToPrompt: (text: string) => void;
  onClose: () => void;
  onBack: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  action,
  profile,
  model,
  inputText,
  outputText,
  errorMessage,
  isLoading,
  enableVimMnemonicShortcuts = true,
  sourceImage,
  onCopy,
  onRegenerate,
  onEdit,
  onOpenSettings,
  onTransformToPrompt,
  onClose,
  onBack,
}) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close more menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMoreMenu]);

  const handleCopyText = useCallback(
    async (text: string, label: string) => {
      if (!text) return;
      await ClipboardService.write(text);
      setCopyStatus(label);
      setShowMoreMenu(false);
      onCopy();
      setTimeout(() => setCopyStatus(null), 2000);
    },
    [onCopy]
  );

  const handleCopy = useCallback(() => {
    handleCopyText(outputText, 'Copiado!');
  }, [handleCopyText, outputText]);

  const handleCopyAndClose = useCallback(async () => {
    if (!outputText) return;
    await ClipboardService.write(outputText);
    onClose();
  }, [outputText, onClose]);

  const handleCopyOriginalInput = useCallback(() => {
    handleCopyText(inputText, 'Entrada Copiada!');
  }, [handleCopyText, inputText]);

  const handleCopyMarkdown = useCallback(() => {
    const formatted = `### Prompt (${action.title} - ${profile.name})\n${inputText}\n\n### Resposta (${model})\n${outputText}`;
    handleCopyText(formatted, 'Markdown Copiado!');
  }, [action.title, profile.name, inputText, model, outputText, handleCopyText]);

  // Global keyboard shortcuts in Result view
  useEffect(() => {
    const handleResultKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      // Enter or Ctrl+Enter -> Copy & Close HUD
      if (e.key === 'Enter') {
        if (outputText && !isLoading && !errorMessage) {
          e.preventDefault();
          handleCopyAndClose();
        }
        return;
      }

      // Ctrl+C or Cmd+C -> Quick copy
      const selection = window.getSelection()?.toString();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        if (!selection && outputText) {
          e.preventDefault();
          handleCopy();
        }
        return;
      }

      // Ctrl+R or Cmd+R -> Regenerate
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        if (!isLoading) {
          onRegenerate();
        }
        return;
      }

      // Single-key mnemonics (when outside input and enableVimMnemonicShortcuts is true)
      if (enableVimMnemonicShortcuts && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const key = e.key.toLowerCase();
        if (key === 'r') {
          e.preventDefault();
          if (!isLoading) onRegenerate();
          return;
        }
        if (key === 'e') {
          e.preventDefault();
          if (!isLoading) onEdit();
          return;
        }
        if (key === 'm') {
          e.preventDefault();
          if (outputText) handleCopyMarkdown();
          return;
        }
        if (key === 'i') {
          e.preventDefault();
          if (inputText) handleCopyOriginalInput();
          return;
        }
        if (key === 'c') {
          e.preventDefault();
          if (outputText) handleCopy();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleResultKeyDown);
    return () => {
      window.removeEventListener('keydown', handleResultKeyDown);
    };
  }, [
    handleCopy,
    handleCopyAndClose,
    handleCopyMarkdown,
    handleCopyOriginalInput,
    inputText,
    outputText,
    isLoading,
    errorMessage,
    enableVimMnemonicShortcuts,
    onRegenerate,
    onEdit,
  ]);

  return (
    <div className="flex flex-col flex-1 min-h-0 p-3.5 space-y-2.5">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 border-b border-hud shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-inherit hover:bg-black/10 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
            title="Voltar para busca (Esc)"
          >
            <Icon name="ArrowLeft" className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 truncate">
            <span className="text-sm font-semibold truncate">{action.title}</span>
            <span className="text-zinc-500 text-sm">•</span>
            <span className="text-xs font-medium text-zinc-400 shrink-0">{profile.name}</span>
            <span className="text-zinc-500 text-sm">•</span>
            <span className="text-xs font-mono bg-black/10 dark:bg-zinc-900/90 px-2 py-0.5 rounded-md border border-hud shrink-0">
              {model}
            </span>
          </div>
        </div>

        {/* Primary Action Button: Copiar & Fechar */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyAndClose}
            disabled={isLoading || !outputText || !!errorMessage}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md transition-all cursor-pointer"
            style={{
              backgroundColor: 'var(--accent-color)',
              boxShadow: '0 4px 14px rgba(var(--accent-rgb), 0.35)',
            }}
            title="Copiar para clipboard e fechar HUD (Enter)"
          >
            <Icon name="Check" className="w-3.5 h-3.5" />
            <span>Copiar &amp; Fechar</span>
            <kbd className="text-[10px] bg-white/20 px-1 py-0.2 rounded font-mono ml-0.5">↵</kbd>
          </button>
        </div>
      </div>

      {/* Main output / error area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 rounded-xl hud-card border border-hud text-[15px] leading-relaxed font-sans whitespace-pre-wrap select-text space-y-3">
        {sourceImage && (
          <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-950/80 border border-white/10 max-w-fit">
            <img
              src={sourceImage}
              alt="Preview da Imagem Analisada"
              className="h-16 max-w-[200px] rounded-lg object-contain border border-white/15 bg-zinc-900 shadow-sm"
            />
            <div className="flex flex-col text-xs pr-2">
              <span className="font-semibold text-sky-300 flex items-center gap-1.5">
                <Icon name="ImageIcon" className="w-3.5 h-3.5" />
                Imagem Analisada
              </span>
              <span className="text-[11px] text-zinc-400">Capturada da área de transferência</span>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full py-16 text-zinc-400 space-y-3">
            <Icon name="Loader2" className="w-7 h-7 animate-spin text-sky-400" />
            <p className="text-sm font-medium text-zinc-200">Processando resposta com {model}...</p>
          </div>
        ) : errorMessage ? (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-rose-300 font-semibold text-sm">
              <Icon name="AlertTriangle" className="w-5 h-5 text-rose-400 shrink-0" />
              <span>Falha na execução com {model}</span>
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed font-mono bg-zinc-950/60 p-3 rounded-lg border border-rose-500/20 whitespace-pre-wrap">
              {errorMessage}
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={onRegenerate}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium transition-colors cursor-pointer"
              >
                <Icon name="RefreshCw" className="w-3.5 h-3.5" />
                <span>Tentar Novamente (Ctrl+R)</span>
              </button>
              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  <Icon name="Settings" className="w-3.5 h-3.5 text-sky-400" />
                  <span>Ajustar Configurações (Ctrl+,)</span>
                </button>
              )}
            </div>
          </div>
        ) : outputText ? (
          outputText
        ) : (
          <span className="text-zinc-400 italic">Nenhum resultado gerado.</span>
        )}
      </div>

      {/* Clean Bottom Toolbar */}
      <div className="flex items-center justify-between pt-1 shrink-0">
        <div className="flex items-center gap-2">
          {/* Quick inline copy */}
          <button
            onClick={handleCopy}
            disabled={isLoading || !outputText || !!errorMessage}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-zinc-900 hover:bg-black/10 dark:hover:bg-zinc-800 text-inherit border border-hud transition-colors disabled:opacity-40 cursor-pointer"
            title="Apenas copiar sem fechar (c ou Ctrl+C)"
          >
            <Icon name={copyStatus === 'Copiado!' ? 'Check' : 'Copy'} className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
            <span>{copyStatus === 'Copiado!' ? 'Copiado!' : 'Copiar'}</span>
            <kbd className="text-[10px] text-zinc-500 font-mono">c</kbd>
          </button>

          {/* Regenerate */}
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-zinc-900 hover:bg-black/10 dark:hover:bg-zinc-800 text-inherit border border-hud transition-colors disabled:opacity-40 cursor-pointer"
            title="Regenerar resposta com o modelo (r ou Ctrl+R)"
          >
            <Icon name="RefreshCw" className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} style={{ color: 'var(--accent-color)' }} />
            <span>Regenerar</span>
            <kbd className="text-[10px] text-zinc-500 font-mono">r</kbd>
          </button>

          {/* Edit input */}
          <button
            onClick={onEdit}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-zinc-900 hover:bg-black/10 dark:hover:bg-zinc-800 text-inherit border border-hud transition-colors disabled:opacity-40 cursor-pointer"
            title="Editar texto de entrada original (e)"
          >
            <Icon name="Edit3" className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
            <span>Editar</span>
            <kbd className="text-[10px] text-zinc-500 font-mono">e</kbd>
          </button>

          {/* Secondary Actions in More Menu (...) */}
          <div ref={moreMenuRef} className="relative">
            <button
              onClick={() => setShowMoreMenu((prev) => !prev)}
              disabled={isLoading || (!outputText && !inputText)}
              className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg bg-black/5 dark:bg-zinc-900 hover:bg-black/10 dark:hover:bg-zinc-800 text-zinc-400 hover:text-inherit border border-hud transition-colors disabled:opacity-40 cursor-pointer"
              title="Mais opções de cópia e prompt"
              aria-haspopup="true"
              aria-expanded={showMoreMenu}
            >
              <Icon name="MoreHorizontal" className="w-4 h-4" />
              <span>Mais</span>
            </button>

            {showMoreMenu && (
              <div className="absolute left-0 bottom-full mb-1.5 w-60 hud-window border border-hud rounded-xl shadow-2xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={handleCopyOriginalInput}
                  disabled={!inputText}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-800 disabled:opacity-40 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="FileText" className="w-3.5 h-3.5 text-sky-400" />
                    <span>Copiar Entrada Original</span>
                  </div>
                  <kbd className="text-[10px] text-zinc-500 font-mono">i</kbd>
                </button>
                <button
                  onClick={handleCopyMarkdown}
                  disabled={!outputText}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-800 disabled:opacity-40 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Share2" className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiar com Markdown</span>
                  </div>
                  <kbd className="text-[10px] text-zinc-500 font-mono">m</kbd>
                </button>
                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    onTransformToPrompt(outputText);
                  }}
                  disabled={!outputText}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-800 disabled:opacity-40 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Icon name="Sparkles" className="w-3.5 h-3.5 text-amber-400" />
                  <span>Encadear como Novo Prompt</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-xs text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 transition-colors cursor-pointer"
          title="Fechar painel (Esc)"
        >
          <span>Concluir</span>
        </button>
      </div>
    </div>
  );
};
