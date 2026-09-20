import React from 'react';
import { Terminal } from 'lucide-react';
import { GITHUB_URL, RELEASES_URL, LICENSE_URL } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050608] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
            <Terminal className="w-3 h-3 text-sky-400" />
          </div>
          <span className="text-slate-300 font-semibold font-sans">OmniCmd</span>
          <span aria-hidden="true">|</span>
          <span>v0.1.0</span>
          <span aria-hidden="true">|</span>
          <span>MIT License</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs">
          <a
            href="#devlog"
            className="min-h-[44px] px-2.5 py-2 inline-flex items-center text-slate-400 hover:text-white transition-colors"
          >
            Devlog
          </a>
          <span aria-hidden="true" className="text-slate-700 hidden xs:inline">|</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] px-2.5 py-2 inline-flex items-center text-slate-400 hover:text-white transition-colors"
          >
            Source
          </a>
          <span aria-hidden="true" className="text-slate-700 hidden xs:inline">|</span>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] px-2.5 py-2 inline-flex items-center text-slate-400 hover:text-white transition-colors"
          >
            Releases
          </a>
          <span aria-hidden="true" className="text-slate-700 hidden xs:inline">|</span>
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] px-2.5 py-2 inline-flex items-center text-slate-400 hover:text-white transition-colors"
          >
            License
          </a>
        </div>
      </div>
    </footer>
  );
};
