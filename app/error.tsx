"use client";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg text-fg">
      <div className="text-center">
        <p className="text-error text-lg font-semibold">Something went wrong</p>
        <p className="text-muted mt-2">{error.message}</p>
      </div>
    </main>
  );
}
