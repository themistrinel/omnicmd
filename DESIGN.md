---
name: OmniCmd
description: Instant translucent AI HUD for developer keystroke
colors:
  primary: "#38bdf8"
  primary-hover: "#7dd3fc"
  accent: "#50a2e8"
  background: "#08090d"
  surface-ground: "#090a0f"
  surface-panel: "rgba(12, 14, 20, 0.90)"
  surface-card: "rgba(20, 22, 27, 0.50)"
  surface-card-hover: "rgba(30, 34, 42, 0.60)"
  border-subtle: "rgba(255, 255, 255, 0.06)"
  border-default: "rgba(255, 255, 255, 0.10)"
  border-accent: "rgba(56, 189, 248, 0.30)"
  text-primary: "#f8fafc"
  text-secondary: "#cbd5e1"
  text-muted: "#64748b"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#082f49"
    rounded: "{rounded.lg}"
    padding: "14px 24px"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "14px 20px"
---

# Design System: OmniCmd

## Overview

**Creative North Star: "The Tactical Glass Cockpit"**

OmniCmd is an ultra-fast, distraction-free command HUD designed for software engineers, DevOps specialists, and technical power users. The aesthetic rejects bloated SaaS layouts, generic decorative gradients, and floating pastel illustrations. Instead, it commits completely to an obsidian dark palette, razor-sharp hairline borders, translucent glass backdrops, and high-density tabular telemetry.

Every element on the screen exists to facilitate immediate keyboard interaction and lightning-fast information retrieval. Visual hierarchy is achieved through precise typographic weight contrasts, luminous azure accents on deep obsidian planes, and authentic terminal keystroke ergonomics.

**Key Characteristics:**
- Obsidian slate ground with translucent high-blur HUD glass panels (`rgba(12, 14, 20, 0.90)`).
- Electric azure accents (`#38bdf8`) used strictly for active states, key commands, and latency metrics.
- Tactile monospace `<kbd>` indicators and tabular figures (`tabular-nums`) for zero-drift telemetry.
- Zero decorative fluff: no kickers, no generic icon cards, and no synthetic vanity metrics.

## Colors

The palette is engineered for prolonged use in dark IDE and terminal workspaces, combining deep obsidian grounds with high-contrast electric azure highlights.

### Primary
- **Electric Azure** (`#38bdf8`): Used for primary action buttons, focused input rings, active shortcut tags, and benchmark highlight values.

### Secondary
- **HUD Cyan** (`#50a2e8`): Used for secondary focal points, icon badges, and telemetry stream indicators.

### Neutral
- **Obsidian Slate Ground** (`#08090d`): The foundational infinite-depth canvas background.
- **Glass Panel Surface** (`rgba(12, 14, 20, 0.90)`): Frosted HUD containers with backdrop blur.
- **Translucent Card Surface** (`rgba(20, 22, 27, 0.50)`): Subordinate panels, code blocks, and list items.
- **Hairline Border** (`rgba(255, 255, 255, 0.10)`): Crisp 1px division separating translucent planes.
- **Primary Text** (`#f8fafc`): Crisp white for high-legibility headings and code.
- **Secondary Text** (`#cbd5e1`): Neutral slate for explanations and long-form descriptions.
- **Muted Text** (`#64748b`): Subdued gray for shortcut captions and metadata.

### Named Rules
**The Rarity of Azure Rule.** The primary electric azure accent is reserved strictly for interactive triggers, focused states, and quantitative benchmarks. It never covers passive backgrounds or decorative borders.

## Typography

**Display Font:** System Sans (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
**Body Font:** System Sans (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
**Label/Mono Font:** System Monospace (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)

**Character:** Technical, ultra-precise, and fast-reading. Headings demand immediate attention with heavy weight and tight tracking; metadata and code maintain strict column alignment.

### Hierarchy
- **Display** (800 weight, `clamp(2.25rem, 5vw, 3.75rem)`, 1.1 line-height, -0.025em tracking): Primary hero statement.
- **Headline** (800 weight, `2.25rem`, 1.2 line-height, -0.02em tracking): Section headers.
- **Title** (700 weight, `1.25rem`, 1.3 line-height, -0.01em tracking): Card and feature headers.
- **Body** (400 weight, `0.875rem`, 1.6 line-height, normal tracking): Explanatory text bounded to 65-75ch.
- **Label** (500 weight, `0.75rem`, 1.4 line-height, 0.05em tracking): Monospace tags, keyboard shortcuts, and telemetry counters.

### Named Rules
**The Monospace Discipline Rule.** Monospace typography is reserved exclusively for code, shortcuts (`<kbd>`), numerical telemetry, shell commands, and file paths. It is never used as a decorative substitute for prose.

## Layout

The spatial model uses a rigid 4px/8px modular grid with generous negative space between functional zones. Container widths are strictly bounded to 1280px (`max-w-7xl`), centered with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`). Spacing above section headings is at least 1.5x greater than spacing beneath them, ensuring immediate visual grouping with their respective content.

## Elevation & Depth

OmniCmd uses luminous dark layering rather than traditional drop shadows. Depth is established through backdrop filtration (`backdrop-blur-xl`), 1px white hairline borders at 6% to 10% opacity, and subtle ambient glows (`0 25px 50px -12px rgba(0, 0, 0, 0.5)`).

### Shadow Vocabulary
- **HUD Glass Lift** (`0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)`): Floating simulator window and active modals.
- **Accent Glow** (`0 10px 25px -5px rgba(56, 189, 248, 0.25)`): Primary download button hover state.

### Named Rules
**The Real Elevation Rule.** Surfaces never cast harsh, offset block shadows. Depth is conveyed exclusively by translucent opacity differences and hairline borders.

## Shapes

- **HUD Outer Frame:** 16px radius (`rounded-2xl`) for window boundaries and large comparison cards.
- **Interactive Controls:** 12px radius (`rounded-xl`) for download buttons and primary action cards.
- **Small Controls & Tags:** 6px to 8px radius (`rounded-md` / `rounded-lg`) for buttons, selectors, and tags.
- **Shortcut Keys:** 4px to 6px radius (`rounded`) with subtle 1px border.

## Components

### Buttons
- **Shape:** Rounded 12px (`rounded-xl`).
- **Primary:** Solid electric azure (`#38bdf8`) with deep navy text (`#082f49`), bold typography, and 14px 24px padding (`px-6 py-3.5`).
- **Hover / Focus:** Luminous glow (`shadow-sky-500/30`), scale transition (150ms ease), and focus ring (`focus-visible:ring-2 focus-visible:ring-sky-400`).
- **Secondary:** Dark slate glass (`bg-slate-900/90`) with 1px hairline border (`border-slate-700`) and white text.

### Cards / Containers
- **Corner Style:** 16px radius (`rounded-2xl`).
- **Background:** Translucent slate (`rgba(15, 23, 42, 0.40)` to `rgba(15, 23, 42, 0.90)`).
- **Border:** 1px solid `rgba(255, 255, 255, 0.08)`.
- **Internal Padding:** 24px (`p-6`).

### Inputs / Fields
- **Style:** Translucent obsidian (`rgba(15, 16, 20, 0.65)`), 1px border (`rgba(255, 255, 255, 0.10)`), 8px radius.
- **Focus:** Border shifts to electric azure (`#38bdf8`) with subtle 1.5px ring.

### Navigation
- **Style:** Sticky translucent top bar (`bg-[#090b10]/85 backdrop-blur-md`), 64px height (`h-16`), 1px bottom border.
- **Links:** Slate-300 with smooth hover transition to azure (`hover:text-sky-400`).

## Do's and Don'ts

### Do:
- **Do** use `tabular-nums` on all comparative benchmarks, latency figures, and memory stats.
- **Do** include tactile `<kbd>` visual tags whenever keyboard shortcuts are referenced.
- **Do** ensure all interactive buttons and inputs provide high-visibility focus states for keyboard navigation.
- **Do** keep headings direct, punchy, and confident without relying on decorative eyebrows.

### Don't:
- **Don't** use eyebrows or kickers above headings.
- **Don't** use multi-color gradient text.
- **Don't** use hard offset block shadows or neobrutalist borders.
- **Don't** substitute generic icon grids for real, interactive demonstrations of product capability.
