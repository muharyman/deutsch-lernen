interface Tab {
  id: string;
  label: string;
  icon: 'home' | 'today' | 'material' | 'settings';
}

interface TabBarProps {
  tabs: readonly Tab[];
  active: Tab['id'];
  onChange: (id: Tab['id']) => void;
}

function TabIcon({ icon }: { icon: Tab['icon'] }) {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (icon === 'home') {
    return (
      <svg {...commonProps}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
        <path d="M9.5 20v-5.5h5V20" />
      </svg>
    );
  }

  if (icon === 'today') {
    return (
      <svg {...commonProps}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M7.5 3.5v3" />
        <path d="M16.5 3.5v3" />
        <path d="M3.5 9.5h17" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    );
  }

  if (icon === 'material') {
    return (
      <svg {...commonProps}>
        <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5" />
        <path d="M5 5.5v16" />
        <path d="M7.5 7H16" />
        <path d="M7.5 11H16" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
    </svg>
  );
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
          aria-current={active === t.id ? 'page' : undefined}
          aria-label={t.label}
        >
          <span className="tab-btn-icon">
            <TabIcon icon={t.icon} />
          </span>
          <span className="tab-btn-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
