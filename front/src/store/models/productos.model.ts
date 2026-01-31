import { action, thunk, Action, Thunk } from "easy-peasy";
import {
  productosService,
  Producto,
  CreateProductoRequest,
  UpdateProductoRequest,
} from "@/api";

export interface ProductosModel {
  // State
  items: Producto[];
  selected: Producto | null;
  searchResults: Producto[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;

  // Actions
  setItems: Action<ProductosModel, Producto[]>;
  setSelected: Action<ProductosModel, Producto | null>;
  setSearchResults: Action<ProductosModel, Producto[]>;
  setPagination: Action<ProductosModel, { total: number; page: number; limit: number }>;
  setLoading: Action<ProductosModel, boolean>;
  setSearching: Action<ProductosModel, boolean>;
  setError: Action<ProductosModel, string | null>;
  addItem: Action<ProductosModel, Producto>;
  updateItem: Action<ProductosModel, Producto>;
  removeItem: Action<ProductosModel, string>;
  clearSearch: Action<ProductosModel>;

  // Thunks
  fetchAll: Thunk<ProductosModel, { page?: number; limit?: number; search?: string; proveedorId?: string; categoria?: string } | undefined>;
  fetchById: Thunk<ProductosModel, string>;
  fetchByProveedor: Thunk<ProductosModel, string>;
  create: Thunk<ProductosModel, CreateProductoRequest>;
  update: Thunk<ProductosModel, { id: string; data: UpdateProductoRequest }>;
  delete: Thunk<ProductosModel, string>;
  search: Thunk<ProductosModel, { query: string; filters?: { categoria?: string; minPrice?: number; maxPrice?: number; proveedorId?: string } }>;
}

export const productosModel: ProductosModel = {
  // State
  items: [],
  selected: null,
  searchResults: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  isSearching: false,
  error: null,

  // Actions
  setItems: action((state, payload) => {
    state.items = payload;
  }),

  setSelected: action((state, payload) => {
    state.selected = payload;
  }),

  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),

  setPagination: action((state, payload) => {
    state.total = payload.total;
    state.page = payload.page;
    state.limit = payload.limit;
  }),

  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setSearching: action((state, payload) => {
    state.isSearching = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  addItem: action((state, payload) => {
    state.items.unshift(payload);
    state.total += 1;
  }),

  updateItem: action((state, payload) => {
    const index = state.items.findIndex((item) => item.id === payload.id);
    if (index !== -1) {
      state.items[index] = payload;
    }
    if (state.selected?.id === payload.id) {
      state.selected = payload;
    }
  }),

  removeItem: action((state, payload) => {
    state.items = state.items.filter((item) => item.id !== payload);
    state.total -= 1;
    if (state.selected?.id === payload) {
      state.selected = null;
    }
  }),

  clearSearch: action((state) => {
    state.searchResults = [];
  }),

  // Thunks
  fetchAll: thunk(async (actions, params) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const response = await productosService.getAll(params);
      actions.setItems(response.data);
      actions.setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cargar productos";
      actions.setError(message);
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchById: thunk(async (actions, id) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const producto = await productosService.getById(id);
      actions.setSelected(producto);
      return producto;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cargar producto";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchByProveedor: thunk(async (actions, proveedorId) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const productos = await productosService.getByProveedor(proveedorId);
      actions.setItems(productos);
      return productos;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cargar productos del proveedor";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  create: thunk(async (actions, data) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const producto = await productosService.create(data);
      actions.addItem(producto);
      return producto;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al crear producto";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  update: thunk(async (actions, { id, data }) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const producto = await productosService.update(id, data);
      actions.updateItem(producto);
      return producto;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al actualizar producto";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  delete: thunk(async (actions, id) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      await productosService.delete(id);
      actions.removeItem(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al eliminar producto";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  search: thunk(async (actions, { query, filters }) => {
    actions.setSearching(true);
    actions.setError(null);
    try {
      const results = await productosService.search(query, filters);
      actions.setSearchResults(results);
      return results;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error en la búsqueda";
      actions.setError(message);
      throw error;
    } finally {
      actions.setSearching(false);
    }
  }),
};
