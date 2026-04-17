import { useEffect, useState } from 'react';
import { useDailyLesson } from './hooks/useDailyLesson';
import { useTracker } from './hooks/useTracker';
import Header from './components/ui/Header';
import TabBar from './components/ui/TabBar';
import DailyLessonTab from './components/tabs/DailyLessonTab';
import TrackerTab from './components/tabs/TrackerTab';
import ResourceTab from './components/tabs/ResourceTab';
import SettingsTab from './components/tabs/SettingsTab';

const TABS = [
  { id: 'today', label: 'Hari Ini' },
  { id: 'tracker', label: 'Tracker' },
  { id: 'resources', label: 'Resources' },
  { id: 'settings', label: 'Settings' },
];

const THEME_KEY = 'german-theme-v1';

type Theme = 'dark' | 'light';

function loadTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function App() {
  const [tab, setTab] = useState('today');
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const { lesson, loading, source, error, activeDate } = useDailyLesson();
  const {
    tracker,
    recentDates,
    pct,
    completedDays,
    streak,
    todayDone,
    windowDays,
    doneInWindow,
    toggleDate,
    setDayComplete,
  } = useTracker(activeDate);

  useEffect(
    function syncTheme() {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_KEY, theme);
    },
    [theme]
  );

  return (
    <div className="app-container">
      <Header
        activeDate={activeDate}
        pct={pct}
        doneInWindow={doneInWindow}
        windowDays={windowDays}
        completedDays={completedDays}
        streak={streak}
      />

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      <main className="app-content">
        {tab === 'today' ? (
          <DailyLessonTab
            lesson={lesson}
            loading={loading}
            source={source}
            error={error}
            todayDone={todayDone}
            onToggleDone={() => setDayComplete(activeDate, !todayDone)}
          />
        ) : null}

        {tab === 'tracker' ? (
          <TrackerTab
            tracker={tracker}
            recentDates={recentDates}
            streak={streak}
            completedDays={completedDays}
            onToggleDate={toggleDate}
          />
        ) : null}

        {tab === 'resources' ? <ResourceTab /> : null}

        {tab === 'settings' ? (
          <SettingsTab theme={theme} onThemeChange={setTheme} />
        ) : null}
      </main>

      <footer className="app-footer">
        <p>Daily German practice with Gemini free tier</p>
      </footer>
    </div>
  );
}
