import React, { useState } from 'react';
import { Terminal, Apple, Monitor, Check, Copy, Code2, Download, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { OSPlatform } from '../types';
import { BUILD_FROM_SOURCE_COMMAND, INSTALL_CURL_COMMAND, RELEASES_URL } from '../constants';

interface DownloadSectionProps {
  detectedOS: OSPlatform;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ detectedOS }) => {
  const [selectedOS, setSelectedOS] = useState<OSPlatform | 'source'>(detectedOS);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCommand = (cmd: string, key: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="downloads" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 rounded bg-[#12151e] border border-white/[0.1] text-[11px] font-mono text-zinc-300">
          <span className="text-[#38bdf8] font-bold">[05/06]</span>
          <span>DISTRIBUTION // NATIVE ARTIFACTS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] font-display">
          NATIVE BINARIES. COMPILED MACHINE CODE.
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
          Pre-compiled, cryptographically verified binary packages for Linux, macOS, and Windows. Under 15MB, licensed under MIT.
        </p>
      </div>

      {/* Main Download Console */}
      <div className="rounded-xl bg-[#090b10] border border-white/[0.1] p-6 sm:p-8 font-mono">
        {/* OS Platform Tabs */}
        <div
          role="tablist"
          aria-label="Target operating system selection"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/[0.06]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'linux'}
            onClick={() => setSelectedOS('linux')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono transition-all cursor-pointer shrink-0 ${
              selectedOS === 'linux'
                ? 'bg-[#181c26] text-[#38bdf8] border border-[#38bdf8]/40 font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Linux (Arch / Hyprland / .deb)</span>
            {detectedOS === 'linux' && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#38bdf8]/20 text-[#38bdf8] font-bold">
                DETECTED
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'mac'}
            onClick={() => setSelectedOS('mac')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono transition-all cursor-pointer shrink-0 ${
              selectedOS === 'mac'
                ? 'bg-[#181c26] text-[#38bdf8] border border-[#38bdf8]/40 font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>macOS (Universal)</span>
            {detectedOS === 'mac' && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#38bdf8]/20 text-[#38bdf8] font-bold">
                DETECTED
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'windows'}
            onClick={() => setSelectedOS('windows')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono transition-all cursor-pointer shrink-0 ${
              selectedOS === 'windows'
                ? 'bg-[#181c26] text-[#38bdf8] border border-[#38bdf8]/40 font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Windows (x64)</span>
            {detectedOS === 'windows' && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#38bdf8]/20 text-[#38bdf8] font-bold">
                DETECTED
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'source'}
            onClick={() => setSelectedOS('source')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono transition-all cursor-pointer shrink-0 ${
              selectedOS === 'source'
                ? 'bg-[#181c26] text-[#38bdf8] border border-[#38bdf8]/40 font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Build from Source</span>
          </button>
        </div>

        {/* Tab 1: Linux Details */}
        {selectedOS === 'linux' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Arch Linux &amp; Hyprland Wayland Integration
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  Includes native Wayland clipboard integration (<code className="text-zinc-200 font-mono">wl-clipboard</code>) and dedicated Hyprland floating rules.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_amd64.deb"
                  className="flex items-center gap-2 px-4 py-2 rounded bg-[#38bdf8] text-black font-bold text-xs hover:bg-[#0ea5e9] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD .DEB (DEBIAN / UBUNTU)</span>
                </a>
                <a
                  href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x86_64.AppImage"
                  className="flex items-center gap-2 px-4 py-2 rounded bg-[#151922] text-zinc-200 border border-white/[0.1] text-xs hover:bg-[#1f2432] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>UNIVERSAL .APPIMAGE</span>
                </a>
              </div>
            </div>

            {/* Quick 1-Liner Shell Snippet */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                1-Liner Quick Install (No Git Clone Required)
              </span>
              <div className="flex items-center justify-between p-3.5 rounded bg-[#06070a] border border-white/[0.08] text-xs text-zinc-200">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-3">
                  <span className="text-[#38bdf8] font-bold select-none">$</span>
                  <span className="select-all text-zinc-300">{INSTALL_CURL_COMMAND}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCommand(INSTALL_CURL_COMMAND, 'curl-linux')}
                  aria-label="Copy Linux curl install command"
                  className="p-2 rounded bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  {copiedKey === 'curl-linux' ? (
                    <Check className="w-4 h-4 text-[#38bdf8]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Hyprland Rules Snippet */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Native Hyprland Window Rules (~/.config/hypr/omnicmd.conf)
              </span>
              <pre className="p-3.5 rounded bg-[#06070a] border border-white/[0.06] font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
{`# Floating overlay configuration without tiling splits
windowrulev2 = float, class:^(omnicmd)$
windowrulev2 = center, class:^(omnicmd)$
windowrulev2 = size 800 560, class:^(omnicmd)$
windowrulev2 = noborder, class:^(omnicmd)$
windowrulev2 = stayfocused, class:^(omnicmd)$`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: macOS Details */}
        {selectedOS === 'mac' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Universal macOS Application Bundle
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  Native binary for Apple Silicon (M1/M2/M3/M4) and Intel x86_64. Signed and notarized for macOS 11+.
                </p>
              </div>

              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/OmniCmd_macOS_universal.dmg"
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#38bdf8] text-black font-bold text-xs hover:bg-[#0ea5e9] transition-all cursor-pointer self-start lg:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD UNIVERSAL .DMG</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
              <div className="p-4 rounded bg-[#06070a] border border-white/[0.06] space-y-2">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Apple className="w-3.5 h-3.5 text-zinc-300" />
                  ACCESSIBILITY PERMISSIONS
                </span>
                <p className="text-[11px] leading-relaxed font-sans text-zinc-400">
                  OmniCmd requires macOS Accessibility permissions to register the global <code className="text-zinc-200">Cmd+Space</code> hotkey and read active buffer selections without stealing permanent window focus.
                </p>
              </div>

              <div className="p-4 rounded bg-[#06070a] border border-white/[0.06] space-y-2">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
                  LOCAL STORAGE ONLY
                </span>
                <p className="text-[11px] leading-relaxed font-sans text-zinc-400">
                  Zero cloud beacons. All prompt histories, custom actions, and configuration stay completely local on your machine.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Windows Details */}
        {selectedOS === 'windows' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Native Windows x64 Distribution
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  Lightweight installer or standalone portable executable utilizing system WebView2 runtime.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/themistrinel/omnicmd/releases/latest/download/OmniCmd_x64_en-US.msi"
                  className="flex items-center gap-2 px-4 py-2 rounded bg-[#38bdf8] text-black font-bold text-xs hover:bg-[#0ea5e9] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD INSTALLER (.MSI)</span>
                </a>
                <a
                  href="https://github.com/themistrinel/omnicmd/releases/latest/download/OmniCmd_x64_portable.zip"
                  className="flex items-center gap-2 px-4 py-2 rounded bg-[#151922] text-zinc-200 border border-white/[0.1] text-xs hover:bg-[#1f2432] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PORTABLE (.ZIP)</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded bg-[#06070a] border border-white/[0.06] text-xs text-zinc-400 space-y-2">
              <span className="text-white font-bold block">WINDOWS SYSTEM TRAY DAEMON</span>
              <p className="text-[11px] font-sans leading-relaxed text-zinc-400">
                OmniCmd persists in the Windows system notification area. Summon with <kbd className="pbt-keycap text-[9px]">Win</kbd> + <kbd className="pbt-keycap text-[9px]">Space</kbd> over Visual Studio, VS Code, or Windows Terminal.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Build from Source */}
        {selectedOS === 'source' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Compile Directly with Cargo &amp; Tauri CLI
              </h3>
              <p className="text-xs text-zinc-400 font-sans">
                Requires Rust 1.77+, Node.js (or pnpm), and standard OS development headers (libwebkit2gtk on Linux).
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                Terminal Build Pipeline
              </span>
              <div className="flex items-center justify-between p-3.5 rounded bg-[#06070a] border border-white/[0.08] text-xs text-zinc-200">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-3">
                  <span className="text-[#38bdf8] font-bold select-none">$</span>
                  <span className="select-all text-zinc-300">{BUILD_FROM_SOURCE_COMMAND}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCommand(BUILD_FROM_SOURCE_COMMAND, 'source-build')}
                  aria-label="Copy build from source command"
                  className="p-2 rounded bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  {copiedKey === 'source-build' ? (
                    <Check className="w-4 h-4 text-[#38bdf8]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Releases link footer */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
            <span>All binary artifacts signed with SHA-256 checksums</span>
          </div>

          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#38bdf8] hover:underline"
          >
            <span>VIEW ALL GITHUB RELEASE ARTIFACTS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
