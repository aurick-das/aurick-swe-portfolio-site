import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteNav } from "@/components/SiteNav";

describe("SiteNav", () => {
  it("renders a nav landmark with aria-label", () => {
    render(<SiteNav />);
    expect(screen.getByRole("navigation", { name: "Site" })).toBeInTheDocument();
  });

  it("links Home and Blog with correct hrefs in tab order", () => {
    render(<SiteNav />);
    const nav = screen.getByRole("navigation", { name: "Site" });
    const links = within(nav).getAllByRole("link");

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[0]).toHaveTextContent("Home");
    expect(links[1]).toHaveAttribute("href", "/blog");
    expect(links[1]).toHaveTextContent("Blog");
  });
});
