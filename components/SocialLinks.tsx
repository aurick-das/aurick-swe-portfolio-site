import type { SocialLink } from "@/lib/types";

type SocialLinksProps = {
  links: SocialLink[];
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="card-surface flex items-center justify-between px-4 py-3 text-sm text-text hover:border-accent hover:text-accent-hover focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={`Open ${link.label}`}
          >
            <span>{link.label}</span>
            <span aria-hidden="true">{"\u2192"}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
