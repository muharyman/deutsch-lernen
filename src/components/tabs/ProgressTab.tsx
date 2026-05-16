import type { Level, MaterialLesson } from '../../types';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];

interface LevelSummary {
  level: Level;
  total: number;
  read: number;
  practiced: number;
  completed: number;
  pct: number;
}

interface ProgressTabProps {
  overallPct: number;
  completedTotal: number;
  totalLessons: number;
  nextLesson: MaterialLesson | null;
  getLevelSummary: (level: Level) => LevelSummary;
}

export default function ProgressTab({
  overallPct,
  completedTotal,
  totalLessons,
  nextLesson,
  getLevelSummary,
}: ProgressTabProps) {
  return (
    <section className="animate-fade">
      <article className="card tracker-summary">
        <div className="section-eyebrow">Progress materi</div>
        <h2 className="section-title">Peta belajar A1-B2</h2>
        <p className="tracker-copy">
          Lesson dihitung selesai jika sudah ditandai dibaca dan latihan.
        </p>
        <div className="tracker-summary-grid">
          <div className="tracker-stat">
            <span className="tracker-stat-value">{overallPct}%</span>
            <span className="tracker-stat-label">materi selesai</span>
          </div>
          <div className="tracker-stat">
            <span className="tracker-stat-value">{completedTotal}/{totalLessons}</span>
            <span className="tracker-stat-label">lesson lengkap</span>
          </div>
        </div>
      </article>

      {nextLesson ? (
        <article className="card">
          <div className="section-heading-row">
            <h2 className="section-title">Berikutnya</h2>
            <span className="section-meta">{nextLesson.level}</span>
          </div>
          <h3 className="home-lesson-theme">{nextLesson.title}</h3>
          <p className="tracker-copy">{nextLesson.summary}</p>
        </article>
      ) : null}

      <article className="card">
        <div className="section-heading-row">
          <h2 className="section-title">Per level</h2>
          <span className="section-meta">Baca + latihan</span>
        </div>

        <div className="level-progress-list">
          {LEVELS.map((level) => {
            const summary = getLevelSummary(level);

            return (
              <section key={level} className="level-progress-item">
                <div className="level-progress-header">
                  <div>
                    <h3>{level}</h3>
                    <p className="text-muted">
                      {summary.completed} selesai, {summary.read} dibaca, {summary.practiced} latihan
                    </p>
                  </div>
                  <span className="tracker-stat-value small">{summary.pct}%</span>
                </div>
                <div className="chapter-progress" aria-label={`Progress ${level} ${summary.pct} persen`}>
                  <span className="chapter-progress-fill" style={{ width: `${summary.pct}%` }} />
                </div>
              </section>
            );
          })}
        </div>
      </article>
    </section>
  );
}
