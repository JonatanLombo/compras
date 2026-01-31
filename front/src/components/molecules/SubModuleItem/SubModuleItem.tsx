"use client";

import Link from "next/link";
import { Icon, Text } from "@/components/atoms";
import type { SubModule } from "@/test/modules.data";

interface SubModuleItemProps {
  subModule: SubModule;
}

export function SubModuleItem({ subModule }: SubModuleItemProps) {
  // Si la ruta empieza con /compras, usamos la ruta real
  const isImplemented = subModule.path.startsWith("/compras");

  if (isImplemented) {
    return (
      <Link
        href="/compras"
        className="group flex items-center gap-4 px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all duration-150"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
          <Icon name={subModule.icon} size="md" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-white truncate">
            {subModule.name}
          </p>
          <Text variant="small" className="truncate">
            {subModule.description}
          </Text>
        </div>
        <Icon
          name="chevron-right"
          size="sm"
          className="text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors flex-shrink-0"
        />
      </Link>
    );
  }

  return (
    <button
      onClick={() => alert(`Módulo "${subModule.name}" en desarrollo`)}
      className="group flex items-center gap-4 px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all duration-150 w-full text-left"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
        <Icon name={subModule.icon} size="md" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-white truncate">
          {subModule.name}
        </p>
        <Text variant="small" className="truncate">
          {subModule.description}
        </Text>
      </div>
      <Icon
        name="chevron-right"
        size="sm"
        className="text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors flex-shrink-0"
      />
    </button>
  );
}
