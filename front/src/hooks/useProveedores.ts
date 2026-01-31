import { useStoreState, useStoreActions } from "@/store";
import { useCallback } from "react";
import { CreateProveedorRequest, UpdateProveedorRequest } from "@/api";

export function useProveedores() {
  // State
  const items = useStoreState((state) => state.proveedores.items);
  const selected = useStoreState((state) => state.proveedores.selected);
  const isLoading = useStoreState((state) => state.proveedores.isLoading);
  const error = useStoreState((state) => state.proveedores.error);

  // Actions
  const fetchAllAction = useStoreActions((actions) => actions.proveedores.fetchAll);
  const fetchByIdAction = useStoreActions((actions) => actions.proveedores.fetchById);
  const createAction = useStoreActions((actions) => actions.proveedores.create);
  const updateAction = useStoreActions((actions) => actions.proveedores.update);
  const deleteAction = useStoreActions((actions) => actions.proveedores.delete);
  const bulkImportAction = useStoreActions((actions) => actions.proveedores.bulkImport);
  const setSelected = useStoreActions((actions) => actions.proveedores.setSelected);
  const setError = useStoreActions((actions) => actions.proveedores.setError);

  // Wrapped functions
  const fetchAll = useCallback(
    async (params?: { search?: string }) => {
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

  const create = useCallback(
    async (data: CreateProveedorRequest) => {
      return createAction(data);
    },
    [createAction]
  );

  const update = useCallback(
    async (id: string, data: UpdateProveedorRequest) => {
      return updateAction({ id, data });
    },
    [updateAction]
  );

  const remove = useCallback(
    async (id: string) => {
      return deleteAction(id);
    },
    [deleteAction]
  );

  const bulkImport = useCallback(
    async (file: File) => {
      return bulkImportAction(file);
    },
    [bulkImportAction]
  );

  const select = useCallback(
    (proveedor: typeof selected) => {
      setSelected(proveedor);
    },
    [setSelected]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    // State
    proveedores: items,
    selected,
    isLoading,
    error,
    // Actions
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    bulkImport,
    select,
    clearError,
  };
}
