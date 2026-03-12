import type { Week, TrackerState } from '../../types';

interface TrackerTabProps {
  weeks: Week[];
  tracker: TrackerState;
  toggleDay: (weekNum: number, dayIdx: number) => void;
  weekDone: (weekNum: number) => number;
}

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export default function TrackerTab({ weeks, tracker, toggleDay, weekDone }: TrackerTabProps) {
  return (
    <div className="animate-fade">
      <div className="tracker-grid">
        {weeks.map(({ num, theme }) => {
          const done = weekDone(num);
          const wpct = Math.round((done / 7) * 100);
          return (
            <div key={num} className="card tracker-week">
              <div className="tracker-week-header">
                <div>
                  <span className="tracker-week-num">Minggu {num}</span>
                  <span className="tracker-week-theme">{theme}</span>
                </div>
                <span className={`tracker-week-status ${wpct === 100 ? 'complete' : ''}`}>
                  {done}/7 {wpct === 100 ? '✅' : ''}
                </span>
              </div>
              <div className="tracker-progress">
                <div
                  className={`tracker-progress-fill ${wpct === 100 ? 'complete' : ''}`}
                  style={{ width: `${wpct}%` }}
                />
              </div>
              <div className="tracker-days">
                {DAYS.map((d, i) => (
                  <button
                    key={d}
                    className={`tracker-day-btn ${tracker[num]?.[i] ? 'done' : ''}`}
                    onClick={() => toggleDay(num, i)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="tracker-hint">Tekan tombol hari untuk menandai selesai ✅</p>
    </div>
  );
}
