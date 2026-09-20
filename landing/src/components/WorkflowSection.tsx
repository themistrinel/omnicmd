import React from 'react';

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/[0.06]">
      <div className="flex flex-col gap-3 max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-white leading-tight">
          The three-keystroke cadence.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Zero mouse navigation. Zero window switching. Designed for hands that never leave the home row.
        </p>
      </div>

      {/* 3-Step Flow Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Step 1 */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-white font-medium">Super</kbd>
              <span className="text-slate-600">+</span>
              <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-white font-medium">Space</kbd>
            </div>
            <h3 className="text-base font-semibold text-white">Summon &amp; Ingest</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Highlight code or logs in any editor. Press the global shortcut to summon OmniCmd over your active window in 18ms with clipboard context preloaded.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-white/[0.04]">
            18ms overlay • zero window switch
          </div>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-sky-300 font-semibold">#1..#5</kbd>
              <span className="text-slate-600">or</span>
              <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-slate-300 font-medium">@persona</kbd>
            </div>
            <h3 className="text-base font-semibold text-white">Dispatch Directive</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Execute actions instantly: #1 to explain, #2 to refine prompts, #3 to translate. Route queries to specialized personas without touching the mouse.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-white/[0.04]">
            Vim navigation: Ctrl+j / k
          </div>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <kbd className="keycap-3d px-2.5 py-0.5 rounded bg-[#161a23] text-emerald-400 font-semibold">Enter ↵</kbd>
              <span className="text-slate-600">/</span>
              <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-slate-400">Esc</kbd>
            </div>
            <h3 className="text-base font-semibold text-white">Stream &amp; Copy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stream tokens via direct SSE. Hit Enter to write output directly back to your clipboard buffer, or Esc to dismiss and return focus.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-white/[0.04]">
            Direct clipboard return buffer
          </div>
        </div>
      </div>

      {/* Keybinding Reference Table - Minimal & dense */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-7">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">
          Tactile Keyboard Reference
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-slate-400">Summon / Hide</span>
            <span className="text-white">Super + Space</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-slate-400">Vim Traverse</span>
            <span className="text-white">Ctrl + j / k</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-slate-400">Copy Buffer</span>
            <span className="text-white">Enter</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-slate-400">Dismiss Overlay</span>
            <span className="text-white">Esc</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-slate-400">Quick Action</span>
            <span className="text-white">#1 .. #5</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-slate-400">Persona Profile</span>
            <span className="text-white">Alt + 1..4</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-slate-400">Command Filter</span>
            <span className="text-white">/cmd</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/[0.04]">
            <span className="text-slate-400">Prompt History</span>
            <span className="text-white">/history</span>
          </div>
        </div>
      </div>
    </section>
  );
};
