import api from "../axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    nombre: string;
    rol: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  me: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
