"use client";

import {
  aggregateCluster,
  aggregateResources,
  estimateResources,
  getClusters,
} from "@/lib/resource-calculations";
import { MetricCard } from "./metric-card";
import { ResourceList } from "./resource-list";
import type { Repository } from "@/types/repository";
import { ResourceBar } from "./resource-bar";
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "motion/react";

interface OptimizationSectionProps {
  repositories: Repository[];
}

export function OptimizationSection({
  repositories,
}: OptimizationSectionProps) {
  const clusters = getClusters(repositories);
  const clusterData = clusters.map(aggregateCluster);
  const allMetrics = repositories.map(estimateResources);
  const totalResources = aggregateResources(allMetrics);

  const maxTotal = Math.max(...clusterData.map((cluster) => cluster.total), 1);

  return (
    <section className="flex min-h-screen justify-center bg-background px-3 py-6 sm:px-6 sm:py-10">
      <div className="w-full max-w-5xl space-y-6 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:space-y-8 sm:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-fg sm:text-2xl">
              Cloud Resource Optimization
            </h2>

            <p className="mt-1 text-meta">
              Resource usage across optimized clusters
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-meta">Last 30 Days</span>

            <span className="rounded-full bg-success px-3 py-1 text-xs font-semibold text-white">
              Cluster
            </span>
          </div>
        </div>

        {/* Chart */}

        <div className="space-y-4">
          <motion.div
            className="grid h-64 grid-cols-4 gap-2 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {clusterData.map((cluster, index) => (
              <ResourceBar
                key={index}
                cluster={cluster}
                index={index}
                maxTotal={maxTotal}
              />
            ))}
          </motion.div>
        </div>

        {/* Resource table */}

        <div className="overflow-x-auto">
          <ResourceList clusterData={clusterData} />
        </div>

        {/* Metrics */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <MetricCard label="CPU" value={totalResources.cpu} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MetricCard label="GPU" value={totalResources.gpu} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MetricCard label="RAM" value={totalResources.ram} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MetricCard label="Storage" value={totalResources.storage} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MetricCard label="Network" value={totalResources.network} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
