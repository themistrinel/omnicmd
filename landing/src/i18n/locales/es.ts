import { Translations } from '../types';

export const es: Translations = {
  nav: {
    cockpit: 'Cockpit',
    features: 'Características',
    benchmarks: 'Benchmarks',
    commands: 'Comandos',
    changelog: 'Changelog',
    downloadBtn: 'Descargar v0.1.0',
    downloadFor: 'Descargar para',
    systemDirectory: 'DIRECTORIO DEL SISTEMA',
  },
  hero: {
    badgeRuntime: 'IA Desktop Local-First // Código Abierto',
    badgeZeroCloud: 'Cero telemetría externa',
    headline: 'El HUD de IA Directo en tu Teclado para tu Editor',
    subtitle:
      'Superpuesto directamente sobre Neovim, VS Code o tu terminal. Despierta en 18ms con cero cambio de ventanas, cero telemetría externa y rendimiento nativo en Rust.',
    globalHotkey: 'ATAJO GLOBAL:',
    hotkeyComment: '// flota sobre Neovim, VS Code o terminal',
    downloadBtn: 'Descargar para',
    downloadDetails: '~12MB',
    githubRepo: 'Repositorio GitHub',
    copied: 'Copiado',
    copy: 'Copiar',
    paletteImage: './omnicmd-palette-es.png',
    paletteAlt: 'OmniCmd HUD de Escritorio Nativo — La Paleta de Comandos de IA Centrada en el Teclado',
  },
  features: {
    pill: 'ARQUITECTURA NATIVA // TAURI V2 & RUST',
    headline: 'Diseñado para el Flujo del Desarrollador',
    subtitle:
      'Despertar en menos de 20ms, captura inmediata de selecciones y orquestación de prompts sin perder el foco del editor ni alterar ventanas en mosaico.',
    card1: {
      tag: 'ACCIONES RÁPIDAS // [ALT+1..8]',
      badge: 'DESPACHADOR DE PROMPTS',
      title: 'Transformación Inmediata de Selección',
      description:
        'OmniCmd formatea cualquier texto seleccionado con un solo atajo (Alt+1 a Alt+8) en directivas de prompt estructuradas. El buffer activo recibe el contexto deseado al instante, sin copiar y pegar manual.',
      matrixHeader: 'DIRECTIVAS INTERACTIVAS',
      directives: [
        { cmd: '/mejorar', key: 'Alt+1', desc: 'Optimizador de prompts' },
        { cmd: '/traducir', key: 'Alt+2', desc: 'Traducir código/docs' },
        { cmd: '/corregir', key: 'Alt+3', desc: 'Corregir código y sintaxis' },
        { cmd: '/resumir', key: 'Alt+4', desc: 'Resumir contenido' },
      ],
      footerConfig: 'Configuración declarativa en ~/.config/omnicmd/prompts.json',
      footerCount: '8 Directivas Listas',
    },
    card2: {
      tag: 'OVERLAY GLOBAL // [SUPER+ESPACIO]',
      badge: '18MS DE DESPERTAR',
      title: 'HUD Flotante en Rust y Tauri v2',
      description:
        'Despierta en 18ms sin robar el foco permanente de la ventana ni alterar distribuciones en mosaico. Un overlay ligero de latencia cero que preserva el estado del editor y elimina decenas de pestañas.',
      matrixHeader: 'INVOCACIÓN INSTANTÁNEA DEL HUD',
      meta: {
        hotkey: { label: 'Atajo Global', value: 'Super + Espacio' },
        provider: { label: 'Proveedor Activo', value: '9router' },
        latency: { label: 'Latencia Wake', value: '18 ms' },
        compat: { label: 'Compatibilidad', value: 'Multi-LLM' },
      },
      footerCompositor: 'Compositor nativo // Wayland, macOS y Windows',
      footerSwitching: '0 Cambio de Contexto',
    },
    statusBar: {
      title: 'ESTADO DE EJECUCIÓN // 9ROUTER + OLLAMA',
      model: '9router: ag/gemini-3.8-flash-low',
    },
  },
  workflow: {
    pill: 'ERGONOMÍA // FLUJO EN TECLADO',
    headline: 'TRES TECLAS. CERO RATÓN.',
    subtitle:
      'Elimina la fricción de cambiar a pestañas del navegador, pegar fragmentos y esperar ventanas pesadas. El pipeline vive en tu fila de inicio.',
    stage1: {
      label: 'ETAPA 01 // INGESTIÓN',
      time: '18ms',
      title: 'Captura Contextual',
      description:
        'Selecciona un diagnóstico del compilador, una regex compleja o un esquema SQL en tu editor. Pulsa el atajo global. OmniCmd aparece sobre tu editor con el buffer precargado.',
      badge: 'Foco nativo sin redistribución en ventanas en mosaico',
    },
    stage2: {
      label: 'ETAPA 02 // DISPARO',
      time: '< 1ms',
      title: 'Ejecución en Un Toque',
      description:
        'Activa directivas con teclas numéricas directas (Alt+1 para mejorar, Alt+2 para traducir, Alt+5 para explicar). O escribe comandos de barra (/corregir, /reescribir) en el buffer del HUD.',
      badge: 'Navegación Vim: Ctrl + j / k',
    },
    stage3: {
      label: 'ETAPA 03 // INYECCIÓN',
      time: 'Directo',
      title: 'Retorno al Buffer',
      description:
        'Los tokens fluyen en tiempo real desde tu Ollama local o modelo en la nube. Pulsa Enter para escribir código/markdown formateado en el portapapeles o Esc para cerrar al instante.',
      badge: 'Retorno instantáneo a la ventana activa del editor',
    },
    matrixTitle: 'MATRIZ DE NAVEGACIÓN EN TECLADO',
    matrixSubtitle: 'Navegación Universal en Fila de Inicio',
    matrixItems: {
      summon: 'Mostrar / Ocultar',
      traverse: 'Navegación Vim',
      action: 'Ejecutar Acción',
      persona: 'Perfil de Persona',
      provider: 'Cambiar Proveedor',
      history: 'Historial de Prompts',
      copy: 'Copiar Buffer',
      dismiss: 'Cerrar Overlay',
    },
  },
  benchmarks: {
    pill: 'PROFILER DE HARDWARE // RUST COMPILADO VS ELECTRON',
    headline: 'DAEMON COMPILADO EN RUST. 24MB DE RAM EN REPOSO.',
    subtitle:
      'Muchas paletas son aplicaciones web pesadas disfrazadas de escritorio, consumiendo cientos de megabytes de RAM. OmniCmd se compila a código máquina nativo con Tauri v2 y duerme a 0.0% de CPU.',
    profilerTitle: 'PROFILER DE TELEMETRÍA DE HARDWARE',
    profilerSub: 'x86_64 Linux // Wayland Nativo',
    ram: {
      title: '01 // CONSUMO DE RAM EN REPOSO',
      diff: '-95% DE CONSUMO',
      omniDesc: 'OmniCmd (Rust + Tauri v2)',
      electronDesc: 'Paleta Estándar en Electron',
    },
    latency: {
      title: '02 // LATENCIA DE DESPERTAR EN FRÍO',
      diff: '52x MÁS RÁPIDO',
      omniDesc: 'OmniCmd (Handle Nativo del SO)',
      electronDesc: 'Captura de Ventana Electron',
    },
    binary: {
      title: '03 // INSTALADOR / TAMAÑO DEL BINARIO',
      tag: 'CERO CHROMIUM INCLUIDO',
      omniTitle: 'BINARIO OMNICMD',
      omniSize: '12.4 MB',
      omniDesc: 'ELF / Mach-O compilado único',
      electronTitle: 'APP ELECTRON',
      electronSize: '185.0 MB',
      electronDesc: 'Chrome integrado + runtime Node',
    },
    pillars: {
      p1: {
        title: 'SQLITE INTEGRADO LOCAL',
        badge: 'LOCAL-FIRST',
        description:
          'Todos los registros de tokens, acciones personalizadas e historial persisten dentro de un almacén SQLite integrado en ~/.omnicmd.db. Almacenado estrictamente en tu disco local, sin telemetría remota ni rastreadores.',
        detail: 'Indexación local completa FTS5 e historial de consultas',
      },
      p2: {
        title: 'NÚCLEO IPC TOKIO ASÍNCRONO',
        badge: '< 0.8ms IPC',
        description:
          'La serialización IPC sub-milisegundo conecta el webview con hilos de trabajo en Rust. Server-Sent Events (SSE) transmiten tokens sin bloquear la fluidez de la interfaz ni la pulsación de teclas.',
        detail: 'Cero contención de hilos en el daemon de atajos',
      },
      p3: {
        title: 'RUNTIME HÍBRIDO LOCAL Y EN LA NUBE',
        badge: 'HÍBRIDO',
        description:
          'Opera 100% offline con endpoints locales de Ollama o llama.cpp (totalmente privado, cero tráfico de red) o conecta directamente a APIs en la nube (9router, OpenAI, Anthropic) con tus propias claves.',
        detail: 'Socket nativo offline de llama.cpp y Ollama',
      },
    },
  },
  commands: {
    pill: 'DIRECTIVAS NATIVAS // CATÁLOGO PRINCIPAL',
    headline: 'Catálogo de Directivas Nativas',
    subtitle:
      'Cada directiva está vinculada a un atajo dedicado (Alt+1 a Alt+8) para formatear el texto seleccionado con prompts de sistema enfocados, coincidiendo con el catálogo nativo de OmniCmd.',
    directivePurpose: 'Propósito y Alcance de la Directiva',
    sampleInput: 'Ejemplo de Buffer de Entrada Seleccionado',
    generatedOutput: 'Salida Generada por la Directiva',
    officialShortcut: 'Atajo Oficial:',
    customizable: 'Personalizable mediante ~/.config/omnicmd/prompts.json',
    count: '8 Directivas Nativas',
    systemTitle: 'CONTROLES DEL SISTEMA Y PROVEEDORES',
    systemSub: 'Ajuste Instantáneo del HUD',
    items: [
      {
        id: 'improve',
        command: '/mejorar',
        name: 'Mejorar Prompt',
        category: 'Ingeniería',
        shortcut: 'Alt+1',
        description:
          'Optimiza prompts preliminares con especificaciones estructuradas, razonamiento analítico y restricciones claras de formato.',
        exampleContext: 'crear una api en rust para gestionar tareas con sqlite',
        outputSummary:
          'Genera una directiva arquitectónica completa con tipado estricto, crates recomendadas (Axum + SQLx) y manejo de errores de producción.',
      },
      {
        id: 'translate',
        command: '/traducir',
        name: 'Traducir Código y Documentación',
        category: 'Idiomas',
        shortcut: 'Alt+2',
        description:
          'Traduce documentación técnica, comentarios o mensajes de error preservando estrictamente la sintaxis del código, identificadores y formato.',
        exampleContext:
          'The borrow checker enforces that references always point to valid data and cannot outlive their owner.',
        outputSummary:
          'El verificador de préstamos garantiza que las referencias siempre apunten a datos válidos sin generar referencias huérfanas.',
      },
      {
        id: 'fix',
        command: '/corregir',
        name: 'Corregir Código y Sintaxis',
        category: 'Refinamiento',
        shortcut: 'Alt+3',
        description:
          'Elimina errores gramaticales, erratas, fallos de redacción e inconsistencias sintácticas en commits, PRs y docs.',
        exampleContext:
          'necesitamos optimizar estas querys porque estan lenta en produccion',
        outputSummary:
          'Necesitamos optimizar estas queries porque están causando alta latencia en producción.',
      },
      {
        id: 'summarize',
        command: '/resumir',
        name: 'Resumir Contenido',
        category: 'Síntesis',
        shortcut: 'Alt+4',
        description:
          'Condensa registros de CI/CD, diagnósticos de compilador, git diffs o debates en puntos clave priorizados y procesables.',
        exampleContext:
          'Salida extensa del pipeline de CI/CD con 120 líneas de advertencias y fallos de enlace estático',
        outputSummary:
          '1. Faltan encabezados dev de OpenSSL. 2. Target musl requiere flag static. 3. Script de build corregido incluido.',
      },
      {
        id: 'explain',
        command: '/explicar',
        name: 'Explicar Concepto y Código',
        category: 'Análisis',
        shortcut: 'Alt+5',
        description:
          'Descompone algoritmos complejos, invariantes de lifetime en Rust, patrones de concurrencia o bloques confusos en pasos pedagógicos claros.',
        exampleContext:
          "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { if x.len() > y.len() { x } else { y } }",
        outputSummary:
          "Desglose detallado del lifetime 'a: la referencia devuelta solo es válida mientras ambos parámetros sigan en el mismo alcance.",
      },
      {
        id: 'rewrite',
        command: '/reescribir',
        name: 'Reescribir y Ajustar Tono',
        category: 'Estilo',
        shortcut: 'Alt+6',
        description:
          'Reformula textos técnicos, borradores de RFC o comunicados para el equipo en un tono nítido, conciso y profesional.',
        exampleContext:
          'creo que este endpoint es medio raro y deberiamos cambiarlo antes que falle',
        outputSummary:
          'Recomendamos refactorizar la firma de este endpoint para mantener la idempotencia REST y asegurar previsibilidad en producción.',
      },
      {
        id: 'prompt',
        command: '/prompt',
        name: 'Generar Prompt para Agentes',
        category: 'Estructuración',
        shortcut: 'Alt+7',
        description:
          'Convierte notas desestructuradas, historias de usuario o reportes de bugs en instrucciones rigurosas para agentes de programación.',
        exampleContext:
          'necesito un microservicio en golang para procesar webhooks con deduplicación en redis',
        outputSummary:
          'Prompt estructurado con arquitectura hexagonal, claves de idempotencia en Redis y suite de pruebas de integración automatizadas.',
      },
      {
        id: 'custom',
        command: '/libre',
        name: 'Consulta Libre',
        category: 'Ad-hoc',
        shortcut: 'Alt+8',
        description:
          'Canal abierto para cualquier consulta, derivación lógica o instrucción personalizada con streaming SSE en tiempo real.',
        exampleContext:
          'Escribe una macro declarativa en Rust que implemente el trait FromStr para un enum arbitrario',
        outputSummary:
          'Expansión de macro lista para compilar sin preámbulos conversacionales ni rodeos innecesarios.',
      },
    ],
    systemItems: [
      {
        handle: '9router',
        name: 'Proveedor Activo',
        shortcut: '/provider',
        specialty: 'ag/gemini-3.8-flash-low con respaldo a Claude 3.5 Sonnet y GPT-4o.',
        detail: 'Latencia de primer token por debajo de 1s mediante streaming nativo SSE.',
      },
      {
        handle: 'Ollama Local',
        name: 'Ejecución Offline',
        shortcut: '/provider',
        specialty: 'Modelos locales (Qwen 2.5 Coder, Llama 3.3) alojados en localhost:11434.',
        detail: '100% privado, cero peticiones fuera de tu máquina.',
      },
      {
        handle: '/history',
        name: 'Registro SQLite',
        shortcut: 'Ctrl+H',
        specialty: 'Búsqueda instantánea FTS5 sobre prompts anteriores y respuestas generadas.',
        detail: 'Almacenado localmente en ~/.omnicmd.db.',
      },
      {
        handle: '/settings',
        name: 'Configuración',
        shortcut: 'Ctrl+,',
        specialty: 'Personaliza atajos globales, opacidad del HUD y credenciales de API.',
        detail: 'Validado estrictamente con JSON Schema.',
      },
    ],
  },
  downloads: {
    pill: 'DISTRIBUCIÓN // ARTEFACTOS NATIVOS',
    headline: 'Binarios Nativos. Código Máquina Compilado.',
    subtitle:
      'Paquetes binarios precompilados y verificados criptográficamente para Linux, macOS y Windows. Menos de 15MB, con licencia MIT.',
    tabs: {
      linux: 'Linux (Arch / Hyprland / .deb)',
      mac: 'macOS (Universal)',
      windows: 'Windows (x64)',
      source: 'Compilar desde Código',
      detected: 'DETECTADO',
    },
    linux: {
      title: 'Integración con Arch Linux y Hyprland Wayland',
      desc: 'Incluye compatibilidad nativa con el portapapeles Wayland (wl-clipboard) y reglas flotantes dedicadas para Hyprland.',
      btnDeb: 'DESCARGAR .DEB (DEBIAN / UBUNTU)',
      btnAppImage: 'UNIVERSAL .APPIMAGE',
      quickInstall: 'Instalación Rápida en 1 Línea (Sin Git Clone)',
      hyprlandTitle: 'Reglas Nativas de Ventana Hyprland (~/.config/hypr/omnicmd.conf)',
    },
    mac: {
      title: 'Paquete de Aplicación Universal macOS',
      desc: 'Binario nativo para Apple Silicon (M1/M2/M3/M4) e Intel x86_64. Firmado y notarizado para macOS 11+.',
      btnDmg: 'DESCARGAR .DMG UNIVERSAL',
      permTitle: 'PERMISOS DE ACCESIBILIDAD',
      permDesc:
        'OmniCmd requiere permisos de Accesibilidad en macOS para registrar el atajo global Cmd+Espacio y leer las selecciones activas sin robar el foco de ventana.',
      localTitle: 'ALMACENAMIENTO SOLO LOCAL',
      localDesc:
        'Cero telemetría en la nube. Todo el historial de prompts, acciones personalizadas y configuración permanece estrictamente en tu disco local.',
    },
    windows: {
      title: 'Distribución Nativa Windows x64',
      desc: 'Instalador ligero o ejecutable portable independiente que utiliza el runtime WebView2 del sistema.',
      btnMsi: 'DESCARGAR INSTALADOR (.MSI)',
      btnZip: 'PORTABLE (.ZIP)',
      trayTitle: 'DAEMON EN BANDEJA DEL SISTEMA WINDOWS',
      trayDesc:
        'OmniCmd permanece en la bandeja de notificación de Windows. Invócalo con Win + Espacio sobre Visual Studio, VS Code o Windows Terminal.',
    },
    source: {
      title: 'Compila Directamente con Cargo y Tauri CLI',
      desc: 'Requiere Rust 1.77+, Node.js (ou pnpm) y paquetes de desarrollo estándar del SO (libwebkit2gtk en Linux).',
      pipeline: 'Pipeline de Compilación en Terminal',
    },
    checksum: 'Todos los artefactos binarios firmados con hashes SHA-256',
    viewAll: 'VER TODOS LOS ARTEFACTOS EN GITHUB RELEASES',
  },
  devlogs: {
    pill: 'REGISTRO DE VERSIONES // BUILDS AUDITADOS',
    headline: 'REGISTRO DE VERSIONES AUDITADO.',
    subtitle:
      'Compilado desde el código fuente y firmado criptográficamente mediante pipelines automatizadas de GitHub Actions CI/CD.',
    allReleases: 'TODAS LAS VERSIONES Y HASHES',
    verified: 'VERIFICADO SHA-256',
    changes: [
      {
        title: 'Multiplataforma y Atajos Globales',
        desc: 'Atajos nativos sin conflicto de SO: Alt+Space en Windows, Option+Space en macOS e IPC Unix en Linux Hyprland con foco instantáneo.',
      },
      {
        title: 'Descargas Resilientes e i18n',
        desc: 'Resolución dinámica de versiones vía GitHub API con respaldos deterministas y soporte trilingüe nativo (ES, EN, PT).',
      },
      {
        title: 'Portapapeles Nativo y Actualizador',
        desc: 'Integración de ultrabaja latencia con wl-copy/xclip, desinstalador automatizado y verificador autónomo de actualizaciones.',
      },
    ],
    license: 'Lanzamiento de código abierto bajo licencia MIT',
    viewCommits: 'VER COMMITS Y SHAS →',
  },
  donations: {
    pill: 'APOYA EL PROYECTO // CÓDIGO ABIERTO INDEPENDIENTE',
    headline: '¿Te gusta OmniCmd?\nApoya el Desarrollo Continuo.',
    subtitle:
      'OmniCmd es un proyecto libre, gratuito y mantenido de forma independiente. Si te ahorra tiempo y acelera tu productividad diaria en el teclado, ¡considera apoyar su evolución continua mediante Pix!',
    qrTitle: 'Código QR Pix',
    qrScanText: 'Escanea el código QR desde la app de tu banco',
    pixBadge: 'PIX INSTANTÁNEO',
    pixKeyLabel: 'Clave Pix (Aleatoria)',
    copyKeyBtn: 'Copiar Clave Pix',
    keyCopied: '¡Clave Copiada!',
    features: [
      {
        title: 'Desarrollo 100% Independiente',
        desc: 'Tu aporte financia directamente nuevas integraciones de LLMs, optimizaciones del núcleo en Rust y versiones continuas.',
      },
      {
        title: 'Cero Telemetría y Sin Publicidad',
        desc: 'OmniCmd siempre se mantendrá libre de rastreadores invasivos, telemetría o barreras de pago.',
      },
      {
        title: 'Multiplataforma de Alto Rendimiento',
        desc: 'Soporte dedicado para Linux (Wayland/X11), Windows 10/11 y macOS (Apple Silicon e Intel).',
      },
    ],
  },
  cta: {
    badge: 'Local-First & Libre de Telemetría',
    headline: 'Deja de Cambiar de Ventana.\nRecupera Tus Teclas.',
    subtitle:
      'Binario de menos de 15MB. 24MB de consumo de RAM en reposo. Código abierto con licencia MIT. Funciona 100% offline con Ollama o se conecta directo a APIs de LLMs en la nube.',
    downloadFor: 'Descargar para',
    githubRepo: 'Repositorio en GitHub',
  },
  footer: {
    links: {
      cockpit: 'Cockpit',
      features: 'Características',
      cadence: 'Flujo',
      architecture: 'Arquitectura',
      commands: 'Comandos',
      support: 'Apoyar',
      github: 'GitHub',
      releases: 'Releases',
      mit: 'MIT',
      top: 'Inicio',
    },
  },
  langSelector: {
    selectLanguage: 'Idioma',
    autoDetected: 'Detectado automáticamente',
  },
};
