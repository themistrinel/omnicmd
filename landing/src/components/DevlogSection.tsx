import React from 'react';
import { ExternalLink, ShieldCheck, Tag, GitCommit, GitPullRequest } from 'lucide-react';
import { FALLBACK_DEVLOGS } from '../data/devlogs';
import { RELEASES_URL } from '../constants';

export const DevlogSection: React.FC = () => {
  const latestRelease = FALLBACK_DEVLOGS[0] || {
    tag_name: 'v0.1.0',
    name: 'Initial Public Alpha (Rust Core & Tauri v2)',
    published_at: '2025-02-28T00:00:00Z',
    html_url: 'https://github.com/themistrinel/omnicmd/releases',
  };

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
    <section id="devlog" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-sky-500/15 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 text-left">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full neon-pill text-xs font-mono text-sky-200">
            <span className="text-cyan-400 font-bold">[06/06]</span>
            <span>RELEASE CHRONICLE // GIT COMMITS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] font-display mt-3">
            AUDITED RELEASE LEDGER.
          </h2>
          <p className="mt-2 text-sky-200/70 text-sm sm:text-base leading-relaxed font-sans">
            Compiled from source and cryptographically signed via automated GitHub Actions CI/CD pipelines.
          </p>
        </div>

        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold text-sky-200 bg-[#081430] hover:bg-[#0c1f4d] border border-sky-500/30 transition-all shrink-0 self-start sm:self-auto cursor-pointer shadow-sm"
        >
          <span>ALL RELEASES &amp; HASHES</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </a>
      </div>

      {/* Release Entry Ledger Card (Wope Style) */}
      <div className="rounded-2xl bg-[#060f24]/80 border border-sky-500/20 backdrop-blur-xl p-6 sm:p-8 space-y-6 font-mono shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Release Meta Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-500/15">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
              <Tag className="w-3 h-3" />
              {latestRelease.tag_name}
            </span>
            <span className="text-sm font-bold text-white font-display">
              {latestRelease.name}
            </span>
            <span className="text-xs text-sky-400/60 hidden md:inline">
              // {formatDate(latestRelease.published_at)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SHA-256 VERIFIED</span>
            </span>
          </div>
        </div>

        {/* Technical Changes Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-sky-200">
          <div className="p-4 rounded-xl bg-[#040a1c] border border-sky-500/15 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <GitCommit className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              Tauri v2 + Tokio Core
            </h4>
            <p className="text-sky-200/70 text-[11px] leading-relaxed font-sans">
              Complete rewrite of background daemon into compiled Rust, dropping idle memory from 400MB to 23.8MB with sub-20ms summon.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#040a1c] border border-sky-500/15 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <GitCommit className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              Local Encrypted SQLite
            </h4>
            <p className="text-sky-200/70 text-[11px] leading-relaxed font-sans">
              Replaced browser localStorage with a zero-telemetry local SQLite database store at <code className="text-sky-200">~/.omnicmd.db</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#040a1c] border border-sky-500/15 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <GitCommit className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              Multi-Provider SSE Engine
            </h4>
            <p className="text-sky-200/70 text-[11px] leading-relaxed font-sans">
              Added asynchronous token streaming with sub-millisecond thread dispatching across Ollama, 9router, OpenAI, and Anthropic.
            </p>
          </div>
        </div>

        {/* Changelog footer */}
        <div className="pt-4 border-t border-sky-500/10 flex items-center justify-between text-[11px] text-sky-300/60">
          <span className="flex items-center gap-1.5">
            <GitPullRequest className="w-3 h-3 text-sky-400" />
            <span>Open-source release licensed under MIT</span>
          </span>
          <a
            href={latestRelease.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline"
          >
            VIEW COMMIT COMMITS &amp; SHAS →
          </a>
        </div>
      </div>
    </section>
  );
};
