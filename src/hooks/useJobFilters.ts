import { useState, useMemo } from 'react';
import type { JobPosting, JobFilterState } from '../types/job';

export const useJobFilters = (jobs: JobPosting[] | undefined) => {
  const [filters, setFilters] = useState<JobFilterState>({
    location: '',
    salary: '',
    skills: [],
  });

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    
    return jobs.filter(job => {
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.salary && job.salary?.min && job.salary.min < parseInt(filters.salary)) {
        return false;
      }
      if (filters.skills.length > 0) {
        return filters.skills.some(skill => 
          job.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))
        );
      }
      return true;
    });
  }, [jobs, filters]);

  const availableSkills = useMemo(() => 
    Array.from(new Set(jobs?.flatMap(job => job.requirements) || [])),
    [jobs]
  );

  return {
    filters,
    setFilters,
    filteredJobs,
    availableSkills,
  };
}; 