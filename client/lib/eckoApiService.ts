/**
 * Unified API Service
 * Handles API requests to different AI providers with a unified interface
 * Copied from Ecko prototype - maintains full abstraction
 */

import { API_CONFIG, type AIProvider } from './eckoConfig';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  model?: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface APIError {
  message: string;
  status?: number;
  provider?: AIProvider;
}

/**
 * Call AI API with unified interface
 * @param messages - Array of messages to send to the API
 * @param options - Optional configuration overrides
 * @returns Promise with AI response
 */
export async function callAIAPI(
  messages: AIMessage[],
  options: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
  } = {}
): Promise<AIResponse> {
  const config = API_CONFIG;
  const { provider, apiKey, endpoint, model } = config;

  // Log configuration for debugging
  console.log(`📡 API Call - Provider: ${provider}, Model: ${model || 'NOT SET'}, Endpoint: ${endpoint}`);

  if (!apiKey) {
    throw new Error(`API key not configured for provider: ${provider}`);
  }

  if (!model && !options.model) {
    throw new Error(`Model not configured for provider: ${provider}. Check your .env file.`);
  }

  try {
    switch (provider) {
      case 'deepseek':
      case 'openai':
        return await callOpenAICompatibleAPI(
          endpoint,
          apiKey,
          messages,
          options.model || model,
          options
        );

      case 'anthropic':
        return await callAnthropicAPI(
          endpoint,
          apiKey,
          messages,
          options.model || model,
          options
        );

      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  } catch (error: any) {
    const apiError: APIError = {
      message: error.message || 'Unknown API error',
      status: error.status,
      provider,
    };
    throw apiError;
  }
}

/**
 * Call OpenAI-compatible API (OpenAI, DeepSeek, etc.)
 */
async function callOpenAICompatibleAPI(
  endpoint: string,
  apiKey: string,
  messages: AIMessage[],
  model: string,
  options: { temperature?: number; maxTokens?: number }
): Promise<AIResponse> {
  // Validate model is present
  if (!model || model.trim() === '') {
    throw new Error('Model name is required but not provided. Check your API configuration.');
  }

  const requestBody: any = {
    model: model.trim(),
    messages,
  };

  if (options.temperature !== undefined) {
    requestBody.temperature = options.temperature;
  }

  if (options.maxTokens !== undefined) {
    requestBody.max_tokens = options.maxTokens;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('❌ API Response Error:', {
      status: response.status,
      statusText: response.statusText,
      data: data,
      requestBody: requestBody
    });
    throw {
      message: data?.error?.message || data?.message || `API Error ${response.status}: ${response.statusText}`,
      status: response.status,
    };
  }

  return {
    content: data.choices[0].message.content.trim(),
    model: data.model,
    usage: {
      promptTokens: data.usage?.prompt_tokens,
      completionTokens: data.usage?.completion_tokens,
      totalTokens: data.usage?.total_tokens,
    },
  };
}

/**
 * Call Anthropic API
 */
async function callAnthropicAPI(
  endpoint: string,
  apiKey: string,
  messages: AIMessage[],
  model: string,
  options: { temperature?: number; maxTokens?: number }
): Promise<AIResponse> {
  // Validate model is present
  if (!model || model.trim() === '') {
    throw new Error('Model name is required but not provided. Check your API configuration.');
  }

  // Anthropic uses a different format - system messages are separate
  const systemMessages = messages.filter(m => m.role === 'system');
  const userMessages = messages.filter(m => m.role !== 'system');

  const requestBody: any = {
    model: model.trim(),
    messages: userMessages.map(m => ({
      role: m.role,
      content: m.content,
    })),
    max_tokens: options.maxTokens || 4096,
  };

  if (systemMessages.length > 0) {
    requestBody.system = systemMessages[0].content;
  }

  if (options.temperature !== undefined) {
    requestBody.temperature = options.temperature;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data?.error?.message || `API Error ${response.status}`,
      status: response.status,
    };
  }

  return {
    content: data.content[0].text,
    model: data.model,
    usage: {
      promptTokens: data.usage?.input_tokens,
      completionTokens: data.usage?.output_tokens,
      totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
    },
  };
}

/**
 * Parse AI response for Ecko format
 * Extracts title and content from the AI response
 */
export function parseAIResponse(reply: string): { title: string; content: string } {
  const lines = reply.split(/\r?\n/);
  let title = '';
  let content = '';

  if (lines[0].startsWith('標題：')) {
    title = lines[0].replace(/^標題：/, '').trim().slice(0, 10);
    content = lines.slice(1).join('\n').trim();
  } else if (lines[0].startsWith('Title:') || lines[0].startsWith('# ')) {
    title = lines[0].replace(/^(Title:|#)\s*/, '').trim().slice(0, 10);
    content = lines.slice(1).join('\n').trim();
  } else {
    title = lines[0].trim().slice(0, 10);
    content = lines.slice(1).join('\n').trim();
  }

  return { title, content };
}

/**
 * Simple token counting (word-based approximation)
 * For production, consider using a proper tokenizer like tiktoken
 */
export function countTokens(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}
