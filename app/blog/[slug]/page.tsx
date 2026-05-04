import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

/** Allow unknown slugs at request time so the page can call `notFound()` and render `app/blog/not-found.tsx`. */
export const dynamicParams = true;

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Aurick"
    };
  }

  return {
    title: `${post.title} | Aurick`,
    description: post.summary
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <div className="space-y-3">
        <Link href="/blog" className="inline-flex text-sm text-accent hover:text-accent-hover">
          ← Back to blog
        </Link>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="text-sm text-text-muted">{formatPostDate(post.date)}</p>
        {post.tags && post.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={`${post.slug}-${tag}`} className="rounded-lg bg-bg-soft px-2.5 py-1 text-xs text-text-muted">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
