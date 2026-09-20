import React, { useState } from 'react';
import {
  HelpCircle,
  Wand2,
  CheckCheck,
  Languages,
  Terminal,
  ShieldAlert,
  Code2,
  Sparkles,
  Sliders,
} from 'lucide-react';

interface CommandSpec {
  command: string;
  name: string;
  category: 'Code' | 'Review' | 'Automation' | 'System';
  shortcut: string;
  description: string;
  exampleContext: string;
  outputSummary: string;
  icon: React.ComponentType<{ className?: string }>;
}

const COMMAND_SPECS: CommandSpec[] = [
  {
    command: '/explain',
    name: 'Borrow Checker & Lifetime Proof',
    category: 'Code',
    shortcut: '#1',
    description: 'Deconstructs memory ownership, lifetimes, algorithmic bounds, and borrow checker diagnostics.',
    exampleContext: "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str",
    outputSummary: 'Produces structured O(1) complexity ledger and lifetime duration analysis.',
    icon: HelpCircle,
  },
  {
    command: '/refactor',
    name: 'Idiomatic Async Pipeline',
    category: 'Code',
    shortcut: '#2',
    description: 'Transforms blocking calls into lightweight Tokio async runtimes and clean functional pipelines.',
    exampleContext: 'thread::spawn(move || { std::thread::sleep(...) })',
    outputSummary: 'Rewrites to non-blocking tokio::time::sleep with typed error propagation.',
    icon: Wand2,
  },
  {
    command: '/review',
    name: 'Security & Quality Gate Audit',
    category: 'Review',
    shortcut: '#3',
    description: 'Scans for SQL injections, buffer overruns, race conditions, and unhandled unwraps.',
    exampleContext: "db.query(&format!(\"SELECT * FROM users WHERE id = {}\", input))",
    outputSummary: 'Flags OWASP A03 SQL injection hazard; synthesizes parameterized query.',
    icon: ShieldAlert,
  },
  {
    command: '/commit',
    name: 'Conventional Commit Generator',
    category: 'Automation',
    shortcut: '#4',
    description: 'Ingests staged git diffs and synthesizes strict conventional commits with PR descriptions.',
    exampleContext: 'git diff --staged on modified IPC dispatcher layer',
    outputSummary: 'Generates feat(ipc): implement async dispatcher with bullet points.',
    icon: CheckCheck,
  },
  {
    command: '/shell',
    name: 'One-Liner POSIX Pipeline',
    category: 'Automation',
    shortcut: '#5',
    description: 'Outputs executable bash/zsh pipelines without conversational markdown preamble.',
    exampleContext: 'Find all orphaned docker volumes and containers older than 7 days',
    outputSummary: 'docker system prune -f --filter "until=168h" --volumes',
    icon: Terminal,
  },
  {
    command: '/translate',
    name: 'Technical Idiomatic Translation',
    category: 'Review',
    shortcut: '#6',
    description: 'Translates technical documentation or foreign comments preserving semantic nomenclature.',
    exampleContext: 'Documentation in foreign language or legacy comments',
    outputSummary: 'High-fidelity technical English without conversational loss.',
    icon: Languages,
  },
];

interface AgentSpec {
  handle: string;
  name: string;
  hotkey: string;
  specialty: string;
  model: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AGENT_SPECS: AgentSpec[] = [
  {
    handle: '@coder',
    name: 'Systems Architect',
    hotkey: 'Alt+1',
    specialty: 'Rust, C++, Go, memory hierarchies, and concurrent algorithms.',
    model: 'claude-3-7-sonnet',
    icon: Code2,
  },
  {
    handle: '@reviewer',
    name: 'Security Gate',
    hotkey: 'Alt+2',
    specialty: 'Penetration testing patterns, sanitization, and invariant auditing.',
    model: 'claude-3-5-sonnet',
    icon: ShieldAlert,
  },
  {
    handle: '@prompt',
    name: 'Reasoning Calibrator',
    hotkey: 'Alt+3',
    specialty: 'System prompts, few-shot formatting, and chain-of-thought distillation.',
    model: 'gpt-4o',
    icon: Sparkles,
  },
  {
    handle: '@terminal',
    name: 'Direct CLI Runner',
    hotkey: 'Alt+4',
    specialty: 'Zero-preamble executable shell pipelines, sed, awk, and jq.',
    model: 'ollama / qwen2.5-coder',
    icon: Terminal,
  },
];

export const CommandsSection: React.FC = () => {
  const [selectedCmd, setSelectedCmd] = useState<CommandSpec>(COMMAND_SPECS[0]);
  const CmdIcon = selectedCmd.icon;

  return (
    <section id="commands" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 rounded bg-[#12151e] border border-white/[0.1] text-[11px] font-mono text-zinc-300">
          <span className="text-[#38bdf8] font-bold">[04/06]</span>
          <span>COMMAND SYSTEM // PROGRAMMABLE MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] font-display">
          A HIGH-SPEED COMMAND GRAMMAR.
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
          Trigger built-in operations or custom directives via slash commands (<code className="text-zinc-200 font-mono">/</code>). Route prompts to specialized personas (<code className="text-zinc-200 font-mono">@</code>) without manual re-prompting.
        </p>
      </div>

      {/* Interactive Command Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 font-mono">
        {/* Left: Command List */}
        <div className="lg:col-span-6 flex flex-col gap-2">
          {COMMAND_SPECS.map((cmd) => {
            const isSelected = selectedCmd.command === cmd.command;
            const Icon = cmd.icon;
            return (
              <div
                key={cmd.command}
                onClick={() => setSelectedCmd(cmd)}
                className={`flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#141822] text-white border border-[#38bdf8]/40 shadow-xs'
                    : 'bg-[#090b10] text-zinc-400 hover:bg-[#0e1118] border border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#38bdf8]/15 text-[#38bdf8]'
                        : 'bg-white/[0.04] text-zinc-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#38bdf8]' : 'text-zinc-200'}`}>
                      {cmd.command}
                    </span>
                    <span className="text-xs text-zinc-400 truncate font-sans">{cmd.name}</span>
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
        <div className="lg:col-span-6 rounded-xl bg-[#090b10] border border-white/[0.1] p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] flex items-center justify-center">
                  <CmdIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white">{selectedCmd.command}</h3>
                  <span className="text-xs text-zinc-400 font-sans">{selectedCmd.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-zinc-500">Hotkey:</span>
                <span className="pbt-keycap phosphor-active text-[#38bdf8]">{selectedCmd.shortcut}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Operation Scope
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {selectedCmd.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Target Input Buffer Example
              </span>
              <div className="p-3 rounded bg-[#06070a] border border-white/[0.08] font-mono text-xs text-zinc-300 overflow-x-auto whitespace-pre">
                {selectedCmd.exampleContext}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Generated Output Artifact
              </span>
              <div className="p-3 rounded bg-[#06070a] border border-[#38bdf8]/30 text-[#38bdf8]/90 font-mono text-xs">
                {selectedCmd.outputSummary}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Custom actions configurable via ~/.config/omnicmd/</span>
            <span className="text-zinc-400">JSON schema validated</span>
          </div>
        </div>
      </div>

      {/* Agent Personas Ledger */}
      <div className="rounded-xl bg-[#090b10] border border-white/[0.1] p-6 sm:p-8 font-mono">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#38bdf8]" />
            <h3 className="text-xs font-bold text-white tracking-wider">DOMAIN AGENT PERSONAS (@)</h3>
          </div>
          <span className="text-[11px] text-zinc-500">Switch with Alt+1..4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENT_SPECS.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.handle}
                className="p-4 rounded-lg bg-[#06070a] border border-white/[0.06] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#38bdf8]">{agent.handle}</span>
                    <span className="pbt-keycap text-[10px]">{agent.hotkey}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-bold text-xs font-display">
                    <Icon className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{agent.name}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    {agent.specialty}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.04] text-[10px] text-zinc-500">
                  Model: <span className="text-zinc-300">{agent.model}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
