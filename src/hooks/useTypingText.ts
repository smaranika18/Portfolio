import { useEffect, useState } from 'react';

export function useTypingText(words: string[], reduceMotion: boolean): string {
  const [text, setText] = useState('');

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timerId = 0;

    const tick = (): void => {
      const word = words[roleIndex] ?? '';
      charIndex += deleting ? -1 : 1;
      setText(word.slice(0, Math.max(0, charIndex)));

      let delay = deleting ? 45 : 85;
      if (!deleting && charIndex >= word.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % words.length;
        delay = 320;
      }

      timerId = window.setTimeout(tick, reduceMotion ? 900 : delay);
    };

    tick();
    return () => window.clearTimeout(timerId);
  }, [reduceMotion, words]);

  return text;
}
