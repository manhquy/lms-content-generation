import { apiClient } from '@/lib/api-config';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  User
} from '@/types/auth';

export const authService = {
  // Register new user
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      '/api/v1/auth/register',
      data
    );
    return response.data;
  },

  // Login user
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      '/api/v1/auth/login',
      data
    );
    return response.data;
  },

  // Get current user info
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>('/api/v1/me');
    return response.data;
  }
};
