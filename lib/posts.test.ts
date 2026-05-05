import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { getAllPostMeta, getAllPostSlugs, getPostBySlug } from "@/lib/posts";

let fixturesDir = "";
const originalPostsDir = process.env.POSTS_DIR;
const originalNodeEnv = process.env.NODE_ENV;
const mutableEnv = process.env as Record<string, string | undefined>;

function writePost(fileName: string, content: string): void {
  writeFileSync(path.join(fixturesDir, fileName), content, "utf-8");
}

describe("posts loader", () => {
  beforeAll(() => {
    fixturesDir = mkdtempSync(path.join(tmpdir(), "posts-fixtures-"));
    process.env.POSTS_DIR = fixturesDir;

    writePost(
      "alpha.md",
      `---
title: Alpha
date: 2026-02-01
summary: Alpha summary
---
Alpha body`
    );
    writePost(
      "newest.md",
      `---
title: Newest
date: "2026-04-15"
summary: Newest summary
---
Newest body`
    );
    writePost(
      "draft.md",
      `---
title: Draft Post
date: 2026-03-01
summary: Hidden in production
draft: true
---
Draft body`
    );
    writePost("notes.txt", "not a markdown post");
  });

  afterEach(() => {
    mutableEnv.NODE_ENV = originalNodeEnv;
  });

  afterAll(() => {
    rmSync(fixturesDir, { recursive: true, force: true });
    mutableEnv.POSTS_DIR = originalPostsDir;
    mutableEnv.NODE_ENV = originalNodeEnv;
  });

  it("sorts post metadata by date descending", () => {
    mutableEnv.NODE_ENV = "test";
    const posts = getAllPostMeta();

    expect(posts.map((post) => post.slug)).toEqual(["newest", "draft", "alpha"]);
  });

  it("includes drafts outside production but excludes them in production", () => {
    mutableEnv.NODE_ENV = "test";
    expect(getAllPostSlugs()).toContain("draft");

    mutableEnv.NODE_ENV = "production";
    expect(getAllPostSlugs()).not.toContain("draft");
  });

  it("normalizes yaml date values into valid ISO strings", () => {
    mutableEnv.NODE_ENV = "test";
    const posts = getAllPostMeta();
    const newest = posts.find((post) => post.slug === "newest");
    const alpha = posts.find((post) => post.slug === "alpha");

    expect(newest).toBeDefined();
    expect(alpha).toBeDefined();
    expect(newest?.date).toBe("2026-04-15");
    expect(alpha?.date).toContain("2026-02-01T");
  });

  it("returns rendered html for known slug and null for unknown", () => {
    mutableEnv.NODE_ENV = "test";
    const newestPost = getPostBySlug("newest");
    const missingPost = getPostBySlug("missing-post");

    expect(newestPost).not.toBeNull();
    expect(newestPost?.title).toBe("Newest");
    expect(newestPost?.html).toContain("<p>Newest body</p>");
    expect(missingPost).toBeNull();
  });

  it("returns empty list when directory is missing or has no markdown files", () => {
    const missingDir = path.join(fixturesDir, "missing-dir");
    mutableEnv.POSTS_DIR = missingDir;
    expect(getAllPostMeta()).toEqual([]);

    const nonMarkdownDir = path.join(fixturesDir, "non-markdown");
    mkdirSync(nonMarkdownDir, { recursive: true });
    writeFileSync(path.join(nonMarkdownDir, "readme.txt"), "plain text", "utf-8");
    mutableEnv.POSTS_DIR = nonMarkdownDir;
    expect(getAllPostMeta()).toEqual([]);

    mutableEnv.POSTS_DIR = fixturesDir;
  });

  it("throws for invalid frontmatter schema", () => {
    const invalidDir = path.join(fixturesDir, "invalid");
    mkdirSync(invalidDir, { recursive: true });
    writeFileSync(
      path.join(invalidDir, "broken.md"),
      `---
title: Broken
date: 2026-05-01
---
Missing required summary`,
      "utf-8"
    );

    mutableEnv.POSTS_DIR = invalidDir;
    expect(() => getAllPostMeta()).toThrow();

    mutableEnv.POSTS_DIR = fixturesDir;
  });
});
