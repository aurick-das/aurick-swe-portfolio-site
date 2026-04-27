import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card-surface flex h-full flex-col p-5 transition-transform hover:-translate-y-1">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        {project.featured ? (
          <span className="rounded-full border border-accent/60 bg-accent/10 px-2 py-0.5 text-xs text-accent">
            Featured
          </span>
        ) : null}
      </div>
      <p className="text-sm text-text-muted">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((stackItem) => (
          <li
            key={`${project.id}-${stackItem}`}
            className="rounded-lg bg-bg-soft px-2.5 py-1 text-xs text-text-muted"
          >
            {stackItem}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-3 text-sm">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent hover:text-accent-hover"
          >
            Live
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent hover:text-accent-hover"
          >
            Code
          </a>
        ) : null}
      </div>
    </article>
  );
}
