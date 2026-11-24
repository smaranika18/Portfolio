import { useCallback, useEffect, useRef, useState } from 'react';
import { navigationItems } from '../data/portfolio';
import type { SectionId } from '../types/portfolio';

interface NavbarProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export function Navbar({ theme = 'dark', onToggleTheme }: NavbarProps): JSX.Element {
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>({});
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  const moveIndicator = useCallback((id: SectionId): void => {
    const indicator = indicatorRef.current;
    const pill = pillRef.current;
    const link = linkRefs.current[id];
    if (!indicator || !pill || !link) return;

    const pillRect = pill.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${linkRect.left - pillRect.left - 7}px)`;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => moveIndicator(activeSection), 50);
    return () => window.clearTimeout(timer);
  }, [activeSection, moveIndicator]);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = (): void => moveIndicator(activeSection);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection, moveIndicator]);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = (): void => {
      const y = window.scrollY;
      if (y > 220 && y > lastY + 10) setHiddenByScroll(true);
      else if (y < lastY - 8 || y < 220) setHiddenByScroll(false);
      lastY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`site-nav${hiddenByScroll ? ' nav-hidden' : ''}`}
        aria-label="Primary navigation"
      >
        <div ref={pillRef} className="nav-pill">
          <span ref={indicatorRef} className="nav-indicator" />
          {navigationItems.map((item) => (
            <a
              key={item.id}
              ref={(element) => {
                linkRefs.current[item.id] = element;
              }}
              className={`nav-link${activeSection === item.id ? ' active' : ''}`}
              href={`#${item.id}`}
              data-section={item.id}
              onClick={() => setActiveSection(item.id)}
            >
              <i className={item.iconClass} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <a
        href="#home"
        className={`brand-logo-fixed tilt-card magnetic${hiddenByScroll ? ' nav-hidden' : ''}`}
        aria-label="Smaranika Pattnayak - Back to top"
        title="Smaranika Pattnayak"
      >
        <img
          src={`${import.meta.env.BASE_URL}favicon-32x32.png`}
          alt="Smaranika"
          width={32}
          height={32}
          className="brand-logo-img"
        />
      </a>

      {onToggleTheme && (
        <button
          type="button"
          className={`theme-toggle-fixed tilt-card magnetic${hiddenByScroll ? ' nav-hidden' : ''}`}
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light (white)' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light (white)' : 'dark'} mode`}
        >
          <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
