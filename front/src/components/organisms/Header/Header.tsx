"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle, LanguageToggle, Icon } from "@/components/atoms";
import type { IconName } from "@/components/atoms/Icon/Icon";
import { useI18n } from "@/i18n";

interface ModuleInfo {
  name: string;
  nameKey: string;
  icon: IconName;
}

const moduleMap: Record<string, ModuleInfo> = {
  "/compras": { name: "Compras", nameKey: "modules.compras", icon: "purchases" },
  "/ventas": { name: "Ventas", nameKey: "modules.ventas", icon: "sales" },
  "/inventario": { name: "Inventario", nameKey: "modules.inventario", icon: "inventory" },
  "/contabilidad": { name: "Contabilidad", nameKey: "modules.contabilidad", icon: "accounting" },
  "/rrhh": { name: "RRHH", nameKey: "modules.rrhh", icon: "hr" },
  "/configuracion": { name: "Configuración", nameKey: "modules.configuracion", icon: "settings" },
};

export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();

  // Detectar el módulo actual basado en la ruta
  const currentModule = Object.entries(moduleMap).find(([path]) =>
    pathname.startsWith(path)
  );

  const isHome = pathname === "/";

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y navegación */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              <span className="text-white dark:text-slate-900 font-bold text-sm">NX</span>
            </Link>

            {/* Breadcrumb del módulo */}
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                NexusPro
              </h1>

              {currentModule && (
                <>
                  <Icon
                    name="chevron-right"
                    size="sm"
                    className="text-slate-300 dark:text-slate-600"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      <Icon name={currentModule[1].icon} size="sm" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 hidden sm:inline">
                      {t(currentModule[1].nameKey as any)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors">
              <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
                AD
              </div>
              <span className="hidden sm:inline">{t("header.admin")}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
