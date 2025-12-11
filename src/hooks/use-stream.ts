'use client';

import { useState, useCallback } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import type { CurriculumData, LessonGenerationData } from '@/types/lms';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

interface StreamStatus {
  event: string;
  message: string;
  progress?: number;
  type?: string;
}

interface ExtractCurriculumOptions {
  file: File;
  targetAudience?: string;
  onProgress?: (status: StreamStatus) => void;
  onComplete?: (data: CurriculumData, courseId: string) => void;
  onError?: (error: Error) => void;
}

interface GenerateLessonsOptions {
  file: File;
  courseId: string;
  curriculumData: CurriculumData;
  targetAudience?: string;
  onProgress?: (status: StreamStatus) => void;
  onComplete?: (data: LessonGenerationData) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for extracting curriculum from uploaded file using SSE
 */
export const useExtractCurriculum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState<StreamStatus | null>(null);

  const extractCurriculum = useCallback(
    async ({
      file,
      targetAudience = 'General Audience',
      onProgress,
      onComplete,
      onError
    }: ExtractCurriculumOptions) => {
      setIsLoading(true);
      setProgress(0);
      setCurrentStatus(null);

      const formData = new FormData();
      formData.append('file', file);

      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('access_token')
          : null;

      try {
        let curriculumResult: CurriculumData | null = null;
        let courseIdResult: string | null = null;
        let totalPages = 0;
        let currentPage = 0;

        await fetchEventSource(
          `${API_BASE_URL}/api/v1/extract/curriculum?target_audience=${encodeURIComponent(targetAudience)}`,
          {
            method: 'POST',
            headers: {
              ...(token && { Authorization: `Bearer ${token}` })
            },
            body: formData,
            openWhenHidden: true,
            async onopen(response) {
              if (response.ok) {
                return;
              }
              throw new Error(`HTTP error! status: ${response.status}`);
            },
            onmessage(event) {
              if (event.data === '' || event.event === 'ping') return;

              try {
                const parsedData = JSON.parse(event.data);
                const eventType = parsedData.event;
                const eventData = parsedData.data;

                let calculatedProgress = progress;
                let status: StreamStatus = {
                  event: eventType,
                  message: typeof eventData === 'string' ? eventData : '',
                  type: eventType
                };

                // Calculate progress based on event types
                if (eventType === 'pipeline_status') {
                  if (eventData.includes('Starting')) {
                    calculatedProgress = 5;
                  } else if (eventData.includes('Agents are working')) {
                    calculatedProgress = 60;
                  } else if (eventData.includes('Complete')) {
                    calculatedProgress = 95;
                  }
                } else if (eventType === 'parser_status') {
                  // Extract page numbers from messages like "Read 5/25 pages..."
                  const pageMatch = eventData.match(/(\d+)\/(\d+) pages/);
                  if (pageMatch) {
                    currentPage = parseInt(pageMatch[1]);
                    totalPages = parseInt(pageMatch[2]);
                    // Parser takes 5% to 50% of progress
                    calculatedProgress = 5 + (currentPage / totalPages) * 45;
                  } else if (eventData.includes('Completed batch')) {
                    const batchMatch = eventData.match(/(\d+)\/(\d+)/);
                    if (batchMatch) {
                      const currentBatch = parseInt(batchMatch[1]);
                      const totalBatches = parseInt(batchMatch[2]);
                      // Batch processing takes 50% to 60% of progress
                      calculatedProgress =
                        50 + (currentBatch / totalBatches) * 10;
                    }
                  } else if (eventData.includes('[DONE]')) {
                    calculatedProgress = 60;
                  }
                } else if (eventType === 'curriculum_status') {
                  if (eventData.includes('Structure Approved')) {
                    calculatedProgress = 75;
                  } else if (eventData.includes('Grouped modules')) {
                    calculatedProgress = 85;
                  }
                } else if (eventType === 'pipeline_completion') {
                  calculatedProgress = 100;
                  // Extract curriculum data and course_id
                  if (typeof eventData === 'object' && eventData !== null) {
                    console.log('Pipeline completion data:', eventData);
                    // The API returns the curriculum data directly, not nested in a 'curriculum' field
                    curriculumResult = eventData as any;
                    // Try to get course_id from the data or use empty string
                    courseIdResult = (eventData as any).course_id || '';
                    console.log('Extracted curriculum:', curriculumResult);
                    console.log('Extracted course_id:', courseIdResult);
                  }
                }

                status.progress = calculatedProgress;
                setProgress(calculatedProgress);
                setCurrentStatus(status);
                onProgress?.(status);

                // Call onComplete when pipeline is done
                if (eventType === 'pipeline_completion' && curriculumResult) {
                  // Call onComplete even if course_id is empty - it will be set from create course API
                  onComplete?.(curriculumResult, courseIdResult || '');
                }
              } catch (error) {
                console.error('Error parsing SSE data:', error);
              }
            },
            onerror(error) {
              console.error('SSE Error:', error);
              setIsLoading(false);
              onError?.(
                error instanceof Error ? error : new Error('Stream error')
              );
              throw error; // Stop the stream
            },
            onclose() {
              setIsLoading(false);
            }
          }
        );
      } catch (error) {
        console.error('Extract curriculum error:', error);
        setIsLoading(false);
        onError?.(error instanceof Error ? error : new Error('Unknown error'));
      }
    },
    [progress]
  );

  return {
    extractCurriculum,
    isLoading,
    progress,
    currentStatus
  };
};

/**
 * Hook for generating lessons and quizzes using SSE
 */
export const useGenerateLessons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState<StreamStatus | null>(null);

  const generateLessons = useCallback(
    async ({
      file,
      courseId,
      curriculumData,
      targetAudience = 'General Audience',
      onProgress,
      onComplete,
      onError
    }: GenerateLessonsOptions) => {
      setIsLoading(true);
      setProgress(0);
      setCurrentStatus(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('course_id', courseId);
      formData.append('curriculum_data', JSON.stringify(curriculumData));

      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('access_token')
          : null;

      try {
        let lessonResult: LessonGenerationData | null = null;
        let totalModules = 0;
        const processedModuleIds = new Set<number>();

        await fetchEventSource(
          `${API_BASE_URL}/api/v1/extract/lesson-n-quiz?target_audience=${encodeURIComponent(targetAudience)}`,
          {
            method: 'POST',
            headers: {
              ...(token && { Authorization: `Bearer ${token}` })
            },
            body: formData,
            openWhenHidden: true,
            async onopen(response) {
              if (response.ok) {
                return;
              }
              throw new Error(`HTTP error! status: ${response.status}`);
            },
            onmessage(event) {
              if (event.data === '' || event.event === 'ping') return;

              try {
                const parsedData = JSON.parse(event.data);
                const eventType = parsedData.event;
                const eventData = parsedData.data;

                let calculatedProgress = progress;
                let status: StreamStatus = {
                  event: eventType,
                  message: typeof eventData === 'string' ? eventData : '',
                  type: eventType
                };

                // Calculate progress based on event types
                if (eventType === 'pipeline_status') {
                  if (eventData.includes('Starting')) {
                    calculatedProgress = 5;
                  } else if (eventData.includes('Agents are working')) {
                    calculatedProgress = 20;
                  } else if (eventData.includes('Processing Topic')) {
                    // Extract module count from first occurrence
                    const moduleMatch = eventData.match(/with (\d+) modules/);
                    if (moduleMatch && totalModules === 0) {
                      totalModules = parseInt(moduleMatch[1]);
                      console.log('Total modules to process:', totalModules);
                    }
                    calculatedProgress = 25;
                  }
                } else if (eventType === 'parser_status') {
                  if (eventData.includes('Loaded raw content')) {
                    calculatedProgress = 10;
                  }
                } else if (eventType === 'contents_status') {
                  // Track unique module processing by ID
                  const writingMatch = eventData.match(
                    /Writing content for Module (\d+)/
                  );
                  const savedMatch = eventData.match(
                    /Saved content for Module (\d+)/
                  );

                  if (writingMatch || savedMatch) {
                    const moduleId = parseInt(
                      writingMatch?.[1] || savedMatch?.[1] || '0'
                    );
                    if (moduleId > 0 && !processedModuleIds.has(moduleId)) {
                      processedModuleIds.add(moduleId);
                      const processedCount = processedModuleIds.size;
                      console.log(
                        `Module ${moduleId} processed (${processedCount}/${totalModules})`
                      );

                      if (totalModules > 0) {
                        // Module processing takes 30% to 90% of progress
                        calculatedProgress = Math.min(
                          90,
                          30 + (processedCount / totalModules) * 60
                        );
                      } else {
                        // Fallback if totalModules not set
                        calculatedProgress = Math.min(
                          90,
                          30 + processedCount * 3
                        );
                      }
                    }
                  }
                } else if (eventType === 'course_snapshot') {
                  // Course snapshot indicates progress, but don't over-count
                  if (calculatedProgress < 85) {
                    calculatedProgress = Math.min(85, calculatedProgress + 5);
                  }
                } else if (eventType === 'quizzes_status') {
                  // Quizzes are being generated, we're near the end
                  calculatedProgress = Math.min(95, calculatedProgress + 2);
                } else if (eventType === 'pipeline_completion') {
                  calculatedProgress = 100;
                  // Extract lesson data
                  if (typeof eventData === 'object' && eventData !== null) {
                    lessonResult = eventData as LessonGenerationData;
                  }
                }

                // Ensure progress never exceeds 100 and never goes backward
                calculatedProgress = Math.min(
                  100,
                  Math.max(calculatedProgress, progress)
                );

                status.progress = calculatedProgress;
                setProgress(calculatedProgress);
                setCurrentStatus(status);
                onProgress?.(status);

                // Call onComplete when pipeline is done
                if (eventType === 'pipeline_completion' && lessonResult) {
                  onComplete?.(lessonResult);
                }
              } catch (error) {
                console.error('Error parsing SSE data:', error);
              }
            },
            onerror(error) {
              console.error('SSE Error:', error);
              setIsLoading(false);
              onError?.(
                error instanceof Error ? error : new Error('Stream error')
              );
              throw error; // Stop the stream
            },
            onclose() {
              setIsLoading(false);
            }
          }
        );
      } catch (error) {
        console.error('Generate lessons error:', error);
        setIsLoading(false);
        onError?.(error instanceof Error ? error : new Error('Unknown error'));
      }
    },
    [progress]
  );

  return {
    generateLessons,
    isLoading,
    progress,
    currentStatus
  };
};
