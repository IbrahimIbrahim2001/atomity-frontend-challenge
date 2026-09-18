import type { ResourceMetrics } from "@/types/optimization";

import { ResourceRow } from "./resource-row";

interface ResourceListProps {
  clusterData: ResourceMetrics[];
}

export function ResourceList({ clusterData }: ResourceListProps) {
  if (clusterData.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6 text-center">
        <p className="text-muted">No resources found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="overflow-x-auto">
        <table className="resource-table">
          <thead className="resource-table-head">
            <tr className="border-b border-border">
              <th className="resource-table-header">Cluster</th>

              <th className="resource-table-header-right">CPU</th>

              <th className="resource-table-header-right">RAM</th>

              <th className="resource-table-header-right">Storage</th>

              <th className="resource-table-header-right">Network</th>

              <th className="resource-table-header-right">GPU</th>

              <th className="resource-table-header-right">Efficiency</th>

              <th className="resource-table-header-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {clusterData.map((cluster, i) => (
              <ResourceRow
                key={i}
                cluster={cluster}
                label={`Cluster ${String.fromCharCode(65 + i)}`}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
