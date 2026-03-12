import type { Level } from '../../types';

interface HeaderProps {
  level: Level;
  pct: number;
  doneDays: number;
  totalDays: number;
  onLevelChange: (level: Level) => void;
}

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];

export default function Header({ level, pct, doneDays, totalDays, onLevelChange }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-top">
        <div>
          <div className="header-subtitle">BELAJAR BAHASA JERMAN</div>
          <div className="header-title">Deutsch Lernen {level}</div>
        </div>
        <div className="header-stats">
          <div className="header-pct">{pct}%</div>
          <div className="header-days">{doneDays}/{totalDays} hari</div>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="level-selector">
        {LEVELS.map(l => (
          <button
            key={l}
            className={`level-btn ${level === l ? 'active' : ''}`}
            onClick={() => onLevelChange(l)}
          >
            {l}
          </button>
        ))}
      </div>
    </header>
  );
}
