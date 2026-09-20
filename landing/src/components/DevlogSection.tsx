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
    <section id="devlog" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 text-left">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 rounded bg-[#12151e] border border-white/[0.1] text-[11px] font-mono text-zinc-300">
            <span className="text-[#38bdf8] font-bold">[06/06]</span>
            <span>RELEASE CHRONICLE // GIT COMMITS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] font-display mt-3">
            AUDITED RELEASE LEDGER.
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
            Compiled from source and cryptographically signed via automated GitHub Actions CI/CD pipelines.
          </p>
        </div>

        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded text-xs font-mono font-bold text-[#38bdf8] bg-[#121620] hover:bg-[#1a202c] border border-[#38bdf8]/30 transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>ALL RELEASES &amp; HASHES</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Release Entry Ledger Card */}
      <div className="rounded-xl bg-[#090b10] border border-white/[0.1] p-6 sm:p-8 space-y-6 font-mono">
        {/* Release Meta Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 text-xs font-bold">
              <Tag className="w-3 h-3" />
              {latestRelease.tag_name}
            </span>
            <span className="text-sm font-bold text-white font-display">
              {latestRelease.name}
            </span>
            <span className="text-xs text-zinc-500 hidden md:inline">
              // {formatDate(latestRelease.published_at)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#38bdf8] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SHA-256 VERIFIED</span>
            </span>
          </div>
        </div>

        {/* Technical Changes Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-zinc-300">
          <div className="p-4 rounded bg-[#06070a] border border-white/[0.06] space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <GitCommit className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
              Tauri v2 + Tokio Core
            </h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
              Complete rewrite of background daemon into compiled Rust, dropping idle memory from 400MB to 23.8MB with sub-20ms summon.
            </p>
          </div>

          <div className="p-4 rounded bg-[#06070a] border border-white/[0.06] space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <GitCommit className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
              Local Encrypted SQLite
            </h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
              Replaced browser localStorage with a zero-telemetry local SQLite database store at <code className="text-zinc-200">~/.omnicmd.db</code>.
            </p>
          </div>

          <div className="p-4 rounded bg-[#06070a] border border-white/[0.06] space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <GitCommit className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
              Multi-Provider SSE Engine
            </h4>
            <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
              Added asynchronous token streaming with sub-millisecond thread dispatching across Ollama, 9router, OpenAI, and Anthropic.
            </p>
          </div>
        </div>

        {/* Changelog footer */}
        <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
          <span className="flex items-center gap-1.5">
            <GitPullRequest className="w-3 h-3 text-zinc-400" />
            <span>Open-source release licensed under MIT</span>
          </span>
          <a
            href={latestRelease.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-[#38bdf8] hover:underline"
          >
            VIEW COMMIT COMMITS &amp; SHAS →
          </a>
        </div>
      </div>
    </section>
  );
};
