import React from 'react';
import {
  Zap,
  Layers,
  Sliders,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section
      id="features"
      aria-label="Features and Core Architecture"
      className="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 relative z-10 font-sans"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] text-white font-display leading-[1.05]">
          {t.features.headline}
        </h2>

        <p className="text-base text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
          {t.features.subtitle}
        </p>
      </div>

      {/* Two-Column Feature Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
        {/* CARD 1: Directive Library & Prompt Transformation */}
        <div className="hud-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group">
          {/* Card Header */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-sky-400 font-mono text-[11px]">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                {t.features.card1.tag}
              </span>
              <span className="text-slate-400 font-mono text-[11px] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                {t.features.card1.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
              {t.features.card1.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-sans font-normal">
              {t.features.card1.description}
            </p>
          </div>

          {/* Asset Container */}
          <div className="rounded-xl bg-[#0c0e14] border border-white/[0.08] p-2.5 sm:p-3 relative my-auto shadow-xl group-hover:border-white/[0.14] transition-all">
            <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] rounded-lg mb-2 border border-white/[0.06] text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-slate-200 font-semibold">omnicmd.local / actions_matrix</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wide font-mono">{t.features.card1.matrixHeader}</span>
            </div>

            <div className="overflow-hidden rounded-lg border border-white/[0.06]">
              <img
                src="./app-actions.png"
                alt="OmniCmd Native Directive Library"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Badges of directives */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
              {t.features.card1.directives.map((dir) => (
                <div key={dir.cmd} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex flex-col gap-0.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-sky-300">{dir.cmd}</span>
                    <span className="pbt-keycap text-[9px] px-1 py-0">{dir.key}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans truncate">{dir.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-sans">
            <span>{t.features.card1.footerConfig}</span>
            <span className="text-sky-400 font-mono font-semibold">{t.features.card1.footerCount}</span>
          </div>
        </div>

        {/* CARD 2: Global Summon & Floating HUD Window */}
        <div className="hud-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group">
          {/* Card Header */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-sky-400 font-mono text-[11px]">
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                {t.features.card2.tag}
              </span>
              <span className="text-slate-400 font-mono text-[11px] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                {t.features.card2.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
              {t.features.card2.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-sans font-normal">
              {t.features.card2.description}
            </p>
          </div>

          {/* Asset Container */}
          <div className="rounded-xl bg-[#0c0e14] border border-white/[0.08] p-2.5 sm:p-3 relative my-auto shadow-xl group-hover:border-white/[0.14] transition-all">
            <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] rounded-lg mb-2 border border-white/[0.06] text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-slate-200 font-semibold">omnicmd.local / hud_surface</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wide font-mono">{t.features.card2.matrixHeader}</span>
            </div>

            <div className="overflow-hidden rounded-lg border border-white/[0.06] bg-[#090b10] p-1 flex items-center justify-center">
              <img
                src="./app-window.png"
                alt="OmniCmd floating HUD window"
                className="w-full h-auto object-contain rounded-md"
                loading="lazy"
              />
            </div>

            {/* Production metadata badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex flex-col items-center text-center">
                <span className="text-[10px] text-slate-400 font-mono">{t.features.card2.meta.hotkey.label}</span>
                <span className="text-xs font-bold font-mono text-white mt-0.5">{t.features.card2.meta.hotkey.value}</span>
              </div>

              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex flex-col items-center text-center">
                <span className="text-[10px] text-slate-400 font-mono">{t.features.card2.meta.provider.label}</span>
                <span className="text-xs font-bold font-mono text-sky-300 mt-0.5 truncate w-full" title="9router: ag/gemini-3.8-flash-low">
                  {t.features.card2.meta.provider.value}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex flex-col items-center text-center">
                <span className="text-[10px] text-slate-400 font-mono">{t.features.card2.meta.latency.label}</span>
                <span className="text-xs font-bold font-mono text-emerald-400 mt-0.5">{t.features.card2.meta.latency.value}</span>
              </div>

              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex flex-col items-center text-center">
                <span className="text-[10px] text-slate-400 font-mono">{t.features.card2.meta.compat.label}</span>
                <span className="text-xs font-bold font-mono text-slate-200 mt-0.5">{t.features.card2.meta.compat.value}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-sans">
            <span>{t.features.card2.footerCompositor}</span>
            <span className="text-slate-300 font-mono font-semibold">{t.features.card2.footerSwitching}</span>
          </div>
        </div>
      </div>

      {/* STATUS BAR STRIP */}
      <div className="hud-panel rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              {t.features.statusBar.title}
            </h4>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {t.features.statusBar.model}
            </span>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-white/[0.06] bg-[#0c0e14]">
          <img
            src="./app-status.png"
            alt="OmniCmd native status bar"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
