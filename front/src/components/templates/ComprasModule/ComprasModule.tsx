"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Title,
  Text,
  SearchInput,
  Tabs,
  Button,
  Icon,
  FileUpload,
} from "@/components/atoms";
import {
  SupplierComparisonCard,
  SearchLoadingSkeleton,
} from "@/components/molecules";
import { useI18n } from "@/i18n";
import {
  searchSupplierQuotes,
  searchSuggestions,
  ordenesCompra,
  proveedores,
  productos,
  productCategories,
  type SupplierQuote,
  type SearchFilters,
  type ProductCategory,
  type Proveedor,
  type Producto,
} from "@/test/compras.data";

type SearchState = "idle" | "loading" | "results" | "no-results";

export function ComprasModule() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("search");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [supplierResults, setSupplierResults] = useState<SupplierQuote[]>([]);
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
  const [newSupplierLogo, setNewSupplierLogo] = useState<string | null>(null);
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
  const [orderNotes, setOrderNotes] = useState("");
  const [orderDeliveryAddress, setOrderDeliveryAddress] = useState("");
  const [orderContactName, setOrderContactName] = useState("");
  const [orderContactPhone, setOrderContactPhone] = useState("");
  const [orderPaymentMethod, setOrderPaymentMethod] = useState("");
  const [orderUrgent, setOrderUrgent] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

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

  // Product edit modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProductEdit, setSelectedProductEdit] = useState<Producto | null>(null);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editProductName, setEditProductName] = useState("");
  const [editProductDescription, setEditProductDescription] = useState("");
  const [editProductCategory, setEditProductCategory] = useState("");
  const [editProductUnit, setEditProductUnit] = useState("");
  const [editProductPrice, setEditProductPrice] = useState("");
  const [editProductStock, setEditProductStock] = useState("");
  const [editProductMinStock, setEditProductMinStock] = useState("");

  // Bulk product upload state
  const [showBulkProductUpload, setShowBulkProductUpload] = useState(false);
  const [bulkProductFile, setBulkProductFile] = useState<File | null>(null);

  // Get products for selected supplier
  const supplierProducts = selectedSupplier
    ? productos.filter(p => p.proveedorId === selectedSupplier.id)
    : [];

  // User orders from localStorage
  interface UserOrder {
    id: string;
    numero: string;
    fecha: string;
    proveedorId: string;
    proveedorNombre: string;
    estado: "borrador" | "pendiente" | "aprobada" | "recibida" | "cancelada";
    subtotal: number;
    iva: number;
    total: number;
    items: number;
    producto?: string;
    cantidad?: number;
    transactionId?: string;
    isUserOrder?: boolean;
  }

  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);

  // Cargar órdenes del usuario desde localStorage
  useEffect(() => {
    const loadUserOrders = () => {
      const stored = localStorage.getItem("nexuspro_user_orders");
      if (stored) {
        setUserOrders(JSON.parse(stored));
      }
    };
    loadUserOrders();

    // Escuchar cambios en localStorage (para cuando se vuelve de checkout)
    const handleStorageChange = () => {
      loadUserOrders();
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", loadUserOrders);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", loadUserOrders);
    };
  }, []);

  // Combinar órdenes de prueba con órdenes del usuario
  const allOrders = [...userOrders, ...ordenesCompra];

  const tabs = [
    { id: "search", label: t("compras.tabs.search") },
    { id: "orders", label: t("compras.tabs.orders"), count: allOrders.length },
    { id: "suppliers", label: t("compras.tabs.suppliers"), count: proveedores.filter(p => p.activo).length },
  ];

  const buildFilters = (): SearchFilters => ({
    sourceType: sourceTypeFilter,
    category: categoryFilter,
    minRating: minRatingFilter,
    maxDeliveryDays: maxDeliveryFilter,
    maxPrice: maxPriceFilter,
    verifiedOnly: verifiedOnlyFilter,
    freeShippingOnly: freeShippingFilter,
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

    setSearchState("loading");
    setShowFiltersModal(false);

    const filters = buildFilters();
    const results = await searchSupplierQuotes(query, filters);

    if (results.length > 0) {
      setSupplierResults(results);
      setSearchState("results");
    } else {
      setSearchState("no-results");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLastSearch(searchQuery);
    await executeSearch(searchQuery);
  };

  const handleApplyFilters = () => {
    setShowFiltersModal(false);
    // Si ya hay una búsqueda activa, re-ejecutar con nuevos filtros
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
    setSupplierResults([]);
    setLastSearch("");
  };

  const handleSupplierSelect = (supplier: SupplierQuote) => {
    setSelectedProduct(supplier);
    setOrderQuantity(supplier.minQuantity.toString());
    setOrderPaymentMethod(supplier.paymentTerms[0] || "");
    setOrderSuccess(false);
    setShowOrderModal(true);
  };

  const resetOrderForm = () => {
    setOrderQuantity("");
    setOrderNotes("");
    setOrderDeliveryAddress("");
    setOrderContactName("");
    setOrderContactPhone("");
    setOrderPaymentMethod("");
    setOrderUrgent(false);
    setSelectedProduct(null);
    setOrderSuccess(false);
  };

  // Supplier detail/edit functions
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

  const handleSaveSupplier = () => {
    // En producción, esto guardaría en backend
    // Por ahora solo mostramos confirmación
    setIsEditingSupplier(false);
    alert("Proveedor actualizado correctamente (demo)");
  };

  const handleCancelEditSupplier = () => {
    setIsEditingSupplier(false);
  };

  const handleCloseSupplierModal = () => {
    setShowSupplierModal(false);
    setSelectedSupplier(null);
    setIsEditingSupplier(false);
  };

  // Product detail/edit functions
  const handleProductClick = (product: Producto) => {
    setSelectedProductEdit(product);
    setIsEditingProduct(false);
    setShowProductModal(true);
  };

  const handleStartEditProduct = () => {
    if (!selectedProductEdit) return;
    setEditProductName(selectedProductEdit.nombre);
    setEditProductDescription(selectedProductEdit.descripcion);
    setEditProductCategory(selectedProductEdit.categoria);
    setEditProductUnit(selectedProductEdit.unidad);
    setEditProductPrice(selectedProductEdit.precioUnitario.toString());
    setEditProductStock(selectedProductEdit.stock.toString());
    setEditProductMinStock(selectedProductEdit.stockMinimo.toString());
    setIsEditingProduct(true);
  };

  const handleSaveProduct = () => {
    // En producción, esto guardaría en backend
    setIsEditingProduct(false);
    alert("Producto actualizado correctamente (demo)");
  };

  const handleCancelEditProduct = () => {
    setIsEditingProduct(false);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setSelectedProductEdit(null);
    setIsEditingProduct(false);
  };

  // Bulk product upload functions
  const handleBulkProductFileSelect = (file: File) => {
    setBulkProductFile(file);
  };

  const handleBulkProductUpload = () => {
    if (!bulkProductFile || !selectedSupplier) return;
    // En producción, esto enviaría al backend
    alert(`Archivo "${bulkProductFile.name}" cargado para ${selectedSupplier.nombre} (demo)`);
    setBulkProductFile(null);
    setShowBulkProductUpload(false);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const totals = calculateOrderTotal();
    const orderNumber = `OC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`;

    // Guardar datos del pedido en localStorage
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

    // Redirigir a pasarela de pago PSE
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
    const shipping = selectedProduct.freeShippingMinimum && subtotal >= selectedProduct.freeShippingMinimum
      ? 0
      : selectedProduct.shippingCost;
    return { subtotal, shipping, total: subtotal + shipping };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSearchState("loading");
    setLastSearch(suggestion);

    const filters = buildFilters();
    searchSupplierQuotes(suggestion, filters).then((results) => {
      if (results.length > 0) {
        setSupplierResults(results);
        setSearchState("results");
      } else {
        setSearchState("no-results");
      }
    });
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewSupplierLogo(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleNewSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("newSupplierModal.success"));
    setShowNewSupplierForm(false);
    setNewSupplierLogo(null);
    setNewSupplierName("");
    setNewSupplierCity("");
    setNewSupplierContact("");
    setNewSupplierEmail("");
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBulkFile(file);
    }
  };

  const handleBulkUpload = () => {
    if (bulkFile) {
      alert(`Archivo "${bulkFile.name}" procesado. Proveedores importados exitosamente.`);
      setBulkFile(null);
      setShowBulkUpload(false);
    }
  };

  const handleNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const supplier = proveedores.find(p => p.id === productSupplierId);
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

  const closeAllForms = () => {
    setShowNewSupplierForm(false);
    setShowBulkUpload(false);
    setShowNewProductForm(false);
  };

  const statusLabels: Record<string, string> = {
    borrador: "Borrador",
    pendiente: "Pendiente",
    aprobada: "Aprobada",
    recibida: "Recibida",
    cancelada: "Cancelada",
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
        {/* TAB: Búsqueda de productos */}
        {activeTab === "search" && (
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
                    onKeyDown={handleKeyDown}
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
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || searchState === "loading"}
                >
                  <Icon name="search" size="sm" />
                </Button>
                {(searchState === "results" || searchState === "no-results") && (
                  <Button
                    variant="secondary"
                    onClick={handleClearSearch}
                  >
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
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("search.clearFilters")}
                  </button>
                </div>
              )}
            </div>

            {/* Filters Modal */}
            {showFiltersModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {t("search.advancedFilters")}
                    </h3>
                    <button
                      onClick={() => setShowFiltersModal(false)}
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
                        onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | "all")}
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
                      onClick={clearAllFilters}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      {t("search.clearFilters")}
                    </button>
                    <div className="flex gap-3">
                      <Button
                        variant="secondary"
                        onClick={() => setShowFiltersModal(false)}
                      >
                        {t("newSupplierModal.cancel")}
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleApplyFilters}
                      >
                        {t("search.applyFilters")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Modal */}
            {showOrderModal && selectedProduct && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  {!orderSuccess ? (
                    <>
                      {/* Modal header */}
                      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {t("order.createTitle")}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {selectedProduct.supplierName}
                          </p>
                        </div>
                        <button
                          onClick={handleCloseOrderModal}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Icon name="x-mark" size="md" className="text-slate-500" />
                        </button>
                      </div>

                      {/* Product summary */}
                      <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700">
                            <Icon name="box" size="lg" className="text-slate-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                              {selectedProduct.productName}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {selectedProduct.productDescription}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-lg font-bold text-slate-900 dark:text-white">
                                ${selectedProduct.unitPrice.toLocaleString()} <span className="text-xs font-normal text-slate-500">/{selectedProduct.unit}</span>
                              </span>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Icon name="truck" size="sm" />
                                {selectedProduct.deliveryDays.min}-{selectedProduct.deliveryDays.max} días
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order form */}
                      <form onSubmit={handleOrderSubmit} className="p-4 space-y-4">
                        {/* Quantity */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            {t("order.quantity")} ({selectedProduct.unit}) *
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min={selectedProduct.minQuantity}
                              max={selectedProduct.availableStock}
                              value={orderQuantity}
                              onChange={(e) => setOrderQuantity(e.target.value)}
                              className="block w-32 px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              required
                            />
                            <span className="text-xs text-slate-500">
                              Mín: {selectedProduct.minQuantity} | Stock: {selectedProduct.availableStock.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Delivery address */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            {t("order.deliveryAddress")} *
                          </label>
                          <input
                            type="text"
                            value={orderDeliveryAddress}
                            onChange={(e) => setOrderDeliveryAddress(e.target.value)}
                            placeholder="Calle, número, colonia, ciudad, CP"
                            className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            required
                          />
                        </div>

                        {/* Contact info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                              {t("order.contactName")} *
                            </label>
                            <input
                              type="text"
                              value={orderContactName}
                              onChange={(e) => setOrderContactName(e.target.value)}
                              placeholder="Nombre de quien recibe"
                              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                              {t("order.contactPhone")} *
                            </label>
                            <input
                              type="tel"
                              value={orderContactPhone}
                              onChange={(e) => setOrderContactPhone(e.target.value)}
                              placeholder="+52 55 1234 5678"
                              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              required
                            />
                          </div>
                        </div>

                        {/* Payment method */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            {t("order.paymentMethod")} *
                          </label>
                          <select
                            value={orderPaymentMethod}
                            onChange={(e) => setOrderPaymentMethod(e.target.value)}
                            className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            required
                          >
                            <option value="">{t("order.selectPayment")}</option>
                            {selectedProduct.paymentTerms.map((term) => (
                              <option key={term} value={term}>{term}</option>
                            ))}
                          </select>
                        </div>

                        {/* Order summary */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">{t("order.subtotal")}</span>
                            <span className="text-slate-900 dark:text-white font-medium">
                              ${calculateOrderTotal().subtotal.toLocaleString()} USD
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">{t("order.shipping")}</span>
                            <span className="text-slate-900 dark:text-white font-medium">
                              {calculateOrderTotal().shipping === 0 ? (
                                <span className="text-green-600 dark:text-green-400">Gratis</span>
                              ) : (
                                `$${calculateOrderTotal().shipping.toLocaleString()} USD`
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between text-base pt-2 border-t border-slate-200 dark:border-slate-700">
                            <span className="font-medium text-slate-900 dark:text-white">{t("order.total")}</span>
                            <span className="font-bold text-slate-900 dark:text-white">
                              ${calculateOrderTotal().total.toLocaleString()} USD
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCloseOrderModal}
                          >
                            {t("order.cancel")}
                          </Button>
                          <Button
                            type="submit"
                            variant="primary"
                          >
                            {t("order.submit")}
                          </Button>
                        </div>
                      </form>
                    </>
                  ) : (
                    /* Success state */
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="check-circle" size="xl" className="text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {t("order.successTitle")}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">
                        {t("order.successMessage")}
                      </p>
                      <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-6 inline-block">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {t("order.orderNumber")}:
                        </p>
                        <p className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                          OC-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}
                        </p>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                        <p><strong>{t("order.product")}:</strong> {selectedProduct.productName}</p>
                        <p><strong>{t("order.quantity")}:</strong> {orderQuantity} {selectedProduct.unit}</p>
                        <p><strong>{t("order.total")}:</strong> ${calculateOrderTotal().total.toLocaleString()} USD</p>
                        <p><strong>{t("order.estimatedDelivery")}:</strong> {selectedProduct.deliveryDays.min}-{selectedProduct.deliveryDays.max} días hábiles</p>
                      </div>
                      <Button
                        variant="primary"
                        onClick={handleCloseOrderModal}
                      >
                        {t("order.close")}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
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
                      onClick={() => handleSuggestionClick(suggestion)}
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
                      onSelect={handleSupplierSelect}
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
                <Text variant="muted">
                  {t("compras.tryDifferentSearch")}
                </Text>
              </div>
            )}
          </div>
        )}

        {/* TAB: Mis Órdenes */}
        {activeTab === "orders" && (
          <div className="animate-in">
            <div className="mb-6">
              <Title level={2} className="text-slate-900 dark:text-slate-100 mb-1">
                {t("compras.tabs.orders")}
              </Title>
              <Text variant="muted">
                Historial de órdenes de compra creadas
              </Text>
            </div>

            {allOrders.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="document" size="xl" className="text-slate-400" />
                </div>
                <Title level={3} className="text-slate-900 dark:text-white mb-2">
                  No hay órdenes
                </Title>
                <Text variant="muted">
                  Las órdenes que crees aparecerán aquí
                </Text>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Número
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Proveedor / Producto
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                        Fecha
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {allOrders.map((orden) => {
                      const isUserOrder = 'isUserOrder' in orden && Boolean(orden.isUserOrder);
                      return (
                        <tr
                          key={orden.id}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                            isUserOrder ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {orden.numero}
                              </span>
                              {isUserOrder && (
                                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                                  NUEVA
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
                              {orden.proveedorNombre}
                            </div>
                            {'producto' in orden && Boolean(orden.producto) ? (
                              <div className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                {String(orden.producto)}
                              </div>
                            ) : null}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 hidden sm:table-cell">
                            {new Date(orden.fecha).toLocaleDateString(
                              locale === "es" ? "es-MX" : "en-US"
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100 text-right font-medium">
                            ${orden.total.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                                orden.estado === "recibida"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                  : orden.estado === "aprobada"
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                    : orden.estado === "pendiente"
                                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                      : orden.estado === "cancelada"
                                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                              }`}
                            >
                              {statusLabels[orden.estado] || orden.estado}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB: Proveedores */}
        {activeTab === "suppliers" && (
          <div className="animate-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title level={2} className="text-slate-900 dark:text-slate-100 mb-1">
                  {t("compras.tabs.suppliers")}
                </Title>
                <Text variant="muted">
                  Gestiona tus proveedores registrados
                </Text>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    closeAllForms();
                    setShowBulkUpload(true);
                  }}
                >
                  <Icon name="upload" size="sm" className="mr-2" />
                  Carga masiva
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    closeAllForms();
                    setShowNewProductForm(true);
                  }}
                >
                  <Icon name="box" size="sm" className="mr-2" />
                  Agregar Producto
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    closeAllForms();
                    setShowNewSupplierForm(true);
                  }}
                >
                  <Icon name="plus" size="sm" className="mr-2" />
                  {t("compras.newSupplier")}
                </Button>
              </div>
            </div>

            {/* Bulk upload */}
            {showBulkUpload && (
              <div className="mb-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <Title level={3} className="text-slate-900 dark:text-white mb-2">
                  Carga masiva de proveedores
                </Title>
                <Text variant="muted" className="mb-4">
                  Sube un archivo CSV o Excel con la lista de proveedores
                </Text>

                <div className="mb-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      bulkFile
                        ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                        : "border-slate-300 dark:border-slate-600 hover:border-blue-400"
                    }`}
                  >
                    {bulkFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <Icon name="document" size="lg" className="text-green-500" />
                        <div className="text-left">
                          <p className="font-medium text-slate-900 dark:text-white">{bulkFile.name}</p>
                          <p className="text-xs text-slate-500">{(bulkFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button
                          onClick={() => setBulkFile(null)}
                          className="p-1 text-slate-400 hover:text-red-500"
                        >
                          <Icon name="x-mark" size="sm" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full">
                            <Icon name="upload" size="lg" className="text-slate-400" />
                          </div>
                          <div>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              Arrastra tu archivo aquí o{" "}
                            </span>
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                              selecciona un archivo
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">CSV, XLS, XLSX (máx. 5MB)</p>
                        </div>
                        <input
                          type="file"
                          accept=".csv,.xls,.xlsx"
                          onChange={handleBulkFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Formato del archivo:
                  </p>
                  <code className="text-xs text-slate-500 dark:text-slate-400">
                    nombre, ciudad, estado, contacto, email, telefono, categoria
                  </code>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowBulkUpload(false);
                      setBulkFile(null);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleBulkUpload}
                    disabled={!bulkFile}
                  >
                    Importar proveedores
                  </Button>
                </div>
              </div>
            )}

            {/* New product form */}
            {showNewProductForm && (
              <div className="mb-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <Title level={3} className="text-slate-900 dark:text-white mb-2">
                  Agregar Producto a Proveedor
                </Title>
                <Text variant="muted" className="mb-4">
                  Registra un nuevo producto con sus condiciones de compra
                </Text>

                <form onSubmit={handleNewProductSubmit} className="space-y-6">
                  {/* Proveedor selector */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Proveedor *
                    </label>
                    <select
                      value={productSupplierId}
                      onChange={(e) => setProductSupplierId(e.target.value)}
                      className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      required
                    >
                      <option value="">Selecciona un proveedor</option>
                      {proveedores.filter(p => p.activo).map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} - {p.ciudad}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Product info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Nombre del producto *
                      </label>
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Ej: Papel Bond Carta 75g"
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Descripción
                      </label>
                      <input
                        type="text"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Ej: Resma de 500 hojas, certificación FSC"
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Precio unitario *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="95.00"
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Unidad *
                      </label>
                      <input
                        type="text"
                        value={productUnit}
                        onChange={(e) => setProductUnit(e.target.value)}
                        placeholder="Ej: resma, pieza, caja"
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Stock disponible *
                      </label>
                      <input
                        type="number"
                        value={productStock}
                        onChange={(e) => setProductStock(e.target.value)}
                        placeholder="4200"
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Pedido mínimo
                      </label>
                      <input
                        type="number"
                        value={productMinOrder}
                        onChange={(e) => setProductMinOrder(e.target.value)}
                        placeholder="5"
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Delivery info */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Tiempo de envío (días hábiles)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={productDeliveryMin}
                        onChange={(e) => setProductDeliveryMin(e.target.value)}
                        placeholder="1"
                        className="w-24 px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-center"
                      />
                      <span className="text-slate-400">a</span>
                      <input
                        type="number"
                        value={productDeliveryMax}
                        onChange={(e) => setProductDeliveryMax(e.target.value)}
                        placeholder="2"
                        className="w-24 px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-center"
                      />
                      <span className="text-sm text-slate-500">días</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Costo de envío
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={productShippingCost}
                      onChange={(e) => setProductShippingCost(e.target.value)}
                      placeholder="0 para envío gratis"
                      className="block w-full md:w-48 px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                    />
                  </div>

                  {/* Conditions and payment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Condiciones
                      </label>
                      <input
                        type="text"
                        value={productConditions}
                        onChange={(e) => setProductConditions(e.target.value)}
                        placeholder="Ej: Mínimo 5 resmas, Envío gratis +$1000"
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      />
                      <p className="mt-1 text-xs text-slate-400">Separa múltiples con coma</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Formas de pago
                      </label>
                      <input
                        type="text"
                        value={productPaymentTerms}
                        onChange={(e) => setProductPaymentTerms(e.target.value)}
                        placeholder="Ej: Crédito 30 días, Transferencia, Tarjeta"
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      />
                      <p className="mt-1 text-xs text-slate-400">Separa múltiples con coma</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowNewProductForm(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                      Agregar Producto
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* New supplier form */}
            {showNewSupplierForm && (
              <div className="mb-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
                <Title level={3} className="text-slate-900 dark:text-white mb-4">
                  {t("newSupplierModal.title")}
                </Title>

                <form onSubmit={handleNewSupplierSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {t("newSupplierModal.name")}
                      </label>
                      <input
                        type="text"
                        value={newSupplierName}
                        onChange={(e) => setNewSupplierName(e.target.value)}
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {t("newSupplierModal.city")}
                      </label>
                      <input
                        type="text"
                        value={newSupplierCity}
                        onChange={(e) => setNewSupplierCity(e.target.value)}
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {t("newSupplierModal.contact")}
                      </label>
                      <input
                        type="text"
                        value={newSupplierContact}
                        onChange={(e) => setNewSupplierContact(e.target.value)}
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {t("newSupplierModal.email")}
                      </label>
                      <input
                        type="email"
                        value={newSupplierEmail}
                        onChange={(e) => setNewSupplierEmail(e.target.value)}
                        className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowNewSupplierForm(false)}
                    >
                      {t("newSupplierModal.cancel")}
                    </Button>
                    <Button type="submit" variant="primary">
                      {t("newSupplierModal.submit")}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Suppliers grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proveedores.filter(p => p.activo).map((proveedor) => (
                <div
                  key={proveedor.id}
                  onClick={() => handleSupplierClick(proveedor)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="building" size="lg" className="text-slate-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 truncate">
                        {proveedor.nombre}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        {proveedor.ciudad}, {proveedor.estado}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                          {proveedor.categoria}
                        </span>
                        <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                          Activo
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Icon name="employee" size="sm" />
                      <span>{proveedor.contacto}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <Icon name="document" size="sm" />
                      <span>{proveedor.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Supplier Detail/Edit Modal */}
      {showSupplierModal && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Icon name="building" size="lg" className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isEditingSupplier ? "Editar Proveedor" : "Detalle del Proveedor"}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {selectedSupplier.codigo}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseSupplierModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Icon name="x-mark" size="md" className="text-slate-500" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Supplier Info Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Información del Proveedor
                  </h3>
                  {!isEditingSupplier ? (
                    <Button variant="secondary" size="sm" onClick={handleStartEditSupplier}>
                      <Icon name="pencil" size="sm" className="mr-1" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={handleCancelEditSupplier}>
                        Cancelar
                      </Button>
                      <Button variant="primary" size="sm" onClick={handleSaveSupplier}>
                        Guardar
                      </Button>
                    </div>
                  )}
                </div>

                {!isEditingSupplier ? (
                  /* View Mode */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Nombre</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedSupplier.nombre}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">RFC</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedSupplier.rfc}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Contacto</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedSupplier.contacto}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Email</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedSupplier.email}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Teléfono</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedSupplier.telefono}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Categoría</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedSupplier.categoria}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 md:col-span-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Dirección</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {selectedSupplier.direccion}, {selectedSupplier.ciudad}, {selectedSupplier.estado}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Edit Mode */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Nombre</label>
                      <input
                        type="text"
                        value={editSupplierName}
                        onChange={(e) => setEditSupplierName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">RFC</label>
                      <input
                        type="text"
                        value={editSupplierRfc}
                        onChange={(e) => setEditSupplierRfc(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Contacto</label>
                      <input
                        type="text"
                        value={editSupplierContact}
                        onChange={(e) => setEditSupplierContact(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Email</label>
                      <input
                        type="email"
                        value={editSupplierEmail}
                        onChange={(e) => setEditSupplierEmail(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Teléfono</label>
                      <input
                        type="text"
                        value={editSupplierPhone}
                        onChange={(e) => setEditSupplierPhone(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Categoría</label>
                      <input
                        type="text"
                        value={editSupplierCategory}
                        onChange={(e) => setEditSupplierCategory(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Dirección</label>
                      <input
                        type="text"
                        value={editSupplierAddress}
                        onChange={(e) => setEditSupplierAddress(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Ciudad</label>
                        <input
                          type="text"
                          value={editSupplierCity}
                          onChange={(e) => setEditSupplierCity(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Estado</label>
                        <input
                          type="text"
                          value={editSupplierState}
                          onChange={(e) => setEditSupplierState(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Products Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Productos ({supplierProducts.length})
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowBulkProductUpload(!showBulkProductUpload)}
                    >
                      <Icon name="upload" size="sm" className="mr-1" />
                      Carga Masiva
                    </Button>
                    <Button variant="primary" size="sm">
                      <Icon name="plus" size="sm" className="mr-1" />
                      Agregar
                    </Button>
                  </div>
                </div>

                {/* Bulk Product Upload Section */}
                {showBulkProductUpload && (
                  <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-3">
                      Carga Masiva de Productos
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                      Sube un archivo CSV o Excel con los productos. El archivo debe contener las columnas:
                      código, nombre, descripción, categoría, unidad, precio, stock, stock mínimo.
                    </p>
                    <div className="flex items-center gap-3">
                      <FileUpload
                        accept=".csv,.xlsx,.xls"
                        onFileSelect={handleBulkProductFileSelect}
                        preview={bulkProductFile?.name || undefined}
                        maxSize={5 * 1024 * 1024}
                      />
                      {bulkProductFile && (
                        <Button variant="primary" size="sm" onClick={handleBulkProductUpload}>
                          Procesar Archivo
                        </Button>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        <Icon name="document" size="sm" />
                        Descargar plantilla CSV
                      </a>
                      <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        <Icon name="document" size="sm" />
                        Descargar plantilla Excel
                      </a>
                    </div>
                  </div>
                )}

                {supplierProducts.length > 0 ? (
                  <div className="space-y-3">
                    {supplierProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border border-transparent hover:border-blue-300 dark:hover:border-blue-600"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                {product.codigo}
                              </span>
                              <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                                {product.categoria}
                              </span>
                            </div>
                            <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-1">
                              {product.nombre}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                              {product.descripcion}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-slate-900 dark:text-white">
                              ${product.precioUnitario.toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              por {product.unidad}
                            </p>
                            <div className="mt-2 flex items-center justify-end gap-2">
                              <span className={`px-2 py-0.5 text-xs rounded ${
                                product.stock > product.stockMinimo
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                              }`}>
                                Stock: {product.stock}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <Icon name="box" size="xl" className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                    <p className="text-slate-500 dark:text-slate-400">
                      Este proveedor no tiene productos registrados
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
              <Button variant="secondary" onClick={handleCloseSupplierModal}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail/Edit Modal */}
      {showProductModal && selectedProductEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Icon name="box" size="md" className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {isEditingProduct ? "Editar Producto" : "Detalle del Producto"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedProductEdit.codigo}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseProductModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Icon name="x-mark" size="md" className="text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center justify-end mb-4">
                {!isEditingProduct ? (
                  <Button variant="secondary" size="sm" onClick={handleStartEditProduct}>
                    <Icon name="pencil" size="sm" className="mr-1" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleCancelEditProduct}>
                      Cancelar
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleSaveProduct}>
                      Guardar
                    </Button>
                  </div>
                )}
              </div>

              {!isEditingProduct ? (
                /* View Mode */
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Nombre</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedProductEdit.nombre}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Descripción</p>
                    <p className="text-sm text-slate-900 dark:text-white">{selectedProductEdit.descripcion}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Categoría</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedProductEdit.categoria}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Unidad</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedProductEdit.unidad}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Precio Unitario</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">${selectedProductEdit.precioUnitario.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Stock Actual</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedProductEdit.stock} unidades</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 col-span-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Stock Mínimo</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedProductEdit.stockMinimo} unidades</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={editProductName}
                      onChange={(e) => setEditProductName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Descripción</label>
                    <textarea
                      value={editProductDescription}
                      onChange={(e) => setEditProductDescription(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Categoría</label>
                      <input
                        type="text"
                        value={editProductCategory}
                        onChange={(e) => setEditProductCategory(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Unidad</label>
                      <input
                        type="text"
                        value={editProductUnit}
                        onChange={(e) => setEditProductUnit(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Precio Unitario ($)</label>
                      <input
                        type="number"
                        value={editProductPrice}
                        onChange={(e) => setEditProductPrice(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Stock Actual</label>
                      <input
                        type="number"
                        value={editProductStock}
                        onChange={(e) => setEditProductStock(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Stock Mínimo</label>
                      <input
                        type="number"
                        value={editProductMinStock}
                        onChange={(e) => setEditProductMinStock(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
              <Button variant="secondary" onClick={handleCloseProductModal}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
