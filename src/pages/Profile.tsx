import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
  Typography,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profiles } from '../services/api';
import PersonalInfo from '../components/profile/PersonalInfo';
import BioSection from '../components/profile/BioSection';
import SkillsSection from '../components/profile/SkillsSection';
import ExperienceSection from '../components/profile/ExperienceSection';
import EducationSection from '../components/profile/EducationSection';
import EditProfileDialog from '../components/profile/EditProfileDialog';
import EditIcon from '@mui/icons-material/Edit';
import { MatchedJobs } from '../components/profile/MatchedJobs';

const MotionPaper = motion(Paper);

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: profiles.getProfile,
    enabled: isAuthenticated,
  });

  const updateProfileMutation = useMutation({
    mutationFn: profiles.updateProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['profile'], updatedProfile);
      setIsEditing(false);
    },
  });

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error instanceof Error ? error.message : 'An error occurred'}</Alert>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info">No profile found</Alert>
      </Container>
    );
  }

  if (userRole === 'employer') {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info">Employers cannot view candidate profiles</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <MotionPaper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'white',
          borderRadius: 2,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Profile
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            startIcon={<EditIcon />}
          >
            Edit Profile
          </Button>
        </Box>
        <PersonalInfo profile={profile} />
        <BioSection bio={profile.bio || ''} />
        <SkillsSection skills={profile.skills} />
        <ExperienceSection experiences={profile.experience} />
        <EducationSection education={profile.education} />
      </MotionPaper>

      {isEditing && (
        <EditProfileDialog
          profile={profile}
          open={isEditing}
          onClose={() => setIsEditing(false)}
          onSubmit={updateProfileMutation.mutate}
          isSubmitting={updateProfileMutation.isPending}
        />
      )}

      <Box sx={{ mt: 4 }}>
        <MatchedJobs />
      </Box>
    </Container>
  );
};

export default Profile; 