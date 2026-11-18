import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { profileLinks } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';
import samPhoto from '../images/sam.jpeg';

export function Profiles(): JSX.Element {
  const [isColorActive, setIsColorActive] = useState(false);
  const [inView, setInView] = useState(false);
  const photoCardRef = useRef<HTMLDivElement>(null);

  // On touch / no-hover devices, automatically transition photo to full color when scrolled into view
  useEffect(() => {
    const element = photoCardRef.current;
    if (!element) return;

    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (!isTouchDevice) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleToggleColor = (): void => {
    setIsColorActive((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggleColor();
    }
  };

  return (
    <section id="profiles" className="content-section section-anchor">
      <div className="container">
        <SectionHeading kicker="07 / PROFILES" prefix="Web Presence -" highlight="Dev Network!" />

        <div className="profile-layout">
          {/* Left Column: Hero Photo */}
          <div className="profile-photo-col profile-main reveal">
            <div className="profile-photo-wrapper">
              <div className="profile-photo-ambient" aria-hidden="true" />
              <div
                ref={photoCardRef}
                className={`profile-photo-frame tilt-card${isColorActive ? ' is-color' : ''}${inView ? ' in-view' : ''}`}
                onClick={handleToggleColor}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Portrait of Smaranika Pattnayak. Click or tap to toggle full color."
              >
                <div className="profile-photo-inner">
                  <img
                    src={samPhoto}
                    alt="Smaranika Pattnayak — React Native Developer & Full Stack Engineer"
                    className="profile-photo"
                    loading="lazy"
                    width={400}
                    height={500}
                  />
                  <div className="profile-photo-badge" aria-hidden="true">
                    <span className="profile-pulse-dot" />
                    <span>Open to Opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Handle, Role, Tagline, & Glass Links */}
          <div className="profile-details-col">
            <div className="profile-info-card glass-card reveal">
              <div className="profile-header-group">
                <span className="profile-handle">@smaranika</span>
                <h3 className="profile-name">Smaranika Pattnayak</h3>
                <p className="profile-role">React Native Developer • Full Stack • AI Integration</p>
              </div>

              <p className="profile-tagline">
                Architecting high-performance cross-platform mobile apps and intelligent cloud backends — translating ambitious concepts into elegant, production-grade products.
              </p>

              <div className="profile-links">
                {profileLinks.map((profile) => (
                  <a
                    key={profile.name}
                    className="profile-link tilt-card reveal"
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${profile.action} with Smaranika on ${profile.name} (opens in a new tab)`}
                  >
                    <div className="profile-link-icon">
                      <i className={profile.iconClass} aria-hidden="true" />
                    </div>
                    <span className="profile-link-content">
                      <b>{profile.name}</b>
                      <small>{profile.action}</small>
                    </span>
                    <i className="fa-solid fa-arrow-up-right-from-square profile-link-arrow" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="profile-note reveal">You can explore further by opening any of the profile cards above.</p>
      </div>
    </section>
  );
}
