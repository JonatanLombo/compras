interface TextProps {
  children: React.ReactNode;
  variant?: "default" | "muted" | "small";
  className?: string;
}

const variantClasses = {
  default: "text-base text-gray-700 dark:text-gray-300",
  muted: "text-sm text-gray-500 dark:text-gray-400",
  small: "text-xs text-gray-400 dark:text-gray-500",
};

export function Text({ children, variant = "default", className = "" }: TextProps) {
  return (
    <p className={`${variantClasses[variant]} ${className}`}>{children}</p>
  );
}
