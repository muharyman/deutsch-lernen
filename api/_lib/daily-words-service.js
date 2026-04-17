import { fetchDailyWordsFromGemini, isValidLevel } from './daily-words-schema.js';
import { createDailyWordsStorage } from './daily-words-storage.js';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const LOCK_TIMEOUT_MS = 25_000;
const LOCK_STALE_MS = 120_000;
const LOCK_POLL_MS = 250;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getTodayDateKey(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function isValidDateKey(value) {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export async function getDailyWords(options) {
  const {
    date,
    level,
    storage = createDailyWordsStorage(),
    gemini = async (requestedDate, requestedLevel) => {
      const apiKey = process.env.GEMINI_API_KEY?.trim();
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY belum dikonfigurasi di server.');
      }

      return fetchDailyWordsFromGemini(apiKey, requestedDate, requestedLevel);
    },
    now = Date.now,
  } = options;

  if (!isValidLevel(level)) {
    throw new Error('Parameter level harus salah satu dari A1, A2, B1, atau B2.');
  }

  const cached = await storage.readWords(date, level);
  if (cached?.words?.length) {
    return {
      date,
      level,
      words: cached.words,
      source: 'cache',
      createdAt: cached.created_at,
    };
  }

  const owner = crypto.randomUUID();
  const lock = {
    owner,
    created_at: new Date(now()).toISOString(),
  };

  const acquired = await storage.acquireLock(date, level, lock);
  if (!acquired) {
    const startedAt = now();

    while (now() - startedAt < LOCK_TIMEOUT_MS) {
      await sleep(LOCK_POLL_MS);

      const existing = await storage.readWords(date, level);
      if (existing?.words?.length) {
        return {
          date,
          level,
          words: existing.words,
          source: 'cache',
          createdAt: existing.created_at,
        };
      }

      const activeLock = await storage.readLock(date, level);
      if (!activeLock) {
        return getDailyWords({ date, level, storage, gemini, now });
      }

      const lockCreatedAt = Date.parse(activeLock.created_at ?? '');
      if (!Number.isNaN(lockCreatedAt) && now() - lockCreatedAt > LOCK_STALE_MS) {
        await storage.releaseLock(date, level, activeLock.owner);
        return getDailyWords({ date, level, storage, gemini, now });
      }
    }

    throw new Error('Menunggu cache kata harian terlalu lama. Coba beberapa detik lagi.');
  }

  try {
    const existing = await storage.readWords(date, level);
    if (existing?.words?.length) {
      return {
        date,
        level,
        words: existing.words,
        source: 'cache',
        createdAt: existing.created_at,
      };
    }

    const payload = await gemini(date, level);
    const record = {
      date,
      level,
      words: payload.words,
      source: payload.source ?? 'gemini',
      created_at: new Date(now()).toISOString(),
    };

    try {
      await storage.writeWords(record);
    } catch {
      const raceWinner = await storage.readWords(date, level);
      if (raceWinner?.words?.length) {
        return {
          date,
          level,
          words: raceWinner.words,
          source: 'cache',
          createdAt: raceWinner.created_at,
        };
      }

      throw new Error('Gagal menyimpan cache kata harian.');
    }

    return {
      date,
      level,
      words: payload.words,
      source: 'fresh_gemini',
      createdAt: record.created_at,
    };
  } finally {
    await storage.releaseLock(date, level, owner);
  }
}
