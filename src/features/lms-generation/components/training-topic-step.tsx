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
import { useWorkspaces, useCreateCourse } from '@/hooks/use-lms';
import { useGetMe } from '@/features/auth/hooks/useAuth';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

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
  const { data: user } = useGetMe();
  const { data: workspaces, isLoading: isLoadingWorkspaces } = useWorkspaces(
    user?.id || ''
  );
  const { mutate: createCourse, isPending: isCreatingCourse } =
    useCreateCourse();
  const { selectedWorkspaceId, setSelectedWorkspaceId, setCourseId } =
    useWorkspaceStore();

  const handleTrainingTopicChange = (value: string) => {
    onUpdate({ trainingTopic: value });
  };

  const handleWorkspaceChange = (value: string) => {
    setSelectedWorkspaceId(value);
    onUpdate({ workspace: value });
  };

  const handleContinue = () => {
    if (!selectedWorkspaceId || !user?.id) return;

    // Create course before moving to next step
    createCourse(
      {
        name: formData.trainingTopic,
        description: `Training course for ${formData.trainingTopic}`,
        workspace_id: selectedWorkspaceId,
        user_id: user.id
      },
      {
        onSuccess: (course) => {
          setCourseId(course.id);
          onNext();
        }
      }
    );
  };

  const isValid =
    formData.trainingTopic.trim().length > 0 && !!selectedWorkspaceId;

  return (
    <div className='max-w-2xl'>
      <div className='space-y-6'>
        <div className='mt-3'>
          <h1 className='mb-2 text-2xl font-semibold'>Training Topic</h1>
          <p className='text-md font-medium'>
            Specify the training focus so AI can organize your materials and
            generate aligned content.
          </p>
        </div>

        <div className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='training-topic' className='text-sm font-medium'>
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
            <Label htmlFor='workspace' className='text-sm font-medium'>
              Workspace
            </Label>
            <Select
              value={selectedWorkspaceId || undefined}
              onValueChange={handleWorkspaceChange}
              disabled={isLoadingWorkspaces}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select workspace' />
              </SelectTrigger>
              <SelectContent>
                {isLoadingWorkspaces ? (
                  <SelectItem value='loading' disabled>
                    Loading workspaces...
                  </SelectItem>
                ) : workspaces && workspaces.length > 0 ? (
                  workspaces.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value='none' disabled>
                    No workspaces available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col justify-between gap-4 pt-8'>
          <Button
            onClick={handleContinue}
            disabled={!isValid || isCreatingCourse}
            className='bg-primary hover:bg-primary/90 px-8 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isCreatingCourse ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Creating Course...
              </>
            ) : (
              'Continue'
            )}
          </Button>
          <Button
            variant='ghost'
            onClick={onBack}
            disabled={isCreatingCourse}
            className='bg-primary/30 hover:bg-primary/40 text-primary px-8'
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
