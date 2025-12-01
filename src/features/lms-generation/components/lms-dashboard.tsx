'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LikeIcon from '@/components/ui/icon/like';
import { BookOpen, ChevronUp, Folder, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import BrowserIcon from '@/components/ui/icon/browser';
import StarIcon from '@/components/ui/icon/star';

const workspaces = [
  {
    id: '1',
    name: 'Clinical',
    path: 'Workspace > Clinical',
    icon: '📋'
  },
  {
    id: '2',
    name: 'Regulatory',
    path: 'Workspace > Regulatory',
    icon: '📋'
  },
  {
    id: '3',
    name: 'Operational Training',
    path: 'Workspace > Operational Training',
    icon: '📋'
  }
];

const myWorkspaces = [
  { id: '1', name: 'Claims', letter: 'C', color: 'bg-yellow-500' },
  { id: '2', name: 'Prior Auth', letter: 'P', color: 'bg-blue-500' },
  { id: '3', name: 'Brokers', letter: 'B', color: 'bg-indigo-600' }
];

const templates = [
  {
    name: 'Quiz Generator',
    description: 'Smart auto-graded quiz creation'
  },
  {
    name: 'Video Lesson Creator',
    description: 'Instant AI-powered videos'
  },
  {
    name: 'Interactive Module',
    description: 'Dynamic learning modules'
  }
];

export default function LmsDashboard() {
  return (
    <div className='bg-background min-h-screen w-full'>
      <div className='space-y-8'>
        {/* Header */}
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

        <div className='mx-8 grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Left Column */}
          <div className='space-y-8 lg:col-span-2'>
            {/* Recent Visited */}
            <div>
              <div className='mb-6 flex items-center justify-between rounded-md border p-2'>
                <h2 className='text-foreground text-sm font-semibold'>
                  Recent Visited
                </h2>
                <button className='text-muted-foreground hover:text-foreground rounded-xs bg-neutral-200 transition-colors'>
                  <ChevronUp className='h-5 w-5' />
                </button>
              </div>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                {workspaces.map((workspace) => (
                  <div
                    key={workspace.id}
                    className='group relative cursor-pointer overflow-hidden rounded-md border p-4 transition-shadow'
                  >
                    <div className='relative aspect-video w-full rounded-sm'>
                      <Image
                        src='/image-1.png'
                        alt={workspace.name}
                        fill
                        className='rounded-sm object-cover'
                      />
                    </div>
                    <div className='flex w-full items-center gap-4 pt-4'>
                      <div className='flex w-full items-center gap-2'>
                        <BrowserIcon />
                        <span className='text-sm font-semibold'>
                          {workspace.name}
                        </span>
                      </div>
                      <div className='flex shrink-0'>
                        <StarIcon />
                      </div>
                    </div>
                    <p className='pt-4 text-sm'>{workspace.path}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* My Workspace */}
            <div>
              <div className='mb-6 flex items-center justify-between rounded-md border p-2'>
                <h2 className='text-foreground text-sm font-semibold'>
                  My Workspace
                </h2>
                <button className='text-muted-foreground hover:text-foreground rounded-xs bg-neutral-200 transition-colors'>
                  <ChevronUp className='h-5 w-5' />
                </button>
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                {myWorkspaces.map((workspace) => (
                  <div
                    key={workspace.id}
                    className='flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-slate-50'
                  >
                    <div
                      className={`h-12 w-12 rounded-lg ${workspace.color} flex items-center justify-center font-bold text-white`}
                    >
                      {workspace.letter}
                    </div>
                    <div className='min-w-0'>
                      <p className='text-muted-foreground text-xs font-medium'>
                        Workspace
                      </p>
                      <h3 className='text-foreground font-semibold'>
                        {workspace.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-6'>
            {/* Build High-Impact AI Training */}
            <div className='rounded-md border p-4'>
              <div>
                <div className='relative aspect-video w-full rounded-sm'>
                  <Image
                    src='/image-2.png'
                    alt=''
                    fill
                    className='rounded-sm object-cover'
                  />
                </div>
                <div className='py-4 text-base'>
                  Build High-Impact AI Training Experiences
                </div>
              </div>
              <div>
                <Link href='/dashboard/lms-generation/wizard'>
                  <Button className='bg-primary text-primary-foreground hover:bg-primary/90 w-full'>
                    Create New
                  </Button>
                </Link>
              </div>
            </div>

            {/* Templates */}
            <div>
              <div className='mb-4 text-sm font-semibold'>Templates</div>
              <div className='space-y-3'>
                {templates.map((template, index) => (
                  <div
                    key={index}
                    className='cursor-pointer rounded-lg border transition-colors hover:bg-slate-100'
                  >
                    <div className='p-2'>
                      <div className='flex items-start gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-200'></div>
                        <div className='min-w-0 flex-1'>
                          <h4 className='text-foreground text-sm font-semibold'>
                            {template.name}
                          </h4>
                          <p className='text-muted-foreground mt-1 text-xs'>
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
