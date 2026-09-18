
export interface ResourceMetrics {
  cpu: number
  ram: number
  storage: number
  network: number
  gpu: number
  efficiency: number
  total: number
}

export interface ResourceCluster {
  cluster: ResourceMetrics
  label: string
}