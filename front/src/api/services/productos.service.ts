import api from "../axios";
import { productos as mockProductos } from "@/test/compras.data";

export interface Producto {
  id: string | number;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  unidad: string;
  precioUnitario: number;
  stock: number;
  stockMinimo: number;
  proveedorId?: string | number;
  proveedor?: {
    id: string | number;
    nombre: string;
  };
  activo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductoRequest {
  codigo?: string;
  nombre: string;
  descripcion?: string;
  categoria?: string;
  unidad: string;
  precioUnitario: number;
  stock: number;
  stockMinimo?: number;
  proveedorId?: string;
}

export interface UpdateProductoRequest extends Partial<CreateProductoRequest> {
  activo?: boolean;
}

export const productosService = {
  getAll: async (params?: {
    search?: string;
    categoria?: string;
  }): Promise<Producto[]> => {
    try {
      let url = "/products";
      if (params?.search) {
        url = `/products/search?query=${encodeURIComponent(params.search)}`;
      } else if (params?.categoria) {
        url = `/products/category/${encodeURIComponent(params.categoria)}`;
      }
      const response = await api.get<Producto[]>(url);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      let data = [...mockProductos];
      if (params?.search) {
        const q = params.search.toLowerCase();
        data = data.filter(
          (p) =>
            p.nombre.toLowerCase().includes(q) ||
            p.descripcion.toLowerCase().includes(q)
        );
      }
      if (params?.categoria) {
        data = data.filter((p) => p.categoria === params.categoria);
      }
      return data as Producto[];
    }
  },

  getById: async (id: string): Promise<Producto> => {
    try {
      const response = await api.get<Producto>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      const producto = mockProductos.find((p) => p.id === id);
      if (!producto) throw new Error("Producto no encontrado");
      return producto as Producto;
    }
  },

  getByProveedor: async (proveedorId: string): Promise<Producto[]> => {
    try {
      const response = await api.get<Producto[]>(`/products?proveedorId=${proveedorId}`);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      return mockProductos.filter((p) => p.proveedorId === proveedorId) as Producto[];
    }
  },

  create: async (data: CreateProductoRequest): Promise<Producto> => {
    try {
      const response = await api.post<Producto>("/products", data);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, simulando creación:", error);
      const newProducto: Producto = {
        id: `local-${Date.now()}`,
        codigo: data.codigo || `PROD-${Date.now()}`,
        nombre: data.nombre,
        descripcion: data.descripcion || "",
        categoria: data.categoria || "General",
        unidad: data.unidad,
        precioUnitario: data.precioUnitario,
        stock: data.stock,
        stockMinimo: data.stockMinimo || 0,
        proveedorId: data.proveedorId,
        activo: true,
      };
      return newProducto;
    }
  },

  update: async (id: string, data: UpdateProductoRequest): Promise<Producto> => {
    try {
      const response = await api.put<Producto>(`/products/${id}`, data);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, simulando actualización:", error);
      const producto = mockProductos.find((p) => p.id === id);
      if (!producto) throw new Error("Producto no encontrado");
      return { ...producto, ...data } as Producto;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.warn("Backend no disponible, simulando eliminación:", error);
    }
  },

  search: async (
    query: string,
    filters?: {
      categoria?: string;
      minPrice?: number;
      maxPrice?: number;
    }
  ): Promise<Producto[]> => {
    try {
      const params = new URLSearchParams({ query });
      if (filters?.categoria) params.append("category", filters.categoria);
      const response = await api.get<Producto[]>(`/products/search?${params}`);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      const q = query.toLowerCase();
      let results = mockProductos.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q)
      );
      if (filters?.categoria) {
        results = results.filter((p) => p.categoria === filters.categoria);
      }
      if (filters?.minPrice) {
        results = results.filter((p) => p.precioUnitario >= filters.minPrice!);
      }
      if (filters?.maxPrice) {
        results = results.filter((p) => p.precioUnitario <= filters.maxPrice!);
      }
      return results as Producto[];
    }
  },
};
