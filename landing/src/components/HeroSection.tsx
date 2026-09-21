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
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  detectedOS: OSPlatform;
  downloadInfo: DownloadInfo;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  detectedOS,
  downloadInfo,
}) => {
  const { t } = useLanguage();
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
      {/* Background Perspective Grid */}
      <div className="perspective-grid-container" aria-hidden="true">
        <div className="perspective-ceiling-plane" />
        <div className="perspective-grid-plane" />
      </div>

      {/* Main Hero Header */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-6 font-sans">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-xs font-sans text-slate-300 shadow-sm mx-auto hover:border-white/[0.14] transition-all">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
          </span>
          <span className="font-medium tracking-wide">
            {t.hero.badgeRuntime} <span className="font-mono text-slate-400">v0.1.0</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline font-normal">
            {t.hero.badgeZeroCloud}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] font-extrabold tracking-[-0.035em] text-white font-display leading-[1.04]">
          {t.hero.headline}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
          {t.hero.subtitle}
        </p>

        {/* Tactile Hotkey Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-sans text-slate-300">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] font-mono">
            {t.hero.globalHotkey}
          </span>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="pbt-keycap phosphor-active text-[11px] px-2 py-0.5">
              {hotkeyModifier}
            </span>
            <span className="text-slate-400 text-xs font-bold">+</span>
            <span className="pbt-keycap phosphor-active text-[11px] px-2 py-0.5">
              Space
            </span>
          </div>
          <span className="text-slate-500 text-[11px] hidden sm:inline font-normal">
            {t.hero.hotkeyComment}
          </span>
        </div>

        {/* Central Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-xl mx-auto">
          {/* Primary High-Contrast Action Button */}
          <a
            href={downloadInfo.url}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 btn-primary-azure font-sans font-bold text-sm cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>{t.hero.downloadBtn} {downloadInfo.osName}</span>
            <span className="text-xs font-mono font-normal opacity-85 pl-2 border-l border-[#082f49]/30">
              {downloadInfo.format} • {t.hero.downloadDetails}
            </span>
          </a>

          {/* GitHub Source Link */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 btn-secondary-obsidian font-sans font-medium text-sm cursor-pointer"
          >
            <GithubIcon className="w-4 h-4 text-slate-400" />
            <span>{t.hero.githubRepo}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        {/* Terminal cURL Bootstrap Box */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-[#0c0e14] border border-white/[0.08] font-mono text-xs shadow-inner max-w-md mx-auto">
          <div className="flex items-center gap-2.5 min-w-0 overflow-hidden pr-2">
            <span className="text-sky-400 font-bold select-none shrink-0 text-sm">
              $
            </span>
            <span className="text-slate-300 truncate select-all text-[11px] sm:text-xs font-mono">
              {INSTALL_CURL_COMMAND}
            </span>
          </div>
          <button
            type="button"
            onClick={copyInstallCommand}
            aria-label={
              copiedInstallCmd
                ? t.hero.copied
                : t.hero.copy
            }
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 text-xs font-sans font-semibold border border-white/[0.08]"
          >
            {copiedInstallCmd ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">{t.hero.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.hero.copy}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Central Floating Product Mockup */}
      <div className="relative z-20 mt-10 sm:mt-14">
        {/* Soft Aurora Glow behind the app window */}
        <div
          className="absolute -top-24 sm:-top-32 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 pointer-events-none -z-10 overflow-visible"
          aria-hidden="true"
        >
          <div className="horizon-glow w-[140%] -top-12 left-1/2 -translate-x-1/2" />
        </div>

        {/* The Window Component */}
        <ProductShowcase />
      </div>
    </section>
  );
};
