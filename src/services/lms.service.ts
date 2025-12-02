import { apiClient } from '@/lib/api-config';
import type {
  Workspace,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
  Module,
  CreateModuleRequest,
  UpdateModuleRequest,
  Topic,
  CreateTopicRequest,
  UpdateTopicRequest,
  Resource,
  CreateResourceRequest,
  UpdateResourceRequest,
  ExtractResponse
} from '@/types/lms';

// Workspace Service
export const workspaceService = {
  create: async (data: CreateWorkspaceRequest): Promise<Workspace> => {
    const response = await apiClient.post<Workspace>(
      '/api/v1/workspaces',
      data
    );
    return response.data;
  },

  getAll: async (userId: string): Promise<Workspace[]> => {
    const response = await apiClient.get<Workspace[]>('/api/v1/workspaces', {
      params: { user_id: userId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<Workspace> => {
    const response = await apiClient.get<Workspace>(`/api/v1/workspaces/${id}`);
    return response.data;
  },

  update: async (
    id: string,
    data: UpdateWorkspaceRequest
  ): Promise<Workspace> => {
    const response = await apiClient.put<Workspace>(
      `/api/v1/workspaces/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/workspaces/${id}`);
  }
};

// Course Service
export const courseService = {
  create: async (data: CreateCourseRequest): Promise<Course> => {
    const response = await apiClient.post<Course>('/api/v1/courses', data);
    return response.data;
  },

  getAll: async (workspaceId: string, userId: string): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>('/api/v1/courses', {
      params: { workspace_id: workspaceId, user_id: userId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<Course> => {
    const response = await apiClient.get<Course>(`/api/v1/courses/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateCourseRequest): Promise<Course> => {
    const response = await apiClient.put<Course>(`/api/v1/courses/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/courses/${id}`);
  }
};

// Module Service
export const moduleService = {
  create: async (data: CreateModuleRequest): Promise<Module> => {
    const response = await apiClient.post<Module>('/api/v1/modules', data);
    return response.data;
  },

  getAll: async (courseId: string): Promise<Module[]> => {
    const response = await apiClient.get<Module[]>('/api/v1/modules', {
      params: { course_id: courseId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<Module> => {
    const response = await apiClient.get<Module>(`/api/v1/modules/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateModuleRequest): Promise<Module> => {
    const response = await apiClient.put<Module>(`/api/v1/modules/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/modules/${id}`);
  }
};

// Topic Service
export const topicService = {
  create: async (data: CreateTopicRequest): Promise<Topic> => {
    const response = await apiClient.post<Topic>('/api/v1/topics', data);
    return response.data;
  },

  getAll: async (courseId: string): Promise<Topic[]> => {
    const response = await apiClient.get<Topic[]>('/api/v1/topics', {
      params: { course_id: courseId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<Topic> => {
    const response = await apiClient.get<Topic>(`/api/v1/topics/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateTopicRequest): Promise<Topic> => {
    const response = await apiClient.put<Topic>(`/api/v1/topics/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/topics/${id}`);
  }
};

// Resource Service
export const resourceService = {
  create: async (data: CreateResourceRequest): Promise<Resource> => {
    const response = await apiClient.post<Resource>('/api/v1/resources', data);
    return response.data;
  },

  getAll: async (moduleId: string): Promise<Resource[]> => {
    const response = await apiClient.get<Resource[]>('/api/v1/resources', {
      params: { module_id: moduleId }
    });
    return response.data;
  },

  getById: async (id: string): Promise<Resource> => {
    const response = await apiClient.get<Resource>(`/api/v1/resources/${id}`);
    return response.data;
  },

  update: async (
    id: string,
    data: UpdateResourceRequest
  ): Promise<Resource> => {
    const response = await apiClient.put<Resource>(
      `/api/v1/resources/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/resources/${id}`);
  }
};

// Extract Service
export const extractService = {
  extractFile: async (file: File): Promise<ExtractResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<ExtractResponse>(
      '/api/v1/extract',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  }
};
