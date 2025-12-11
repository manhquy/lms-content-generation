'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import { TrainingTopicStep } from './training-topic-step';
import { UploadFilesStep } from './upload-files-step';
import { SuggestedTopicsStep } from './suggested-topics-step';
import { SuggestedModulesStep } from './suggested-modules-step';
import { TrainingOutputsStep } from './training-outputs-step';
import { CompletionStep } from './completion-step';
import { StepNavigation } from './step-navigation';
import LikeIcon from '@/components/ui/icon/like';
import Image from 'next/image';
import { useGetMe } from '@/features/auth/hooks/useAuth';
import { getGreeting } from '@/lib/utils';

export type WizardStep =
  | 'topic'
  | 'upload'
  | 'suggested-topics'
  | 'suggested-modules'
  | 'training-outputs'
  | 'completion';

export interface FormData {
  trainingTopic: string;
  workspace: string;
  uploadedFiles: File[];
  selectedTopics: string[];
  selectedModules: string[];
  selectedOutputs: string[];
}

export function LmsGenerationWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('topic');
  const [formData, setFormData] = useState<FormData>({
    trainingTopic: '',
    workspace: 'Prior Auth',
    uploadedFiles: [],
    selectedTopics: [],
    selectedModules: [],
    selectedOutputs: []
  });
  const { data: user } = useGetMe();

  const steps: { id: WizardStep; label: string; number: number }[] = [
    { id: 'topic', label: 'Topic', number: 1 },
    { id: 'upload', label: 'Upload', number: 2 },
    { id: 'suggested-topics', label: 'Topics', number: 3 },
    { id: 'suggested-modules', label: 'Module', number: 4 }
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    } else if (currentStep === 'suggested-modules') {
      setCurrentStep('training-outputs');
    } else if (currentStep === 'training-outputs') {
      setCurrentStep('completion');
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    } else if (currentStep === 'training-outputs') {
      setCurrentStep('suggested-modules');
    } else if (currentStep === 'completion') {
      setCurrentStep('training-outputs');
    }
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'topic':
        return (
          <TrainingTopicStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'upload':
        return (
          <UploadFilesStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'suggested-topics':
        return (
          <SuggestedTopicsStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'suggested-modules':
        return (
          <SuggestedModulesStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'training-outputs':
        return (
          <TrainingOutputsStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'completion':
        return (
          <CompletionStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={() => {}}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <div className='w-full space-y-4'>
        {/* Header with greeting and navigation */}
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
        <div className='mx-8 flex w-full flex-row justify-between'>
          <div className='flex flex-col gap-6'>
            {/* Step Navigation */}
            <StepNavigation
              steps={steps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
            <div className='flex-1'>{renderCurrentStep()}</div>
          </div>
          {/* Right Sidebar - Video Preview */}
          <div className='h-[790px]'>
            <img
              src='/preview.png'
              alt=''
              className='h-[790px] object-cover object-left'
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
