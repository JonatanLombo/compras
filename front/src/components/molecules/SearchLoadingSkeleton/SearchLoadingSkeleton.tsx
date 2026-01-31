"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/i18n";

export function SearchLoadingSkeleton() {
  const { t } = useI18n();
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    t("compras.searching"),
    t("compras.comparingPrices"),
    t("compras.analyzingOptions"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="space-y-6">
      {/* Loading message */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
          <svg className="animate-spin w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {messages[messageIndex]}
          </span>
        </div>
      </div>

      {/* Skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
          >
            {/* Header skeleton */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Product info skeleton */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse mb-2" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 animate-pulse" />
            </div>

            {/* Details skeleton */}
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="flex justify-between">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24 animate-pulse" />
                </div>
              ))}
            </div>

            {/* Conditions skeleton */}
            <div className="px-4 pb-4">
              <div className="flex gap-2">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-24 animate-pulse" />
              </div>
            </div>

            {/* Button skeleton */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-700">
              <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
