import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TechStackMarquee, DEFAULT_TECH_STACK } from "@/components/TechStackMarquee";

describe("TechStackMarquee", () => {
  it("renders two seamless marquee tracks for provided items", () => {
    const { container } = render(<TechStackMarquee items={["Next.js", "TypeScript"]} />);

    // Each item appears once per track (2 tracks total).
    expect(screen.getAllByText("Next.js")).toHaveLength(2);
    expect(screen.getAllByText("TypeScript")).toHaveLength(2);

    // Only the first `<ul>` is a list; the duplicate uses role="presentation".
    expect(screen.getAllByRole("list")).toHaveLength(1);
    expect(screen.getByRole("list")).not.toHaveAttribute("aria-hidden");

    const decorative = container.querySelector(
      "ul[aria-hidden='true'][role='presentation']"
    );
    expect(decorative).toBeInstanceOf(HTMLUListElement);
  });

  it("falls back to defaults when items are empty", () => {
    render(<TechStackMarquee items={[]} />);
    for (const item of DEFAULT_TECH_STACK) {
      expect(screen.getAllByText(item)).toHaveLength(2);
    }
  });
});
