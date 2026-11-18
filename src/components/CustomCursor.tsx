import { useEffect, useRef, useState } from 'react';

export function CustomCursor(): JSX.Element {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [spotlight, setSpotlight] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationFrame = 0;

    const handlePointerMove = (event: PointerEvent): void => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const handlePointerOver = (event: PointerEvent): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const isInteractive = Boolean(target.closest('a, button, input, textarea, .tilt-card, .about-card'));
      const isAboutCard = Boolean(target.closest('.about-card'));
      setHovering(isInteractive);
      setSpotlight(isAboutCard);
    };

    const handlePointerOut = (event: PointerEvent): void => {
      const related = event.relatedTarget;
      if (!(related instanceof Element) || !related.closest('a, button, input, textarea, .tilt-card, .about-card')) {
        setHovering(false);
        setSpotlight(false);
      } else if (!related.closest('.about-card')) {
        setSpotlight(false);
      }
    };

    const loop = (): void => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      animationFrame = window.requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });
    animationFrame = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot${spotlight ? ' spotlight' : ''}`} data-cursor-dot />
      <div ref={ringRef} className={`cursor-ring${hovering ? ' hover' : ''}${spotlight ? ' spotlight' : ''}`} data-cursor-ring />
    </>
  );
}
