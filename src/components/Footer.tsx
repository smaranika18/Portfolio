import resumePdf from '../Documents/Sam_Resume_v1.pdf';

export function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div><h2>Smaranika Pattnayak</h2><p>Building Scalable SaaS at the Intersection of Code and AI!</p></div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#certifications">Certifications</a>
          <a href="#education">Education</a>
          <a href="#profiles">Profiles</a>
          <a href="#contact">Contact</a>
          <a href={resumePdf} target="_blank" rel="noopener noreferrer">Resume</a>
          <a href="https://www.instagram.com/sam.and.her.20s?cnvx=MWc1Mnk4ZXg5dzRwcg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
        <p className="footer-copy">© {year} Smaranika Pattnayak. All rights reserved.</p>
      </div>
    </footer>
  );
}
