'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { GripVertical, Plus, X } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    groupIndex: number;
    moduleIndex: number;
    value: string;
  }>({ open: false, groupIndex: -1, moduleIndex: -1, value: '' });
  const [addDialog, setAddDialog] = useState<{
    open: boolean;
    groupTitle: string;
    moduleName: string;
  }>({ open: false, groupTitle: '', moduleName: '' });

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

  const handleEditModule = (groupIndex: number, moduleIndex: number) => {
    const module = moduleGroups[groupIndex].modules[moduleIndex];
    setEditDialog({
      open: true,
      groupIndex,
      moduleIndex,
      value: module
    });
  };

  const handleSaveEdit = () => {
    if (editDialog.groupIndex === -1 || editDialog.moduleIndex === -1) return;

    const newGroups = [...moduleGroups];
    newGroups[editDialog.groupIndex].modules[editDialog.moduleIndex] =
      editDialog.value;
    setModuleGroups(newGroups);
    setEditDialog({ open: false, groupIndex: -1, moduleIndex: -1, value: '' });
  };

  const handleDeleteModule = (groupIndex: number, moduleIndex: number) => {
    const newGroups = [...moduleGroups];
    newGroups[groupIndex].modules.splice(moduleIndex, 1);

    // Remove group if it has no modules
    if (newGroups[groupIndex].modules.length === 0) {
      newGroups.splice(groupIndex, 1);
    }

    setModuleGroups(newGroups);
  };

  const handleAddCustomModules = () => {
    setAddDialog({ open: true, groupTitle: '', moduleName: '' });
  };

  const handleSaveCustomModule = () => {
    if (!addDialog.groupTitle.trim() || !addDialog.moduleName.trim()) return;

    const newGroups = [...moduleGroups];
    const existingGroupIndex = newGroups.findIndex(
      (g) => g.title.toLowerCase() === addDialog.groupTitle.toLowerCase()
    );

    if (existingGroupIndex !== -1) {
      // Add to existing group
      newGroups[existingGroupIndex].modules.push(addDialog.moduleName);
    } else {
      // Create new group
      newGroups.push({
        title: addDialog.groupTitle,
        modules: [addDialog.moduleName]
      });
    }

    setModuleGroups(newGroups);
    setAddDialog({ open: false, groupTitle: '', moduleName: '' });
  };

  return (
    <div className='max-w-3xl'>
      <div className='space-y-6'>
        <div className='mt-3'>
          <h1 className='text-foreground mb-2 text-2xl font-semibold'>
            Suggested Modules
          </h1>
          <p className='text-muted-foreground text-md font-medium'>
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
                      <div className='flex items-center border-l'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            handleEditModule(groupIndex, moduleIndex)
                          }
                          className='text-primary border-none pr-0 shadow-none hover:bg-transparent'
                        >
                          Edit
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() =>
                            handleDeleteModule(groupIndex, moduleIndex)
                          }
                          className='text-destructive hover:text-destructive h-8 w-8 p-0'
                        >
                          <X className='h-4 w-4' />
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

      {/* Edit Module Dialog */}
      <Dialog
        open={editDialog.open}
        onOpenChange={(open) =>
          !open &&
          setEditDialog({
            open: false,
            groupIndex: -1,
            moduleIndex: -1,
            value: ''
          })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
            <DialogDescription>Update the module name below.</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='module-name'>Module Name</Label>
              <Input
                id='module-name'
                value={editDialog.value}
                onChange={(e) =>
                  setEditDialog({ ...editDialog, value: e.target.value })
                }
                placeholder='Enter module name'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() =>
                setEditDialog({
                  open: false,
                  groupIndex: -1,
                  moduleIndex: -1,
                  value: ''
                })
              }
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Custom Module Dialog */}
      <Dialog
        open={addDialog.open}
        onOpenChange={(open) =>
          !open && setAddDialog({ open: false, groupTitle: '', moduleName: '' })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Module</DialogTitle>
            <DialogDescription>
              Create a new module or add to an existing group.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='group-title'>Group Title</Label>
              <Input
                id='group-title'
                value={addDialog.groupTitle}
                onChange={(e) =>
                  setAddDialog({ ...addDialog, groupTitle: e.target.value })
                }
                placeholder='Enter group title (new or existing)'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='new-module-name'>Module Name</Label>
              <Input
                id='new-module-name'
                value={addDialog.moduleName}
                onChange={(e) =>
                  setAddDialog({ ...addDialog, moduleName: e.target.value })
                }
                placeholder='Enter module name'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() =>
                setAddDialog({ open: false, groupTitle: '', moduleName: '' })
              }
            >
              Cancel
            </Button>
            <Button onClick={handleSaveCustomModule}>Add Module</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
