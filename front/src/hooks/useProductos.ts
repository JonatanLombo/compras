import { useStoreState, useStoreActions } from "@/store";
import { useCallback } from "react";
import { CreateProductoRequest, UpdateProductoRequest } from "@/api";

export function useProductos() {
  // State
  const items = useStoreState((state) => state.productos.items);
  const selected = useStoreState((state) => state.productos.selected);
  const searchResults = useStoreState((state) => state.productos.searchResults);
  const total = useStoreState((state) => state.productos.total);
  const page = useStoreState((state) => state.productos.page);
  const limit = useStoreState((state) => state.productos.limit);
  const isLoading = useStoreState((state) => state.productos.isLoading);
  const isSearching = useStoreState((state) => state.productos.isSearching);
  const error = useStoreState((state) => state.productos.error);

  // Actions
  const fetchAllAction = useStoreActions((actions) => actions.productos.fetchAll);
  const fetchByIdAction = useStoreActions((actions) => actions.productos.fetchById);
  const fetchByProveedorAction = useStoreActions((actions) => actions.productos.fetchByProveedor);
  const createAction = useStoreActions((actions) => actions.productos.create);
  const updateAction = useStoreActions((actions) => actions.productos.update);
  const deleteAction = useStoreActions((actions) => actions.productos.delete);
  const searchAction = useStoreActions((actions) => actions.productos.search);
  const setSelected = useStoreActions((actions) => actions.productos.setSelected);
  const clearSearchAction = useStoreActions((actions) => actions.productos.clearSearch);
  const setError = useStoreActions((actions) => actions.productos.setError);

  // Wrapped functions
  const fetchAll = useCallback(
    async (params?: { page?: number; limit?: number; search?: string; proveedorId?: string; categoria?: string }) => {
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

  const fetchByProveedor = useCallback(
    async (proveedorId: string) => {
      return fetchByProveedorAction(proveedorId);
    },
    [fetchByProveedorAction]
  );

  const create = useCallback(
    async (data: CreateProductoRequest) => {
      return createAction(data);
    },
    [createAction]
  );

  const update = useCallback(
    async (id: string, data: UpdateProductoRequest) => {
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

  const search = useCallback(
    async (query: string, filters?: { categoria?: string; minPrice?: number; maxPrice?: number; proveedorId?: string }) => {
      return searchAction({ query, filters });
    },
    [searchAction]
  );

  const select = useCallback(
    (producto: typeof selected) => {
      setSelected(producto);
    },
    [setSelected]
  );

  const clearSearch = useCallback(() => {
    clearSearchAction();
  }, [clearSearchAction]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    // State
    productos: items,
    selected,
    searchResults,
    total,
    page,
    limit,
    isLoading,
    isSearching,
    error,
    // Actions
    fetchAll,
    fetchById,
    fetchByProveedor,
    create,
    update,
    remove,
    search,
    select,
    clearSearch,
    clearError,
  };
}
