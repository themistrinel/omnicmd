import { BenchmarkRow, ShortcutItem } from './types';

export const GITHUB_URL = 'https://github.com/themistrinel/omnicmd';
export const RELEASES_URL = 'https://github.com/themistrinel/omnicmd/releases';
export const LICENSE_URL = 'https://github.com/themistrinel/omnicmd/blob/master/LICENSE';

export const INSTALL_CURL_COMMAND =
  'curl -fsSL https://raw.githubusercontent.com/themistrinel/omnicmd/master/install.sh | bash';

export const UPDATE_COMMAND = 'omnicmd-update';

export const BUILD_FROM_SOURCE_COMMAND =
  'git clone https://github.com/themistrinel/omnicmd.git && pnpm install && pnpm tauri build';

export const BENCHMARK_ROWS: BenchmarkRow[] = [
  {
    metric: 'Idle RAM Footprint',
    omniValue: '24 MB',
    electronValue: '380 MB - 600 MB',
    advantage: '94% lighter memory consumption',
  },
  {
    metric: 'Cold Hotkey Invocation',
    omniValue: '18 ms',
    electronValue: '850 ms - 1,400 ms',
    advantage: 'Instantaneous overlay response',
  },
  {
    metric: 'Installer / Binary Size',
    omniValue: '12 MB',
    electronValue: '145 MB - 220 MB',
    advantage: 'Single native binary without bundled Chrome',
  },
  {
    metric: 'Context Switch Latency',
    omniValue: '0 window switches',
    electronValue: '3-5 switches per prompt',
    advantage: 'Floats over active IDE without focus loss',
  },
  {
    metric: 'IPC Channel Throughput',
    omniValue: '< 0.8 ms (Rust Native IPC)',
    electronValue: '18 ms - 45 ms (Node Bridge)',
    advantage: 'Zero-copy serialization between core and UI',
  },
];

export const SHORTCUT_ITEMS: ShortcutItem[] = [
  {
    title: 'Toggle Floating HUD',
    description: 'Summons or hides OmniCmd from anywhere in OS',
    keys: ['Super', 'Space'],
    separator: '+',
  },
  {
    title: 'Instant Action Trigger',
    description: 'Executes quick-action directives 1 through 8 directly',
    keys: ['Alt', '1 .. 8'],
    separator: '+',
  },
  {
    title: 'Vim & List Navigation',
    description: 'Traverse prompt actions and options smoothly',
    keys: ['Ctrl + j / k', '↑ / ↓'],
    separator: 'or',
  },
  {
    title: 'Switch Persona Profile',
    description: 'Cycles between Developer, Prompt Eng, Concise, etc.',
    keys: ['Alt', '1 .. 6'],
    separator: '+',
  },
  {
    title: 'Cycle AI Provider',
    description: 'Switch between 9router, Ollama, OpenAI endpoints',
    keys: ['/provider'],
  },
  {
    title: 'History Search',
    description: 'Search past outputs, token counts, and timestamps',
    keys: ['/history'],
  },
  {
    title: 'Settings Modal',
    description: 'Configure models, temperatures, and HUD theme',
    keys: ['/settings'],
  },
  {
    title: 'Dismiss & Back',
    description: 'Clears current view or hides HUD to background',
    keys: ['Esc'],
  },
];
