"use client";

import { Button, Icon } from "@/components/atoms";
import { useI18n } from "@/i18n";
import { productCategories, type ProductCategory } from "@/test/compras.data";

interface FiltersModalProps {
  show: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
  sourceTypeFilter: "all" | "local" | "web";
  setSourceTypeFilter: (type: "all" | "local" | "web") => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  minRatingFilter: number;
  setMinRatingFilter: (rating: number) => void;
  maxDeliveryFilter: number;
  setMaxDeliveryFilter: (days: number) => void;
  maxPriceFilter: number;
  setMaxPriceFilter: (price: number) => void;
  verifiedOnlyFilter: boolean;
  setVerifiedOnlyFilter: (verified: boolean) => void;
  freeShippingFilter: boolean;
  setFreeShippingFilter: (free: boolean) => void;
}

export function FiltersModal({
  show,
  onClose,
  onApply,
  onClear,
  sourceTypeFilter,
  setSourceTypeFilter,
  categoryFilter,
  setCategoryFilter,
  minRatingFilter,
  setMinRatingFilter,
  maxDeliveryFilter,
  setMaxDeliveryFilter,
  maxPriceFilter,
  setMaxPriceFilter,
  verifiedOnlyFilter,
  setVerifiedOnlyFilter,
  freeShippingFilter,
  setFreeShippingFilter,
}: FiltersModalProps) {
  const { t, locale } = useI18n();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t("search.advancedFilters")}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Icon name="x-mark" size="md" className="text-slate-500" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 space-y-5">
          {/* Source Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t("search.filterSource")}
            </label>
            <div className="flex bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
              <button
                onClick={() => setSourceTypeFilter("all")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  sourceTypeFilter === "all"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {t("search.sourceAll")}
              </button>
              <button
                onClick={() => setSourceTypeFilter("local")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  sourceTypeFilter === "local"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Local
              </button>
              <button
                onClick={() => setSourceTypeFilter("web")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  sourceTypeFilter === "web"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Web
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t("search.category")}
            </label>
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as ProductCategory | "all")
              }
              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="all">{t("search.allCategories")}</option>
              {productCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {locale === "es" ? cat.label : cat.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t("search.minRating")}
            </label>
            <select
              value={minRatingFilter}
              onChange={(e) => setMinRatingFilter(Number(e.target.value))}
              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value={0}>{t("search.anyRating")}</option>
              <option value={4.5}>4.5+ {t("search.stars")}</option>
              <option value={4}>4.0+ {t("search.stars")}</option>
              <option value={3.5}>3.5+ {t("search.stars")}</option>
            </select>
          </div>

          {/* Max Delivery Days */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t("search.maxDelivery")}
            </label>
            <select
              value={maxDeliveryFilter}
              onChange={(e) => setMaxDeliveryFilter(Number(e.target.value))}
              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value={0}>{t("search.anyDelivery")}</option>
              <option value={1}>1 {t("search.days")}</option>
              <option value={2}>2 {t("search.days")}</option>
              <option value={3}>3 {t("search.days")}</option>
              <option value={5}>5 {t("search.days")}</option>
              <option value={7}>7 {t("search.days")}</option>
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t("search.maxPrice")} (USD)
            </label>
            <input
              type="number"
              value={maxPriceFilter || ""}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value) || 0)}
              placeholder={t("search.anyPrice")}
              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnlyFilter}
                onChange={(e) => setVerifiedOnlyFilter(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Icon name="check-circle" size="sm" className="text-blue-500" />
                {t("search.verifiedOnly")}
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={freeShippingFilter}
                onChange={(e) => setFreeShippingFilter(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Icon name="truck" size="sm" className="text-green-500" />
                {t("search.freeShippingOnly")}
              </span>
            </label>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClear}
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            {t("search.clearFilters")}
          </button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              {t("newSupplierModal.cancel")}
            </Button>
            <Button variant="primary" onClick={onApply}>
              {t("search.applyFilters")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
