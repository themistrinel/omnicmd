import { PromptAction } from '@/types';

export const PROMPT_ACTIONS: PromptAction[] = [
  {
    id: 'improve_prompt',
    title: 'Melhorar prompt',
    description: 'Transforma o texto em um prompt poderoso, detalhado e estruturado para LLMs',
    icon: 'Wand2',
    shortcutHint: 'Alt+1',
    command: '/melhorar',
    aliases: ['/prompt', '/improve', '/mp'],
    systemPrompt:
      'Você é um especialista em engenharia de prompts. Reescreva o prompt fornecido pelo usuário tornando-o claro, contextualizado, com instruções passo a passo, restrições e formato de saída ideal. Retorne apenas o prompt otimizado pronto para copiar.',
    userPromptTemplate: (input) => `Otimize o seguinte prompt para obter o melhor resultado possível de um modelo de IA:\n\n"""\n${input}\n"""`,
  },
  {
    id: 'translate',
    title: 'Traduzir',
    description: 'Traduz de forma natural e fluida (PT ↔ EN ou detecta idioma)',
    icon: 'Languages',
    shortcutHint: 'Alt+2',
    command: '/traduzir',
    aliases: ['/tr', '/translate'],
    systemPrompt:
      'Você é um tradutor sênior. Detecte o idioma de origem: se for português, traduza para inglês fluente e natural; se for outro idioma, traduza para português brasileiro fluente. Retorne apenas o texto traduzido sem explicações adicionais.',
    userPromptTemplate: (input) => `Traduza o seguinte texto preservando o tom e o contexto exato:\n\n"""\n${input}\n"""`,
  },
  {
    id: 'fix_grammar',
    title: 'Corrigir texto',
    description: 'Corrige pontuação, ortografia, concordância e coesão gramatical',
    icon: 'CheckCheck',
    shortcutHint: 'Alt+3',
    command: '/corrigir',
    aliases: ['/fix', '/grammar', '/cg'],
    systemPrompt:
      'Você é um revisor de texto especializado. Corrija todos os erros gramaticais, ortográficos, de pontuação e de concordância do texto fornecido. Preserve rigorosamente o sentido e o vocabulário pretendido pelo autor. Retorne diretamente o texto corrigido.',
    userPromptTemplate: (input) => `Corrija o seguinte texto:\n\n"""\n${input}\n"""`,
  },
  {
    id: 'summarize',
    title: 'Resumir',
    description: 'Condensa o conteúdo em pontos-chave essenciais e diretos',
    icon: 'FileText',
    shortcutHint: 'Alt+4',
    command: '/resumir',
    aliases: ['/resumo', '/sum', '/summarize'],
    systemPrompt:
      'Você é um especialista em síntese e análise de informação. Crie um resumo conciso, bem pontuado em tópicos principais com os pontos mais relevantes do texto a seguir. Seja extremamente denso em informação útil e elimine enrolações.',
    userPromptTemplate: (input) => `Resuma os pontos principais do texto a seguir:\n\n"""\n${input}\n"""`,
  },
  {
    id: 'explain',
    title: 'Explicar',
    description: 'Explica o conceito ou código de forma cristalina e didática',
    icon: 'HelpCircle',
    shortcutHint: 'Alt+5',
    command: '/explicar',
    aliases: ['/exp', '/explain'],
    systemPrompt:
      'Você é um professor e comunicador técnico genial. Explique de maneira intuitiva, didática e clara o que é, como funciona e por que é importante o conceito ou código apresentado a seguir.',
    userPromptTemplate: (input) => `Explique com clareza o seguinte:\n\n"""\n${input}\n"""`,
  },
  {
    id: 'rewrite',
    title: 'Reescrever',
    description: 'Reformula o texto para maior clareza, impacto e elegância',
    icon: 'RefreshCw',
    shortcutHint: 'Alt+6',
    command: '/reescrever',
    aliases: ['/rw', '/rewrite', '/polir'],
    systemPrompt:
      'Você é um redator de alto nível. Reescreva o texto a seguir para torná-lo mais polido, envolvente, direto e agradável de ler, mantendo todas as ideias originais. Retorne a versão reescrita.',
    userPromptTemplate: (input) => `Reescreva o seguinte texto para torná-lo mais claro e profissional:\n\n"""\n${input}\n"""`,
  },
  {
    id: 'transform_to_prompt',
    title: 'Transformar em prompt',
    description: 'Converte uma ideia solta ou anotação em uma instrução executável',
    icon: 'Sparkles',
    shortcutHint: 'Alt+7',
    command: '/gerar-prompt',
    aliases: ['/ideia', '/workflow'],
    systemPrompt:
      'Você é um desenvolvedor de workflows de IA. Pegue o texto ou rascunho de ideia a seguir e converta-o em uma instrução/prompt completo para um agente de IA executar com especificações claras de entrada, processo e saída.',
    userPromptTemplate: (input) => `Converta a seguinte anotação ou ideia em uma instrução/prompt executável completo:\n\n"""\n${input}\n"""`,
  },
  {
    id: 'custom',
    title: 'Personalizado',
    description: 'Envie qualquer instrução livre diretamente com o texto selecionado',
    icon: 'MessageSquare',
    shortcutHint: 'Alt+8',
    command: '/livre',
    aliases: ['/custom', '/ask'],
    systemPrompt:
      'Você é um assistente de IA focado e prestativo. Siga a instrução solicitada pelo usuário com excelência e precisão.',
    userPromptTemplate: (input) => input,
  },
  {
    id: 'analyze_image',
    title: 'Analisar Imagem (Extremo Detalhe)',
    description: 'Decomposição visual minuciosa, OCR completo de textos, contexto, iluminação e elementos',
    icon: 'Eye',
    shortcutHint: 'Alt+9',
    command: '/analisar',
    aliases: ['/visao', '/ver', '/img'],
    isVisionAction: true,
    systemPrompt:
      'Você é um analista visual sênior e especialista em inspeção de imagens de altíssima precisão. Faça uma análise de EXTREMO DETALHE da imagem fornecida:\n\n1. RESUMO EXECUTIVO: O que é a imagem, propósito e mensagem principal.\n2. TRANSCRIÇÃO / OCR COMPLETO: Transcreva fielmente e integralmente TODOS os textos, labels, botões, números e trechos legíveis na imagem (inclusive textos pequenos em rodapés, marcas d\'água ou menus).\n3. ELEMENTOS VISUAIS & ESTRUTURA: Detalhe os componentes presentes, hierarquia espacial, posições relativas, proporções, diagramas ou ícones.\n4. CORES, ILUMINAÇÃO & ATMOSFERA: Paleta cromática predominante (com códigos hexadecimais aproximados quando aplicável), iluminação, contraste e texturas.\n5. DETALHES PERIFÉRICOS & NUANCES: Anote qualquer artefato, inconsistência, detalhes de fundo ou elementos que poderiam passar despercebidos em uma leitura rápida.\n\nRetorne a análise formatada em Markdown profissional, direto e ultra descritivo.',
    userPromptTemplate: (input) =>
      input?.trim()
        ? `Por favor, analise esta imagem com extremo detalhe, focando especialmente na seguinte instrução do usuário: "${input}".`
        : 'Por favor, realize uma análise de extremo detalhe desta imagem conforme suas diretrizes de inspeção minuciosa.',
  },
  {
    id: 'inspect_ui',
    title: 'Inspecionar UI & Frontend',
    description: 'Engenharia reversa visual: tokens, tipografia, Tailwind, grid, componentes e acessibilidade',
    icon: 'LayoutTemplate',
    shortcutHint: 'Alt+0',
    command: '/analisar-ui',
    aliases: ['/ui', '/design', '/frontend', '/inspect'],
    isVisionAction: true,
    systemPrompt:
      'Você é um Principal Frontend Engineer e Design Systems Specialist. Realize uma inspeção técnica aprofundada de UI/UX da interface ou captura fornecida para implementação em código:\n\n1. HIERARQUIA VISUAL & LAYOUT: Estrutura do grid, flexbox, containers, alinhamentos, paddings e margens estimados.\n2. TOKENS DE DESIGN (Tailwind CSS):\n   - Paleta de cores (ex: bg-zinc-950, text-amber-400, border-white/10 com hex inferidos)\n   - Tipografia: tamanhos aproximados (text-xs a text-2xl), pesos (font-medium, font-bold), entrelinha (leading) e contraste.\n   - Bordas, raios (rounded-xl, rounded-2xl) e elevações/sombras.\n3. ARQUITETURA DE COMPONENTES: Mapeie a decomposição em componentes React/Vue (ex: Shell, Header, ActionButton, DataCard).\n4. ACESSIBILIDADE (WCAG 2.1 AA): Pontos de atenção em contraste de cores, áreas de clique (target size mínimo 44x44), legibilidade e semântica.\n5. CÓDIGO SUGERIDO: Forneça um bloco limpo e pronto de JSX/HTML estilizado com Tailwind CSS replicando fielmente a estrutura ou componente central da imagem.\n\nRetorne em Markdown técnico com tabelas e blocos de código prontos para copiar.',
    userPromptTemplate: (input) =>
      input?.trim()
        ? `Inspecione detalhadamente esta UI para implementação frontend, considerando este contexto adicional do usuário: "${input}".`
        : 'Inspecione detalhadamente esta interface/UI para implementação técnica no frontend com Tailwind CSS e React.',
  },
  {
    id: 'check_update',
    title: 'Verificar atualizações',
    description: 'Verifica novas versões do OmniCmd no GitHub Releases e instala se disponível',
    icon: 'Sparkles',
    command: '/update',
    aliases: ['/atualizar', '/versao', '/upgrade'],
    systemPrompt:
      'Você é o assistente de atualizações do OmniCmd.',
    userPromptTemplate: () => '',
  },
];

export function getActionById(id: string): PromptAction {
  return PROMPT_ACTIONS.find((a) => a.id === id) || PROMPT_ACTIONS[0];
}
