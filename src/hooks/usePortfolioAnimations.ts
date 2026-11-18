import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ── Shared easing constants ───────────────────────────────── */
const EASE_CINEMATIC = 'power3.out';
const EASE_SMOOTH = 'power2.out';
const EASE_SPRING = 'back.out(1.15)';

/* ── Responsive helpers ────────────────────────────────────── */
const isMobile = (): boolean => window.innerWidth < 760;
const revealY = (): number => (isMobile() ? 18 : 28);
const blurAmount = (): string => (isMobile() ? '3px' : '6px');

export function usePortfolioAnimations(
  rootRef: RefObject<HTMLElement>,
  reduceMotion: boolean,
): void {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduceMotion) {
      root.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      /* ═══════════════════════════════════════════════════════
       *  1. HERO — Cinematic entrance orchestration
       * ═══════════════════════════════════════════════════════ */
      const heroTl = gsap.timeline({ defaults: { ease: EASE_CINEMATIC } });

      // Eyebrow — clip-path wipe reveal
      heroTl.fromTo(
        '.eyebrow',
        { opacity: 0, y: 14, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)', duration: 0.8 },
        1.15,
      );

      // Hero title — cinematic clip + blur + scale reveal
      heroTl.fromTo(
        '.hero-title',
        {
          opacity: 0,
          y: 20,
          scale: 1.04,
          clipPath: 'inset(0 0 100% 0)',
          filter: `blur(${blurAmount()})`,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: 'inset(0 0 0% 0)',
          filter: 'blur(0px)',
          duration: 1,
          ease: EASE_CINEMATIC,
        },
        1.3,
      );

      // Hero meta
      heroTl.fromTo(
        '.hero-meta',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65 },
        1.7,
      );

      // Buttons — staggered with subtle scale
      heroTl.fromTo(
        '.hero-actions .button',
        { opacity: 0, y: 14, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: EASE_SPRING,
        },
        1.8,
      );

      // Floating symbols — appear last, subtle scale
      heroTl.fromTo(
        '.floating-symbol',
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.75,
          ease: EASE_SMOOTH,
        },
        1.95,
      );

      // Scroll cue — gentle fade in last
      heroTl.fromTo(
        '.scroll-cue',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6 },
        2.2,
      );

      /* ═══════════════════════════════════════════════════════
       *  2. SECTION HEADING REVEALS — clip-path + opacity
       * ═══════════════════════════════════════════════════════ */
      root.querySelectorAll<HTMLElement>('.section-heading').forEach((heading) => {
        const kicker = heading.querySelector('.section-kicker');
        const h2 = heading.querySelector('h2');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: 'top 87%',
            toggleActions: 'play none none reverse',
          },
        });

        if (kicker) {
          tl.fromTo(
            kicker,
            { opacity: 0, y: 10, clipPath: 'inset(0 100% 0 0)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.55,
              ease: EASE_CINEMATIC,
            },
            0,
          );
        }

        if (h2) {
          tl.fromTo(
            h2,
            { opacity: 0, y: 18, clipPath: 'inset(0 0 100% 0)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.75,
              ease: EASE_CINEMATIC,
            },
            0.12,
          );
        }

        // Mark as revealed so generic .reveal doesn't double-animate
        heading.style.opacity = '1';
        heading.style.transform = 'none';
      });

      /* ═══════════════════════════════════════════════════════
       *  3. ABOUT CARD — special heading + paragraphs
       * ═══════════════════════════════════════════════════════ */
      const aboutCard = root.querySelector<HTMLElement>('.about-card');
      if (aboutCard) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutCard,
            start: 'top 87%',
            toggleActions: 'play none none reverse',
          },
        });

        const aboutKicker = aboutCard.querySelector('.section-kicker');
        const aboutH2 = aboutCard.querySelector('h2');
        const aboutParagraphs = aboutCard.querySelectorAll('p:not(.section-kicker)');

        aboutTl.fromTo(
          aboutCard,
          { opacity: 0, y: revealY(), scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: EASE_CINEMATIC },
          0,
        );

        if (aboutKicker) {
          aboutTl.fromTo(
            aboutKicker,
            { opacity: 0, y: 8, clipPath: 'inset(0 100% 0 0)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.5,
              ease: EASE_CINEMATIC,
            },
            0.15,
          );
        }

        if (aboutH2) {
          aboutTl.fromTo(
            aboutH2,
            { opacity: 0, y: 14, clipPath: 'inset(0 0 100% 0)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.7,
              ease: EASE_CINEMATIC,
            },
            0.25,
          );
        }

        aboutParagraphs.forEach((p, i) => {
          aboutTl.fromTo(
            p,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.55, ease: EASE_SMOOTH },
            0.4 + i * 0.1,
          );
        });

        // Prevent generic reveal from firing
        aboutCard.style.opacity = '1';
        aboutCard.style.transform = 'none';
      }

      /* ═══════════════════════════════════════════════════════
       *  4. EXPERIENCE TIMELINE — side-specific entrances
       * ═══════════════════════════════════════════════════════ */
      const timeline = root.querySelector<HTMLElement>('#experienceTimeline');
      const timelineProgress = root.querySelector<HTMLElement>('#timelineProgress');

      // Progress bar scrub (keep existing behavior)
      if (timeline && timelineProgress) {
        gsap.to(timelineProgress, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 62%',
            end: 'bottom 45%',
            scrub: 0.45,
          },
        });
      }

      // Timeline items — enter from their respective sides
      root.querySelectorAll<HTMLElement>('.timeline-item').forEach((item) => {
        const isLeft = item.classList.contains('left');
        const card = item.querySelector('.timeline-card');
        const dot = item.querySelector('.timeline-dot');
        const date = item.querySelector('.timeline-date');
        const index = item.querySelector('.timeline-index');
        const xOffset = isMobile() ? 0 : isLeft ? -40 : 40;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        // Dot scales in with glow
        if (dot) {
          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: EASE_SPRING },
            0,
          );
        }

        // Card enters from its side
        if (card) {
          tl.fromTo(
            card,
            { opacity: 0, x: xOffset, y: 16, scale: 0.97 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: EASE_CINEMATIC,
            },
            0.1,
          );
        }

        // Date fades in
        if (date) {
          tl.fromTo(
            date,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: EASE_SMOOTH },
            0.25,
          );
        }

        // Index number
        if (index) {
          tl.fromTo(
            index,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: EASE_SMOOTH },
            0.35,
          );
          // Reset to the CSS value (which is rgba(255,255,255,.12))
          gsap.set(index, { clearProps: 'opacity' });
        }

        // Mark as revealed to skip generic handler
        item.style.opacity = '1';
        item.style.transform = 'none';
      });

      /* ═══════════════════════════════════════════════════════
       *  5. PROJECT CARDS — staggered batch entrance
       * ═══════════════════════════════════════════════════════ */
      ScrollTrigger.batch('.project-card.reveal', {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              opacity: 0,
              y: 30,
              scale: 0.96,
              filter: `blur(${isMobile() ? '2px' : '3px'})`,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              stagger: 0.12,
              duration: 0.7,
              ease: EASE_CINEMATIC,
              overwrite: true,
            },
          );
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 30,
            scale: 0.96,
            stagger: 0.06,
            duration: 0.45,
            ease: EASE_SMOOTH,
            overwrite: true,
          });
        },
      });

      /* ═══════════════════════════════════════════════════════
       *  6. SKILL CARDS — batch animation
       * ═══════════════════════════════════════════════════════ */
      ScrollTrigger.batch('.skill-card.reveal:not(.filtered-out)', {
        start: 'top 90%',
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 20, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.04,
              duration: 0.55,
              ease: EASE_SMOOTH,
              overwrite: true,
            },
          );
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 20,
            scale: 0.95,
            stagger: 0.03,
            duration: 0.35,
            ease: EASE_SMOOTH,
            overwrite: true,
          });
        },
      });

      /* ═══════════════════════════════════════════════════════
       *  7. CERTIFICATION CARDS — staggered entrance
       * ═══════════════════════════════════════════════════════ */
      ScrollTrigger.batch('.cert-card.reveal', {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.12,
              duration: 0.65,
              ease: EASE_CINEMATIC,
              overwrite: true,
            },
          );
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 28,
            scale: 0.97,
            stagger: 0.06,
            duration: 0.4,
            ease: EASE_SMOOTH,
            overwrite: true,
          });
        },
      });

      /* ═══════════════════════════════════════════════════════
       *  8. PROFILE SECTION — staggered cards
       * ═══════════════════════════════════════════════════════ */
      const profileMain = root.querySelector<HTMLElement>('.profile-main.reveal');
      if (profileMain) {
        gsap.fromTo(
          profileMain,
          { opacity: 0, y: revealY(), scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: EASE_CINEMATIC,
            scrollTrigger: {
              trigger: profileMain,
              start: 'top 87%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      ScrollTrigger.batch('.profile-link.reveal', {
        start: 'top 90%',
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 22, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.6,
              ease: EASE_CINEMATIC,
              overwrite: true,
            },
          );
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 22,
            scale: 0.96,
            stagger: 0.04,
            duration: 0.35,
            ease: EASE_SMOOTH,
            overwrite: true,
          });
        },
      });

      /* ═══════════════════════════════════════════════════════
       *  9. CONTACT — two-column entrance
       * ═══════════════════════════════════════════════════════ */
      const contactCopy = root.querySelector<HTMLElement>('.contact-copy.reveal');
      const contactForm = root.querySelector<HTMLElement>('.contact-form.reveal');

      if (contactCopy) {
        gsap.fromTo(
          contactCopy,
          { opacity: 0, x: isMobile() ? 0 : -30, y: isMobile() ? revealY() : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: EASE_CINEMATIC,
            scrollTrigger: {
              trigger: contactCopy,
              start: 'top 87%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      if (contactForm) {
        gsap.fromTo(
          contactForm,
          { opacity: 0, x: isMobile() ? 0 : 30, y: isMobile() ? revealY() : 0, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: EASE_CINEMATIC,
            scrollTrigger: {
              trigger: contactForm,
              start: 'top 87%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      /* ═══════════════════════════════════════════════════════
       *  10. EDUCATION CARD
       * ═══════════════════════════════════════════════════════ */
      const educationCard = root.querySelector<HTMLElement>('.education-card.reveal');
      if (educationCard) {
        gsap.fromTo(
          educationCard,
          { opacity: 0, y: revealY(), scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: EASE_CINEMATIC,
            scrollTrigger: {
              trigger: educationCard,
              start: 'top 87%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      /* ═══════════════════════════════════════════════════════
       *  11. FOOTER — subtle reveal
       * ═══════════════════════════════════════════════════════ */
      const footerInner = root.querySelector<HTMLElement>('.footer-inner');
      if (footerInner) {
        gsap.fromTo(
          footerInner,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASE_SMOOTH,
            scrollTrigger: {
              trigger: footerInner,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      /* ═══════════════════════════════════════════════════════
       *  12. GENERIC REVEAL FALLBACK — for any remaining .reveal elements
       *      that weren't handled by specific animations above.
       * ═══════════════════════════════════════════════════════ */
      root.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        // Skip elements already animated by specific handlers above
        if (el.style.opacity === '1') return;
        // Skip elements already in a batch
        if (
          el.classList.contains('project-card') ||
          el.classList.contains('skill-card') ||
          el.classList.contains('cert-card') ||
          el.classList.contains('profile-link') ||
          el.classList.contains('profile-main') ||
          el.classList.contains('contact-copy') ||
          el.classList.contains('contact-form') ||
          el.classList.contains('education-card') ||
          el.classList.contains('about-card') ||
          el.closest('.timeline-item') ||
          el.closest('.section-heading')
        ) {
          return;
        }

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE_CINEMATIC,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      /* ═══════════════════════════════════════════════════════
       *  13. PARALLAX — subtle depth layers (desktop only)
       * ═══════════════════════════════════════════════════════ */
      if (!isMobile()) {
        // Section headings — very subtle upward parallax
        root.querySelectorAll<HTMLElement>('.section-heading').forEach((heading) => {
          gsap.to(heading, {
            y: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: heading,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          });
        });

        // Hero content — subtle parallax as user scrolls away
        const heroContent = root.querySelector<HTMLElement>('.hero-content');
        if (heroContent) {
          gsap.to(heroContent, {
            y: -40,
            opacity: 0.4,
            scale: 0.98,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
        }

        // Floating symbols — parallax out faster
        gsap.to('.floating-symbol', {
          y: -60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: '30% top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      /* ═══════════════════════════════════════════════════════
       *  14. BACKGROUND SCROLL TIE-IN
       * ═══════════════════════════════════════════════════════ */
      const bgCanvas = document.querySelector<HTMLElement>('#bg-canvas');
      if (bgCanvas && !isMobile()) {
        gsap.to(bgCanvas, {
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      }
    }, root);

    return () => context.revert();
  }, [reduceMotion, rootRef]);
}
