/**
 * useEcko Hook
 * React hook for managing Ecko entries with auto-processing
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  type EckoEntry,
  type EckoStats,
  loadEntries,
  saveNewEntry as saveNewEntryCore,
  updateEntry,
  deleteEntry as deleteEntryCore,
  clearAllEntries,
  loadStats,
  incrementApiUsage,
  addTokens,
  getPendingEntries,
  fetchEcko,
  isEntryLocked,
  exportAsJSON,
  exportAsText,
  USAGE_LIMIT,
  TOKEN_WARNING_THRESHOLD,
} from '@/lib/eckoCore';
import { countTokens } from '@/lib/eckoApiService';

const AUTO_PROCESS_INTERVAL_MS = 10000; // 10 seconds

export function useEcko() {
  // ============================================================================
  // State
  // ============================================================================

  const [entries, setEntries] = useState<EckoEntry[]>([]);
  const [stats, setStats] = useState<EckoStats>({ apiUsageCount: 0, totalTokens: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs for stable values in intervals
  const entriesRef = useRef<EckoEntry[]>(entries);
  const statsRef = useRef<EckoStats>(stats);

  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  // ============================================================================
  // Load Data on Mount
  // ============================================================================

  useEffect(() => {
    const loadedEntries = loadEntries();
    const loadedStats = loadStats();

    setEntries(loadedEntries);
    setStats(loadedStats);
    setIsLoading(false);
  }, []);

  // ============================================================================
  // Save New Entry
  // ============================================================================

  const saveEcko = useCallback((content: string, unlockInMinutes: number = 1): EckoEntry => {
    const newEntry = saveNewEntryCore(content, unlockInMinutes);
    setEntries(prev => [newEntry, ...prev]);
    return newEntry;
  }, []);

  // ============================================================================
  // Delete Entry
  // ============================================================================

  const removeEntry = useCallback((id: string): void => {
    deleteEntryCore(id);
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  // ============================================================================
  // Clear All Data
  // ============================================================================

  const clearAll = useCallback((): void => {
    clearAllEntries();
    setEntries([]);
    setStats({ apiUsageCount: 0, totalTokens: 0 });
  }, []);

  // ============================================================================
  // Export Functions
  // ============================================================================

  const exportJSON = useCallback((): string => {
    return exportAsJSON();
  }, []);

  const exportText = useCallback((): string => {
    return exportAsText();
  }, []);

  // ============================================================================
  // Auto-Process Unlocked Entries
  // ============================================================================

  useEffect(() => {
    let mounted = true;
    const isRunning = { current: false };

    const interval = setInterval(async () => {
      if (!mounted || isRunning.current) return;
      if (statsRef.current.apiUsageCount >= USAGE_LIMIT) return;

      isRunning.current = true;
      setIsProcessing(true);

      try {
        const pending = getPendingEntries();

        for (const entry of pending) {
          if (!mounted) break;
          if (statsRef.current.apiUsageCount >= USAGE_LIMIT) {
            console.warn('⚠️ API usage limit reached');
            alert('You have reached your daily limit for AI responses. Please try again tomorrow.');
            break;
          }

          console.log(`🔓 Processing unlocked entry: ${entry.id}`);

          // Calculate tokens
          const prompt = `Ecko prompt for: ${entry.content}`;
          const tokenCount = countTokens(prompt);
          const newTotalTokens = addTokens(tokenCount);

          if (newTotalTokens > TOKEN_WARNING_THRESHOLD) {
            console.warn(`⚠️ Token usage warning: ${newTotalTokens} tokens used`);
          }

          // Fetch Ecko response
          const updatedEntry = await fetchEcko(entry);

          // Increment API usage
          const newApiUsageCount = incrementApiUsage();

          // Update state
          if (mounted) {
            setEntries(prev => {
              const updated = prev.map(e =>
                e.id === updatedEntry.id ? updatedEntry : e
              );
              return updated;
            });

            setStats({
              apiUsageCount: newApiUsageCount,
              totalTokens: newTotalTokens,
            });

            updateEntry(updatedEntry);
          }
        }
      } catch (error) {
        console.error('Error processing entries:', error);
      } finally {
        isRunning.current = false;
        if (mounted) {
          setIsProcessing(false);
        }
      }
    }, AUTO_PROCESS_INTERVAL_MS);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // ============================================================================
  // Computed Values
  // ============================================================================

  const lockedCount = entries.filter(e => isEntryLocked(e.unlockDate)).length;
  const pendingCount = getPendingEntries().length;
  const totalCount = entries.length;

  // ============================================================================
  // Return Hook Interface
  // ============================================================================

  return {
    // Data
    entries,
    stats,

    // States
    isLoading,
    isProcessing,

    // Counts
    lockedCount,
    pendingCount,
    totalCount,

    // Actions
    saveEcko,
    removeEntry,
    clearAll,

    // Export
    exportJSON,
    exportText,

    // Limits
    usageLimit: USAGE_LIMIT,
    tokenWarningThreshold: TOKEN_WARNING_THRESHOLD,
  };
}
