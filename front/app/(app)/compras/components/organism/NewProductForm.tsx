"use client";

import { Title, Text, Button } from "@/components/atoms";
import { type Proveedor } from "@/api";

interface NewProductFormProps {
  proveedores: Proveedor[];
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
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function NewProductForm({
  proveedores,
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
  onSubmit,
  onClose,
}: NewProductFormProps) {
  return (
    <div className="mb-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
      <Title level={3} className="text-slate-900 dark:text-white mb-2">
        Agregar Producto a Proveedor
      </Title>
      <Text variant="muted" className="mb-4">
        Registra un nuevo producto con sus condiciones de compra
      </Text>

      <form onSubmit={onSubmit} className="space-y-6">
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
            {proveedores
              .filter((p) => p.activo)
              .map((p) => (
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
            <p className="mt-1 text-xs text-slate-400">
              Separa múltiples con coma
            </p>
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
            <p className="mt-1 text-xs text-slate-400">
              Separa múltiples con coma
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Agregar Producto
          </Button>
        </div>
      </form>
    </div>
  );
}
