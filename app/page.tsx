import { OptimizationSection } from "@/components/shared/optimization-section"
import { getRepositories } from "@/data/github"

export default async function Home() {
  const repositories = await getRepositories()

  return (
    <main>
      <OptimizationSection repositories={repositories} />
    </main>
  )
}
