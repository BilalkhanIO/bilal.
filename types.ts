export interface TechnicalDecision {
  decision: string;
  reason: string;
}

export interface ProjectMetrics {
  performanceImprovement?: string;
  accessibilityScore?: string;
  codeQuality?: string;
  userImpact?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortSummary: string;
  longSummary?: string;
  tags: string[];
  image: string;
  featured: boolean;
  problem?: string;
  solution?: string;
  techStack?: string[];
  github?: string;
  demo?: string | null;
  codeSnippet?: string;
  metrics?: ProjectMetrics;
  challenges?: string[];
  technicalDecisions?: TechnicalDecision[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  current: boolean;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Frontend' | 'Tools' | 'State & Data' | 'UI' | 'Backend';
}