import { useEffect, useMemo, useState } from 'react';

interface PreloaderProps {
  reduceMotion: boolean;
}

interface ParticleStyle {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

export function Preloader({ reduceMotion }: PreloaderProps): JSX.Element {
  const [hidden, setHidden] = useState(false);
  const [filled, setFilled] = useState(false);

  const particles = useMemo<ParticleStyle[]>(
    () =>
      Array.from({ length: 34 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * -3}s`,
        animationDuration: `${2.2 + Math.random() * 2.7}s`,
      })),
    [],
  );

  useEffect(() => {
    const fillFrame = window.requestAnimationFrame(() => setFilled(true));
    let loadTimer = 0;

    const finish = (): void => {
      loadTimer = window.setTimeout(() => setHidden(true), reduceMotion ? 40 : 1350);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    const fallbackTimer = window.setTimeout(() => setHidden(true), 2800);

    return () => {
      window.cancelAnimationFrame(fillFrame);
      window.clearTimeout(loadTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('load', finish);
    };
  }, [reduceMotion]);

  return (
    <div className={`preloader${hidden ? ' hidden' : ''}`} aria-hidden="true">
      <div className="preloader-particles">
        {particles.map((style, index) => (
          <i key={index} className="preloader-particle" style={style} />
        ))}
      </div>
      <div className="preloader-brand">
        <div className="preloader-name">
          Smaranika<span>Pattnayak</span>
        </div>
        <div className="preloader-subtitle">
          <i />
          <span>Personal Portfolio</span>
          <i />
        </div>
      </div>
      <div className="preloader-track">
        <div
          className="preloader-fill"
          style={{
            width: filled ? '100%' : '0%',
            transition: 'width 1.25s cubic-bezier(.2,.8,.2,1)',
          }}
        />
      </div>
      <div className="preloader-words" aria-hidden="true">
        <span>Ideate.</span>
        <span>Design.</span>
        <span>Develop.</span>
        <span>Innovate.</span>
      </div>
    </div>
  );
}
