import type { Repository } from "@/types/repository"

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
}

export const getRepositories = async (): Promise<Repository[]> => {
  const response = await fetch(GITHUB_API_URL, {
    next: { revalidate: 3600 },
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
  }))
}
