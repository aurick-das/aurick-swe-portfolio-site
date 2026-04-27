import profileJson from "@/data/profile.json";
import projectsJson from "@/data/projects.json";
import socialLinksJson from "@/data/social-links.json";
import techStackJson from "@/data/tech-stack.json";
import {
  profileSchema,
  projectsSchema,
  socialLinksSchema,
  techStackSchema
} from "@/lib/schema";
import type { Profile, Project, SocialLink, TechStackData } from "@/lib/types";

export function getProfile(): Profile {
  return profileSchema.parse(profileJson);
}

export function getSocialLinks(): SocialLink[] {
  return socialLinksSchema.parse(socialLinksJson);
}

export function getTechStack(): TechStackData {
  return techStackSchema.parse(techStackJson);
}

export function getProjects(): Project[] {
  const parsed = projectsSchema.parse(projectsJson);
  return [...parsed].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return a.order - b.order;
  });
}
