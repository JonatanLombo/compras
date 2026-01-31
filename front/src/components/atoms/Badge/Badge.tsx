interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "new";
  size?: "sm" | "md";
}

const variantClasses = {
  default: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
  success: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  info: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  new: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
};

const sizeClasses = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-xs",
};

export function Badge({ children, variant = "default", size = "md" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
}
