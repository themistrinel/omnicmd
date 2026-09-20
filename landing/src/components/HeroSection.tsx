import React, { useState } from 'react';
import {
  Check,
  Copy,
  Terminal,
  ShieldCheck,
  Zap,
  Cpu,
  ArrowUpRight,
  Download,
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { DownloadInfo, OSPlatform } from '../types';
import { GITHUB_URL, INSTALL_CURL_COMMAND } from '../constants';
import { ProductShowcase } from './ProductShowcase';

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
    <section id="cockpit" className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* System Status Ticker */}
      <div className="flex items-center justify-between px-3.5 py-1.5 rounded bg-[#0a0c12] border border-white/[0.08] text-[11px] font-mono text-zinc-400 mb-8 sm:mb-12 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#38bdf8] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
            OMNICMD_DAEMON: ACTIVE
          </span>
          <span className="text-zinc-700">//</span>
          <span>PID: 14209</span>
          <span className="text-zinc-700">//</span>
          <span className="text-zinc-300">CORE: RUST_1.77+</span>
          <span className="text-zinc-700">//</span>
          <span>WAYLAND_IPC: OK</span>
        </div>

        <div className="flex items-center gap-3 text-zinc-400 text-[10px]">
          <span>CPU: 0.0% IDLE</span>
          <span className="text-zinc-700">//</span>
          <span className="text-[#38bdf8] font-bold">RAM: 23.8MB</span>
          <span className="text-zinc-700">//</span>
          <span>WAKE: 18ms</span>
        </div>
      </div>

      {/* Hero Manifesto & Primary CTA Cluster */}
      <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
        {/* Tactical Index Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12151e] border border-white/[0.1] text-xs font-mono text-zinc-300">
          <span className="text-[#38bdf8] font-bold">[01/06]</span>
          <span>RUST OVERLAY ENGINE // TAURI V2</span>
        </div>

        {/* Brutalist Display Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-extrabold tracking-[-0.04em] text-white leading-[1.03] font-display">
          THE OVERLAY THAT NEVER SWITCHES WINDOWS.
        </h1>

        {/* Technical Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl font-normal font-sans">
          No browser tabs. No window context switches. Press{' '}
          <span className="pbt-keycap phosphor-active text-xs">Super</span>
          <span className="text-zinc-600 font-mono mx-1">+</span>
          <span className="pbt-keycap phosphor-active text-xs">Space</span>{' '}
          to summon over your active editor, process clipboard context in 18ms, and return the buffer straight to your editor.
        </p>

        {/* Primary Action Buttons & 1-Liner Install */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-2xl">
          {/* Download Native Button */}
          <a
            href={downloadInfo.url}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-black" />
            <span>DOWNLOAD FOR {downloadInfo.osName.toUpperCase()}</span>
          </a>

          {/* 1-Liner Quick Install Curl Box */}
          <div className="flex-1 w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded bg-[#07080b] border border-white/[0.1] font-mono text-xs text-zinc-300 shadow-inner">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 pr-2">
              <span className="text-[#38bdf8] font-bold select-none shrink-0">$</span>
              <span className="select-all text-zinc-400 truncate">{INSTALL_CURL_COMMAND}</span>
            </div>
            <button
              type="button"
              onClick={copyInstallCommand}
              aria-label={copiedInstallCmd ? 'Terminal command copied' : 'Copy terminal command'}
              className="p-1.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              {copiedInstallCmd ? (
                <Check className="w-3.5 h-3.5 text-[#38bdf8]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* GitHub Source Button */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-3 rounded bg-[#10131b] hover:bg-[#181d28] text-zinc-300 hover:text-white border border-white/[0.1] font-mono text-xs transition-all shrink-0"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>
        </div>

        {/* Telemetry Micro-Pillars */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#38bdf8]" />
            <span className="text-zinc-200 font-bold tabular-nums">18ms</span>
            <span className="text-zinc-500">wake latency</span>
          </div>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-[#38bdf8]" />
            <span className="text-zinc-200 font-bold tabular-nums">24MB</span>
            <span className="text-zinc-500">idle RAM</span>
          </div>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-zinc-300" />
            <span className="text-zinc-200 font-bold">Local SQLite</span>
            <span className="text-zinc-500">~/.omnicmd.db</span>
          </div>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-zinc-300" />
            <span className="text-zinc-200 font-bold">Offline Ollama</span>
            <span className="text-zinc-500">or cloud SSE</span>
          </div>
        </div>
      </div>

      {/* Real Product Showcase: Official 4K Desktop Screenshot & Motion Recording */}
      <ProductShowcase />
    </section>
  );
};
