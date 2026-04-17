import type { DailyTrackerState } from '../../types';

interface TrackerTabProps {
  tracker: DailyTrackerState;
  recentDates: string[];
  streak: number;
  completedDays: number;
  onToggleDate: (date: string) => void;
}

function formatDay(date: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(`${date}T12:00:00`));
}

export default function TrackerTab({
  tracker,
  recentDates,
  streak,
  completedDays,
  onToggleDate,
}: TrackerTabProps) {
  return (
    <section className="animate-fade">
      <article className="card tracker-summary">
        <h2 className="section-title">Tracker Harian</h2>
        <p className="tracker-copy">
          Tandai hari yang benar-benar kamu selesaikan. Fokusnya sederhana: konsisten setiap hari.
        </p>
        <div className="tracker-summary-grid">
          <div className="tracker-stat">
            <span className="tracker-stat-value">{completedDays}</span>
            <span className="tracker-stat-label">total hari selesai</span>
          </div>
          <div className="tracker-stat">
            <span className="tracker-stat-value">{streak}</span>
            <span className="tracker-stat-label">streak aktif</span>
          </div>
        </div>
      </article>

      <article className="card">
        <div className="section-heading-row">
          <h2 className="section-title">28 Hari Terakhir</h2>
          <span className="section-meta">Tekan untuk menandai</span>
        </div>
        <div className="tracker-calendar">
          {recentDates.map((date) => {
            const done = Boolean(tracker[date]);

            return (
              <button
                key={date}
                type="button"
                className={`tracker-date-btn ${done ? 'done' : ''}`}
                onClick={() => onToggleDate(date)}
                aria-pressed={done}
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
