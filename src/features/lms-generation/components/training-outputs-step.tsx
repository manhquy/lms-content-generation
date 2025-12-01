'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Check, CheckCircle, CircleCheck, CircleCheckBig } from 'lucide-react';

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
    'videos'
  ]);
  const [showModal, setShowModal] = useState(false);

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

  const handleContinue = () => {
    setShowModal(true);
  };

  const handleReviewContent = () => {
    setShowModal(false);
    // Navigate to review page or perform action
    console.log('Review content');
  };

  return (
    <>
      <div className='max-w-2xl'>
        <div className='space-y-6'>
          <div>
            <h1 className='text-foreground mb-2 text-3xl font-bold'>
              Choose Your Training Outputs
            </h1>
            <p className='text-muted-foreground'>
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

          <div className='flex flex-col gap-4 pt-8'>
            <Button
              onClick={handleContinue}
              disabled={selectedOutputs.length === 0}
              className='bg-primary hover:bg-primary/90 px-8'
            >
              Continue
            </Button>
            <Button
              variant='ghost'
              onClick={onBack}
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
                  <Check className='h-7 w-7 text-white' />
                </div>
              </div>
            </div>

            <div className='text-center'>
              <h2 className='text-foreground mb-3 text-2xl font-bold'>
                Congratulations! Time to Review 🚀
              </h2>
              <p className='text-muted-foreground'>
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
