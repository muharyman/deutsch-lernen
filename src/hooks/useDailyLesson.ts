import { useEffect, useState } from 'react';
import type { DailyLessonPayload } from '../types';
import { createFallbackDailyLesson } from '../data/dailyLessonFallback';

const CACHE_KEY = 'german-daily-lesson-v2';

interface CachedLesson {
  date: string;
  lesson: DailyLessonPayload;
  source: 'cache' | 'fresh_gemini' | 'fallback';
}

interface DailyLessonResponse {
  payload: DailyLessonPayload;
  source: 'cache' | 'fresh_gemini' | 'fallback';
}

interface DailyLessonErrorResponse {
  error?: string;
  source?: 'fallback';
}

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readCache(date: string) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedLesson;
    if (cached.date === date && cached.lesson && cached.source) {
      return cached;
    }
  } catch {
    // ignore broken cache
  }

  return null;
}

async function fetchDailyLesson(date: string): Promise<DailyLessonResponse> {
  const response = await fetch(`/api/daily-lesson?date=${date}`);
  const data = (await response.json()) as DailyLessonResponse | DailyLessonErrorResponse;

  if (!response.ok) {
    const message = 'error' in data && typeof data.error === 'string' && data.error.trim()
      ? data.error
      : 'Backend daily lesson gagal diakses.';

    throw new Error(
      message
    );
  }

  return data as DailyLessonResponse;
}

export function useDailyLesson() {
  const [lesson, setLesson] = useState<DailyLessonPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'cache' | 'fresh_gemini' | 'fallback'>('fallback');
  const [error, setError] = useState<string | null>(null);
  const [activeDate, setActiveDate] = useState(getLocalDateKey);

  useEffect(function syncActiveDate() {
    setActiveDate(getLocalDateKey());
  }, []);

  useEffect(
    function loadDailyLesson() {
      let cancelled = false;
      const date = getLocalDateKey();

      async function load() {
        setLoading(true);
        setError(null);
        setActiveDate(date);

        const cachedLesson = readCache(date);
        if (cachedLesson) {
          if (!cancelled) {
            setLesson(cachedLesson.lesson);
            setSource(cachedLesson.source === 'fallback' ? 'fallback' : 'cache');
            setLoading(false);
          }
          return;
        }

        try {
          const apiLesson = await fetchDailyLesson(date);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              date,
              lesson: apiLesson.payload,
              source: apiLesson.source,
            } satisfies CachedLesson)
          );

          if (!cancelled) {
            setLesson(apiLesson.payload);
            setSource(apiLesson.source);
            setLoading(false);
          }
          return;
        } catch (err) {
          if (!cancelled) {
            setError(
              err instanceof Error
                ? `${err.message}. Menampilkan materi fallback lokal.`
                : 'Backend daily lesson gagal diakses. Menampilkan materi fallback lokal.'
            );
          }
        }

        const fallbackLesson = createFallbackDailyLesson(date);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            date,
            lesson: fallbackLesson,
            source: 'fallback',
          } satisfies CachedLesson)
        );

        if (!cancelled) {
          setLesson(fallbackLesson);
          setSource('fallback');
          setLoading(false);
        }
      }

      load();

      return function cancelLoad() {
        cancelled = true;
      };
    },
    []
  );

  return { lesson, loading, source, error, activeDate };
}
