import React, { useState } from 'react';
import { Terminal, Apple, Monitor, Check, Copy, Code2, Download, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { OSPlatform, PlatformDownloadLinks } from '../types';
import { BUILD_FROM_SOURCE_COMMAND, INSTALL_CURL_COMMAND, RELEASES_URL } from '../constants';
import { getDefaultDownloadLinks } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';

interface DownloadSectionProps {
  detectedOS: OSPlatform;
  downloadLinks?: PlatformDownloadLinks;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ detectedOS, downloadLinks }) => {
  const { t } = useLanguage();
  const [selectedOS, setSelectedOS] = useState<OSPlatform | 'source'>(detectedOS);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const links = downloadLinks || getDefaultDownloadLinks();

  const copyCommand = (cmd: string, key: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="downloads" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08] relative z-10 font-sans">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.05] font-display">
          {t.downloads.headline}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-normal">
          {t.downloads.subtitle}
        </p>
      </div>

      {/* Main Download Console */}
      <div className="rounded-2xl hud-panel p-6 sm:p-8 font-sans shadow-2xl">
        {/* OS Platform Tabs */}
        <div
          role="tablist"
          aria-label="Target operating system selection"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/[0.06]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'linux'}
            onClick={() => setSelectedOS('linux')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer shrink-0 ${
              selectedOS === 'linux'
                ? 'bg-white/[0.10] text-white border border-white/[0.15] font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent font-medium'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.downloads.tabs.linux}</span>
            {detectedOS === 'linux' && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-300 font-bold font-mono">
                {t.downloads.tabs.detected}
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'mac'}
            onClick={() => setSelectedOS('mac')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer shrink-0 ${
              selectedOS === 'mac'
                ? 'bg-white/[0.10] text-white border border-white/[0.15] font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent font-medium'
            }`}
          >
            <Apple className="w-3.5 h-3.5 text-slate-300" />
            <span>{t.downloads.tabs.mac}</span>
            {detectedOS === 'mac' && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-300 font-bold font-mono">
                {t.downloads.tabs.detected}
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'windows'}
            onClick={() => setSelectedOS('windows')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer shrink-0 ${
              selectedOS === 'windows'
                ? 'bg-white/[0.10] text-white border border-white/[0.15] font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent font-medium'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-slate-300" />
            <span>{t.downloads.tabs.windows}</span>
            {detectedOS === 'windows' && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-300 font-bold font-mono">
                {t.downloads.tabs.detected}
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'source'}
            onClick={() => setSelectedOS('source')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer shrink-0 ${
              selectedOS === 'source'
                ? 'bg-white/[0.10] text-white border border-white/[0.15] font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent font-medium'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.downloads.tabs.source}</span>
          </button>
        </div>

        {/* Tab 1: Linux Details */}
        {selectedOS === 'linux' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  {t.downloads.linux.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-sans">
                  {t.downloads.linux.desc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={links.linuxDeb}
                  className="flex items-center gap-2 px-5 py-2.5 btn-primary-azure font-bold text-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{t.downloads.linux.btnDeb}</span>
                </a>
                <a
                  href={links.linuxAppImage}
                  className="flex items-center gap-2 px-4 py-2.5 btn-secondary-obsidian text-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.downloads.linux.btnAppImage}</span>
                </a>
              </div>
            </div>

            {/* Quick 1-Liner Shell Snippet */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-sans">
                {t.downloads.linux.quickInstall}
              </span>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0c0e14] border border-white/[0.08] text-xs text-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-3 font-mono">
                  <span className="text-sky-400 font-bold select-none">$</span>
                  <span className="select-all text-slate-200">{INSTALL_CURL_COMMAND}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCommand(INSTALL_CURL_COMMAND, 'curl-linux')}
                  aria-label="Copy Linux curl install command"
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 border border-white/[0.08]"
                >
                  {copiedKey === 'curl-linux' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Hyprland Rules Snippet */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-sans">
                {t.downloads.linux.hyprlandTitle}
              </span>
              <pre className="p-3.5 rounded-xl bg-[#0c0e14] border border-white/[0.08] font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`# Floating overlay configuration without tiling splits
windowrulev2 = float, class:^(omnicmd)$
windowrulev2 = center, class:^(omnicmd)$
windowrulev2 = size 800 560, class:^(omnicmd)$
windowrulev2 = noborder, class:^(omnicmd)$
windowrulev2 = stayfocused, class:^(omnicmd)$`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: macOS Details */}
        {selectedOS === 'mac' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  {t.downloads.mac.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-sans">
                  {t.downloads.mac.desc}
                </p>
              </div>

              <a
                href={links.macDmg}
                className="flex items-center gap-2 px-6 py-2.5 btn-primary-azure font-bold text-xs cursor-pointer self-start lg:self-auto"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{t.downloads.mac.btnDmg}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <span className="text-white font-bold flex items-center gap-1.5 font-sans">
                  <Apple className="w-3.5 h-3.5 text-slate-400" />
                  {t.downloads.mac.permTitle}
                </span>
                <p className="text-[11px] leading-relaxed font-sans text-slate-400">
                  {t.downloads.mac.permDesc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <span className="text-white font-bold flex items-center gap-1.5 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {t.downloads.mac.localTitle}
                </span>
                <p className="text-[11px] leading-relaxed font-sans text-slate-400">
                  {t.downloads.mac.localDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Windows Details */}
        {selectedOS === 'windows' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  {t.downloads.windows.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-sans">
                  {t.downloads.windows.desc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={links.windowsMsi}
                  className="flex items-center gap-2 px-5 py-2.5 btn-primary-azure font-bold text-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{t.downloads.windows.btnMsi}</span>
                </a>
                <a
                  href={links.windowsExe}
                  className="flex items-center gap-2 px-4 py-2.5 btn-secondary-obsidian text-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.downloads.windows.btnZip}</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-2">
              <span className="text-white font-bold block font-sans">{t.downloads.windows.trayTitle}</span>
              <p className="text-[11px] font-sans leading-relaxed text-slate-400">
                {t.downloads.windows.trayDesc}
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Build from Source */}
        {selectedOS === 'source' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                {t.downloads.source.title}
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                {t.downloads.source.desc}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-sans">
                {t.downloads.source.pipeline}
              </span>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0c0e14] border border-white/[0.08] text-xs text-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-3 font-mono">
                  <span className="text-sky-400 font-bold select-none">$</span>
                  <span className="select-all text-slate-200">{BUILD_FROM_SOURCE_COMMAND}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCommand(BUILD_FROM_SOURCE_COMMAND, 'source-build')}
                  aria-label="Copy build from source command"
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 border border-white/[0.08]"
                >
                  {copiedKey === 'source-build' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Releases link footer */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2 font-sans">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.downloads.checksum}</span>
          </div>

          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 hover:underline"
          >
            <span>{t.downloads.viewAll}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
