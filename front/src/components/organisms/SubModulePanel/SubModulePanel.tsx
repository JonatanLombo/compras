"use client";

import { Icon, Title, Text } from "@/components/atoms";
import { SubModuleItem } from "@/components/molecules";
import type { Module } from "@/test/modules.data";

interface SubModulePanelProps {
  module: Module;
  onBack: () => void;
}

export function SubModulePanel({ module, onBack }: SubModulePanelProps) {
  return (
    <div className="animate-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
      >
        <Icon name="chevron-left" size="sm" />
        <span>Volver</span>
      </button>

      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <Icon name={module.icon} size="lg" />
        </div>
        <div>
          <Title level={2} className="text-slate-900 dark:text-slate-100">
            {module.name}
          </Title>
          <Text variant="muted">{module.description}</Text>
        </div>
      </div>

      <div className="mb-4">
        <Text variant="small" className="uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400">
          Funciones del módulo
        </Text>
      </div>

      <div className="grid gap-2">
        {module.subModules.map((subModule) => (
          <SubModuleItem key={subModule.id} subModule={subModule} />
        ))}
      </div>
    </div>
  );
}
