import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '@/components/Icon';
import { UpdateCheckResult, UpdaterService } from '@/lib/updater';

interface UpdateNotificationModalProps {
  isOpen: boolean;
  update: UpdateCheckResult | null;
  onClose: () => void;
}

export const UpdateNotificationModal: React.FC<UpdateNotificationModalProps> = ({
  isOpen,
  update,
  onClose,
}) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    if (isInstalling) return;
    setIsInstalling(false);
    setProgress(null);
    setIsDone(false);
    setErrorMsg(null);
    onClose();
  }, [isInstalling, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isInstalling) {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isInstalling, handleClose]);

  if (!isOpen || !update) return null;

  const handleInstall = async () => {
    setIsInstalling(true);
    setErrorMsg(null);
    setProgress(0);

    try {
      await UpdaterService.downloadAndInstall((p) => {
        if (p.total && p.total > 0) {
          const pct = Math.min(100, Math.round((p.downloaded / p.total) * 100));
          setProgress(pct);
        }
      });
      setIsDone(true);
    } catch (err: unknown) {
      console.error('Update failed:', err);
      const message = err instanceof Error ? err.message : String(err);
      setErrorMsg(message || 'Falha ao baixar/instalar atualização.');
    } finally {
      setIsInstalling(false);
    }
  };

  const handleRelaunch = async () => {
    try {
      await UpdaterService.relaunchApp();
    } catch {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-950/95 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-zinc-900/70">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border"
              style={{
                backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
                borderColor: 'rgba(var(--accent-rgb), 0.35)',
                color: 'var(--accent-color)',
              }}
            >
              <Icon name="Sparkles" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <span>Nova Versão Disponível</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  v{update.version}
                </span>
              </h2>
              <span className="text-[11px] text-zinc-400">
                Versão atual: v{update.currentVersion}
              </span>
            </div>
          </div>
          {!isInstalling && (
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Fechar (Esc)"
            >
              <Icon name="X" className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
          {update.body ? (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Novidades &amp; Notas de Versão
              </span>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 font-mono text-[11px] text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {update.body}
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-300">
              Uma nova versão foi publicada com correções de desempenho, melhorias de UX e novas funcionalidades.
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-1">
              <div className="flex items-center gap-2 font-medium">
                <Icon name="AlertCircle" className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Erro durante a atualização</span>
              </div>
              <p className="text-[11px] text-rose-400/90 pl-6">{errorMsg}</p>
              <div className="pt-2 pl-6">
                <a
                  href="https://github.com/themistrinel/omnicmd/releases/latest"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-[11px] hover:text-white"
                >
                  Baixar manualmente pelo GitHub Releases &rarr;
                </a>
              </div>
            </div>
          )}

          {isInstalling && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Icon name="Download" className="w-3.5 h-3.5 animate-bounce" />
                  <span>Baixando atualização do OmniCmd...</span>
                </span>
                <span>{progress !== null ? `${progress}%` : 'Aguarde...'}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden border border-white/5">
                <div
                  className="h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${progress ?? 0}%`,
                    backgroundColor: 'var(--accent-color)',
                  }}
                />
              </div>
            </div>
          )}

          {isDone && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3">
              <Icon name="CheckCircle" className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-xs text-white">Atualização instalada com sucesso!</p>
                <p className="text-[11px] text-emerald-300/80">
                  Reinicie o aplicativo para carregar as novas funcionalidades.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between">
          <button
            onClick={handleClose}
            disabled={isInstalling}
            className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs disabled:opacity-50"
          >
            Lembrar mais tarde
          </button>

          <div className="flex items-center gap-2">
            {isDone ? (
              <button
                onClick={handleRelaunch}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-1.5"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  boxShadow: '0 2px 10px rgba(var(--accent-rgb), 0.35)',
                }}
              >
                <Icon name="RefreshCw" className="w-3.5 h-3.5" />
                <span>Reiniciar OmniCmd</span>
              </button>
            ) : (
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  boxShadow: '0 2px 10px rgba(var(--accent-rgb), 0.35)',
                }}
              >
                <Icon name="Download" className="w-3.5 h-3.5" />
                <span>{isInstalling ? 'Atualizando...' : 'Atualizar Agora'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
