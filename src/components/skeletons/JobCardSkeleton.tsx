import { Card, Skeleton, Box } from '@mui/material';

export const JobCardSkeleton = () => (
  <Card sx={{ p: 2, mb: 2 }}>
    <Skeleton variant="text" width="60%" height={32} />
    <Skeleton variant="text" width="40%" height={24} sx={{ mb: 1 }} />
    <Skeleton variant="rectangular" height={100} sx={{ mb: 1 }} />
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Skeleton variant="rounded" width={100} height={36} />
      <Skeleton variant="rounded" width={100} height={36} />
    </Box>
  </Card>
); 