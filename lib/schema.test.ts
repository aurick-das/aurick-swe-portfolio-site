import { describe, expect, it } from "vitest";

import {
  profileSchema,
  projectsSchema,
  socialLinksSchema,
  techStackSchema
} from "@/lib/schema";

describe("profileSchema", () => {
  it("accepts valid profile data", () => {
    const parsed = profileSchema.parse({
      name: "Aurick",
      headline: "Frontend Engineer",
      bio: "Builds polished interfaces.",
      primaryCta: {
        id: "cta",
        label: "Book",
        url: "https://cal.com/example"
      }
    });

    expect(parsed).toBeDefined();
  });

  it("rejects an invalid CTA URL", () => {
    expect(() =>
      profileSchema.parse({
        name: "Aurick",
        headline: "Frontend Engineer",
        bio: "Builds polished interfaces.",
        primaryCta: {
          id: "cta",
          label: "Book",
          url: "not-a-url"
        }
      })
    ).toThrow();
  });
});

describe("techStackSchema", () => {
  it("rejects an empty list", () => {
    expect(() => techStackSchema.parse({ items: [] })).toThrow();
  });
});

describe("socialLinksSchema", () => {
  it("rejects malformed entries", () => {
    expect(() =>
      socialLinksSchema.parse([{ id: "", label: "X", url: "https://x.com/example" }])
    ).toThrow();
  });

  it("rejects an invalid URL", () => {
    expect(() =>
      socialLinksSchema.parse([{ id: "x", label: "X", url: "not-a-url" }])
    ).toThrow();
  });
  
  it("rejects an empty label", () => {
    expect(() =>
      socialLinksSchema.parse([{ id: "x", label: "", url: "https://x.com" }])
    ).toThrow();
  });
});

describe("projectsSchema", () => {
  it("accepts valid projects list", () => {
    const parsed = projectsSchema.parse([
      {
        id: "habit-loop",
        title: "Habit Loop",
        description: "Tracker",
        tech: ["Next.js"],
        featured: true,
        order: 1
      }
    ]);

    expect(parsed).toHaveLength(1);
  });

  it("rejects a project missing required fields", () => {
    expect(() =>
      projectsSchema.parse([{ id: "x", title: "X" }])
    ).toThrow();
  });
  
  it("rejects an empty projects list", () => {
    expect(() => projectsSchema.parse([])).toThrow();
  });
});
