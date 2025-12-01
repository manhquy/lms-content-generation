'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormData } from './lms-generation-wizard';
import { Plus } from 'lucide-react';

interface SuggestedTopicsStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const topics = [
  'Prior Authorization Fundamentals',
  'Intake & Triage Workflow',
  'Provider Submissions',
  'Clinical Documentation',
  'Submission Rules',
  'Approvals',
  'Denial Management',
  'Appeals',
  'Compliance',
  'HIPAA Requirements'
];

export function SuggestedTopicsStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: SuggestedTopicsStepProps) {
  const handleTopicToggle = (topic: string, checked: boolean) => {
    let updatedTopics;
    if (checked) {
      updatedTopics = [...formData.selectedTopics, topic];
    } else {
      updatedTopics = formData.selectedTopics.filter((t) => t !== topic);
    }
    onUpdate({ selectedTopics: updatedTopics });
  };

  const handleAddTopics = () => {
    // This would open a modal or allow custom topic addition
    console.log('Add custom topics');
  };

  return (
    <div className='max-w-2xl'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-foreground mb-2 text-3xl font-bold'>
            Suggested Topics
          </h1>
          <p className='text-muted-foreground'>
            Here are the topics AI found in your document. Add or adjust before
            moving forward.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {topics.map((topic) => {
            const isSelected = formData.selectedTopics.includes(topic);
            return (
              <label
                key={topic}
                className='hover:bg-muted/50 flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors'
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    handleTopicToggle(topic, checked === true)
                  }
                  className='data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500'
                />
                <span className='text-sm font-medium'>{topic}</span>
              </label>
            );
          })}
        </div>

        <Button
          variant='outline'
          onClick={handleAddTopics}
          className='hover:bg-primary/5 border-primary text-primary w-full border-2 border-dashed'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Topics
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
