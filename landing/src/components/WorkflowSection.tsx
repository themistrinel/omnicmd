import React from 'react';
import { Zap, CornerDownLeft, Sparkles, Terminal } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  return (
    <section id="cadence" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-sky-500/15 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full neon-pill text-xs font-mono text-sky-200">
          <span className="text-cyan-400 font-bold">[02/06]</span>
          <span>ERGONOMICS // ZERO-SWITCH PIPELINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] font-display">
          THREE KEYSTROKES. ZERO MOUSE.
        </h2>
        <p className="text-sky-200/70 text-sm sm:text-base leading-relaxed font-sans">
          Eliminate the cognitive disruption of alt-tabbing to a browser window, copy-pasting code, and waiting for heavy electron wrappers. The pipeline lives on your home row.
        </p>
      </div>

      {/* Industrial Sequential Pipeline (Wope Style) */}
      <div className="relative rounded-2xl bg-[#060f24]/80 border border-sky-500/20 backdrop-blur-xl overflow-hidden mb-12 font-mono shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-sky-500/15">
          {/* Phase 01 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[#081430] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-bold">STAGE 01 // INGEST</span>
                <span className="text-sky-400/60 font-mono">18ms</span>
              </div>

              <div className="flex items-center gap-1.5 py-1">
                <span className="pbt-keycap phosphor-active">Super</span>
                <span className="text-sky-400 font-mono text-xs">+</span>
                <span className="pbt-keycap phosphor-active">Space</span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                Contextual Snapshot
              </h3>
              <p className="text-xs text-sky-200/70 leading-relaxed font-sans">
                Highlight an unresolved compiler diagnostic, complex regex, or SQL table schema in your IDE. Press the global hotkey. OmniCmd wakes over your active editor with the buffer pre-loaded.
              </p>
            </div>

            <div className="pt-3 border-t border-sky-500/10 text-[11px] text-sky-300/70 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Native focus grab without tiling reflow</span>
            </div>
          </div>

          {/* Phase 02 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[#081430] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-sky-400 font-bold">STAGE 02 // DISPATCH</span>
                <span className="text-sky-400/60 font-mono">&lt; 1ms</span>
              </div>

              <div className="flex items-center gap-1.5 py-1">
                <span className="pbt-keycap phosphor-active">Alt+1..8</span>
                <span className="text-sky-400 text-xs">or</span>
                <span className="pbt-keycap">/cmd</span>
                <span className="text-sky-400 text-xs">or</span>
                <span className="pbt-keycap">Enter ↵</span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                Single-Stroke Execution
              </h3>
              <p className="text-xs text-sky-200/70 leading-relaxed font-sans">
                Trigger directives with direct numeric keycaps (Alt+1 for melhorar, Alt+2 for traduzir, Alt+5 for explicar). Or type slash commands (/corrigir, /reescrever) directly into the HUD buffer.
              </p>
            </div>

            <div className="pt-3 border-t border-sky-500/10 text-[11px] text-sky-300/70 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Vim navigation: Ctrl + j / k</span>
            </div>
          </div>

          {/* Phase 03 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-[#081430] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-400 font-bold">STAGE 03 // INJECT</span>
                <span className="text-sky-400/60 font-mono">Direct</span>
              </div>

              <div className="flex items-center gap-1.5 py-1">
                <span className="pbt-keycap phosphor-active text-sky-300">Enter ↵</span>
                <span className="text-sky-400 text-xs">or</span>
                <span className="pbt-keycap">Esc</span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                Buffer Return
              </h3>
              <p className="text-xs text-sky-200/70 leading-relaxed font-sans">
                Tokens stream in real-time from your local Ollama or cloud model. Press Enter to write formatted markdown/code directly into your clipboard, or Esc to dismiss and return focus instantly.
              </p>
            </div>

            <div className="pt-3 border-t border-sky-500/10 text-[11px] text-sky-300/70 flex items-center gap-1.5">
              <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant return to active editor window</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tactile Keybinding Reference Ledger */}
      <div className="rounded-2xl bg-[#060f24]/80 border border-sky-500/20 backdrop-blur-xl p-6 sm:p-8 font-mono shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-sky-500/15">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white tracking-wider">TACTILE KEYBOARD MATRIX</h3>
          </div>
          <span className="text-[11px] text-sky-300/60">Universal Home-Row Navigation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#040a1c] border border-sky-500/15 hover:border-sky-500/30 transition-colors">
            <span className="text-sky-200/70">Summon / Hide</span>
            <div className="flex items-center gap-1">
              <span className="pbt-keycap text-[10px]">Super</span>
              <span className="text-sky-400">+</span>
              <span className="pbt-keycap text-[10px]">Space</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#040a1c] border border-sky-500/15 hover:border-sky-500/30 transition-colors">
            <span className="text-sky-200/70">Vim Traverse</span>
            <div className="flex items-center gap-1">
              <span className="pbt-keycap text-[10px]">Ctrl</span>
              <span className="text-sky-400">+</span>
              <span className="pbt-keycap text-[10px]">j / k</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#040a1c] border border-sky-500/15 hover:border-sky-500/30 transition-colors">
            <span className="text-sky-200/70">Run Action</span>
            <span className="pbt-keycap phosphor-active text-[10px]">Alt + 1..8</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#040a1c] border border-sky-500/15 hover:border-sky-500/30 transition-colors">
            <span className="text-sky-200/70">Persona Profile</span>
            <div className="flex items-center gap-1">
              <span className="pbt-keycap text-[10px]">Alt</span>
              <span className="text-sky-400">+</span>
              <span className="pbt-keycap text-[10px]">1..4</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#040a1c] border border-sky-500/15 hover:border-sky-500/30 transition-colors">
            <span className="text-sky-200/70">Cycle Provider</span>
            <span className="pbt-keycap text-[10px]">/provider</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#040a1c] border border-sky-500/15 hover:border-sky-500/30 transition-colors">
            <span className="text-sky-200/70">Prompt History</span>
            <span className="pbt-keycap text-[10px]">/history</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#040a1c] border border-sky-500/15 hover:border-sky-500/30 transition-colors">
            <span className="text-sky-200/70">Copy Buffer</span>
            <span className="pbt-keycap phosphor-active text-sky-300 font-bold text-[10px]">Enter ↵</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#040a1c] border border-sky-500/15 hover:border-sky-500/30 transition-colors">
            <span className="text-sky-200/70">Dismiss Overlay</span>
            <span className="pbt-keycap text-[10px]">Esc</span>
          </div>
        </div>
      </div>
    </section>
  );
};
