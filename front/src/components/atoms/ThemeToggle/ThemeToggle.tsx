"use client";

import { useEffect, useState } from "react";
import { Icon } from "../Icon";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored === "dark" || (!stored && prefersDark);
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggle = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    document.documentElement.classList.toggle("dark", newValue);
    localStorage.setItem("theme", newValue ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700" />
    );
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      <Icon name={isDark ? "sun" : "moon"} size="md" />
    </button>
  );
}
