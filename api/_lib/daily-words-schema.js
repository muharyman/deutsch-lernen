const MODEL = 'gemini-2.5-flash-lite';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const LEVELS = new Set(['A1', 'A2', 'B1', 'B2']);

function extractJsonObject(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error('Gemini tidak mengembalikan JSON yang valid.');
  }

  return JSON.parse(match[0]);
}

function normalizeWord(input, level) {
  return {
    word: String(input?.word ?? '').trim(),
    article: input?.article ? String(input.article).trim() : undefined,
    meaning_id: String(input?.meaning_id ?? '').trim(),
    example_de: String(input?.example_de ?? '').trim(),
    example_id: String(input?.example_id ?? '').trim(),
    level,
  };
}

export function isValidLevel(value) {
  return LEVELS.has(value);
}

export function validateWords(payload, expectedDate, expectedLevel) {
  const words = Array.isArray(payload?.words)
    ? payload.words.map((word) => normalizeWord(word, expectedLevel))
    : [];

  if (words.length !== 3) {
    throw new Error('Gemini harus mengembalikan tepat 3 kata harian.');
  }

  for (const word of words) {
    if (!word.word || !word.meaning_id || !word.example_de || !word.example_id) {
      throw new Error('Gemini mengembalikan kata harian yang tidak lengkap.');
    }
  }

  return {
    date: String(payload?.date ?? '').trim() || expectedDate,
    level: expectedLevel,
    words,
    source: 'gemini',
    cachedAt: new Date().toISOString(),
  };
}

export async function fetchDailyWordsFromGemini(apiKey, date, level) {
  if (!isValidLevel(level)) {
    throw new Error('Level daily words tidak valid.');
  }

  const prompt = `
Buat 3 kata harian bahasa Jerman untuk tanggal ${date} khusus level ${level}.

Kebutuhan:
- Tepat 3 kata berbeda.
- Semua penjelasan dalam bahasa Indonesia.
- Contoh kalimat harus natural dalam bahasa Jerman.
- Tingkat kesulitan harus konsisten untuk level ${level}.
- Untuk kata benda, isi article dengan der/die/das.
- Untuk selain kata benda, kosongkan article.
- Hindari kata yang terlalu mirip satu sama lain.

Balas HANYA JSON valid tanpa markdown, tanpa penjelasan tambahan, dengan struktur persis:
{
  "date": "${date}",
  "words": [
    {
      "word": "kata jerman",
      "article": "der/die/das atau kosong",
      "meaning_id": "arti Indonesia",
      "example_de": "contoh kalimat Jerman",
      "example_id": "terjemahan contoh"
    }
  ]
}`.trim();

  const res = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Gemini tidak mengembalikan konten.');
  }

  const payload = extractJsonObject(text);
  return validateWords(payload, date, level);
}
