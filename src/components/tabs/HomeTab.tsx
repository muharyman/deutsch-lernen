import type { DailyLessonPayload, DailyTrackerState } from '../../types';

interface HomeTabProps {
  activeDate: string;
  lesson: DailyLessonPayload | null;
  loading: boolean;
  error: string | null;
  tracker: DailyTrackerState;
  recentDates: string[];
  pct: number;
  doneInWindow: number;
  windowDays: number;
  completedDays: number;
  streak: number;
  todayDone: boolean;
  onToggleDate: (date: string) => void;
}

function formatDay(date: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(`${date}T12:00:00`));
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
  tracker,
  recentDates,
  pct,
  doneInWindow,
  windowDays,
  completedDays,
  streak,
  todayDone,
  onToggleDate,
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
          <span className="section-meta">{doneInWindow}/{windowDays} hari aktif</span>
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
            <span className="tracker-stat-value">{todayDone ? 'On' : 'Off'}</span>
            <span className="tracker-stat-label">status hari ini</span>
          </div>
        </div>
      </article>

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

      <article className="card">
        <div className="section-heading-row">
          <h2 className="section-title">Tracker singkat</h2>
          <span className="section-meta">Tekan untuk menandai</span>
        </div>
        <div className="tracker-calendar home-tracker-calendar">
          {recentDates.map((date) => {
            const done = Boolean(tracker[date]);

            return (
              <button
                key={date}
                type="button"
                className={`tracker-date-btn ${done ? 'done' : ''}`}
                onClick={() => onToggleDate(date)}
                aria-pressed={done}
                aria-label={`${formatDay(date)} ${done ? 'sudah selesai' : 'belum selesai'}`}
              >
                <span className="tracker-date-number">
                  {new Date(`${date}T12:00:00`).getDate()}
                </span>
                <span className="tracker-date-label">{formatDay(date)}</span>
              </button>
            );
          })}
        </div>
      </article>
    </section>
  );
}
