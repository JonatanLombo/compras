"use client";

import { Title, Text, Icon } from "@/components/atoms";
import { useI18n } from "@/i18n";

interface UserOrder {
  id: string;
  numero: string;
  fecha: string;
  proveedorId: string;
  proveedorNombre: string;
  estado: "borrador" | "pendiente" | "aprobada" | "recibida" | "cancelada";
  subtotal: number;
  iva: number;
  total: number;
  items: number;
  producto?: string;
  cantidad?: number;
  transactionId?: string;
  isUserOrder?: boolean;
}

interface OrdersTabProps {
  orders: UserOrder[];
}

const statusLabels: Record<string, string> = {
  borrador: "Borrador",
  pendiente: "Pendiente",
  aprobada: "Aprobada",
  recibida: "Recibida",
  cancelada: "Cancelada",
};

export function OrdersTab({ orders }: OrdersTabProps) {
  const { t, locale } = useI18n();

  return (
    <div className="animate-in">
      <div className="mb-6">
        <Title level={2} className="text-slate-900 dark:text-slate-100 mb-1">
          {t("compras.tabs.orders")}
        </Title>
        <Text variant="muted">Historial de órdenes de compra creadas</Text>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="document" size="xl" className="text-slate-400" />
          </div>
          <Title level={3} className="text-slate-900 dark:text-white mb-2">
            No hay órdenes
          </Title>
          <Text variant="muted">Las órdenes que crees aparecerán aquí</Text>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Proveedor / Producto
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                  Fecha
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {orders.map((orden) => {
                const isUserOrder =
                  "isUserOrder" in orden && Boolean(orden.isUserOrder);
                return (
                  <tr
                    key={orden.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                      isUserOrder ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {orden.numero}
                        </span>
                        {isUserOrder && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                            NUEVA
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
                        {orden.proveedorNombre}
                      </div>
                      {"producto" in orden && Boolean(orden.producto) ? (
                        <div className="text-xs text-slate-400 dark:text-slate-500 truncate">
                          {String(orden.producto)}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 hidden sm:table-cell">
                      {new Date(orden.fecha).toLocaleDateString(
                        locale === "es" ? "es-MX" : "en-US"
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100 text-right font-medium">
                      ${orden.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                          orden.estado === "recibida"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : orden.estado === "aprobada"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : orden.estado === "pendiente"
                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                : orden.estado === "cancelada"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {statusLabels[orden.estado] || orden.estado}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
