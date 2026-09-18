type MetricCardProps = {
  label: string
  value: string
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <p className="metric-label">{label}</p>
      <p className="text-xl font-bold text-fg">{value}</p>
    </div>
  )
}
