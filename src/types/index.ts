export interface ChatContentPartText {
  type: 'text';
  text: string;
}

export interface ChatContentPartImage {
  type: 'image_url';
  image_url: {
    url: string; // base64 data url or https url
    detail?: 'auto' | 'low' | 'high';
  };
}

export type ChatMessageContent = string | Array<ChatContentPartText | ChatContentPartImage>;

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: ChatMessageContent;
}

export interface AIRequestOptions {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  text: string;
  model: string;
  usageTokens?: number;
}

export interface AIProvider {
  readonly id: string;
  readonly name: string;
  generateCompletion(options: AIRequestOptions): Promise<AIResponse>;
}

export interface SpeechProvider {
  readonly id: string;
  readonly name: string;
  isSupported(): boolean;
  startListening(onInterimTranscription?: (text: string) => void): Promise<void>;
  stopListening(): Promise<string>;
}

export interface PromptAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  systemPrompt: string;
  userPromptTemplate?: (input: string) => string;
  userPromptTemplateString?: string; // template format with {input}, e.g. "Traduza:\n\n{input}"
  shortcutHint?: string;
  command?: string;
  aliases?: string[];
  isVisionAction?: boolean;
  isCustom?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  handle: string; // e.g. '@dev'
  aliases: string[]; // e.g. ['@code', '@coding']
  description: string;
  icon: string;
  systemInstruction: string;
  preferredModel?: string;
  isCustom?: boolean;
}

// Retrocompatibility alias for Profile
export type Profile = Agent;

export type ExecutionTargetType = 'action' | 'agent' | 'general';

export interface HistoryEntry {
  id?: number;
  action_id: string;
  action_title: string;
  model: string;
  profile_id: string;
  input_text: string;
  output_text: string;
  created_at?: string;
}

export type KeyboardNavigationMode = 'hybrid' | 'vim' | 'standard';

export type ThemeMode = 'dark' | 'light' | 'system';
export type FontFamily = 'ibm_plex' | 'mono' | 'sans' | 'system';
export type AccentColor = 'sky' | 'cyan' | 'amber' | 'emerald' | 'indigo' | 'violet' | 'rose' | 'zinc';

export interface AppearanceSettings {
  themeMode: ThemeMode;
  hudOpacity: number; // 50 - 100
  hudBlur: number; // 0 - 32 (px)
  fontFamily: FontFamily;
  accentColor: AccentColor;
  nativeBorders?: boolean; // Delega bordas, rounding e sombras ao Hyprland/Compositor
}

export type AIProviderId = '9router' | 'omni' | 'custom';

export interface ProviderConnectionConfig {
  endpoint: string;
  apiKey: string;
  model: string;
}

export interface AppSettings {
  activeProviderId: AIProviderId;
  endpoint: string;
  apiKey: string;
  model: string;
  providers: {
    '9router': ProviderConnectionConfig;
    omni: ProviderConnectionConfig;
    custom: ProviderConnectionConfig;
  };
  defaultProfile: string;
  globalShortcut: string;
  autoReadClipboard: boolean;
  temperature: number;
  keyboardNavMode: KeyboardNavigationMode;
  enableVimMnemonicShortcuts: boolean;
  appearance?: AppearanceSettings;
  customVisionPrompt?: string;
  customUiPrompt?: string;
  agents?: Agent[];
  actions?: PromptAction[];
}
