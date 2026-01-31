"use client";

import { Icon } from "@/components/atoms";

interface OrderData {
  product: {
    name: string;
    supplierName: string;
    unitPrice: number;
    unit: string;
    deliveryDays: { min: number; max: number };
  };
  quantity: number;
  deliveryAddress: string;
  contactName: string;
  subtotal: number;
  shipping: number;
  total: number;
}

interface OrderSummaryProps {
  orderData: OrderData;
}

export function OrderSummary({ orderData }: OrderSummaryProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sticky top-6">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
        Resumen del pedido
      </h3>

      <div className="space-y-4">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
          <p className="font-medium text-slate-900 dark:text-white text-sm">
            {orderData.product.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {orderData.product.supplierName}
          </p>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              {orderData.quantity} {orderData.product.unit}
            </span>
            <span className="text-slate-900 dark:text-white">
              ${orderData.product.unitPrice} c/u
            </span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
            <span className="text-slate-900 dark:text-white">
              ${orderData.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Envío</span>
            <span className="text-slate-900 dark:text-white">
              {orderData.shipping === 0 ? (
                <span className="text-green-600 dark:text-green-400">
                  Gratis
                </span>
              ) : (
                `$${orderData.shipping}`
              )}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-900 dark:text-white">
              Total
            </span>
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              ${orderData.total.toLocaleString()} USD
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-start gap-2">
            <Icon name="location" size="sm" className="mt-0.5 flex-shrink-0" />
            <span>{orderData.deliveryAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="employee" size="sm" className="flex-shrink-0" />
            <span>{orderData.contactName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="truck" size="sm" className="flex-shrink-0" />
            <span>
              {orderData.product.deliveryDays.min}-
              {orderData.product.deliveryDays.max} días hábiles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
