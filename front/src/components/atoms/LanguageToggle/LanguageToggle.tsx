"use client";

import { useI18n } from "@/i18n";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  const toggle = () => {
    setLocale(locale === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
