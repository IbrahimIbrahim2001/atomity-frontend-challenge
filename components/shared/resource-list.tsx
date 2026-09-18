import { ResourceMetrics } from "@/types/optimization"

import { ResourceRow } from "./resource-row"
interface ResourceListProps {
  clusterData: ResourceMetrics[]
}
export function ResourceList({
  clusterData,
}: ResourceListProps) {
  if (clusterData.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6 text-center">
        <p className="text-muted">No resources found.</p>
      </div>
    )
  }

  return (
    <div className="min-w-150">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 text-left text-muted font-semibold">Cluster</th>
            <th className="py-3 text-right text-muted font-semibold">CPU</th>
            <th className="py-3 text-right text-muted font-semibold">RAM</th>
            <th className="py-3 text-right text-muted font-semibold">Storage</th>
            <th className="py-3 text-right text-muted font-semibold">Network</th>
            <th className="py-3 text-right text-muted font-semibold">GPU</th>
            <th className="py-3 text-right text-muted font-semibold">Efficiency</th>
            <th className="py-3 text-right text-muted font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {clusterData.map((cluster, i) => (
            <ResourceRow key={i} cluster={cluster} label={`Cluster ${String.fromCharCode(65 + i)}`} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
