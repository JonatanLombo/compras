import { useStoreState, useStoreActions } from "@/store";
import { useCallback } from "react";
import { CotizacionFilters } from "@/api";

export function useCotizaciones() {
  // State
  const items = useStoreState((state) => state.cotizaciones.items);
  const searchResults = useStoreState((state) => state.cotizaciones.searchResults);
  const lastQuery = useStoreState((state) => state.cotizaciones.lastQuery);
  const isLoading = useStoreState((state) => state.cotizaciones.isLoading);
  const error = useStoreState((state) => state.cotizaciones.error);

  // Actions
  const searchAction = useStoreActions((actions) => actions.cotizaciones.search);
  const fetchAllAction = useStoreActions((actions) => actions.cotizaciones.fetchAll);
  const clearSearchAction = useStoreActions((actions) => actions.cotizaciones.clearSearch);
  const setError = useStoreActions((actions) => actions.cotizaciones.setError);

  // Wrapped functions
  const search = useCallback(
    async (query: string, filters?: CotizacionFilters) => {
      return searchAction({ query, filters });
    },
    [searchAction]
  );

  const fetchAll = useCallback(async () => {
    return fetchAllAction();
  }, [fetchAllAction]);

  const clearSearch = useCallback(() => {
    clearSearchAction();
  }, [clearSearchAction]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    // State
    cotizaciones: items,
    searchResults,
    lastQuery,
    isLoading,
    error,
    // Actions
    search,
    fetchAll,
    clearSearch,
    clearError,
  };
}
