'use client';

import { cn } from '@/lib/utils';
import { WizardStep } from './lms-generation-wizard';

interface Step {
  id: WizardStep;
  label: string;
  number: number;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: WizardStep;
  onStepClick: (step: WizardStep) => void;
}

export function StepNavigation({
  steps,
  currentStep,
  onStepClick
}: StepNavigationProps) {
  const getCurrentStepNumber = () => {
    const step = steps.find((s) => s.id === currentStep);
    return step?.number || 1;
  };

  const isStepCompleted = (stepNumber: number) => {
    return getCurrentStepNumber() > stepNumber;
  };

  const isStepActive = (stepId: WizardStep) => {
    return currentStep === stepId;
  };

  return (
    <div className='mt-6'>
      <div className='flex items-center space-x-4'>
        {steps.map((step, index) => (
          <div key={step.id} className='flex items-center'>
            <button
              onClick={() => onStepClick(step.id)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                isStepActive(step.id)
                  ? 'bg-primary text-primary-foreground'
                  : isStepCompleted(step.number)
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground border-muted border-2'
              )}
            >
              {isStepCompleted(step.number) ? (
                <svg
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              ) : (
                step.number
              )}
            </button>

            <span
              className={cn(
                'ml-2 text-sm font-medium',
                isStepActive(step.id) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>

            {index < steps.length - 1 && (
              <div className='bg-muted mx-4 h-px w-8' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
