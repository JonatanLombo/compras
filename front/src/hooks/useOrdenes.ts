import { useStoreState, useStoreActions } from "@/store";
import { useCallback } from "react";
import { CreateOrdenRequest, UpdateOrdenRequest, EstadoOrden } from "@/api";

export function useOrdenes() {
  // State
  const items = useStoreState((state) => state.ordenes.items);
  const selected = useStoreState((state) => state.ordenes.selected);
  const stats = useStoreState((state) => state.ordenes.stats);
  const total = useStoreState((state) => state.ordenes.total);
  const page = useStoreState((state) => state.ordenes.page);
  const limit = useStoreState((state) => state.ordenes.limit);
  const isLoading = useStoreState((state) => state.ordenes.isLoading);
  const error = useStoreState((state) => state.ordenes.error);

  // Actions
  const fetchAllAction = useStoreActions((actions) => actions.ordenes.fetchAll);
  const fetchByIdAction = useStoreActions((actions) => actions.ordenes.fetchById);
  const fetchStatsAction = useStoreActions((actions) => actions.ordenes.fetchStats);
  const createAction = useStoreActions((actions) => actions.ordenes.create);
  const updateAction = useStoreActions((actions) => actions.ordenes.update);
  const cancelAction = useStoreActions((actions) => actions.ordenes.cancel);
  const approveAction = useStoreActions((actions) => actions.ordenes.approve);
  const markReceivedAction = useStoreActions((actions) => actions.ordenes.markReceived);
  const setSelected = useStoreActions((actions) => actions.ordenes.setSelected);
  const setError = useStoreActions((actions) => actions.ordenes.setError);

  // Wrapped functions
  const fetchAll = useCallback(
    async (params?: { page?: number; limit?: number; estado?: EstadoOrden; proveedorId?: string; fechaDesde?: string; fechaHasta?: string }) => {
      return fetchAllAction(params);
    },
    [fetchAllAction]
  );

  const fetchById = useCallback(
    async (id: string) => {
      return fetchByIdAction(id);
    },
    [fetchByIdAction]
  );

  const fetchStats = useCallback(async () => {
    return fetchStatsAction();
  }, [fetchStatsAction]);

  const create = useCallback(
    async (data: CreateOrdenRequest) => {
      return createAction(data);
    },
    [createAction]
  );

  const update = useCallback(
    async (id: string, data: UpdateOrdenRequest) => {
      return updateAction({ id, data });
    },
    [updateAction]
  );

  const cancel = useCallback(
    async (id: string) => {
      return cancelAction(id);
    },
    [cancelAction]
  );

  const approve = useCallback(
    async (id: string) => {
      return approveAction(id);
    },
    [approveAction]
  );

  const markReceived = useCallback(
    async (id: string) => {
      return markReceivedAction(id);
    },
    [markReceivedAction]
  );

  const select = useCallback(
    (orden: typeof selected) => {
      setSelected(orden);
    },
    [setSelected]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    // State
    ordenes: items,
    selected,
    stats,
    total,
    page,
    limit,
    isLoading,
    error,
    // Actions
    fetchAll,
    fetchById,
    fetchStats,
    create,
    update,
    cancel,
    approve,
    markReceived,
    select,
    clearError,
  };
}
