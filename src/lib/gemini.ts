import type { DailyWord, Level } from '../types';

const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function fetchDailyWordsFromGemini(
  level: Level,
  apiKey: string
): Promise<DailyWord[]> {
  const prompt = `Berikan tepat 3 kata bahasa Jerman level ${level} CEFR untuk belajar hari ini.
Format respons HANYA JSON array berikut, tanpa teks lain:
[
  {
    "word": "kata dalam bahasa Jerman",
    "article": "der/die/das (kosongkan jika bukan kata benda)",
    "meaning_id": "arti dalam bahasa Indonesia",
    "example_de": "contoh kalimat dalam bahasa Jerman",
    "example_id": "terjemahan contoh kalimat dalam bahasa Indonesia",
    "level": "${level}"
  }
]`;

  const res = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
    }),
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);

  const data = await res.json();
  const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No JSON found in Gemini response');
  return JSON.parse(jsonMatch[0]) as DailyWord[];
}
