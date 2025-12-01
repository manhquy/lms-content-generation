'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TrainingOutputsStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const outputOptions = [
  {
    id: 'lessons',
    label: 'Lessons',
    description: 'Interactive learning content'
  },
  {
    id: 'videos',
    label: 'Videos',
    description: 'Video-based training materials'
  },
  {
    id: 'quiz',
    label: 'Quiz',
    description: 'Assessment and testing'
  },
  {
    id: 'slides',
    label: 'Slides',
    description: 'Presentation materials'
  },
  {
    id: 'interactive-modules',
    label: 'Interactive Modules',
    description: 'Engaging interactive content'
  },
  {
    id: 'certification',
    label: 'Certification',
    description: 'Certification programs'
  }
];

export function TrainingOutputsStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: TrainingOutputsStepProps) {
  const [selectedOutputs, setSelectedOutputs] = useState<string[]>([
    'lessons',
    'videos',
    'quiz',
    'slides',
    'interactive-modules',
    'certification'
  ]);

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

  return (
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

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          {outputOptions.map((output) => {
            const isSelected = selectedOutputs.includes(output.id);
            return (
              <button
                key={output.id}
                onClick={() => handleOutputToggle(output.id)}
                className={cn(
                  'rounded-lg border-2 p-4 text-left transition-all',
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-muted hover:border-muted-foreground/50'
                )}
              >
                <div className='mb-1 text-sm font-medium'>{output.label}</div>
                <div
                  className={cn(
                    'text-xs',
                    isSelected ? 'text-primary/70' : 'text-muted-foreground'
                  )}
                >
                  {output.description}
                </div>
              </button>
            );
          })}
        </div>

        <div className='flex justify-between pt-8'>
          <Button variant='ghost' onClick={onBack} className='px-8'>
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={selectedOutputs.length === 0}
            className='bg-primary hover:bg-primary/90 px-8'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
