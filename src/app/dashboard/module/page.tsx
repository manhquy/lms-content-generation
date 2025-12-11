'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  IconPlayerPlay,
  IconVolume,
  IconSettings,
  IconMaximize,
  IconFileText,
  IconVideo,
  IconVolume2,
  IconPlus,
  IconSparkles,
  IconFileStack
} from '@tabler/icons-react';
import LikeIcon from '@/components/ui/icon/like';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import ChartIcon from '@/components/ui/icon/chart';
import VideoIcon from '@/components/ui/icon/video';
import VolumnIcon from '@/components/ui/icon/volumn';
import {
  Globe,
  ListFilter,
  Mic,
  MoveUp,
  Plus,
  Settings2,
  UserRound
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useGetMe } from '@/features/auth/hooks/useAuth';
import { getGreeting } from '@/lib/utils';

const modules = [
  { id: 1, title: 'Introduction to Prior Auth', label: 'Module 1' },
  { id: 2, title: 'PA Intake & Case Creation', label: 'Module 2' },
  { id: 3, title: 'Clinical Requirements', label: 'Module 3' },
  { id: 4, title: 'Payer-Specific Submission', label: 'Module 4' },
  { id: 5, title: 'Provider Communication', label: 'Module 5' },
  { id: 6, title: 'Handling Denials', label: 'Module 6' },
  { id: 7, title: 'Regulatory & Compliance', label: 'Module 7' },
  { id: 8, title: 'Understanding HIPAA', label: 'Module 8' }
];

const videoScripts = [
  {
    id: 1,
    timestamp: '0:01',
    text: 'Read this script in a calm, professional narrator tone, suitable for a healthcare training video',
    thumbnail: '/stock-1.jpg'
  },
  {
    id: 2,
    timestamp: '1:24',
    text: 'Open your laptop as if starting a work session, and while doing that, read this line in a warm, confident voice',
    thumbnail: '/stock-6.png'
  }
];

const audioTranscript = [
  {
    timestamp: '0:01',
    text: 'Prior Authorization, often called PA, is a review process used by health plans to ensure that a prescribed service, procedure, medication, or piece of equipment is medically necessary before it is provided to the patient.'
  },
  {
    timestamp: '1:24',
    text: 'Think of it as both a quality checkpoint and a cost-control mechanism. Before moving forward with treatment, providers must submit the relevant clinical information. The health plan, or payer, then evaluates that information to determine whether the request meets established medical-necessity criteria.'
  },
  {
    timestamp: '3:28',
    text: 'The core purpose is to make sure members receive care that is appropriate, evidence-based, and aligned with recognized clinical guidelines. It also protects the healthcare system from unnecessary, redundant, or potentially harmful services.'
  }
];

export default function ModulePage() {
  const [activeModule, setActiveModule] = useState(1);
  const [activeTab, setActiveTab] = useState('lessons');
  const [selectedPerson, setSelectedPerson] = useState('Amy Smith');
  const [selectedTone, setSelectedTone] = useState('Positive');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [lessonContent, setLessonContent] =
    useState(`Prior Authorization (PA) is a review process used by health plans to determine whether a prescribed service, procedure, medication, or equipment is medically necessary before it is delivered to the patient. It acts as a cost-control and quality-assurance mechanism.

Prior Authorization exists to ensure members receive appropriate, evidence-based care while protecting the healthcare system from unnecessary or duplicative services. Payers use PA to apply clinical guidelines consistently, prevent over-utilization, and maintain compliance with federal and state regulations such as CMS standards. Ultimately, PA balances patient appropriateness, and cost management.`);

  const [showRewriteMenu, setShowRewriteMenu] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const { data: user } = useGetMe();

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString();
    if (text && text.length > 0) {
      setSelectedText(text);
      setShowRewriteMenu(true);
    } else {
      setShowRewriteMenu(false);
    }
  };

  return (
    <PageContainer scrollable>
      <div className='w-full'>
        {/* Header */}
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

        {/* Main Content */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Left Content - Video and Tabs */}
          <div className='border-r p-8 lg:col-span-2'>
            <div className='mb-4'>
              <p className='text-primary text-xs font-bold uppercase'>
                MODULE 1
              </p>
              <h2 className='text-2xl font-semibold'>
                Prior Authorization Fundamentals
              </h2>
            </div>

            {/* Video Player */}
            <div>
              <div className='relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300'>
                <video
                  src='/gettyimages.mp4'
                  controls
                  className='h-full w-full object-cover'
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className='flex h-auto w-full justify-start rounded-none border-b bg-transparent p-0'>
                <TabsTrigger
                  value='lessons'
                  className='data-[state=active]:border-b-primary gap-2 rounded-none border-b-2 border-transparent p-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
                  style={{ flex: '0 0 auto' }}
                >
                  <ChartIcon className='h-4 w-4 shrink-0' />
                  Lessons
                </TabsTrigger>

                <TabsTrigger
                  value='video'
                  className='data-[state=active]:border-b-primary gap-2 rounded-none border-b-2 border-transparent p-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
                  style={{ flex: '0 0 auto' }}
                >
                  <VideoIcon className='h-4 w-4 shrink-0' />
                  Video
                </TabsTrigger>

                <TabsTrigger
                  value='audio'
                  className='data-[state=active]:border-b-primary gap-2 rounded-none border-b-2 border-transparent p-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
                  style={{ flex: '0 0 auto' }}
                >
                  <VolumnIcon className='h-4 w-4 shrink-0' />
                  Audio
                </TabsTrigger>
              </TabsList>

              {/* Lessons Tab */}
              <TabsContent value='lessons' className='mt-4'>
                <div className='space-y-6'>
                  <div>
                    <h3 className='mb-4 text-xl font-semibold'>
                      Prior Authorization (PA)
                    </h3>
                    <div
                      className='text-foreground relative space-y-4 text-sm leading-relaxed'
                      onMouseUp={handleTextSelection}
                    >
                      {lessonContent.split('\n\n').map((paragraph, index) => (
                        <p className='font-medium' key={index}>
                          {paragraph}
                        </p>
                      ))}

                      {/* Rewrite Menu */}
                      {showRewriteMenu && selectedText && (
                        <div className='absolute z-10 mt-2 rounded-lg border bg-white shadow-lg'>
                          <DropdownMenu open={showRewriteMenu}>
                            <DropdownMenuContent className='w-56'>
                              <DropdownMenuItem className='gap-2'>
                                <IconFileStack className='h-4 w-4' />
                                Extend Section
                              </DropdownMenuItem>
                              <DropdownMenuItem className='gap-2'>
                                <IconSparkles className='h-4 w-4' />
                                Rewrite with AI
                              </DropdownMenuItem>
                              <DropdownMenuItem className='gap-2'>
                                <IconFileText className='h-4 w-4' />
                                Generate Image
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className='mb-4 text-xl font-semibold'>
                      When is Prior Authorization Required?
                    </h3>
                  </div>

                  {/* Text Input Area */}
                  <div className='relative rounded-2xl border bg-white'>
                    <Textarea
                      placeholder='Describe what you want to add, remove or replace...'
                      className='w-full resize-none border-none px-3 shadow-none focus-visible:ring-0'
                    />
                    <div className='flex items-center justify-between gap-2 p-4'>
                      <div className='flex flex-row gap-2'>
                        <button>
                          <Plus className='h-4 w-4 text-black' />
                        </button>
                        <button>
                          <Settings2 className='h-4 w-4 text-black' />
                        </button>
                      </div>
                      <div className='flex flex-row gap-2'>
                        <button className='rounded-full border p-1'>
                          <Mic className='h-4 w-4 text-black' />
                        </button>
                        <button className='rounded-full border p-1'>
                          <MoveUp className='h-4 w-4 text-black' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Video Tab */}
              <TabsContent value='video' className='mt-6'>
                <div className='space-y-6'>
                  {/* Video Thumbnails */}
                  <div className='flex gap-4 overflow-x-auto pb-4'>
                    {[1, 2, 3, 4, 5].map((idx) => (
                      <div
                        key={idx}
                        className={`flex shrink-0 ${idx === 1 ? 'border-primary rounded-lg border' : ''}`}
                      >
                        <div className='h-20 w-32 overflow-hidden rounded-lg border bg-gradient-to-br from-gray-200 to-gray-300'>
                          <img
                            src={`/stock-${idx}.jpg`}
                            alt={`Avatar ${idx}`}
                            className='h-full w-full object-cover'
                            onError={(e) => {
                              e.currentTarget.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="80"%3E%3Crect fill="%23E5E7EB" width="128" height="80"/%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Video Scripts */}
                  <div className='space-y-4'>
                    {videoScripts.map((script) => (
                      <div key={script.id} className='flex gap-4'>
                        <p className='text-primary mb-1 text-xs font-semibold'>
                          {script.timestamp}
                        </p>
                        <div className='flex-shrink-0'>
                          <div className='h-16 w-24 overflow-hidden rounded-lg bg-gradient-to-br from-gray-200 to-gray-300'>
                            <img
                              src={script.thumbnail}
                              alt='Thumbnail'
                              className='h-full w-full object-cover'
                              onError={(e) => {
                                e.currentTarget.src =
                                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="64"%3E%3Crect fill="%23E5E7EB" width="96" height="64"/%3E%3C/svg%3E';
                              }}
                            />
                          </div>
                        </div>
                        <div className='flex-1'>
                          <p className='text-foreground text-sm font-medium'>
                            {script.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Text Input Area */}
                  <div className='relative rounded-2xl border bg-white'>
                    <Textarea
                      placeholder='Describe what you want to add, remove or replace...'
                      className='w-full resize-none border-none px-3 shadow-none focus-visible:ring-0'
                    />
                    <div className='flex items-center justify-between gap-2 p-4'>
                      <div className='flex flex-row gap-2'>
                        <button>
                          <Plus className='h-4 w-4 text-black' />
                        </button>
                        <button>
                          <Settings2 className='h-4 w-4 text-black' />
                        </button>
                      </div>
                      <div className='flex flex-row gap-2'>
                        <button className='rounded-full border p-1'>
                          <Mic className='h-4 w-4 text-black' />
                        </button>
                        <button className='rounded-full border p-1'>
                          <MoveUp className='h-4 w-4 text-black' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Audio Tab */}
              <TabsContent value='audio' className='mt-6'>
                <div className='space-y-6'>
                  {/* Audio Controls */}
                  <div className='flex items-center gap-4'>
                    <Select
                      value={selectedPerson}
                      onValueChange={setSelectedPerson}
                    >
                      <SelectTrigger className='w-40'>
                        <div className='flex items-center gap-2'>
                          <UserRound className='h-4 w-4' />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Amy Smith'>Amy Smith</SelectItem>
                        <SelectItem value='John Doe'>John Doe</SelectItem>
                        <SelectItem value='Jane Wilson'>Jane Wilson</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedTone}
                      onValueChange={setSelectedTone}
                    >
                      <SelectTrigger className='w-40'>
                        <div className='flex items-center gap-2'>
                          <ListFilter className='h-4 w-4' />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Positive'>Positive</SelectItem>
                        <SelectItem value='Neutral'>Neutral</SelectItem>
                        <SelectItem value='Professional'>
                          Professional
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className='w-40'>
                        <div className='flex items-center gap-2'>
                          <Globe className='h-4 w-4' />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='English'>English</SelectItem>
                        <SelectItem value='Spanish'>Spanish</SelectItem>
                        <SelectItem value='French'>French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Audio Transcript */}
                  <div className='space-y-4'>
                    {audioTranscript.map((item, index) => (
                      <div key={index} className='flex gap-4'>
                        <p className='text-primary flex-shrink-0 text-sm font-semibold'>
                          {item.timestamp}
                        </p>
                        <p className='text-foreground flex-1 text-sm leading-relaxed font-medium'>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Text Input Area */}
                  <div className='relative rounded-2xl border bg-white'>
                    <Textarea
                      placeholder='Describe what you want to add, remove or replace...'
                      className='w-full resize-none border-none px-3 shadow-none focus-visible:ring-0'
                    />
                    <div className='flex items-center justify-between gap-2 p-4'>
                      <div className='flex flex-row gap-2'>
                        <button>
                          <Plus className='h-4 w-4 text-black' />
                        </button>
                        <button>
                          <Settings2 className='h-4 w-4 text-black' />
                        </button>
                      </div>
                      <div className='flex flex-row gap-2'>
                        <button className='rounded-full border p-1'>
                          <Mic className='h-4 w-4 text-black' />
                        </button>
                        <button className='rounded-full border p-1'>
                          <MoveUp className='h-4 w-4 text-black' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Modules */}
          <div className='lg:col-span-1'>
            <div className='py-8 pr-8'>
              <h3 className='mb-4 text-sm font-semibold'>Modules</h3>
              <div className='space-y-2'>
                {modules.map((module) => (
                  <div
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full rounded-lg border p-2 text-left transition-colors`}
                  >
                    <div className='flex flex-row items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950'></div>
                      <div>
                        <div className='font-medium'>{module.title}</div>
                        <div className='text-muted-foreground text-sm'>
                          {module.label}
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
    </PageContainer>
  );
}
