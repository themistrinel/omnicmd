import React from 'react';
import { ExternalLink, ShieldCheck, Tag, GitCommit } from 'lucide-react';
import { FALLBACK_DEVLOGS } from '../data/devlogs';

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
    <section id="devlog" className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/[0.06]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-[-0.03em] leading-tight">
            Release chronicle.
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Compiled from source with automated GitHub Actions. Every binary is cryptographically signed.
          </p>
        </div>

        <a
          href="https://github.com/themistrinel/omnicmd/releases"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-mono text-sky-400 bg-sky-500/10 hover:bg-sky-500/15 border border-sky-500/20 transition-all shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>All Releases</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Distilled Latest Release Card */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-300 border border-sky-500/20 font-mono text-xs font-semibold">
              <Tag className="w-3 h-3" />
              {latestRelease.tag_name}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {formatDate(latestRelease.published_at)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SHA-256 Verified Binaries</span>
            </span>
          </div>
        </div>

        <div className="pt-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div>
            <h4 className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5 text-sky-400" />
              Tauri v2 + Tokio Daemon
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Complete rewrite of background overlay architecture into compiled Rust, dropping idle memory from 400MB to 24MB.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5 text-sky-400" />
              Local Encrypted SQLite
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Replaced browser localStorage with zero-telemetry local SQLite database store at <code className="text-slate-300 font-mono">~/.omnicmd.db</code>.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5 text-sky-400" />
              Multi-Provider SSE Engine
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Added asynchronous token streaming with sub-millisecond thread dispatching across OpenAI, Anthropic, and local Ollama.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
