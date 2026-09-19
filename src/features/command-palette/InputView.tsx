import React, { useRef, useEffect } from 'react';
import { PromptAction, Profile } from '@/types';
import { Icon } from '@/components/Icon';

interface InputViewProps {
  action: PromptAction;
  profile: Profile;
  inputText: string;
  onChangeInput: (text: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onPasteClipboard: () => void;
  isLoading: boolean;
}

export const InputView: React.FC<InputViewProps> = ({
  action,
  profile,
  inputText,
  onChangeInput,
  onSubmit,
  onBack,
  onPasteClipboard,
  isLoading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter executes/submits. Regular Enter inserts a newline.
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (!isLoading && inputText.trim()) {
        onSubmit();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onBack();
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 p-3.5 space-y-2.5">
      <div className="flex items-center justify-between pb-2 border-b border-hud shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-inherit hover:bg-black/10 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Voltar (Esc)"
          >
            <Icon name="ArrowLeft" className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center border"
              style={{
                backgroundColor: 'rgba(var(--accent-rgb), 0.2)',
                borderColor: 'var(--accent-color)',
                color: 'var(--accent-color)',
              }}
            >
              <Icon name={action.icon} className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-semibold">{action.title}</span>
            <span className="text-zinc-500 text-sm">•</span>
            <span className="text-xs text-zinc-400 font-medium">{profile.name}</span>
          </div>
        </div>

        <button
          onClick={onPasteClipboard}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-black/5 dark:bg-zinc-900 hover:bg-black/10 dark:hover:bg-zinc-800 text-inherit border border-hud transition-colors cursor-pointer"
          title="Colar área de transferência"
        >
          <Icon name="Clipboard" className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
          <span>Usar Clipboard</span>
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => onChangeInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite ou cole o texto aqui... (Pressione Ctrl+Enter para enviar, Enter para quebra de linha)"
          className="hud-input w-full flex-1 min-h-0 p-4 rounded-xl text-[15px] placeholder:text-zinc-400 focus:outline-none border border-hud resize-none leading-relaxed font-sans"
        />
      </div>

      <div className="flex items-center justify-between pt-1 text-xs shrink-0">
        <div className="flex items-center gap-2 text-zinc-400 text-xs">
          <span>{inputText.length} caracteres</span>
          <span>•</span>
          <span><kbd className="bg-black/10 dark:bg-zinc-900 px-1.5 py-0.5 rounded text-inherit border border-hud font-mono text-xs">Ctrl+Enter</kbd> para enviar</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !inputText.trim()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            isLoading || !inputText.trim()
              ? 'bg-black/10 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : 'text-white shadow-md active:scale-95'
          }`}
          style={
            !isLoading && inputText.trim()
              ? {
                  backgroundColor: 'var(--accent-color)',
                  boxShadow: '0 4px 14px rgba(var(--accent-rgb), 0.35)',
                }
              : undefined
          }
        >
          {isLoading ? (
            <>
              <Icon name="Loader2" className="w-4 h-4 animate-spin" />
              <span>Processando...</span>
            </>
          ) : (
            <>
              <Icon name="Send" className="w-4 h-4" />
              <span>Executar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
