import axios, { AxiosError } from 'axios';
import type { AuthResponse, CandidateProfile, Match } from '../types/auth';
import type { JobPosting } from '../types/job';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new ApiError('Request failed', undefined, error));
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const message = (error.response.data as { message?: string })?.message || 'An error occurred';
      return Promise.reject(new ApiError(message, error.response.status, error.response.data));
    }
    if (error.request) {
      return Promise.reject(new ApiError('No response received from server'));
    }
    return Promise.reject(new ApiError('Request failed'));
  }
);

// Auth endpoints
export const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },
  register: async (data: { fullName: string; email: string; password: string; role: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
};

// Profile endpoints
export const profiles = {
  createProfile: async (profile: FormData): Promise<CandidateProfile> => {
    const response = await api.post<CandidateProfile>('/profiles/candidate', profile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getProfile: async (): Promise<CandidateProfile> => {
    const response = await api.get<CandidateProfile>('/profiles/candidate');
    return response.data;
  },
  updateProfile: async (profile: Partial<CandidateProfile>): Promise<CandidateProfile> => {
    const response = await api.put<CandidateProfile>('/profiles/candidate', profile);
    return response.data;
  },
};

// Job endpoints
export const jobs = {
  getJobs: async (): Promise<JobPosting[]> => {
    const response = await api.get<JobPosting[]>('/jobs');
    return response.data;
  },
  getEmployerJobs: async (employerId: string): Promise<JobPosting[]> => {
    const response = await api.get<JobPosting[]>(`/jobs/employer/${employerId}`);
    return response.data;
  },
  getJob: async (id: string): Promise<JobPosting> => {
    const response = await api.get<JobPosting>(`/jobs/${id}`);
    return response.data;
  },
  createJob: async (job: Partial<JobPosting>): Promise<JobPosting> => {
    const response = await api.post<JobPosting>('/jobs', job);
    return response.data;
  },
  updateJob: async (id: string, job: Partial<JobPosting>): Promise<JobPosting> => {
    const response = await api.put<JobPosting>(`/jobs/${id}`, job);
    return response.data;
  },
  deleteJob: async (id: string): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  },
};

// Matching endpoints
export const matches = {
  getCandidateMatches: async (userId: string): Promise<Match[]> => {
    const response = await api.get<Match[]>(`/matches/candidate/${userId}`);
    return response.data;
  },
  getJobMatches: async (jobId: string): Promise<Match[]> => {
    const response = await api.get<Match[]>(`/matches/job/${jobId}`);
    return response.data;
  },
};

export default api; 