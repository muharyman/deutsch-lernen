import type { DailyConversation, DailyLessonPayload, DailyWord, GrammarNote, PracticeQuestion } from '../types';

const MODEL = 'gemini-2.5-flash-lite';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

function extractJsonObject(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error('Gemini tidak mengembalikan JSON yang valid.');
  }

  return JSON.parse(match[0]) as DailyLessonPayload;
}

function normalizeWord(input: DailyWord): DailyWord {
  return {
    word: String(input.word ?? '').trim(),
    article: input.article ? String(input.article).trim() : undefined,
    meaning_id: String(input.meaning_id ?? '').trim(),
    example_de: String(input.example_de ?? '').trim(),
    example_id: String(input.example_id ?? '').trim(),
  };
}

function normalizeGrammarNote(input: GrammarNote): GrammarNote {
  return {
    title: String(input.title ?? '').trim(),
    explanation: String(input.explanation ?? '').trim(),
    pattern: input.pattern ? String(input.pattern).trim() : undefined,
    examples: Array.isArray(input.examples)
      ? input.examples.map((example) => String(example).trim()).filter(Boolean)
      : undefined,
  };
}

function normalizePractice(input: PracticeQuestion): PracticeQuestion {
  return {
    type: input.type === 'short_answer' ? 'short_answer' : 'multiple_choice',
    prompt: String(input.prompt ?? '').trim(),
    choices: Array.isArray(input.choices)
      ? input.choices.map((choice) => String(choice).trim()).filter(Boolean)
      : undefined,
    answer: String(input.answer ?? '').trim(),
    explanation: String(input.explanation ?? '').trim(),
  };
}

function normalizeConversation(input: DailyConversation): DailyConversation {
  return {
    title: String(input.title ?? '').trim(),
    situation: String(input.situation ?? '').trim(),
    lines: Array.isArray(input.lines)
      ? input.lines.map((line) => ({
          role: String(line.role ?? '').trim(),
          de: String(line.de ?? '').trim(),
          id: String(line.id ?? '').trim(),
        }))
      : [],
    grammarNotes: Array.isArray(input.grammarNotes)
      ? input.grammarNotes.map(normalizeGrammarNote)
      : [],
    keyExpressions: Array.isArray(input.keyExpressions)
      ? input.keyExpressions.map((item) => ({
          de: String(item.de ?? '').trim(),
          id: String(item.id ?? '').trim(),
        }))
      : [],
    practice: Array.isArray(input.practice)
      ? input.practice.map(normalizePractice)
      : [],
  };
}

function validateLesson(payload: DailyLessonPayload, expectedDate: string): DailyLessonPayload {
  const conversations = Array.isArray(payload.conversations)
    ? payload.conversations.map(normalizeConversation)
    : [];
  const words = Array.isArray(payload.words) ? payload.words.map(normalizeWord) : [];

  if (conversations.length !== 3) {
    throw new Error('Gemini harus mengembalikan tepat 3 conversation.');
  }

  if (words.length !== 3) {
    throw new Error('Gemini harus mengembalikan tepat 3 kata harian.');
  }

  return {
    date: payload.date?.trim() || expectedDate,
    theme: payload.theme?.trim() || 'Latihan harian bahasa Jerman',
    conversations,
    words,
    source: 'gemini',
    cachedAt: new Date().toISOString(),
  };
}

export async function fetchDailyLessonFromGemini(
  apiKey: string,
  date: string
): Promise<DailyLessonPayload> {
  const prompt = `
Buat materi latihan bahasa Jerman untuk 1 hari tanggal ${date}.

Kebutuhan:
- Tepat 3 conversation berbeda.
- Tepat 3 kata harian berbeda.
- Semua penjelasan dalam bahasa Indonesia.
- Dialog dan contoh kalimat harus dalam bahasa Jerman natural.
- Level campuran ringan-menengah, cocok untuk pembelajar umum.
- Conversation harus praktis untuk situasi sehari-hari.
- Setiap conversation wajib punya:
  - title
  - situation
  - 4 sampai 6 lines
  - 2 grammarNotes
  - 3 keyExpressions
  - 2 practice questions
- Practice question hanya boleh bertipe "multiple_choice" atau "short_answer".
- Untuk multiple_choice, selalu sediakan tepat 3 choices.
- Untuk words, sediakan article jika kata benda; kosongkan jika bukan noun.

Balas HANYA JSON valid tanpa markdown, tanpa penjelasan tambahan, dengan struktur persis:
{
  "date": "${date}",
  "theme": "tema singkat harian",
  "conversations": [
    {
      "title": "judul",
      "situation": "situasi singkat",
      "lines": [
        { "role": "Nama pembicara", "de": "Kalimat Jerman", "id": "Terjemahan Indonesia" }
      ],
      "grammarNotes": [
        {
          "title": "judul grammar",
          "explanation": "penjelasan Indonesia",
          "pattern": "opsional",
          "examples": ["contoh 1", "contoh 2"]
        }
      ],
      "keyExpressions": [
        { "de": "ekspresi Jerman", "id": "arti Indonesia" }
      ],
      "practice": [
        {
          "type": "multiple_choice",
          "prompt": "pertanyaan",
          "choices": ["a", "b", "c"],
          "answer": "jawaban benar",
          "explanation": "penjelasan singkat"
        },
        {
          "type": "short_answer",
          "prompt": "pertanyaan",
          "answer": "jawaban benar",
          "explanation": "penjelasan singkat"
        }
      ]
    }
  ],
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
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Gemini tidak mengembalikan konten.');
  }

  const payload = extractJsonObject(text);
  return validateLesson(payload, date);
}

export async function fetchDailyWordsFromGemini(
  _level: string,
  apiKey: string
): Promise<DailyWord[]> {
  const date = new Date().toISOString().slice(0, 10);
  const lesson = await fetchDailyLessonFromGemini(apiKey, date);
  return lesson.words;
}
