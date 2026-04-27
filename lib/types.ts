export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  headline: string;
  bio: string;
  location?: string;
  avatar?: string;
  primaryCta: SocialLink;
};

export type TechStackData = {
  items: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  image?: string;
};
