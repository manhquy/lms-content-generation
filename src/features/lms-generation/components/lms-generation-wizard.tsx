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
      <div className='space-y-4'>
        {/* Header with greeting and navigation */}
        <div className='space-y-4'>
          <div className='space-y-2'>
            <div className='text-muted-foreground flex items-center text-sm'>
              <span>Good Morning, Amy!</span>
            </div>
            <div className='text-muted-foreground text-sm'>
              Quickly access your recent training, courses and workspaces
            </div>
          </div>

          {/* Step Navigation */}
          <StepNavigation
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        {/* Main Content Area */}
        <div className='flex gap-6'>
          {/* Left Content */}
          <div className='flex-1'>{renderCurrentStep()}</div>

          {/* Right Sidebar - Video Preview */}
          <div className='w-80 space-y-4'>
            <div className='bg-card space-y-4 rounded-lg border p-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-medium'>Simplify</h3>
                <div className='text-muted-foreground flex items-center space-x-2'>
                  <button className='hover:text-foreground text-xs'>−</button>
                  <button className='hover:text-foreground text-xs'>□</button>
                  <button className='hover:text-foreground text-xs'>✕</button>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='text-sm font-medium'>Good Morning, Amy!</div>
                <div className='text-muted-foreground text-xs'>
                  Quickly access your recent training, courses and workspaces
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <div className='text-muted-foreground mb-2 text-xs tracking-wide uppercase'>
                    MODULE 1
                  </div>
                  <div className='mb-1 text-sm font-medium'>
                    Training Module
                  </div>
                </div>

                {/* Video Preview */}
                <div className='bg-muted relative overflow-hidden rounded-lg'>
                  <div className='from-muted to-muted-foreground/20 flex aspect-video items-center justify-center bg-gradient-to-br'>
                    <div className='bg-primary/20 flex h-16 w-16 items-center justify-center rounded-full'>
                      <div className='border-l-primary ml-1 h-0 w-0 border-t-3 border-b-3 border-l-6 border-t-transparent border-b-transparent'></div>
                    </div>
                  </div>

                  <div className='absolute right-2 bottom-2 left-2'>
                    <div className='rounded bg-black/50 px-2 py-1 text-xs text-white'>
                      00:00 / 02:30
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='text-sm font-medium'>Lesson #1</div>
                  <div className='text-muted-foreground text-xs leading-relaxed'>
                    Simplify offers an AI-focused training platform that
                    automatically creates and distributes knowledge into
                    structured courses, videos, and quizzes. It can extract
                    concepts, generate assessments, and personalize learning to
                    support industry-specific training such as Prior
                    Authorization, Claims processing...
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='text-muted-foreground text-xs'>
                    Upgrade your plan
                  </div>

                  <div className='text-muted-foreground space-y-1 text-xs'>
                    <div>Your free plan enables 1-3 days</div>
                    <div>Upgrade your plan and unlock</div>
                    <div>full potential</div>
                  </div>

                  <Button className='w-full text-xs'>See plans</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
