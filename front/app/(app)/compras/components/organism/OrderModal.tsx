"use client";

import { Button, Icon } from "@/components/atoms";
import { useI18n } from "@/i18n";
import { type SupplierQuote } from "@/test/compras.data";

interface OrderModalProps {
  show: boolean;
  product: SupplierQuote;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  quantity: string;
  setQuantity: (qty: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (addr: string) => void;
  contactName: string;
  setContactName: (name: string) => void;
  contactPhone: string;
  setContactPhone: (phone: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  calculateTotal: () => { subtotal: number; shipping: number; total: number };
}

export function OrderModal({
  show,
  product,
  onClose,
  onSubmit,
  quantity,
  setQuantity,
  deliveryAddress,
  setDeliveryAddress,
  contactName,
  setContactName,
  contactPhone,
  setContactPhone,
  paymentMethod,
  setPaymentMethod,
  calculateTotal,
}: OrderModalProps) {
  const { t } = useI18n();

  if (!show) return null;

  const totals = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {t("order.createTitle")}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {product.supplierName}
            </p>
          </div>
          <button
            onClick={onClose}
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
                {product.productName}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {product.productDescription}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  ${product.unitPrice.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-slate-500">
                    /{product.unit}
                  </span>
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Icon name="truck" size="sm" />
                  {product.deliveryDays.min}-{product.deliveryDays.max} días
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order form */}
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {t("order.quantity")} ({product.unit}) *
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={product.minQuantity}
                max={product.availableStock}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="block w-32 px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
              <span className="text-xs text-slate-500">
                Mín: {product.minQuantity} | Stock:{" "}
                {product.availableStock.toLocaleString()}
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
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
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
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
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
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
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
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="block w-full px-4 py-2.5 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            >
              <option value="">{t("order.selectPayment")}</option>
              {product.paymentTerms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>

          {/* Order summary */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                {t("order.subtotal")}
              </span>
              <span className="text-slate-900 dark:text-white font-medium">
                ${totals.subtotal.toLocaleString()} USD
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                {t("order.shipping")}
              </span>
              <span className="text-slate-900 dark:text-white font-medium">
                {totals.shipping === 0 ? (
                  <span className="text-green-600 dark:text-green-400">
                    Gratis
                  </span>
                ) : (
                  `$${totals.shipping.toLocaleString()} USD`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="font-medium text-slate-900 dark:text-white">
                {t("order.total")}
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                ${totals.total.toLocaleString()} USD
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button type="button" variant="secondary" onClick={onClose}>
              {t("order.cancel")}
            </Button>
            <Button type="submit" variant="primary">
              {t("order.submit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
