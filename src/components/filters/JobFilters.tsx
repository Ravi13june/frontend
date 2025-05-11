import { Box, TextField, Autocomplete, Chip } from '@mui/material';
import { useState } from 'react';

interface JobFiltersProps {
  onFilter: (filters: JobFilters) => void;
  skills: string[];
}

export interface JobFilters {
  location: string;
  salary: string;
  skills: string[];
}

export const JobFilters = ({ onFilter, skills }: JobFiltersProps) => {
  const [filters, setFilters] = useState<JobFilters>({
    location: '',
    salary: '',
    skills: [],
  });

  const handleFilterChange = (field: keyof JobFilters, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        label="Location"
        value={filters.location}
        onChange={(e) => handleFilterChange('location', e.target.value)}
        size="small"
        sx={{ minWidth: 200 }}
      />
      <TextField
        label="Min Salary"
        type="number"
        value={filters.salary}
        onChange={(e) => handleFilterChange('salary', e.target.value)}
        size="small"
        sx={{ minWidth: 150 }}
      />
      <Autocomplete
        multiple
        options={skills}
        value={filters.skills}
        onChange={(_, newValue) => handleFilterChange('skills', newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Skills"
            size="small"
            sx={{ minWidth: 200 }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
      />
    </Box>
  );
}; 