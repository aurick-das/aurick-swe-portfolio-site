import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogPostCard } from "@/components/BlogPostCard";
import type { PostMeta } from "@/lib/types";

const basePost: PostMeta = {
  slug: "hello-world",
  title: "Hello World",
  date: "2026-04-20",
  summary: "A short announcement introducing the new markdown work log.",
  tags: ["update", "meta"]
};

describe("BlogPostCard", () => {
  it("renders title summary and formatted date", () => {
    render(<BlogPostCard post={basePost} />);

    expect(screen.getByText(basePost.title)).toBeInTheDocument();
    expect(screen.getByText(basePost.summary)).toBeInTheDocument();
    expect(screen.getByText("Apr 20, 2026")).toBeInTheDocument();
  });

  it("links to blog detail page", () => {
    render(<BlogPostCard post={basePost} />);

    expect(screen.getByRole("link", { name: "Read post" })).toHaveAttribute(
      "href",
      `/blog/${basePost.slug}`
    );
  });

  it("renders tags when present", () => {
    render(<BlogPostCard post={basePost} />);
    expect(screen.getByText("update")).toBeInTheDocument();
    expect(screen.getByText("meta")).toBeInTheDocument();
  });

  it("omits tags list when tags are absent", () => {
    render(<BlogPostCard post={{ ...basePost, tags: undefined }} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
