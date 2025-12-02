'use client';

import { useGetMe, useLogout } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function UserProfile() {
  const { data: user, isLoading, isError } = useGetMe();
  const logout = useLogout();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='mt-2 h-4 w-48' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='mt-2 h-4 w-full' />
        </CardContent>
      </Card>
    );
  }

  if (isError || !user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load user information</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <p className='text-sm font-medium'>Name</p>
          <p className='text-muted-foreground text-sm'>{user.full_name}</p>
        </div>
        <div>
          <p className='text-sm font-medium'>Email</p>
          <p className='text-muted-foreground text-sm'>{user.email}</p>
        </div>
        <div>
          <p className='text-sm font-medium'>User ID</p>
          <p className='text-muted-foreground font-mono text-xs'>{user.id}</p>
        </div>
        <div>
          <p className='text-sm font-medium'>Account Created</p>
          <p className='text-muted-foreground text-sm'>
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
        <Button onClick={logout} variant='destructive' className='w-full'>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
