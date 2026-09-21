import { Translations } from '../types';

export const en: Translations = {
  nav: {
    cockpit: 'Cockpit',
    features: 'Features',
    benchmarks: 'Benchmarks',
    commands: 'Commands',
    changelog: 'Changelog',
    downloadBtn: 'Download v0.1.0',
    downloadFor: 'Download for',
    systemDirectory: 'SYSTEM DIRECTORY',
  },
  hero: {
    badgeRuntime: 'Local-First Desktop AI // Open Source',
    badgeZeroCloud: 'Zero telemetry egress',
    headline: 'The Keyboard-Driven AI HUD for Your Active Editor',
    subtitle:
      'Composited directly over Neovim, VS Code, or your terminal. Wakes in 18ms with zero window switches, zero telemetry egress, and native Rust performance.',
    globalHotkey: 'GLOBAL HOTKEY:',
    hotkeyComment: '// floats over Neovim, VS Code, or terminal',
    downloadBtn: 'Download for',
    downloadDetails: '~12MB',
    githubRepo: 'GitHub Repo',
    copied: 'Copied',
    copy: 'Copy',
  },
  features: {
    pill: 'NATIVE ARCHITECTURE // TAURI V2 & RUST',
    headline: 'Engineered for Focused Terminal & Editor Flow',
    subtitle:
      'Sub-20ms wake, instant buffer capture, and local prompt orchestration without losing editor focus or disrupting tiling layouts.',
    card1: {
      tag: 'QUICK ACTIONS // [ALT+1..8]',
      badge: 'PROMPT DISPATCHER',
      title: 'Instant Buffer Transformation',
      description:
        'OmniCmd formats any highlighted text with a single shortcut (Alt+1 through Alt+8) into structured LLM directives. Active editor selections receive target system prompts immediately, without manual copy-pasting.',
      matrixHeader: 'INTERACTIVE DIRECTIVES',
      directives: [
        { cmd: '/improve', key: 'Alt+1', desc: 'Prompt enhancer' },
        { cmd: '/translate', key: 'Alt+2', desc: 'Translate code/doc' },
        { cmd: '/fix', key: 'Alt+3', desc: 'Fix code & syntax' },
        { cmd: '/summarize', key: 'Alt+4', desc: 'Summarize content' },
      ],
      footerConfig: 'Declarative config at ~/.config/omnicmd/prompts.json',
      footerCount: '8 Ready Directives',
    },
    card2: {
      tag: 'GLOBAL OVERLAY // [SUPER+SPACE]',
      badge: '18MS WAKE',
      title: 'Translucent Floating HUD in Rust & Tauri v2',
      description:
        'Wakes in 18ms without stealing window focus or resetting tiling splits. A lightweight overlay that preserves editor state and eliminates dozens of browser tabs.',
      matrixHeader: 'INSTANT HUD SUMMON',
      meta: {
        hotkey: { label: 'Global Hotkey', value: 'Super + Space' },
        provider: { label: 'Active Provider', value: '9router' },
        latency: { label: 'Wake Latency', value: '18 ms' },
        compat: { label: 'Compatibility', value: 'Multi-LLM' },
      },
      footerCompositor: 'Native compositor // Wayland, macOS and Windows',
      footerSwitching: '0 Context Switching',
    },
    statusBar: {
      title: 'RUNTIME STATUS // 9ROUTER + OLLAMA',
      model: '9router: ag/gemini-3.8-flash-low',
    },
  },
  workflow: {
    pill: 'ERGONOMICS // HOME-ROW PIPELINE',
    headline: 'THREE KEYSTROKES. ZERO MOUSE.',
    subtitle:
      'Eliminate the friction of switching to browser tabs, pasting snippets, and waiting for heavy electron wrappers. The pipeline lives on your home row.',
    stage1: {
      label: 'STAGE 01 // INGEST',
      time: '18ms',
      title: 'Contextual Snapshot',
      description:
        'Highlight an unresolved compiler diagnostic, complex regex, or SQL table schema in your IDE. Press the global hotkey. OmniCmd wakes over your active editor with the buffer pre-loaded.',
      badge: 'Native focus grab without tiling reflow',
    },
    stage2: {
      label: 'STAGE 02 // DISPATCH',
      time: '< 1ms',
      title: 'Single-Stroke Execution',
      description:
        'Trigger directives with direct numeric keycaps (Alt+1 for improve, Alt+2 for translate, Alt+5 for explain). Or type slash commands (/fix, /rewrite) directly into the HUD buffer.',
      badge: 'Vim navigation: Ctrl + j / k',
    },
    stage3: {
      label: 'STAGE 03 // INJECT',
      time: 'Direct',
      title: 'Buffer Return',
      description:
        'Tokens stream in real-time from your local Ollama or cloud model. Press Enter to write formatted markdown/code directly into your clipboard, or Esc to dismiss and return focus instantly.',
      badge: 'Instant return to active editor window',
    },
    matrixTitle: 'KEYBOARD NAVIGATION MATRIX',
    matrixSubtitle: 'Universal Home-Row Navigation',
    matrixItems: {
      summon: 'Summon / Hide',
      traverse: 'Vim Traverse',
      action: 'Run Action',
      persona: 'Persona Profile',
      provider: 'Cycle Provider',
      history: 'Prompt History',
      copy: 'Copy Buffer',
      dismiss: 'Dismiss Overlay',
    },
  },
  benchmarks: {
    pill: 'HARDWARE PROFILER // COMPILED RUST VS ELECTRON',
    headline: 'COMPILED RUST DAEMON. 24MB IDLE MEMORY.',
    subtitle:
      'Most palettes are heavy web wrappers disguised as desktop apps, consuming hundreds of megabytes of RAM. OmniCmd is compiled to native machine code with Tauri v2 and sleeps at 0.0% CPU.',
    profilerTitle: 'HARDWARE TELEMETRY PROFILER',
    profilerSub: 'x86_64 Linux // Wayland Native',
    ram: {
      title: '01 // IDLE RAM CONSUMPTION',
      diff: '-95% OVERHEAD',
      omniDesc: 'OmniCmd (Rust + Tauri v2)',
      electronDesc: 'Standard Electron Palette',
    },
    latency: {
      title: '02 // COLD SUMMON LATENCY',
      diff: '52x FASTER',
      omniDesc: 'OmniCmd (Native OS Handle)',
      electronDesc: 'Electron Window Grab',
    },
    binary: {
      title: '03 // INSTALLER / BINARY PAYLOAD',
      tag: 'ZERO CHROMIUM BUNDLED',
      omniTitle: 'OMNICMD BINARY',
      omniSize: '12.4 MB',
      omniDesc: 'Single compiled ELF / Mach-O',
      electronTitle: 'ELECTRON APP',
      electronSize: '185.0 MB',
      electronDesc: 'Embedded Chrome + Node runtime',
    },
    pillars: {
      p1: {
        title: 'LOCAL EMBEDDED SQLITE',
        badge: 'LOCAL-FIRST',
        description:
          'All token logs, custom actions, and output history persist inside an embedded SQLite store at ~/.omnicmd.db. Stored strictly on your local disk with zero remote telemetry or tracking beacons.',
        detail: 'Full local FTS5 indexing & prompt history',
      },
      p2: {
        title: 'TOKIO ASYNC IPC CORE',
        badge: '< 0.8ms IPC',
        description:
          'Sub-millisecond IPC serialization connects the webview to Rust background worker threads. Server-Sent Events (SSE) stream tokens without blocking UI responsiveness or keyboard input.',
        detail: 'Zero thread contention on hotkey daemon',
      },
      p3: {
        title: 'HYBRID LOCAL & REMOTE RUNTIME',
        badge: 'HYBRID',
        description:
          'Run completely offline with local Ollama or llama.cpp endpoints (100% private, zero network traffic), or connect directly to cloud LLM APIs (9router, OpenAI, Anthropic) with the /provider hotkey.',
        detail: 'Offline llama.cpp & Ollama native socket',
      },
    },
  },
  commands: {
    pill: 'BUILT-IN DIRECTIVES // CORE CATALOG',
    headline: 'Built-in Directive Catalog',
    subtitle:
      'Every directive binds to a dedicated shortcut (Alt+1 through Alt+8) to format your active selection with focused system prompts, matching OmniCmd’s runtime catalog.',
    directivePurpose: 'Directive Purpose & Scope',
    sampleInput: 'Sample Selected Input Buffer',
    generatedOutput: 'Generated Directive Output',
    officialShortcut: 'Official Shortcut:',
    customizable: 'Customizable via ~/.config/omnicmd/prompts.json',
    count: '8 Native Directives',
    systemTitle: 'SYSTEM CONTROLS & STATUS BAR PROVIDERS',
    systemSub: 'Instant HUD Setup',
    items: [
      {
        id: 'improve',
        command: '/improve',
        name: 'Enhance Prompt',
        category: 'Engineering',
        shortcut: 'Alt+1',
        description:
          'Optimizes raw prompts with structured specifications, analytical steps, and explicit output constraints.',
        exampleContext: 'create a rust api to manage tasks with sqlite',
        outputSummary:
          'Produces a complete architectural prompt with strict typing, recommended crates (Axum + SQLx), and production error handling.',
      },
      {
        id: 'translate',
        command: '/translate',
        name: 'Translate Code & Docs',
        category: 'Language',
        shortcut: 'Alt+2',
        description:
          'Translates technical documentation, comments, or error messages while strictly preserving code syntax, identifiers, and formatting.',
        exampleContext:
          'The borrow checker enforces that references always point to valid data and cannot outlive their owner.',
        outputSummary:
          'El verificador de préstamos garantiza que las referencias siempre apunten a datos válidos sin generar referencias huérfanas.',
      },
      {
        id: 'fix',
        command: '/fix',
        name: 'Fix Code & Grammar',
        category: 'Refinement',
        shortcut: 'Alt+3',
        description:
          'Eliminates typos, phrasing mistakes, and syntax inconsistencies across commit messages, PR reviews, and docstrings.',
        exampleContext:
          'we needs to optimizes this queries because they is slow in production',
        outputSummary:
          'We need to optimize these queries because they are causing high latency in production.',
      },
      {
        id: 'summarize',
        command: '/summarize',
        name: 'Summarize Content',
        category: 'Synthesis',
        shortcut: 'Alt+4',
        description:
          'Condenses extensive CI/CD logs, compiler diagnostics, git diffs, or discussion threads into prioritized, actionable bullet points.',
        exampleContext:
          'Extensive CI/CD pipeline output with 120 lines of warnings and static linking error messages',
        outputSummary:
          '1. Missing OpenSSL dev headers. 2. Musl target requires static flag. 3. Patched build script provided.',
      },
      {
        id: 'explain',
        command: '/explain',
        name: 'Explain Concept & Code',
        category: 'Analysis',
        shortcut: 'Alt+5',
        description:
          'Deconstructs complex algorithms, Rust lifetime invariants, concurrency patterns, or obscure blocks into clear, pedagogical steps.',
        exampleContext:
          "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { if x.len() > y.len() { x } else { y } }",
        outputSummary:
          "Detailed lifetime 'a breakdown: return reference remains valid only as long as both borrowed parameters stay in scope.",
      },
      {
        id: 'rewrite',
        command: '/rewrite',
        name: 'Rewrite & Tone Adjust',
        category: 'Style',
        shortcut: 'Alt+6',
        description:
          'Refactors technical drafts, RFC proposals, or team announcements into a crisp, concise, and professional tone.',
        exampleContext:
          'i guess this endpoint is kinda weird and we should probably change it before it breaks',
        outputSummary:
          'We recommend refactoring this endpoint signature to uphold REST idempotency and ensure production predictability.',
      },
      {
        id: 'prompt',
        command: '/prompt',
        name: 'Generate Agent Prompt',
        category: 'Structuring',
        shortcut: 'Alt+7',
        description:
          'Transforms rough notes, user stories, or bug reports into rigorous instructions tailored for coding agents.',
        exampleContext:
          'need a golang microservice to process webhooks with redis deduplication',
        outputSummary:
          'Structured prompt with hexagonal architecture, Redis idempotency keys, and automated integration test suite.',
      },
      {
        id: 'custom',
        command: '/custom',
        name: 'Freeform Query',
        category: 'Ad-hoc',
        shortcut: 'Alt+8',
        description:
          'Open prompt channel for arbitrary queries, math derivations, or ad-hoc instructions with real-time SSE streaming.',
        exampleContext:
          'Write a declarative Rust macro that implements the FromStr trait for an arbitrary enum',
        outputSummary:
          'Compile-ready macro expansion without conversational filler or redundant preamble.',
      },
    ],
    systemItems: [
      {
        handle: '9router',
        name: 'Active Provider',
        shortcut: '/provider',
        specialty: 'ag/gemini-3.8-flash-low with fallback to Claude 3.5 Sonnet and GPT-4o.',
        detail: 'Sub-second first-token latency via native SSE streaming.',
      },
      {
        handle: 'Ollama Local',
        name: 'Offline Execution',
        shortcut: '/provider',
        specialty: 'Local weights (Qwen 2.5 Coder, Llama 3.3) hosted on localhost:11434.',
        detail: '100% private, zero network roundtrips outside your machine.',
      },
      {
        handle: '/history',
        name: 'SQLite Ledger',
        shortcut: 'Ctrl+H',
        specialty: 'Instant FTS5 full-text indexing over past prompts and generated outputs.',
        detail: 'Persisted locally in ~/.omnicmd.db.',
      },
      {
        handle: '/settings',
        name: 'Configuration',
        shortcut: 'Ctrl+,',
        specialty: 'Customize global hotkeys, HUD opacity, and provider API credentials.',
        detail: 'Strictly validated against JSON Schema.',
      },
    ],
  },
  downloads: {
    pill: 'BINARY ARTIFACTS // MULTI-PLATFORM',
    headline: 'Native Binaries. Compiled Machine Code.',
    subtitle:
      'Pre-compiled, cryptographically verified binary packages for Linux, macOS, and Windows. Under 15MB, licensed under MIT.',
    tabs: {
      linux: 'Linux (Arch / Hyprland / .deb)',
      mac: 'macOS (Universal)',
      windows: 'Windows (x64)',
      source: 'Build from Source',
      detected: 'DETECTED',
    },
    linux: {
      title: 'Arch Linux & Hyprland Wayland Integration',
      desc: 'Includes native Wayland clipboard integration (wl-clipboard) and dedicated Hyprland floating rules.',
      btnDeb: 'DOWNLOAD .DEB (DEBIAN / UBUNTU)',
      btnAppImage: 'UNIVERSAL .APPIMAGE',
      quickInstall: '1-Liner Quick Install (No Git Clone Required)',
      hyprlandTitle: 'Native Hyprland Window Rules (~/.config/hypr/omnicmd.conf)',
    },
    mac: {
      title: 'Universal macOS Application Bundle',
      desc: 'Native binary for Apple Silicon (M1/M2/M3/M4) and Intel x86_64. Signed and notarized for macOS 11+.',
      btnDmg: 'DOWNLOAD UNIVERSAL .DMG',
      permTitle: 'ACCESSIBILITY PERMISSIONS',
      permDesc:
        'OmniCmd requires macOS Accessibility permissions to register the global Cmd+Space hotkey and read active buffer selections without stealing permanent window focus.',
      localTitle: 'LOCAL STORAGE ONLY',
      localDesc:
        'Zero cloud telemetry. All prompt histories, custom actions, and configuration stay strictly on your local disk.',
    },
    windows: {
      title: 'Native Windows x64 Distribution',
      desc: 'Lightweight installer or standalone portable executable utilizing system WebView2 runtime.',
      btnMsi: 'DOWNLOAD INSTALLER (.MSI)',
      btnZip: 'PORTABLE (.ZIP)',
      trayTitle: 'WINDOWS SYSTEM TRAY DAEMON',
      trayDesc:
        'OmniCmd persists in the Windows system notification area. Summon with Win + Space over Visual Studio, VS Code, or Windows Terminal.',
    },
    source: {
      title: 'Compile Directly with Cargo & Tauri CLI',
      desc: 'Requires Rust 1.77+, Node.js (or pnpm), and standard OS development headers (libwebkit2gtk on Linux).',
      pipeline: 'Terminal Build Pipeline',
    },
    checksum: 'All binary artifacts signed with SHA-256 checksums',
    viewAll: 'VIEW ALL GITHUB RELEASE ARTIFACTS',
  },
  devlogs: {
    pill: 'RELEASE LOG // VERIFIED BUILDS',
    headline: 'AUDITED RELEASE LEDGER.',
    subtitle:
      'Compiled from source and cryptographically signed via automated GitHub Actions CI/CD pipelines.',
    allReleases: 'ALL RELEASES & HASHES',
    verified: 'SHA-256 VERIFIED',
    changes: [
      {
        title: 'Tauri v2 + Tokio Core',
        desc: 'Complete rewrite of background daemon into compiled Rust, dropping idle memory from 400MB to 23.8MB with sub-20ms summon.',
      },
      {
        title: 'Local Embedded SQLite',
        desc: 'Replaced browser localStorage with a zero-telemetry local SQLite database store at ~/.omnicmd.db.',
      },
      {
        title: 'Multi-Provider SSE Engine',
        desc: 'Added asynchronous token streaming with sub-millisecond thread dispatching across Ollama, 9router, OpenAI, and Anthropic.',
      },
    ],
    license: 'Open-source release licensed under MIT',
    viewCommits: 'VIEW COMMITS & SHAS →',
  },
  cta: {
    badge: 'Local-First & Telemetry-Free',
    headline: 'Stop Switching Windows.\nReclaim Your Keystrokes.',
    subtitle:
      'Under 15MB binary. 24MB idle memory footprint. Open source under the MIT License. Works completely offline with Ollama or connects directly to cloud LLM APIs.',
    downloadFor: 'Download for',
    githubRepo: 'GitHub Repository',
  },
  footer: {
    links: {
      cockpit: 'Cockpit',
      features: 'Features',
      cadence: 'Cadence',
      architecture: 'Architecture',
      commands: 'Commands',
      github: 'GitHub',
      releases: 'Releases',
      mit: 'MIT',
      top: 'Top',
    },
  },
  langSelector: {
    selectLanguage: 'Language',
    autoDetected: 'Auto-detected',
  },
};
