// Workspace Types
export interface Workspace {
  id: string;
  name: string;
  description: string;
  user_id: string;
  created_at: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  description: string;
  user_id: string;
}

export interface UpdateWorkspaceRequest {
  name?: string;
  description?: string;
}

// Course Types
export interface Course {
  id: string;
  name: string;
  description: string;
  workspace_id: string;
  user_id: string;
  created_at: string;
}

export interface CreateCourseRequest {
  name: string;
  description: string;
  workspace_id: string;
  user_id: string;
}

export interface UpdateCourseRequest {
  name?: string;
  description?: string;
}

// Module Types
export interface Module {
  id: string;
  name: string;
  description: string;
  course_id: string;
  created_at: string;
}

export interface CreateModuleRequest {
  name: string;
  description: string;
  course_id: string;
}

export interface UpdateModuleRequest {
  name?: string;
  description?: string;
}

// Topic Types
export interface Topic {
  id: string;
  name: string;
  description: string;
  course_id: string;
  created_at: string;
}

export interface CreateTopicRequest {
  name: string;
  description: string;
  course_id: string;
}

export interface UpdateTopicRequest {
  name?: string;
  description?: string;
}

// Resource Types
export interface Resource {
  id: string;
  name: string;
  description: string;
  type: string;
  resource_data: Record<string, any>;
  module_id: string;
  created_at: string;
}

export interface CreateResourceRequest {
  name: string;
  description: string;
  type: string;
  resource_data: Record<string, any>;
  module_id: string;
}

export interface UpdateResourceRequest {
  name?: string;
  description?: string;
  type?: string;
  resource_data?: Record<string, any>;
}

// Extract Response
export interface ExtractItem {
  topic: string;
  modules: string[];
}

export type ExtractResponse = ExtractItem[];
