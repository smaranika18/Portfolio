import { useEffect, useState } from 'react';

export function ScrollProgress(): JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = (): void => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}
