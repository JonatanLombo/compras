"use client";

import { Title, Text, SearchInput, Button, Icon } from "@/components/atoms";
import {
  SupplierComparisonCard,
  SearchLoadingSkeleton,
} from "@/components/molecules";
import { useI18n } from "@/i18n";
import { searchSuggestions, type SupplierQuote } from "@/test/compras.data";
import { FiltersModal } from "./FiltersModal";
import { OrderModal } from "./OrderModal";

type SearchState = "idle" | "loading" | "results" | "no-results";

interface SearchTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchState: SearchState;
  supplierResults: SupplierQuote[];
  lastSearch: string;
  countActiveFilters: () => number;
  onSearch: () => void;
  onClearSearch: () => void;
  onSuggestionClick: (suggestion: string) => void;
  onSupplierSelect: (supplier: SupplierQuote) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  // Filters modal
  showFiltersModal: boolean;
  setShowFiltersModal: (show: boolean) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  // Filter values
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
  // Order modal
  showOrderModal: boolean;
  setShowOrderModal: (show: boolean) => void;
  selectedProduct: SupplierQuote | null;
  onOrderSubmit: (e: React.FormEvent) => void;
  onCloseOrderModal: () => void;
  orderQuantity: string;
  setOrderQuantity: (qty: string) => void;
  orderDeliveryAddress: string;
  setOrderDeliveryAddress: (addr: string) => void;
  orderContactName: string;
  setOrderContactName: (name: string) => void;
  orderContactPhone: string;
  setOrderContactPhone: (phone: string) => void;
  orderPaymentMethod: string;
  setOrderPaymentMethod: (method: string) => void;
  calculateOrderTotal: () => { subtotal: number; shipping: number; total: number };
}

export function SearchTab({
  searchQuery,
  setSearchQuery,
  searchState,
  supplierResults,
  lastSearch,
  countActiveFilters,
  onSearch,
  onClearSearch,
  onSuggestionClick,
  onSupplierSelect,
  onKeyDown,
  showFiltersModal,
  setShowFiltersModal,
  onApplyFilters,
  onClearFilters,
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
  showOrderModal,
  setShowOrderModal,
  selectedProduct,
  onOrderSubmit,
  onCloseOrderModal,
  orderQuantity,
  setOrderQuantity,
  orderDeliveryAddress,
  setOrderDeliveryAddress,
  orderContactName,
  setOrderContactName,
  orderContactPhone,
  setOrderContactPhone,
  orderPaymentMethod,
  setOrderPaymentMethod,
  calculateOrderTotal,
}: SearchTabProps) {
  const { t } = useI18n();

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="text-center mb-8">
        <Title level={2} className="text-slate-900 dark:text-slate-100 mb-2">
          {t("compras.title")}
        </Title>
        <Text variant="muted" className="max-w-lg mx-auto">
          {t("compras.subtitle")}
        </Text>
      </div>

      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t("compras.searchPlaceholder")}
              onKeyDown={onKeyDown}
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => setShowFiltersModal(true)}
            className="relative"
          >
            <Icon name="settings" size="sm" />
            {countActiveFilters() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                {countActiveFilters()}
              </span>
            )}
          </Button>
          <Button
            variant="primary"
            onClick={onSearch}
            disabled={!searchQuery.trim() || searchState === "loading"}
          >
            <Icon name="search" size="sm" />
          </Button>
          {(searchState === "results" || searchState === "no-results") && (
            <Button variant="secondary" onClick={onClearSearch}>
              {t("compras.clearSearch")}
            </Button>
          )}
        </div>

        {/* Active filters indicator */}
        {countActiveFilters() > 0 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {countActiveFilters()} {t("search.activeFilters")}
            </span>
            <button
              onClick={onClearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("search.clearFilters")}
            </button>
          </div>
        )}
      </div>

      {/* Filters Modal */}
      <FiltersModal
        show={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        onApply={onApplyFilters}
        onClear={onClearFilters}
        sourceTypeFilter={sourceTypeFilter}
        setSourceTypeFilter={setSourceTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        minRatingFilter={minRatingFilter}
        setMinRatingFilter={setMinRatingFilter}
        maxDeliveryFilter={maxDeliveryFilter}
        setMaxDeliveryFilter={setMaxDeliveryFilter}
        maxPriceFilter={maxPriceFilter}
        setMaxPriceFilter={setMaxPriceFilter}
        verifiedOnlyFilter={verifiedOnlyFilter}
        setVerifiedOnlyFilter={setVerifiedOnlyFilter}
        freeShippingFilter={freeShippingFilter}
        setFreeShippingFilter={setFreeShippingFilter}
      />

      {/* Order Modal */}
      {showOrderModal && selectedProduct && (
        <OrderModal
          show={showOrderModal}
          product={selectedProduct}
          onClose={onCloseOrderModal}
          onSubmit={onOrderSubmit}
          quantity={orderQuantity}
          setQuantity={setOrderQuantity}
          deliveryAddress={orderDeliveryAddress}
          setDeliveryAddress={setOrderDeliveryAddress}
          contactName={orderContactName}
          setContactName={setOrderContactName}
          contactPhone={orderContactPhone}
          setContactPhone={setOrderContactPhone}
          paymentMethod={orderPaymentMethod}
          setPaymentMethod={setOrderPaymentMethod}
          calculateTotal={calculateOrderTotal}
        />
      )}

      {/* Idle state - suggestions */}
      {searchState === "idle" && (
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {t("compras.popularSearches")}:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {searchSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSuggestionClick(suggestion)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading state */}
      {searchState === "loading" && <SearchLoadingSkeleton />}

      {/* Results state */}
      {searchState === "results" && (
        <div>
          <div className="mb-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">
                {supplierResults.length}
              </span>{" "}
              {t("compras.suppliersFound")} &quot;{lastSearch}&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supplierResults.map((supplier) => (
              <SupplierComparisonCard
                key={supplier.id}
                supplier={supplier}
                onSelect={onSupplierSelect}
              />
            ))}
          </div>
        </div>
      )}

      {/* No results state */}
      {searchState === "no-results" && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="search" size="xl" className="text-slate-400" />
          </div>
          <Title level={3} className="text-slate-900 dark:text-white mb-2">
            {t("compras.noSuppliersFound")}
          </Title>
          <Text variant="muted">{t("compras.tryDifferentSearch")}</Text>
        </div>
      )}
    </div>
  );
}
