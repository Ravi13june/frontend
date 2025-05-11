import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  Container,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { jobs } from '../services/api';
import type { JobPosting } from '../types/job';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';
import { JobCardSkeleton } from '../components/skeletons/JobCardSkeleton';
import { JobFilters } from '../components/filters/JobFilters';
import { JobCard } from '../components/jobs/JobCard';
import { useJobFilters } from '../hooks/useJobFilters';
import { toastService } from '../services/toast';

export default function Jobs() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEmployer = user?.role === 'employer';

  const { data: jobListings, isLoading, error } = useQuery<JobPosting[]>({
    queryKey: ['jobs'],
    queryFn: jobs.getJobs,
    retry: 1,
  });

  const { setFilters, filteredJobs, availableSkills } = useJobFilters(jobListings);

  const handleApply = (_jobId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    // TODO: Implement job application logic
    toastService.success('Application submitted successfully!');
  };

  const handleViewDetails = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {[...Array(3)].map((_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="80vh" gap={3}>
          <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
            Error loading jobs. Please try again later.
          </Alert>
          <Typography variant="body1" color="text.secondary">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'background.default' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <WorkIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" fontWeight="bold">
              {isEmployer ? 'Your Job Postings' : 'Available Jobs'}
            </Typography>
            <Chip 
              label={`${filteredJobs.length} positions`}
              color="primary"
              variant="outlined"
            />
          </Stack>
          {isEmployer && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/jobs/create')}
              sx={{ borderRadius: 2 }}
            >
              Create New Job
            </Button>
          )}
        </Box>
      </Paper>

      <JobFilters onFilter={setFilters} skills={availableSkills} />

      {filteredJobs.length === 0 ? (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.default' }}>
          <Box display="flex" flexDirection="column" alignItems="center" minHeight="60vh" gap={3}>
            <Alert severity="info" sx={{ width: '100%', maxWidth: 600 }}>
              {isEmployer ? 'You haven\'t posted any jobs yet.' : 'No jobs match your filters.'}
            </Alert>
            {isEmployer && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/jobs/create')}
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Create Your First Job
              </Button>
            )}
          </Box>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredJobs.map((job, index) => (
            <Grid item xs={12} key={job._id}>
              <JobCard
                job={job}
                index={index}
                isEmployer={isEmployer}
                onApply={() => handleApply(job._id)}
                onViewDetails={() => handleViewDetails(job._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
} 