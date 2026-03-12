import { useState } from 'react';
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
const GEMINI_KEY = 'german-gemini-key-v1';

function loadLevel(): Level {
  const saved = localStorage.getItem(LEVEL_KEY);
  if (saved === 'A1' || saved === 'A2' || saved === 'B1' || saved === 'B2') return saved;
  return 'A1';
}

export default function App() {
  const [level, setLevel] = useState<Level>(loadLevel);
  const [tab, setTab] = useState('daily-word');
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem(GEMINI_KEY) ?? '');
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

  const handleGeminiKey = (key: string) => {
    setGeminiKey(key);
    if (key) localStorage.setItem(GEMINI_KEY, key);
    else localStorage.removeItem(GEMINI_KEY);
  };

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
          <label className="settings-label">
            Gemini API Key (opsional, untuk kata harian AI):
          </label>
          <input
            type="password"
            value={geminiKey}
            onChange={e => handleGeminiKey(e.target.value)}
            placeholder="Masukkan API key Gemini..."
            className="settings-input"
          />
          <p className="settings-hint">
            Tanpa API key, kata harian akan diambil dari koleksi statis.
          </p>
        </div>
      )}

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      <main className="app-content">
        {tab === 'daily-word' && (
          <DailyWordTab level={level} geminiApiKey={geminiKey || undefined} />
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
