'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Check,
  Loader2,
  FileSearch,
  Brain,
  BookOpen,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useGenerateLessons } from '@/hooks/use-stream';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface TrainingOutputsStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const outputOptions = [
  { id: 'lessons', label: 'Lessons' },
  { id: 'videos', label: 'Videos' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'slides', label: 'Slides' },
  { id: 'interactive-modules', label: 'Interactive Modules' },
  { id: 'certification', label: 'Certification' }
];

export function TrainingOutputsStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: TrainingOutputsStepProps) {
  const [selectedOutputs, setSelectedOutputs] = useState<string[]>([
    'lessons',
    'quiz'
  ]);
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessages, setStatusMessages] = useState<
    Array<{ type: string; message: string; timestamp: number }>
  >([]);
  const [latestStatus, setLatestStatus] = useState<{
    type: string;
    message: string;
    timestamp: number;
  } | null>(null);
  const router = useRouter();

  const { curriculumData, courseId, uploadedFile, setLessonData } =
    useWorkspaceStore();
  const { generateLessons } = useGenerateLessons();

  const handleOutputToggle = (outputId: string) => {
    let updated;
    if (selectedOutputs.includes(outputId)) {
      updated = selectedOutputs.filter((id) => id !== outputId);
    } else {
      updated = [...selectedOutputs, outputId];
    }
    setSelectedOutputs(updated);
    onUpdate({ selectedOutputs: updated });
  };

  const handleContinue = async () => {
    if (!curriculumData || !courseId || !uploadedFile) {
      toast.error(
        'Missing required data. Please go back and complete previous steps.'
      );
      return;
    }

    setIsGenerating(true);
    setStatusMessages([]);
    setLatestStatus(null);

    // Start lesson generation with streaming
    await generateLessons({
      file: uploadedFile,
      courseId,
      curriculumData,
      onProgress: (status) => {
        if (status.message) {
          const newStatus = {
            type: status.type || 'info',
            message: status.message,
            timestamp: Date.now()
          };

          // Keep only last 3 messages in history
          setStatusMessages((prev) => {
            const updated = [...prev, newStatus];
            return updated.slice(-3);
          });

          // Set as latest for main display
          setLatestStatus(newStatus);
        }
      },
      onComplete: (lessonData) => {
        setLessonData(lessonData);
        setIsGenerating(false);
        setShowModal(true);
      },
      onError: (error) => {
        setIsGenerating(false);
        toast.error(`Failed to generate lessons: ${error.message}`);
      }
    });
  };

  const handleReviewContent = () => {
    setShowModal(false);
    router.push('/dashboard/module');
  };

  return (
    <>
      <div className='max-w-2xl'>
        <div className='space-y-6'>
          <div className='mt-3'>
            <h1 className='text-foreground mb-2 text-2xl font-semibold'>
              Choose Your Training Outputs
            </h1>
            <p className='text-md text-muted-foreground font-medium'>
              Select the content formats required for your program. AI will
              produce each deliverable automatically.
            </p>
          </div>

          <div className='flex flex-wrap gap-3'>
            {outputOptions.map((output) => {
              const isSelected = selectedOutputs.includes(output.id);
              return (
                <button
                  key={output.id}
                  onClick={() => handleOutputToggle(output.id)}
                  className={cn(
                    'rounded-md border px-4 py-2 text-sm font-medium transition-all',
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-foreground'
                  )}
                >
                  {output.label}
                </button>
              );
            })}
          </div>

          {/* Generation Status */}
          {isGenerating && (
            <div className='from-muted/40 via-muted/30 to-muted/20 space-y-5 rounded-xl border bg-linear-to-br p-6 shadow-sm'>
              {/* Header with animated icon */}
              <div className='border-border/50 flex items-center gap-3 border-b pb-4'>
                <div className='relative'>
                  <Sparkles
                    className='text-primary h-6 w-6 animate-spin'
                    style={{ animationDuration: '3s' }}
                  />
                  <div className='bg-primary/30 absolute inset-0 animate-pulse rounded-full blur-xl' />
                </div>
                <div className='flex-1'>
                  <p className='text-foreground text-base font-semibold'>
                    AI Agent Processing
                  </p>
                  <p className='text-muted-foreground mt-0.5 text-xs'>
                    Generating your content in real-time
                  </p>
                </div>
              </div>

              {/* Status Timeline Container */}
              <div className='relative space-y-3'>
                <style jsx>{`
                  @keyframes gentle-in {
                    0% {
                      opacity: 0;
                      transform: scale(0.95) translateY(-10px);
                    }
                    100% {
                      opacity: 1;
                      transform: scale(1) translateY(0);
                    }
                  }

                  @keyframes slide-down {
                    from {
                      transform: translateY(0) scale(1);
                      opacity: 1;
                    }
                    to {
                      transform: translateY(8px) scale(0.96);
                      opacity: 0.7;
                    }
                  }

                  .gentle-animation {
                    animation: gentle-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                  }

                  .push-down {
                    animation: slide-down 0.4s ease-out forwards;
                  }
                `}</style>

                {/* Latest Status - Hero Card */}
                {latestStatus && (
                  <div
                    key={latestStatus.timestamp}
                    className='gentle-animation relative overflow-hidden'
                  >
                    <div className='from-primary/10 via-primary/5 absolute inset-0 rounded-xl bg-linear-to-r to-transparent' />
                    <div className='bg-card/80 border-primary/30 relative flex items-start gap-4 rounded-xl border-2 p-4 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl'>
                      {(() => {
                        const Icon =
                          latestStatus.type === 'pipeline_status'
                            ? Brain
                            : latestStatus.type === 'parser_status'
                              ? FileSearch
                              : latestStatus.type === 'contents_status'
                                ? BookOpen
                                : latestStatus.type === 'course_snapshot'
                                  ? CheckCircle
                                  : Loader2;

                        const iconColor =
                          latestStatus.type === 'contents_status'
                            ? 'text-blue-500'
                            : latestStatus.type === 'pipeline_status'
                              ? 'text-purple-500'
                              : latestStatus.type === 'parser_status'
                                ? 'text-orange-500'
                                : latestStatus.type === 'course_snapshot'
                                  ? 'text-green-500'
                                  : 'text-primary';

                        const shouldSpin = Icon === Loader2;

                        return (
                          <div className='relative'>
                            <div
                              className={cn(
                                'bg-background/50 flex h-10 w-10 items-center justify-center rounded-full border-2',
                                latestStatus.type === 'contents_status' &&
                                  'border-blue-500/30',
                                latestStatus.type === 'pipeline_status' &&
                                  'border-purple-500/30',
                                latestStatus.type === 'parser_status' &&
                                  'border-orange-500/30',
                                latestStatus.type === 'course_snapshot' &&
                                  'border-green-500/30',
                                !latestStatus.type && 'border-primary/30'
                              )}
                            >
                              <Icon
                                className={cn(
                                  'h-5 w-5',
                                  shouldSpin ? 'animate-spin' : 'animate-pulse',
                                  iconColor
                                )}
                              />
                            </div>
                            <div
                              className={cn(
                                'absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full',
                                latestStatus.type === 'contents_status' &&
                                  'bg-blue-500',
                                latestStatus.type === 'pipeline_status' &&
                                  'bg-purple-500',
                                latestStatus.type === 'parser_status' &&
                                  'bg-orange-500',
                                latestStatus.type === 'course_snapshot' &&
                                  'bg-green-500',
                                !latestStatus.type && 'bg-primary'
                              )}
                            />
                          </div>
                        );
                      })()}
                      <div className='min-w-0 flex-1'>
                        <p className='text-foreground text-sm leading-relaxed font-semibold'>
                          {latestStatus.message}
                        </p>
                        <p className='text-muted-foreground mt-1 text-xs'>
                          {new Date(
                            latestStatus.timestamp
                          ).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Previous Statuses Stack - Pushed Down Effect */}
                <div className='space-y-2 pt-2'>
                  {statusMessages
                    .slice(0, -1)
                    .reverse()
                    .map((status, index) => {
                      const Icon =
                        status.type === 'pipeline_status'
                          ? Brain
                          : status.type === 'parser_status'
                            ? FileSearch
                            : status.type === 'contents_status'
                              ? BookOpen
                              : status.type === 'course_snapshot'
                                ? CheckCircle
                                : Loader2;

                      const shouldSpin = Icon === Loader2;
                      const opacity = Math.max(0.4 - index * 0.15, 0.15);
                      const scale = Math.max(0.92 - index * 0.04, 0.85);
                      const blur = index > 0 ? 'blur-[0.5px]' : '';

                      return (
                        <div
                          key={`${status.timestamp}-hist`}
                          className={cn(
                            'push-down transition-all duration-500 ease-out',
                            blur
                          )}
                          style={{
                            opacity,
                            transform: `scale(${scale}) translateY(${index * 6}px)`
                          }}
                        >
                          <div className='bg-muted/40 border-border/30 flex items-center gap-3 rounded-lg border p-2.5'>
                            <div
                              className={cn(
                                'bg-background/30 flex h-6 w-6 items-center justify-center rounded-full',
                                status.type === 'contents_status' &&
                                  'border border-blue-500/20',
                                status.type === 'pipeline_status' &&
                                  'border border-purple-500/20',
                                status.type === 'parser_status' &&
                                  'border border-orange-500/20',
                                status.type === 'course_snapshot' &&
                                  'border border-green-500/20',
                                !status.type && 'border-primary/20 border'
                              )}
                            >
                              <Icon
                                className={cn(
                                  'h-3.5 w-3.5',
                                  shouldSpin && 'animate-spin',
                                  status.type === 'contents_status' &&
                                    'text-blue-400',
                                  status.type === 'pipeline_status' &&
                                    'text-purple-400',
                                  status.type === 'parser_status' &&
                                    'text-orange-400',
                                  status.type === 'course_snapshot' &&
                                    'text-green-400',
                                  !status.type && 'text-primary'
                                )}
                              />
                            </div>
                            <p className='text-muted-foreground flex-1 truncate text-xs'>
                              {status.message}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          <div className='flex flex-col gap-4 pt-8'>
            <Button
              onClick={handleContinue}
              disabled={selectedOutputs.length === 0 || isGenerating}
              className='bg-primary hover:bg-primary/90 px-8'
            >
              {isGenerating ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Generating...
                </>
              ) : (
                'Continue'
              )}
            </Button>
            <Button
              variant='ghost'
              onClick={onBack}
              disabled={isGenerating}
              className='bg-primary/30 hover:bg-primary/40 text-primary px-8'
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className='sm:max-w-2xl'>
          <div className='space-y-6 p-4 lg:p-16'>
            {/* Success Icon */}
            <div className='flex justify-center'>
              <div className='flex items-center justify-center rounded-full bg-green-100 p-2'>
                <div className='rounded-full bg-green-600 p-1'>
                  <Check className='h-12 w-12 text-white' />
                </div>
              </div>
            </div>

            <div className='text-center'>
              <h2 className='text-foreground mb-3 text-2xl font-semibold'>
                Congratulations! Time to Review 🚀
              </h2>
              <p className='text-md text-muted-foreground font-medium'>
                You're all set. Review your selected topics, modules, and output
                types before AI generates your full training package.
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleReviewContent}
              className='bg-primary hover:bg-primary/90 w-full py-6 text-base'
              size='lg'
            >
              Review Content
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
