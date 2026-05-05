import type { Metadata } from "next";

import { BlogPostCard } from "@/components/BlogPostCard";
import { getAllPostMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Aurick",
  description: "Technical updates and project notes from Aurick."
};

export default function BlogPage() {
  const posts = getAllPostMeta();

  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
      <p className="mt-2 text-text-muted">A running work log of technical builds and decisions.</p>

      {posts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-text-muted">No posts published yet.</p>
      )}
    </section>
  );
}
