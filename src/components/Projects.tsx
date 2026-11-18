import type { MouseEvent } from 'react';
import { projects } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

function preventDisabledLink(event: MouseEvent<HTMLAnchorElement>, disabled?: boolean): void {
  if (disabled) event.preventDefault();
}

export function Projects(): JSX.Element {
  return (
    <section id="projects" className="content-section section-anchor">
      <div className="container">
        <SectionHeading kicker="03 / PROJECTS" prefix="Projects Showcase -" highlight="What I've Built!" />

        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card tilt-card reveal">
              <div className="project-date">{project.date}</div>
              <span className="tag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <div className="card-actions">
                <a
                  className={`mini-button${project.liveDisabled ? ' disabled' : ''}`}
                  href={project.liveUrl}
                  aria-disabled={project.liveDisabled || undefined}
                  onClick={(event) => preventDisabledLink(event, project.liveDisabled)}
                >
                  View Live
                </a>
                <a
                  className={`mini-button${project.githubDisabled ? ' disabled' : ''}`}
                  href={project.githubUrl}
                  aria-disabled={project.githubDisabled || undefined}
                  onClick={(event) => preventDisabledLink(event, project.githubDisabled)}
                >
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
