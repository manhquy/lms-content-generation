'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { FormData } from './lms-generation-wizard';
import { Plus, X } from 'lucide-react';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [customTopics, setCustomTopics] = useState<string[]>([]);

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
    setIsDialogOpen(true);
  };

  const handleAddNewTopic = () => {
    if (newTopic.trim() && !customTopics.includes(newTopic.trim())) {
      const updatedCustomTopics = [...customTopics, newTopic.trim()];
      setCustomTopics(updatedCustomTopics);
      setNewTopic('');
    }
  };

  const handleRemoveCustomTopic = (topicToRemove: string) => {
    const updatedCustomTopics = customTopics.filter((t) => t !== topicToRemove);
    setCustomTopics(updatedCustomTopics);
    // Also remove from selected topics if it was selected
    const updatedSelectedTopics = formData.selectedTopics.filter(
      (t) => t !== topicToRemove
    );
    onUpdate({ selectedTopics: updatedSelectedTopics });
  };

  const handleSaveCustomTopics = () => {
    // Automatically select all newly added custom topics
    const newlyAddedTopics = customTopics.filter(
      (topic) => !formData.selectedTopics.includes(topic)
    );
    const updatedSelectedTopics = [
      ...formData.selectedTopics,
      ...newlyAddedTopics
    ];
    onUpdate({ selectedTopics: updatedSelectedTopics });
    setIsDialogOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNewTopic();
    }
  };

  // Combine default topics with custom topics
  const allTopics = [...topics, ...customTopics];

  return (
    <div className='max-w-2xl'>
      <div className='space-y-6'>
        <div className='mt-3'>
          <h1 className='text-foreground mb-2 text-2xl font-semibold'>
            Suggested Topics
          </h1>
          <p className='text-foreground text-md font-medium'>
            Here are the topics AI found in your document. Add or adjust before
            moving forward.
          </p>
        </div>

        <div className='flex flex-wrap gap-3'>
          {allTopics.map((topic) => {
            const isSelected = formData.selectedTopics.includes(topic);
            const isCustom = customTopics.includes(topic);
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
                {isCustom && (
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveCustomTopic(topic);
                    }}
                    className='hover:bg-destructive/20 ml-1 rounded-full p-0.5 transition-colors'
                  >
                    <X className='text-destructive size-3' />
                  </button>
                )}
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

      {/* Add Topics Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Add Custom Topics</DialogTitle>
            <DialogDescription>
              Add your own custom topics to the list. Press Enter or click Add
              to add each topic.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='flex gap-2'>
              <Input
                placeholder='Enter topic name...'
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyPress={handleKeyPress}
                className='flex-1'
              />
              <Button
                type='button'
                onClick={handleAddNewTopic}
                disabled={!newTopic.trim()}
                className='bg-primary hover:bg-primary/90'
              >
                <Plus className='mr-1 size-4' />
                Add
              </Button>
            </div>

            {customTopics.length > 0 && (
              <div className='space-y-2'>
                <h4 className='text-sm font-medium'>Custom Topics:</h4>
                <div className='flex flex-wrap gap-2'>
                  {customTopics.map((topic) => (
                    <div
                      key={topic}
                      className='border-primary bg-primary/10 flex items-center gap-2 rounded-full border px-3 py-1.5'
                    >
                      <span className='text-sm'>{topic}</span>
                      <button
                        type='button'
                        onClick={() => handleRemoveCustomTopic(topic)}
                        className='hover:bg-destructive/20 rounded-full p-0.5 transition-colors'
                      >
                        <X className='text-destructive size-3' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type='button'
              onClick={handleSaveCustomTopics}
              className='bg-primary hover:bg-primary/90'
            >
              Save Topics
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
