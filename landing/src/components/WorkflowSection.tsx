import React from 'react';
import { ArrowRight, Zap, Sparkles, CornerDownLeft } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/[0.06]">
      <div className="flex flex-col gap-4 max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-white leading-tight">
          The three-keystroke cadence.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Zero mouse navigation. Zero window switching. Designed for developers whose hands never leave the home row.
        </p>
      </div>

      {/* 3-Step Flow Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
        {/* Step 1 */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between gap-6 relative group hover:border-white/20 transition-all">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-300 font-mono text-xs font-semibold flex items-center justify-center">
                1
              </span>
              <div className="flex items-center gap-1 font-mono text-xs">
                <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-white">Super</kbd>
                <span className="text-slate-600">+</span>
                <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-white">Space</kbd>
              </div>
            </div>

            <h3 className="text-base font-semibold text-white tracking-tight">
              Summon &amp; Ingest
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Highlight code, logs, or error stacks in your editor or terminal. Press the global shortcut. OmniCmd appears in 18ms and ingests clipboard content without minimizing your active window.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] font-mono text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              Wake response:
            </span>
            <span className="text-emerald-400 font-semibold tabular-nums">18ms overlay</span>
          </div>

          <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0a0c12] border border-white/10 items-center justify-center text-slate-500 z-10">
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between gap-6 relative group hover:border-white/20 transition-all">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-300 font-mono text-xs font-semibold flex items-center justify-center">
                2
              </span>
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-sky-300 font-semibold">#1..5</kbd>
                <span className="text-slate-600">or</span>
                <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-indigo-300 font-semibold">Alt+1..4</kbd>
              </div>
            </div>

            <h3 className="text-base font-semibold text-white tracking-tight">
              Dispatch Action or Persona
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Press <code className="text-sky-300 font-mono text-[11px]">#1</code> to explain code, <code className="text-sky-300 font-mono text-[11px]">#2</code> to refine prompts, or <code className="text-sky-300 font-mono text-[11px]">#3</code> to translate text. Switch personas with <code className="text-indigo-300 font-mono text-[11px]">Alt+1..4</code> without touching the mouse.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] font-mono text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Ergonomics:
            </span>
            <span className="text-slate-300">Vim keys (Ctrl+j/k)</span>
          </div>

          <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0a0c12] border border-white/10 items-center justify-center text-slate-500 z-10">
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between gap-6 relative group hover:border-white/20 transition-all">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-300 font-mono text-xs font-semibold flex items-center justify-center">
                3
              </span>
              <kbd className="keycap-3d px-2.5 py-0.5 rounded bg-[#161a23] text-emerald-400 font-mono text-xs font-semibold">
                Enter ↵
              </kbd>
            </div>

            <h3 className="text-base font-semibold text-white tracking-tight">
              Stream Output &amp; Copy to Buffer
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Read real-time token streaming. Press <code className="text-emerald-300 font-mono text-[11px]">Enter</code> to copy the output buffer directly into your clipboard, or press <code className="text-slate-400 font-mono text-[11px]">Esc</code> to dismiss the overlay.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] font-mono text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <CornerDownLeft className="w-3.5 h-3.5 text-emerald-400" />
              Focus preservation:
            </span>
            <span className="text-emerald-400 font-semibold">Preserves active editor window</span>
          </div>
        </div>
      </div>
    </section>
  );
};
