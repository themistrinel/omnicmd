import React from 'react';
import { Terminal, ArrowUp, ArrowUpRight } from 'lucide-react';
import { APP_VERSION, GITHUB_URL, RELEASES_URL, LICENSE_URL } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#08090d] py-12 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        {/* Brand & Meta */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <span className="text-white font-bold font-display text-sm tracking-tight">OmniCmd</span>
          <span className="text-slate-700">//</span>
          <span className="text-slate-400">v{APP_VERSION}</span>
          <span className="text-slate-700">//</span>
          <span className="text-slate-500 font-sans">MIT Open Source</span>
        </div>

        {/* Links & Back to Top */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
          <a
            href="#cockpit"
            className="hover:text-white transition-colors"
          >
            {t.footer.links.cockpit}
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#features"
            className="hover:text-white transition-colors"
          >
            {t.footer.links.features}
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#cadence"
            className="hover:text-white transition-colors"
          >
            {t.footer.links.cadence}
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#architecture"
            className="hover:text-white transition-colors"
          >
            {t.footer.links.architecture}
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#commands"
            className="hover:text-white transition-colors"
          >
            {t.footer.links.commands}
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 font-sans"
          >
            <span>{t.footer.links.github}</span>
            <ArrowUpRight className="w-3 h-3 text-slate-500" />
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 font-sans"
          >
            <span>{t.footer.links.releases}</span>
            <ArrowUpRight className="w-3 h-3 text-slate-500" />
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors font-sans"
          >
            {t.footer.links.mit}
          </a>
          <span className="text-slate-700">•</span>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer font-sans"
          >
            <ArrowUp className="w-3 h-3" />
            <span>{t.footer.links.top}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
