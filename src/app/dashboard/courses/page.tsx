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

const courses = [
  {
    id: 1,
    title: 'Prior Authorization',
    description:
      'A foundational course covering the end-to-end PA process, including...',
    category: 'Training',
    image: '/assets/course-placeholder.jpg'
  },
  {
    id: 2,
    title: 'Broker Training - Medicare',
    description:
      'Comprehensive training for Medicare brokers, covering enrollment rules...',
    category: 'Training',
    image: '/assets/course-placeholder.jpg'
  },
  {
    id: 3,
    title: 'Broker Training - Medicaid',
    description:
      'Training for Medicaid brokers focused on state-specific eligibility...',
    category: 'Training',
    image: '/assets/course-placeholder.jpg'
  },
  {
    id: 4,
    title: 'Claims 101',
    description:
      'A beginner-friendly course explaining the claims lifecycle...',
    category: 'Training',
    image: '/assets/course-placeholder.jpg'
  },
  {
    id: 5,
    title: 'Regulatory',
    description:
      'Overview of key healthcare regulations, including CMS, NCQA...',
    category: 'Training',
    image: '/assets/course-placeholder.jpg'
  },
  {
    id: 6,
    title: 'Compliance',
    description:
      'A core course on organizational compliance, covering privacy, fraud...',
    category: 'Training',
    image: '/assets/course-placeholder.jpg'
  },
  {
    id: 7,
    title: 'Provider Submissions',
    description:
      'Training on provider documentation and submission requirements...',
    category: 'Training',
    image: '/assets/course-placeholder.jpg'
  },
  {
    id: 8,
    title: 'Understanding HIPAA',
    description:
      'A clear and practical guide to HIPAA rules—including PHI, privacy...',
    category: 'Training',
    image: '/assets/course-placeholder.jpg'
  }
];

export default function CoursesPage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-4'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between border-b px-8 py-2'>
            <div>
              <h1 className='text-foreground text-lg font-bold'>
                Good Morning, Amy!
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
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className='overflow-hidden rounded-md border p-4'
                >
                  <div className='h-32 rounded-sm bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950' />
                  <div>
                    <div className='py-4 font-semibold'>{course.title}</div>
                    <div className='line-clamp-2 text-xs'>
                      {course.description}
                    </div>
                  </div>
                  <div className='pt-4'>
                    <Button className='w-full' variant='default'>
                      View Course
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
