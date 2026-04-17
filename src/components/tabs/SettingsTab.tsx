interface SettingsTabProps {
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}

export default function SettingsTab({ theme, onThemeChange }: SettingsTabProps) {
  return (
    <section className="animate-fade">
      <article className="card settings-panel">
        <h2 className="section-title">Pengaturan</h2>
        <p className="settings-hint">
          Materi harian dibuat di server. Browser hanya mengambil lesson dari endpoint cache bersama.
        </p>

        <label className="settings-label">Tema aplikasi</label>
        <div className="theme-selector" role="group" aria-label="Pilih tema">
          <button
            type="button"
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => onThemeChange('dark')}
          >
            Gelap
          </button>
          <button
            type="button"
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => onThemeChange('light')}
          >
            Terang
          </button>
        </div>

        <div className="settings-status-list">
          <p className="settings-hint">
            Sumber utama: <span className="font-semibold">cache harian di server</span>
          </p>
          <p className="settings-hint">
            Model default: <span className="font-semibold">gemini-2.5-flash-lite</span>
          </p>
          <p className="settings-hint">
            Cache dibagi global per tanggal. Browser juga menyimpan cache lokal sekunder agar reload tidak terus refetch.
          </p>
        </div>
      </article>
    </section>
  );
}
