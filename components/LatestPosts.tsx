import { BlogPostCard } from "@/components/BlogPostCard";
import type { PostMeta } from "@/lib/types";

type LatestPostsProps = {
  posts: PostMeta[];
  limit?: number;
};

export function LatestPosts({ posts, limit = 3 }: LatestPostsProps) {
  const shown = posts.slice(0, limit);

  if (shown.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="section-title">Latest Posts</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {shown.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
