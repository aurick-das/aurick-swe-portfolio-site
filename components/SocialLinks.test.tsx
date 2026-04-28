import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";

import { SocialLinks } from "@/components/SocialLinks";
import type { SocialLink } from "@/lib/types";

const links: SocialLink[] = [
  { id: "github", label: "GitHub", url: "https://github.com/example" },
  { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/example" }
];

describe("SocialLinks", () => {
  beforeEach(() => {
    render(<SocialLinks links={links} />);
  });

  it("renders all provided links with accessible labels", () => {
    expect(screen.getByRole("link", { name: "Open GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/example"
    );
    expect(screen.getByRole("link", { name: "Open LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/example"
    );
  });

  it("renders target and rel attributes for external navigation", () => {
    for (const link of links) {
      const anchor = screen.getByRole("link", { name: `Open ${link.label}` });
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noreferrer");
    }
  });

  it("renders nothing when links array is empty", () => {
    render(<SocialLinks links={[]} />); 
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});