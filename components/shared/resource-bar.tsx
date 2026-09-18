import type { ResourceMetrics } from "@/types/optimization"

interface ResourceBarProps {
  cluster: ResourceMetrics
  index: number
  maxTotal: number
}

export function ResourceBar({
  cluster,
  index,
  maxTotal,
}: ResourceBarProps) {
  const height = Math.round(
    (cluster.total / maxTotal) * 100,
  )

  return (
    <div className="flex flex-1 flex-col items-center gap-2">
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
}