"use client";

import { Icon, Text } from "@/components/atoms";
import type { IconName } from "@/components/atoms/Icon/Icon";

interface QuickActionCardProps {
  icon: IconName;
  title: string;
  description: string;
  onClick: () => void;
}

export function QuickActionCard({ icon, title, description, onClick }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all text-left"
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900">
        <Icon name={icon} size="lg" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-slate-900 dark:text-slate-100">
          {title}
        </p>
        <Text variant="small">{description}</Text>
      </div>
      <Icon
        name="chevron-right"
        size="sm"
        className="text-slate-300 dark:text-slate-600"
      />
    </button>
  );
}
