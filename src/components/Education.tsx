import { education } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

export function Education(): JSX.Element {
  return (
    <section id="education" className="content-section section-anchor">
      <div className="container">
        <SectionHeading kicker="06 / EDUCATION" prefix="Education -" highlight="Academic Foundation!" />

        <article className="glass-card education-card reveal">
          <div className="education-icon">
            <i className="fa-solid fa-graduation-cap" />
          </div>
          <div className="education-body">
            <h3>{education.degree}</h3>
            <p className="education-university">
              <i className="fa-solid fa-university" /> {education.university}
            </p>
            <div className="education-meta">
              <span><i className="fa-solid fa-location-dot" /> {education.location}</span>
              <span><i className="fa-regular fa-calendar" /> {education.period}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
