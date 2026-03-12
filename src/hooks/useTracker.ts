import { useState, useEffect } from 'react';
import type { TrackerState, Week } from '../types';

const STORAGE_KEY = 'german-tracker-v1';

export function useTracker(weeks: Week[]) {
  const [tracker, setTracker] = useState<TrackerState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as TrackerState;
    } catch {
      // ignore parse errors
    }
    return initTracker(weeks);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
  }, [tracker]);

  const toggleDay = (weekNum: number, dayIdx: number) => {
    setTracker(prev => ({
      ...prev,
      [weekNum]: {
        ...prev[weekNum],
        [dayIdx]: !prev[weekNum]?.[dayIdx],
      },
    }));
  };

  const weekDone = (weekNum: number) =>
    Object.values(tracker[weekNum] ?? {}).filter(Boolean).length;

  const totalDays = weeks.length * 7;
  const doneDays = Object.values(tracker)
    .flatMap(w => Object.values(w))
    .filter(Boolean).length;
  const pct = totalDays > 0 ? Math.round((doneDays / totalDays) * 100) : 0;

  return { tracker, toggleDay, weekDone, pct, doneDays, totalDays };
}

function initTracker(weeks: Week[]): TrackerState {
  return Object.fromEntries(weeks.map(w => [w.num, {}]));
}
