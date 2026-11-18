import { certifications } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

export function Certifications(): JSX.Element {
  return (
    <section id="certifications" className="content-section section-anchor">
      <div className="container">
        <SectionHeading kicker="05 / CERTIFICATIONS" prefix="Certifications -" highlight="Learning Milestones!" />

        <div className="cert-grid">
          {certifications.map((certification) => (
            <article key={certification.title} className="cert-card tilt-card reveal">
              <div className="cert-visual"><i className={certification.iconClass} /></div>
              <div className="cert-body">
                <span className="tag">{certification.tag}</span>
                <h3>{certification.title}</h3>
                <p>{certification.description}</p>
                <a href={certification.credentialUrl} className="text-link">
                  View Credentials <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
