import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/types';

interface LanguageSelectorProps {
  variant?: 'desktop' | 'mobile';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'desktop' }) => {
  const { language, setLanguage, availableLanguages, isAutoDetected, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = availableLanguages.find((opt) => opt.code === language) || availableLanguages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="flex flex-col gap-2 font-sans">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            {t.langSelector.selectLanguage}
          </span>
          {isAutoDetected && (
            <span className="flex items-center gap-1 text-[10px] text-sky-400 font-sans">
              <Sparkles className="w-2.5 h-2.5 text-sky-400" />
              {t.langSelector.autoDetected}
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {availableLanguages.map((opt) => {
            const isSelected = opt.code === language;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => handleSelect(opt.code)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-400/15 border border-sky-400/40 text-sky-300'
                    : 'bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <span>{opt.flag}</span>
                <span className="font-mono">{opt.label}</span>
                {isSelected && <Check className="w-3 h-3 text-sky-400" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative font-sans" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${t.langSelector.selectLanguage}: ${currentOption.nativeName}`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.14] transition-all cursor-pointer shadow-sm group"
      >
        <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors" />
        <span className="text-xs">{currentOption.flag}</span>
        <span className="font-mono text-[11px] font-semibold text-slate-200">{currentOption.label}</span>
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t.langSelector.selectLanguage}
          className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0c0e14] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.9)] py-1.5 z-50 overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 border-b border-white/[0.06] flex items-center justify-between">
            <span>{t.langSelector.selectLanguage}</span>
            {isAutoDetected && (
              <span className="text-sky-400 text-[9px] lowercase font-sans">
                auto
              </span>
            )}
          </div>

          <div className="p-1 space-y-0.5">
            {availableLanguages.map((opt) => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-sky-500/15 text-white font-semibold border border-sky-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{opt.flag}</span>
                    <span className="font-medium">{opt.nativeName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className={isSelected ? 'text-sky-400' : 'text-slate-500'}>
                      {opt.label}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
