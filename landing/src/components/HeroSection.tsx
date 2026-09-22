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
import {
  StarBorder,
  Magnet,
  ShinyText,
  SpotlightCard,
  ClickSpark,
} from './reactbits';

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

  const compactBadge =
    detectedOS === 'linux'
      ? '.deb / .AppImage'
      : detectedOS === 'windows'
        ? '.msi / .exe'
        : '.dmg';

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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-xs font-sans text-slate-300 shadow-sm mx-auto hover:border-white/[0.16] transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
          </span>
          <span className="font-medium tracking-wide">
            {t.hero.badgeRuntime} <span className="font-mono text-slate-400">v0.1.0</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="hidden sm:inline font-normal">
            <ShinyText text={t.hero.badgeZeroCloud} color="#94a3b8" shineColor="#38bdf8" speed="3.5s" />
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-extrabold tracking-[-0.035em] text-white font-display leading-[1.04]">
          {t.hero.headline}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
          {t.hero.subtitle}
        </p>

        {/* Direct Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-xl mx-auto">
          {/* Primary Tactical StarBorder Button with Magnet */}
          <Magnet padding={50} magnetStrength={3} wrapperClassName="w-full sm:w-auto">
            <ClickSpark sparkColor="#38bdf8" sparkSize={7} sparkRadius={22}>
              <StarBorder
                as="a"
                href={downloadInfo.url}
                color="#38bdf8"
                speed="3.5s"
                thickness={1}
                backgroundColor="rgba(8, 12, 19, 0.96)"
                borderColor="rgba(255, 255, 255, 0.12)"
                innerClassName="px-6 py-3.5 flex items-center justify-center gap-3 bg-gradient-to-b from-sky-500/10 via-[#0a0e17]/95 to-[#06080e] hover:from-sky-500/20 hover:border-sky-400/50 hover:shadow-[0_0_32px_-4px_rgba(56,189,248,0.35)] transition-all duration-300 cursor-pointer"
                className="w-full sm:w-auto shadow-lg shadow-black/40 hover:scale-[1.02] transition-transform duration-200"
              >
                <Download className="w-4 h-4 text-sky-400 stroke-[2.5] shrink-0 transition-transform group-hover:translate-y-0.5" />
                <span className="font-semibold text-white tracking-tight text-sm">
                  {t.hero.downloadBtn} {downloadInfo.osName}
                </span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-sky-400/10 border border-sky-400/25 text-sky-300">
                  {compactBadge}
                </span>
              </StarBorder>
            </ClickSpark>
          </Magnet>

          {/* GitHub Source Link with Magnet */}
          <Magnet padding={50} magnetStrength={3} wrapperClassName="w-full sm:w-auto">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 btn-secondary-obsidian font-sans text-sm cursor-pointer select-none group border border-white/[0.1] hover:border-white/[0.22] hover:bg-white/[0.08]"
            >
              <GithubIcon className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
              <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                {t.hero.githubRepo}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </a>
          </Magnet>
        </div>

        {/* Terminal cURL Bootstrap Box with SpotlightCard */}
        <SpotlightCard
          spotlightColor="rgba(56, 189, 248, 0.18)"
          spotlightSize={320}
          className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto rounded-xl bg-[#0c0e14]/90 border border-white/[0.08] hover:border-sky-500/30 text-xs shadow-inner backdrop-blur-sm transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-3 px-3.5 py-2">
            <div className="flex items-center gap-2 min-w-0 overflow-hidden pr-1">
              <span className="text-sky-400 font-bold select-none shrink-0 text-xs font-mono">
                $
              </span>
              <span className="text-slate-300 truncate select-all text-[11px] sm:text-[11.5px] font-mono tracking-tight">
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
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-all cursor-pointer shrink-0 text-xs font-sans font-semibold border border-white/[0.08] active:scale-95"
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
        </SpotlightCard>

        {/* Tactile Hotkey Indicator & All Platforms Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 max-w-2xl mx-auto text-xs text-slate-400">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-sans text-slate-400 shrink-0">
            <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px] font-mono">
              {t.hero.globalHotkey}
            </span>
            <div className="flex items-center gap-1 font-mono">
              <span className="pbt-keycap phosphor-active text-[10px] px-1.5 py-0.5">
                {hotkeyModifier}
              </span>
              <span className="text-slate-500 text-xs font-bold">+</span>
              <span className="pbt-keycap phosphor-active text-[10px] px-1.5 py-0.5">
                Space
              </span>
            </div>
          </div>

          <span className="text-slate-700 hidden sm:inline">•</span>

          <a
            href="#downloads"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-300 transition-colors group"
          >
            <span className="underline decoration-slate-700 group-hover:decoration-sky-400 underline-offset-4">
              {t.hero.otherPlatforms || 'Ver todos os sistemas (macOS, Windows, Linux)'}
            </span>
          </a>
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
