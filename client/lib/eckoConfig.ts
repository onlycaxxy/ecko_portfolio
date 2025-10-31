/**
 * API Configuration
 * Centralized configuration for all AI API providers
 * Copied from Ecko prototype - maintains full abstraction
 */

export type AIProvider = 'deepseek' | 'openai' | 'anthropic';

export interface APIConfig {
  provider: AIProvider;
  apiKey: string;
  endpoint: string;
  model: string;
  usageLimit: number;
  tokenWarningThreshold: number;
}

/**
 * Get API configuration based on environment variables
 */
export function getAPIConfig(): APIConfig {
  const provider = (import.meta.env.VITE_AI_PROVIDER || 'deepseek') as AIProvider;

  const configs: Record<AIProvider, APIConfig> = {
    deepseek: {
      provider: 'deepseek',
      apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
      endpoint: import.meta.env.VITE_DEEPSEEK_ENDPOINT || 'https://api.deepseek.com/v1/chat/completions',
      model: import.meta.env.VITE_DEEPSEEK_MODEL || 'deepseek-chat',
      usageLimit: parseInt(import.meta.env.VITE_USAGE_LIMIT || '100', 10),
      tokenWarningThreshold: parseInt(import.meta.env.VITE_TOKEN_WARNING_THRESHOLD || '2000', 10),
    },
    openai: {
      provider: 'openai',
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
      endpoint: import.meta.env.VITE_OPENAI_ENDPOINT || 'https://api.openai.com/v1/chat/completions',
      model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
      usageLimit: parseInt(import.meta.env.VITE_USAGE_LIMIT || '100', 10),
      tokenWarningThreshold: parseInt(import.meta.env.VITE_TOKEN_WARNING_THRESHOLD || '2000', 10),
    },
    anthropic: {
      provider: 'anthropic',
      apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
      endpoint: import.meta.env.VITE_ANTHROPIC_ENDPOINT || 'https://api.anthropic.com/v1/messages',
      model: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-3-opus-20240229',
      usageLimit: parseInt(import.meta.env.VITE_USAGE_LIMIT || '100', 10),
      tokenWarningThreshold: parseInt(import.meta.env.VITE_TOKEN_WARNING_THRESHOLD || '2000', 10),
    },
  };

  const config = configs[provider];

  if (!config.apiKey) {
    console.warn(`⚠️ API key not found for provider: ${provider}`);
  }

  return config;
}

/**
 * Export singleton instance
 */
export const API_CONFIG = getAPIConfig();
