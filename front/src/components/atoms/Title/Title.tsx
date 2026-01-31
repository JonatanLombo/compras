interface TitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

const levelClasses = {
  1: "text-3xl font-bold",
  2: "text-2xl font-semibold",
  3: "text-xl font-semibold",
  4: "text-lg font-medium",
};

export function Title({ children, level = 1, className = "" }: TitleProps) {
  const baseClass = `${levelClasses[level]} ${className}`;

  switch (level) {
    case 1:
      return <h1 className={baseClass}>{children}</h1>;
    case 2:
      return <h2 className={baseClass}>{children}</h2>;
    case 3:
      return <h3 className={baseClass}>{children}</h3>;
    case 4:
      return <h4 className={baseClass}>{children}</h4>;
    default:
      return <h1 className={baseClass}>{children}</h1>;
  }
}
