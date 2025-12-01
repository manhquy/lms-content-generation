'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, FileText } from 'lucide-react';

interface UploadFilesStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function UploadFilesStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: UploadFilesStepProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      addFiles(files);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const updatedFiles = [...formData.uploadedFiles, ...newFiles];
    onUpdate({ uploadedFiles: updatedFiles });
  };

  const removeFile = (index: number) => {
    const updatedFiles = formData.uploadedFiles.filter((_, i) => i !== index);
    onUpdate({ uploadedFiles: updatedFiles });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className='max-w-2xl'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-foreground mb-2 text-3xl font-bold'>
            Upload Files
          </h1>
          <p className='text-muted-foreground'>
            Add documents, PDFs, slides, or notes. AI will analyze them to
            create structured training content.
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'rounded-lg border-2 border-dashed p-12 text-center transition-colors',
            isDragOver
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25'
          )}
        >
          <div className='flex flex-col items-center space-y-4'>
            <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full'>
              <Upload className='text-primary h-6 w-6' />
            </div>

            <div className='space-y-2'>
              <p className='text-base font-medium'>Drag your file(s) here</p>
              <p className='text-muted-foreground text-sm'>OR</p>
              <Button
                variant='outline'
                onClick={handleUploadClick}
                className='mt-2'
              >
                Upload
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type='file'
            multiple
            onChange={handleFileInput}
            className='hidden'
            accept='.pdf,.doc,.docx,.ppt,.pptx,.txt,.zip'
          />
        </div>

        {/* Uploaded Files List */}
        {formData.uploadedFiles.length > 0 && (
          <div className='space-y-3'>
            <h3 className='text-sm font-medium'>Uploaded Files</h3>
            <div className='space-y-2'>
              {formData.uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className='bg-muted/50 flex items-center justify-between rounded-lg p-3'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded bg-orange-100'>
                      <FileText className='h-4 w-4 text-orange-600' />
                    </div>
                    <div>
                      <p className='text-sm font-medium'>{file.name}</p>
                      <p className='text-muted-foreground text-xs'>
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => removeFile(index)}
                    className='text-muted-foreground hover:text-foreground'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='flex justify-between pt-8'>
          <Button variant='ghost' onClick={onBack} className='px-8'>
            Back
          </Button>
          <Button
            onClick={onNext}
            className='bg-primary hover:bg-primary/90 px-8'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
