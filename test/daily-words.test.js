import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';

import handler from '../api/daily-words.js';
import { getDailyWords } from '../api/_lib/daily-words-service.js';
import { createDailyWordsStorage } from '../api/_lib/daily-words-storage.js';

function createWords(level) {
  return {
    date: '2026-04-18',
    level,
    words: Array.from({ length: 3 }, (_, index) => ({
      word: `${level.toLowerCase()}-wort-${index + 1}`,
      article: 'der',
      meaning_id: `arti ${index + 1}`,
      example_de: `Beispiel ${index + 1}`,
      example_id: `Contoh ${index + 1}`,
      level,
    })),
    source: 'gemini',
    cachedAt: new Date().toISOString(),
  };
}

function createMockResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
    },
    send(body) {
      this.body = body;
      return this;
    },
  };
}

test('returns cached words without calling Gemini again', async () => {
  const baseDir = await mkdtemp(path.join(os.tmpdir(), 'daily-words-cache-'));
  const storage = createDailyWordsStorage({ mode: 'file', baseDir });
  const date = '2026-04-18';
  const level = 'A2';
  let geminiCalls = 0;

  const first = await getDailyWords({
    date,
    level,
    storage,
    gemini: async () => {
      geminiCalls += 1;
      return createWords(level);
    },
  });

  const second = await getDailyWords({
    date,
    level,
    storage,
    gemini: async () => {
      geminiCalls += 1;
      throw new Error('Gemini seharusnya tidak dipanggil lagi');
    },
  });

  assert.equal(first.source, 'fresh_gemini');
  assert.equal(second.source, 'cache');
  assert.equal(geminiCalls, 1);

  await rm(baseDir, { force: true, recursive: true });
});

test('parallel requests for the same date and level generate words only once', async () => {
  const baseDir = await mkdtemp(path.join(os.tmpdir(), 'daily-words-race-'));
  const storage = createDailyWordsStorage({ mode: 'file', baseDir });
  const date = '2026-04-18';
  const level = 'B1';
  let geminiCalls = 0;

  const gemini = async () => {
    geminiCalls += 1;
    await new Promise((resolve) => setTimeout(resolve, 500));
    return createWords(level);
  };

  const [first, second] = await Promise.all([
    getDailyWords({ date, level, storage, gemini }),
    getDailyWords({ date, level, storage, gemini }),
  ]);

  assert.equal(geminiCalls, 1);
  assert.deepEqual(
    [first.source, second.source].sort(),
    ['cache', 'fresh_gemini']
  );
  assert.equal(first.words[0].level, level);
  assert.equal(second.words[0].level, level);

  await rm(baseDir, { force: true, recursive: true });
});

test('endpoint returns controlled error when generation fails and cache is empty', async () => {
  const baseDir = await mkdtemp(path.join(os.tmpdir(), 'daily-words-endpoint-'));
  const previousCacheDir = process.env.DAILY_WORDS_CACHE_DIR;
  const previousGeminiKey = process.env.GEMINI_API_KEY;

  process.env.DAILY_WORDS_CACHE_DIR = baseDir;
  delete process.env.GEMINI_API_KEY;

  const req = {
    method: 'GET',
    query: {
      date: '2026-04-18',
      level: 'A1',
    },
  };
  const res = createMockResponse();

  await handler(req, res);

  assert.equal(res.statusCode, 502);
  assert.match(res.body, /GEMINI_API_KEY belum dikonfigurasi/i);

  if (previousCacheDir) {
    process.env.DAILY_WORDS_CACHE_DIR = previousCacheDir;
  } else {
    delete process.env.DAILY_WORDS_CACHE_DIR;
  }

  if (previousGeminiKey) {
    process.env.GEMINI_API_KEY = previousGeminiKey;
  } else {
    delete process.env.GEMINI_API_KEY;
  }

  await rm(baseDir, { force: true, recursive: true });
});
