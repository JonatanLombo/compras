import { Icon, Text } from "@/components/atoms";
import type { IconName } from "@/components/atoms/Icon/Icon";

interface StatCardProps {
  icon: IconName;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
      <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
        <Icon name={icon} size="lg" />
      </div>
      <div className="flex-1">
        <Text variant="small" className="mb-0.5">
          {label}
        </Text>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {value}
          </span>
          {trend && (
            <span
              className={`text-xs font-medium ${
                trend.isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
