import { roles } from '../data/portfolio';
import { useTypingText } from '../hooks/useTypingText';

interface HeroProps {
  reduceMotion: boolean;
  onOpenResume: () => void;
}

export function Hero({ reduceMotion, onOpenResume }: HeroProps): JSX.Element {
  const typingText = useTypingText(roles, reduceMotion);

  return (
    <section id="home" className="hero section-anchor">
      <div className="floating-symbol symbol-one"><i className="fa-solid fa-code" /></div>
      <div className="floating-symbol symbol-two"><i className="fa-solid fa-brain" /></div>
      <div className="floating-symbol symbol-three"><i className="fa-solid fa-trophy" /></div>
      <div className="floating-symbol symbol-four"><i className="fa-regular fa-lightbulb" /></div>

      <div className="hero-content">
        <p className="eyebrow">React Native Developer — Node.js — Full Stack — 2+ YOE — SaaS — AI Integration — Bangalore</p>
        <h1 className="hero-title">
          <span className="gradient-text">{typingText}</span>
          <span className="typing-caret">|</span>
        </h1>
        <p className="hero-meta">Smaranika Pattnayak <span>•</span> REACT NATIVE & FULL STACK DEVELOPER</p>
        <div className="hero-actions">
          <a className="button primary magnetic" href="https://www.linkedin.com/in/smaranika-pattnayak-4b13b327a/" target="_blank" rel="noopener noreferrer">
            Let's Connect <i className="fa-solid fa-arrow-up-right-from-square" />
          </a>
          <button className="button ghost magnetic" type="button" onClick={onOpenResume}>
            View Resume <i className="fa-regular fa-file-lines" />
          </button>
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
        <span>SCROLL</span>
        <i className="fa-solid fa-chevron-down" />
      </a>
    </section>
  );
}
