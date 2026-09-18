"use client"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4 text-fg">
      <div className="text-center">
        <p className="text-lg font-semibold text-error">
          Something went wrong
        </p>

        <p className="mt-2 text-muted">
          We couldn&apos;t load the resource data. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 rounded-lg bg-success px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  )
}