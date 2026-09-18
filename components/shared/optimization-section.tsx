import {
  aggregateCluster,
  aggregateResources,
  estimateResources,
  getClusters,
} from "@/lib/resource-calculations"

import { MetricCard } from "./metric-card"
import { ResourceList } from "./resource-list"
import { Repository } from "@/types/repository"
import { ResourceBar } from "./resource-bar"

interface OptimizationSectionProps {
  repositories: Repository[]
}


export function OptimizationSection({
  repositories,
}: OptimizationSectionProps) {
   const clusters = getClusters(repositories)
  const clusterData = clusters.map(aggregateCluster)
  const allMetrics = repositories.map(estimateResources)
  const totalResources = aggregateResources(allMetrics)

    const maxTotal = Math.max(
    ...clusterData.map((cluster) => cluster.total),
    1,
  )
  

  return (
    <section className="flex min-h-screen justify-center bg-background p-4 sm:p-6">
      <div className="w-full max-w-5xl space-y-6 rounded-2xl border border-border bg-surface p-8 shadow-sm">

        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-fg">
              Cloud Resource Optimization
            </h2>

            <p className="mt-1 text-sm text-muted">
              Last 30 Days · Cluster
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">
              Last 30 Days
            </span>

            <span className="rounded-full bg-success px-3 py-1 text-xs font-semibold text-white">
              Cluster
            </span>
          </div>
        </div>

        {/* Chart */}

        <div className="space-y-4">
          <div className="flex h-48 items-end gap-3">
          {clusterData.map((cluster, index) => (
              <ResourceBar
                key={index}
                cluster={cluster}
                index={index}
                maxTotal={maxTotal}
              />
          ))}

          </div>
        </div>

        {/* Resource table */}

        <div className="overflow-x-auto">
          <ResourceList clusterData={clusterData} />
        </div>

        {/* Metrics */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <MetricCard label="CPU" value={String(totalResources.cpu)} />
          <MetricCard label="GPU" value={String(totalResources.gpu)} />
          <MetricCard label="RAM" value={String(totalResources.ram)} />
          <MetricCard
            label="Storage"
            value={String(totalResources.storage)}
          />
          <MetricCard
            label="Network"
            value={String(totalResources.network)}
          />
        </div>

      </div>
    </section>
  )
}