import type { Week, DayPlan, TrackerState } from '../../types';
import { useState } from 'react';

interface PlanTabProps {
  weeks: Week[];
  plans: Record<number, DayPlan[]>;
  tracker: TrackerState;
  toggleDay: (weekNum: number, dayIdx: number) => void;
}

export default function PlanTab({ weeks, plans, tracker, toggleDay }: PlanTabProps) {
  const [activeWeek, setActiveWeek] = useState(1);

  const currentWeek = weeks.find(w => w.num === activeWeek) ?? weeks[0];
  const weekPlans = plans[activeWeek] ?? [];

  return (
    <div className="animate-fade">
      <div className="week-selector">
        {weeks.map(({ num }) => (
          <button
            key={num}
            className={`week-btn ${activeWeek === num ? 'active' : ''}`}
            onClick={() => setActiveWeek(num)}
          >
            M{num}
          </button>
        ))}
      </div>

      <div className="card plan-header">
        <div className="plan-title">
          Minggu {currentWeek.num}: {currentWeek.theme}
        </div>
        <div className="plan-subtitle">Target waktu: ~1 jam/hari</div>
      </div>

      {weekPlans.map((d, i) => (
        <div key={i} className="card plan-day">
          <div className="plan-day-header">
            <span className="plan-day-badge">{d.day}</span>
            <span className="text-muted" style={{ fontSize: '0.8rem' }}>{d.time}</span>
            <button
              className={`plan-mark-btn ${tracker[activeWeek]?.[i] ? 'done' : ''}`}
              onClick={() => toggleDay(activeWeek, i)}
            >
              {tracker[activeWeek]?.[i] ? '✅ Selesai' : 'Tandai'}
            </button>
          </div>
          {d.tasks.map((t, j) => (
            <div key={j} className="plan-task">
              {t}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
