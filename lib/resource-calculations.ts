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

export function getClusters(repositories: Repository[]) {
  const clusters: Repository[][] = Array.from(
    { length: CLUSTER_COUNT },
    () => [],
  )

  repositories.forEach((repo, i) => {
    clusters[i % CLUSTER_COUNT].push(repo)
  })

  return clusters
}

export function estimateResources(repo: Repository): ResourceMetrics {
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
  if (repos.length === 0) {
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

  const metrics = repos.map(estimateResources)

  return {
    cpu: safeNumber(metrics.reduce((sum, m) => sum + m.cpu, 0)),
    ram: safeNumber(metrics.reduce((sum, m) => sum + m.ram, 0)),
    storage: safeNumber(
      metrics.reduce((sum, m) => sum + m.storage, 0),
    ),
    network: safeNumber(
      metrics.reduce((sum, m) => sum + m.network, 0),
    ),
    gpu: safeNumber(metrics.reduce((sum, m) => sum + m.gpu, 0)),
    efficiency: safeNumber(
      Math.round(
        metrics.reduce((sum, m) => sum + m.efficiency, 0) /
          metrics.length,
      ),
    ),
    total: safeNumber(metrics.reduce((sum, m) => sum + m.total, 0)),
  }
}