import type { Repository } from "@/types/repository"

export function ResourceRow({ repository }: { repository: Repository }) {
  return (
    <article className="flex flex-col rounded-lg border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <a
          href={repository.url}
          target="_blank"
          rel="noreferrer"
          className="text-lg font-semibold text-accent underline hover:no-underline"
        >
          {repository.name}
        </a>
        <p className="text-meta">{repository.description ?? "No description"}</p>
        <p className="text-meta">{repository.language ?? "—"}</p>
      </div>
      <div className="mt-4 flex gap-4 sm:ml-4 sm:mt-0 sm:gap-6">
        <div>
          <span className="metric-label">Stars</span>
          <p className="metric-value">{repository.stars}</p>
        </div>
        <div>
          <span className="metric-label">Forks</span>
          <p className="metric-value">{repository.forks}</p>
        </div>
        <div>
          <span className="metric-label">Open Issues</span>
          <p className="metric-value">{repository.openIssues}</p>
        </div>
      </div>
    </article>
  )
}
