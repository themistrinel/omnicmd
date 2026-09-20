import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { DownloadInfo, OSPlatform } from '../types';
import { GITHUB_URL, INSTALL_CURL_COMMAND } from '../constants';

interface HeroSectionProps {
  detectedOS: OSPlatform;
  downloadInfo: DownloadInfo;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ downloadInfo }) => {
  const [copiedInstallCmd, setCopiedInstallCmd] = useState(false);

  const copyInstallCommand = () => {
    navigator.clipboard?.writeText(INSTALL_CURL_COMMAND);
    setCopiedInstallCmd(true);
    setTimeout(() => setCopiedInstallCmd(false), 2000);
  };

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Background Radial Glow Floor (Subtle & Pure) */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[360px] opacity-25 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)',
        }}
      />

      <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        {/* Release Pill with Hardware Pulse */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-slate-400">OmniCmd v0.1.0</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300 font-medium">Rust Core &amp; Tauri v2</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-medium tracking-[-0.035em] text-white leading-[1.06]">
          The Instant AI Command Layer <br />
          for your Keystroke.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl font-normal">
          Process clipboard context in 18ms with{' '}
          <kbd className="keycap-3d inline-block px-2 py-0.5 rounded-md bg-[#161a23] text-white font-mono text-xs font-semibold mx-1">
            Super
          </kbd>
          <span className="text-slate-400 font-mono text-xs">+</span>
          <kbd className="keycap-3d inline-block px-2.5 py-0.5 rounded-md bg-[#161a23] text-white font-mono text-xs font-semibold mx-1">
            Space
          </kbd>{' '}
          over any active editor or terminal. No window switches, no browser tabs.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={downloadInfo.url}
            className="flex items-center gap-3 px-5 py-3 min-h-[44px] rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(255,255,255,0.16)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.25)] cursor-pointer group"
          >
            <span className="text-slate-900 group-hover:scale-105 transition-transform">
              {downloadInfo.icon}
            </span>
            <div className="flex flex-col text-left">
              <span className="leading-tight text-xs font-mono uppercase tracking-wider text-slate-400">
                Download Native
              </span>
              <span className="font-semibold text-sm">
                {downloadInfo.osName} ({downloadInfo.format.split(' ')[0]})
              </span>
            </div>
          </a>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] text-sm font-medium transition-all shadow-inner"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Quick 1-liner install snippet */}
        <div className="flex items-center justify-between gap-3 px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#090b10] border border-white/[0.08] font-mono text-xs text-slate-300 max-w-md w-full shadow-inner mt-1">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            <span className="text-sky-400 font-bold select-none shrink-0">$</span>
            <span className="select-all text-slate-300 truncate">{INSTALL_CURL_COMMAND}</span>
          </div>
          <button
            type="button"
            onClick={copyInstallCommand}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyInstallCommand();
              }
            }}
            aria-label={copiedInstallCmd ? "Terminal install command copied" : "Copy terminal install command"}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            {copiedInstallCmd ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {copiedInstallCmd ? "Copied terminal install command to clipboard" : ""}
          </div>
        </div>

        {/* Specification Ledger */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 pt-6 border-t border-white/[0.06] text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold tabular-nums">18ms</span>
            <span className="text-slate-400">wake latency</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold tabular-nums">24MB</span>
            <span className="text-slate-400">memory footprint</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Zero telemetry</span>
            <span className="text-slate-400">local SQLite</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Native overlay</span>
            <span className="text-slate-400">0 window switches</span>
          </div>
        </div>
      </div>
    </section>
  );
};
