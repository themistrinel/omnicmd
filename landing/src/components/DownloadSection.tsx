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
    <section id="downloads" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 border-t border-sky-500/15 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col gap-3 max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full neon-pill text-xs font-mono text-sky-200">
          <span className="text-cyan-400 font-bold">[05/06]</span>
          <span>DISTRIBUTION // NATIVE ARTIFACTS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.05] font-display">
          Native Binaries. Compiled Machine Code.
        </h2>
        <p className="text-sky-200/70 text-sm sm:text-base leading-relaxed font-sans font-normal">
          Pre-compiled, cryptographically verified binary packages for Linux, macOS, and Windows. Under 15MB, licensed under MIT.
        </p>
      </div>

      {/* Main Download Console (Wope Style) */}
      <div className="rounded-2xl bg-[#060f24]/80 border border-sky-500/20 backdrop-blur-xl p-6 sm:p-8 font-sans shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* OS Platform Tabs */}
        <div
          role="tablist"
          aria-label="Target operating system selection"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-sky-500/15"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'linux'}
            onClick={() => setSelectedOS('linux')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer shrink-0 ${
              selectedOS === 'linux'
                ? 'bg-sky-500/20 text-white border border-sky-400/50 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-sky-300/60 hover:text-white hover:bg-sky-950/20 border border-transparent font-medium'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Linux (Arch / Hyprland / .deb)</span>
            {detectedOS === 'linux' && (
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-sky-500/30 text-cyan-300 font-bold font-mono">
                DETECTED
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'mac'}
            onClick={() => setSelectedOS('mac')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer shrink-0 ${
              selectedOS === 'mac'
                ? 'bg-sky-500/20 text-white border border-sky-400/50 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-sky-300/60 hover:text-white hover:bg-sky-950/20 border border-transparent font-medium'
            }`}
          >
            <Apple className="w-3.5 h-3.5 text-sky-300" />
            <span>macOS (Universal)</span>
            {detectedOS === 'mac' && (
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-sky-500/30 text-cyan-300 font-bold font-mono">
                DETECTED
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'windows'}
            onClick={() => setSelectedOS('windows')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer shrink-0 ${
              selectedOS === 'windows'
                ? 'bg-sky-500/20 text-white border border-sky-400/50 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-sky-300/60 hover:text-white hover:bg-sky-950/20 border border-transparent font-medium'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-sky-300" />
            <span>Windows (x64)</span>
            {detectedOS === 'windows' && (
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-sky-500/30 text-cyan-300 font-bold font-mono">
                DETECTED
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedOS === 'source'}
            onClick={() => setSelectedOS('source')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer shrink-0 ${
              selectedOS === 'source'
                ? 'bg-sky-500/20 text-white border border-sky-400/50 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-sky-300/60 hover:text-white hover:bg-sky-950/20 border border-transparent font-medium'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Build from Source</span>
          </button>
        </div>

        {/* Tab 1: Linux Details */}
        {selectedOS === 'linux' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-sky-500/15">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Arch Linux &amp; Hyprland Wayland Integration
                </h3>
                <p className="text-xs text-sky-200/70 mt-1 font-sans">
                  Includes native Wayland clipboard integration (<code className="text-sky-200 font-mono">wl-clipboard</code>) and dedicated Hyprland floating rules.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_amd64.deb"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD .DEB (DEBIAN / UBUNTU)</span>
                </a>
                <a
                  href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x86_64.AppImage"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#081430] text-sky-200 border border-sky-500/30 text-xs hover:bg-[#0c1f4d] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-sky-300" />
                  <span>UNIVERSAL .APPIMAGE</span>
                </a>
              </div>
            </div>

            {/* Quick 1-Liner Shell Snippet */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-sky-400/70 uppercase tracking-wider block">
                1-Liner Quick Install (No Git Clone Required)
              </span>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#040a1c] border border-sky-500/20 text-xs text-sky-100">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-3">
                  <span className="text-cyan-400 font-bold select-none">$</span>
                  <span className="select-all text-sky-200/90">{INSTALL_CURL_COMMAND}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCommand(INSTALL_CURL_COMMAND, 'curl-linux')}
                  aria-label="Copy Linux curl install command"
                  className="p-2 rounded-lg bg-sky-900/40 hover:bg-sky-800/50 text-sky-200 hover:text-white transition-colors cursor-pointer shrink-0 border border-sky-500/30"
                >
                  {copiedKey === 'curl-linux' ? (
                    <Check className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Hyprland Rules Snippet */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-sky-400/70 uppercase tracking-wider block">
                Native Hyprland Window Rules (~/.config/hypr/omnicmd.conf)
              </span>
              <pre className="p-3.5 rounded-xl bg-[#040a1c] border border-sky-500/15 font-mono text-xs text-sky-200/80 overflow-x-auto leading-relaxed">
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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-sky-500/15">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Universal macOS Application Bundle
                </h3>
                <p className="text-xs text-sky-200/70 mt-1 font-sans">
                  Native binary for Apple Silicon (M1/M2/M3/M4) and Intel x86_64. Signed and notarized for macOS 11+.
                </p>
              </div>

              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/OmniCmd_macOS_universal.dmg"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all cursor-pointer self-start lg:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD UNIVERSAL .DMG</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-sky-300">
              <div className="p-4 rounded-xl bg-[#040a1c] border border-sky-500/15 space-y-2">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Apple className="w-3.5 h-3.5 text-sky-300" />
                  ACCESSIBILITY PERMISSIONS
                </span>
                <p className="text-[11px] leading-relaxed font-sans text-sky-200/70">
                  OmniCmd requires macOS Accessibility permissions to register the global <code className="text-white">Cmd+Space</code> hotkey and read active buffer selections without stealing permanent window focus.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#040a1c] border border-sky-500/15 space-y-2">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  LOCAL STORAGE ONLY
                </span>
                <p className="text-[11px] leading-relaxed font-sans text-sky-200/70">
                  Zero cloud beacons. All prompt histories, custom actions, and configuration stay completely local on your machine.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Windows Details */}
        {selectedOS === 'windows' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-sky-500/15">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Native Windows x64 Distribution
                </h3>
                <p className="text-xs text-sky-200/70 mt-1 font-sans">
                  Lightweight installer or standalone portable executable utilizing system WebView2 runtime.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/themistrinel/omnicmd/releases/latest/download/OmniCmd_x64_en-US.msi"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD INSTALLER (.MSI)</span>
                </a>
                <a
                  href="https://github.com/themistrinel/omnicmd/releases/latest/download/OmniCmd_x64_portable.zip"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#081430] text-sky-200 border border-sky-500/30 text-xs hover:bg-[#0c1f4d] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-sky-300" />
                  <span>PORTABLE (.ZIP)</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#040a1c] border border-sky-500/15 text-xs text-sky-200/70 space-y-2">
              <span className="text-white font-bold block">WINDOWS SYSTEM TRAY DAEMON</span>
              <p className="text-[11px] font-sans leading-relaxed text-sky-200/70">
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
              <p className="text-xs text-sky-200/70 font-sans">
                Requires Rust 1.77+, Node.js (or pnpm), and standard OS development headers (libwebkit2gtk on Linux).
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-sky-400/70 uppercase tracking-wider block">
                Terminal Build Pipeline
              </span>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#040a1c] border border-sky-500/20 text-xs text-sky-100">
                <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-3">
                  <span className="text-cyan-400 font-bold select-none">$</span>
                  <span className="select-all text-sky-200/90">{BUILD_FROM_SOURCE_COMMAND}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCommand(BUILD_FROM_SOURCE_COMMAND, 'source-build')}
                  aria-label="Copy build from source command"
                  className="p-2 rounded-lg bg-sky-900/40 hover:bg-sky-800/50 text-sky-200 hover:text-white transition-colors cursor-pointer shrink-0 border border-sky-500/30"
                >
                  {copiedKey === 'source-build' ? (
                    <Check className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Releases link footer */}
        <div className="mt-8 pt-6 border-t border-sky-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-sky-300/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All binary artifacts signed with SHA-256 checksums</span>
          </div>

          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 hover:underline"
          >
            <span>VIEW ALL GITHUB RELEASE ARTIFACTS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
