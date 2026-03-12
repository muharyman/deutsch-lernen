import { useState } from 'react';
import type { Level } from '../../types';
import { useDailyWords } from '../../hooks/useDailyWords';

interface DailyWordTabProps {
  level: Level;
  geminiApiKey?: string;
}

export default function DailyWordTab({ level, geminiApiKey }: DailyWordTabProps) {
  const { words, loading, source, error } = useDailyWords(level, geminiApiKey);
  const [revealedIdx, setRevealedIdx] = useState<Set<number>>(new Set());

  const toggleReveal = (i: number) => {
    setRevealedIdx(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="card text-center" style={{ padding: '2rem' }}>
        <div className="loading-spinner" />
        <p className="text-muted" style={{ marginTop: '1rem' }}>Memuat kata hari ini...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade">
      <div className="card daily-header">
        <div className="daily-title">Kata Hari Ini</div>
        <div className="daily-subtitle">
          {source === 'gemini' ? '✨ Dihasilkan oleh AI' : '📚 Dari koleksi statis'}
          {' '} — Level {level}
        </div>
        {error && <div className="daily-error">{error}</div>}
      </div>

      {words.map((w, i) => {
        const revealed = revealedIdx.has(i);
        return (
          <div
            key={i}
            className="card daily-word-card"
            onClick={() => toggleReveal(i)}
          >
            <div className="daily-word-top">
              <div className="daily-word-main">
                {w.article && <span className="daily-word-article">{w.article} </span>}
                <span className="daily-word-text">{w.word}</span>
              </div>
              <span className={`badge badge-${level.toLowerCase()}`}>{level}</span>
            </div>
            {revealed ? (
              <div className="daily-word-details animate-fade">
                <div className="daily-word-meaning">{w.meaning_id}</div>
                <div className="daily-word-example">
                  <div className="daily-word-example-de">"{w.example_de}"</div>
                  <div className="daily-word-example-id">"{w.example_id}"</div>
                </div>
              </div>
            ) : (
              <div className="daily-word-tap">Ketuk untuk lihat arti & contoh</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
