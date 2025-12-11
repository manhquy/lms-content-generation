import { create } from 'zustand';
import type {
  ExtractItem,
  CurriculumData,
  LessonGenerationData
} from '@/types/lms';

interface WorkspaceStore {
  selectedWorkspaceId: string | null;
  setSelectedWorkspaceId: (id: string | null) => void;
  extractedData: ExtractItem[];
  setExtractedData: (data: ExtractItem[]) => void;
  addExtractedData: (data: ExtractItem[]) => void;
  clearExtractedData: () => void;
  // Curriculum data from extract API
  curriculumData: CurriculumData | null;
  setCurriculumData: (data: CurriculumData | null) => void;
  // Course ID from curriculum generation
  courseId: string | null;
  setCourseId: (id: string | null) => void;
  // Lesson data from lesson generation API
  lessonData: LessonGenerationData | null;
  setLessonData: (data: LessonGenerationData | null) => void;
  // Uploaded file
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  // Clear all data
  clearAll: () => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  selectedWorkspaceId: null,
  setSelectedWorkspaceId: (id) => set({ selectedWorkspaceId: id }),
  extractedData: [],
  setExtractedData: (data) => set({ extractedData: data }),
  addExtractedData: (data) =>
    set((state) => ({
      extractedData: [...state.extractedData, ...data]
    })),
  clearExtractedData: () => set({ extractedData: [] }),
  curriculumData: null,
  setCurriculumData: (data) => set({ curriculumData: data }),
  courseId: null,
  setCourseId: (id) => set({ courseId: id }),
  lessonData: null,
  setLessonData: (data) => set({ lessonData: data }),
  uploadedFile: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
  clearAll: () =>
    set({
      selectedWorkspaceId: null,
      extractedData: [],
      curriculumData: null,
      courseId: null,
      lessonData: null,
      uploadedFile: null
    })
}));
