import React, { useEffect, useMemo } from 'react';
import { Icon } from '@/components/Icon';
import { Language } from '@/types';

interface KeyboardCheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const KeyboardCheatsheetModal: React.FC<KeyboardCheatsheetModalProps> = ({
  isOpen,
  onClose,
  language = 'pt-BR',
}) => {
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

  const content = useMemo(() => {
    if (language === 'en-US') {
      return {
        title: 'Keyboard Shortcuts (Zero-Mouse)',
        subtitle: 'Optimized for Window Managers & Power Users',
        footerHint: 'Configurable in Settings (Ctrl+,)',
        closeBtn: 'Close (Esc)',
        sections: [
          {
            title: 'General & HUD Navigation (Raycast-Style)',
            shortcuts: [
              { keys: ['Tab'], desc: 'Autocomplete command (/action) or agent (@agent)' },
              { keys: ['/'], desc: 'Filter prompt actions (e.g., /translate, /fix)' },
              { keys: ['@'], desc: 'Invoke specialized agent (e.g., @dev, @prompt, @writer)' },
              { keys: ['/provider'], desc: 'Cycle active AI provider (9router ↔ Omni ↔ Custom)' },
              { keys: ['Ctrl', 'H'], desc: 'Open / close prompt history' },
              { keys: ['Ctrl', ','], desc: 'Open app settings' },
              { keys: ['?'], desc: 'Open / close shortcuts cheatsheet' },
              { keys: ['Esc'], desc: 'Back to search or dismiss OmniCmd' },
            ],
          },
          {
            title: 'Search & Quick Execution',
            shortcuts: [
              { keys: ['↓', '/', 'Ctrl+N', 'Ctrl+J'], desc: 'Navigate down suggestion list (Readline / Vim)' },
              { keys: ['↑', '/', 'Ctrl+P', 'Ctrl+K'], desc: 'Navigate up suggestion list (Readline / Vim)' },
              { keys: ['Enter'], desc: 'Execute action or send query to agent' },
              { keys: ['Alt', '1..9, 0'], desc: 'Direct instant action trigger (Alt+9 vision, Alt+0 UI)' },
              { keys: ['@agent text'], desc: 'Execute within specialized agent context' },
              { keys: ['/action text'], desc: 'Execute sovereign prompt action without contamination' },
            ],
          },
          {
            title: 'Result View',
            shortcuts: [
              { keys: ['Enter'], desc: 'Copy result to clipboard and close HUD instantly' },
              { keys: ['Ctrl', 'C'], desc: 'Copy result without closing HUD' },
              { keys: ['Ctrl', 'R'], desc: 'Regenerate response with AI model' },
              { keys: ['e'], desc: 'Edit original input prompt' },
              { keys: ['m'], desc: 'Copy with Markdown formatting' },
              { keys: ['i'], desc: 'Copy raw input prompt' },
            ],
          },
          {
            title: 'History & Settings',
            shortcuts: [
              { keys: ['Ctrl+N/P', 'Ctrl+J/K'], desc: 'Navigate history via keyboard' },
              { keys: ['Enter'], desc: 'Reuse selected history item' },
              { keys: ['c', 'Ctrl+C'], desc: 'Copy output from history item' },
              { keys: ['d', 'Delete'], desc: 'Delete item from history' },
              { keys: ['Ctrl', 'S'], desc: 'Save settings directly' },
            ],
          },
        ],
      };
    }

    if (language === 'es-ES') {
      return {
        title: 'Atajos de Teclado (Zero-Mouse)',
        subtitle: 'Optimizado para Window Managers y Power Users',
        footerHint: 'Configurable en Ajustes (Ctrl+,)',
        closeBtn: 'Cerrar (Esc)',
        sections: [
          {
            title: 'General y Navegación de HUD (Estilo Raycast)',
            shortcuts: [
              { keys: ['Tab'], desc: 'Autocompletar comando (/acción) o agente (@agente)' },
              { keys: ['/'], desc: 'Filtrar acciones de prompt (ej: /traducir, /corregir)' },
              { keys: ['@'], desc: 'Invocar agente contextual (ej: @dev, @prompt, @writer)' },
              { keys: ['/provider'], desc: 'Alternar proveedor de IA (9router ↔ Omni ↔ Custom)' },
              { keys: ['Ctrl', 'H'], desc: 'Abrir / Cerrar historial de prompts' },
              { keys: ['Ctrl', ','], desc: 'Abrir ajustes de la aplicación' },
              { keys: ['?'], desc: 'Abrir / Cerrar este mapa de atajos' },
              { keys: ['Esc'], desc: 'Volver a búsqueda o cerrar OmniCmd' },
            ],
          },
          {
            title: 'Búsqueda y Ejecución Rápida',
            shortcuts: [
              { keys: ['↓', '/', 'Ctrl+N', 'Ctrl+J'], desc: 'Bajar en la lista de sugerencias (Readline / Vim)' },
              { keys: ['↑', '/', 'Ctrl+P', 'Ctrl+K'], desc: 'Subir en la lista de sugerencias (Readline / Vim)' },
              { keys: ['Enter'], desc: 'Ejecutar acción o enviar consulta al agente' },
              { keys: ['Alt', '1..9, 0'], desc: 'Disparo directo de acción (Alt+9 visión, Alt+0 UI)' },
              { keys: ['@agente texto'], desc: 'Ejecutar directamente en el contexto del agente' },
              { keys: ['/acción texto'], desc: 'Ejecutar acción soberana sin contaminación' },
            ],
          },
          {
            title: 'Pantalla de Resultados',
            shortcuts: [
              { keys: ['Enter'], desc: 'Copiar resultado al portapapeles y cerrar HUD' },
              { keys: ['Ctrl', 'C'], desc: 'Copiar resultado sin cerrar el HUD' },
              { keys: ['Ctrl', 'R'], desc: 'Regenerar respuesta con el modelo de IA' },
              { keys: ['e'], desc: 'Editar texto original de entrada' },
              { keys: ['m'], desc: 'Copiar con formato Markdown' },
              { keys: ['i'], desc: 'Copiar prompt original de entrada' },
            ],
          },
          {
            title: 'Historial y Ajustes',
            shortcuts: [
              { keys: ['Ctrl+N/P', 'Ctrl+J/K'], desc: 'Navegar historial con teclado' },
              { keys: ['Enter'], desc: 'Reutilizar prompt seleccionado' },
              { keys: ['c', 'Ctrl+C'], desc: 'Copiar resultado del historial' },
              { keys: ['d', 'Delete'], desc: 'Eliminar elemento del historial' },
              { keys: ['Ctrl', 'S'], desc: 'Guardar ajustes directamente' },
            ],
          },
        ],
      };
    }

    // Default: pt-BR
    return {
      title: 'Atalhos de Teclado (Zero-Mouse)',
      subtitle: 'Otimizado para Window Managers & Power Users',
      footerHint: 'Configurável em Configurações (Ctrl+,)',
      closeBtn: 'Fechar (Esc)',
      sections: [
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
      ],
    };
  }, [language]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-zinc-950/95 border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100 max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <Icon name="Terminal" className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">{content.title}</h2>
              <span className="text-[11px] text-zinc-400">{content.subtitle}</span>
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
          {content.sections.map((sec) => (
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
          <span>{content.footerHint}</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer text-xs"
          >
            {content.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
