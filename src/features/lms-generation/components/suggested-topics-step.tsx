'use client';

import { useState, useEffect } from 'react';
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
import { useWorkspaceStore } from '@/stores/workspace-store';

interface SuggestedTopicsStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SuggestedTopicsStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: SuggestedTopicsStepProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [customTopics, setCustomTopics] = useState<string[]>([]); // Only user-added topics
  const [customTopicIds, setCustomTopicIds] = useState<Set<string>>(new Set()); // Track which topics are custom
  const { curriculumData, setCurriculumData } = useWorkspaceStore();

  // Extract only topics from curriculum data
  const extractedTopics =
    curriculumData?.topics.map((topic) => topic.title) || [];

  // Auto-select all extracted topics on mount or when curriculum data changes
  useEffect(() => {
    if (extractedTopics.length > 0 && formData.selectedTopics.length === 0) {
      console.log('Auto-selecting topics:', extractedTopics);
      onUpdate({ selectedTopics: extractedTopics });
    }
  }, [curriculumData, extractedTopics.length]);

  const handleTopicToggle = (topic: string, checked: boolean) => {
    let updatedTopics;
    if (checked) {
      updatedTopics = [...formData.selectedTopics, topic];
    } else {
      updatedTopics = formData.selectedTopics.filter((t) => t !== topic);
    }
    onUpdate({ selectedTopics: updatedTopics });
  };

  // Combine extracted topics with custom topics, removing duplicates
  const allTopics = Array.from(new Set([...extractedTopics, ...customTopics]));

  const handleAddTopics = () => {
    setIsDialogOpen(true);
  };

  const handleAddNewTopic = () => {
    const trimmedTopic = newTopic.trim();
    // Check against allTopics to prevent duplicates
    if (trimmedTopic && !allTopics.includes(trimmedTopic)) {
      const updatedCustomTopics = [...customTopics, trimmedTopic];
      setCustomTopics(updatedCustomTopics);
      const newIds = new Set(customTopicIds);
      newIds.add(trimmedTopic);
      setCustomTopicIds(newIds);
      setNewTopic('');
    }
  };

  const handleRemoveCustomTopic = (topicToRemove: string) => {
    // Only allow removing custom topics
    if (customTopicIds.has(topicToRemove)) {
      const updatedCustomTopics = customTopics.filter(
        (t) => t !== topicToRemove
      );
      setCustomTopics(updatedCustomTopics);

      const newCustomTopicIds = new Set(customTopicIds);
      newCustomTopicIds.delete(topicToRemove);
      setCustomTopicIds(newCustomTopicIds);

      // Also remove from selected topics if it was selected
      const updatedSelectedTopics = formData.selectedTopics.filter(
        (t) => t !== topicToRemove
      );
      onUpdate({ selectedTopics: updatedSelectedTopics });

      // Remove from curriculumData if it exists there
      if (curriculumData) {
        const updatedCurriculumData = {
          ...curriculumData,
          topics: curriculumData.topics.filter(
            (topic) => topic.title !== topicToRemove
          )
        };
        setCurriculumData(updatedCurriculumData);
      }
    }
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

    // Update curriculumData to include custom topics (only if not already there)
    if (curriculumData && newlyAddedTopics.length > 0) {
      const existingTitles = new Set(curriculumData.topics.map((t) => t.title));
      const topicsToAdd = newlyAddedTopics.filter(
        (topic) => !existingTitles.has(topic)
      );

      if (topicsToAdd.length > 0) {
        const updatedCurriculumData = {
          ...curriculumData,
          topics: [
            ...curriculumData.topics,
            ...topicsToAdd.map((topic) => ({
              title: topic,
              modules: [] // Empty modules array for custom topics
            }))
          ]
        };
        setCurriculumData(updatedCurriculumData);
      }
    }

    setIsDialogOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNewTopic();
    }
  };

  return (
    <div className='max-w-2xl'>
      <div className='space-y-6'>
        <div className='mt-3'>
          <h1 className='text-foreground mb-2 text-2xl font-semibold'>
            Suggested Topics
          </h1>
          <p className='text-foreground text-md font-medium'>
            {extractedTopics.length > 0
              ? `AI found ${extractedTopics.length} topic${extractedTopics.length > 1 ? 's' : ''} in your document. Add or adjust before moving forward.`
              : 'Here are the topics AI found in your document. Add or adjust before moving forward.'}
          </p>
        </div>

        <div className='flex flex-wrap gap-3'>
          {allTopics.map((topic, index) => {
            const isSelected = formData.selectedTopics.includes(topic);
            const isCustomTopic = customTopicIds.has(topic);
            return (
              <label
                key={`${topic}-${index}`}
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
                {/* Only show remove button for custom topics */}
                {isCustomTopic && (
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
                <h4 className='text-sm font-medium'>Your Custom Topics:</h4>
                <div className='flex flex-wrap gap-2'>
                  {customTopics.map((topic) => (
                    <div
                      key={topic}
                      className='bg-primary/10 border-primary flex items-center gap-2 rounded-full border px-3 py-1.5'
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
