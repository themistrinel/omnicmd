# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Power users, software engineers, and knowledge workers who require instant AI interactions, prompt engineering, and rapid text processing across any active application without window-switching or breaking flow.

## Product Purpose

AI Commander is a lightweight, floating desktop HUD / command palette launcher that brings generative AI capabilities directly to the user's keystroke, eliminating context switches between everyday tools and browser-based AI chats.

## Positioning

A zero-friction, keyboard-first floating command interface (always-on-top, borderless, translucent HUD) that automatically grabs clipboard context, routes requests through customizable AI personas and models, and delivers ready-to-use prompt transformations and answers in seconds.

## Operating Context

Triggered globally via hotkey (e.g., Option/Alt+Space or Command/Ctrl+Space) on top of any active IDE, browser, terminal, or document; reads clipboard instantly; navigates strictly with keyboard arrows/Enter/Escape; returns results ready to copy and paste immediately back into the active workflow.

## Capabilities and Constraints

- Desktop app built with Tauri v2, React 19, TypeScript, Tailwind CSS v4, and Vite.
- Floating 800x560 borderless, transparent, non-resizable window configured to stay on top and skip the OS taskbar.
- Pre-built prompt transformation actions (Prompt improvement, Translation, Grammar correction, Summarization, Code explanation, Rewriting, Idea-to-prompt, Custom query).
- Multi-persona profile switching (General, Prompt Engineer, Coding, Translator, Writing, Custom).
- Configurable AI endpoints via 9router / OpenAI-compatible API specifications with model, key, and temperature controls.
- Speech-to-text / voice modal input support.
- Local history tracking and persistent settings storage.

## Brand Commitments

- Product Name: AI Commander (`ai-commander`).
- Voice & Tone: Fast, precise, dense, distraction-free, engineered for developer flow and technical productivity.

## Evidence on Hand

- Functional Tauri v2 desktop window shell and capabilities (`src-tauri/tauri.conf.json`).
- Pre-configured prompt actions and system prompts (`src/lib/actions/index.ts`).
- Persona profiles system (`src/lib/profiles/index.ts`).
- Local storage, clipboard, global shortcut, and 9router AI provider services (`src/lib/`).

## Product Principles

- **Speed over spectacle:** Instant invocation, zero-latency keystrokes, and direct actionable output.
- **Non-intrusive presence:** Floats seamlessly above the user's primary work without cluttering the screen or disrupting cognitive focus.
- **Keyboard-first ergonomics:** Every core interaction (searching, executing, switching profiles, copying, closing) is fully operable via keyboard shortcuts and muscle memory.
- **Pragmatic transparency:** Clear visibility into the active persona, active model, loading states, and output tokens.

## Accessibility & Inclusion

- 100% keyboard navigable with logical tab ordering, arrow key selection, and Escape behavior.
- High-contrast typography optimized for dark translucent HUD backgrounds.
- Clear visual focus states and keyboard shortcut indicators on every interactive element.
