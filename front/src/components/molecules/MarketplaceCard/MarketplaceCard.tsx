"use client";

import { Icon, Title, Text, Badge, Button } from "@/components/atoms";
import type { MarketplaceModule } from "@/test/marketplace.data";

interface MarketplaceCardProps {
  module: MarketplaceModule;
  onSelect: (module: MarketplaceModule) => void;
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

export function MarketplaceCard({ module, onSelect }: MarketplaceCardProps) {
  return (
    <div className="flex flex-col p-5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            <Icon name={module.icon} size="lg" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Title level={4} className="text-slate-900 dark:text-slate-100">
                {module.name}
              </Title>
              {module.popular && <Badge variant="info" size="sm">Popular</Badge>}
              {module.new && <Badge variant="new" size="sm">Nuevo</Badge>}
            </div>
            <Text variant="small">{module.description}</Text>
          </div>
        </div>
      </div>

      <Text variant="muted" className="mb-4 line-clamp-2 flex-1">
        {module.longDescription}
      </Text>

      <div className="mb-4">
        <Text variant="small" className="mb-2 font-medium text-slate-600 dark:text-slate-400">
          Características principales:
        </Text>
        <ul className="space-y-1">
          {module.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
        <div>
          <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {formatPrice(module.price, module.currency, module.billingPeriod)}
          </span>
        </div>
        <Button variant="primary" size="sm" onClick={() => onSelect(module)}>
          Ver detalles
        </Button>
      </div>
    </div>
  );
}
