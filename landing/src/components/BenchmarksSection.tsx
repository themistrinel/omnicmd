import React from 'react';
import { Database, Network, ShieldCheck, HardDrive, CheckCircle2, Cpu } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CountUp } from './reactbits';

export const BenchmarksSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="architecture" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08] relative z-10 font-sans">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.05] font-display">
          {t.benchmarks.headline}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-normal">
          {t.benchmarks.subtitle}
        </p>
      </div>

      {/* Profiler Ledger Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left (7 Cols): Visual Hardware Comparison Profiler */}
        <div className="lg:col-span-7 rounded-2xl hud-panel p-6 sm:p-8 font-mono shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="font-bold text-white tracking-wider">{t.benchmarks.profilerTitle}</span>
            </div>
            <span className="text-slate-500 text-[11px] font-sans">{t.benchmarks.profilerSub}</span>
          </div>

          {/* Metric 1: Memory Footprint */}
          <div className="space-y-3 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold">{t.benchmarks.ram.title}</span>
              <span className="text-sky-400 font-bold font-mono">{t.benchmarks.ram.diff}</span>
            </div>

            {/* OmniCmd Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-200">
                <span className="text-slate-200 font-semibold">{t.benchmarks.ram.omniDesc}</span>
                <CountUp to={23.8} decimals={1} suffix=" MB" className="text-sky-400 font-bold font-mono" />
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden p-0.5 border border-white/[0.08]">
                <div className="h-full rounded-full bg-sky-400 w-[5%]" />
              </div>
            </div>

            {/* Electron Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{t.benchmarks.ram.electronDesc}</span>
                <CountUp to={480.0} decimals={1} suffix=" MB" className="text-slate-400 font-mono" />
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden p-0.5 border border-white/[0.05]">
                <div className="h-full rounded-full bg-slate-700 w-[100%]" />
              </div>
            </div>
          </div>

          {/* Metric 2: Cold Hotkey Summon */}
          <div className="space-y-3 py-6 border-b border-white/[0.06]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold">{t.benchmarks.latency.title}</span>
              <span className="text-sky-400 font-bold font-mono">{t.benchmarks.latency.diff}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-200">
                <span className="text-slate-200 font-semibold">{t.benchmarks.latency.omniDesc}</span>
                <CountUp to={18} decimals={0} suffix=" ms" className="text-sky-400 font-bold font-mono" />
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden p-0.5 border border-white/[0.08]">
                <div className="h-full rounded-full bg-sky-400 w-[2%]" />
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>{t.benchmarks.latency.electronDesc}</span>
                <CountUp to={940} decimals={0} suffix=" ms" className="text-slate-400 font-mono" />
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden p-0.5 border border-white/[0.05]">
                <div className="h-full rounded-full bg-slate-700 w-[95%]" />
              </div>
            </div>
          </div>

          {/* Metric 3: Binary Footprint */}
          <div className="space-y-3 pt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold">{t.benchmarks.binary.title}</span>
              <span className="text-slate-400 font-mono">{t.benchmarks.binary.tag}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <span className="text-sky-400 text-[10px] font-bold block">{t.benchmarks.binary.omniTitle}</span>
                <span className="text-lg font-bold text-white font-mono tabular-nums">{t.benchmarks.binary.omniSize}</span>
                <span className="text-[10px] text-slate-400 block font-sans">{t.benchmarks.binary.omniDesc}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-1">
                <span className="text-slate-500 text-[10px] block">{t.benchmarks.binary.electronTitle}</span>
                <span className="text-lg font-bold text-slate-400 font-mono tabular-nums">{t.benchmarks.binary.electronSize}</span>
                <span className="text-[10px] text-slate-500 block font-sans">{t.benchmarks.binary.electronDesc}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right (5 Cols): The Architectural Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-4 font-mono">
          {/* Pillar 1 */}
          <div className="p-5 sm:p-6 rounded-2xl hud-panel space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Database className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-bold font-mono tracking-wider">{t.benchmarks.pillars.p1.title}</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-white/[0.06] border border-white/[0.1] px-2 py-0.5 rounded">
                {t.benchmarks.pillars.p1.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t.benchmarks.pillars.p1.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.benchmarks.pillars.p1.detail}</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 sm:p-6 rounded-2xl hud-panel space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Network className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-bold font-mono tracking-wider">{t.benchmarks.pillars.p2.title}</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-white/[0.06] border border-white/[0.1] px-2 py-0.5 rounded">
                {t.benchmarks.pillars.p2.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t.benchmarks.pillars.p2.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 font-sans">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.benchmarks.pillars.p2.detail}</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 sm:p-6 rounded-2xl hud-panel space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-bold font-mono tracking-wider">{t.benchmarks.pillars.p3.title}</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-white/[0.06] border border-white/[0.1] px-2 py-0.5 rounded">
                {t.benchmarks.pillars.p3.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {t.benchmarks.pillars.p3.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 font-sans">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.benchmarks.pillars.p3.detail}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
