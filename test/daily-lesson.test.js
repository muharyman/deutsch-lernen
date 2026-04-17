import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';

import handler from '../api/daily-lesson.js';
import { getDailyLesson } from '../api/_lib/daily-lesson-service.js';
import { createDailyLessonStorage } from '../api/_lib/daily-lesson-storage.js';

function createLesson(date, theme = 'Tema dari Gemini') {
  return {
    date,
    theme,
    conversations: Array.from({ length: 3 }, (_, index) => ({
      title: `Conversation ${index + 1}`,
      situation: `Situasi ${index + 1}`,
      lines: [
        { role: 'A', de: 'Hallo', id: 'Halo' },
        { role: 'B', de: 'Guten Tag', id: 'Selamat siang' },
        { role: 'A', de: 'Wie gehts?', id: 'Apa kabar?' },
        { role: 'B', de: 'Gut', id: 'Baik' },
      ],
      grammarNotes: [
        { title: 'Note 1', explanation: 'Penjelasan 1' },
        { title: 'Note 2', explanation: 'Penjelasan 2' },
      ],
      keyExpressions: [
        { de: 'Hallo', id: 'Halo' },
        { de: 'Guten Tag', id: 'Selamat siang' },
        { de: 'Tschuss', id: 'Dadah' },
      ],
      practice: [
        {
          type: 'multiple_choice',
          prompt: 'Pilih jawaban benar',
          choices: ['a', 'b', 'c'],
          answer: 'a',
          explanation: 'Karena benar',
        },
        {
          type: 'short_answer',
          prompt: 'Isi jawaban',
          answer: 'jawab',
          explanation: 'Penjelasan',
        },
      ],
    })),
    words: Array.from({ length: 3 }, (_, index) => ({
      word: `wort-${index + 1}`,
      article: 'der',
      meaning_id: `arti ${index + 1}`,
      example_de: `Beispiel ${index + 1}`,
      example_id: `Contoh ${index + 1}`,
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

test('returns cache without calling Gemini again', async () => {
  const baseDir = await mkdtemp(path.join(os.tmpdir(), 'daily-lesson-cache-'));
  const storage = createDailyLessonStorage({ mode: 'file', baseDir });
  const date = '2026-04-17';
  let geminiCalls = 0;

  const first = await getDailyLesson({
    date,
    storage,
    gemini: async (requestedDate) => {
      geminiCalls += 1;
      return createLesson(requestedDate);
    },
  });

  const second = await getDailyLesson({
    date,
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

test('parallel requests for the same date generate only once', async () => {
  const baseDir = await mkdtemp(path.join(os.tmpdir(), 'daily-lesson-race-'));
  const storage = createDailyLessonStorage({ mode: 'file', baseDir });
  const date = '2026-04-18';
  let geminiCalls = 0;

  const gemini = async (requestedDate) => {
    geminiCalls += 1;
    await new Promise((resolve) => setTimeout(resolve, 500));
    return createLesson(requestedDate, 'Tema paralel');
  };

  const [first, second] = await Promise.all([
    getDailyLesson({ date, storage, gemini }),
    getDailyLesson({ date, storage, gemini }),
  ]);

  assert.equal(geminiCalls, 1);
  assert.deepEqual(
    [first.source, second.source].sort(),
    ['cache', 'fresh_gemini']
  );
  assert.equal(first.payload.theme, 'Tema paralel');
  assert.equal(second.payload.theme, 'Tema paralel');

  await rm(baseDir, { force: true, recursive: true });
});

test('endpoint returns controlled error when generation fails and cache is empty', async () => {
  const baseDir = await mkdtemp(path.join(os.tmpdir(), 'daily-lesson-endpoint-'));
  const previousCacheDir = process.env.DAILY_LESSON_CACHE_DIR;
  const previousGeminiKey = process.env.GEMINI_API_KEY;

  process.env.DAILY_LESSON_CACHE_DIR = baseDir;
  delete process.env.GEMINI_API_KEY;

  const req = {
    method: 'GET',
    query: {
      date: '2026-04-19',
    },
  };
  const res = createMockResponse();

  await handler(req, res);

  assert.equal(res.statusCode, 502);
  assert.match(res.body, /GEMINI_API_KEY belum dikonfigurasi/i);

  if (previousCacheDir) {
    process.env.DAILY_LESSON_CACHE_DIR = previousCacheDir;
  } else {
    delete process.env.DAILY_LESSON_CACHE_DIR;
  }

  if (previousGeminiKey) {
    process.env.GEMINI_API_KEY = previousGeminiKey;
  }

  await rm(baseDir, { force: true, recursive: true });
});
