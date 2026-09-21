import React from 'react';
import { Zap, CornerDownLeft, Sparkles, Terminal } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const WorkflowSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="cadence" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08] relative z-10 font-sans">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.05] font-display">
          {t.workflow.headline}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-normal">
          {t.workflow.subtitle}
        </p>
      </div>

      {/* Sequential Execution Pipeline */}
      <div className="relative rounded-2xl hud-panel overflow-hidden mb-12 font-mono shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          {/* Phase 01 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-white/[0.02] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-sky-400 font-bold">{t.workflow.stage1.label}</span>
                <span className="text-slate-500 font-mono">{t.workflow.stage1.time}</span>
              </div>

              <div className="flex items-center gap-1.5 py-1">
                <span className="pbt-keycap phosphor-active">Super</span>
                <span className="text-slate-500 font-mono text-xs">+</span>
                <span className="pbt-keycap phosphor-active">Space</span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                {t.workflow.stage1.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {t.workflow.stage1.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-center gap-1.5 font-sans">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.workflow.stage1.badge}</span>
            </div>
          </div>

          {/* Phase 02 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-white/[0.02] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-sky-400 font-bold">{t.workflow.stage2.label}</span>
                <span className="text-slate-500 font-mono">{t.workflow.stage2.time}</span>
              </div>

              <div className="flex items-center gap-1.5 py-1">
                <span className="pbt-keycap phosphor-active">Alt+1..8</span>
                <span className="text-slate-500 text-xs">or</span>
                <span className="pbt-keycap">/cmd</span>
                <span className="text-slate-500 text-xs">or</span>
                <span className="pbt-keycap">Enter ↵</span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                {t.workflow.stage2.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {t.workflow.stage2.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.workflow.stage2.badge}</span>
            </div>
          </div>

          {/* Phase 03 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:bg-white/[0.02] transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-sky-400 font-bold">{t.workflow.stage3.label}</span>
                <span className="text-slate-500 font-mono">{t.workflow.stage3.time}</span>
              </div>

              <div className="flex items-center gap-1.5 py-1">
                <span className="pbt-keycap phosphor-active text-sky-300">Enter ↵</span>
                <span className="text-slate-500 text-xs">or</span>
                <span className="pbt-keycap">Esc</span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight font-display">
                {t.workflow.stage3.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {t.workflow.stage3.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-center gap-1.5 font-sans">
              <CornerDownLeft className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.workflow.stage3.badge}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tactile Keybinding Reference Ledger */}
      <div className="rounded-2xl hud-panel p-6 sm:p-8 font-mono shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-bold text-white tracking-wider">{t.workflow.matrixTitle}</h3>
          </div>
          <span className="text-[11px] text-slate-500 font-sans">{t.workflow.matrixSubtitle}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
            <span className="text-slate-400 font-sans">{t.workflow.matrixItems.summon}</span>
            <div className="flex items-center gap-1">
              <span className="pbt-keycap text-[10px]">Super</span>
              <span className="text-slate-500">+</span>
              <span className="pbt-keycap text-[10px]">Space</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
            <span className="text-slate-400 font-sans">{t.workflow.matrixItems.traverse}</span>
            <div className="flex items-center gap-1">
              <span className="pbt-keycap text-[10px]">Ctrl</span>
              <span className="text-slate-500">+</span>
              <span className="pbt-keycap text-[10px]">j / k</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
            <span className="text-slate-400 font-sans">{t.workflow.matrixItems.action}</span>
            <span className="pbt-keycap phosphor-active text-[10px]">Alt + 1..8</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
            <span className="text-slate-400 font-sans">{t.workflow.matrixItems.persona}</span>
            <div className="flex items-center gap-1">
              <span className="pbt-keycap text-[10px]">Alt</span>
              <span className="text-slate-500">+</span>
              <span className="pbt-keycap text-[10px]">1..4</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
            <span className="text-slate-400 font-sans">{t.workflow.matrixItems.provider}</span>
            <span className="pbt-keycap text-[10px]">/provider</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
            <span className="text-slate-400 font-sans">{t.workflow.matrixItems.history}</span>
            <span className="pbt-keycap text-[10px]">/history</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
            <span className="text-slate-400 font-sans">{t.workflow.matrixItems.copy}</span>
            <span className="pbt-keycap phosphor-active text-sky-300 font-bold text-[10px]">Enter ↵</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
            <span className="text-slate-400 font-sans">{t.workflow.matrixItems.dismiss}</span>
            <span className="pbt-keycap text-[10px]">Esc</span>
          </div>
        </div>
      </div>
    </section>
  );
};
