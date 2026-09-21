import React, { useRef, useEffect } from 'react';
import { PromptAction, Profile, Language } from '@/types';
import { Icon } from '@/components/Icon';
import { getTranslation } from '@/lib/i18n';

interface InputViewProps {
  action: PromptAction;
  profile: Profile;
  inputText: string;
  onChangeInput: (text: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onPasteClipboard: () => void;
  isLoading: boolean;
  language?: Language;
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
  language = 'pt-BR',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = getTranslation(language);

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
            className="p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-inherit hover:bg-black/5 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title={t.backEsc}
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
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{action.title}</span>
            <span className="text-slate-400 dark:text-zinc-500 text-sm">•</span>
            <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium">{profile.name}</span>
          </div>
        </div>

        <button
          onClick={onPasteClipboard}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-black/5 dark:bg-zinc-900 hover:bg-black/10 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200 border border-hud transition-colors cursor-pointer font-medium"
          title={t.pasteClipboard}
        >
          <Icon name="Clipboard" className="w-3.5 h-3.5" style={{ color: 'var(--accent-text, var(--accent-color))' }} />
          <span>{t.pasteClipboard}</span>
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => onChangeInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.inputPlaceholder}
          className="hud-input w-full flex-1 min-h-0 p-4 rounded-xl text-[15px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none border border-hud resize-none leading-relaxed font-sans"
        />
      </div>

      <div className="flex items-center justify-between pt-1 text-xs shrink-0">
        <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs font-medium">
          <span>{inputText.length} caracteres</span>
          <span>•</span>
          <span><kbd className="bg-white dark:bg-[#1c1e24] border border-slate-300 dark:border-white/15 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-200 font-mono text-xs shadow-2xs font-semibold">Ctrl+Enter</kbd> para enviar</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !inputText.trim()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            isLoading || !inputText.trim()
              ? 'bg-black/10 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 cursor-not-allowed'
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
              <span>Executando...</span>
            </>
          ) : (
            <>
              <Icon name="Send" className="w-4 h-4" />
              <span>{t.executeCtrlEnter.split(' ')[0]}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
