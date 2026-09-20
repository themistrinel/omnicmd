import React from 'react';
import { Command, Terminal, Bot, Move } from 'lucide-react';

interface ShortcutGroup {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcuts: {
    title: string;
    description: string;
    keys: string[];
    separator?: string;
  }[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: 'Invocation & Window State',
    icon: Command,
    shortcuts: [
      {
        title: 'Toggle Floating HUD',
        description: 'Summons or conceals OmniCmd anywhere in your OS',
        keys: ['Super', 'Space'],
        separator: '+',
      },
      {
        title: 'Dismiss & Vanish',
        description: 'Hides HUD overlay and returns keyboard focus to your active window',
        keys: ['Esc'],
      },
      {
        title: 'Copy Buffer',
        description: 'Copies active response to clipboard for pasting into any application',
        keys: ['Enter'],
      },
    ],
  },
  {
    title: 'Vim & Palette Navigation',
    icon: Move,
    shortcuts: [
      {
        title: 'Vim Cursor Traverse',
        description: 'Navigate up/down without taking fingers off home row',
        keys: ['Ctrl + j', 'Ctrl + k'],
        separator: '/',
      },
      {
        title: 'Standard Arrow Navigation',
        description: 'Sequential palette item traverse',
        keys: ['↑', '↓'],
        separator: '/',
      },
      {
        title: 'Command Filtering',
        description: 'Prefix query with slash to filter actions or view registry',
        keys: ['/cmd'],
      },
    ],
  },
  {
    title: 'Direct Action Triggers',
    icon: Terminal,
    shortcuts: [
      {
        title: 'Explain Code / Concept',
        description: 'Breaks down logic, borrow-checker patterns, complexity',
        keys: ['#1'],
      },
      {
        title: 'Improve Prompt Directive',
        description: 'Calibrates prompts for deep reasoning models with strict schemas',
        keys: ['#2'],
      },
      {
        title: 'Translate Code & Text',
        description: 'Idiomatic natural and technical translation across languages',
        keys: ['#3'],
      },
      {
        title: 'Review and Polish',
        description: 'Audits syntax, tone, and technical clarity',
        keys: ['#4'],
      },
      {
        title: 'Summarize Key Points',
        description: 'Condenses logs, threads, and diffs into concise bullet points',
        keys: ['#5'],
      },
    ],
  },
  {
    title: 'Persona Switching',
    icon: Bot,
    shortcuts: [
      {
        title: 'Systems Coder (@coder)',
        description: 'Rust, low-level concurrency, memory safety specialist',
        keys: ['Alt', '1'],
        separator: '+',
      },
      {
        title: 'Prompt Engineer (@prompt)',
        description: 'Few-shot calibration, structured JSON schemas',
        keys: ['Alt', '2'],
        separator: '+',
      },
      {
        title: 'Security Auditor (@reviewer)',
        description: 'Vulnerability checks, error handling, strict audits',
        keys: ['Alt', '3'],
        separator: '+',
      },
      {
        title: 'Direct CLI Agent (@terminal)',
        description: 'Generates clean shell commands without conversational preamble',
        keys: ['Alt', '4'],
        separator: '+',
      },
    ],
  },
];

export const ShortcutsSection: React.FC = () => {
  return (
    <section id="shortcuts" className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/[0.06]">
      <div className="flex flex-col gap-4 max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-white leading-tight">
          Keyboard-first ergonomics.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Every capability is addressable in one or two keystrokes. Built with tactile keybindings for speed and muscle memory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {SHORTCUT_GROUPS.map((group) => {
          const IconComp = group.icon;
          return (
            <div
              key={group.title}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between gap-5"
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300">
                  <IconComp className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {group.title}
                </h3>
              </div>

              <div className="space-y-3">
                {group.shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.title}
                    className="flex items-center justify-between gap-4 p-2 rounded-xl hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-slate-200">
                        {shortcut.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {shortcut.description}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 font-mono text-xs">
                      {shortcut.keys.map((key, kIdx) => (
                        <React.Fragment key={key}>
                          <kbd className="keycap-3d px-2 py-0.5 rounded bg-[#161a23] text-slate-200 text-[11px] font-semibold">
                            {key}
                          </kbd>
                          {shortcut.separator && kIdx < shortcut.keys.length - 1 && (
                            <span className="text-slate-600 text-[10px] font-mono">
                              {shortcut.separator}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
