import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { jobs, matches } from '../services/api';
import type { JobPosting } from '../types/job';
import type { Match } from '../types/auth';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function EmployerDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
  });

  const { data: postedJobs, isLoading: jobsLoading, error: jobsError } = useQuery<JobPosting[]>({
    queryKey: ['employerJobs'],
    queryFn: () => jobs.getEmployerJobs(localStorage.getItem('userId') || ''),
  });

  const { data: jobMatches, isLoading: matchesLoading } = useQuery<Match[]>({
    queryKey: ['jobMatches', selectedJob?._id],
    queryFn: () => matches.getJobMatches(selectedJob?._id || ''),
    enabled: !!selectedJob,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateJob = async () => {
    try {
      const [min, max] = newJob.salary.split('-').map(s => parseInt(s.trim()));
      await jobs.createJob({
        ...newJob,
        employerId: localStorage.getItem('userId') || undefined,
        requirements: newJob.requirements.split(',').map(r => r.trim()),
        salary: {
          min,
          max,
          currency: 'USD'
        }
      });
      setIsJobDialogOpen(false);
      setNewJob({
        title: '',
        description: '',
        requirements: '',
        location: '',
        salary: '',
      });
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  if (jobsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (jobsError) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="60vh" gap={2}>
        <Alert severity="error">
          Error loading jobs. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Employer Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsJobDialogOpen(true)}
        >
          Post New Job
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Posted Jobs" />
        <Tab label="Job Matches" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {postedJobs?.map((job) => (
            <Grid item xs={12} key={job._id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        {job.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" gutterBottom>
                        {job.location}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {job.description}
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                        {job.requirements.map((req, index) => (
                          <Chip key={index} label={req} size="small" />
                        ))}
                      </Box>
                      {job.salary && (
                        <Typography variant="body2" color="primary" gutterBottom>
                          Salary: {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSelectedJob(job);
                        setTabValue(1);
                      }}
                    >
                      View Matches
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {selectedJob ? (
          <>
            <Typography variant="h5" gutterBottom>
              Matches for {selectedJob.title}
            </Typography>
            {matchesLoading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={3}>
                {jobMatches?.map((match) => (
                  <Grid item xs={12} key={match.id}>
                    <Card>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Match Score: {match.matchPercentage}%
                            </Typography>
                          </Box>
                          <Button variant="contained" color="primary">
                            View Profile
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        ) : (
          <Alert severity="info">
            Select a job to view its matches
          </Alert>
        )}
      </TabPanel>

      <Dialog open={isJobDialogOpen} onClose={() => setIsJobDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Post New Job</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Job Title"
              fullWidth
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
            <TextField
              label="Requirements (comma-separated)"
              fullWidth
              value={newJob.requirements}
              onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
            />
            <TextField
              label="Location"
              fullWidth
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            />
            <TextField
              label="Salary"
              fullWidth
              value={newJob.salary}
              onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsJobDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateJob} variant="contained" color="primary">
            Post Job
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 