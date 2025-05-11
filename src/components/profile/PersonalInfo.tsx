import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { CandidateProfile } from '../../types/auth';

const MotionAvatar = motion(Avatar);
const MotionTypography = motion(Typography);

interface PersonalInfoProps {
  profile: CandidateProfile;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ profile }) => {
  const theme = useTheme();

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      gap={4}
      sx={{ position: 'relative',mb: 4 }}
    >
      <MotionAvatar 
        sx={{ 
          width: 120, 
          height: 120, 
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #90CAF9 30%, #64B5F6 90%)'
            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(144, 202, 249, 0.3)'
            : '0 8px 32px rgba(33, 150, 243, 0.3)',
          border: '4px solid',
          borderColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'white'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Typography variant="h1" sx={{ fontSize: '3rem' }}>{profile.fullName[0]}</Typography>
      </MotionAvatar>

      <Box display="flex" flexDirection="column" gap={1}>
        <MotionTypography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {profile.fullName}
        </MotionTypography>
        <MotionTypography 
          variant="h6" 
          sx={{ 
            color: theme.palette.mode === 'dark'
              ? '#90CAF9'
              : 'primary.main',
            fontWeight: 500
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {profile.title}
        </MotionTypography>
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '6px 16px',
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(144, 202, 249, 0.16)'
              : 'rgba(33, 150, 243, 0.1)',
            borderRadius: '30px',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 12px rgba(144, 202, 249, 0.2)'
              : '0 4px 12px rgba(0,0,0,0.05)',
            width: 'fit-content'
          }}
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LocationOnIcon sx={{ 
            color: theme.palette.mode === 'dark'
              ? '#90CAF9'
              : 'primary.main',
            fontSize: '1.2rem'
          }} />
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.mode === 'dark'
                ? '#90CAF9'
                : 'primary.main',
              fontWeight: 500
            }}
          >
            {profile.location}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfo; 