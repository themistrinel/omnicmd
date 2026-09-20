import React, { useState } from 'react';
import { Tag, Calendar, ChevronRight, GitCommit, ExternalLink, ShieldCheck } from 'lucide-react';
import { DevlogRelease } from '../types';
import { FALLBACK_DEVLOGS } from '../data/devlogs';
import { MarkdownView } from './MarkdownView';

export const DevlogSection: React.FC = () => {
  const [releases] = useState<DevlogRelease[]>(FALLBACK_DEVLOGS);
  const [selectedTag, setSelectedTag] = useState<string>(FALLBACK_DEVLOGS[0]?.tag_name || 'v0.1.0');

  const activeRelease = releases.find((r) => r.tag_name === selectedTag) || releases[0];

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="devlog" className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/[0.06]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-[-0.03em] leading-tight">
            Devlog &amp; Releases
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Transparent engineering chronicle. Every build, optimization, and native binary release delivered automatically via the Tauri updater pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Signed Binaries</span>
          </span>
          <a
            href="https://github.com/omnicmd/omnicmd/releases"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-sky-400 bg-sky-500/10 hover:bg-sky-500/15 border border-sky-500/25 transition-all"
          >
            <span>GitHub Releases</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Master-Detail Devlog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Release Version Sidebar */}
        <div className="lg:col-span-4 space-y-2.5">
          {releases.map((release) => {
            const isSelected = release.tag_name === selectedTag;
            return (
              <button
                key={release.id}
                type="button"
                onClick={() => setSelectedTag(release.tag_name)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-white/[0.06] border-white/25 shadow-sm'
                    : 'bg-white/[0.01] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className={`font-mono text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {release.tag_name}
                    </span>
                    {release.prerelease && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Pre-release
                      </span>
                    )}
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-white translate-x-0.5' : 'text-slate-600'}`} />
                </div>

                <span className="text-xs text-slate-300 line-clamp-1 font-medium">
                  {release.name || release.tag_name}
                </span>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono pt-1 border-t border-white/[0.04]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(release.published_at)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <GitCommit className="w-3 h-3" />
                    Rust 1.77+
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Release Detail Viewer */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 sm:p-7 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-semibold text-sky-400 px-2.5 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20">
                  {activeRelease.tag_name}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {formatDate(activeRelease.published_at)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight mt-1">
                {activeRelease.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SHA-256 Verified</span>
              </span>
            </div>
          </div>

          {/* Release Notes Markdown Viewer */}
          <div className="text-slate-300 text-xs sm:text-sm leading-relaxed max-h-96 overflow-y-auto pr-2">
            <MarkdownView content={activeRelease.body} />
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-slate-500">
            <span>Automated release pipeline via GitHub Actions</span>
            <a
              href={activeRelease.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
            >
              <span>View Source Diff</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
