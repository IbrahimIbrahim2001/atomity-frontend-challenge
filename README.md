# Cloud Resource Optimization

An animated cloud resource optimization visualization built with **Next.js, TypeScript, Tailwind CSS, and Motion**.

The project recreates the visual concept from **Option A (0:30–0:40)** of the provided reference video, while interpreting the feature independently rather than reproducing the reference pixel-for-pixel.

## Overview

The page visualizes GitHub repository data as an interactive cloud resource optimization dashboard.

Repository metadata is fetched dynamically from the public GitHub API and transformed into deterministic resource estimates for:

* CPU
* RAM
* Storage
* Network
* GPU
* Efficiency
* Total resource usage

The visualization presents the data as four resource clusters with animated resource bars, a resource breakdown table, and aggregate resource metrics.

> **Note:** GitHub's repository API does not provide actual CPU, RAM, GPU, or network infrastructure usage. The resource values shown in this project are deterministic estimates derived from available repository metadata such as repository size, stars, watchers, forks, open issues, language, and fork status.

## Links

* **Live Demo:** https://atomity-frontend-challenge-five.vercel.app/
* **Source Code:** Add your GitHub repository URL here

## Feature Choice

### Option A — Cloud Resource Optimization

The implementation focuses on the cloud resource optimization visualization from the reference video.

The reference was used as visual inspiration, while the implementation was designed independently with:

* Reusable components
* Responsive behavior
* Dynamic API data
* Accessible animation
* Centralized design tokens
* Maintainable TypeScript

The goal was to capture the core visual idea while building an original implementation rather than reproducing the reference pixel-for-pixel.

## Tech Stack

* **Next.js** — App Router and server-side data fetching
* **TypeScript** — Type-safe application code
* **Tailwind CSS v4** — Utility-first styling
* **Motion** — Animations and scroll-triggered interactions
* **GitHub REST API** — Dynamic repository data

## Data Fetching

Repository data is fetched from the GitHub REST API:

```text
https://api.github.com/repositories
```

The API response is mapped into a smaller application-specific `Repository` type before being passed to the resource calculation and visualization layers.

The application does not hardcode the repository dataset used by the visualization.

The data flow is:

```text
GitHub API
    ↓
Repository mapping
    ↓
Resource estimation
    ↓
Cluster aggregation
    ↓
Visualization
```

This separation keeps external API data, application-specific types, calculations, and UI concerns independent from each other.

## Caching

The repository fetch uses Next.js caching to avoid requesting GitHub data on every render.

The data is cached for hours rather than being fetched continuously.

Example:

```ts
export const getRepositories = async (): Promise<Repository[]> => {
  "use cache"

  cacheLife("hours")

  // ...
}
```

Caching reduces unnecessary API requests while keeping the visualization reasonably up to date.

## Resource Calculation

GitHub repository metadata does not contain actual cloud infrastructure metrics such as CPU, RAM, GPU, or network consumption.

Instead, this project derives deterministic resource estimates from available repository metadata.

The calculations use values including:

* Repository size
* Stars
* Watchers
* Forks
* Open issues
* Fork status
* Primary language
* Repository ID

The calculation layer also includes safe numeric handling and clamping to prevent invalid values from reaching the UI.

The resulting metrics are:

```text
CPU
RAM
Storage
Network
GPU
Efficiency
Total
```

Repositories are distributed across four clusters, and the metrics are aggregated for each cluster.

Because the calculations are deterministic, the same repository metadata produces consistent resource values.

## Animation

Animations are implemented with **Motion**.

The visualization includes:

* Scroll-triggered section entrance
* Staggered cluster animations
* Resource bars growing from the bottom
* Animated numeric values
* Subtle metric-card hover interactions
* Reduced-motion support

Reusable Motion variants are used for common entrance and bar animations.

The goal is to make the data feel responsive and visually connected without excessive movement or distracting effects.

When users prefer reduced motion, animations are minimized through `prefers-reduced-motion`.

## Responsive Design

The interface is designed for:

* **Mobile:** 375px+
* **Tablet:** 768px+
* **Desktop:** 1280px+

The resource visualization uses a responsive four-column layout.

Metric cards use a two-column layout on smaller screens and expand to five columns on larger screens.

Spacing, typography, chart gaps, and component sizing also adapt at responsive breakpoints.

## Design System

The project uses centralized CSS design tokens instead of scattering raw design values throughout components.

The token system covers:

* Colors
* Spacing
* Border radius
* Shadows
* Typography

Tailwind CSS v4's `@theme inline` system exposes the design tokens as reusable utilities.

Example:

```css
:root {
  --color-bg: #06090f;
  --color-surface: #0d1117;
  --color-fg: #e6edf3;
  --color-muted: #7d8590;
  --color-border: #21262d;
  --color-accent: #58a6ff;
  --color-success: #3fb950;
}
```

The interface also supports light and dark color schemes through the `prefers-color-scheme` media feature.

## Accessibility

Accessibility considerations include:

* Semantic HTML
* Responsive layouts
* Clear text hierarchy
* Accessible color contrast
* Reduced-motion support through `prefers-reduced-motion`
* Standard HTML interactions that remain keyboard accessible

When reduced motion is preferred, animated transitions are minimized to provide a more comfortable experience.

## Component Structure

The interface is divided into reusable components rather than being implemented as one large component.

```text
components/
├── shared/
│   ├── optimization-section.tsx
│   ├── resource-bar.tsx
│   ├── resource-list.tsx
│   ├── resource-row.tsx
│   └── metric-card.tsx
│
└── ui/
    └── number-ticker.tsx
```

Resource calculation logic is separated from the UI:

```text
lib/
├── animations.ts
└── resource-calculations.ts
```

This keeps data processing, animation definitions, and presentation logic separated and makes individual pieces easier to maintain and test.

## Project Structure

```text
app/
├── error.tsx
├── globals.css
├── loading.tsx
└── page.tsx

components/
├── shared/
│   ├── optimization-section.tsx
│   ├── resource-bar.tsx
│   ├── resource-list.tsx
│   ├── resource-row.tsx
│   └── metric-card.tsx
│
└── ui/
    └── number-ticker.tsx

data/
└── github.ts

lib/
├── animations.ts
└── resource-calculations.ts

styles/
└── tokens.css

types/
├── optimization.ts
└── repository.ts
```

## Tradeoffs

### Derived Resource Metrics

The primary tradeoff is the lack of actual cloud infrastructure metrics in the GitHub API.

Rather than hardcoding arbitrary values, the project derives deterministic estimates from real repository metadata.

This keeps the visualization data-driven while making it clear that the displayed resource values are estimates rather than measurements from a real cloud environment.

### Four Clusters

Repositories are distributed across four clusters to create a clear visualization structure.

This provides a useful representation of grouped resources without requiring a separate infrastructure dataset.

The cluster structure can also be extended in the future to support configurable grouping or filtering.

### Caching

Repository data is cached for hours.

This reduces API traffic and improves consistency during normal usage, while accepting that repository changes may not immediately appear in the visualization.

## Future Improvements

If this were extended beyond the challenge, possible improvements would include:

* Connecting the visualization to real cloud monitoring data
* Supporting configurable cluster counts
* Adding interactive cluster filtering
* Showing historical resource usage
* Adding detailed repository tooltips
* Providing resource optimization recommendations
* Adding more detailed optimization transitions
* Adding a user-controlled theme switcher
* Adding real-time resource monitoring
* Persisting historical resource snapshots

## Screenshots

Screenshots can be added here to provide a quick visual overview of the implementation.

Example:

```md
### Cloud Resource Optimization

![Cloud Resource Optimization](./public/screenshot.png)
```

## Running Locally

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
GITHUB_TOKEN=your_github_token
```

The token can be used for authenticated GitHub API requests and improved API rate-limit availability.

### 3. Start the development server

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

## Production Build

Run the following commands before deployment:

```bash
pnpm lint
pnpm build
```

Both commands should complete successfully before deploying the application.

## Deployment

The application is deployed publicly for evaluation.

**Live Demo:**

https://atomity-frontend-challenge-five.vercel.app/

The application can be deployed using Vercel or another platform that supports Next.js.

## Challenge Notes

This project was built with a focus on:

* Clean component architecture
* Dynamic API-driven data
* Intentional animation
* Responsive design
* Modern CSS
* Centralized design tokens
* Accessibility
* Maintainable TypeScript
* Efficient data fetching and caching

The implementation prioritizes a clear separation between data fetching, resource calculations, animation logic, and presentation components.

The resource values are intentionally presented as **derived estimates**, since the GitHub API does not expose actual cloud infrastructure consumption.

## License

This project was created as part of a frontend development challenge and is intended for evaluation and demonstration purposes.
