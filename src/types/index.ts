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
  shortcutHint?: string;
  command?: string;
  aliases?: string[];
  isVisionAction?: boolean;
}

export interface Profile {
  id: string;
  name: string;
  description: string;
  icon: string;
  systemInstruction: string;
  preferredModel?: string;
}

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
export type FontFamily = 'system' | 'sans' | 'mono';
export type AccentColor = 'indigo' | 'emerald' | 'violet' | 'amber' | 'cyan' | 'rose' | 'zinc';

export interface AppearanceSettings {
  themeMode: ThemeMode;
  hudOpacity: number; // 50 - 100
  hudBlur: number; // 0 - 32 (px)
  fontFamily: FontFamily;
  accentColor: AccentColor;
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
}
