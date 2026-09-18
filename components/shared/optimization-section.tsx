import type { Repository } from "@/types/repository"
import { MetricCard } from "./metric-card"
import { ResourceList } from "./resource-list"

export function OptimizationSection({ repositories }: { repositories: Repository[] }) {
  const totalRepositories = repositories.length
  const totalStars = repositories.reduce((sum, r) => sum + r.stars, 0)
  const totalForks = repositories.reduce((sum, r) => sum + r.forks, 0)

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Repositories" value={String(totalRepositories)} />
        <MetricCard label="Total Stars" value={String(totalStars)} />
        <MetricCard label="Total Forks" value={String(totalForks)} />
      </div>
      <ResourceList repositories={repositories} />
    </section>
  )
}
