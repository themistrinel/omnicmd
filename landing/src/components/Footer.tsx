import React from 'react';
import { Terminal, ArrowUp, ArrowUpRight } from 'lucide-react';
import { GITHUB_URL, RELEASES_URL, LICENSE_URL } from '../constants';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-sky-500/15 bg-[#030712] py-14 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-sky-300/60 font-mono">
        {/* Brand & Meta */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 border border-sky-400/30 flex items-center justify-center text-white shadow-[0_0_10px_rgba(56,189,248,0.4)]">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="text-white font-bold font-display text-sm tracking-tight">OmniCmd</span>
          <span className="text-sky-500/40">//</span>
          <span className="text-sky-300">v0.1.0</span>
          <span className="text-sky-500/40">//</span>
          <span className="text-sky-400/60">MIT Open Source</span>
        </div>

        {/* Links & Back to Top */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-sky-300/70">
          <a
            href="#cockpit"
            className="hover:text-white transition-colors"
          >
            Cockpit
          </a>
          <span className="text-sky-500/30">•</span>
          <a
            href="#features"
            className="hover:text-white transition-colors"
          >
            Features
          </a>
          <span className="text-sky-500/30">•</span>
          <a
            href="#cadence"
            className="hover:text-white transition-colors"
          >
            Cadence
          </a>
          <span className="text-sky-500/30">•</span>
          <a
            href="#architecture"
            className="hover:text-white transition-colors"
          >
            Architecture
          </a>
          <span className="text-sky-500/30">•</span>
          <a
            href="#commands"
            className="hover:text-white transition-colors"
          >
            Commands
          </a>
          <span className="text-sky-500/30">•</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-sky-400" />
          </a>
          <span className="text-sky-500/30">•</span>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Releases</span>
            <ArrowUpRight className="w-3 h-3 text-sky-400" />
          </a>
          <span className="text-sky-500/30">•</span>
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            MIT
          </a>
          <span className="text-sky-500/30">•</span>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1 text-sky-300/70 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3 h-3" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
