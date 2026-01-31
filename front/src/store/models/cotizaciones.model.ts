import { action, thunk, Action, Thunk } from "easy-peasy";
import {
  cotizacionesService,
  CotizacionFilters,
  SupplierQuote,
} from "@/api";

export interface CotizacionesModel {
  // State
  items: SupplierQuote[];
  searchResults: SupplierQuote[];
  lastQuery: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setItems: Action<CotizacionesModel, SupplierQuote[]>;
  setSearchResults: Action<CotizacionesModel, SupplierQuote[]>;
  setLastQuery: Action<CotizacionesModel, string>;
  setLoading: Action<CotizacionesModel, boolean>;
  setError: Action<CotizacionesModel, string | null>;
  clearSearch: Action<CotizacionesModel>;

  // Thunks
  search: Thunk<CotizacionesModel, { query: string; filters?: CotizacionFilters }>;
  fetchAll: Thunk<CotizacionesModel>;
}

export const cotizacionesModel: CotizacionesModel = {
  // State
  items: [],
  searchResults: [],
  lastQuery: "",
  isLoading: false,
  error: null,

  // Actions
  setItems: action((state, payload) => {
    state.items = payload;
  }),

  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),

  setLastQuery: action((state, payload) => {
    state.lastQuery = payload;
  }),

  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  clearSearch: action((state) => {
    state.searchResults = [];
    state.lastQuery = "";
  }),

  // Thunks
  search: thunk(async (actions, { query, filters }) => {
    actions.setLoading(true);
    actions.setError(null);
    actions.setLastQuery(query);
    try {
      const results = await cotizacionesService.search(query, filters);
      actions.setSearchResults(results);
      return results;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error en la búsqueda";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchAll: thunk(async (actions) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const items = await cotizacionesService.getAll();
      actions.setItems(items);
      return items;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cargar cotizaciones";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),
};
