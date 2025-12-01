'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FormData } from './lms-generation-wizard';

interface TrainingTopicStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TrainingTopicStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: TrainingTopicStepProps) {
  const handleTrainingTopicChange = (value: string) => {
    onUpdate({ trainingTopic: value });
  };

  const handleWorkspaceChange = (value: string) => {
    onUpdate({ workspace: value });
  };

  const isValid = formData.trainingTopic.trim().length > 0;

  return (
    <div className='max-w-2xl'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-foreground mb-2 text-3xl font-bold'>
            Training Topic
          </h1>
          <p className='text-muted-foreground'>
            Specify the training focus so AI can organize your materials and
            generate aligned content.
          </p>
        </div>

        <div className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='training-topic' className='text-base font-medium'>
              Training Topic
            </Label>
            <Input
              id='training-topic'
              placeholder='Prior Authorization Fundamentals'
              value={formData.trainingTopic}
              onChange={(e) => handleTrainingTopicChange(e.target.value)}
              className='w-full'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='workspace' className='text-base font-medium'>
              Workspace
            </Label>
            <Select
              value={formData.workspace}
              onValueChange={handleWorkspaceChange}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select workspace' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Prior Auth'>Prior Auth</SelectItem>
                <SelectItem value='Claims'>Claims</SelectItem>
                <SelectItem value='Brokers'>Brokers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex justify-between pt-8'>
          <Button
            variant='ghost'
            onClick={onBack}
            disabled={true}
            className='px-8'
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!isValid}
            className='bg-primary hover:bg-primary/90 px-8'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
