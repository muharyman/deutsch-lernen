interface HeaderProps {
  activeDate: string;
  pct: number;
  doneInWindow: number;
  windowDays: number;
  completedDays: number;
  streak: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${date}T12:00:00`));
}

export default function Header({
  activeDate,
  pct,
  doneInWindow,
  windowDays,
  completedDays,
  streak,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-top">
        <div>
          <div className="header-subtitle">DAILY GERMAN PRACTICE</div>
          <h1 className="header-title">Deutsch Heute</h1>
          <p className="header-date">{formatDate(activeDate)}</p>
        </div>
        <div className="header-side">
          <button
            type="button"
            className="header-theme-btn"
            onClick={onToggleTheme}
            aria-label={`Ganti ke tema ${theme === 'dark' ? 'terang' : 'gelap'}`}
            title={`Tema ${theme === 'dark' ? 'gelap' : 'terang'}`}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
          <div className="header-stats">
            <div className="header-pct">{pct}%</div>
            <div className="header-days">{doneInWindow}/{windowDays} hari terakhir</div>
          </div>
        </div>
      </div>

      <div className="progress-bar" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="header-meta">
        <span>Total selesai: {completedDays} hari</span>
        <span>Streak: {streak} hari</span>
      </div>
    </header>
  );
}
