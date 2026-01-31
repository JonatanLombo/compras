"use client";

import { Icon, Text, Badge } from "@/components/atoms";
import type { IconName } from "@/components/atoms/Icon/Icon";
import type { SearchResultType } from "@/test/compras.data";

interface SearchResultItemProps {
  type: SearchResultType;
  titulo: string;
  subtitulo: string;
  extra?: string;
  estado?: string;
  onClick: () => void;
}

const typeConfig: Record<SearchResultType, { icon: IconName; label: string }> = {
  proveedor: { icon: "supplier", label: "Proveedor" },
  producto: { icon: "product", label: "Producto" },
  orden: { icon: "order", label: "Orden de Compra" },
  recepcion: { icon: "reception", label: "Recepción" },
};

const estadoBadgeVariant: Record<string, "default" | "success" | "warning" | "info" | "new"> = {
  activo: "success",
  inactivo: "default",
  disponible: "success",
  "stock bajo": "warning",
  borrador: "default",
  pendiente: "warning",
  aprobada: "info",
  recibida: "success",
  cancelada: "default",
  parcial: "warning",
  completa: "success",
};

export function SearchResultItem({
  type,
  titulo,
  subtitulo,
  extra,
  estado,
  onClick,
}: SearchResultItemProps) {
  const config = typeConfig[type];
  const badgeVariant = estado ? estadoBadgeVariant[estado.toLowerCase()] || "default" : "default";

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all text-left"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
        <Icon name={config.icon} size="md" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {config.label}
          </span>
          {estado && (
            <Badge variant={badgeVariant} size="sm">
              {estado}
            </Badge>
          )}
        </div>
        <p className="font-medium text-slate-900 dark:text-slate-100 truncate">
          {titulo}
        </p>
        <Text variant="small" className="truncate">
          {subtitulo}
        </Text>
      </div>
      {extra && (
        <div className="text-right flex-shrink-0">
          <Text variant="muted" className="font-medium">
            {extra}
          </Text>
        </div>
      )}
      <Icon
        name="chevron-right"
        size="sm"
        className="text-slate-300 dark:text-slate-600 flex-shrink-0"
      />
    </button>
  );
}
