"use client";

import { Button, Icon } from "@/components/atoms";
import { type Proveedor } from "@/api";
import { productos } from "@/test/compras.data";

interface SupplierModalProps {
  supplier: Proveedor;
  onClose: () => void;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: () => void;
  onCancelEdit: () => void;
  editName: string;
  setEditName: (name: string) => void;
  editRfc: string;
  setEditRfc: (rfc: string) => void;
  editContact: string;
  setEditContact: (contact: string) => void;
  editEmail: string;
  setEditEmail: (email: string) => void;
  editPhone: string;
  setEditPhone: (phone: string) => void;
  editAddress: string;
  setEditAddress: (address: string) => void;
  editCity: string;
  setEditCity: (city: string) => void;
  editState: string;
  setEditState: (state: string) => void;
  editCategory: string;
  setEditCategory: (category: string) => void;
}

export function SupplierModal({
  supplier,
  onClose,
  isEditing,
  onStartEdit,
  onSave,
  onCancelEdit,
  editName,
  setEditName,
  editRfc,
  setEditRfc,
  editContact,
  setEditContact,
  editEmail,
  setEditEmail,
  editPhone,
  setEditPhone,
  editAddress,
  setEditAddress,
  editCity,
  setEditCity,
  editState,
  setEditState,
  editCategory,
  setEditCategory,
}: SupplierModalProps) {
  const supplierProducts = productos.filter((p) => p.proveedorId === supplier.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Icon
                name="building"
                size="lg"
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isEditing ? "Editar Proveedor" : "Detalle del Proveedor"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {supplier.codigo}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
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
              {!isEditing ? (
                <Button variant="secondary" size="sm" onClick={onStartEdit}>
                  <Icon name="pencil" size="sm" className="mr-1" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={onCancelEdit}>
                    Cancelar
                  </Button>
                  <Button variant="primary" size="sm" onClick={onSave}>
                    Guardar
                  </Button>
                </div>
              )}
            </div>

            {!isEditing ? (
              /* View Mode */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Nombre
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {supplier.nombre}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    RFC
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {supplier.rfc}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Contacto
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {supplier.contacto}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Email
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {supplier.email}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Teléfono
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {supplier.telefono}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Categoría
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {supplier.categoria}
                  </p>
                </div>
                <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Dirección
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {supplier.direccion}, {supplier.ciudad}, {supplier.estado}
                  </p>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                    RFC
                  </label>
                  <input
                    type="text"
                    value={editRfc}
                    onChange={(e) => setEditRfc(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Contacto
                  </label>
                  <input
                    type="text"
                    value={editContact}
                    onChange={(e) => setEditContact(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Categoría
                  </label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={editState}
                    onChange={(e) => setEditState(e.target.value)}
                    className="block w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Productos ({supplierProducts.length})
            </h3>
            {supplierProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {supplierProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">
                          {product.nombre}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {product.descripcion}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        ${product.precioUnitario}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>Stock: {product.stock.toLocaleString()}</span>
                      <span>Unidad: {product.unidad}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <Icon
                  name="box"
                  size="xl"
                  className="text-slate-300 dark:text-slate-600 mx-auto mb-2"
                />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No hay productos registrados para este proveedor
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
