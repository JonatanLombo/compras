import api from "../axios";
import { ordenesCompra as mockOrdenes } from "@/test/compras.data";

export type EstadoOrden = "borrador" | "pendiente" | "aprobada" | "recibida" | "cancelada";

export interface OrdenCompra {
  id: string;
  numero: string;
  fecha: string;
  proveedorId: string;
  proveedorNombre: string;
  estado: EstadoOrden;
  subtotal: number;
  iva: number;
  total: number;
  items: number | OrdenItem[];
  producto?: string;
  cantidad?: number;
  transactionId?: string;
  isUserOrder?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrdenItem {
  id?: string;
  productoId?: string;
  producto?: { id: string | number };
  productoNombre?: string;
  cantidad: number;
  precioUnitario: number;
  subtotal?: number;
}

export interface CreateOrdenRequest {
  proveedor: { id: string | number };
  estado?: EstadoOrden;
  items: {
    producto: { id: string | number };
    cantidad: number;
    precioUnitario: number;
  }[];
  direccionEntrega?: string;
  contactoNombre?: string;
  contactoTelefono?: string;
  metodoPago?: string;
  notas?: string;
}

export interface UpdateOrdenRequest {
  estado?: EstadoOrden;
  notas?: string;
}

// Obtener órdenes de usuario desde localStorage
const getUserOrders = (): OrdenCompra[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("nexuspro_user_orders");
  return stored ? JSON.parse(stored) : [];
};

export const ordenesService = {
  getAll: async (params?: {
    estado?: EstadoOrden;
    proveedorId?: string;
  }): Promise<OrdenCompra[]> => {
    try {
      let url = "/purchase-orders";
      if (params?.estado) {
        url = `/purchase-orders/status/${params.estado}`;
      }
      const response = await api.get<OrdenCompra[]>(url);
      // Combinar con órdenes locales del usuario
      const userOrders = getUserOrders();
      return [...userOrders, ...response.data];
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      const userOrders = getUserOrders();
      let data = [...userOrders, ...mockOrdenes];
      if (params?.estado) {
        data = data.filter((o) => o.estado === params.estado);
      }
      if (params?.proveedorId) {
        data = data.filter((o) => o.proveedorId === params.proveedorId);
      }
      return data as OrdenCompra[];
    }
  },

  getById: async (id: string): Promise<OrdenCompra> => {
    try {
      const response = await api.get<OrdenCompra>(`/purchase-orders/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      // Buscar en órdenes de usuario
      const userOrders = getUserOrders();
      const userOrder = userOrders.find((o) => o.id === id);
      if (userOrder) return userOrder;
      // Buscar en mock
      const orden = mockOrdenes.find((o) => o.id === id);
      if (!orden) throw new Error("Orden no encontrada");
      return orden as OrdenCompra;
    }
  },

  search: async (query: string): Promise<OrdenCompra[]> => {
    try {
      const response = await api.get<OrdenCompra[]>(
        `/purchase-orders/search?query=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      const q = query.toLowerCase();
      const userOrders = getUserOrders();
      const allOrders = [...userOrders, ...mockOrdenes];
      return allOrders.filter(
        (o) =>
          o.numero.toLowerCase().includes(q) ||
          o.proveedorNombre.toLowerCase().includes(q)
      ) as OrdenCompra[];
    }
  },

  create: async (data: CreateOrdenRequest): Promise<OrdenCompra> => {
    try {
      const response = await api.post<OrdenCompra>("/purchase-orders", data);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, simulando creación:", error);
      // Calcular totales
      const subtotal = data.items.reduce(
        (sum, item) => sum + item.cantidad * item.precioUnitario,
        0
      );
      const iva = subtotal * 0.16;
      const total = subtotal + iva;

      const newOrden: OrdenCompra = {
        id: `local-${Date.now()}`,
        numero: `OC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        fecha: new Date().toISOString().split("T")[0],
        proveedorId: String(data.proveedor.id),
        proveedorNombre: "Proveedor",
        estado: data.estado || "borrador",
        subtotal,
        iva,
        total,
        items: data.items.length,
        isUserOrder: true,
      };
      return newOrden;
    }
  },

  update: async (id: string, data: UpdateOrdenRequest): Promise<OrdenCompra> => {
    try {
      const response = await api.put<OrdenCompra>(`/purchase-orders/${id}`, data);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, simulando actualización:", error);
      const orden = mockOrdenes.find((o) => o.id === id);
      if (!orden) throw new Error("Orden no encontrada");
      return { ...orden, ...data } as OrdenCompra;
    }
  },

  cancel: async (id: string): Promise<OrdenCompra> => {
    try {
      const response = await api.delete<OrdenCompra>(`/purchase-orders/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, simulando cancelación:", error);
      const orden = mockOrdenes.find((o) => o.id === id);
      if (!orden) throw new Error("Orden no encontrada");
      return { ...orden, estado: "cancelada" } as OrdenCompra;
    }
  },

  getByStatus: async (estado: EstadoOrden): Promise<OrdenCompra[]> => {
    try {
      const response = await api.get<OrdenCompra[]>(`/purchase-orders/status/${estado}`);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      const userOrders = getUserOrders();
      const allOrders = [...userOrders, ...mockOrdenes];
      return allOrders.filter((o) => o.estado === estado) as OrdenCompra[];
    }
  },

  getStats: async (): Promise<{
    total: number;
    pendientes: number;
    aprobadas: number;
    recibidas: number;
    montoTotal: number;
  }> => {
    try {
      const orders = await ordenesService.getAll();
      return {
        total: orders.length,
        pendientes: orders.filter((o) => o.estado === "pendiente").length,
        aprobadas: orders.filter((o) => o.estado === "aprobada").length,
        recibidas: orders.filter((o) => o.estado === "recibida").length,
        montoTotal: orders.reduce((sum, o) => sum + o.total, 0),
      };
    } catch (error) {
      console.warn("Backend no disponible:", error);
      const userOrders = getUserOrders();
      const allOrders = [...userOrders, ...mockOrdenes];
      return {
        total: allOrders.length,
        pendientes: allOrders.filter((o) => o.estado === "pendiente").length,
        aprobadas: allOrders.filter((o) => o.estado === "aprobada").length,
        recibidas: allOrders.filter((o) => o.estado === "recibida").length,
        montoTotal: allOrders.reduce((sum, o) => sum + o.total, 0),
      };
    }
  },
};
