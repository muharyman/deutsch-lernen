import { useEffect, useState } from 'react';
import type { DailyTrackerState } from '../types';

const STORAGE_KEY = 'german-daily-tracker-v2';
const WINDOW_DAYS = 14;
const GRID_DAYS = 28;

function getDateKey(offset = 0) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - offset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readTracker() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as DailyTrackerState;
  } catch {
    return {};
  }
}

function buildRecentDates(total: number) {
  return Array.from({ length: total }, (_, index) => getDateKey(total - index - 1));
}

function countStreak(tracker: DailyTrackerState) {
  let streak = 0;

  for (let offset = 0; offset < 365; offset += 1) {
    const date = getDateKey(offset);
    if (!tracker[date]) break;
    streak += 1;
  }

  return streak;
}

export function useTracker(activeDate: string) {
  const [tracker, setTracker] = useState<DailyTrackerState>(readTracker);

  useEffect(
    function persistTracker() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
    },
    [tracker]
  );

  const recentDates = buildRecentDates(GRID_DAYS);
  const windowDates = buildRecentDates(WINDOW_DAYS);
  const doneInWindow = windowDates.filter((date) => tracker[date]).length;
  const pct = Math.round((doneInWindow / WINDOW_DAYS) * 100);
  const completedDays = Object.values(tracker).filter(Boolean).length;
  const streak = countStreak(tracker);
  const todayDone = Boolean(tracker[activeDate]);

  function setDayComplete(date: string, done: boolean) {
    setTracker((prev) => {
      if (done) {
        return { ...prev, [date]: true };
      }

      const next = { ...prev };
      delete next[date];
      return next;
    });
  }

  function toggleDate(date: string) {
    setTracker((prev) => {
      const next = { ...prev };
      if (next[date]) delete next[date];
      else next[date] = true;
      return next;
    });
  }

  return {
    tracker,
    recentDates,
    pct,
    completedDays,
    streak,
    todayDone,
    windowDays: WINDOW_DAYS,
    doneInWindow,
    toggleDate,
    setDayComplete,
  };
}
