import React, { useState } from 'react';
import { Terminal, Apple, Monitor, Download, Check, Copy } from 'lucide-react';
import { OSPlatform } from '../types';
import { BUILD_FROM_SOURCE_COMMAND } from '../constants';

interface DownloadSectionProps {
  detectedOS: OSPlatform;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ detectedOS }) => {
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);
  const [copiedSource, setCopiedSource] = useState(false);

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedPkg(id);
    setTimeout(() => setCopiedPkg(null), 2000);
  };

  const copySourceCommand = () => {
    navigator.clipboard?.writeText(BUILD_FROM_SOURCE_COMMAND);
    setCopiedSource(true);
    setTimeout(() => setCopiedSource(false), 2000);
  };

  return (
    <section id="downloads" className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/[0.06]">
      <div className="flex flex-col gap-4 max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-white leading-tight">
          Native binaries for every desktop.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Pre-compiled, cryptographically signed binaries built with Rust and Tauri. Distributed under the MIT License with zero bundled Chromium runtime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Linux Card */}
        <div
          className={`glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all ${
            detectedOS === 'linux' ? 'border-white/30 shadow-[0_8px_30px_rgba(255,255,255,0.06)]' : ''
          }`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
                  <Terminal className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="text-base font-semibold text-white">Linux</h3>
              </div>
              {detectedOS === 'linux' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-white border border-white/15 font-medium">
                  Detected OS
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400">
              Debian, Ubuntu, Arch, Fedora &amp; Universal AppImage (x86_64 / arm64)
            </p>

            <div className="flex flex-col gap-2 font-mono text-xs pt-1">
              <a
                href="https://github.com/omnicmd/omnicmd/releases/latest/download/omnicmd_amd64.deb"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-200">Debian / Ubuntu</span>
                  <span className="text-[10px] text-slate-500">.deb package • 12.4 MB</span>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/omnicmd/omnicmd/releases/latest/download/omnicmd_x86_64.AppImage"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-200">Universal AppImage</span>
                  <span className="text-[10px] text-slate-500">.AppImage standalone • 14.1 MB</span>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-slate-400 flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Arch Linux:</span>
            <button
              type="button"
              onClick={() => copyCommand('yay -S omnicmd-bin', 'arch')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-slate-300 border border-white/[0.08] transition-colors cursor-pointer text-[11px]"
            >
              <code>yay -S omnicmd-bin</code>
              {copiedPkg === 'arch' ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* macOS Card */}
        <div
          className={`glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all ${
            detectedOS === 'mac' ? 'border-white/30 shadow-[0_8px_30px_rgba(255,255,255,0.06)]' : ''
          }`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
                  <Apple className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="text-base font-semibold text-white">macOS</h3>
              </div>
              {detectedOS === 'mac' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-white border border-white/15 font-medium">
                  Detected OS
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400">
              Apple Silicon (M1/M2/M3/M4) &amp; Intel x86_64 Universal Binary
            </p>

            <div className="flex flex-col gap-2 font-mono text-xs pt-1">
              <a
                href="https://github.com/omnicmd/omnicmd/releases/latest/download/OmniCmd_macOS_universal.dmg"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-200">Universal .dmg</span>
                  <span className="text-[10px] text-slate-500">Apple Silicon + Intel • 11.8 MB</span>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/omnicmd/omnicmd/releases/latest/download/OmniCmd.app.tar.gz"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-200">Standalone App Bundle</span>
                  <span className="text-[10px] text-slate-500">OmniCmd.app archive • 10.9 MB</span>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-slate-400 flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Homebrew:</span>
            <button
              type="button"
              onClick={() => copyCommand('brew install --cask omnicmd', 'brew')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-slate-300 border border-white/[0.08] transition-colors cursor-pointer text-[11px]"
            >
              <code>brew install omnicmd</code>
              {copiedPkg === 'brew' ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* Windows Card */}
        <div
          className={`glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all ${
            detectedOS === 'windows' ? 'border-white/30 shadow-[0_8px_30px_rgba(255,255,255,0.06)]' : ''
          }`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white">
                  <Monitor className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="text-base font-semibold text-white">Windows</h3>
              </div>
              {detectedOS === 'windows' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-white border border-white/15 font-medium">
                  Detected OS
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400">
              Windows 10 / 11 64-bit with native WebView2 runtime integration
            </p>

            <div className="flex flex-col gap-2 font-mono text-xs pt-1">
              <a
                href="https://github.com/omnicmd/omnicmd/releases/latest/download/OmniCmd_x64_en-US.msi"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-200">Windows Installer (.msi)</span>
                  <span className="text-[10px] text-slate-500">64-bit setup wizard • 13.2 MB</span>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/omnicmd/omnicmd/releases/latest/download/OmniCmd_portable.exe"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-slate-200 border border-white/[0.08] transition-all cursor-pointer group"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-200">Portable Executable</span>
                  <span className="text-[10px] text-slate-500">Standalone .exe • 12.8 MB</span>
                </div>
                <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-slate-400 flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Winget:</span>
            <button
              type="button"
              onClick={() => copyCommand('winget install omnicmd', 'winget')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-slate-300 border border-white/[0.08] transition-colors cursor-pointer text-[11px]"
            >
              <code>winget install omnicmd</code>
              {copiedPkg === 'winget' ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-slate-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Compile From Source Box */}
      <div className="mt-8 glass-panel rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 shrink-0">
            <Terminal className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Build from Source</h4>
            <span className="text-[11px] text-slate-400">Cargo + Tauri CLI pipeline</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto font-mono text-xs">
          <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06] text-slate-300 overflow-x-auto flex-1 sm:flex-initial text-[11px]">
            <code>{BUILD_FROM_SOURCE_COMMAND}</code>
          </div>
          <button
            type="button"
            onClick={copySourceCommand}
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] cursor-pointer shrink-0"
            title="Copy command"
          >
            {copiedSource ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
