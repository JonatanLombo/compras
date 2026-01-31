import { action, thunk, Action, Thunk } from "easy-peasy";
import {
  proveedoresService,
  Proveedor,
  CreateProveedorRequest,
  UpdateProveedorRequest,
} from "@/api";

export interface ProveedoresModel {
  // State
  items: Proveedor[];
  selected: Proveedor | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setItems: Action<ProveedoresModel, Proveedor[]>;
  setSelected: Action<ProveedoresModel, Proveedor | null>;
  setLoading: Action<ProveedoresModel, boolean>;
  setError: Action<ProveedoresModel, string | null>;
  addItem: Action<ProveedoresModel, Proveedor>;
  updateItem: Action<ProveedoresModel, Proveedor>;
  removeItem: Action<ProveedoresModel, string>;

  // Thunks
  fetchAll: Thunk<ProveedoresModel, { search?: string } | undefined>;
  fetchById: Thunk<ProveedoresModel, string>;
  create: Thunk<ProveedoresModel, CreateProveedorRequest>;
  update: Thunk<ProveedoresModel, { id: string; data: UpdateProveedorRequest }>;
  delete: Thunk<ProveedoresModel, string>;
  bulkImport: Thunk<ProveedoresModel, File>;
}

export const proveedoresModel: ProveedoresModel = {
  // State
  items: [],
  selected: null,
  isLoading: false,
  error: null,

  // Actions
  setItems: action((state, payload) => {
    state.items = payload;
  }),

  setSelected: action((state, payload) => {
    state.selected = payload;
  }),

  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  addItem: action((state, payload) => {
    state.items.unshift(payload);
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
    state.items = state.items.filter((item) => String(item.id) !== payload);
    if (String(state.selected?.id) === payload) {
      state.selected = null;
    }
  }),

  // Thunks
  fetchAll: thunk(async (actions, params) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const data = await proveedoresService.getAll(params);
      actions.setItems(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cargar proveedores";
      actions.setError(message);
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchById: thunk(async (actions, id) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const proveedor = await proveedoresService.getById(id);
      actions.setSelected(proveedor);
      return proveedor;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cargar proveedor";
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
      const proveedor = await proveedoresService.create(data);
      actions.addItem(proveedor);
      return proveedor;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al crear proveedor";
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
      const proveedor = await proveedoresService.update(id, data);
      actions.updateItem(proveedor);
      return proveedor;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al actualizar proveedor";
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
      await proveedoresService.delete(id);
      actions.removeItem(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al eliminar proveedor";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  bulkImport: thunk(async (actions, file) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const result = await proveedoresService.bulkImport(file);
      // Recargar lista después de importar
      await actions.fetchAll(undefined);
      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al importar proveedores";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),
};
