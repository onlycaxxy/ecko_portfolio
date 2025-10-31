/**
 * Ecko Core Logic
 * Simplified, modular version of Ecko functionality
 */

import { callAIAPI, parseAIResponse, countTokens } from './eckoApiService';
import { API_CONFIG } from './eckoConfig';

// ============================================================================
// Types
// ============================================================================

export interface EckoEntry {
  id: string;
  content: string;
  title: string;
  createdAt: number;
  unlockDate: number | null;
  response?: string;
  error?: string;
}

export interface EckoStats {
  apiUsageCount: number;
  totalTokens: number;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEYS = {
  ENTRIES: 'ecko',
  API_USAGE: 'apiUsageCount',
  TOTAL_TOKENS: 'totalToken',
} as const;

export const USAGE_LIMIT = API_CONFIG.usageLimit;
export const TOKEN_WARNING_THRESHOLD = API_CONFIG.tokenWarningThreshold;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate unique entry ID
 */
export function generateId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Check if entry is locked (unlockDate hasn't passed)
 */
export function isEntryLocked(unlockDate: number | null): boolean {
  return unlockDate !== null && unlockDate > Date.now();
}

// ============================================================================
// Chinese AI Prompt (from Ecko prototype)
// ============================================================================

export function createEckoPrompt(content: string): string {
  return `你是 Ecko AI，一位富有創意與挑戰精神的反思夥伴。

請針對以下用戶想法提出三種深入分析：
1. 隱含假設（背後未說出的前提）
2. 對立觀點（相反立場、冷門觀點）
3. 延伸發想（跨領域聯想、歷史文化、潛在風險）

用戶的想法是：「${content}」

最後，寫一個十字內的標題，並針對這個標題撰寫一篇一千字以上的深入分析，請用 Markdown 格式（搭配 H3 標題、列表、粗體字）輸出回應。自然語氣。`;
}

// ============================================================================
// Core Ecko Function (Simplified)
// ============================================================================

/**
 * Fetch Ecko AI response for an entry
 * @param entry - The entry to process
 * @returns Updated entry with response or error
 */
export async function fetchEcko(entry: EckoEntry): Promise<EckoEntry> {
  const prompt = createEckoPrompt(entry.content);
  const tokenCount = countTokens(prompt);

  console.log(`🚀 Fetching Ecko for entry ${entry.id}`);
  console.log(`📊 Token count: ${tokenCount}`);

  try {
    // Call unified API service
    const response = await callAIAPI([
      { role: 'user', content: prompt }
    ]);

    console.log(`✅ ${API_CONFIG.provider} response received`);

    // Parse AI response (extracts title from "標題：XXX")
    const { title, content } = parseAIResponse(response.content);

    return {
      ...entry,
      title,
      response: content,
      error: undefined,
    };

  } catch (err: any) {
    console.error('❌ Ecko error:', err);
    const errorMessage = err.status
      ? `API Error ${err.status}: ${err.message}`
      : err.message || 'Ecko 呼應失敗（網路錯誤）';

    return {
      ...entry,
      error: errorMessage,
    };
  }
}

// ============================================================================
// localStorage Management
// ============================================================================

/**
 * Load all entries from localStorage
 */
export function loadEntries(): EckoEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    console.log('📦 Raw stored data:', stored);

    if (!stored) return [];

    const parsed = JSON.parse(stored);
    console.log('📋 Parsed data:', parsed);

    // Handle if stored data is not an array
    const dataArray = Array.isArray(parsed) ? parsed : [parsed];

    return dataArray.map((e: any) => ({
      id: e.id || generateId(),
      content: e.content || e.userInput || '',
      createdAt: e.createdAt || e.timestamp || Date.now(),
      unlockDate: e.unlockDate || e.unlockTime || null,
      title: e.title || '',
      response: e.response || e.aiResponse || '',
      error: e.error || '',
    }));
  } catch (error) {
    console.error('❌ Failed to load entries:', error);
    return [];
  }
}

/**
 * Save entries to localStorage
 */
export function saveEntries(entries: EckoEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save entries:', error);
    throw error;
  }
}

/**
 * Save a new entry
 */
export function saveNewEntry(content: string, unlockInMinutes: number = 1): EckoEntry {
  const now = Date.now();
  const newEntry: EckoEntry = {
    id: generateId(),
    content: content.trim(),
    title: '',
    createdAt: now,
    unlockDate: now + unlockInMinutes * 60 * 1000,
    response: '',
    error: '',
  };

  const entries = loadEntries();
  const updated = [newEntry, ...entries];
  saveEntries(updated);

  return newEntry;
}

/**
 * Update an existing entry
 */
export function updateEntry(updatedEntry: EckoEntry): void {
  const entries = loadEntries();
  const updated = entries.map(e =>
    e.id === updatedEntry.id ? updatedEntry : e
  );
  saveEntries(updated);
}

/**
 * Delete an entry
 */
export function deleteEntry(id: string): void {
  const entries = loadEntries();
  const filtered = entries.filter(e => e.id !== id);
  saveEntries(filtered);
}

/**
 * Clear all entries
 */
export function clearAllEntries(): void {
  localStorage.removeItem(STORAGE_KEYS.ENTRIES);
  localStorage.removeItem(STORAGE_KEYS.API_USAGE);
  localStorage.removeItem(STORAGE_KEYS.TOTAL_TOKENS);
}

// ============================================================================
// Stats Management
// ============================================================================

/**
 * Load usage statistics
 */
export function loadStats(): EckoStats {
  const apiUsageCount = parseInt(
    localStorage.getItem(STORAGE_KEYS.API_USAGE) || '0',
    10
  );
  const totalTokens = parseInt(
    localStorage.getItem(STORAGE_KEYS.TOTAL_TOKENS) || '0',
    10
  );

  return { apiUsageCount, totalTokens };
}

/**
 * Increment API usage count
 */
export function incrementApiUsage(): number {
  const stats = loadStats();
  const newCount = stats.apiUsageCount + 1;
  localStorage.setItem(STORAGE_KEYS.API_USAGE, newCount.toString());
  return newCount;
}

/**
 * Add tokens to total count
 */
export function addTokens(count: number): number {
  const stats = loadStats();
  const newTotal = stats.totalTokens + count;
  localStorage.setItem(STORAGE_KEYS.TOTAL_TOKENS, newTotal.toString());
  return newTotal;
}

/**
 * Get entries ready for processing (unlocked, no response, no error)
 */
export function getPendingEntries(): EckoEntry[] {
  const entries = loadEntries();
  const now = Date.now();

  return entries.filter(
    e => e.unlockDate !== null &&
         e.unlockDate <= now &&
         !e.response &&
         !e.error
  );
}

// ============================================================================
// Export Utilities
// ============================================================================

/**
 * Export entries as JSON
 */
export function exportAsJSON(): string {
  const entries = loadEntries();
  return JSON.stringify(entries, null, 2);
}

/**
 * Export entries as plain text
 */
export function exportAsText(): string {
  const entries = loadEntries();
  return entries.map(entry => {
    const date = new Date(entry.createdAt).toLocaleString();
    return `${entry.title || 'Untitled'}\n${date}\n\n${entry.content}\n\n${entry.response ? '---\n\nEcko Response:\n' + entry.response : ''}\n\n---\n\n`;
  }).join('');
}
