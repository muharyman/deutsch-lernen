import { getDailyWords, getTodayDateKey, isValidDateKey } from './_lib/daily-words-service.js';
import { isValidLevel } from './_lib/daily-words-schema.js';

export const config = {
  maxDuration: 30,
};

function json(res, status, body) {
  res.status(status);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.send(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  const dateParam = Array.isArray(req.query.date) ? req.query.date[0] : req.query.date;
  const levelParam = Array.isArray(req.query.level) ? req.query.level[0] : req.query.level;
  const date = typeof dateParam === 'string' && dateParam.trim() ? dateParam.trim() : getTodayDateKey();
  const level = typeof levelParam === 'string' ? levelParam.trim().toUpperCase() : '';

  if (!isValidDateKey(date)) {
    return json(res, 400, { error: 'Parameter date harus berformat YYYY-MM-DD.' });
  }

  if (!isValidLevel(level)) {
    return json(res, 400, { error: 'Parameter level harus salah satu dari A1, A2, B1, atau B2.' });
  }

  try {
    const words = await getDailyWords({ date, level });
    return json(res, 200, {
      date: words.date,
      level: words.level,
      words: words.words,
      source: words.source,
      createdAt: words.createdAt,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Daily words gagal dibuat di server.';

    return json(res, 502, {
      error: message,
      source: 'static',
    });
  }
}
