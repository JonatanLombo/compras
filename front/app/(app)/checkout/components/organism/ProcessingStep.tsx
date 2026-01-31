"use client";

interface ProcessingStepProps {
  bankName: string;
}

export function ProcessingStep({ bankName }: ProcessingStepProps) {
  return (
    <div className="p-12 text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        Procesando tu pago
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-4">
        Conectando con {bankName}...
      </p>
      <p className="text-xs text-slate-400">
        Por favor no cierres esta ventana
      </p>
    </div>
  );
}
