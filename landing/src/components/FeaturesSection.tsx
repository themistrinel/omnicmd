import React from 'react';
import {
  Sparkles,
  Zap,
  Layers,
  Sliders,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section
      id="features"
      aria-label="Features and Core Architecture"
      className="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 relative z-10 font-sans"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full neon-pill text-xs font-sans font-medium text-sky-200">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="tracking-wide uppercase text-[11px] font-semibold">
            NATIVE ARCHITECTURE // ZERO ELECTRON TAX
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-white font-display leading-[1.05]">
          Meet New-Gen Desktop Experience
        </h2>

        <p className="text-sm sm:text-base text-sky-200/70 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
          Engineered for sub-20ms wake, instant context capture, and local prompt orchestration directly over your active code editor or terminal.
        </p>
      </div>

      {/* Two-Column Feature Showcase with 100% Real App Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
        {/* ─────────────────────────────────────────────────────────────
            CARD 1 (Left): Directive Library & Prompt Transformation
            ───────────────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-sky-500/25 bg-[#060f24]/85 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-sky-400/40 transition-all duration-300 relative overflow-hidden group">
          {/* Subtle top inner gradient */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs text-sky-300">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-cyan-400 font-mono text-[11px]">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                INSTANT ACTIONS // [ALT+1..8]
              </span>
              <span className="text-sky-300/60 font-mono text-[11px] bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/20">
                PROMPT ENGINE
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
              Zero-Friction Prompt Transformation
            </h3>

            <p className="text-xs sm:text-sm text-sky-200/70 leading-relaxed font-sans font-normal">
              OmniCmd wraps any highlighted text with a single shortcut (<strong className="text-white font-mono">Alt+1</strong> through <strong className="text-white font-mono">Alt+8</strong>) into high-fidelity LLM directives. Zero manual copying, zero repetitive prompting: active buffers are enveloped with structured context instantaneously.
            </p>
          </div>

          {/* Real Asset Container: /app-actions.png */}
          <div className="rounded-2xl bg-[#030712] border border-sky-500/20 p-2 sm:p-3 relative my-auto shadow-[0_15px_40px_rgba(0,0,0,0.8)] group-hover:border-sky-400/40 transition-all">
            <div className="flex items-center justify-between px-3 py-2 bg-[#081430]/90 rounded-xl mb-2 border border-sky-500/20 text-xs font-mono text-sky-300/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-white font-semibold">omnicmd.local / actions_matrix</span>
              </div>
              <span className="text-[10px] text-sky-400 uppercase tracking-wide font-mono font-semibold">INTERACTIVE DIRECTIVES</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-sky-500/15">
              <img
                src="./app-actions.png"
                alt="OmniCmd Native Directive Library - Production UI displaying shortcuts Alt+1 through Alt+8"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                loading="lazy"
              />
            </div>

            {/* Badges of sequential 4 directives: Alt+1 to Alt+4 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
              <div className="p-2 rounded-xl bg-[#081430]/80 border border-sky-500/25 flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-cyan-300">/melhorar</span>
                  <span className="pbt-keycap text-[9px] px-1 py-0">Alt+1</span>
                </div>
                <span className="text-[10px] text-sky-200/60 font-sans truncate">Prompt enhancer</span>
              </div>

              <div className="p-2 rounded-xl bg-[#081430]/80 border border-sky-500/25 flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-cyan-300">/traduzir</span>
                  <span className="pbt-keycap text-[9px] px-1 py-0">Alt+2</span>
                </div>
                <span className="text-[10px] text-sky-200/60 font-sans truncate">Translate code/doc</span>
              </div>

              <div className="p-2 rounded-xl bg-[#081430]/80 border border-sky-500/25 flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-cyan-300">/corrigir</span>
                  <span className="pbt-keycap text-[9px] px-1 py-0">Alt+3</span>
                </div>
                <span className="text-[10px] text-sky-200/60 font-sans truncate">Fix code &amp; syntax</span>
              </div>

              <div className="p-2 rounded-xl bg-[#081430]/80 border border-sky-500/25 flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-cyan-300">/resumir</span>
                  <span className="pbt-keycap text-[9px] px-1 py-0">Alt+4</span>
                </div>
                <span className="text-[10px] text-sky-200/60 font-sans truncate">Summarize content</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-5 mt-4 border-t border-sky-500/15 flex items-center justify-between text-[11px] text-sky-300/60 font-sans">
            <span>Declarative config at <code className="text-sky-200 font-mono">~/.config/omnicmd/prompts.json</code></span>
            <span className="text-cyan-400 font-mono font-semibold">8 Ready Directives</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CARD 2 (Right): Global Summon & Floating HUD Window (/app-window.png)
            ───────────────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-sky-500/25 bg-[#060f24]/85 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-sky-400/40 transition-all duration-300 relative overflow-hidden group">
          {/* Subtle top inner gradient */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs text-sky-300">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-sky-400 font-mono text-[11px]">
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                GLOBAL SUMMON // [SUPER+SPACE]
              </span>
              <span className="text-sky-300/60 font-mono text-[11px] bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/20">
                18MS WAKE
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
              Native Floating HUD in Rust &amp; Tauri v2
            </h3>

            <p className="text-xs sm:text-sm text-sky-200/70 leading-relaxed font-sans font-normal">
              Wakes in <strong className="text-white font-mono">18ms</strong> without stealing window focus or disrupting your tiling layout. A translucent, zero-latency overlay that preserves editor state and eliminates dozens of browser tabs.
            </p>
          </div>

          {/* Real Asset Container: /app-window.png */}
          <div className="rounded-2xl bg-[#030712] border border-sky-500/20 p-2 sm:p-3 relative my-auto shadow-[0_15px_40px_rgba(0,0,0,0.8)] group-hover:border-sky-400/40 transition-all">
            <div className="flex items-center justify-between px-3 py-2 bg-[#081430]/90 rounded-xl mb-2 border border-sky-500/20 text-xs font-mono text-sky-300/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                <span className="text-white font-semibold">omnicmd.local / hud_surface</span>
              </div>
              <span className="text-[10px] text-cyan-300 uppercase tracking-wide font-mono font-bold">INSTANT HUD SUMMON</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-sky-500/15 bg-radial from-sky-950/20 via-[#030712] to-[#030712] p-1 flex items-center justify-center">
              <img
                src="./app-window.png"
                alt="OmniCmd isolated floating HUD window showing translucent blur and instant action shortcuts"
                className="w-full h-auto object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.015]"
                loading="lazy"
              />
            </div>

            {/* Real production metadata badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
              <div className="p-2 rounded-xl bg-[#081430]/80 border border-sky-500/25 flex flex-col items-center text-center">
                <span className="text-[10px] text-sky-300/70 font-mono">Global Hotkey</span>
                <span className="text-xs font-bold font-mono text-white mt-0.5">Super + Space</span>
              </div>

              <div className="p-2 rounded-xl bg-[#081430]/80 border border-sky-500/25 flex flex-col items-center text-center">
                <span className="text-[10px] text-sky-300/70 font-mono">Active Provider</span>
                <span className="text-xs font-bold font-mono text-cyan-300 mt-0.5 truncate w-full" title="9router: ag/gemini-3.8-flash-low">
                  9router
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#081430]/80 border border-sky-500/25 flex flex-col items-center text-center">
                <span className="text-[10px] text-sky-300/70 font-mono">Wake Latency</span>
                <span className="text-xs font-bold font-mono text-emerald-400 mt-0.5">18 ms</span>
              </div>

              <div className="p-2 rounded-xl bg-[#081430]/80 border border-sky-500/25 flex flex-col items-center text-center">
                <span className="text-[10px] text-sky-300/70 font-mono">Compatibility</span>
                <span className="text-xs font-bold font-mono text-sky-200 mt-0.5">Multi-LLM</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-5 mt-4 border-t border-sky-500/15 flex items-center justify-between text-[11px] text-sky-300/60 font-sans">
            <span>Native compositor // Wayland, macOS and Windows</span>
            <span className="text-sky-300 font-mono font-semibold">0 Context Switching</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          REAL STATUS BAR STRIP: /app-status.png
          ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-[#060f24]/90 border border-sky-500/20 backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-sky-500/15">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              GLOBAL STATUS LEDGER // 9ROUTER + OLLAMA
            </h4>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-sky-300/70">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              9router: ag/gemini-3.8-flash-low
            </span>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-sky-500/20 bg-[#030712]">
          <img
            src="./app-status.png"
            alt="OmniCmd native status bar with provider selection, history lookup, and system settings"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
