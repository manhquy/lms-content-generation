'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import LikeIcon from '@/components/ui/icon/like';
import { Input } from '@/components/ui/input';
import { IconSearch, IconSparkles, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useCourses } from '@/hooks/use-lms';
import { useGetMe } from '@/features/auth/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { getGreeting } from '@/lib/utils';

export default function CoursesPage() {
  const router = useRouter();
  const { data: user } = useGetMe();
  const { selectedWorkspaceId } = useWorkspaceStore();
  const {
    data: courses,
    isLoading,
    isError,
    error
  } = useCourses(selectedWorkspaceId || '', user?.id || '');

  const handleViewCourse = (courseId: number) => {
    router.push('/dashboard/module');
  };

  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between border-b px-8 py-2'>
            <div>
              <h1 className='text-foreground text-lg font-bold'>
                {getGreeting(user?.full_name)}
              </h1>
              <p className='text-foreground mt-1 text-sm'>
                Quickly access your recent training, courses and workspaces
              </p>
            </div>
            <div className='text-primary flex items-center gap-2'>
              <LikeIcon />
              <span className='text-sm text-[#2D286B]'>Give Feedback</span>
            </div>
          </div>
        </div>
        <div className='w-full px-8 pb-8'>
          <div>
            <div className='mb-4 flex items-center justify-between'>
              <div>
                <p className='text-primary text-xs font-bold uppercase'>
                  TRAINING
                </p>
                <h2 className='text-2xl font-semibold'>Courses</h2>
              </div>
            </div>
            <div className='mb-6 flex flex-row items-center justify-between gap-4'>
              <div className='relative w-full'>
                <IconSearch className='text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2' />
                <Input
                  placeholder='Search'
                  className='h-10 w-full rounded-full pr-10 pl-10'
                />
              </div>
              <Button
                variant='ghost'
                size='icon'
                className='h-10 w-10 rounded-full border'
              >
                <IconX className='h-4 w-4' />
              </Button>
            </div>
            {isLoading ? (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className='overflow-hidden rounded-md border p-4'
                  >
                    <Skeleton className='h-32 w-full rounded-sm' />
                    <div className='py-4'>
                      <Skeleton className='h-6 w-3/4' />
                    </div>
                    <Skeleton className='h-8 w-full' />
                    <Skeleton className='mt-2 h-8 w-full' />
                    <div className='pt-4'>
                      <Skeleton className='h-10 w-full' />
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className='flex min-h-[400px] flex-col items-center justify-center'>
                <p className='text-muted-foreground text-sm'>
                  Failed to load courses. Please try again.
                </p>
                <p className='mt-2 text-xs text-red-500'>
                  {error instanceof Error ? error.message : 'Unknown error'}
                </p>
              </div>
            ) : !courses || courses.length === 0 ? (
              <div className='flex min-h-[400px] flex-col items-center justify-center'>
                <p className='text-muted-foreground text-sm'>
                  No courses found. Create your first course to get started.
                </p>
              </div>
            ) : (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className='overflow-hidden rounded-md border p-4'
                  >
                    <div className='h-32 rounded-sm bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950' />
                    <div>
                      <div className='py-4 font-semibold'>{course.name}</div>
                      <div className='line-clamp-2 text-xs'>
                        {course.description || 'No description available'}
                      </div>
                    </div>
                    <div className='pt-4'>
                      <Button
                        className='w-full'
                        variant='default'
                        onClick={() => handleViewCourse(Number(course.id))}
                      >
                        View Course
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
