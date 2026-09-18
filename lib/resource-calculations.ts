import type { Repository } from "@/types/repository"
import type { ResourceMetrics } from "@/types/optimization"

const CLUSTER_COUNT = 4

function safeNumber(value: number): number {
  return Number.isFinite(value) ? value : 0
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function logScale(value: number): number {
  return Math.log10(Math.max(value, 1))
}

export function getClusters(repositories: Repository[]): Repository[][] {
  const clusters: Repository[][] = Array.from(
    { length: CLUSTER_COUNT },
    () => [],
  )

  repositories.forEach((repo, i) => {
    clusters[i % CLUSTER_COUNT].push(repo)
  })

  return clusters
}

export function estimateResources(
  repo: Repository,
): ResourceMetrics {
  const size = Math.max(safeNumber(repo.size), 1)
  const stars = Math.max(safeNumber(repo.stars), 1)
  const watchers = Math.max(safeNumber(repo.watchersCount), 1)
  const forks = Math.max(safeNumber(repo.forks), 1)
  const issues = Math.max(safeNumber(repo.openIssues), 1)

  const isFork = repo.fork ? 1 : 0
  const idFactor = (repo.id % 100) + 1

  const logStars = logScale(stars)
  const logWatchers = logScale(watchers)
  const logForks = logScale(forks)
  const logIssues = logScale(issues)
  const logSize = logScale(size)

  const cpu =
    logSize * 8 +
    logIssues * 4 +
    logStars * 0.5 +
    logForks * 0.3 +
    idFactor * 0.01

  const ram =
    logSize * 4 +
    logForks * 3 +
    logWatchers * 0.5 +
    logIssues * 2 +
    idFactor * 0.005

  const storage = size * 2

  const network =
    logStars * 300 +
    logWatchers * 150 +
    logForks * 200 +
    isFork * 500 +
    idFactor * 10

  const languageFactor =
    repo.language === "Python" ||
    repo.language === "JavaScript" ||
    repo.language === "TypeScript"
      ? 1.5
      : 1

  const gpu =
    logStars * 3 * languageFactor +
    logWatchers +
    idFactor * 0.005

  const total = cpu + ram + storage + network + gpu

  const efficiency = clamp(
    Math.round(
      ((stars + forks + watchers) /
        (stars + forks + watchers + Math.max(issues, 1))) *
        100,
    ),
    0,
    100,
  )

  return {
    cpu: clamp(Math.round(cpu), 0, 10000),
    ram: clamp(Math.round(ram), 0, 10000),
    storage: clamp(Math.round(storage), 0, 50000),
    network: clamp(Math.round(network), 0, 50000),
    gpu: clamp(Math.round(gpu), 0, 10000),
    efficiency,
    total: clamp(Math.round(total), 0, 50000),
  }
}

export function aggregateCluster(
  repos: Repository[],
): ResourceMetrics {
  const metrics = repos.map(estimateResources)

  return aggregateResources(metrics)
}

export function aggregateResources(
  metrics: ResourceMetrics[],
): ResourceMetrics {
  if (metrics.length === 0) {
    return {
      cpu: 0,
      ram: 0,
      storage: 0,
      network: 0,
      gpu: 0,
      efficiency: 0,
      total: 0,
    }
  }

  const cpu = metrics.reduce(
    (sum, metric) => sum + metric.cpu,
    0,
  )

  const ram = metrics.reduce(
    (sum, metric) => sum + metric.ram,
    0,
  )

  const storage = metrics.reduce(
    (sum, metric) => sum + metric.storage,
    0,
  )

  const network = metrics.reduce(
    (sum, metric) => sum + metric.network,
    0,
  )

  const gpu = metrics.reduce(
    (sum, metric) => sum + metric.gpu,
    0,
  )

  const efficiency =
    metrics.reduce(
      (sum, metric) => sum + metric.efficiency,
      0,
    ) / metrics.length

  const total = metrics.reduce(
    (sum, metric) => sum + metric.total,
    0,
  )

  return {
    cpu: safeNumber(cpu),
    ram: safeNumber(ram),
    storage: safeNumber(storage),
    network: safeNumber(network),
    gpu: safeNumber(gpu),
    efficiency: safeNumber(Math.round(efficiency)),
    total: safeNumber(total),
  }
}