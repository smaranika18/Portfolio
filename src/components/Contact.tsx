import { useState, type FormEvent } from 'react';
import resumePdf from '../Documents/Sam_Resume_v1.pdf';
import type { ContactStatus } from '../types/portfolio';

function getErrorMessage(payload: unknown): string | undefined {
  if (typeof payload !== 'object' || payload === null || !('error' in payload)) return undefined;
  const error = (payload as { error?: unknown }).error;
  return typeof error === 'string' ? error : undefined;
}

export function Contact(): JSX.Element {
  const [status, setStatus] = useState<ContactStatus>({ state: 'idle', message: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    setStatus({ state: 'sending', message: 'Sending...' });

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: unknown = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(getErrorMessage(data) || 'Could not send message.');

      setStatus({ state: 'success', message: 'Message sent successfully. Thank you!' });
      form.reset();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Could not send message.';
      setStatus({
        state: 'error',
        message: message.includes('Failed to fetch')
          ? 'Contact backend is not running. Deploy on Vercel or run `vercel dev` locally.'
          : message,
      });
    }
  };

  return (
    <section id="contact" className="content-section contact-section section-anchor">
      <div className="container contact-grid">
        <div className="contact-copy reveal">
          <p className="section-kicker">08 / CONTACT</p>
          <h2>Get In Touch - <span className="gradient-text">Let's Build Together!</span></h2>
          <h3>Ready to collaborate or have a project in mind?</h3>
          <p>I'm always open to meaningful opportunities, interesting engineering problems and conversations about scalable SaaS products worth building.</p>
          <div className="contact-links" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '18px' }}>
            <a className="contact-email" href="mailto:smaranikapattnayak97@gmail.com">
              <i className="fa-regular fa-envelope" /> smaranikapattnayak97@gmail.com
            </a>
            <a className="contact-email" href="tel:+918260670977">
              <i className="fa-solid fa-phone" /> +91 8260670977
            </a>
            <a
              className="contact-email"
              href="https://www.instagram.com/sam.and.her.20s?cnvx=MWc1Mnk4ZXg5dzRwcg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram: @sam.and.her.20s"
            >
              <i className="fa-brands fa-instagram" /> @sam.and.her.20s
            </a>
            <a
              className="contact-email"
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              download="Sam_Resume_v1.pdf"
              aria-label="Download Sam's Resume PDF"
            >
              <i className="fa-solid fa-file-arrow-down" /> Download Resume (PDF)
            </a>
          </div>
        </div>

        <form className="contact-form glass-card reveal" onSubmit={handleSubmit}>
          <div className="field-row">
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required placeholder="Smaranika" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea name="message" rows={7} required placeholder="Tell me about the idea, role or problem..." />
          </label>
          <button className="button primary form-button" type="submit" disabled={status.state === 'sending'}>
            <span>Send Message</span><i className="fa-regular fa-paper-plane" />
          </button>
          <p className={`form-status${status.state === 'success' ? ' success' : status.state === 'error' ? ' error' : ''}`} aria-live="polite">
            {status.message}
          </p>
        </form>
      </div>
    </section>
  );
}
