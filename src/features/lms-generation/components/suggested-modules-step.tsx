'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { GripVertical, Plus } from 'lucide-react';
import { useState } from 'react';

interface SuggestedModulesStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface ModuleGroup {
  title: string;
  modules: string[];
}

const initialModuleGroups: ModuleGroup[] = [
  {
    title: 'Prior Authorization Fundamentals',
    modules: [
      'Overview of Prior Authorization',
      'Purpose and Importance of PA',
      'Situations Where PA Is Required'
    ]
  },
  {
    title: 'Intake & Triage Workflow',
    modules: [
      'Request Intake Methods',
      'Case Creation and Data Capture',
      'Routing and Prioritization Flow'
    ]
  }
];

export function SuggestedModulesStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: SuggestedModulesStepProps) {
  const [moduleGroups, setModuleGroups] =
    useState<ModuleGroup[]>(initialModuleGroups);
  const [draggedItem, setDraggedItem] = useState<{
    groupIndex: number;
    moduleIndex: number;
  } | null>(null);

  const handleDragStart = (groupIndex: number, moduleIndex: number) => {
    setDraggedItem({ groupIndex, moduleIndex });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetGroupIndex: number, targetModuleIndex: number) => {
    if (!draggedItem) return;

    const newGroups = [...moduleGroups];
    const sourceGroup = newGroups[draggedItem.groupIndex];
    const targetGroup = newGroups[targetGroupIndex];

    // Remove from source
    const [movedModule] = sourceGroup.modules.splice(
      draggedItem.moduleIndex,
      1
    );

    // Add to target
    if (draggedItem.groupIndex === targetGroupIndex) {
      targetGroup.modules.splice(targetModuleIndex, 0, movedModule);
    } else {
      targetGroup.modules.splice(targetModuleIndex, 0, movedModule);
    }

    setModuleGroups(newGroups);
    setDraggedItem(null);
  };

  const handleAddCustomModules = () => {
    console.log('Add custom modules');
  };

  return (
    <div className='max-w-3xl'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-foreground mb-2 text-3xl font-bold'>
            Suggested Modules
          </h1>
          <p className='text-muted-foreground'>
            Based on your selected topics, AI has proposed structured modules.
            Confirm or adjust before moving ahead.
          </p>
        </div>

        <div className='space-y-8'>
          {moduleGroups.map((group, groupIndex) => (
            <div key={groupIndex} className='space-y-4'>
              <h2 className='text-foreground text-base font-semibold'>
                {group.title}
              </h2>

              <div className='space-y-3'>
                {group.modules.map((module, moduleIndex) => (
                  <div
                    key={moduleIndex}
                    draggable
                    onDragStart={() => handleDragStart(groupIndex, moduleIndex)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(groupIndex, moduleIndex)}
                    className='flex items-center justify-between gap-2'
                  >
                    <div className='flex items-center space-x-3'>
                      <GripVertical className='text-muted-foreground h-5 w-5' />
                    </div>
                    <div className='flex w-full cursor-move flex-row items-center justify-between rounded-lg border transition-colors'>
                      <span className='p-2 pr-0 text-sm font-medium'>
                        {module}
                      </span>
                      <div className='border-l p-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='text-primary border-none shadow-none hover:bg-transparent'
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant='link'
          onClick={handleAddCustomModules}
          className='text-primary mb-0 px-0 text-sm font-medium has-[>svg]:px-0'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Custom Modules
        </Button>

        <div className='flex flex-col gap-4 pt-2 pb-8'>
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
