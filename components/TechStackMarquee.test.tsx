import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TechStackMarquee, DEFAULT_TECH_STACK } from "@/components/TechStackMarquee";

describe("TechStackMarquee", () => {
  it("renders two seamless marquee tracks for provided items", () => {
    render(<TechStackMarquee items={["Next.js", "TypeScript"]} />);

    // Each item appears once per track (2 tracks total).
    expect(screen.getAllByText("Next.js")).toHaveLength(2);
    expect(screen.getAllByText("TypeScript")).toHaveLength(2);

    const list = screen.getAllByRole("list", { hidden: true });
    expect(list).toHaveLength(2);
    expect(list[0]).not.toHaveAttribute("aria-hidden");
    expect(list[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("falls back to defaults when items are empty", () => {
    render(<TechStackMarquee items={[]} />);
    for (const item of DEFAULT_TECH_STACK) {
      expect(screen.getAllByText(item)).toHaveLength(2);
    }
  });
});
