'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Play, Users } from 'lucide-react';
import Link from 'next/link';
import PageContainer from '@/components/layout/page-container';

const workspaces = [
  { id: '1', name: 'Clinical', icon: '🏥', color: 'bg-blue-100' },
  { id: '2', name: 'Regulatory', icon: '📋', color: 'bg-green-100' },
  { id: '3', name: 'Operational Training', icon: '⚙️', color: 'bg-purple-100' }
];

const myWorkspaces = [
  { id: '1', name: 'Claims', letter: 'C', color: 'bg-orange-500' },
  { id: '2', name: 'Prior Auth', letter: 'P', color: 'bg-blue-500' },
  { id: '3', name: 'Brokers', letter: 'B', color: 'bg-purple-500' }
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

export function LmsDashboard() {
  return (
    <PageContainer>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>Good Morning, Amy!</h1>
            <p className='text-muted-foreground'>
              Quickly access your recent training, courses and workspaces
            </p>
          </div>
          <Button variant='outline' className='text-muted-foreground'>
            👍 Give Feedback
          </Button>
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Left Column */}
          <div className='space-y-6 lg:col-span-2'>
            {/* Recent Visited */}
            <div>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Recent Visited</h2>
                <button className='text-muted-foreground text-sm'>^</button>
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                {workspaces.map((workspace) => (
                  <Card key={workspace.id} className='relative'>
                    <CardContent className='p-4'>
                      <div className='space-y-3'>
                        <div className='text-2xl'>{workspace.icon}</div>
                        <div>
                          <h3 className='font-medium'>{workspace.name}</h3>
                          <p className='text-muted-foreground text-sm'>
                            Workspace • {workspace.name}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <button className='text-muted-foreground hover:text-foreground absolute top-3 right-3'>
                      ⭐
                    </button>
                  </Card>
                ))}
              </div>
            </div>

            {/* My Workspace */}
            <div>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>My Workspace</h2>
                <button className='text-muted-foreground text-sm'>^</button>
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                {myWorkspaces.map((workspace) => (
                  <div
                    key={workspace.id}
                    className='flex items-center space-x-3'
                  >
                    <div
                      className={`h-12 w-12 rounded-lg ${workspace.color} flex items-center justify-center font-bold text-white`}
                    >
                      {workspace.letter}
                    </div>
                    <div>
                      <p className='text-muted-foreground text-sm'>Workspace</p>
                      <h3 className='font-medium'>{workspace.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-6'>
            {/* Build High-Impact AI Training */}
            <Card className='border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100'>
              <CardHeader className='pb-3'>
                <div className='mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-white'>
                  <div className='grid grid-cols-3 gap-1'>
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-sm ${i % 2 === 0 ? 'bg-purple-500' : 'bg-purple-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <CardTitle className='text-lg'>
                  Build High-Impact AI Training Experiences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href='/dashboard/lms-generation/wizard'>
                  <Button className='w-full bg-purple-600 hover:bg-purple-700'>
                    Create New
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Templates */}
            <div>
              <h3 className='mb-4 text-lg font-semibold'>Templates</h3>
              <div className='space-y-3'>
                {templates.map((template, index) => (
                  <Card
                    key={index}
                    className='bg-gradient-to-r from-purple-50 to-purple-100'
                  >
                    <CardContent className='p-4'>
                      <div className='flex items-start space-x-3'>
                        <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-200'>
                          <BookOpen className='h-4 w-4 text-purple-600' />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <h4 className='text-sm font-medium'>
                            {template.name}
                          </h4>
                          <p className='text-muted-foreground text-xs'>
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
