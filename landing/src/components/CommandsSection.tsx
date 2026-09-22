import React, { useState } from 'react';
import {
  Sparkles,
  Languages,
  CheckCheck,
  Layers,
  HelpCircle,
  Wand2,
  Code2,
  Terminal,
  Sliders,
  Database,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { TypingText } from './animata';

const COMMAND_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  improve: Sparkles,
  translate: Languages,
  fix: CheckCheck,
  summarize: Layers,
  explain: HelpCircle,
  rewrite: Wand2,
  prompt: Code2,
  custom: Terminal,
};

const SYSTEM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '9router': Cpu,
  'Ollama Local': ShieldCheck,
  '/history': Database,
  '/settings': Sliders,
};

export const CommandsSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const commandSpecs = t.commands.items;
  const selectedCmd = commandSpecs[selectedIndex] || commandSpecs[0];
  const CmdIcon = COMMAND_ICONS[selectedCmd.id] || Sparkles;

  return (
    <section id="commands" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08] relative z-10 font-sans">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.05] font-display">
          {t.commands.headline}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-normal">
          {t.commands.subtitle}
        </p>
      </div>

      {/* Interactive Command Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 font-mono">
        {/* Left: Real Command List */}
        <div className="lg:col-span-6 flex flex-col gap-1.5">
          {commandSpecs.map((cmd, idx) => {
            const isSelected = selectedIndex === idx;
            const Icon = COMMAND_ICONS[cmd.id] || Sparkles;
            return (
              <div
                key={cmd.command}
                onClick={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white/[0.08] text-white border border-sky-400/35 shadow-sm'
                    : 'bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] border border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-sky-400/15 text-sky-400'
                        : 'bg-white/[0.04] text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-sky-300' : 'text-slate-200'}`}>
                      {cmd.command}
                    </span>
                    <span className="text-xs text-slate-400 truncate font-sans">{cmd.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`pbt-keycap text-[10px] ${isSelected ? 'phosphor-active' : ''}`}>
                    {cmd.shortcut}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Command Specification */}
        <div className="lg:col-span-6 rounded-2xl hud-panel p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-400/15 border border-sky-400/30 text-sky-400 flex items-center justify-center">
                  <CmdIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white">{selectedCmd.command}</h3>
                  <span className="text-xs text-slate-400 font-sans">{selectedCmd.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-slate-500 font-sans">{t.commands.officialShortcut}</span>
                <span className="pbt-keycap phosphor-active text-sky-400">{selectedCmd.shortcut}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-sans">
                {t.commands.directivePurpose}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedCmd.description}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-sans">
                {t.commands.sampleInput}
              </span>
              <div className="p-3 rounded-xl bg-[#0c0e14] border border-white/[0.08] font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre">
                {selectedCmd.exampleContext}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-sans">
                {t.commands.generatedOutput}
              </span>
              <div className="p-3.5 rounded-xl bg-[#0a0d14] border border-sky-400/25 text-sky-300 font-mono text-xs leading-relaxed min-h-[4rem] flex items-start shadow-inner">
                <TypingText
                  key={selectedCmd.command}
                  text={selectedCmd.outputSummary}
                  delay={15}
                  cursorClassName="text-sky-400 font-bold"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>{t.commands.customizable}</span>
            <span className="text-slate-400 font-sans">{t.commands.count}</span>
          </div>
        </div>
      </div>

      {/* System Actions & Status Bar Ledger */}
      <div className="rounded-2xl hud-panel p-6 sm:p-8 font-mono shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">{t.commands.systemTitle}</h3>
          </div>
          <span className="text-[11px] text-slate-500 font-sans">{t.commands.systemSub}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {t.commands.systemItems.map((sys) => {
            const Icon = SYSTEM_ICONS[sys.handle] || Sliders;
            return (
              <div
                key={sys.handle}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-sky-400">{sys.handle}</span>
                    <span className="pbt-keycap text-[10px]">{sys.shortcut}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-bold text-xs font-display">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sys.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    {sys.specialty}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] text-[10px] text-slate-500 font-sans">
                  {sys.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
