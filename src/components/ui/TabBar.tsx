interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export default function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <nav className="tab-bar" aria-label="Navigasi utama">
      {tabs.map(t => (
        <button
          key={t.id}
          type="button"
          className={`tab-btn ${active === t.id ? 'active' : ''}`}
          onClick={() => onChange(t.id)}
          aria-pressed={active === t.id}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
