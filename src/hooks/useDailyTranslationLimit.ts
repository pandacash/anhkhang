import { useState, useEffect, useCallback } from "react";

const MAX_TRANSLATIONS_PER_DAY = 5;
const STORAGE_KEY = "daily_translation_usage";

interface TranslationUsage {
  date: string;
  count: number;
}

export const useDailyTranslationLimit = (playerId: string) => {
  const [usedCount, setUsedCount] = useState(0);

  const getStorageKey = () => `${STORAGE_KEY}_${playerId}`;

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey());
    if (stored) {
      const usage: TranslationUsage = JSON.parse(stored);
      if (usage.date === getTodayDate()) {
        setUsedCount(usage.count);
      } else {
        // Reset for new day
        localStorage.removeItem(getStorageKey());
        setUsedCount(0);
      }
    }
  }, [playerId]);

  const canUseTranslation = usedCount < MAX_TRANSLATIONS_PER_DAY;
  const remainingCount = MAX_TRANSLATIONS_PER_DAY - usedCount;

  const useTranslation = useCallback(() => {
    const newCount = usedCount + 1;
    setUsedCount(newCount);
    const usage: TranslationUsage = {
      date: getTodayDate(),
      count: newCount
    };
    localStorage.setItem(getStorageKey(), JSON.stringify(usage));
    return newCount;
  }, [usedCount, playerId]);

  return {
    usedCount,
    remainingCount,
    canUseTranslation,
    useTranslation,
    maxPerDay: MAX_TRANSLATIONS_PER_DAY
  };
};
