'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { CheckCircle } from 'lucide-react';

interface CompletionStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CompletionStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: CompletionStepProps) {
  const handleReviewContent = () => {
    // This would navigate to a review page or open a modal
    console.log('Review content');
  };

  const handleContinue = () => {
    // This would start the generation process
    console.log('Start generation process');
  };

  return (
    <div className='max-w-2xl'>
      <div className='space-y-8 text-center'>
        {/* Success Icon */}
        <div className='flex justify-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
            <CheckCircle className='h-12 w-12 text-green-600' />
          </div>
        </div>

        <div>
          <h1 className='text-foreground mb-4 text-2xl font-semibold'>
            Congratulations! Time to Review 🚀
          </h1>
          <p className='text-muted-foreground text-md font-medium'>
            You're all set. Review your selected topics, modules, and output
            types before AI generates your full training package.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='space-y-4'>
          <Button
            onClick={handleReviewContent}
            className='bg-primary hover:bg-primary/90 w-full py-4 text-base'
            size='lg'
          >
            Review Content
          </Button>

          <div className='flex justify-between'>
            <Button variant='ghost' onClick={onBack} className='px-8'>
              Back
            </Button>
            <Button onClick={handleContinue} variant='outline' className='px-8'>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
