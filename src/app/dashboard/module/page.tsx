'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import ChartIcon from '@/components/ui/icon/chart';
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
import { useModules, useResources } from '@/hooks/use-lms';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const searchParams = useSearchParams();
  const courseId = searchParams.get('course_id') || '';

  const [activeModuleId, setActiveModuleId] = useState<string>('');
  const [activeTab, setActiveTab] = useState('lessons');
  const [selectedPerson, setSelectedPerson] = useState('Amy Smith');
  const [selectedTone, setSelectedTone] = useState('Positive');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showRewriteMenu, setShowRewriteMenu] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const { data: user } = useGetMe();

  // Fetch modules for the course
  const { data: modules, isLoading: modulesLoading } = useModules(courseId);

  // Fetch lesson resources for active module
  const { data: lessonResources, isLoading: lessonLoading } = useResources(
    activeModuleId,
    'lesson'
  );

  // Fetch quiz resources for active module (only when quizzes tab is active)
  const { data: quizResources, isLoading: quizzesLoading } = useResources(
    activeModuleId && activeTab === 'quizzes' ? activeModuleId : '',
    'quizzes'
  );

  // Set first module as active when modules load
  useEffect(() => {
    if (modules && modules.length > 0 && !activeModuleId) {
      setActiveModuleId(modules[0].id);
    }
  }, [modules, activeModuleId]);

  const activeModule = modules?.find((m) => m.id === activeModuleId);

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
              {activeModule && (
                <>
                  <p className='text-primary text-xs font-bold uppercase'>
                    MODULE{' '}
                    {(modules?.findIndex((m) => m.id === activeModuleId) ??
                      -1) + 1}
                  </p>
                  <h2 className='text-2xl font-semibold'>
                    {activeModule.name}
                  </h2>
                </>
              )}
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
                  value='quizzes'
                  className='data-[state=active]:border-b-primary gap-2 rounded-none border-b-2 border-transparent p-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
                  style={{ flex: '0 0 auto' }}
                >
                  <IconFileText className='h-4 w-4 shrink-0' />
                  Quizzes
                </TabsTrigger>

                {/* Video and Audio tabs temporarily hidden */}
              </TabsList>

              {/* Lessons Tab */}
              <TabsContent value='lessons' className='mt-4'>
                {lessonLoading ? (
                  <div className='space-y-4'>
                    <Skeleton className='h-8 w-3/4' />
                    <Skeleton className='h-32 w-full' />
                    <Skeleton className='h-32 w-full' />
                  </div>
                ) : (
                  <div className='space-y-6'>
                    {/* Lesson Content */}
                    {lessonResources && lessonResources.length > 0 ? (
                      <div>
                        <h3 className='mb-4 text-xl font-semibold'>
                          {lessonResources[0].name}
                        </h3>
                        <div className='text-foreground content-markdown prose prose-sm max-w-none'>
                          <ReactMarkdown>
                            {lessonResources[0].resource_data?.content || ''}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      <div className='text-muted-foreground py-12 text-center'>
                        No lesson content available
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              {/* Quizzes Tab */}
              <TabsContent value='quizzes' className='mt-4'>
                {quizzesLoading ? (
                  <div className='space-y-4'>
                    <Skeleton className='h-32 w-full' />
                    <Skeleton className='h-32 w-full' />
                    <Skeleton className='h-32 w-full' />
                  </div>
                ) : quizResources && quizResources.length > 0 ? (
                  <div className='space-y-6'>
                    {quizResources.map((quiz, idx) => (
                      <div key={quiz.id} className='rounded-lg border p-6'>
                        <h4 className='mb-4 text-lg font-semibold'>
                          Question {idx + 1}
                        </h4>
                        <p className='mb-4 text-base font-medium'>
                          {quiz.resource_data?.question}
                        </p>
                        <div className='space-y-3'>
                          <p className='text-muted-foreground text-sm font-semibold'>
                            Options:
                          </p>
                          {quiz.resource_data?.options?.map(
                            (option: string, optIdx: number) => {
                              const isCorrectAnswer =
                                option === quiz.resource_data?.answer;
                              return (
                                <div
                                  key={optIdx}
                                  className={`rounded-md border p-3 ${
                                    isCorrectAnswer
                                      ? 'border-green-500 bg-green-50 dark:border-green-600 dark:bg-green-950'
                                      : ''
                                  }`}
                                >
                                  <div className='flex items-start gap-3'>
                                    <span className='text-sm font-medium'>
                                      {String.fromCharCode(65 + optIdx)}.
                                    </span>
                                    <span className='flex-1 text-sm'>
                                      {option}
                                    </span>
                                    {isCorrectAnswer && (
                                      <Badge
                                        variant='default'
                                        className='bg-green-600 text-white'
                                      >
                                        Correct Answer
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-muted-foreground py-12 text-center'>
                    No quiz questions available
                  </div>
                )}
              </TabsContent>

              {/* Video Tab - Hidden */}
              <TabsContent
                value='video'
                className='mt-6'
                style={{ display: 'none' }}
              >
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
                        <div className='shrink-0'>
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

              {/* Audio Tab - Hidden */}
              <TabsContent
                value='audio'
                className='mt-6'
                style={{ display: 'none' }}
              >
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
                        <p className='text-primary shrink-0 text-sm font-semibold'>
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
              {modulesLoading ? (
                <div className='space-y-2'>
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className='h-16 w-full' />
                  ))}
                </div>
              ) : (
                <div className='space-y-2'>
                  {modules?.map((module, index) => (
                    <div
                      key={module.id}
                      onClick={() => setActiveModuleId(module.id)}
                      className={`hover:bg-muted w-full cursor-pointer rounded-lg border p-2 text-left transition-colors ${
                        activeModuleId === module.id
                          ? 'bg-muted border-primary'
                          : ''
                      }`}
                    >
                      <div className='flex flex-row items-center gap-3'>
                        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950'></div>
                        <div>
                          <div className='font-medium'>{module.name}</div>
                          <div className='text-muted-foreground text-sm'>
                            Module {index + 1}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
