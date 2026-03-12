import { useState, useEffect } from 'react';
import type { DailyWord, Level } from '../types';
import { fetchDailyWordsFromGemini } from '../lib/gemini';
import { WORD_POOL } from '../data/wordPool';

const CACHE_KEY = 'german-daily-words-v1';

interface CachedWords {
  date: string;
  level: Level;
  words: DailyWord[];
}

export function useDailyWords(level: Level, geminiApiKey?: string) {
  const [words, setWords] = useState<DailyWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'gemini' | 'static'>('static');
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
              setSource('gemini');
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // ignore
      }

      // Try Gemini
      if (geminiApiKey) {
        try {
          const geminiWords = await fetchDailyWordsFromGemini(level, geminiApiKey);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ date: today, level, words: geminiWords })
          );
          if (!cancelled) {
            setWords(geminiWords);
            setSource('gemini');
            setLoading(false);
          }
          return;
        } catch {
          if (!cancelled) setError('Gemini tidak tersedia, menggunakan kata statis.');
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
  }, [level, geminiApiKey]);

  return { words, loading, source, error };
}
