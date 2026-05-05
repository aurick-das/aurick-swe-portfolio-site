import { z } from "zod";

export const socialLinkSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  url: z.string().url()
});

export const profileSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  bio: z.string().min(1),
  location: z.string().optional(),
  avatar: z.string().optional(),
  primaryCta: socialLinkSchema
});

export const techStackSchema = z.object({
  items: z.array(z.string().min(1)).min(1)
});

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string().min(1)).min(1),
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean(),
  order: z.number().int(),
  image: z.string().optional()
});

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z
    .union([z.string(), z.date()])
    .transform((value) => (value instanceof Date ? value.toISOString() : value))
    .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date"),
  summary: z.string().min(1),
  tags: z.array(z.string().min(1)).optional(),
  draft: z.boolean().optional()
});

export const projectsSchema = z.array(projectSchema).min(1);
export const socialLinksSchema = z.array(socialLinkSchema).min(1);
