import React, { useState, useEffect } from 'react';
import { Terminal, Download } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { GITHUB_URL } from '../constants';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 sm:py-4 pointer-events-none">
      <div
        className={`pointer-events-auto w-full max-w-6xl transition-all duration-300 rounded-2xl flex items-center justify-between px-4 sm:px-6 h-14 ${
          scrolled
            ? 'bg-[#090b10]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
            : 'bg-[#090b10]/50 backdrop-blur-md border border-white/[0.04]'
        }`}
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-white shadow-inner group-hover:border-white/25 transition-colors">
            <Terminal className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-white font-sans">
              OmniCmd
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.05] text-slate-400 border border-white/[0.06] hidden sm:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              v0.1.0 • Rust Core
            </span>
          </div>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] text-slate-400 font-medium">
          <a href="#preview" className="hover:text-white transition-colors">
            HUD Preview
          </a>
          <a href="#benchmarks" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#workflow" className="hover:text-white transition-colors">
            Workflow
          </a>
          <a href="#shortcuts" className="hover:text-white transition-colors">
            Shortcuts
          </a>
          <a href="#devlog" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>Devlog</span>
          </a>
          <a href="#downloads" className="hover:text-white transition-colors">
            Binaries
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href="#downloads"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-[0_2px_10px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get OmniCmd</span>
          </a>
        </div>
      </div>
    </header>
  );
};
