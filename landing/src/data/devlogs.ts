import { DevlogRelease } from '../types';

export const FALLBACK_DEVLOGS: DevlogRelease[] = [
  {
    id: 101,
    tag_name: 'v0.1.0',
    name: 'v0.1.0 — Initial Release: Translucent HUD & Instant AI Shortcuts',
    published_at: '2025-02-28T18:00:00Z',
    html_url: 'https://github.com/themistrinel/omnicmd/releases/tag/v0.1.0',
    author: {
      login: 'omnicmd-team',
      avatar_url: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    },
    prerelease: false,
    draft: false,
    body: `### Core Architecture & Features
- **Tauri v2 Native HUD Window**: Ultra-lightweight borderless acrylic overlay with zero frame overhead (24 MB idle RAM).
- **Zero-Latency Global Hotkey**: Instant summon via \`Super+Space\` or \`Ctrl+Space\` with Wayland UNIX domain socket IPC.
- **Raycast-Style Multi-Persona Architecture**: Fast profile switching between \`@dev\`, \`@prompt\`, \`@writer\`, \`@translator\`.
- **Integrated Tauri Updater**: Autonomous background delta binary updates powered by \`@tauri-apps/plugin-updater\`.
- **9router & OpenAI Compatible Endpoints**: Full local LLM streaming with support for Gemini 3.8 Flash, Claude 3.5 Sonnet, and Llama 3.3.`,
  },
  {
    id: 100,
    tag_name: 'v0.0.9-alpha',
    name: 'v0.0.9-alpha — IPC Throughput Optimization & Local SQLite Vault',
    published_at: '2025-02-15T14:30:00Z',
    html_url: 'https://github.com/themistrinel/omnicmd/releases/tag/v0.0.9-alpha',
    author: {
      login: 'core-architect',
      avatar_url: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    },
    prerelease: true,
    draft: false,
    body: `### Performance & Storage
- Implemented zero-copy IPC messaging pipeline reducing bridge latency to < 0.8ms.
- Encrypted local history store with embedded SQLite and instant token usage metrics.
- Added clipboard watcher with intelligent multi-format detection (code snippets, JSON, URLs).`,
  },
];
