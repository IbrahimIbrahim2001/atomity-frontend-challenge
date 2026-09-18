"use client";

import type { ResourceMetrics } from "@/types/optimization";
import { motion } from "motion/react";

import { barVariants, fadeVariants, itemVariants } from "@/lib/animations";

import { NumberTicker } from "../ui/number-ticker";

interface ResourceBarProps {
  cluster: ResourceMetrics;
  index: number;
  maxTotal: number;
}

export function ResourceBar({ cluster, index, maxTotal }: ResourceBarProps) {
  const height = Math.max((cluster.total / maxTotal) * 100, 4);

  return (
    <motion.div
      variants={itemVariants}
      className="flex h-full min-w-0 flex-col items-center gap-2"
    >
      <NumberTicker
        value={cluster.total}
        className="text-xs font-semibold text-fg sm:text-sm"
      />

      <div className="relative flex h-48 w-full items-end">
        {/* Background track */}
        <div className="absolute inset-x-0 bottom-0 h-full rounded-t-lg bg-muted/20" />

        {/* Resource bar */}
        <motion.div
          variants={barVariants}
          className="relative z-10 w-full origin-bottom rounded-t-lg bg-success"
          style={{
            height: `${height}%`,
          }}
        />
      </div>

      <motion.span
        variants={fadeVariants}
        className="text-sm font-semibold text-fg"
      >
        Cluster {String.fromCharCode(65 + index)}
      </motion.span>
    </motion.div>
  );
}
