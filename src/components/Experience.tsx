import { experiences } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

export function Experience(): JSX.Element {
  return (
    <section id="experience" className="content-section section-anchor">
      <div className="container">
        <SectionHeading kicker="02 / EXPERIENCE" prefix="Work Experience -" highlight="Professional Journey!" />

        <div className="timeline" id="experienceTimeline">
          <div className="timeline-track"><div id="timelineProgress" className="timeline-progress" /></div>

          {experiences.map((experience) => (
            <article key={experience.index} className={`timeline-item ${experience.side} reveal`}>
              <div className="timeline-index">{experience.index}</div>
              <div className="timeline-dot" />
              <div className="timeline-date">{experience.date}</div>
              <div className="timeline-card tilt-card">
                <div className="timeline-card-top">
                  <span className="tag">{experience.tag}</span>
                  <div className="logo-badge"><i className={experience.iconClass} /></div>
                </div>
                <h3>{experience.title}</h3>
                <p className="experience-company">
                  <i className="fa-solid fa-building" /> {experience.company} <span className="experience-location">— {experience.location}</span>
                </p>
                <p>{experience.description}</p>
                {experience.highlights.length > 0 && (
                  <ul className="experience-highlights">
                    {experience.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
