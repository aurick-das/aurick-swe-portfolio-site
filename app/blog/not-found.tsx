import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <section className="card-surface p-6 sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Post not found</h1>
      <p className="mt-2 text-text-muted">
        The post you are looking for does not exist or is not available in this environment.
      </p>
      <Link href="/blog" className="mt-5 inline-flex text-sm font-medium text-accent hover:text-accent-hover">
        Return to blog
      </Link>
    </section>
  );
}
