'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, FileText, Pause } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { useExtractFile } from '@/hooks/use-lms';
import { useWorkspaceStore } from '@/stores/workspace-store';

interface UploadFilesStepProps {
  formData: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface UploadingFile {
  file: File;
  progress: number;
  isPaused: boolean;
}

export function UploadFilesStep({
  formData,
  onUpdate,
  onNext,
  onBack
}: UploadFilesStepProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isExtractingFile, setIsExtractingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addExtractedData } = useWorkspaceStore();

  const { mutate: extractFile, isPending: isExtracting } = useExtractFile();

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
    // Simulate upload progress for each file
    newFiles.forEach((file) => {
      const uploadingFile: UploadingFile = {
        file,
        progress: 0,
        isPaused: false
      };

      setUploadingFiles((prev) => [...prev, uploadingFile]);

      // Simulate upload progress
      simulateUpload(file);
    });
  };

  const simulateUpload = (file: File) => {
    const startTime = Date.now();
    let progress = 0;

    // If it's a zip file, call extract API immediately
    if (file.name.toLowerCase().endsWith('.zip')) {
      setIsExtractingFile(file);

      // Start progress animation
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        // Slow progress that will complete when API responds
        progress = Math.min(80, Math.floor((elapsed / 100) * 2)); // Reaches 80% slowly

        setUploadingFiles((prev) =>
          prev.map((uf) => (uf.file === file ? { ...uf, progress } : uf))
        );
      }, 100);

      // Call extract API
      extractFile(file, {
        onSuccess: (data) => {
          clearInterval(progressInterval);

          // Complete progress animation
          setUploadingFiles((prev) =>
            prev.map((uf) => (uf.file === file ? { ...uf, progress: 100 } : uf))
          );

          // Store extracted data in Zustand
          addExtractedData(data);

          // Move to uploaded files
          setTimeout(() => {
            const updatedFiles = [...formData.uploadedFiles, file];
            onUpdate({ uploadedFiles: updatedFiles });
            setUploadingFiles((prev) => prev.filter((uf) => uf.file !== file));
            setIsExtractingFile(null);
          }, 500);
        },
        onError: () => {
          clearInterval(progressInterval);
          // On error, still complete the upload but show error
          setUploadingFiles((prev) =>
            prev.map((uf) => (uf.file === file ? { ...uf, progress: 100 } : uf))
          );

          setTimeout(() => {
            const updatedFiles = [...formData.uploadedFiles, file];
            onUpdate({ uploadedFiles: updatedFiles });
            setUploadingFiles((prev) => prev.filter((uf) => uf.file !== file));
            setIsExtractingFile(null);
          }, 500);
        }
      });
    } else {
      // For non-zip files, just simulate normal upload
      const interval = setInterval(() => {
        progress += 5;

        setUploadingFiles((prev) =>
          prev.map((uf) => (uf.file === file ? { ...uf, progress } : uf))
        );

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const updatedFiles = [...formData.uploadedFiles, file];
            onUpdate({ uploadedFiles: updatedFiles });
            setUploadingFiles((prev) => prev.filter((uf) => uf.file !== file));
          }, 500);
        }
      }, 300);
    }
  };

  const togglePause = (file: File) => {
    setUploadingFiles((prev) =>
      prev.map((uf) =>
        uf.file === file ? { ...uf, isPaused: !uf.isPaused } : uf
      )
    );
  };

  const cancelUpload = (file: File) => {
    setUploadingFiles((prev) => prev.filter((uf) => uf.file !== file));
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'zip') {
      return (
        <Image
          src='/zip.png'
          alt='ZIP'
          width={32}
          height={32}
          className='h-8 w-8'
        />
      );
    }
    return (
      <div className='flex h-8 w-8 items-center justify-center rounded bg-orange-100'>
        <FileText className='h-4 w-4 text-orange-600' />
      </div>
    );
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
        <div className='mt-3'>
          <h1 className='mb-2 text-2xl font-semibold'>Upload Files</h1>
          <p className='text-md font-medium'>
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
            'rounded-lg border-2 p-4 text-center transition-colors',
            isDragOver
              ? 'border-primary bg-primary/20 border'
              : 'border-primary border-dashed'
          )}
        >
          <div className='flex flex-col items-center space-y-4'>
            <Image
              src='/upload.png'
              alt=''
              width={42}
              height={42}
              className='h-10 w-10 rounded-sm'
            />
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

        {/* Uploading Files Progress */}
        {uploadingFiles.length > 0 && (
          <div className='space-y-3'>
            {uploadingFiles.map((uploadingFile, index) => {
              const remainingTime = Math.ceil(
                ((100 - uploadingFile.progress) / 5) * 0.3
              );
              return (
                <div
                  key={index}
                  className='bg-card space-y-3 rounded-lg border p-4'
                >
                  <div className='flex items-start justify-between'>
                    <div>
                      <p className='text-sm font-medium'>
                        {isExtractingFile === uploadingFile.file
                          ? 'Extracting and analyzing...'
                          : 'Uploading...'}
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        {uploadingFile.progress}%
                        {isExtractingFile !== uploadingFile.file &&
                          ` • ${remainingTime} seconds remaining`}
                      </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => togglePause(uploadingFile.file)}
                        className='h-8 w-8 rounded-full p-0'
                      >
                        <Pause className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => cancelUpload(uploadingFile.file)}
                        className='h-8 w-8 rounded-full bg-red-100 p-0 hover:bg-red-200'
                      >
                        <X className='h-4 w-4 text-red-600' />
                      </Button>
                    </div>
                  </div>
                  <Progress value={uploadingFile.progress} className='h-2' />
                </div>
              );
            })}
          </div>
        )}

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
                    {getFileIcon(file.name)}
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

        <div className='flex flex-col justify-between gap-4 pt-8'>
          <Button
            onClick={onNext}
            // disabled={!isValid}
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
