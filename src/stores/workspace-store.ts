import { create } from 'zustand';
import type { ExtractItem } from '@/types/lms';

interface WorkspaceStore {
  selectedWorkspaceId: string | null;
  setSelectedWorkspaceId: (id: string | null) => void;
  extractedData: ExtractItem[];
  setExtractedData: (data: ExtractItem[]) => void;
  addExtractedData: (data: ExtractItem[]) => void;
  clearExtractedData: () => void;
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
  clearExtractedData: () => set({ extractedData: [] })
}));
