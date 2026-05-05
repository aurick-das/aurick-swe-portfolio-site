import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LatestPosts } from "@/components/LatestPosts";
import type { PostMeta } from "@/lib/types";

const posts: PostMeta[] = [
  {
    slug: "a",
    title: "Post A",
    date: "2026-05-01",
    summary: "Summary A"
  },
  {
    slug: "b",
    title: "Post B",
    date: "2026-05-02",
    summary: "Summary B"
  },
  {
    slug: "c",
    title: "Post C",
    date: "2026-05-03",
    summary: "Summary C"
  },
  {
    slug: "d",
    title: "Post D",
    date: "2026-05-04",
    summary: "Summary D"
  }
];

describe("LatestPosts", () => {
  it("renders nothing when posts array is empty", () => {
    const { container } = render(<LatestPosts posts={[]} />);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByRole("heading", { name: "Latest Posts" })).not.toBeInTheDocument();
  });

  it("caps displayed posts at the provided limit", () => {
    render(<LatestPosts posts={posts} limit={2} />);
    expect(screen.getByRole("heading", { name: "Latest Posts" })).toBeInTheDocument();
    expect(screen.getByText("Post A")).toBeInTheDocument();
    expect(screen.getByText("Post B")).toBeInTheDocument();
    expect(screen.queryByText("Post C")).not.toBeInTheDocument();
  });
});
