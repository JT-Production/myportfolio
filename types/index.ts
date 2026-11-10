export interface Project {
  id: string;
  legacyIds?: string[];
  title: string;
  subHeader: string;
  categories: string[];
  role: string[];
  company?: string;
  period?: string;
  summary: string;
  description: string;
  technologies: string[];
  image?: string;
  gallery?: ProjectImage[];
  theme: string;
  featured?: boolean;
  caseStudy: ProjectCaseStudy;
}

export interface ProjectImage {
  src?: string;
  alt: string;
  caption?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectProcessStep {
  title: string;
  description: string;
}

export interface ProjectCaseStudy {
  overview: string;
  challenge: string;
  contributions: string[];
  process?: ProjectProcessStep[];
  features?: ProjectFeature[];
  technicalDetails?: string[];
  learnings: string[];
}

export interface Experience {
  id: string;
  year: string;
  company: string;
  role: string;
  description: string;
  current?: boolean;
}

export interface Social {
  platform: string;
  url: string;
}
