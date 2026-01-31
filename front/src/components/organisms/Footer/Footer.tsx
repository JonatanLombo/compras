"use client";

import { Text } from "@/components/atoms";
import { useI18n } from "@/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Text variant="small">{t("footer.version")}</Text>
          <Text variant="small">{t("footer.system")}</Text>
        </div>
      </div>
    </footer>
  );
}
