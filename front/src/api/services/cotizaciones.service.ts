import api from "../axios";
import {
  searchSupplierQuotes as mockSearch,
  type SupplierQuote,
  type SearchFilters,
} from "@/test/compras.data";

export interface CotizacionFilters {
  sourceType?: "all" | "local" | "web";
  category?: string;
  minRating?: number;
  maxDeliveryDays?: number;
  maxPrice?: number;
  verifiedOnly?: boolean;
  freeShippingOnly?: boolean;
}

export const cotizacionesService = {
  search: async (query: string, filters?: CotizacionFilters): Promise<SupplierQuote[]> => {
    try {
      const params = new URLSearchParams({ query });
      if (filters?.sourceType && filters.sourceType !== "all") {
        params.append("sourceType", filters.sourceType);
      }
      if (filters?.category && filters.category !== "all") {
        params.append("category", filters.category);
      }
      if (filters?.minRating) {
        params.append("minRating", filters.minRating.toString());
      }
      if (filters?.maxDeliveryDays) {
        params.append("maxDeliveryDays", filters.maxDeliveryDays.toString());
      }
      if (filters?.maxPrice) {
        params.append("maxPrice", filters.maxPrice.toString());
      }
      if (filters?.verifiedOnly) {
        params.append("verifiedOnly", "true");
      }
      if (filters?.freeShippingOnly) {
        params.append("freeShippingOnly", "true");
      }

      const response = await api.get<SupplierQuote[]>(`/suppliers/quotes/search?${params}`);
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      // Usar función de búsqueda mock
      const mockFilters: SearchFilters = {
        sourceType: filters?.sourceType || "all",
        category: (filters?.category as SearchFilters["category"]) || "all",
        minRating: filters?.minRating || 0,
        maxDeliveryDays: filters?.maxDeliveryDays || 0,
        maxPrice: filters?.maxPrice || 0,
        verifiedOnly: filters?.verifiedOnly || false,
        freeShippingOnly: filters?.freeShippingOnly || false,
      };
      return mockSearch(query, mockFilters);
    }
  },

  getAll: async (): Promise<SupplierQuote[]> => {
    try {
      const response = await api.get<SupplierQuote[]>("/suppliers/quotes");
      return response.data;
    } catch (error) {
      console.warn("Backend no disponible, usando datos de prueba:", error);
      // Retornar todas las cotizaciones mock
      return mockSearch("", {
        sourceType: "all",
        category: "all",
        minRating: 0,
        maxDeliveryDays: 0,
        maxPrice: 0,
        verifiedOnly: false,
        freeShippingOnly: false,
      });
    }
  },
};

export type { SupplierQuote };
