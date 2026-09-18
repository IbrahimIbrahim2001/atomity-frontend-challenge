export default function Loading() {
  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-fg">
      <div className="mx-auto max-w-6xl animate-pulse">
        {/* Header */}
        <div className="mb-8">
          <div className="h-8 w-72 rounded-lg bg-muted/30" />
          <div className="mt-3 h-4 w-96 max-w-full rounded bg-muted/20" />
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-xl border border-border bg-background"
            />
          ))}
        </div>

        {/* Chart */}
        <div className="mt-8 rounded-xl border border-border bg-background p-6">
          <div className="mb-6 h-5 w-40 rounded bg-muted/30" />

          <div className="flex h-48 items-end gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-lg bg-muted/30"
                  style={{
                    height: `${40 + index * 15}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Resource table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-background">
          <div className="h-12 border-b border-border bg-muted/10" />

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-14 border-b border-border last:border-0"
            />
          ))}
        </div>
      </div>
    </main>
  )
}