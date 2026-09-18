export interface Repository {
  id: number
  name: string
  fullName: string
  description: string | null
  language: string | null
  url: string
  stars: number
  forks: number
  openIssues: number
  size: number
  watchersCount: number
  fork: boolean
  createdAt: string
  updatedAt: string
}
