import type { ResourceMetrics } from "@/types/optimization";

interface ResourceRowProps {
  cluster: ResourceMetrics;
  label: string;
}

export function ResourceRow({ cluster, label }: ResourceRowProps) {
  return (
    <tr className="resource-row">
      <td className="resource-label">{label}</td>

      <td className="resource-cell">{cluster.cpu}</td>

      <td className="resource-cell">{cluster.ram}</td>

      <td className="resource-cell">{cluster.storage}</td>

      <td className="resource-cell">{cluster.network}</td>

      <td className="resource-cell">{cluster.gpu}</td>

      <td className="resource-efficiency">{cluster.efficiency}%</td>

      <td className="resource-total">{cluster.total}</td>
    </tr>
  );
}
