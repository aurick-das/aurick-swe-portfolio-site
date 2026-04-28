import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/types";

const baseProject: Project = {
  id: "p1",
  title: "Project One",
  description: "Description",
  tech: ["Next.js", "TypeScript"],
  featured: true,
  order: 1,
  liveUrl: "https://example.com/live",
  repoUrl: "https://github.com/example/repo"
};

describe("ProjectCard", () => {
  it("renders featured badge and external links when provided", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Live" })).toHaveAttribute(
      "href",
      baseProject.liveUrl
    );
    expect(screen.getByRole("link", { name: "Code" })).toHaveAttribute(
      "href",
      baseProject.repoUrl
    );
  });

  it("hides links and badge when values are absent", () => {
    render(
      <ProjectCard
        project={{
          ...baseProject,
          featured: false,
          liveUrl: undefined,
          repoUrl: undefined
        }}
      />
    );

    expect(screen.queryByText("Featured")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Live" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Code" })).not.toBeInTheDocument();
  });

  it("renders external link security attributes", () => {
    render(<ProjectCard project={baseProject} />);
    const liveLink = screen.getByRole("link", { name: "Live" });
    const codeLink = screen.getByRole("link", { name: "Code" });
  
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", "noreferrer");
    expect(codeLink).toHaveAttribute("target", "_blank");
    expect(codeLink).toHaveAttribute("rel", "noreferrer");
  });

  it("renders tech stack tags", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
