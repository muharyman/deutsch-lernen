import { getDailyLesson, getTodayDateKey, isValidDateKey } from './_lib/daily-lesson-service.js';

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
  const date = typeof dateParam === 'string' && dateParam.trim() ? dateParam.trim() : getTodayDateKey();

  if (!isValidDateKey(date)) {
    return json(res, 400, { error: 'Parameter date harus berformat YYYY-MM-DD.' });
  }

  try {
    const lesson = await getDailyLesson({ date });
    return json(res, 200, {
      date: lesson.date,
      theme: lesson.theme,
      payload: lesson.payload,
      source: lesson.source,
      createdAt: lesson.createdAt,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Daily lesson gagal dibuat di server.';

    return json(res, 502, {
      error: message,
      source: 'fallback',
    });
  }
}

