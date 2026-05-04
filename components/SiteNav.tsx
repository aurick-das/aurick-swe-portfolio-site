import Link from "next/link";

export function SiteNav() {
  return (
    <nav aria-label="Site" className="flex flex-wrap items-center gap-4 text-sm">
      <Link href="/" className="font-medium text-text hover:text-accent-hover">
        Home
      </Link>
      <Link href="/blog" className="font-medium text-text hover:text-accent-hover">
        Blog
      </Link>
    </nav>
  );
}
