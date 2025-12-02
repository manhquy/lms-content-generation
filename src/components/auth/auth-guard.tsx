'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMe } from '@/features/auth/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetMe();

  useEffect(() => {
    // If not loading and there's an error or no user, redirect to login
    if (!isLoading && (isError || !user)) {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/auth/sign-in');
      }
    }
  }, [isLoading, isError, user, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <Skeleton className='h-4 w-32' />
        </div>
      </div>
    );
  }

  // If there's an error or no user, don't render children
  // The useEffect will handle the redirect
  if (isError || !user) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
}
