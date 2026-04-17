import { useState } from 'react';

interface SettingsTabProps {
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  onClearApiKey: () => void;
  hasEnvKey: boolean;
  usingLocalKey: boolean;
}

export default function SettingsTab({
  theme,
  onThemeChange,
  apiKey,
  onApiKeyChange,
  onClearApiKey,
  hasEnvKey,
  usingLocalKey,
}: SettingsTabProps) {
  const [showKey, setShowKey] = useState(false);

  return (
    <section className="animate-fade">
      <article className="card settings-panel">
        <h2 className="section-title">Settings</h2>
        <p className="settings-hint">
          App ini frontend-only. Gemini dipakai dengan API key milikmu sendiri dari Google AI Studio free tier.
        </p>

        <label className="settings-label">Tema aplikasi</label>
        <div className="theme-selector" role="group" aria-label="Pilih tema">
          <button
            type="button"
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => onThemeChange('dark')}
          >
            Dark
          </button>
          <button
            type="button"
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => onThemeChange('light')}
          >
            Light
          </button>
        </div>

        <label className="settings-label" htmlFor="gemini-api-key">
          Gemini API key
        </label>
        <input
          id="gemini-api-key"
          type={showKey ? 'text' : 'password'}
          className="settings-input"
          value={apiKey}
          onChange={(event) => onApiKeyChange(event.target.value)}
          placeholder="Masukkan Gemini API key"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="settings-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setShowKey((prev) => !prev)}
          >
            {showKey ? 'Sembunyikan key' : 'Tampilkan key'}
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={onClearApiKey}
            disabled={!apiKey}
          >
            Hapus key lokal
          </button>
        </div>

        <div className="settings-status-list">
          <p className="settings-hint">
            Sumber aktif:{' '}
            <span className="font-semibold">
              {usingLocalKey ? 'local browser storage' : hasEnvKey ? '.env build-time fallback' : 'belum ada key'}
            </span>
          </p>
          <p className="settings-hint">
            Model default: <span className="font-semibold">gemini-2.5-flash-lite</span>
          </p>
          <p className="settings-hint">
            Konten di-cache per hari agar satu browser tidak memanggil Gemini berulang pada tanggal yang sama.
          </p>
        </div>
      </article>
    </section>
  );
}
