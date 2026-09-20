import React, { useState } from 'react';
import {
  Check,
  Copy,
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

export const HeroSection: React.FC<HeroSectionProps> = ({
  detectedOS,
  downloadInfo,
}) => {
  const [copiedInstallCmd, setCopiedInstallCmd] = useState(false);

  const copyInstallCommand = () => {
    navigator.clipboard?.writeText(INSTALL_CURL_COMMAND);
    setCopiedInstallCmd(true);
    setTimeout(() => setCopiedInstallCmd(false), 2200);
  };

  const hotkeyModifier = detectedOS === 'mac' ? 'Cmd' : 'Super';

  return (
    <section
      id="cockpit"
      aria-label="OmniCmd Hero Section & Product Showcase"
      className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-36 max-w-7xl mx-auto px-4 sm:px-6 overflow-visible"
    >
      {/* ─────────────────────────────────────────────────────────────
          PERSPECTIVE GRID & CYBER HORIZON BACKGROUND (Image 1)
          ───────────────────────────────────────────────────────────── */}
      <div className="perspective-grid-container" aria-hidden="true">
        {/* Top converging perspective ceiling */}
        <div className="perspective-ceiling-plane" />

        {/* 3D Perspective Grid Floor */}
        <div className="perspective-grid-plane" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HERO CENTRAL MONUMENTAL HEADER (Direct & Monumental Flow)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-6 font-sans">
        {/* Pill Badge (Image 1) */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-sky-500/30 bg-sky-950/30 backdrop-blur-md text-xs font-sans text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.25)] mx-auto hover:border-sky-400 transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
          </span>
          <span className="font-semibold tracking-wide">
            Unlimited local runtime // Open Source <span className="font-mono">v0.1.0</span>
          </span>
          <span className="text-sky-400/60 hidden sm:inline">•</span>
          <span className="text-sky-300/80 hidden sm:inline font-normal">
            Zero cloud dependencies
          </span>
        </div>

        {/* Monumental Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-[-0.04em] text-white font-display leading-[1.02]">
          New Era of Command Intelligence
        </h1>

        {/* Subtitle in soft lavender / sky */}
        <p className="text-base sm:text-xl text-sky-100/80 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
          An instant AI HUD composited directly over your active code editor. Wakes in{' '}
          <strong className="text-white font-mono font-semibold">18ms</strong> with zero window switches, zero telemetry egress, and native Rust performance.
        </p>

        {/* Tactile Hotkey Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#081430]/90 border border-sky-500/30 text-xs font-sans text-sky-200 shadow-inner">
          <span className="text-sky-400 font-semibold uppercase tracking-wider text-[11px]">
            GLOBAL HOTKEY:
          </span>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="pbt-keycap phosphor-active text-[11px] px-2.5 py-0.5">
              {hotkeyModifier}
            </span>
            <span className="text-sky-400 text-xs font-bold">+</span>
            <span className="pbt-keycap phosphor-active text-[11px] px-2.5 py-0.5">
              Space
            </span>
          </div>
          <span className="text-sky-300/60 text-[11px] hidden sm:inline font-normal">
            // floats over Neovim, VS Code, or terminal
          </span>
        </div>

        {/* Central Call-to-Action Pill Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-xl mx-auto">
          {/* Primary Pill Download Button */}
          <a
            href={downloadInfo.url}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-sans font-semibold text-sm transition-all shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] cursor-pointer active:translate-y-0.5"
          >
            <Download className="w-4 h-4 text-white stroke-[2.5]" />
            <span>Download for {downloadInfo.osName}</span>
            <span className="text-xs font-mono font-normal opacity-85 pl-1.5 border-l border-white/30">
              {downloadInfo.format} • ~12MB
            </span>
          </a>

          {/* GitHub Source Link */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#081430] hover:bg-[#0c1f4d] text-sky-200 hover:text-white border border-sky-500/30 font-sans font-medium text-sm transition-all cursor-pointer shadow-sm"
          >
            <GithubIcon className="w-4 h-4 text-sky-300" />
            <span>GitHub Repo</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
          </a>
        </div>

        {/* Single-Line cURL Bootstrap Box */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-[#060f24]/95 border border-sky-500/25 font-mono text-xs shadow-inner max-w-md mx-auto">
          <div className="flex items-center gap-2.5 min-w-0 overflow-hidden pr-2">
            <span className="text-cyan-400 font-bold select-none shrink-0 text-sm">
              $
            </span>
            <span className="text-sky-200/85 truncate select-all text-[11px] sm:text-xs font-mono">
              {INSTALL_CURL_COMMAND}
            </span>
          </div>
          <button
            type="button"
            onClick={copyInstallCommand}
            aria-label={
              copiedInstallCmd
                ? 'Terminal command copied'
                : 'Copy terminal installation command'
            }
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-900/40 hover:bg-sky-800/50 text-sky-200 hover:text-white transition-colors cursor-pointer shrink-0 text-xs font-sans font-semibold border border-sky-500/30"
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

      {/* ─────────────────────────────────────────────────────────────
          CENTRAL FLOATING PRODUCT MOCKUP (Wope Style Horizon Anchor)
          Direct flow: Badge -> Headline -> Subtitle -> CTAs -> Mockup
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 mt-10 sm:mt-14">
        {/* Soft Cosmic Aurora Glow anchored smoothly behind the app window without harsh horizontal beam lines */}
        <div
          className="absolute -top-24 sm:-top-32 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 pointer-events-none -z-10 overflow-visible"
          aria-hidden="true"
        >
          <div className="horizon-glow w-[140%] -top-12 left-1/2 -translate-x-1/2 animate-aurora" />
        </div>

        {/* The Window Component */}
        <ProductShowcase />
      </div>
    </section>
  );
};
