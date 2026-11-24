import { useEffect, useRef } from 'react';
import resumePdf from '../Documents/Sam_Resume_v1.pdf';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps): JSX.Element {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle('modal-open', open);

    if (open) {
      closeButtonRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && open) onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [onClose, open]);

  return (
    <div className={`modal${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="resumeTitle" aria-hidden={!open}>
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close resume preview" />
      <div className="modal-panel">
        <div className="modal-header">
          <div><span className="tag">Resume</span><h2 id="resumeTitle">My Resume - <span className="gradient-text">On Paper!</span></h2></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={resumePdf}
              download="Sam_Resume_v1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="button ghost"
              style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none' }}
              aria-label="Download resume PDF"
            >
              <i className="fa-solid fa-download" style={{ marginRight: '6px' }} />
              Download PDF
            </a>
            <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Close resume" onClick={onClose}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>
        <div className="resume-frame">
          <iframe title="Resume preview" src={`${resumePdf}#toolbar=0&navpanes=0`} />
          <div className="resume-fallback">
            <i className="fa-regular fa-file-pdf" />
            <p>Viewing resume inline is not supported on this device/browser.</p>
            <a
              href={resumePdf}
              download="Sam_Resume_v1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="button primary"
              style={{ marginTop: '8px', textDecoration: 'none' }}
            >
              <i className="fa-solid fa-download" style={{ marginRight: '6px' }} />
              Download / Open Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
