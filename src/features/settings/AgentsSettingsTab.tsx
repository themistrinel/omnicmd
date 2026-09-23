import React, { useState } from 'react';
import { Agent } from '@/types';
import { AGENTS } from '@/lib/agents';
import { Icon } from '@/components/Icon';

interface AgentsSettingsTabProps {
  agents: Agent[];
  onUpdateAgents: (updated: Agent[]) => void;
}

const AVAILABLE_ICONS = [
  'Sparkles',
  'Code2',
  'Terminal',
  'PenTool',
  'Languages',
  'Bot',
  'Cpu',
  'FileCode',
  'UserCheck',
  'MessageSquare',
  'Sliders',
  'HelpCircle',
];

export const AgentsSettingsTab: React.FC<AgentsSettingsTabProps> = ({
  agents,
  onUpdateAgents,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || 'general');

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const handleUpdateCurrentAgent = (field: keyof Agent, value: any) => {
    if (!selectedAgent) return;
    const updated = agents.map((agent) => {
      if (agent.id === selectedAgent.id) {
        return { ...agent, [field]: value };
      }
      return agent;
    });
    onUpdateAgents(updated);
  };

  const handleAddNewAgent = () => {
    const newId = `agent_${Date.now()}`;
    const newAgent: Agent = {
      id: newId,
      name: 'Novo Agente',
      handle: `@novo_${agents.length + 1}`,
      aliases: [],
      description: 'Especialista configurado pelo usuário.',
      icon: 'Bot',
      systemInstruction:
        'Você é um assistente especialista focado em entregar soluções precisas, bem estruturadas e diretas ao ponto.',
      isCustom: true,
    };
    const updated = [...agents, newAgent];
    onUpdateAgents(updated);
    setSelectedAgentId(newId);
  };

  const handleDeleteAgent = (idToDelete: string) => {
    if (agents.length <= 1) {
      alert('É necessário manter ao menos um agente no sistema.');
      return;
    }
    const updated = agents.filter((a) => a.id !== idToDelete);
    onUpdateAgents(updated);
    if (selectedAgentId === idToDelete) {
      setSelectedAgentId(updated[0]?.id || '');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar todos os agentes e prompts de fábrica? Suas customizações serão substituídas pelos prompts padrão.')) {
      onUpdateAgents(AGENTS);
      setSelectedAgentId(AGENTS[0].id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-hud">
        <div>
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <span>Agentes de IA Contextuais</span>
            <span className="text-xs px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono">
              @agente
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Gerencie e personalize os prompts prontos de cada agente ou crie novos especialistas sob medida.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-hud transition-colors cursor-pointer"
            title="Restaurar prompts e agentes de fábrica"
          >
            <Icon name="RotateCcw" className="w-3.5 h-3.5" />
            <span>Restaurar Padrões</span>
          </button>

          <button
            type="button"
            onClick={handleAddNewAgent}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-white shadow-sm transition-opacity cursor-pointer"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            <Icon name="Plus" className="w-3.5 h-3.5" />
            <span>Novo Agente</span>
          </button>
        </div>
      </div>

      {/* Split View: List on left, Editor on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
        {/* Agents List (Left 5 cols) */}
        <div className="md:col-span-5 space-y-1.5 max-h-[440px] overflow-y-auto pr-1">
          {agents.map((agent) => {
            const isSelected = agent.id === selectedAgent?.id;
            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-white/[0.08] border-sky-500/40 shadow-xs'
                    : 'bg-black/10 dark:bg-zinc-900/40 border-hud hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                        : 'bg-zinc-800/40 text-zinc-400 border-white/10'
                    }`}
                  >
                    <Icon name={agent.icon} className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold truncate text-zinc-200">{agent.name}</span>
                      {agent.isCustom && (
                        <span className="text-[10px] px-1 py-0.1 rounded bg-amber-500/20 text-amber-300">
                          custom
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-sky-400 block truncate">
                      {agent.handle}
                    </span>
                  </div>
                </div>

                <Icon
                  name="ChevronRight"
                  className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                    isSelected ? 'text-sky-400 translate-x-0.5' : 'text-zinc-600'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Agent Editor (Right 7 cols) */}
        {selectedAgent && (
          <div className="md:col-span-7 p-4 rounded-xl bg-black/15 dark:bg-zinc-900/60 border border-hud space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-300">Editando Agente:</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {selectedAgent.handle}
                </span>
              </div>

              {agents.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteAgent(selectedAgent.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  title="Excluir este agente"
                >
                  <Icon name="Trash2" className="w-3.5 h-3.5" />
                  <span>Excluir</span>
                </button>
              )}
            </div>

            {/* Basic Info Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-300">Nome de Exibição</label>
                <input
                  type="text"
                  value={selectedAgent.name}
                  onChange={(e) => handleUpdateCurrentAgent('name', e.target.value)}
                  className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none"
                  placeholder="Ex: Dev / Coding"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-300">Handle de Invocação (@)</label>
                <input
                  type="text"
                  value={selectedAgent.handle}
                  onChange={(e) => {
                    let val = e.target.value.trim();
                    if (val && !val.startsWith('@')) val = `@${val}`;
                    handleUpdateCurrentAgent('handle', val);
                  }}
                  className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs font-mono focus:outline-none text-sky-300"
                  placeholder="@dev"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-medium text-zinc-300">Descrição Curta</label>
                <input
                  type="text"
                  value={selectedAgent.description}
                  onChange={(e) => handleUpdateCurrentAgent('description', e.target.value)}
                  className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs focus:outline-none"
                  placeholder="Ex: Arquiteto sênior para código limpo e moderno"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-medium text-zinc-300">
                  Aliases Alternativos (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={selectedAgent.aliases.join(', ')}
                  onChange={(e) => {
                    const raw = e.target.value.split(',').map((s) => {
                      const trimmed = s.trim();
                      if (trimmed && !trimmed.startsWith('@')) return `@${trimmed}`;
                      return trimmed;
                    }).filter(Boolean);
                    handleUpdateCurrentAgent('aliases', raw);
                  }}
                  className="hud-input w-full px-3 py-1.5 rounded-lg border text-xs font-mono focus:outline-none"
                  placeholder="@code, @coding, @programador"
                />
              </div>
            </div>

            {/* Icon picker */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-zinc-300">Ícone</label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_ICONS.map((iconName) => {
                  const isCur = selectedAgent.icon === iconName;
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => handleUpdateCurrentAgent('icon', iconName)}
                      className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                        isCur
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : 'bg-black/10 dark:bg-zinc-800/40 border-hud text-zinc-400 hover:text-zinc-200'
                      }`}
                      title={iconName}
                    >
                      <Icon name={iconName} className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System Instruction (Prompt) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Icon name="Terminal" className="w-3.5 h-3.5 text-sky-400" />
                  <span>Instrução de Sistema (Prompt do Agente)</span>
                </label>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {selectedAgent.systemInstruction.length} caracteres
                </span>
              </div>
              <textarea
                value={selectedAgent.systemInstruction}
                onChange={(e) => handleUpdateCurrentAgent('systemInstruction', e.target.value)}
                rows={6}
                className="hud-input w-full p-3 rounded-xl border border-hud text-xs font-mono leading-relaxed resize-y focus:outline-none text-zinc-200"
                placeholder="Defina a persona, tom, regras de formatação e formato de resposta deste agente..."
              />
              <p className="text-[11px] text-zinc-400">
                Este prompt é enviado como contexto de sistema sempre que o usuário invocar{' '}
                <code className="text-sky-300 font-mono">{selectedAgent.handle}</code> em texto livre.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
