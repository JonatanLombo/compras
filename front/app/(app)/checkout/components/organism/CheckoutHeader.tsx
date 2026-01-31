"use client";

import { Icon } from "@/components/atoms";

export function CheckoutHeader() {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#00529B] text-white font-bold text-xl px-3 py-1 rounded">
            PSE
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Pagos Seguros en Línea
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ACH Colombia
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Icon name="clock" size="sm" />
          <span>Sesión segura</span>
        </div>
      </div>
    </header>
  );
}
