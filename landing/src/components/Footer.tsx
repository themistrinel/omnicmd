import React from 'react';
import { Terminal } from 'lucide-react';
import { GITHUB_URL, RELEASES_URL, LICENSE_URL } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050608] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
            <Terminal className="w-3 h-3 text-sky-400" />
          </div>
          <span className="text-slate-300 font-semibold font-sans">OmniCmd</span>
          <span>|</span>
          <span>v0.1.0</span>
          <span>|</span>
          <span>MIT License</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a href="#devlog" className="text-slate-400 hover:text-white transition-colors">
            Devlog
          </a>
          <span>|</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Source
          </a>
          <span>|</span>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Releases
          </a>
          <span>|</span>
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            License
          </a>
        </div>
      </div>
    </footer>
  );
};
