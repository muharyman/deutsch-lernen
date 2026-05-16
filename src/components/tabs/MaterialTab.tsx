import { useState } from 'react';
import type { Level, MaterialProgressState } from '../../types';
import { getMaterialChapters } from '../../data/curriculum';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];

interface MaterialTabProps {
  progress: MaterialProgressState;
  onSetLessonStatus: (lessonId: string, field: 'read' | 'practiced', done: boolean) => void;
}

function getChapterProgress(chapter: ReturnType<typeof getMaterialChapters>[number], progress: MaterialProgressState) {
  const completed = chapter.lessons.filter((lesson) => {
    const item = progress[lesson.id];
    return item?.read && item?.practiced;
  }).length;

  return Math.round((completed / chapter.lessons.length) * 100);
}

export default function MaterialTab({ progress, onSetLessonStatus }: MaterialTabProps) {
  const [activeLevel, setActiveLevel] = useState<Level>('A1');
  const chapters = getMaterialChapters(activeLevel);
  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id ?? '');
  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId) ?? chapters[0];
  const activeLesson = activeChapter?.lessons[0];

  function changeLevel(level: Level) {
    const nextChapters = getMaterialChapters(level);
    setActiveLevel(level);
    setActiveChapterId(nextChapters[0]?.id ?? '');
  }

  if (!activeChapter || !activeLesson) {
    return (
      <section className="card">
        <p>Materi belum tersedia.</p>
      </section>
    );
  }

  return (
    <section className="animate-fade">
      <article className="card material-hero">
        <div className="section-eyebrow">Materi terstruktur</div>
        <h2 className="section-title">A1-B2 Deutsch Curriculum</h2>
        <p className="tracker-copy">
          Materi orisinal yang disejajarkan dengan progresi Netzwerk Neu untuk A1-B1, dan CEFR
          umum untuk B2.
        </p>
      </article>

      <div className="card level-selector" role="tablist" aria-label="Pilih level materi">
        {LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            role="tab"
            aria-selected={activeLevel === level}
            className={`level-btn ${activeLevel === level ? 'active' : ''}`}
            onClick={() => changeLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="chapter-list" aria-label={`Daftar bab ${activeLevel}`}>
        {chapters.map((chapter) => {
          const pct = getChapterProgress(chapter, progress);
          const isActive = activeChapter.id === chapter.id;

          return (
            <button
              key={chapter.id}
              type="button"
              className={`chapter-card card ${isActive ? 'active' : ''}`}
              onClick={() => setActiveChapterId(chapter.id)}
              aria-pressed={isActive}
            >
              <span className="chapter-kicker">{`${chapter.level} Kapitel ${chapter.number}`}</span>
              <span className="chapter-title">{chapter.title}</span>
              <span className="chapter-goal">{chapter.goal}</span>
              <span className="chapter-progress" aria-label={`Progress ${pct} persen`}>
                <span className="chapter-progress-fill" style={{ width: `${pct}%` }} />
              </span>
            </button>
          );
        })}
      </div>

      <article className="card material-detail">
        <div className="section-heading-row">
          <div>
            <div className="section-eyebrow">{`${activeChapter.level} Kapitel ${activeChapter.number}`}</div>
            <h2 className="section-title">{activeChapter.title}</h2>
          </div>
          <span className="section-meta">{activeChapter.lessons.length} lesson</span>
        </div>

        <p className="tracker-copy">{activeChapter.goal}</p>

        {activeChapter.lessons.map((lesson) => {
          const item = progress[lesson.id] ?? {};
          const complete = Boolean(item.read && item.practiced);

          return (
            <section key={lesson.id} className={`lesson-block ${complete ? 'complete' : ''}`}>
              <div className="lesson-block-header">
                <div>
                  <h3 className="lesson-block-title">{lesson.title}</h3>
                  <p className="lesson-time">{lesson.minutes} menit</p>
                </div>
                <div className="lesson-actions" role="group" aria-label={`Progress ${lesson.title}`}>
                  <button
                    type="button"
                    className={`secondary-btn compact ${item.read ? 'done' : ''}`}
                    onClick={() => onSetLessonStatus(lesson.id, 'read', !item.read)}
                    aria-pressed={Boolean(item.read)}
                  >
                    {item.read ? 'Sudah dibaca' : 'Tandai baca'}
                  </button>
                  <button
                    type="button"
                    className={`secondary-btn compact ${item.practiced ? 'done' : ''}`}
                    onClick={() => onSetLessonStatus(lesson.id, 'practiced', !item.practiced)}
                    aria-pressed={Boolean(item.practiced)}
                  >
                    {item.practiced ? 'Sudah latihan' : 'Tandai latihan'}
                  </button>
                </div>
              </div>

              <p>{lesson.summary}</p>

              <div className="material-grid">
                <div className="detail-panel">
                  <h4 className="detail-title">Grammar focus</h4>
                  <ul className="detail-list">
                    {lesson.grammarFocus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-panel">
                  <h4 className="detail-title">Redemittel</h4>
                  <ul className="expression-list">
                    {lesson.keyPhrases.map((item) => (
                      <li key={item.de} className="expression-item">
                        <span className="font-semibold">{item.de}</span>
                        <span className="text-muted">{item.id}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="detail-panel">
                <h4 className="detail-title">Kosakata dan contoh</h4>
                <div className="vocab-list">
                  {lesson.vocabulary.map((item) => (
                    <div key={item.de} className="vocab-row">
                      <div>
                        <span className="font-semibold">{item.de}</span>
                        <span className="text-muted"> = {item.id}</span>
                      </div>
                      <div className="vocab-example">{item.example}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-panel">
                <h4 className="detail-title">Latihan</h4>
                <div className="exercise-list">
                  {lesson.exercises.map((exercise, index) => (
                    <div key={`${lesson.id}-exercise-${index}`} className="exercise-item">
                      <div className="exercise-type">{exercise.type.replace('_', ' ')}</div>
                      <div className="practice-prompt">{exercise.prompt}</div>
                      {exercise.choices ? (
                        <ul className="detail-list">
                          {exercise.choices.map((choice) => (
                            <li key={choice}>{choice}</li>
                          ))}
                        </ul>
                      ) : null}
                      {exercise.answer ? <div className="practice-answer">Contoh jawaban: {exercise.answer}</div> : null}
                      <div className="text-muted">{exercise.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </article>
    </section>
  );
}
