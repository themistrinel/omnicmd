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

interface CommandSpec {
  command: string;
  name: string;
  category: string;
  shortcut: string;
  description: string;
  exampleContext: string;
  outputSummary: string;
  icon: React.ComponentType<{ className?: string }>;
}

const COMMAND_SPECS: CommandSpec[] = [
  {
    command: '/melhorar',
    name: 'Enhance Prompt',
    category: 'Engineering',
    shortcut: 'Alt+1',
    description:
      'Optimizes and enriches raw prompts with structured specifications, analytical reasoning, and rigorous output format constraints.',
    exampleContext: 'create a rust api to manage tasks with sqlite',
    outputSummary:
      'Produces a full architectural directive with strict typing, recommended crates (Axum + SQLx), and production error handling.',
    icon: Sparkles,
  },
  {
    command: '/traduzir',
    name: 'Translate Code & Docs',
    category: 'Language',
    shortcut: 'Alt+2',
    description:
      'Translates technical documentation, comments, or error messages while preserving code syntax, jargon, and formatting.',
    exampleContext:
      'The borrow checker enforces that references always point to valid data and cannot outlive their owner.',
    outputSummary:
      'O verificador de empréstimos garante que referências sempre apontem para dados válidos sem gerar referências soltas.',
    icon: Languages,
  },
  {
    command: '/corrigir',
    name: 'Fix Code & Grammar',
    category: 'Refinement',
    shortcut: 'Alt+3',
    description:
      'Eliminates grammatical mistakes, typos, phrasing errors, and syntax inconsistencies across commit messages, PRs, and docs.',
    exampleContext:
      'we needs to optimizes this queries because they is slow in production',
    outputSummary:
      'We need to optimize these queries because they are causing high latency in production.',
    icon: CheckCheck,
  },
  {
    command: '/resumir',
    name: 'Summarize Content',
    category: 'Synthesis',
    shortcut: 'Alt+4',
    description:
      'Condenses extensive CI/CD logs, compiler diagnostics, git diffs, or discussion threads into actionable, prioritized bullet points.',
    exampleContext:
      'Extensive CI/CD pipeline output with 120 lines of warnings and static linking error messages',
    outputSummary:
      '1. Missing OpenSSL dev headers. 2. Musl target requires static flag. 3. Patched build script provided.',
    icon: Layers,
  },
  {
    command: '/explicar',
    name: 'Explain Concept & Code',
    category: 'Analysis',
    shortcut: 'Alt+5',
    description:
      'Deconstructs complex algorithms, Rust lifetime invariants, concurrency patterns, or obscure blocks into clear, pedagogical steps.',
    exampleContext:
      "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { if x.len() > y.len() { x } else { y } }",
    outputSummary:
      "Detailed lifetime 'a breakdown: return reference remains valid only as long as both borrowed parameters stay in scope.",
    icon: HelpCircle,
  },
  {
    command: '/reescrever',
    name: 'Rewrite & Tone Adjust',
    category: 'Style',
    shortcut: 'Alt+6',
    description:
      'Refactors technical text, RFC drafts, or team announcements into a crisp, concise, and professional tone.',
    exampleContext:
      'i guess this endpoint is kinda weird and we should probably change it before it breaks',
    outputSummary:
      'We recommend refactoring this endpoint signature to uphold REST idempotency and ensure production predictability.',
    icon: Wand2,
  },
  {
    command: '/gerar-prompt',
    name: 'Generate Agent Prompt',
    category: 'Structuring',
    shortcut: 'Alt+7',
    description:
      'Transforms unstructured notes, user stories, or bug reports into rigorous instructions tailored for coding agents.',
    exampleContext:
      'need a golang microservice to process webhooks with redis deduplication',
    outputSummary:
      'Structured prompt with hexagonal architecture, Redis idempotency keys, and automated integration test suite.',
    icon: Code2,
  },
  {
    command: '/livre',
    name: 'Freeform Query',
    category: 'Ad-hoc',
    shortcut: 'Alt+8',
    description:
      'Open prompt channel for arbitrary queries, arithmetic derivations, or custom directives with real-time SSE streaming.',
    exampleContext:
      'Write a declarative Rust macro that implements the FromStr trait for an arbitrary enum',
    outputSummary:
      'Compile-ready macro expansion with zero conversational filler or redundant preamble.',
    icon: Terminal,
  },
];

interface SystemActionSpec {
  handle: string;
  name: string;
  shortcut: string;
  specialty: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SYSTEM_ACTION_SPECS: SystemActionSpec[] = [
  {
    handle: '9router',
    name: 'Active Provider',
    shortcut: '/provider',
    specialty: 'ag/gemini-3.8-flash-low with fallback to Claude 3.5 Sonnet and GPT-4o.',
    detail: 'Sub-second first-token latency via native SSE streaming.',
    icon: Cpu,
  },
  {
    handle: 'Ollama Local',
    name: 'Offline Execution',
    shortcut: '/provider',
    specialty: 'Local weights (Qwen 2.5 Coder, Llama 3.3) hosted on localhost:11434.',
    detail: '100% private, zero network roundtrips outside your machine.',
    icon: ShieldCheck,
  },
  {
    handle: '/history',
    name: 'SQLite Ledger',
    shortcut: 'Ctrl+H',
    specialty: 'Instant FTS5 full-text indexing over past prompts and generated outputs.',
    detail: 'Persisted locally in ~/.omnicmd.db.',
    icon: Database,
  },
  {
    handle: '/settings',
    name: 'Configuration',
    shortcut: 'Ctrl+,',
    specialty: 'Customize global hotkeys, HUD opacity, and provider API credentials.',
    detail: 'Strictly validated against JSON Schema.',
    icon: Sliders,
  },
];

export const CommandsSection: React.FC = () => {
  const [selectedCmd, setSelectedCmd] = useState<CommandSpec>(COMMAND_SPECS[0]);
  const CmdIcon = selectedCmd.icon;

  return (
    <section id="commands" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-sky-500/15 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full neon-pill text-xs font-mono text-sky-200">
          <span className="text-cyan-400 font-bold">[04/06]</span>
          <span>PRODUCTION DIRECTIVES // CORE CATALOG</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] font-display">
          Production Directive Catalog
        </h2>
        <p className="text-sky-200/70 text-sm sm:text-base leading-relaxed font-sans">
          Every directive is bound to a dedicated shortcut (<code className="text-white font-mono">Alt+1</code> through <code className="text-white font-mono">Alt+8</code>) that wraps your active selection with battle-tested system instructions, matching OmniCmd's native runtime catalog.
        </p>
      </div>

      {/* Interactive Command Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 font-mono">
        {/* Left: Real Command List */}
        <div className="lg:col-span-6 flex flex-col gap-2">
          {COMMAND_SPECS.map((cmd) => {
            const isSelected = selectedCmd.command === cmd.command;
            const Icon = cmd.icon;
            return (
              <div
                key={cmd.command}
                onClick={() => setSelectedCmd(cmd)}
                className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#091838] text-white border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-[#060f24]/80 text-sky-200/70 hover:bg-[#081430] border border-sky-500/15'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-sky-500/20 text-cyan-300'
                        : 'bg-sky-950/40 text-sky-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-sky-100'}`}>
                      {cmd.command}
                    </span>
                    <span className="text-xs text-sky-200/60 truncate font-sans">{cmd.name}</span>
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
        <div className="lg:col-span-6 rounded-2xl bg-[#060f24]/80 border border-sky-500/20 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-sky-500/15">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 text-cyan-300 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                  <CmdIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white">{selectedCmd.command}</h3>
                  <span className="text-xs text-sky-300/70 font-sans">{selectedCmd.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-sky-400/70">Official Shortcut:</span>
                <span className="pbt-keycap phosphor-active text-cyan-300">{selectedCmd.shortcut}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-sky-400/70 uppercase tracking-wider block">
                Directive Purpose &amp; Scope
              </span>
              <p className="text-xs text-sky-200/80 leading-relaxed font-sans">
                {selectedCmd.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-sky-400/70 uppercase tracking-wider block">
                Sample Selected Input Buffer
              </span>
              <div className="p-3.5 rounded-xl bg-[#040a1c] border border-sky-500/15 font-mono text-xs text-sky-200/90 overflow-x-auto whitespace-pre">
                {selectedCmd.exampleContext}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-sky-400/70 uppercase tracking-wider block">
                Generated Directive Output
              </span>
              <div className="p-3.5 rounded-xl bg-[#040a1c] border border-sky-500/30 text-cyan-300 font-mono text-xs">
                {selectedCmd.outputSummary}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-sky-500/15 flex items-center justify-between text-[11px] font-mono text-sky-300/60">
            <span>Customizable via ~/.config/omnicmd/prompts.json</span>
            <span className="text-sky-300">8 Native Directives</span>
          </div>
        </div>
      </div>

      {/* System Actions & Status Bar Ledger */}
      <div className="rounded-2xl bg-[#060f24]/80 border border-sky-500/20 backdrop-blur-xl p-6 sm:p-8 font-mono shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-sky-500/15">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">SYSTEM CONTROLS &amp; STATUS BAR PROVIDERS</h3>
          </div>
          <span className="text-[11px] text-sky-300/60">Instant HUD Setup</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEM_ACTION_SPECS.map((sys) => {
            const Icon = sys.icon;
            return (
              <div
                key={sys.handle}
                className="p-4 rounded-xl bg-[#040a1c] border border-sky-500/15 hover:border-sky-500/30 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-300">{sys.handle}</span>
                    <span className="pbt-keycap text-[10px]">{sys.shortcut}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-bold text-xs font-display">
                    <Icon className="w-3.5 h-3.5 text-sky-400" />
                    <span>{sys.name}</span>
                  </div>
                  <p className="text-[11px] text-sky-200/70 leading-relaxed font-sans">
                    {sys.specialty}
                  </p>
                </div>

                <div className="pt-2 border-t border-sky-500/10 text-[10px] text-sky-300/60">
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
