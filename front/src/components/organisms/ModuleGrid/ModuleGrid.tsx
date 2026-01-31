"use client";

import { ModuleCard } from "@/components/molecules";
import type { Module } from "@/test/modules.data";

interface ModuleGridProps {
  modules: Module[];
  onModuleClick: (module: Module) => void;
}

export function ModuleGrid({ modules, onModuleClick }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          onClick={onModuleClick}
        />
      ))}
    </div>
  );
}
