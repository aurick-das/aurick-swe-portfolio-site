import { describe, expect, it } from "vitest";

import { getProfile, getProjects, getSocialLinks, getTechStack } from "@/lib/data";

describe("data loaders", () => {
  it("parses profile data", () => {
    const profile = getProfile();
    expect(profile.name).toBe("Aurick Das");
    expect(profile.primaryCta.url).toContain("https://");
  });

  it("parses social links", () => {
    const links = getSocialLinks();
    expect(links.length).toBeGreaterThan(0);
  });

  it("parses tech stack items", () => {
    const techStack = getTechStack();
    expect(techStack.items.length).toBeGreaterThan(0);
  });
});

describe("getProjects", () => {
  it("sorts featured projects first", () => {
    const projects = getProjects();
    const firstNonFeaturedIndex = projects.findIndex((project) => !project.featured);
    const trailingFeatured = projects.slice(firstNonFeaturedIndex).some((project) => project.featured);

    expect(firstNonFeaturedIndex).toBeGreaterThan(0);
    expect(trailingFeatured).toBe(false);
  });

  it("sorts each featured bucket by order ascending", () => {
    const projects = getProjects();
    const featuredOrders = projects.filter((project) => project.featured).map((project) => project.order);
    const nonFeaturedOrders = projects
      .filter((project) => !project.featured)
      .map((project) => project.order);

    expect(featuredOrders).toEqual([...featuredOrders].sort((a, b) => a - b));
    expect(nonFeaturedOrders).toEqual([...nonFeaturedOrders].sort((a, b) => a - b));
  });
});
