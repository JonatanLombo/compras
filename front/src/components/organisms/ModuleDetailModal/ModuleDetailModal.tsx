"use client";

import { Icon, Title, Text, Badge, Button } from "@/components/atoms";
import type { MarketplaceModule } from "@/test/marketplace.data";

interface ModuleDetailModalProps {
  module: MarketplaceModule;
  onClose: () => void;
  onPurchase: (module: MarketplaceModule) => void;
}

function formatPrice(price: number, currency: string, period: string) {
  const formatted = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);

  const periodLabel = {
    monthly: "/mes",
    yearly: "/año",
    "one-time": "",
  }[period];

  return `${formatted}${periodLabel}`;
}

export function ModuleDetailModal({ module, onClose, onPurchase }: ModuleDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-xl shadow-2xl animate-in">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Icon name={module.icon} size="lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Title level={3} className="text-slate-900 dark:text-slate-100">
                  {module.name}
                </Title>
                {module.popular && <Badge variant="info" size="sm">Popular</Badge>}
                {module.new && <Badge variant="new" size="sm">Nuevo</Badge>}
              </div>
              <Text variant="small">{module.description}</Text>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          <Text variant="muted" className="mb-6">
            {module.longDescription}
          </Text>

          <div className="mb-6">
            <Text variant="small" className="mb-3 font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Características incluidas
            </Text>
            <ul className="space-y-2">
              {module.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg mb-6">
            <div className="flex items-baseline justify-between">
              <Text variant="small" className="text-slate-500 dark:text-slate-400">
                Precio
              </Text>
              <div>
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatPrice(module.price, module.currency, module.billingPeriod)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="lg" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button variant="primary" size="lg" onClick={() => onPurchase(module)} className="flex-1">
              Contratar módulo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
