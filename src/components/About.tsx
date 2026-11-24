import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from './SectionHeading';

interface TerminalLine {
  num: string;
  type: 'comment' | 'blank' | 'code';
  indent?: boolean;
  content: JSX.Element;
}

export function About(): JSX.Element {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const terminalLines: TerminalLine[] = [
    {
      num: '01',
      type: 'comment',
      content: <span className="code-comment"># identity</span>,
    },
    {
      num: '02',
      type: 'code',
      content: (
        <>
          <span className="code-key">name</span> <span className="code-op">=</span>{' '}
          <span className="code-string">"Smaranika Pattnayak"</span>
        </>
      ),
    },
    {
      num: '03',
      type: 'code',
      content: (
        <>
          <span className="code-key">role</span> <span className="code-op">=</span>{' '}
          <span className="code-string">"Full Stack / React Native Developer"</span>
        </>
      ),
    },
    {
      num: '04',
      type: 'code',
      content: (
        <>
          <span className="code-key">location</span> <span className="code-op">=</span>{' '}
          <span className="code-string">"Bengaluru, India"</span>
        </>
      ),
    },
    {
      num: '05',
      type: 'code',
      content: (
        <>
          <span className="code-key">passions</span> <span className="code-op">=</span> [
          <span className="code-string">"Pixel-perfect UI"</span>, <span className="code-string">"Oil on Canvas"</span>,{' '}
          <span className="code-string">"Scalable Systems"</span>]
        </>
      ),
    },
    {
      num: '06',
      type: 'blank',
      content: <span>&nbsp;</span>,
    },
    {
      num: '07',
      type: 'comment',
      content: <span className="code-comment"># engineering focus</span>,
    },
    {
      num: '08',
      type: 'code',
      content: (
        <>
          <span className="code-key">core_stack</span> <span className="code-op">=</span> &#123;
        </>
      ),
    },
    {
      num: '09',
      type: 'code',
      indent: true,
      content: (
        <>
          <span className="code-prop">"mobile"</span>: [<span className="code-string">"React Native"</span>,{' '}
          <span className="code-string">"Android Studio"</span>],
        </>
      ),
    },
    {
      num: '10',
      type: 'code',
      indent: true,
      content: (
        <>
          <span className="code-prop">"frontend"</span>: [<span className="code-string">"React.js"</span>,{' '}
          <span className="code-string">"Next.js"</span>, <span className="code-string">"TypeScript"</span>,{' '}
          <span className="code-string">"Tailwind"</span>],
        </>
      ),
    },
    {
      num: '11',
      type: 'code',
      indent: true,
      content: (
        <>
          <span className="code-prop">"backend"</span>: [<span className="code-string">"Node.js"</span>,{' '}
          <span className="code-string">"Express.js"</span>, <span className="code-string">"FastAPI"</span>,{' '}
          <span className="code-string">"REST APIs"</span>],
        </>
      ),
    },
    {
      num: '12',
      type: 'code',
      indent: true,
      content: (
        <>
          <span className="code-prop">"ai_cloud"</span>: [<span className="code-string">"OpenAI GPT-4"</span>,{' '}
          <span className="code-string">"Face Auth AI"</span>, <span className="code-string">"AWS"</span>,{' '}
          <span className="code-string">"Docker"</span>]
        </>
      ),
    },
    {
      num: '13',
      type: 'code',
      content: <>&#125;</>,
    },
    {
      num: '14',
      type: 'blank',
      content: <span>&nbsp;</span>,
    },
    {
      num: '15',
      type: 'comment',
      content: <span className="code-comment"># operating principles</span>,
    },
    {
      num: '16',
      type: 'code',
      content: (
        <>
          <span className="code-key">ownership</span> <span className="code-op">=</span>{' '}
          <span className="code-string">"End-to-end architecture to production deployment"</span>
        </>
      ),
    },
    {
      num: '17',
      type: 'code',
      content: (
        <>
          <span className="code-key">standards</span> <span className="code-op">=</span> [
          <span className="code-string">"Clean code"</span>, <span className="code-string">"Measurable latency drops"</span>,{' '}
          <span className="code-string">"Zero-fluff DX"</span>]
        </>
      ),
    },
    {
      num: '18',
      type: 'blank',
      content: <span>&nbsp;</span>,
    },
    {
      num: '19',
      type: 'comment',
      content: <span className="code-comment"># proof points</span>,
    },
    {
      num: '20',
      type: 'code',
      content: (
        <>
          <span className="code-key">experience_years</span> <span className="code-op">=</span>{' '}
          <span className="code-number">2.0</span>+
        </>
      ),
    },
    {
      num: '21',
      type: 'code',
      content: (
        <>
          <span className="code-key">production_saas</span> <span className="code-op">=</span>{' '}
          <span className="code-number">3</span> <span className="code-comment"># CollectPro, FieldGo, AixHub</span>
        </>
      ),
    },
    {
      num: '22',
      type: 'code',
      content: (
        <>
          <span className="code-key">active_users</span> <span className="code-op">=</span>{' '}
          <span className="code-string">"10,000+"</span>
        </>
      ),
    },
    {
      num: '23',
      type: 'code',
      content: (
        <>
          <span className="code-key">impact</span> <span className="code-op">=</span> &#123;{' '}
          <span className="code-prop">"latency_cut"</span>: <span className="code-string">"40%"</span>,{' '}
          <span className="code-prop">"api_speedup"</span>: <span className="code-string">"30%"</span>,{' '}
          <span className="code-prop">"lighthouse"</span>: <span className="code-string">"95+"</span> &#125;
        </>
      ),
    },
    {
      num: '24',
      type: 'code',
      content: (
        <>
          <span className="code-key">status</span> <span className="code-op">=</span>{' '}
          <span className="code-string">"Ready to build ambitious products 🚀"</span>
        </>
      ),
    },
  ];

  return (
    <section id="about" className="content-section section-anchor">
      <div className="container">
        <SectionHeading kicker="01 / ABOUT" prefix="About Me -" highlight="Behind The Code & Canvas! " />

        <p className="about-intro-line reveal">
          A glimpse into who I am, how I architect systems, and what drives my work every day.
        </p>

        <div className="about-grid">
          {/* Left Column: Terminal / Code-Editor Style Card */}
          <div ref={cardRef} className="about-terminal-card glass-card tilt-card reveal">
            <div className="terminal-titlebar">
              <div className="terminal-dots" aria-hidden="true">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-yellow" />
                <span className="terminal-dot dot-green" />
              </div>
              <div className="terminal-title">
                <i className="fa-solid fa-terminal" aria-hidden="true" />
                <span>smaranika@portfolio: ~ (profile.py)</span>
              </div>
              <div className="terminal-badge">
                <span className="terminal-pulse" aria-hidden="true" />
                <span>active</span>
              </div>
            </div>

            <div className="terminal-body" tabIndex={0} aria-label="Smaranika's profile code representation">
              <div className={`terminal-code${inView ? ' is-visible' : ''}`}>
                {terminalLines.map((line, idx) => (
                  <div
                    key={line.num}
                    className={`code-line${line.indent ? ' code-indent' : ''}`}
                    style={{ '--line-idx': idx } as React.CSSProperties}
                  >
                    <span className="line-num">{line.num}</span>
                    <span className="line-content">{line.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio with comfortable typography */}
          <div className="about-bio-col reveal">
            <article className="about-bio-card glass-card about-card">
              <div className="about-bio-content">
                <p>
                  I'm a <strong>Full Stack / React Native Developer</strong> by profession and an{' '}
                  <strong>artist by passion</strong> — basically, I spend my days fixing pixels on screens and my free time putting them on canvases. 😄
                </p>

                <p>
                  With <strong>2+ years of experience</strong>, I've built <strong>3 production SaaS products</strong> serving{' '}
                  <strong>10,000+ users</strong> across FinTech, Banking, and HR-Tech. I work with{' '}
                  <strong>React, React Native, Node.js, REST APIs, and AI</strong> — turning complicated ideas into things that actually work.
                </p>

                <p>
                  I've <strong>reduced latency by 40%</strong>, <strong>improved API response times by 30%</strong>, and achieved{' '}
                  <strong>95+ Lighthouse scores</strong>. Not bad for someone who sometimes struggles to decide which colour to use on a painting!
                </p>

                <p>
                  From building AI-powered features to fixing that one bug that mysteriously disappears when someone else checks it, I enjoy owning products end-to-end. I love clean code, creative chaos, solving problems, and occasionally arguing with bugs like they have feelings.
                </p>

                <p>
                  <strong>Whether it's a blank canvas or a blank code editor, I love starting with nothing and creating something meaningful.</strong> 🚀
                </p>
              </div>

              {/* Highlights Chips */}
              <div className="about-stats" aria-label="Career highlights">
                <div className="stat-chip">
                  <span className="stat-value">2+ YOE</span>
                  <span className="stat-label">Full Stack & Mobile</span>
                </div>
                <div className="stat-chip">
                  <span className="stat-value">3 SaaS</span>
                  <span className="stat-label">Live in Production</span>
                </div>
                <div className="stat-chip">
                  <span className="stat-value">10,000+</span>
                  <span className="stat-label">Active Users</span>
                </div>
                <div className="stat-chip">
                  <span className="stat-value">40% Latency</span>
                  <span className="stat-label">System Optimization</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
