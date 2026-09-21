import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const ProductShowcase: React.FC = () => {
  const { language, t } = useLanguage();

  const heroImageSrc = t.hero.paletteImage || `./omnicmd-palette-${language}.png`;
  const heroImageAlt = t.hero.paletteAlt || 'OmniCmd Native Desktop HUD - The Keyboard-First AI Command Palette';

  return (
    <div className="w-full max-w-5xl mx-auto flex items-center justify-center relative">
      {/* Sutil glow de iluminação que emana de trás da janela do HUD */}
      <div
        className="absolute -inset-2 sm:-inset-4 bg-gradient-to-b from-sky-500/20 via-cyan-400/10 to-transparent rounded-3xl blur-2xl -z-10 opacity-70 pointer-events-none"
        aria-hidden="true"
      />

      {/* A janela real do OmniCmd flutuando pura e alternando dinamicamente de acordo com o idioma selecionado */}
      <img
        key={language}
        src={heroImageSrc}
        alt={heroImageAlt}
        className="w-full h-auto object-contain drop-shadow-[0_30px_100px_rgba(0,0,0,0.85)] drop-shadow-[0_0_40px_rgba(56,189,248,0.25)] transform-gpu will-change-transform transition-all duration-300 hover:scale-[1.006] animate-in fade-in duration-200"
        width={1804}
        height={1122}
        loading="eager"
      />
    </div>
  );
};

