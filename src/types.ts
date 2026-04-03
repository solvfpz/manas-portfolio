
export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github: string;
  image: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  logo: string;
  isIntern?: boolean;
  isRemote?: boolean;
}

export interface Contribution {
  repo: string;
  title: string;
  type: 'merge' | 'pull-request';
}

export interface BlogPost {
  title: string;
  summary: string;
  publishedAt: string;
  slug: string;
}

export interface Skill {
  name: string;
  icon: string;
}
