import React from 'react';
import { ExternalLink, ShieldCheck, Tag, GitCommit, GitPullRequest } from 'lucide-react';
import { FALLBACK_DEVLOGS } from '../data/devlogs';
import { RELEASES_URL } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

export const DevlogSection: React.FC = () => {
  const { t, language } = useLanguage();
  const latestRelease = FALLBACK_DEVLOGS[0] || {
    tag_name: 'v0.1.0',
    name: 'Initial Public Alpha (Rust Core & Tauri v2)',
    published_at: '2025-02-28T00:00:00Z',
    html_url: 'https://github.com/themistrinel/omnicmd/releases',
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const localeMap: Record<string, string> = {
        pt: 'pt-BR',
        en: 'en-US',
        es: 'es-ES',
      };
      return d.toLocaleDateString(localeMap[language] || 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="devlog" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08] relative z-10 font-sans">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 text-left">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.05] font-display">
            {t.devlogs.headline}
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-normal">
            {t.devlogs.subtitle}
          </p>
        </div>

        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold btn-secondary-obsidian transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>{t.devlogs.allReleases}</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Release Entry Ledger Card */}
      <div className="rounded-2xl hud-panel p-6 sm:p-8 space-y-6 font-mono shadow-2xl">
        {/* Release Meta Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.05] text-slate-200 border border-white/[0.1] text-xs font-bold font-mono">
              <Tag className="w-3 h-3 text-sky-400" />
              {latestRelease.tag_name}
            </span>
            <span className="text-sm font-bold text-white font-display">
              {latestRelease.name}
            </span>
            <span className="text-xs text-slate-500 hidden md:inline">
              // {formatDate(latestRelease.published_at)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-sans">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.devlogs.verified}</span>
            </span>
          </div>
        </div>

        {/* Technical Changes Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          {t.devlogs.changes.map((ch) => {
            return (
              <div key={ch.title} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <h4 className="font-bold text-white flex items-center gap-2 font-display">
                  <GitCommit className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  {ch.title}
                </h4>
                <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                  {ch.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Changelog footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 font-sans">
          <span className="flex items-center gap-1.5">
            <GitPullRequest className="w-3 h-3 text-slate-400" />
            <span>{t.devlogs.license}</span>
          </span>
          <a
            href={latestRelease.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:text-sky-300 hover:underline font-mono"
          >
            {t.devlogs.viewCommits}
          </a>
        </div>
      </div>
    </section>
  );
};
