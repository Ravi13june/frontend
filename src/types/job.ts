export interface Salary {
  min: number;
  max: number;
  currency: string;
}

export interface JobPosting {
  _id: string;
  title: string;
  description: string;
  location: string;
  company: string;
  requirements: string[];
  salary?: Salary;
  employerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilterState {
  location: string;
  salary: string;
  skills: string[];
}

export interface JobFiltersProps {
  onFilter: (filters: JobFilterState) => void;
  skills: string[];
} 