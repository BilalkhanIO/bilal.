import { Experience, Project, Skill, Education, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Bilal Ahmad",
  title: "Frontend Architect & Maps Specialist",
  location: "Barakahu, Islamabad, Pakistan",
  email: "Bilalkhan301dir@gmail.com",
  github: "https://github.com/BilalkhanIO",
  phone: "+923015622864",
  tagline: "Specialized in Map-based Applications & Complex Admin Dashboards with React. I build interfaces that make complex geographical data intuitive."
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'itshifts',
    role: 'Frontend Developer (React Maps Specialist)',
    company: 'ItShifts',
    period: 'April 2025 – Present',
    description: 'Leading frontend architecture for enterprise-grade mapping solutions and dashboards.',
    achievements: [
      'Architected high-performance map visualizations using Google Maps API, handling 5000+ data points with clusterization.',
      'Designed a modular React + Redux architecture that improved application scalability by 40%.',
      'Implemented offline-first capabilities for field agents using Service Workers and IndexedDB.',
      'Spearheaded mobile-first responsive design overhaul, increasing mobile engagement by 25%.'
    ],
    current: true
  },
  {
    id: 'jazz',
    role: 'Business & Tech Analyst',
    company: 'Moblink Jazz',
    period: 'June 2024 – March 2025',
    description: 'Bridging technical implementation and business strategy for Pakistan\'s largest telco.',
    achievements: [
      'Evaluated and prototyped React-based dashboard solutions to replace legacy procurement systems.',
      'Conducted critical UAT for SAP Ariba integrations, identifying 15+ critical UI/UX bottlenecks.',
      'Delivered data visualization reports for C-level executives affecting strategic resource allocation.'
    ],
    current: false
  },
  {
    id: 'syslab',
    role: 'Frontend Developer Intern',
    company: 'Syslab Technologies',
    period: 'August 2023 – June 2024',
    description: 'Building foundational expertise in React ecosystem and UI development.',
    achievements: [
      'Developed reusable component library reducing development time for internal tools by 30%.',
      'Migrated legacy jQuery interfaces to modern functional React components with Hooks.',
      'Optimized asset loading strategies, improving First Contentful Paint (FCP) by 1.5s.'
    ],
    current: false
  }
];

export const EDUCATION: Education[] = [
  {
    id: 'uni',
    degree: 'BS in Software Engineering',
    school: 'Abdul Wali Khan University',
    period: '2019 – 2023',
    description: 'Focus on Human-Computer Interaction and Web Engineering.'
  },
  {
    id: 'hssc',
    degree: 'HSSC (Pre-Engineering)',
    school: 'Al-Islamia Model College',
    period: '2017 – 2019'
  }
];

export const CERTIFICATIONS: Certification[] = [
  { id: 'meta-1', name: 'Advanced React', issuer: 'Meta', date: 'Feb 2023' },
  { id: 'meta-2', name: 'Front-End Developer Professional Certificate', issuer: 'Meta', date: 'Jan 2023' },
  { id: 'meta-3', name: 'Principles of UX/UI Design', issuer: 'Meta', date: 'Dec 2022' }
];

export const SKILLS: Skill[] = [
  { name: 'React JS / Next.js', level: 98, category: 'Frontend' },
  { name: 'Google Maps API', level: 95, category: 'Tools' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Redux Toolkit', level: 90, category: 'State & Data' },
  { name: 'Tailwind CSS', level: 95, category: 'UI' },
  { name: 'Data Visualization (D3/Recharts)', level: 85, category: 'UI' },
  { name: 'Node JS', level: 75, category: 'Backend' },
  { name: 'Performance Optimization', level: 88, category: 'Tools' }
];

export const PROJECTS: Project[] = [
  {
    slug: 'risktrack',
    title: 'RiskTrack',
    featured: true,
    shortSummary: 'Enterprise-grade travel safety platform with real-time risk visualization on Google Maps.',
    longSummary: 'A sophisticated safety monitoring application that processes real-time data to visualize potential travel risks. Designed for high-stakes environments where accurate, lag-free geospatial data is critical.',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1200',
    tags: ['Maps Architecture', 'React', 'Enterprise'],
    techStack: ['React 18', 'Google Maps API', 'TypeScript', 'Redux Toolkit', 'WebSocket'],
    problem: 'Travelers in volatile regions lack granular, real-time visualization of safety zones, relying on static lists rather than dynamic geospatial intelligence.',
    solution: 'Engineered a real-time map interface utilizing custom overlays and spatial indexing to render risk zones instantly. Integrated community-sourced data streams for up-to-the-minute safety alerts.',
    codeSnippet: `// Optimized Cluster Rendering Strategy
const MapMarkers = memo(({ locations }) => {
  const clusterer = useRef<MarkerClusterer>();
  
  useEffect(() => {
    if (!map) return;
    
    // Efficiently manage 1000+ markers without UI blocking
    clusterer.current = new MarkerClusterer({
      map,
      markers: locations.map(loc => new google.maps.Marker({
        position: loc.coords,
        icon: getRiskIcon(loc.riskLevel)
      })),
      algorithm: new SuperClusterAlgorithm({ radius: 60 })
    });
    
    return () => clusterer.current?.clearMarkers();
  }, [map, locations]);

  return null; // Logic-only component for performance
});`,
    github: 'https://github.com/BilalkhanIO',
    metrics: {
      performanceImprovement: '40% faster map load',
      accessibilityScore: 'WCAG 2.1 AA Compliant',
      codeQuality: '95% Test Coverage',
      userImpact: '500+ Safer Routes'
    },
    challenges: [
      'Rendering 5,000+ risk data points without degrading main thread performance.',
      'Handling offline map states for users in low-bandwidth remote areas.',
      'Synchronizing real-time WebSocket safety alerts with map overlays.'
    ],
    technicalDecisions: [
      { decision: 'Used @googlemaps/js-api-loader', reason: 'To strictly control bundle size and lazy-load map assets only when required.' },
      { decision: 'Implemented SuperCluster Algorithm', reason: 'To maintain 60fps scrolling performance while clustering thousands of markers.' },
      { decision: 'Custom Dark Mode Map Styles', reason: 'Reduced visual fatigue for night-time navigation and improved contrast for risk zones.' }
    ]
  },
  {
    slug: 'school-management',
    title: 'EduCore ERP',
    featured: true,
    shortSummary: 'Comprehensive multi-tenant SaaS for educational institution management.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
    tags: ['Dashboard', 'MERN', 'SaaS'],
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Redis', 'Docker'],
    problem: 'Traditional school management software is clunky, non-responsive, and lacks real-time communication channels between parents and staff.',
    solution: 'Built a modern, role-based dashboard system with real-time notification capability, automated payroll processing, and student performance analytics.',
    metrics: {
        performanceImprovement: '2x Faster Reporting',
        userImpact: '50+ Schools Onboarded'
    }
  },
  {
    slug: 'admin-dashboard',
    title: 'Analytics Prime',
    featured: false,
    shortSummary: 'High-fidelity analytics dashboard with complex data visualization widgets.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags: ['UI/UX', 'Data Viz', 'React'],
    techStack: ['React', 'Material UI', 'Nivo Charts', 'TanStack Query'],
    problem: 'Clients needed a way to visualize millions of data rows without browser crashes.',
    solution: 'Implemented virtualized data grids and server-side aggregation for charts.'
  },
  {
    slug: 'foodie-fyp',
    title: 'Foodie Express',
    featured: false,
    shortSummary: 'Full-stack food delivery marketplace with real-time order tracking.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    tags: ['MERN', 'Consumer App'],
    techStack: ['React', 'Node.js', 'Socket.io', 'Stripe']
  },
  {
    slug: 'ai-summarizer',
    title: 'Briefly AI',
    featured: false,
    shortSummary: 'Content distillation tool using OpenAI GPT-4 for long-form text analysis.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['AI Integration', 'Tool'],
    techStack: ['React', 'OpenAI API', 'Tailwind CSS']
  },
  {
    slug: 'auth-app',
    title: 'SecureAuth System',
    featured: false,
    shortSummary: 'Enterprise-grade authentication module with 2FA and session management.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    tags: ['Security', 'Backend'],
    techStack: ['Node.js', 'Passport.js', 'JWT', 'Redis']
  }
];