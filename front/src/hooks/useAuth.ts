import { useStoreState, useStoreActions } from "@/store";
import { useCallback } from "react";

export function useAuth() {
  // State
  const user = useStoreState((state) => state.auth.user);
  const token = useStoreState((state) => state.auth.token);
  const isAuthenticated = useStoreState((state) => state.auth.isAuthenticated);
  const isLoading = useStoreState((state) => state.auth.isLoading);
  const error = useStoreState((state) => state.auth.error);

  // Actions
  const loginAction = useStoreActions((actions) => actions.auth.login);
  const registerAction = useStoreActions((actions) => actions.auth.register);
  const logoutAction = useStoreActions((actions) => actions.auth.logout);
  const checkAuthAction = useStoreActions((actions) => actions.auth.checkAuth);
  const setError = useStoreActions((actions) => actions.auth.setError);

  // Wrapped functions
  const login = useCallback(
    async (email: string, password: string) => {
      return loginAction({ email, password });
    },
    [loginAction]
  );

  const register = useCallback(
    async (email: string, password: string, nombre: string) => {
      return registerAction({ email, password, nombre });
    },
    [registerAction]
  );

  const logout = useCallback(async () => {
    return logoutAction();
  }, [logoutAction]);

  const checkAuth = useCallback(async () => {
    return checkAuthAction();
  }, [checkAuthAction]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    // Actions
    login,
    register,
    logout,
    checkAuth,
    clearError,
  };
}
