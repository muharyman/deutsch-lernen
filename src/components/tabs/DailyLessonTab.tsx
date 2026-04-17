import { useState } from 'react';
import type { DailyLessonPayload, PracticeQuestion } from '../../types';

interface DailyLessonTabProps {
  lesson: DailyLessonPayload | null;
  loading: boolean;
  source: 'cache' | 'fresh_gemini' | 'fallback';
  error: string | null;
  todayDone: boolean;
  onToggleDone: () => void;
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function PracticeCard({
  question,
  questionKey,
}: {
  question: PracticeQuestion;
  questionKey: string;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [checked, setChecked] = useState(false);

  const normalizedAnswer = normalizeText(question.answer);
  const shortAnswerCorrect =
    question.type === 'short_answer' &&
    checked &&
    normalizeText(typedAnswer).includes(normalizedAnswer);

  return (
    <div className="practice-card">
      <div className="practice-prompt">{question.prompt}</div>

      {question.type === 'multiple_choice' ? (
        <div className="practice-options" role="group" aria-label={question.prompt}>
          {(question.choices ?? []).map((choice) => {
            const isSelected = selectedChoice === choice;
            const isCorrect = choice === question.answer;
            const showState = checked && (isSelected || isCorrect);

            return (
              <button
                key={`${questionKey}-${choice}`}
                type="button"
                className={`practice-option ${
                  showState ? (isCorrect ? 'correct' : 'wrong') : isSelected ? 'selected' : ''
                }`}
                onClick={() => {
                  setSelectedChoice(choice);
                  setChecked(true);
                }}
              >
                {choice}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="practice-short-answer">
          <label className="sr-only" htmlFor={questionKey}>
            {question.prompt}
          </label>
          <input
            id={questionKey}
            className="settings-input"
            value={typedAnswer}
            onChange={(event) => setTypedAnswer(event.target.value)}
            placeholder="Tulis jawabanmu"
          />
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setChecked(true)}
          >
            Cek jawaban
          </button>
        </div>
      )}

      {checked ? (
        <div
          className={`practice-feedback ${
            question.type === 'short_answer'
              ? shortAnswerCorrect
                ? 'correct'
                : 'wrong'
              : ''
          }`}
        >
          <div className="practice-answer">Jawaban: {question.answer}</div>
          <div>{question.explanation}</div>
        </div>
      ) : null}
    </div>
  );
}

export default function DailyLessonTab({
  lesson,
  loading,
  source,
  error,
  todayDone,
  onToggleDone,
}: DailyLessonTabProps) {
  const [activeSection, setActiveSection] = useState<'conversations' | 'words'>('conversations');
  const [activeConversationIndex, setActiveConversationIndex] = useState(0);
  const [openWords, setOpenWords] = useState<Record<number, boolean>>({});
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});

  if (loading) {
    return (
      <section className="card centered-card" aria-live="polite">
        <div className="loading-spinner" />
        <p className="text-muted">Menyiapkan latihan harian...</p>
      </section>
    );
  }

  if (!lesson) {
    return (
      <section className="card">
        <p role="alert">Materi harian belum tersedia.</p>
      </section>
    );
  }

  const activeConversation = lesson.conversations[activeConversationIndex];

  return (
    <section className="animate-fade">
      <article className="card lesson-summary">
        <div className="lesson-summary-top">
          <div>
            <div className="section-eyebrow">Tema Hari Ini</div>
            <h2 className="lesson-theme">{lesson.theme}</h2>
          </div>
          <span className={`source-pill ${source === 'fallback' ? 'static' : 'gemini'}`}>
            {source === 'fresh_gemini'
              ? 'Fresh Gemini'
              : source === 'cache'
                ? 'Shared cache'
                : 'Fallback lokal'}
          </span>
        </div>
        <p className="lesson-summary-copy">
          Fokus ke satu percakapan dulu, lalu ulangi pola dan kosakatanya sampai lebih natural.
        </p>
        {error ? (
          <p className="daily-error" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className={`primary-btn ${todayDone ? 'done' : ''}`}
          onClick={onToggleDone}
        >
          {todayDone ? 'Batalkan selesai hari ini' : 'Selesai hari ini'}
        </button>
      </article>

      <div className="card lesson-switcher" role="tablist" aria-label="Pilih konten hari ini">
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'conversations'}
          className={`lesson-switch-btn ${activeSection === 'conversations' ? 'active' : ''}`}
          onClick={() => setActiveSection('conversations')}
        >
          Percakapan
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'words'}
          className={`lesson-switch-btn ${activeSection === 'words' ? 'active' : ''}`}
          onClick={() => setActiveSection('words')}
        >
          Kata Hari Ini
        </button>
      </div>

      {activeSection === 'conversations' ? (
        <section className="lesson-section" aria-labelledby="conversation-heading">
          <div className="section-heading-row">
            <h2 id="conversation-heading" className="section-title">Latihan Percakapan</h2>
            <span className="section-meta">Satu percakapan per waktu agar tidak terlalu panjang</span>
          </div>

          <div className="card conversation-tabs-card">
            <div className="conversation-tablist" role="tablist" aria-label="Pilih percakapan">
              {lesson.conversations.map((_, index) => (
                <button
                  key={`${lesson.date}-conversation-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={activeConversationIndex === index}
                  className={`conversation-tab-btn ${activeConversationIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveConversationIndex(index)}
                >
                  {`Percakapan ${index + 1}`}
                </button>
              ))}
            </div>
          </div>

          <article
            key={`${lesson.date}-conversation-${activeConversationIndex}`}
            className="card conversation-card"
          >
            <div className="conversation-header">
              <div>
                <div className="conversation-kicker">{`Percakapan ${activeConversationIndex + 1}`}</div>
                <h3 className="conversation-title">{activeConversation.title}</h3>
                <p className="conversation-situation">{activeConversation.situation}</p>
              </div>
              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setShowTranslation((prev) => ({
                    ...prev,
                    [activeConversationIndex]: !prev[activeConversationIndex],
                  }))
                }
              >
                {showTranslation[activeConversationIndex]
                  ? 'Sembunyikan terjemahan'
                  : 'Tampilkan terjemahan'}
              </button>
            </div>

            <div className="dialog-chat">
              {activeConversation.lines.map((line, lineIndex) => {
                const isPrimarySpeaker = lineIndex % 2 === 0;
                return (
                  <div
                    key={`${activeConversation.title}-${lineIndex}`}
                    className={`dialog-line ${isPrimarySpeaker ? 'other' : 'user'}`}
                  >
                    <div className="dialog-role">{line.role}</div>
                    <div className={`dialog-bubble ${isPrimarySpeaker ? 'other' : 'user'}`}>
                      {line.de}
                    </div>
                    {showTranslation[activeConversationIndex] ? (
                      <div className="dialog-translation">{line.id}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="detail-grid">
              <section className="detail-panel">
                <h4 className="detail-title">Fokus Tata Bahasa</h4>
                {activeConversation.grammarNotes.map((note, noteIndex) => (
                  <div key={`${activeConversation.title}-grammar-${noteIndex}`} className="detail-item">
                    <div className="detail-item-title">{note.title}</div>
                    <p>{note.explanation}</p>
                    {note.pattern ? <code className="inline-code">{note.pattern}</code> : null}
                    {note.examples?.length ? (
                      <ul className="detail-list">
                        {note.examples.map((example) => (
                          <li key={example}>{example}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </section>

              <section className="detail-panel">
                <h4 className="detail-title">Ekspresi Penting</h4>
                <ul className="expression-list">
                  {activeConversation.keyExpressions.map((item) => (
                    <li key={item.de} className="expression-item">
                      <span className="font-semibold">{item.de}</span>
                      <span className="text-muted">{item.id}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="detail-panel practice-panel">
              <h4 className="detail-title">Latihan Singkat</h4>
              {activeConversation.practice.map((question, questionIndex) => (
                <PracticeCard
                  key={`${activeConversation.title}-practice-${questionIndex}`}
                  question={question}
                  questionKey={`${activeConversation.title}-${questionIndex}`}
                />
              ))}
            </section>
          </article>
        </section>
      ) : (
        <section className="lesson-section" aria-labelledby="word-heading">
          <div className="section-heading-row">
            <h2 id="word-heading" className="section-title">3 Kata Hari Ini</h2>
            <span className="section-meta">Arti, contoh, dan cara pakainya</span>
          </div>

          <div className="word-grid">
            {lesson.words.map((word, index) => {
              const isOpen = Boolean(openWords[index]);
              return (
                <article key={`${lesson.date}-word-${index}`} className="card word-card">
                  <button
                    type="button"
                    className="word-toggle"
                    onClick={() =>
                      setOpenWords((prev) => ({
                        ...prev,
                        [index]: !prev[index],
                      }))
                    }
                    aria-expanded={isOpen}
                  >
                    <div>
                      <div className="word-heading">
                        {word.article ? <span className="daily-word-article">{word.article}</span> : null}
                        <span className="daily-word-text">{word.word}</span>
                      </div>
                      <div className="word-toggle-hint">
                        {isOpen ? 'Sembunyikan detail' : 'Lihat arti dan contoh'}
                      </div>
                    </div>
                    <span className="chevron">{isOpen ? '-' : '+'}</span>
                  </button>

                  {isOpen ? (
                    <div className="word-body">
                      <div className="daily-word-meaning">{word.meaning_id}</div>
                      <div className="daily-word-example">
                        <div className="daily-word-example-de">{word.example_de}</div>
                        <div className="daily-word-example-id">{word.example_id}</div>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}
