import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMe } from '@/features/auth/hooks/useAuth';

/**
 * Hook to protect routes - redirect to login if not authenticated
 */
export const useRequireAuth = () => {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetMe();

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      // No valid token or user, redirect to login
      router.push('/auth/sign-in');
    }
  }, [isLoading, isError, user, router]);

  return { user, isLoading };
};

/**
 * Hook to check if user is authenticated
 */
export const useAuth = () => {
  const { data: user, isLoading, isError } = useGetMe();

  return {
    user,
    isLoading,
    isAuthenticated: !isLoading && !isError && !!user
  };
};
