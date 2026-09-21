import React, { useState } from 'react';
import { Download, Copy, Check, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { DownloadInfo, OSPlatform } from '../types';
import { GITHUB_URL, INSTALL_CURL_COMMAND } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

interface CtaSectionProps {
  detectedOS: OSPlatform;
  downloadInfo: DownloadInfo;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ downloadInfo }) => {
  const { t } = useLanguage();
  const [copiedInstallCmd, setCopiedInstallCmd] = useState(false);

  const copyInstallCommand = () => {
    navigator.clipboard?.writeText(INSTALL_CURL_COMMAND);
    setCopiedInstallCmd(true);
    setTimeout(() => setCopiedInstallCmd(false), 2000);
  };

  return (
    <section className="py-24 lg:py-36 max-w-7xl mx-auto px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Main Closing Container */}
      <div className="relative z-10 rounded-2xl hud-panel p-8 sm:p-16 text-center flex flex-col items-center gap-6 overflow-hidden shadow-2xl">
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-sans text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>{t.cta.badge}</span>
          </div>

          {/* Clean Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] text-white leading-[1.08] font-display whitespace-pre-line">
            {t.cta.headline}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto font-normal">
            {t.cta.subtitle}
          </p>
        </div>

        {/* Action cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg pt-2 font-sans">
          <a
            href={downloadInfo.url}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 btn-primary-azure font-bold text-sm cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>{t.cta.downloadFor} {downloadInfo.osName}</span>
          </a>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 btn-secondary-obsidian text-sm font-medium transition-all cursor-pointer"
          >
            <GithubIcon className="w-4 h-4 text-slate-400" />
            <span>{t.cta.githubRepo}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        {/* Terminal Bootstrap Box */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-[#0c0e14] border border-white/[0.08] text-xs text-slate-200 max-w-md w-full shadow-inner mt-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 pr-2 font-mono">
            <span className="text-sky-400 font-bold select-none shrink-0">$</span>
            <span className="select-all text-slate-300 truncate">{INSTALL_CURL_COMMAND}</span>
          </div>
          <button
            type="button"
            onClick={copyInstallCommand}
            aria-label="Copy terminal install command"
            className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 border border-white/[0.08] font-sans font-semibold text-xs flex items-center gap-1.5"
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
    </section>
  );
};
