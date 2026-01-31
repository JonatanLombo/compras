"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutHeader } from "./CheckoutHeader";
import { BankSelectionStep } from "./BankSelectionStep";
import { ProcessingStep } from "./ProcessingStep";
import { SuccessStep } from "./SuccessStep";
import { ErrorStep } from "./ErrorStep";
import { OrderSummary } from "./OrderSummary";

interface OrderData {
  product: {
    id: string;
    name: string;
    description: string;
    unitPrice: number;
    unit: string;
    supplierName: string;
    deliveryDays: { min: number; max: number };
  };
  quantity: number;
  deliveryAddress: string;
  contactName: string;
  contactPhone: string;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  orderNumber: string;
  createdAt: string;
}

const banks = [
  { id: "bancolombia", name: "Bancolombia" },
  { id: "davivienda", name: "Davivienda" },
  { id: "bbva", name: "BBVA Colombia" },
  { id: "banco-bogota", name: "Banco de Bogotá" },
  { id: "banco-occidente", name: "Banco de Occidente" },
  { id: "banco-popular", name: "Banco Popular" },
  { id: "banco-avvillas", name: "Banco AV Villas" },
  { id: "scotiabank", name: "Scotiabank Colpatria" },
  { id: "itau", name: "Banco Itaú" },
  { id: "gnb-sudameris", name: "GNB Sudameris" },
  { id: "banco-agrario", name: "Banco Agrario" },
  { id: "bancoomeva", name: "Bancoomeva" },
  { id: "nequi", name: "Nequi" },
  { id: "daviplata", name: "Daviplata" },
];

type PaymentStep = "select-bank" | "processing" | "success" | "error";

export function CheckoutOrganism() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [selectedBank, setSelectedBank] = useState("");
  const [personType, setPersonType] = useState<"natural" | "juridica">("natural");
  const [step, setStep] = useState<PaymentStep>("select-bank");
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nexuspro_order");
    if (stored) {
      setOrderData(JSON.parse(stored));
    } else {
      router.push("/compras");
    }
  }, [router]);

  const handlePayment = () => {
    if (!selectedBank || !acceptTerms) return;

    setStep("processing");

    setTimeout(() => {
      const success = Math.random() > 0.1;

      if (success) {
        const transactionId = `PSE-${Date.now()}`;
        const paidAt = new Date().toISOString();

        if (orderData) {
          const transaction = {
            ...orderData,
            paymentStatus: "completed",
            bank: banks.find((b) => b.id === selectedBank)?.name,
            personType,
            transactionId,
            paidAt,
          };
          localStorage.setItem(
            "nexuspro_last_transaction",
            JSON.stringify(transaction)
          );

          const newOrder = {
            id: `oc-user-${Date.now()}`,
            numero: orderData.orderNumber,
            fecha: new Date().toISOString().split("T")[0],
            proveedorId: orderData.product.id,
            proveedorNombre: orderData.product.supplierName,
            estado: "pendiente" as const,
            subtotal: orderData.subtotal,
            iva: orderData.subtotal * 0.19,
            total: orderData.total,
            items: 1,
            producto: orderData.product.name,
            cantidad: orderData.quantity,
            transactionId,
            isUserOrder: true,
          };

          const existingOrders = JSON.parse(
            localStorage.getItem("nexuspro_user_orders") || "[]"
          );
          existingOrders.unshift(newOrder);
          localStorage.setItem(
            "nexuspro_user_orders",
            JSON.stringify(existingOrders)
          );
        }

        setStep("success");
      } else {
        setStep("error");
      }
    }, 3000);
  };

  const handleRetry = () => {
    setStep("select-bank");
    setSelectedBank("");
    setAcceptTerms(false);
  };

  const handleGoToOrders = () => {
    localStorage.removeItem("nexuspro_order");
    router.push("/compras");
  };

  const selectedBankName = banks.find((b) => b.id === selectedBank)?.name || "";

  if (!orderData) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <CheckoutHeader />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel principal */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              {step === "select-bank" && (
                <BankSelectionStep
                  banks={banks}
                  selectedBank={selectedBank}
                  setSelectedBank={setSelectedBank}
                  personType={personType}
                  setPersonType={setPersonType}
                  acceptTerms={acceptTerms}
                  setAcceptTerms={setAcceptTerms}
                  total={orderData.total}
                  onPayment={handlePayment}
                />
              )}

              {step === "processing" && (
                <ProcessingStep bankName={selectedBankName} />
              )}

              {step === "success" && (
                <SuccessStep
                  orderNumber={orderData.orderNumber}
                  bankName={selectedBankName}
                  total={orderData.total}
                  onGoToOrders={handleGoToOrders}
                />
              )}

              {step === "error" && (
                <ErrorStep
                  onRetry={handleRetry}
                  onGoToOrders={handleGoToOrders}
                />
              )}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <OrderSummary orderData={orderData} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>Transacción procesada por PSE - ACH Colombia</p>
          <p className="mt-1">Este es un ambiente de demostración</p>
        </div>
      </main>
    </div>
  );
}
