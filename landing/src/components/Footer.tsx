import React from 'react';
import { Terminal, ArrowUp, ArrowUpRight } from 'lucide-react';
import { GITHUB_URL, RELEASES_URL, LICENSE_URL } from '../constants';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
        {/* Brand & Meta */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-sky-400">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="text-white font-bold font-sans">OmniCmd</span>
          <span className="text-slate-700">//</span>
          <span className="text-slate-400">v0.1.0</span>
          <span className="text-slate-700">//</span>
          <span className="text-slate-500">MIT Open Source</span>
        </div>

        {/* Links & Back to Top */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
          <a
            href="#cockpit"
            className="hover:text-white transition-colors"
          >
            Cockpit
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#cadence"
            className="hover:text-white transition-colors"
          >
            Cadence
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#architecture"
            className="hover:text-white transition-colors"
          >
            Architecture
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#commands"
            className="hover:text-white transition-colors"
          >
            Commands
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-slate-600" />
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Releases</span>
            <ArrowUpRight className="w-3 h-3 text-slate-600" />
          </a>
          <span className="text-slate-700">•</span>
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            MIT
          </a>
          <span className="text-slate-700">•</span>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3 h-3" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
