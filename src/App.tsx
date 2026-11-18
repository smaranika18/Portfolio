import { useCallback, useEffect, useRef, useState } from 'react';
import { About } from './components/About';
import { BackgroundScene } from './components/BackgroundScene';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { Profiles } from './components/Profiles';
import { Projects } from './components/Projects';
import { ResumeModal } from './components/ResumeModal';
import { ScrollProgress } from './components/ScrollProgress';
import { Skills } from './components/Skills';
import { useInteractiveEffects } from './hooks/useInteractiveEffects';
import { usePortfolioAnimations } from './hooks/usePortfolioAnimations';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

function App(): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback((): void => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  usePortfolioAnimations(rootRef, reduceMotion);
  useInteractiveEffects(rootRef, reduceMotion);

  const openResume = useCallback((): void => setResumeOpen(true), []);
  const closeResume = useCallback((): void => setResumeOpen(false), []);

  return (
    <div ref={rootRef} className="relative">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[12000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Preloader reduceMotion={reduceMotion} />
      <ScrollProgress />
      <CustomCursor />
      <BackgroundScene reduceMotion={reduceMotion} theme={theme} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero reduceMotion={reduceMotion} onOpenResume={openResume} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <Profiles />
        <Contact />
      </main>

      <Footer />
      <ResumeModal open={resumeOpen} onClose={closeResume} />
    </div>
  );
}

export default App;
