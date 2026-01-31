"use client";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="w-4 h-4 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 peer-checked:bg-slate-900 dark:peer-checked:bg-slate-100 peer-checked:border-slate-900 dark:peer-checked:border-slate-100 peer-disabled:opacity-50 transition-colors">
          <svg
            className="w-4 h-4 text-white dark:text-slate-900 opacity-0 peer-checked:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <svg
          className={`absolute top-0 left-0 w-4 h-4 text-white dark:text-slate-900 transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
    </label>
  );
}
