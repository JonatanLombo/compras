import api from "../axios";
import { proveedores as mockProveedores } from "@/test/compras.data";

export interface Proveedor {
  id: string | number;
  codigo: string;
  nombre: string;
  rfc: string;
  direccion: string;
  ciudad: string;
  estado: string;
  telefono: string;
  email: string;
  contacto: string;
  categoria: string;
  activo: boolean;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  logo?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProveedorRequest {
  codigo?: string;
  nombre: string;
  rfc?: string;
  direccion?: string;
  ciudad: string;
  estado?: string;
  telefono?: string;
  email?: string;
  contacto?: string;
  categoria?: string;
  activo?: boolean;
}

export interface UpdateProveedorRequest extends Partial<CreateProveedorRequest> {}

export const proveedoresService = {
  getAll: async (params?: { search?: string }): Promise<Proveedor[]> => {
    try {
      const url = params?.search
        ? `/suppliers/search?query=${encodeURIComponent(params.search)}`
        : "/suppliers";
      const response = await api.get<Proveedor[]>(url);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      let data = mockProveedores.filter((p) => p.activo);
      if (params?.search) {
        const q = params.search.toLowerCase();
        data = data.filter(
          (p) =>
            p.nombre.toLowerCase().includes(q) ||
            p.codigo.toLowerCase().includes(q) ||
            p.contacto.toLowerCase().includes(q)
        );
      }
      return data as Proveedor[];
    }
  },

  getById: async (id: string): Promise<Proveedor> => {
    try {
      const response = await api.get<Proveedor>(`/suppliers/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      const proveedor = mockProveedores.find((p) => p.id === id);
      if (!proveedor) throw new Error("Proveedor no encontrado");
      return proveedor as Proveedor;
    }
  },

  create: async (data: CreateProveedorRequest): Promise<Proveedor> => {
    try {
      const response = await api.post<Proveedor>("/suppliers", data);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, simulando creación:", error);
      // Simular creación local
      const newProveedor: Proveedor = {
        id: `local-${Date.now()}`,
        codigo: data.codigo || `PROV-${Date.now()}`,
        nombre: data.nombre,
        rfc: data.rfc || "",
        direccion: data.direccion || "",
        ciudad: data.ciudad,
        estado: data.estado || "",
        telefono: data.telefono || "",
        email: data.email || "",
        contacto: data.contacto || "",
        categoria: data.categoria || "General",
        activo: data.activo ?? true,
      };
      return newProveedor;
    }
  },

  update: async (id: string, data: UpdateProveedorRequest): Promise<Proveedor> => {
    try {
      const response = await api.put<Proveedor>(`/suppliers/${id}`, data);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, simulando actualización:", error);
      const proveedor = mockProveedores.find((p) => p.id === id);
      if (!proveedor) throw new Error("Proveedor no encontrado");
      return { ...proveedor, ...data } as Proveedor;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/suppliers/${id}`);
    } catch (error) {
      console.warn("Backend no disponible, simulando eliminación:", error);
    }
  },

  bulkImport: async (file: File): Promise<{ imported: number; errors: string[] }> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post("/suppliers/bulk-import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, simulando importación:", error);
      return { imported: 0, errors: ["Backend no disponible"] };
    }
  },
};
