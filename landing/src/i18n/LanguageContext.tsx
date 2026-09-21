import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SupportedLanguage, Translations, LanguageOption } from './types';
import { en } from './locales/en';
import { pt } from './locales/pt';
import { es } from './locales/es';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'pt', label: 'PT', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'EN', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'ES', nativeName: 'Español', flag: '🇪🇸' },
];

const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  pt,
  en,
  es,
};

const STORAGE_KEY = 'omnicmd_landing_lang';

export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined' || !window.navigator) {
    return 'en';
  }

  const browserLangs = window.navigator.languages && window.navigator.languages.length > 0
    ? window.navigator.languages
    : [window.navigator.language || 'en'];

  for (const rawLang of browserLangs) {
    const lang = (rawLang || '').toLowerCase().trim();
    if (lang.startsWith('pt')) {
      return 'pt';
    }
    if (lang.startsWith('es')) {
      return 'es';
    }
    if (lang.startsWith('en')) {
      return 'en';
    }
  }

  return 'en';
}

interface LanguageContextValue {
  language: SupportedLanguage;
  t: Translations;
  setLanguage: (lang: SupportedLanguage) => void;
  availableLanguages: LanguageOption[];
  isAutoDetected: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (saved && ['en', 'pt', 'es'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return detectBrowserLanguage();
  });

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    setIsAutoDetected(false);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;

      const titles: Record<SupportedLanguage, string> = {
        pt: 'OmniCmd — O HUD de IA Instantâneo para o seu Teclado',
        en: 'OmniCmd — The Instant AI HUD for your Keystroke',
        es: 'OmniCmd — El HUD de IA Instantáneo para tu Teclado',
      };
      document.title = titles[language] || titles.en;

      const descriptions: Record<SupportedLanguage, string> = {
        pt: 'Paleta de comandos de IA ultrarrápida, leve e focada em teclado para desenvolvedores e power users. Construída com Rust e Tauri v2.',
        en: 'A blazingly fast, lightweight, keyboard-driven AI command palette for developers and power users. Built with Rust and Tauri v2.',
        es: 'Paleta de comandos de IA ultrarrápida, ligera y centrada en el teclado para desarrolladores y usuarios avanzados. Creada con Rust y Tauri v2.',
      };
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', descriptions[language] || descriptions.en);
      }
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    t: TRANSLATIONS[language] || en,
    setLanguage,
    availableLanguages: LANGUAGE_OPTIONS,
    isAutoDetected,
  }), [language, isAutoDetected]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
