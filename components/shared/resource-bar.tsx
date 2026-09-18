"use client"

import type { ResourceMetrics } from "@/types/optimization"

import { motion } from "motion/react"

import {
  barVariants,
  fadeVariants,
} from "@/lib/animations"

interface ResourceBarProps {
  cluster: ResourceMetrics
  index: number
  maxTotal: number
}

export function ResourceBar({
  cluster,
  index,
  maxTotal,
}: ResourceBarProps) {
  const height = Math.max(
    (cluster.total / maxTotal) * 100,
    4,
  )

  return (
    <div className="flex h-full flex-1 flex-col items-center gap-2">
      <motion.span
        className="text-sm font-semibold text-fg"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
      >
        {cluster.total}
      </motion.span>

      <div className="flex h-48 w-full items-end">
        <motion.div
          className="w-full origin-bottom rounded-t-lg bg-success"
          variants={barVariants}
          initial="hidden"
          animate="visible"
          style={{
            height: `${height}%`,
          }}
        />
      </div>

      <motion.span
        className="text-sm font-semibold text-fg"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
      >
        Cluster {String.fromCharCode(65 + index)}
      </motion.span>
    </div>
  )
}