'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { GripVertical, Plus } from 'lucide-react';

interface SuggestedModulesStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const moduleGroups = [
  {
    title: 'Prior Authorization Fundamentals',
    modules: [
      'Overview of Prior Authorization',
      'Purpose and Importance of PA',
      'Situations Where PA Is Required'
    ]
  },
  {
    title: 'Intake & Triage Workflow',
    modules: [
      'Request Intake Methods',
      'Case Creation and Data Capture',
      'Routing and Prioritization Flow'
    ]
  }
];

export function SuggestedModulesStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: SuggestedModulesStepProps) {
  const handleAddCustomModules = () => {
    // This would open a modal or allow custom module addition
    console.log('Add custom modules');
  };

  return (
    <div className='max-w-3xl'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-foreground mb-2 text-3xl font-bold'>
            Suggested Modules
          </h1>
          <p className='text-muted-foreground'>
            Based on your selected topics, AI has proposed structured modules.
            Confirm or adjust before moving ahead.
          </p>
        </div>

        <div className='space-y-8'>
          {moduleGroups.map((group, groupIndex) => (
            <div key={groupIndex} className='space-y-4'>
              <h2 className='text-foreground text-lg font-semibold'>
                {group.title}
              </h2>

              <div className='space-y-3'>
                {group.modules.map((module, moduleIndex) => (
                  <div
                    key={moduleIndex}
                    className='bg-card hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors'
                  >
                    <div className='flex items-center space-x-3'>
                      <GripVertical className='text-muted-foreground h-4 w-4 cursor-move' />
                      <span className='text-sm font-medium'>{module}</span>
                    </div>

                    <Button
                      variant='outline'
                      size='sm'
                      className='hover:bg-primary border-primary text-primary hover:text-primary-foreground'
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant='outline'
          onClick={handleAddCustomModules}
          className='hover:bg-primary/5 border-primary text-primary w-full border-2 border-dashed'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Custom Modules
        </Button>

        <div className='flex justify-between pt-8'>
          <Button variant='ghost' onClick={onBack} className='px-8'>
            Back
          </Button>
          <Button
            onClick={onNext}
            className='bg-primary hover:bg-primary/90 px-8'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
