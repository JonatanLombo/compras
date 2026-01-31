import { action, thunk, Action, Thunk } from "easy-peasy";
import { authService, LoginRequest, RegisterRequest } from "@/api";

export interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

export interface AuthModel {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: Action<AuthModel, User | null>;
  setToken: Action<AuthModel, string | null>;
  setLoading: Action<AuthModel, boolean>;
  setError: Action<AuthModel, string | null>;
  reset: Action<AuthModel>;

  // Thunks
  login: Thunk<AuthModel, LoginRequest>;
  register: Thunk<AuthModel, RegisterRequest>;
  logout: Thunk<AuthModel>;
  checkAuth: Thunk<AuthModel>;
}

export const authModel: AuthModel = {
  // State
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("nexuspro_token") : null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  setUser: action((state, payload) => {
    state.user = payload;
    state.isAuthenticated = payload !== null;
  }),

  setToken: action((state, payload) => {
    state.token = payload;
    if (typeof window !== "undefined") {
      if (payload) {
        localStorage.setItem("nexuspro_token", payload);
      } else {
        localStorage.removeItem("nexuspro_token");
      }
    }
  }),

  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  reset: action((state) => {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    state.error = null;
  }),

  // Thunks
  login: thunk(async (actions, payload) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const response = await authService.login(payload);
      actions.setToken(response.token);
      actions.setUser(response.user);
      return response;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al iniciar sesión";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  register: thunk(async (actions, payload) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const response = await authService.register(payload);
      actions.setToken(response.token);
      actions.setUser(response.user);
      return response;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al registrarse";
      actions.setError(message);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }),

  logout: thunk(async (actions) => {
    try {
      await authService.logout();
    } catch {
      // Ignorar errores de logout
    } finally {
      actions.reset();
    }
  }),

  checkAuth: thunk(async (actions) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("nexuspro_token") : null;
    if (!token) {
      actions.reset();
      return;
    }

    actions.setLoading(true);
    try {
      const user = await authService.me();
      actions.setUser(user);
    } catch {
      actions.reset();
    } finally {
      actions.setLoading(false);
    }
  }),
};
