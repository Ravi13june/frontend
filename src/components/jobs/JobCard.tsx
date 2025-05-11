import { Card, CardContent, Typography, Grid, Chip, Button, Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import type { JobPosting } from '../../types/job';

interface JobCardProps {
  job: JobPosting;
  index: number;
  isEmployer: boolean;
  onApply?: () => void;
  onViewDetails?: () => void;
}

export const JobCard = ({ job, index, isEmployer, onApply, onViewDetails }: JobCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <Card 
      sx={{ 
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {job.title}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {job.location}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <BusinessIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {job.company}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
              {job.description}
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
              {job.requirements.map((req: string, index: number) => (
                <Chip 
                  key={index} 
                  label={req} 
                  size="small"
                  sx={{ 
                    borderRadius: 1,
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    }
                  }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box 
              display="flex" 
              flexDirection="column" 
              height="100%" 
              justifyContent="center"
              alignItems={{ xs: 'stretch', md: 'flex-end' }}
              gap={2}
            >
              {!isEmployer && (
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  onClick={onApply}
                  sx={{ borderRadius: 2 }}
                >
                  Apply Now
                </Button>
              )}
              <Button 
                variant="outlined" 
                color="primary"
                fullWidth
                onClick={onViewDetails}
                sx={{ borderRadius: 2 }}
              >
                View Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </motion.div>
); 