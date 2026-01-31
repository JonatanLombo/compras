"use client";

import { Icon, Title, Text } from "@/components/atoms";
import type { Module } from "@/test/modules.data";

interface ModuleCardProps {
  module: Module;
  onClick: (module: Module) => void;
}

export function ModuleCard({ module, onClick }: ModuleCardProps) {
  return (
    <button
      onClick={() => onClick(module)}
      className="group flex flex-col p-5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-200 text-left"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
          <Icon name={module.icon} size="lg" />
        </div>
        <div className="flex-1 min-w-0">
          <Title level={4} className="text-slate-900 dark:text-slate-100 truncate">
            {module.name}
          </Title>
        </div>
        <Icon
          name="chevron-right"
          size="md"
          className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors"
        />
      </div>
      <Text variant="muted" className="line-clamp-2">
        {module.description}
      </Text>
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
        <Text variant="small">
          {module.subModules.length} funciones disponibles
        </Text>
      </div>
    </button>
  );
}
