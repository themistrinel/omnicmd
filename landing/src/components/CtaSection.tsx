import React, { useState } from 'react';
import { Download, Copy, Check, ArrowUpRight } from 'lucide-react';
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
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08]">
      <div className="rounded-2xl bg-[#090b10] border border-white/[0.1] p-8 sm:p-14 text-center flex flex-col items-center gap-6 relative overflow-hidden font-mono">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#12151e] border border-white/[0.1] text-[11px] font-mono text-zinc-300">
            <span className="text-[#38bdf8] font-bold">[READY // DEPLOY]</span>
            <span>AIR-GAPPED &amp; LOCAL-FIRST</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-tight font-display">
            STOP SWITCHING WINDOWS. <br />
            RECLAIM YOUR KEYSTROKES.
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
            Under 15MB. 24MB idle memory footprint. Open source under the MIT License. Works completely offline with Ollama or connects directly to cloud LLM APIs.
          </p>
        </div>

        {/* Action cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg pt-2">
          <a
            href={downloadInfo.url}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded bg-[#38bdf8] hover:bg-[#0ea5e9] text-black font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] cursor-pointer"
          >
            <Download className="w-4 h-4 text-black" />
            <span>DOWNLOAD FOR {downloadInfo.osName.toUpperCase()}</span>
          </a>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#121620] hover:bg-[#1a202c] text-zinc-200 border border-white/[0.1] text-xs font-mono transition-all"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GITHUB REPOSITORY</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        {/* 1-Liner Quick Install box */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded bg-[#06070a] border border-white/[0.08] font-mono text-xs text-zinc-300 max-w-md w-full shadow-inner mt-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
            <span className="text-[#38bdf8] font-bold select-none shrink-0">$</span>
            <span className="select-all text-zinc-400 truncate">{INSTALL_CURL_COMMAND}</span>
          </div>
          <button
            type="button"
            onClick={copyInstallCommand}
            aria-label="Copy terminal install command"
            className="p-1.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            {copiedInstallCmd ? (
              <Check className="w-3.5 h-3.5 text-[#38bdf8]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
