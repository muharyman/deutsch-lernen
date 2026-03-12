import { useState } from 'react';
import type { Level } from '../../types';
import { GRAMMAR_TIPS } from '../../data/resources';

interface GrammarTabProps {
  level: Level;
}

const LEVEL_ORDER: Record<string, number> = { A1: 0, A2: 1, B1: 2, B2: 3 };

export default function GrammarTab({ level }: GrammarTabProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const lvl = LEVEL_ORDER[level] ?? 0;
  const currentLevelTips = GRAMMAR_TIPS.filter(t => t.level === level);
  const otherTips = GRAMMAR_TIPS.filter(t => t.level !== level && (LEVEL_ORDER[t.level] ?? 0) < lvl);

  return (
    <div className="animate-fade">
      <div className="card grammar-section">
        <div className="grammar-section-title">Grammar {level}</div>
        {currentLevelTips.length === 0 && (
          <p className="text-muted" style={{ padding: '0.5rem 0' }}>
            Tidak ada grammar tips khusus untuk level ini.
          </p>
        )}
        {currentLevelTips.map((tip, i) => (
          <div
            key={i}
            className={`grammar-card ${expanded === i ? 'expanded' : ''}`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="grammar-card-header">
              <span className="grammar-card-title">{tip.title}</span>
              <span className={`badge badge-${level.toLowerCase()}`}>{tip.level}</span>
            </div>
            {expanded === i && (
              <div className="grammar-card-content animate-fade">
                {tip.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {otherTips.length > 0 && (
        <div className="card grammar-section" style={{ marginTop: '1rem' }}>
          <div className="grammar-section-title">Review Grammar Sebelumnya</div>
          {otherTips.map((tip, i) => (
            <div
              key={i}
              className={`grammar-card ${expanded === i + 100 ? 'expanded' : ''}`}
              onClick={() => setExpanded(expanded === i + 100 ? null : i + 100)}
            >
              <div className="grammar-card-header">
                <span className="grammar-card-title">{tip.title}</span>
                <span className={`badge badge-${tip.level.toLowerCase()}`}>{tip.level}</span>
              </div>
              {expanded === i + 100 && (
                <div className="grammar-card-content animate-fade">
                  {tip.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="card grammar-section" style={{ marginTop: '1rem' }}>
        <div className="grammar-section-title">Jadwal 1 Jam Optimal</div>
        {[
          ['0–15 mnt', 'Grammar baru atau review'],
          ['15–35 mnt', 'Kosakata baru (Flashcard) atau Dialog'],
          ['35–50 mnt', 'Listening atau Speaking practice'],
          ['50–60 mnt', 'Tulis 3–5 kalimat atau Anki review'],
        ].map(([time, task], i) => (
          <div key={i} className="grammar-schedule-item">
            <span className="grammar-schedule-time">{time}</span>
            <span>{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
