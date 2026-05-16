import type { DailyLessonPayload } from '../../types';
import type { MaterialLesson } from '../../types';

interface HomeTabProps {
  activeDate: string;
  lesson: DailyLessonPayload | null;
  loading: boolean;
  error: string | null;
  pct: number;
  completedDays: number;
  streak: number;
  todayDone: boolean;
  materialPct: number;
  nextLesson: MaterialLesson | null;
}

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${date}T12:00:00`));
}

export default function HomeTab({
  activeDate,
  lesson,
  loading,
  error,
  pct,
  completedDays,
  streak,
  todayDone,
  materialPct,
  nextLesson,
}: HomeTabProps) {
  return (
    <section className="animate-fade">
      <article className="card home-hero">
        <div className="section-eyebrow">Home</div>
        <h2 className="section-title">Ringkasan progres belajarmu</h2>
        <p className="tracker-copy">
          {todayDone
            ? 'Hari ini sudah ditandai selesai. Lanjutkan review singkat atau buka materi tambahan.'
            : 'Hari ini belum selesai. Buka halaman Today untuk menyelesaikan lesson harianmu.'}
        </p>
        <div className="home-status-row">
          <span className={`home-status-pill ${todayDone ? 'done' : 'pending'}`}>
            {todayDone ? 'Selesai hari ini' : 'Belum selesai'}
          </span>
          <span className="home-status-date">{formatLongDate(activeDate)}</span>
        </div>
      </article>

      <article className="card">
        <div className="section-heading-row">
          <h2 className="section-title">Progress tracker</h2>
        </div>
        <div className="tracker-summary-grid">
          <div className="tracker-stat">
            <span className="tracker-stat-value">{pct}%</span>
            <span className="tracker-stat-label">konsistensi 14 hari</span>
          </div>
          <div className="tracker-stat">
            <span className="tracker-stat-value">{streak}</span>
            <span className="tracker-stat-label">streak aktif</span>
          </div>
          <div className="tracker-stat">
            <span className="tracker-stat-value">{completedDays}</span>
            <span className="tracker-stat-label">total hari selesai</span>
          </div>
          <div className="tracker-stat">
            <span className="tracker-stat-value">{materialPct}%</span>
            <span className="tracker-stat-label">materi A1-B2</span>
          </div>
        </div>
      </article>

      {nextLesson ? (
        <article className="card">
          <div className="section-heading-row">
            <h2 className="section-title">Materi berikutnya</h2>
            <span className="section-meta">{nextLesson.level}</span>
          </div>
          <div className="home-lesson-preview">
            <h3 className="home-lesson-theme">{nextLesson.title}</h3>
            <p className="tracker-copy">{nextLesson.summary}</p>
          </div>
        </article>
      ) : null}

      <article className="card">
        <div className="section-heading-row">
          <h2 className="section-title">Tema hari ini</h2>
          <span className="section-meta">Preview lesson</span>
        </div>
        {loading ? (
          <p className="text-muted" aria-live="polite">
            Menyiapkan rangkuman materi hari ini...
          </p>
        ) : null}
        {!loading && error ? (
          <p className="daily-error" role="alert">
            {error}
          </p>
        ) : null}
        {!loading && !error && lesson ? (
          <div className="home-lesson-preview">
            <h3 className="home-lesson-theme">{lesson.theme}</h3>
            <p className="tracker-copy">
              {lesson.conversations.length} percakapan dan {lesson.words.length} kata untuk latihan
              hari ini.
            </p>
          </div>
        ) : null}
        {!loading && !error && !lesson ? (
          <p className="text-muted">Lesson harian belum tersedia.</p>
        ) : null}
      </article>
    </section>
  );
}
