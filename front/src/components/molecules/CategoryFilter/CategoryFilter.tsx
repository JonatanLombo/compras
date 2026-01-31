"use client";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            activeCategory === category.id
              ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
