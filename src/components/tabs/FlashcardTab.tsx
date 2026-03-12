import { useState } from 'react';
import type { FlashcardSet } from '../../types';

interface FlashcardTabProps {
  sets: FlashcardSet[];
}

export default function FlashcardTab({ sets }: FlashcardTabProps) {
  const [setIdx, setSetIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentSet = sets[setIdx];
  if (!currentSet) return <div className="card">Tidak ada flashcard tersedia.</div>;

  const cards = currentSet.cards;
  const card = cards[cardIdx];

  const changeSet = (i: number) => {
    setSetIdx(i);
    setCardIdx(0);
    setFlipped(false);
  };

  const prev = () => {
    setCardIdx(i => (i - 1 + cards.length) % cards.length);
    setFlipped(false);
  };

  const next = () => {
    setCardIdx(i => (i + 1) % cards.length);
    setFlipped(false);
  };

  return (
    <div className="animate-fade">
      <select
        className="fc-select"
        value={setIdx}
        onChange={e => changeSet(Number(e.target.value))}
      >
        {sets.map((s, i) => (
          <option key={i} value={i}>{s.label}</option>
        ))}
      </select>

      <div className="flip-card" onClick={() => setFlipped(f => !f)} style={{ height: 200 }}>
        <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
          <div className="flip-card-front card-elevated">
            <div className="fc-hint">JERMAN — ketuk untuk terjemahan</div>
            <div className="fc-word">{card.de}</div>
            {card.example && (
              <div className="fc-example">"{card.example.de}"</div>
            )}
          </div>
          <div className="flip-card-back card-elevated fc-back">
            <div className="fc-hint-back">INDONESIA</div>
            <div className="fc-answer">{card.id}</div>
            <div className="fc-original">{card.de}</div>
            {card.example && (
              <div className="fc-example-back">"{card.example.id}"</div>
            )}
          </div>
        </div>
      </div>

      <div className="fc-nav">
        <button className="fc-nav-btn" onClick={prev}>← Prev</button>
        <div className="fc-counter">{cardIdx + 1} / {cards.length}</div>
        <button className="fc-nav-btn fc-nav-next" onClick={next}>Next →</button>
      </div>

      <div className="card fc-list">
        <div className="fc-list-title">Semua kata — {currentSet.label}</div>
        <div className="fc-list-grid">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`fc-list-item ${cardIdx === i ? 'active' : ''}`}
              onClick={() => { setCardIdx(i); setFlipped(false); }}
            >
              <span className="fc-list-de">{c.de}</span>
              <span className="fc-list-id">– {c.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
