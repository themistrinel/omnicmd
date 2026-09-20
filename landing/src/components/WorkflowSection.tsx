import React from 'react';
import { Zap, CornerDownLeft, Sparkles, Terminal } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  return (
    <section id="cadence" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 rounded bg-[#12151e] border border-white/[0.1] text-[11px] font-mono text-zinc-300">
          <span className="text-[#38bdf8] font-bold">[02/06]</span>
          <span>ERGONOMICS // THE ZERO-SWITCH PIPELINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] font-display">
          THREE KEYSTROKES. ZERO MOUSE.
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
          Eliminate the cognitive disruption of alt-tabbing to a browser window, copy-pasting code, and waiting for an AI web chat. The pipeline lives on your home row.
        </p>
      </div>

      {/* Industrial Sequential Pipeline */}
      <div className="relative rounded-xl bg-[#090b10] border border-white/[0.1] overflow-hidden mb-12 font-mono">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          {/* Phase 01 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[#0d1017] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#38bdf8] font-bold">STAGE 01 // INGEST</span>
                <span className="text-zinc-600">18ms</span>
              </div>

              <div className="flex items-center gap-1.5 py-1">
                <span className="pbt-keycap phosphor-active">Super</span>
                <span className="text-zinc-600 font-mono text-xs">+</span>
                <span className="pbt-keycap phosphor-active">Space</span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight font-display">
                Contextual Snapshot
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Highlight an unresolved compiler diagnostic, complex regex, or SQL table schema in your IDE. Press the global hotkey. OmniCmd wakes over your active editor with the buffer pre-loaded.
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.04] text-[11px] text-zinc-500 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Native focus grab without tiling reflow</span>
            </div>
          </div>

          {/* Phase 02 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[#0d1017] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#38bdf8] font-bold">STAGE 02 // DISPATCH</span>
                <span className="text-zinc-600">&lt; 1ms</span>
              </div>

              <div className="flex items-center gap-1.5 py-1">
                <span className="pbt-keycap phosphor-active">#1..#9</span>
                <span className="text-zinc-600 text-xs">or</span>
                <span className="pbt-keycap">/cmd</span>
                <span className="text-zinc-600 text-xs">or</span>
                <span className="pbt-keycap">@agent</span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight font-display">
                Single-Stroke Execution
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Trigger directives with direct numeric keycaps (#1 for explain, #2 for commit, #3 for SQL optimize). Route complex problems to specialized personas with dedicated system directives.
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.04] text-[11px] text-zinc-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Vim navigation: Ctrl + j / k</span>
            </div>
          </div>

          {/* Phase 03 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[#0d1017] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#38bdf8] font-bold">STAGE 03 // INJECT</span>
                <span className="text-zinc-600">Direct</span>
              </div>

              <div className="flex items-center gap-1.5 py-1">
                <span className="pbt-keycap phosphor-active text-[#38bdf8]">Enter ↵</span>
                <span className="text-zinc-600 text-xs">or</span>
                <span className="pbt-keycap">Esc</span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight font-display">
                Buffer Return
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Tokens stream in real-time from your local Ollama or cloud model. Press Enter to write formatted markdown/code directly into your clipboard, or Esc to dismiss and return focus instantly.
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.04] text-[11px] text-zinc-500 flex items-center gap-1.5">
              <CornerDownLeft className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Instant return to active editor window</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tactile Keybinding Reference Ledger */}
      <div className="rounded-xl bg-[#090b10] border border-white/[0.1] p-6 sm:p-8 font-mono">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#38bdf8]" />
            <h3 className="text-xs font-bold text-white tracking-wider">TACTILE KEYBOARD MATRIX</h3>
          </div>
          <span className="text-[11px] text-zinc-500">Universal Home-Row Navigation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded bg-[#050608] border border-white/[0.06]">
            <span className="text-zinc-400">Summon / Hide</span>
            <div className="flex items-center gap-1">
              <span className="pbt-keycap text-[10px]">Super</span>
              <span className="text-zinc-600">+</span>
              <span className="pbt-keycap text-[10px]">Space</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-[#050608] border border-white/[0.06]">
            <span className="text-zinc-400">Vim Traverse</span>
            <div className="flex items-center gap-1">
              <span className="pbt-keycap text-[10px]">Ctrl</span>
              <span className="text-zinc-600">+</span>
              <span className="pbt-keycap text-[10px]">j / k</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-[#050608] border border-white/[0.06]">
            <span className="text-zinc-400">Run Action</span>
            <span className="pbt-keycap phosphor-active text-[10px]">#1 .. #9</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-[#050608] border border-white/[0.06]">
            <span className="text-zinc-400">Persona Profile</span>
            <div className="flex items-center gap-1">
              <span className="pbt-keycap text-[10px]">Alt</span>
              <span className="text-zinc-600">+</span>
              <span className="pbt-keycap text-[10px]">1..4</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-[#050608] border border-white/[0.06]">
            <span className="text-zinc-400">Cycle Provider</span>
            <span className="pbt-keycap text-[10px]">/provider</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-[#050608] border border-white/[0.06]">
            <span className="text-zinc-400">Prompt History</span>
            <span className="pbt-keycap text-[10px]">/history</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-[#050608] border border-white/[0.06]">
            <span className="text-zinc-400">Copy Buffer</span>
            <span className="pbt-keycap text-[#38bdf8] font-bold text-[10px]">Enter ↵</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded bg-[#050608] border border-white/[0.06]">
            <span className="text-zinc-400">Dismiss Overlay</span>
            <span className="pbt-keycap text-[10px]">Esc</span>
          </div>
        </div>
      </div>
    </section>
  );
};
