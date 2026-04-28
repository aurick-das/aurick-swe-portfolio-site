import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSection } from "@/components/HeroSection";
import type { Profile } from "@/lib/types";

const baseProfile: Profile = {
  name: "Test User",
  headline: "Frontend Engineer",
  bio: "Builds polished interfaces.",
  primaryCta: {
    id: "cta",
    label: "Book a Call",
    url: "https://cal.com/example"
  }
};

describe("HeroSection", () => {
  it("renders the profile name as h1", () => {
    render(<HeroSection profile={baseProfile} />);
    expect(
      screen.getByRole("heading", { level: 1, name: baseProfile.name })
    ).toBeInTheDocument();
  });

  it("renders headline and bio", () => {
    render(<HeroSection profile={baseProfile} />);
    expect(screen.getByText(baseProfile.headline)).toBeInTheDocument();
    expect(screen.getByText(baseProfile.bio)).toBeInTheDocument();
  });

  it("renders CTA with correct href and security attributes", () => {
    render(<HeroSection profile={baseProfile} />);
    const link = screen.getByRole("link", { name: baseProfile.primaryCta.label });
    expect(link).toHaveAttribute("href", baseProfile.primaryCta.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  describe("location", () => {
    it("renders location when provided", () => {
      render(<HeroSection profile={{ ...baseProfile, location: "London" }} />);
      expect(screen.getByText("Based in London")).toBeInTheDocument();
    });

    it("omits location when absent", () => {
      render(<HeroSection profile={{ ...baseProfile, location: undefined }} />);
      expect(screen.queryByText(/Based in/)).not.toBeInTheDocument();
    });
  });
});