'use client';

import { Button } from '@/components/ui/button';
import { FormData } from './lms-generation-wizard';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Upload,
  X,
  FileText,
  Pause,
  Loader2,
  FileSearch,
  Brain,
  BookOpen,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { useExtractCurriculum } from '@/hooks/use-stream';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { toast } from 'sonner';

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
  const [streamStatus, setStreamStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setCurriculumData, setCourseId, setUploadedFile } =
    useWorkspaceStore();
  const { extractCurriculum, isLoading: isExtracting } = useExtractCurriculum();

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
    // If it's a zip file, call extract curriculum API with streaming
    if (file.name.toLowerCase().endsWith('.zip')) {
      // Store the uploaded file
      setUploadedFile(file);

      // Call streaming extract curriculum API
      extractCurriculum({
        file,
        onProgress: (status) => {
          // Update progress based on stream events
          const progress = status.progress || 0;
          setStreamStatus(status.message);

          setUploadingFiles((prev) =>
            prev.map((uf) => (uf.file === file ? { ...uf, progress } : uf))
          );
        },
        onComplete: (curriculumData, streamCourseId) => {
          // Store curriculum data and course ID in global store
          console.log('Storing curriculum data:', curriculumData);
          console.log('Stream course ID:', streamCourseId);
          setCurriculumData(curriculumData);
          // Only set course_id from stream if we don't already have one from create course API
          if (streamCourseId) {
            console.log('Setting course ID from stream:', streamCourseId);
            setCourseId(streamCourseId);
          } else {
            console.log('No course ID from stream, keeping existing one');
          }

          // Complete progress animation
          setUploadingFiles((prev) =>
            prev.map((uf) => (uf.file === file ? { ...uf, progress: 100 } : uf))
          );

          // Move to uploaded files
          setTimeout(() => {
            const updatedFiles = [...formData.uploadedFiles, file];
            onUpdate({ uploadedFiles: updatedFiles });
            setUploadingFiles((prev) => prev.filter((uf) => uf.file !== file));
            toast.success('Curriculum extracted successfully!');
          }, 500);
        },
        onError: (error) => {
          // On error, show error and remove from uploading
          toast.error(`Failed to extract curriculum: ${error.message}`);
          setUploadingFiles((prev) => prev.filter((uf) => uf.file !== file));
        }
      });
    } else {
      // For non-zip files, show error
      toast.error('Please upload a ZIP file');
      setUploadingFiles((prev) => prev.filter((uf) => uf.file !== file));
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

  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase();

    // Parser status - File scanning
    if (
      lowerStatus.includes('read') ||
      lowerStatus.includes('pages') ||
      lowerStatus.includes('parse')
    ) {
      return <FileSearch className='h-3.5 w-3.5 animate-pulse text-blue-500' />;
    }

    // Batch processing
    if (
      lowerStatus.includes('batch') ||
      lowerStatus.includes('completed batch')
    ) {
      return <Loader2 className='h-3.5 w-3.5 animate-spin text-purple-500' />;
    }

    // AI/Agents working
    if (
      lowerStatus.includes('agents') ||
      lowerStatus.includes('working') ||
      lowerStatus.includes('structure')
    ) {
      return <Brain className='h-3.5 w-3.5 animate-pulse text-indigo-500' />;
    }

    // Curriculum generation
    if (
      lowerStatus.includes('curriculum') ||
      lowerStatus.includes('grouped') ||
      lowerStatus.includes('modules')
    ) {
      return <BookOpen className='h-3.5 w-3.5 animate-pulse text-green-500' />;
    }

    // Completion
    if (lowerStatus.includes('complete') || lowerStatus.includes('done')) {
      return <CheckCircle className='h-3.5 w-3.5 text-green-600' />;
    }

    // Default loading
    return <Loader2 className='text-primary h-3.5 w-3.5 animate-spin' />;
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
          onDragOver={isExtracting ? undefined : handleDragOver}
          onDragLeave={isExtracting ? undefined : handleDragLeave}
          onDrop={isExtracting ? undefined : handleDrop}
          className={cn(
            'rounded-lg border-2 p-4 text-center transition-colors',
            isExtracting
              ? 'border-muted bg-muted/50 pointer-events-none opacity-60'
              : isDragOver
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
                disabled={isExtracting}
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
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        {isExtracting && (
                          <Loader2 className='text-primary h-4 w-4 animate-spin' />
                        )}
                        <p className='text-sm font-medium'>
                          {isExtracting
                            ? 'Extracting and analyzing curriculum...'
                            : 'Processing...'}
                        </p>
                      </div>
                      <p className='text-muted-foreground mt-1 text-xs'>
                        {Math.round(uploadingFile.progress)}%
                      </p>
                      {streamStatus && (
                        <div className='mt-1.5 flex items-start gap-1.5'>
                          {getStatusIcon(streamStatus)}
                          <p className='text-muted-foreground line-clamp-2 flex-1 text-xs'>
                            {streamStatus}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className='flex items-center space-x-2'>
                      {/* <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => togglePause(uploadingFile.file)}
                        className='p-0 rounded-full w-8 h-8'
                      >
                        <Pause className='w-4 h-4' />
                      </Button> */}
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
                  <Progress
                    value={Math.round(uploadingFile.progress)}
                    className='h-2'
                  />
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
            disabled={isExtracting || formData.uploadedFiles.length === 0}
            className='bg-primary hover:bg-primary/90 px-8'
          >
            {isExtracting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Extracting...
              </>
            ) : (
              'Continue'
            )}
          </Button>
          <Button
            variant='ghost'
            onClick={onBack}
            disabled={isExtracting}
            className='bg-primary/30 hover:bg-primary/40 text-primary px-8'
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
