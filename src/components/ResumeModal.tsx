import { useEffect, useRef } from 'react';

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
          <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Close resume" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="resume-frame">
          <iframe title="Resume preview" src="/assets/resume.pdf#toolbar=0&navpanes=0" />
          <div className="resume-fallback"><i className="fa-regular fa-file-pdf" /><p>Add your PDF as <code>assets/resume.pdf</code>.</p></div>
        </div>
      </div>
    </div>
  );
}
