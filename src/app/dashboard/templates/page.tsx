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
  IconCertificate
} from '@tabler/icons-react';
import LikeIcon from '@/components/ui/icon/like';

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
      <div className='w-full space-y-6'>
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

        <div className='space-y-6'>
          <div>
            <div className='mb-4'>
              <p className='text-muted-foreground text-sm tracking-wide uppercase'>
                MARKETPLACE
              </p>
              <h2 className='text-2xl font-bold'>Templates</h2>
            </div>

            {/* AI Assist Search Banner */}
            <div
              className='relative mb-8 overflow-hidden rounded-xl p-8'
              style={{
                background:
                  'linear-gradient(135deg, #D946EF 0%, #EC4899 50%, #F97316 100%)'
              }}
            >
              <div className='relative z-10'>
                <Button
                  variant='secondary'
                  size='sm'
                  className='mb-4 gap-2 bg-white/20 text-white hover:bg-white/30'
                >
                  <IconSparkles className='h-4 w-4' />
                  AI Assist
                </Button>
                <div className='mb-4 flex items-center gap-2'>
                  <Input
                    placeholder='Build me a gamified quiz template'
                    className='h-12 max-w-xl border-white/30 bg-white/10 text-white placeholder:text-white/70'
                  />
                  <Button
                    variant='secondary'
                    className='bg-white text-gray-900 hover:bg-white/90'
                  >
                    Search
                  </Button>
                </div>
                <Button
                  variant='ghost'
                  className='text-white hover:bg-white/20'
                >
                  Create Custom Templates
                </Button>
              </div>
            </div>

            {/* Featured Section */}
            <div className='mb-8'>
              <div className='mb-4 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <IconGrid4x4 className='h-5 w-5' />
                  <h3 className='text-lg font-semibold'>Featured</h3>
                </div>
                <Button variant='ghost' className='gap-2 text-sm'>
                  See more
                  <IconArrowRight className='h-4 w-4' />
                </Button>
              </div>
              <div className='grid gap-6 md:grid-cols-2'>
                {featuredTemplates.map((template) => (
                  <Card key={template.id} className='overflow-hidden'>
                    <div className='h-48 bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950' />
                    <CardHeader>
                      <div className='mb-2'>
                        <Badge variant='secondary' className='text-xs'>
                          {template.category}
                        </Badge>
                      </div>
                      <CardTitle className='text-xl'>
                        {template.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant='ghost' className='gap-2 p-0 text-sm'>
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
                <Card key={template.id} className='overflow-hidden'>
                  <CardHeader className='space-y-4'>
                    <div className='flex items-start justify-between'>
                      <div className='bg-muted flex h-12 w-12 items-center justify-center rounded-lg'>
                        {template.icon === 'book' && (
                          <IconBook className='h-6 w-6' />
                        )}
                        {template.icon === 'grid' && (
                          <IconGrid4x4 className='h-6 w-6' />
                        )}
                        {template.icon === 'certificate' && (
                          <IconCertificate className='h-6 w-6' />
                        )}
                      </div>
                      <Badge variant='secondary' className='text-xs'>
                        {template.category}
                      </Badge>
                    </div>
                    <div>
                      <CardTitle className='mb-2 text-lg'>
                        {template.title}
                      </CardTitle>
                      <p className='text-muted-foreground mb-1 text-xs'>
                        {template.provider}
                      </p>
                      <CardDescription className='text-sm'>
                        {template.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Assist Section */}
          <div className='mt-8'>
            <h3 className='mb-4 text-lg font-semibold'>AI Assist</h3>
            <Card
              className='overflow-hidden'
              style={{
                background:
                  'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(360deg, rgba(91, 81, 213, 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
              }}
            >
              <CardContent className='p-6'>
                <p className='text-muted-foreground mb-4 text-sm'>
                  AI Assist simplifies content creation with fast AI-powered
                  suggestions and improvements.
                </p>
                <div className='bg-muted mb-4 h-2 w-full overflow-hidden rounded-full'>
                  <div className='bg-primary h-full w-3/4'></div>
                </div>
                <Button className='w-full gap-2'>
                  <IconSparkles className='h-4 w-4' />
                  AI Assist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
