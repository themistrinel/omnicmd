import React, { useState, useEffect } from 'react';
import { speechRegistry } from '@/lib/speech';
import { Icon } from '@/components/Icon';

interface VoiceInputModalProps {
  isOpen: boolean;
  onTranscriptionComplete: (text: string) => void;
  onCancel: () => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onTranscriptionComplete,
  onCancel,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) {
      if (isRecording) {
        speechRegistry.getProvider().stopListening();
        setIsRecording(false);
      }
      setTranscription('');
      setErrorMsg('');
      return;
    }

    const provider = speechRegistry.getProvider();
    if (!provider.isSupported()) {
      setErrorMsg('Reconhecimento de fala não suportado neste ambiente.');
      return;
    }

    setIsRecording(true);
    provider
      .startListening((interim) => {
        setTranscription(interim);
      })
      .catch((err) => {
        console.error('Voice error:', err);
        setErrorMsg('Erro ao iniciar captura de voz: ' + err.message);
        setIsRecording(false);
      });

    return () => {
      provider.stopListening().catch(() => {});
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStopAndConfirm = async () => {
    const finalResult = await speechRegistry.getProvider().stopListening();
    const textToUse = finalResult || transcription;
    setIsRecording(false);
    if (textToUse.trim()) {
      onTranscriptionComplete(textToUse.trim());
    } else {
      onCancel();
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-xl p-5 shadow-2xl flex flex-col items-center text-center space-y-4">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
            isRecording
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
              : 'bg-zinc-800 text-zinc-400'
          }`}
        >
          <Icon name={isRecording ? 'Mic' : 'MicOff'} className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-semibold text-zinc-100">
            {isRecording ? 'Ouvindo...' : 'Entrada por Voz'}
          </h3>
          <p className="text-xs text-zinc-300 mt-1">
            Fale o que deseja solicitar ou melhorar
          </p>
        </div>

        {errorMsg ? (
          <p className="text-xs text-rose-300 bg-rose-950/40 px-3 py-2 rounded-lg border border-rose-500/30">
            {errorMsg}
          </p>
        ) : (
          <div className="w-full min-h-[60px] p-3 rounded-xl bg-zinc-950/80 border border-white/10 text-sm text-zinc-200 text-left italic leading-relaxed">
            {transcription || 'Aguardando áudio...'}
          </div>
        )}

        <div className="flex items-center gap-2.5 pt-1 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
          >
            Cancelar (Esc)
          </button>
          <button
            onClick={handleStopAndConfirm}
            className="flex-1 py-2 rounded-lg text-sm font-medium bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition-colors cursor-pointer"
          >
            Concluir Fala
          </button>
        </div>
      </div>
    </div>
  );
};
