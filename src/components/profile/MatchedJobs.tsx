import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { matches } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const MotionCard = motion(Card);

export const MatchedJobs: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const { data: jobMatches, isLoading, error } = useQuery({
    queryKey: ['candidateMatches', user?._id],
    queryFn: () => matches.getCandidateMatches(user?._id || ''),
    enabled: !!user?._id,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load job matches. Please try again later.
      </Alert>
    );
  }

  if (!jobMatches?.length) {
    return (
      <Alert severity="info">
        No job matches found. Update your profile to get better matches!
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Matched Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobMatches.map((match, index) => (
          <Grid item xs={12} key={match.id}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              sx={{
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'white',
                borderRadius: 2,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <WorkIcon color="primary" />
                      <Typography variant="h6" component="div">
                        {match.job.title}
                      </Typography>
                    </Box>
                    {/* <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {match.job.company}
                    </Typography> */}
                    
                    <Box display="flex" gap={2} mb={2}>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {match.job.location}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <AttachMoneyIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {match.job.salary.currency} {match.job.salary.min.toLocaleString()} - {match.job.salary.max.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" paragraph>
                      {match.job.description}
                    </Typography>

                    <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                      {match.job.requirements.map((req, idx) => (
                        <Chip
                          key={idx}
                          label={req}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(144, 202, 249, 0.16)'
                              : 'rgba(33, 150, 243, 0.1)',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="column" alignItems="flex-end" gap={2}>
                    {/* <Chip
                      label={`${match.matchPercentage}% Match`}
                      color="primary"
                      sx={{
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(144, 202, 249, 0.16)'
                          : 'rgba(33, 150, 243, 0.1)',
                      }}
                    /> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {/* TODO: Implement apply functionality */}}
                    >
                      Apply Now
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 