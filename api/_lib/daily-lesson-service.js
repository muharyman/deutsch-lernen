import { fetchDailyLessonFromGemini } from './daily-lesson-schema.js';
import { createDailyLessonStorage } from './daily-lesson-storage.js';

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

export async function getDailyLesson(options) {
  const {
    date,
    storage = createDailyLessonStorage(),
    gemini = async (requestedDate) => {
      const apiKey = process.env.GEMINI_API_KEY?.trim();
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY belum dikonfigurasi di server.');
      }

      return fetchDailyLessonFromGemini(apiKey, requestedDate);
    },
    now = Date.now,
  } = options;

  const cached = await storage.readLesson(date);
  if (cached?.payload_json) {
    return {
      date,
      theme: cached.theme,
      payload: cached.payload_json,
      source: 'cache',
      createdAt: cached.created_at,
    };
  }

  const owner = crypto.randomUUID();
  const lock = {
    owner,
    created_at: new Date(now()).toISOString(),
  };

  const acquired = await storage.acquireLock(date, lock);
  if (!acquired) {
    const startedAt = now();

    while (now() - startedAt < LOCK_TIMEOUT_MS) {
      await sleep(LOCK_POLL_MS);

      const existing = await storage.readLesson(date);
      if (existing?.payload_json) {
        return {
          date,
          theme: existing.theme,
          payload: existing.payload_json,
          source: 'cache',
          createdAt: existing.created_at,
        };
      }

      const activeLock = await storage.readLock(date);
      if (!activeLock) {
        return getDailyLesson({ date, storage, gemini, now });
      }

      const lockCreatedAt = Date.parse(activeLock.created_at ?? '');
      if (!Number.isNaN(lockCreatedAt) && now() - lockCreatedAt > LOCK_STALE_MS) {
        await storage.releaseLock(date, activeLock.owner);
        return getDailyLesson({ date, storage, gemini, now });
      }
    }

    throw new Error('Menunggu cache harian terlalu lama. Coba beberapa detik lagi.');
  }

  try {
    const existing = await storage.readLesson(date);
    if (existing?.payload_json) {
      return {
        date,
        theme: existing.theme,
        payload: existing.payload_json,
        source: 'cache',
        createdAt: existing.created_at,
      };
    }

    const payload = await gemini(date);
    const record = {
      date,
      theme: payload.theme,
      payload_json: payload,
      source: payload.source ?? 'gemini',
      created_at: new Date(now()).toISOString(),
    };

    try {
      await storage.writeLesson(record);
    } catch {
      const raceWinner = await storage.readLesson(date);
      if (raceWinner?.payload_json) {
        return {
          date,
          theme: raceWinner.theme,
          payload: raceWinner.payload_json,
          source: 'cache',
          createdAt: raceWinner.created_at,
        };
      }

      throw new Error('Gagal menyimpan cache materi harian.');
    }

    return {
      date,
      theme: payload.theme,
      payload,
      source: 'fresh_gemini',
      createdAt: record.created_at,
    };
  } finally {
    await storage.releaseLock(date, owner);
  }
}

