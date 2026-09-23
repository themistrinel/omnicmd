import { Language } from '@/types';

export interface TranslationDictionary {
  // Common & Navigation
  searchPlaceholder: string;
  voiceInputTitle: string;
  closeEsc: string;
  backEsc: string;
  updateAvailable: string;
  updateNow: string;
  hideAlert: string;

  // Clipboard & Action List
  inputDetected: string;
  imageDetectedTitle: string;
  imageDetectedSubtitle: string;
  imageReadyBadge: string;
  noResultsTitle: string;
  noResultsSubtitle: string;
  executeHint: string;
  autocompleteHint: string;

  // Status Bar
  actions: string;
  agents: string;
  clipboard: string;
  history: string;
  settings: string;
  cheatsheet: string;
  languageSelect: string;

  // Input View
  inputTitle: string;
  executeCtrlEnter: string;
  pasteClipboard: string;
  inputPlaceholder: string;
  processing: string;

  // Result View
  copyAndClose: string;
  copy: string;
  copied: string;
  regenerate: string;
  edit: string;
  more: string;
  copyMarkdown: string;
  copyInput: string;
  chainNewPrompt: string;
  doneBtn: string;
  charactersCount: string;
  pressCtrlEnterToSend: string;
  executingState: string;
  noImageInClipboard: string;
  tryAgain: string;
  adjustSettings: string;
  executionFailed: string;
  noResult: string;
  imageAnalyzed: string;
  fromClipboard: string;

  // History View
  historyTitle: string;
  historySearchPlaceholder: string;
  historyEmpty: string;
  clearAll: string;
  confirmClearHistory: string;
  reuse: string;
  delete: string;
  selectItemToView: string;
  inputLabel: string;
  outputLabel: string;

  // Settings View
  settingsTitle: string;
  settingsSaveSuccess: string;
  tabGeneral: string;
  tabAppearance: string;
  tabProviders: string;
  tabAgents: string;
  tabActions: string;
  
  // Settings Sections
  languageLabel: string;
  languageDesc: string;
  themeModeLabel: string;
  themeDark: string;
  themeDarkDesc: string;
  themeLight: string;
  themeLightDesc: string;
  themeSystem: string;
  themeSystemDesc: string;
  fontLabel: string;
  accentColorLabel: string;
  hudOpacityLabel: string;
  hudBlurLabel: string;
  nativeBordersLabel: string;
  nativeBordersDesc: string;

  // Cheatsheet
  cheatsheetTitle: string;
  cheatsheetSubtitle: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  'pt-BR': {
    searchPlaceholder: 'Digite / para ações, @ para agentes, ou texto livre...',
    voiceInputTitle: 'Entrada por Voz',
    closeEsc: 'Fechar (Esc)',
    backEsc: 'Voltar (Esc)',
    updateAvailable: 'Nova versão disponível!',
    updateNow: 'Atualizar Agora',
    hideAlert: 'Ocultar aviso',

    inputDetected: 'Entrada detectada:',
    imageDetectedTitle: 'Imagem detectada na área de transferência',
    imageDetectedSubtitle: 'Pronta para /analisar ou /analisar-ui (Pressione Alt+9 ou Alt+0)',
    imageReadyBadge: 'Print pronto',
    noResultsTitle: 'Nenhum comando ou agente encontrado.',
    noResultsSubtitle: 'Digite / para ações ou @ para agentes',
    executeHint: 'Enter para executar',
    autocompleteHint: 'Tab para autocompletar',

    actions: 'Ações',
    agents: 'Agentes',
    clipboard: 'Área de transferência',
    history: 'Histórico',
    settings: 'Configurações',
    cheatsheet: 'Atalhos',
    languageSelect: 'Idioma',

    inputTitle: 'Diretiva Manual',
    executeCtrlEnter: 'Executar (Ctrl+Enter)',
    pasteClipboard: 'Colar Clipboard',
    inputPlaceholder: 'Digite ou edite o texto a ser transformado...',
    processing: 'Processando resposta com {model}...',

    copyAndClose: 'Copiar & Fechar',
    copy: 'Copiar',
    copied: 'Copiado!',
    regenerate: 'Regenerar',
    edit: 'Editar',
    more: 'Mais',
    copyMarkdown: 'Copiar como Markdown',
    copyInput: 'Copiar Prompt de Entrada',
    chainNewPrompt: 'Encadear como Novo Prompt',
    doneBtn: 'Concluir',
    charactersCount: 'caracteres',
    pressCtrlEnterToSend: 'para enviar',
    executingState: 'Executando...',
    noImageInClipboard: 'Nenhuma imagem detectada na área de transferência. Tire um print ou copie uma imagem para usar ações de visão (/analisar, /analisar-ui).',
    tryAgain: 'Tentar Novamente (Ctrl+R)',
    adjustSettings: 'Ajustar Configurações (Ctrl+,)',
    executionFailed: 'Falha na execução com {model}',
    noResult: 'Nenhum resultado gerado.',
    imageAnalyzed: 'Imagem Analisada',
    fromClipboard: 'Capturada da área de transferência',

    historyTitle: 'Histórico de Execuções',
    historySearchPlaceholder: 'Pesquisar por prompt, ação ou resposta no histórico...',
    historyEmpty: 'Nenhum registro encontrado.',
    clearAll: 'Limpar Tudo',
    confirmClearHistory: 'Tem certeza que deseja limpar todo o histórico?',
    reuse: 'Reutilizar',
    delete: 'Excluir',
    selectItemToView: 'Selecione um item para ver os detalhes',
    inputLabel: 'Entrada',
    outputLabel: 'Saída',

    settingsTitle: 'Configurações',
    settingsSaveSuccess: 'Configurações salvas com sucesso!',
    tabGeneral: 'Geral',
    tabAppearance: 'Aparência',
    tabProviders: 'Provedores',
    tabAgents: 'Agentes',
    tabActions: 'Ações',

    languageLabel: 'Idioma da Interface',
    languageDesc: 'Altere o idioma de exibição do aplicativo instantaneamente',
    themeModeLabel: 'Modo de Cor',
    themeDark: 'Escuro',
    themeDarkDesc: 'Preto puro & sombras profundas',
    themeLight: 'Claro',
    themeLightDesc: 'Contraste diurno alto e limpo',
    themeSystem: 'Sistema',
    themeSystemDesc: 'Sincroniza com o SO',
    fontLabel: 'Família Tipográfica',
    accentColorLabel: 'Cor de Destaque',
    hudOpacityLabel: 'Opacidade do Painel',
    hudBlurLabel: 'Desfoque de Fundo (Blur)',
    nativeBordersLabel: 'Modo Nativo (Hyprland / Compositor)',
    nativeBordersDesc: 'Delega bordas ativas e cantos arredondados para o seu compositor Wayland',

    cheatsheetTitle: 'Guia de Atalhos Rápidos',
    cheatsheetSubtitle: 'Navegue e execute sem tirar as mãos do teclado',
  },

  'en-US': {
    searchPlaceholder: 'Type / for actions, @ for agents, or free text...',
    voiceInputTitle: 'Voice Input',
    closeEsc: 'Close (Esc)',
    backEsc: 'Back (Esc)',
    updateAvailable: 'New version available!',
    updateNow: 'Update Now',
    hideAlert: 'Dismiss banner',

    inputDetected: 'Input detected:',
    imageDetectedTitle: 'Image detected in clipboard',
    imageDetectedSubtitle: 'Ready for /analyze or /analyze-ui (Press Alt+9 or Alt+0)',
    imageReadyBadge: 'Screenshot ready',
    noResultsTitle: 'No commands or agents found.',
    noResultsSubtitle: 'Type / for actions or @ for agents',
    executeHint: 'Enter to execute',
    autocompleteHint: 'Tab to autocomplete',

    actions: 'Actions',
    agents: 'Agents',
    clipboard: 'Clipboard',
    history: 'History',
    settings: 'Settings',
    cheatsheet: 'Shortcuts',
    languageSelect: 'Language',

    inputTitle: 'Manual Directive',
    executeCtrlEnter: 'Execute (Ctrl+Enter)',
    pasteClipboard: 'Paste Clipboard',
    inputPlaceholder: 'Type or edit the text to be transformed...',
    processing: 'Processing response with {model}...',

    copyAndClose: 'Copy & Close',
    copy: 'Copy',
    copied: 'Copied!',
    regenerate: 'Regenerate',
    edit: 'Edit',
    more: 'More',
    copyMarkdown: 'Copy as Markdown',
    copyInput: 'Copy Input Prompt',
    chainNewPrompt: 'Chain as New Prompt',
    doneBtn: 'Done',
    charactersCount: 'characters',
    pressCtrlEnterToSend: 'to send',
    executingState: 'Executing...',
    noImageInClipboard: 'No image detected in clipboard. Take a screenshot or copy an image to use vision actions (/analyze, /analyze-ui).',
    tryAgain: 'Try Again (Ctrl+R)',
    adjustSettings: 'Adjust Settings (Ctrl+,)',
    executionFailed: 'Execution failed with {model}',
    noResult: 'No result generated.',
    imageAnalyzed: 'Analyzed Image',
    fromClipboard: 'Captured from active clipboard',

    historyTitle: 'Execution History',
    historySearchPlaceholder: 'Search by prompt, action, or output in history...',
    historyEmpty: 'No records found.',
    clearAll: 'Clear All',
    confirmClearHistory: 'Are you sure you want to clear the entire history?',
    reuse: 'Reuse',
    delete: 'Delete',
    selectItemToView: 'Select an item to view details',
    inputLabel: 'Input',
    outputLabel: 'Output',

    settingsTitle: 'Settings',
    settingsSaveSuccess: 'Settings saved successfully!',
    tabGeneral: 'General',
    tabAppearance: 'Appearance',
    tabProviders: 'Providers',
    tabAgents: 'Agents',
    tabActions: 'Actions',

    languageLabel: 'Interface Language',
    languageDesc: 'Instantly change the display language across the entire application',
    themeModeLabel: 'Color Theme',
    themeDark: 'Dark',
    themeDarkDesc: 'Pure black & deep shadows',
    themeLight: 'Light',
    themeLightDesc: 'Clean high-contrast daytime UI',
    themeSystem: 'System',
    themeSystemDesc: 'Syncs with your OS',
    fontLabel: 'Typography Font',
    accentColorLabel: 'Accent Color',
    hudOpacityLabel: 'Panel Opacity',
    hudBlurLabel: 'Background Blur',
    nativeBordersLabel: 'Native Mode (Hyprland / Compositor)',
    nativeBordersDesc: 'Delegates active borders and rounded corners to your Wayland compositor',

    cheatsheetTitle: 'Quick Keyboard Cheatsheet',
    cheatsheetSubtitle: 'Navigate and execute without leaving the home row',
  },

  'es-ES': {
    searchPlaceholder: 'Escribe / para acciones, @ para agentes, o texto libre...',
    voiceInputTitle: 'Entrada por Voz',
    closeEsc: 'Cerrar (Esc)',
    backEsc: 'Volver (Esc)',
    updateAvailable: '¡Nueva versión disponible!',
    updateNow: 'Actualizar Ahora',
    hideAlert: 'Ocultar aviso',

    inputDetected: 'Entrada detectada:',
    imageDetectedTitle: 'Imagen detectada en el portapapeles',
    imageDetectedSubtitle: 'Lista para /analizar o /analizar-ui (Pulsa Alt+9 o Alt+0)',
    imageReadyBadge: 'Captura lista',
    noResultsTitle: 'No se encontraron comandos ni agentes.',
    noResultsSubtitle: 'Escribe / para acciones o @ para agentes',
    executeHint: 'Enter para ejecutar',
    autocompleteHint: 'Tab para autocompletar',

    actions: 'Acciones',
    agents: 'Agentes',
    clipboard: 'Portapapeles',
    history: 'Historial',
    settings: 'Ajustes',
    cheatsheet: 'Atajos',
    languageSelect: 'Idioma',

    inputTitle: 'Directiva Manual',
    executeCtrlEnter: 'Ejecutar (Ctrl+Enter)',
    pasteClipboard: 'Pegar Portapapeles',
    inputPlaceholder: 'Escribe o edita el texto a transformar...',
    processing: 'Procesando respuesta con {model}...',

    copyAndClose: 'Copiar y Cerrar',
    copy: 'Copiar',
    copied: '¡Copiado!',
    regenerate: 'Regenerar',
    edit: 'Editar',
    more: 'Más',
    copyMarkdown: 'Copiar como Markdown',
    copyInput: 'Copiar Prompt de Entrada',
    chainNewPrompt: 'Encadenar como Nuevo Prompt',
    doneBtn: 'Concluir',
    charactersCount: 'caracteres',
    pressCtrlEnterToSend: 'para enviar',
    executingState: 'Ejecutando...',
    noImageInClipboard: 'No se detectó ninguna imagen en el portapapeles. Haz una captura o copia una imagen para usar acciones de visión (/analizar, /analisar-ui).',
    tryAgain: 'Reintentar (Ctrl+R)',
    adjustSettings: 'Ajustar Configuración (Ctrl+,)',
    executionFailed: 'Error en la ejecución con {model}',
    noResult: 'No se generó ningún resultado.',
    imageAnalyzed: 'Imagen Analizada',
    fromClipboard: 'Capturada del portapapeles activo',

    historyTitle: 'Historial de Ejecuciones',
    historySearchPlaceholder: 'Buscar por prompt, acción o salida en el historial...',
    historyEmpty: 'No se encontraron registros.',
    clearAll: 'Borrar Todo',
    confirmClearHistory: '¿Seguro que deseas borrar todo el historial?',
    reuse: 'Reutilizar',
    delete: 'Eliminar',
    selectItemToView: 'Selecciona un elemento para ver los detalles',
    inputLabel: 'Entrada',
    outputLabel: 'Salida',

    settingsTitle: 'Ajustes',
    settingsSaveSuccess: '¡Ajustes guardados correctamente!',
    tabGeneral: 'General',
    tabAppearance: 'Apariencia',
    tabProviders: 'Proveedores',
    tabAgents: 'Agentes',
    tabActions: 'Acciones',

    languageLabel: 'Idioma de la Interfaz',
    languageDesc: 'Cambia el idioma de la aplicación instantáneamente',
    themeModeLabel: 'Modo de Color',
    themeDark: 'Oscuro',
    themeDarkDesc: 'Negro puro y sombras profundas',
    themeLight: 'Claro',
    themeLightDesc: 'Alto contraste diurno y limpio',
    themeSystem: 'Sistema',
    themeSystemDesc: 'Sincroniza con el SO',
    fontLabel: 'Tipografía',
    accentColorLabel: 'Color de Acento',
    hudOpacityLabel: 'Opacidad del Panel',
    hudBlurLabel: 'Desenfoque (Blur)',
    nativeBordersLabel: 'Modo Nativo (Hyprland / Compositor)',
    nativeBordersDesc: 'Delega bordes activos y esquinas redondeadas al compositor Wayland',

    cheatsheetTitle: 'Guía Rápida de Atajos',
    cheatsheetSubtitle: 'Navega y ejecuta sin soltar el teclado',
  },
};

export const SUPPORTED_LANGUAGES: Array<{
  id: Language;
  name: string;
  flag: string;
  nativeName: string;
}> = [
  { id: 'pt-BR', name: 'Português', flag: '🇧🇷', nativeName: 'Português (Brasil)' },
  { id: 'en-US', name: 'English', flag: '🇺🇸', nativeName: 'English (US)' },
  { id: 'es-ES', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
];

export function getTranslation(lang?: Language): TranslationDictionary {
  return TRANSLATIONS[lang || 'pt-BR'] || TRANSLATIONS['pt-BR'];
}
