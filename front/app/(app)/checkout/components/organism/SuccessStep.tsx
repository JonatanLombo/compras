"use client";

import { Button, Icon } from "@/components/atoms";

interface SuccessStepProps {
  orderNumber: string;
  bankName: string;
  total: number;
  onGoToOrders: () => void;
}

export function SuccessStep({
  orderNumber,
  bankName,
  total,
  onGoToOrders,
}: SuccessStepProps) {
  return (
    <div className="p-8 text-center">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon
          name="check-circle"
          size="xl"
          className="text-green-600 dark:text-green-400 w-10 h-10"
        />
      </div>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
        ¡Pago exitoso!
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Tu transacción ha sido procesada correctamente
      </p>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 text-left mb-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            ID Transacción
          </span>
          <span className="text-sm font-mono font-medium text-slate-900 dark:text-white">
            PSE-{Date.now()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Orden
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {orderNumber}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Banco
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {bankName}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Monto pagado
          </span>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">
            ${total.toLocaleString()} USD
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Fecha
          </span>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Recibirás un correo de confirmación con los detalles de tu pedido. El
          proveedor procesará tu orden en las próximas horas.
        </p>
      </div>

      <Button variant="primary" onClick={onGoToOrders} className="w-full">
        Volver a Compras
      </Button>
    </div>
  );
}
