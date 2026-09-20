import React from 'react';
import { Database, Network, ShieldCheck, HardDrive, CheckCircle2 } from 'lucide-react';

export const BenchmarksSection: React.FC = () => {
  return (
    <section id="architecture" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 rounded bg-[#12151e] border border-white/[0.1] text-[11px] font-mono text-zinc-300">
          <span className="text-[#38bdf8] font-bold">[03/06]</span>
          <span>HARDWARE PROFILER // RUST VS ELECTRON</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] font-display">
          COMPILED RUST DAEMON. ZERO BROWSER TAX.
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
          Most modern command palettes are Electron web wrappers disguised as desktop apps, consuming half a gigabyte of RAM. OmniCmd is compiled to machine code with Tauri v2 and sleeps at 0.0% CPU.
        </p>
      </div>

      {/* Profiler Ledger Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left (7 Cols): Visual Hardware Comparison Profiler */}
        <div className="lg:col-span-7 rounded-xl bg-[#090b10] border border-white/[0.1] p-6 sm:p-8 font-mono">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
              <span className="font-bold text-white tracking-wider">HARDWARE TELEMETRY PROFILER</span>
            </div>
            <span className="text-zinc-500 text-[11px]">x86_64 Linux // Wayland Native</span>
          </div>

          {/* Metric 1: Memory Footprint */}
          <div className="space-y-3 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-bold">01 // IDLE RAM CONSUMPTION</span>
              <span className="text-[#38bdf8] font-bold">-95% OVERHEAD</span>
            </div>

            {/* OmniCmd Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span className="text-[#38bdf8] font-bold">OmniCmd (Rust + Tauri v2)</span>
                <span className="text-[#38bdf8] font-bold">23.8 MB</span>
              </div>
              <div className="w-full h-3 rounded-xs bg-[#12151e] overflow-hidden p-0.5 border border-white/[0.05]">
                <div className="h-full rounded-xs bg-[#38bdf8] w-[5%]" />
              </div>
            </div>

            {/* Electron Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-zinc-500">
                <span>Standard Electron Palette</span>
                <span className="text-zinc-400">480.0 MB</span>
              </div>
              <div className="w-full h-3 rounded-xs bg-[#12151e] overflow-hidden p-0.5 border border-white/[0.05]">
                <div className="h-full rounded-xs bg-zinc-600 w-[100%]" />
              </div>
            </div>
          </div>

          {/* Metric 2: Cold Hotkey Summon */}
          <div className="space-y-3 py-6 border-b border-white/[0.06]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-bold">02 // COLD SUMMON LATENCY</span>
              <span className="text-[#38bdf8] font-bold">52x FASTER</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span className="text-[#38bdf8] font-bold">OmniCmd (Native OS Handle)</span>
                <span className="text-[#38bdf8] font-bold">18 ms</span>
              </div>
              <div className="w-full h-3 rounded-xs bg-[#12151e] overflow-hidden p-0.5 border border-white/[0.05]">
                <div className="h-full rounded-xs bg-[#38bdf8] w-[2%]" />
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-zinc-500">
                <span>Electron Window Grab</span>
                <span className="text-zinc-400">940 ms</span>
              </div>
              <div className="w-full h-3 rounded-xs bg-[#12151e] overflow-hidden p-0.5 border border-white/[0.05]">
                <div className="h-full rounded-xs bg-zinc-600 w-[95%]" />
              </div>
            </div>
          </div>

          {/* Metric 3: Binary Footprint */}
          <div className="space-y-3 pt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-bold">03 // INSTALLER / BINARY PAYLOAD</span>
              <span className="text-zinc-400 font-bold">ZERO CHROMIUM BUNDLED</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-3 rounded bg-[#06070a] border border-[#38bdf8]/20 space-y-1">
                <span className="text-zinc-500 text-[10px] block">OMNICMD BINARY</span>
                <span className="text-lg font-bold text-[#38bdf8]">12.4 MB</span>
                <span className="text-[10px] text-zinc-400 block font-sans">Single compiled ELF / Mach-O</span>
              </div>

              <div className="p-3 rounded bg-[#06070a] border border-white/[0.05] space-y-1">
                <span className="text-zinc-500 text-[10px] block">ELECTRON APP</span>
                <span className="text-lg font-bold text-zinc-300">185.0 MB</span>
                <span className="text-[10px] text-zinc-500 block font-sans">Embedded Chrome + Node runtime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right (5 Cols): The Architectural Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-4 font-mono">
          {/* Pillar 1: Local SQLite Vault */}
          <div className="p-6 rounded-xl bg-[#090b10] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Database className="w-4 h-4 text-[#38bdf8]" />
                <h3 className="text-xs font-bold font-mono tracking-wider">LOCAL SQLITE VAULT</h3>
              </div>
              <span className="text-[10px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/30 px-1.5 py-0.5 rounded">
                AIR-GAPPED
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              All token logs, custom actions, and output history persist inside an embedded SQLite store at <code className="text-zinc-200 font-mono">~/.omnicmd.db</code>. No remote telemetry, no analytics beacons, zero cloud dependencies.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Full local FTS5 indexing &amp; query history</span>
            </div>
          </div>

          {/* Pillar 2: Tokio Async Event Daemon */}
          <div className="p-6 rounded-xl bg-[#090b10] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Network className="w-4 h-4 text-[#38bdf8]" />
                <h3 className="text-xs font-bold font-mono tracking-wider">TOKIO ASYNC IPC CORE</h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-1.5 py-0.5 rounded">
                &lt; 0.8ms IPC
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Sub-millisecond IPC serialization connects the webview to Rust background worker threads. Server-Sent Events (SSE) stream tokens without blocking UI responsiveness or keyboard input.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-zinc-500">
              <HardDrive className="w-3.5 h-3.5 text-zinc-400" />
              <span>Zero thread contention on hotkey daemon</span>
            </div>
          </div>

          {/* Pillar 3: Multi-Provider Hybrid */}
          <div className="p-6 rounded-xl bg-[#090b10] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />
                <h3 className="text-xs font-bold font-mono tracking-wider">MULTI-PROVIDER RUNTIME</h3>
              </div>
              <span className="text-[10px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/30 px-1.5 py-0.5 rounded">
                HYBRID
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Switch seamlessly between local Ollama endpoints (100% private, offline inference) and remote high-throughput providers (9router, OpenAI, Anthropic) with the <code className="text-zinc-200 font-mono">/provider</code> hotkey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
