import { useState, useEffect } from 'react';
import type { DailyWord, Level } from '../types';
import { WORD_POOL } from '../data/wordPool';

const CACHE_KEY = 'german-daily-words-v1';

interface CachedWords {
  date: string;
  level: Level;
  words: DailyWord[];
  source: 'cache' | 'fresh_gemini' | 'static';
}

interface DailyWordsResponse {
  words: DailyWord[];
  source: 'cache' | 'fresh_gemini';
}

async function fetchDailyWords(date: string, level: Level): Promise<DailyWordsResponse> {
  const response = await fetch(`/api/daily-words?date=${date}&level=${level}`);
  const data = await response.json();

  if (!response.ok) {
    const message = typeof data?.error === 'string' && data.error.trim()
      ? data.error
      : 'Backend daily words gagal diakses.';
    throw new Error(message);
  }

  return data as DailyWordsResponse;
}

export function useDailyWords(level: Level) {
  const [words, setWords] = useState<DailyWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'cache' | 'fresh_gemini' | 'static'>('static');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      const today = new Date().toISOString().slice(0, 10);

      // Check cache
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached: CachedWords = JSON.parse(raw);
          if (cached.date === today && cached.level === level && cached.words?.length) {
            if (!cancelled) {
              setWords(cached.words);
              setSource(cached.source === 'static' ? 'static' : 'cache');
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // ignore
      }

      try {
        const apiWords = await fetchDailyWords(today, level);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ date: today, level, words: apiWords.words, source: apiWords.source })
        );
        if (!cancelled) {
          setWords(apiWords.words);
          setSource(apiWords.source);
          setLoading(false);
        }
        return;
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? `${err.message}. Menggunakan kata statis.`
              : 'Backend daily words gagal diakses. Menggunakan kata statis.'
          );
        }
      }

      // Fallback: static pool seeded by date
      const pool = WORD_POOL.filter(w => w.level === level);
      const fallback = WORD_POOL; // use all if level pool is empty
      const activePool = pool.length >= 3 ? pool : fallback;
      const seed = parseInt(today.replace(/-/g, '')) % activePool.length;
      const dailyWords: DailyWord[] = [
        activePool[seed % activePool.length],
        activePool[(seed + 1) % activePool.length],
        activePool[(seed + 2) % activePool.length],
      ];

      if (!cancelled) {
        setWords(dailyWords);
        setSource('static');
        setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [level]);

  return { words, loading, source, error };
}
