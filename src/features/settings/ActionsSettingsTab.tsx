import React, { useState } from 'react';
import { PromptAction } from '@/types';
import { PROMPT_ACTIONS } from '@/lib/actions';
import { Icon } from '@/components/Icon';

interface ActionsSettingsTabProps {
  actions: PromptAction[];
  onUpdateActions: (updated: PromptAction[]) => void;
}

const AVAILABLE_ICONS = [
  'Wand2',
  'Languages',
  'CheckCheck',
  'FileText',
  'HelpCircle',
  'RefreshCw',
  'Sparkles',
  'MessageSquare',
  'ImageIcon',
  'LayoutTemplate',
  'Terminal',
  'Code2',
];

export const ActionsSettingsTab: React.FC<ActionsSettingsTabProps> = ({
  actions,
  onUpdateActions,
}) => {
  const [selectedActionId, setSelectedActionId] = useState<string>(actions[0]?.id || 'improve_prompt');

  const selectedAction = actions.find((a) => a.id === selectedActionId) || actions[0];

  const handleUpdateCurrentAction = (field: keyof PromptAction, value: any) => {
    if (!selectedAction) return;
    const updated = actions.map((act) => {
      if (act.id === selectedAction.id) {
        return { ...act, [field]: value };
      }
      return act;
    });
    onUpdateActions(updated);
  };

  const handleAddNewAction = () => {
    const newId = `action_${Date.now()}`;
    const newAction: PromptAction = {
      id: newId,
      title: 'Nova Ação',
      description: 'Executa uma tarefa sob medida com instrução de sistema dedicada.',
      icon: 'Sparkles',
      command: `/comando_${actions.length + 1}`,
      aliases: [],
      systemPrompt:
        'Você é um assistente especializado executando esta tarefa com máxima precisão e clareza. Retorne o resultado diretamente.',
      userPromptTemplateString: '{input}',
      isCustom: true,
    };
    const updated = [...actions, newAction];
    onUpdateActions(updated);
    setSelectedActionId(newId);
  };

  const handleDeleteAction = (idToDelete: string) => {
    if (actions.length <= 1) {
      alert('É necessário manter ao menos uma ação no sistema.');
      return;
    }
    const updated = actions.filter((a) => a.id !== idToDelete);
    onUpdateActions(updated);
    if (selectedActionId === idToDelete) {
      setSelectedActionId(updated[0]?.id || '');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar todas as ações e prompts de fábrica? Suas customizações serão substituídas pelas ações padrão.')) {
      onUpdateActions(PROMPT_ACTIONS);
      setSelectedActionId(PROMPT_ACTIONS[0].id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-hud">
        <div>
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <span>Ações de Prompt Soberanas</span>
            <span
              className="text-xs px-1.5 py-0.2 rounded font-mono"
              style={{
                backgroundColor: 'rgba(var(--accent-rgb), 0.18)',
                color: 'var(--accent-text, var(--accent-color))',
              }}
            >
              /comando
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Gerencie prompts prontos de ações explícitas (/traduzir, /corrigir, etc.) ou crie novos comandos soberanos.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-hud transition-colors cursor-pointer"
            title="Restaurar ações e prompts de fábrica"
          >
            <Icon name="RotateCcw" className="w-3.5 h-3.5" />
            <span>Restaurar Padrões</span>
          </button>

          <button
            type="button"
            onClick={handleAddNewAction}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-white shadow-sm transition-opacity cursor-pointer"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            <Icon name="Plus" className="w-3.5 h-3.5" />
            <span>Nova Ação</span>
          </button>
        </div>
      </div>

      {/* Split View: List on left, Editor on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
        {/* Actions List (Left 5 cols) */}
        <div className="md:col-span-5 space-y-1.5 max-h-[440px] overflow-y-auto pr-1">
          {actions.map((act) => {
            const isSelected = act.id === selectedAction?.id;
            return (
              <div
                key={act.id}
                onClick={() => setSelectedActionId(act.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-white/[0.08] border-white/20 shadow-xs'
                    : 'bg-black/10 dark:bg-zinc-900/40 border-hud hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'text-white'
                        : 'bg-zinc-800/40 text-zinc-400 border-white/10'
                    }`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: 'rgba(var(--accent-rgb), 0.2)',
                            borderColor: 'var(--accent-color)',
                            color: 'var(--accent-color)',
                          }
                        : undefined
                    }
                  >
                    <Icon name={act.icon} className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold truncate text-zinc-200">{act.title}</span>
                      {act.isCustom && (
                        <span className="text-[10px] px-1 py-0.1 rounded bg-amber-500/20 text-amber-300">
                          custom
                        </span>
                      )}
                    </div>
                    {act.command && (
                      <span
                        className="text-[11px] font-mono block truncate"
                        style={{ color: 'var(--accent-color)' }}
                      >
                        {act.command}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {act.shortcutHint && (
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/20 text-zinc-400 border border-white/10">
                      {act.shortcutHint}
                    </span>
                  )}
                  <Icon
                    name="ChevronRight"
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-zinc-200 translate-x-0.5' : 'text-zinc-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Editor (Right 7 cols) */}
        {selectedAction && (
          <div className="md:col-span-7 p-4 rounded-xl bg-black/15 dark:bg-zinc-900/60 border border-hud space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-300">Editando Ação:</span>
                <span
                  className="text-xs font-mono font-medium px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
                    borderColor: 'var(--accent-color)',
                    color: 'var(--accent-color)',
                  }}
                >
                  {selectedAction.command || selectedAction.title}
                </span>
              </div>

              {actions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteAction(selectedAction.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  title="Excluir esta ação"
                >
                  <Icon name="Trash2" className="w-3.5 h-3.5" />
                  <span>Excluir</span>
                </button>
              )}
            </div>

            {/* Basic Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-300">Título</label>
                <input
                  type="text"
                  value={selectedAction.title}
                  onChange={(e) => handleUpdateCurrentAction('title', e.target.value)}
                  className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none"
                  placeholder="Ex: Traduzir"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-300">Comando de Barra (/)</label>
                <input
                  type="text"
                  value={selectedAction.command || ''}
                  onChange={(e) => {
                    let val = e.target.value.trim();
                    if (val && !val.startsWith('/')) val = `/${val}`;
                    handleUpdateCurrentAction('command', val);
                  }}
                  className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs font-mono focus:outline-none"
                  style={{ color: 'var(--accent-color)' }}
                  placeholder="/traduzir"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-300">Atalho Visual (ex: Alt+1)</label>
                <input
                  type="text"
                  value={selectedAction.shortcutHint || ''}
                  onChange={(e) => handleUpdateCurrentAction('shortcutHint', e.target.value)}
                  className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs font-mono focus:outline-none"
                  placeholder="Alt+1"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-300">
                  Aliases (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={(selectedAction.aliases || []).join(', ')}
                  onChange={(e) => {
                    const raw = e.target.value
                      .split(',')
                      .map((s) => {
                        const trimmed = s.trim();
                        if (trimmed && !trimmed.startsWith('/')) return `/${trimmed}`;
                        return trimmed;
                      })
                      .filter(Boolean);
                    handleUpdateCurrentAction('aliases', raw);
                  }}
                  className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs font-mono focus:outline-none"
                  placeholder="/tr, /translate"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-medium text-zinc-300">Descrição</label>
                <input
                  type="text"
                  value={selectedAction.description}
                  onChange={(e) => handleUpdateCurrentAction('description', e.target.value)}
                  className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none"
                  placeholder="Ex: Traduz de forma natural e fluida"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-medium text-zinc-300 flex items-center justify-between">
                  <span>Template do Prompt do Usuário (opcional)</span>
                  <span className="text-[10px] text-zinc-500">Substitui {'{input}'} pelo texto digitado</span>
                </label>
                <textarea
                  value={selectedAction.userPromptTemplateString || ''}
                  onChange={(e) => handleUpdateCurrentAction('userPromptTemplateString', e.target.value)}
                  rows={2}
                  className="hud-input w-full p-2.5 rounded-lg border border-hud text-xs font-mono resize-y focus:outline-none"
                  placeholder={'Ex: Traduza o seguinte texto mantendo o tom exato:\n\n"""\n{input}\n"""'}
                />
              </div>
            </div>

            {/* Icon picker */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-zinc-300">Ícone</label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_ICONS.map((iconName) => {
                  const isCur = selectedAction.icon === iconName;
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => handleUpdateCurrentAction('icon', iconName)}
                      className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                        isCur
                          ? 'border-transparent text-white'
                          : 'bg-black/10 dark:bg-zinc-800/40 border-hud text-zinc-400 hover:text-zinc-200'
                      }`}
                      style={
                        isCur
                          ? {
                              backgroundColor: 'var(--accent-color)',
                            }
                          : undefined
                      }
                      title={iconName}
                    >
                      <Icon name={iconName} className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System Prompt (Sovereign) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Icon name="Terminal" className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                  <span>Prompt de Sistema Soberano (Instrução da Ação)</span>
                </label>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {selectedAction.systemPrompt.length} caracteres
                </span>
              </div>
              <textarea
                value={selectedAction.systemPrompt}
                onChange={(e) => handleUpdateCurrentAction('systemPrompt', e.target.value)}
                rows={6}
                className="hud-input w-full p-3 rounded-xl border border-hud text-xs font-mono leading-relaxed resize-y focus:outline-none text-zinc-200"
                placeholder="Defina a instrução técnica e regras rigorosas desta ação..."
              />
              <p className="text-[11px] text-zinc-400">
                Esta ação tem <strong>soberania total</strong>: nenhum agente ou persona global interfere ou altera esta instrução na execução.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
