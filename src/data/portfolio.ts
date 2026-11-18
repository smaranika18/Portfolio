import type {
  Certification,
  Education,
  ExperienceItem,
  NavigationItem,
  ProfileLink,
  Project,
  Skill,
  SkillCategory,
} from '../types/portfolio';

export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', iconClass: 'fa-solid fa-house' },
  { id: 'about', label: 'About', iconClass: 'fa-solid fa-user' },
  { id: 'experience', label: 'Experience', iconClass: 'fa-solid fa-briefcase' },
  { id: 'projects', label: 'Projects', iconClass: 'fa-solid fa-code' },
  { id: 'skills', label: 'Skills', iconClass: 'fa-solid fa-layer-group' },
  { id: 'certifications', label: 'Certs', iconClass: 'fa-solid fa-award' },
  { id: 'education', label: 'Education', iconClass: 'fa-solid fa-graduation-cap' },
  { id: 'profiles', label: 'Profiles', iconClass: 'fa-solid fa-globe' },
  { id: 'contact', label: 'Contact', iconClass: 'fa-solid fa-envelope' },
];

export const roles = [
  'React Native Developer',
  'Full Stack Engineer',
  'Node.js Developer',
  'AI Integration Specialist',
];

export const experiences: ExperienceItem[] = [
  {
    index: '01',
    date: 'AUG 2025 – PRESENT',
    tag: 'SaaS / FinTech',
    iconClass: 'fa-solid fa-laptop-code',
    title: 'FullStack Developer',
    company: 'iTCart Pvt. Ltd',
    location: 'Bengaluru, India',
    description:
      'Sole developer on 3 production SaaS products — CollectPro, FieldGo (Android), AixHub — serving 10,000+ users across banking, collections, and HR-Tech domains.',
    highlights: [
      'Built AixHub end-to-end: AI face authentication for attendance, real-time GPS tracking, and React.js HR dashboard matching enterprise tools like Keka.',
      'Integrated Google Maps API for live field-agent tracking; reduced operational response time by 40%.',
      'Razorpay payment workflows with RBAC (3 user tiers) processing ₹50L+ monthly transactions with audit trails and fraud detection.',
      'Optimized Node.js REST APIs with Redis caching — cut response latency by 20%.',
    ],
    side: 'left',
  },
  {
    index: '02',
    date: 'JUL 2024 – JUL 2025',
    tag: 'Software Development',
    iconClass: 'fa-solid fa-pen-ruler',
    title: 'Software Developer',
    company: 'Tanama Software Pvt. Ltd',
    location: 'Bengaluru, India',
    description:
      'Developed cross-platform React Native and React.js applications, optimized performance, and built reusable component libraries.',
    highlights: [
      'Improved app performance by 25% via code splitting, lazy loading, and bundle optimization.',
      'Integrated Python REST APIs — reduced average API response times by 30% in production.',
      'Built a reusable component library of 50+ UI elements (Material-UI + Storybook), cutting team dev time by 35%.',
      'Achieved 99% uptime on critical endpoints through Postman API testing and automated regression suites.',
    ],
    side: 'right',
  },
];

export const projects: Project[] = [
  {
    date: '2025',
    tag: 'AI-Powered HR Platform',
    title: 'AixWorkforce360',
    description:
      'Full-stack HR Decision OS serving 5,000+ active users across HR, Manager, and Admin personas. Features an AI CoPilot delivering real-time HR suggestions — cutting average decision turnaround by 35%.',
    technologies: ['React.js', 'Node.js', 'REST APIs', 'AI CoPilot'],
    liveUrl: '#',
    githubUrl: '#',
    liveDisabled: true,
    githubDisabled: true,
  },
  {
    date: '2025',
    tag: 'AI Face Authentication',
    title: 'AixHub',
    description:
      'AI-powered HR identity & attendance platform with selfie-based biometric verification achieving 100% identity accuracy. React Native mobile app + React.js web portal with live GPS location tracking.',
    technologies: ['React Native', 'Node.js', 'Python', 'Face Recognition AI', 'Firebase'],
    liveUrl: '#',
    githubUrl: '#',
    liveDisabled: true,
    githubDisabled: true,
  },
  {
    date: '2025',
    tag: 'Banking SaaS',
    title: 'CollectPro',
    description:
      'Admin dashboard managing 5,000+ collection agents with real-time GPS tracking, live status, and route visualization. Secure payment collection processing ₹50L+ monthly transactions with RBAC and automated reconciliation.',
    technologies: ['React.js', 'Node.js', 'Google Maps API', 'Razorpay', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    liveDisabled: true,
    githubDisabled: true,
  },
  {
    date: '2024',
    tag: 'AI Development Tool',
    title: 'AI-Powered Code Assistant',
    description:
      'RAG pipeline (LangChain) for repository-level code assistance — reduced code review time by 50%. GPT-4 API integration for automated code review, bug detection, and intelligent documentation.',
    technologies: ['React.js', 'Node.js', 'OpenAI GPT-4', 'LangChain', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
    liveDisabled: true,
    githubDisabled: true,
  },
  {
    date: '2024',
    tag: 'Data Visualization',
    title: 'Enterprise Analytics Dashboard',
    description:
      'Comprehensive admin panel with role-based access, real-time analytics, and data visualization. Advanced filtering and search reducing data retrieval time by 40%.',
    technologies: ['React.js', 'Python FastAPI', 'PostgreSQL', 'Redux', 'Chart.js'],
    liveUrl: '#',
    githubUrl: '#',
    liveDisabled: true,
    githubDisabled: true,
  },
];

export const skillFilters: Array<{ id: SkillCategory; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'databases', label: 'Databases' },
  { id: 'cloud', label: 'Cloud / DevOps' },
  { id: 'ai', label: 'AI & Tools' },
  { id: 'payments', label: 'Payments' },
  { id: 'tools', label: 'Dev Tools' },
];

export const skills: Skill[] = [
  // Languages
  { name: 'JavaScript (ES6+)', iconClass: 'devicon-javascript-plain colored', categories: ['languages', 'frontend', 'backend'] },
  { name: 'TypeScript', iconClass: 'devicon-typescript-plain colored', categories: ['languages', 'frontend', 'backend'] },
  { name: 'Python', iconClass: 'devicon-python-plain colored', categories: ['languages', 'backend'] },
  { name: 'SQL', iconClass: 'devicon-azuresqldatabase-plain colored', categories: ['languages', 'databases'] },
  { name: 'HTML5', iconClass: 'devicon-html5-plain colored', categories: ['languages', 'frontend'] },
  { name: 'CSS3', iconClass: 'devicon-css3-plain colored', categories: ['languages', 'frontend'] },
  // Frontend
  { name: 'React.js', iconClass: 'devicon-react-original colored', categories: ['frontend'] },
  { name: 'Next.js', iconClass: 'devicon-nextjs-original', categories: ['frontend', 'backend'] },
  { name: 'React Native', iconClass: 'devicon-react-original colored', categories: ['frontend'] },
  { name: 'Redux', iconClass: 'devicon-redux-original colored', categories: ['frontend'] },
  { name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-original colored', categories: ['frontend'] },
  { name: 'Material-UI', iconClass: 'devicon-materialui-plain colored', categories: ['frontend'] },
  // Backend
  { name: 'Node.js', iconClass: 'devicon-nodejs-plain colored', categories: ['backend'] },
  { name: 'Express.js', iconClass: 'devicon-express-original', categories: ['backend'] },
  { name: 'FastAPI', iconClass: 'devicon-fastapi-plain colored', categories: ['backend'] },
  { name: 'REST APIs', iconClass: 'fa-solid fa-plug', categories: ['backend'] },
  // Databases
  { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain colored', categories: ['databases'] },
  { name: 'MySQL', iconClass: 'devicon-mysql-original colored', categories: ['databases'] },
  { name: 'MongoDB', iconClass: 'devicon-mongodb-plain colored', categories: ['databases'] },
  { name: 'Firebase', iconClass: 'devicon-firebase-plain colored', categories: ['databases', 'cloud'] },
  { name: 'Redis', iconClass: 'devicon-redis-plain colored', categories: ['databases'] },
  // Cloud / DevOps
  { name: 'AWS', iconClass: 'devicon-amazonwebservices-plain-wordmark colored', categories: ['cloud'] },
  { name: 'Docker', iconClass: 'devicon-docker-plain colored', categories: ['cloud'] },
  { name: 'GitHub Actions', iconClass: 'devicon-githubactions-plain colored', categories: ['cloud'] },
  { name: 'Vercel', iconClass: 'devicon-vercel-original', categories: ['cloud'] },
  // AI & Tools
  { name: 'OpenAI', iconClass: 'fa-solid fa-brain', categories: ['ai'] },
  { name: 'LangChain (RAG)', iconClass: 'fa-solid fa-link', categories: ['ai'] },
  { name: 'Face Recognition AI', iconClass: 'fa-solid fa-face-smile', categories: ['ai'] },
  { name: 'Prompt Engineering', iconClass: 'fa-solid fa-wand-magic-sparkles', categories: ['ai'] },
  // Payments
  { name: 'Razorpay', iconClass: 'fa-solid fa-credit-card', categories: ['payments'] },
  { name: 'Stripe', iconClass: 'devicon-stripe-plain colored', categories: ['payments'] },
  // Dev Tools
  { name: 'Postman', iconClass: 'devicon-postman-plain colored', categories: ['tools'] },
  { name: 'Git', iconClass: 'devicon-git-plain colored', categories: ['tools'] },
  { name: 'Figma', iconClass: 'devicon-figma-plain colored', categories: ['tools'] },
  { name: 'Android Studio', iconClass: 'devicon-androidstudio-plain colored', categories: ['tools'] },
  { name: 'VS Code', iconClass: 'devicon-vscode-plain colored', categories: ['tools'] },
];

export const certifications: Certification[] = [
  {
    tag: 'Full Stack',
    title: 'MERN Stack Development',
    description:
      'Comprehensive training in MongoDB, Express.js, React.js, and Node.js covering end-to-end web application development.',
    iconClass: 'fa-solid fa-layer-group',
    credentialUrl: '#',
  },
  {
    tag: 'Mobile Development',
    title: 'React Native Specialization',
    description:
      'Professional specialization from Meta covering cross-platform mobile app development with React Native.',
    iconClass: 'fa-solid fa-mobile-screen-button',
    credentialUrl: '#',
  },
];

export const education: Education = {
  degree: 'B.Tech — Computer Science Engineering',
  university: 'Biju Patnaik University of Technology',
  location: 'Odisha, India',
  period: '2020 – 2024',
};

export const profileLinks: ProfileLink[] = [
  { name: 'LinkedIn', action: 'Connect', href: 'https://linkedin.com/in/smaranika', iconClass: 'fa-brands fa-linkedin' },
  { name: 'GitHub', action: 'Commit', href: 'https://github.com/smaranika', iconClass: 'fa-brands fa-github' },
];
