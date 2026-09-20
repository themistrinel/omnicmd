import React from 'react';
import { Database, Network, ShieldCheck, Cpu } from 'lucide-react';
import { BENCHMARK_ROWS } from '../constants';

export const BenchmarksSection: React.FC = () => {
  return (
    <section id="benchmarks" className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/[0.06]">
      <div className="flex flex-col gap-3 max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-white leading-tight">
          Zero background overhead. Compiled Rust core.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          OmniCmd uses a compiled Rust daemon with Tauri v2 to sleep at 0% CPU until summoned. No bundled Chromium browser, no Node runtime.
        </p>
      </div>

      {/* Architecture Ledger & Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Comparative Spec Table (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-7">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-semibold text-white">Runtime Telemetry</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Benchmark vs Electron</span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {BENCHMARK_ROWS.map((row) => (
              <div key={row.metric} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-medium text-slate-200">{row.metric}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{row.advantage}</div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <div className="text-right">
                    <span className="text-emerald-400 font-semibold">{row.omniValue}</span>
                    <span className="text-[10px] text-slate-400 block">OmniCmd</span>
                  </div>
                  <span className="text-slate-400">/</span>
                  <div className="text-right">
                    <span className="text-slate-300">{row.electronValue}</span>
                    <span className="text-[10px] text-slate-400 block">Electron</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Foundations (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Vault */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white">
              <Database className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold">Local Encrypted Vault</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prompt history, custom actions, and token metrics stay in an embedded SQLite database at <code className="text-slate-300 font-mono">~/.omnicmd.db</code> with zero cloud telemetry.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Offline-capable</span>
            </div>
          </div>

          {/* SSE Network Core */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white">
              <Network className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold">Direct Streaming Core</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sub-millisecond IPC connects directly to Ollama, Anthropic, OpenAI, or custom endpoints with asynchronous SSE token streaming.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-400">
              Protocol: <span className="text-slate-300">Tokio + Reqwest native async</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
