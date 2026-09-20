import React, { useState } from 'react';
import { Database, Network, ShieldCheck, Gauge } from 'lucide-react';
import { BENCHMARK_ROWS } from '../constants';

export const BenchmarksSection: React.FC = () => {
  const [activeMetricIdx, setActiveMetricIdx] = useState(0);

  return (
    <section id="benchmarks" className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col gap-4 max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-white leading-tight">
          Engineered in Rust for zero background overhead.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Most desktop AI overlays bundle a full Chromium browser and Node runtime just to show an input field. OmniCmd uses a compiled Rust daemon with Tauri v2 to sleep at 0% CPU until summoned.
        </p>
      </div>

      {/* Asymmetric Architectural Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Large Telemetry Card (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
                <Gauge className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Telemetry Comparison</h3>
                <span className="text-[11px] text-slate-500 font-mono">OmniCmd vs Bundled Electron Clients</span>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
              Live Benchmark
            </span>
          </div>

          {/* Interactive Metric Switcher & Visual Bars */}
          <div className="space-y-4">
            {BENCHMARK_ROWS.map((row, idx) => {
              const isSelected = activeMetricIdx === idx;
              return (
                <div
                  key={row.metric}
                  onClick={() => setActiveMetricIdx(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.06] border-white/20 shadow-sm'
                      : 'bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {row.metric}
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold text-[11px]">
                      {row.advantage}
                    </span>
                  </div>

                  {/* Dual comparative meter */}
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-slate-500 shrink-0 text-[10px]">OmniCmd:</span>
                      <div className="flex-1 h-2 rounded-full bg-white/[0.05] overflow-hidden">
                        <div
                          className="h-full bg-sky-400 rounded-full transition-all duration-500"
                          style={{ width: idx === 0 ? '8%' : idx === 1 ? '5%' : idx === 2 ? '10%' : '12%' }}
                        />
                      </div>
                      <span className="text-white font-semibold w-16 text-right tabular-nums">{row.omniValue}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-20 text-slate-600 shrink-0 text-[10px]">Electron:</span>
                      <div className="flex-1 h-2 rounded-full bg-white/[0.05] overflow-hidden">
                        <div
                          className="h-full bg-slate-600 rounded-full"
                          style={{ width: idx === 0 ? '90%' : idx === 1 ? '85%' : idx === 2 ? '95%' : '80%' }}
                        />
                      </div>
                      <span className="text-slate-400 w-16 text-right tabular-nums">{row.electronValue}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-white/[0.04] flex items-center justify-between">
            <span>Kernel: Linux 6.8+ / macOS Sonoma 14+</span>
            <span className="text-slate-400">Target: zero context disruption</span>
          </div>
        </div>

        {/* Right Column Stack (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Vault Card */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between gap-4 flex-1">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
                  <Database className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Local Encrypted Vault</h3>
                  <span className="text-[11px] font-mono text-slate-500">~/.omnicmd.db</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prompt history, action templates, and token telemetry never leave your machine. Stored in a local embedded SQLite database with zero cloud synchronization, trackers, or external logging.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero Cloud Logging
              </span>
              <span className="text-slate-500">100% Offline-capable</span>
            </div>
          </div>

          {/* Network Card */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between gap-4 flex-1">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
                  <Network className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Direct Multi-Provider SSE</h3>
                  <span className="text-[11px] font-mono text-slate-500">Local &amp; Remote Endpoints</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect directly to OpenAI, Anthropic, Ollama, Groq, or 9router. The Rust core handles Server-Sent Events (SSE) streaming with sub-millisecond thread dispatching.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Protocol: Rust reqwest + tokio</span>
              <span className="text-sky-400 font-semibold">&lt; 0.8ms IPC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
