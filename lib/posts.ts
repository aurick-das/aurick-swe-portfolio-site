import "server-only";

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import { postFrontmatterSchema } from "@/lib/schema";
import type { Post, PostMeta } from "@/lib/types";

function getPostsDirectory(): string {
  return process.env.POSTS_DIR ?? path.join(process.cwd(), "posts");
}

function isMarkdownFile(fileName: string): boolean {
  return fileName.toLowerCase().endsWith(".md");
}

function toSlug(fileName: string): string {
  return fileName.replace(/\.md$/i, "");
}

function parseFrontmatter(fileName: string): PostMeta {
  const fullPath = path.join(getPostsDirectory(), fileName);
  const source = readFileSync(fullPath, "utf-8");
  const { data } = matter(source);
  const parsed = postFrontmatterSchema.parse(data);

  return {
    slug: toSlug(fileName),
    title: parsed.title,
    date: parsed.date,
    summary: parsed.summary,
    tags: parsed.tags,
    draft: parsed.draft
  };
}

function listPostFiles(): string[] {
  const postsDir = getPostsDirectory();
  if (!existsSync(postsDir)) {
    return [];
  }

  return readdirSync(postsDir).filter(isMarkdownFile);
}

export function getAllPostMeta(): PostMeta[] {
  const includeDrafts = process.env.NODE_ENV !== "production";

  return listPostFiles()
    .map(parseFrontmatter)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getAllPostSlugs(): string[] {
  return getAllPostMeta().map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | null {
  const fileName = `${slug}.md`;
  if (!listPostFiles().includes(fileName)) {
    return null;
  }

  const fullPath = path.join(getPostsDirectory(), fileName);
  const source = readFileSync(fullPath, "utf-8");
  const { data, content } = matter(source);
  const parsed = postFrontmatterSchema.parse(data);
  const html = String(remark().use(remarkHtml).processSync(content));

  if (process.env.NODE_ENV === "production" && parsed.draft) {
    return null;
  }

  return {
    slug,
    title: parsed.title,
    date: parsed.date,
    summary: parsed.summary,
    tags: parsed.tags,
    draft: parsed.draft,
    html
  };
}
