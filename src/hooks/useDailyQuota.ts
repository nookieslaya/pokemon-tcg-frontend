import { useCallback, useEffect, useState } from "react";

type QuotaState = {
  date: string;
  count: number;
};

const STORAGE_KEY = "tcg-query-quota";

const getTodayKey = () => new Date().toISOString().slice(0, 10);

const loadQuota = (): QuotaState => {
  const today = getTodayKey();
  if (typeof window === "undefined") {
    return { date: today, count: 0 };
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { date: today, count: 0 };
  }
  try {
    const parsed = JSON.parse(raw) as QuotaState;
    if (parsed.date !== today) {
      return { date: today, count: 0 };
    }
    return parsed;
  } catch {
    return { date: today, count: 0 };
  }
};

const saveQuota = (state: QuotaState) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const useDailyQuota = (limit = 100) => {
  const [state, setState] = useState<QuotaState>(() => loadQuota());

  useEffect(() => {
    const today = getTodayKey();
    if (state.date !== today) {
      const next = { date: today, count: 0 };
      setState(next);
      saveQuota(next);
    }
  }, [state.date]);

  const remaining = Math.max(0, limit - state.count);
  const canQuery = remaining > 0;

  const increment = useCallback(() => {
    setState((prev) => {
      const today = getTodayKey();
      const currentCount = prev.date === today ? prev.count : 0;
      if (currentCount >= limit) {
        return { date: today, count: currentCount };
      }
      const next = { date: today, count: currentCount + 1 };
      saveQuota(next);
      return next;
    });
  }, [limit]);

  return {
    used: state.count,
    remaining,
    limit,
    canQuery,
    increment,
  };
};

export { useDailyQuota };
