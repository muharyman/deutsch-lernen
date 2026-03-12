import { useEffect, useState } from 'react';
import type { Level } from './types';
import { getWeeks, getDailyPlans, getFlashcardSets, getDialogs } from './data';
import { useTracker } from './hooks/useTracker';
import Header from './components/ui/Header';
import TabBar from './components/ui/TabBar';
import TrackerTab from './components/tabs/TrackerTab';
import PlanTab from './components/tabs/PlanTab';
import FlashcardTab from './components/tabs/FlashcardTab';
import DialogTab from './components/tabs/DialogTab';
import GrammarTab from './components/tabs/GrammarTab';
import ResourceTab from './components/tabs/ResourceTab';
import DailyWordTab from './components/tabs/DailyWordTab';

const TABS = [
  { id: 'daily-word', label: '🌟 Kata Hari Ini' },
  { id: 'tracker', label: '📅 Tracker' },
  { id: 'plan', label: '📋 Rencana' },
  { id: 'flashcard', label: '🃏 Flashcard' },
  { id: 'dialog', label: '🗣️ Dialog' },
  { id: 'grammar', label: '📐 Grammar' },
  { id: 'resources', label: '🔗 Resources' },
];

const LEVEL_KEY = 'german-level-v1';
const THEME_KEY = 'german-theme-v1';
const DEFAULT_GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY?.trim() ?? '';

type Theme = 'dark' | 'light';

function loadLevel(): Level {
  const saved = localStorage.getItem(LEVEL_KEY);
  if (saved === 'A1' || saved === 'A2' || saved === 'B1' || saved === 'B2') return saved;
  return 'A1';
}

function loadTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function App() {
  const [level, setLevel] = useState<Level>(loadLevel);
  const [tab, setTab] = useState('daily-word');
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [showSettings, setShowSettings] = useState(false);

  const weeks = getWeeks(level);
  const plans = getDailyPlans(level);
  const flashcardSets = getFlashcardSets(level);
  const dialogs = getDialogs(level);

  const { tracker, toggleDay, weekDone, pct, doneDays, totalDays } = useTracker(weeks);

  const handleLevelChange = (l: Level) => {
    setLevel(l);
    localStorage.setItem(LEVEL_KEY, l);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div className="app-container">
      <Header
        level={level}
        pct={pct}
        doneDays={doneDays}
        totalDays={totalDays}
        onLevelChange={handleLevelChange}
      />

      <button
        className="settings-toggle"
        onClick={() => setShowSettings(s => !s)}
      >
        ⚙️ {showSettings ? 'Tutup' : 'Pengaturan'}
      </button>

      {showSettings && (
        <div className="card settings-panel animate-fade">
          <label className="settings-label">Tema aplikasi:</label>
          <div className="theme-selector">
            <button
              className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
            <button
              className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
            >
              Light
            </button>
          </div>
          <label className="settings-label">Gemini API Key:</label>
          <p className="settings-hint">
            {DEFAULT_GEMINI_KEY
              ? 'Terdeteksi dari .env dan siap dipakai untuk kata harian AI.'
              : 'Belum terdeteksi. Tambahkan VITE_GEMINI_KEY di file .env untuk mengaktifkan kata harian AI.'}
          </p>
          <p className="settings-hint">
            Jika key tidak tersedia, kata harian akan diambil dari koleksi statis.
          </p>
        </div>
      )}

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      <main className="app-content">
        {tab === 'daily-word' && (
          <DailyWordTab level={level} geminiApiKey={DEFAULT_GEMINI_KEY || undefined} />
        )}
        {tab === 'tracker' && (
          <TrackerTab
            weeks={weeks}
            tracker={tracker}
            toggleDay={toggleDay}
            weekDone={weekDone}
          />
        )}
        {tab === 'plan' && (
          <PlanTab
            weeks={weeks}
            plans={plans}
            tracker={tracker}
            toggleDay={toggleDay}
          />
        )}
        {tab === 'flashcard' && (
          <FlashcardTab sets={flashcardSets} />
        )}
        {tab === 'dialog' && (
          <DialogTab dialogs={dialogs} />
        )}
        {tab === 'grammar' && (
          <GrammarTab level={level} />
        )}
        {tab === 'resources' && (
          <ResourceTab />
        )}
      </main>

      <footer className="app-footer">
        <p>Belajar Bahasa Jerman — PWA App</p>
      </footer>
    </div>
  );
}
