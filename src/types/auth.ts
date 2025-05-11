export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    role: 'employer' | 'candidate';
    name: string;
  };
}

export interface CandidateProfile {
  _id: string;
  userId: string;
  name: string;
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  title?: string;
  bio?: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  education: {
    degree: string;
    field: string;
    institution: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Match {
  id: string;
  jobId: string;
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
  candidateId: string;
  status: 'pending' | 'accepted' | 'rejected';
  matchPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  role: 'employer' | 'candidate';
  name: string;
  fullName: string;
} 