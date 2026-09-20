import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {
  Search,
  Wand2,
  HelpCircle,
  Languages,
  CheckCheck,
  FileText,
  Copy,
  Check,
  RotateCcw,
  CornerDownLeft,
  X,
  Play,
  Bot,
  Code2,
  ShieldAlert,
  Sparkles,
  Terminal,
  Activity,
  Eye,
  FileCode,
} from 'lucide-react';
import { MarkdownView } from './MarkdownView';

interface ContextSample {
  id: string;
  label: string;
  fileName: string;
  badge: string;
  actionId: string;
  payload: string;
  resultOutput: string;
}

const CONTEXT_SAMPLES: ContextSample[] = [
  {
    id: 'rust-code',
    label: 'Rust Lifetime',
    fileName: 'src/lib/dispatcher.rs',
    badge: 'Code Review',
    actionId: 'explain',
    payload: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}`,
    resultOutput: `### Rust Lifetime Analysis ('a)

- **Generic Lifetime Parameter**: The \`'a\` specifier informs the compiler that the returned reference lives as long as *both* \`x\` and \`y\` are valid.
- **Zero-Cost Abstraction**: Verification occurs 100% at compile time through the borrow checker; zero runtime overhead or reference counting.
- **Complexity**: \`O(1)\` time and auxiliary memory (compares lengths stored in slice headers).`,
  },
  {
    id: 'git-commit',
    label: 'Git Diff Staged',
    fileName: 'git-diff --staged',
    badge: 'VCS Diff',
    actionId: 'improve_prompt',
    payload: `+ pub fn emit_ipc_event(channel: &str, payload: Value) -> Result<(), IpcError> {
+     tauri::async_runtime::spawn(async move { ... });
+ }`,
    resultOutput: `### Commit Message & PR Spec

\`\`\`git
feat(ipc): implement non-blocking asynchronous event dispatcher

- Dispatch Tauri IPC events via lightweight async runtime
- Eliminate thread blocking on hotkey listener daemon
- Return strongly-typed IpcError for graceful client recovery
\`\`\``,
  },
  {
    id: 'sql-query',
    label: 'SQL Optimization',
    fileName: 'queries/analytics.sql',
    badge: 'Database',
    actionId: 'fix_grammar',
    payload: `SELECT u.id, u.name, o.total 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE o.created_at >= '2025-01-01'`,
    resultOutput: `### SQL Performance Optimization

1. **JOIN Inconsistency**: The predicate \`WHERE o.created_at >= ...\` filters out NULL rows, inadvertently converting the \`LEFT JOIN\` into an \`INNER JOIN\`.
2. **Recommended Composite Index**:
\`\`\`sql
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);
\`\`\`
3. **Corrected Query**:
\`\`\`sql
SELECT u.id, u.name, COALESCE(o.total, 0) AS total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.created_at >= '2025-01-01';
\`\`\``,
  },
  {
    id: 'raw-prompt',
    label: 'Raw Prompt',
    fileName: 'specs/system_prompt.md',
    badge: 'Prompt Eng',
    actionId: 'improve_prompt',
    payload: `summarize this sprint retro meeting for me`,
    resultOutput: `### Optimized Reasoning Directive

Act as a Senior Technical Program Manager. Analyze the provided sprint retro meeting notes and produce a structured executive summary:

- **Key Architectural Decisions**: Technical context, rationale, and downstream blast radius.
- **Active Blockers & Delivery Risks**: Severity rating and concrete mitigations.
- **Action Items Table**: \`[Action] | [Owner] | [Target Date]\`

*Constraint: Return clean, formatted Markdown without conversational preamble.*`,
  },
];

interface PaletteAction {
  id: string;
  title: string;
  command: string;
  desc: string;
  shortcut: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PALETTE_ACTIONS: PaletteAction[] = [
  {
    id: 'explain',
    title: 'Explain code or concept',
    command: '/explain',
    desc: 'Breaks down logic, complexity, and borrow-checker patterns',
    shortcut: '#1',
    icon: HelpCircle,
  },
  {
    id: 'improve_prompt',
    title: 'Improve prompt',
    command: '/improve',
    desc: 'Optimizes directives for reasoning LLMs with structured outputs',
    shortcut: '#2',
    icon: Wand2,
  },
  {
    id: 'translate',
    title: 'Translate text or code',
    command: '/translate',
    desc: 'Idiomatic natural & technical translation across languages',
    shortcut: '#3',
    icon: Languages,
  },
  {
    id: 'fix_grammar',
    title: 'Review and polish',
    command: '/review',
    desc: 'Audit syntax, tone, and technical clarity',
    shortcut: '#4',
    icon: CheckCheck,
  },
  {
    id: 'summarize',
    title: 'Summarize key points',
    command: '/summarize',
    desc: 'Condenses logs, threads, and diffs into dense bullet points',
    shortcut: '#5',
    icon: FileText,
  },
];

interface AgentProfile {
  id: string;
  name: string;
  handle: string;
  role: string;
  desc: string;
  model: string;
  shortcut: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AGENT_PROFILES: AgentProfile[] = [
  {
    id: 'coder',
    name: 'Systems Coder',
    handle: '@coder',
    role: 'Rust & Low-Level Specialist',
    desc: 'Memory safety, zero-cost abstractions, and concurrency',
    model: 'claude-3-7-sonnet',
    shortcut: 'Alt+1',
    icon: Code2,
  },
  {
    id: 'prompt',
    name: 'Prompt Engineer',
    handle: '@prompt',
    role: 'Reasoning & System Prompts',
    desc: 'Few-shot calibration, structured outputs, and chain-of-thought',
    model: 'gpt-4o',
    shortcut: 'Alt+2',
    icon: Sparkles,
  },
  {
    id: 'reviewer',
    name: 'Security Auditor',
    handle: '@reviewer',
    role: 'Vulnerability & Quality Gate',
    desc: 'OWASP patterns, memory leaks, race conditions, and edge cases',
    model: 'claude-3-5-sonnet',
    shortcut: 'Alt+3',
    icon: ShieldAlert,
  },
  {
    id: 'concise',
    name: 'Direct CLI Agent',
    handle: '@terminal',
    role: 'Terminal Command Synthesizer',
    desc: 'Executable shell pipelines without conversational preamble',
    model: 'gemini-2.5-flash',
    shortcut: 'Alt+4',
    icon: Terminal,
  },
];

export const InteractiveHudSimulator: React.FC = () => {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'COMMANDS' | 'AGENTS'>('ALL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState<AgentProfile | null>(null);
  const [viewMode, setViewMode] = useState<'SEARCH' | 'RESULT'>('SEARCH');
  const [activeActionId, setActiveActionId] = useState('explain');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHudVisible, setIsHudVisible] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const streamTimerRef = useRef<number | null>(null);
  const currentSample = CONTEXT_SAMPLES[activeSampleIndex];

  // Clear active stream timer to avoid orphaned intervals and main-thread churn
  const clearStreamTimer = useCallback(() => {
    if (streamTimerRef.current !== null) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearStreamTimer();
    };
  }, [clearStreamTimer]);

  // Streaming effect - optimized to ~32ms intervals with 8-character chunks
  // to avoid main-thread churn and excessive React 19 reconciliation passes
  const streamText = useCallback((fullText: string) => {
    clearStreamTimer();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayedOutput(fullText);
      setIsStreaming(false);
      return;
    }

    setIsStreaming(true);
    setDisplayedOutput('');
    let currentIdx = 0;
    const chunkSize = 8;
    streamTimerRef.current = window.setInterval(() => {
      currentIdx += chunkSize;
      if (currentIdx >= fullText.length) {
        setDisplayedOutput(fullText);
        setIsStreaming(false);
        clearStreamTimer();
      } else {
        setDisplayedOutput(fullText.substring(0, currentIdx));
      }
    }, 32);
  }, [clearStreamTimer]);

  const handleExecute = useCallback((actionId: string) => {
    setActiveActionId(actionId);
    setViewMode('RESULT');
    streamText(currentSample.resultOutput);
  }, [currentSample.resultOutput, streamText]);

  const handleSelectAgent = (agent: AgentProfile) => {
    setSelectedAgent(agent);
    setSearchQuery('');
    inputRef.current?.focus();
  };

  // Demo walkthrough simulation
  const runDemoWalkthrough = () => {
    setIsHudVisible(true);
    setViewMode('SEARCH');
    setSelectedAgent(null);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setSearchQuery('/explain');
      setSelectedIndex(0);
      handleExecute('explain');
      return;
    }

    setSearchQuery('');
    setSelectedIndex(0);

    setTimeout(() => {
      setSearchQuery('/explain');
      setSelectedIndex(0);
    }, 450);

    setTimeout(() => {
      handleExecute('explain');
    }, 1100);
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const actionMatches = PALETTE_ACTIONS.filter((action) => {
      if (activeTab === 'AGENTS') return false;
      if (!q) return true;
      return (
        action.title.toLowerCase().includes(q) ||
        action.command.toLowerCase().includes(q) ||
        action.desc.toLowerCase().includes(q)
      );
    });

    const agentMatches = AGENT_PROFILES.filter((agent) => {
      if (activeTab === 'COMMANDS') return false;
      if (!q) return true;
      return (
        agent.name.toLowerCase().includes(q) ||
        agent.handle.toLowerCase().includes(q) ||
        agent.desc.toLowerCase().includes(q) ||
        agent.model.toLowerCase().includes(q)
      );
    });

    const combined: Array<
      | { type: 'action'; data: PaletteAction }
      | { type: 'agent'; data: AgentProfile }
    > = [];

    if (activeTab === 'ALL' || activeTab === 'COMMANDS') {
      actionMatches.forEach((a) => combined.push({ type: 'action', data: a }));
    }
    if (activeTab === 'ALL' || activeTab === 'AGENTS') {
      agentMatches.forEach((ag) => combined.push({ type: 'agent', data: ag }));
    }

    return combined;
  }, [searchQuery, activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsHudVisible((prev) => !prev);
      return;
    }

    if (!isHudVisible) return;

    if (viewMode === 'SEARCH') {
      if (e.key === 'ArrowDown' || (e.key === 'j' && e.ctrlKey)) {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp' || (e.key === 'k' && e.ctrlKey)) {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          if (selected.type === 'action') {
            handleExecute(selected.data.id);
          } else {
            handleSelectAgent(selected.data);
          }
        }
      } else if (e.key >= '1' && e.key <= '5' && !e.altKey && !e.ctrlKey && searchQuery === '') {
        e.preventDefault();
        const action = PALETTE_ACTIONS[parseInt(e.key, 10) - 1];
        if (action) handleExecute(action.id);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSearchQuery('');
        setSelectedAgent(null);
      } else if (e.key >= '1' && e.key <= '4' && e.altKey) {
        e.preventDefault();
        const agent = AGENT_PROFILES[parseInt(e.key, 10) - 1];
        if (agent) handleSelectAgent(agent);
      }
    } else if (viewMode === 'RESULT') {
      if (e.key === 'Escape') {
        e.preventDefault();
        clearStreamTimer();
        setIsStreaming(false);
        setViewMode('SEARCH');
        setDisplayedOutput('');
        setTimeout(() => inputRef.current?.focus(), 50);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        copyResult();
      }
    }
  };

  const copyResult = () => {
    navigator.clipboard?.writeText(currentSample.resultOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetToSearch = () => {
    clearStreamTimer();
    setIsStreaming(false);
    setViewMode('SEARCH');
    setDisplayedOutput('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const currentAction = PALETTE_ACTIONS.find((a) => a.id === activeActionId) || PALETTE_ACTIONS[0];

  return (
    <div
      id="preview"
      className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-8 sm:py-12 focus:outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="OmniCmd Interactive HUD Simulator. Press Super plus Space or use the controls below to interact."
    >
      {/* Context Selector Bar - Responsive Stacking & Full 44px Touch Targets */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div
          role="tablist"
          aria-label="Code buffer presets"
          className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1.5 sm:pb-0"
        >
          <span className="text-xs font-mono text-slate-400 mr-1 shrink-0">
            Buffer:
          </span>
          {CONTEXT_SAMPLES.map((sample, idx) => (
            <button
              key={sample.id}
              type="button"
              role="tab"
              aria-selected={activeSampleIndex === idx}
              tabIndex={0}
              onClick={() => {
                setActiveSampleIndex(idx);
                setViewMode('SEARCH');
                setDisplayedOutput('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveSampleIndex(idx);
                  setViewMode('SEARCH');
                  setDisplayedOutput('');
                }
              }}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border shrink-0 flex items-center justify-center ${
                activeSampleIndex === idx
                  ? 'bg-white/[0.08] text-white border-white/20 font-medium'
                  : 'bg-white/[0.02] text-slate-400 border-white/[0.04] hover:bg-white/[0.05] hover:text-slate-200'
              }`}
            >
              {sample.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsHudVisible((prev) => !prev)}
            aria-expanded={isHudVisible}
            aria-label={isHudVisible ? 'Hide HUD overlay' : 'Show HUD overlay'}
            className="flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-mono bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>{isHudVisible ? 'Hide HUD' : 'Show HUD'}</span>
          </button>

          <button
            type="button"
            onClick={runDemoWalkthrough}
            aria-label="Simulate keystroke execution"
            className="flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 transition-all cursor-pointer shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulate</span>
          </button>
        </div>
      </div>

      {/* Realistic Desktop / IDE Shell */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#07080c] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden min-h-[500px] sm:min-h-[560px] flex flex-col">
        {/* Editor Window Chrome */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0a0c12] border-b border-white/[0.06] select-none shrink-0 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]/80 inline-block border border-[#e0443e]" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]/80 inline-block border border-[#dea123]" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]/80 inline-block border border-[#1aab29]" />
            </div>

            {/* Editor File Tab */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-[#07080c] border border-white/[0.08] text-xs font-mono text-slate-300 min-w-0">
              <FileCode className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">{currentSample.fileName}</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-400 shrink-0">
            <span>Active Window: Neovim / VS Code</span>
            <span>•</span>
            <span className="text-emerald-400">OmniCmd Daemon: Active (18ms)</span>
          </div>
        </div>

        {/* Editor Background Code Content (Simulating Active Screen) */}
        <div className="relative flex-1 p-4 sm:p-6 font-mono text-xs text-slate-400 select-none overflow-hidden bg-gradient-to-b from-[#07080c] to-[#040508]">
          <div className="opacity-40 filter blur-[0.3px] space-y-1.5 leading-relaxed max-w-2xl">
            <div className="text-slate-400">// Press Super+Space over any active cursor</div>
            <div>
              <span className="text-purple-400">use</span>{' '}
              <span className="text-slate-200">tauri::Manager;</span>
            </div>
            <div>
              <span className="text-purple-400">use</span>{' '}
              <span className="text-slate-200">tokio::sync::mpsc;</span>
            </div>
            <div className="pt-2">
              <span className="text-blue-400">#[tauri::command]</span>
            </div>
            <div>
              <span className="text-purple-400">pub async fn</span>{' '}
              <span className="text-yellow-300">invoke_omni_prompt</span>(
              <span className="text-orange-300">app:</span> AppHandle,{' '}
              <span className="text-orange-300">payload:</span> String) -&gt; Result&lt;(), ()&gt; {'{'}
            </div>
            <div className="pl-4 text-emerald-300">
              // Selected buffer to ingest into HUD:
            </div>
            <div className="pl-4 px-2 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-slate-100">
              <pre className="m-0 font-mono text-xs overflow-x-auto">{currentSample.payload}</pre>
            </div>
            <div className="pl-4">
              <span className="text-slate-200">Ok(())</span>
            </div>
            <div>{'}'}</div>
          </div>

          {/* Translucent Floating OmniCmd HUD Overlay */}
          {isHudVisible && (
            <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 z-20 bg-black/50 backdrop-blur-[2px]">
              <div className="w-full max-w-xl glass-panel-elevated rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.2)] flex flex-col border border-white/15 max-h-[95%] sm:max-h-[88%]">
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-black/40 border-b border-white/[0.08] select-none shrink-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-5 h-5 rounded-md bg-white/[0.08] flex items-center justify-center text-white shrink-0">
                      <Terminal className="w-3 h-3 text-sky-400" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-white tracking-tight">
                      OmniCmd
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-400 border border-white/[0.06] hidden xs:inline-block">
                      0.8ms IPC
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400 shrink-0">
                    <kbd className="keycap-3d px-1.5 py-0.5 rounded bg-[#161922] text-slate-200 text-[10px]">
                      Esc
                    </kbd>
                    <span className="text-[10px] text-slate-400 hidden xs:inline">to vanish</span>
                  </div>
                </div>

                {/* Mode: SEARCH */}
                {viewMode === 'SEARCH' && (
                  <div className="flex flex-col min-w-0">
                    {/* Input Bar */}
                    <div className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3.5 border-b border-white/[0.08] gap-2.5 sm:gap-3 bg-black/20">
                      <Search className="w-4 h-4 text-sky-400 shrink-0" />

                      {selectedAgent && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono shrink-0">
                          <Bot className="w-3 h-3" />
                          <span>{selectedAgent.handle}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedAgent(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedAgent(null);
                              }
                            }}
                            className="hover:text-white ml-1 min-w-[28px] min-h-[28px] flex items-center justify-center cursor-pointer text-sm"
                            aria-label={`Remove filter ${selectedAgent.handle}`}
                          >
                            ×
                          </button>
                        </div>
                      )}

                      <input
                        ref={inputRef}
                        type="text"
                        role="combobox"
                        aria-expanded={viewMode === 'SEARCH'}
                        aria-haspopup="listbox"
                        aria-autocomplete="list"
                        aria-controls="hud-palette-list"
                        aria-activedescendant={filteredItems[selectedIndex] ? `hud-item-${selectedIndex}` : undefined}
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setSelectedIndex(0);
                        }}
                        aria-label="Search actions, personas, or type directive"
                        placeholder={
                          selectedAgent
                            ? 'Type directive or #1..#5...'
                            : 'Search actions (#1..#5), personas (@coder)...'
                        }
                        className="flex-1 bg-transparent text-base sm:text-sm text-white placeholder:text-slate-400 focus:outline-none font-sans min-w-0"
                      />

                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSearchQuery('');
                            }
                          }}
                          className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded text-slate-400 hover:text-white cursor-pointer"
                          aria-label="Clear search input"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      <div className="hidden sm:flex items-center gap-1 shrink-0">
                        <kbd className="keycap-3d px-1.5 py-0.5 rounded bg-[#161922] text-[10px] text-slate-300 font-mono">
                          ↑↓
                        </kbd>
                        <kbd className="keycap-3d px-1.5 py-0.5 rounded bg-[#161922] text-[10px] text-slate-300 font-mono">
                          ↵
                        </kbd>
                      </div>
                    </div>

                    {/* Ingested Clipboard Context Indicator - Responsive Wrapping */}
                    <div className="px-3 sm:px-4 py-2 bg-black/40 border-b border-white/[0.04] flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-xs">
                      <div className="flex items-center gap-2 overflow-hidden min-w-0">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 shrink-0 font-medium">
                          CLIPBOARD INGEST
                        </span>
                        <span className="font-mono text-slate-300 truncate text-[11px]">
                          {currentSample.payload.split('\n')[0]}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0 self-start xs:self-auto">
                        {currentSample.badge}
                      </span>
                    </div>

                    {/* Filter Tabs - Minimum 44px Touch Targets */}
                    <div className="px-2 sm:px-3 py-1 bg-black/30 border-b border-white/[0.04] flex items-center justify-between text-[11px] font-mono overflow-x-auto">
                      <div className="flex items-center gap-1 shrink-0" role="tablist" aria-label="Command categories">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activeTab === 'ALL'}
                          tabIndex={0}
                          onClick={() => { setActiveTab('ALL'); setSelectedIndex(0); }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setActiveTab('ALL');
                              setSelectedIndex(0);
                            }
                          }}
                          className={`min-h-[44px] px-3 py-2 rounded-lg cursor-pointer transition-colors flex items-center justify-center ${
                            activeTab === 'ALL'
                              ? 'bg-white/[0.1] text-white font-medium'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          All ({filteredItems.length})
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activeTab === 'COMMANDS'}
                          tabIndex={0}
                          onClick={() => { setActiveTab('COMMANDS'); setSelectedIndex(0); }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setActiveTab('COMMANDS');
                              setSelectedIndex(0);
                            }
                          }}
                          className={`min-h-[44px] px-3 py-2 rounded-lg cursor-pointer transition-colors flex items-center justify-center ${
                            activeTab === 'COMMANDS'
                              ? 'bg-white/[0.1] text-white font-medium'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Actions ({PALETTE_ACTIONS.length})
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={activeTab === 'AGENTS'}
                          tabIndex={0}
                          onClick={() => { setActiveTab('AGENTS'); setSelectedIndex(0); }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setActiveTab('AGENTS');
                              setSelectedIndex(0);
                            }
                          }}
                          className={`min-h-[44px] px-3 py-2 rounded-lg cursor-pointer transition-colors flex items-center justify-center ${
                            activeTab === 'AGENTS'
                              ? 'bg-white/[0.1] text-white font-medium'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Personas ({AGENT_PROFILES.length})
                        </button>
                      </div>

                      <span className="text-slate-400 text-[10px] hidden md:inline ml-2 shrink-0">
                        Vim: Ctrl+j / k
                      </span>
                    </div>

                    {/* Action & Persona Items List - Minimum 48px Height per Row */}
                    <div
                      id="hud-palette-list"
                      role="listbox"
                      aria-label="Actions and personas"
                      className="p-2 space-y-1 max-h-56 sm:max-h-64 overflow-y-auto"
                    >
                      {filteredItems.map((item, idx) => {
                        const isSelected = selectedIndex === idx;

                        if (item.type === 'action') {
                          const action = item.data;
                          const IconComp = action.icon;
                          return (
                            <button
                              key={`act-${action.id}`}
                              id={`hud-item-${idx}`}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              tabIndex={isSelected ? 0 : -1}
                              onClick={() => handleExecute(action.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleExecute(action.id);
                                }
                              }}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`w-full flex items-center justify-between min-h-[48px] p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer text-left ${
                                isSelected
                                  ? 'bg-white/[0.08] text-white shadow-sm border border-white/[0.12]'
                                  : 'border border-transparent hover:bg-white/[0.03] text-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                                    isSelected
                                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                                      : 'bg-white/[0.04] text-slate-400 border-white/[0.06]'
                                  }`}
                                >
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2">
                                    <span className="text-xs font-semibold text-white truncate">{action.title}</span>
                                    <span className="font-mono text-[11px] text-sky-400 shrink-0">
                                      {action.command}
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-slate-300 truncate">
                                    {action.desc}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
                                <kbd className="keycap-3d px-1.5 py-0.5 rounded bg-[#161922] font-mono text-[10px] text-slate-300 font-semibold">
                                  {action.shortcut}
                                </kbd>
                                {isSelected && (
                                  <CornerDownLeft className="w-3.5 h-3.5 text-sky-400 hidden xs:inline" />
                                )}
                              </div>
                            </button>
                          );
                        }

                        const agent = item.data;
                        const AgentIcon = agent.icon;
                        return (
                          <button
                            key={`ag-${agent.id}`}
                            id={`hud-item-${idx}`}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            tabIndex={isSelected ? 0 : -1}
                            onClick={() => handleSelectAgent(agent)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleSelectAgent(agent);
                              }
                            }}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`w-full flex items-center justify-between min-h-[48px] p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer text-left ${
                              isSelected
                                ? 'bg-indigo-500/15 text-white shadow-sm border border-indigo-500/30'
                                : 'border border-transparent hover:bg-white/[0.03] text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                                  isSelected
                                    ? 'bg-indigo-500/25 text-indigo-300 border-indigo-500/40'
                                    : 'bg-white/[0.04] text-indigo-400 border-white/[0.06]'
                                }`}
                              >
                                <AgentIcon className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col min-w-0 flex-1">
                                <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2">
                                  <span className="text-xs font-semibold text-white truncate">{agent.name}</span>
                                  <span className="font-mono text-[11px] text-indigo-400 font-bold shrink-0">
                                    {agent.handle}
                                  </span>
                                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06] shrink-0">
                                    {agent.model}
                                  </span>
                                </div>
                                <span className="text-[11px] text-slate-300 truncate">
                                  {agent.role}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
                              <kbd className="keycap-3d px-1.5 py-0.5 rounded bg-[#161922] font-mono text-[10px] text-indigo-300 font-semibold">
                                {agent.shortcut}
                              </kbd>
                              {isSelected && (
                                <CornerDownLeft className="w-3.5 h-3.5 text-indigo-400 hidden xs:inline" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Mode: RESULT */}
                {viewMode === 'RESULT' && (
                  <div className="flex flex-col bg-black/30 min-w-0">
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-white/[0.08] bg-black/40 shrink-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-white/[0.08] text-white border border-white/10 shrink-0">
                          {currentAction.command}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-xs font-mono text-slate-300 truncate">
                          {selectedAgent ? selectedAgent.model : 'claude-3-7-sonnet'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={copyResult}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              copyResult();
                            }
                          }}
                          aria-label={copied ? "Output copied to clipboard" : "Copy output to clipboard"}
                          className="flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-all cursor-pointer shadow-sm"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy (↵)</span>
                            </>
                          )}
                        </button>
                        <div aria-live="polite" aria-atomic="true" className="sr-only">
                          {copied ? "Result buffer copied to clipboard" : ""}
                        </div>

                        <button
                          type="button"
                          onClick={resetToSearch}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              resetToSearch();
                            }
                          }}
                          aria-label="Back to command search"
                          className="flex items-center justify-center gap-1 min-h-[44px] px-3 py-2 rounded-xl text-xs font-mono bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] transition-all cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                      </div>
                    </div>

                    <div
                      tabIndex={0}
                      role="region"
                      aria-label="Generated output buffer"
                      className="p-3 sm:p-5 text-slate-200 font-sans leading-relaxed max-h-56 sm:max-h-72 overflow-y-auto text-xs sm:text-sm focus:outline-none"
                    >
                      <MarkdownView content={displayedOutput} />
                      {isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-white motion-safe:animate-pulse align-middle" />
                      )}
                    </div>

                    <div className="px-3 sm:px-4 py-2 bg-black/50 border-t border-white/[0.06] flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-[11px] font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">18ms wake</span>
                        <span className="text-slate-400">•</span>
                        <span>124 tok/s</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <span className="hidden xs:inline">Press</span>
                        <kbd className="keycap-3d px-1.5 py-0.5 rounded bg-[#161922] text-white">Enter</kbd>
                        <span>to copy buffer</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* HUD Footer for SEARCH view */}
                {viewMode === 'SEARCH' && (
                  <div className="px-3 sm:px-4 py-2 bg-black/60 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-slate-300">Rust Daemon</span>
                      <span className="text-slate-400">•</span>
                      <span>24MB RAM</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="hidden xs:inline">↑↓ Navigate •</span>
                      <span>↵ Select</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
