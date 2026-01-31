"use client";

import { Title, Text, Button, Icon } from "@/components/atoms";
import { useI18n } from "@/i18n";
import { type Proveedor } from "@/api";
import { NewSupplierForm } from "./NewSupplierForm";
import { NewProductForm } from "./NewProductForm";
import { BulkUploadForm } from "./BulkUploadForm";
import { SupplierModal } from "./SupplierModal";

interface SuppliersTabProps {
  // Data from hooks
  proveedores: Proveedor[];
  isLoading: boolean;
  // Forms visibility
  showNewSupplierForm: boolean;
  setShowNewSupplierForm: (show: boolean) => void;
  showNewProductForm: boolean;
  setShowNewProductForm: (show: boolean) => void;
  showBulkUpload: boolean;
  setShowBulkUpload: (show: boolean) => void;
  // New supplier form
  newSupplierName: string;
  setNewSupplierName: (name: string) => void;
  newSupplierCity: string;
  setNewSupplierCity: (city: string) => void;
  newSupplierContact: string;
  setNewSupplierContact: (contact: string) => void;
  newSupplierEmail: string;
  setNewSupplierEmail: (email: string) => void;
  onNewSupplierSubmit: (e: React.FormEvent) => void;
  // New product form
  productSupplierId: string;
  setProductSupplierId: (id: string) => void;
  productName: string;
  setProductName: (name: string) => void;
  productDescription: string;
  setProductDescription: (desc: string) => void;
  productPrice: string;
  setProductPrice: (price: string) => void;
  productUnit: string;
  setProductUnit: (unit: string) => void;
  productStock: string;
  setProductStock: (stock: string) => void;
  productDeliveryMin: string;
  setProductDeliveryMin: (min: string) => void;
  productDeliveryMax: string;
  setProductDeliveryMax: (max: string) => void;
  productShippingCost: string;
  setProductShippingCost: (cost: string) => void;
  productMinOrder: string;
  setProductMinOrder: (min: string) => void;
  productConditions: string;
  setProductConditions: (conditions: string) => void;
  productPaymentTerms: string;
  setProductPaymentTerms: (terms: string) => void;
  onNewProductSubmit: (e: React.FormEvent) => void;
  // Bulk upload
  bulkFile: File | null;
  setBulkFile: (file: File | null) => void;
  onBulkUpload: () => void;
  onBulkFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Supplier modal
  showSupplierModal: boolean;
  selectedSupplier: Proveedor | null;
  onSupplierClick: (supplier: Proveedor) => void;
  onCloseSupplierModal: () => void;
  isEditingSupplier: boolean;
  onStartEditSupplier: () => void;
  onSaveSupplier: () => void;
  onCancelEditSupplier: () => void;
  editSupplierName: string;
  setEditSupplierName: (name: string) => void;
  editSupplierRfc: string;
  setEditSupplierRfc: (rfc: string) => void;
  editSupplierContact: string;
  setEditSupplierContact: (contact: string) => void;
  editSupplierEmail: string;
  setEditSupplierEmail: (email: string) => void;
  editSupplierPhone: string;
  setEditSupplierPhone: (phone: string) => void;
  editSupplierAddress: string;
  setEditSupplierAddress: (address: string) => void;
  editSupplierCity: string;
  setEditSupplierCity: (city: string) => void;
  editSupplierState: string;
  setEditSupplierState: (state: string) => void;
  editSupplierCategory: string;
  setEditSupplierCategory: (category: string) => void;
}

export function SuppliersTab({
  proveedores,
  isLoading,
  showNewSupplierForm,
  setShowNewSupplierForm,
  showNewProductForm,
  setShowNewProductForm,
  showBulkUpload,
  setShowBulkUpload,
  newSupplierName,
  setNewSupplierName,
  newSupplierCity,
  setNewSupplierCity,
  newSupplierContact,
  setNewSupplierContact,
  newSupplierEmail,
  setNewSupplierEmail,
  onNewSupplierSubmit,
  productSupplierId,
  setProductSupplierId,
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  productPrice,
  setProductPrice,
  productUnit,
  setProductUnit,
  productStock,
  setProductStock,
  productDeliveryMin,
  setProductDeliveryMin,
  productDeliveryMax,
  setProductDeliveryMax,
  productShippingCost,
  setProductShippingCost,
  productMinOrder,
  setProductMinOrder,
  productConditions,
  setProductConditions,
  productPaymentTerms,
  setProductPaymentTerms,
  onNewProductSubmit,
  bulkFile,
  setBulkFile,
  onBulkUpload,
  onBulkFileChange,
  showSupplierModal,
  selectedSupplier,
  onSupplierClick,
  onCloseSupplierModal,
  isEditingSupplier,
  onStartEditSupplier,
  onSaveSupplier,
  onCancelEditSupplier,
  editSupplierName,
  setEditSupplierName,
  editSupplierRfc,
  setEditSupplierRfc,
  editSupplierContact,
  setEditSupplierContact,
  editSupplierEmail,
  setEditSupplierEmail,
  editSupplierPhone,
  setEditSupplierPhone,
  editSupplierAddress,
  setEditSupplierAddress,
  editSupplierCity,
  setEditSupplierCity,
  editSupplierState,
  setEditSupplierState,
  editSupplierCategory,
  setEditSupplierCategory,
}: SuppliersTabProps) {
  const { t } = useI18n();

  const closeAllForms = () => {
    setShowNewSupplierForm(false);
    setShowBulkUpload(false);
    setShowNewProductForm(false);
  };

  return (
    <div className="animate-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title level={2} className="text-slate-900 dark:text-slate-100 mb-1">
            {t("compras.tabs.suppliers")}
          </Title>
          <Text variant="muted">Gestiona tus proveedores registrados</Text>
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

      {/* Bulk upload form */}
      {showBulkUpload && (
        <BulkUploadForm
          bulkFile={bulkFile}
          setBulkFile={setBulkFile}
          onBulkUpload={onBulkUpload}
          onBulkFileChange={onBulkFileChange}
          onClose={() => {
            setShowBulkUpload(false);
            setBulkFile(null);
          }}
        />
      )}

      {/* New product form */}
      {showNewProductForm && (
        <NewProductForm
          proveedores={proveedores}
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
          onSubmit={onNewProductSubmit}
          onClose={() => setShowNewProductForm(false)}
        />
      )}

      {/* New supplier form */}
      {showNewSupplierForm && (
        <NewSupplierForm
          name={newSupplierName}
          setName={setNewSupplierName}
          city={newSupplierCity}
          setCity={setNewSupplierCity}
          contact={newSupplierContact}
          setContact={setNewSupplierContact}
          email={newSupplierEmail}
          setEmail={setNewSupplierEmail}
          onSubmit={onNewSupplierSubmit}
          onClose={() => setShowNewSupplierForm(false)}
        />
      )}

      {/* Suppliers grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-slate-500">Cargando proveedores...</span>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {proveedores
          .filter((p) => p.activo)
          .map((proveedor) => (
            <div
              key={proveedor.id}
              onClick={() => onSupplierClick(proveedor)}
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
      )}

      {/* Supplier detail/edit modal */}
      {showSupplierModal && selectedSupplier && (
        <SupplierModal
          supplier={selectedSupplier}
          onClose={onCloseSupplierModal}
          isEditing={isEditingSupplier}
          onStartEdit={onStartEditSupplier}
          onSave={onSaveSupplier}
          onCancelEdit={onCancelEditSupplier}
          editName={editSupplierName}
          setEditName={setEditSupplierName}
          editRfc={editSupplierRfc}
          setEditRfc={setEditSupplierRfc}
          editContact={editSupplierContact}
          setEditContact={setEditSupplierContact}
          editEmail={editSupplierEmail}
          setEditEmail={setEditSupplierEmail}
          editPhone={editSupplierPhone}
          setEditPhone={setEditSupplierPhone}
          editAddress={editSupplierAddress}
          setEditAddress={setEditSupplierAddress}
          editCity={editSupplierCity}
          setEditCity={setEditSupplierCity}
          editState={editSupplierState}
          setEditState={setEditSupplierState}
          editCategory={editSupplierCategory}
          setEditCategory={setEditSupplierCategory}
        />
      )}
    </div>
  );
}
