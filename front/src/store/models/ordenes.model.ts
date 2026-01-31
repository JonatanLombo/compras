import { action, thunk, Action, Thunk } from "easy-peasy";
import {
  ordenesService,
  OrdenCompra,
  CreateOrdenRequest,
  UpdateOrdenRequest,
  EstadoOrden,
} from "@/api";

export interface OrdenesStats {
  total: number;
  pendientes: number;
  aprobadas: number;
  recibidas: number;
  montoTotal: number;
}

export interface OrdenesModel {
  // State
  items: OrdenCompra[];
  selected: OrdenCompra | null;
  stats: OrdenesStats | null;
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  setItems: Action<OrdenesModel, OrdenCompra[]>;
  setSelected: Action<OrdenesModel, OrdenCompra | null>;
  setStats: Action<OrdenesModel, OrdenesStats | null>;
  setPagination: Action<OrdenesModel, { total: number; page: number; limit: number }>;
  setLoading: Action<OrdenesModel, boolean>;
  setError: Action<OrdenesModel, string | null>;
  addItem: Action<OrdenesModel, OrdenCompra>;
  updateItem: Action<OrdenesModel, OrdenCompra>;

  // Thunks
  fetchAll: Thunk<OrdenesModel, { page?: number; limit?: number; estado?: EstadoOrden; proveedorId?: string; fechaDesde?: string; fechaHasta?: string } | undefined>;
  fetchById: Thunk<OrdenesModel, string>;
  fetchStats: Thunk<OrdenesModel>;
  create: Thunk<OrdenesModel, CreateOrdenRequest>;
  update: Thunk<OrdenesModel, { id: string; data: UpdateOrdenRequest }>;
  cancel: Thunk<OrdenesModel, string>;
  approve: Thunk<OrdenesModel, string>;
  markReceived: Thunk<OrdenesModel, string>;
}

export const ordenesModel: OrdenesModel = {
  // State
  items: [],
  selected: null,
  stats: null,
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  error: null,

  // Actions
  setItems: action((state, payload) => {
    state.items = payload;
  }),

  setSelected: action((state, payload) => {
    state.selected = payload;
  }),

  setStats: action((state, payload) => {
    state.stats = payload;
  }),

  setPagination: action((state, payload) => {
    state.total = payload.total;
    state.page = payload.page;
    state.limit = payload.limit;
  }),

  setLoading: action((state, payload) => {
    state.isLoading = payload;
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

  // Thunks
  fetchAll: thunk(async (actions, params) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const ordenes = await ordenesService.getAll(params);
      actions.setItems(ordenes);
      actions.setPagination({
        total: ordenes.length,
        page: params?.page || 1,
        limit: params?.limit || 10,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cargar órdenes";
      actions.setError(message);
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchById: thunk(async (actions, id) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const orden = await ordenesService.getById(id);
      actions.setSelected(orden);
      return orden;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cargar orden";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchStats: thunk(async (actions) => {
    try {
      const stats = await ordenesService.getStats();
      actions.setStats(stats);
      return stats;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cargar estadísticas";
      actions.setError(message);
      throw error;
    }
  }),

  create: thunk(async (actions, data) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const orden = await ordenesService.create(data);
      actions.addItem(orden);
      return orden;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al crear orden";
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
      const orden = await ordenesService.update(id, data);
      actions.updateItem(orden);
      return orden;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al actualizar orden";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  cancel: thunk(async (actions, id) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const orden = await ordenesService.cancel(id);
      actions.updateItem(orden);
      return orden;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al cancelar orden";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  approve: thunk(async (actions, id) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const orden = await ordenesService.update(id, { estado: "aprobada" });
      actions.updateItem(orden);
      return orden;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al aprobar orden";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  markReceived: thunk(async (actions, id) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const orden = await ordenesService.update(id, { estado: "recibida" });
      actions.updateItem(orden);
      return orden;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al marcar como recibida";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),
};
