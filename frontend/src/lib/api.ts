import { ContactFormData, ProjectRequestFormData, Project, ProjectRequest, PortfolioSettings, DashboardStats } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

// ─────────────────────────────────────────────────────────────
// Helper utilities
// ─────────────────────────────────────────────────────────────

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const { headers: customHeaders, ...restOptions } = options;
    const response = await fetch(url, {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(customHeaders as Record<string, string>),
      },
    });

    const result: any = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || `Request failed with status ${response.status}`,
        errors: result.errors,
      };
    }

    if (result.token && !result.data) {
      result.data = { token: result.token, user: result.user };
    }

    return result as ApiResponse<T>;
  } catch (error) {
    console.error('[API]', url, error);
    return {
      success: false,
      message: 'Unable to connect to the server. Please check your connection and try again.',
    };
  }
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

export async function checkBackendHealth(): Promise<{ status: string; uptime?: number }> {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) throw new Error(`Health check failed: ${response.status}`);
  return response.json();
}

export async function getPublicProjects(limit?: number): Promise<ApiResponse<Project[]>> {
  const query = limit ? `?limit=${limit}` : '';
  return request<Project[]>(`${API_BASE}/projects${query}`);
}

export async function getProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
  return request<Project>(`${API_BASE}/projects/${slug}`);
}

export async function getPublicSettings(): Promise<ApiResponse<PortfolioSettings>> {
  return request<PortfolioSettings>(`${API_BASE}/settings`);
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  return request(`${API_BASE}/contact`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function submitProjectRequest(data: ProjectRequestFormData): Promise<ApiResponse> {
  return request(`${API_BASE}/project-requests`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────────
// Admin Auth API
// ─────────────────────────────────────────────────────────────

export async function adminLogin(email: string, password: string): Promise<ApiResponse<{ token: string }>> {
  return request<{ token: string }>(`${API_BASE}/admin/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function adminGetMe(): Promise<ApiResponse<{ email: string }>> {
  return request<{ email: string }>(`${API_BASE}/admin/auth/me`, {
    headers: getAuthHeaders(),
  });
}

// ─────────────────────────────────────────────────────────────
// Admin Projects API
// ─────────────────────────────────────────────────────────────

export async function adminGetProjects(): Promise<ApiResponse<Project[]>> {
  return request<Project[]>(`${API_BASE}/admin/projects`, {
    headers: getAuthHeaders(),
  });
}

export async function adminGetProjectById(id: string): Promise<ApiResponse<Project>> {
  return request<Project>(`${API_BASE}/admin/projects/${id}`, {
    headers: getAuthHeaders(),
  });
}

export async function adminCreateProject(data: Partial<Project>): Promise<ApiResponse<Project>> {
  return request<Project>(`${API_BASE}/admin/projects`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
}

export async function adminUpdateProject(id: string, data: Partial<Project>): Promise<ApiResponse<Project>> {
  return request<Project>(`${API_BASE}/admin/projects/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
}

export async function adminDeleteProject(id: string): Promise<ApiResponse> {
  return request(`${API_BASE}/admin/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
}

export async function adminPublishProject(id: string): Promise<ApiResponse<Project>> {
  return request<Project>(`${API_BASE}/admin/projects/${id}/publish`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
}

export async function adminUnpublishProject(id: string): Promise<ApiResponse<Project>> {
  return request<Project>(`${API_BASE}/admin/projects/${id}/unpublish`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
}

// ─────────────────────────────────────────────────────────────
// Admin Requests API
// ─────────────────────────────────────────────────────────────

export async function adminGetRequests(): Promise<ApiResponse<ProjectRequest[]>> {
  return request<ProjectRequest[]>(`${API_BASE}/admin/project-requests`, {
    headers: getAuthHeaders(),
  });
}

export async function adminGetRequestById(id: string): Promise<ApiResponse<ProjectRequest>> {
  return request<ProjectRequest>(`${API_BASE}/admin/project-requests/${id}`, {
    headers: getAuthHeaders(),
  });
}

export async function adminUpdateRequestStatus(
  id: string,
  status: string
): Promise<ApiResponse<ProjectRequest>> {
  return request<ProjectRequest>(`${API_BASE}/admin/project-requests/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
}

export async function adminUpdateRequestNotes(
  id: string,
  notes: string
): Promise<ApiResponse<ProjectRequest>> {
  return request<ProjectRequest>(`${API_BASE}/admin/project-requests/${id}/notes`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ notes }),
  });
}

// ─────────────────────────────────────────────────────────────
// Admin Settings API
// ─────────────────────────────────────────────────────────────

export async function adminGetSettings(): Promise<ApiResponse<PortfolioSettings>> {
  return request<PortfolioSettings>(`${API_BASE}/admin/settings`, {
    headers: getAuthHeaders(),
  });
}

export async function adminUpdateSettings(data: Partial<PortfolioSettings>): Promise<ApiResponse<PortfolioSettings>> {
  return request<PortfolioSettings>(`${API_BASE}/admin/settings`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────────
// Admin Stats API
// ─────────────────────────────────────────────────────────────

export async function adminGetStats(): Promise<ApiResponse<DashboardStats>> {
  return request<DashboardStats>(`${API_BASE}/admin/stats`, {
    headers: getAuthHeaders(),
  });
}
