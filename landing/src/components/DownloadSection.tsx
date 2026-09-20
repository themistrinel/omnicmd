import React, { useState } from 'react';
import { Terminal, Apple, Monitor, Download, Check, Copy, Code2 } from 'lucide-react';
import { OSPlatform } from '../types';
import { BUILD_FROM_SOURCE_COMMAND, INSTALL_CURL_COMMAND, UPDATE_COMMAND } from '../constants';

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
    <section id="downloads" className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/[0.06]">
      <div className="flex flex-col gap-3 max-w-2xl mb-10">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-white leading-tight">
          Native binaries. Zero browser bundle.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Pre-compiled, cryptographically signed binaries built with Rust and Tauri. Distributed under the MIT License.
        </p>
      </div>

      {/* Distilled OS Switcher & Installer Box */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-8">
        {/* OS Platform Tabs */}
        <div
          role="tablist"
          aria-label="Target operating system"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/[0.06]"
        >
          <button
            type="button"
            role="tab"
            id="tab-linux"
            aria-selected={selectedOS === 'linux'}
            aria-controls="panel-linux"
            tabIndex={selectedOS === 'linux' ? 0 : -1}
            onClick={() => setSelectedOS('linux')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedOS('linux');
              }
            }}
            className={`flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0 ${
              selectedOS === 'linux'
                ? 'bg-white/[0.08] text-white border border-white/20 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>Linux</span>
            {detectedOS === 'linux' && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300">
                Detected
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            id="tab-mac"
            aria-selected={selectedOS === 'mac'}
            aria-controls="panel-mac"
            tabIndex={selectedOS === 'mac' ? 0 : -1}
            onClick={() => setSelectedOS('mac')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedOS('mac');
              }
            }}
            className={`flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0 ${
              selectedOS === 'mac'
                ? 'bg-white/[0.08] text-white border border-white/20 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            <Apple className="w-3.5 h-3.5 text-slate-300" />
            <span>macOS</span>
            {detectedOS === 'mac' && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300">
                Detected
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            id="tab-windows"
            aria-selected={selectedOS === 'windows'}
            aria-controls="panel-windows"
            tabIndex={selectedOS === 'windows' ? 0 : -1}
            onClick={() => setSelectedOS('windows')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedOS('windows');
              }
            }}
            className={`flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0 ${
              selectedOS === 'windows'
                ? 'bg-white/[0.08] text-white border border-white/20 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span>Windows</span>
            {detectedOS === 'windows' && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300">
                Detected
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            id="tab-source"
            aria-selected={selectedOS === 'source'}
            aria-controls="panel-source"
            tabIndex={selectedOS === 'source' ? 0 : -1}
            onClick={() => setSelectedOS('source')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedOS('source');
              }
            }}
            className={`flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer shrink-0 ${
              selectedOS === 'source'
                ? 'bg-white/[0.08] text-white border border-white/20 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Build Source</span>
          </button>
        </div>

        {/* Live announcement region for copy actions */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {copiedKey ? "Command copied to clipboard" : ""}
        </div>

        {/* Content based on selected platform */}
        {selectedOS === 'linux' && (
          <div
            id="panel-linux"
            role="tabpanel"
            aria-labelledby="tab-linux"
            tabIndex={0}
            className="space-y-6 focus:outline-none"
          >
            {/* Quick 1-Liner for Arch Linux & Hyprland */}
            <div className="p-5 rounded-2xl bg-sky-500/[0.04] border border-sky-500/20 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="font-semibold text-white text-sm">Arch Linux & Hyprland 1-Liner</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono">
                    Zero git clone needed
                  </span>
                </div>
                <span className="text-xs text-slate-400">Auto-configures shortcuts, window rules & updates</span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/60 border border-white/[0.08] text-xs font-mono">
                <code className="text-sky-300 select-all overflow-x-auto whitespace-nowrap">{INSTALL_CURL_COMMAND}</code>
                <button
                  type="button"
                  onClick={() => copyCommand(INSTALL_CURL_COMMAND, 'curl-arch')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      copyCommand(INSTALL_CURL_COMMAND, 'curl-arch');
                    }
                  }}
                  className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label={copiedKey === 'curl-arch' ? "Install command copied" : "Copy install command"}
                >
                  {copiedKey === 'curl-arch' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 font-mono">
                <span>✦ Default toggle: <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-200">SUPER + SPACE</kbd></span>
                <span>✦ Update utility: <code className="text-slate-200">{UPDATE_COMMAND}</code></span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_amd64.deb"
                className="flex items-center justify-between p-4 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Debian / Ubuntu</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">.deb package • 12.4 MB</div>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x86_64.AppImage"
                className="flex items-center justify-between p-4 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Universal AppImage</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">Standalone x86_64 • 14.1 MB</div>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.04] text-xs font-mono">
              <span className="text-slate-400">Arch Linux AUR:</span>
              <div className="flex items-center gap-2">
                <code className="text-slate-200">yay -S omnicmd-bin</code>
                <button
                  type="button"
                  onClick={() => copyCommand('yay -S omnicmd-bin', 'arch')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      copyCommand('yay -S omnicmd-bin', 'arch');
                    }
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label={copiedKey === 'arch' ? "AUR command copied" : "Copy AUR command"}
                >
                  {copiedKey === 'arch' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedOS === 'mac' && (
          <div
            id="panel-mac"
            role="tabpanel"
            aria-labelledby="tab-mac"
            tabIndex={0}
            className="space-y-6 focus:outline-none"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_aarch64.dmg"
                className="flex items-center justify-between p-4 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Apple Silicon (M1/M2/M3/M4)</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">.dmg disk image • 9.8 MB</div>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x64.dmg"
                className="flex items-center justify-between p-4 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Intel Mac (x86_64)</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">.dmg disk image • 11.2 MB</div>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.04] text-xs font-mono">
              <span className="text-slate-400">Homebrew Tap:</span>
              <div className="flex items-center gap-2">
                <code className="text-slate-200">brew install themistrinel/tap/omnicmd</code>
                <button
                  type="button"
                  onClick={() => copyCommand('brew install themistrinel/tap/omnicmd', 'brew')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      copyCommand('brew install themistrinel/tap/omnicmd', 'brew');
                    }
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label={copiedKey === 'brew' ? "Brew command copied" : "Copy brew command"}
                >
                  {copiedKey === 'brew' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedOS === 'windows' && (
          <div
            id="panel-windows"
            role="tabpanel"
            aria-labelledby="tab-windows"
            tabIndex={0}
            className="space-y-6 focus:outline-none"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x64_en-US.msi"
                className="flex items-center justify-between p-4 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Windows Installer (.msi)</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">64-bit installer • 11.8 MB</div>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x64.exe"
                className="flex items-center justify-between p-4 min-h-[44px] rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Standalone Portable (.exe)</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">Single binary • 10.9 MB</div>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.04] text-xs font-mono">
              <span className="text-slate-400">Windows Package Manager:</span>
              <div className="flex items-center gap-2">
                <code className="text-slate-200">winget install omnicmd</code>
                <button
                  type="button"
                  onClick={() => copyCommand('winget install omnicmd', 'winget')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      copyCommand('winget install omnicmd', 'winget');
                    }
                  }}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label={copiedKey === 'winget' ? "Winget command copied" : "Copy winget command"}
                >
                  {copiedKey === 'winget' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedOS === 'source' && (
          <div
            id="panel-source"
            role="tabpanel"
            aria-labelledby="tab-source"
            tabIndex={0}
            className="space-y-4 focus:outline-none"
          >
            <p className="text-xs text-slate-400 leading-relaxed">
              Compile OmniCmd from source using Rust (Cargo 1.77+) and Node/pnpm for the Tauri v2 frontend shell.
            </p>
            <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.04] text-xs font-mono">
              <code className="text-slate-200 truncate">{BUILD_FROM_SOURCE_COMMAND}</code>
              <button
                type="button"
                onClick={() => copyCommand(BUILD_FROM_SOURCE_COMMAND, 'source')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    copyCommand(BUILD_FROM_SOURCE_COMMAND, 'source');
                  }
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label={copiedKey === 'source' ? "Build command copied" : "Copy build command"}
              >
                {copiedKey === 'source' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
