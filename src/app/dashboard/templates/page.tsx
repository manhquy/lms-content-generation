import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  IconArrowRight,
  IconBook,
  IconSparkles,
  IconGrid4x4,
  IconFileText,
  IconCertificate,
  IconSearch,
  IconWorld
} from '@tabler/icons-react';
import LikeIcon from '@/components/ui/icon/like';
import { CircleChevronRight, LayoutGrid } from 'lucide-react';

const featuredTemplates = [
  {
    id: 1,
    category: 'Gamification',
    title: 'Quiz Generator',
    icon: 'grid'
  },
  {
    id: 2,
    category: 'Gamification',
    title: 'Interactive Courses',
    icon: 'book'
  }
];

const templates = [
  {
    id: 1,
    title: 'Lesson Starter',
    provider: 'SimplifyX',
    category: 'Editor choice',
    description: 'Create ready-to-use interactive content...',
    icon: 'book'
  },
  {
    id: 2,
    title: 'Quiz',
    provider: 'SimplifyX',
    category: 'Editor choice',
    description: 'Use an easy-to-edit layout to stand out...',
    icon: 'grid'
  },
  {
    id: 3,
    title: 'Certification',
    provider: 'SimplifyX',
    category: 'Editor choice',
    description: 'Easily generate your personalized test to them...',
    icon: 'certificate'
  }
];

export default function TemplatesPage() {
  return (
    <PageContainer scrollable>
      <div className='w-full space-y-6 pb-8'>
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
        <div className='space-y-6 px-8'>
          <div>
            <div className='mb-8'>
              <p className='text-primary mb-2 text-xs font-bold tracking-wide uppercase'>
                MARKETPLACE
              </p>
              <h2 className='text-foreground text-2xl font-semibold'>
                Templates
              </h2>
            </div>

            {/* Search Bar */}
            <div className='relative mb-4'>
              <IconSearch className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
              <Input placeholder='Search' className='h-11 pl-10' />
            </div>

            {/* AI Assist Search Banner */}
            <div
              className='relative mb-8 overflow-hidden bg-cover bg-center px-5 py-4'
              style={{
                backgroundImage: 'url(/bg-image.webp)'
              }}
            >
              <div className='relative z-10 space-y-6'>
                <Button className='bg-primary hover:bg-primary/20 min-w-[180px] gap-2 rounded-sm text-white'>
                  <IconSparkles className='h-4 w-4' />
                  AI Assist
                </Button>
                <div className='flex items-center justify-center gap-4'>
                  <Input
                    placeholder='Build me a gamified quiz template'
                    className='h-12 max-w-2xl rounded-none border-0 border-b border-[#ECF0F5] bg-transparent text-center text-2xl font-medium text-white placeholder:text-2xl placeholder:font-medium placeholder:text-white/90'
                  />
                  <Button
                    size='lg'
                    className='h-12 rounded-lg border border-white bg-transparent px-8 text-white hover:bg-white/10'
                  >
                    Search
                  </Button>
                </div>
                <div className='flex justify-center'>
                  <Button
                    variant='ghost'
                    className='rounded-md border border-white/30 bg-white/10 text-white backdrop-blur-[14.76px] hover:bg-white/20 hover:text-white'
                  >
                    Create Custom Templates
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Section */}
            <div className='mb-8'>
              <div className='mb-6 flex items-center justify-between border-b pb-2.5'>
                <div className='flex items-center gap-2'>
                  <LayoutGrid className='text-foreground h-6 w-6' />
                  <h3 className='text-foreground text-sm font-medium'>
                    Featured
                  </h3>
                </div>
                <Button
                  variant='link'
                  className='text-foreground gap-2 text-sm'
                >
                  See more
                  <CircleChevronRight className='h-5 w-5' />
                </Button>
              </div>
              <div className='grid gap-6 md:grid-cols-2'>
                {featuredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className='overflow-hidden rounded-md border-none py-4 shadow-none'
                    style={{
                      background:
                        'linear-gradient(270deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 239, 253, 0.8) 71.8%)'
                    }}
                  >
                    <CardHeader className='px-4 pb-9'>
                      <div>
                        <div className='text-foreground text-xs'>
                          {template.category}
                        </div>
                        <CardTitle className='text-foreground text-lg font-semibold'>
                          {template.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant='ghost'
                        className='text-foreground hover:text-foreground rounded-md border border-white/30 bg-white/50 backdrop-blur-[14.76px] hover:bg-white/20'
                      >
                        Explore Templates
                        <IconArrowRight className='h-4 w-4' />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Editor Choice Templates */}
            <div className='grid gap-6 md:grid-cols-3'>
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className='overflow-hidden bg-white p-4'
                >
                  <CardHeader className='space-y-6 p-0'>
                    <div className='flex items-start justify-between'>
                      <div className='text-primary flex h-10.5 w-10.5 items-center justify-center rounded-full border'>
                        {template.icon === 'book' && (
                          <IconBook className='h-6 w-6' />
                        )}
                        {template.icon === 'grid' && (
                          <IconWorld className='h-6 w-6' />
                        )}
                        {template.icon === 'certificate' && (
                          <IconFileText className='h-6 w-6' />
                        )}
                      </div>
                      <Button variant='outline'>Editor choice</Button>
                    </div>
                    <div>
                      <CardTitle className='text-foreground text-xl font-semibold'>
                        {template.title}
                      </CardTitle>
                      <p className='text-foreground mb-4 text-xs'>
                        {template.provider}
                      </p>
                      <CardDescription className='text-foreground text-sm leading-relaxed'>
                        {template.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
