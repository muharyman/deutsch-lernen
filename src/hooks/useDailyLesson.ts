import { useEffect, useState } from 'react';
import type { DailyLessonPayload } from '../types';
import { createFallbackDailyLesson } from '../data/dailyLessonFallback';
import { fetchDailyLessonFromGemini } from '../lib/gemini';

const CACHE_KEY = 'german-daily-lesson-v1';

interface CachedLesson {
  date: string;
  lesson: DailyLessonPayload;
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
    if (cached.date === date && cached.lesson) {
      return cached.lesson;
    }
  } catch {
    // ignore broken cache
  }

  return null;
}

export function useDailyLesson(apiKey?: string) {
  const [lesson, setLesson] = useState<DailyLessonPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'gemini' | 'static'>('static');
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
            setLesson(cachedLesson);
            setSource(cachedLesson.source === 'gemini' ? 'gemini' : 'static');
            setLoading(false);
          }
          return;
        }

        if (apiKey?.trim()) {
          try {
            const geminiLesson = await fetchDailyLessonFromGemini(apiKey.trim(), date);
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                date,
                lesson: geminiLesson,
              } satisfies CachedLesson)
            );

            if (!cancelled) {
              setLesson(geminiLesson);
              setSource('gemini');
              setLoading(false);
            }
            return;
          } catch (err) {
            if (!cancelled) {
              setError(
                err instanceof Error
                  ? `${err.message}. Menampilkan materi fallback lokal.`
                  : 'Gemini gagal diakses. Menampilkan materi fallback lokal.'
              );
            }
          }
        } else if (!cancelled) {
          setError('Masukkan Gemini API key agar materi harian dibuat oleh Gemini free tier.');
        }

        const fallbackLesson = createFallbackDailyLesson(date);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            date,
            lesson: fallbackLesson,
          } satisfies CachedLesson)
        );

        if (!cancelled) {
          setLesson(fallbackLesson);
          setSource('static');
          setLoading(false);
        }
      }

      load();

      return function cancelLoad() {
        cancelled = true;
      };
    },
    [apiKey]
  );

  return { lesson, loading, source, error, activeDate };
}
