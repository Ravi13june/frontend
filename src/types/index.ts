export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'candidate' | 'employer';
  createdAt: string;
  updatedAt: string;
}

export interface CandidateProfile {
  userId: string;
  fullName: string;
  title: string;
  bio: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  education: Education[];
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobPosting {
  _id: string;
  employerId: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  company?: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  embedding?: number[];
  createdAt: string;
  updatedAt: string;
}

export interface Match {
  id: string;
  job: {
    id: string;
    title: string;
    company: string;
    description: string;
    requirements: string[];
    location: string;
    salary: {
      min: number;
      max: number;
      currency: string;
    };
  };
  matchPercentage: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description: string;
} 