import Link from "next/link";

import type { PostMeta } from "@/lib/types";

type BlogPostCardProps = {
  post: PostMeta;
};

function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="card-surface flex h-full flex-col p-5 transition-transform hover:-translate-y-1">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="text-xs text-text-muted">{formatPostDate(post.date)}</p>
      </div>

      <p className="text-sm text-text-muted">{post.summary}</p>

      {post.tags && post.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={`${post.slug}-${tag}`} className="rounded-lg bg-bg-soft px-2.5 py-1 text-xs text-text-muted">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 text-sm">
        <Link href={`/blog/${post.slug}`} className="font-medium text-accent hover:text-accent-hover">
          Read post
        </Link>
      </div>
    </article>
  );
}
