import type { Repository } from "@/types/repository"
import { cacheLife } from "next/cache"

const GITHUB_API_URL = "https://api.github.com/repositories"

interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  language: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  size: number
  watchers_count: number
  fork: boolean
  created_at: string
  updated_at: string
}

export const getRepositories = async (): Promise<Repository[]> => {
  "use cache"

  cacheLife("hours")

  const response = await fetch(GITHUB_API_URL, {
     headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
  })

  

  if (!response.ok) {
    throw new Error("Failed to fetch repositories")
  }

  const data: GitHubRepository[] = await response.json()

  return data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    language: repo.language,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    size: repo.size ?? 0,
    watchersCount: repo.watchers_count ?? 0,
    fork: repo.fork ?? false,
    createdAt: repo.created_at ?? "",
    updatedAt: repo.updated_at ?? "",
  }))
}
