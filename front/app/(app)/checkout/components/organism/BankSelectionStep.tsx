"use client";

import { Button, Icon } from "@/components/atoms";

interface Bank {
  id: string;
  name: string;
}

interface BankSelectionStepProps {
  banks: Bank[];
  selectedBank: string;
  setSelectedBank: (bank: string) => void;
  personType: "natural" | "juridica";
  setPersonType: (type: "natural" | "juridica") => void;
  acceptTerms: boolean;
  setAcceptTerms: (accept: boolean) => void;
  total: number;
  onPayment: () => void;
}

export function BankSelectionStep({
  banks,
  selectedBank,
  setSelectedBank,
  personType,
  setPersonType,
  acceptTerms,
  setAcceptTerms,
  total,
  onPayment,
}: BankSelectionStepProps) {
  return (
    <>
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
          Selecciona tu banco
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Serás redirigido al portal de tu banco para completar el pago
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Tipo de persona */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tipo de persona
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="personType"
                checked={personType === "natural"}
                onChange={() => setPersonType("natural")}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Persona Natural
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="personType"
                checked={personType === "juridica"}
                onChange={() => setPersonType("juridica")}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Persona Jurídica
              </span>
            </label>
          </div>
        </div>

        {/* Selector de banco */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Banco
          </label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="block w-full px-4 py-3 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">Selecciona tu banco</option>
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        {/* Términos */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
          <span className="text-xs text-slate-600 dark:text-slate-400">
            Autorizo el débito de mi cuenta y acepto los términos y condiciones
            del servicio PSE. La transacción será procesada por ACH Colombia.
          </span>
        </label>

        {/* Botón de pago */}
        <Button
          variant="primary"
          size="lg"
          onClick={onPayment}
          disabled={!selectedBank || !acceptTerms}
          className="w-full"
        >
          Pagar ${total.toLocaleString()} USD
        </Button>

        {/* Info de seguridad */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Conexión segura SSL 256-bit</span>
        </div>
      </div>
    </>
  );
}
