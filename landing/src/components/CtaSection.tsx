import React, { useState } from 'react';
import { Download, Copy, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { DownloadInfo, OSPlatform } from '../types';
import { GITHUB_URL, INSTALL_CURL_COMMAND } from '../constants';

interface CtaSectionProps {
  detectedOS: OSPlatform;
  downloadInfo: DownloadInfo;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ downloadInfo }) => {
  const [copiedInstallCmd, setCopiedInstallCmd] = useState(false);

  const copyInstallCommand = () => {
    navigator.clipboard?.writeText(INSTALL_CURL_COMMAND);
    setCopiedInstallCmd(true);
    setTimeout(() => setCopiedInstallCmd(false), 2000);
  };

  return (
    <section className="py-24 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* ─────────────────────────────────────────────────────────────
          PERSPECTIVE GRID & CYBER HORIZON FOR FOOTER FINALE (Wope Style)
          ───────────────────────────────────────────────────────────── */}
      <div className="perspective-grid-container" aria-hidden="true">
        {/* Horizon Aurora Glow wrapping the closing cockpit */}
        <div className="horizon-glow top-[42%] w-[150%] max-w-[1300px] h-[320px] animate-aurora opacity-95" />

        {/* Laser Beam Line passing through behind the card */}
        <div className="horizon-beam-line top-[54%]" />

        {/* 3D Perspective Grid Floor */}
        <div className="perspective-grid-plane opacity-90" />
      </div>

      {/* Main Closing Glassmorphism Container */}
      <div className="relative z-10 rounded-3xl bg-[#060f24]/92 border border-sky-500/35 backdrop-blur-2xl p-8 sm:p-16 text-center flex flex-col items-center gap-6 overflow-hidden shadow-[0_25px_100px_rgba(56,189,248,0.3),0_0_60px_rgba(56,189,248,0.2)]">
        {/* Subtle inner top glow */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[520px] h-48 bg-gradient-to-b from-sky-500/25 via-cyan-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[480px] h-36 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl mx-auto">
          {/* Header Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neon-pill text-xs font-sans font-medium text-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-300 font-bold uppercase tracking-wider text-[11px] font-mono">
              [READY // DEPLOY]
            </span>
            <span className="text-sky-400/50">•</span>
            <span>Air-Gapped &amp; Local-First</span>
          </div>

          {/* Serene, Monumental Title Case Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] text-white leading-[1.08] font-display">
            Stop Switching Windows. <br className="hidden sm:inline" />
            Reclaim Your Keystrokes.
          </h2>

          <p className="text-sky-200/75 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto font-normal">
            Under <strong className="text-white font-mono font-semibold">15MB</strong> binary. <strong className="text-white font-mono font-semibold">24MB</strong> idle memory footprint. Open source under the MIT License. Works completely offline with Ollama or connects directly to cloud LLM APIs.
          </p>
        </div>

        {/* Action cluster with pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-lg pt-2 font-sans">
          <a
            href={downloadInfo.url}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-[0_0_30px_rgba(56,189,248,0.45)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] cursor-pointer active:translate-y-0.5"
          >
            <Download className="w-4 h-4 text-white stroke-[2.5]" />
            <span>Download for {downloadInfo.osName}</span>
          </a>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#081430] hover:bg-[#0c1f4d] text-sky-200 hover:text-white border border-sky-500/30 text-sm font-medium transition-all"
          >
            <GithubIcon className="w-4 h-4 text-sky-300" />
            <span>GitHub Repository</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
          </a>
        </div>

        {/* 1-Liner Quick Install box */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-[#040a1c] border border-sky-500/25 text-xs text-sky-100 max-w-md w-full shadow-inner mt-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 pr-2 font-mono">
            <span className="text-cyan-400 font-bold select-none shrink-0">$</span>
            <span className="select-all text-sky-200/85 truncate">{INSTALL_CURL_COMMAND}</span>
          </div>
          <button
            type="button"
            onClick={copyInstallCommand}
            aria-label="Copy terminal install command"
            className="px-3 py-1 rounded-full bg-sky-900/40 hover:bg-sky-800/50 text-sky-200 hover:text-white transition-colors cursor-pointer shrink-0 border border-sky-500/30 font-sans font-semibold text-xs flex items-center gap-1.5"
          >
            {copiedInstallCmd ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-400 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-sky-300" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
