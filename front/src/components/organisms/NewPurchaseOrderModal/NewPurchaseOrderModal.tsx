"use client";

import { useState, useMemo } from "react";
import { Icon, Title, Text, Button } from "@/components/atoms";
import { useI18n } from "@/i18n";
import { proveedores, productos, type Proveedor, type Producto } from "@/test/compras.data";

interface OrderItem {
  producto: Producto;
  cantidad: number;
}

interface NewPurchaseOrderModalProps {
  onClose: () => void;
  onSubmit: (data: {
    proveedorId: string;
    items: { productoId: string; cantidad: number; precioUnitario: number }[];
    subtotal: number;
    iva: number;
    total: number;
  }) => void;
}

export function NewPurchaseOrderModal({ onClose, onSubmit }: NewPurchaseOrderModalProps) {
  const { t } = useI18n();
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<string>("");
  const [cantidad, setCantidad] = useState<number>(1);

  const activeProveedores = proveedores.filter((p) => p.activo);

  const availableProducts = useMemo(() => {
    if (!selectedProveedor) return productos;
    return productos.filter((p) => p.proveedorId === selectedProveedor.id);
  }, [selectedProveedor]);

  const totals = useMemo(() => {
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.producto.precioUnitario * item.cantidad,
      0
    );
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    return { subtotal, iva, total };
  }, [orderItems]);

  const handleAddItem = () => {
    const producto = productos.find((p) => p.id === selectedProducto);
    if (!producto || cantidad < 1) return;

    const existingIndex = orderItems.findIndex((item) => item.producto.id === producto.id);
    if (existingIndex >= 0) {
      const newItems = [...orderItems];
      newItems[existingIndex].cantidad += cantidad;
      setOrderItems(newItems);
    } else {
      setOrderItems([...orderItems, { producto, cantidad }]);
    }

    setSelectedProducto("");
    setCantidad(1);
  };

  const handleRemoveItem = (productoId: string) => {
    setOrderItems(orderItems.filter((item) => item.producto.id !== productoId));
  };

  const handleUpdateCantidad = (productoId: string, newCantidad: number) => {
    if (newCantidad < 1) return;
    setOrderItems(
      orderItems.map((item) =>
        item.producto.id === productoId ? { ...item, cantidad: newCantidad } : item
      )
    );
  };

  const handleSubmit = () => {
    if (!selectedProveedor || orderItems.length === 0) return;

    onSubmit({
      proveedorId: selectedProveedor.id,
      items: orderItems.map((item) => ({
        productoId: item.producto.id,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precioUnitario,
      })),
      subtotal: totals.subtotal,
      iva: totals.iva,
      total: totals.total,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-xl shadow-2xl animate-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Icon name="plus" size="lg" />
            </div>
            <div>
              <Title level={3} className="text-slate-900 dark:text-slate-100">
                {t("purchaseOrder.new")}
              </Title>
              <Text variant="small">{t("purchaseOrder.newDesc")}</Text>
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

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* Selector de proveedor */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t("purchaseOrder.supplier")}
            </label>
            <select
              value={selectedProveedor?.id || ""}
              onChange={(e) => {
                const prov = proveedores.find((p) => p.id === e.target.value);
                setSelectedProveedor(prov || null);
                setOrderItems([]);
              }}
              className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-900 dark:text-white"
            >
              <option value="">{t("purchaseOrder.selectSupplier")}</option>
              {activeProveedores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} - {p.ciudad}
                </option>
              ))}
            </select>
          </div>

          {/* Agregar productos */}
          {selectedProveedor && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t("purchaseOrder.addProduct")}
              </label>
              <div className="flex gap-3">
                <select
                  value={selectedProducto}
                  onChange={(e) => setSelectedProducto(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-900 dark:text-white"
                >
                  <option value="">{t("purchaseOrder.selectProduct")}</option>
                  {availableProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.codigo} - {p.nombre} (${p.precioUnitario.toLocaleString()}/{p.unidad})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                  className="w-24 px-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-900 dark:text-white text-center"
                  placeholder={t("purchaseOrder.qty")}
                />
                <Button
                  variant="secondary"
                  onClick={handleAddItem}
                  disabled={!selectedProducto}
                >
                  <Icon name="plus" size="sm" />
                </Button>
              </div>
            </div>
          )}

          {/* Tabla de items */}
          {orderItems.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t("purchaseOrder.items")} ({orderItems.length})
              </label>
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        {t("purchaseOrder.product")}
                      </th>
                      <th className="px-4 py-2.5 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        {t("purchaseOrder.qty")}
                      </th>
                      <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        {t("purchaseOrder.unitPrice")}
                      </th>
                      <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        {t("purchaseOrder.subtotal")}
                      </th>
                      <th className="px-4 py-2.5 w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {orderItems.map((item) => (
                      <tr key={item.producto.id}>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {item.producto.nombre}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {item.producto.codigo}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) =>
                              handleUpdateCantidad(item.producto.id, parseInt(e.target.value) || 1)
                            }
                            className="w-20 px-2 py-1 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-center text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 text-right">
                          ${item.producto.precioUnitario.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white text-right">
                          ${(item.producto.precioUnitario * item.cantidad).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleRemoveItem(item.producto.id)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Totales */}
          {orderItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t("purchaseOrder.subtotal")}</span>
                  <span className="text-slate-900 dark:text-white">${totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t("purchaseOrder.tax")} (16%)</span>
                  <span className="text-slate-900 dark:text-white">${totals.iva.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-900 dark:text-white">{t("purchaseOrder.total")}</span>
                  <span className="text-blue-600 dark:text-blue-400">${totals.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
          <Button variant="secondary" size="lg" onClick={onClose} className="flex-1">
            {t("purchaseOrder.cancel")}
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={!selectedProveedor || orderItems.length === 0}
            className="flex-1"
          >
            {t("purchaseOrder.create")}
          </Button>
        </div>
      </div>
    </div>
  );
}
