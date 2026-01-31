"use client";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === tab.id
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={`px-1.5 py-0.5 text-xs rounded ${
                activeTab === tab.id
                  ? "bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
