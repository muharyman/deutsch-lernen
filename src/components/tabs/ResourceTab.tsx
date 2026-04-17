import { RESOURCES } from '../../data/resources';

export default function ResourceTab() {
  return (
    <section className="animate-fade">
      <article className="card resource-section">
        <div className="section-heading-row resource-heading-row">
          <div>
            <h2 className="section-title">Materi Tambahan</h2>
            <p className="resource-desc">
              Pilih sumber belajar yang ringan dipakai untuk melengkapi latihan harianmu.
            </p>
          </div>
        </div>
        {RESOURCES.map((resource, index) => (
          <div key={index} className="resource-item">
            <div className="resource-info">
              <div className="resource-name">{resource.name}</div>
              <div className="resource-desc">{resource.desc}</div>
              <div className="resource-tags">
                <span className="badge badge-a2">{resource.level}</span>
                <span className={`badge ${resource.free ? 'badge-free' : 'badge-paid'}`}>
                  {resource.free ? 'Gratis' : 'Berbayar'}
                </span>
              </div>
            </div>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              Buka
            </a>
          </div>
        ))}
      </article>
    </section>
  );
}
