import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { CandidateProfile } from '../../types/auth';

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

interface ProfileHeaderProps {
  profile: CandidateProfile;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onEditClick }) => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
      <MotionTypography 
        variant="h4" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        sx={{ 
          fontWeight: 700,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(45deg, #90CAF9 30%, #64B5F6 90%)'
            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Profile
      </MotionTypography>
      <MotionButton
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
        onClick={onEditClick}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 16px rgba(144, 202, 249, 0.3)'
            : '0 8px 16px rgba(33, 150, 243, 0.3)'
        }}
        whileTap={{ scale: 0.95 }}
        sx={{ 
          borderRadius: '12px',
          textTransform: 'none',
          px: 3,
          py: 1
        }}
      >
        Edit Profile
      </MotionButton>
    </Box>
  );
};

export default ProfileHeader; 