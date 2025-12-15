import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  workspaceService,
  courseService,
  moduleService,
  topicService,
  resourceService,
  extractService
} from '@/services/lms.service';
import type {
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  CreateCourseRequest,
  UpdateCourseRequest,
  CreateModuleRequest,
  UpdateModuleRequest,
  CreateTopicRequest,
  UpdateTopicRequest,
  CreateResourceRequest,
  UpdateResourceRequest
} from '@/types/lms';
import { toast } from 'sonner';

// Query keys
export const lmsKeys = {
  workspaces: (userId: string) => ['workspaces', userId] as const,
  workspace: (id: string) => ['workspace', id] as const,
  courses: (workspaceId: string, userId: string) =>
    ['courses', workspaceId, userId] as const,
  course: (id: string) => ['course', id] as const,
  modules: (courseId: string) => ['modules', courseId] as const,
  module: (id: string) => ['module', id] as const,
  topics: (courseId: string) => ['topics', courseId] as const,
  topic: (id: string) => ['topic', id] as const,
  resources: (moduleId: string, type?: string) =>
    ['resources', moduleId, type] as const,
  resource: (id: string) => ['resource', id] as const
};

// ============ Workspace Hooks ============

export const useWorkspaces = (userId: string) => {
  return useQuery({
    queryKey: lmsKeys.workspaces(userId),
    queryFn: () => workspaceService.getAll(userId),
    enabled: !!userId
  });
};

export const useWorkspace = (id: string) => {
  return useQuery({
    queryKey: lmsKeys.workspace(id),
    queryFn: () => workspaceService.getById(id),
    enabled: !!id
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspaceRequest) => workspaceService.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: lmsKeys.workspaces(variables.user_id)
      });
      toast.success('Workspace created successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail || 'Failed to create workspace';
      toast.error(message);
    }
  });
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkspaceRequest }) =>
      workspaceService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lmsKeys.workspace(data.id) });
      queryClient.invalidateQueries({
        queryKey: lmsKeys.workspaces(data.user_id)
      });
      toast.success('Workspace updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail || 'Failed to update workspace';
      toast.error(message);
    }
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workspaceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      toast.success('Workspace deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail || 'Failed to delete workspace';
      toast.error(message);
    }
  });
};

// ============ Course Hooks ============

export const useCourses = (workspaceId: string, userId: string) => {
  return useQuery({
    queryKey: lmsKeys.courses(workspaceId, userId),
    queryFn: () => courseService.getAll(workspaceId, userId),
    enabled: !!workspaceId && !!userId
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: lmsKeys.course(id),
    queryFn: () => courseService.getById(id),
    enabled: !!id
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseRequest) => courseService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: lmsKeys.courses(data.workspace_id, data.user_id)
      });
      toast.success('Course created successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to create course';
      toast.error(message);
    }
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCourseRequest }) =>
      courseService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lmsKeys.course(data.id) });
      queryClient.invalidateQueries({
        queryKey: lmsKeys.courses(data.workspace_id, data.user_id)
      });
      toast.success('Course updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to update course';
      toast.error(message);
    }
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => courseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to delete course';
      toast.error(message);
    }
  });
};

// ============ Module Hooks ============

export const useModules = (courseId: string) => {
  return useQuery({
    queryKey: lmsKeys.modules(courseId),
    queryFn: () => moduleService.getAll(courseId),
    enabled: !!courseId
  });
};

export const useModule = (id: string) => {
  return useQuery({
    queryKey: lmsKeys.module(id),
    queryFn: () => moduleService.getById(id),
    enabled: !!id
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateModuleRequest) => moduleService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: lmsKeys.modules(data.course_id)
      });
      toast.success('Module created successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to create module';
      toast.error(message);
    }
  });
};

export const useUpdateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateModuleRequest }) =>
      moduleService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lmsKeys.module(data.id) });
      queryClient.invalidateQueries({
        queryKey: lmsKeys.modules(data.course_id)
      });
      toast.success('Module updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to update module';
      toast.error(message);
    }
  });
};

export const useDeleteModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => moduleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      toast.success('Module deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to delete module';
      toast.error(message);
    }
  });
};

// ============ Topic Hooks ============

export const useTopics = (courseId: string) => {
  return useQuery({
    queryKey: lmsKeys.topics(courseId),
    queryFn: () => topicService.getAll(courseId),
    enabled: !!courseId
  });
};

export const useTopic = (id: string) => {
  return useQuery({
    queryKey: lmsKeys.topic(id),
    queryFn: () => topicService.getById(id),
    enabled: !!id
  });
};

export const useCreateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTopicRequest) => topicService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: lmsKeys.topics(data.course_id)
      });
      toast.success('Topic created successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to create topic';
      toast.error(message);
    }
  });
};

export const useUpdateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTopicRequest }) =>
      topicService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lmsKeys.topic(data.id) });
      queryClient.invalidateQueries({
        queryKey: lmsKeys.topics(data.course_id)
      });
      toast.success('Topic updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to update topic';
      toast.error(message);
    }
  });
};

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => topicService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Topic deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to delete topic';
      toast.error(message);
    }
  });
};

// ============ Resource Hooks ============

export const useResources = (moduleId: string, type?: string) => {
  return useQuery({
    queryKey: lmsKeys.resources(moduleId, type),
    queryFn: () => resourceService.getAll(moduleId, type),
    enabled: !!moduleId
  });
};

export const useResource = (id: string) => {
  return useQuery({
    queryKey: lmsKeys.resource(id),
    queryFn: () => resourceService.getById(id),
    enabled: !!id
  });
};

export const useCreateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResourceRequest) => resourceService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: lmsKeys.resources(data.module_id)
      });
      toast.success('Resource created successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail || 'Failed to create resource';
      toast.error(message);
    }
  });
};

export const useUpdateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateResourceRequest }) =>
      resourceService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lmsKeys.resource(data.id) });
      queryClient.invalidateQueries({
        queryKey: lmsKeys.resources(data.module_id)
      });
      toast.success('Resource updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail || 'Failed to update resource';
      toast.error(message);
    }
  });
};

export const useDeleteResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resourceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast.success('Resource deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.detail || 'Failed to delete resource';
      toast.error(message);
    }
  });
};

// ============ Extract Hook ============

export const useExtractFile = () => {
  return useMutation({
    mutationFn: (file: File) => extractService.extractFile(file),
    onSuccess: () => {
      toast.success('File extracted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Failed to extract file';
      toast.error(message);
    }
  });
};
