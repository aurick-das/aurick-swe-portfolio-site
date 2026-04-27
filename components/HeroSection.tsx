import type { Profile } from "@/lib/types";

type HeroSectionProps = {
  profile: Profile;
};

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="card-surface p-6 sm:p-8">
      <p className="mb-2 text-sm uppercase tracking-[0.2em] text-text-muted">
        Link In Bio
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{profile.name}</h1>
      <p className="mt-2 text-lg text-accent">{profile.headline}</p>
      <p className="mt-4 max-w-2xl text-text-muted">{profile.bio}</p>
      {profile.location ? (
        <p className="mt-3 text-sm text-text-muted">Based in {profile.location}</p>
      ) : null}
      <div className="mt-6">
        <a
          href={profile.primaryCta.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl bg-accent px-5 py-2.5 font-medium text-[#040716] hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {profile.primaryCta.label}
        </a>
      </div>
    </section>
  );
}
