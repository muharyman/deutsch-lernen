import { useEffect, useState } from 'react';
import { useDailyLesson } from './hooks/useDailyLesson';
import { useTracker } from './hooks/useTracker';
import Header from './components/ui/Header';
import TabBar from './components/ui/TabBar';
import HomeTab from './components/tabs/HomeTab';
import DailyLessonTab from './components/tabs/DailyLessonTab';
import ResourceTab from './components/tabs/ResourceTab';
import SettingsTab from './components/tabs/SettingsTab';

const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'today', label: 'Today', icon: 'today' },
  { id: 'material', label: 'Material', icon: 'material' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
] as const;

const THEME_KEY = 'german-theme-v1';

type Theme = 'dark' | 'light';
type AppTab = (typeof TABS)[number]['id'];

function loadTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function App() {
  const [tab, setTab] = useState<AppTab>('home');
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const { lesson, loading, error, activeDate } = useDailyLesson();
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
        theme={theme}
        onToggleTheme={() => setTheme(current => (current === 'dark' ? 'light' : 'dark'))}
      />

      <main className="app-content">
        {tab === 'home' ? (
          <HomeTab
            activeDate={activeDate}
            lesson={lesson}
            loading={loading}
            error={error}
            tracker={tracker}
            recentDates={recentDates}
            pct={pct}
            doneInWindow={doneInWindow}
            windowDays={windowDays}
            completedDays={completedDays}
            streak={streak}
            todayDone={todayDone}
            onToggleDate={toggleDate}
          />
        ) : null}

        {tab === 'today' ? (
          <DailyLessonTab
            lesson={lesson}
            loading={loading}
            error={error}
            todayDone={todayDone}
            onToggleDone={() => setDayComplete(activeDate, !todayDone)}
          />
        ) : null}

        {tab === 'material' ? <ResourceTab /> : null}

        {tab === 'settings' ? (
          <SettingsTab
            theme={theme}
            onThemeChange={setTheme}
          />
        ) : null}
      </main>

      <TabBar tabs={TABS} active={tab} onChange={(nextTab) => setTab(nextTab as AppTab)} />

      <footer className="app-footer">
        <p>Latihan bahasa Jerman harian.</p>
      </footer>
    </div>
  );
}
