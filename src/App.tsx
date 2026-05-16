import { useEffect, useState } from 'react';
import { useDailyLesson } from './hooks/useDailyLesson';
import { useMaterialProgress } from './hooks/useMaterialProgress';
import { useTracker } from './hooks/useTracker';
import Header from './components/ui/Header';
import TabBar from './components/ui/TabBar';
import HomeTab from './components/tabs/HomeTab';
import DailyLessonTab from './components/tabs/DailyLessonTab';
import MaterialTab from './components/tabs/MaterialTab';
import ProgressTab from './components/tabs/ProgressTab';
import SettingsTab from './components/tabs/SettingsTab';

const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'today', label: 'Today', icon: 'today' },
  { id: 'material', label: 'Material', icon: 'material' },
  { id: 'progress', label: 'Progress', icon: 'progress' },
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
    pct,
    completedDays,
    streak,
    todayDone,
    setDayComplete,
  } = useTracker(activeDate);
  const materialProgress = useMaterialProgress();

  useEffect(
    function syncTheme() {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_KEY, theme);
    },
    [theme]
  );

  return (
    <div className="app-container">
      <main className="app-content">
        {tab === 'home' ? (
          <>
            <Header
              activeDate={activeDate}
              pct={pct}
              completedDays={completedDays}
              streak={streak}
            />
            <HomeTab
              activeDate={activeDate}
              lesson={lesson}
              loading={loading}
              error={error}
              pct={pct}
              completedDays={completedDays}
              streak={streak}
              todayDone={todayDone}
              materialPct={materialProgress.overallPct}
              nextLesson={materialProgress.nextLesson}
            />
          </>
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

        {tab === 'material' ? (
          <MaterialTab
            progress={materialProgress.progress}
            onSetLessonStatus={materialProgress.setLessonStatus}
          />
        ) : null}

        {tab === 'progress' ? (
          <ProgressTab
            overallPct={materialProgress.overallPct}
            completedTotal={materialProgress.completedTotal}
            totalLessons={materialProgress.totalLessons}
            nextLesson={materialProgress.nextLesson}
            getLevelSummary={materialProgress.getLevelSummary}
          />
        ) : null}

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
