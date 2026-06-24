export interface Project {
  id: string;
  title: string;
  subHeader: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  tags: string[];
  image: string;
  imageArr: string[];
  url: string;
  githubUrl?: string;
  live?: boolean;
}

export interface Experience {
  id: string;
  year: string;
  company: string;
  role: string;
  description: string;
  current?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface Social {
  platform: string;
  url: string;
  iconName: string;
}
