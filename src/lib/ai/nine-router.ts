import { invoke } from '@tauri-apps/api/core';
import { AIProvider, AIRequestOptions, AIResponse } from '@/types';

function isTauriEnvironment(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

interface NativeAiPayload {
  endpoint: string;
  api_key: string;
  model: string;
  messages: Array<{ role: string; content: any }>;
  temperature?: number;
  max_tokens?: number;
}

export class GenericOpenAICompatibleProvider implements AIProvider {
  readonly id: string;
  readonly name: string;

  protected endpoint: string;
  protected apiKey: string;
  protected defaultModel: string;

  constructor(
    id: string,
    name: string,
    endpoint: string = 'http://localhost:20128/v1',
    apiKey: string = '',
    defaultModel: string = 'antigravity'
  ) {
    this.id = id;
    this.name = name;
    this.endpoint = endpoint || 'http://localhost:20128/v1';
    this.apiKey = apiKey;
    this.defaultModel = defaultModel || 'antigravity';
  }

  setCredentials(endpoint: string, apiKey: string, defaultModel?: string) {
    this.endpoint = endpoint || this.endpoint;
    this.apiKey = apiKey;
    if (defaultModel) {
      this.defaultModel = defaultModel;
    }
  }

  async generateCompletion(options: AIRequestOptions): Promise<AIResponse> {
    const modelToUse = options.model || this.defaultModel;

    // First try the native Rust backend command to avoid CORS and sandbox limitations on Linux
    if (isTauriEnvironment()) {
      try {
        const payload: NativeAiPayload = {
          endpoint: this.endpoint,
          api_key: this.apiKey,
          model: modelToUse,
          messages: options.messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 2048,
        };

        const res = await invoke<{ text: string; model: string; usage_tokens?: number }>(
          'execute_ai_request',
          { payload }
        );

        return {
          text: res.text,
          model: res.model,
          usageTokens: res.usage_tokens,
        };
      } catch (err: any) {
        throw new Error(err.toString());
      }
    }

    // Browser Fetch Fallback
    let url = this.endpoint.trim();
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    if (!url.endsWith('/chat/completions')) {
      url = `${url}/chat/completions`;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: modelToUse,
        messages: options.messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 2048,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI Request failed (HTTP ${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    return {
      text,
      model: data.model || modelToUse,
      usageTokens: data.usage?.total_tokens,
    };
  }
}

export class NineRouterProvider extends GenericOpenAICompatibleProvider {
  constructor(
    endpoint: string = 'http://localhost:20128/v1',
    apiKey: string = '',
    defaultModel: string = 'ag/gemini-3.8-flash-low'
  ) {
    super('9router', '9router (OpenAI Compatible)', endpoint, apiKey, defaultModel);
  }
}

export class OmniRouterProvider extends GenericOpenAICompatibleProvider {
  constructor(
    endpoint: string = 'http://localhost:8000/v1',
    apiKey: string = '',
    defaultModel: string = 'llama-3.3-70b'
  ) {
    super('omni', 'Omni Router (Local / Gateway)', endpoint, apiKey, defaultModel);
  }
}

export class CustomOpenAIProvider extends GenericOpenAICompatibleProvider {
  constructor(
    endpoint: string = 'https://api.openai.com/v1',
    apiKey: string = '',
    defaultModel: string = 'gpt-4o-mini'
  ) {
    super('custom', 'Custom OpenAI / Proxy', endpoint, apiKey, defaultModel);
  }
}
