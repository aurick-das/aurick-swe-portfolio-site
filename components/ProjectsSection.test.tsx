import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectsSection } from "@/components/ProjectsSection";
import type { Project } from "@/lib/types";

const baseProjects: Project[] = [
  {
    id: "p1",
    title: "Project One",
    description: "First project description",
    tech: ["Next.js"],
    featured: true,
    order: 1,
    liveUrl: "https://example.com/one",
    repoUrl: "https://github.com/example/one"
  },
  {
    id: "p2",
    title: "Project Two",
    description: "Second project description",
    tech: ["TypeScript"],
    featured: false,
    order: 2
  }
];

describe("ProjectsSection", () => {
  it("renders the section heading", () => {
    render(<ProjectsSection projects={baseProjects} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Projects" })
    ).toBeInTheDocument();
  });

  it("renders a card for each project", () => {
    render(<ProjectsSection projects={baseProjects} />);
    expect(screen.getByText("Project One")).toBeInTheDocument();
    expect(screen.getByText("Project Two")).toBeInTheDocument();
  });

  describe("when projects list is empty", () => {
    it("renders the heading but no cards", () => {
      render(<ProjectsSection projects={[]} />);
      expect(
        screen.getByRole("heading", { level: 2, name: "Projects" })
      ).toBeInTheDocument();
      // project titles are not present
      expect(screen.queryByText("Project One")).not.toBeInTheDocument();
    });
  });
});