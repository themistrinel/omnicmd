import { Translations } from '../types';

export const pt: Translations = {
  nav: {
    cockpit: 'Cockpit',
    features: 'Recursos',
    benchmarks: 'Benchmarks',
    commands: 'Comandos',
    changelog: 'Changelog',
    downloadBtn: 'Baixar v0.1.0',
    downloadFor: 'Baixar para',
    systemDirectory: 'DIRETÓRIO DO SISTEMA',
  },
  hero: {
    badgeRuntime: 'IA Desktop Local-First // Código Aberto',
    badgeZeroCloud: 'Zero envio de telemetria',
    headline: 'O HUD de IA Direto no Teclado para o seu Editor',
    subtitle:
      'Sobreposto diretamente sobre Neovim, VS Code ou seu terminal. Desperta em 18ms com zero troca de janelas, zero envio de telemetria e performance nativa em Rust.',
    globalHotkey: 'ATALHO GLOBAL:',
    hotkeyComment: '// flutua sobre Neovim, VS Code ou terminal',
    downloadBtn: 'Baixar para',
    downloadDetails: '~12MB',
    githubRepo: 'Repositório GitHub',
    copied: 'Copiado',
    copy: 'Copiar',
  },
  features: {
    pill: 'ARQUITETURA NATIVA // TAURI V2 & RUST',
    headline: 'Projetado para o Fluxo do Desenvolvedor',
    subtitle:
      'Despertar abaixo de 20ms, captura imediata de seleção e orquestração de prompts sem perder o foco do editor nem alterar janelas em tiling.',
    card1: {
      tag: 'AÇÕES RÁPIDAS // [ALT+1..8]',
      badge: 'DISPACHO DE PROMPTS',
      title: 'Transformação Imediata de Seleção',
      description:
        'O OmniCmd formata qualquer texto selecionado com um único atalho (Alt+1 a Alt+8) em diretivas de prompt estruturadas. O buffer ativo recebe o contexto desejado na hora, sem copiar e colar manual.',
      matrixHeader: 'DIRETIVAS INTERATIVAS',
      directives: [
        { cmd: '/melhorar', key: 'Alt+1', desc: 'Otimizador de prompt' },
        { cmd: '/traduzir', key: 'Alt+2', desc: 'Traduzir código/docs' },
        { cmd: '/corrigir', key: 'Alt+3', desc: 'Corrigir código e sintaxe' },
        { cmd: '/resumir', key: 'Alt+4', desc: 'Resumir conteúdo' },
      ],
      footerConfig: 'Configuração declarativa em ~/.config/omnicmd/prompts.json',
      footerCount: '8 Diretivas Prontas',
    },
    card2: {
      tag: 'OVERLAY GLOBAL // [SUPER+ESPAÇO]',
      badge: '18MS DE DESPERTAR',
      title: 'HUD Flutuante em Rust e Tauri v2',
      description:
        'Desperta em 18ms sem roubar o foco permanente da janela nem recalcular divisões de tela. Um overlay leve de latência zero que preserva o estado do editor e elimina dezenas de abas no navegador.',
      matrixHeader: 'INVOCAÇÃO INSTANTÂNEA DO HUD',
      meta: {
        hotkey: { label: 'Atalho Global', value: 'Super + Espaço' },
        provider: { label: 'Provedor Ativo', value: '9router' },
        latency: { label: 'Latência Wake', value: '18 ms' },
        compat: { label: 'Compatibilidade', value: 'Multi-LLM' },
      },
      footerCompositor: 'Compositor nativo // Wayland, macOS e Windows',
      footerSwitching: '0 Troca de Contexto',
    },
    statusBar: {
      title: 'STATUS DE EXECUÇÃO // 9ROUTER + OLLAMA',
      model: '9router: ag/gemini-3.8-flash-low',
    },
  },
  workflow: {
    pill: 'ERGONOMIA // FLUXO NO TECLADO',
    headline: 'TRÊS TECLAS. ZERO MOUSE.',
    subtitle:
      'Elimine o atrito de alternar para o navegador, colar trechos de código e aguardar janelas pesadas. O pipeline vive direto nas teclas de base.',
    stage1: {
      label: 'ETAPA 01 // INGESTÃO',
      time: '18ms',
      title: 'Captura de Contexto',
      description:
        'Selecione um erro de compilação, regex complexa ou schema de tabela no seu editor. Pressione o atalho global. O OmniCmd surge sobreposto com o texto já pré-carregado.',
      badge: 'Foco nativo sem recálculo de janelas em tiling',
    },
    stage2: {
      label: 'ETAPA 02 // DISPARO',
      time: '< 1ms',
      title: 'Execução em Um Toque',
      description:
        'Dispare diretivas com atalhos numéricos diretos (Alt+1 para melhorar, Alt+2 para traduzir, Alt+5 para explicar). Ou digite comandos de barra (/corrigir, /reescrever) no buffer do HUD.',
      badge: 'Navegação Vim: Ctrl + j / k',
    },
    stage3: {
      label: 'ETAPA 03 // INJEÇÃO',
      time: 'Direto',
      title: 'Retorno ao Buffer',
      description:
        'Tokens fluem em tempo real do seu Ollama local ou modelo em nuvem. Pressione Enter para copiar o markdown/código formatado para a área de transferência, ou Esc para fechar na hora.',
      badge: 'Retorno instantâneo à janela ativa do editor',
    },
    matrixTitle: 'MATRIZ DE NAVEGAÇÃO NO TECLADO',
    matrixSubtitle: 'Navegação Universal na Linha Base',
    matrixItems: {
      summon: 'Chamar / Ocultar',
      traverse: 'Navegação Vim',
      action: 'Disparar Ação',
      persona: 'Perfil de Persona',
      provider: 'Alternar Provedor',
      history: 'Histórico de Prompts',
      copy: 'Copiar Buffer',
      dismiss: 'Fechar Overlay',
    },
  },
  benchmarks: {
    pill: 'PROFILER DE HARDWARE // RUST COMPILADO VS ELECTRON',
    headline: 'DAEMON COMPILADO EM RUST. 24MB DE RAM EM REPOUSO.',
    subtitle:
      'Muitas paletas são web wrappers disfarçados de desktop, consumindo centenas de megabytes de RAM. O OmniCmd é compilado para código de máquina com Tauri v2 e dorme a 0.0% de CPU.',
    profilerTitle: 'PROFILER DE TELEMETRIA DE HARDWARE',
    profilerSub: 'x86_64 Linux // Wayland Nativo',
    ram: {
      title: '01 // CONSUMO DE RAM EM REPOUSO',
      diff: '-95% DE CONSUMO',
      omniDesc: 'OmniCmd (Rust + Tauri v2)',
      electronDesc: 'Paleta Comum em Electron',
    },
    latency: {
      title: '02 // LATÊNCIA DE ABERTURA A FRIO',
      diff: '52x MAIS RÁPIDO',
      omniDesc: 'OmniCmd (Handle Nativo do SO)',
      electronDesc: 'Captura de Janela Electron',
    },
    binary: {
      title: '03 // INSTALADOR / TAMANHO DO BINÁRIO',
      tag: 'ZERO CHROMIUM EMBUTIDO',
      omniTitle: 'BINÁRIO OMNICMD',
      omniSize: '12.4 MB',
      omniDesc: 'ELF / Mach-O compilado único',
      electronTitle: 'APP EM ELECTRON',
      electronSize: '185.0 MB',
      electronDesc: 'Chrome embutido + runtime Node',
    },
    pillars: {
      p1: {
        title: 'SQLITE EMBUTIDO LOCAL',
        badge: 'LOCAL-FIRST',
        description:
          'Todos os logs de tokens, ações customizadas e histórico de saídas persistem em um banco SQLite embutido em ~/.omnicmd.db. Salvo estritamente no seu disco, sem telemetria nem rastreadores remotos.',
        detail: 'Indexação FTS5 local completa e histórico de consultas',
      },
      p2: {
        title: 'NÚCLEO IPC TOKIO ASSÍNCRONO',
        badge: '< 0.8ms IPC',
        description:
          'Serialização IPC sub-milissegundo conecta a webview a threads de trabalho em Rust. Server-Sent Events (SSE) transmitem tokens sem travar a interface ou a digitação no teclado.',
        detail: 'Zero contenção de threads no daemon de atalhos',
      },
      p3: {
        title: 'RUNTIME HÍBRIDO LOCAL E NUVEM',
        badge: 'HÍBRIDO',
        description:
          'Opere 100% offline com Ollama local ou llama.cpp (totalmente privado, zero tráfego de rede) ou conecte diretamente a APIs de nuvem (9router, OpenAI, Anthropic) com suas próprias chaves.',
        detail: 'Socket nativo offline do llama.cpp e Ollama',
      },
    },
  },
  commands: {
    pill: 'DIRETIVAS NATIVAS // CATÁLOGO PRINCIPAL',
    headline: 'Catálogo de Diretivas Nativas',
    subtitle:
      'Cada diretiva é vinculada a um atalho dedicado (Alt+1 a Alt+8) para formatar o texto selecionado com prompts de sistema objetivos, refletindo o catálogo em tempo de execução do OmniCmd.',
    directivePurpose: 'Objetivo e Escopo da Diretiva',
    sampleInput: 'Exemplo de Buffer de Entrada Selecionado',
    generatedOutput: 'Saída Gerada pela Diretiva',
    officialShortcut: 'Atalho Oficial:',
    customizable: 'Personalizável via ~/.config/omnicmd/prompts.json',
    count: '8 Diretivas Nativas',
    systemTitle: 'CONTROLES DO SISTEMA E PROVEDORES',
    systemSub: 'Ajuste Instantâneo do HUD',
    items: [
      {
        id: 'improve',
        command: '/melhorar',
        name: 'Otimizar Prompt',
        category: 'Engenharia',
        shortcut: 'Alt+1',
        description:
          'Otimiza prompts brutos com especificações estruturadas, raciocínio analítico e restrições claras de formato de saída.',
        exampleContext: 'criar uma api em rust para gerenciar tarefas com sqlite',
        outputSummary:
          'Produz uma diretiva arquitetural completa com tipagem estrita, crates recomendadas (Axum + SQLx) e tratamento de erros de produção.',
      },
      {
        id: 'translate',
        command: '/traduzir',
        name: 'Traduzir Código e Docs',
        category: 'Idiomas',
        shortcut: 'Alt+2',
        description:
          'Traduz documentações técnicas, comentários ou mensagens de erro preservando estritamente a sintaxe do código, identificadores e formatação.',
        exampleContext:
          'The borrow checker enforces that references always point to valid data and cannot outlive their owner.',
        outputSummary:
          'O verificador de empréstimos garante que referências sempre apontem para dados válidos sem gerar referências soltas.',
      },
      {
        id: 'fix',
        command: '/corrigir',
        name: 'Corrigir Código e Sintaxe',
        category: 'Refinamento',
        shortcut: 'Alt+3',
        description:
          'Elimina erros gramaticais, digitação, concordância e inconsistências sintáticas em commits, PRs e documentações.',
        exampleContext:
          'precisamos otimiza estas querys porque elas esta lenta em produção',
        outputSummary:
          'Precisamos otimizar estas queries porque estão causando alta latência em produção.',
      },
      {
        id: 'summarize',
        command: '/resumir',
        name: 'Resumir Conteúdo',
        category: 'Síntese',
        shortcut: 'Alt+4',
        description:
          'Condensa logs de CI/CD, diagnósticos de compilador, git diffs ou discussões em tópicos priorizados e acionáveis.',
        exampleContext:
          'Saída extensa de pipeline CI/CD com 120 linhas de avisos e falhas de compilação estática',
        outputSummary:
          '1. Faltam headers dev do OpenSSL. 2. Target musl requer flag static. 3. Script de build corrigido fornecido.',
      },
      {
        id: 'explain',
        command: '/explicar',
        name: 'Explicar Conceito e Código',
        category: 'Análise',
        shortcut: 'Alt+5',
        description:
          'Desmonta algoritmos complexos, invariantes de lifetime em Rust, padrões concorrentes ou blocos obscuros em passos claros.',
        exampleContext:
          "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { if x.len() > y.len() { x } else { y } }",
        outputSummary:
          "Explicação detalhada do lifetime 'a: a referência retornada permanece válida enquanto ambos os parâmetros continuarem no escopo.",
      },
      {
        id: 'rewrite',
        command: '/reescrever',
        name: 'Reescrever e Ajustar Tom',
        category: 'Estilo',
        shortcut: 'Alt+6',
        description:
          'Refatora textos técnicos, rascunhos de RFC ou comunicados para a equipe em um tom claro, conciso e profissional.',
        exampleContext:
          'acho que esse endpoint ta meio estranho e a gente devia mudar antes que de ruim',
        outputSummary:
          'Recomendamos refatorar a assinatura deste endpoint para assegurar a idempotência REST e previsibilidade em produção.',
      },
      {
        id: 'prompt',
        command: '/gerar-prompt',
        name: 'Gerar Prompt de Agente',
        category: 'Estruturação',
        shortcut: 'Alt+7',
        description:
          'Transforma notas soltas, histórias de usuário ou relatos de bug em instruções organizadas sob medida para agentes de código.',
        exampleContext:
          'preciso de um microsserviço golang pra processar webhooks com deduplicação no redis',
        outputSummary:
          'Prompt estruturado com arquitetura hexagonal, chaves de idempotência no Redis e suíte de testes de integração automatizada.',
      },
      {
        id: 'custom',
        command: '/livre',
        name: 'Consulta Livre',
        category: 'Ad-hoc',
        shortcut: 'Alt+8',
        description:
          'Canal aberto para qualquer consulta, derivações lógicas ou instruções personalizadas com streaming SSE em tempo real.',
        exampleContext:
          'Escreva uma macro declarativa em Rust que implementa a trait FromStr para um enum qualquer',
        outputSummary:
          'Expansão de macro pronta para compilação sem introduções redundantes ou conversas desnecessárias.',
      },
    ],
    systemItems: [
      {
        handle: '9router',
        name: 'Provedor Ativo',
        shortcut: '/provider',
        specialty: 'ag/gemini-3.8-flash-low com fallback para Claude 3.5 Sonnet e GPT-4o.',
        detail: 'Latência de primeiro token abaixo de 1s via streaming SSE nativo.',
      },
      {
        handle: 'Ollama Local',
        name: 'Execução Offline',
        shortcut: '/provider',
        specialty: 'Pesos locais (Qwen 2.5 Coder, Llama 3.3) hospedados em localhost:11434.',
        detail: '100% privado, zero tráfego de rede para fora da sua máquina.',
      },
      {
        handle: '/history',
        name: 'Registro SQLite',
        shortcut: 'Ctrl+H',
        specialty: 'Busca textual FTS5 instantânea sobre prompts anteriores e respostas geradas.',
        detail: 'Armazenado localmente em ~/.omnicmd.db.',
      },
      {
        handle: '/settings',
        name: 'Configurações',
        shortcut: 'Ctrl+,',
        specialty: 'Personalize atalhos globais, opacidade do HUD e credenciais de API.',
        detail: 'Validação estrita com JSON Schema.',
      },
    ],
  },
  downloads: {
    pill: 'DISTRIBUIÇÃO // ARTEFATOS NATIVOS',
    headline: 'Binários Nativos. Código de Máquina Compilado.',
    subtitle:
      'Pacotes binários pré-compilados e verificados criptograficamente para Linux, macOS e Windows. Menos de 15MB, sob licença MIT.',
    tabs: {
      linux: 'Linux (Arch / Hyprland / .deb)',
      mac: 'macOS (Universal)',
      windows: 'Windows (x64)',
      source: 'Compilar do Código-Fonte',
      detected: 'DETECTADO',
    },
    linux: {
      title: 'Integração com Arch Linux e Hyprland Wayland',
      desc: 'Inclui suporte nativo à área de transferência Wayland (wl-clipboard) e regras flutuantes dedicadas para Hyprland.',
      btnDeb: 'BAIXAR .DEB (DEBIAN / UBUNTU)',
      btnAppImage: 'UNIVERSAL .APPIMAGE',
      quickInstall: 'Instalação Rápida em 1 Linha (Sem Necessidade de Git Clone)',
      hyprlandTitle: 'Regras de Janela Hyprland Nativas (~/.config/hypr/omnicmd.conf)',
    },
    mac: {
      title: 'Pacote de Aplicação Universal macOS',
      desc: 'Binário nativo para Apple Silicon (M1/M2/M3/M4) e Intel x86_64. Assinado e autenticado para macOS 11+.',
      btnDmg: 'BAIXAR .DMG UNIVERSAL',
      permTitle: 'PERMISSÕES DE ACESSIBILIDADE',
      permDesc:
        'O OmniCmd requer permissões de Acessibilidade no macOS para registrar o atalho global Cmd+Espaço e ler o texto selecionado sem roubar o foco permanente da janela.',
      localTitle: 'ARMAZENAMENTO APENAS LOCAL',
      localDesc:
        'Zero telemetria na nuvem. Todo histórico de prompts, ações personalizadas e configurações permanecem estritamente no seu disco local.',
    },
    windows: {
      title: 'Distribuição Nativa Windows x64',
      desc: 'Instalador leve ou executável portátil standalone usando o runtime WebView2 do sistema.',
      btnMsi: 'BAIXAR INSTALADOR (.MSI)',
      btnZip: 'PORTÁTIL (.ZIP)',
      trayTitle: 'DAEMON NA BANDEJA DO SISTEMA WINDOWS',
      trayDesc:
        'O OmniCmd permanece na área de notificação do Windows. Invoque com Win + Espaço sobre o Visual Studio, VS Code ou Windows Terminal.',
    },
    source: {
      title: 'Compile Diretamente com Cargo e Tauri CLI',
      desc: 'Requer Rust 1.77+, Node.js (ou pnpm) e pacotes de desenvolvimento padrão do SO (libwebkit2gtk no Linux).',
      pipeline: 'Pipeline de Compilação no Terminal',
    },
    checksum: 'Todos os artefatos binários assinados com hashes SHA-256',
    viewAll: 'VER TODOS OS ARTEFATOS NO GITHUB RELEASES',
  },
  devlogs: {
    pill: 'REGISTRO DE VERSÕES // BUILDS AUDITADOS',
    headline: 'REGISTRO DE VERSÕES AUDITADO.',
    subtitle:
      'Compilado a partir do código-fonte e assinado criptograficamente através de pipelines de CI/CD automatizadas do GitHub Actions.',
    allReleases: 'TODOS OS RELEASES E HASHES',
    verified: 'VERIFICADO SHA-256',
    changes: [
      {
        title: 'Tauri v2 + Tokio Core',
        desc: 'Reescrita completa do daemon em Rust compilado, reduzindo o consumo de memória em repouso de 400MB para 23.8MB com abertura em menos de 20ms.',
      },
      {
        title: 'SQLite Embutido Local',
        desc: 'Substituição do localStorage do navegador por um banco SQLite local com zero telemetria em ~/.omnicmd.db.',
      },
      {
        title: 'Motor SSE Multi-Provedor',
        desc: 'Streaming assíncrono de tokens com despacho sub-milissegundo entre Ollama, 9router, OpenAI e Anthropic.',
      },
    ],
    license: 'Lançamento de código aberto sob licença MIT',
    viewCommits: 'VER COMMITS E SHAS →',
  },
  cta: {
    badge: 'Local-First & Livre de Telemetria',
    headline: 'Pare de Alternar Janelas.\nRecupere Suas Teclas.',
    subtitle:
      'Binário de menos de 15MB. 24MB de consumo de RAM em repouso. Código aberto sob licença MIT. Funciona 100% offline com Ollama ou conecta direto a APIs de LLMs em nuvem.',
    downloadFor: 'Baixar para',
    githubRepo: 'Repositório no GitHub',
  },
  footer: {
    links: {
      cockpit: 'Cockpit',
      features: 'Recursos',
      cadence: 'Fluxo',
      architecture: 'Arquitetura',
      commands: 'Comandos',
      github: 'GitHub',
      releases: 'Releases',
      mit: 'MIT',
      top: 'Início',
    },
  },
  langSelector: {
    selectLanguage: 'Idioma',
    autoDetected: 'Detectado automaticamente',
  },
};
