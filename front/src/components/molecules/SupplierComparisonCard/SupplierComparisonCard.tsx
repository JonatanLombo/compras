"use client";

import { Icon, Badge, Button } from "@/components/atoms";
import { useI18n } from "@/i18n";
import type { SupplierQuote } from "@/test/compras.data";

interface SupplierComparisonCardProps {
  supplier: SupplierQuote;
  onSelect: (supplier: SupplierQuote) => void;
}

export function SupplierComparisonCard({ supplier, onSelect }: SupplierComparisonCardProps) {
  const { t } = useI18n();

  const highlightLabels = {
    price: t("supplier.bestPrice"),
    rating: t("supplier.bestRating"),
    delivery: t("supplier.fastestDelivery"),
  };

  const highlightColors = {
    price: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    rating: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    delivery: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon key={i} name="star-filled" size="sm" className="text-amber-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Icon key={i} name="star-filled" size="sm" className="text-amber-400" />
        );
      } else {
        stars.push(
          <Icon key={i} name="star" size="sm" className="text-slate-300 dark:text-slate-600" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Logo placeholder */}
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
              {supplier.supplierLogo ? (
                <img src={supplier.supplierLogo} alt={supplier.supplierName} className="w-8 h-8" />
              ) : (
                <Icon name="building" size="lg" className="text-slate-400" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                {supplier.supplierName}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex">{renderStars(supplier.supplierRating)}</div>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                  {supplier.supplierRating} ({supplier.reviewCount})
                </span>
              </div>
            </div>
          </div>
          {supplier.highlight && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${highlightColors[supplier.highlight]}`}>
              {highlightLabels[supplier.highlight]}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {supplier.verified && (
            <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
              <Icon name="check-circle" size="sm" />
              <span>{t("supplier.verified")}</span>
            </div>
          )}
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
              supplier.sourceType === "local"
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
            }`}
          >
            {supplier.sourceType === "local" ? t("supplier.sourceLocal") : t("supplier.sourceWeb")}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
        <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
          {supplier.productName}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {supplier.productDescription}
        </p>
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Icon name="sales" size="sm" />
            {t("supplier.price")}
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            ${supplier.unitPrice.toLocaleString()} <span className="text-xs font-normal text-slate-500">/{supplier.unit}</span>
          </span>
        </div>

        {/* Stock */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Icon name="box" size="sm" />
            {t("supplier.stock")}
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {supplier.availableStock.toLocaleString()} {t("supplier.units")}
          </span>
        </div>

        {/* Delivery */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Icon name="truck" size="sm" />
            {t("supplier.delivery")}
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {supplier.deliveryDays.min}-{supplier.deliveryDays.max} {t("supplier.days")}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Icon name="location" size="sm" />
            {t("supplier.location")}
          </span>
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {supplier.supplierCity}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {t("supplier.shippingCost")}
          </span>
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {supplier.shippingCost === 0 ? (
              <span className="text-green-600 dark:text-green-400 font-medium">Gratis</span>
            ) : (
              `$${supplier.shippingCost}`
            )}
          </span>
        </div>

        {/* Min Order */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {t("supplier.minOrder")}
          </span>
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {supplier.minQuantity} {t("supplier.units")}
          </span>
        </div>
      </div>

      {/* Conditions */}
      <div className="px-4 pb-4">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          {t("supplier.conditions")}:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {supplier.conditions.map((cond, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
            >
              {cond}
            </span>
          ))}
        </div>
      </div>

      {/* Payment Terms */}
      <div className="px-4 pb-4">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
          {t("supplier.paymentTerms")}:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {supplier.paymentTerms.map((term, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded"
            >
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-700">
        <Button
          variant="primary"
          size="lg"
          onClick={() => onSelect(supplier)}
          className="w-full"
        >
          {t("supplier.select")}
        </Button>
      </div>
    </div>
  );
}
