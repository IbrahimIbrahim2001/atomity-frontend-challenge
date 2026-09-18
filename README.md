# Cloud Resource Intelligence

A Next.js application for cloud resource intelligence and management.

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/               # Next.js App Router pages and layouts
├── components/        # Reusable UI components
│   ├── ui/            # Base UI components
│   ├── shared/        # Shared components
│   └── layout/        # Layout components
├── public/            # Static assets
└── ...
```

## Tech Stack

- **Next.js 16.3** with App Router
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **pnpm**

## Data Layer

- **API**: GitHub REST API (`api.github.com/repositories`) — public, no auth required
- **Caching**: `next: { revalidate: 3600 }` — 1-hour revalidation window
- **Validation**: Runtime type guards (`unknown` → typed) before transformation
- **Metrics**: Deterministic — derived from GitHub's `stargazers_count`, `forks_count`, `open_issues_count`
- **Note**: Resource metrics are demo transformations of GitHub repository data, not real cloud infrastructure metrics

## License

MIT
