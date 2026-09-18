interface ResourceRowProps {
  cluster: {
    cpu: number
    ram: number
    storage: number
    network: number
    gpu: number
    efficiency: number
    total: number
  }
  label: string
}

export function ResourceRow({
  cluster,
  label,
}: ResourceRowProps) {
  return (
    <tr className="border-b border-border hover:bg-background transition-colors">
      <td className="py-3 font-semibold text-fg">{label}</td>
      <td className="py-3 text-right text-fg">{cluster.cpu}</td>
      <td className="py-3 text-right text-fg">{cluster.ram}</td>
      <td className="py-3 text-right text-fg">{cluster.storage}</td>
      <td className="py-3 text-right text-fg">{cluster.network}</td>
      <td className="py-3 text-right text-fg">{cluster.gpu}</td>
      <td className="py-3 text-right text-success font-semibold">{cluster.efficiency}%</td>
      <td className="py-3 text-right font-bold text-fg">{cluster.total}</td>
    </tr>
  )
}
