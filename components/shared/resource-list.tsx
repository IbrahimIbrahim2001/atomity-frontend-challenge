import type { Repository } from "@/types/repository"
import { ResourceRow } from "./resource-row"

export function ResourceList({ repositories }: { repositories: Repository[] }) {
  if (repositories.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6 text-center">
        <p className="text-muted">No repositories found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {repositories.map((repo) => (
        <ResourceRow key={repo.id} repository={repo} />
      ))}
    </div>
  )
}
