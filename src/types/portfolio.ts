export type SectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'education'
  | 'profiles'
  | 'contact';

export interface NavigationItem {
  id: SectionId;
  label: string;
  iconClass: string;
}

export interface ExperienceItem {
  index: string;
  date: string;
  tag: string;
  iconClass: string;
  title: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  side: 'left' | 'right';
}

export interface Project {
  date: string;
  tag: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  liveDisabled?: boolean;
  githubDisabled?: boolean;
}

export type SkillCategory =
  | 'all'
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'cloud'
  | 'ai'
  | 'payments'
  | 'tools';

export interface Skill {
  name: string;
  iconClass: string;
  categories: Exclude<SkillCategory, 'all'>[];
}

export interface Certification {
  tag: string;
  title: string;
  description: string;
  iconClass: string;
  credentialUrl: string;
}

export interface Education {
  degree: string;
  university: string;
  location: string;
  period: string;
}

export interface ProfileLink {
  name: string;
  action: string;
  href: string;
  iconClass: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export type ContactStatus =
  | { state: 'idle'; message: '' }
  | { state: 'sending'; message: string }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };
