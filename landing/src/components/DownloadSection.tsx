import React, { useState } from 'react';
import { Terminal, Apple, Monitor, Download, Check, Copy, Code2 } from 'lucide-react';
import { OSPlatform } from '../types';
import { BUILD_FROM_SOURCE_COMMAND } from '../constants';

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
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/[0.06]">
          <button
            type="button"
            onClick={() => setSelectedOS('linux')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
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
            onClick={() => setSelectedOS('mac')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
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
            onClick={() => setSelectedOS('windows')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
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
            onClick={() => setSelectedOS('source')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              selectedOS === 'source'
                ? 'bg-white/[0.08] text-white border border-white/20 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Build Source</span>
          </button>
        </div>

        {/* Content based on selected platform */}
        {selectedOS === 'linux' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_amd64.deb"
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Debian / Ubuntu</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">.deb package • 12.4 MB</div>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x86_64.AppImage"
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Universal AppImage</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">Standalone x86_64 • 14.1 MB</div>
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
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Copy AUR command"
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_aarch64.dmg"
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Apple Silicon (M1/M2/M3/M4)</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">.dmg disk image • 9.8 MB</div>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x64.dmg"
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Intel Mac (x86_64)</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">.dmg disk image • 11.2 MB</div>
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
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Copy brew command"
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x64_en-US.msi"
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Windows Installer (.msi)</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">64-bit installer • 11.8 MB</div>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/themistrinel/omnicmd/releases/latest/download/omnicmd_x64.exe"
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div>
                  <div className="font-semibold text-white text-sm">Standalone Portable (.exe)</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">Single binary • 10.9 MB</div>
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
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Copy winget command"
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
          <div className="space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Compile OmniCmd from source using Rust (Cargo 1.77+) and Node/pnpm for the Tauri v2 frontend shell.
            </p>
            <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.04] text-xs font-mono">
              <code className="text-slate-200 truncate">{BUILD_FROM_SOURCE_COMMAND}</code>
              <button
                type="button"
                onClick={() => copyCommand(BUILD_FROM_SOURCE_COMMAND, 'source')}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Copy build command"
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
