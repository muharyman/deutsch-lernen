import { useState } from 'react';
import type { Dialog } from '../../types';

interface DialogTabProps {
  dialogs: Dialog[];
}

export default function DialogTab({ dialogs }: DialogTabProps) {
  const [dlgIdx, setDlgIdx] = useState(0);
  const [showTrans, setShowTrans] = useState<Record<number, boolean>>({});

  if (!dialogs.length) return <div className="card">Tidak ada dialog tersedia.</div>;

  const d = dialogs[dlgIdx];

  const toggleTrans = (i: number) => {
    setShowTrans(s => ({ ...s, [i]: !s[i] }));
  };

  return (
    <div className="animate-fade">
      <div className="week-selector">
        {dialogs.map((dlg, i) => (
          <button
            key={i}
            className={`week-btn ${dlgIdx === i ? 'active' : ''}`}
            onClick={() => { setDlgIdx(i); setShowTrans({}); }}
          >
            M{dlg.week}
          </button>
        ))}
      </div>

      <div className="card dialog-header">
        <div className="dialog-title">{d.title}</div>
        <div className="dialog-scene">{d.scene}</div>
      </div>

      <div className="card dialog-chat">
        {d.lines.map((l, i) => {
          const isUser = l.role.startsWith('Du');
          return (
            <div key={i} className={`dialog-line ${isUser ? 'user' : 'other'}`}>
              <div className="dialog-role">{l.role}</div>
              <div className={`dialog-bubble ${isUser ? 'user' : 'other'}`}>
                {l.de}
              </div>
              <button
                className="dialog-trans-btn"
                onClick={() => toggleTrans(i)}
              >
                {showTrans[i] ? '▲ Sembunyikan' : '▼ Terjemahan'}
              </button>
              {showTrans[i] && (
                <div className="dialog-translation">{l.id}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card-elevated dialog-vocab">
        <div className="dialog-vocab-title">Kosakata Kunci</div>
        {d.vocab.map((v, i) => (
          <div key={i} className="dialog-vocab-item">
            <span className="font-semibold">{v.de}</span>
            <span className="text-muted"> = {v.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
