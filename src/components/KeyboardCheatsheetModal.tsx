import React, { useEffect } from 'react';
import { Icon } from '@/components/Icon';

interface KeyboardCheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardCheatsheetModal: React.FC<KeyboardCheatsheetModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === '?') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sections = [
    {
      title: 'Geral & Navegação de HUD (Raycast-Style)',
      shortcuts: [
        { keys: ['Tab'], desc: 'Autocompletar comando (/ação) ou agente (@agente)' },
        { keys: ['/'], desc: 'Filtrar ações específicas (ex: /traduzir, /corrigir)' },
        { keys: ['@'], desc: 'Invocar agente contextual (ex: @dev, @prompt, @writer)' },
        { keys: ['/provider'], desc: 'Alternar provedor ativo (9router ↔ Omni ↔ Custom)' },
        { keys: ['Ctrl', 'H'], desc: 'Abrir / Fechar Histórico de prompts' },
        { keys: ['Ctrl', ','], desc: 'Abrir Configurações do app' },
        { keys: ['?'], desc: 'Abrir / Fechar este mapa de atalhos' },
        { keys: ['Esc'], desc: 'Voltar para busca ou fechar OmniCmd' },
      ],
    },
    {
      title: 'Busca & Execução Rápida',
      shortcuts: [
        { keys: ['↓', '/', 'Ctrl+N', 'Ctrl+J'], desc: 'Descer na lista de sugestões (Readline / Vim)' },
        { keys: ['↑', '/', 'Ctrl+P', 'Ctrl+K'], desc: 'Subir na lista de sugestões (Readline / Vim)' },
        { keys: ['Enter'], desc: 'Executar ação ou enviar pergunta ao agente' },
        { keys: ['Alt', '1..9, 0'], desc: 'Disparo direto instantâneo de ações (Alt+9 visão, Alt+0 UI)' },
        { keys: ['@agente texto'], desc: 'Executa diretamente no contexto do agente especialista' },
        { keys: ['/ação texto'], desc: 'Executa ação soberana sem contaminação' },
      ],
    },
    {
      title: 'Tela de Resultado',
      shortcuts: [
        { keys: ['Enter'], desc: 'Copiar resultado para o clipboard e fechar HUD instantaneamente' },
        { keys: ['Ctrl', 'C'], desc: 'Copiar resultado sem fechar o HUD' },
        { keys: ['Ctrl', 'R'], desc: 'Regenerar resposta com o modelo de IA' },
        { keys: ['e'], desc: 'Editar texto de entrada original' },
        { keys: ['m'], desc: 'Copiar com formatação Markdown' },
        { keys: ['i'], desc: 'Copiar entrada original' },
      ],
    },
    {
      title: 'Histórico & Configurações',
      shortcuts: [
        { keys: ['Ctrl+N/P', 'Ctrl+J/K'], desc: 'Navegar histórico via teclado' },
        { keys: ['Enter'], desc: 'Reutilizar prompt selecionado' },
        { keys: ['c', 'Ctrl+C'], desc: 'Copiar resultado do item histórico' },
        { keys: ['d', 'Delete'], desc: 'Deletar item do histórico' },
        { keys: ['Ctrl', 'S'], desc: 'Salvar configurações diretamente' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-zinc-950/95 border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100 max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Icon name="Terminal" className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Atalhos de Teclado (Zero-Mouse)</h2>
              <span className="text-[11px] text-zinc-400">Otimizado para Window Managers &amp; Power Users</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Icon name="X" className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {sections.map((sec) => (
            <div key={sec.title} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-text, var(--accent-color))' }}>
                {sec.title}
              </h3>
              <div className="grid grid-cols-1 gap-1.5 bg-zinc-900/40 p-2.5 rounded-xl border border-white/5">
                {sec.shortcuts.map((sc, i) => (
                  <div key={i} className="flex items-center justify-between py-1 px-1.5 text-xs">
                    <span className="text-zinc-300">{sc.desc}</span>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      {sc.keys.map((k, ki) => (
                        <kbd
                          key={ki}
                          className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/15 font-mono text-[11px] text-zinc-200 shadow-xs"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-white/10 bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-400">
          <span>Configurável em Configurações (Ctrl+,)</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer text-xs"
          >
            Fechar (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
