import { useEffect, type RefObject } from 'react';

/** Selector for all cards that should receive the cursor-following glow. */
const GLOW_CARD_SELECTOR = '.tilt-card, .glass-card, .skill-card, .about-card';

export function useInteractiveEffects(rootRef: RefObject<HTMLElement>, reduceMotion: boolean): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const cleanups: Array<() => void> = [];

    /* ── Tilt effect on tilt-cards ── */
    root.querySelectorAll<HTMLElement>('.tilt-card').forEach((card) => {
      const handlePointerMove = (event: PointerEvent): void => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 8}deg) translateY(-2px)`;
      };
      const handlePointerLeave = (): void => {
        card.style.transform = '';
      };

      card.addEventListener('pointermove', handlePointerMove);
      card.addEventListener('pointerleave', handlePointerLeave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', handlePointerMove);
        card.removeEventListener('pointerleave', handlePointerLeave);
      });
    });

    /* ── Cursor-following glow on all cards ── */
    root.querySelectorAll<HTMLElement>(GLOW_CARD_SELECTOR).forEach((card) => {
      const handleGlowMove = (event: PointerEvent): void => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
        card.style.setProperty('--glow-opacity', '1');
      };
      const handleGlowLeave = (): void => {
        card.style.setProperty('--glow-opacity', '0');
      };

      card.addEventListener('pointermove', handleGlowMove);
      card.addEventListener('pointerleave', handleGlowLeave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', handleGlowMove);
        card.removeEventListener('pointerleave', handleGlowLeave);
      });
    });

    /* ── Magnetic effect on buttons ── */
    root.querySelectorAll<HTMLElement>('.magnetic').forEach((button) => {
      const handlePointerMove = (event: PointerEvent): void => {
        const rect = button.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        button.style.transform = `translate(${dx * 0.08}px, ${dy * 0.08}px) translateY(-2px)`;
      };
      const handlePointerLeave = (): void => {
        button.style.transform = '';
      };

      button.addEventListener('pointermove', handlePointerMove);
      button.addEventListener('pointerleave', handlePointerLeave);
      cleanups.push(() => {
        button.removeEventListener('pointermove', handlePointerMove);
        button.removeEventListener('pointerleave', handlePointerLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reduceMotion, rootRef]);
}
