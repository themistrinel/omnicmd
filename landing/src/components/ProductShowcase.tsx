import React, { useState } from 'react';
import { Camera, Film, Maximize2, ShieldCheck, Terminal, Zap } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const [activeMedia, setActiveMedia] = useState<'screenshot' | 'demo'>('screenshot');

  return (
    <div className="w-full rounded-2xl bg-[#090b10] border border-white/[0.12] shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden font-mono">
      {/* Window Titlebar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#0d0f15] border-b border-white/[0.08] text-xs">
        {/* Left: Window Controls & Compositor Details */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
          </div>
          <span className="text-zinc-400 font-mono text-[11px] hidden sm:inline">
            omnicmd // hyprland-active-overlay [Wayland]
          </span>
        </div>

        {/* Center: Media Switcher (Official 4K Screenshot vs Live Demo) */}
        <div className="flex items-center gap-1 bg-[#050608] p-0.5 rounded border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setActiveMedia('screenshot')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
              activeMedia === 'screenshot'
                ? 'bg-[#181c26] text-[#38bdf8] font-bold border border-[#38bdf8]/40 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Screenshot (4K Native)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMedia('demo')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
              activeMedia === 'demo'
                ? 'bg-[#181c26] text-[#38bdf8] font-bold border border-[#38bdf8]/40 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Live Recording (.gif)</span>
          </button>
        </div>

        {/* Right: Resolution & Engine Spec */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          <span>2560 × 1440 REAL DESKTOP HUD</span>
        </div>
      </div>

      {/* Primary Image Viewport */}
      <div className="relative bg-[#050608] flex items-center justify-center overflow-hidden group">
        {activeMedia === 'screenshot' ? (
          <img
            src="./banner.png"
            alt="OmniCmd Official Desktop HUD Screenshot - Real application interface showing command palette, clipboard context, and providers"
            className="w-full h-auto object-cover max-h-[640px] sm:max-h-[720px] transition-transform duration-300 group-hover:scale-[1.005]"
            loading="eager"
          />
        ) : (
          <img
            src="./demo.gif"
            alt="OmniCmd Live Screen Recording - Super+Space global summon over active code editor with instant response"
            className="w-full h-auto object-cover max-h-[640px] sm:max-h-[720px]"
            loading="lazy"
          />
        )}

        {/* Subtle Watermark Overlay */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-white/[0.1] text-[10px] text-zinc-400 font-mono pointer-events-none flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-[#38bdf8]" />
          <span>UNRETOUCHED PRODUCTION UI</span>
        </div>
      </div>

      {/* Architectural Callout Ribbon (Explaining what the real screenshot proves) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06] bg-[#0c0e14] border-t border-white/[0.08] text-xs">
        <div className="p-4 space-y-1">
          <span className="text-[#38bdf8] font-bold text-[11px] flex items-center gap-1.5">
            <Zap className="w-3 h-3" />
            01 // Zero-Window Switch
          </span>
          <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
            Floats directly over your active Neovim, VS Code, or terminal without stealing tiling layout focus.
          </p>
        </div>

        <div className="p-4 space-y-1">
          <span className="text-[#38bdf8] font-bold text-[11px] flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            02 // Auto Clipboard Ingest
          </span>
          <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
            Selected compiler diagnostics or git diffs are pre-populated upon invocation via Super+Space.
          </p>
        </div>

        <div className="p-4 space-y-1">
          <span className="text-[#38bdf8] font-bold text-[11px] flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3" />
            03 // Multi-Provider Routing
          </span>
          <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
            Connects to local Ollama endpoints (100% offline) or cloud providers with sub-millisecond switching.
          </p>
        </div>

        <div className="p-4 space-y-1">
          <span className="text-[#38bdf8] font-bold text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#38bdf8]" />
            04 // Private SQLite Store
          </span>
          <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
            Persists prompt history locally at <code className="text-zinc-300">~/.omnicmd.db</code> with zero cloud tracking.
          </p>
        </div>
      </div>
    </div>
  );
};
