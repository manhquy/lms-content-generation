'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import type {
  RegisterRequest,
  LoginRequest,
  RegisterResponse,
  LoginResponse,
  User
} from '@/types/auth';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Query keys
export const authKeys = {
  me: ['auth', 'me'] as const,
  all: ['auth'] as const
};

/**
 * Hook for user registration
 */
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (data: RegisterResponse) => {
      toast.success('Registration successful! Please login.');
      router.push('/auth/sign-in');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail ||
        'Registration failed. Please try again.';
      toast.error(message);
    }
  });
};

/**
 * Hook for user login
 */
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data: LoginResponse) => {
      // Store token in localStorage
      localStorage.setItem('access_token', data.access_token);

      // Also set cookie for middleware - 30 days expiration
      const thirtyDays = 30 * 24 * 60 * 60; // 30 days in seconds
      document.cookie = `access_token=${data.access_token}; path=/; max-age=${thirtyDays}; SameSite=Lax`;

      // Decode token to get user info
      try {
        const decoded = jwtDecode<DecodedToken>(data.access_token);
        console.log('Token decoded:', decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }

      // Invalidate user queries to refetch
      queryClient.invalidateQueries({ queryKey: authKeys.me });

      toast.success('Login successful!');
      router.push('/dashboard/overview');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail ||
        'Login failed. Please check your credentials.';
      toast.error(message);
    }
  });
};

/**
 * Hook to get current user information
 */
export const useGetMe = () => {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: () => authService.getMe(),
    enabled:
      typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
    retry: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

/**
 * Hook to logout user
 */
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    // Clear token
    localStorage.removeItem('access_token');

    // Clear cookie
    document.cookie =
      'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // Clear all queries
    queryClient.clear();

    toast.success('Logged out successfully');
    router.push('/auth/sign-in');
  };
};
