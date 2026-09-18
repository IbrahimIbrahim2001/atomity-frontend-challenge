import type { OptimizationSectionProps } from "@/types/optimization"

import {
  aggregateCluster,
  estimateResources,
  getClusters,
} from "@/lib/resource-calculations"

import { MetricCard } from "./metric-card"
import { ResourceList } from "./resource-list"

export function OptimizationSection({
  repositories,
}: OptimizationSectionProps) {
  const clusters = getClusters(repositories)
  const clusterData = clusters.map(aggregateCluster)
  const allMetrics = repositories.map(estimateResources)

  const totalCpu = allMetrics.reduce((sum, metric) => sum + metric.cpu, 0)
  const totalRam = allMetrics.reduce((sum, metric) => sum + metric.ram, 0)
  const totalStorage = allMetrics.reduce(
    (sum, metric) => sum + metric.storage,
    0,
  )
  const totalNetwork = allMetrics.reduce(
    (sum, metric) => sum + metric.network,
    0,
  )
  const totalGpu = allMetrics.reduce((sum, metric) => sum + metric.gpu, 0)

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
            {clusterData.map((cluster, index) => {
              const height = Math.round(
                (cluster.total / maxTotal) * 100,
              )

              return (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-sm font-semibold text-fg">
                    {cluster.total}
                  </span>

                  <div
                    className="w-full rounded-t-lg bg-success transition-all"
                    style={{
                      height: `${height}%`,
                      minHeight: "8px",
                    }}
                  />

                  <span className="text-sm font-semibold text-fg">
                    Cluster {String.fromCharCode(65 + index)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Resource table */}

        <div className="overflow-x-auto">
          <ResourceList clusterData={clusterData} />
        </div>

        {/* Metrics */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <MetricCard label="CPU" value={String(Math.round(totalCpu))} />
          <MetricCard label="GPU" value={String(Math.round(totalGpu))} />
          <MetricCard label="RAM" value={String(Math.round(totalRam))} />
          <MetricCard
            label="Storage"
            value={String(Math.round(totalStorage))}
          />
          <MetricCard
            label="Network"
            value={String(Math.round(totalNetwork))}
          />
        </div>

      </div>
    </section>
  )
}