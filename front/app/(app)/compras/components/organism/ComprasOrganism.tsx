"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs } from "@/components/atoms";
import { useI18n } from "@/i18n";
import { useCotizaciones, useProveedores, useOrdenes } from "@/hooks";
import { type SupplierQuote, type ProductCategory } from "@/test/compras.data";
import { type Proveedor } from "@/api";
import { SearchTab } from "./SearchTab";
import { OrdersTab } from "./OrdersTab";
import { SuppliersTab } from "./SuppliersTab";

type SearchState = "idle" | "loading" | "results" | "no-results";

export function ComprasOrganism() {
  const { t } = useI18n();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("search");

  // Hooks para API
  const {
    search: searchCotizaciones,
    searchResults: supplierResults,
    isLoading: isSearching,
    clearSearch,
  } = useCotizaciones();

  const {
    proveedores,
    fetchAll: fetchProveedores,
    create: createProveedor,
    update: updateProveedor,
    bulkImport,
    isLoading: isLoadingProveedores,
  } = useProveedores();

  const {
    ordenes,
    fetchAll: fetchOrdenes,
    isLoading: isLoadingOrdenes,
  } = useOrdenes();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [lastSearch, setLastSearch] = useState("");

  // Filter state
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [sourceTypeFilter, setSourceTypeFilter] = useState<"all" | "local" | "web">("all");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">("all");
  const [minRatingFilter, setMinRatingFilter] = useState<number>(0);
  const [maxDeliveryFilter, setMaxDeliveryFilter] = useState<number>(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(0);
  const [verifiedOnlyFilter, setVerifiedOnlyFilter] = useState(false);
  const [freeShippingFilter, setFreeShippingFilter] = useState(false);

  // New supplier state
  const [showNewSupplierForm, setShowNewSupplierForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierCity, setNewSupplierCity] = useState("");
  const [newSupplierContact, setNewSupplierContact] = useState("");
  const [newSupplierEmail, setNewSupplierEmail] = useState("");
  const [bulkFile, setBulkFile] = useState<File | null>(null);

  // New product state
  const [productSupplierId, setProductSupplierId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDeliveryMin, setProductDeliveryMin] = useState("");
  const [productDeliveryMax, setProductDeliveryMax] = useState("");
  const [productShippingCost, setProductShippingCost] = useState("");
  const [productMinOrder, setProductMinOrder] = useState("");
  const [productConditions, setProductConditions] = useState("");
  const [productPaymentTerms, setProductPaymentTerms] = useState("");

  // Order form state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SupplierQuote | null>(null);
  const [orderQuantity, setOrderQuantity] = useState("");
  const [orderDeliveryAddress, setOrderDeliveryAddress] = useState("");
  const [orderContactName, setOrderContactName] = useState("");
  const [orderContactPhone, setOrderContactPhone] = useState("");
  const [orderPaymentMethod, setOrderPaymentMethod] = useState("");

  // Supplier detail/edit modal state
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Proveedor | null>(null);
  const [isEditingSupplier, setIsEditingSupplier] = useState(false);
  const [editSupplierName, setEditSupplierName] = useState("");
  const [editSupplierRfc, setEditSupplierRfc] = useState("");
  const [editSupplierContact, setEditSupplierContact] = useState("");
  const [editSupplierEmail, setEditSupplierEmail] = useState("");
  const [editSupplierPhone, setEditSupplierPhone] = useState("");
  const [editSupplierAddress, setEditSupplierAddress] = useState("");
  const [editSupplierCity, setEditSupplierCity] = useState("");
  const [editSupplierState, setEditSupplierState] = useState("");
  const [editSupplierCategory, setEditSupplierCategory] = useState("");

  // Cargar datos iniciales
  useEffect(() => {
    fetchProveedores();
    fetchOrdenes();
  }, [fetchProveedores, fetchOrdenes]);

  // Actualizar searchState basado en isSearching y resultados
  useEffect(() => {
    if (isSearching) {
      setSearchState("loading");
    } else if (lastSearch && supplierResults.length > 0) {
      setSearchState("results");
    } else if (lastSearch && supplierResults.length === 0) {
      setSearchState("no-results");
    }
  }, [isSearching, supplierResults, lastSearch]);

  const tabs = [
    { id: "search", label: t("compras.tabs.search") },
    { id: "orders", label: t("compras.tabs.orders"), count: ordenes.length },
    { id: "suppliers", label: t("compras.tabs.suppliers"), count: proveedores.filter((p) => p.activo).length },
  ];

  const buildFilters = () => ({
    sourceType: sourceTypeFilter,
    category: categoryFilter === "all" ? undefined : categoryFilter,
    minRating: minRatingFilter || undefined,
    maxDeliveryDays: maxDeliveryFilter || undefined,
    maxPrice: maxPriceFilter || undefined,
    verifiedOnly: verifiedOnlyFilter || undefined,
    freeShippingOnly: freeShippingFilter || undefined,
  });

  const countActiveFilters = (): number => {
    let count = 0;
    if (sourceTypeFilter !== "all") count++;
    if (categoryFilter !== "all") count++;
    if (minRatingFilter > 0) count++;
    if (maxDeliveryFilter > 0) count++;
    if (maxPriceFilter > 0) count++;
    if (verifiedOnlyFilter) count++;
    if (freeShippingFilter) count++;
    return count;
  };

  const clearAllFilters = () => {
    setSourceTypeFilter("all");
    setCategoryFilter("all");
    setMinRatingFilter(0);
    setMaxDeliveryFilter(0);
    setMaxPriceFilter(0);
    setVerifiedOnlyFilter(false);
    setFreeShippingFilter(false);
  };

  const executeSearch = async (query: string) => {
    if (!query.trim()) return;
    setShowFiltersModal(false);
    setLastSearch(query);
    await searchCotizaciones(query, buildFilters());
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    await executeSearch(searchQuery);
  };

  const handleApplyFilters = () => {
    setShowFiltersModal(false);
    const queryToUse = lastSearch || searchQuery;
    if (queryToUse.trim()) {
      executeSearch(queryToUse);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchState("idle");
    setLastSearch("");
    clearSearch();
  };

  const handleSupplierSelect = (supplier: SupplierQuote) => {
    setSelectedProduct(supplier);
    setOrderQuantity(supplier.minQuantity.toString());
    setOrderPaymentMethod(supplier.paymentTerms[0] || "");
    setShowOrderModal(true);
  };

  const resetOrderForm = () => {
    setOrderQuantity("");
    setOrderDeliveryAddress("");
    setOrderContactName("");
    setOrderContactPhone("");
    setOrderPaymentMethod("");
    setSelectedProduct(null);
  };

  const handleSupplierClick = (supplier: Proveedor) => {
    setSelectedSupplier(supplier);
    setIsEditingSupplier(false);
    setShowSupplierModal(true);
  };

  const handleStartEditSupplier = () => {
    if (!selectedSupplier) return;
    setEditSupplierName(selectedSupplier.nombre);
    setEditSupplierRfc(selectedSupplier.rfc);
    setEditSupplierContact(selectedSupplier.contacto);
    setEditSupplierEmail(selectedSupplier.email);
    setEditSupplierPhone(selectedSupplier.telefono);
    setEditSupplierAddress(selectedSupplier.direccion);
    setEditSupplierCity(selectedSupplier.ciudad);
    setEditSupplierState(selectedSupplier.estado);
    setEditSupplierCategory(selectedSupplier.categoria);
    setIsEditingSupplier(true);
  };

  const handleSaveSupplier = async () => {
    if (!selectedSupplier) return;
    try {
      await updateProveedor(String(selectedSupplier.id), {
        nombre: editSupplierName,
        rfc: editSupplierRfc,
        contacto: editSupplierContact,
        email: editSupplierEmail,
        telefono: editSupplierPhone,
        direccion: editSupplierAddress,
        ciudad: editSupplierCity,
        estado: editSupplierState,
        categoria: editSupplierCategory,
      });
      setIsEditingSupplier(false);
      alert("Proveedor actualizado correctamente");
    } catch {
      alert("Error al actualizar proveedor");
    }
  };

  const handleCancelEditSupplier = () => {
    setIsEditingSupplier(false);
  };

  const handleCloseSupplierModal = () => {
    setShowSupplierModal(false);
    setSelectedSupplier(null);
    setIsEditingSupplier(false);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const totals = calculateOrderTotal();
    const orderNumber = `OC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, "0")}`;

    const orderData = {
      product: {
        id: selectedProduct.id,
        name: selectedProduct.productName,
        description: selectedProduct.productDescription,
        unitPrice: selectedProduct.unitPrice,
        unit: selectedProduct.unit,
        supplierName: selectedProduct.supplierName,
        deliveryDays: selectedProduct.deliveryDays,
      },
      quantity: parseInt(orderQuantity),
      deliveryAddress: orderDeliveryAddress,
      contactName: orderContactName,
      contactPhone: orderContactPhone,
      paymentMethod: orderPaymentMethod,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("nexuspro_order", JSON.stringify(orderData));
    router.push("/checkout");
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
    resetOrderForm();
  };

  const calculateOrderTotal = () => {
    if (!selectedProduct || !orderQuantity) return { subtotal: 0, shipping: 0, total: 0 };
    const qty = parseInt(orderQuantity) || 0;
    const subtotal = qty * selectedProduct.unitPrice;
    const shipping =
      selectedProduct.freeShippingMinimum && subtotal >= selectedProduct.freeShippingMinimum
        ? 0
        : selectedProduct.shippingCost;
    return { subtotal, shipping, total: subtotal + shipping };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    executeSearch(suggestion);
  };

  const handleNewSupplierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProveedor({
        nombre: newSupplierName,
        ciudad: newSupplierCity,
        contacto: newSupplierContact,
        email: newSupplierEmail,
      });
      alert(t("newSupplierModal.success"));
      setShowNewSupplierForm(false);
      setNewSupplierName("");
      setNewSupplierCity("");
      setNewSupplierContact("");
      setNewSupplierEmail("");
    } catch {
      alert("Error al crear proveedor");
    }
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBulkFile(file);
    }
  };

  const handleBulkUpload = async () => {
    if (bulkFile) {
      try {
        const result = await bulkImport(bulkFile);
        alert(`Archivo procesado. ${result.imported} proveedores importados.`);
        setBulkFile(null);
        setShowBulkUpload(false);
      } catch {
        alert("Error al importar proveedores");
      }
    }
  };

  const handleNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const supplier = proveedores.find((p) => String(p.id) === productSupplierId);
    alert(`Producto "${productName}" agregado a ${supplier?.nombre || "proveedor"}`);
    setShowNewProductForm(false);
    setProductSupplierId("");
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductUnit("");
    setProductStock("");
    setProductDeliveryMin("");
    setProductDeliveryMax("");
    setProductShippingCost("");
    setProductMinOrder("");
    setProductConditions("");
    setProductPaymentTerms("");
  };

  return (
    <>
      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "search" && (
          <SearchTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchState={searchState}
            supplierResults={supplierResults}
            lastSearch={lastSearch}
            countActiveFilters={countActiveFilters}
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            onSuggestionClick={handleSuggestionClick}
            onSupplierSelect={handleSupplierSelect}
            onKeyDown={handleKeyDown}
            showFiltersModal={showFiltersModal}
            setShowFiltersModal={setShowFiltersModal}
            onApplyFilters={handleApplyFilters}
            onClearFilters={clearAllFilters}
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
            showOrderModal={showOrderModal}
            setShowOrderModal={setShowOrderModal}
            selectedProduct={selectedProduct}
            onOrderSubmit={handleOrderSubmit}
            onCloseOrderModal={handleCloseOrderModal}
            orderQuantity={orderQuantity}
            setOrderQuantity={setOrderQuantity}
            orderDeliveryAddress={orderDeliveryAddress}
            setOrderDeliveryAddress={setOrderDeliveryAddress}
            orderContactName={orderContactName}
            setOrderContactName={setOrderContactName}
            orderContactPhone={orderContactPhone}
            setOrderContactPhone={setOrderContactPhone}
            orderPaymentMethod={orderPaymentMethod}
            setOrderPaymentMethod={setOrderPaymentMethod}
            calculateOrderTotal={calculateOrderTotal}
          />
        )}

        {activeTab === "orders" && <OrdersTab orders={ordenes} />}

        {activeTab === "suppliers" && (
          <SuppliersTab
            proveedores={proveedores}
            isLoading={isLoadingProveedores}
            showNewSupplierForm={showNewSupplierForm}
            setShowNewSupplierForm={setShowNewSupplierForm}
            showNewProductForm={showNewProductForm}
            setShowNewProductForm={setShowNewProductForm}
            showBulkUpload={showBulkUpload}
            setShowBulkUpload={setShowBulkUpload}
            newSupplierName={newSupplierName}
            setNewSupplierName={setNewSupplierName}
            newSupplierCity={newSupplierCity}
            setNewSupplierCity={setNewSupplierCity}
            newSupplierContact={newSupplierContact}
            setNewSupplierContact={setNewSupplierContact}
            newSupplierEmail={newSupplierEmail}
            setNewSupplierEmail={setNewSupplierEmail}
            onNewSupplierSubmit={handleNewSupplierSubmit}
            productSupplierId={productSupplierId}
            setProductSupplierId={setProductSupplierId}
            productName={productName}
            setProductName={setProductName}
            productDescription={productDescription}
            setProductDescription={setProductDescription}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            productUnit={productUnit}
            setProductUnit={setProductUnit}
            productStock={productStock}
            setProductStock={setProductStock}
            productDeliveryMin={productDeliveryMin}
            setProductDeliveryMin={setProductDeliveryMin}
            productDeliveryMax={productDeliveryMax}
            setProductDeliveryMax={setProductDeliveryMax}
            productShippingCost={productShippingCost}
            setProductShippingCost={setProductShippingCost}
            productMinOrder={productMinOrder}
            setProductMinOrder={setProductMinOrder}
            productConditions={productConditions}
            setProductConditions={setProductConditions}
            productPaymentTerms={productPaymentTerms}
            setProductPaymentTerms={setProductPaymentTerms}
            onNewProductSubmit={handleNewProductSubmit}
            bulkFile={bulkFile}
            setBulkFile={setBulkFile}
            onBulkUpload={handleBulkUpload}
            onBulkFileChange={handleBulkFileChange}
            showSupplierModal={showSupplierModal}
            selectedSupplier={selectedSupplier}
            onSupplierClick={handleSupplierClick}
            onCloseSupplierModal={handleCloseSupplierModal}
            isEditingSupplier={isEditingSupplier}
            onStartEditSupplier={handleStartEditSupplier}
            onSaveSupplier={handleSaveSupplier}
            onCancelEditSupplier={handleCancelEditSupplier}
            editSupplierName={editSupplierName}
            setEditSupplierName={setEditSupplierName}
            editSupplierRfc={editSupplierRfc}
            setEditSupplierRfc={setEditSupplierRfc}
            editSupplierContact={editSupplierContact}
            setEditSupplierContact={setEditSupplierContact}
            editSupplierEmail={editSupplierEmail}
            setEditSupplierEmail={setEditSupplierEmail}
            editSupplierPhone={editSupplierPhone}
            setEditSupplierPhone={setEditSupplierPhone}
            editSupplierAddress={editSupplierAddress}
            setEditSupplierAddress={setEditSupplierAddress}
            editSupplierCity={editSupplierCity}
            setEditSupplierCity={setEditSupplierCity}
            editSupplierState={editSupplierState}
            setEditSupplierState={setEditSupplierState}
            editSupplierCategory={editSupplierCategory}
            setEditSupplierCategory={setEditSupplierCategory}
          />
        )}
      </div>
    </>
  );
}
