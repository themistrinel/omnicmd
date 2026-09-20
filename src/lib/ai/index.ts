import { AIProvider } from '@/types';
import {
  NineRouterProvider,
  OmniRouterProvider,
  CustomOpenAIProvider,
  GenericOpenAICompatibleProvider,
} from './nine-router';

class AIProviderRegistry {
  private providers: Map<string, AIProvider> = new Map();
  private activeProviderId: string = '9router';

  constructor() {
    this.registerProvider(new NineRouterProvider());
    this.registerProvider(new OmniRouterProvider());
    this.registerProvider(new CustomOpenAIProvider());
  }

  registerProvider(provider: AIProvider) {
    this.providers.set(provider.id, provider);
  }

  getProvider(id?: string): AIProvider {
    const targetId = id || this.activeProviderId;
    const provider = this.providers.get(targetId);
    if (!provider) {
      throw new Error(`AI Provider "${targetId}" is not registered.`);
    }
    return provider;
  }

  setActiveProvider(id: string) {
    if (!this.providers.has(id)) {
      throw new Error(`Cannot set active provider to "${id}": not registered.`);
    }
    this.activeProviderId = id;
  }

  getActiveProviderId(): string {
    return this.activeProviderId;
  }

  listProviders(): Array<{ id: string; name: string }> {
    return Array.from(this.providers.values()).map((p) => ({
      id: p.id,
      name: p.name,
    }));
  }
}

export const aiRegistry = new AIProviderRegistry();
export {
  NineRouterProvider,
  OmniRouterProvider,
  CustomOpenAIProvider,
  GenericOpenAICompatibleProvider,
};
