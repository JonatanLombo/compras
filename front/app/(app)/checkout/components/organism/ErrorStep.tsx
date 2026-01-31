"use client";

import { Button, Icon } from "@/components/atoms";

interface ErrorStepProps {
  onRetry: () => void;
  onGoToOrders: () => void;
}

export function ErrorStep({ onRetry, onGoToOrders }: ErrorStepProps) {
  return (
    <div className="p-8 text-center">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon
          name="x-mark"
          size="xl"
          className="text-red-600 dark:text-red-400 w-10 h-10"
        />
      </div>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
        Pago no procesado
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        No pudimos completar tu transacción. Por favor intenta nuevamente.
      </p>

      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-6">
        <p className="text-sm text-red-800 dark:text-red-300">
          Posibles causas: fondos insuficientes, límite de transacción excedido,
          o problemas de conexión con el banco.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onGoToOrders} className="flex-1">
          Cancelar
        </Button>
        <Button variant="primary" onClick={onRetry} className="flex-1">
          Intentar de nuevo
        </Button>
      </div>
    </div>
  );
}
