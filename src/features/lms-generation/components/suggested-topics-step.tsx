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

        <div className='flex flex-wrap gap-3'>
          {topics.map((topic) => {
            const isSelected = formData.selectedTopics.includes(topic);
            return (
              <label
                key={topic}
                className='hover:bg-muted/50 border-primary flex cursor-pointer items-center space-x-2 rounded-full border px-4 py-2 transition-colors'
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    handleTopicToggle(topic, checked === true)
                  }
                  className='h-4 w-4 rounded-full border border-gray-300 transition-colors data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500'
                />
                <span className='text-sm font-medium'>{topic}</span>
              </label>
            );
          })}

          <Button
            variant='outline'
            onClick={handleAddTopics}
            className='bg-primary/10 hover:bg-primary/5 border-primary text-primary rounded-full border px-4 py-2'
          >
            <div className='bg-primary rounded-full border p-1'>
              <Plus className='size-2.5 text-white' />
            </div>
            Add Topics
          </Button>
        </div>

        <div className='flex flex-col gap-4 pt-8'>
          <Button
            onClick={onNext}
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
  );
}
