type MetricCardProps = {
  label: string
  value: string
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-success" />
        <span className="text-sm text-muted">{label}</span>
      </div>
      <p className="text-3xl font-bold text-fg">{value}</p>
    </div>
  )
}
