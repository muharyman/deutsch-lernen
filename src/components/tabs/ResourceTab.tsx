import { RESOURCES } from '../../data/resources';

export default function ResourceTab() {
  return (
    <div className="animate-fade">
      <div className="card resource-section">
        <div className="resource-section-title">Podcast, Video & Aplikasi</div>
        {RESOURCES.map((r, i) => (
          <div key={i} className="resource-item">
            <div className="resource-info">
              <div className="resource-name">{r.name}</div>
              <div className="resource-desc">{r.desc}</div>
              <div className="resource-tags">
                <span className="badge badge-a2">{r.level}</span>
                <span className={`badge ${r.free ? 'badge-free' : 'badge-paid'}`}>
                  {r.free ? 'Gratis' : 'Berbayar'}
                </span>
              </div>
            </div>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              Buka →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
